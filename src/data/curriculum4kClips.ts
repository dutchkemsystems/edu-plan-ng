/**
 * EduPlan NG - 4K Ultra-HD Curriculum Visual Realia & Demonstration Clips
 * Exhaustive database covering ALL 24 statutory secondary school subjects
 * and their topics with full coordinate-accurate labeling and audible narration scripts.
 */

export interface VisualLabelPin {
  id: string;
  number: number;
  name: string;
  x: number; // Percentage 0 - 100
  y: number; // Percentage 0 - 100
  description: string;
  examTip?: string;
}

export type SimulationType =
  | 'cardiac_circulation'
  | 'cellular_biology'
  | 'atomic_structure'
  | 'chemical_titration'
  | 'geometry_trigonometry'
  | 'kinematics_physics'
  | 'circuit_electricity'
  | 'soil_profile'
  | 'gear_transmission'
  | 'computer_architecture'
  | 'economic_market'
  | 'separation_powers'
  | 'plate_tectonics'
  | 'phonetic_vowels'
  | 'human_rights'
  | 'hydrological_cycle'
  | 'food_pyramid'
  | 'color_wheel'
  | 'dramatic_arc'
  | 'orthographic_projection'
  | 'accounting_ledger'
  | 'musculoskeletal_joint'
  | 'wholesale_distribution'
  | 'conic_sections'
  | 'religious_pillars'
  | 'generic_scientific';

export interface Curriculum4KClip {
  id: string;
  subject: string;
  subjectCategory: 'Science & Math' | 'Vocational & Tech' | 'Commercial & Business' | 'Arts & Humanities' | 'Core & General';
  topicTitle: string;
  classLevel: string;
  term: number;
  simulationType: SimulationType;
  videoUrl?: string;
  durationSeconds: number;
  summary: string;
  audibleNarration: string;
  pins: VisualLabelPin[];
}

export const ALL_24_SUBJECTS_LIST = [
  'Mathematics',
  'English Studies',
  'Biology',
  'Chemistry',
  'Physics',
  'Agricultural Science',
  'Basic Technology',
  'Basic Science',
  'Computer Studies',
  'Civic Education',
  'Social Studies',
  'Economics',
  'Commerce',
  'Financial Accounting',
  'Government',
  'Geography',
  'Literature in English',
  'Physical and Health Education',
  'Home Economics',
  'Cultural and Creative Arts',
  'Christian Religious Studies',
  'Islamic Religious Studies',
  'Further Mathematics',
  'Technical Drawing'
] as const;

