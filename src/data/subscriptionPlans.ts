export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number; // in NGN
  priceDisplay: string;
  periodLabel: string;
  durationDays: number;
  badge?: string;
  popular?: boolean;
  savings?: string;
  description: string;
  features: string[];
  ctaText: string;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: '5_day_pass',
    name: '5-Day Trial Pass',
    price: 500,
    priceDisplay: '₦500',
    periodLabel: '5 Days Full Access',
    durationDays: 5,
    description: 'Affordable sprint pass for weekly lesson prep, lesson note review, or school quality inspections.',
    features: [
      'Complete access to JSS 1–3 & SSS 1–3 NERDC topics',
      'Generate lesson plans with Bloom’s taxonomy objectives',
      'Step-by-step Lagos OEQA 5-step chalkboard notes',
      'Export to Microsoft Word (.docx) & printable PDF',
      'Teacher activity & student activity guides',
    ],
    ctaText: 'Start 5-Day Pass',
  },
  {
    id: '1_month_pass',
    name: '1-Month Pass',
    price: 1000,
    priceDisplay: '₦1,000',
    periodLabel: '30 Days Access',
    durationDays: 30,
    description: 'Ideal monthly pass for teachers managing active mid-term periods and continuous assessments.',
    features: [
      'Everything in 5-Day Pass included',
      '13-Week Scheme of Work automated generator',
      'Continuous Assessment (CA 1 & CA 2) question bank',
      'Broadsheet grading calculator (WAEC A1–F9 grading)',
      'Multi-language lesson notes (English, Yorùbá, Igbo, Hausa)',
      'SMS & WhatsApp parent notification templates',
    ],
    ctaText: 'Get 1-Month Pass',
  },
  {
    id: 'first_term',
    name: 'First Term',
    price: 1500,
    priceDisplay: '₦1,500',
    periodLabel: 'Full Term (~90 Days)',
    durationDays: 90,
    description: 'Complete academic term coverage from September resumption to December terminal examinations.',
    features: [
      'Full Term 1 Scheme of Work & 13-week syllabus',
      'Weekly automated lesson plans & chalkboard notes',
      'Mid-term CA 1 & CA 2 tests with marking schemes',
      'Terminal examination papers (Objectives + Theory 60 Marks)',
      'Official broadsheet gradebook with pass/fail remarks',
      'Continuous weekly NERDC curriculum sync verification',
    ],
    ctaText: 'Subscribe for Term 1',
  },
  {
    id: 'second_term',
    name: 'Second Term',
    price: 1500,
    priceDisplay: '₦1,500',
    periodLabel: 'Full Term (~90 Days)',
    durationDays: 90,
    description: 'Comprehensive Term 2 coverage (January to April), including mid-term review and mock exams.',
    features: [
      'Full Term 2 Scheme of Work & 13-week lesson breakdown',
      'Mid-Term Continuous Assessment & Open Day reports',
      'WAEC & BECE mock examination generator with solutions',
      'Differentiated instruction aids for mixed-ability classrooms',
      'Priority Lagos OEQA compliance inspection checklists',
      'WhatsApp parent broadcast messaging system',
    ],
    ctaText: 'Subscribe for Term 2',
  },
  {
    id: 'third_term',
    name: 'Third Term',
    price: 1500,
    priceDisplay: '₦1,500',
    periodLabel: 'Full Term (~90 Days)',
    durationDays: 90,
    description: 'Crucial promotional term coverage including promotional broadsheets and WAEC/BECE finals.',
    features: [
      'Full Term 3 promotional scheme of work',
      'Terminal promotional examination papers & marking schemes',
      'Cumulative annual broadsheet & grade analysis',
      'JSS 3 BECE & SSS 3 WAEC high-yield prep modules',
      'Graduation & end-of-session report card generation',
      'Automatic classroom timetable scheduler',
    ],
    ctaText: 'Subscribe for Term 3',
  },
  {
    id: 'full_session',
    name: 'Full Session (1 Year)',
    price: 3000,
    priceDisplay: '₦3,000',
    periodLabel: '365 Days • All 3 Terms',
    durationDays: 365,
    badge: 'Best Value',
    popular: true,
    savings: 'Save ₦1,500 vs paying per term (covers all 3 terms)',
    description: 'The ultimate all-inclusive plan covering First, Second, and Third terms with maximum savings.',
    features: [
      'Covers all 3 terms: Term 1 + Term 2 + Term 3',
      'Save ₦1,500 vs individual term passes (₦4,500 value)',
      'Unlimited lesson plans, chalkboard notes & scheme exports',
      '24/7 AI Pedagogical Coach for classroom mastery',
      'Complete Lagos State OEQA quality assurance readiness',
      'Full school broadsheet, report cards & parent messaging',
      'Priority WhatsApp teacher support & curriculum update alerts',
    ],
    ctaText: 'Get Full Session (Best Value)',
  },
];

