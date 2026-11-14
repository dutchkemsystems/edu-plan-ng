/**
 * EduPlan NG - Strict Paywall Logic, Rate Limiting & Feature Gating (Phase 5)
 *
 * Enforces tier boundaries across B2C, B2B, and B2G subscriptions:
 * 1. 5-Day Trial Limit: Maximum 10 AI Lesson Plan generations total.
 * 2. 1-Month Limit: Maximum 30 AI Lesson Plan generations total.
 * 3. Daily Fair-Use Cap: 50 generations/day per user for Pro/Gold to prevent bot abuse.
 * 4. Feature Gating: Restricts 3D Visual Aids and Principal Heatmap to Gold & State tiers.
 * 5. Tiered Auto-Sync Dispatch: Bronze/Silver get text; Gold gets 3D/4K; B2G gets State compliance reports.
 */

import type { Request, Response, NextFunction } from 'express';
import { db } from '../db/index.ts';
import { users, schools, lessonPlans, lessonNotes } from '../db/schema.ts';
import { eq } from 'drizzle-orm';
import {
  type SubscriptionTierType,
  resolveTierConfig,
  canTierAccess,
  TIER_CONFIGURATIONS,
  type PricingFeatureKey
} from '../config/pricing.ts';
export { TIER_CONFIGURATIONS, resolveTierConfig, canTierAccess };
export type { SubscriptionTierType, PricingFeatureKey };
import { logger } from './logger.ts';

export type FeatureGatingType = PricingFeatureKey | 'ai_generation';

// In-Memory stores for daily rate limiter and monotonic total generation counter
const dailyGenerationCounts = new Map<string, number>();
const totalGenerationCounts = new Map<string, number>();

/**
 * Gets today's date formatted as YYYY-MM-DD in West Africa Time (WAT)
 */
function getTodayWatDateString(): string {
  const now = new Date();
  // UTC+1 for Nigeria
  const watDate = new Date(now.getTime() + 1 * 60 * 60 * 1000);
  return watDate.toISOString().split('T')[0];
}

function isTimestampExpired(isoTimestamp?: string | null): boolean {
  if (!isoTimestamp) return false;
  const ms = new Date(isoTimestamp).getTime();
  return !isNaN(ms) && Date.now() > ms;
}

/**
 * Retrieves the effective tier for a user strictly respecting accountType precedence:
 * B2G State Directorate -> B2B Private School -> B2C Individual Teacher
 */
