/**
 * EduPlan NG - AI Curriculum Engine & Orchestration Layer
 * 
 * Strict Statutory Compliance:
 * - NERDC (National Educational Research and Development Council, Abuja)
 * - Lagos State Ministry of Basic & Secondary Education OEQA (Office of Education Quality Assurance, Alausa)
 * - Nigerian Unified Scheme of Work (JSS 1-3 & SSS 1-3)
 */

import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import {
  LESSON_PLAN_SYSTEM_INSTRUCTION,
  LESSON_NOTE_SYSTEM_INSTRUCTION,
  TOPIC_BREAKDOWN_SYSTEM_INSTRUCTION,
  CHEAT_SHEET_SYSTEM_INSTRUCTION,
  MISCONCEPTIONS_SYSTEM_INSTRUCTION,
  buildLessonPlanPrompt,
  buildLessonNotePrompt,
  buildTopicBreakdownPrompt,
  buildCheatSheetPrompt,
  buildMisconceptionsPrompt,
  getCoreSkillsForSubject,
} from './prompts.ts';
import { generateNerdcOeqaContent } from '../../data/allCurriculumSubjects.ts';

// Model Architecture: Use gemini-4-hydrogen with ThinkingLevel.LOW for fast NERDC-aligned curriculum generation
const PRIMARY_MODEL = process.env.GEMINI_PRO_MODEL || 'gemini-4-hydrogen';
const FAST_MODEL = process.env.GEMINI_FLASH_MODEL || 'gemini-4-hydrogen';


export interface CurriculumGenerateParams {
  subject: string;
  level: string; // e.g. 'jss1', 'jss2', 'jss3', 'sss1', 'sss2', 'sss3'
  term: number; // 1, 2, or 3
  week: number; // 1 to 13
  topic: string;
  outputType?: 'all' | 'topic_breakdown' | 'lesson_plan' | 'lesson_note';
  language?: 'en' | 'yo' | 'ig' | 'ha';
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
  keyVocabulary: string[];
  estimatedPeriods: number;
}

export interface OEQAStep {
  stepNumber: number;
  stageName: string;
  durationMinutes: number;
  teacherActivity: string;
  studentActivity: string;
  teachingMethod: string;
  materialsUsed: string[];
  evaluationRemark: string;
}

export interface FullLessonPlanOutput {
  subject: string;
  level: string;
  term: number;
  week: number;
  topic: string;
  duration: string;
  averageAgeYears: number;
  behavioralObjectives: string[];
  subjectSkillsMapping: Array<{
    skill: string;
    objectiveIndex: number;
    objectiveText: string;
    rationale: string;
  }>;
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
  commonStudentMisconceptions: Array<{
    misconception: string;
    scientificOrGrammaticalCorrection: string;
    quickDiagnosticQuestion: string;
  }>;
  examClinicTips: {
    frequentExamMistakes: string[];
    markingSchemeKeywords: string[];
    samplePastQuestion: {
      examBody: string;
      year: string;
      question: string;
      modelAnswer: string;
    };
  };
  extendedAssignment: {
    takeHomeQuestions: string[];
    handsOnProjectOrLocalFieldWork: string;
  };
  pedagogicalTip?: string;
  wordCount: number;
}

export interface TeacherCheatSheet {
  lessonTopic: string;
  level: string;
  subject?: string;
  coreConcept: string; // 1 concise paragraph
  mustKnowFacts: string[]; // exactly 3 key facts
  localExamples: string[]; // exactly 2 Nigerian contextual examples
}

export interface MisconceptionAlert {
  misconception: string;
  teacherCorrection: string;
}

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
  suggestedAnimation: 'pulse' | 'rotate' | 'orbit' | 'oscillate';
  pedagogicalAnnotation: string;
}

export interface ComprehensiveCurriculumOutput {
  topicBreakdown: TopicBreakdownOutput;
  lessonPlan: FullLessonPlanOutput;
  lessonNote: FullLessonNoteOutput;
  visual3DSpec: Visual3DConceptSpec;
  cheatSheet?: TeacherCheatSheet;
  misconceptions?: MisconceptionAlert[];
  meta: {
    modelUsed: string;
    standard: string;
    regulatoryBodies: string[];
    generatedAt: string;
  };
}

/**
 * Safely parse JSON returned from LLMs, stripping markdown codeblocks
 */
function cleanAndParseJson<T>(rawText: string, fallback: T): T {
  try {
    let clean = rawText.trim();
    if (clean.startsWith('```json')) {
      clean = clean.replace(/^```json\s*/i, '').replace(/```\s*$/i, '');
    } else if (clean.startsWith('```')) {
      clean = clean.replace(/^```\s*/i, '').replace(/```\s*$/i, '');
    }
    return JSON.parse(clean.trim()) as T;
  } catch (err) {
    console.warn('[CurriculumEngine] Failed to parse LLM JSON output. Using statutory fallback.', err);
    return fallback;
  }
}

/**
 * Automatically determine the most pedagogically appropriate 3D model for a topic
 */
