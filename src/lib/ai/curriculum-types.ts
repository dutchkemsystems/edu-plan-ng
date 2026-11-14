/**
 * EduPlan NG - Client-Safe Curriculum Types & Heuristic Derivations
 * 
 * Free of any server-only dependencies (@google/genai, fs, process.env).
 * Matches full specification for LessonPage, Interactive3DViewer, and Composer.
 */

import type { TeacherCheatSheet, MisconceptionAlert } from '../../types/index.ts';

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

  // 2. Genetics / DNA -> DNA Helix
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

  // 3. Botany / Plant Cell / Agriculture
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

  // 4. Chemistry / Atomic Structure -> Atom Model
  if (s.includes('chem') || t.includes('atom') || t.includes('electron') || t.includes('orbital') || t.includes('matter') || t.includes('element')) {
    return {
      modelType: 'atom_model',
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

  // 5. Physics / Electricity / Electromagnetism -> Electric Motor / Optics
  if (s.includes('physic') || s.includes('tech') || t.includes('motor') || t.includes('current') || t.includes('electric') || t.includes('circuit')) {
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

  // 6. Economics, Commerce & Financial Accounting -> Market Equilibrium & Balogun Trade
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

  // 7. Civic Education, Government & Social Studies -> Mace & Scales of Justice
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

  // 8. Geography & Environmental Studies -> 3D Terrestrial Globe
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

  // 9. Nigerian Indigenous Languages (Èdè Yorùbá, Asụsụ Igbo, Harshen Hausa) & Cultural Arts -> Talking Drum
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

  // 10. English Studies & Literature in English -> Printing Press & Illuminated Codex
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

  // 11. Technical Drawing & Basic Technology -> Isometric Spur Gears
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

  // 12. Religious Studies (CRS / IRS) -> Sanctuary Ark & Sacred Scripture Lectern
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

  // 13. Physical & Health Education (PHE) -> Biomechanical Joint & Skeletal Fulcrum
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

  // 14. Default / Mathematics & Polyhedrons -> Geometry Cube & Inscribed Octahedron
  return {
    modelType: 'geometry_cube',
    title: '3D Spatial Geometry & Inscribed Octahedron',
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
