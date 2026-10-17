import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  schoolName: text('school_name').default('Federal Government College, Lagos'),
  state: text('state').default('Lagos'),
  lga: text('lga').default('Ikeja'),
  assignedLevels: text('assigned_levels').default('["jss-1","jss-2"]'), // JSON array
  assignedSubjects: text('assigned_subjects').default('["Mathematics","English Studies"]'), // JSON array
  role: text('role').default('teacher'), // teacher | hod | principal | admin
  onboardingCompletedAt: text('onboarding_completed_at'),
  streakCount: integer('streak_count').default(1),
  lastActiveDate: text('last_active_date'),
  referralCode: text('referral_code').default('EDU-TEACH-2026'),
  referredBy: text('referred_by'),
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
  plan: text('plan').notNull(), // free | pro_monthly | pro_annual | school
  status: text('status').notNull(), // active | expired | pending
  koraReference: text('kora_reference').notNull(),
  amount: integer('amount').notNull(), // in NGN
  currency: text('currency').default('NGN'),
  startDate: text('start_date').notNull(),
  expiryDate: text('expiry_date').notNull(),
  autoRenew: integer('auto_renew').default(1),
  receiptUrl: text('receipt_url'),
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