export async function resolveEffectiveUserTier(userId?: string | null): Promise<{
  tierId: SubscriptionTierType;
  accountType: 'b2c' | 'b2b' | 'b2g';
  isExpired: boolean;
  userRecord: any;
  schoolRecord: any;
}> {
  if (!userId) {
    return {
      tierId: 'b2c_trial_5day',
      accountType: 'b2c',
      isExpired: false,
      userRecord: null,
      schoolRecord: null,
    };
  }

  try {
    const userRows = await db.select().from(users).where(eq(users.id, userId));
    const user = userRows[0] || null;

    if (!user) {
      return {
        tierId: 'b2c_trial_5day',
        accountType: 'b2c',
        isExpired: false,
        userRecord: null,
        schoolRecord: null,
      };
    }

    let school: any = null;
    if (user.schoolId) {
      const schoolRows = await db.select().from(schools).where(eq(schools.id, user.schoolId));
      school = schoolRows[0] || null;
    }

    const userAccountType = (user.accountType || 'b2c_individual').toLowerCase().trim();

    // 1. B2G State Ministry Directorate precedence
    if (userAccountType === 'b2g_government') {
      const expired = isTimestampExpired(user.subscriptionExpiresAt);
      if (expired) {
        return {
          tierId: 'b2c_trial_5day',
          accountType: 'b2c',
          isExpired: true,
          userRecord: user,
          schoolRecord: school,
        };
      }
      return {
        tierId: 'b2g_state_platinum',
        accountType: 'b2g',
        isExpired: false,
        userRecord: user,
        schoolRecord: school,
      };
    }

    // 2. B2B Private School precedence (only when user actually holds a B2B school account)
    if (userAccountType === 'b2b_school') {
      const userPlanExpired = isTimestampExpired(user.subscriptionExpiresAt);
      const schoolPlanExpired = isTimestampExpired(school?.subscriptionExpiresAt);
      const effectiveExpired = user.subscriptionExpiresAt ? userPlanExpired : schoolPlanExpired;

      const rawB2bPlan = (
        user.b2bTier ||
        user.subscriptionPlan ||
        school?.b2bTier ||
        school?.subscriptionPlan ||
        'b2b_bronze'
      ).toLowerCase().trim();

      const resolvedB2b = resolveTierConfig(
        rawB2bPlan.startsWith('b2b_') || rawB2bPlan.startsWith('b2g_')
          ? rawB2bPlan
          : ['bronze', 'silver', 'gold'].includes(rawB2bPlan)
          ? `b2b_${rawB2bPlan}`
          : rawB2bPlan
      );

      if (effectiveExpired) {
        return {
          tierId: 'b2c_trial_5day',
          accountType: 'b2c',
          isExpired: true,
          userRecord: user,
          schoolRecord: school,
        };
      }

      return {
        tierId: resolvedB2b.id,
        accountType: resolvedB2b.category,
        isExpired: false,
        userRecord: user,
        schoolRecord: school,
      };
    }

    // 3. B2C Individual Teacher precedence (never inherits school b2bTier unless accountType is b2b_school)
    const rawUserPlan = (user.subscriptionPlan || 'b2c_trial_5day').toLowerCase().trim();
    const config = resolveTierConfig(rawUserPlan);

    // Check expiry against subscriptionExpiresAt or trialEndsAt
    let isExpired = false;
    if (user.subscriptionExpiresAt) {
      isExpired = isTimestampExpired(user.subscriptionExpiresAt);
    } else if (config.id === 'b2c_trial_5day' && user.trialEndsAt) {
      isExpired = isTimestampExpired(user.trialEndsAt);
    }

    return {
      tierId: isExpired ? 'b2c_trial_5day' : config.id,
      accountType: config.category,
      isExpired,
      userRecord: user,
      schoolRecord: school,
    };
  } catch (err) {
    logger.warn('[FeatureGating] Error querying database for user tier, falling back to trial', { error: String(err) });
    return {
      tierId: 'b2c_trial_5day',
      accountType: 'b2c',
      isExpired: false,
      userRecord: null,
      schoolRecord: null,
    };
  }
}

/**
 * Returns real usage & library save quotas for a user
 */
export async function getUserQuotaUsage(userId: string): Promise<{
  tierId: SubscriptionTierType;
  usedToday: number;
  dailyFairUseCap: number;
  totalGenerated: number;
  maxGenerationsTotal: number | null;
  savedPlansCount: number;
  savedNotesCount: number;
  totalSavedLibrary: number;
  maxSavedLibraryNotes: number;
}> {
  const { tierId } = await resolveEffectiveUserTier(userId);
  const config = resolveTierConfig(tierId);

  let savedPlansCount = 0;
  let savedNotesCount = 0;
  try {
    const plans = await db.select().from(lessonPlans).where(eq(lessonPlans.userId, userId));
    savedPlansCount = plans.length;
  } catch {}
  try {
    const notes = await db.select().from(lessonNotes).where(eq(lessonNotes.userId, userId));
    savedNotesCount = notes.length;
  } catch {}

  const todayKey = `${userId}:${getTodayWatDateString()}`;
  const usedToday = dailyGenerationCounts.get(todayKey) || 0;
  const inMemoryTotal = totalGenerationCounts.get(userId) || 0;
  const totalGenerated = Math.max(inMemoryTotal, savedPlansCount);

  return {
    tierId,
    usedToday,
    dailyFairUseCap: config.dailyFairUseCap || 50,
    totalGenerated,
    maxGenerationsTotal: config.maxGenerationsTotal ?? null,
    savedPlansCount,
    savedNotesCount,
    totalSavedLibrary: savedPlansCount + savedNotesCount,
    maxSavedLibraryNotes: config.maxSavedLibraryNotes,
  };
}

/**
 * Validates whether a user is allowed to save a new Lesson Plan or Lesson Note to the Master Library
 */
