export interface CurriculumLevel {
  id: string;
  name: string;
  category: 'junior' | 'senior';
  description: string;
  code: string;
  sortOrder: number;
}

import type {
  SubjectCoreSkill,
  SkillObjectiveMapping,
  VisualAidItem,
  OeqaTabularStep,
  LessonNote,
  Subject,
  CurriculumSyncResult,
  CurriculumSyncDiff
} from './curriculum.ts';

export type {
  SubjectCoreSkill,
  SkillObjectiveMapping,
  VisualAidItem,
  OeqaTabularStep,
  LessonNote,
  Subject,
  CurriculumSyncResult,
  CurriculumSyncDiff
};

export interface CurriculumSubject {
  id: string;
  levelId: string;
  name: string;
  code: string;
  description: string;
  icon: string;
  termCount?: number;
  coreSkills?: SubjectCoreSkill[];
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

export interface InstructionalMaterials {
  physical: string[];
  visual3D?: string; // e.g. "heart_model", "solar_system", "geometry_cube", "dna_helix", "atom_model", "plant_cell"
  video4K?: string;  // e.g. "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
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

  // Curriculum Versioning & Class Isolation (Phase 1)
  curriculumVersion?: string;
  isOutdated?: boolean;
  outdatedReason?: string;
  latestCurriculumVersion?: string;
  recommendedTextbook?: {
    title: string;
    author: string;
    publisher: string;
    edition: string;
    isGovernmentApproved?: boolean;
    approvedBy?: string;
    approvalDate?: string;
  };

  // Phase 10: Differentiated Tasks
  remedialTask?: string;
  standardTask?: string;
  advancedTask?: string;

  // Visual Aids Engine (3D & 4K)
  instructionalMaterials?: InstructionalMaterials;

  // Specific NERDC & OEQA separated additions
  nerdcObjectives?: string[];
  subjectSkillsMapping?: SkillObjectiveMapping[];
  visualAids?: VisualAidItem[];
  oeqaPresentationSteps?: OeqaTabularStep[];
  curriculumReference?: string;

  // New High-Value Teacher AI Support Features
  pedagogicalTip?: string;
  cheatSheet?: TeacherCheatSheet;
  misconceptions?: MisconceptionAlert[];

  lessonNote?: {
    subtopics: string;
    definitions: string;
    workedExamples: string;
    blackboardSummary: string;
    classDrill: string;
  };
  diagramId?: string;
  diagramCaption?: string;
  safetyPrecautions?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherCheatSheet {
  lessonTopic: string;
  level: string;
  subject?: string;
  coreConcept: string; // 1 concise paragraph
  mustKnowFacts: string[]; // exactly 3 key facts
  localExamples: string[]; // 2 authentic Nigerian contexts
}

export interface MisconceptionAlert {
  misconception: string;
  teacherCorrection: string;
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

export type AccountType = 'b2c_individual' | 'b2b_school' | 'b2g_government';
export type B2BTier = 'bronze' | 'silver' | 'gold' | 'state_platinum';
export type UserRole = 'teacher' | 'hod' | 'principal' | 'superadmin' | 'super_admin' | 'admin' | 'ministry_official';

export interface School {
  id: string;
  name: string;
  slug: string;
  b2bTier: B2BTier;
  state: string;
  lga: string;
  adminUserId?: string | null;
  maxTeachers: number;
  status: 'active' | 'trial' | 'suspended';
  subscriptionPlan: string;
  subscriptionExpiresAt?: string | null;
  virtualAccountNumber?: string | null;
  virtualBankName?: string | null;
  customDomain?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TierEntitlementFlags {
  hasBasicText: boolean;
  hasNerdcAlignment: boolean;
  hasLagosUnifiedScheme: boolean;
  hasDraftWatermark: boolean;
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
  maxSavedLibraryNotes: number;
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
}

export interface TeacherUser {
  id: string;
  name: string;
  email: string;
  accountType?: AccountType;
  schoolId?: string | null;
  schoolName: string;
  state: string;
  lga: string;
  assignedLevels: string[];
  assignedSubjects: string[];
  role: UserRole;
  b2bTier?: B2BTier | null;
  tierId?: string;
  tierName?: string;
  tierCategory?: 'b2c' | 'b2b' | 'b2g';
  entitlements?: TierEntitlementFlags;
  quotaUsage?: {
    usedToday: number;
    dailyFairUseCap: number;
    totalGenerated: number;
    maxGenerationsTotal?: number | null;
    savedNotesCount: number;
    maxSavedLibraryNotes: number;
  };
  ministryStateId?: string | null;
  onboardingCompletedAt?: string | null;
  streakCount: number;
  referralCode?: string;
  referredBy?: string | null;
  referralPoints?: number;
  referralsCount?: number;
  trialEndsAt?: string | null;
  subscriptionPlan?: string | null;
  subscriptionExpiresAt?: string | null;
}

export interface Referral {
  id: string;
  referrerId: string;
  referredUserId?: string | null;
  referredSchoolId?: string | null;
  accountType: 'b2c' | 'b2b';
  status: 'pending' | 'completed' | 'rewarded';
  rewardType: 'free_month' | 'edupoints' | 'cash_bonus';
  rewardValue: number;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId?: string | null;
  schoolId?: string | null;
  accountType: 'b2c' | 'b2b';
  action: 'read' | 'create' | 'update' | 'delete' | 'export' | 'prompt_blocked' | 'auth';
  resource: string;
  resourceId?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  details?: string | null;
  timestamp: string;
}

export interface RLSContext {
  userId: string;
  userName?: string;
  accountType: AccountType;
  schoolId?: string | null;
  role: UserRole;
  b2bTier?: B2BTier | null;
  ministryStateId?: string;
}


export interface NotificationItem {
  id: string;
  userId: string;
  schoolId?: string | null;
  sourceId?: string | null;
  title: string;
  message: string;
  type: 'system' | 'curriculum' | 'curriculum_update' | 'billing' | 'lesson' | 'inspection';
  classLevel?: string | null;
  subject?: string | null;
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
  curriculumSourceId?: string;
  sourceName?: string;
  curriculumVersion?: string;
  nonContradictionNote?: string;
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
    tierId?: string;
    tierName?: string;
    tagline?: string;
    accountCategory?: 'b2c' | 'b2b' | 'b2g';
    priceDisplay?: string;
    billingCycle?: string;
    status: string;
    expiryDate: string;
    amount: number;
    daysRemaining: number;
    allowedSourcesCount?: number;
    maxTeachers?: number;
    dailyFairUseCap?: number;
    maxGenerationsTotal?: number | null;
    usedToday?: number;
    totalGenerated?: number;
    savedNotesCount?: number;
    maxSavedLibraryNotes?: number;
    features?: TierEntitlementFlags;
  };
  heatmap: { date: string; count: number }[];
}