export const B2B_SCHOOL_PLANS: SubscriptionPlan[] = [
  {
    id: 'b2b_bronze',
    name: 'Bronze School Tier',
    price: 45000,
    priceDisplay: '₦45,000',
    periodLabel: 'Per Term • Up to 15 Teachers',
    durationDays: 105,
    badge: 'Starter Academy',
    description: 'Designed for private academies and community schools standardizing unified NERDC lesson plans.',
    features: [
      'Up to 15 Teacher Accounts with individual logins',
      'Unified OEQA 5-step lesson notes across all classes',
      'Termly 13-week Scheme of Work synchronization',
      'Continuous Assessment (CA 1 & CA 2) question bank',
      'School broadsheet report card export',
      'Virtual Account transfer & USSD reconciliation',
    ],
    ctaText: 'Activate Bronze (₦45,000 / Term)',
  },
  {
    id: 'b2b_silver',
    name: 'Silver School Tier',
    price: 120000,
    priceDisplay: '₦120,000',
    periodLabel: 'Per Term • Up to 50 Teachers',
    durationDays: 105,
    badge: 'Popular for Colleges',
    popular: true,
    description: 'Comprehensive institutional suite for established secondary colleges, state model schools, and multi-arm institutions.',
    features: [
      'Up to 50 Teacher Accounts with HOD review workflow',
      '10-Year WAEC/NECO Exam Forecast & Marking Schemes',
      'Principal compliance inspection dashboard (Live Heatmap)',
      'Automated batch lesson plan & lesson note generation',
      'Multi-lingual primary notes (English, Yoruba, Igbo, Hausa)',
      'Direct WhatsApp parent broadcast automation',
      'Dedicated Kora Pay dynamic virtual account',
    ],
    ctaText: 'Activate Silver (₦120,000 / Term)',
  },
  {
    id: 'b2b_gold',
    name: 'Gold Enterprise Unity',
    price: 250000,
    priceDisplay: '₦250,000',
    periodLabel: 'Per Term • Up to 500 Teachers',
    durationDays: 105,
    badge: 'Enterprise & Unity Colleges',
    description: 'Full enterprise infrastructure for Federal Unity Colleges, premier private school networks, and state education boards.',
    features: [
      'Up to 500 Teacher Accounts with multi-campus oversight',
      'Full White-Label Portal & Custom Domain (e.g. portal.yourschool.edu.ng)',
      'Principal Command Center with real-time OEQA grading analytics',
      'NDPA 2023 certified data isolation & row-level audit logs',
      'Automated WAEC/NECO exam script OCR grading assistant',
      'Priority curriculum API sync with Ministry of Education',
      'Dedicated Account Manager & 24/7 VIP Kora Pay Concierge',
    ],
    ctaText: 'Activate Gold (₦250,000 / Term)',
  },
];

export const ALL_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  ...SUBSCRIPTION_PLANS,
  ...B2B_SCHOOL_PLANS,
];

export const PLAN_PRICES: Record<string, number> = {
  // B2C Individual Tiers
  '5_day_pass': 500,
  '1_month_pass': 1000,
  'first_term': 1500,
  'second_term': 1500,
  'third_term': 1500,
  'full_session': 3000,
  'trial_5day': 500,
  'single_month': 1000,
  'termly': 1500,

  // B2B School Tiers
  'b2b_bronze': 45000,
  'b2b_silver': 120000,
  'b2b_gold': 250000,
  'bronze': 45000,
  'silver': 120000,
  'gold': 250000,

  // Legacy aliases
  '5day': 500,
  '1month': 1000,
  'term1': 1500,
  'term2': 1500,
  'term3': 1500,
  'pro_monthly': 1000,
  'pro_annual': 3000,
};

export const PLAN_DURATIONS_DAYS: Record<string, number> = {
  '5_day_pass': 5,
  '1_month_pass': 30,
  'first_term': 90,
  'second_term': 90,
  'third_term': 90,
  'full_session': 365,
  'trial_5day': 5,
  'single_month': 30,
  'termly': 90,

  'b2b_bronze': 105,
  'b2b_silver': 105,
  'b2b_gold': 105,
  'bronze': 105,
  'silver': 105,
  'gold': 105,

  '5day': 5,
  '1month': 30,
  'term1': 90,
  'term2': 90,
  'term3': 90,
  'pro_monthly': 30,
  'pro_annual': 365,
};

export function getPlanById(id: string): SubscriptionPlan {
  const found = ALL_SUBSCRIPTION_PLANS.find((p) => p.id === id);
  if (found) return found;
  return SUBSCRIPTION_PLANS[0];
}

