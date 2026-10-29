/**
 * EduPlan NG - Official Nigerian Curriculum Zod Schemas
 *
 * Strict Compliance:
 * - NERDC (National Educational Research and Development Council)
 * - Lagos State Ministry of Basic & Secondary Education OEQA (Office of Education Quality Assurance, Alausa)
 * - WAEC (West African Examinations Council) & NECO (National Examinations Council)
 * - UBEC (Universal Basic Education Commission)
 */

import { z } from 'zod';

export const NigerianAcademicLevelSchema = z.enum([
  'jss-1',
  'jss-2',
  'jss-3',
  'sss-1',
  'sss-2',
  'sss-3',
]);
export type NigerianAcademicLevel = z.infer<typeof NigerianAcademicLevelSchema>;

export const NigerianTermSchema = z.enum([
  'First Term',
  'Second Term',
  'Third Term',
]);
export type NigerianTerm = z.infer<typeof NigerianTermSchema>;

/**
 * Lagos State OEQA 5-Step Tabular Presentation Matrix Step
 */
export const OEQAPresentationStepSchema = z.object({
  stepNumber: z.number().int().min(1).max(5),
  stageName: z.string().describe('e.g. Step 1: Set Induction & Prior Knowledge, Step 2: Exploration & Concept Introduction'),
  durationMinutes: z.number().int().positive().describe('Duration in minutes (e.g. 5, 8, 12, 10, 5)'),
  teacherActivity: z.string().describe('Precise pedagogical actions taken by the educator'),
  studentActivity: z.string().describe('Observable, active learner engagement tasks'),
  teachingMethod: z.string().describe('e.g. Think-Pair-Share, Guided Discovery, Inquiry-based, Expository with Realia'),
  materialsUsed: z.array(z.string()).describe('Chalkboard, locally fabricated models, realia from Balogun/local community'),
  evaluationRemark: z.string().describe('Formative checkpoint observing student comprehension percentage'),
});
export type OEQAPresentationStep = z.infer<typeof OEQAPresentationStepSchema>;

/**
 * 10-Year WAEC / NECO Exam Prediction Schema
 */
export const WaecNecoPastExamPredictionSchema = z.object({
  examBody: z.enum(['WAEC', 'NECO', 'BECE']),
  probableExamSession: z.string().describe('e.g. WAEC WASSCE 2026/2027 Forecast'),
  frequencyRating: z.enum(['High (70%+ probability)', 'Medium (40-69%)', 'Cyclical (Appears every 2 years)']),
  predictedQuestion: z.string().describe('Authentic WAEC/NECO standard examination question'),
  markingScheme: z.array(
    z.object({
      step: z.string(),
      markAllocation: z.string().describe('e.g. M1, A1, B2, C1'),
      scoreGuide: z.string(),
    })
  ),
  chiefExaminerWarning: z.string().describe('Specific pitfall cited in Chief Examiner Reports where Nigerian candidates lose marks'),
});
export type WaecNecoPastExamPrediction = z.infer<typeof WaecNecoPastExamPredictionSchema>;

/**
 * Cultural Intelligence & Nigerian Everyday Context Schema
 */
export const NigerianCulturalContextSchema = z.object({
  analogies: z.array(z.string()).describe('Everyday Nigerian analogies (e.g. Danfo bus routing, Third Mainland Bridge traffic, Balogun Market inventory, Kainji Dam power generation)'),
  currencyExamples: z.array(z.string()).describe('Commercial drills explicitly using Nigerian Naira (₦) and Kobo (k)'),
  localRealiaMaterials: z.array(z.string()).describe('Everyday Nigerian household and environmental specimens (e.g. cassava tuber, hibiscus flower, palm oil, empty tin cans)'),
  geographicalReferences: z.array(z.string()).describe('References to Nigerian states, commercial cities, and river systems'),
});
export type NigerianCulturalContext = z.infer<typeof NigerianCulturalContextSchema>;

/**
 * Formative Differentiated Instruction Matrix (Tiered for Nigerian Mixed-Ability Classrooms)
 */
export const DifferentiatedInstructionSchema = z.object({
  struggling: z.string().describe('Tier 1: Step-by-step scaffolding with concrete manipulative aids and peer buddy support'),
  onLevel: z.string().describe('Tier 2: Standard guided exercises from approved NERDC textbook with independent drills'),
  advanced: z.string().describe('Tier 3: Higher-order critical thinking word problems applied to Nigerian commerce and industry'),
});
export type DifferentiatedInstruction = z.infer<typeof DifferentiatedInstructionSchema>;

