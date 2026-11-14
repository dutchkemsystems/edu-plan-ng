/**
 * EduPlan NG - Subscription Tiers, Pricing & Exact Feature Allocation Configuration
 * 
 * Strict enforcement to protect AI API margins, enforce fair-use limits,
 * and ensure clear upgrade pathways across B2C, B2B, and B2G tiers.
 */

export type SubscriptionTierType =
  | 'b2c_trial_5day'
  | 'b2c_monthly'
  | 'b2c_termly'
  | 'b2c_session'
  | 'b2b_bronze'
  | 'b2b_silver'
  | 'b2b_gold'
  | 'b2g_state_platinum';

export interface TierFeatureConfig {
  id: SubscriptionTierType;
  category: 'b2c' | 'b2b' | 'b2g';
  name: string;
  tagline: string;
  priceNgn: number;
  priceDisplay: string;
  billingCycle: '5_days' | '1_month' | 'term' | 'session' | 'year';
  durationDays: number;
  maxTeachers: number; // 1 for individual, 15 for bronze, 40 for silver, -1 for unlimited
  
  // Phase 4: Multi-Source Curriculum Allocation
  allowedSourcesCount: number; // 1 for trial/monthly/bronze, 2 for term/session/silver, 6 for gold/platinum
  sourceAccessSummary: string;
  
  // AI Generation & Fair-Use Limits
  maxGenerationsTotal?: number; // e.g. 10 for trial, 30 for monthly, null for unlimited
  dailyFairUseCap: number; // e.g. 50/day to prevent bot scraping
  
  // Feature Access Flags
  hasBasicText: boolean;
  hasNerdcAlignment: boolean;
  hasLagosUnifiedScheme: boolean;
  hasDraftWatermark: boolean; // True for 5-day trial exports
  has3DAccess: boolean;
  has4KAccess: boolean;
  hasExamGen: boolean;
  hasReportCardAi: boolean;
  hasParentAutopilot: boolean;
  hasTimetableAi: boolean;
  hasSenSupport: boolean;
  hasFeeRecovery: boolean;
  hasWhiteLabel: boolean;
  hasLibrarySaving: boolean;
  maxSavedLibraryNotes: number; // 0 for trial, 5 for monthly, -1 for unlimited
  hasBulkExports: boolean;
  hasPrincipalHeatmap: boolean;
  hasOfflinePwa: boolean;
  hasLmsExport: boolean;
  hasMinistryDashboard: boolean;
  hasDirectApiAccess: boolean;
  hasStatePolicyEnforcement: boolean;
  hasStateLevyTracker: boolean;
  hasCpdModule: boolean;
  hasEmergencyBroadcast: boolean;
  hasDedicatedAccountManager: boolean;
  
  // Upgrade messaging
  upgradeRequiredMessage?: string;
  featuresList: string[];
  restrictionsList: string[];
}

