/**
 * NERDC Approved Statutory Core & Departmental Curriculum Subjects
 * Covering Junior Secondary School (JSS 1–3) and Senior Secondary School (SSS 1–3)
 * Fully compliant with Federal Ministry of Education & Lagos State OEQA standards.
 */

export interface SubjectMetadata {
  id: string;
  name: string;
  code: string;
  category: 'junior' | 'senior';
  department: 'Core' | 'Science & Math' | 'Commercial' | 'Humanities & Arts' | 'Vocational & Tech';
  icon: string;
  description: string;
  defaultTopics: string[];
}

export const JUNIOR_SECONDARY_SUBJECTS: SubjectMetadata[] = [
  {
    id: 'mth',
    name: 'Mathematics',
    code: 'MTH',
    category: 'junior',
    department: 'Core',
    icon: 'Calculator',
    description: 'Number and numeration, basic algebra, geometry, mensuration, everyday statistics and commercial arithmetic.',
    defaultTopics: [
      'Whole Numbers: Counting, Notation and Place Value in Base 10',
      'Prime Numbers, Factors, Multiples, LCM and HCF',
      'Fractions: Proper, Improper, Mixed and Equivalent Fractions',
      'Operations on Fractions: Addition, Subtraction, Multiplication and Division',
      'Decimals and Percentages: Conversions and Everyday Market Arithmetic',
      'Approximation and Estimation: Significant figures and decimal places',
      'Mid-Term Continuous Assessment & Intervention Drill',
      'Introduction to Algebra: Symbols, Variables and Open Sentences',
      'Simplification of Algebraic Expressions and Collecting Like Terms',
      'Simple Linear Equations in One Unknown Variable',
      'Word Problems Leading to Simple Linear Equations',
      'Comprehensive Termly Revision & Mock Examination Clinic',
      'Terminal Examination, Script Moderation and Broadsheet Entry'
    ]
  },
  {
    id: 'eng',
    name: 'English Studies',
    code: 'ENG',
    category: 'junior',
    department: 'Core',
    icon: 'BookOpen',
    description: 'Grammar, vocabulary development, reading comprehension, continuous writing, and oral speech sounds.',
    defaultTopics: [
      'Parts of Speech: Nouns (types, functions, and pluralization rules)',
      'Pronouns: Personal, possessive, relative pronouns, and agreement rules',
      'Verbs: Action verbs, auxiliary verbs, and concord agreement',
      'Adjectives and Adverbs: Identification, comparison, and usage',
      'Reading Comprehension: Skimming, scanning, and vocabulary in context',
      'Descriptive Essay: "My School / My Community Market"',
      'Mid-Term Assessment & Speech Sound Diagnostic Check',
      'Speech Work: Monophthongs, long and short vowel contrasts',
      'Prepositions and Conjunctions in Complex Sentences',
      'Informal Letter Writing: Letter to a friend describing holiday experiences',
      'Literature-in-English: Folktales, proverbs, and dramatic role-play',
      'Comprehensive Revision on Grammar, Speech Work and Composition',
      'Terminal Examination and Oral Speech Evaluation'
    ]
  },
  {
    id: 'bsc',
    name: 'Basic Science',
    code: 'BSC',
    category: 'junior',
    department: 'Core',
    icon: 'Atom',
    description: 'Living and non-living things, matter, energy, reproductive health, environmental conservation, and scientific inquiry.',
    defaultTopics: [
      'Meaning and Branches of Science: Scientific method of investigation',
      'Living and Non-Living Things: Characteristics and classification',
      'Characteristics of Plants and Animals: Nutrition, respiration, and locomotion',
      'Human Growth and Development: Pubertal changes and reproductive health',
      'Environmental Pollution: Air, water, soil causes, effects, and prevention',
      'Safety in the Science Laboratory: Hazard symbols and first aid treatment',
      'Mid-Term Assessment & Practical Lab Safety Drill',
      'Matter: Kinetic theory, physical states (solid, liquid, gas)',
      'Physical and Chemical Changes: Reversible vs irreversible reactions',
      'Energy: Forms of energy, conservation principle, and renewable energy in Nigeria',
      'Simple Chemical Combinations: Elements, compounds, and mixtures',
      'Comprehensive Termly Science Revision and Exhibition',
      'Terminal Practical and Theory Examination'
    ]
  },
  {
    id: 'btech',
    name: 'Basic Technology',
    code: 'BTECH',
    category: 'junior',
    department: 'Vocational & Tech',
    icon: 'Wrench',
    description: 'Technical drawing, workshop safety, woodwork, metalwork hand tools, plastics, ceramics, and building materials.',
    defaultTopics: [
      'Concept of Technology: Importance to national industrial development',
      'Workshop Safety: Safety rules, fire fighting equipment, and protective gear',
      'Workshop Hand Tools: Measuring and marking out tools (try square, calipers, rules)',
      'Woodwork Cutting and Holding Tools: Saws, chisels, planes, and bench vice',
      'Metalwork Hand Tools: Hacksaws, files, punches, and cold chisels',
      'Properties of Materials: Wood, metals, plastics, ceramics, and rubber',
      'Mid-Term Continuous Assessment & Workshop Fabrication Check',
      'Introduction to Technical Drawing: Drawing board, T-square, and set-squares',
      'Board Practice: Title block, lettering, and border lines',
      'Geometric Construction: Bisecting lines and constructing 30°, 60°, 90° angles',
      'Simple Machines: Levers, pulleys, inclined planes, and mechanical advantage',
      'Termly Practical Project Exhibition & Safety Review',
      'Terminal Examination & Practical Model Assessment'
    ]
  },
  {
    id: 'cve',
    name: 'Civic Education',
    code: 'CVE',
    category: 'junior',
    department: 'Core',
    icon: 'Shield',
    description: 'National values, citizenship, Nigerian Constitution, rights, duties, democracy, and community leadership.',
    defaultTopics: [
      'Meaning and Need for Civic Education in a Democratic Nigeria',
      'National Values: Honesty, integrity, contentment, and transparency',
      'Discipline: Attributes of a disciplined citizen and societal effects of indiscipline',
      'Courage: Moral and physical courage, defending the truth in Nigeria',
      'National Symbols: Flag, Coat of Arms, Pledge, National Anthem, and Passports',
      'The Nigerian Constitution: Meaning, historical origins, and supremacy',
      'Mid-Term Assessment & Civic Debate Presentations',
      'Citizenship: Methods of acquiring Nigerian citizenship (birth, registration, naturalization)',
      'Fundamental Human Rights: Chapter IV of the Nigerian Constitution',
      'Obligations of Nigerian Citizens: Tax payment, voting, and law obedience',
      'Democratic Governance: Pillars of democracy and arms of government',
      'Comprehensive Civic Education Revision & Legal Rights Clinic',
      'Terminal Examination and Broadsheet Entry'
    ]
  },
  {
    id: 'sos',
    name: 'Social Studies',
    code: 'SOS',
    category: 'junior',
    department: 'Core',
    icon: 'Globe',
    description: 'Family life, social issues, cultural heritage, social change, leadership, and national development.',
    defaultTopics: [
      'Meaning and Scope of Social Studies: Physical and social environment',
      'The Family: Types of family (nuclear, extended) and roles of family members',
      'Culture and Identity: Material and non-material culture of Nigerian ethnic groups',
      'Social Issues in Nigeria: Examination malpractice, cultism, and drug abuse',
      'Marriage and Courtship: Types of marriage (traditional, court, religious)',
      'Socialization: Agents of socialization (family, school, mass media, peer group)',
      'Mid-Term Continuous Assessment & Cultural Artifacts Display',
      'Common Crimes and Associated Punishments: EFCC, ICPC, and Police roles',
      'Safety and Disaster Management: Road safety rules and NEMA interventions',
      'Gender and Equity: Women empowerment, girl-child education in Nigeria',
      'Peace and Conflict Resolution: Traditional and modern dialogue mechanisms',
      'Comprehensive Social Studies Revision & Mock BECE Preparation',
      'Terminal Examination and Broadsheet Entry'
    ]
  },
  {
    id: 'agr',
    name: 'Agricultural Science',
    code: 'AGR',
    category: 'junior',
    department: 'Vocational & Tech',
    icon: 'Sprout',
    description: 'Crop production, animal husbandry, soil science, farm tools, agricultural economics, and extension.',
    defaultTopics: [
      'Meaning, Scope and Importance of Agriculture to the Nigerian Economy',
      'Forms of Agriculture: Subsistence vs commercial agriculture in Nigeria',
      'Classification of Crops: Food crops, cash crops, legumes, cereals, and tubers',
      'Parts of a Plant and Their Functions: Root, stem, leaf, flower, and fruit',
      'Simple Farm Tools: Cutlass, hoe, rake, wheelbarrow, and shovel maintenance',
      'Weeds and Weed Control: Common Nigerian farm weeds and cultural control',
      'Mid-Term Assessment & School Farm Field Observation',
      'Classification of Farm Animals: Ruminants, non-ruminants, and poultry',
      'Anatomy of Farm Animals: Digestive system of ruminants vs monogastrics',
      'Animal Feeds and Feeding: Concentrates, roughages, and balanced rations',
      'Pests and Diseases of Crops: Stem borers, armyworms, and prevention',
      'Comprehensive Revision & Farm Harvest Exhibition',
      'Terminal Examination and School Farm Assessment'
    ]
  },
  {
    id: 'bus',
    name: 'Business Studies',
    code: 'BUS',
    category: 'junior',
    department: 'Commercial',
    icon: 'Briefcase',
    description: 'Commerce, office practice, bookkeeping, keyboarding, marketing, business ethics, and consumer rights.',
    defaultTopics: [
      'Introduction to Business Studies: Meaning, objectives, and career opportunities',
      'The Office: Meaning, sections, layout (open-plan vs closed), and office personnel',
      'Office Equipment: Photocopiers, computers, filing cabinets, and paper shredders',
      'Introduction to Commerce: Production, trade (home and foreign), and aids to trade',
      'Aids to Trade: Banking, insurance, transportation, advertising, and warehousing',
      'Consumer Rights and Redress: FCCPC, SON, and NAFDAC mandates in Nigeria',
      'Mid-Term Continuous Assessment & Office Simulation Drill',
      'Introduction to Bookkeeping: Source documents (receipts, invoices, vouchers)',
      'The Cash Book: Single-column cash book and entering transactions in Naira',
      'Keyboarding: Home keys, sitting posture, and alphanumeric keyboard drill',
      'Business Ethics: Truthfulness in business, punctuality, and zero adulteration',
      'Comprehensive Business Studies Revision & Practical Cash Book Exercise',
      'Terminal Examination and Broadsheet Entry'
    ]
  },
  {
    id: 'phe',
    name: 'Physical and Health Education (PHE)',
    code: 'PHE',
    category: 'junior',
    department: 'Core',
    icon: 'Activity',
    description: 'Athletics, games, physical fitness, personal health, community sanitation, communicable diseases, and first aid.',
    defaultTopics: [
      'Meaning and Objectives of Physical and Health Education',
      'Athletics (Track Events): Sprint races (100m, 200m), relay races, and baton exchange',
      'Athletics (Field Events): Long jump, high jump techniques, and safety landing',
      'Ball Games (Football & Basketball): Basic skills, passing, dribbling, and rules',
      'Physical Fitness: Components of fitness (endurance, strength, agility, speed)',
      'Personal Hygiene: Care of teeth, eyes, skin, hair, and clothing in tropical climates',
      'Mid-Term Assessment & Track Field Practical Trials',
      'Nutrition and Food Nutrients: Carbohydrates, proteins, vitamins, and balanced diet',
      'Communicable Diseases: Malaria, cholera, tuberculosis transmission and prevention',
      'First Aid and Safety: Treating sprains, dislocations, cuts, and CPR basics',
      'Drug Abuse in Sports: Doping, steroids, health risks, and WADA sanctions',
      'Comprehensive Physical & Health Education Revision and Mini-Olympics',
      'Terminal Practical and Theory Examination'
    ]
  },
  {
    id: 'crs',
    name: 'Christian Religious Studies (CRS)',
    code: 'CRS',
    category: 'junior',
    department: 'Humanities & Arts',
    icon: 'Book',
    description: 'Biblical narratives, life of Jesus Christ, moral ethics, Christian discipleship, and peaceful coexistence.',
    defaultTopics: [
      'Sovereignty of God: Creation account in Genesis and stewardship of nature',
      'God Cares for His People: Provision of manna and water in the wilderness',
      'Parental Responsibility: The family of Eli and Samuel compared',
      'Obedience to God: The call of Abraham, his obedience, and blessings',
      'Call to Service: Moses at the burning bush and the liberation of Israel',
      'Moral Decadence: Greed, bribery, and the story of Gehazi',
      'Mid-Term Assessment & Biblical Memory Verses Recitation',
      'The Birth of Jesus Christ: Prophecies, Annunciation, and Nativity',
      'Baptism and Temptation of Jesus: Lessons for Nigerian youth',
      'The Ministry of Jesus: Miracles (healing of the blind, feeding 5,000)',
      'The Parables of Jesus: The Good Samaritan, Sower, Prodigal Son',
      'Comprehensive CRS Revision & Moral Reflection Essay',
      'Terminal Examination and Script Grading'
    ]
  },
  {
    id: 'irs',
    name: 'Islamic Religious Studies (IRS)',
    code: 'IRS',
    category: 'junior',
    department: 'Humanities & Arts',
    icon: 'Moon',
    description: 'Quranic recitation, Hadith, pillars of Islam, Tawheed, Sirah of the Prophet, and Islamic moral jurisprudence.',
    defaultTopics: [
      'Revelation of the Holy Quran: Surah Al-Alaq and the night of decree (Laylatul Qadr)',
      'Recitation and Meaning of Surah Al-Fatihah and Al-Ikhlas with Tajweed',
      'Pillars of Islam (Arkanul Islam): Shahadah, Salah, Zakah, Sawm, and Hajj',
      'Tawheed: The Oneness of Allah and prohibition of Shirk (idolatry)',
      'Taharah (Purification): Types of water, Wudu (ablution), and Ghusl steps',
      'Salah: Conditions, pillars, and performing the five daily obligatory prayers',
      'Mid-Term Assessment & Quranic Recitation Drill',
      'Hadith Studies: The 40 Hadiths of An-Nawawi (Hadith 1: Actions by Intentions)',
      'Sirah: Early life of Prophet Muhammad (SAW) in Makkah and his honesty (Al-Amin)',
      'Islamic Moral Values: Honesty, truthfulness, kindness to neighbors and parents',
      'Prohibitions in Islam: Gambling, usury (Riba), intoxicants, and fraud',
      'Comprehensive Islamic Religious Studies Revision',
      'Terminal Examination and Broadsheet Entry'
    ]
  },
  {
    id: 'cca',
    name: 'Cultural and Creative Arts (CCA)',
    code: 'CCA',
    category: 'junior',
    department: 'Humanities & Arts',
    icon: 'Palette',
    description: 'Visual arts, drama, dance, music, drawing, painting, craftwork, and Nigerian cultural heritage.',
    defaultTopics: [
      'Introduction to Cultural and Creative Arts: Visual arts, performing arts, and crafts',
      'Elements of Design: Line, color, shape, form, texture, space, and value',
      'Principles of Design: Balance, contrast, emphasis, movement, pattern, and unity',
      'Drawing: Still life drawing of everyday domestic objects using pencil shading',
      'Color Theory: Primary, secondary, tertiary colors, and color wheel mixing',
      'Nigerian Traditional Crafts: Pottery, calabash carving, and weaving (Adire, Aso-Oke)',
      'Mid-Term Assessment & Art Exhibition Studio Session',
      'Introduction to Music: Definition, musical notes, staff notation, and clefs',
      'Nigerian Traditional Musical Instruments: Talking drum, kakaki, udu, and algaita',
      'Drama and Theatre: Playwriting, costumes, stage makeup, and acting skills',
      'Dance and Choreography: Traditional Nigerian festive and ceremonial dances',
      'Comprehensive Creative Arts Revision & Practical Exhibition',
      'Terminal Examination and Art Portfolio Assessment'
    ]
  },
  {
    id: 'hec',
    name: 'Home Economics',
    code: 'HEC',
    category: 'junior',
    department: 'Vocational & Tech',
    icon: 'Utensils',
    description: 'Food and nutrition, clothing and textiles, home management, family living, and consumer education.',
    defaultTopics: [
      'Meaning and Scope of Home Economics: Career opportunities in home management',
      'The Human Body and Grooming: Care of the hands, feet, teeth, and skin',
      'Puberty and Adolescence: Changes in adolescent boys and girls, personal hygiene',
      'Sewing Tools and Equipment: Measuring, cutting, sewing tools, and machine care',
      'Basic Sewing Stitches: Temporary stitches (basting) and permanent stitches (running, backstitch)',
      'Food and Nutrition: Classes of food, functions, deficiency diseases in Nigeria (Kwashiorkor, Rickets)',
      'Mid-Term Assessment & Kitchen Safety Demonstration',
      'Cooking Methods: Boiling, frying, stewing, baking, and steaming local Nigerian dishes',
      'Care of Kitchen Equipment: Pots, gas burners, refrigerators, and sanitary storage',
      'The Family House: Rooms in a house, cleaning methods, and waste disposal',
      'Consumer Education: Wise spending, shopping lists, and avoiding impulse buying',
      'Comprehensive Home Economics Revision & Food Preparation Practical',
      'Terminal Practical and Theory Examination'
    ]
  },
  {
    id: 'cmp',
    name: 'Computer Studies (ICT)',
    code: 'CMP',
    category: 'junior',
    department: 'Core',
    icon: 'Laptop',
    description: 'Computer fundamentals, hardware, software, word processing, internet, cyber safety, and digital literacy.',
    defaultTopics: [
      'History of Computers: Early computing devices (abacus, slide rule, Napier’s bones, Pascaline)',
      'Generations of Computers: 1st to 5th generation technologies (valves, transistors, ICs, microprocessors)',
      'Basic Computer Concepts: Hardware, software, input, output, and storage media',
      'Input Devices: Keyboard, mouse, barcode scanner, microphone, and digital camera',
      'Output Devices: Monitors (CRT, LCD), printers (laser, inkjet, dot-matrix), and speakers',
      'System Unit & Storage: Motherboard, CPU, RAM, ROM, hard drives, and flash drives',
      'Mid-Term Assessment & Hands-On Computer Lab Practical',
      'System Software: Operating systems (Windows, Linux, macOS) and utility programs',
      'Application Software: Word processors, spreadsheets, graphics packages, and games',
      'Introduction to Word Processing: Creating, formatting, saving, and printing documents',
      'The Internet: World Wide Web, web browsers, search engines, and email communication',
      'Cyber Safety and Ethics: Password protection, avoiding scams, and copyright laws',
      'Terminal Computer Practical and Theory Examination'
    ]
  },
  {
    id: 'yor',
    name: 'Èdè Yorùbá',
    code: 'YOR',
    category: 'junior',
    department: 'Humanities & Arts',
    icon: 'Languages',
    description: 'Ètò oró èdè, ìsọ̀rọ̀gbà, àkọtọ́ òde-òní, àṣà àti ìṣe Yorùbá, lítíréṣọ̀ àti àkọsílẹ̀.',
    defaultTopics: [
      'Àbùdá Èdè Yorùbá: Àkọtọ́ mọ́kàndínlọ́gbọ̀n àti àwọn fáwẹ́lì (àránmú àti àìránmú)',
      'Àwọn Kọ́ńsónáǹtì Èdè Yorùbá àti bí a ṣe ń pè wọ́n pẹ̀lú ẹ̀yà ara ìfọ̀',
      'Àmì Ohùn Èdè Yorùbá: Do, Re, Mi àti bí ó ṣe ń yí ìtumọ̀ ọ̀rọ̀ padà',
      'Ìsọ̀rí Ọ̀rọ̀: Ọ̀rọ̀-orúkọ àti oríṣiríṣi ọ̀rọ̀-orúkọ ní èdè Yorùbá',
      'Àṣà Ìkíni àti Ìbọ̀wọ̀ fún Àgbà ní Ilẹ̀ Yorùbá: Dọ̀bálẹ̀, kúnlẹ̀, àti oríṣiríṣi ìkíni',
      'Àkọsílẹ̀ Àròsọ: "Ilé-ẹ̀kọ́ Mi" tàbí "Ọjà Àdúgbò Wa"',
      'Ìgbéléwọ̀n Àárín Sáà àti Ìdánwò Àkọtọ́',
      'Lítíréṣọ̀ Yorùbá: Àwọn ewì alohùn (oríkì, ìjálá, ewì ọmọdé)',
      'Àwọn Ìtàn Àròsọ àti Àwọn Ẹ̀kọ́ Ìwà rere tí ó wà nínú wọn',
      'Òwe àti Àkànlò Èdè Yorùbá: Ìtumọ̀ àti ìlò wọn nínú ọ̀rọ̀ sísọ',
      'Àwọn Ohun Èlò Ìṣòwò àti Iṣẹ́ Ọwọ́ Ìbílẹ̀ ní Ilẹ̀ Yorùbá',
      'Àtúnyẹ̀wò Èdè, Àṣà àti Lítíréṣọ̀ Yorùbá',
      'Ìdánwò Ìparí Sáà àti Àkọsílẹ̀ Àbájáde'
    ]
  },
  {
    id: 'fre',
    name: 'French Language',
    code: 'FRE',
    category: 'junior',
    department: 'Humanities & Arts',
    icon: 'Languages',
    description: 'French phonetics, basic conversation, greetings, articles, verbs (avoir, être), numbers, and classroom dialogues.',
    defaultTopics: [
      'Les Salutations (Greetings): Bonjour, Bonsoir, Comment ça va ? and courteous replies',
      'L\'Alphabet Français et les Accents (é, è, ê, ç, à): Pronunciation and oral drills',
      'Se Présenter (Self Introduction): Je m\'appelle, J\'ai ... ans, Je suis Nigérian(e)',
      'Les Nombres (Numbers 1 to 50): Counting in French, age and classroom quantities',
      'Les Objets de la Classe (Classroom Objects): Un livre, un stylo, une table, le tableau',
      'Les Articles Définis et Indéfinis (le, la, l\', les, un, une, des)',
      'Contrôle Continu et Évaluation Orale de Mi-Semestre',
      'Le Verbe "Être" (To Be): Conjugation in present tense and descriptive sentences',
      'Le Verbe "Avoir" (To Have): Conjugation and expressing possession',
      'Les Jours de la Semaine et les Mois de l\'Année: Days, months, and timetable in French',
      'La Famille: Le père, la mère, le frère, la sœur, and describing family members',
      'Révision Générale de Grammaire et Dialogue Français',
      'Examen Terminal et Évaluation des Notes'
    ]
  }
];