/**
 * Worked Classroom Chalkboard Example
 */
export const WorkedClassroomExampleSchema = z.object({
  exampleNumber: z.number().int().positive(),
  problemStatement: z.string().describe('Standard WAEC/BECE aligned question with Nigerian parameters'),
  stepByStepSolution: z.array(z.string()).describe('Sequential steps to be written clearly on the chalkboard'),
  finalAnswerWithUnits: z.string().describe('Final solution with strict S.I. units or Naira (₦) denominations'),
  candidatePitfall: z.string().describe('Common candidate error on this specific problem type'),
});
export type WorkedClassroomExample = z.infer<typeof WorkedClassroomExampleSchema>;

/**
 * Teacher-Facing Chalkboard Lesson Note Schema (For Pupil Exercise Books)
 */
export const ChalkboardLessonNoteSchema = z.object({
  chalkboardHeader: z.string().describe('Header line: Subject | Class Level | Term | Week | Topic'),
  subtopics: z.array(z.string()).describe('Numbered list of 3-4 subtopics covered in the 40-minute period'),
  conceptualDefinitions: z.array(z.string()).describe('Statutory verbatim definitions for pupils to copy into notebooks'),
  theoreticalLawsAndRules: z.array(z.string()).describe('Governing mathematical/scientific laws and grammar conventions'),
  workedExamples: z.array(WorkedClassroomExampleSchema).min(1),
  blackboardSummaryRules: z.array(z.string()).describe('Core golden takeaways for the chalkboard summary'),
  inClassSeatworkDrill: z.array(z.string()).describe('Immediate formative chalkboard exercises to be solved before dismissal'),
});
export type ChalkboardLessonNote = z.infer<typeof ChalkboardLessonNoteSchema>;

/**
 * Comprehensive Nigerian Lesson Plan Schema (NERDC & Lagos OEQA Standard)
 */
export const NigerianLessonPlanSchema = z.object({
  id: z.string().optional(),
  title: z.string().describe('Statutory Scheme of Work Topic Title'),
  level: NigerianAcademicLevelSchema,
  subject: z.string().describe('Unified Scheme Subject (e.g. Mathematics, English Studies, Biology)'),
  term: NigerianTermSchema,
  week: z.number().int().min(1).max(13),
  duration: z.string().default('40 mins'),
  averageAgeYears: z.number().int(),
  curriculumStandard: z.string().default('NERDC National Curriculum & Lagos State OEQA Alausa Quality Assurance Framework'),
  
  // Behavioral Objectives in Bloom's Taxonomy
  behavioralObjectives: z.array(z.string()).min(3).describe('Measurable objectives beginning with "By the end of the lesson, learners should be able to:"'),
  coreSkills: z.array(z.string()).describe('21st Century Competencies: Critical Thinking, Problem Solving, Collaboration, Civic Literacy'),
  
  // Instructional Materials & Entry Behavior
  instructionalMaterials: z.array(z.string()).min(2).describe('Statutory textbooks, wall charts, chalkboard, and local realia'),
  entryBehavior: z.string().describe('Learners prerequisite knowledge and foundational schema from prior weeks'),
  setInduction: z.string().describe('5-minute interactive hook connecting topic to daily Nigerian community life'),
  
  // Lagos State OEQA 5-Step Presentation Matrix Table
  oeqaPresentationSteps: z.array(OEQAPresentationStepSchema).length(5),
  
  // Evaluation & Classroom Follow-Up
  formativeEvaluationQuestions: z.array(z.string()).min(2),
  homeworkAssignment: z.string(),
  differentiatedInstruction: DifferentiatedInstructionSchema,
  
  // High-Impact Pedagogical & Safety Features
  pedagogicalTip: z.string().describe('Modern active learning strategy (e.g. Think-Pair-Share, Jigsaw, local materials)'),
  safetyPrecautions: z.string().describe('Classroom, laboratory, and psychological safety standards'),
  
  // Verbatim Chalkboard Note & Cultural Context
  chalkboardLessonNote: ChalkboardLessonNoteSchema,
  culturalContext: NigerianCulturalContextSchema,
  
  // WAEC / NECO Exam Forecast
  examPrediction: WaecNecoPastExamPredictionSchema,
  
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type NigerianLessonPlan = z.infer<typeof NigerianLessonPlanSchema>;
