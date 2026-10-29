/**
 * EduPlan NG - Client-Safe Curriculum Types & Heuristic Derivations
 * 
 * Free of any server-only dependencies (@google/genai, fs, process.env).
 * Matches full specification for LessonPage, Interactive3DViewer, and Composer.
 */

import { TeacherCheatSheet, MisconceptionAlert } from '../../types/index.ts';

export interface Visual3DConceptSpec {
  modelType: 'heart' | 'dna' | 'polyhedron' | 'atom' | 'motor' | 'globe' | 'generic' | string;
  title: string;
  subjectDomain: string;
  description: string;
  curriculumStandard: string;
  interactiveParts: Array<{
    name: string;
    color: string;
    description: string;
  }>;
  suggestedAnimation?: 'pulse' | 'rotate' | 'orbit' | 'oscillate';
  pedagogicalAnnotation?: string;
  rotationSpeed?: number;
  highlightColor?: string;
  wireframe?: boolean;
}

export interface OEQAStep {
  stepNumber: number;
  title?: string;
  stageName?: string;
  durationMinutes: number;
  teacherActivities?: string[];
  teacherActivity?: string;
  studentActivities?: string[];
  studentActivity?: string;
  teachingMethod?: string;
  chalkboardLayoutNotes?: string;
  evaluationCheckpoints?: string[];
}

export interface TopicBreakdownOutput {
  subject: string;
  level: string;
  term: number;
  week: number;
  topic: string;
  subtopics: string[];
  learningObjectives: string[];
  requiredPriorKnowledge: string[];
  coreCompetencies: string[];
  cognitiveDomainDistribution?: {
    remembering: number;
    understanding: number;
    applying: number;
    analyzing: number;
    evaluating: number;
    creating: number;
  };
  pedagogicalTip?: string;
}

export interface FullLessonPlanOutput {
  subject: string;
  level: string;
  term: number;
  week: number;
  topic: string;
  durationMinutes?: number;
  duration?: string;
  behavioralObjectives: Array<any>;
  instructionalMaterials: string[];
  visualAids: Array<{
    id: string;
    title: string;
    type: string;
    description: string;
  }>;
  entryBehavior: string;
  setInduction: string;
  presentationSteps: OEQAStep[];
  formativeEvaluationQuestions: string[];
  homeworkAssignment: string;
  differentiatedInstruction: {
    struggling: string;
    onLevel: string;
    advanced: string;
  };
  safetyPrecautions: string;
  pedagogicalTip?: string;
  curriculumReference: string;
}

export interface FullLessonNoteOutput {
  subject: string;
  level: string;
  term: number;
  week: number;
  topic: string;
  teacherDeliveryScript: {
    hookNarrative: string;
    coreLectureNarrative: string;
    analogyNigerianContext: string;
    teacherScriptPointers: string[];
  };
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
  chalkboardIllustrations: Array<{
    title: string;
    figureLabel: string;
    drawingGuideForTeacher: string;
    pupilNotebookInstructions: string;
    labelsToHighlight: string[];
  }>;
  commonStudentMisconceptions?: Array<{
    misconception: string;
    scientificOrGrammaticalCorrection: string;
    quickDiagnosticQuestion: string;
  }>;
  examClinicTips?: {
    frequentExamMistakes: string[];
    markingSchemeKeywords: string[];
    samplePastQuestion: {
      examBody: string;
      year: string;
      question: string;
      modelAnswer: string;
    };
  };
  extendedAssignment?: {
    takeHomeQuestions: string[];
    handsOnProjectOrLocalFieldWork: string;
  };
  pedagogicalTip?: string;
  wordCount?: number;
}

export interface ComprehensiveCurriculumOutput {
  topicBreakdown: TopicBreakdownOutput;
  lessonPlan: FullLessonPlanOutput;
  lessonNote: FullLessonNoteOutput;
  visual3DSpec: Visual3DConceptSpec;
  cheatSheet?: TeacherCheatSheet;
  misconceptions?: MisconceptionAlert[];
  meta?: {
    modelUsed: string;
    standard: string;
    regulatoryBodies: string[];
    generatedAt: string;
  };
}

/**
 * Automatically determine the most pedagogically appropriate 3D model for a topic
 */
