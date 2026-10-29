/**
 * EduPlan NG - Official Nigerian Curriculum & Lesson Management Schema
 * Strict Compliance: NERDC (National) & OEQA (Lagos State Ministry of Education, Alausa)
 * Levels: Junior Secondary (JSS 1-3) & Senior Secondary (SSS 1-3)
 */

import { z } from 'zod';

// ==========================================
// 1. 21ST-CENTURY SKILLS & SUBJECT SCHEMAS
// ==========================================

export type TwentyFirstCenturySkill =
  | 'Critical Thinking'
  | 'Problem Solving'
  | 'Quantitative Reasoning'
  | 'Scientific Inquiry & Investigation'
  | 'Spatial Reasoning & Visualization'
  | 'Communication & Verbal Articulation'
  | 'Digital Literacy & Algorithmic Thinking'
  | 'Civic Responsibility & National Values'
  | 'Cultural Awareness & Heritage Appreciation'
  | 'Creativity, Design & Innovation'
  | 'Collaboration & Teamwork'
  | 'Financial Literacy & Commercial Acumen'
  | 'Environmental Stewardship & Sustainability'
  | 'Empathy & Emotional Intelligence';

export interface SubjectCoreSkill {
  name: TwentyFirstCenturySkill;
  description: string;
  bloomAlignment: Array<'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate' | 'Create'>;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  category: 'junior' | 'senior';
  department: 'Core' | 'Science' | 'Commercial' | 'Humanities' | 'Vocational' | 'Languages';
  description: string;
  icon: string;
  termCount: number;
  /**
   * FEATURE 1: Explicit 21st-century competencies embedded in this subject
   */
  coreSkills: SubjectCoreSkill[];
  defaultTopicsByTerm?: Record<number, string[]>;
}

export interface SkillObjectiveMapping {
  skill: TwentyFirstCenturySkill;
  objectiveIndex: number;
  objectiveText: string;
  rationale: string;
}

// ==========================================
// 2. VISUAL AIDS & INSTRUCTIONAL REALIA
// ==========================================

export type VisualAidType =
  | 'chalkboard_diagram'
  | 'physical_realia'
  | 'apparatus_specimen'
  | 'wall_chart_infographic'
  | 'scale_map_cartogram'
  | 'flashcards_cards'
  | 'flowchart_schematic'
  | 'manipulative_model';

export interface VisualAidItem {
  id: string;
  title: string;
  type: VisualAidType;
  /**
   * Precise guidance for teacher: what to source, bring to class, or draw on chalkboard
   */
  description: string;
  sourceContext: 'locally_sourced' | 'school_laboratory' | 'chalkboard_drawing' | 'print_media';
  chalkboardSketchPrompt?: string;
  svgContent?: string;
  caption: string;
  safetyCaution?: string;
}

// ==========================================
// 3. OEQA ALAUZA TABULAR PRESENTATION FORMAT
// ==========================================

export type OeqaLessonStage =
  | 'Step 1: Set Induction & Prior Knowledge'
  | 'Step 2: Exploration & Concept Introduction'
  | 'Step 3: Teacher Explanation & Demonstration'
  | 'Step 4: Guided Group / Individual Practice'
  | 'Step 5: Formative Evaluation & Summary';

export interface OeqaTabularStep {
  stepNumber: number;
  stageName: OeqaLessonStage | string;
  durationMinutes: number;
  teacherActivity: string;
  studentActivity: string;
  teachingMethod: 'Demonstration' | 'Inquiry-Based' | 'Discussion' | 'Drill & Practice' | 'Discovery' | 'Role Play';
  materialsUsed: string[];
  evaluationRemark: string;
}

export interface DifferentiatedInstruction {
  struggling: string; // Tier 1 (Scaffolded concrete support, peer buddy, simplified drill)
  onLevel: string;    // Tier 2 (Standard textbook drills, independent exercises)
  advanced: string;   // Tier 3 (Extension problems, higher-order real-world Nigerian applications)
}