export const SENIOR_SECONDARY_SUBJECTS: SubjectMetadata[] = [
  {
    id: 'gmth',
    name: 'General Mathematics',
    code: 'GMTH',
    category: 'senior',
    department: 'Core',
    icon: 'Calculator',
    description: 'Advanced algebra, logarithms, trigonometry, circle geometry, statistics, probability, and WAEC/NECO questions.',
    defaultTopics: [
      'Number Bases: Conversion between base 2, 8, 10, 16 and modular arithmetic',
      'Indices and Standard Form: Laws of indices, fractional powers, and scientific notation',
      'Logarithms: Standard form, mantissa, characteristic, and four-figure table calculations',
      'Simultaneous Linear and Quadratic Equations: Elimination, substitution, and matrix methods',
      'Quadratic Equations: Factorization, completing the square, and quadratic formula',
      'Approximation, Percentage Errors, and Arithmetic Progression (A.P.)',
      'Mid-Term Assessment & WAEC Past Question Speed Drill',
      'Geometric Progression (G.P.): nth term, sum to n terms, and sum to infinity',
      'Trigonometric Ratios: Sine, cosine, tangent for acute/obtuse angles, and elevations/depressions',
      'Mensuration of Solid Shapes: Surface area and volume of cones, pyramids, and spheres',
      'Circle Theorems: Angle subtended at center, angles in same segment, and cyclic quadrilaterals',
      'Comprehensive Termly Revision & Mock Examination Clinic',
      'Terminal Examination and WASSCE/NECO Score Entry'
    ]
  },
  {
    id: 'eng_sss',
    name: 'English Language',
    code: 'ENG',
    category: 'senior',
    department: 'Core',
    icon: 'BookOpen',
    description: 'Continuous writing (narrative, argumentative, expository), comprehension, summary writing, oral English (WASSCE Paper 3).',
    defaultTopics: [
      'Grammatical Structures: Noun clauses and adjectival clauses (functions and syntax)',
      'Verbs and Verbal Patterns: Finite, non-finite, gerunds, participles, and subjunctives',
      'Advanced Concord: Rules of proximity, accompaniment, quasi-concord, and collective nouns',
      'Lexis and Structure: Words associated with government, politics, law, and judiciary',
      'Summary Writing: Strategies for concise extraction of core points without extraneous details',
      'Argumentative Essay: "Democracy is the Best System of Government for Nigeria"',
      'Mid-Term Continuous Assessment & Essay Moderation Drill',
      'Oral English (WASSCE Paper 3): Consonant clusters, plosives, fricatives, and nasals',
      'Oral English: Vowel contrasts, diphthongs, triphthongs, and primary word stress',
      'Expository Composition: "Addressing Youth Unemployment in Post-Digital Nigeria"',
      'Idioms, Collocations, and Figures of Speech in Advanced Literature',
      'Comprehensive Termly Revision on Essay, Summary, and Oral English',
      'Terminal WASSCE/NECO Standard Examination'
    ]
  },
  {
    id: 'cve_sss',
    name: 'Civic Education',
    code: 'CVE',
    category: 'senior',
    department: 'Core',
    icon: 'Shield',
    description: 'Human rights, rule of law, constitutionalism, democratic institutions, anti-corruption agencies, and public service.',
    defaultTopics: [
      'Values Education: Meaning, types of values, and importance to national cohesion',
      'National Consciousness, National Integrity, and Building a Unified Nigeria',
      'Capitalist Democracy: Features, merits, and challenges in developing democracies',
      'Rule of Law: Principles, equality before the law, and limits to legal authority',
      'Fundamental Human Rights: Limitations to rights, state of emergency, and public safety',
      'Youth Empowerment: Roles of government and civil society in vocational development',
      'Mid-Term Assessment & National Policy Colloquium',
      'Responsible Parenthood: Roles of parents, child spacing, and eradicating street hawking',
      'Traffic Regulations: Causes of road crashes, FRSC guidelines, and highway codes',
      'Public Service in Nigeria: Structure, civil service characteristics, bureaucracy, and reforms',
      'Anti-Corruption Agencies: Mandates of EFCC, ICPC, and Code of Conduct Bureau',
      'Comprehensive Civic Education Revision & Mock WAEC Clinic',
      'Terminal Examination and Broadsheet Entry'
    ]
  },
  {
    id: 'bio',
    name: 'Biology',
    code: 'BIO',
    category: 'senior',
    department: 'Science & Math',
    icon: 'Dna',
    description: 'Cell biology, genetics, ecology, mammalian physiology, plant nutrition, homeostasis, and WAEC practicals.',
    defaultTopics: [
      'Recognizing Living Things: Organization of life (cell, tissue, organ, system, organism)',
      'The Microscope: Parts, magnification calculation, care, and slide preparation',
      'Cell Structure and Functions: Plant and animal cells compared under electron microscope',
      'Plant Nutrition: Photosynthesis (light and dark reactions), chloroplasts, and starch test',
      'Animal Nutrition: Balanced diet, mammalian teeth, digestive system, and enzyme kinetics',
      'Transport System in Plants: Xylem, phloem, transpiration stream, and root pressure',
      'Mid-Term Practical Assessment & Starch/Enzyme Laboratory Test',
      'Circulatory System in Mammals: Heart structure, blood vessels, composition and functions of blood',
      'Respiratory System: Gaseous exchange in lungs, gills, spiracles, and cellular respiration',
      'Excretory System: Mammalian kidney, nephron function, skin structure, and osmoregulation',
      'Ecology: Ecosystems, abiotic/biotic factors, energy flow, food chains and ecological succession',
      'Comprehensive Revision on Biology Theory, Microscopes and Practicals',
      'Terminal Examination & Laboratory Practical Examination'
    ]
  },
  {
    id: 'chm',
    name: 'Chemistry',
    code: 'CHM',
    category: 'senior',
    department: 'Science & Math',
    icon: 'FlaskConical',
    description: 'Atomic structure, periodic table, chemical bonding, stoichiometry, acids, bases, salts, and volumetric analysis.',
    defaultTopics: [
      'Introduction to Chemistry: Scientific method, branches, and career paths in chemical industries',
      'Nature of Matter: Particulate nature, kinetic theory, diffusion, osmosis, and Brownian motion',
      'Atomic Structure: Subatomic particles (protons, neutrons, electrons), isotopes, and mass number',
      'Electronic Configuration: Bohr’s model and spdf quantum notation up to element 30',
      'Periodic Table: Periods, groups, periodicity, atomic radius, and ionization energy trends',
      'Chemical Bonding: Electrovalent, covalent, coordinate, metallic, and hydrogen bonding',
      'Mid-Term Assessment & Volumetric Titration Practical Check',
      'Stoichiometry & Mole Concept: Avogadro’s number, molar mass, empirical and molecular formulas',
      'Chemical Equations: Balancing equations, state symbols, and stoichiometric calculations',
      'Acids, Bases, and Salts: Properties, Arrhenius/Brønsted definitions, pH scale, and indicators',
      'Volumetric Analysis (Titration): Acid-base titration calculations, standard solutions, and indicators',
      'Comprehensive Chemistry Revision & Laboratory Practical Exam Drill',
      'Terminal Examination and Laboratory Assessment'
    ]
  },
  {
    id: 'phy',
    name: 'Physics',
    code: 'PHY',
    category: 'senior',
    department: 'Science & Math',
    icon: 'Zap',
    description: 'Mechanics, kinematics, vectors, thermal physics, optics, electricity, magnetism, and WAEC practical experiments.',
    defaultTopics: [
      'Physical Quantities and Units: Fundamental and derived quantities, SI units, and dimensional analysis',
      'Position, Distance, and Displacement: Vector and scalar quantities, resultant vectors',
      'Speed, Velocity, and Acceleration: Uniform motion, ticker-timer analysis, and velocity-time graphs',
      'Equations of Uniformly Accelerated Motion: Derivation and graphical solutions',
      'Projectiles: Horizontal and angular projections, time of flight, maximum height, and range',
      'Newton’s Laws of Motion: Inertia, momentum, F = ma, impulse, and conservation of momentum',
      'Mid-Term Assessment & Optics/Mechanics Lab Drill',
      'Work, Energy, and Power: Work done by constant force, kinetic and potential energy, machines',
      'Heat Energy & Temperature: Thermometers (mercury, resistance), temperature scales (Celsius, Kelvin)',
      'Thermal Expansion in Solids, Liquids, and Gases: Linear, superficial, and cubical expansivity',
      'Heat Transfer: Conduction, convection, radiation, and thermos flask vacuum design',
      'Comprehensive Physics Revision & Experimental Measurement Practicals',
      'Terminal Examination and Laboratory Practical Assessment'
    ]
  },
  {
    id: 'fmth',
    name: 'Further Mathematics',
    code: 'FMTH',
    category: 'senior',
    department: 'Science & Math',
    icon: 'Sigma',
    description: 'Indices, surds, matrices, determinants, calculus (differentiation & integration), vectors in 3D, and mechanics.',
    defaultTopics: [
      'Surds and Operations: Simplification, rationalization of binomial denominators, and conjugate surds',
      'Binary Operations: Closure, commutativity, associativity, identity element, and inverse element',
      'Indices, Logarithms and Polynomials: Remainder theorem and factor theorem for cubic expressions',
      'Inequalities: Linear and quadratic inequalities in one and two variables, region shading',
      'Matrices and Determinants: 2x2 and 3x3 matrices, inverse matrices, and Cramer\'s rule',
      'Trigonometric Functions: Compound angles, double angles, and trigonometric identities',
      'Mid-Term Assessment & Advanced Proofs Clinic',
      'Coordinate Geometry: Distance formula, mid-point, gradient, and equations of straight lines',
      'Vectors in Two and Three Dimensions: Scalar (dot) product and cross product of vectors',
      'Calculus (Differentiation): Limits, first principles, power rule, product, quotient, and chain rules',
      'Applications of Differentiation: Tangents, normals, maximum and minimum points, velocity and acceleration',
      'Comprehensive Further Mathematics Revision & Mock WAEC Drill',
      'Terminal Examination and Broadsheet Entry'
    ]
  },
  {
    id: 'eco',
    name: 'Economics',
    code: 'ECO',
    category: 'senior',
    department: 'Commercial',
    icon: 'TrendingUp',
    description: 'Microeconomics, demand, supply, market equilibrium, elasticity, production, financial institutions, and national income.',
    defaultTopics: [
      'Meaning and Methodology of Economics: Scarcity, choice, scale of preference, and opportunity cost',
      'Production: Meaning, factors of production (land, labor, capital, entrepreneur), and rewards',
      'Division of Labor and Specialization: Advantages, disadvantages, and limitations',
      'Theory of Demand: Law of demand, demand schedule, demand curves, and factors affecting demand',
      'Theory of Supply: Law of supply, supply schedule, supply curves, and factors affecting supply',
      'Market Equilibrium: Determination of equilibrium price and quantity, price ceiling and floor',
      'Mid-Term Assessment & Economic Graphs Interpretation Test',
      'Elasticity of Demand: Price, income, and cross elasticity of demand (calculations and graphs)',
      'Business Organizations: Sole proprietorship, partnerships, and limited liability companies in Nigeria',
      'Financial Institutions: Commercial banks, Central Bank of Nigeria (CBN), monetary policy instruments',
      'Inflation: Causes (demand-pull, cost-push), effects on the Nigerian economy, and control policies',
      'Comprehensive Economics Revision & WAEC Question Paper Analysis',
      'Terminal Examination and Broadsheet Entry'
    ]
  },
  {
    id: 'acc',
    name: 'Financial Accounting',
    code: 'ACC',
    category: 'senior',
    department: 'Commercial',
    icon: 'Receipt',
    description: 'Principles of accounting, ledger, double entry, trial balance, final accounts, bank reconciliation, and depreciation.',
    defaultTopics: [
      'Introduction to Financial Accounting: Historical development, users of accounting information, and ethics',
      'Accounting Concepts and Conventions: Entity, going concern, accrual, prudence, and consistency',
      'Double Entry System: Debit and credit rules for assets, liabilities, expenses, and revenue',
      'Books of Original Entry: Sales journal, purchases journal, returns outwards, and general journal',
      'The Cash Book: Two-column and three-column cash books, discount allowed and discount received',
      'The Ledger: Personal, real, and nominal accounts, posting and balancing ledger accounts',
      'Mid-Term Continuous Assessment & Accounting Ledger Exercise',
      'The Trial Balance: Purpose, preparation, and extraction from ledger balances',
      'Correction of Errors: Errors affecting and not affecting trial balance agreement (suspense account)',
      'Bank Reconciliation Statement: Causes of discrepancies between cash book and bank statement',
      'Final Accounts of a Sole Trader: Trading, profit and loss account, and balance sheet statement',
      'Comprehensive Financial Accounting Revision & Practical Ledger Audit',
      'Terminal Examination and Broadsheet Entry'
    ]
  },
  {
    id: 'gov',
    name: 'Government',
    code: 'GOV',
    category: 'senior',
    department: 'Humanities & Arts',
    icon: 'Landmark',
    description: 'Political theories, forms of government, constitutional development in Nigeria, political parties, and foreign policy.',
    defaultTopics: [
      'Concept of Government: Meaning, structure, and functions of government in society',
      'Basic Concepts: Power, authority, legitimacy, sovereignty, and political culture',
      'Forms of Government: Monarchy, aristocracy, oligarchy, dictatorship, and democracy',
      'Organs of Government: Legislature (unicameral/bicameral), Executive, and Judiciary',
      'Constitutionalism and Rule of Law: Protection of citizen rights and separation of powers',
      'Structures of Government: Unitary, federal, and confederal systems of government',
      'Mid-Term Assessment & Constitutional Law Colloquium',
      'Political Ideologies: Capitalism, socialism, communism, and mixed economy',
      'Pre-Colonial Administration in Nigeria: Hausa-Fulani, Yoruba (Oyo Empire), and Igbo societies',
      'Colonial Administration: Indirect rule system, merits, demerits, and British colonial policy',
      'Constitutional Development in Nigeria: Clifford (1922), Richards (1946), and Macpherson (1951)',
      'Comprehensive Government Revision & Mock WASSCE Paper Analysis',
      'Terminal Examination and Broadsheet Entry'
    ]
  },
  {
    id: 'lit',
    name: 'Literature-in-English',
    code: 'LIT',
    category: 'senior',
    department: 'Humanities & Arts',
    icon: 'Feather',
    description: 'African and non-African prose, drama, poetry, literary appreciation, figures of speech, and WAEC prescribed texts.',
    defaultTopics: [
      'Introduction to Literature: Functions, genres (prose, drama, poetry), and literary terms',
      'Literary Devices: Simile, metaphor, personification, hyperbole, oxymoron, irony, and symbolism',
      'African Prose: Plot overview, setting, themes, and character analysis of prescribed novel',
      'African Drama: Dramatic techniques, dramatic irony, soliloquy, and thematic exploration',
      'Non-African Drama: Shakespearean tragedy / modern drama conventions and characterization',
      'African Poetry: Rhythm, imagery, tone, mood, and analysis of selected WAEC poems',
      'Mid-Term Assessment & Literary Drama Recitation',
      'Non-African Poetry: Metrical patterns, rhyme scheme, stanzaic forms, and thematic analysis',
      'Character Study: Protagonists, antagonists, foil characters, and character motivations',
      'Unseen Prose and Poetry: Critical appreciation, identifying tone, style, and literary devices',
      'Essay Writing in Literature: Formulating arguments on character development and thematic conflict',
      'Comprehensive Literature-in-English Revision & Critical Text Seminars',
      'Terminal Examination and Essay Grading'
    ]
  },
  {
    id: 'geo',
    name: 'Geography',
    code: 'GEO',
    category: 'senior',
    department: 'Humanities & Arts',
    icon: 'Map',
    description: 'Physical geography, earth structure, weather, climate, map reading, Nigerian regional geography, and GIS.',
    defaultTopics: [
      'The Earth as a Planet: Shape, size, proof of earth’s sphericity, rotation, and revolution',
      'Structure of the Earth: Crust, mantle, core, lithosphere, hydrosphere, and atmosphere',
      'Rocks: Types of rocks (igneous, sedimentary, metamorphic), formation, and economic importance',
      'Major Landforms: Mountains, plateaus, plains, fold mountains, and rift valleys',
      'Weather and Climate: Difference between weather and climate, weather instruments (hygrometer, barometer)',
      'Atmospheric Moisture: Humidity, condensation, clouds, and types of rainfall (convectional, relief)',
      'Mid-Term Assessment & Topographic Map Reading Practical',
      'Map Work: Scales, conversion, grid references, measuring distance, and calculating bearings',
      'Contour Representation: Hills, valleys, spurs, cliffs, plateaus, and cross-section drawing',
      'Geography of Nigeria: Location, position, size, relief, drainage, and vegetation zones',
      'Mineral and Power Resources in Nigeria: Petroleum, coal, tin, gas, and hydro-electric power',
      'Comprehensive Geography Revision & Field Map Analysis',
      'Terminal Examination and Map Work Practical Assessment'
    ]
  },
  {
    id: 'com_sss',
    name: 'Commerce',
    code: 'COM',
    category: 'senior',
    department: 'Commercial',
    icon: 'ShoppingBag',
    description: 'E-commerce, wholesale and retail trade, foreign trade, warehousing, transportation, and customs clearance.',
    defaultTopics: [
      'Introduction to Commerce: Meaning, history, and development of commercial activities in Nigeria',
      'Production: Primary, secondary, and tertiary production, and factors determining volume',
      'Home Trade: Wholesale trade (functions, channels of distribution) and middleman elimination arguments',
      'Retail Trade: Small-scale retailing (hawking, kiosks) and large-scale retailing (supermarkets, chain stores)',
      'Modern Retailing: E-commerce, online marketplaces in Nigeria (Jumia, Konga), and mobile payments',
      'Documents Used in Home Trade: Letter of inquiry, quotation, invoice, credit note, and receipt',
      'Mid-Term Assessment & Business Trade Documentation Exercise',
      'Foreign Trade: Export, import, and entrepôt trade, balance of trade vs balance of payments',
      'Customs and Excise: Ports authority (NPA), customs duties, tariffs, and contraband prevention',
      'Warehousing: Types of warehouses (bonded, public, private) and importance to commodity stabilization',
      'Transportation: Road, rail, water, air, and pipeline transport in Nigerian commercial logistics',
      'Comprehensive Commerce Revision & Case Study Analysis',
      'Terminal Examination and Broadsheet Entry'
    ]
  },
  {
    id: 'dpr',
    name: 'Data Processing & ICT',
    code: 'DPR',
    category: 'senior',
    department: 'Science & Math',
    icon: 'Cpu',
    description: 'Data processing lifecycle, database management (SQL), spreadsheets, computer networks, and cybersecurity.',
    defaultTopics: [
      'Concept of Data and Information: Data processing cycle (collection, input, processing, output, storage)',
      'Stages of Data Processing: Manual, mechanical, and electronic data processing systems',
      'Database Management Systems (DBMS): Tables, records, fields, keys (primary and foreign)',
      'Relational Database Modeling: Creating tables, setting data types, and simple queries',
      'Spreadsheets (Microsoft Excel / Google Sheets): Cell references, arithmetic formulas, and functions',
      'Data Analysis with Spreadsheets: SUM, AVERAGE, IF condition, VLOOKUP, and charts',
      'Mid-Term Assessment & Spreadsheet Data Practical Check',
      'Computer Networks: LAN, WAN, MAN, network topologies (star, bus, ring), and networking devices',
      'Network Cables & Connectors: Twisted pair, coaxial, optical fiber, and RJ45 crimping',
      'The Internet & Cloud Computing: Protocols (HTTP, TCP/IP, FTP), cloud storage, and SaaS',
      'Cybersecurity and Data Protection: NDPR compliance, malware, ransomware, and digital forensics',
      'Comprehensive Data Processing Revision & SQL Lab Practical',
      'Terminal Practical and Theory Examination'
    ]
  },
  {
    id: 'td',
    name: 'Technical Drawing',
    code: 'TD',
    category: 'senior',
    department: 'Science & Math',
    icon: 'Compass',
    description: 'Engineering drawing, orthographic projection, isometric drawing, sections, architectural conventions, and CAD.',
    defaultTopics: [
      'Introduction to Technical Drawing: Drawing office practice, equipment, standards, and line types',
      'Geometrical Construction: Inscribing and circumscribing circles to triangles and polygons',
      'Tangency: Constructing tangents to circles, internal and external tangential arcs',
      'Conic Sections: Ellipse, parabola, hyperbola construction using focal and concentric circles methods',
      'Loci: Cycloids, involutes, and Archimedean spirals with engineering applications',
      'Isometric Drawing: Isometric projection of rectangular and shaped machine blocks',
      'Mid-Term Continuous Assessment & Studio Drafting Critique',
      'Orthographic Projection: First-angle and third-angle orthographic views of complex components',
      'Sectional Views: Full section, half section, revolved section, and cutting-plane conventions',
      'Development of Surfaces: Parallel-line and radial-line development of prisms, cylinders, and cones',
      'Building Drawing: Floor plans, foundation layout, wall section, doors, windows, and symbols',
      'Comprehensive Technical Drawing Revision & Portfolio Review',
      'Terminal Examination and Board Practical Assessment'
    ]
  },
  {
    id: 'agr_sss',
    name: 'Agricultural Science',
    code: 'AGR',
    category: 'senior',
    department: 'Science & Math',
    icon: 'Sprout',
    description: 'Soil science, crop anatomy, plant pathology, animal nutrition, genetics in farming, agricultural economics, and farm mechanization.',
    defaultTopics: [
      'Land and its Uses: Agricultural and non-agricultural uses of land, Land Use Act of 1978 in Nigeria',
      'Agricultural Ecology: Ecological zones of Nigeria and distribution of crops and livestock',
      'Rock Formation and Soil Development: Weathering processes (physical, chemical, biological)',
      'Soil Profile and Soil Types: Sandy, loamy, clayey soils, and soil texture determination',
      'Soil Fertility and Management: Organic manures, chemical fertilizers, soil acidity, and liming',
      'Plant Nutrients: Macro-nutrients (N, P, K, Ca, Mg, S) and micro-nutrients with deficiency symptoms',
      'Mid-Term Assessment & Soil Chemistry Laboratory Test',
      'Crop Anatomy & Husbandry: Cereal crops (maize, rice), tuber crops (yam, cassava), and cultivation steps',
      'Crop Improvement: Methods of crop improvement (introduction, selection, breeding/hybridization)',
      'Animal Nutrition: Digestion in ruminants vs non-ruminants, feed formulation, and ration balancing',
      'Farm Mechanization: Tractor and implements (plough, harrow, ridger), maintenance, and safety',
      'Comprehensive Agricultural Science Revision & Farm Practical Assessment',
      'Terminal Examination and Laboratory Practical Examination'
    ]
  },
  {
    id: 'crs_sss',
    name: 'Christian Religious Studies (CRS)',
    code: 'CRS',
    category: 'senior',
    department: 'Humanities & Arts',
    icon: 'Book',
    description: 'The Sovereignty of God, Leadership and Covenant, the Prophets, the Ministry of Christ, the Early Church, and Christian Social Ethics.',
    defaultTopics: [
      'The Sovereignty of God and Creation: God the creator and sustainer of the universe',
      'Leadership and Parental Responsibility: Eli and Samuel as case studies in moral guidance',
      'The Covenant with God: Abraham and the covenant renewal at Shechem',
      'The Call to Repentance and Justice: Message of Prophet Amos and Hosea',
      'Faith and Works in Daily Life: Teachings of Apostle James (James 2:14-26)',
      'Dignity of Labor and Civil Obedience: Biblical ethics in governance (Romans 13)',
      'Mid-Term Assessment & Biblical Textual Exegesis Clinic',
      'The Birth and Early Life of Jesus Christ: Prophecies, Annunciation, and Nativity',
      'The Ministry of Jesus: Beatitudes, Parables, and Compassionate Miracles',
      'The Passion, Death, and Resurrection of Jesus Christ: Theological significance for humanity',
      'The Early Church: Day of Pentecost, communal fellowship, and spread of the Gospel',
      'Comprehensive CRS Revision & WAEC Question Paper Analysis',
      'Terminal Examination, Script Moderation and Broadsheet Entry'
    ]
  },
  {
    id: 'irs_sss',
    name: 'Islamic Religious Studies (IRS)',
    code: 'IRS',
    category: 'senior',
    department: 'Humanities & Arts',
    icon: 'Moon',
    description: 'Quranic studies and exegesis, Hadith collections, Islamic jurisprudence (Fiqh), Sirah, and moral theology in contemporary society.',
    defaultTopics: [
      'Preservation and Compilation of the Holy Quran: Caliph Abu Bakr and Uthman (RA)',
      'Quranic Exegesis: Study and recitation of Suratul Hujurat and Suratul Mulk with Tajweed',
      'Hadith Studies: Sincerity in intentions (Hadith 1) and honesty in commercial transactions',
      'Tawheed (Islamic Monotheism): Attributes of Allah (Asma-ul Husna) and avoidance of Shirk',
      'Taharah (Spiritual and Physical Purification): Ghusl, Tayammum, and environmental sanitation',
      'Zakat and Sadaqah: Economic empowerment, social equity, and poverty eradication in Nigeria',
      'Mid-Term Assessment & Quranic Recitation Diagnostic Test',
      'Islamic Criminal Jurisprudence (Hudud): Preservation of life, property, and moral purity',
      'Family Law in Islam: Rights of spouses, Nikah, and inheritance (Mirath) shares',
      'History of Islam in West Africa: Spread of Islam in Kanem-Borno, Hausaland, and Yorubaland',
      'Islamic Moral Ethics: Prohibition of bribery (Rishwah), usury (Riba), and examination malpractice',
      'Comprehensive IRS Revision & WAEC Past Question Clinic',
      'Terminal Examination, Paper Moderation and Score Recording'
    ]
  },
  {
    id: 'mkt_sss',
    name: 'Marketing & Salesmanship',
    code: 'MKT',
    category: 'senior',
    department: 'Commercial',
    icon: 'ShoppingBag',
    description: 'Market research, consumer behavior, the 4 Ps marketing mix, salesmanship, e-commerce, and statutory consumer protection.',
    defaultTopics: [
      'Introduction to Marketing: Definition, marketing philosophy, and role in Nigerian economic growth',
      'Marketing Concepts: Production, product, selling, societal marketing, and customer value',
      'Consumer Markets vs Industrial Markets: Buying motives and decision-making processes',
      'The Marketing Mix: The 4 Ps (Product, Price, Place, Promotion) in local retail commerce',
      'Product Planning & Life Cycle: Ideation, branding, packaging, and stage-by-stage strategies',
      'Pricing Strategies: Cost-plus, skimming, penetration, and psychological pricing in Naira',
      'Mid-Term Assessment & Business Case Study Simulation',
      'Channels of Distribution: Wholesalers, retailers, distributors, and logistics management',
      'E-Commerce & Digital Marketing: Social media selling, mobile payments, and online storefronts in Nigeria',
      'Salesmanship: Attributes of an effective sales representative and negotiation tactics',
      'Consumer Protection & Legal Regulations: Mandates of FCCPC, SON, and NAFDAC',
      'Comprehensive Marketing Revision & Product Pitch Presentations',
      'Terminal Examination and Broadsheet Entry'
    ]
  },
  {
    id: 'his_sss',
    name: 'History & Heritage Studies',
    code: 'HIS',
    category: 'senior',
    department: 'Humanities & Arts',
    icon: 'Landmark',
    description: 'Historiography, Nigerian centers of ancient civilization, pre-colonial state systems, colonization, nationalism, and statehood.',
    defaultTopics: [
      'Meaning, Nature and Sources of Nigerian History: Oral tradition, archaeology, and written chronicles',
      'Centers of Ancient Civilization in Nigeria: Nok culture, Igbo-Ukwu, Ife, and Benin terracotta and bronzes',
      'Pre-Colonial State Systems: Kanem-Borno Empire and the Hausa States',
      'Forest Kingdoms and Coastal City-States: Oyo Empire, Benin Empire, and Niger Delta trading polities',
      'Trans-Saharan Trade: Trade routes, salt and gold commodities, and socio-cultural impacts on Northern Nigeria',
      'Trans-Atlantic Slave Trade: Origins, triangular trade network, abolition, and demographic disruption',
      'Mid-Term Assessment & Museum Artifacts Interpretation Drill',
      'Legitimate Commerce in the 19th Century: Palm oil, groundnuts, cocoa, and Christian missionary influence',
      'British Colonial Conquest: Royal Niger Company charter, military expeditions, and treaties of cession',
      'Amalgamation of Nigeria in 1914: Lord Lugard, colonial administrative structure, and indirect rule',
      'Nationalist Movements and the Struggle for Nigerian Independence: Macaulay, Azikiwe, Awolowo, and Bello',
      'Comprehensive History Revision & WAEC Essay Construction Seminar',
      'Terminal Examination and Broadsheet Entry'
    ]
  }
];

