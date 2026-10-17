import fs from 'node:fs';
import path from 'node:path';

interface CurriculumData {
  levelId: string;
  levelName: string;
  category: 'junior' | 'senior';
  code: string;
  description: string;
  sortOrder: number;
  subjects: {
    id: string;
    name: string;
    code: string;
    description: string;
    icon: string;
    terms: {
      term: number;
      name: string;
      weeks: {
        week: number;
        topic: string;
        subtopics: string[];
        objectives: string[];
        teacherActivities: string[];
        studentActivities: string[];
        materials: string[];
        evaluation: string[];
      }[];
    }[];
  }[];
}

const levelsDef = [
  { id: 'jss-1', name: 'Junior Secondary School 1', code: 'JSS 1', category: 'junior' as const, sortOrder: 1, desc: 'Foundational secondary stage covering NERDC basic 7 curriculum.' },
  { id: 'jss-2', name: 'Junior Secondary School 2', code: 'JSS 2', category: 'junior' as const, sortOrder: 2, desc: 'Intermediate junior secondary covering NERDC basic 8 curriculum.' },
  { id: 'jss-3', name: 'Junior Secondary School 3', code: 'JSS 3', category: 'junior' as const, sortOrder: 3, desc: 'BECE / Junior WAEC exam preparation stage covering basic 9.' },
  { id: 'sss-1', name: 'Senior Secondary School 1', code: 'SSS 1', category: 'senior' as const, sortOrder: 4, desc: 'Senior secondary transition stage introducing specialized science and arts fields.' },
  { id: 'sss-2', name: 'Senior Secondary School 2', code: 'SSS 2', category: 'senior' as const, sortOrder: 5, desc: 'Advanced senior secondary curriculum deepening practical and theoretical competence.' },
  { id: 'sss-3', name: 'Senior Secondary School 3', code: 'SSS 3', category: 'senior' as const, sortOrder: 6, desc: 'WAEC / WASSCE & NECO SSCE terminal revision and examination candidate stage.' },
];