export function derive3DConceptSpec(subject: string, topic: string, level: string): Visual3DConceptSpec {
  const s = subject.toLowerCase();
  const t = topic.toLowerCase();

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
      pedagogicalAnnotation: 'WAEC Key Requirement: Distinguish between pulmonary artery (deoxygenated) and pulmonary vein (oxygenated).',
    };
  }

  if (t.includes('dna') || t.includes('gene') || t.includes('heredity') || t.includes('chromosom') || t.includes('mendel')) {
    return {
      modelType: 'dna_helix',
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

  if (s.includes('agric') || t.includes('plant') || t.includes('cell') || t.includes('chloroplast') || t.includes('photosynth') || t.includes('crop')) {
    if (s.includes('agric') && (t.includes('soil') || t.includes('erosion') || t.includes('profile') || t.includes('horizon'))) {
      return {
        modelType: 'soil_profile',
        title: '3D Soil Profile Horizon Monolith',
        subjectDomain: 'Agricultural Science & Soil Pedology',
        description: 'Layered agricultural soil horizon cutaway illustrating organic litter (O), arable topsoil (A), mineral subsoil (B), and parent rock (C/R).',
        curriculumStandard: 'NERDC JSS 1-3 / SSS 1-2 Agricultural Science — Soil Formation & Composition',
        interactiveParts: [
          { name: 'Horizon O (Humus Layer)', color: '#451a03', description: 'Decomposed organic matter crucial for soil moisture and nutrient retention.' },
          { name: 'Horizon A (Topsoil & Roots)', color: '#78350f', description: 'Dark fertile layer sustaining crop root systems and microbial life.' },
          { name: 'Horizon B (Mineral Subsoil)', color: '#d97706', description: 'Clay and iron oxide accumulation zone.' },
          { name: 'Horizon C/R (Parent Bedrock)', color: '#64748b', description: 'Weathered rock substrate undergoing mechanical pedogenesis.' },
        ],
        suggestedAnimation: 'rotate',
        pedagogicalAnnotation: 'Demonstrate why organic matter retention in Horizon A prevents severe erosion in Nigerian farmland.',
      };
    }
    return {
      modelType: 'plant_cell',
      title: 'Eukaryotic Plant Cell & Chloroplast Architecture',
      subjectDomain: 'Biology & Agricultural Science',
      description: 'Interactive 3D eukaryotic plant cell featuring rigid cellulose cell wall, large central vacuole, nucleus, and photosynthetic chloroplasts.',
      curriculumStandard: 'NERDC JSS 1 Basic Science / SSS 1 Biology — Cell Structure & Organization',
      interactiveParts: [
        { name: 'Cellulose Cell Wall', color: '#15803d', description: 'Rigid outer boundary providing turgor pressure and skeletal support.' },
        { name: 'Central Vacuole', color: '#38bdf8', description: 'Osmotic pressure regulator storing cell sap and mineral ions.' },
        { name: 'Chloroplasts', color: '#22c55e', description: 'Double-membrane photosynthetic organelles converting light energy to glucose.' },
        { name: 'Nucleus & Nucleolus', color: '#db2777', description: 'Repository of genetic information orchestrating metabolic activity.' },
      ],
      suggestedAnimation: 'rotate',
      pedagogicalAnnotation: 'Highlight distinguishing characteristics: plant cells possess cell walls and chloroplasts, absent in animal cells.',
    };
  }

  if (s.includes('chem') || t.includes('atom') || t.includes('element') || t.includes('periodic') || t.includes('bond') || t.includes('matter')) {
    return {
      modelType: 'atom_model',
      title: 'Rutherford-Bohr Atomic Structure & Orbitals',
      subjectDomain: 'Chemistry & Physical Sciences',
      description: 'Interactive PBR model showing the dense nucleus (protons & neutrons) surrounded by quantized electron orbital energy levels (K, L, M shells).',
      curriculumStandard: 'NERDC JSS 2 Basic Science / SSS 1 Chemistry — Atomic Structure & Chemical Bonding',
      interactiveParts: [
        { name: 'Nucleus (Protons + Neutrons)', color: '#DC2626', description: 'Dense central core containing nearly 99.9% of atomic mass.' },
        { name: 'Electron Energy Shells', color: '#06B6D4', description: 'Quantized energy shells (2n² capacity) where electrons orbit at relativistic speeds.' },
        { name: 'Valence Electrons', color: '#FBBF24', description: 'Outer-shell electrons responsible for chemical reactivity and covalent/ionic bonding.' },
      ],
      suggestedAnimation: 'orbit',
      pedagogicalAnnotation: 'Bloom Analysis: Explain why noble gases have zero electronegativity using the octet rule.',
    };
  }

  if (s.includes('physic') || s.includes('tech') || t.includes('motor') || t.includes('electr') || t.includes('magnet') || t.includes('energy')) {
    if (t.includes('light') || t.includes('optic') || t.includes('prism') || t.includes('refract') || t.includes('wave') || t.includes('lens')) {
      return {
        modelType: 'optics_prism',
        title: 'Triangular Glass Prism & Spectral Dispersion',
        subjectDomain: 'Physics & Geometric Optics',
        description: '3D equilateral glass prism demonstrating Snell’s Law of refraction and chromatic dispersion of polychromatic white light into ROYGBIV spectrum.',
        curriculumStandard: 'NERDC SSS 2 Physics — Light Waves & Refraction',
        interactiveParts: [
          { name: 'Incident White Beam', color: '#ffffff', description: 'Composite electromagnetic wave entering at angle of incidence.' },
          { name: 'Flint Glass Refracting Prism', color: '#38bdf8', description: 'Dispersive optical medium with frequency-dependent refractive index.' },
          { name: 'Dispersed Visible Spectrum', color: '#ec4899', description: 'Angularly separated wavelengths from red (700nm) to violet (400nm).' },
        ],
        suggestedAnimation: 'rotate',
        pedagogicalAnnotation: 'Explain why violet light with higher frequency experiences greater refractive deviation than red light.',
      };
    }
    return {
      modelType: 'electric_motor',
      title: 'Direct Current (DC) Electric Motor & Armature',
      subjectDomain: 'Physics & Basic Technology',
      description: 'PBR electromechanical model illustrating Fleming’s Left-Hand Rule, magnetic flux lines, carbon brushes, and commutator ring rotation.',
      curriculumStandard: 'NERDC SSS 2 Physics / JSS 3 Basic Technology — Electromagnetism & Electric Machines',
      interactiveParts: [
        { name: 'Armature Coil', color: '#D97706', description: 'Copper winding that experiences a mechanical Lorentz torque in the magnetic field.' },
        { name: 'Permanent Stator Magnets', color: '#2563EB', description: 'Establishes steady uniform magnetic flux density across the air gap.' },
        { name: 'Split-Ring Commutator', color: '#10B981', description: 'Reverses current direction every half-cycle to sustain continuous unidirectional rotation.' },
      ],
      suggestedAnimation: 'rotate',
      pedagogicalAnnotation: 'OEQA Safety Standard: Disconnect DC voltage source before adjusting carbon brush contacts.',
    };
  }

  if (s.includes('econ') || s.includes('comm') || s.includes('account') || s.includes('bus') || s.includes('market') || t.includes('trade') || t.includes('money') || t.includes('supply') || t.includes('demand') || t.includes('price')) {
    return {
      modelType: 'market_equilibrium',
      title: '3D Supply-Demand Equilibrium & Market Surface',
      subjectDomain: 'Economics, Commerce & Financial Accounting',
      description: 'Interactive 3D price-quantity coordinate plane showing intersection of downward-sloping Demand and upward-sloping Supply curves in Balogun commercial trade.',
      curriculumStandard: 'NERDC SSS 1 Economics / Commerce — Price Determination & Market Equilibrium',
      interactiveParts: [
        { name: 'Equilibrium Coordinate (P*, Q*)', color: '#10B981', description: 'Intersection point where market clears without surplus or shortage.' },
        { name: 'Downward Sloping Demand Surface', color: '#3B82F6', description: 'Consumer willingness to purchase at varying price thresholds.' },
        { name: 'Upward Sloping Supply Surface', color: '#EF4444', description: 'Commercial producer output responding to profitable price incentives.' },
        { name: 'Balogun Commercial Trade Vault', color: '#F59E0B', description: 'Naira settlement reserve and commercial ledger baseline.' },
      ],
      suggestedAnimation: 'rotate',
      pedagogicalAnnotation: 'Guide students to observe price ceilings: how fixing prices below P* induces commercial black-market shortages.',
    };
  }

  if (s.includes('civic') || s.includes('gov') || s.includes('social') || s.includes('polit') || t.includes('law') || t.includes('right') || t.includes('democ') || t.includes('court') || t.includes('constitut')) {
    return {
      modelType: 'civic_mace',
      title: 'Nigerian National Assembly Mace & Scales of Justice',
      subjectDomain: 'Civic Education, Government & Legal Studies',
      description: '3D constitutional realia featuring the National Assembly Mace of legislative sovereignty and the balanced scales of constitutional Rule of Law.',
      curriculumStandard: 'NERDC JSS 1-3 Civic Education / SSS 1-3 Government — Separation of Powers & Rule of Law',
      interactiveParts: [
        { name: 'Legislative Mace of Authority', color: '#F59E0B', description: 'Constitutional symbol of parliamentary legitimacy and rule of law.' },
        { name: 'Scales of Constitutional Justice', color: '#10B981', description: 'Balanced judicial impartiality between the state and citizens.' },
        { name: 'Executive Pillars of Governance', color: '#3B82F6', description: 'Three arms of government: Legislature, Executive, and Judiciary.' },
      ],
      suggestedAnimation: 'rotate',
      pedagogicalAnnotation: 'Emphasize that the Mace must be physically present in the legislative chamber for any statutory Nigerian act to be passed into law.',
    };
  }

  if (s.includes('geog') || t.includes('earth') || t.includes('globe') || t.includes('continent') || t.includes('equator') || t.includes('climate') || t.includes('map') || t.includes('relief')) {
    return {
      modelType: 'earth_globe',
      title: '3D Rotating Terrestrial Globe with Nigerian Coordinates',
      subjectDomain: 'Geography & Environmental Studies',
      description: 'Physically based earth sphere with latitude/longitude grid, prime meridian, equator, and high-visibility pin over Nigeria (9° N, 8° E).',
      curriculumStandard: 'NERDC JSS 1 Social Studies / SSS 1 Geography — The Earth in the Solar System',
      interactiveParts: [
        { name: 'Federal Republic of Nigeria Pin (9°N, 8°E)', color: '#059669', description: 'Tropical West African nation spanning mangrove coast to Sahel savanna.' },
        { name: 'Equator Reference Ring (0° Lat)', color: '#DC2626', description: 'Divides Northern and Southern Hemispheres; regulates tropical solar insolation.' },
        { name: 'Greenwich Meridian (0° Long)', color: '#3B82F6', description: 'International time reference line for West African Time (WAT = UTC+1).' },
      ],
      suggestedAnimation: 'rotate',
      pedagogicalAnnotation: 'WAEC Practical Geography: Calculate local mean time differences based on 15° longitude per 1 hour.',
    };
  }

  if (s.includes('yor') || s.includes('igb') || s.includes('hau') || s.includes('creat') || s.includes('art') || s.includes('music') || t.includes('drum') || t.includes('cultur') || t.includes('tradit')) {
    if (s.includes('art') || t.includes('sculpt') || t.includes('benin') || t.includes('bronze') || t.includes('museum')) {
      return {
        modelType: 'benin_bronze',
        title: 'Benin Royal Bronze Head & Cultural Heritage Sculpture',
        subjectDomain: 'Cultural & Creative Arts / History',
        description: '3D lost-wax patinated cast bronze head of Benin Kingdom royal lineage adorned with beaded coral crown and tiered choker necklaces.',
        curriculumStandard: 'NERDC JSS 1-3 / SSS 1 Cultural & Creative Arts — Nigerian Art Traditions & Crafts',
        interactiveParts: [
          { name: 'Coral Beaded Crown (Ode)', color: '#EF4444', description: 'Regal headdress symbolizing divine royalty and spiritual lineage.' },
          { name: 'Tiered Neck Choker (Ike)', color: '#F59E0B', description: 'Multiple rows of precious cylindrical Mediterranean coral beads.' },
          { name: 'Patinated Bronze Alloy Casing', color: '#D97706', description: 'High-tin bronze alloy cast through indigenous cire perdue method.' },
        ],
        suggestedAnimation: 'rotate',
        pedagogicalAnnotation: 'Explain how the 16th-century Benin Kingdom developed advanced metallurgical casting before modern industrial methods.',
      };
    }
    return {
      modelType: 'talking_drum',
      title: 'Nigerian Talking Drum (Gàngan / Igba / Kalangu)',
      subjectDomain: 'Nigerian Languages & Cultural Musicology',
      description: '3D acoustic hour-glass Nigerian talking drum with adjustable leather tension chords, goat-skin resonating drumheads, and curved striker mallet.',
      curriculumStandard: 'NERDC JSS 1-3 Yorùbá / Igbo / Hausa — Indigenous Musical Instruments & Tonal Communication',
      interactiveParts: [
        { name: 'Carved Resonating Hardwood Body', color: '#78350F', description: 'Acoustically tuned hourglass wood cavity amplifying pitch vibrations.' },
        { name: 'Leather Tension Tuning Thongs', color: '#D97706', description: 'Longitudinal leather chords squeezed under arm to modulate tonal pitch.' },
        { name: 'Vibrating Untanned Drumhead', color: '#FDE68A', description: 'Animal membrane skin producing high-tonal vowel frequencies (Do-Re-Mi).' },
        { name: 'Curved Striker Mallet', color: '#92400E', description: 'Traditional hooked wooden beater delivering resonant percussive strikes.' },
      ],
      suggestedAnimation: 'rotate',
      pedagogicalAnnotation: 'Demonstrate how pitch changes mimic the three phonemic tones of Nigerian languages: high (á), mid (a), and low (à).',
    };
  }

  if (s.includes('eng') || s.includes('lit') || t.includes('read') || t.includes('gramm') || t.includes('drama') || t.includes('prose') || t.includes('poet') || t.includes('novel')) {
    return {
      modelType: 'printing_press',
      title: 'Literary Printing Press & Illuminated Lexical Codex',
      subjectDomain: 'English Studies & Literature in English',
      description: '3D classical movable-type printing press and open folio codex illustrating orthographic composition, vocabulary, and dramatic staging.',
      curriculumStandard: 'NERDC JSS 1-3 English Studies / SSS 1-3 Literature in English — Reading, Grammar & Dramatic Arts',
      interactiveParts: [
        { name: 'Open Illuminated Codex Folio', color: '#F8FAFC', description: 'Dual parchment pages with structured lexical typography and chapter headers.' },
        { name: 'Movable Lead-Alloy Type Matrix', color: '#475569', description: 'Inverted font characters arranged for uniform mechanical ink transfer.' },
        { name: 'Heavy Oak Pressure Platen & Screw', color: '#78350F', description: 'Mechanical press lever exerting balanced downward force for clarity.' },
      ],
      suggestedAnimation: 'rotate',
      pedagogicalAnnotation: 'Connect the invention of print to the democratization of English grammar standards and literary publications.',
    };
  }

  if (s.includes('draw') || s.includes('tech') || t.includes('gear') || t.includes('isomet') || t.includes('machin') || t.includes('tool')) {
    return {
      modelType: 'isometric_gears',
      title: 'Interlocking Engineering Spur Gears & Isometric Datum',
      subjectDomain: 'Technical Drawing & Basic Technology',
      description: '3D mechanical assembly featuring interlocking involute spur gears, transmission shafts, and an isometric 30°-60° coordinate reference datum.',
      curriculumStandard: 'NERDC JSS 2 Basic Technology / SSS 1 Technical Drawing — Mechanical Drive Systems & Isometric Projection',
      interactiveParts: [
        { name: 'Driving Pinion Gear', color: '#2563EB', description: 'Small input spur gear transmitting rotational angular velocity.' },
        { name: 'Driven Bull Gear', color: '#10B981', description: 'Larger output gear achieving statutory mechanical advantage.' },
        { name: 'Machined Transmission Shaft', color: '#94A3B8', description: 'Precision ground steel shaft transmitting torsional torque.' },
        { name: 'Isometric Datum Coordinate Block', color: '#F59E0B', description: 'Standard 30° isometric axes for technical dimensioning proofs.' },
      ],
      suggestedAnimation: 'rotate',
      pedagogicalAnnotation: 'Calculate the gear velocity ratio: Gear Ratio = Number of Teeth on Driven Gear / Number of Teeth on Driver Gear.',
    };
  }

  if (s.includes('relig') || s.includes('crs') || s.includes('irs') || s.includes('crk') || s.includes('irk') || s.includes('christ') || s.includes('islam') || t.includes('bible') || t.includes('quran') || t.includes('faith')) {
    return {
      modelType: 'sanctuary_ark',
      title: 'Sacred Sanctuary Ark & Scripture Lectern Realia',
      subjectDomain: 'Christian & Islamic Religious Studies',
      description: '3D sacred sanctuary ark and scriptural lectern highlighting moral governance, historic covenant covenants, and moral ethics in Nigerian society.',
      curriculumStandard: 'NERDC JSS 1-3 CRS / IRS — Moral Values, Faith & Civil Responsibility',
      interactiveParts: [
        { name: 'Gilded Sanctuary Ark (Mercy Seat)', color: '#F59E0B', description: 'Historic sacred reliquary covered in pure gold leaf with cherubim wings.' },
        { name: 'Illuminated Scriptural Lectern', color: '#78350F', description: 'Traditional wooden reading desk holding the foundational sacred scriptures.' },
        { name: 'Pillar of Covenant Morals', color: '#E2E8F0', description: 'Marble foundation stones reminding citizens of divine laws and truthfulness.' },
      ],
      suggestedAnimation: 'rotate',
      pedagogicalAnnotation: 'Relate the moral commandments to civic integrity and anti-corruption ethics in contemporary Nigeria.',
    };
  }

  if (s.includes('physic') && s.includes('health') || s.includes('phe') || s.includes('sport') || t.includes('skelet') || t.includes('joint') || t.includes('bone') || t.includes('muscle') || t.includes('postur')) {
    return {
      modelType: 'human_skeleton',
      title: 'Biomechanical Joint & Skeletal Lever System',
      subjectDomain: 'Physical & Health Education / Anatomy',
      description: '3D articulated synovial joint showing ball-and-socket fulcrum, cartilaginous meniscus, and agonist-antagonist muscular tendons in human athletic locomotion.',
      curriculumStandard: 'NERDC JSS 1-3 PHE — Skeletal Framework, Posture & Athletic Locomotion',
      interactiveParts: [
        { name: 'Synovial Ball-and-Socket Fulcrum', color: '#E2E8F0', description: 'Articulating smooth cartilage capsule providing multi-axis rotation.' },
        { name: 'Agonist Flexor Muscular Cable', color: '#DC2626', description: 'Contracting muscle belly generating mechanical effort along bone levers.' },
        { name: 'Tendon Insertion Attachment', color: '#38BDF8', description: 'Fibrous collagenous band anchoring contractile force directly onto bone.' },
      ],
      suggestedAnimation: 'rotate',
      pedagogicalAnnotation: 'Explain the three classes of levers in human body mechanics: Class 1 (neck/nodding), Class 2 (calf/heel-raise), Class 3 (biceps flex).',
    };
  }

  return {
    modelType: 'geometry_cube',
    title: `${topic} — 3D Conceptual Model`,
    subjectDomain: subject,
    description: `Interactive pedagogical 3D solid model demonstrating spatial dimensions and structural principles of ${topic}.`,
    curriculumStandard: `NERDC Approved National Curriculum Guide for ${level.toUpperCase()} ${subject}`,
    interactiveParts: [
      { name: 'Orthogonal Faces', color: '#6366F1', description: '6 congruent square plane boundaries enclosing spatial volume s³.' },
      { name: 'Internal Polyhedral Core', color: '#EC4899', description: 'Dual inscribed octahedron demonstrating face-center duality.' },
      { name: 'Coordinate Axes', color: '#10B981', description: 'Three perpendicular Cartesian axes (X, Y, Z).' },
    ],
    suggestedAnimation: 'rotate',
    pedagogicalAnnotation: 'Review this 3D model during Step 3 of the Lagos OEQA presentation.',
  };
}

/**
 * AI Curriculum Engine Service
 */
export class AICurriculumEngine {
  private ai: GoogleGenAI | null = null;

  private getClient(): GoogleGenAI | null {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) return null;
    if (!this.ai) {
      try {
        this.ai = new GoogleGenAI({
          apiKey,
          httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
        });
      } catch (e) {
        console.warn('[CurriculumEngine] Could not initialize GoogleGenAI client with key, using fallback.', e);
        return null;
      }
    }
    return this.ai;
  }

  /**
   * Generates a structured topic breakdown with subtopics and prior knowledge
   */
  async generateTopicBreakdown(params: CurriculumGenerateParams): Promise<TopicBreakdownOutput> {
    const { subject, level, term, week, topic } = params;
    const coreSkills = getCoreSkillsForSubject(subject);
    const synth = generateNerdcOeqaContent({
      level,
      subject,
      topic,
      week,
      term,
      language: params.language || 'en',
    });

    const fallback: TopicBreakdownOutput = {
      subject,
      level,
      term,
      week,
      topic,
      subtopics: [
        `Fundamental concepts and historical background of ${topic}`,
        `Statutory operational laws, properties, and core rules`,
        `Practical demonstrations and contextual Nigerian examples`,
        `Formative assessment drills and classroom summary`,
      ],
      learningObjectives: synth.objectives,
      requiredPriorKnowledge: [
        synth.previousKnowledge,
        `Basic understanding of prior week ${week > 1 ? week - 1 : 1} syllabus concepts`,
        `Familiarity with standard classroom instructional realia`,
      ],
      coreCompetencies: coreSkills,
      keyVocabulary: ['Principle', 'Formula', 'Application', 'Observation', 'Analysis'],
      estimatedPeriods: 2,
    };

    const client = this.getClient();
    if (!client) return fallback;

    try {
      const prompt = buildTopicBreakdownPrompt(params);
      const response = await client.models.generateContent({
        model: FAST_MODEL,
        contents: prompt,
        config: {
          systemInstruction: TOPIC_BREAKDOWN_SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      });

      const text = response.text || '';
      return cleanAndParseJson<TopicBreakdownOutput>(text, fallback);
    } catch (err: any) {
      const isQuota = err?.status === 429 || String(err).includes('quota') || String(err).includes('429');
      if (isQuota) {
        console.warn(`[CurriculumEngine] Free tier rate limit for topic breakdown. Using statutory fallback.`);
      } else {
        console.warn('[CurriculumEngine] generateTopicBreakdown LLM call failed. Using statutory fallback.', err?.message || err);
      }
      return fallback;
    }
  }


  /**
   * Generates an official administrative Lesson Plan (OEQA 5-Step Tabular format)
   */
  async generateLessonPlan(params: CurriculumGenerateParams): Promise<FullLessonPlanOutput> {
    const { subject, level, term, week, topic } = params;
    const synth = generateNerdcOeqaContent({
      level,
      subject,
      topic,
      week,
      term,
      language: params.language || 'en',
    });

    const fallback: FullLessonPlanOutput = {
      subject,
      level,
      term,
      week,
      topic,
      duration: '40 mins',
      averageAgeYears: level.startsWith('j') ? 12 : 16,
      behavioralObjectives: synth.objectives,
      subjectSkillsMapping: [
        {
          skill: 'Critical Thinking',
          objectiveIndex: 1,
          objectiveText: synth.objectives[0] || `Define and state the core principles of ${topic}`,
          rationale: 'Fosters conceptual clarity and cognitive recall in accordance with NERDC standards.',
        },
        {
          skill: 'Problem Solving',
          objectiveIndex: 2,
          objectiveText: synth.objectives[1] || `Apply statutory formulas and methods to practical classroom exercises`,
          rationale: 'Develops quantitative and algorithmic capability for WAEC and BECE examinations.',
        },
      ],
      instructionalMaterials: synth.materials,
      visualAids: [
        {
          id: 'va_1',
          title: `Chalkboard Diagram: Schematic Structure of ${topic}`,
          type: 'Chalkboard Sketch / Wall Chart',
          description: 'High-contrast illustrative drawing detailing primary components and directional flows.',
        },
      ],
      entryBehavior: synth.previousKnowledge,
      setInduction: synth.introduction,
      presentationSteps: [
        {
          stepNumber: 1,
          stageName: 'Step 1: Set Induction & Prior Knowledge',
          durationMinutes: 5,
          teacherActivity: synth.teacherActivity.split('\n')[0] || `Review previous week's work and link prior knowledge to ${topic}.`,
          studentActivity: synth.studentActivity.split('\n')[0] || `Recall prerequisite facts and answer entry behavior oral questions.`,
          teachingMethod: 'Interactive Question & Answer',
          materialsUsed: ['Chalkboard', 'Specimen Flashcard'],
          evaluationRemark: 'Learners demonstrate 85% recall of foundational terms.',
        },
        {
          stepNumber: 2,
          stageName: 'Step 2: Exploration & Concept Introduction',
          durationMinutes: 8,
          teacherActivity: `Present instructional realia and introduce the primary definition of ${topic} on the board.`,
          studentActivity: `Observe the demonstration, record new vocabulary in exercise books, and participate in guided discovery.`,
          teachingMethod: 'Guided Discovery & Demonstration',
          materialsUsed: synth.materials.slice(0, 2),
          evaluationRemark: 'Active engagement observed across all seating rows.',
        },
        {
          stepNumber: 3,
          stageName: 'Step 3: Teacher Explanation & Chalkboard Note',
          durationMinutes: 12,
          teacherActivity: synth.teacherActivity,
          studentActivity: synth.studentActivity,
          teachingMethod: 'Expository & Chalkboard Illustration',
          materialsUsed: ['Chalkboard', 'Ruler', 'Wall Chart'],
          evaluationRemark: 'Checking comprehension through targeted questions.',
        },
        {
          stepNumber: 4,
          stageName: 'Step 4: Guided Group / Individual Practice',
          durationMinutes: 10,
          teacherActivity: `Circulate the classroom, checking exercise books, guiding struggling learners, and marking working steps.`,
          studentActivity: `Solve two in-class practice problems independently or in learning pairs.`,
          teachingMethod: 'Individual Practice & Drill',
          materialsUsed: ['Pupil Exercise Books', 'NERDC Recommended Textbook'],
          evaluationRemark: 'Corrective feedback provided to mixed-ability learners.',
        },
        {
          stepNumber: 5,
          stageName: 'Step 5: Formative Evaluation & Golden Summary',
          durationMinutes: 5,
          teacherActivity: synth.evaluation,
          studentActivity: `Answer rapid oral evaluation questions and copy the golden takeaway into notebooks.`,
          teachingMethod: 'Formative Assessment & Classroom Summary',
          materialsUsed: ['Chalkboard'],
          evaluationRemark: 'Satisfactory mastery of core lesson objectives verified.',
        },
      ],
      formativeEvaluationQuestions: [
        `1. What is the statutory definition of ${topic} in Nigerian secondary education?`,
        `2. Explain two practical everyday applications of ${topic} within Nigeria.`,
        `3. Solve the demonstration exercise given on the chalkboard with full working steps.`,
      ],
      homeworkAssignment: synth.assignment,
      differentiatedInstruction: synth.differentiatedInstruction,
      safetyPrecautions: synth.safetyPrecautions || 'Handle all teaching apparatus with standard laboratory and classroom precautions.',
      pedagogicalTip: `Think-Pair-Share Strategy: Have students spend 2 minutes thinking independently about how ${topic} applies to their everyday home or local community, 2 minutes discussing their thoughts with a seat partner, and then call on 3 pairs to share with the whole class before writing the main definition on the board.`,
      curriculumReference: `NERDC Approved National Curriculum Guide / Lagos State Unified Scheme of Work for ${level.toUpperCase()} ${subject}, Week ${week}.`,
    };

    const client = this.getClient();
    if (!client) return fallback;

    try {
      const prompt = buildLessonPlanPrompt(params);
      const response = await client.models.generateContent({
        model: PRIMARY_MODEL,
        contents: prompt,
        config: {
          systemInstruction: LESSON_PLAN_SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      });

      const text = response.text || '';
      return cleanAndParseJson<FullLessonPlanOutput>(text, fallback);
    } catch (err: any) {
      const isQuota = err?.status === 429 || String(err).includes('quota') || String(err).includes('429');
      if (isQuota) {
        console.warn(`[CurriculumEngine] Free tier rate limit reached for lesson plan (${PRIMARY_MODEL}). Using statutory fallback.`);
      } else {
        console.warn('[CurriculumEngine] generateLessonPlan LLM call failed. Using statutory fallback.', err?.message || err);
      }
      return fallback;
    }
  }

  /**
   * Generates an exhaustive Teacher-facing Chalkboard Lesson Note
   */
  async generateLessonNote(params: CurriculumGenerateParams): Promise<FullLessonNoteOutput> {
    const { subject, level, term, week, topic } = params;
    const synth = generateNerdcOeqaContent({
      level,
      subject,
      topic,
      week,
      term,
      language: params.language || 'en',
    });

    const fallback: FullLessonNoteOutput = {
      subject,
      level,
      term,
      week,
      topic,
      teacherDeliveryScript: {
        hookNarrative: `Good morning class. Today we explore an essential concept in ${subject} that touches our everyday lives in Nigeria: ${topic}. Pay keen attention as we unpack its core principles and examination applications.`,
        coreLectureNarrative: typeof synth.lessonNote === 'string'
          ? synth.lessonNote
          : `${synth.lessonNote?.definitions || ''}\n\n${synth.lessonNote?.workedExamples || ''}\n\n${synth.lessonNote?.blackboardSummary || ''}`,
        analogyNigerianContext: `Consider how a local commercial hub like Mile 12 Market or an industrial facility in Ikeja organizes flow and balance—this mirrors the exact mechanism governing ${topic}.`,
        teacherScriptPointers: [
          'Pause after writing the primary definition to ensure all pupils have copied it verbatim.',
          'Highlight operational units with colored chalk on the board.',
        ],
      },
      chalkboardNote: {
        chalkboardHeader: `${subject.toUpperCase()} | CLASS: ${level.toUpperCase()} | TERM ${term} | WEEK ${week}: ${topic.toUpperCase()}`,
        subtopicsSummary: [
          '1. Conceptual Definition & Core Properties',
          '2. Governing Mathematical / Empirical Laws',
          '3. Step-by-Step Worked Demonstration Examples',
          '4. Classroom Exercises & Summary Takeaways',
        ],
        conceptualDefinitions: [
          `Definition 1: ${topic} is defined strictly according to NERDC guidelines as the fundamental study and application of syllabus principles in ${subject}.`,
          `Definition 2: In practical and industrial contexts, it describes the systematic transformation and interaction of classroom components.`,
        ],
        theoreticalLawsAndRules: [
          `Governing Law 1: All operations must adhere to standard metric dimensions and conservation principles.`,
          `Governing Law 2: Boundary conditions dictate that secondary effects remain proportional to given inputs.`,
        ],
        workedClassroomExamples: [
          {
            exampleNumber: 1,
            problemStatement: `Standard WAEC/BECE classroom problem on ${topic} with complete initial values.`,
            stepByStepSolution: [
              'Step 1: Write down known and unknown quantities.',
              'Step 2: State the primary operational formula clearly.',
              'Step 3: Substitute the parameters and evaluate step by step.',
              'Step 4: Verify that final figures are rounded to standard significant numbers.',
            ],
            finalAnswerWithUnits: 'Evaluated final result with exact metric/Naira units.',
            pedagogicalPitfallWarning: 'Caution: Common candidate error involves omitting standard units or misplacing signs during calculation.',
          },
        ],
        blackboardSummaryRules: [
          'Rule 1: Always write formulas before substituting values in exams.',
          'Rule 2: Clearly label all diagrams with sharp pencil and capital letters.',
        ],
        inClassSeatworkDrill: [
          'Drill 1: Copy the chalkboard summary into your notes within 5 minutes.',
          'Drill 2: Solve the practice problem on the board independently.',
        ],
      },
      chalkboardIllustrations: [
        {
          title: `Chalkboard Diagram: Schematic Layout of ${topic}`,
          figureLabel: 'Figure 1',
          drawingGuideForTeacher: 'Draw a clean horizontal baseline. Divide the diagram into distinct colored sections showing inputs, processes, and outputs.',
          pupilNotebookInstructions: 'Rule a neat 1-inch left margin in exercise books, use pencil for drawing, and print labels in block capitals.',
          labelsToHighlight: ['Input Zone', 'Core Mechanism', 'Output Equilibrium'],
        },
      ],
      commonStudentMisconceptions: [
        {
          misconception: `Pupils often assume that ${topic} is purely theoretical with no practical relevance in daily life.`,
          scientificOrGrammaticalCorrection: `In truth, it is the underlying bedrock for engineering, commerce, and civic life across Nigeria.`,
          quickDiagnosticQuestion: `Can anyone give one example of ${topic} occurring in your household or neighborhood?`,
        },
      ],
      examClinicTips: {
        frequentExamMistakes: [
          'WAEC Chief Examiner Report: Candidates lose marks for incomplete workings and vague definitions.',
          'NECO Observation: Failure to state laws verbatim as approved by NERDC.',
        ],
        markingSchemeKeywords: [
          'Keyword 1 (Award 1 mark for correct definition)',
          'Formula declaration (Award M1 for correct substitution)',
          'Final accuracy (Award A1 with units)',
        ],
        samplePastQuestion: {
          examBody: level.startsWith('j') ? 'BECE' : 'WAEC',
          year: '2025 Past Examination Paper',
          question: `State two fundamental properties of ${topic} and calculate its primary magnitude given standard conditions (6 marks).`,
          modelAnswer: `Full model answer showing step-by-step mark distribution according to official scoring guide.`,
        },
      },
      extendedAssignment: {
        takeHomeQuestions: [
          `Question 1: Solve problem 3 in Section B of the NERDC approved textbook.`,
          `Question 2: Write a 1-page summary on how ${topic} is utilized in Nigerian industries.`,
        ],
        handsOnProjectOrLocalFieldWork: `Observe a local artisan or domestic setup in your neighborhood that illustrates ${topic} and record observations in your notebook.`,
      },
      pedagogicalTip: `Jigsaw Cooperative Learning Strategy: Divide the classroom into 4 expert groups covering sub-topics of ${topic}. Distribute everyday local materials (such as bottle caps, cardboards, or local market receipts) to make abstract ideas tangible before reconvening for whole-class synthesis.`,
      wordCount: 1150,
    };

    const client = this.getClient();
    if (!client) return fallback;

    try {
      const prompt = buildLessonNotePrompt(params);
      const response = await client.models.generateContent({
        model: PRIMARY_MODEL,
        contents: prompt,
        config: {
          systemInstruction: LESSON_NOTE_SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      });

      const text = response.text || '';
      return cleanAndParseJson<FullLessonNoteOutput>(text, fallback);
    } catch (err: any) {
      const isQuota = err?.status === 429 || String(err).includes('quota') || String(err).includes('429');
      if (isQuota) {
        console.warn(`[CurriculumEngine] Free tier rate limit reached for lesson note (${PRIMARY_MODEL}). Using statutory fallback.`);
      } else {
        console.warn('[CurriculumEngine] generateLessonNote LLM call failed. Using statutory fallback.', err?.message || err);
      }
      return fallback;
    }
  }

  /**
   * Orchestrates comprehensive content generation combining Topic Breakdown, Plan, Note, and 3D Spec
   */
  async generateComprehensiveContent(params: CurriculumGenerateParams): Promise<ComprehensiveCurriculumOutput> {
    const { outputType = 'all' } = params;

    const visual3DSpec = derive3DConceptSpec(params.subject, params.topic, params.level);

    // Run generations in parallel or by type
    if (outputType === 'topic_breakdown') {
      const topicBreakdown = await this.generateTopicBreakdown(params);
      const dummyPlan = await this.generateLessonPlan(params);
      const dummyNote = await this.generateLessonNote(params);
      return {
        topicBreakdown,
        lessonPlan: dummyPlan,
        lessonNote: dummyNote,
        visual3DSpec,
        meta: {
          modelUsed: FAST_MODEL,
          standard: 'NERDC & Lagos State OEQA Standard',
          regulatoryBodies: ['NERDC (Abuja)', 'Lagos State Ministry of Basic & Secondary Education (Alausa)'],
          generatedAt: new Date().toISOString(),
        },
      };
    }

    if (outputType === 'lesson_plan') {
      const [topicBreakdown, lessonPlan, dummyNote] = await Promise.all([
        this.generateTopicBreakdown(params),
        this.generateLessonPlan(params),
        this.generateLessonNote(params),
      ]);
      return {
        topicBreakdown,
        lessonPlan,
        lessonNote: dummyNote,
        visual3DSpec,
        meta: {
          modelUsed: PRIMARY_MODEL,
          standard: 'NERDC & Lagos State OEQA Standard',
          regulatoryBodies: ['NERDC (Abuja)', 'Lagos State Ministry of Basic & Secondary Education (Alausa)'],
          generatedAt: new Date().toISOString(),
        },
      };
    }

    // Default: generate all in parallel including cheatSheet and misconceptions
    const [topicBreakdown, lessonPlan, lessonNote, cheatSheet, misconceptions] = await Promise.all([
      this.generateTopicBreakdown(params),
      this.generateLessonPlan(params),
      this.generateLessonNote(params),
      this.generateCheatSheet(params.topic, params.level, params.subject),
      this.generateMisconceptions(params.topic, params.level, params.subject),
    ]);

    return {
      topicBreakdown,
      lessonPlan,
      lessonNote,
      visual3DSpec,
      cheatSheet,
      misconceptions,
      meta: {
        modelUsed: `${PRIMARY_MODEL} (Orchestrated with ${FAST_MODEL})`,
        standard: 'NERDC Statutory 2026 Curriculum & Lagos OEQA Standard',
        regulatoryBodies: [
          'NERDC (National Educational Research and Development Council)',
          'Lagos State Ministry of Basic & Secondary Education (Alausa, Ikeja)',
          'WAEC / NECO / BECE Examination Standards',
        ],
        generatedAt: new Date().toISOString(),
      },
    };
  }

  /**
   * Generates a 30-second high-yield Teacher's Cheat Sheet (Core concept, 3 must-know facts, 2 Nigerian examples)
   */
  async generateCheatSheet(lessonTopic: string, level: string = 'sss1', subject: string = 'General'): Promise<TeacherCheatSheet> {
    const fallback: TeacherCheatSheet = {
      lessonTopic,
      level,
      subject,
      coreConcept: `${lessonTopic} is an essential pillar in the Nigerian secondary school curriculum for ${level.toUpperCase()}. It equips educators with core theoretical definitions, governing formulas, and analytical principles required to achieve distinction in WAEC, NECO, and BECE examinations while anchoring understanding in local industrial and community realities.`,
      mustKnowFacts: [
        `Fact 1: NERDC syllabus requires candidates to state standard definitions and governing laws with complete terminology and operational boundaries.`,
        `Fact 2: WAEC/NECO marking schemes award direct marks for intermediate working steps and accurate dimensional units (e.g. S.I. units or Naira ₦).`,
        `Fact 3: Key variables must be clearly segregated between input conditions and resulting equilibrium outputs to avoid common candidate pitfalls.`,
      ],
      localExamples: [
        `Example 1 (Transit & Logistics): High-density commuter flow across the Third Mainland Bridge in Lagos or along the Abuja-Keffi expressway exemplifies rate of transfer, bottlenecks, and dynamic balance.`,
        `Example 2 (Industry & Agriculture): Commercial cassava processing into garri or starch in Ogun and Benue State cooperative mills demonstrates energy transformation, yield efficiency, and local economic value addition.`,
      ],
    };

    const client = this.getClient();
    if (!client) return fallback;

    try {
      const prompt = buildCheatSheetPrompt(lessonTopic, level, subject);
      const response = await client.models.generateContent({
        model: FAST_MODEL,
        contents: prompt,
        config: {
          systemInstruction: CHEAT_SHEET_SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      });

      const text = response.text || '';
      return cleanAndParseJson<TeacherCheatSheet>(text, fallback);
    } catch (err: any) {
      const isQuota = err?.status === 429 || String(err).includes('quota') || String(err).includes('429');
      if (isQuota) {
        console.warn(`[CurriculumEngine] Free tier rate limit reached for cheat sheet. Using statutory fallback.`);
      } else {
        console.warn('[CurriculumEngine] generateCheatSheet LLM call failed. Using statutory fallback.', err?.message || err);
      }
      return fallback;
    }
  }

  /**
   * Generates Misconception Alerts for teachers (misconception + teacherCorrection)
   */
  async generateMisconceptions(lessonTopic: string, level?: string, subject?: string): Promise<MisconceptionAlert[]> {
    const fallback: MisconceptionAlert[] = [
      {
        misconception: `Students often assume that ${lessonTopic} is purely theoretical with no practical application in their daily lives in Nigeria.`,
        teacherCorrection: `Explicitly connect ${lessonTopic} to everyday Nigerian reality, such as diesel generators in neighborhood markets, mobile banking transfer verifications, or agricultural crop yield preservation.`,
      },
      {
        misconception: `Candidates believe omitting standard units or mathematical step justifications is harmless if the final numerical result matches.`,
        teacherCorrection: `Remind students that WAEC/NECO examiners grade by mark allocation (M1, A1, C1); omitting units results in an automatic deduction of 1 full accuracy mark (A0). Enforce writing units on every single chalkboard calculation.`,
      },
      {
        misconception: `Confusing cause and effect when sketching diagrams or analyzing process flows under examination pressure.`,
        teacherCorrection: `Teach students to rule a two-column chalkboard table contrasting 'Initial Input Condition' with 'Resulting Output' before attempting complex problems.`,
      },
    ];

    const client = this.getClient();
    if (!client) return fallback;

    try {
      const prompt = buildMisconceptionsPrompt(lessonTopic, level, subject);
      const response = await client.models.generateContent({
        model: FAST_MODEL,
        contents: prompt,
        config: {
          systemInstruction: MISCONCEPTIONS_SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      });

      const text = response.text || '';
      return cleanAndParseJson<MisconceptionAlert[]>(text, fallback);
    } catch (err: any) {
      const isQuota = err?.status === 429 || String(err).includes('quota') || String(err).includes('429');
      if (isQuota) {
        console.warn(`[CurriculumEngine] Free tier rate limit reached for misconceptions. Using statutory fallback.`);
      } else {
        console.warn('[CurriculumEngine] generateMisconceptions LLM call failed. Using statutory fallback.', err?.message || err);
      }
      return fallback;
    }
  }
}

// Export singleton instance
export const curriculumEngine = new AICurriculumEngine();