export const ALL_CURRICULUM_SUBJECTS = [
  ...JUNIOR_SECONDARY_SUBJECTS,
  ...SENIOR_SECONDARY_SUBJECTS
];

/**
 * Return 13 structured weekly topics for any subject, term (1, 2, or 3), and level.
 */
export function getSubjectTermTopics(subject: SubjectMetadata, term: number = 1, levelId: string = 'jss-1'): string[] {
  const isTerm1 = term === 1;
  const isTerm2 = term === 2;
  const isTerm3 = term === 3;
  const defaults = subject.defaultTopics;

  if (isTerm1 && defaults && defaults.length >= 12) {
    return defaults;
  }

  const subName = subject.name;
  if (isTerm2) {
    return [
      `${subName}: Intermediate Concepts, Quantitative Laws & Laboratory Inquiries`,
      `${subName}: Applied Procedures, Measurements & Analytical Modeling`,
      `${subName}: Systematic Structural Formations & Nigerian Case Studies`,
      `${subName}: Experimental Field Investigations & Domestic Realia`,
      `${subName}: Advanced Problem Solving, Formulas & Comparative Analysis`,
      `${subName}: Modern Technological & Commercial Adaptations in Nigeria`,
      'Mid-Term Continuous Assessment (CA Test 2) & Targeted Remedial Clinic',
      `${subName}: Sectoral Case Inquiries (Agriculture, Energy, Public Infrastructure)`,
      `${subName}: Formative Class Demonstrations, Data Analysis & Calculations`,
      `${subName}: Environmental, Economic & Societal Ramifications in West Africa`,
      `${subName}: Standard Examination Drill & Chief Examiner Misconception Review`,
      'Comprehensive 2nd Term Revision, WAEC/BECE Speed Drills & Question Clinic',
      'Terminal Examination, Script Moderation, Grading & Broadsheet Entry'
    ];
  }

  if (isTerm3) {
    return [
      `${subName}: Advanced Synthesis, Contemporary Innovations & Emerging Trends`,
      `${subName}: Cross-Disciplinary Linkages, ICT Integrations & Digital Modeling`,
      `${subName}: Practical Workshop & Laboratory Diagnostic Experiments`,
      `${subName}: National Industrial, Scientific & Economic Policy Frameworks`,
      `${subName}: Intensive Quantitative & Essay Technique Masterclass`,
      `${subName}: WAEC, NECO & BECE Chief Examiner Rubric & Mark Distribution`,
      'Mid-Term Continuous Assessment (CA Test 3) & Pre-Exam Diagnostic Review',
      `${subName}: Comprehensive Multi-Year Topical Synthesis & Speed Practice`,
      `${subName}: Specialized Practical Demonstrations & Portfolio Verification`,
      `${subName}: Final Formative Review of Key Statutory NERDC Competencies`,
      `${subName}: Mock Examination Clinic & Time Management Coaching`,
      'Full Annual Curriculum Revision, Formula Recitation & Examination Strategy',
      'Annual Promotion Examination, WAEC/BECE Readiness & Broadsheet Certification'
    ];
  }

  return defaults;
}