const jssSubjectTemplates = [
  {
    name: 'Mathematics',
    code: 'MTH',
    icon: 'Calculator',
    description: 'Number and numeration, basic algebra, geometry, statistics, and Nigerian commercial arithmetic.',
    termThemes: [
      {
        term: 1,
        theme: 'Whole Numbers, Fractions & Basic Algebra',
        topics: [
          'Whole Numbers: Counting, writing in millions & place value in base 10',
          'Prime Numbers, Factors, Multiples, LCM and HCF of two numbers',
          'Fractions: Proper, improper, mixed numbers, and conversions',
          'Operations on Fractions: Addition, subtraction, multiplication & division',
          'Decimals and Percentages: Conversions and commercial applications',
          'Estimation and Approximations: Nearest tens, hundreds, and decimal places',
          'Mid-Term Assessment & Continuous Assessment Test (CA 1)',
          'Introduction to Algebra: Symbols, letters for numbers, and open sentences',
          'Basic Algebraic Operations: Addition and subtraction of like terms',
          'Simple Linear Equations: One unknown involving whole numbers',
          'Word Problems leading to simple linear equations',
          'Comprehensive Term Revision & Group Problem Solving',
          'First Term Examination & Broadsheet Compilation'
        ]
      },
      {
        term: 2,
        theme: 'Geometry, Mensuration & Construction',
        topics: [
          'Plane Shapes: Identification of triangles, quadrilaterals, circles and polygons',
          'Properties of Triangles: Equilateral, isosceles, scalene and right-angled',
          'Perimeter of Regular and Irregular Plane Figures',
          'Area of Rectangles, Squares, and Parallelograms with real-life units',
          'Angles: Types of angles (acute, right, obtuse, reflex, complementary)',
          'Measurement of Angles using standard protractor and geometric rules',
          'Mid-Term Continuous Assessment Test & Practical Geometry Check',
          'Geometric Construction: Bisecting a line segment and 60°/90° angles',
          'Solid Shapes: Cubes, cuboids, cylinders, spheres, and nets',
          'Volume of Cubes and Cuboids in cubic centimetres and litres',
          'Three-Dimensional Coordinates & Symmetry in Nigerian textiles and motifs',
          'Second Term Revision and Practical Geometry Exhibition',
          'Second Term Examination & Performance Review'
        ]
      },
      {
        term: 3,
        theme: 'Statistics, Everyday Arithmetic & Everyday Probability',
        topics: [
          'Data Collection and Frequency Tables from classroom surveys',
          'Graphical Representation of Data: Pictograms and Bar Charts',
          'Pie Charts: Reading and constructing angles of sectors',
          'Measures of Average: Mean, Median, and Mode of ungrouped data',
          'Commercial Arithmetic: Profit and Loss in Nigerian market contexts',
          'Simple Interest: Calculating principal, rate, time, and total amount',
          'Mid-Term Assessment Test & Practical Financial Literacy Review',
          'Introduction to Probability: Chance events and everyday certainty',
          'Scale Drawing and Basic Bearing: North, South, East, West orientations',
          'Ratio and Proportion in sharing farm yields and money',
          'Integrated Quantitative Aptitude & Problem Solving',
          'Comprehensive Annual Curriculum Revision',
          'Third Term Promotional Examination & Academic Broadsheets'
        ]
      }
    ]
  },
  {
    name: 'English Studies',
    code: 'ENG',
    icon: 'BookOpen',
    description: 'Grammar, vocabulary development, reading comprehension, continuous writing, and oral speech sounds.',
    termThemes: [
      {
        term: 1,
        theme: 'Parts of Speech & Narrative Composition',
        topics: [
          'Speech Work: Pure vowel sounds /i:/ and /ɪ/; Introduction to parts of speech',
          'Nouns: Types of nouns (proper, common, abstract, collective) and functions',
          'Pronouns: Personal, possessive, relative pronouns, and agreement rules',
          'Reading Comprehension: Reading for main ideas and factual recall',
          'Vocabulary: Words associated with the Nigerian school environment and library',
          'Composition: Narrative essay writing — "My First Day in Secondary School"',
          'Mid-Term Continuous Assessment & Oral Reading Fluency Check',
          'Verbs: Action verbs, state verbs, regular and irregular past tense forms',
          'Tenses: Simple present and present continuous tenses in daily communication',
          'Adjectives: Identification, comparison of adjectives (positive, comparative, superlative)',
          'Informal Letters: Format, salutation, body paragraphs, and subscript',
          'Termly Grammatical Revision & Spelling Bee Tournament',
          'First Term Examination & Broadsheet Compilation'
        ]
      },
      {
        term: 2,
        theme: 'Sentence Structure & Descriptive Writing',
        topics: [
          'Speech Work: Consonant sounds /p/, /b/, /t/, /d/ with phonetic contrast drills',
          'Adverbs: Types of adverbs (manner, place, time, frequency) and sentence positions',
          'Prepositions: Correct usage with spatial and temporal expressions',
          'Reading Comprehension: Identifying implied meanings and context clues',
          'Vocabulary Development: Words associated with agriculture and Nigerian farming seasons',
          'Composition: Descriptive writing — "A Traditional Nigerian Market Scene"',
          'Mid-Term CA Test & Dictation / Spelling Proficiency',
          'Conjunctions: Coordinating and subordinating conjunctions in compound sentences',
          'Active and Passive Voice: Transforming simple affirmative sentences',
          'Literature in English: Elements of prose (plot, character, setting, theme)',
          'Poetry Appreciation: Rhyme, rhythm, and imagery in contemporary African poems',
          'Term Revision: Speech Clinic, Essay Critiques & Mock Debates',
          'Second Term Examination & Oral Interview Assessment'
        ]
      },
      {
        term: 3,
        theme: 'Expository Writing, Literature & Speech Mastery',
        topics: [
          'Speech Work: Diphthongs /eɪ/, /aɪ/, /ɔɪ/ and intonation in yes/no questions',
          'Punctuation Marks: Full stop, comma, question mark, exclamation, apostrophe for possession',
          'Direct and Indirect Speech: Rules of converting conversational statements',
          'Reading Comprehension: Critical evaluation and drawing inferences from literary texts',
          'Vocabulary: Words associated with health, immunization, and community sanitation',
          'Expository Essay: "How to Prevent Malaria in Our Community"',
          'Mid-Term Continuous Assessment & Class Debate Presentations',
          'Drama: Elements of drama (dialogue, stage directions, act, scene) with scripted playlet',
          'Figures of Speech: Simile, metaphor, personification, hyperbole with Nigerian cultural proverbs',
          'Formal Letter Writing: Application for permission to be absent from school',
          'Summary Writing: Extracting key points from multi-paragraph prose',
          'Comprehensive Third Term English Studies Revision',
          'Third Term Promotional Examination & Broadsheets'
        ]
      }
    ]
  },
  {
    name: 'Basic Science & Technology',
    code: 'BST',
    icon: 'Atom',
    description: 'Living and non-living things, matter, energy, technology tools, and environmental hygiene.',
    termThemes: [
      {
        term: 1,
        theme: 'Living Things, Matter & Workshop Safety',
        topics: [
          'Introduction to Science: Meaning, branches, and scientific method of inquiry',
          'Living and Non-Living Things: Characteristics and classification',
          'Characteristics of Plants and Animals: Differences in nutrition and locomotion',
          'Human Body: Reproductive health, growth stages, and pubertal changes',
          'Environmental Pollution: Air, water, soil pollution, causes and control measures',
          'Safety in the Science Laboratory and School Workshop: Safety rules and first aid kits',
          'Mid-Term Practical Assessment & Lab Safety Drill',
          'Matter: Definition, states of matter (solid, liquid, gas) and kinetic particle theory',
          'Physical and Chemical Changes: Reversible and irreversible changes with local examples',
          'Introduction to Basic Technology: Concept, importance, and safety signs',
          'Workshop Hand Tools: Measuring, marking out, and cutting tools (woodwork/metalwork)',
          'Termly Laboratory Review & Practical Exhibition',
          'First Term Examination & Broadsheets'
        ]
      },
      {
        term: 2,
        theme: 'Energy, Forces & Information Technology',
        topics: [
          'Energy: Forms of energy (kinetic, potential, thermal, chemical, electrical)',
          'Law of Conservation of Energy and renewable vs non-renewable energy in Nigeria',
          'Force: Contact and non-contact forces, gravitational pull and friction',
          'Friction: Advantages, disadvantages, and methods of reducing friction in machines',
          'Work, Energy, and Power: Calculation of work done and energy transfers',
          'Simple Machines: Levers, pulleys, inclined planes, wheel and axle',
          'Mid-Term Assessment & Engineering Model Demonstrations',
          'Introduction to Computer Studies: Hardware, software, input and output devices',
          'Central Processing Unit (CPU) and storage media (USB, SSD, Optical)',
          'Operating Systems: Functions and navigating the desktop GUI',
          'Maintenance of Technical Tools and Personal Protective Equipment (PPE)',
          'Second Term Science & Tech Project Showcase',
          'Second Term Examination & Practical Evaluation'
        ]
      },
      {
        term: 3,
        theme: 'Ecology, Solar System & Basic Electronics',
        topics: [
          'The Solar System: Planets, sun, moon, rotation and revolution of the earth',
          'Ecosystem: Components of an ecosystem, food chains, and food webs in the savannah',
          'Water: Sources, purification techniques (boiling, filtration, chlorination), and hard/soft water',
          'Sanitation and Waste Management: Recycle, reduce, reuse in Nigerian municipalities',
          'Basic Electricity: Simple electric circuit, conductors, insulators, and voltage measurement',
          'Magnetism: Magnetic materials, poles, magnetic fields and compass navigation',
          'Mid-Term Assessment & Solar System Model Projects',
          'Introduction to Drawing: Drawing instruments, lines, and lettering conventions',
          'Scale Drawing and Orthographic Projections for Junior Tech',
          'Woodwork Joint Techniques: Butt joint, lap joint, mortise and tenon',
          'Applied Science: Drug abuse prevention, synthetic drugs, and NDLEA awareness',
          'Annual Science Fair, Revision & Lab Clean-up',
          'Third Term Promotional Examination & Broadsheets'
        ]
      }
    ]
  },
  {
    name: 'Civic Education',
    code: 'CVE',
    icon: 'Shield',
    description: 'National values, citizenship, Nigerian Constitution, rights, duties, and democracy.',
    termThemes: [
      {
        term: 1,
        theme: 'National Values, Honesty & Discipline',
        topics: [
          'Meaning and Importance of Civic Education in a Democratic Nigeria',
          'National Values: Meaning, integrity, honesty, and contentment',
          'Discipline: Meaning, attributes of a disciplined Nigerian citizen, and consequences of indiscipline',
          'Courage: Meaning, types of courage (moral, physical), and showing bravery with integrity',
          'Self-Reliance: Importance of skills acquisition and vocational training for youth',
          'National Symbols: The Nigerian Flag, National Anthem, Pledge, and Coat of Arms',
          'Mid-Term Assessment Test & Civic Values Essay',
          'The Nigerian Constitution: Meaning, historical development, and supremacy',
          'Citizenship: Meaning, ways of acquiring citizenship (birth, registration, naturalization)',
          'Rights and Duties of a Nigerian Citizen: Fundamental human rights (Chapter IV)',
          'Obligations of Citizens: Payment of taxes, obedience to law, civic participation',
          'Term Revision & Civic Rights Panel Discussion',
          'First Term Examination & Broadsheets'
        ]
      },
      {
        term: 2,
        theme: 'Democracy, Rule of Law & Pillars of Governance',
        topics: [
          'Democracy: Meaning, historical origin, and democratic institutions in Nigeria',
          'Pillars of Democracy: Arms of government (Executive, Legislature, Judiciary)',
          'The Legislative Arm: Composition of National Assembly (Senate & House of Representatives)',
          'The Executive Arm: President, Governors, Ministers, and law enforcement agencies',
          'The Judiciary: Courts of law, judicial independence, and justice delivery',
          'Rule of Law: Equality before the law, fundamental liberty, and prevention of tyranny',
          'Mid-Term Continuous Assessment & Mock Parliamentary Session',
          'Political Parties: Roles of political parties in democratic governance',
          'Elections: Meaning, types of elections (general, bye-elections), and INEC',
          'Electoral Malpractices: Vote buying, ballot snatching, consequences and solutions',
          'Community Leadership: Traditional rulers, council chairmen, and civic cooperation',
          'Second Term Revision & Electoral Integrity Debate',
          'Second Term Examination & Broadsheets'
        ]
      },
      {
        term: 3,
        theme: 'National Consciousness, Peace & Human Rights',
        topics: [
          'National Consciousness, National Integrity, and Unity in Diversity',
          'Promoting National Unity: NYSC scheme, federal character principle, unity schools',
          'Human Rights: Universal Declaration of Human Rights (UDHR) and African Charter',
          'Human Trafficking: Meaning, causes, effects, and NAPTIP operations in Nigeria',
          'Cultism: Causes, negative consequences on students and families, and eradication strategies',
          'Drug Abuse and Trafficking: Roles of NDLEA and NAFDAC in youth protection',
          'Mid-Term Assessment & Anti-Corruption Drama Presentation',
          'Traffic Rules and Regulations: Signs, road safety codes, and FRSC mandates',
          'Consumer Rights: Protection against counterfeit goods, FCCPC and SON roles',
          'Peace and Conflict Resolution: Meaning of peace, mediation, and dialogue methods',
          'Patriotism: Heroic acts of Nigerian founding fathers (Azikiwe, Awolowo, Bello, Macaulay)',
          'Comprehensive Civic Education Revision',
          'Third Term Promotional Examination & Broadsheets'
        ]
      }
    ]
  }
];

