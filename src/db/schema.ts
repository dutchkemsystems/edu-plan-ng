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
  stateId: text('state_id').default('lagos'), // Isolation Base (State jurisdiction)
  schoolType: text('school_type').default('public'), // public | private
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
  ministryStateId: text('ministry_state_id').default('lagos'), // Ministry Data Isolation
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
  schoolId: text('school_id'), // Phase 2C: Multi-Tenant RLS School Isolation
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
  curriculumVersion: text('curriculum_version').notNull().default('v1.2'), // Stamped NERDC curriculum version
  recommendedTextbook: text('recommended_textbook'), // JSON metadata of approved textbook
  isOutdated: integer('is_outdated').default(0), // Flagged when government curriculum version advances
  outdatedReason: text('outdated_reason'), // Explanatory reason (e.g. syllabus update, textbook edition change)
  latestCurriculumVersion: text('latest_curriculum_version').default('v1.2'), // Current statutory version available
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const lessonNotes = sqliteTable('lesson_notes', {
  id: text('id').primaryKey(),
  lessonPlanId: text('lesson_plan_id'),
  schoolId: text('school_id'), // Phase 2C: Multi-Tenant RLS School Isolation
  userId: text('user_id').notNull(),
  subject: text('subject').notNull(),
  level: text('level').notNull(),
  term: integer('term').notNull(),
  week: integer('week').notNull(),
  topic: text('topic').notNull(),
  curriculumVersion: text('curriculum_version').notNull().default('v1.2'), // Stamped NERDC curriculum version
  latestCurriculumVersion: text('latest_curriculum_version').default('v1.4'),
  isOutdated: integer('is_outdated').default(0),
  outdatedReason: text('outdated_reason'),
  chalkboardHeader: text('chalkboard_header'),
  subtopics: text('subtopics'), // JSON array
  definitions: text('definitions'), // JSON array
  workedExamples: text('worked_examples'), // JSON array
  blackboardSummary: text('blackboard_summary'), // JSON array
  seatworkDrill: text('seatwork_drill'), // JSON array
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const textbooks = sqliteTable('textbooks', {
  id: text('id').primaryKey(),
  classLevel: text('class_level').notNull(), // jss-1, jss-2, sss-1, etc.
  subject: text('subject').notNull(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  publisher: text('publisher').notNull(),
  edition: text('edition').notNull(),
  isGovernmentApproved: integer('is_government_approved').notNull().default(1),
  approvedBy: text('approved_by').default('NERDC & Lagos State Ministry of Basic Education'),
  approvalDate: text('approval_date'),
  createdAt: text('created_at').notNull(),
});

export const curriculumSyncHashes = sqliteTable('curriculum_sync_hashes', {
  id: text('id').primaryKey(),
  source: text('source').notNull(), // NERDC_NATIONAL | LAGOS_OEQA_ALAUSA | LAGOS_MOE
  level: text('level').notNull(), // jss-1, jss-2, sss-1, etc.
  subject: text('subject').notNull(),
  contentHash: text('content_hash').notNull(),
  version: text('version').notNull().default('v1.2'),
  lastCheckedAt: text('last_checked_at').notNull(),
  lastChangedAt: text('last_changed_at').notNull(),
});

export const curriculumDiffLogs = sqliteTable('curriculum_diff_logs', {
  id: text('id').primaryKey(),
  syncId: text('sync_id').notNull(),
  source: text('source').notNull(),
  level: text('level').notNull(),
  subject: text('subject').notNull(),
  oldVersion: text('old_version').notNull(),
  newVersion: text('new_version').notNull(),
  diffSummary: text('diff_summary').notNull(),
  affectedPlansCount: integer('affected_plans_count').default(0),
  timestamp: text('timestamp').notNull(),
});

export const curriculumVersions = sqliteTable('curriculum_versions', {
  id: text('id').primaryKey(),
  version: text('version').notNull(), // e.g. 'v1.4'
  source: text('source').notNull(), // 'NERDC' | 'LAGOS_LASUBEB' | 'LAGOS_MOE' | 'WAEC' | 'NECO'
  level: text('level').notNull(), // 'jss-1' .. 'sss-3'
  subject: text('subject').notNull(),
  term: integer('term').default(1),
  week: integer('week'),
  contentHash: text('content_hash').notNull(),
  rawUrl: text('raw_url'),
  status: text('status').notNull().default('APPROVED'), // 'APPROVED' | 'PENDING_APPROVAL' | 'REJECTED'
  changeSummary: text('change_summary').notNull(),
  extractedData: text('extracted_data'), // JSON serialized topics, subtopics, objectives
  approvedBy: text('approved_by'),
  isGazetted: integer('is_gazetted').default(1),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const activeSessions = sqliteTable('active_sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  sessionToken: text('session_token').notNull().unique(),
  ipAddress: text('ip_address').notNull(),
  userAgent: text('user_agent').notNull(),
  deviceFingerprint: text('device_fingerprint'),
  lastActivity: text('last_activity').notNull(),
  isActive: integer('is_active').default(1),
  createdAt: text('created_at').notNull(),
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
  schoolId: text('school_id'),
  sourceId: text('source_id'), // nerdc, lagos_scheme, oeqa, bece, waec, neco
  title: text('title').notNull(),
  message: text('message').notNull(),
  type: text('type').default('curriculum_update'), // curriculum_update | system | billing | inspection
  classLevel: text('class_level'),
  subject: text('subject'),
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

// Phase 1: Multi-Source Curriculum Registry (Transformative Use / Copyright Act 2022)
export const curriculumSources = sqliteTable('curriculum_sources', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  code: text('code').notNull().unique(),
  authority: text('authority').notNull(),
  defaultJurisdiction: text('default_jurisdiction').notNull(),
  supportedClasses: text('supported_classes').notNull(),
  description: text('description'),
  websiteUrl: text('website_url'),
  legalNotice: text('legal_notice').notNull(),
  isActive: integer('is_active').default(1),
  createdAt: text('created_at').notNull(),
});

export const sourceCurriculum = sqliteTable('source_curriculum', {
  id: text('id').primaryKey(),
  sourceId: text('source_id').notNull(),
  classLevel: text('class_level').notNull(),
  subject: text('subject').notNull(),
  version: text('version').notNull().default('v1.0'),
  topics: text('topics').notNull(), // JSON metadata array (NO verbatim texts)
  objectives: text('objectives').notNull(), // JSON metadata array
  textbookRefs: text('textbook_refs').notNull(), // JSON metadata array
  statutoryCitations: text('statutory_citations'),
  hash: text('hash').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const schoolSourcePreferences = sqliteTable('school_source_preferences', {
  id: text('id').primaryKey(),
  schoolId: text('school_id').notNull(),
  classLevel: text('class_level').notNull(),
  subject: text('subject').notNull(),
  preferredSourceId: text('preferred_source_id').notNull(),
  mandatedByMinistry: integer('mandated_by_ministry').default(0),
  updatedAt: text('updated_at').notNull(),
});

// Phase 1: NDPA 2023 Compliance Tables
export const parentalConsents = sqliteTable('parental_consents', {
  id: text('id').primaryKey(),
  schoolId: text('school_id').notNull(),
  studentId: text('student_id').notNull(),
  parentName: text('parent_name').notNull(),
  parentPhone: text('parent_phone').notNull(),
  parentEmail: text('parent_email'),
  consentGranted: integer('consent_granted').notNull().default(0),
  consentDate: text('consent_date'),
  purpose: text('purpose').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: text('created_at').notNull(),
});

export const dataProcessingLogs = sqliteTable('data_processing_logs', {
  id: text('id').primaryKey(),
  schoolId: text('school_id').notNull(),
  userId: text('user_id').notNull(),
  action: text('action').notNull(),
  dataSubjectCategory: text('data_subject_category').notNull(),
  containsPii: integer('contains_pii').default(0),
  processingPurpose: text('processing_purpose').notNull(),
  legalBasis: text('legal_basis').notNull(),
  dpoReviewed: integer('dpo_reviewed').default(0),
  timestamp: text('timestamp').notNull(),
});

export const dpiaViolations = sqliteTable('dpia_violations', {
  id: text('id').primaryKey(),
  schoolId: text('school_id').notNull(),
  userId: text('user_id').notNull(),
  violationType: text('violation_type').notNull(),
  attemptedAction: text('attempted_action').notNull(),
  blocked: integer('blocked').default(1),
  details: text('details').notNull(),
  severity: text('severity').default('HIGH'),
  timestamp: text('timestamp').notNull(),
});

export const manualReviewQueue = sqliteTable('manual_review_queue', {
  id: text('id').primaryKey(),
  sourceId: text('source_id').notNull(), // nerdc, lagos_scheme, oeqa, bece, waec, neco
  sourceName: text('source_name').notNull(),
  portalUrl: text('portal_url').notNull(),
  reason: text('reason').notNull(), // ROBOTS_TXT_BLOCKED, SCRAPE_RESTRICTED, CAPTCHA_DETECTED, NO_PUBLIC_API
  robotsTxtStatus: text('robots_txt_status').default('DISALLOWED'),
  classLevel: text('class_level'),
  subject: text('subject'),
  status: text('status').default('PENDING_UPLOAD'), // PENDING_UPLOAD, REVIEWED, APPROVED, REJECTED
  uploadedFileName: text('uploaded_file_name'),
  uploadedBy: text('uploaded_by'),
  adminNotes: text('admin_notes'),
  detectedHash: text('detected_hash'),
  createdAt: text('created_at').notNull(),
  resolvedAt: text('resolved_at'),
});

// ============================================================================
// PHASE 2C: DATA ISOLATION, MULTI-TENANT RLS & STUDENT DATA PRIVACY (NDPA 2023)
// ============================================================================

export const students = sqliteTable('students', {
  id: text('id').primaryKey(),
  schoolId: text('school_id').notNull(),
  admissionNumber: text('admission_number').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  classLevel: text('class_level').notNull(), // jss-1 .. sss-3
  guardianName: text('guardian_name').notNull(),
  guardianPhone: text('guardian_phone').notNull(),
  guardianEmail: text('guardian_email'),
  parentalConsent: integer('parental_consent').notNull().default(0), // 0 = false, 1 = true (NDPA 2023 Sec 24)
  consentStatus: text('consent_status').notNull().default('PENDING'), // PENDING | GRANTED | WITHDRAWN
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const feeRecords = sqliteTable('fee_records', {
  id: text('id').primaryKey(),
  schoolId: text('school_id').notNull(),
  studentId: text('student_id').notNull(),
  term: integer('term').notNull(),
  session: text('session').notNull().default('2026/2027'),
  amountDue: integer('amount_due').notNull(),
  amountPaid: integer('amount_paid').notNull().default(0),
  status: text('status').notNull().default('unpaid'), // paid | partial | unpaid
  paidAt: text('paid_at'),
  receiptNumber: text('receipt_number'),
  createdAt: text('created_at').notNull(),
});

export const analyticsEvents = sqliteTable('analytics_events', {
  id: text('id').primaryKey(),
  schoolId: text('school_id').notNull(),
  userId: text('user_id').notNull(),
  eventType: text('event_type').notNull(),
  payload: text('payload'),
  timestamp: text('timestamp').notNull(),
});

export const rlsSecurityAudit = sqliteTable('rls_security_audit', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').notNull(),
  userId: text('user_id').notNull(),
  tableName: text('table_name').notNull(),
  action: text('action').notNull(),
  status: text('status').notNull().default('ALLOWED'), // ALLOWED | BLOCKED_ISOLATION_VIOLATION
  details: text('details'),
  timestamp: text('timestamp').notNull(),
});

// Phase 5: State Policy Enforcement (Ministry Statutory Directives)
export const stateCurriculumPolicies = sqliteTable('state_curriculum_policies', {
  id: text('id').primaryKey(), // policy_lagos_public_mandate
  stateId: text('state_id').notNull(), // 'lagos'
  mandatedSourceId: text('mandated_source_id').notNull(), // 'lagos_scheme'
  restrictedSourceIds: text('restricted_source_ids').notNull(), // JSON array: '["nerdc"]'
  applyToSchoolTypes: text('apply_to_school_types').notNull().default('["public"]'), // JSON array: public schools
  isActive: integer('is_active').notNull().default(1),
  statutoryDirective: text('statutory_directive').notNull(),
  issuingAuthority: text('issuing_authority').notNull().default('Lagos State Ministry of Basic & Secondary Education / LASUBEB'),
  gazetteReference: text('gazette_reference').default('LASG/MOE/OEQA/CIR/2026/04'),
  updatedAt: text('updated_at').notNull(),
});