/**
 * Universal NERDC & OEQA compliant lesson plan & lesson note synthesizer.
 * Adheres strictly to the guidelines of the Office of Education Quality Assurance (OEQA)
 * and the Nigerian Educational Research and Development Council (NERDC).
 */
export function generateNerdcOeqaContent(params: {
  level: string;
  subject: string;
  topic?: string;
  week?: number;
  term?: number;
  language?: 'en' | 'yo' | 'ig' | 'ha';
}) {
  const { level, subject, topic, week = 1, term = 1, language = 'en' } = params;
  const isJunior = level.toLowerCase().startsWith('jss');
  const lvlName = level.toUpperCase();
  const subName = subject || (isJunior ? 'Mathematics' : 'General Mathematics');
  const safeTopic = topic?.trim() || `${subName} Curriculum Competency — Module ${week}`;

  if (language === 'yo') {
    return {
      objectives: [
        `Sọ ìtumọ̀ ${safeTopic} ní kedere pẹ̀lú ọ̀rọ̀ ara ẹni láìka ìwé (Bloom: Rántí & Lóye).`,
        `Dárúkọ àwọn àpẹẹrẹ mẹ́ta tí a ń rí ní àwùjọ wa ní Nàìjíríà (bíi ọjà, oko, tàbí ilé-iṣẹ́).`,
        `Yanjú àwọn ìbéèrè ìdánwò mẹ́ta lórí pátákó pẹ̀lú àṣeyọrí tó pé 80% (Bloom: Ṣe Iṣẹ́ & Ṣe Ìtúpalẹ̀).`
      ],
      materials: [
        `Ìwé ẹ̀kọ́ tí àjọ NERDC fọwọ́sí fún ${lvlName}`,
        'Pátákó dúdú, kọ́kì, àti àwòrán àkàwé tí a fi ọwọ́ yà',
        'Àwọn ohun àmúṣọrọ̀ gidi láti àyíká ilé-ìwé wa ní Nàìjíríà'
      ],
      previousKnowledge: 'Àwọn akẹ́kọ̀ọ́ ti ní ìmọ̀ ìpìlẹ̀ lórí kókó ẹ̀kọ́ tí a kọ́ ní ọ̀sẹ̀ tó kọjá.',
      introduction: `Olùkọ́ fi àpẹẹrẹ gidi láti àwùjọ Nàìjíríà ṣe ìfáàrà sí ${safeTopic} láti jí ìmọ̀ àwọn akẹ́kọ̀ọ́ jí.`,
      teacherActivity: 'Olùkọ́ kọ orúkọ kókó ẹ̀kọ́ sára pátákó, ṣàlàyé àwọn òfin pàtàkì, kí ó sì fi àpẹẹrẹ méjì hàn kedere.',
      studentActivity: 'Àwọn akẹ́kọ̀ọ́ tẹ́tí sílẹ̀, kọ àkọsílẹ̀ pátákó sínú ìwé wọn, kí wọ́n sì fọwọ́sowọ́pọ̀ yanjú ìbéèrè.',
      evaluation: 'Olùkọ́ bi akẹ́kọ̀ọ́ mẹ́ta ní ìbéèrè láti díwọ̀n bí wọ́n ṣe lóye ẹ̀kọ́ náà sí kí kíláàsì tó parí.',
      assignment: 'Ṣe àwọn ìbéèrè 1 dé 5 ní ojú-ewé tí ó tẹ̀lé e nínú ìwé ẹ̀kọ́ rẹ.',
      differentiatedInstruction: {
        struggling: 'Àwọn akẹ́kọ̀ọ́ tó nílò ìrànwọ́ yóò lo àwòrán àkàwé àti ìtọ́sọ́nà olùkọ́ ní kọ̀rọ̀.',
        onLevel: 'Àwọn akẹ́kọ̀ọ́ lórí ìwọ̀ntúnwọ̀nsì yóò ṣe àwọn àpẹẹrẹ tó wà nínú ìwé ẹ̀kọ́ láìsí ìrànwọ́.',
        advanced: 'Àwọn akẹ́kọ̀ọ́ tó tayọ yóò yanjú àwọn ìbéèrè tó nira síi pẹ̀lú àpẹẹrẹ iṣòwò Nàìjíríà.'
      },
      lessonNote: {
        subtopics: `1. Ìtumọ̀ ${safeTopic} ní Èdè Yorùbá\n2. Àwọn Àbùdá àti Òfin Pàtàkì\n3. Àpẹẹrẹ Lórí Pátákó fún Akẹ́kọ̀ọ́\n4. Àkọsílẹ̀ Pátákó àti Iṣẹ́ Ṣíṣe`,
        definitions: `${safeTopic} jẹ́ ẹ̀kọ́ pàtàkì nínú ètò ẹ̀kọ́ NERDC fún ${lvlName} ${subName}. Ó ń kọ́ akẹ́kọ̀ọ́ nípa bí a ṣe ń fi ìmọ̀ yìí ṣe iṣẹ́ nínú àwùjọ wa ní Nàìjíríà bíi ọjà, ilé, àti ilé-iṣẹ́.`,
        workedExamples: `Àpẹẹrẹ 1 (Lórí Pátákó):\nOlùkọ́ ṣe àlàyé ìgbésẹ̀ kọ̀ọ̀kan ní ṣísẹ̀-n-tẹ̀lé pẹ̀lú kókó tí a fún wa.\n\nÀpẹẹrẹ 2 (Àpẹẹrẹ Àwùjọ Nàìjíríà):\nOníṣòwò kan ní Ọjà Ọ̀yìngbò ní Èkó lo ìmọ̀ ${safeTopic} láti ṣe ìṣirò owó Naira àti Kobo tí ó wọlé fún un.`,
        blackboardSummary: `• Kókó 1: Rántí ìtumọ̀ pàtàkì ti ${safeTopic}.\n• Kókó 2: Má ṣe gbàgbé àwọn àpẹẹrẹ tí a ṣe lórí pátákó.\n• Kókó 3: Kọ gbogbo àkọsílẹ̀ yìí sínú ìwé rẹ kí kíláàsì tó parí.`,
        classDrill: `1. Sọ ìtumọ̀ ${safeTopic} ní ọ̀rọ̀ ara rẹ.\n2. Yanjú àwọn ìbéèrè méjì tí ó wà lórí pátákó kí o sì fi han olùkọ́.`
      }
    };
  }

  if (language === 'ig') {
    return {
      objectives: [
        `Kọwaa ihe ${safeTopic} pụtara nke ọma site n'okwu ọnụ ha (Bloom: Cheta & Ghọta).`,
        `Depụta ihe atụ atọ metụtara ndụ anyị na Nigeria (dịka n'ahịa Onitsha ma ọ bụ n'ugbo).`,
        `Zaa ajụjụ nyocha atọ e dere na bọọdụ n'enweghị enyemaka na 80% izi ezi.`
      ],
      materials: [
        `Akwụkwọ ọgụgụ NERDC kwadoro maka ${lvlName}`,
        'Bọọdụ ojii, nzu, na eserese nkọwa nwere agba',
        'Ihe e ji anya ahụ sitere na gburugburu obodo anyị'
      ],
      previousKnowledge: 'Ụmụ akwụkwọ echetala ihe ha mụtara na nkuzi gara aga.',
      introduction: `Onye nkuzi ji ihe atụ obodo anyị na Nigeria malite nkọwa gbasara ${safeTopic}.`,
      teacherActivity: 'Onye nkuzi kọwara isiokwu a nke ọma ma dee usoro dị mkpa na bọọdụ.',
      studentActivity: 'Ụmụ akwụkwọ deturu ihe dị mkpa n\'akwụkwọ ha ma zaa ajụjụ n\'otu n\'otu.',
      evaluation: 'Onye nkuzi jụrụ ajụjụ ọnụ iji hụ na onye ọ bụla ghọtara tupu a gbasasịa.',
      assignment: 'Zaa ajụjụ nke 1 ruo nke 5 dị n\'akwụkwọ ọgụgụ gị.',
      differentiatedInstruction: {
        struggling: 'Ụmụ akwụkwọ chọrọ enyemaka ga-eji ihe e ji anya ahụ na enyemaka onye nkuzi mụọ ihe.',
        onLevel: 'Ụmụ akwụkwọ nọ n\'ọkwa kwesịrị ga-aza ajụjụ ndị dị n\'akwụkwọ n\'onwe ha.',
        advanced: 'Ụmụ akwụkwọ nwere amamihe pụrụ iche ga-edozi nsogbu gbagwojuru anya.'
      },
      lessonNote: {
        subtopics: `1. Nkọwa nke ${safeTopic} n'Asụsụ Igbo\n2. Iwu na Usoro Ndị Dị Mkpa\n3. Ihe Nlereanya e Dere na Bọọdụ\n4. Ihe Odide Bọọdụ na Ọrụ Klas`,
        definitions: `${safeTopic} bụ isiokwu dị oke mkpa n'usoro ọmụmụ NERDC maka ${lvlName} ${subName}. Ọ na-akụziri ụmụ akwụkwọ ka ha ga-esi jiri nghọta a dozie nsogbu dị iche iche na ndụ anyị kwa ụbọchị na Naịjirịa.`,
        workedExamples: `Ihe Nlereanya 1 (Nkọwa Bọọdụ):\nOnye nkuzi na-akọwa usoro nke mbụ, nke abụọ na nke ikpeazụ iji nweta azịza ziri ezi.\n\nIhe Nlereanya 2 (Ndụ Anyị na Naịjirịa):\nOnye ahịa nọ n'Ahịa Ọnịcha jiri usoro ${safeTopic} gbakọọ ego Naira na Kobo batara n'ahịa ya.`,
        blackboardSummary: `• Isi nke 1: Buru nkọwa nke ${safeTopic} n'isi.\n• Isi nke 2: Cheta usoro na iwu niile e ji arụ ọrụ.\n• Isi nke 3: Detuo ihe niile a n'akwụkwọ gị tupu klaasị akwụsị.`,
        classDrill: `1. Kọwaa ${safeTopic} n'okwu ọnụ nke gị.\n2. Zaa ajụjụ abụọ dị na bọọdụ ma gosi onye nkuzi.`
      }
    };
  }

  if (language === 'ha') {
    return {
      objectives: [
        `Bayyana ma'anar ${safeTopic} daidai da kalaman kansu (Bloom: Tuna & Fahimta).`,
        `Kawo misalai aƙalla guda uku daga rayuwar yau da kullum a Najeriya (kamar kasuwar Kurmi a Kano).`,
        `Amsa tambayoyin gwaji guda uku da aka rubuta a allo da kashi 80% na ƙwazo.`
      ],
      materials: [
        `Littafin karatu da hukumar NERDC ta amince da shi don ${lvlName}`,
        'Allon rubutu, alli, da jadawalin zane',
        'Kayan gani da na zahiri daga muhallin makaranta a Najeriya'
      ],
      previousKnowledge: 'Ɗalibai sun tuna abubuwan da aka koya a satin da ya gabata.',
      introduction: `Malami ya yi amfani da labari ko misali daga al'ummar Najeriya don gabatar da ${safeTopic}.`,
      teacherActivity: 'Malami ya yi cikakken bayani a rubuce a kan allo tare da nuna misalai.',
      studentActivity: 'Ɗalibai sun rubuta bayanin allo a littattafansu kuma su amsa gwajin gajere.',
      evaluation: 'Malami ya yi tambayoyin gaggawa don tabbatar da an fahimta kafin tashi daga aji.',
      assignment: 'Amsa tambayoyi 1 zuwa 5 a littafin karatu.',
      differentiatedInstruction: {
        struggling: 'Ɗaliban da ke buƙatar tallafi za su yi amfani da kayan gani da tallafin malami.',
        onLevel: 'Ɗaliban matsakaicin matsayi za su yi ayyukan da ke littafin karatu da kansu.',
        advanced: 'Ɗalibai masu basira za su warware tambayoyi masu zurfi da suka shafi kasuwancin Najeriya.'
      },
      lessonNote: {
        subtopics: `1. Ma'anar ${safeTopic} a Harshen Hausa\n2. Ƙa'idoji da Dokokin Karatu\n3. Misalai da Ayyukan Allo don Koyi\n4. Bayanin Allo da Gwajin Ɗalibai`,
        definitions: `${safeTopic} muhimmin darasi ne a cikin manhajar karatu ta NERDC na ${lvlName} ${subName}. Yana koya wa ɗalibai dabarun warware matsaloli a rayuwar yau da kullum a Najeriya kamar kasuwanci da fasaha.`,
        workedExamples: `Misali na 1 (Bayanin Allo):\nMalami ya nuna mataki na 1, na 2 da na 3 don samun amsa madaidaiciya.\n\nMisali na 2 (Rayuwar Najeriya):\nƊan kasuwa a Kasuwar Kurmi da ke Kano ya yi amfani da dabarar ${safeTopic} wajen lissafin kuɗin Naira da Kobo da ya samu.`,
        blackboardSummary: `• Batu na 1: Haddace ma'anar ${safeTopic} sosai.\n• Batu na 2: Kula da ka'idojin lissafi da aka koya a yau.\n• Batu na 3: Kwafi wannan bayani a cikin littafin rubutunku kafin tashi daga aji.`,
        classDrill: `1. Bayyana ma'anar ${safeTopic} da kalaman kanka.\n2. Amsa tambayoyi 2 da ke kan allo ka nuna wa malami.`
      }
    };
  }

  // Default: Full English NERDC & OEQA Standard Lesson Plan & Chalkboard Note
  const isScienceOrTech = subName.toLowerCase().includes('science') ||
    subName.toLowerCase().includes('tech') ||
    subName.toLowerCase().includes('chem') ||
    subName.toLowerCase().includes('phys') ||
    subName.toLowerCase().includes('bio') ||
    subName.toLowerCase().includes('agr');

  const safetyRule = isScienceOrTech
    ? 'OEQA Safety Protocol: Ensure personal protective equipment (goggles, lab coats) is inspected. Check fire extinguisher pressure and verify zero food/drink in the laboratory/workshop.'
    : 'OEQA Classroom Protocol: Maintain clear gangways, inspect ventilation and ensure all learners sit with proper ergonomic posture.';

  return {
    objectives: [
      `Define and explain the core conceptual principles of ${safeTopic} in accordance with statutory NERDC specifications (Bloom: Remember & Understand).`,
      `Apply fundamental formulas, rules, and problem-solving methods to solve 5 structured exercises accurately (Bloom: Apply).`,
      `Analyze 3 localized Nigerian real-world commercial, scientific, or social applications (e.g. Balogun market trade, renewable energy, community governance) (Bloom: Analyze & Evaluate).`,
      `Demonstrate cognitive mastery by scoring at least 80% on the formative exit questions without teacher intervention.`
    ],
    materials: [
      `NERDC Approved Textbook for ${lvlName} ${subName}`,
      'Instructional Wall Charts, Whiteboard & Dry-Erase Geometric Markers',
      'Authentic Local Specimens, Physical Models & Nigerian Realia',
      'EduPlan NG Standardized Practice Worksheets & Broadsheet Records'
    ],
    previousKnowledge: `Learners possess working familiarity with prerequisite concepts taught in Week ${Math.max(1, week - 1)} and can recall foundational definitions in ${subName}.`,
    introduction: `Teacher engages learners with an interactive 5-minute set induction connecting ${safeTopic} to familiar daily Nigerian community experiences, triggering curiosity and exploratory questions.`,
    teacherActivity: `Step 1: Write date, subject, topic, and subtopics clearly on the chalkboard.\nStep 2: Define operational terms and break down foundational formulas step-by-step.\nStep 3: Work through 2 comprehensive demonstration problems on the board with active pupil questioning.\nStep 4: Supervise collaborative group problem-solving and provide immediate corrective feedback.\nStep 5: Review ${safetyRule}`,
    studentActivity: `Step 1: Copy structured chalkboard notes, formulas, and diagrams into subject notebooks.\nStep 2: Actively answer teacher's checking questions during demonstration.\nStep 3: Work in assigned desk pairs to solve 2 guided classroom drill exercises.\nStep 4: Present working on the chalkboard and complete individual exit-card evaluations.`,
    evaluation: `Administer 3 rapid formative questions and 1 comprehensive chalkboard drill problem to verify learner mastery before dismissing the class. Verify that at least 85% of pupils achieve correct working.`,
    assignment: `Complete Review Exercise questions 1 to 5 on page 24 of the recommended NERDC textbook in your homework notebooks for grading next lesson.`,
    differentiatedInstruction: {
      struggling: 'Tier 1 (Remedial Support): Provide scaffolded step-by-step formula templates, concrete manipulative aids, and assign an on-level peer buddy for guided practice.',
      onLevel: 'Tier 2 (Core Curriculum): Independent problem-solving using standard textbook exercises with self-monitoring checklist.',
      advanced: 'Tier 3 (Enrichment / Gifted): Higher-order multi-step word problems involving real-world Nigerian industrial, economic, or scientific case studies.'
    },
    safetyPrecautions: safetyRule,
    lessonNote: {
      subtopics: `1. Conceptual Definitions & Nomenclature of ${safeTopic}\n2. Core Laws, Rules & Standard NERDC Formulas\n3. Worked Classroom Demonstration Examples (with Nigerian Context)\n4. Blackboard Summary Takeaways & Pupil Class Drill`,
      definitions: `${safeTopic} is a cornerstone instructional unit within the approved NERDC ${lvlName} ${subName} curriculum. It establishes the theoretical and practical foundation necessary for continuous academic progression, classroom problem-solving, and external examination success in WAEC, NECO, and BECE.\n\nKey Concepts:\n• Definition: Systematic study, measurement, and application of fundamental ${subName} rules.\n• Standard Units & Symbols: Metric SI units, statutory symbols, and algebraic balance.\n• Importance: Equips Nigerian learners with analytical, scientific, and commercial numeracy tools applicable in daily commerce, technology, and governance.`,
      workedExamples: `Worked Example 1 (Chalkboard Demonstration):\nGiven standard problem parameters, apply the core operational formula:\nStep 1: Identify given variables and state the relevant statutory formula.\nStep 2: Substitute values with appropriate scientific or arithmetic units.\nStep 3: Compute final solution and cross-check dimensional consistency.\n\nWorked Example 2 (Real-World Nigerian Context):\nA commercial entrepreneur at Balogun Market, Lagos records inventory transactions for the week. Applying ${safeTopic} simplifies the reconciliation of stock value and prevents financial loss.`,
      blackboardSummary: `• Point 1: Always verify starting premises, formulas, and units (Naira, meters, kg, seconds) before computing answers.\n• Point 2: Write clear, sequential explanatory steps rather than lone numeric values.\n• Point 3: Copy all definitions, worked examples, and blackboard diagrams into your subject notebook before class ends.`,
      classDrill: `1. Define ${safeTopic} in your own words in exactly two sentences.\n2. Work through the 2 practice drill questions written on the chalkboard and have your desk partner verify your working.`
    }
  };
}
