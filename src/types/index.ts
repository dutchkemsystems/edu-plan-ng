export interface CurriculumLevel {
  id: string;
  name: string;
  category: 'junior' | 'senior';
  description: string;
  code: string;
  sortOrder: number;
}

export interface CurriculumSubject {
  id: string;
  levelId: string;
  name: string;
  code: string;
  description: string;
  icon: string;
  termCount?: number;
}

export interface CurriculumTopic {
  id: string;
  subjectId: string;
  levelId: string;
  term: number;
  week: number;
  topic: string;
  subtopics: string[];
  objectives: string[];
  teacherActivities: string[];
  studentActivities: string[];
  materials: string[];
  evaluation: string[];
}

export interface DifferentiatedInstruction {
  struggling: string;
  onLevel: string;
  advanced: string;
}

export interface LessonPlan {
  id: string;
  userId: string;
  title: string;
  level: string;
  subject: string;
  term: number;
  week: number;
  duration: string;
  previousKnowledge: string;
  introduction: string;
  teacherActivity: string;
  studentActivity: string;
  evaluation: string;
  assignment: string;
  references: string;
  objectives: string[];
  materials: string[];
  differentiatedInstruction?: DifferentiatedInstruction;
  bloomTags?: string[];
  language?: 'en' | 'yo' | 'ig' | 'ha';
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface ResourceItem {
  id: string;
  userId: string;
  title: string;
  description: string;
  level: string;
  subject: string;
  fileType: 'pdf' | 'docx' | 'slide' | 'image' | 'link';
  fileUrl: string;
  fileSize: string;
  topicTag?: string;
  createdAt: string;
}

export interface TeacherUser {
  id: string;
  name: string;
  email: string;
  schoolName: string;
  state: string;
  lga: string;
  assignedLevels: string[];
  assignedSubjects: string[];
  role: 'teacher' | 'hod' | 'principal' | 'admin';
  onboardingCompletedAt?: string | null;
  streakCount: number;
  referralCode?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'system' | 'curriculum' | 'billing' | 'lesson';
  read: number;
  createdAt: string;
}

export interface SchemeWeek {
  week: number;
  topic: string;
  subtopics?: string[];
  periods: number;
  materials?: string[];
  evaluation?: string[];
}

export interface SchemeOfWork {
  id: string;
  userId: string;
  title: string;
  level: string;
  subject: string;
  term: number;
  academicYear: string;
  weeksData: SchemeWeek[];
  status: string;
  createdAt: string;
}

export interface AssessmentQuestion {
  id: number;
  type: 'objective' | 'theory';
  question: string;
  options?: string[];
  correctAnswer?: string;
  marks: number;
}

export interface AssessmentItem {
  id: string;
  userId: string;
  title: string;
  level: string;
  subject: string;
  term: number;
  week: number;
  topic: string;
  assessmentType: 'ca_test' | 'mid_term' | 'final_exam';
  questions: AssessmentQuestion[];
  markingScheme: { questionId: number; guide: string }[];
  schoolHeader: string;
  createdAt: string;
}

export interface GradeRecord {
  id: string;
  userId: string;
  level: string;
  subject: string;
  term: number;
  studentName: string;
  studentRegNo: string;
  ca1Score: number;
  ca2Score: number;
  examScore: number;
  totalScore: number;
  gradeLetter: string;
  remark: string;
  createdAt: string;
}

export interface DashboardStats {
  lessonsCompleted: number;
  draftLessons: number;
  totalPlans: number;
  hoursPlanned: string;
  savedResources: number;
  currentStreak: number;
  curriculumCoverage: number;
  nextScheduledLesson: {
    title: string;
    level: string;
    subject: string;
    duration: string;
    week: number;
  };
  subscription: {
    plan: string;
    status: string;
    expiryDate: string;
    amount: number;
    daysRemaining: number;
  };
  heatmap: { date: string; count: number }[];
}