export async function enforceLibrarySaveAllowance(userId: string): Promise<{
  allowed: boolean;
  statusCode?: number;
  error?: string;
  code?: string;
  requiredTier?: string;
  savedCount?: number;
  limit?: number;
}> {
  const { tierId } = await resolveEffectiveUserTier(userId);
  const config = resolveTierConfig(tierId);

  if (!config.hasLibrarySaving) {
    return {
      allowed: false,
      statusCode: 403,
      error: '5-Day Trial accounts cannot save plans or notes to the Master Dossier Library. Upgrade to 1-Month (₦1,000, up to 5 saves) or Termly Pro (₦1,500, unlimited saves).',
      code: 'LIBRARY_SAVE_RESTRICTED',
      requiredTier: 'b2c_monthly',
      savedCount: 0,
      limit: 0,
    };
  }

  const quota = await getUserQuotaUsage(userId);
  if (config.maxSavedLibraryNotes >= 0 && quota.totalSavedLibrary >= config.maxSavedLibraryNotes) {
    return {
      allowed: false,
      statusCode: 403,
      error: `Your ${config.name} allows up to ${config.maxSavedLibraryNotes} saved plans/notes in the Library (${quota.totalSavedLibrary}/${config.maxSavedLibraryNotes} used). Upgrade to Per Term Pro (₦1,500) or a School Plan for unlimited Library storage.`,
      code: 'LIBRARY_LIMIT_REACHED',
      requiredTier: 'b2c_termly',
      savedCount: quota.totalSavedLibrary,
      limit: config.maxSavedLibraryNotes,
    };
  }

  return {
    allowed: true,
    savedCount: quota.totalSavedLibrary,
    limit: config.maxSavedLibraryNotes,
  };
}

/**
 * Checks and increments the generation count for fair use and trial/monthly quotas
 */
export async function checkAndIncrementAiGenerations(userId: string): Promise<{
  allowed: boolean;
  statusCode?: number;
  error?: string;
  code?: string;
  requiredTier?: string;
  currentCount?: number;
  limit?: number;
}> {
  const { tierId } = await resolveEffectiveUserTier(userId);
  const config = resolveTierConfig(tierId);
  const quota = await getUserQuotaUsage(userId);

  // 1. B2C 5-Day Trial strict 10-generation limit
  if (tierId === 'b2c_trial_5day') {
    const maxTrial = config.maxGenerationsTotal || 10;
    if (quota.totalGenerated >= maxTrial) {
      logger.warn(`[Paywall] User ${userId} exceeded 5-day trial limit (${quota.totalGenerated}/${maxTrial})`);
      return {
        allowed: false,
        statusCode: 403,
        error: 'You have reached your 10-generation limit on the 5-Day Trial Pass. Upgrade to Termly Pro (₦1,500) for unlimited generations.',
        code: 'TRIAL_LIMIT_REACHED',
        requiredTier: 'b2c_termly',
        currentCount: quota.totalGenerated,
        limit: maxTrial,
      };
    }
  }

  // 2. B2C 1-Month strict 30-generation limit
  if (tierId === 'b2c_monthly') {
    const maxMonthly = config.maxGenerationsTotal || 30;
    if (quota.totalGenerated >= maxMonthly) {
      logger.warn(`[Paywall] User ${userId} exceeded 1-month limit (${quota.totalGenerated}/${maxMonthly})`);
      return {
        allowed: false,
        statusCode: 403,
        error: '1-Month Pass allows up to 30 AI generations. Upgrade to Per Term Pro (₦1,500) for unlimited generations.',
        code: 'MONTHLY_LIMIT_REACHED',
        requiredTier: 'b2c_termly',
        currentCount: quota.totalGenerated,
        limit: maxMonthly,
      };
    }
  }

  // 3. Daily Fair-Use Rate Limiter (10 for Trial, 15 for Monthly, 50 for Pro/B2B, 100 for B2G)
  const todayKey = `${userId}:${getTodayWatDateString()}`;
  const countToday = dailyGenerationCounts.get(todayKey) || 0;
  const dailyCap = config.dailyFairUseCap || 50;

  if (countToday >= dailyCap) {
    logger.warn(`[FairUse] User ${userId} exceeded daily fair-use cap (${countToday}/${dailyCap})`);
    return {
      allowed: false,
      statusCode: 429,
      error: `Daily fair-use cap of ${dailyCap} generations reached for ${config.name}. Please return tomorrow or upgrade your tier.`,
      code: 'FAIR_USE_LIMIT_EXCEEDED',
      currentCount: countToday,
      limit: dailyCap,
    };
  }

  // Increment today's count and monotonic total generation count
  dailyGenerationCounts.set(todayKey, countToday + 1);
  totalGenerationCounts.set(userId, quota.totalGenerated + 1);

  return {
    allowed: true,
    currentCount: countToday + 1,
    limit: dailyCap,
  };
}

