export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number; // in NGN
  priceDisplay: string;
  periodLabel: string;
  durationDays: number;
  category: 'b2c' | 'b2b' | 'b2g';
  badge?: string;
  popular?: boolean;
  savings?: string;
  description: string;
  allowedSourcesCount: number; // 1 for trial/monthly/bronze, 2 for term/session/silver, 6 for gold/platinum
  sourceAccessSummary: string;
  features: string[];
  restrictions: string[];
  maxTeachers: number; // 1 for individual, 15 for bronze, 40 for silver, -1 for unlimited
  maxGenerationsTotal?: number; // 10 for trial, 30 for monthly, undefined for unlimited
  dailyFairUseCap: number; // 50/day standard
  ctaText: string;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'b2c_trial_5day',
    name: '5-Day Trial ("The Test Drive")',
    price: 500,
    priceDisplay: '₦500',
    periodLabel: '5 Days Access',
    durationDays: 5,
    category: 'b2c',
    maxTeachers: 1,
    maxGenerationsTotal: 10,
    dailyFairUseCap: 10,
    allowedSourcesCount: 1,
    sourceAccessSummary: '1 Curriculum Source (e.g. Lagos Scheme or NERDC)',
    description: 'Sprint test-drive for weekly lesson prep, interview demonstrations, and NERDC syllabus testing.',
    features: [
      '1 Curriculum Source of your choice',
      '10 AI Lesson Plan generations total',
      'Basic text output & pedagogical guides',
      'Watermarked "Draft" PDF export',
    ],
    restrictions: [
      'Locked to 1 Curriculum Source (Upgrade for 2 or All 6)',
      'NO 3D/4K Visual Aids',
      'NO WAEC/NECO Exam Generators',
      'NO saving to Master Dossier Library (Drafts only)',
    ],
    ctaText: 'Start 5-Day Trial (₦500)',
  },
  {
    id: 'b2c_monthly',
    name: '1-Month ("The Monthly Basic")',
    price: 1000,
    priceDisplay: '₦1,000',
    periodLabel: '30 Days Access',
    durationDays: 30,
    category: 'b2c',
    maxTeachers: 1,
    maxGenerationsTotal: 30,
    dailyFairUseCap: 15,
    allowedSourcesCount: 1,
    sourceAccessSummary: '1 Curriculum Source',
    description: 'Month-to-month teaching support for teachers during mid-terms and continuous assessment cycles.',
    features: [
      '1 Curriculum Source of your choice',
      '30 AI Lesson Plan generations (approx. 1 per school day)',
      'Full text generation & chalkboard lesson notes',
      'Quick-Select curriculum widget',
      'Standard clean PDF export (no draft watermark)',
      'Save up to 5 notes in Master Dossier Library',
    ],
    restrictions: [
      'Locked to 1 Curriculum Source (Upgrade for 2 or All 6)',
      'NO 3D/4K Visual Aids',
      'NO WAEC/NECO Exam Generators',
      'Limited to 5 saved notes in Library',
    ],
    ctaText: 'Subscribe Monthly (₦1,000)',
  },
  {
    id: 'b2c_termly',
    name: 'Per Term ("The Pro Teacher")',
    price: 1500,
    priceDisplay: '₦1,500',
    periodLabel: 'Full Term (~90 Days)',
    durationDays: 90,
    category: 'b2c',
    maxTeachers: 1,
    dailyFairUseCap: 50,
    allowedSourcesCount: 2,
    sourceAccessSummary: '2 Curriculum Sources (e.g. Lagos Scheme + WAEC)',
    popular: true,
    badge: 'Recommended for Teachers',
    description: 'Complete 13-week academic term coverage with full pedagogical tools and dual curriculum access.',
    features: [
      '2 Curriculum Sources simultaneously (e.g. Lagos Scheme + WAEC)',
      'Unlimited AI generations (Fair Use cap: max 50/day)',
      '2D diagrammatic notes & illustrations',
      'WAEC & NECO exam & marking scheme generators',
      'Parent Autopilot (WhatsApp notification templates)',
      'Unlimited Library saving & bulk PDF/Word exports',
      'Report card comment generator',
    ],
    restrictions: [
      'Locked to 2 Curriculum Sources (Gold School Tier unlocks all 6)',
      'NO Principal Heatmap (School B2B only)',
      'NO 3D/4K video aids (reserved for B2B Gold to force school upgrades)',
    ],
    ctaText: 'Subscribe for Term (₦1,500)',
  },
  {
    id: 'b2c_session',
    name: 'Full Session ("The Pro Teacher - Annual")',
    price: 3000,
    priceDisplay: '₦3,000',
    periodLabel: '365 Days • All 3 Terms',
    durationDays: 365,
    category: 'b2c',
    maxTeachers: 1,
    dailyFairUseCap: 50,
    allowedSourcesCount: 2,
    sourceAccessSummary: '2 Curriculum Sources (e.g. Lagos Scheme + WAEC)',
    badge: 'Best Annual Value',
    savings: 'Save ₦1,500 vs paying per term (covers Term 1 + 2 + 3)',
    description: 'All-inclusive full session coverage covering First, Second, and Third terms with maximum savings.',
    features: [
      'Covers all 3 terms: Term 1 + Term 2 + Term 3',
      '2 Curriculum Sources simultaneously',
      'Unlimited AI generations (Fair Use cap: max 50/day)',
      'Full access to 2D diagrammatic notes & charts',
      'WAEC & NECO examination predictor engine',
      'Parent Autopilot WhatsApp broadcast templates',
      'Unlimited Library saving & bulk exports',
      'Save ₦1,500 vs paying termly',
    ],
    restrictions: [
      'Locked to 2 Curriculum Sources (Gold School Tier unlocks all 6)',
      'NO Principal Heatmap (School B2B only)',
      'NO 3D/4K video aids (reserved for B2B Gold to force school upgrades)',
    ],
    ctaText: 'Get Full Session (₦3,000)',
  },
];