// ==========================================
// 4. LESSON PLAN (ADMINISTRATIVE / OEQA)
// ==========================================
/**
 * FEATURE 2 & 4: Administrative-facing inspection dossier for HODs and OEQA Alausa inspectors.
 * Strictly adheres to NERDC syllabus mapping, measurable Bloom verbs, and the Alausa tabular framework.
 */
export interface LessonPlan {
  id: string;
  userId: string;
  schoolName: string;
  subject: string;
  level: 'jss-1' | 'jss-2' | 'jss-3' | 'sss-1' | 'sss-2' | 'sss-3' | string;
  term: 1 | 2 | 3;
  week: number;
  topic: string;
  subtopics: string[];
  durationMinutes: number;
  averageAgeYears: number;
  dateScheduled?: string;

  /**
   * Strict NERDC Behavioral Phrasing:
   * "By the end of the lesson, learners should be able to: [measurable Bloom verb]..."
   */
  nerdcObjectives: string[];

  /**
   * FEATURE 1: Explicit mapping of objectives to 21st-century subject skills
   */
  subjectSkillsMapping: SkillObjectiveMapping[];

  /**
   * FEATURE 3: Physical teaching materials, apparatus, and realia
   */
  instructionalMaterials: string[];
  visualAids: VisualAidItem[];

  /**
   * Prerequisite foundations
   */
  entryBehavior: string; // Previous knowledge
  setInduction: string;  // Lesson introduction hook

  /**
   * FEATURE 4: Exact Lagos State OEQA Alausa Tabular Delivery Matrix
   */
  oeqaPresentationSteps: OeqaTabularStep[];

  /**
   * Evaluation & Homework
   */
  formativeEvaluationQuestions: string[];
  homeworkAssignment: string;

  /**
   * Inclusive pedagogy
   */
  differentiatedInstruction: DifferentiatedInstruction;
  safetyPrecautions?: string;

  /**
   * Administrative Moderation
   */
  curriculumReference: string; // e.g. "NERDC Basic Education Curriculum Page 42; Lagos State Unified Scheme"
  teacherSignatureDate?: string;
  hodApproval?: {
    approved: boolean;
    hodName: string;
    remarks: string;
    approvedAt: string;
  };
  status: 'draft' | 'submitted' | 'approved' | 'revision_requested';
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 5. LESSON NOTE (TEACHER-FACING INSTRUCTIONAL SCRIPT)
// ==========================================
/**
 * FEATURE 2 & 3: Deep, teacher-facing instructional script and classroom manual.
 * Stands on its own as a full narrative lesson delivery script, complete blackboard notes,
 * step-by-step worked examples, chalkboard diagrams, and pedagogical delivery pointers.
 */
export interface LessonNote {
  id: string;
  lessonPlanId?: string;
  userId: string;
  subject: string;
  level: string;
  term: number;
  week: number;
  topic: string;

  /**
   * Delivery Pacing & Script
   */
  teacherDeliveryScript: {
    hookNarrative: string;
    coreLectureNarrative: string;
    analogyNigerianContext: string; // Local analogy (e.g. Balogun market, Third Mainland Bridge, cassava processing)
    teacherScriptPointers: string[];
  };

  /**
   * Exhaustive Chalkboard Note Layout (What pupils copy word-for-word into their notebooks)
   */
  chalkboardNote: {
    chalkboardHeader: string;
    subtopicsSummary: string[];
    conceptualDefinitions: string[];
    theoreticalLawsAndRules: string[];
    workedClassroomExamples: Array<{
      exampleNumber: number;
      problemStatement: string;
      stepByStepSolution: string[];
      finalAnswerWithUnits: string;
      pedagogicalPitfallWarning: string;
    }>;
    blackboardSummaryRules: string[];
    inClassSeatworkDrill: string[];
  };

  /**
   * FEATURE 3: Detailed chalkboard illustrations & visual aid sketches
   */
  chalkboardIllustrations: Array<{
    title: string;
    figureLabel: string;
    drawingGuideForTeacher: string; // Exact instructions on how to sketch this with chalk on the blackboard
    pupilNotebookInstructions: string; // Guidance for pupils ruling margins and labeling parts
    svgDiagramMarkup?: string;
    labelsToHighlight: string[];
  }>;