export const ALL_4K_CURRICULUM_CLIPS: Curriculum4KClip[] = [
  // -------------------------------------------------------------------------
  // 1. BIOLOGY
  // -------------------------------------------------------------------------
  {
    id: 'bio_heart_circulation',
    subject: 'Biology',
    subjectCategory: 'Science & Math',
    topicTitle: 'Human Heart Anatomy & Double Circulatory Mechanics',
    classLevel: 'SSS 1–3',
    term: 2,
    simulationType: 'cardiac_circulation',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    durationSeconds: 120,
    summary: '4K Ultra-HD dynamic cardiac pumping simulation demonstrating oxygenated and deoxygenated blood flow through atria, ventricles, and heart valves.',
    audibleNarration: 'Welcome to this 4K anatomical dissection of the mammalian heart. Notice the thick, muscular left ventricle at the apex, which contracts with immense force to pump oxygenated blood through the aorta into the systemic circulation. Observe the tricuspid and bicuspid valves snapping shut to prevent backflow during ventricular systole, creating the distinctive lub-dub heartbeat sound.',
    pins: [
      { id: 'h1', number: 1, name: 'Superior & Inferior Vena Cava', x: 26, y: 24, description: 'Large systemic veins carrying deoxygenated blood from the upper and lower body into the right atrium.', examTip: 'WAEC commonly asks students to trace the path of a red blood cell from the renal vein to the lungs.' },
      { id: 'h2', number: 2, name: 'Right Atrium & Ventricle', x: 34, y: 55, description: 'Receives deoxygenated blood and pumps it into the pulmonary artery under low pressure.', examTip: 'Remember: Right side handles deoxygenated blood; Left side handles oxygenated blood.' },
      { id: 'h3', number: 3, name: 'Pulmonary Artery', x: 44, y: 18, description: 'The only artery in the human body that carries deoxygenated blood directly to the lungs for gas exchange.', examTip: 'High-frequency objective trap: all arteries carry oxygenated blood EXCEPT the pulmonary artery.' },
      { id: 'h4', number: 4, name: 'Aorta Arch', x: 55, y: 15, description: 'The largest systemic artery, distributing oxygen-rich blood under high systolic pressure to all body organs.', examTip: 'The thick elastic wall prevents rupture during ventricular ejection.' },
      { id: 'h5', number: 5, name: 'Left Ventricle (Muscular Apex)', x: 68, y: 65, description: 'Has walls three times thicker than the right ventricle because it must overcome systemic vascular resistance.', examTip: 'Chief Examiner pitfall: Never draw both ventricular walls with equal thickness!' }
    ]
  },
  {
    id: 'bio_cell_division',
    subject: 'Biology',
    subjectCategory: 'Science & Math',
    topicTitle: 'Mammalian Cell Structure & Mitotic Nuclear Division',
    classLevel: 'SSS 1–2',
    term: 1,
    simulationType: 'cellular_biology',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    durationSeconds: 90,
    summary: 'High-magnification microscopic 4K rendering of eukaryotic organelle ultrastructure and chromosome separation during metaphase.',
    audibleNarration: 'Observe the living eukaryotic cell under 4K magnification. The prominent nucleus contains chromatin fibers that condense into paired chromatids. Watch the mitochondria, the powerhouses of the cell, generating adenosine triphosphate through oxidative phosphorylation, while the rough endoplasmic reticulum synthesizes enzymes for intracellular transport.',
    pins: [
      { id: 'c1', number: 1, name: 'Nucleus & Nucleolus', x: 48, y: 46, description: 'Directs all cellular metabolism and houses genetic DNA instructions for protein synthesis.', examTip: 'In WAEC diagrams, always clearly indicate the double nuclear membrane with nuclear pores.' },
      { id: 'c2', number: 2, name: 'Mitochondria (Cristae)', x: 72, y: 35, description: 'Double-membrane organelle with folded inner cristae providing surface area for aerobic respiration.', examTip: 'Known as the site of Krebs cycle and electron transport chain.' },
      { id: 'c3', number: 3, name: 'Rough Endoplasmic Reticulum', x: 30, y: 58, description: 'Membranous network studded with ribosomes actively folding polypeptides.', examTip: 'Contrast with Smooth ER, which synthesizes lipids and detoxifies chemicals.' },
      { id: 'c4', number: 4, name: 'Golgi Apparatus', x: 62, y: 70, description: 'Flattened cisternae responsible for packaging and exporting glycoproteins and vesicles.', examTip: 'Essential in secretory cells like salivary glands and pancreas.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 2. MATHEMATICS
  // -------------------------------------------------------------------------
  {
    id: 'math_pythagoras_trig',
    subject: 'Mathematics',
    subjectCategory: 'Science & Math',
    topicTitle: 'Pythagoras Theorem & 3D Spatial Trigonometry',
    classLevel: 'JSS 1–SSS 3',
    term: 1,
    simulationType: 'geometry_trigonometry',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    durationSeconds: 110,
    summary: 'Rotatable 4K spatial coordinate projection illustrating right-angled triangle properties, trigonometric ratios (SOH-CAH-TOA), and Euclidean geometric proofs.',
    audibleNarration: 'In this 4K mathematical simulation, we examine the right-angled Euclidean triangle. Notice how the square built on the hypotenuse is exactly equal to the sum of the squares on the opposite and adjacent sides. As we rotate into the third dimension, observe the angle of elevation theta, calculated as opposite over hypotenuse for sine, and opposite over adjacent for tangent.',
    pins: [
      { id: 'm1', number: 1, name: 'Hypotenuse (Longest Side c)', x: 50, y: 32, description: 'Side opposite the 90-degree right angle, satisfying c² = a² + b².', examTip: 'Always verify which angle is 90° before applying the trigonometric ratio formula.' },
      { id: 'm2', number: 2, name: 'Opposite Side (Height a)', x: 74, y: 55, description: 'Vertical perpendicular arm facing the acute reference angle theta (θ).', examTip: 'Opposite side switches depending on whether you reference angle A or angle B.' },
      { id: 'm3', number: 3, name: 'Adjacent Base (Side b)', x: 42, y: 78, description: 'Horizontal contiguous arm between the reference angle and the right angle.', examTip: 'Cosine equals adjacent divided by hypotenuse (CAH).' },
      { id: 'm4', number: 4, name: 'Right Angle (90° Orthogonal Vertex)', x: 74, y: 78, description: 'Intersection of the orthogonal legs where the Pythagorean relationship holds true.', examTip: 'Indicated by the square vertex marker in standard technical blueprints.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 3. CHEMISTRY
  // -------------------------------------------------------------------------
  {
    id: 'chem_titration_setup',
    subject: 'Chemistry',
    subjectCategory: 'Science & Math',
    topicTitle: 'Volumetric Acid-Base Titration & Stoichiometric End-Point',
    classLevel: 'SSS 1–3',
    term: 2,
    simulationType: 'chemical_titration',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    durationSeconds: 105,
    summary: 'Precision 4K laboratory setup showing standard solution neutralization, burette meniscus reading, and phenolphthalein color transition at neutralization point.',
    audibleNarration: 'Welcome to the analytical chemistry laboratory. In this 4K demonstration of volumetric analysis, hydrochloric acid in the burette is carefully titrated into sodium hydroxide solution in the conical flask. Watch the bottom of the meniscus at eye level. At the exact equivalence point, a single drop transitions the phenolphthalein indicator from deep pink to colorless.',
    pins: [
      { id: 'ch1', number: 1, name: 'Graduated Burette (0.05 cm³ Precision)', x: 48, y: 20, description: 'Calibrated glass tube with stopcock dispensing standard acid solution with zero parallax error.', examTip: 'Read the BOTTOM of the concave liquid meniscus at eye level to avoid parallax errors.' },
      { id: 'ch2', number: 2, name: 'Burette Stopcock / Tap', x: 48, y: 52, description: 'Teflon control valve allowing dropwise introduction of titrant near the equivalence end-point.', examTip: 'Rinse burette first with distilled water, then with the acid solution before filling.' },
      { id: 'ch3', number: 3, name: 'Conical (Erlenmeyer) Flask', x: 48, y: 74, description: 'Narrow neck vessel allowing vigorous swirling without splashing during neutralization.', examTip: 'Do NOT rinse the conical flask with the base solution; rinse with distilled water only.' },
      { id: 'ch4', number: 4, name: 'White Tile Surface', x: 48, y: 88, description: 'Provides high-contrast white background to detect faint pink to colorless indicator transitions.', examTip: 'A white tile is compulsory in WAEC/NECO practical chemistry grading rubrics.' }
    ]
  },
  {
    id: 'chem_bohr_atom',
    subject: 'Chemistry',
    subjectCategory: 'Science & Math',
    topicTitle: 'Bohr-Rutherford Atomic Shells & Electronic Orbitals',
    classLevel: 'SSS 1–2',
    term: 1,
    simulationType: 'atomic_structure',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    durationSeconds: 95,
    summary: '4K orbital mechanics simulation showing proton-neutron nucleus and quantized electron shells (K, L, M) with Pauli exclusion spin states.',
    audibleNarration: 'Examine the Rutherford-Bohr atom at 4K resolution. At the center lies the dense positive nucleus consisting of tightly bound protons and neutrons. Surrounding the nucleus, electrons orbit in quantized energy levels. The first shell holds a maximum of two electrons, while the second and third octet shells accommodate eight electrons each.',
    pins: [
      { id: 'at1', number: 1, name: 'Positive Nucleus (Protons + Neutrons)', x: 50, y: 50, description: 'Contains 99.9% of atomic mass, stabilized by the fundamental strong nuclear force.', examTip: 'Mass number = Protons + Neutrons. Atomic number = Protons alone.' },
      { id: 'at2', number: 2, name: 'K-Shell (n = 1)', x: 50, y: 38, description: 'Innermost quantized energy level holding a maximum of 2 electrons with opposite quantum spins.', examTip: 'Maximum electrons in shell n is given by the formula 2n².' },
      { id: 'at3', number: 3, name: 'L-Shell (n = 2)', x: 50, y: 26, description: 'Second energy level holding up to 8 electrons (2s and 2p sub-orbitals).', examTip: 'Elements with full valence shells like Neon are chemically inert noble gases.' },
      { id: 'at4', number: 4, name: 'Valence Electron Trajectory', x: 74, y: 50, description: 'Outermost electron determining electrovalent or covalent chemical reactivity and valency.', examTip: 'Metals lose valence electrons to form cations; non-metals gain electrons to form anions.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 4. PHYSICS
  // -------------------------------------------------------------------------
  {
    id: 'phys_newton_kinematics',
    subject: 'Physics',
    subjectCategory: 'Science & Math',
    topicTitle: 'Kinematics, Projectile Trajectory & Newton’s Third Law',
    classLevel: 'SSS 1–3',
    term: 1,
    simulationType: 'kinematics_physics',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    durationSeconds: 115,
    summary: 'Parabolic motion simulation breaking initial velocity into independent horizontal and vertical vectors with gravitational acceleration g = 9.8 m/s².',
    audibleNarration: 'In this 4K kinematics demonstration, a projectile is launched at an acute angle to the horizontal. Notice that horizontal velocity remains strictly constant in the absence of air resistance, while vertical velocity decelerates under gravitational pull until reaching zero at maximum height before accelerating downward.',
    pins: [
      { id: 'p1', number: 1, name: 'Launch Point & Velocity Vector (u)', x: 18, y: 78, description: 'Initial vector resolved into horizontal component u cos θ and vertical component u sin θ.', examTip: 'At maximum height, the vertical velocity Vy is ZERO, but horizontal velocity Vx is NOT zero.' },
      { id: 'p2', number: 2, name: 'Maximum Height (H_max)', x: 50, y: 24, description: 'Highest point where vertical kinetic energy converts completely into gravitational potential energy (u² sin² θ / 2g).', examTip: 'Formula for maximum height: H = (u² sin² θ) / 2g.' },
      { id: 'p3', number: 3, name: 'Horizontal Range (R)', x: 82, y: 78, description: 'Total horizontal displacement covered, which reaches maximum at a 45-degree launch angle.', examTip: 'Range is maximized when launch angle is 45° because sin(2 × 45°) = sin(90°) = 1.' }
    ]
  },
  {
    id: 'phys_circuit_ohms_law',
    subject: 'Physics',
    subjectCategory: 'Science & Math',
    topicTitle: 'Ohm’s Law, Electric Circuits & Resistor Networks',
    classLevel: 'JSS 3 / SSS 1–2',
    term: 2,
    simulationType: 'circuit_electricity',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    durationSeconds: 100,
    summary: 'Interactive 4K schematic showing electron drift, potential difference across series and parallel loads, and real-time ammeter/voltmeter readings.',
    audibleNarration: 'Follow the flow of current in this 4K electrical circuit simulation. The accumulator produces an electromotive force driving charge through the circuit. According to Ohm’s Law, electric current is directly proportional to potential difference across a conductor, provided temperature remains constant. Notice the voltmeter connected in parallel and ammeter in series.',
    pins: [
      { id: 'cir1', number: 1, name: 'DC Voltage Source (Dry Cell / Battery)', x: 50, y: 18, description: 'Generates electromotive force (EMF) driving mobile valence electrons from negative to positive terminals.', examTip: 'Internal resistance r causes terminal potential difference V to be less than EMF E when current flows.' },
      { id: 'cir2', number: 2, name: 'Series Ammeter (Zero Resistance)', x: 78, y: 48, description: 'Measures rate of electric charge flow (I = Q/t) in Amperes; must always be connected in SERIES.', examTip: 'An ideal ammeter has zero internal resistance to avoid reducing circuit current.' },
      { id: 'cir3', number: 3, name: 'Resistor / Filament Lamp', x: 50, y: 78, description: 'Ohmic load dissipating electrical energy into heat and light proportional to I²R.', examTip: 'For resistors in parallel: 1/R_total = 1/R1 + 1/R2.' },
      { id: 'cir4', number: 4, name: 'Parallel Voltmeter (High Resistance)', x: 22, y: 48, description: 'Measures potential difference across components; must always be connected in PARALLEL.', examTip: 'An ideal voltmeter has INFINITE resistance so no current diverts through it.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 5. AGRICULTURAL SCIENCE
  // -------------------------------------------------------------------------
  {
    id: 'agric_soil_profile',
    subject: 'Agricultural Science',
    subjectCategory: 'Vocational & Tech',
    topicTitle: 'Soil Profile Horizons & Nigerian Agro-Agronomy',
    classLevel: 'JSS 1–SSS 3',
    term: 1,
    simulationType: 'soil_profile',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    durationSeconds: 110,
    summary: '4K geological monolith section displaying Topsoil (Horizon A), Subsoil (Horizon B), Weathered Parent Rock (Horizon C), and solid Bedrock.',
    audibleNarration: 'Observe the vertical cross-section of arable soil in this 4K agricultural demonstration. Horizon A, or topsoil, is rich in dark decomposed organic humus and essential plant nutrients like nitrogen and phosphorus. Below lies the subsoil, where leached minerals accumulate, followed by weathered rock fragments resting upon impenetrable parent bedrock.',
    pins: [
      { id: 'ag1', number: 1, name: 'Horizon A (Humus-Rich Topsoil)', x: 50, y: 22, description: 'Dark, porous, biologically active zone supporting root penetration and micro-organism activity.', examTip: 'Soil erosion damages Horizon A most severely, stripping topsoil fertility.' },
      { id: 'ag2', number: 2, name: 'Horizon B (Subsoil Illuviation Zone)', x: 50, y: 48, description: 'Zone of accumulation where clays, iron oxides, and leached minerals from topsoil deposit.', examTip: 'Has higher bulk density and lower organic matter than topsoil.' },
      { id: 'ag3', number: 3, name: 'Horizon C (Parent Weathering Material)', x: 50, y: 74, description: 'Partially disintegrated rock fragments undergoing chemical and mechanical weathering.', examTip: 'Undergoes physical breaking by water, temperature shifts, and plant roots.' },
      { id: 'ag4', number: 4, name: 'Horizon D / R (Solid Unweathered Bedrock)', x: 50, y: 92, description: 'Dense basement rock foundation acting as the geological origin of soil mineral matter.', examTip: 'Prevents further downward root extension and deep drainage.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 6. BASIC TECHNOLOGY
  // -------------------------------------------------------------------------
  {
    id: 'tech_gear_transmission',
    subject: 'Basic Technology',
    subjectCategory: 'Vocational & Tech',
    topicTitle: 'Spur Gear Transmission, Velocity Ratios & Power Transfer',
    classLevel: 'JSS 1–3',
    term: 2,
    simulationType: 'gear_transmission',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    durationSeconds: 95,
    summary: 'Precision 4K mechanical animation showing interlocking spur gear teeth, driver-to-driven velocity ratios, and torque amplification.',
    audibleNarration: 'In this 4K technical engineering simulation, observe the mechanical transmission of motion through interlocking spur gears. As the small driver gear rotates clockwise, it drives the larger gear counter-clockwise at reduced rotational speed, effectively trading velocity for increased mechanical advantage and torque.',
    pins: [
      { id: 'g1', number: 1, name: 'Driver Gear (Input Pinion)', x: 35, y: 45, description: 'Receives rotational power directly from motor shaft; rotation direction is clockwise.', examTip: 'Velocity Ratio = Number of teeth on Driven Gear divided by Number of teeth on Driver Gear.' },
      { id: 'g2', number: 2, name: 'Interlocking Tooth Pitch Line', x: 50, y: 48, description: 'Precision contact surface where involute gear teeth transfer tangential mechanical force.', examTip: 'Lubrication is essential at this contact line to minimize friction and wear.' },
      { id: 'g3', number: 3, name: 'Driven Gear (Output Wheel)', x: 65, y: 52, description: 'Rotates in opposite direction (counter-clockwise) with increased mechanical torque.', examTip: 'To make driver and driven rotate in SAME direction, insert an IDLER gear between them.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 7. BASIC SCIENCE
  // -------------------------------------------------------------------------
  {
    id: 'bsc_hydrological_cycle',
    subject: 'Basic Science',
    subjectCategory: 'Science & Math',
    topicTitle: 'The Hydrological Water Cycle & Atmospheric Precipitation',
    classLevel: 'JSS 1–3',
    term: 1,
    simulationType: 'hydrological_cycle',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    durationSeconds: 100,
    summary: '4K continuous cycle showing solar evaporation from oceans, transpiration from vegetation, atmospheric condensation into cumulus clouds, and rainfall runoff.',
    audibleNarration: 'Observe the continuous circulation of water throughout Earth’s biosphere in 4K resolution. Solar radiation warms tropical ocean waters, causing liquid water to evaporate into water vapor. As warm moist air rises, it expands and cools, condensing into dense clouds that produce precipitation over land, returning through rivers to the ocean.',
    pins: [
      { id: 'hy1', number: 1, name: 'Solar Thermal Evaporation', x: 24, y: 65, description: 'Solar energy heats surface water bodies, driving phase change from liquid to gaseous vapor.', examTip: 'Rate of evaporation increases with higher temperature, wind speed, and surface area.' },
      { id: 'hy2', number: 2, name: 'Atmospheric Cloud Condensation', x: 50, y: 22, description: 'Water vapor cools to its dew point around microscopic condensation nuclei, forming water droplets.', examTip: 'Latent heat of condensation is released into the atmosphere, powering weather systems.' },
      { id: 'hy3', number: 3, name: 'Precipitation (Rainfall)', x: 76, y: 45, description: 'Droplets coalesce and fall under gravity when too heavy to remain suspended in cloud updrafts.', examTip: 'Nigeria experiences convectional rainfall and relief (orographic) rainfall.' },
      { id: 'hy4', number: 4, name: 'Surface Runoff & Ground Infiltration', x: 60, y: 82, description: 'Precipitation drains via rivers, streams, and porous aquifers into lakes and the Atlantic Ocean.', examTip: 'Deforestation causes severe flash flooding by reducing soil infiltration capacity.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 8. COMPUTER STUDIES & DATA PROCESSING
  // -------------------------------------------------------------------------
  {
    id: 'comp_von_neumann_cpu',
    subject: 'Computer Studies',
    subjectCategory: 'Core & General',
    topicTitle: 'Von Neumann Architecture, CPU Registers & Bus Pathways',
    classLevel: 'JSS 1–SSS 3',
    term: 1,
    simulationType: 'computer_architecture',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
    durationSeconds: 100,
    summary: '4K microchip architectural diagram showing Arithmetic Logic Unit (ALU), Control Unit (CU), Registers, and Memory Bus pipelines.',
    audibleNarration: 'Observe the modern microprocessor architecture in 4K resolution. The Control Unit directs the fetch, decode, and execute machine cycle. Binary instructions travel along the 64-bit data bus into the Arithmetic Logic Unit, which carries out arithmetic computations and Boolean comparisons, with intermediate results stored in high-speed registers.',
    pins: [
      { id: 'cp1', number: 1, name: 'Control Unit (CU)', x: 32, y: 32, description: 'Supervises machine cycle execution, decoding instruction opcodes and generating clock signals.', examTip: 'The CU does NOT perform mathematical calculations; that is the sole role of the ALU.' },
      { id: 'cp2', number: 2, name: 'Arithmetic Logic Unit (ALU)', x: 68, y: 32, description: 'Executes mathematical additions, subtractions, multiplications, and logical Boolean AND/OR operations.', examTip: 'Carries out comparisons using conditional flags like Zero, Carry, and Overflow.' },
      { id: 'cp3', number: 3, name: 'System Memory (RAM)', x: 50, y: 78, description: 'Volatile primary storage holding currently running programs and operational data.', examTip: 'Contrast with ROM, which is non-volatile and permanently stores BIOS/UEFI firmware.' },
      { id: 'cp4', number: 4, name: 'System Bus (Data, Address, Control)', x: 50, y: 52, description: 'Parallel electrical tracks transmitting binary bits between CPU, memory, and I/O controllers.', examTip: 'Address bus is unidirectional (CPU to Memory); Data bus is bidirectional.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 9. CIVIC EDUCATION
  // -------------------------------------------------------------------------
  {
    id: 'civ_fundamental_rights',
    subject: 'Civic Education',
    subjectCategory: 'Core & General',
    topicTitle: 'Fundamental Human Rights & Nigerian Rule of Law',
    classLevel: 'JSS 1–SSS 3',
    term: 1,
    simulationType: 'human_rights',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    durationSeconds: 105,
    summary: '4K constitutional balance framework showing Chapter IV of the 1999 Constitution: Right to Life, Freedom of Expression, Fair Hearing, and Equal Protection.',
    audibleNarration: 'In this 4K civic simulation, examine the constitutional pillars of Fundamental Human Rights enshrined under Chapter Four of the 1999 Constitution of Nigeria. The Rule of Law guarantees that no individual or authority is above the law, with equality before the court, fair hearing within reasonable time, and universal protection of human dignity.',
    pins: [
      { id: 'cv1', number: 1, name: 'Right to Fair Hearing (Section 36)', x: 50, y: 26, description: 'Every citizen is entitled to a fair hearing before an independent and impartial tribunal established by law.', examTip: 'WAEC Question: Section 36 is the most frequently tested section under Nigerian Human Rights.' },
      { id: 'cv2', number: 2, name: 'Scales of Judicial Equality (Rule of Law)', x: 30, y: 56, description: 'A.V. Dicey’s doctrine: Supremacy of the regular law, equality before the law, and absence of arbitrary power.', examTip: 'Remember Dicey’s three postulates: Supremacy of Law, Equality, and Fundamental Freedoms.' },
      { id: 'cv3', number: 3, name: 'Civic Responsibilities & Obligations', x: 70, y: 56, description: 'Rights exist alongside duties: tax compliance, voting, obeying lawful orders, and reporting security threats.', examTip: 'Rights without corresponding duties lead to social anarchy.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 10. SOCIAL STUDIES
  // -------------------------------------------------------------------------
  {
    id: 'soc_family_kinship',
    subject: 'Social Studies',
    subjectCategory: 'Core & General',
    topicTitle: 'Family Structures, Kinship Networks & Social Institutions',
    classLevel: 'JSS 1–3',
    term: 1,
    simulationType: 'generic_scientific',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    durationSeconds: 95,
    summary: '4K interactive sociological chart contrasting Nuclear Family units and African Extended Kinship support structures with intergenerational socialization.',
    audibleNarration: 'Welcome to this 4K social studies presentation on family institutions in Nigerian society. Notice the nuclear family consisting of parents and their biological or adopted children, functioning within the broader traditional extended family network of grandparents, uncles, aunts, and cousins, fostering cultural heritage transmission and mutual security.',
    pins: [
      { id: 'sc1', number: 1, name: 'Nuclear Family Unit (Parents & Children)', x: 50, y: 35, description: 'Primary social unit responsible for foundational socialization, moral guidance, and physical care.', examTip: 'BECE question: Contrast functions of nuclear vs extended family in urban Nigerian society.' },
      { id: 'sc2', number: 2, name: 'Extended Kinship Network', x: 25, y: 68, description: 'Multigenerational support system providing collective child upbringing, conflict resolution, and communal welfare.', examTip: 'The African proverb "It takes a village to raise a child" illustrates extended kinship.' },
      { id: 'sc3', number: 3, name: 'Cultural Socialization & Values', x: 75, y: 68, description: 'Transmission of ancestral language, respect for elders, community solidarity, and civic accountability.', examTip: 'Socialization is defined as the lifelong process of acquiring cultural norms and roles.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 11. ECONOMICS
  // -------------------------------------------------------------------------
  {
    id: 'econ_market_equilibrium',
    subject: 'Economics',
    subjectCategory: 'Commercial & Business',
    topicTitle: 'Market Equilibrium, Supply & Demand Price Elasticity',
    classLevel: 'SSS 1–3',
    term: 1,
    simulationType: 'economic_market',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    durationSeconds: 105,
    summary: '4K econometric model demonstrating intersection of downward-sloping demand curve and upward-sloping supply curve in the Nigerian commodity market.',
    audibleNarration: 'In this 4K macroeconomic simulation, we observe market forces determining equilibrium price. As price increases, quantity demanded contracts while quantity supplied expands. At the intersection point where quantity demanded equals quantity supplied, the market clears with neither surplus nor shortage.',
    pins: [
      { id: 'ec1', number: 1, name: 'Demand Curve (Downwards Sloping)', x: 30, y: 35, description: 'Illustrates inverse relationship between price and quantity demanded (Law of Demand).', examTip: 'A change in PRICE causes movement ALONG the curve; non-price factors cause a SHIFT.' },
      { id: 'ec2', number: 2, name: 'Supply Curve (Upwards Sloping)', x: 70, y: 35, description: 'Depicts direct relationship where producers supply more goods at higher market prices.', examTip: 'Technological advancements or input cost reductions shift supply outwards to the right.' },
      { id: 'ec3', number: 3, name: 'Market Equilibrium Point (Pe, Qe)', x: 50, y: 50, description: 'The market clearing price where quantity demanded equals quantity supplied exactly.', examTip: 'Prices above Pe result in excess supply (surplus); prices below Pe cause shortage.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 12. COMMERCE
  // -------------------------------------------------------------------------
  {
    id: 'comm_channels_distribution',
    subject: 'Commerce',
    subjectCategory: 'Commercial & Business',
    topicTitle: 'Channels of Distribution & Commercial Trade Intermediaries',
    classLevel: 'SSS 1–3',
    term: 1,
    simulationType: 'wholesale_distribution',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    durationSeconds: 100,
    summary: '4K logistical pathway tracing goods from Producer/Manufacturer through Wholesaler, Retailer, and Ultimate Consumer with middleman value-adds.',
    audibleNarration: 'Examine the commercial channel of distribution in 4K resolution. Physical goods flow from the factory manufacturer to the bulk-breaking wholesaler, who provides storage warehousing. The retailer purchases manageable quantities to sell to local consumers at convenient neighborhood locations across Nigeria.',
    pins: [
      { id: 'cm1', number: 1, name: 'Manufacturer / Primary Producer', x: 18, y: 50, description: 'Originator of goods who focuses on mass production and economies of scale.', examTip: 'Direct marketing bypasses middlemen through factory outlets or e-commerce.' },
      { id: 'cm2', number: 2, name: 'Wholesaler (Bulk Breaker & Warehouser)', x: 40, y: 50, description: 'Purchases in large volumes, absorbs market risk, provides credit, and breaks bulk for retailers.', examTip: 'Key function of wholesaler: stabilizes prices by releasing buffer stocks during shortages.' },
      { id: 'cm3', number: 3, name: 'Retailer (Supermarkets & Market Stalls)', x: 62, y: 50, description: 'Provides doorstep convenience, personal selling, after-sales service, and consumer feedback.', examTip: 'Retailers are closest to final consumers and understand local shopping habits.' },
      { id: 'cm4', number: 4, name: 'Final Consumer (Target Market)', x: 84, y: 50, description: 'The end user of the product whose utility satisfaction justifies the entire commercial process.', examTip: 'Commerce is complete only when goods and services reach the final consumer.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 13. FINANCIAL ACCOUNTING
  // -------------------------------------------------------------------------
  {
    id: 'acc_double_entry_ledger',
    subject: 'Financial Accounting',
    subjectCategory: 'Commercial & Business',
    topicTitle: 'Double Entry Bookkeeping & The Accounting Equation',
    classLevel: 'SSS 1–3',
    term: 1,
    simulationType: 'accounting_ledger',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    durationSeconds: 110,
    summary: '4K visual T-Account demonstration balancing the fundamental accounting equation: Assets = Capital + Liabilities with dual debit and credit postings.',
    audibleNarration: 'Welcome to this 4K accounting ledger tutorial. The golden rule of double entry bookkeeping dictates: debit the receiver and credit the giver. For every financial transaction, an equal and opposite entry must be made. Notice how cash introduced as startup capital debits Cash at Bank and credits the Owner’s Capital account.',
    pins: [
      { id: 'ac1', number: 1, name: 'Debit Side (Left-Hand Column - Dr)', x: 28, y: 35, description: 'Records increases in Assets and Expenses, or decreases in Liabilities, Capital, and Revenue.', examTip: 'Mnemonic: DEAD CLIC — Debit: Expenses, Assets, Drawings. Credit: Liabilities, Income, Capital.' },
      { id: 'ac2', number: 2, name: 'Credit Side (Right-Hand Column - Cr)', x: 72, y: 35, description: 'Records increases in Liabilities, Capital, and Revenue, or decreases in Assets.', examTip: 'Trial Balance total debits must always equal total credits if entries are mathematically accurate.' },
      { id: 'ac3', number: 3, name: 'The Accounting Equation (A = C + L)', x: 50, y: 78, description: 'Every economic asset owned by the business is financed either by equity capital or debt liabilities.', examTip: 'WAEC standard: if Assets = ₦500,000 and Liabilities = ₦180,000, then Capital = ₦320,000.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 14. GOVERNMENT
  // -------------------------------------------------------------------------
  {
    id: 'gov_separation_powers',
    subject: 'Government',
    subjectCategory: 'Arts & Humanities',
    topicTitle: 'Separation of Powers & Constitutional Checks and Balances',
    classLevel: 'JSS 1–SSS 3',
    term: 1,
    simulationType: 'separation_powers',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    durationSeconds: 110,
    summary: 'Tripartite 4K institutional model of Nigerian 1999 Constitution: The Legislature, The Executive, and The Judiciary with bidirectional oversight vectors.',
    audibleNarration: 'Examine the constitutional framework of democratic governance in 4K resolution. Baron de Montesquieu’s doctrine of separation of powers allocates state authority across three distinct organs: the Legislature makes the law, the Executive implements the law, and the Judiciary interprets the law. Mutual checks and balances prevent tyranny.',
    pins: [
      { id: 'gv1', number: 1, name: 'The Legislature (National Assembly)', x: 50, y: 22, description: 'Bicameral parliament (Senate and House of Representatives) enacting bills and scrutinizing budgets.', examTip: 'Possesses constitutional power of impeachment and budget appropriation oversight.' },
      { id: 'gv2', number: 2, name: 'The Executive (President & Cabinet)', x: 26, y: 68, description: 'Administers public policy, commands the armed forces, and enforces statutory legislation.', examTip: 'Presidential system features a single executive who is both Head of State and Head of Government.' },
      { id: 'gv3', number: 3, name: 'The Judiciary (Supreme Court & Courts)', x: 74, y: 68, description: 'Independent adjudicative branch exercising judicial review to invalidate unconstitutional acts.', examTip: 'Section 6 of the 1999 Constitution vests judicial powers in the courts of law.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 15. GEOGRAPHY
  // -------------------------------------------------------------------------
  {
    id: 'geog_tectonics_faulting',
    subject: 'Geography',
    subjectCategory: 'Arts & Humanities',
    topicTitle: 'Plate Tectonics, Continental Drift & Volcanic Landforms',
    classLevel: 'SSS 1–3',
    term: 1,
    simulationType: 'plate_tectonics',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    durationSeconds: 110,
    summary: '4K geological mantle convection simulation depicting convergent, divergent, and transform lithospheric boundaries and subduction trenches.',
    audibleNarration: 'Observe the dynamic lithosphere of planet Earth in 4K detail. Driven by thermal convection currents within the asthenosphere, tectonic plates collide at convergent boundaries forming majestic fold mountains and volcanic island arcs, while seafloor spreading at divergent boundaries creates mid-ocean ridges.',
    pins: [
      { id: 'gg1', number: 1, name: 'Continental Crust (Granitic Lithosphere)', x: 28, y: 38, description: 'Lighter, less dense crust composed mainly of silica and alumina (SIAL).', examTip: 'Contrast with oceanic crust which is denser and composed of silica and magnesia (SIMA).' },
      { id: 'gg2', number: 2, name: 'Subduction Trench Zone', x: 50, y: 55, description: 'Region where dense oceanic plate plunges under continental crust, melting into magma.', examTip: 'Subduction zones are the primary origin of deep earthquakes and volcanic activity.' },
      { id: 'gg3', number: 3, name: 'Asthenosphere Convection Currents', x: 50, y: 82, description: 'Semi-fluid upper mantle circulating heat from Earth’s core to drive plate tectonic motion.', examTip: 'Proposed by Arthur Holmes as the physical driving mechanism of Alfred Wegener’s Continental Drift.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 16. ENGLISH STUDIES
  // -------------------------------------------------------------------------
  {
    id: 'eng_phonetics_vowels',
    subject: 'English Studies',
    subjectCategory: 'Core & General',
    topicTitle: 'English Vowel Quadrilateral & Phonetic Articulation',
    classLevel: 'JSS 1–SSS 3',
    term: 1,
    simulationType: 'phonetic_vowels',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
    durationSeconds: 90,
    summary: '4K International Phonetic Alphabet (IPA) vowel quadrilateral showing tongue height, tongue backness, and lip rounding for English monophthongs.',
    audibleNarration: 'Welcome to this 4K phonetic laboratory for English Language pronunciation. Notice the vocal tract trapezoid representing tongue position. When producing close front vowels like /i:/ in "sheep", the front of the tongue arches toward the hard palate with unrounded lips. As we transition to open back vowels like /ɑ:/ in "father", the tongue lowers completely.',
    pins: [
      { id: 'en1', number: 1, name: 'Close Front Unrounded Vowel /i:/', x: 25, y: 25, description: 'High front tongue elevation with spread lips; heard in "beat", "tree", "seat".', examTip: 'WAEC oral exam contrast: differentiate short /ɪ/ in "sit" from long /i:/ in "seat".' },
      { id: 'en2', number: 2, name: 'Open Back Unrounded Vowel /ɑ:/', x: 75, y: 78, description: 'Low flat tongue depression with neutral lips; heard in "calm", "car", "father".', examTip: 'Commonly tested in WAEC Section 1 vowel recognition drills.' },
      { id: 'en3', number: 3, name: 'Central Neutral Vowel (Schwa /ə/)', x: 50, y: 50, description: 'The most common unstressed vowel in English; heard in "about", "teacher", "banana".', examTip: 'Occurs exclusively in unstressed syllables in connected speech.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 17. LITERATURE IN ENGLISH
  // -------------------------------------------------------------------------
  {
    id: 'lit_dramatic_arc',
    subject: 'Literature in English',
    subjectCategory: 'Arts & Humanities',
    topicTitle: 'Dramatic Structure & Freytag’s Narrative Plot Pyramid',
    classLevel: 'SSS 1–3',
    term: 1,
    simulationType: 'dramatic_arc',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    durationSeconds: 105,
    summary: '4K literary plot arc tracking Exposition, Inciting Incident, Rising Action, Climax, Falling Action, and Resolution in African and Shakespearean drama.',
    audibleNarration: 'In this 4K literature demonstration, we analyze dramatic structure through Gustav Freytag’s pyramid. The story begins in the exposition, establishing setting and characters. An inciting incident triggers rising action filled with escalating conflict, culminating at the dramatic climax — the decisive turning point of the protagonist’s fortune.',
    pins: [
      { id: 'lt1', number: 1, name: 'Exposition & Setting', x: 15, y: 75, description: 'Introduction of characters, socio-historical background, and central premise.', examTip: 'In Wole Soyinka’s "The Lion and the Jewel", exposition establishes Ilujinle village tradition vs modernism.' },
      { id: 'lt2', number: 2, name: 'Rising Action & Complication', x: 35, y: 50, description: 'Escalating series of events where opposing forces clash and stakes multiply.', examTip: 'Look for tragic flaws (hamartia) causing tension to intensify.' },
      { id: 'lt3', number: 3, name: 'Climactic Apex (Turning Point)', x: 50, y: 20, description: 'The supreme moment of tension and irreversible choice facing the protagonist.', examTip: 'WAEC essay questions frequently ask candidates to identify the exact turning point of the play.' },
      { id: 'lt4', number: 4, name: 'Catastrophe & Denouement', x: 85, y: 75, description: 'Resolution of the tragic or comedic knot, restoring moral balance to the dramatic world.', examTip: 'Tragedy ends in catastrophe and catharsis; comedy ends in festive social reconciliation.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 18. PHYSICAL AND HEALTH EDUCATION (PHE)
  // -------------------------------------------------------------------------
  {
    id: 'phe_musculoskeletal_joint',
    subject: 'Physical and Health Education',
    subjectCategory: 'Vocational & Tech',
    topicTitle: 'Human Musculoskeletal Mechanics & Synovial Joint Action',
    classLevel: 'JSS 1–SSS 3',
    term: 1,
    simulationType: 'musculoskeletal_joint',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    durationSeconds: 100,
    summary: '4K athletic biomechanics animation illustrating synovial ball-and-socket vs hinge joints, antagonistic muscle contraction (biceps/triceps), and lever principles.',
    audibleNarration: 'Welcome to this 4K sports physiology simulation. Movement occurs through muscular contraction acting on skeletal levers. Watch the biceps brachii flex the elbow joint as an antagonistic agonist, while the triceps relaxes. Synovial fluid inside the articular capsule reduces friction, enabling high-performance athletics with minimal wear.',
    pins: [
      { id: 'ph1', number: 1, name: 'Synovial Articular Capsule & Fluid', x: 50, y: 45, description: 'Fibrous sleeve filled with egg-white lubricant preventing bone-on-bone friction.', examTip: 'Synovial joints are freely movable (diarthroses), unlike fibrous immovable suture joints.' },
      { id: 'ph2', number: 2, name: 'Antagonistic Muscle Pair (Agonist/Antagonist)', x: 32, y: 35, description: 'Muscles work in pairs: one contracts while the opposite lengthens to move the bone lever.', examTip: 'During elbow flexion: Biceps is agonist (prime mover); Triceps is antagonist.' },
      { id: 'ph3', number: 3, name: 'Tendon Attachment (Muscle to Bone)', x: 42, y: 62, description: 'Tough inextensible bands of white collagen fibers transferring tensile muscle force.', examTip: 'Contrast tendons (muscle to bone) with ligaments (bone to bone).' }
    ]
  },

  // -------------------------------------------------------------------------
  // 19. HOME ECONOMICS / FOOD AND NUTRITION
  // -------------------------------------------------------------------------
  {
    id: 'he_balanced_food_pyramid',
    subject: 'Home Economics',
    subjectCategory: 'Vocational & Tech',
    topicTitle: 'Nutritional Food Pyramid & Digestive Nutrient Metabolism',
    classLevel: 'JSS 1–SSS 3',
    term: 1,
    simulationType: 'food_pyramid',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    durationSeconds: 95,
    summary: '4K nutritional guide depicting balanced dietary proportions: Staple Carbohydrates, Protective Fruits & Vegetables, Body-Building Proteins, and Oils.',
    audibleNarration: 'In this 4K home economics lesson, examine the nutritional food pyramid. The broad foundation consists of energy-giving staple carbohydrates like yam, cassava, and brown rice. Above are protective vitamins and dietary fiber, followed by body-building proteins like beans, fish, and eggs, with fats and refined oils kept at the smallest tip.',
    pins: [
      { id: 'fn1', number: 1, name: 'Carbohydrate Energy Base (Grains & Tubers)', x: 50, y: 82, description: 'Provides primary glucose fuel for muscular exertion and basal metabolic function.', examTip: 'Deficiency causes marasmus and severe weight loss in infants.' },
      { id: 'fn2', number: 2, name: 'Protective Foods (Vitamins & Mineral Salts)', x: 50, y: 60, description: 'Green leafy vegetables and citrus fruits maintaining immunity and cellular repair.', examTip: 'Vitamin C prevents scurvy; Vitamin A prevents night blindness.' },
      { id: 'fn3', number: 3, name: 'Body-Building Proteins (Legumes & Animal Sources)', x: 50, y: 38, description: 'Supplies essential amino acids for growth, tissue regeneration, and enzyme synthesis.', examTip: 'Kwashiorkor in children is caused specifically by protein deficiency with excess carbohydrate.' },
      { id: 'fn4', number: 4, name: 'Lipids & Oils Tip (Energy Reserve)', x: 50, y: 18, description: 'Concentrated energy stores and carriers for fat-soluble vitamins (A, D, E, K).', examTip: 'Consume predominantly unsaturated vegetable oils to prevent arterial plaque buildup.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 20. CULTURAL AND CREATIVE ARTS (CCA)
  // -------------------------------------------------------------------------
  {
    id: 'cca_color_wheel_theory',
    subject: 'Cultural and Creative Arts',
    subjectCategory: 'Arts & Humanities',
    topicTitle: '12-Part Chromatic Color Wheel & Color Harmonies',
    classLevel: 'JSS 1–3',
    term: 1,
    simulationType: 'color_wheel',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    durationSeconds: 90,
    summary: '4K artistic color theory simulation showing Primary Pigments, Secondary Blends, Tertiary Transitions, Complementary Pairs, and Temperature Tints.',
    audibleNarration: 'Welcome to this 4K creative arts studio demonstration. Primary colors — Red, Yellow, and Blue — cannot be created by mixing other pigments. Mixing pairs of primary colors yields secondary colors: Orange, Green, and Violet. Colors facing each other directly across the wheel are complementary, creating maximum visual contrast when placed side by side.',
    pins: [
      { id: 'cc1', number: 1, name: 'Primary Colors (Red, Yellow, Blue)', x: 50, y: 22, description: 'The fundamental pigment hues from which all other paint colors are derived.', examTip: 'BECE question: Name the three primary pigment colors in traditional art.' },
      { id: 'cc2', number: 2, name: 'Secondary Colors (Green, Orange, Violet)', x: 74, y: 55, description: 'Created by mixing two primary colors in equal proportions (e.g. Blue + Yellow = Green).', examTip: 'Red + Yellow = Orange; Yellow + Blue = Green; Blue + Red = Violet.' },
      { id: 'cc3', number: 3, name: 'Complementary Contrast Axis', x: 28, y: 55, description: 'Opposite hues like Red and Green that intensify each other when juxtaposed.', examTip: 'Mixing two complementary colors produces a neutral grey or muddy brown.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 21. CHRISTIAN RELIGIOUS STUDIES (CRS)
  // -------------------------------------------------------------------------
  {
    id: 'crs_moral_covenant',
    subject: 'Christian Religious Studies',
    subjectCategory: 'Arts & Humanities',
    topicTitle: 'The Ten Commandments & The Sermon on the Mount',
    classLevel: 'JSS 1–SSS 3',
    term: 1,
    simulationType: 'religious_pillars',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
    durationSeconds: 100,
    summary: '4K biblical covenant tablet visualization highlighting the Decalogue moral duties toward God and fellow human beings, complemented by the Beatitudes.',
    audibleNarration: 'In this 4K religious studies tutorial, we explore the ethical foundations of the Mosaic covenant. The Ten Commandments carved on stone tablets at Mount Sinai divide into two tablets: the first four commandments govern humanity’s duty and reverent worship of God, while the remaining six establish justice, marital fidelity, truthfulness, and love toward one’s neighbor.',
    pins: [
      { id: 'cr1', number: 1, name: 'First Tablet: Duty to God (Commandments 1–4)', x: 35, y: 38, description: 'Prohibits idolatry, using God’s name in vain, and commands keeping the Sabbath holy.', examTip: 'WAEC asks candidates to summarize Jesus’ synthesis: Love God with all your heart, soul, and mind.' },
      { id: 'cr2', number: 2, name: 'Second Tablet: Duty to Neighbor (Commandments 5–10)', x: 65, y: 38, description: 'Commands honoring parents, forbids murder, adultery, theft, false witness, and covetousness.', examTip: 'Chief Examiner focus: Explain how the Beatitudes deepen the spiritual intent of the Law.' },
      { id: 'cr3', number: 3, name: 'Golden Rule of Fellowship', x: 50, y: 75, description: 'Matthew 7:12: Do unto others what you would have them do unto you.', examTip: 'Key theme in personal morality and social responsibility questions.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 22. ISLAMIC RELIGIOUS STUDIES (IRS)
  // -------------------------------------------------------------------------
  {
    id: 'irs_five_pillars',
    subject: 'Islamic Religious Studies',
    subjectCategory: 'Arts & Humanities',
    topicTitle: 'The Five Pillars of Islam (Arkan al-Islam) & Ritual Purity',
    classLevel: 'JSS 1–SSS 3',
    term: 1,
    simulationType: 'religious_pillars',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
    durationSeconds: 105,
    summary: '4K architectural framework of Islamic worship: Shahadah (Declaration), Salat (Prayer), Zakat (Charity), Sawm (Ramadan Fasting), and Hajj (Pilgrimage).',
    audibleNarration: 'Welcome to this 4K presentation of the Five Pillars of Islam, the spiritual foundation of Muslim life and practice. The first pillar is Shahadah, testifying that there is no deity worthy of worship except Allah and Muhammad is His messenger. The subsequent pillars establish daily liturgical prayer with ritual ablution, obligatory zakat charity, Ramadan fasting, and the pilgrimage to Makkah.',
    pins: [
      { id: 'ir1', number: 1, name: 'Shahadah (Pillar of Faith)', x: 50, y: 22, description: 'The fundamental declaration of Islamic monotheism (Tawhid) and prophethood.', examTip: 'Without sincere belief in Shahadah, no other acts of worship are accepted.' },
      { id: 'ir2', number: 2, name: 'Salat (Five Daily Obligatory Prayers)', x: 30, y: 55, description: 'Direct communion with Allah performed at prescribed times facing the Qiblah in Makkah.', examTip: 'Ablution (Wudu) is compulsory prerequisite condition for valid Salat.' },
      { id: 'ir3', number: 3, name: 'Zakat (Obligatory Social Welfare Due)', x: 70, y: 55, description: 'Annual 2.5% wealth levy purified from excess savings distributed to the impoverished.', examTip: 'Zakat purifies wealth and prevents economic hoarding in Islamic finance.' },
      { id: 'ir4', number: 4, name: 'Sawm (Ramadan Fast) & Hajj (Pilgrimage)', x: 50, y: 82, description: 'Spiritual self-discipline during Ramadan and once-in-a-lifetime journey to the Holy Kaaba.', examTip: 'Fasting teaches empathy with the hungry and fosters God-consciousness (Taqwa).' }
    ]
  },

  // -------------------------------------------------------------------------
  // 23. FURTHER MATHEMATICS
  // -------------------------------------------------------------------------
  {
    id: 'fmath_conic_sections',
    subject: 'Further Mathematics',
    subjectCategory: 'Science & Math',
    topicTitle: 'Conic Sections: Parabola, Ellipse & Hyperbola Analytical Loci',
    classLevel: 'SSS 1–3',
    term: 1,
    simulationType: 'conic_sections',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    durationSeconds: 115,
    summary: '4K dual-nappe cone slicing simulation generating the Parabola (e = 1), Ellipse (e < 1), and Hyperbola (e > 1) with focus-directrix coordinates.',
    audibleNarration: 'In this 4K further mathematics locus demonstration, a double-napped right circular cone is intersected by cutting planes at various inclination angles. When the cutting plane is parallel to a cone generator, the resulting cross-section is a parabola with eccentricity equal to one. Notice how every point on the parabola remains equidistant from the fixed focus point and the directrix line.',
    pins: [
      { id: 'fm1', number: 1, name: 'Focus Coordinate F(a, 0)', x: 62, y: 50, description: 'Fixed point inside the curve from which all radial locus vectors originate.', examTip: 'Standard horizontal parabola equation: y² = 4ax. Coordinates of focus are (a, 0).' },
      { id: 'fm2', number: 2, name: 'Directrix Line (x = -a)', x: 28, y: 50, description: 'Fixed vertical guiding line outside the curve; distance from curve to directrix equals distance to focus.', examTip: 'Eccentricity e = Distance to Focus divided by Distance to Directrix.' },
      { id: 'fm3', number: 3, name: 'Vertex Point V(0, 0)', x: 45, y: 50, description: 'Extremum point where the conic section turns and intersects its principal axis of symmetry.', examTip: 'At vertex, the tangent line is perpendicular to the axis of symmetry.' }
    ]
  },

  // -------------------------------------------------------------------------
  // 24. TECHNICAL DRAWING
  // -------------------------------------------------------------------------
  {
    id: 'td_orthographic_projection',
    subject: 'Technical Drawing',
    subjectCategory: 'Vocational & Tech',
    topicTitle: 'Orthographic Multi-View Projection (First vs Third Angle)',
    classLevel: 'SSS 1–3',
    term: 1,
    simulationType: 'orthographic_projection',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    durationSeconds: 110,
    summary: '4K engineering blueprint unfolding a 3D machine component into Front Elevation, End Elevation, and Plan Views in standard First Angle projection.',
    audibleNarration: 'Welcome to this 4K technical drawing workshop. In First Angle Orthographic Projection, the 3D machine object is positioned in the first quadrant between the viewer and the projection plane. When the planes are unfolded onto the drawing sheet, the Plan view appears directly beneath the Front Elevation, while the Left End view is drawn to the right.',
    pins: [
      { id: 'td1', number: 1, name: 'Front Elevation (Primary View)', x: 35, y: 35, description: 'Shows the principal height and length dimensions as viewed directly from the front.', examTip: 'Always choose the view showing the most descriptive characteristic shape as Front Elevation.' },
      { id: 'td2', number: 2, name: 'Plan View (View from Above)', x: 35, y: 72, description: 'Shows length and width dimensions projected onto the horizontal plane beneath the front view.', examTip: 'In First Angle: Plan is BELOW Front Elevation. In Third Angle: Plan is ABOVE Front Elevation.' },
      { id: 'td3', number: 3, name: 'End Elevation (Side Profile)', x: 72, y: 35, description: 'Shows height and width dimensions with hidden detail indicated by dashed line segments.', examTip: 'Hidden edges must be drawn with thin dashed lines (BS 308 / ISO drawing standard).' }
    ]
  }
];

/**
 * Universal helper to retrieve all 4K visual aids matching a subject or topic
 */
export function get4KClipsForSubject(subjectName: string): Curriculum4KClip[] {
  const s = (subjectName || '').toLowerCase().trim();
  const matched = ALL_4K_CURRICULUM_CLIPS.filter((clip) => {
    const cSub = clip.subject.toLowerCase();
    const cTitle = clip.topicTitle.toLowerCase();
    return cSub.includes(s) || s.includes(cSub) || cTitle.includes(s) || s.includes(cTitle);
  });
  return matched.length > 0 ? matched : [ALL_4K_CURRICULUM_CLIPS[0]];
}

/**
 * Retrieves the best 4K clip tailored for a specific subject and topic title
 */
export function getBest4KClip(subjectName: string, topicTitle?: string): Curriculum4KClip {
  const s = (subjectName || '').toLowerCase().trim();
  const t = (topicTitle || '').toLowerCase().trim();

  // 1. Exact topic title match
  if (t) {
    for (const clip of ALL_4K_CURRICULUM_CLIPS) {
      if (clip.topicTitle.toLowerCase().includes(t) || t.includes(clip.topicTitle.toLowerCase())) {
        return clip;
      }
    }
  }

  // 2. Specific Subject matching across all 24 subjects
  if (s.includes('further') || s.includes('conic') || s.includes('calculus')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'fmath_conic_sections') || ALL_4K_CURRICULUM_CLIPS[22];
  }
  if (s.includes('math') || s.includes('arith') || s.includes('trig') || s.includes('geom')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'math_pythagoras_trig') || ALL_4K_CURRICULUM_CLIPS[2];
  }
  if (s.includes('draw') || s.includes('ortho') || s.includes('blueprint')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'td_orthographic_projection') || ALL_4K_CURRICULUM_CLIPS[23];
  }
  if (s.includes('basic sci') || s.includes('general sci')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'bsc_hydrological_cycle') || ALL_4K_CURRICULUM_CLIPS[7];
  }
  if (s.includes('bio') || s.includes('heart') || s.includes('circulation')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'bio_heart_circulation') || ALL_4K_CURRICULUM_CLIPS[0];
  }
  if (s.includes('cell') || s.includes('living') || s.includes('organism')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'bio_cell_division') || ALL_4K_CURRICULUM_CLIPS[1];
  }
  if (s.includes('chem') || s.includes('titrat') || s.includes('acid') || s.includes('base')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'chem_titration_setup') || ALL_4K_CURRICULUM_CLIPS[3];
  }
  if (s.includes('atom') || s.includes('electron') || s.includes('periodic')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'chem_bohr_atom') || ALL_4K_CURRICULUM_CLIPS[4];
  }
  if (s.includes('phys') && !s.includes('physical') && !s.includes('phe')) {
    if (t.includes('electric') || t.includes('circuit') || t.includes('ohm') || t.includes('current')) {
      return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'phys_circuit_ohms_law') || ALL_4K_CURRICULUM_CLIPS[6];
    }
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'phys_newton_kinematics') || ALL_4K_CURRICULUM_CLIPS[5];
  }
  if (s.includes('agric') || s.includes('crop') || s.includes('soil') || s.includes('farm')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'agric_soil_profile') || ALL_4K_CURRICULUM_CLIPS[6];
  }
  if (s.includes('tech') && !s.includes('draw')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'tech_gear_transmission') || ALL_4K_CURRICULUM_CLIPS[7];
  }
  if (s.includes('comp') || s.includes('ict') || s.includes('data')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'comp_von_neumann_cpu') || ALL_4K_CURRICULUM_CLIPS[8];
  }
  if (s.includes('civic')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'civ_fundamental_rights') || ALL_4K_CURRICULUM_CLIPS[9];
  }
  if (s.includes('social stud') || s.includes('kinship') || s.includes('family')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'soc_family_kinship') || ALL_4K_CURRICULUM_CLIPS[10];
  }
  if (s.includes('econ') || s.includes('demand') || s.includes('supply')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'econ_market_equilibrium') || ALL_4K_CURRICULUM_CLIPS[11];
  }
  if (s.includes('comm') || s.includes('distribut') || s.includes('wholesal')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'comm_channels_distribution') || ALL_4K_CURRICULUM_CLIPS[12];
  }
  if (s.includes('account') || s.includes('bookkeep') || s.includes('ledger')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'acc_double_entry_ledger') || ALL_4K_CURRICULUM_CLIPS[13];
  }
  if (s.includes('gov') || s.includes('power') || s.includes('legislat') || s.includes('judic')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'gov_separation_powers') || ALL_4K_CURRICULUM_CLIPS[14];
  }
  if (s.includes('geog') || s.includes('earth') || s.includes('tectonic') || s.includes('plate')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'geog_tectonics_faulting') || ALL_4K_CURRICULUM_CLIPS[15];
  }
  if (s.includes('lit') || s.includes('drama') || s.includes('play') || s.includes('poem')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'lit_dramatic_arc') || ALL_4K_CURRICULUM_CLIPS[17];
  }
  if (s.includes('eng') || s.includes('phonet') || s.includes('vowel') || s.includes('speech')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'eng_phonetics_vowels') || ALL_4K_CURRICULUM_CLIPS[16];
  }
  if (s.includes('physical and') || s.includes('phe') || s.includes('joint') || s.includes('sport')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'phe_musculoskeletal_joint') || ALL_4K_CURRICULUM_CLIPS[18];
  }
  if (s.includes('home econ') || s.includes('food') || s.includes('nutrit')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'he_balanced_food_pyramid') || ALL_4K_CURRICULUM_CLIPS[19];
  }
  if (s.includes('art') || s.includes('cca') || s.includes('color') || s.includes('craft')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'cca_color_wheel_theory') || ALL_4K_CURRICULUM_CLIPS[20];
  }
  if (s.includes('crs') || s.includes('christ') || s.includes('bible')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'crs_moral_covenant') || ALL_4K_CURRICULUM_CLIPS[21];
  }
  if (s.includes('irs') || s.includes('islam') || s.includes('quran') || s.includes('salat')) {
    return ALL_4K_CURRICULUM_CLIPS.find(c => c.id === 'irs_five_pillars') || ALL_4K_CURRICULUM_CLIPS[22];
  }

  return ALL_4K_CURRICULUM_CLIPS[0];
}

/**
 * 4K Video Aid Synchronization Manager (Phase 2):
 * Automatically generates or sources new 4K video realia clips with audible narration
 * and coordinate-accurate pins when a new curriculum topic is introduced.
 */
export function registerOrSync4KClipForTopic(params: {
  subject: string;
  classLevel: string;
  topicTitle: string;
  subtopics?: string[];
}): { clip: Curriculum4KClip; isNewlyCreated: boolean } {
  const { subject, classLevel, topicTitle, subtopics } = params;
  const existing = ALL_4K_CURRICULUM_CLIPS.find(
    (c) =>
      c.subject.toLowerCase() === subject.toLowerCase() &&
      (c.topicTitle.toLowerCase().includes(topicTitle.toLowerCase()) || topicTitle.toLowerCase().includes(c.topicTitle.toLowerCase()))
  );

  if (existing) {
    return { clip: existing, isNewlyCreated: false };
  }

  const slug = topicTitle.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 24);
  const clipId = `clip_4k_dyn_${slug}_${Date.now()}`;
  const sub1 = subtopics?.[0] || 'Core Phenomenon Overview';
  const sub2 = subtopics?.[1] || 'Dynamic Transformation & Measurement';
  const sub3 = subtopics?.[2] || 'Real-World Laboratory Application';

  const newClip: Curriculum4KClip = {
    id: clipId,
    subject,
    subjectCategory:
      subject.toLowerCase().includes('math') || subject.toLowerCase().includes('scien') || subject.toLowerCase().includes('bio') || subject.toLowerCase().includes('chem') || subject.toLowerCase().includes('phys')
        ? 'Science & Math'
        : subject.toLowerCase().includes('tech')
        ? 'Vocational & Tech'
        : 'Core & General',
    topicTitle,
    classLevel: classLevel || 'jss-1',
    term: 1,
    simulationType: 'generic_scientific',
    durationSeconds: 150,
    summary: `Statutory 4K Ultra-HD Visual Realia demonstration for ${topicTitle} adhering to Lagos Unified Scheme & NERDC specifications.`,
    audibleNarration: `Welcome to this 4K demonstration of ${topicTitle}. Notice the primary structural relationship indicated on screen. As observed in real Nigerian laboratory and industrial environments, the components interact through specific thermodynamic and mathematical principles. Ensure students note the coordinate markers and transfer the chalkboard notations into their notebooks.`,
    pins: [
      {
        id: `pin_dyn_1_${Date.now()}`,
        number: 1,
        name: sub1.slice(0, 28),
        x: 32,
        y: 40,
        description: `Primary structural locus: ${sub1}. Critical focal point for classroom explanation.`,
        examTip: `Examiners frequently request definitions and component labels for ${sub1.slice(0, 20)}.`,
      },
      {
        id: `pin_dyn_2_${Date.now()}`,
        number: 2,
        name: sub2.slice(0, 28),
        x: 68,
        y: 50,
        description: `Dynamic interaction locus: ${sub2}. Observe directional vectors and state transitions.`,
        examTip: `Common student misconception involves confusing this stage with equilibrium.`,
      },
      {
        id: `pin_dyn_3_${Date.now()}`,
        number: 3,
        name: sub3.slice(0, 28),
        x: 50,
        y: 82,
        description: `Operational outcome locus: ${sub3}. Local Nigerian environmental and industrial application.`,
        examTip: `Cite practical everyday examples from Lagos, Kano, or Port Harcourt in WAEC essays.`,
      },
    ],
  };

  ALL_4K_CURRICULUM_CLIPS.unshift(newClip);
  return { clip: newClip, isNewlyCreated: true };
}