export const B2B_SCHOOL_PLANS: SubscriptionPlan[] = [
  {
    id: 'b2b_bronze',
    name: 'Bronze ("The Starter School")',
    price: 45000,
    priceDisplay: '₦45,000',
    periodLabel: 'Per Term • Up to 15 Teachers',
    durationDays: 105,
    category: 'b2b',
    maxTeachers: 15,
    dailyFairUseCap: 50,
    allowedSourcesCount: 1,
    sourceAccessSummary: '1 Source per Class (e.g. Lagos Unified Scheme)',
    badge: 'Starter School',
    description: 'Designed for private academies and community schools standardizing unified statutory lesson plans.',
    features: [
      '1 Source per Class (Standardizes Lagos Scheme or NERDC across classes)',
      'Up to 15 teacher accounts with individual logins',
      'Unlimited AI Lesson Plans for all 15 teachers (Fair Use: 50/day)',
      'School broadsheet report card export',
      'Centralized school billing & virtual NUBAN',
    ],
    restrictions: [
      'Limited to 1 Source per class (Upgrade to Silver for 2 or Gold for All 6)',
      'NO Exam Generators',
      'NO Timetable or SEN Modules',
      'NO Parent Portal',
      'NO Principal Heatmap',
      'NO 3D/4K Visual Aids',
    ],
    ctaText: 'Activate Bronze (₦45,000 / Term)',
  },
  {
    id: 'b2b_silver',
    name: 'Silver ("The Academic School")',
    price: 120000,
    priceDisplay: '₦120,000',
    periodLabel: 'Per Term • Up to 40 Teachers',
    durationDays: 105,
    category: 'b2b',
    maxTeachers: 40,
    dailyFairUseCap: 50,
    allowedSourcesCount: 2,
    sourceAccessSummary: '2 Curriculum Sources (e.g. Lagos Scheme + WAEC)',
    popular: true,
    badge: 'Popular for Colleges',
    description: 'Comprehensive academic suite for established private colleges and multi-arm secondary schools.',
    features: [
      '2 Curriculum Sources across all departments (e.g. Lagos Scheme + WAEC)',
      'Up to 40 teacher accounts with department oversight',
      'Everything in Bronze included',
      'WAEC, NECO & BECE Exam & Marking Scheme Generators',
      'Automated Master Timetable Generator AI',
      'Special Educational Needs (SEN / Differentiated IEP) Engine',
      'Parent Portal & Autopilot (WhatsApp & SMS broadcasting)',
      'Priority curriculum synchronization alerts',
    ],
    restrictions: [
      'Limited to 2 Sources (Upgrade to Gold for all 6 sources)',
      'NO Principal Heatmap',
      'NO Fee Recovery Engine',
      'NO 3D/4K Visual Aids',
      'NO White-Label Custom Domain',
    ],
    ctaText: 'Activate Silver (₦120,000 / Term)',
  },
  {
    id: 'b2b_gold',
    name: 'Gold ("The Elite School")',
    price: 250000,
    priceDisplay: '₦250,000',
    periodLabel: 'Per Term • Unlimited Teachers',
    durationDays: 105,
    category: 'b2b',
    maxTeachers: -1, // Unlimited
    dailyFairUseCap: 50,
    allowedSourcesCount: 6,
    sourceAccessSummary: 'All 6 Curriculum Sources (NERDC, Lagos, OEQA, BECE, WAEC, NECO)',
    badge: 'The Elite School',
    description: 'Full institutional power for premier private school networks and Federal Unity Colleges.',
    features: [
      'All 6 Curriculum Sources Unlocked: NERDC, Lagos Scheme, OEQA, BECE, WAEC, NECO',
      'Unlimited teacher accounts across all departments',
      'Everything in Silver included (Exams, Timetable, SEN, Parent Portal)',
      'Principal Multi-Source Compliance Heatmap & Outdated Syllabus Detector',
      'Automated Tuition Fee Recovery & Parent Arrears Engine',
      'Interactive 2D/3D Science Schematics & 4K STEM Realia Video Aids',
      'White-Label Portal (Custom School Subdomain & Statutory Watermark)',
      'LMS Exports (Google Classroom / Canvas / Edmodo format)',
      'Dedicated EdTech Account Manager & Priority WhatsApp Support',
    ],
    restrictions: [],
    ctaText: 'Deploy Gold Elite (₦250,000 / Term)',
  },
];