  /**
   * Pedagogical Remediation & Classroom Management
   */
  commonStudentMisconceptions: Array<{
    misconception: string;
    scientificOrGrammaticalCorrection: string;
    quickDiagnosticQuestion: string;
  }>;

  /**
   * WAEC / NECO / BECE Examination Clinic
   */
  examClinicTips: {
    frequentExamMistakes: string[];
    markingSchemeKeywords: string[];
    samplePastQuestion: {
      examBody: 'WAEC' | 'NECO' | 'BECE' | 'JAMB';
      year?: string;
      question: string;
      modelAnswer: string;
    };
  };

  /**
   * Homework & Extended Research Project
   */
  extendedAssignment: {
    takeHomeQuestions: string[];
    handsOnProjectOrLocalFieldWork: string;
  };

  wordCount: number;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 6. CURRICULUM SYNC & NOTIFICATION SCHEMAS
// ==========================================

export type CurriculumSource = 'NERDC_NATIONAL' | 'LAGOS_OEQA_ALAUSA';

export interface CurriculumSyncDiff {
  subject: string;
  level: string;
  term: number;
  week: number;
  changeType: 'TOPIC_MODIFIED' | 'TOPIC_ADDED' | 'OBJECTIVE_UPDATED' | 'SCHEME_REVISED';
  oldTopic?: string;
  newTopic: string;
  revisionNotes: string;
  source: CurriculumSource;
}

export interface CurriculumSyncResult {
  syncId: string;
  timestamp: string;
  sourceChecked: CurriculumSource[];
  status: 'UP_TO_DATE' | 'UPDATES_APPLIED' | 'FAILED';
  versionChecksum: string;
  discrepanciesFound: number;
  affectedPlanIds: string[];
  diffs: CurriculumSyncDiff[];
  syncSummary: string;
}

// ==========================================
// 7. ZOD VALIDATION SCHEMAS FOR RUNTIME
// ==========================================

export const OeqaTabularStepSchema = z.object({
  stepNumber: z.number().int().positive(),
  stageName: z.string().min(3),
  durationMinutes: z.number().int().positive(),
  teacherActivity: z.string().min(10),
  studentActivity: z.string().min(10),
  teachingMethod: z.enum(['Demonstration', 'Inquiry-Based', 'Discussion', 'Drill & Practice', 'Discovery', 'Role Play']),
  materialsUsed: z.array(z.string()),
  evaluationRemark: z.string().min(5),
});

export const LessonPlanZodSchema = z.object({
  subject: z.string().min(2),
  level: z.string().min(2),
  term: z.number().int().min(1).max(3),
  week: z.number().int().min(1).max(13),
  topic: z.string().min(3),
  subtopics: z.array(z.string()).min(1),
  durationMinutes: z.number().int().default(40),
  averageAgeYears: z.number().int().default(13),
  nerdcObjectives: z.array(z.string()).min(2),
  subjectSkillsMapping: z.array(
    z.object({
      skill: z.string(),
      objectiveIndex: z.number(),
      objectiveText: z.string(),
      rationale: z.string(),
    })
  ),
  instructionalMaterials: z.array(z.string()).min(1),
  visualAids: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      type: z.string(),
      description: z.string(),
      sourceContext: z.string(),
      caption: z.string(),
      chalkboardSketchPrompt: z.string().optional(),
    })
  ),
  entryBehavior: z.string().min(5),
  setInduction: z.string().min(5),
  oeqaPresentationSteps: z.array(OeqaTabularStepSchema).min(3),
  formativeEvaluationQuestions: z.array(z.string()).min(2),
  homeworkAssignment: z.string().min(5),
  differentiatedInstruction: z.object({
    struggling: z.string().min(5),
    onLevel: z.string().min(5),
    advanced: z.string().min(5),
  }),
  safetyPrecautions: z.string().optional(),
  curriculumReference: z.string().min(5),
});

// Runtime exports for Node ESM loader compatibility
export const TwentyFirstCenturySkill = {} as any;
export const CurriculumSource = {} as any;
export const CurriculumSyncResult = {} as any;
export const CurriculumSyncDiff = {} as any;