export function derive3DConceptSpec(subject: string, topic: string, level: string = 'sss1'): Visual3DConceptSpec {
  const s = (subject || '').toLowerCase();
  const t = (topic || '').toLowerCase();

  // 1. Cardiovascular / Organ Systems -> Heart
  if (s.includes('bio') || s.includes('health') || t.includes('heart') || t.includes('circulat') || t.includes('blood')) {
    return {
      modelType: 'heart_model',
      title: 'Human Circulatory & Heart Anatomy',
      subjectDomain: 'Biology & Life Sciences',
      description: 'PBR 3D anatomical model showing left/right atria, ventricles, aorta, and pulmonary valves with rhythmic cardiac contraction.',
      curriculumStandard: 'NERDC JSS 2 / SSS 1 Biology — Transport System in Living Organisms',
      interactiveParts: [
        { name: 'Aorta (Arterial Arch)', color: '#EF4444', description: 'Carries oxygenated blood under high pressure to systemic tissues.' },
        { name: 'Ventricles (Left & Right)', color: '#B91C1C', description: 'Muscular pumping chambers driving pulmonary and systemic circulation.' },
        { name: 'Vena Cava & Atria', color: '#3B82F6', description: 'Receives deoxygenated blood from upper and lower extremities.' },
      ],
      suggestedAnimation: 'pulse',
      pedagogicalAnnotation: 'Emphasize thick muscular wall of left ventricle compared to right ventricle.',
    };
  }

  // 2. Genetics / DNA -> DNA
  if (t.includes('dna') || t.includes('gene') || t.includes('heredity') || t.includes('chromosom') || t.includes('mendel')) {
    return {
      modelType: 'dna',
      title: 'Deoxyribonucleic Acid (DNA) Double Helix',
      subjectDomain: 'Genetics & Molecular Biology',
      description: 'Right-handed B-DNA double helix with complementary purine-pyrimidine base-pairing (A-T with 2 H-bonds, G-C with 3 H-bonds) and antiparallel sugar-phosphate backbones.',
      curriculumStandard: 'NERDC SSS 2/3 Biology — Heredity & Genetic Code',
      interactiveParts: [
        { name: 'Sugar-Phosphate Rails', color: '#3B82F6', description: 'Alternating deoxyribose sugars and phosphate ester linkages forming the structural backbone.' },
        { name: 'Adenine-Thymine Pairs', color: '#10B981', description: 'Double hydrogen-bonded nitrogenous base rungs.' },
        { name: 'Guanine-Cytosine Pairs', color: '#F59E0B', description: 'Triple hydrogen-bonded base pairs conferring higher thermal denaturation stability.' },
      ],
      suggestedAnimation: 'rotate',
      pedagogicalAnnotation: 'Direct students to observe major and minor grooves where regulatory transcription factor proteins bind.',
    };
  }

  // 3. Chemistry / Atomic Structure -> Atom
  if (s.includes('chem') || t.includes('atom') || t.includes('electron') || t.includes('orbital') || t.includes('matter')) {
    return {
      modelType: 'atom',
      title: 'Bohr-Rutherford Atomic Shell & Orbital Model',
      subjectDomain: 'Chemistry & Atomic Physics',
      description: 'Nucleus containing protons and neutrons surrounded by quantized electron energy shells (K, L, M) exhibiting probabilistic orbital motion.',
      curriculumStandard: 'NERDC JSS 3 Basic Science / SSS 1 Chemistry — Atomic Structure',
      interactiveParts: [
        { name: 'Protons & Neutrons (Nucleus)', color: '#EF4444', description: 'Dense positively charged center accounting for 99.9% of atomic mass.' },
        { name: 'Inner K-Shell Electrons', color: '#06B6D4', description: 'Principal quantum number n=1 holding maximum 2 electrons.' },
        { name: 'Valence Electrons', color: '#8B5CF6', description: 'Outermost shell electrons determining chemical bonding and valency.' },
      ],
      suggestedAnimation: 'orbit',
      pedagogicalAnnotation: 'Remind students that real quantum mechanical orbitals are 3D probability clouds, not fixed mechanical orbits.',
    };
  }

  // 4. Default: Mathematics & Polyhedrons -> Polyhedron
  return {
    modelType: 'polyhedron',
    title: '3D Spatial Geometry & Inscribed Polyhedron',
    subjectDomain: 'Mathematics & Spatial Geometry',
    description: 'Rotating geometric cube with inscribed dual octahedron, orthogonal coordinate axes, and vertex indices for mensuration proofs.',
    curriculumStandard: 'NERDC JSS 1-3 / SSS 1 General Mathematics — Mensuration & Solid Shapes',
    interactiveParts: [
      { name: 'Orthogonal Faces', color: '#6366F1', description: '6 congruent square plane boundaries enclosing spatial volume s³.' },
      { name: 'Internal Polyhedral Core', color: '#EC4899', description: 'Dual inscribed octahedron demonstrating face-center duality.' },
      { name: 'Coordinate Axes', color: '#10B981', description: 'Three perpendicular Cartesian axes (X, Y, Z).' },
    ],
    suggestedAnimation: 'rotate',
    pedagogicalAnnotation: 'Challenge students to verify Euler\'s formula (V - E + F = 2) on the outer cube and inner octahedron.',
  };
}