export const B2G_GOVERNMENT_PLANS: SubscriptionPlan[] = [
  {
    id: 'b2g_state_platinum',
    name: 'State-Wide Platinum ("Ministry & State Directorate")',
    price: 150000000,
    priceDisplay: '₦100M – ₦300M / Year',
    periodLabel: 'Annual State License',
    durationDays: 365,
    category: 'b2g',
    maxTeachers: -1, // Unlimited state-wide
    dailyFairUseCap: 100,
    allowedSourcesCount: 6,
    sourceAccessSummary: 'All 6 Curriculum Sources (Sovereign State License)',
    badge: 'Sovereign State License',
    description: 'State Ministry Command Infrastructure for state-wide public & private schools oversight and curriculum deployment.',
    features: [
      'All 6 Curriculum Sources with Sovereign State-Wide Access',
      'Unlimited public and private schools and teachers across the state',
      'State Ministry Command Center (RLS Isolated Telemetry)',
      'Statutory Source Policy Enforcement (e.g. Mandate Lagos Unified Scheme)',
      'State Education Levy & Accreditation Revenue Tracker',
      'Continuing Professional Development (CPD) State Teacher Certification Tracker',
      'Civil Emergency & Weather Broadcast Engine (Instant School Closures via SMS/Push)',
      'Direct Gov API Access (Push statutory syllabus updates directly into EduPlan NG)',
      'Everything in Gold School Tier included state-wide',
      'Dedicated Sovereign Account Architect & Custom On-Premise/Cloud SQL Cluster',
    ],
    restrictions: [],
    ctaText: 'Contact State Directorate Desk',
  },
];