const sssSubjectTemplates = [
  {
    name: 'General Mathematics',
    code: 'GMTH',
    icon: 'Calculator',
    description: 'Advanced algebra, trigonometry, coordinate geometry, calculus, and WAEC/WASSCE statistics.',
    termThemes: [
      {
        term: 1,
        theme: 'Indices, Logarithms & Quadratic Equations',
        topics: [
          'Number Bases: Conversion between bases 2, 8, 10, and 16 with modular arithmetic',
          'Laws of Indices: Zero, negative, and fractional indices with algebraic simplifications',
          'Logarithms: Standard form, characteristic, mantissa, multiplication and division using four-figure tables',
          'Simultaneous Linear Equations: Substitution, elimination, and graphical solutions',
          'Quadratic Equations: Factorization method, completing the square, and quadratic formula',
          'Roots of Quadratic Equations and construction of equations from given roots',
          'Mid-Term Assessment & WASSCE Standard CA Examination',
          'Sets and Venn Diagrams: Union, intersection, complement, 2 and 3-set problem solving',
          'Logical Reasoning: Simple and compound statements, negations, conjunctions, truth tables',
          'Linear Inequalities: Single variable inequalities and graphical representation on Cartesian plane',
          'Commercial Mathematics: Compound interest, annuities, inflation, and income tax calculations',
          'First Term Advanced Problem Solving & Past WASSCE Drill',
          'First Term Examination & Broadsheet Compilation'
        ]
      },
      {
        term: 2,
        theme: 'Trigonometry, Circle Theorems & Vectors',
        topics: [
          'Trigonometric Ratios: Sine, cosine, tangent for acute and obtuse angles (CAST rule)',
          'Angles of Elevation and Depression with real-life surveying and telecommunication mast problems',
          'Sine Rule and Cosine Rule for non-right angled triangles and applications to bearings',
          'Circle Theorems: Angle subtended at the centre, angles in the same segment, cyclic quadrilaterals',
          'Tangent Properties of Circles: Angle between tangent and radius, tangents from an external point',
          'Mensuration of Plane Shapes: Arc length, sector area, segment area in circles and composite figures',
          'Mid-Term Assessment & Geometric Proof Mastery Test',
          'Mensuration of Solids: Surface area and volume of cones, pyramids, spheres, and frustums',
          'Coordinate Geometry: Distance between two points, midpoint, gradient, and equation of straight lines',
          'Parallel and Perpendicular Lines: Condition of gradients (m1 = m2, m1*m2 = -1)',
          'Vectors in Two Dimensions: Representation, magnitude, direction, vector addition, and scalars',
          'Second Term Revision: WAEC Section B Theorem Proof Clinic',
          'Second Term Examination & Broadsheets'
        ]
      },
      {
        term: 3,
        theme: 'Statistics, Probability & Matrices',
        topics: [
          'Grouped Frequency Distribution: Class intervals, boundaries, midpoints, frequency density',
          'Histograms and Frequency Polygons: Estimating mode from histogram',
          'Cumulative Frequency Curve (Ogive): Median, quartiles, deciles, and percentiles',
          'Measures of Dispersion: Mean deviation, variance, and standard deviation of grouped data',
          'Probability: Addition and multiplication laws, mutually exclusive and independent events',
          'Tree Diagrams: Solving complex conditional probability scenarios',
          'Mid-Term Continuous Assessment & Statistical Survey Project',
          'Matrices: Order of matrices, addition, scalar multiplication, and determinant of 2x2 matrices',
          'Inverse of a 2x2 Matrix and application to simultaneous linear equations (Cramer\'s Rule)',
          'Transformation Geometry: Reflections, rotations, and enlargements in Cartesian plane',
          'Sequences and Series: Arithmetic Progression (AP) — nth term and sum of first n terms',
          'Geometric Progression (GP): Common ratio, nth term, sum of GP, and sum to infinity',
          'Third Term Promotional Examination & Broadsheet Compilation'
        ]
      }
    ]
  },
  {
    name: 'English Language',
    code: 'ENG_SSS',
    icon: 'BookOpen',
    description: 'WASSCE essay writing, summary techniques, lexical structures, and oral phonetics mastery.',
    termThemes: [
      {
        term: 1,
        theme: 'Lexis, Structure & Advanced Essay Writing',
        topics: [
          'Oral English: Vowel contrasts /ʌ/ vs /æ/, /ɒ/ vs /ɔ:/ with phonetic drills and WASSCE test of orals',
          'Grammar: Noun clauses and their grammatical functions (subject, object, complement)',
          'Adjectival Clauses: Relative pronouns, restrictive and non-restrictive clauses with punctuation',
          'Vocabulary Development: Words associated with government, politics, and the judiciary',
          'Continuous Writing: Expository essays — "The Menace of Youth Unemployment in Nigeria"',
          'Reading Comprehension: Structural analysis, tone, mood, and rhetorical devices',
          'Mid-Term Continuous Assessment & Lexis and Structure Speed Test',
          'Summary Writing: Principles of summary writing (identifying core assertions, omitting illustrations)',
          'Adverbial Clauses: Clauses of time, reason, condition, concession, and result',
          'Punctuation in Complex Sentences: Colon, semi-colon, dash, and quotation marks',
          'Argumentative Essay: "Civilian Rule is Superior to Military Administration"',
          'First Term Comprehensive Revision & Essay Critique Sessions',
          'First Term Examination & Broadsheet Compilation'
        ]
      },
      {
        term: 2,
        theme: 'Speech Mastery, Formal Correspondence & Literature',
        topics: [
          'Oral English: Consonant clusters in initial, medial, and terminal positions (e.g. /spl/, /kts/)',
          'Grammar: Modal auxiliaries (can, could, may, might, shall, should, must, ought to) and nuances',
          'Conditionals: Types 1, 2, and 3 conditionals in hypothetical discourse',
          'Vocabulary: Words associated with banking, finance, capital markets, and currency regulations',
          'Formal Letters: Letter to the Editor concerning local government road infrastructure',
          'Reading Comprehension: Deciphering archaic, ironic, and satirical writing in African prose',
          'Mid-Term Continuous Assessment & Oral English Laboratory Exam',
          'Summary Writing: Practice on 2-sentence and 3-sentence précis questions from past WASSCE papers',
          'Phrasal Verbs and Idiomatic Expressions in Nigerian and international English idioms',
          'Article Writing: Articles for national publication with compelling headlines and call to action',
          'Speech Writing: Welcome address and valedictory speech drafting',
          'Second Term Revision: Past WAEC Paper 1 & Paper 2 Mock Examination',
          'Second Term Examination & Performance Diagnostics'
        ]
      },
      {
        term: 3,
        theme: 'Intonation, Literary Appreciation & Speed Drills',
        topics: [
          'Oral English: Syllable stress, emphatic stress, and intonation tunes (falling and rising tunes)',
          'Grammar: Concord rules (grammatical, proximity, notional, correlative conjunctions)',
          'Active and Passive Voice transformations with double objects and prepositional verbs',
          'Vocabulary: Words associated with petroleum industry, environmental remediation, and mining',
          'Report Writing: Official committee report on school sports festival organization',
          'Creative Writing: Developing short stories with flashback, suspense, and dynamic character arc',
          'Mid-Term Continuous Assessment & Speed Summary Marathon',
          'Literary Appreciation: Unseen poetry and prose analysis under timed conditions',
          'Figurative Language: Synecdoche, metonymy, oxymoron, paradox, and dramatic irony',
          'Spelling and Lexical Errors common among West African English candidates',
          'WASSCE General English Strategy: Time management for Paper 1, Paper 2, and Paper 3',
          'Comprehensive Third Term Promotional Revision',
          'Third Term Promotional Examination & Broadsheets'
        ]
      }
    ]
  },
  {
    name: 'Biology',
    code: 'BIO',
    icon: 'Microscope',
    description: 'Cell biology, physiology, ecology, genetics, reproduction, and practical laboratory techniques.',
    termThemes: [
      {
        term: 1,
        theme: 'Living Cells, Microscopy & Nutrition',
        topics: [
          'Cell Theory: Microscope usage, plant vs animal cell ultrastructure, organelles and functions',
          'Levels of Organization of Life: Cell, tissue, organ, system, organism with botanical/zoological examples',
          'Classification of Living Things: Five kingdom system (Monera, Protista, Fungi, Plantae, Animalia)',
          'Diffusion, Osmosis, and Plasmolysis: Principles and laboratory experiments using yam tuber',
          'Plant Nutrition: Photosynthesis, light and dark reactions, chlorophyl extraction, and starch test',
          'Mineral Nutrition in Plants: Macro and micro-elements, deficiency symptoms in maize and legumes',
          'Mid-Term Practical Assessment & Lab Specimen Identification',
          'Animal Nutrition: Classes of food, balanced diet, chemical tests for carbohydrates, proteins, fats',
          'Digestive System: Dentition, enzyme action in alimentary canal, absorption in villi',
          'Transport System in Plants: Xylem, phloem, transpiration stream, potometer experiments',
          'Circulatory System in Animals: Blood composition, blood groups, Rhesus factor, heart mechanics',
          'First Term Review: Practical Biology Drawings and Lab Notebook Evaluation',
          'First Term Examination & Broadsheets'
        ]
      },
      {
        term: 2,
        theme: 'Respiration, Excretion & Ecology',
        topics: [
          'Cellular Respiration: Aerobic vs anaerobic respiration, glycolysis, Krebs cycle, energy yield',
          'Respiratory Organs in Living Organisms: Stomata, lenticels, gills, tracheal system, lungs',
          'Excretory Systems: Contractile vacuole, flame cells, nephridia, Malpighian tubules, mammalian kidney',
          'Structure and Function of the Human Kidney: Nephron, ultrafiltration, selective reabsorption',
          'Ecology: Concepts of habitat, biome, biosphere, ecological niche, and population density',
          'Ecological Instruments: Quadrat, transect, secchi disc, sweep net, hygrometer, and soil thermometer',
          'Mid-Term Assessment & Ecological Field Sampling Practical',
          'Energy Flow in Ecosystems: Food chain, food web, trophic levels, ecological pyramids of numbers and energy',
          'Biogeochemical Cycles: Carbon cycle, nitrogen cycle, water cycle, and human disruptions',
          'Ecological Succession: Primary and secondary succession in terrestrial and aquatic habitats',
          'Soil Science: Soil profile, components of soil, water-holding capacity, and soil conservation',
          'Second Term Revision: Ecological Data Analysis & Specimen Practical',
          'Second Term Examination & Broadsheets'
        ]
      },
      {
        term: 3,
        theme: 'Genetics, Evolution & Reproduction',
        topics: [
          'Reproduction in Flowering Plants: Floral parts, pollination, fertilization, seed and fruit formation',
          'Asexual Reproduction: Vegetative propagation in cassava, grafting, budding, tissue culture',
          'Reproduction in Mammals: Male and female reproductive anatomy, menstrual cycle, fertilization',
          'Growth and Development: Germination types (epigeal vs hypogeal), plant hormones (auxins, gibberellins)',
          'Heredity and Genetics: Mendelian laws of inheritance, monohybrid and dihybrid crosses',
          'Chromosomes and DNA: Structure of DNA, genes, alleles, sex determination, and karyotypes',
          'Mid-Term Assessment & Genetic Cross Problem Sets',
          'Variation in Living Organisms: Morphological and physiological variation (fingerprints, blood groups)',
          'Sickle Cell Anaemia and Haemophilia: Genetic counselling, genotype compatibility (AA, AS, SS)',
          'Evolution: Lamarckism, Darwinian natural selection, evidence from palaeontology and comparative anatomy',
          'Conservation of Natural Resources: Game reserves in Nigeria (Yankari, Kainji), endangered fauna',
          'Annual Practical Biology Marathon & WASSCE Past Questions Seminar',
          'Third Term Promotional Examination & Broadsheets'
        ]
      }
    ]
  },
  {
    name: 'Economics',
    code: 'ECN',
    icon: 'TrendingUp',
    description: 'Microeconomics, macroeconomics, public finance, Nigerian financial institutions, and international trade.',
    termThemes: [
      {
        term: 1,
        theme: 'Scarcity, Choice & Price Determination',
        topics: [
          'Basic Economic Concepts: Meaning of Economics, scarcity, choice, scale of preference, opportunity cost',
          'Production: Meaning, factors of production (land, labour, capital, entrepreneur) and rewards',
          'Division of Labour and Specialization: Advantages, disadvantages, and industrial limitations',
          'Economic Systems: Capitalism, socialism, mixed economy with comparative national case studies',
          'Basic Tools of Economic Analysis: Tables, charts, graphs, mean, median, mode in economic datasets',
          'Demand Theory: Law of demand, demand curve, determinants of demand, shift vs movement along curve',
          'Mid-Term Assessment & Price Elasticity Problem Sets',
          'Supply Theory: Law of supply, supply schedule, determinants of supply, elasticity of supply',
          'Equilibrium Price: Price determination in competitive markets, excess demand, excess supply',
          'Price Legislation: Maximum price control (price ceiling), minimum price control (price floor), black market',
          'Elasticity of Demand: Price, income, and cross elasticity of demand with calculations',
          'First Term Economics Seminar & Current Market Price Survey',
          'First Term Examination & Broadsheets'
        ]
      },
      {
        term: 2,
        theme: 'Market Structures, Money & Banking',
        topics: [
          'Theory of Consumer Behaviour: Utility, marginal utility, law of diminishing marginal utility',
          'Theory of Costs: Fixed, variable, total, average, and marginal costs with graphical curves',
          'Revenue Concepts: Total revenue, average revenue, marginal revenue, profit maximization condition (MC=MR)',
          'Market Structures: Perfect competition characteristics, short-run and long-run equilibrium',
          'Monopoly: Sources of monopoly power, price discrimination, advantages and control mechanisms',
          'Monopolistic Competition and Oligopoly: Cartels, non-price competition, and game theory primer',
          'Mid-Term Assessment & Market Structure Analytical Case Studies',
          'Money: Evolution from trade by barter, functions of money, qualities of good money, money supply',
          'Financial Institutions: Commercial banks, functions, credit creation mechanisms and limitations',
          'Central Bank of Nigeria (CBN): History, functions, monetary policy tools (cash reserve ratio, MPR, OMO)',
          'Non-Bank Financial Institutions: Insurance companies, pension fund administrators, microfinance banks',
          'Second Term Economics Revision & CBN Monetary Policy Critique',
          'Second Term Examination & Broadsheets'
        ]
      },
      {
        term: 3,
        theme: 'National Income, Public Finance & Global Trade',
        topics: [
          'National Income Accounting: GDP, GNP, NNP, National Income, disposable income concepts',
          'Measurement of National Income: Output method, income method, expenditure method, double counting issue',
          'Inflation: Meaning, types (demand-pull, cost-push), causes, effects on Nigerian consumers, control policies',
          'Unemployment: Types of unemployment (frictional, structural, seasonal, cyclical), youth solutions',
          'Public Finance: Government revenue sources, oil vs non-oil revenue in Nigeria, taxation principles',
          'Taxation: Direct and indirect taxes, progressive, proportional, and regressive tax regimes',
          'Mid-Term Assessment & Budget Analysis Workshop',
          'Government Budget: Revenue estimates, recurrent vs capital expenditure, surplus, balanced, deficit budgets',
          'International Trade: Absolute and comparative advantage theories, reasons for foreign trade',
          'Balance of Payments: Current account, capital account, balance of trade, balance of payments deficit',
          'Economic Integration: ECOWAS, African Continental Free Trade Area (AfCFTA), OPEC, IMF, World Bank',
          'Comprehensive Third Term Economics Revision & WAEC Prep',
          'Third Term Promotional Examination & Broadsheets'
        ]
      }
    ]
  }
];