export const TIER_CONFIGURATIONS: Record<SubscriptionTierType, TierFeatureConfig> = {
  b2c_trial_5day: {
    id: 'b2c_trial_5day',
    category: 'b2c',
    name: '5-Day Trial Pass',
    tagline: 'The Test Drive',
    priceNgn: 500,
    priceDisplay: '₦500',
    billingCycle: '5_days',
    durationDays: 5,
    maxTeachers: 1,
    maxGenerationsTotal: 10,
    dailyFairUseCap: 10,
    allowedSourcesCount: 1,
    sourceAccessSummary: '1 Source (10 gens total)',
    hasBasicText: true,
    hasNerdcAlignment: true,
    hasLagosUnifiedScheme: true,
    hasDraftWatermark: true,
    has3DAccess: false,
    has4KAccess: false,
    hasExamGen: false,
    hasReportCardAi: false,
    hasParentAutopilot: false,
    hasTimetableAi: false,
    hasSenSupport: false,
    hasFeeRecovery: false,
    hasWhiteLabel: false,
    hasLibrarySaving: false,
    maxSavedLibraryNotes: 0,
    hasBulkExports: false,
    hasPrincipalHeatmap: false,
    hasOfflinePwa: true,
    hasLmsExport: false,
    hasMinistryDashboard: false,
    hasDirectApiAccess: false,
    hasStatePolicyEnforcement: false,
    hasStateLevyTracker: false,
    hasCpdModule: false,
    hasEmergencyBroadcast: false,
    hasDedicatedAccountManager: false,
    upgradeRequiredMessage: 'You have reached your 10-generation limit. Upgrade to Pro for unlimited access.',
    featuresList: [
      '1 Curriculum Source',
      '10 AI Lesson Plan generations total',
      'Basic text output & pedagogical guides',
      'Watermarked "Draft" PDF export'
    ],
    restrictionsList: [
      'Locked to 1 Curriculum Source',
      'NO 3D/4K visual aids',
      'NO WAEC/NECO exam generators',
      'NO saving to Lesson Plan Library'
    ]
  },

  b2c_monthly: {
    id: 'b2c_monthly',
    category: 'b2c',
    name: '1-Month Pass',
    tagline: 'The Monthly Basic',
    priceNgn: 1000,
    priceDisplay: '₦1,000',
    billingCycle: '1_month',
    durationDays: 30,
    maxTeachers: 1,
    maxGenerationsTotal: 30,
    dailyFairUseCap: 15,
    allowedSourcesCount: 1,
    sourceAccessSummary: '1 Source (30 gens total)',
    hasBasicText: true,
    hasNerdcAlignment: true,
    hasLagosUnifiedScheme: true,
    hasDraftWatermark: false,
    has3DAccess: false,
    has4KAccess: false,
    hasExamGen: false,
    hasReportCardAi: false,
    hasParentAutopilot: false,
    hasTimetableAi: false,
    hasSenSupport: false,
    hasFeeRecovery: false,
    hasWhiteLabel: false,
    hasLibrarySaving: true,
    maxSavedLibraryNotes: 5,
    hasBulkExports: false,
    hasPrincipalHeatmap: false,
    hasOfflinePwa: true,
    hasLmsExport: false,
    hasMinistryDashboard: false,
    hasDirectApiAccess: false,
    hasStatePolicyEnforcement: false,
    hasStateLevyTracker: false,
    hasCpdModule: false,
    hasEmergencyBroadcast: false,
    hasDedicatedAccountManager: false,
    upgradeRequiredMessage: 'Monthly plan allows up to 30 generations and 5 library saves. Upgrade to Pro for unlimited access.',
    featuresList: [
      '1 Curriculum Source',
      '30 AI Lesson Plan generations total',
      'Full text generation & chalkboard notes',
      'Standard clean PDF export (no watermark)',
      'Save up to 5 notes in Library'
    ],
    restrictionsList: [
      'Locked to 1 Curriculum Source',
      'NO 3D/4K visual aids',
      'NO WAEC/NECO exam generators',
      'Limited to 5 saved notes in Library'
    ]
  },

  b2c_termly: {
    id: 'b2c_termly',
    category: 'b2c',
    name: 'Per Term Pass',
    tagline: 'The Pro Teacher',
    priceNgn: 1500,
    priceDisplay: '₦1,500',
    billingCycle: 'term',
    durationDays: 90,
    maxTeachers: 1,
    dailyFairUseCap: 50,
    allowedSourcesCount: 2,
    sourceAccessSummary: '2 Sources simultaneously',
    hasBasicText: true,
    hasNerdcAlignment: true,
    hasLagosUnifiedScheme: true,
    hasDraftWatermark: false,
    has3DAccess: false,
    has4KAccess: false,
    hasExamGen: true,
    hasReportCardAi: true,
    hasParentAutopilot: true,
    hasTimetableAi: false,
    hasSenSupport: false,
    hasFeeRecovery: false,
    hasWhiteLabel: false,
    hasLibrarySaving: true,
    maxSavedLibraryNotes: -1,
    hasBulkExports: true,
    hasPrincipalHeatmap: false,
    hasOfflinePwa: true,
    hasLmsExport: false,
    hasMinistryDashboard: false,
    hasDirectApiAccess: false,
    hasStatePolicyEnforcement: false,
    hasStateLevyTracker: false,
    hasCpdModule: false,
    hasEmergencyBroadcast: false,
    hasDedicatedAccountManager: false,
    upgradeRequiredMessage: '3D/4K Visual Aids and Principal Heatmaps are reserved for B2B School Gold tiers.',
    featuresList: [
      '2 Curriculum Sources simultaneously',
      'Unlimited AI generations (Fair Use: 50/day)',
      'Full access to 2D diagrammatic notes',
      'WAEC & NECO exam & marking scheme generators',
      'Parent Autopilot (WhatsApp notification templates)',
      'Unlimited Library saving & bulk PDF/Word exports',
      'Report card comment generator'
    ],
    restrictionsList: [
      'Locked to 2 Sources (Upgrade to Gold School for all 6)',
      'NO Principal Heatmap',
      'NO 3D/4K video aids (reserved for B2B Gold to force school upgrades)'
    ]
  },

  b2c_session: {
    id: 'b2c_session',
    category: 'b2c',
    name: 'Full Session Pass',
    tagline: 'The Pro Teacher (Annual)',
    priceNgn: 3000,
    priceDisplay: '₦3,000',
    billingCycle: 'session',
    durationDays: 365,
    maxTeachers: 1,
    dailyFairUseCap: 50,
    allowedSourcesCount: 2,
    sourceAccessSummary: '2 Sources simultaneously',
    hasBasicText: true,
    hasNerdcAlignment: true,
    hasLagosUnifiedScheme: true,
    hasDraftWatermark: false,
    has3DAccess: false,
    has4KAccess: false,
    hasExamGen: true,
    hasReportCardAi: true,
    hasParentAutopilot: true,
    hasTimetableAi: false,
    hasSenSupport: false,
    hasFeeRecovery: false,
    hasWhiteLabel: false,
    hasLibrarySaving: true,
    maxSavedLibraryNotes: -1,
    hasBulkExports: true,
    hasPrincipalHeatmap: false,
    hasOfflinePwa: true,
    hasLmsExport: false,
    hasMinistryDashboard: false,
    hasDirectApiAccess: false,
    hasStatePolicyEnforcement: false,
    hasStateLevyTracker: false,
    hasCpdModule: false,
    hasEmergencyBroadcast: false,
    hasDedicatedAccountManager: false,
    upgradeRequiredMessage: '3D/4K Visual Aids and Principal Heatmaps are reserved for B2B School Gold tiers.',
    featuresList: [
      'Covers all 3 terms (Term 1 + 2 + 3) with ₦1,500 savings',
      '2 Curriculum Sources simultaneously',
      'Unlimited AI generations (Fair Use: 50/day)',
      'Full access to 2D diagrammatic notes',
      'WAEC & NECO exam generators',
      'Parent Autopilot WhatsApp templates',
      'Unlimited Library saving & bulk exports'
    ],
    restrictionsList: [
      'Locked to 2 Sources (Upgrade to Gold School for all 6)',
      'NO Principal Heatmap',
      'NO 3D/4K video aids (reserved for B2B Gold to force school upgrades)'
    ]
  },

  b2b_bronze: {
    id: 'b2b_bronze',
    category: 'b2b',
    name: 'Bronze School Tier',
    tagline: 'The Starter School',
    priceNgn: 45000,
    priceDisplay: '₦45,000',
    billingCycle: 'term',
    durationDays: 105,
    maxTeachers: 15,
    dailyFairUseCap: 50,
    allowedSourcesCount: 1,
    sourceAccessSummary: '1 Source per class',
    hasBasicText: true,
    hasNerdcAlignment: true,
    hasLagosUnifiedScheme: true,
    hasDraftWatermark: false,
    has3DAccess: false,
    has4KAccess: false,
    hasExamGen: false,
    hasReportCardAi: false,
    hasParentAutopilot: false,
    hasTimetableAi: false,
    hasSenSupport: false,
    hasFeeRecovery: false,
    hasWhiteLabel: false,
    hasLibrarySaving: true,
    maxSavedLibraryNotes: -1,
    hasBulkExports: true,
    hasPrincipalHeatmap: false,
    hasOfflinePwa: true,
    hasLmsExport: false,
    hasMinistryDashboard: false,
    hasDirectApiAccess: false,
    hasStatePolicyEnforcement: false,
    hasStateLevyTracker: false,
    hasCpdModule: false,
    hasEmergencyBroadcast: false,
    hasDedicatedAccountManager: false,
    upgradeRequiredMessage: 'Bronze tier allows 1 source per class. Upgrade to Silver (2 sources) or Gold (All 6 sources) to unlock more.',
    featuresList: [
      '1 Source per class (Standardizes scheme across arms)',
      'Up to 15 teacher accounts with individual logins',
      'Unlimited AI Lesson Plans for all 15 teachers (Fair Use: 50/day)',
      'Centralized school billing & broadsheet records'
    ],
    restrictionsList: [
      'Limited to 1 Source per class (Upgrade to Silver or Gold)',
      'NO Exam Generators',
      'NO Timetable or SEN Modules',
      'NO Parent Portal',
      'NO Principal Heatmap',
      'NO 3D/4K Visual Aids'
    ]
  },

  b2b_silver: {
    id: 'b2b_silver',
    category: 'b2b',
    name: 'Silver School Tier',
    tagline: 'The Academic School',
    priceNgn: 120000,
    priceDisplay: '₦120,000',
    billingCycle: 'term',
    durationDays: 105,
    maxTeachers: 40,
    dailyFairUseCap: 50,
    allowedSourcesCount: 2,
    sourceAccessSummary: '2 Sources simultaneously',
    hasBasicText: true,
    hasNerdcAlignment: true,
    hasLagosUnifiedScheme: true,
    hasDraftWatermark: false,
    has3DAccess: false,
    has4KAccess: false,
    hasExamGen: true,
    hasReportCardAi: true,
    hasParentAutopilot: true,
    hasTimetableAi: true,
    hasSenSupport: true,
    hasFeeRecovery: false,
    hasWhiteLabel: false,
    hasLibrarySaving: true,
    maxSavedLibraryNotes: -1,
    hasBulkExports: true,
    hasPrincipalHeatmap: false,
    hasOfflinePwa: true,
    hasLmsExport: false,
    hasMinistryDashboard: false,
    hasDirectApiAccess: false,
    hasStatePolicyEnforcement: false,
    hasStateLevyTracker: false,
    hasCpdModule: false,
    hasEmergencyBroadcast: false,
    hasDedicatedAccountManager: false,
    upgradeRequiredMessage: 'Silver tier includes 2 sources. Upgrade to Gold School Tier (All 6 sources) to unlock all curriculum registries.',
    featuresList: [
      '2 Curriculum Sources across all departments',
      'Up to 40 teacher accounts',
      'Everything in Bronze included',
      'Exam & Marking Scheme Generators (WAEC/NECO/BECE)',
      'Master Timetable Generator AI',
      'Special Educational Needs (SEN / Differentiated IEP) Engine',
      'Parent Portal & Autopilot (WhatsApp / SMS)'
    ],
    restrictionsList: [
      'Limited to 2 Sources (Upgrade to Gold for all 6 sources)',
      'NO Principal Heatmap',
      'NO Fee Recovery Engine',
      'NO 3D/4K Visual Aids',
      'NO White-Label Custom Domain'
    ]
  },

  b2b_gold: {
    id: 'b2b_gold',
    category: 'b2b',
    name: 'Gold School Tier',
    tagline: 'The Elite School',
    priceNgn: 250000,
    priceDisplay: '₦250,000',
    billingCycle: 'term',
    durationDays: 105,
    maxTeachers: -1, // Unlimited
    dailyFairUseCap: 50,
    allowedSourcesCount: 6,
    sourceAccessSummary: 'All 6 Sources Unlocked',
    hasBasicText: true,
    hasNerdcAlignment: true,
    hasLagosUnifiedScheme: true,
    hasDraftWatermark: false,
    has3DAccess: true,
    has4KAccess: true,
    hasExamGen: true,
    hasReportCardAi: true,
    hasParentAutopilot: true,
    hasTimetableAi: true,
    hasSenSupport: true,
    hasFeeRecovery: true,
    hasWhiteLabel: true,
    hasLibrarySaving: true,
    maxSavedLibraryNotes: -1,
    hasBulkExports: true,
    hasPrincipalHeatmap: true,
    hasOfflinePwa: true,
    hasLmsExport: true,
    hasMinistryDashboard: false,
    hasDirectApiAccess: false,
    hasStatePolicyEnforcement: false,
    hasStateLevyTracker: false,
    hasCpdModule: false,
    hasEmergencyBroadcast: false,
    hasDedicatedAccountManager: true,
    featuresList: [
      'All 6 Curriculum Sources Unlocked: NERDC, Lagos, OEQA, BECE, WAEC, NECO',
      'Unlimited teacher accounts across all departments',
      'Everything in Silver included (Exams, Timetable, SEN, Parent Portal)',
      'Principal Multi-Source Compliance Heatmap & Outdated Syllabus Detector',
      'Automated Tuition Fee Recovery & Parent Arrears Engine',
      'Full access to 2D/3D Interactive Lab & 4K STEM Visual Aids',
      'White-Label Portal (Custom School Subdomain & Watermark)',
      'LMS Exports (Google Classroom / Canvas / Edmodo format)',
      'Dedicated EdTech Account Manager & Priority WhatsApp Support'
    ],
    restrictionsList: []
  },

  b2g_state_platinum: {
    id: 'b2g_state_platinum',
    category: 'b2g',
    name: 'State-Wide Platinum',
    tagline: 'Ministry & State Directorate',
    priceNgn: 150000000,
    priceDisplay: '₦100M – ₦300M / Year',
    billingCycle: 'year',
    durationDays: 365,
    maxTeachers: -1, // Unlimited across state
    dailyFairUseCap: 100,
    allowedSourcesCount: 6,
    sourceAccessSummary: 'All 6 Sources (State-Wide Sovereign Access)',
    hasBasicText: true,
    hasNerdcAlignment: true,
    hasLagosUnifiedScheme: true,
    hasDraftWatermark: false,
    has3DAccess: true,
    has4KAccess: true,
    hasExamGen: true,
    hasReportCardAi: true,
    hasParentAutopilot: true,
    hasTimetableAi: true,
    hasSenSupport: true,
    hasFeeRecovery: true,
    hasWhiteLabel: true,
    hasLibrarySaving: true,
    maxSavedLibraryNotes: -1,
    hasBulkExports: true,
    hasPrincipalHeatmap: true,
    hasOfflinePwa: true,
    hasLmsExport: true,
    hasMinistryDashboard: true,
    hasDirectApiAccess: true,
    hasStatePolicyEnforcement: true,
    hasStateLevyTracker: true,
    hasCpdModule: true,
    hasEmergencyBroadcast: true,
    hasDedicatedAccountManager: true,
    featuresList: [
      'All 6 Curriculum Sources with Sovereign State-Wide Access',
      'Unlimited public and private schools and teachers across the state',
      'State Ministry Command Dashboard (RLS Isolated Telemetry)',
      'Statutory Source Policy Enforcement (e.g. Mandate Lagos Unified Scheme)',
      'State Education Levy & Accreditation Revenue Tracker',
      'Continuing Professional Development (CPD) State Teacher Certification Tracker',
      'Civil Emergency & Weather Broadcast Engine (Instant School Closures via SMS/Push)',
      'Direct Gov API Access (Push statutory syllabus updates directly into EduPlan NG)',
      'Everything in Gold unlocked state-wide',
      'Dedicated Account Manager, sovereign SLA & custom server deployment'
    ],
    restrictionsList: []
  }
};

