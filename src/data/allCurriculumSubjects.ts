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
    id: 'igb',
    name: 'Asụsụ Igbo',
    code: 'IGB',
    category: 'junior',
    department: 'Humanities & Arts',
    icon: 'Languages',
    description: 'Ụdaasụsụ, usoro edemede (mkpụrụedemede 36), ụtọasụsụ, omenaala na agụmagụ Igbo nile.',
    defaultTopics: [
      'Mkpụrụedemede Igbo (Abidii Igbo): Ụdaume (Udaume 8) na Mgbochiume (28)',
      'Udaume na Mgbochiume: Ụdaume mfe na ụdaume arọ',
      'Akara Ụdaolu na Igbo: Ụdaelu, ụdandarị, na ụdaala na mmetụta ha na nkọwa okwu',
      'Nkejiasụsụ Igbo: Ụdị mkpọaha na ojiji ha',
      'Ekele na Nsọpụrụ n\'Ala Igbo: Ụzọ dị iche iche e si ekene n\'ụtụtụ, ehihie, na anyasị',
      'Edemede Nkọwa: "Ụlọakwụkwọ m" ma ọ bụ "Ahịa Obodo Anyị"',
      'Nlele Nnwale Nke Etiti Oge na Nchikota Akara',
      'Agụmagụ Ọdịnala: Akụkọ ifo, abụ ọdịnala, na ilu Igbo',
      'Omenaala na Ewumewu: Alụmdi na nwunye, ọmụmụ nwa, na ichi ọchịchị n\'ala Igbo',
      'Ilu na Akpaalaokwu Igbo: Nkọwa na otu e si eji ha na nkwurịta okwu',
      'Nka na Ọrụ aka ndị Igbo: Ịkpu ite, ịkpụ ụzụ, na ịkwa akwa',
      'Nchịkọta na Nlegharị Anya maka Ule Ọgwụgwụ Oge',
      'Ule Ọgwụgwụ Oge na Ndekọ Akara Broadsheet'
    ]
  },
  {
    id: 'hau',
    name: 'Harshen Hausa',
    code: 'HAU',
    category: 'junior',
    department: 'Humanities & Arts',
    icon: 'Languages',
    description: 'Bayanin sautin harshe, haruffan Hausa, ƙa\'idojin rubutu, al\'adu, adabin gargajiya da na zamani.',
    defaultTopics: [
      'Bayanin Haruffan Hausa: Baƙaƙe da wasula, haruffa masu tagwayen sauti',
      'Ƙa\'idojin Rubutun Hausa: Raba kalmomi, haɗa kalmomi, da amfani da alamomin rubutu',
      'Kayan Sautin Hausa: Ƙwarewar furuci, gajerun wasula da dogayen wasula',
      'Rabe-raben Kalmomi: Suna (suna na gama-gari da sunan kanka)',
      'Al\'adun Gaisuwa a Ƙasar Hausa: Gaisuwar safe, rana, da ta girmama manya',
      'Ƙagaggen Rubutu (Insha\'i): "Makaranta Ta" ko "Kasuwar Garinmu"',
      'Gwajin Tsakiyar Zango da Tantance Sakamako',
      'Adabin Gargajiya: Tatsuniyoyi, karin magana, da waƙoƙin baka',
      'Tsayayyun Al\'adu: Bukukuwan aure, haihuwa, da sana\'o\'in gargajiya a Arewa',
      'Karin Magana a Harshen Hausa: Ma\'ana da amfaninsu a zantuka',
      'Sana\'o\'in Gargajiya: Ƙira, jima, saƙa, da rini a ƙasar Hausa',
      'Bita Kan Dukkan Darussan Zango don Shirin Jarabawa',
      'Jarabawar Ƙarshen Zango da Rubuta Sakamako'
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

  const subLower = subject.name.toLowerCase();
  const subCode = subject.code.toLowerCase();

  // 1. Mathematics & Further Mathematics
  if (subLower.includes('math') || subCode.includes('mth')) {
    if (isTerm2) {
      return [
        'Algebraic Factors: Common Factors, Grouping & Difference of Two Squares',
        'Quadratic Equations: Solution by Factorization Method',
        'Simultaneous Linear Equations: Elimination and Substitution Methods',
        'Plane Geometry: Angles on a Straight Line, Parallel Lines & Triangles',
        'Polygons: Interior and Exterior Angles of Convex Polygons',
        'Mensuration: Perimeter and Area of Triangles, Parallelograms & Trapeziums',
        'Mid-Term Continuous Assessment (CA Test 2) & Diagnostic Drill',
        'Surface Area and Volume of Right Prisms and Cylinders',
        'Statistics: Data Presentation using Frequency Tables, Bar Charts & Histograms',
        'Measures of Central Tendency: Mean, Median and Mode of Ungrouped Data',
        'Probability: Experimental Outcomes, Sample Space and Single Events',
        'Termly Revision, WAEC/BECE Problem Clinic & Past Question Review',
        'Terminal Examination, Script Moderation, Grading & Broadsheet Entry'
      ];
    }
    if (isTerm3) {
      return [
        'Trigonometric Ratios: Sine, Cosine and Tangent of Acute Angles',
        'Angles of Elevation and Depression & Compass Bearings',
        'Indices and Logarithms: Laws of Indices & Four-Figure Log Tables',
        'Coordinate Geometry: Gradient and Intercept of Straight Line Graphs',
        'Commercial Arithmetic: Simple Interest, Compound Interest & Depreciation',
        'Sets and Venn Diagrams: Union, Intersection and Complement of Sets',
        'Mid-Term Continuous Assessment (CA Test 3) & Remedial Clinic',
        'Number Bases: Conversion between Base 2, Base 8 and Base 10',
        'Circle Theorems: Angles Subtended at Center and Inscribed Angles',
        'Geometric Construction: Constructing 30°, 60°, 90°, 75° & Line Bisectors',
        'Cumulative Frequency Curves (Ogive) and Median Estimation',
        'Full Annual Mathematics Revision & Speed Practice Clinic',
        'Annual Promotion Examination, WAEC/BECE Readiness & Broadsheet Entry'
      ];
    }
  }

  // 2. English Studies & English Language
  if (subLower.includes('eng') || subCode.includes('eng')) {
    if (isTerm2) {
      return [
        'Grammar: Tenses (Present Perfect, Past Continuous, Future Continuous)',
        'Formal Letter Writing: Applications, Official Complaints & Inquiries',
        'Speech Work: Diphthongs (/eɪ/, /aɪ/, /ɔɪ/, /aʊ/, /əʊ/) and Contrast Drills',
        'Expository Composition: "Effects of Environmental Degradation in Nigeria"',
        'Vocabulary Development: Words Associated with Health, Medicine & Sanitation',
        'Punctuation Marks: Colons, Semi-colons, and Inverted Commas in Dialogue',
        'Mid-Term Assessment & Oral Speech Sound Diagnostic Check',
        'Direct and Indirect Speech: Rules of Conversion and Reporting Verbs',
        'Reading Comprehension: Identifying Topic Sentences and Inferring Meanings',
        'Literature-in-English: African Poetry (Themes, Metaphor, Personification)',
        'Argumentative Essay: "Day Secondary Schools are Better than Boarding Schools"',
        'Comprehensive 2nd Term Revision on Grammar, Speech & Composition',
        'Terminal Examination, Oral Speech Testing & Broadsheet Entry'
      ];
    }
    if (isTerm3) {
      return [
        'Grammar: Active Voice versus Passive Voice Transformation',
        'Clauses: Independent, Adjectival and Adverbial Clauses of Time and Reason',
        'Speech Work: Consonant Clusters (pl, str, scr) and Syllabic Consonants',
        'Narrative Essay: "An Unforgettable Experience in My Secondary School"',
        'Vocabulary Development: Words Associated with Law, Justice & Public Governance',
        'Summary Writing Techniques: Separating Main Ideas from Supporting Details',
        'Mid-Term Continuous Assessment & Essay Writing Speed Clinic',
        'Idiomatic Expressions and Phrasal Verbs in Contemporary Nigerian English',
        'Literature-in-English: Dramatic Elements (Protagonist, Conflict, Soliloquy)',
        'Informal Letter: Writing to a Relative Abroad Describing Nigerian Festivals',
        'Question Tags, Modal Auxiliaries (must, should, ought) and Subject-Verb Concord',
        'Annual English Studies Revision & WAEC/BECE Paper 1 & 2 Clinic',
        'Annual Promotion Examination & Script Moderation'
      ];
    }
  }

  // 3. Basic Science & Biology
  if (subLower.includes('bio') || subLower.includes('basic science') || subCode.includes('bio') || subCode.includes('bsc')) {
    if (isTerm2) {
      return [
        'Circulatory System: Structure of Heart, Blood Vessels, Blood Groups & Rhesus Factor',
        'Respiratory System: Mechanism of Breathing, Gaseous Exchange & Cellular Respiration',
        'Excretory System in Humans: Kidneys, Nephron Structure, Skin & Osmoregulation',
        'Plant Nutrition: Internal Leaf Anatomy, Photosynthesis Light & Dark Stages',
        'Transportation in Vascular Plants: Transpiration Pull, Xylem & Phloem Translocation',
        'Ecology: Ecosystem Components, Food Chains, Food Webs & Trophic Energy Pyramids',
        'Mid-Term Continuous Assessment & Practical Slide Microscopy Drill',
        'Nutrient Cycles in Nature: The Carbon Cycle, Water Cycle & Nitrogen Cycle',
        'Genetics & Heredity: Mendel\'s Laws of Inheritance, Monohybrid Cross & Genotypes',
        'Variation in Living Organisms: Continuous vs Discontinuous Morphological Traits',
        'Evolutionary Adaptation: Lamarckism, Darwinian Natural Selection & Camouflage',
        'Comprehensive Termly Biology Revision & Practical Specimen Identification',
        'Terminal Examination, Practical Lab Assessment & Broadsheet Entry'
      ];
    }
    if (isTerm3) {
      return [
        'Digestive System: Alimentary Canal Anatomy, Chemical Digestion & Digestive Enzymes',
        'Skeletal System: Axial and Appendicular Skeleton, Joint Types & Locomotion',
        'Nervous System: Brain Anatomy, Spinal Cord, Neurons & Reflex Arc Action',
        'Sense Organs: Anatomy of the Mammalian Eye (Accommodation, Defects & Corrections)',
        'Sense Organs: Anatomy of the Ear (Hearing Mechanism, Balance & Eustachian Tube)',
        'Microorganisms & Health: Pathogenic Bacteria, Viruses, Protozoa & Immunization',
        'Mid-Term Continuous Assessment & Anatomical Drawing Practice',
        'Human Reproductive Health: Male & Female Reproductive Organs, Fertilization & Gestation',
        'Ecology of Populations: Succession, Overcrowding, Territoriality & Dispersal',
        'Soil Biology: Soil Organic Matter, Soil Horizon Monoliths & Microflora',
        'Pollution & Environmental Conservation: Oil Spills in Niger Delta, Afforestation',
        'Annual Science Revision, Specimen Mounting & WAEC/NECO Practical Clinic',
        'Annual Promotion Examination & Final Broadsheet Certification'
      ];
    }
  }

  // 4. Chemistry
  if (subLower.includes('chem') || subCode.includes('chm')) {
    if (isTerm2) {
      return [
        'Chemical Bonding: Electrovalent, Covalent, Dative and Metallic Bonding',
        'Stoichiometry & Mole Concept: Avogadro\'s Number, Molar Mass & Empirical Formula',
        'Gas Laws: Boyle\'s Law, Charles\'s Law, General Gas Equation & Dalton\'s Law',
        'Kinetic Theory of Matter: Ideal vs Real Gases and Graham\'s Law of Diffusion',
        'Acids, Bases and Salts: pH Scale, Universal Indicators & Neutralization',
        'Standard Solutions & Volumetric Analysis (Acid-Base Titration Calculations)',
        'Mid-Term Continuous Assessment & Volumetric Titration Laboratory Exam',
        'Water Chemistry: Soft vs Hard Water, Causes of Hardness & Removal Methods',
        'Periodic Chemistry: Trends in Atomic Radii, Ionization Energy & Electronegativity',
        'Redox Reactions: Oxidation Numbers, Half-Equations & Balancing Redox Systems',
        'Carbon & Its Allotropes: Diamond, Graphite, Coal & Industrial Uses',
        'Termly Revision & WAEC Qualitative/Quantitative Chemistry Masterclass',
        'Terminal Practical & Theory Examination'
      ];
    }
    if (isTerm3) {
      return [
        'Introduction to Organic Chemistry: Tetravalency of Carbon & Hybridization',
        'Hydrocarbons: Saturated Alkanes (Methane, Ethane) Preparation & Combustion',
        'Unsaturated Hydrocarbons: Alkenes and Alkynes (Addition Reactions & Polymerization)',
        'Alkanols (Ethanol Preparation by Fermentation) and Alkanoic Acids (Esterification)',
        'Rates of Chemical Reactions: Collision Theory, Temperature & Catalysts',
        'Chemical Equilibrium: Dynamic Equilibrium & Le Chatelier\'s Principle',
        'Mid-Term Continuous Assessment & Organic Nomenclature Speed Drill',
        'Thermochemistry: Exothermic vs Endothermic Reactions & Enthalpy of Neutralization',
        'Electrochemistry: Faraday\'s Laws of Electrolysis & Industrial Electroplating',
        'Industrial Extraction of Metals: Iron (Blast Furnace) & Aluminum (Bauxite Smelting)',
        'Environmental Chemistry: Atmospheric Acid Rain, Greenhouse Gases & Ozone Depletion',
        'Comprehensive Annual Chemistry Revision & Qualitative Salt Analysis (Cations/Anions)',
        'Annual Promotion Examination & Script Moderation'
      ];
    }
  }

  // 5. Physics
  if (subLower.includes('phys') || subCode.includes('phy')) {
    if (isTerm2) {
      return [
        'Work, Energy and Power: Calculations of Work Done, Kinetic & Potential Energy',
        'Thermal Energy: Heat versus Temperature, Thermometers & Calibration Scales',
        'Thermal Expansion: Linear, Superficial and Cubical Expansivity of Solids',
        'Heat Transfer: Conduction, Convection, Radiation & Vacuum Flask Applications',
        'Quantity of Heat: Specific Heat Capacity and Method of Mixtures Calculations',
        'Latent Heat: Specific Latent Heat of Fusion and Vaporization in Everyday Physics',
        'Mid-Term Assessment & Thermal Physics Laboratory Drill',
        'Reflection of Light: Laws of Reflection, Plane Mirrors & Concave/Convex Mirrors',
        'Refraction of Light: Snell\'s Law, Critical Angle & Total Internal Reflection',
        'Thin Lenses: Converging and Diverging Lenses, Ray Tracing & Lens Formula',
        'Optical Instruments: Astronomical Telescope, Compound Microscope & Human Eye',
        'Termly Revision & WAEC Practical Mechanics/Optics Clinic',
        'Terminal Examination, Physics Practical & Broadsheet Entry'
      ];
    }
    if (isTerm3) {
      return [
        'Waves & Sound: Production, Propagation, Speed of Sound, Echoes & Resonance',
        'Vibrations in Strings and Air Pipes: Harmonics, Overtones & Musical Instruments',
        'Current Electricity: Electric Charge, Potential Difference & Ohm\'s Law',
        'Electrical Circuits: Resistors in Series and Parallel, Internal Resistance & EMF',
        'Electrical Energy and Power: Kilowatt-hour Billing (PHCN/NEPA) & Fuse Rating',
        'Magnetic Fields: Field Patterns of Bar Magnets, Solenoids & Earth\'s Magnetism',
        'Mid-Term Assessment & Electricity Circuit Connection Laboratory Exam',
        'Electromagnetic Induction: Faraday\'s Laws, Lenz\'s Law & Transformers',
        'Gravitational Fields: Newton\'s Law of Universal Gravitation & Satellite Orbits',
        'Projectile Motion: Time of Flight, Maximum Height & Horizontal Range',
        'Simple Harmonic Motion (SHM): Period of Simple Pendulum & Helical Spring',
        'Nuclear Physics: Radioactivity (Alpha, Beta, Gamma Decay), Half-Life & Nuclear Energy',
        'Annual Promotion Examination & Broadsheet Certification'
      ];
    }
  }

  // 6. Basic Technology & Technical Drawing
  if (subLower.includes('tech') || subLower.includes('drawing') || subCode.includes('btech') || subCode.includes('td')) {
    if (isTerm2) {
      return [
        'First-Angle Orthographic Projection: Front Elevation, End View and Plan View',
        'Third-Angle Orthographic Projection: National Engineering Standards (BS 8888)',
        'Isometric Projection: 30° Isometric Axes, Box Construction & Isometric Circles',
        'Oblique Projection: Cavalier and Cabinet Oblique Drawing Conventions',
        'Woodwork Joints: Widening, Framing, Mortise and Tenon, Dovetail Joints',
        'Sheet Metal Hand Tools: Snips, Stakes, Hammers & Sheet Metal Development',
        'Mid-Term Assessment & Workshop Drafting Practical Test',
        'Fasteners: Screws, Bolts, Nuts, Studs, Keys & Locking Devices',
        'Mechanisms: Cams, Followers, Cranks, Belt Drives and Gear Train Ratios',
        'Soldering and Brazing: Fluxes, Soldering Iron & Plumbing Installations',
        'Building Drawing: Symbols, Floor Plans, Door and Window Schedules',
        'Termly Revision & Workshop Safety Protocol Audit',
        'Terminal Practical Examination & Model Exhibition'
      ];
    }
    if (isTerm3) {
      return [
        'Electrical Workshop: Circuit Schematics, Wiring Installations & Fuse Protection',
        'Electronic Components: Resistors, Capacitors, Diodes, Transistors & PCB Boards',
        'Fluid Power: Principles of Hydraulic and Pneumatic Systems & Brake Lines',
        'Building Construction: Foundation Types, Concrete Mix Ratios & Wall Bonding',
        'Roof Trusses: Timber and Steel Roof Structures, Drainage & Ceiling Battens',
        'Precision Measuring Tools: Vernier Calipers, Micrometer Screw Gauge & Dial Gauges',
        'Mid-Term Assessment & CAD Drafting Demonstration',
        'Introduction to Computer-Aided Drafting (CAD): Tools, Commands & Layers',
        'Sectional Views: Full Section, Half Section, Revolved & Removed Sections',
        'Technical Lettering and Dimensioning Standards for WAEC/NECO Examination',
        'Engineering Model Fabrication & Workshop Capstone Project',
        'Annual Technical Drawing Revision & Drafting Portfolio Moderation',
        'Annual Promotion Examination & Broadsheet Entry'
      ];
    }
  }

  // 7. Geography
  if (subLower.includes('geograph') || subCode.includes('geo')) {
    if (isTerm2) {
      return [
        'Map Reading: Cartographic Scales, Conventional Symbols & Four-Figure Grid References',
        'Contour Lines & Landforms: Valleys, Spurs, Knolls, Escarpments & Plateaus',
        'Cross-Section Profiling and Vertical Exaggeration Calculations',
        'The Solar System & Earth\'s Geometry: Rotation, Revolution, Equinoxes & Solstices',
        'The Earth\'s Crust: Structure, Classification of Igneous, Sedimentary & Metamorphic Rocks',
        'Volcanism and Earthquakes: Vulcanicity, Landforms of Intrusion/Extrusion & Ring of Fire',
        'Mid-Term Assessment & Cartographic Topographical Map Work Clinic',
        'Weather and Climate: Measurement with Rain Gauge, Thermometers, Barometer & Anemometer',
        'Climate Belts of Africa: Equatorial Rain, Tropical Wet/Dry Savanna, Mediterranean',
        'River Systems: River Erosion, Transportation & Deposition (V-Shaped Valleys, Oxbow Lakes)',
        'Action of Wind in Deserts: Deflation, Yardangs, Zeugens & Barchan Dunes',
        'Termly Geography Revision & WAEC Practical Mapwork Examination Clinic',
        'Terminal Examination & Broadsheet Entry'
      ];
    }
    if (isTerm3) {
      return [
        'Weathering Processes: Mechanical Exfoliation, Frost Shattering & Chemical Carbonation',
        'The Hydrological Cycle: Evaporation, Cloud Condensation, Runoff & Infiltration',
        'Drainage Basins of Nigeria: River Niger, Benue Basin & Lake Chad Inland Drainage',
        'Physical Relief Regions of Nigeria: North-Central Plateau, Coastal Lowlands, Eastern Highlands',
        'Vegetation Belts of Nigeria: Mangrove Swamp, Tropical Rainforest, Guinea & Sahel Savanna',
        'Soil Geography: Soil Formation, Soil Profiles (Horizons A, B, C) & Soil Erosion Control',
        'Mid-Term Assessment & Geographical Field Sketching Practice',
        'Minerals and Power Resources of Nigeria: Petroleum, Natural Gas, Coal, Limestone & Solar',
        'Population Geography: Spatial Distribution, Density, Rural-Urban Migration in Nigeria',
        'Transportation Networks & Economic Development in West Africa (Road, Rail, Ports)',
        'Environmental Hazards in Nigeria: Desertification in North, Coastal Erosion & Flooding in Lagos',
        'Geographic Information Systems (GIS): Remote Sensing & Satellite Imagery in Nigeria',
        'Annual Promotion Examination & Broadsheet Certification'
      ];
    }
  }

  // Fallback default: enrich with subject-aligned terms
  if (isTerm2) {
    return [
      `${subject.name}: Intermediate Theoretical Frameworks & Core Principles`,
      `${subject.name}: Applied Practical Methodologies & Measurement Standards`,
      `${subject.name}: Nigerian Case Studies, Institutional Context & Domestic Realia`,
      `${subject.name}: Step-by-Step Analytical Calculations & Conceptual Formulations`,
      `${subject.name}: Systematic Classification, Categories & Operational Rules`,
      `${subject.name}: Commercial, Technological & Cultural Adaptations in West Africa`,
      'Mid-Term Continuous Assessment (CA Test 2) & Targeted Remedial Clinic',
      `${subject.name}: Diagnostic Problem-Solving & Error Analysis Drills`,
      `${subject.name}: Collaborative Whiteboard Demonstrations & Practical Inquiries`,
      `${subject.name}: Regulatory Policies, Statutory Standards & Socio-Economic Impact`,
      `${subject.name}: WAEC/BECE Standard Examination Practice & Marking Scheme Review`,
      'Comprehensive 2nd Term Curriculum Revision & Examination Masterclass',
      'Terminal Examination, Script Moderation, Grading & Broadsheet Entry'
    ];
  }

  if (isTerm3) {
    return [
      `${subject.name}: Advanced Topical Synthesis & Contemporary Curriculum Innovations`,
      `${subject.name}: Inter-Disciplinary Linkages, ICT Tools & Emerging Trends in Nigeria`,
      `${subject.name}: Practical Laboratory, Fieldwork & Studio Workshop Demonstrations`,
      `${subject.name}: National Development Goals, Entrepreneurial Applications & Wealth Creation`,
      `${subject.name}: Advanced Multi-Step Analytical & Essay Examination Techniques`,
      `${subject.name}: WAEC, NECO & BECE Chief Examiner Rubrics & Common Candidate Pitfalls`,
      'Mid-Term Continuous Assessment (CA Test 3) & Pre-Exam Diagnostic Review',
      `${subject.name}: Speed Drills, Past Question Diagnostics & Model Solutions`,
      `${subject.name}: Formative Practical Exhibition & Student Portfolio Verification`,
      `${subject.name}: Terminal Mastery of Statutory Federal Ministry Competencies`,
      `${subject.name}: Mock Examination Clinic & Timed Question Answering Strategies`,
      'Full Annual Curriculum Revision, Formula Recitation & Examination Clinic',
      'Annual Promotion Examination, Academic Readiness & Broadsheet Certification'
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
  const raw = _generateRawNerdcOeqaContent(params);
  const safeTopic = params.topic?.trim() || `${params.subject || 'Curriculum'} Competency`;
  return {
    remedialTask: `Tier 1 (Remedial Task): Scaffolded step-by-step drill on "${safeTopic}" with basic definitions, vocabulary matching, and 2 supported worked examples.`,
    standardTask: `Tier 2 (Standard Task): Independent NERDC curriculum exercises on "${safeTopic}" solving 5 textbook questions with Nigerian realia application.`,
    advancedTask: `Tier 3 (Advanced Task): Multi-step inquiry or non-routine synthesis challenge on "${safeTopic}" formulating a peer-teaching demonstration or WAEC theory solution.`,
    ...raw,
  };
}

function _generateRawNerdcOeqaContent(params: {
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

  // Field of Study Determination
  const subLower = subName.toLowerCase();
  const isMath = subLower.includes('math') || subLower.includes('algebra') || subLower.includes('arithmetic');
  const isBiology = subLower.includes('bio') || (subLower.includes('basic science') && (safeTopic.toLowerCase().includes('plant') || safeTopic.toLowerCase().includes('animal') || safeTopic.toLowerCase().includes('living') || safeTopic.toLowerCase().includes('cell')));
  const isChemistry = subLower.includes('chem');
  const isPhysics = subLower.includes('physics') || (subLower.includes('phys') && !subLower.includes('physical'));
  const isGeneralScience = subLower.includes('basic science') || subLower.includes('integrated');
  const isGeography = subLower.includes('geograph') || subLower.includes('earth') || subLower.includes('landform');
  const isCommercial = subLower.includes('account') || subLower.includes('commerce') || subLower.includes('business') || subLower.includes('marketing') || (subLower.includes('econ') && !subLower.includes('home'));
  const isHomeEc = subLower.includes('home ec') || subLower.includes('food') || subLower.includes('catering') || subLower.includes('nutrition') || subLower.includes('clothing');
  const isPHE = subLower.includes('phe') || subLower.includes('physical') || subLower.includes('health education') || subLower.includes('athletic');
  const isCCA = subLower.includes('cca') || subLower.includes('creative arts') || subLower.includes('cultural and creative') || subLower.includes('music') || subLower.includes('drama') || subLower.includes('fine art');
  const isAgric = subLower.includes('agric') || subLower.includes('farm') || subLower.includes('crop') || subLower.includes('soil');
  const isTechOrICT = subLower.includes('computer') || subLower.includes('ict') || subLower.includes('tech') || subLower.includes('drawing') || subLower.includes('data proc');
  const isCivicOrGov = subLower.includes('civic') || subLower.includes('govern') || subLower.includes('social studies') || subLower.includes('history');
  const isReligion = subLower.includes('christian') || subLower.includes('crs') || subLower.includes('crk') || subLower.includes('islam') || subLower.includes('irs') || subLower.includes('irk');
  const isEnglishOrLit = subLower.includes('eng') || subLower.includes('lit') || subLower.includes('french');

  // Domain-specific customization:
  if (isMath) {
    return {
      objectives: [
        `State and prove the foundational mathematical definitions, properties, and theorems governing ${safeTopic} (Bloom: Remember & Understand).`,
        `Apply statutory mathematical formulas and sequential algorithmic steps to evaluate 5 algebraic/numerical equations accurately (Bloom: Apply).`,
        `Solve 2 multi-step contextual word problems modeled after Nigerian commercial and technological scenarios with 100% computational rigor (Bloom: Analyze & Solve).`,
        `Score at least 80% on timed classroom whiteboard drills and verify answers using inverse operations.`
      ],
      materials: [
        `NERDC Approved Mathematics Textbook for ${lvlName} (STAN / New General Mathematics)`,
        'Whiteboard, Dry-Erase Grid Markers & Mathematical Protractor/Compass Set',
        'Four-Figure Mathematical Logarithm Tables & Standard Geometric Models',
        'EduPlan NG Standardized Practice Drills & WAEC/BECE Past Question Bank'
      ],
      previousKnowledge: `Learners can comfortably perform basic operations, simplify elementary expressions, and recall properties established in Week ${Math.max(1, week - 1)}.`,
      introduction: `Teacher presents an intriguing real-life Nigerian arithmetic puzzle (e.g. calculation of market profit margin, construction tile geometry, or speed along the Lagos-Ibadan expressway) leading directly into ${safeTopic}.`,
      teacherActivity: `Step 1: Write date, level, subject, and topic boldly on the board.\nStep 2: State the formal mathematical theorem/rule and derive the governing formula step-by-step.\nStep 3: Work through 2 WAEC/BECE standard examples on the board, demonstrating substitution, simplification, and unit tracking.\nStep 4: Guide pupils through 2 collaborative chalkboard drills, addressing sign errors and parentheses rules.\nStep 5: Summarize common examination pitfalls in WASSCE/NECO papers.`,
      studentActivity: `Step 1: Copy structured theorem definitions, formulas, and working steps into mathematics notebooks.\nStep 2: Follow teacher's board demonstration and call out intermediate steps during working.\nStep 3: Pair up to solve 2 assigned drill equations within 8 minutes.\nStep 4: Present completed solutions on the board and complete individual exit-card evaluations.`,
      evaluation: `Administer 3 timed evaluation questions: (a) 1 basic direct computation, (b) 1 algebraic simplification involving variables, (c) 1 contextual Nigerian problem. Require students to show full working.`,
      assignment: `Complete Exercise questions 1 to 8 on page 32 of the recommended NERDC Mathematics textbook in your take-home exercise books.`,
      differentiatedInstruction: {
        struggling: 'Tier 1 (Remedial Support): Provide visual formula cue cards, step-by-step calculation frames, and peer-assisted arithmetic scaffolding.',
        onLevel: 'Tier 2 (Core Curriculum): Independent problem solving of standard textbook exercises with self-checking answer keys.',
        advanced: 'Tier 3 (Enrichment / Further Math): Challenge with composite multi-variable equations and WAEC General Mathematics past theoretical questions.'
      },
      safetyPrecautions: 'Ensure careful handling of sharp compasses and divider points during geometric construction.',
      lessonNote: {
        subtopics: `1. Mathematical Definitions & Operational Notation of ${safeTopic}\n2. Core Theorems, Rules & Standard Algebraic Formulas\n3. Step-by-Step Worked Classroom Examples (WAEC/BECE Standard)\n4. Blackboard Summary Takeaways & Student Practice Drill`,
        definitions: `${safeTopic} is a key curricular branch of ${subName} for ${lvlName} under the NERDC framework. It builds analytical discipline and quantitative reasoning vital for science, commercial, and engineering pathways.\n\nCore Principles:\n• Rule 1: Always adhere to the statutory sequence of operations (BODMAS / PEMDAS).\n• Rule 2: Maintain mathematical equality across equations by performing identical operations on both sides.\n• Rule 3: Always check units and dimensions (e.g. cm², Naira ₦, seconds, degrees).`,
        workedExamples: `Worked Example 1 (Direct Computation):\nEvaluate the mathematical expression under standard conditions:\nStep 1: Identify given quantities and write the governing equation.\nStep 2: Substitute values accurately into the formula.\nStep 3: Simplify and state final answer clearly with proper units.\n\nWorked Example 2 (Contextual Problem):\nA trader in Alaba International Market purchases goods worth ₦450,000 with a freight surcharge. Using the mathematical principles of ${safeTopic}, calculate the net unit cost and optimal retail markup.`,
        blackboardSummary: `• Point 1: Always double-check negative signs when expanding brackets or transposing terms across an equals sign.\n• Point 2: Show all intermediate calculation steps; marks in WAEC/NECO are awarded for method (M-marks) and accuracy (A-marks).\n• Point 3: Copy all formulas and the chalkboard diagram into your mathematics notebook.`,
        classDrill: `1. State the main rule or formula governing ${safeTopic}.\n2. Solve the 2 drill problems written on the right wing of the chalkboard and submit your exercise book for initialing.`
      }
    };
  }

  if (isBiology || isChemistry || isPhysics || isGeneralScience) {
    const scienceBranch = isChemistry ? 'Chemistry' : isPhysics ? 'Physics' : isBiology ? 'Biology' : 'Basic Science';
    return {
      objectives: [
        `Explain the foundational scientific laws, cellular/atomic structures, or principles governing ${safeTopic} (Bloom: Remember & Understand).`,
        `Set up laboratory apparatus or schematic diagrams correctly according to STAN safety specifications (Bloom: Apply & Create).`,
        `Analyze experimental observations and record scientific measurements with accurate SI units (Bloom: Analyze & Evaluate).`,
        `Draw and label self-explanatory biological, chemical, or physical diagrams with accurate proportions and guide-lines.`
      ],
      materials: [
        `NERDC Approved ${scienceBranch} Textbook for ${lvlName} (STAN Series / Longman)`,
        'School Science Laboratory Apparatus (Beakers, Bunsen Burner, Retort Stand, Test Tubes, Microscope/Slides)',
        'Instructional Scientific Wall Charts & High-Resolution Vector Diagram Transparencies',
        'Standard Personal Protective Equipment (Lab Coats, Safety Goggles, Heat-Resistant Gloves)'
      ],
      previousKnowledge: `Students recall prerequisite scientific laws and terminology learned in previous weeks and understand general laboratory safety protocols.`,
      introduction: `Teacher demonstrates a brief 3-minute laboratory phenomenon or displays a real-world Nigerian natural specimen (e.g. water purification, plant transpiration, circuit connection) to stimulate scientific inquiry into ${safeTopic}.`,
      teacherActivity: `Step 1: Write date, subject, topic, and subtopics clearly on the chalkboard.\nStep 2: State operational scientific hypotheses, formulas, and laws governing the concept.\nStep 3: Conduct a live demonstration using laboratory equipment, explaining observations step-by-step.\nStep 4: Draw and label the standard scientific apparatus/structure diagram on the chalkboard.\nStep 5: Emphasize laboratory safety rules: zero tasting, checking emergency eyewash, and proper disposal.`,
      studentActivity: `Step 1: Carefully observe teacher demonstration and record raw sensory data in laboratory logbooks.\nStep 2: Copy the clear chalkboard scientific diagram using sharp pencils and horizontal label guide-lines.\nStep 3: Work in lab pairs to manipulate apparatus and record experimental readings.\nStep 4: Formulate reasoned scientific deductions from observed experimental outcomes.`,
      evaluation: `Conduct a 3-part formative check: (a) 1 definition of statutory scientific law/term, (b) 1 identification of apparatus parts/functions, (c) 1 deduction question based on experimental observations.`,
      assignment: `Draw and label the complete scientific diagram for ${safeTopic} on a fresh page of your Science Practical Notebook. Answer review questions 1-5 on page 48 of the recommended textbook.`,
      differentiatedInstruction: {
        struggling: 'Tier 1 (Remedial Support): Provide labeled diagram templates and guided observation worksheets with sentence starters.',
        onLevel: 'Tier 2 (Core Curriculum): Independent diagram sketching, data recording, and standard deduction exercises.',
        advanced: 'Tier 3 (Scientific Inquiry): Formulate hypotheses on variable manipulation and predict outcomes under altered experimental conditions.'
      },
      safetyPrecautions: 'OEQA & STAN Laboratory Safety Protocol: Wear protective goggles and lab coats. Ensure no loose clothing near burners. Check fire extinguishers and dispose of chemical/biological waste in designated bins.',
      lessonNote: {
        subtopics: `1. Scientific Definitions & Theoretical Background of ${safeTopic}\n2. Governing Scientific Laws, Formulas & SI Metric Units\n3. Experimental Setup, Apparatus Observation & Demonstration\n4. Chalkboard Diagram & Practical Examination Takeaways`,
        definitions: `${safeTopic} is an essential instructional module in ${scienceBranch} within the NERDC secondary curriculum. It equips students with the empirical scientific method, diagnostic observation skills, and foundational competence for WAEC/NECO Practical and Theory examinations.\n\nKey Concepts:\n• Theory: Systematic investigation of physical, chemical, or biological phenomena in the natural universe.\n• Measurement: Adherence to the International System of Units (SI Units: kg, m, s, A, K, mol, cd).\n• Empirical Rigor: Distinguishing between controlled experimental variables and observed outcomes.`,
        workedExamples: `Worked Example 1 (Laboratory Observation & Calculation):\nGiven empirical parameters in the experiment, apply the governing scientific formula:\nStep 1: List known variables with their standard SI units.\nStep 2: State the appropriate scientific equation/law.\nStep 3: Substitute values and calculate the final result with correct significant figures.\n\nWorked Example 2 (Nigerian Industrial Application):\nIn local Nigerian pharmaceutical, agricultural, or petrochemical industries (e.g. Dangote Refinery, NAFDAC food processing), applying ${safeTopic} ensures product purity, structural safety, and environmental standard compliance.`,
        blackboardSummary: `• Point 1: In all WAEC/NECO practical exams, diagrams must have horizontal, non-crossing guide-lines and no arrowheads on labels.\n• Point 2: Always state numeric quantities alongside their exact SI metric units.\n• Point 3: Review all laboratory precautions and copy the full chalkboard illustration into your notebook.`,
        classDrill: `1. State the scientific definition or law governing ${safeTopic}.\n2. Complete the labeled drawing of the instructional diagram shown on the chalkboard in your practical notebook.`
      }
    };
  }

  if (isCommercial) {
    return {
      objectives: [
        `Define fundamental commercial, accounting, and economic terminology governing ${safeTopic} (Bloom: Remember & Understand).`,
        `Apply the double-entry bookkeeping rule or economic market principles to prepare balanced ledger accounts/graphs (Bloom: Apply).`,
        `Analyze Nigerian commercial transactions, Central Bank policies, or market equilibrium in Naira and Kobo (Bloom: Analyze).`,
        `Demonstrate commercial numeracy by balancing financial records or interpreting demand and supply elasticities.`
      ],
      materials: [
        `NERDC Approved Commercial Textbook for ${lvlName} (Essential Financial Accounting / Comprehensive Economics)`,
        'Standard Multi-Column Ledger Paper, T-Account Worksheets & Graph Sheets',
        'Nigerian Currency Replicas (Naira ₦ Notes), Bank Deposit Slips & Cheque Leaves',
        'Market Price Index Data from the National Bureau of Statistics (NBS)'
      ],
      previousKnowledge: `Learners understand basic trade transactions, division of labor, and primary book-keeping entries from earlier weeks.`,
      introduction: `Teacher presents a typical retail trade scenario at Bodija Market, Ibadan or Computer Village, Ikeja to prompt inquiry into how transactions in ${safeTopic} are tracked and balanced.`,
      teacherActivity: `Step 1: Write date, subject, topic, and subtopics clearly on the chalkboard.\nStep 2: Explain commercial rules (e.g. Golden Rules of Accounting: Debit the receiver, Credit the giver; or Law of Demand).\nStep 3: Rule out a standard T-Account or economic curve on the board, demonstrating entry sequence step-by-step.\nStep 4: Guide learners through a practical Nigerian business transaction scenario.\nStep 5: Review financial integrity, fraud prevention, and audit standards.`,
      studentActivity: `Step 1: Rule standard Ledger/T-Account margins or draw labeled economic axes in notebooks.\nStep 2: Post transactions to the appropriate debit and credit columns as teacher demonstrates.\nStep 3: Calculate totals and extract ledger balances (Balance c/d and b/d).\nStep 4: Solve a 10-minute commercial drill in pairs and cross-check ledger accuracy.`,
      evaluation: `Test commercial competence: (a) State the statutory rule governing ${safeTopic}, (b) Identify whether 3 given transactions are Debits or Credits, (c) Calculate closing ledger balances.`,
      assignment: `Prepare the full Ledger or Economic curve for transactions given on page 44 of the textbook for grading next lesson.`,
      differentiatedInstruction: {
        struggling: 'Tier 1 (Remedial Support): Color-coded Debit (Green) and Credit (Red) ledger templates with pre-ruled columns.',
        onLevel: 'Tier 2 (Core Curriculum): Independent preparation of two-column and three-column cash books or market schedules.',
        advanced: 'Tier 3 (Enrichment / Financial Analysis): Analyze bank reconciliation statements or compute price elasticity coefficients.'
      },
      safetyPrecautions: 'Ensure orderly desk arrangement, careful handling of calculation equipment, and meticulous neatness in financial books.',
      lessonNote: {
        subtopics: `1. Commercial Concepts & Terminology of ${safeTopic}\n2. Governing Bookkeeping Rules, Ledger Accounts & Market Principles\n3. Worked Classroom Demonstration (Naira ₦ Financial Transactions)\n4. Blackboard Summary Takeaways & Student Commercial Drill`,
        definitions: `${safeTopic} is a pillar of the NERDC Commercial Secondary Curriculum for ${lvlName}. It trains students in financial literacy, accountability, commercial negotiation, and preparation for professional certifications and WAEC/NECO commercial papers.\n\nCore Commercial Laws:\n• Golden Rule: Debit what comes in, Credit what goes out. Debit all expenses and losses; Credit all incomes and gains.\n• Accounting Equation: ASSETS = CAPITAL + LIABILITIES.\n• Economic Rule: Price is determined by the intersection of Market Demand and Market Supply curves.`,
        workedExamples: `Worked Example 1 (Chalkboard Ledger Demonstration):\nRecord and balance commercial transactions for the trading period:\nStep 1: Identify the two accounts affected by the transaction.\nStep 2: Determine which account receives value (Debit) and which gives value (Credit).\nStep 3: Post the Naira ₦ amounts, balance the account, and bring down the opening balance (b/d).\n\nWorked Example 2 (Nigerian Business Application):\nChief Adeleke operates an agribusiness firm in Ogun State. By maintaining accurate records under ${safeTopic}, he prevents inventory shrinkage, tracks profit margins, and secures bank loans easily.`,
        blackboardSummary: `• Point 1: Every debit entry must possess a corresponding credit entry of equal monetary value.\n• Point 2: Write clear narration for each transaction and keep figures aligned in columns.\n• Point 3: Copy the complete T-Account illustration and notes into your notebook before class ends.`,
        classDrill: `1. State the fundamental double-entry rule or economic principle governing ${safeTopic}.\n2. Enter the 3 transactions written on the chalkboard into the proper ledger accounts and balance them.`
      }
    };
  }

  if (isCivicOrGov) {
    return {
      objectives: [
        `Explain the statutory constitutional framework, civic responsibilities, and institutions governing ${safeTopic} (Bloom: Remember & Understand).`,
        `Analyze the separation of powers, democratic checks, and rule of law under the 1999 Constitution of Nigeria (Bloom: Analyze).`,
        `Critique 3 real-world Nigerian civic or governance case studies (e.g. electoral participation, anti-corruption, citizen rights) (Bloom: Evaluate).`,
        `Demonstrate responsible civic leadership, national consciousness, and respect for statutory authorities.`
      ],
      materials: [
        `NERDC Approved Civic Education / Government Textbook for ${lvlName}`,
        'Copy of the 1999 Constitution of the Federal Republic of Nigeria (as amended)',
        'National Symbols (Nigerian Flag, National Coat of Arms, National Anthem & Pledge)',
        'Organizational Charts of the 3 Arms of Nigerian Government & Electoral Commission (INEC)'
      ],
      previousKnowledge: `Learners understand fundamental human rights, community norms, and democratic values learned in preceding civic lessons.`,
      introduction: `Teacher recites a line from the Nigerian National Anthem ("To serve our fatherland with love and strength and faith") and connects national duty directly to ${safeTopic}.`,
      teacherActivity: `Step 1: Write date, subject, topic, and subtopics clearly on the chalkboard.\nStep 2: Break down the constitutional and civic tenets governing the topic with statutory references.\nStep 3: Draw the governance organogram/structure on the chalkboard (Executive, Legislature, Judiciary).\nStep 4: Lead an interactive debate on civic duties versus fundamental human rights.\nStep 5: Emphasize national integration, anti-corruption values, and unity in diversity.`,
      studentActivity: `Step 1: Copy constitutional definitions and governance charts into civic notebooks.\nStep 2: Actively participate in the structured classroom role-play demonstrating civic responsibility.\nStep 3: Analyze human rights scenarios in small groups and cite constitutional protections.\nStep 4: Answer formative exit questions evaluating democratic governance principles.`,
      evaluation: `Evaluate civic understanding: (a) Define ${safeTopic} in the context of Nigerian democracy, (b) State 3 statutory functions of the relevant government institution, (c) Explain 2 civic duties expected of every Nigerian citizen.`,
      assignment: `Write a 1-page essay in your civic notebook on: "The Role of Youth in Promoting Good Governance and Peaceful Coexistence in Nigeria."`,
      differentiatedInstruction: {
        struggling: 'Tier 1 (Remedial Support): Visual civic flashcards depicting national symbols, institutions, and simplified right definitions.',
        onLevel: 'Tier 2 (Core Curriculum): Standard constitutional case studies and structured short-answer analytical responses.',
        advanced: 'Tier 3 (Enrichment / Legal Studies): Mock parliamentary debate simulating a bill passage through the National Assembly.'
      },
      safetyPrecautions: 'Foster a respectful, non-partisan, and inclusive classroom atmosphere during civic and political debates.',
      lessonNote: {
        subtopics: `1. Constitutional Background & Operational Definitions of ${safeTopic}\n2. Statutory Powers, Institutional Roles & Checks and Balances\n3. Fundamental Rights, Citizen Duties & Rule of Law in Nigeria\n4. Blackboard Summary Takeaways & Civic Discussion Drill`,
        definitions: `${safeTopic} is a core component of the NERDC Civic Education and Government curriculum for ${lvlName}. It nurtures responsible citizenship, patriotic dedication, democratic vigilance, and active participation in Nigerian national development.\n\nKey Governance Pillars:\n• Rule of Law: Supremacy of the Constitution, equality before the law, and independence of the judiciary.\n• Separation of Powers: Executive (Enforces laws), Legislature (Enacts laws), Judiciary (Interprets laws).\n• Civic Responsibility: Voting in elections, prompt tax payment, community service, and environmental hygiene.`,
        workedExamples: `Worked Example 1 (Constitutional Analysis):\nExamine a scenario where a citizen's fundamental right is infringed:\nStep 1: Identify the specific Section in Chapter IV of the 1999 Constitution protecting the right.\nStep 2: State the appropriate legal recourse available through the High Court or Legal Aid Council.\nStep 3: Explain the constitutional check exercised by the Judiciary on executive excesses.\n\nWorked Example 2 (Community Civic Action):\nIn a Lagos or Kano residential community, youth leaders organize a civic environmental sanitation drive. Applying ${safeTopic} creates cooperative hygiene and prevents flood disasters.`,
        blackboardSummary: `• Point 1: The Constitution is the supreme law of Nigeria; any law inconsistent with its provisions is void to the extent of the inconsistency.\n• Point 2: Every right carries a corresponding civic duty to respect the rights of fellow citizens.\n• Point 3: Copy the three arms of government diagram and the chalkboard notes into your notebook.`,
        classDrill: `1. Define ${safeTopic} in your own words in two sentences.\n2. List three statutory duties of a responsible Nigerian citizen under Section 24 of the 1999 Constitution.`
      }
    };
  }

  if (isGeography) {
    return {
      objectives: [
        `Explain the physical, climatic, and cartographic principles governing ${safeTopic} (Bloom: Remember & Understand).`,
        `Interpret topographical survey maps, contour lines, and scale conversions with accurate spatial calculations (Bloom: Apply & Calculate).`,
        `Analyze the spatial distribution of Nigerian drainage basins, mineral deposits, or settlement patterns (Bloom: Analyze & Evaluate).`,
        `Draw and label self-explanatory geographical sketch maps and hydrological diagrams according to WAEC/NECO conventions.`
      ],
      materials: [
        `NERDC Approved Geography Textbook for ${lvlName} (Senior Secondary Geography / Macmillan Map Reading)`,
        'Survey of Nigeria 1:50,000 Topographical Map Sheets & Prismatic Magnetic Compasses',
        'Physical Relief Wall Map of Nigeria & Africa showing vegetation zones and drainage basins',
        'Standard Weather Instruments (Rain Gauge, Six\'s Maximum and Minimum Thermometer, Wind Vane)'
      ],
      previousKnowledge: 'Learners understand cardinal points, continents, basic landforms, and the physical environment from previous terms.',
      introduction: `Teacher displays a striking satellite image or physical contour map of Nigeria (e.g. Jos Plateau, Niger-Benue Confluence at Lokoja, or Atlantic coastline) to introduce spatial concepts in ${safeTopic}.`,
      teacherActivity: `Step 1: Write date, subject, topic, and subtopics clearly on the chalkboard.\nStep 2: Explain geographical theories, atmospheric cycles, and geomorphological processes step-by-step.\nStep 3: Sketch the standard geographical relief/drainage diagram on the board showing contours and elevation profiles.\nStep 4: Guide learners through a map-reading scale conversion drill (e.g. representative fraction to linear statement).\nStep 5: Relate the concept to Nigerian environmental conservation and climate resilience.`,
      studentActivity: `Step 1: Copy spatial definitions, map symbols, and geological tables into geography notebooks.\nStep 2: Practice contour identification and cross-section profiling in pairs using ruler and graph paper.\nStep 3: Measure map distances using thread/dividers and calculate ground distances in kilometers.\nStep 4: Answer diagnostic questions interpreting physical and human geographical interrelationships.`,
      evaluation: `Evaluate geographical competence: (a) Define ${safeTopic} in the context of physical/regional geography, (b) Calculate the ground distance or gradient for a given map scale, (c) State 2 economic impacts on Nigerian agriculture or trade.`,
      assignment: `Draw and label the geographical diagram for ${safeTopic} on a fresh page of your Geography Practical Drawing Book. Complete map-work exercises 1 to 4 on page 62 of the recommended textbook.`,
      differentiatedInstruction: {
        struggling: 'Tier 1 (Remedial Support): Color-coded elevation contour maps with step-by-step scale measurement guides.',
        onLevel: 'Tier 2 (Core Curriculum): Independent cross-section profiling, gradient calculations, and vegetation zone classification.',
        advanced: 'Tier 3 (Geospatial Analysis): Evaluate climate change impacts on Lake Chad or Lagos coastal erosion using satellite imagery data.'
      },
      safetyPrecautions: 'Ensure careful handling of sharp compass divider points during cartographic distance measurements.',
      lessonNote: {
        subtopics: `1. Geographical Concepts, Definitions & Spatial Scope of ${safeTopic}\n2. Physical Processes, Relief Features & Atmospheric Mechanics\n3. Cartographic Map Interpretation & Scale Calculation Drill\n4. Chalkboard Relief Diagram & Nigerian Environmental Takeaways`,
        definitions: `${safeTopic} is a core instructional unit in ${subName} for ${lvlName} under the NERDC syllabus. It equips secondary students with spatial analytical reasoning, environmental stewardship, map-reading precision, and WAEC/NECO practical and regional examination competence.\n\nCore Geographical Principles:\n• Spatial Distribution: Location, spatial arrangement, and aerial differentiation of physical and human phenomena.\n• Environmental Interaction: Dynamic feedback between atmospheric climate, lithosphere landforms, and human economic activities.\n• Cartographic Scale: Relationship between map representation and real-world ground distances (e.g. 1:50,000 means 2 cm on map = 1 km on ground).`,
        workedExamples: `Worked Example 1 (Map Scale & Distance Calculation):\nGiven a topographical map of Ibadan or Minna on a scale of 1:50,000:\nStep 1: Measure map distance between two settlement centroids = 14 cm.\nStep 2: Convert using scale ratio: Ground distance = 14 cm × 50,000 = 700,000 cm.\nStep 3: Convert to kilometers: 700,000 ÷ 100,000 = 7.0 km.\n\nWorked Example 2 (Nigerian Physical & Regional Application):\nThe seasonal migration of the Inter-Tropical Discontinuity (ITD) between moist maritime air masses from the Atlantic and dry continental air masses from the Sahara directly controls rainfall patterns, planting seasons, and drought occurrences across Nigeria.`,
        blackboardSummary: `• Point 1: In all WAEC/NECO map drawings, always include the North Arrow, a clear linear scale, and complete title.\n• Point 2: Contours close together indicate steep slopes, while contours widely spaced indicate gentle plains.\n• Point 3: Copy the complete geographical diagram, relief profile, and chalkboard notes into your notebook.`,
        classDrill: `1. State the geographical definition and two primary characteristics of ${safeTopic}.\n2. Convert a map scale of 1:100,000 to a statement scale in centimeters to kilometers and show full working.`
      }
    };
  }

  if (isHomeEc) {
    return {
      objectives: [
        `Define the culinary, nutritional, textile, or home management concepts of ${safeTopic} (Bloom: Remember & Understand).`,
        `Demonstrate hygienic meal preparation, nutrient preservation, sewing stitch execution, or household budgeting (Bloom: Apply).`,
        `Analyze dietary balance, nutrient deficiency disorders (kwashiorkor, rickets, scurvy), or consumer rights in Nigerian markets (Bloom: Analyze & Troubleshoot).`,
        `Construct balanced family dietary plans or textile prototypes using standard hygienic protocols.`
      ],
      materials: [
        `NERDC Approved Home Economics Textbook for ${lvlName} (Basic Home Economics for Secondary Schools)`,
        'Nutritional Food Guide Pyramid Chart, Fresh Local Nigerian Food Commodities (Yam, Beans, Palm Oil, Vegetables, Fish)',
        'Home Economics Laboratory Cookware, Gas Cookers, Cutting Boards, and Sanitizing Cleaning Supplies',
        'Textile Sewing Kit: Needles, Threads, Calico Fabric Remnants, Measuring Tape, and Tailor\'s Chalk'
      ],
      previousKnowledge: 'Learners understand basic personal hygiene, food groups, and household cleaning taught in primary and previous classes.',
      introduction: `Teacher displays a colorful basket of Nigerian food items (plantain, eggs, ugwu leaves, groundnuts) or fabric samples to trigger inquiry into nutritional balance and domestic management in ${safeTopic}.`,
      teacherActivity: `Step 1: Write date, subject, topic, and subtopics clearly on the chalkboard.\nStep 2: Detail nutritional biochemistry (carbohydrates, proteins, lipids, vitamins, minerals, water) and their physiological functions.\nStep 3: Draw the Food Guide Pyramid or sewing stitch diagram on the board with exact labels.\nStep 4: Conduct a live culinary/textile demonstration enforcing sterilization and kitchen safety.\nStep 5: Review household budgeting and waste-reduction practices for Nigerian families.`,
      studentActivity: `Step 1: Copy dietary definitions, meal charts, and stitch steps into Home Economics practical notebooks.\nStep 2: Practice fabric measurement or food classification in small collaborative laboratory groups.\nStep 3: Identify nutrient deficiencies and prescribe balanced Nigerian meal remedies.\nStep 4: Clean and sanitize workbenches, store all cutlery, and submit laboratory exit cards.`,
      evaluation: `Evaluate domestic science mastery: (a) State the statutory definition of ${safeTopic}, (b) Name 3 local Nigerian food sources rich in the required nutrients, (c) Explain 2 kitchen safety or sewing hygiene rules.`,
      assignment: `Draw and label the complete Home Economics diagram for ${safeTopic} in your Practical Album. Design a 3-course balanced lunch menu for a Nigerian adolescent using locally available ingredients.`,
      differentiatedInstruction: {
        struggling: 'Tier 1 (Remedial Support): Tactile food flashcards and pre-cut fabric swatches with step-by-step stitch guides.',
        onLevel: 'Tier 2 (Core Curriculum): Independent meal planning calculation, cost estimation, and recipe formulation.',
        advanced: 'Tier 3 (Nutritional Innovation): Formulate therapeutic meal plans for individuals managing diabetes or hypertension using indigenous Nigerian crops.'
      },
      safetyPrecautions: 'Strict Home Economics Laboratory Protocol: Wear chef apron and hair net. Keep floor dry to prevent slipping. Wash hands with soap and water before handling food.',
      lessonNote: {
        subtopics: `1. Domestic Science Concepts & Nutritional Foundations of ${safeTopic}\n2. Food Groups, Nutrient Functions & Deficiency Disorders\n3. Practical Demonstration (Culinary Preparation & Textile Craft)\n4. Chalkboard Dietary Diagram & Family Economic Takeaways`,
        definitions: `${safeTopic} is a foundational vocational discipline in ${subName} under the NERDC curriculum for ${lvlName}. It empowers learners with vital life skills in nutrition, culinary science, garment construction, consumer economics, and self-reliant entrepreneurship.\n\nKey Nutritional & Domestic Principles:\n• Balanced Diet: A diet containing all six food nutrients in their correct proportions for health, growth, and cellular repair.\n• Food Hygiene: Rigorous handwashing, clean food handling, and safe refrigeration/storage to prevent food-borne pathogens.\n• Resource Management: Prudent family budgeting to maximize nutritional value while minimizing household expenditure.`,
        workedExamples: `Worked Example 1 (Nutritional Meal Formulation):\nFormulate a balanced breakfast for a growing secondary student in Nigeria:\nStep 1: Energy giver (Carbohydrate): Akara (bean cakes) or boiled yam.\nStep 2: Body builder (Protein): Moin-moin or boiled egg with milk/pap.\nStep 3: Protective food (Vitamins/Minerals): Fresh orange slices or pawpaw.\n\nWorked Example 2 (Household Budgeting & Entrepreneurship):\nA homemaker or catering entrepreneur in Lagos calculates portion costs to produce 50 nutritious school lunches, maintaining hygiene standards while generating sustainable enterprise profit.`,
        blackboardSummary: `• Point 1: Prolonged overcooking of green leafy vegetables destroys heat-sensitive Vitamin C; always steam gently.\n• Point 2: Always maintain pristine personal hygiene and clean kitchen surfaces to eliminate Salmonella and cross-contamination.\n• Point 3: Copy the complete Food Guide Pyramid diagram and chalkboard lesson notes into your notebook.`,
        classDrill: `1. List the six essential food nutrients and state one local Nigerian food source for each.\n2. State two symptoms of Protein-Energy Malnutrition (Kwashiorkor) and explain how it can be prevented.`
      }
    };
  }

  if (isPHE) {
    return {
      objectives: [
        `Explain the physiological, anatomical, and athletic principles governing ${safeTopic} (Bloom: Remember & Understand).`,
        `Demonstrate correct biomechanical posture, motor skills, and athletic techniques on the sports track/court (Bloom: Apply).`,
        `Analyze cardiovascular responses, pulse rate changes, and sports injury prevention protocols (Bloom: Analyze & Troubleshoot).`,
        `Perform first aid emergency procedures for muscle sprains, cramps, or heat exhaustion in school athletics.`
      ],
      materials: [
        `NERDC Approved Physical and Health Education Textbook for ${lvlName}`,
        'Athletic Track and Field Equipment: Relay Batons, Whistle, Measuring Tape, Stopwatches, Footballs/Volleyballs',
        'PHE Anatomy Chart of the Circulatory & Musculoskeletal System',
        'Standard School First Aid Kit: Crepe Bandages, Antiseptic, Cold Ice Packs, Splints, and Disposable Gloves'
      ],
      previousKnowledge: 'Learners understand basic warm-up exercises, fair play rules, and body movement from preceding physical education periods.',
      introduction: `Teacher conducts a 3-minute warm-up jogging drill and has students take their resting radial pulse at the wrist, introducing cardiovascular exertion in ${safeTopic}.`,
      teacherActivity: `Step 1: Write date, subject, topic, and subtopics clearly on the chalkboard.\nStep 2: Explain anatomical muscles, heart-rate dynamics, and official game/track rules governing the topic.\nStep 3: Sketch the physiological circulatory chart or athletic track court diagram on the board.\nStep 4: Demonstrate the athletic skill or first aid R.I.C.E. procedure (Rest, Ice, Compression, Elevation).\nStep 5: Supervise guided student physical drills enforcing sportsmanship and safety.`,
      studentActivity: `Step 1: Copy physiological notes, court dimensions, and athletic rules into PHE notebooks.\nStep 2: Measure and record resting pulse rate versus post-exercise pulse rate in beats per minute (BPM).\nStep 3: Practice baton exchange, sprint start postures, or ball passing techniques under teacher coaching.\nStep 4: Execute simulated first aid wrapping for an ankle sprain in athletic pairs.`,
      evaluation: `Evaluate sports science competence: (a) State the physiological definition of ${safeTopic}, (b) Demonstrate or explain the correct athletic technique, (c) Name the 4 components of the R.I.C.E. emergency first aid treatment.`,
      assignment: `Draw and label the complete athletic court or anatomical diagram for ${safeTopic} in your PHE drawing album. Write 5 golden rules of personal health and hygiene.`,
      differentiatedInstruction: {
        struggling: 'Tier 1 (Adaptive PE): Low-impact modified physical routines with guided motor skill coaching.',
        onLevel: 'Tier 2 (Core Curriculum): Standard athletic sprint drills, ball control exercises, and fitness evaluation.',
        advanced: 'Tier 3 (Athletic Leadership): Lead class warm-ups, officiate simulated track events, and compute VO2 recovery rates.'
      },
      safetyPrecautions: 'Mandatory Sports Ground Safety: Wear rubber-soled canvas sneakers. Perform thorough warm-up and cool-down stretches. Ensure hydration and keep first aid kit trackside.',
      lessonNote: {
        subtopics: `1. Physical & Physiological Concepts of ${safeTopic}\n2. Biomechanical Movement, Athletic Rules & Game Dimensions\n3. Cardiovascular Exercise Response & First Aid (R.I.C.E.)\n4. Chalkboard Diagram & Lifelong Health Takeaways`,
        definitions: `${safeTopic} is a key health and physical wellness module in ${subName} under the NERDC framework for ${lvlName}. It promotes aerobic fitness, muscular endurance, team sportsmanship, cardiovascular longevity, and disease prevention.\n\nCore Physical & Health Principles:\n• Cardiovascular Endurance: Ability of heart and lungs to supply oxygenated blood to working muscles during sustained physical activity.\n• Pulse Rate Monitoring: Normal resting heart rate for adolescents is 60–90 beats per minute; it rises proportionally with exercise intensity.\n• First Aid (R.I.C.E.): Immediate protocol for acute soft tissue injury: Rest, Ice, Compression, and Elevation.`,
        workedExamples: `Worked Example 1 (Heart Rate & Cardiovascular Calculation):\nMeasure radial pulse over 15 seconds and calculate Beats Per Minute (BPM):\nStep 1: Place index and middle finger gently over radial artery at the base of the thumb.\nStep 2: Count beats over 15 seconds (e.g. 18 beats).\nStep 3: Multiply by 4: Resting pulse = 18 × 4 = 72 BPM.\n\nWorked Example 2 (Nigerian Athletic Excellence):\nIn national and international competitions (e.g. National Sports Festival, All-Africa Games), applying sports science and nutrition under ${safeTopic} prevents athletic burnout and maximizes peak performance.`,
        blackboardSummary: `• Point 1: Never apply direct heat or massage to an acute sprain during the first 48 hours; apply cold ice compress.\n• Point 2: Always drink clean water before, during, and after intense athletic workouts to prevent heat exhaustion.\n• Point 3: Copy the complete circulatory pulse diagram and chalkboard physical notes into your notebook.`,
        classDrill: `1. State the normal resting pulse rate for a healthy secondary school student.\n2. Write down the full meaning of the R.I.C.E. acronym used in sports first aid.`
      }
    };
  }

  if (isCCA) {
    return {
      objectives: [
        `Identify indigenous and contemporary African art traditions, motifs, or musical forms in ${safeTopic} (Bloom: Remember & Understand).`,
        `Demonstrate creative craftsmanship using standard shading techniques, color mixing, sculpturing, or rhythmic performance (Bloom: Apply & Create).`,
        `Critique visual artifacts, dramatic scripts, or musical compositions with reference to Nigerian cultural heritage (Bloom: Analyze & Evaluate).`,
        `Produce an original visual drawing, craft artifact, or dramatic performance adhering to aesthetic balance.`
      ],
      materials: [
        `NERDC Approved Cultural and Creative Arts Textbook for ${lvlName}`,
        'Art Drawing Paper, Shading Pencils (2B, 4B, 6B), Poster Colors, Brushes & Mixing Palettes',
        'Nigerian Traditional Musical Instruments (Gangan Talking Drum, Shekere, Ogene, Oja Flute)',
        'Illustrations of Famous Nigerian Heritage Arts (Nok Terracotta, Benin Bronzes, Igbo-Ukwu Bronzes, Ife Terracotta)'
      ],
      previousKnowledge: 'Learners recall primary colors, basic geometric drawing shapes, and cultural songs taught in earlier terms.',
      introduction: `Teacher displays an evocative Nigerian cultural artifact (e.g. a carved calabash, adire textile pattern, or miniature Benin mask) to stimulate aesthetic inquiry into ${safeTopic}.`,
      teacherActivity: `Step 1: Write date, subject, topic, and subtopics clearly on the chalkboard.\nStep 2: Explain historical art movements, principles of design (balance, proportion, rhythm), and musical/dramatic elements.\nStep 3: Draw a step-by-step artistic illustration or color wheel on the board demonstrating tone and gradation.\nStep 4: Demonstrate pencil shading techniques (cross-hatching, stippling) or instrumental rhythmic beats.\nStep 5: Supervise creative student studio production and provide constructive aesthetic critique.`,
      studentActivity: `Step 1: Copy art terminology, color harmony charts, and historical summaries into CCA notebooks.\nStep 2: Practice observational drawing and tonal shading in sketchbooks using 2B/4B pencils.\nStep 3: Mix primary pigment colors to produce secondary and tertiary hues on paper palettes.\nStep 4: Present completed sketches or perform choral rhythmic motifs for peer appreciation.`,
      evaluation: `Evaluate artistic mastery: (a) State the aesthetic definition of ${safeTopic}, (b) Name 2 historical centers of ancient Nigerian art, (c) Identify the complementary color of blue or explain the principle of visual balance.`,
      assignment: `Create a completed tonal drawing or patterned motif for ${safeTopic} in your Art Drawing Album. Write 3 sentences explaining the cultural significance of the artwork.`,
      differentiatedInstruction: {
        struggling: 'Tier 1 (Remedial Support): Contour outline templates with step-by-step tonal shading guide scales.',
        onLevel: 'Tier 2 (Core Curriculum): Independent still-life drawing, color rendering, and cultural essay analysis.',
        advanced: 'Tier 3 (Creative Portfolio): Compose an original multi-color textile design or short dramatic dialogue celebrating national unity.'
      },
      safetyPrecautions: 'Studio Safety Protocol: Handle sharp carving knives and craft scissors with extreme caution. Dispose of dirty wash water properly and clean all brushes.',
      lessonNote: {
        subtopics: `1. Cultural Concepts & Aesthetic Foundations of ${safeTopic}\n2. Principles of Visual Design, Color Harmony & Music Notation\n3. Nigerian Cultural Heritage Centers (Nok, Benin, Igbo-Ukwu, Ife)\n4. Chalkboard Art Illustration & Studio Craft Takeaways`,
        definitions: `${safeTopic} is an essential creative module in ${subName} for ${lvlName} under the NERDC curriculum. It fosters aesthetic sensitivity, imaginative craftsmanship, cultural appreciation, and pride in Nigeria's rich artistic traditions.\n\nKey Artistic & Cultural Principles:\n• Elements of Art: Line, shape, form, color, value, texture, and space.\n• Principles of Design: Balance, proportion, harmony, contrast, rhythm, and unity.\n• Nigerian Heritage: Ancient classical art traditions dating back thousands of years (Nok terracotta circa 500 BC, Igbo-Ukwu 9th century AD, Ife and Benin royal bronzes).`,
        workedExamples: `Worked Example 1 (Color Mixing & Shading Demonstration):\nDemonstrate color theory and tonal shading on paper:\nStep 1: Mix Primary Colors (Red + Yellow = Orange; Yellow + Blue = Green; Blue + Red = Violet).\nStep 2: Draw a simple cylindrical clay pot using light structural lines.\nStep 3: Apply 5 tonal values: Highlight, Mid-tone, Core Shadow, Reflected Light, and Cast Shadow.\n\nWorked Example 2 (Nigerian Creative Enterprise):\nContemporary Nigerian textile designers (Adire in Abeokuta, Aso-Oke in Iseyin, Akwete in Abia) utilize the principles of ${safeTopic} to create internationally renowned fashion products.`,
        blackboardSummary: `• Point 1: Always clean and dry paintbrushes with bristles facing upward to preserve their shape and longevity.\n• Point 2: Shading creates the illusion of 3-dimensional form and volume on a 2-dimensional flat paper surface.\n• Point 3: Copy the complete color wheel or artistic diagram and chalkboard notes into your notebook.`,
        classDrill: `1. List three primary colors and the secondary color produced by mixing each pair.\n2. Name two famous ancient Nigerian art cultures and state the primary material they used (e.g. terracotta, bronze).`
      }
    };
  }

  if (isAgric) {
    return {
      objectives: [
        `Define agricultural concepts, soil properties, and farm management practices governing ${safeTopic} (Bloom: Remember & Understand).`,
        `Demonstrate correct agronomic handling of farm tools, seed germination, livestock feed, or crop protection chemicals (Bloom: Apply).`,
        `Analyze soil nutrient deficiencies, crop pests, livestock diseases, or farm business accounts in Nigeria (Bloom: Analyze & Troubleshoot).`,
        `Produce technical farm records, crop calendars, or soil profile drawings compliant with agricultural standards.`
      ],
      materials: [
        `NERDC Approved Agricultural Science Textbook for ${lvlName} (Essential Agricultural Science / Evans)`,
        'School Farm Plot & Agricultural Hand Tools (Cutlass, Hoe, Spade, Rake, Wheelbarrow, Watering Can)',
        'Sample Soil Horizon Monoliths (Topsoil, Subsoil, Parent Material) and Soil Testing Kit (pH paper, Beakers)',
        'Specimens of Local Nigerian Crops (Cassava stems, Maize grains, Cowpea seeds) and Fertilizer Samples (NPK 15:15:15, Urea)'
      ],
      previousKnowledge: 'Learners understand basic plant parts, soil types (sand, clay, loam), and farm tools from junior secondary science.',
      introduction: `Teacher displays a healthy cassava tuber, maize cob, or soil sample from the school farm to introduce food security and agribusiness concepts in ${safeTopic}.`,
      teacherActivity: `Step 1: Write date, subject, topic, and subtopics clearly on the chalkboard.\nStep 2: Explain agronomic processes (soil chemistry, crop propagation, livestock nutrition, pest control).\nStep 3: Sketch the clear agricultural soil profile or crop life-cycle diagram on the chalkboard.\nStep 4: Demonstrate the correct handling, sharpening, and storage of agricultural implements.\nStep 5: Enforce farm safety rules, chemical handling precautions, and school farm plot maintenance.`,
      studentActivity: `Step 1: Copy agricultural definitions, nutrient tables, and agronomic cycles into farm notebooks.\nStep 2: Examine soil texture, color, and drainage in small field groups on the school farm plot.\nStep 3: Practice seedbed preparation and nursery sowing techniques under teacher supervision.\nStep 4: Record farm inputs and calculate crop yield estimates in pairs.`,
      evaluation: `Evaluate agronomic competence: (a) State the statutory definition of ${safeTopic}, (b) Name 2 major pests or diseases affecting the commodity in Nigeria and state their control measures, (c) Explain 1 soil conservation method.`,
      assignment: `Draw and label the agricultural diagram for ${safeTopic} in your Agricultural Drawing Book. Complete review questions 1-5 on page 52 of the textbook.`,
      differentiatedInstruction: {
        struggling: 'Tier 1 (Remedial Support): Hands-on seed identification trays with pictorial weed/pest identification flashcards.',
        onLevel: 'Tier 2 (Core Curriculum): Independent soil texture testing, fertilizer application calculations, and farm ledger record keeping.',
        advanced: 'Tier 3 (Agribusiness Innovation): Formulate integrated pest management (IPM) protocols for smallholder Nigerian cassava or poultry farmers.'
      },
      safetyPrecautions: 'Strict Farm Safety Protocol: Wear rubber boots, gloves, and protective clothing. Never touch agrochemicals with bare hands. Wash thoroughly with soap after farm work.',
      lessonNote: {
        subtopics: `1. Agricultural Concepts, Soil Properties & Agronomic Background of ${safeTopic}\n2. Crop Production / Animal Husbandry Methodology & Farm Inputs\n3. Pest & Disease Management, Harvesting & Post-Harvest Storage\n4. Chalkboard Soil/Crop Diagram & Nigerian Agribusiness Takeaways`,
        definitions: `${safeTopic} is a core vocational science module in ${subName} under the NERDC secondary syllabus for ${lvlName}. It equips Nigerian students with modern agronomic skills, livestock management, food security science, and entrepreneurial wealth generation in agriculture.\n\nCore Agricultural Principles:\n• Soil Fertility: Maintenance of optimal chemical, physical, and biological soil conditions for maximum crop yields.\n• Agronomic Practices: Pre-planting (land clearing, ploughing, harrowing), planting (spacing, seed rate), and post-planting (weeding, thinning, fertilizer application).\n• Economic Agribusiness: Farming as a profitable commercial enterprise that generates employment and foreign exchange in Nigeria.`,
        workedExamples: `Worked Example 1 (Plant Population & Spacing Calculation):\nCalculate the plant population of maize on a 1-hectare farm plot (10,000 m²):\nStep 1: Recommended spacing = 75 cm × 25 cm = 0.75 m × 0.25 m = 0.1875 m² per stand.\nStep 2: Total stands = 10,000 m² ÷ 0.1875 m² = 53,333 stands per hectare.\nStep 3: At 1 plant per stand, plant population = 53,333 maize plants.\n\nWorked Example 2 (Nigerian Agricultural Application):\nFarmers across the Middle Belt and South-West adopt improved high-yield cassava varieties developed by the International Institute of Tropical Agriculture (IITA, Ibadan), increasing garri and industrial starch yields significantly.`,
        blackboardSummary: `• Point 1: Clean, wash, and oil all farm tools immediately after use to prevent corrosion and rust.\n• Point 2: Always incorporate leguminous crops (cowpea, groundnut) into crop rotations to fix atmospheric nitrogen naturally into the soil.\n• Point 3: Copy the complete agricultural diagram and chalkboard notes into your notebook.`,
        classDrill: `1. State the agricultural definition and economic importance of ${safeTopic}.\n2. Calculate the number of yam setts required to plant a 2-hectare farm given a planting spacing of 1 m × 1 m.`
      }
    };
  }

  if (isTechOrICT) {
    const isComp = subLower.includes('computer') || subLower.includes('ict') || subLower.includes('data');
    return {
      objectives: [
        `Define the technical/computing terminology, architecture, and principles of ${safeTopic} (Bloom: Remember & Understand).`,
        `Demonstrate hands-on technical dexterity using drawing instruments, workshop tools, or computer software/hardware (Bloom: Apply).`,
        `Analyze mechanical mechanisms, electronic logic gates, algorithm flowcharts, or system errors (Bloom: Analyze & Troubleshoot).`,
        `Produce accurate first-angle orthographic projections, isometric engineering drawings, or structured algorithms/code.`
      ],
      materials: [
        `NERDC Approved ${isComp ? 'Computer Studies' : 'Basic Technology'} Textbook for ${lvlName}`,
        isComp
          ? 'Computer Hardware Components (Motherboard, CPU, RAM Modules, Hard Drive, Keyboard, Mouse) & Diagnostic Software'
          : 'Technical Drawing Board, T-Square, 30°/60° and 45° Set-Squares, Metric Scales, French Curves & Woodwork Hand Tools',
        'Visual Architectural Schematics & Vector Component Diagrams'
      ],
      previousKnowledge: 'Learners understand basic workshop safety, hand tool classification, and elementary input/output concepts from earlier terms.',
      introduction: `Teacher displays a computer motherboard microchip or a precision wooden dovetail joint to demonstrate how engineering and computing principles govern ${safeTopic}.`,
      teacherActivity: `Step 1: Write date, subject, topic, and subtopics clearly on the chalkboard.\nStep 2: Explain operational mechanisms, computational algorithms, or engineering drafting conventions.\nStep 3: Draw a clear technical projection or computer hardware architecture diagram on the board with exact labels.\nStep 4: Guide learners through a practical demonstration enforcing precision and safety.\nStep 5: Review WAEC/BECE technical drawing and ICT examination rubrics.`,
      studentActivity: `Step 1: Copy technical definitions, process flowcharts, and diagrams into technical drawing books or computer logbooks.\nStep 2: Practice isometric-to-orthographic projection or step-by-step pseudo-code tracing in pairs.\nStep 3: Execute precision pencil lines (thin continuous lines, thick outlines, dashed hidden details) or hardware assembly.\nStep 4: Answer diagnostic troubleshooting questions evaluating technical efficiency.`,
      evaluation: `Evaluate technical/ICT competence: (a) State the statutory definition of ${safeTopic}, (b) Identify 2 workshop tools or computer hardware components and state their functions, (c) Explain 1 technical safety convention.`,
      assignment: `Draw and label the complete technical or computing diagram for ${safeTopic} in your Drawing / Practical Album. Answer questions 1 to 5 on page 40 of the recommended textbook.`,
      differentiatedInstruction: {
        struggling: 'Tier 1 (Remedial Support): Grid-lined drawing guides and labeled hardware block diagram cue sheets.',
        onLevel: 'Tier 2 (Core Curriculum): Independent orthographic view projection, algorithm flowcharting, and component diagnosis.',
        advanced: 'Tier 3 (Technical Innovation): Design a computerized automated control flowchart or complex isometric exploded assembly.'
      },
      safetyPrecautions: isComp
        ? 'Computer Lab Safety: Disconnect power before inspecting internal circuits. Keep liquids away from keyboards and wear anti-static wristbands.'
        : 'Workshop Safety Protocol: Wear eye protection and safety boots. Never carry sharp chisels in pockets. Keep floor free of wood shavings.',
      lessonNote: {
        subtopics: `1. Technical / Computing Foundations & Definitions of ${safeTopic}\n2. System Architecture, Components & Operational Mechanics\n3. Practical Demonstration, Troubleshooting & Workshop Safety\n4. Chalkboard Technical Diagram & Industrial Exam Takeaways`,
        definitions: `${safeTopic} is a core STEM and vocational discipline in ${subName} under the NERDC syllabus for ${lvlName}. It develops computational thinking, technical draughtsmanship, engineering design competence, and workforce readiness for national industrialization.\n\nCore Technical Principles:\n• Precision Engineering: Strict adherence to metric measurements, line weights, and projection standards.\n• Computer Architecture: Von Neumann principle: Input → Central Processing Unit (ALU + Control Unit) → Primary Memory (RAM/ROM) → Output / Secondary Storage.\n• Workshop Safety: Proactive hazard prevention, tool maintenance, and environmental orderliness.`,
        workedExamples: `Worked Example 1 (Technical Process Demonstration):\nExecute standard first-angle orthographic projection or algorithmic trace:\nStep 1: Draw the Front Elevation looking from the arrow direction using thick continuous outlines.\nStep 2: Project construction lines vertically downward to draw the Plan View directly below the Front Elevation.\nStep 3: Project horizontal lines to draw the End/Side Elevation in direct alignment.\n\nWorked Example 2 (Nigerian Industrial Application):\nEngineering drafters, carpenters, and software developers in Nigeria use ${safeTopic} to construct durable housing structures, furniture, and fintech applications that power the modern Nigerian economy.`,
        blackboardSummary: `• Point 1: In technical drawing, all lettering must be uniform single-stroke capital letters between 3mm guidelines.\n• Point 2: Always save your computational work frequently to prevent data loss during power fluctuations.\n• Point 3: Copy the complete technical schematic diagram and chalkboard notes into your notebook.`,
        classDrill: `1. State the difference between first-angle and third-angle projection (or between RAM and ROM).\n2. Complete the labeled drawing of the instructional diagram shown on the chalkboard in your practical drawing book.`
      }
    };
  }

  if (isReligion) {
    const isIslam = subLower.includes('islam') || subLower.includes('irs');
    return {
      objectives: [
        `Narrate the sacred scriptural texts, historical revelations, or traditions associated with ${safeTopic} (Bloom: Remember & Understand).`,
        `Interpret moral commandments and theological teachings relevant to personal character and social cohesion (Bloom: Apply & Analyze).`,
        `Demonstrate respect for sacred scriptures, honest conduct, and compassionate community fellowship (Bloom: Evaluate).`,
        `Apply ethical principles to resolve moral dilemmas encountered by Nigerian secondary students.`
      ],
      materials: [
        `NERDC Approved Religious Studies Textbook for ${lvlName}`,
        isIslam ? 'The Holy Qur\'an, Hadith Collections & Arabic Calligraphy Charts' : 'The Holy Bible (Revised Standard Version / King James Version)',
        'Moral Virtue Mind Maps, Scripture Memory Verse Cards & Illustrated Biblical/Islamic Historical Maps'
      ],
      previousKnowledge: `Learners recall previous scripture lessons on moral righteousness, reverence for God, and kindness to neighbors.`,
      introduction: `Teacher recites a memory verse or sacred text connected to ${safeTopic} and poses a thought-provoking moral question about daily honesty and compassion.`,
      teacherActivity: `Step 1: Write date, subject, topic, and subtopics clearly on the chalkboard.\nStep 2: Read sacred scriptural texts aloud with proper reverence and clear pronunciation.\nStep 3: Explain the historical context, theological revelation, and moral lessons step-by-step.\nStep 4: Draw the spiritual/moral diagram (e.g. Fruit of the Spirit Tree, Pillars of Faith) on the board.\nStep 5: Facilitate respectful student reflection on practical daily application.`,
      studentActivity: `Step 1: Follow along in their personal Bibles or Qur'ans and read designated verses.\nStep 2: Copy scriptural references, moral definitions, and diagrams into religious studies notebooks.\nStep 3: Discuss ethical dilemmas in pairs and propose solutions grounded in scriptural teachings.\nStep 4: Memorize the assigned weekly memory verse / Hadith before class dismissal.`,
      evaluation: `Evaluate moral and spiritual comprehension: (a) Cite the scriptural reference for ${safeTopic}, (b) Explain 2 moral lessons taught in the passage, (c) Describe how a Nigerian student can demonstrate this virtue in school.`,
      assignment: `Memorize the weekly scripture verse. Write a short paragraph in your notebook explaining how you will practice the virtues of ${safeTopic} at home this week.`,
      differentiatedInstruction: {
        struggling: 'Tier 1 (Remedial Support): Scripture verse tracing cards with simplified phonetic guides and vocabulary aids.',
        onLevel: 'Tier 2 (Core Curriculum): Independent reading of scripture chapters and structured character analysis questions.',
        advanced: 'Tier 3 (Ethical Leadership): Expository analysis comparing historical scriptural contexts with contemporary Nigerian societal challenges.'
      },
      safetyPrecautions: 'Ensure absolute respect for religious diversity, promoting peaceful inter-faith harmony and mutual brotherhood.',
      lessonNote: {
        subtopics: `1. Scriptural Context & Sacred Texts of ${safeTopic}\n2. Theological Principles & Moral Teachings\n3. Practical Moral Application in Nigerian Family and School Life\n4. Chalkboard Scripture Diagram & Personal Reflection Drill`,
        definitions: `${safeTopic} is a vital spiritual and ethical module in ${subName} under the NERDC curriculum for ${lvlName}. It anchors students in God-fearing discipline, moral integrity, empathy, and active contribution to peaceful coexistence across Nigeria.\n\nCore Spiritual Virtues:\n• Integrity: Truthfulness in speech, academic honesty during exams, and loyalty to righteous values.\n• Love & Mercy: Compassion for the needy, forgiveness, and selfless service to humanity.\n• Faith: Steadfast devotion, obedience to divine commandments, and daily prayerful gratitude.`,
        workedExamples: `Worked Example 1 (Moral Dilemma Resolution):\nA student finds an unmarked envelope containing ₦20,000 in the school library:\nStep 1: Reflect on the moral teachings of ${safeTopic} regarding honesty and the sanctity of property.\nStep 2: Hand the found money immediately to the school principal or duty master.\nStep 3: Experience the inner peace and moral integrity affirmed in sacred scripture.\n\nWorked Example 2 (Scriptural Commandment in Society):\nIn diverse Nigerian communities, practicing ${safeTopic} fosters peaceful communal harmony, supports charity for orphans and widows, and eliminates ethnic prejudice.`,
        blackboardSummary: `• Point 1: True religion is demonstrated through righteous character, honesty, and kindness to fellow human beings.\n• Point 2: Always memorize scriptural passages alongside their exact chapter and verse citations.\n• Point 3: Copy the complete chalkboard diagram and summary notes into your notebook.`,
        classDrill: `1. Recite the memory verse or text citation for ${safeTopic}.\n2. State two practical ways you can demonstrate this moral teaching in your school this week.`
      }
    };
  }

  // Default: English Studies, Literature in English & General Humanities
  return {
    objectives: [
      `Define and explain the grammatical, literary, or conceptual principles of ${safeTopic} according to NERDC standards (Bloom: Remember & Understand).`,
      `Apply linguistic rules, phonetic transcriptions, or narrative techniques in structured oral and written compositions (Bloom: Apply).`,
      `Analyze excerpts from recommended Nigerian and African literature / comprehension passages with 85% accuracy (Bloom: Analyze & Evaluate).`,
      `Demonstrate communicative competence by presenting structured spoken or written arguments without grammatical errors.`
    ],
    materials: [
      `NERDC Approved English Studies Textbook for ${lvlName} (Intensive English / Oxford English)`,
      'Recommended African Prose, Poetry & Drama Texts (e.g. Wole Soyinka, Chinua Achebe)',
      'Phonetic Transcription Wall Charts, Audio Listening Prompts & Lexical Flashcards',
      'EduPlan NG Standardized Reading Comprehension & Composition Rubrics'
    ],
    previousKnowledge: `Learners can identify basic parts of speech, write coherent compound sentences, and read age-appropriate prose with fluency.`,
    introduction: `Teacher displays a striking headline from a leading Nigerian newspaper or reads an evocative poetic stanza aloud to draw students into the linguistic mechanics of ${safeTopic}.`,
    teacherActivity: `Step 1: Write date, subject, topic, and subtopics clearly on the chalkboard.\nStep 2: Define the grammatical rule or literary device with clear chalkboard examples.\nStep 3: Work through a model sentence analysis or narrative plot diagram on the board.\nStep 4: Conduct guided oral drills focusing on stress, intonation, and syntax precision.\nStep 5: Supervise collaborative student writing and provide corrective feedback on punctuation.`,
    studentActivity: `Step 1: Copy rules, phonetic transcriptions, and illustrative sentences into English notebooks.\nStep 2: Participate actively in choral and individual pronunciation / reading drills.\nStep 3: Work in pairs to identify parts of speech or analyze literary themes in assigned passages.\nStep 4: Draft a 5-sentence paragraph applying the day's grammatical or literary concept.`,
    evaluation: `Administer a 3-part evaluation: (a) 2 multiple-choice objective questions on syntax/phonetics, (b) 1 error-identification sentence drill, (c) 1 oral pronunciation or short sentence composition check.`,
    assignment: `Complete Exercise A and B on page 38 of your English Studies textbook. Write 5 original sentences illustrating the proper use of ${safeTopic}.`,
    differentiatedInstruction: {
      struggling: 'Tier 1 (Remedial Support): Sentence starters, visual phonetic charts, and guided vocabulary matching worksheets.',
      onLevel: 'Tier 2 (Core Curriculum): Independent reading comprehension analysis and creative sentence composition.',
      advanced: 'Tier 3 (Creative Writing): Compose an original dialogue or short narrative applying advanced figures of speech.'
    },
    safetyPrecautions: 'Maintain clear classroom gangways, ensure proper vocal projection without straining, and encourage courteous debate.',
    lessonNote: {
      subtopics: `1. Grammatical / Literary Definitions of ${safeTopic}\n2. Core Rules of Syntax, Phonology & Style\n3. Worked Classroom Examples & Model Sentences (Nigerian Context)\n4. Blackboard Summary Takeaways & Student Writing Drill`,
      definitions: `${safeTopic} is a foundational instructional module in ${subName} for ${lvlName} under the NERDC secondary syllabus. It empowers Nigerian learners with communicative eloquence, reading comprehension, critical analysis, and distinction in WAEC, NECO, and BECE English Language examinations.\n\nKey Linguistic Pillars:\n• Syntax: Accurate grammatical agreement between subjects, verbs, and tenses.\n• Phonology: Correct vowel length, consonant articulation, stress, and intonation.\n• Composition: Logical paragraph organization with clear topic sentences and supporting evidence.`,
      workedExamples: `Worked Example 1 (Grammatical Analysis):\nAnalyze sentence structure and grammatical concord:\nStep 1: Identify the main subject and its grammatical number (singular or plural).\nStep 2: Select the appropriate verb form that agrees with the subject.\nStep 3: Punctuate the sentence correctly with capital letters and appropriate terminal marks.\n\nWorked Example 2 (Contextual Nigerian Expression):\nIn Nigerian formal discourse and commercial correspondence, applying ${safeTopic} ensures clarity, prevents ambiguity, and conveys professional credibility.`,
      blackboardSummary: `• Point 1: In English grammar, a singular subject requires a singular verb, while a plural subject takes a plural verb.\n• Point 2: Always review your written compositions for punctuation, spelling, and paragraph coherence.\n• Point 3: Copy the complete narrative arc or linguistic diagram and all chalkboard notes into your notebook.`,
      classDrill: `1. State the grammatical rule or literary definition governing ${safeTopic}.\n2. Construct two original sentences on the chalkboard demonstrating correct application of this rule.`
    }
  };
}