function generateObjectives(topic: string, week: number): string[] {
  if (week === 7) {
    return [
      'Assess student mastery of concepts taught from Weeks 1 through 6',
      'Identify specific learning gaps requiring targeted remediation',
      'Demonstrate problem-solving proficiency under timed examination conditions'
    ];
  }
  if (week === 12) {
    return [
      'Synthesize key theoretical concepts covered throughout the term',
      'Resolve complex multi-step past WASSCE/BECE examination problems',
      'Validate portfolio of practical activities, experiments, and notebook assignments'
    ];
  }
  if (week === 13) {
    return [
      'Complete standardized term-end evaluation questions with academic integrity',
      'Attain minimum mastery benchmark of 65% across multiple choice and essay components',
      'Demonstrate readiness for promotion to the subsequent term/class curriculum'
    ];
  }
  return [
    `Define and explain the fundamental concepts of ${topic.split(':')[0]}`,
    `Identify, classify, and illustrate real-life Nigerian examples of the topic`,
    `Apply principles to solve structured theoretical and quantitative exercises`,
    `Demonstrate Bloom-aligned higher-order thinking (Analyze, Evaluate, Create)`
  ];
}

function generateActivities(topic: string, isTeacher: boolean, week: number): string[] {
  if (isTeacher) {
    if (week === 7 || week === 13) {
      return [
        'Distribute standardized exam papers and maintain strict exam protocol',
        'Monitor time intervals and record attendance roll',
        'Coordinate prompt collection and grading against standardized marking scheme'
      ];
    }
    return [
      `Introduce ${topic.split(':')[0]} using local pedagogical analogies and Nigerian case studies`,
      'Demonstrate step-by-step methodology on whiteboard and interactive charts',
      'Facilitate group discussions and supervise peer problem-solving exercises',
      'Administer formative exit-ticket evaluation questions to assess comprehension'
    ];
  } else {
    if (week === 7 || week === 13) {
      return [
        'Present valid student identity and follow examination hall regulations',
        'Read instructions carefully and complete objective and essay answer sheets',
        'Submit completed scripts at the designated conclusion signal'
      ];
    }
    return [
      'Participate actively in classroom brainstorming and answer exploratory questions',
      'Record summary notes, definitions, formulas, and diagrams in subject notebooks',
      'Work in cooperative peer pairs to solve assigned drill questions',
      'Ask clarifying questions and complete individual classwork evaluations'
    ];
  }
}