/**
 * Normalizes input tier string to valid SubscriptionTierType
 */
export function resolveTierConfig(tierString?: string | null): TierFeatureConfig {
  if (!tierString) {
    return TIER_CONFIGURATIONS.b2c_trial_5day;
  }
  const clean = tierString.toLowerCase().trim();
  
  // Exact match check
  if (TIER_CONFIGURATIONS[clean as SubscriptionTierType]) {
    return TIER_CONFIGURATIONS[clean as SubscriptionTierType];
  }
  
  // Fuzzy alias matching
  if (clean.includes('gold')) return TIER_CONFIGURATIONS.b2b_gold;
  if (clean.includes('silver')) return TIER_CONFIGURATIONS.b2b_silver;
  if (clean.includes('bronze')) return TIER_CONFIGURATIONS.b2b_bronze;
  if (clean.includes('state') || clean.includes('ministry') || clean.includes('b2g')) return TIER_CONFIGURATIONS.b2g_state_platinum;
  if (clean.includes('session') || clean.includes('year') || clean.includes('3000')) return TIER_CONFIGURATIONS.b2c_session;
  if (clean.includes('term') || clean.includes('1500') || clean.includes('pro')) return TIER_CONFIGURATIONS.b2c_termly;
  if (clean.includes('month') || clean.includes('1000')) return TIER_CONFIGURATIONS.b2c_monthly;
  if (clean.includes('trial') || clean.includes('500') || clean.includes('5_day')) return TIER_CONFIGURATIONS.b2c_trial_5day;

  return TIER_CONFIGURATIONS.b2c_trial_5day;
}

