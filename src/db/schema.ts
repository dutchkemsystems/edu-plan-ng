import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const schools = sqliteTable('schools', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(), // Subdomain or white-label slug (e.g., chrisland)
  b2bTier: text('b2b_tier').notNull().default('bronze'), // bronze (₦45k) | silver (₦120k) | gold (₦250k)
  state: text('state').default('Lagos'),
  lga: text('lga').default('Ikeja'),
  adminUserId: text('admin_user_id'), // Principal / Head Administrator ID
  maxTeachers: integer('max_teachers').default(15), // Bronze: 15, Silver: 50, Gold: 500
  status: text('status').default('active'), // active | trial | suspended
  subscriptionPlan: text('subscription_plan').default('bronze'), // bronze | silver | gold
  subscriptionExpiresAt: text('subscription_expires_at'),
  virtualAccountNumber: text('virtual_account_number'), // Dedicated Kora Pay Dynamic Virtual Account
  virtualBankName: text('virtual_bank_name'), // e.g. Wema Bank / Providus Bank
  customDomain: text('custom_domain'), // White-label: e.g. portal.chrislandschools.com
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  accountType: text('account_type').default('b2c_individual'), // b2c_individual | b2b_school
  schoolId: text('school_id'), // Foreign key to schools table (isolated for RLS)
  schoolName: text('school_name').default('Federal Government College, Lagos'),
  state: text('state').default('Lagos'),
  lga: text('lga').default('Ikeja'),
  assignedLevels: text('assigned_levels').default('["jss-1","jss-2"]'), // JSON array
  assignedSubjects: text('assigned_subjects').default('["Mathematics","English Studies"]'), // JSON array
  role: text('role').default('teacher'), // teacher | hod | principal | superadmin
  b2bTier: text('b2b_tier'), // bronze | silver | gold (null for B2C individual)
  onboardingCompletedAt: text('onboarding_completed_at'),
  streakCount: integer('streak_count').default(1),
  lastActiveDate: text('last_active_date'),
  referralCode: text('referral_code').default('EDU-TEACH-2026'),
  referredBy: text('referred_by'),
  referralPoints: integer('referral_points').default(0),
  referralsCount: integer('referrals_count').default(0),
  trialEndsAt: text('trial_ends_at'),
  subscriptionPlan: text('subscription_plan'),
  subscriptionExpiresAt: text('subscription_expires_at'),
  createdAt: text('created_at').notNull(),
});


export const curriculumLevels = sqliteTable('curriculum_levels', {
  id: text('id').primaryKey(), // 'jss-1', 'jss-2', 'jss-3', 'sss-1', 'sss-2', 'sss-3'
  name: text('name').notNull(),
  category: text('category').notNull(), // junior | senior
  description: text('description').notNull(),
  code: text('code').notNull(),
  sortOrder: integer('sort_order').notNull(),
});

export const curriculumSubjects = sqliteTable('curriculum_subjects', {
  id: text('id').primaryKey(),
  levelId: text('level_id').notNull(),
  name: text('name').notNull(),
  code: text('code').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  termCount: integer('term_count').default(3),
});

export const curriculumTopics = sqliteTable('curriculum_topics', {
  id: text('id').primaryKey(),
  subjectId: text('subject_id').notNull(),
  levelId: text('level_id').notNull(),
  term: integer('term').notNull(), // 1, 2, 3
  week: integer('week').notNull(), // 1 to 13
  topic: text('topic').notNull(),
  subtopics: text('subtopics').notNull(), // JSON array
  objectives: text('objectives').notNull(), // JSON array of Bloom objectives
  teacherActivities: text('teacher_activities').notNull(), // JSON array
  studentActivities: text('student_activities').notNull(), // JSON array
  materials: text('materials').notNull(), // JSON array
  evaluation: text('evaluation').notNull(), // JSON array
});

export const lessonPlans = sqliteTable('lesson_plans', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  level: text('level').notNull(),
  subject: text('subject').notNull(),
  term: integer('term').notNull(),
  week: integer('week').notNull(),
  duration: text('duration').default('40 mins'),
  previousKnowledge: text('previous_knowledge'),
  introduction: text('introduction'),
  teacherActivity: text('teacher_activity'),
  studentActivity: text('student_activity'),
  evaluation: text('evaluation'),
  assignment: text('assignment'),
  references: text('reference_materials'),
  objectives: text('objectives').notNull(), // JSON array
  materials: text('materials').notNull(), // JSON array
  differentiatedInstruction: text('differentiated_instruction'), // JSON { struggling, onLevel, advanced }
  remedialTask: text('remedial_task'), // Phase 10: Differentiated Task for struggling learners
  standardTask: text('standard_task'), // Phase 10: Differentiated Task for on-level learners
  advancedTask: text('advanced_task'), // Phase 10: Differentiated Task for gifted/advanced learners
  bloomTags: text('bloom_tags'), // JSON array
  language: text('language').default('en'), // en, yo, ig, ha
  status: text('status').default('draft'), // draft | published | archived
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const lessonPlanSections = sqliteTable('lesson_plan_sections', {
  id: text('id').primaryKey(),
  lessonPlanId: text('lesson_plan_id').notNull(),
  sectionType: text('section_type').notNull(),
  content: text('content').notNull(),
  sortOrder: integer('sort_order').notNull(),
});

export const resources = sqliteTable('resources', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  level: text('level').notNull(),
  subject: text('subject').notNull(),
  fileType: text('file_type').notNull(), // pdf, docx, slide, image, link
  fileUrl: text('file_url').notNull(),
  fileSize: text('file_size').notNull(),
  topicTag: text('topic_tag'),
  createdAt: text('created_at').notNull(),
});