function generateMaterials(subject: string, week: number): string[] {
  if (week === 7 || week === 13) {
    return [
      'Standardized Examination question papers',
      'OMR / ruled answer booklets',
      'Pens, pencils, mathematical instruments',
      'Teacher marking scheme & grading rubric'
    ];
  }
  return [
    `NERDC Approved ${subject} Textbook for Nigerian Secondary Schools`,
    'Whiteboard, dry-erase markers, and instructional wall charts',
    'Real-life specimens, physical models, and local Nigerian realia',
    'EduPlan NG Interactive Digital Lesson Plan & Resource Worksheets'
  ];
}

function generateEvaluation(topic: string, week: number): string[] {
  if (week === 7) {
    return [
      'Continuous Assessment Test Paper (20 Multiple Choice Questions, 2 Essay Questions)',
      'Marking scheme verification and student script score recording'
    ];
  }
  if (week === 13) {
    return [
      'Terminal Examination Paper (60 Objective items + 5 Theory questions)',
      'Cumulative term score calculation (30% Continuous Assessment + 70% Terminal Exam)'
    ];
  }
  return [
    `State three key characteristics or principles of ${topic.split(':')[0]}`,
    `Solve a standard exercise demonstrating application of today's lesson`,
    `Explain how this concept applies in daily Nigerian home, school, or community life`
  ];
}