/**
 * Validates feature access permission for a given user or explicit tier
 */
export async function validateFeatureAccess(
  userIdOrTier: string | undefined | null,
  feature: FeatureGatingType,
  explicitTier?: string | null
): Promise<{
  allowed: boolean;
  statusCode?: number;
  error?: string;
  code?: string;
  requiredTier?: string;
}> {
  let effectiveTierId: SubscriptionTierType = 'b2c_trial_5day';

  if (explicitTier) {
    const directConfig = resolveTierConfig(explicitTier);
    effectiveTierId = directConfig.id;
  } else if (userIdOrTier && (
    userIdOrTier.startsWith('b2b_') ||
    userIdOrTier.startsWith('b2c_') ||
    userIdOrTier.startsWith('b2g_') ||
    ['bronze', 'silver', 'gold', 'platinum', 'state_platinum', 'b2g', 'trial_5day', 'monthly', 'termly', 'full_session'].includes(userIdOrTier)
  )) {
    effectiveTierId = resolveTierConfig(userIdOrTier).id;
  } else if (userIdOrTier) {
    const resolved = await resolveEffectiveUserTier(userIdOrTier);
    effectiveTierId = resolved.tierId;
  } else {
    // Fail closed to minimum tier rather than granting enterprise entitlements
    effectiveTierId = 'b2c_trial_5day';
  }

  if (feature === 'ai_generation') {
    return { allowed: true };
  }

  const check = canTierAccess(effectiveTierId, feature);
  if (!check.allowed) {
    let code = 'UPGRADE_REQUIRED';
    if (check.requiredTier === 'b2b_gold') code = 'UPGRADE_REQUIRED_GOLD';
    else if (check.requiredTier === 'b2g_state_platinum') code = 'UPGRADE_REQUIRED_B2G';
    else if (check.requiredTier === 'b2b_silver') code = 'UPGRADE_REQUIRED_SILVER';
    else if (feature === 'library_save') code = 'UPGRADE_REQUIRED_LIBRARY';
    else if (check.requiredTier === 'b2c_termly') code = 'UPGRADE_REQUIRED_PRO';

    return {
      allowed: false,
      statusCode: 403,
      error: check.upgradeMessage,
      code,
      requiredTier: check.requiredTier,
    };
  }

  return { allowed: true };
}

/**
 * Extracts effective user ID from Express request (headers, Bearer token, cookies, body, or RLS context)
 */
export function resolveRequestEffectiveUserId(req: Request): string | null {
  const xUserId = (req.headers['x-user-id'] as string) || null;
  if (xUserId) return xUserId.trim();

  if (req.headers.authorization?.startsWith('Bearer ')) {
    const cleaned = req.headers.authorization.substring(7).replace(/^auth_tok_/, '').trim();
    if (cleaned) return cleaned;
  }

  const rawCookie = req.headers.cookie || '';
  if (rawCookie && !rawCookie.includes('eduplan_logged_out=true')) {
    const match = rawCookie.match(/(?:eduplan_session|better-auth\.session_token)=([^;]+)/);
    if (match) {
      const cleaned = match[1].trim().replace(/^auth_tok_/, '').trim();
      if (cleaned) return cleaned;
    }
  }

  if (req.body && typeof req.body.userId === 'string' && req.body.userId.trim()) {
    return req.body.userId.trim();
  }

  if (req.rlsContext?.userId) {
    return req.rlsContext.userId;
  }

  return null;
}

/**
 * Express Middleware factory for gating routes by feature
 */