export const subscriptions = sqliteTable('subscriptions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  accountType: text('account_type').default('b2c'), // b2c | b2b
  schoolId: text('school_id'), // Set for B2B school subscriptions (isolated access)
  plan: text('plan').notNull(), // b2c_trial_5day | b2c_monthly | b2c_termly | b2c_full_session | b2b_bronze | b2b_silver | b2b_gold
  tier: text('tier').default('full_session'), // trial_5day | single_month | termly | full_session | bronze | silver | gold
  status: text('status').notNull(), // active | expired | pending | cancelled
  koraReference: text('kora_reference').notNull(),
  amount: integer('amount').notNull(), // in NGN (500, 1000, 1500, 3000, 45000, 120000, 250000)
  currency: text('currency').default('NGN'),
  virtualAccountNumber: text('virtual_account_number'), // Kora Pay Virtual Bank Transfer Account
  virtualBankName: text('virtual_bank_name'), // e.g., Wema Bank / Providus Bank
  paymentMethod: text('payment_method').default('bank_transfer'), // bank_transfer | ussd | card
  startDate: text('start_date').notNull(),
  expiryDate: text('expiry_date').notNull(),
  autoRenew: integer('auto_renew').default(1),
  receiptUrl: text('receipt_url'),
});

export const referrals = sqliteTable('referrals', {
  id: text('id').primaryKey(),
  referrerId: text('referrer_id').notNull(), // User who generated the link
  referredUserId: text('referred_user_id'),
  referredSchoolId: text('referred_school_id'),
  accountType: text('account_type').default('b2c'), // b2c | b2b
  status: text('status').default('pending'), // pending | completed | rewarded
  rewardType: text('reward_type').default('free_month'), // free_month | edupoints | cash_bonus
  rewardValue: integer('reward_value').default(1),
  createdAt: text('created_at').notNull(),
});

export const auditLogs = sqliteTable('audit_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id'),
  schoolId: text('school_id'),
  accountType: text('account_type').default('b2c'),
  action: text('action').notNull(), // read | create | update | delete | export | prompt_blocked | auth
  resource: text('resource').notNull(), // lesson_plans | school_data | student_records
  resourceId: text('resource_id'),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  details: text('details'),
  timestamp: text('timestamp').notNull(),
});


export const notifications = sqliteTable('notifications', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  type: text('type').default('system'), // system | curriculum | billing | lesson
  read: integer('read').default(0),
  createdAt: text('created_at').notNull(),
});

export const schemesOfWork = sqliteTable('schemes_of_work', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  level: text('level').notNull(),
  subject: text('subject').notNull(),
  term: integer('term').notNull(),
  academicYear: text('academic_year').default('2026/2027'),
  weeksData: text('weeks_data').notNull(), // JSON array of 13 weeks
  status: text('status').default('active'),
  createdAt: text('created_at').notNull(),
});

export const assessments = sqliteTable('assessments', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  level: text('level').notNull(),
  subject: text('subject').notNull(),
  term: integer('term').notNull(),
  week: integer('week').notNull(),
  topic: text('topic').notNull(),
  assessmentType: text('assessment_type').notNull(), // ca_test | mid_term | final_exam
  questions: text('questions').notNull(), // JSON array
  markingScheme: text('marking_scheme').notNull(), // JSON array
  schoolHeader: text('school_header').default('Ministry of Basic Education — Term Assessment'),
  createdAt: text('created_at').notNull(),
});

export const gradeRecords = sqliteTable('grade_records', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  level: text('level').notNull(),
  subject: text('subject').notNull(),
  term: integer('term').notNull(),
  studentName: text('student_name').notNull(),
  studentRegNo: text('student_reg_no').notNull(),
  ca1Score: integer('ca1_score').default(0),
  ca2Score: integer('ca2_score').default(0),
  examScore: integer('exam_score').default(0),
  totalScore: integer('total_score').default(0),
  gradeLetter: text('grade_letter').notNull(), // A1..F9 or A..F
  remark: text('remark').notNull(),
  createdAt: text('created_at').notNull(),
});

export const timetables = sqliteTable('timetables', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  name: text('name').notNull(),
  level: text('level').notNull(),
  scheduleData: text('schedule_data').notNull(), // JSON schedule
  createdAt: text('created_at').notNull(),
});

export const attendanceRecords = sqliteTable('attendance_records', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  level: text('level').notNull(),
  className: text('class_name').notNull(),
  date: text('date').notNull(),
  presentCount: integer('present_count').notNull(),
  absentCount: integer('absent_count').notNull(),
  totalCount: integer('total_count').notNull(),
  notes: text('notes'),
  createdAt: text('created_at').notNull(),
});