const outDir = path.resolve('data/curriculum');
fs.mkdirSync(outDir, { recursive: true });

levelsDef.forEach((level) => {
  const isJunior = level.category === 'junior';
  const templates = isJunior ? jssSubjectTemplates : sssSubjectTemplates;

  const fullData: CurriculumData = {
    levelId: level.id,
    levelName: level.name,
    category: level.category,
    code: level.code,
    description: level.desc,
    sortOrder: level.sortOrder,
    subjects: templates.map((sub, sIdx) => {
      const subjectId = `${level.id}-${sub.code.toLowerCase()}`;
      return {
        id: subjectId,
        name: sub.name,
        code: sub.code,
        description: sub.description,
        icon: sub.icon,
        terms: sub.termThemes.map((tt) => {
          return {
            term: tt.term,
            name: `${tt.term === 1 ? '1st' : tt.term === 2 ? '2nd' : '3rd'} Term — ${tt.theme}`,
            weeks: tt.topics.map((top, idx) => {
              const weekNum = idx + 1;
              return {
                week: weekNum,
                topic: top,
                subtopics: [
                  `Introduction and conceptual definitions for Week ${weekNum}`,
                  `In-depth exploration and contextual applications`,
                  `Formative practice drills and examination preparation`
                ],
                objectives: generateObjectives(top, weekNum),
                teacherActivities: generateActivities(top, true, weekNum),
                studentActivities: generateActivities(top, false, weekNum),
                materials: generateMaterials(sub.name, weekNum),
                evaluation: generateEvaluation(top, weekNum)
              };
            })
          };
        })
      };
    })
  };

  const filename = `${level.id.replace('-', '')}.json`;
  const filePath = path.join(outDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(fullData, null, 2), 'utf-8');
  console.log(`Generated full NERDC curriculum dataset: ${filePath}`);
});

console.log('Successfully generated all 6 curriculum datasets for JSS 1-3 & SSS 1-3!');