export const ALL_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  ...SUBSCRIPTION_PLANS,
  ...B2B_SCHOOL_PLANS,
  ...B2G_GOVERNMENT_PLANS,
];

export const PLAN_PRICES: Record<string, number> = {
  // B2C Individual Tiers
  'b2c_trial_5day': 500,
  '5_day_pass': 500,
  'trial_5day': 500,
  '5day': 500,

  'b2c_monthly': 1000,
  '1_month_pass': 1000,
  'monthly': 1000,
  'single_month': 1000,
  '1month': 1000,
  'pro_monthly': 1000,

  'b2c_termly': 1500,
  'first_term': 1500,
  'second_term': 1500,
  'third_term': 1500,
  'termly': 1500,
  'term1': 1500,
  'term2': 1500,
  'term3': 1500,

  'b2c_session': 3000,
  'full_session': 3000,
  'session': 3000,
  'pro_annual': 3000,

  // B2B School Tiers
  'b2b_bronze': 45000,
  'bronze': 45000,

  'b2b_silver': 120000,
  'silver': 120000,

  'b2b_gold': 250000,
  'gold': 250000,

  // B2G State Tier
  'b2g_state_platinum': 150000000,
  'state_platinum': 150000000,
  'b2g': 150000000,
};

export const PLAN_DURATIONS_DAYS: Record<string, number> = {
  'b2c_trial_5day': 5,
  '5_day_pass': 5,
  'trial_5day': 5,
  '5day': 5,

  'b2c_monthly': 30,
  '1_month_pass': 30,
  'monthly': 30,
  'single_month': 30,
  '1month': 30,
  'pro_monthly': 30,

  'b2c_termly': 90,
  'first_term': 90,
  'second_term': 90,
  'third_term': 90,
  'termly': 90,
  'term1': 90,
  'term2': 90,
  'term3': 90,

  'b2c_session': 365,
  'full_session': 365,
  'session': 365,
  'pro_annual': 365,

  'b2b_bronze': 105,
  'bronze': 105,

  'b2b_silver': 105,
  'silver': 105,

  'b2b_gold': 105,
  'gold': 105,

  'b2g_state_platinum': 365,
  'state_platinum': 365,
  'b2g': 365,
};

export function getPlanById(id: string): SubscriptionPlan {
  const clean = id.toLowerCase().trim();
  const found = ALL_SUBSCRIPTION_PLANS.find((p) => p.id === clean);
  if (found) return found;

  // Check aliases
  if (clean.includes('trial') || clean === '5_day_pass' || clean === '5day') {
    return SUBSCRIPTION_PLANS[0];
  }
  if (clean.includes('month') || clean === '1_month_pass' || clean === '1month') {
    return SUBSCRIPTION_PLANS[1];
  }
  if (clean.includes('term') || clean === 'first_term') {
    return SUBSCRIPTION_PLANS[2];
  }
  if (clean.includes('session') || clean === 'full_session' || clean === 'pro_annual') {
    return SUBSCRIPTION_PLANS[3];
  }
  if (clean.includes('bronze')) {
    return B2B_SCHOOL_PLANS[0];
  }
  if (clean.includes('silver')) {
    return B2B_SCHOOL_PLANS[1];
  }
  if (clean.includes('gold')) {
    return B2B_SCHOOL_PLANS[2];
  }
  if (clean.includes('state') || clean.includes('b2g') || clean.includes('platinum')) {
    return B2G_GOVERNMENT_PLANS[0];
  }

  return SUBSCRIPTION_PLANS[0];
}