export type PricingFeatureKey =
  | '3d_visual_aid'
  | '4k_stem_video'
  | 'exam_generator'
  | 'report_card_ai'
  | 'parent_autopilot'
  | 'principal_heatmap'
  | 'timetable_ai'
  | 'sen_module'
  | 'fee_recovery'
  | 'white_label'
  | 'library_save'
  | 'bulk_export'
  | 'lms_export'
  | 'ministry_dashboard'
  | 'state_policy_enforcement'
  | 'state_levy_tracker'
  | 'cpd_module'
  | 'emergency_broadcast'
  | 'ministry_api';

/**
 * Checks whether a tier allows a specific feature action
 */
export function canTierAccess(
  tierId: string | null | undefined,
  feature: PricingFeatureKey
): { allowed: boolean; requiredTier: string; upgradeMessage: string } {
  const config = resolveTierConfig(tierId);

  switch (feature) {
    case '3d_visual_aid':
    case '4k_stem_video':
      if (config.has3DAccess || config.has4KAccess) {
        return { allowed: true, requiredTier: 'b2b_gold', upgradeMessage: '' };
      }
      return {
        allowed: false,
        requiredTier: 'b2b_gold',
        upgradeMessage: '3D Interactive Visual Laboratories & 4K STEM Aids are reserved exclusively for Gold School (₦250,000/term) and State Ministry Platinum tiers.'
      };

    case 'principal_heatmap':
      if (config.hasPrincipalHeatmap) {
        return { allowed: true, requiredTier: 'b2b_gold', upgradeMessage: '' };
      }
      return {
        allowed: false,
        requiredTier: 'b2b_gold',
        upgradeMessage: 'Principal Multi-Source Compliance Heatmap is an executive supervisory feature available on Gold School Tier (₦250,000/term).'
      };

    case 'fee_recovery':
      if (config.hasFeeRecovery) {
        return { allowed: true, requiredTier: 'b2b_gold', upgradeMessage: '' };
      }
      return {
        allowed: false,
        requiredTier: 'b2b_gold',
        upgradeMessage: 'Automated Tuition Fee Recovery & Arrears Engine is reserved for Gold School Tier (₦250,000/term).'
      };

    case 'white_label':
      if (config.hasWhiteLabel) {
        return { allowed: true, requiredTier: 'b2b_gold', upgradeMessage: '' };
      }
      return {
        allowed: false,
        requiredTier: 'b2b_gold',
        upgradeMessage: 'White-Label School Portals & Custom Watermarking are reserved for Gold School Tier (₦250,000/term).'
      };

    case 'lms_export':
      if (config.hasLmsExport) {
        return { allowed: true, requiredTier: 'b2b_gold', upgradeMessage: '' };
      }
      return {
        allowed: false,
        requiredTier: 'b2b_gold',
        upgradeMessage: 'Direct Google Classroom & LMS Exports are reserved for Gold School Tier (₦250,000/term).'
      };

    case 'exam_generator':
      if (config.hasExamGen) {
        return { allowed: true, requiredTier: 'b2c_termly', upgradeMessage: '' };
      }
      return {
        allowed: false,
        requiredTier: config.category === 'b2b' ? 'b2b_silver' : 'b2c_termly',
        upgradeMessage: 'WAEC/NECO/BECE Exam and Marking Scheme Generators require Pro Teacher (Termly/Session) or School Silver/Gold tiers.'
      };

    case 'report_card_ai':
      if (config.hasReportCardAi) {
        return { allowed: true, requiredTier: 'b2c_termly', upgradeMessage: '' };
      }
      return {
        allowed: false,
        requiredTier: config.category === 'b2b' ? 'b2b_silver' : 'b2c_termly',
        upgradeMessage: 'AI Report Card Comment Generators require Pro Teacher (Termly/Session) or School Silver/Gold tiers.'
      };

    case 'parent_autopilot':
      if (config.hasParentAutopilot) {
        return { allowed: true, requiredTier: 'b2c_termly', upgradeMessage: '' };
      }
      return {
        allowed: false,
        requiredTier: config.category === 'b2b' ? 'b2b_silver' : 'b2c_termly',
        upgradeMessage: 'Parent Portal & WhatsApp Autopilot requires Pro Teacher (Termly/Session) or School Silver/Gold tiers.'
      };

    case 'timetable_ai':
      if (config.hasTimetableAi) {
        return { allowed: true, requiredTier: 'b2b_silver', upgradeMessage: '' };
      }
      return {
        allowed: false,
        requiredTier: 'b2b_silver',
        upgradeMessage: 'Master Timetable Generator AI is available exclusively on School Silver (₦120,000/term), Gold, and State Ministry tiers.'
      };

    case 'sen_module':
      if (config.hasSenSupport) {
        return { allowed: true, requiredTier: 'b2b_silver', upgradeMessage: '' };
      }
      return {
        allowed: false,
        requiredTier: 'b2b_silver',
        upgradeMessage: 'Special Educational Needs (SEN / Differentiated IEP) Module is available on School Silver (₦120,000/term), Gold, and State Ministry tiers.'
      };

    case 'library_save':
      if (config.hasLibrarySaving) {
        return { allowed: true, requiredTier: 'b2c_monthly', upgradeMessage: '' };
      }
      return {
        allowed: false,
        requiredTier: 'b2c_monthly',
        upgradeMessage: 'Saving lesson notes and plans to your Master Dossier Library requires at least a 1-Month Pass (₦1,000), Termly Pro, or School plan.'
      };

    case 'bulk_export':
      if (config.hasBulkExports) {
        return { allowed: true, requiredTier: 'b2c_termly', upgradeMessage: '' };
      }
      return {
        allowed: false,
        requiredTier: config.category === 'b2b' ? 'b2b_bronze' : 'b2c_termly',
        upgradeMessage: 'Bulk 13-Week Portfolio & PDF/Word Term Exports require Pro Teacher (Termly/Session) or any B2B School plan.'
      };

    case 'ministry_dashboard':
      if (config.hasMinistryDashboard) {
        return { allowed: true, requiredTier: 'b2g_state_platinum', upgradeMessage: '' };
      }
      return {
        allowed: false,
        requiredTier: 'b2g_state_platinum',
        upgradeMessage: 'State Ministry Command Dashboard is restricted to B2G State Directorate Platinum licenses.'
      };

    case 'state_policy_enforcement':
      if (config.hasStatePolicyEnforcement) {
        return { allowed: true, requiredTier: 'b2g_state_platinum', upgradeMessage: '' };
      }
      return {
        allowed: false,
        requiredTier: 'b2g_state_platinum',
        upgradeMessage: 'Statutory State Curriculum Policy Enforcement is restricted to B2G State Directorate Platinum licenses.'
      };

    case 'state_levy_tracker':
      if (config.hasStateLevyTracker) {
        return { allowed: true, requiredTier: 'b2g_state_platinum', upgradeMessage: '' };
      }
      return {
        allowed: false,
        requiredTier: 'b2g_state_platinum',
        upgradeMessage: 'State Education Levy & Accreditation Tracker is restricted to B2G State Directorate Platinum licenses.'
      };

    case 'cpd_module':
      if (config.hasCpdModule) {
        return { allowed: true, requiredTier: 'b2g_state_platinum', upgradeMessage: '' };
      }
      return {
        allowed: false,
        requiredTier: 'b2g_state_platinum',
        upgradeMessage: 'State Teacher CPD Certification Module is restricted to B2G State Directorate Platinum licenses.'
      };

    case 'emergency_broadcast':
      if (config.hasEmergencyBroadcast) {
        return { allowed: true, requiredTier: 'b2g_state_platinum', upgradeMessage: '' };
      }
      return {
        allowed: false,
        requiredTier: 'b2g_state_platinum',
        upgradeMessage: 'Civil Emergency & Weather Broadcast Engine is restricted to B2G State Directorate Platinum licenses.'
      };

    case 'ministry_api':
      if (config.hasDirectApiAccess) {
        return { allowed: true, requiredTier: 'b2g_state_platinum', upgradeMessage: '' };
      }
      return {
        allowed: false,
        requiredTier: 'b2g_state_platinum',
        upgradeMessage: 'Sovereign Direct Gov API access is restricted to B2G State Directorate Platinum licenses.'
      };

    default:
      return { allowed: true, requiredTier: '', upgradeMessage: '' };
  }
}

