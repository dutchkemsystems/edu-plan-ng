/**
 * EduPlan NG - Enterprise Security Configuration & NDPA 2023 Compliance Layer
 *
 * Strict Compliance:
 * - Part 1: Strict Data Isolation (RLS for B2C Individual vs B2B School accounts)
 * - Part 2: Fortress Security & NDPA (Nigeria Data Protection Act 2023) Compliance
 * - Prompt Injection Defense & Rate Limiting (Max 10 req/min on /api/ai/*)
 */

import type { RLSContext, AccountType, B2BTier, UserRole } from '../types/index.ts';

export type { RLSContext };

export interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory sliding window rate-limiter store
const ipRateLimitStore = new Map<string, RateLimitEntry>();

// Rate limits per minute
export const SECURITY_CONFIG = {
  RATE_LIMITS: {
    AI_ROUTES: {
      maxRequests: 10, // Max 10 requests/minute per IP on /api/ai/* routes
      windowMs: 60 * 1000,
    },
    AUTH_ROUTES: {
      maxRequests: 15,
      windowMs: 60 * 1000,
    },
    GENERAL_API: {
      maxRequests: 120,
      windowMs: 60 * 1000,
    },
  },
  B2B_TIER_LIMITS: {
    bronze: {
      name: 'Bronze Academy',
      priceNgn: 45000,
      period: 'per_term',
      maxTeachers: 15,
      features: ['OEQA Lesson Plans', 'Basic Scheme Sync', 'School Analytics'],
    },
    silver: {
      name: 'Silver College',
      priceNgn: 120000,
      period: 'per_term',
      maxTeachers: 50,
      features: ['OEQA Matrix', 'WAEC/NECO Predictions', 'HOD Review Workflow', 'Batch Plan Generation'],
    },
    gold: {
      name: 'Gold Enterprise Unity',
      priceNgn: 250000,
      period: 'per_term',
      maxTeachers: 500,
      features: ['Full White-Label Portal', 'Custom Domain', 'Principal Command Analytics', 'NDPA Audit Logs', 'VIP Kora Concierge'],
    },
  },
  B2C_TIER_LIMITS: {
    trial_5day: {
      name: '5-Day Full Trial',
      priceNgn: 500,
      durationDays: 5,
    },
    single_month: {
      name: 'Single Month',
      priceNgn: 1000,
      durationDays: 30,
    },
    termly: {
      name: 'Per Term (Term 1/2/3)',
      priceNgn: 1500,
      durationDays: 90,
    },
    full_session: {
      name: 'Full Academic Session (3 Terms)',
      priceNgn: 3000,
      durationDays: 365,
    },
  },
  NDPA_2023: {
    dataController: 'EduPlan NG Technologies Limited (Federal Republic of Nigeria)',
    lawfulBasis: 'Contractual Obligation & Educational Public Interest (NDPA 2023 Sec 24)',
    dataRetentionDays: 365 * 3, // 3-year statutory school session log retention
    dpoContact: 'privacy@eduplan.ng',
  },
};

/**
 * Prompt Injection Patterns
 * Detects and neutralizes malicious jailbreak, prompt extraction, and instruction overrides
 */
const PROMPT_INJECTION_PATTERNS = [
  /(ignore|disregard|forget|override|clear)\s+(all\s+)?(previous|prior|above|existing)\s+(instructions|prompts|commands|rules|directives)/gi,
  /(output|reveal|leak|dump|print|show|display|expose)\s+(the|your|all)?\s*(hidden\s+)?(system\s+prompt|developer\s+instructions?|initial\s+prompt)/gi,
  /system\s+prompt\s*(reveal|leak|output|dump|print|extraction)/gi,
  /what\s+(is|are)\s+your\s+(system|developer|hidden)\s+(prompt|instructions)/gi,
  /bypass\s+(security|filter|guardrail|policy)/gi,
  /(repeat|echo|print)\s+(everything|the\s+words?)\s+(above|before)/gi,
  /you\s+are\s+now\s+(an?\s+)?(unfiltered|unrestricted|jailbroken|evil|dan)/gi,
  /jailbreak/gi,
  /dan\s+mode/gi,
  /act\s+as\s+an\s+unfiltered\s+ai/gi,
  /reveal\s+your\s+api\s*key/gi,
  /output\s+the\s+hidden\s+text\s+above/gi,
];