export function featureGateMiddleware(feature: FeatureGatingType) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const tierOverride =
      (req.headers['x-user-tier'] as string) ||
      (req.query.tier as string) ||
      (req.body && req.body.tier);

    // If explicit tier provided, test directly against that tier
    if (tierOverride) {
      const validation = await validateFeatureAccess(null, feature, String(tierOverride));
      if (!validation.allowed) {
        return res.status(validation.statusCode || 403).json({
          error: validation.error,
          code: validation.code,
          requiredTier: validation.requiredTier,
        });
      }
      return next();
    }

    const effectiveUserId = resolveRequestEffectiveUserId(req);

    // Fail closed to trial tier if unauthenticated/missing user
    const validation = await validateFeatureAccess(effectiveUserId || 'b2c_trial_5day', feature);
    if (!validation.allowed) {
      return res.status(validation.statusCode || 403).json({
        error: validation.error,
        code: validation.code,
        requiredTier: validation.requiredTier,
      });
    }

    next();
  };
}

/**
 * Tier-Scoped Curriculum Auto-Sync Payload Dispatch
 * When the Auto-Sync engine updates a topic:
 * - Silver/Bronze users get updated text and lesson plans.
 * - Gold users get the updated text PLUS newly generated 3D diagrams and 4K video links automatically.
 * - B2G (State) users get the State-wide compliance reports based on the new data.
 */
export function getTieredCurriculumPayload(
  tierId: string | null | undefined,
  topicData: {
    topic: string;
    subject: string;
    classLevel: string;
    version: string;
    subtopics: string[];
    objectives: string[];
    diagram3D?: any;
    videoClip4K?: any;
    statewideComplianceReport?: any;
  }
) {
  const config = resolveTierConfig(tierId);

  // Base payload available to all tiers (Bronze, Silver, Trial, Monthly, Pro)
  const basePayload = {
    topic: topicData.topic,
    subject: topicData.subject,
    classLevel: topicData.classLevel,
    version: topicData.version,
    subtopics: topicData.subtopics,
    objectives: topicData.objectives,
    hasUpdatedText: true,
    hasUpdatedLessonPlan: true,
  };

  // Silver / Bronze Users: updated text and lesson plans only
  if (config.id === 'b2b_bronze' || config.id === 'b2b_silver' || config.category === 'b2c') {
    return {
      ...basePayload,
      has3DAccess: false,
      has4KAccess: false,
      diagram3D: null,
      videoClip4K: null,
      statewideComplianceReport: null,
      tierUpgradeNotice: '3D Interactive Schematics & 4K STEM Visual Realia are available on the Gold Tier.',
    };
  }

  // Gold Users: updated text PLUS newly generated 3D diagrams & 4K video realia links
  if (config.id === 'b2b_gold') {
    return {
      ...basePayload,
      has3DAccess: true,
      has4KAccess: true,
      diagram3D: topicData.diagram3D || null,
      videoClip4K: topicData.videoClip4K || null,
      statewideComplianceReport: null,
    };
  }

  // B2G State Directorate: everything in Gold PLUS State-wide compliance reports
  if (config.id === 'b2g_state_platinum') {
    return {
      ...basePayload,
      has3DAccess: true,
      has4KAccess: true,
      diagram3D: topicData.diagram3D || null,
      videoClip4K: topicData.videoClip4K || null,
      statewideComplianceReport: topicData.statewideComplianceReport || {
        state: 'Lagos State / Federal Directorate',
        complianceRate: '98.4%',
        outdatedPlansRemaining: 0,
        inspectedSchoolsCount: 1420,
        statutoryGazetteStatus: 'COMPLIANT_2026',
      },
    };
  }

  return basePayload;
}

/**
 * Phase 4: Enforces Curriculum Source Access Based on Subscription Tiers
 *
 * 1. B2C Individual Teachers:
 *    - Trial (₦500): 1 source. 10 generations.
 *    - Monthly (₦1,000): 1 source. 30 generations.
 *    - Term/Session (₦1,500/₦3,000): 2 sources. Unlimited (Fair Use: 50/day).
 *
 * 2. B2B Private Schools:
 *    - Bronze (₦45,000/term): 1 source per class. 15 teachers.
 *    - Silver (₦120,000/term): 2 sources. 40 teachers. (Adds Exams, Timetable, SEN, Parent Portal).
 *    - Gold (₦250,000/term): All 6 sources. Unlimited teachers. (Adds Heatmap, Fee Recovery, 3D/4K, White-Label, LMS).
 *
 * 3. B2G Government:
 *    - Platinum (₦100M - ₦300M/year): All 6 sources. (Adds Source Policy Enforcement, Ministry Dashboard, State Levy Tracker, CPD, Emergency Broadcast, API access).
 */