export interface ClientTierSummary {
  tierId: SubscriptionTierType;
  config: TierFeatureConfig;
  category: 'b2c' | 'b2b' | 'b2g';
  segmentLabel: string;
  isExpired: boolean;
  isTrial: boolean;
  daysRemaining: number;
  usedToday: number;
  dailyFairUseCap: number;
  totalGenerated: number;
  maxGenerationsTotal: number | null;
  savedNotesCount: number;
  maxSavedLibraryNotes: number;
  canGenerateMore: boolean;
  canSaveMoreToLibrary: boolean;
}

/**
 * Browser-safe resolver used across Dashboard, Sidebar, Navbar, Pricing, and all Service pages
 * so client entitlements strictly match backend subscription state.
 */
export function resolveClientTierSummary(
  user?: {
    accountType?: string | null;
    b2bTier?: string | null;
    subscriptionPlan?: string | null;
    subscriptionExpiresAt?: string | null;
    trialEndsAt?: string | null;
    tierId?: string | null;
    quotaUsage?: {
      usedToday?: number;
      dailyFairUseCap?: number;
      totalGenerated?: number;
      maxGenerationsTotal?: number | null;
      savedNotesCount?: number;
      maxSavedLibraryNotes?: number;
    };
  } | null,
  stats?: {
    totalPlans?: number;
    subscription?: {
      plan?: string | null;
      tierId?: string | null;
      expiryDate?: string | null;
      daysRemaining?: number;
      usedToday?: number;
      totalGenerated?: number;
      savedNotesCount?: number;
    };
  } | null
): ClientTierSummary {
  const sub = stats?.subscription;
  let candidateTier: string | null | undefined =
    user?.tierId ||
    sub?.tierId ||
    null;

  if (!candidateTier) {
    if (user?.accountType === 'b2g_government') {
      candidateTier = 'b2g_state_platinum';
    } else if (user?.accountType === 'b2b_school') {
      candidateTier = user?.b2bTier || user?.subscriptionPlan || sub?.plan || 'b2b_bronze';
    } else if (user) {
      candidateTier = user?.subscriptionPlan || sub?.plan || 'b2c_trial_5day';
    } else if (sub?.plan) {
      candidateTier = sub.plan;
    } else {
      candidateTier = 'b2c_trial_5day';
    }
  }

  let resolvedConfig = resolveTierConfig(candidateTier);
  let isExpired = false;

  const expiryRaw = user?.subscriptionExpiresAt || sub?.expiryDate;
  if (expiryRaw) {
    const expiryMs = new Date(expiryRaw).getTime();
    if (!isNaN(expiryMs) && Date.now() > expiryMs) {
      isExpired = true;
      resolvedConfig = TIER_CONFIGURATIONS.b2c_trial_5day;
    }
  }

  const daysRemaining =
    sub?.daysRemaining ??
    (expiryRaw
      ? Math.max(0, Math.ceil((new Date(expiryRaw).getTime() - Date.now()) / (1000 * 3600 * 24)))
      : resolvedConfig.durationDays);

  const usedToday = user?.quotaUsage?.usedToday ?? sub?.usedToday ?? 0;
  const totalGenerated = user?.quotaUsage?.totalGenerated ?? sub?.totalGenerated ?? stats?.totalPlans ?? 0;
  const savedNotesCount = user?.quotaUsage?.savedNotesCount ?? sub?.savedNotesCount ?? stats?.totalPlans ?? 0;
  const maxGenerationsTotal = resolvedConfig.maxGenerationsTotal ?? null;
  const maxSavedLibraryNotes = resolvedConfig.maxSavedLibraryNotes;

  const segmentLabel =
    resolvedConfig.category === 'b2g'
      ? 'B2G State Ministry Directorate'
      : resolvedConfig.category === 'b2b'
      ? 'B2B Private School'
      : 'B2C Individual Teacher';

  const withinDaily = usedToday < resolvedConfig.dailyFairUseCap;
  const withinTotal = maxGenerationsTotal === null || totalGenerated < maxGenerationsTotal;

  return {
    tierId: resolvedConfig.id,
    config: resolvedConfig,
    category: resolvedConfig.category,
    segmentLabel,
    isExpired,
    isTrial: resolvedConfig.id === 'b2c_trial_5day',
    daysRemaining,
    usedToday,
    dailyFairUseCap: resolvedConfig.dailyFairUseCap,
    totalGenerated,
    maxGenerationsTotal,
    savedNotesCount,
    maxSavedLibraryNotes,
    canGenerateMore: withinDaily && withinTotal,
    canSaveMoreToLibrary:
      resolvedConfig.hasLibrarySaving &&
      (maxSavedLibraryNotes < 0 || savedNotesCount < maxSavedLibraryNotes),
  };
}