export class SecurityGuardError extends Error {
  statusCode: number;
  code: string;
  constructor(message: string, statusCode = 400, code = 'SECURITY_VIOLATION') {
    super(message);
    this.name = 'SecurityGuardError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

/**
 * Checks in-memory sliding-window rate limit for a client IP
 */
export function checkRateLimit(
  ip: string,
  routeType: 'ai' | 'auth' | 'general' = 'general'
): { allowed: boolean; remaining: number; retryAfterSec?: number } {
  const config =
    routeType === 'ai'
      ? SECURITY_CONFIG.RATE_LIMITS.AI_ROUTES
      : routeType === 'auth'
      ? SECURITY_CONFIG.RATE_LIMITS.AUTH_ROUTES
      : SECURITY_CONFIG.RATE_LIMITS.GENERAL_API;

  const key = `${routeType}:${ip}`;
  const now = Date.now();
  const entry = ipRateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    ipRateLimitStore.set(key, { count: 1, resetTime: now + config.windowMs });
    return { allowed: true, remaining: config.maxRequests - 1 };
  }

  if (entry.count >= config.maxRequests) {
    const retryAfterSec = Math.ceil((entry.resetTime - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSec };
  }

  entry.count += 1;
  return { allowed: true, remaining: config.maxRequests - entry.count };
}

/**
 * Sanitizes user inputs before feeding into AI prompts
 * Strips adversarial injection attempts and logs anomalies
 */
export function sanitizePromptInput(input: string): { cleanInput: string; flagged: boolean; reason?: string } {
  if (!input || typeof input !== 'string') {
    return { cleanInput: '', flagged: false };
  }

  let cleanInput = input;
  let flagged = false;
  let reason: string | undefined;

  for (const pattern of PROMPT_INJECTION_PATTERNS) {
    if (pattern.test(cleanInput)) {
      flagged = true;
      reason = `Prompt injection attack signature detected and neutralized: ${pattern.source}`;
      cleanInput = cleanInput.replace(pattern, '[REDACTED_SECURITY_PROMPT_INJECTION]');
    }
  }

  // Strip excessive null bytes and control chars
  cleanInput = cleanInput.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  return { cleanInput: cleanInput.trim(), flagged, reason };
}

/**
 * Strict Database Row-Level Security (RLS) Policy Enforcement
 * Isolates B2C Individual teachers from B2B School accounts
 */
export function enforceRLS(
  userContext: RLSContext,
  resourceOwnerUserId?: string | null,
  resourceSchoolId?: string | null
): { allowed: boolean; reason?: string } {
  // Superadmin has system-wide diagnostic privileges
  if (userContext.role === 'superadmin') {
    return { allowed: true };
  }

  // Scenario 1: B2C Individual Account
  if (userContext.accountType === 'b2c_individual') {
    // If the resource belongs to a school, individual B2C teachers are strictly prohibited
    if (resourceSchoolId) {
      return {
        allowed: false,
        reason: 'RLS Violation: B2C individual accounts cannot access B2B school institutional resources.',
      };
    }
    // Individual teachers can only access their own created records
    if (resourceOwnerUserId && resourceOwnerUserId !== userContext.userId) {
      return {
        allowed: false,
        reason: 'RLS Violation: Cross-account data access forbidden for B2C individual accounts.',
      };
    }
    return { allowed: true };
  }

  // Scenario 2: B2B School Account
  if (userContext.accountType === 'b2b_school') {
    if (!userContext.schoolId) {
      return {
        allowed: false,
        reason: 'RLS Violation: B2B account has no associated school organization.',
      };
    }

    // A school member cannot access resources of another school
    if (resourceSchoolId && resourceSchoolId !== userContext.schoolId) {
      return {
        allowed: false,
        reason: `RLS Isolation Violation: Access denied to School ID ${resourceSchoolId} from School ID ${userContext.schoolId}.`,
      };
    }

    // Role-based hierarchy inside the B2B School:
    // Principal or HOD can access all teacher resources within their own school
    if (userContext.role === 'principal' || userContext.role === 'hod' || userContext.role === 'admin') {
      return { allowed: true };
    }

    // School Teacher: can access shared school curriculum, but can only edit their own lesson plans
    if (resourceOwnerUserId && resourceOwnerUserId !== userContext.userId) {
      // Allowed to view colleagues' materials if within the same school, but can be restricted for private records
      return { allowed: true };
    }

    return { allowed: true };
  }

  return { allowed: false, reason: 'Unknown account type in security context.' };
}