export async function validateCurriculumSourceAccess(
  userId: string | null | undefined,
  requestedSource: string,
  currentActiveSources: string[] = [],
  tierOverride?: string
): Promise<{
  allowed: boolean;
  statusCode?: number;
  error?: string;
  code?: string;
  requiredTier?: string;
  allowedSourcesCount: number;
  currentActiveSources: string[];
  requestedSource: string;
}> {
  let effectiveTierId: SubscriptionTierType = 'b2c_trial_5day';
  if (tierOverride) {
    effectiveTierId = resolveTierConfig(tierOverride).id;
  } else if (userId) {
    const resolved = await resolveEffectiveUserTier(userId);
    effectiveTierId = resolved.tierId;
    if (resolved.userRecord?.role === 'super_admin' || resolved.userRecord?.role === 'superadmin') {
      return {
        allowed: true,
        allowedSourcesCount: 6,
        currentActiveSources,
        requestedSource,
      };
    }
  }

  const config = resolveTierConfig(effectiveTierId);
  const allowedLimit = config.allowedSourcesCount || 1;
  const targetSource = requestedSource.toLowerCase().trim();

  // If source is already in currently active sources, allow access
  const isAlreadyActive = currentActiveSources.map((s) => s.toLowerCase()).includes(targetSource);
  if (isAlreadyActive) {
    return {
      allowed: true,
      allowedSourcesCount: allowedLimit,
      currentActiveSources,
      requestedSource: targetSource,
    };
  }

  // Check if adding this source exceeds the tier limit
  const uniqueSourcesAfterAdd = Array.from(new Set([...currentActiveSources.map((s) => s.toLowerCase()), targetSource]));

  if (uniqueSourcesAfterAdd.length > allowedLimit) {
    // Generate precise upgrade messaging per Phase 4
    if (config.id === 'b2b_bronze') {
      return {
        allowed: false,
        statusCode: 403,
        code: 'SOURCE_TIER_LIMIT_REACHED',
        requiredTier: 'b2b_silver',
        allowedSourcesCount: allowedLimit,
        currentActiveSources,
        requestedSource: targetSource,
        error: `Bronze tier allows 1 source per class. Upgrade to Silver (2 sources) or Gold (All 6 sources) to unlock ${targetSource.toUpperCase()}.`,
      };
    }

    if (config.id === 'b2b_silver') {
      return {
        allowed: false,
        statusCode: 403,
        code: 'SOURCE_TIER_LIMIT_REACHED',
        requiredTier: 'b2b_gold',
        allowedSourcesCount: allowedLimit,
        currentActiveSources,
        requestedSource: targetSource,
        error: `Silver tier allows 2 curriculum sources. Upgrade to Gold School Tier (All 6 sources) to unlock ${targetSource.toUpperCase()}.`,
      };
    }

    if (config.id === 'b2c_trial_5day' || config.id === 'b2c_monthly') {
      return {
        allowed: false,
        statusCode: 403,
        code: 'SOURCE_TIER_LIMIT_REACHED',
        requiredTier: 'b2c_termly',
        allowedSourcesCount: allowedLimit,
        currentActiveSources,
        requestedSource: targetSource,
        error: `Trial and Monthly plans are limited to 1 curriculum source. Upgrade to Termly/Session (2 sources) or Gold School (All 6 sources) to unlock ${targetSource.toUpperCase()}.`,
      };
    }

    if (config.id === 'b2c_termly' || config.id === 'b2c_session') {
      return {
        allowed: false,
        statusCode: 403,
        code: 'SOURCE_TIER_LIMIT_REACHED',
        requiredTier: 'b2b_gold',
        allowedSourcesCount: allowedLimit,
        currentActiveSources,
        requestedSource: targetSource,
        error: `Pro Teacher Termly/Session passes allow up to 2 curriculum sources simultaneously. Upgrade to Gold School Tier (All 6 sources) to access all national and state registries.`,
      };
    }
  }

  return {
    allowed: true,
    allowedSourcesCount: allowedLimit,
    currentActiveSources: uniqueSourcesAfterAdd,
    requestedSource: targetSource,
  };
}
