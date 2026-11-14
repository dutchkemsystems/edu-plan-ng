/**
 * EduPlan NG - Official Federal Ministry of Education & NERDC Statutory Syllabus
 * Strict Class & Term Isolation Matrix for Junior (JSS 1–3) and Senior (SSS 1–3) Secondary Schools.
 * Adheres strictly to the guidelines of the Office of Education Quality Assurance (OEQA).
 *
 * Each class and term contains exactly 10 distinct, non-repeating teaching topics.
 * When rendered in 13-week schemes:
 * Weeks 1–6: Topics 1–6
 * Week 7: Mid-Term Continuous Assessment (CA Test) & Intervention
 * Weeks 8–11: Topics 7–10
 * Week 12: Comprehensive Termly Revision & Examination Prep
 * Week 13: Terminal Examination, Marking & Broadsheet Entry
 */

export interface LevelCurriculumMap {
  [level: string]: {
    [term: number]: string[];
  };
}

import {
  AGRICULTURAL_SCIENCE_CURRICULUM,
  BASIC_TECHNOLOGY_CURRICULUM,
  COMPUTER_STUDIES_CURRICULUM
} from './classCurriculaExtra.ts';

import {
  GOVERNMENT_CURRICULUM,
  COMMERCE_AND_BUSINESS_CURRICULUM
} from './classCurriculaExtra2.ts';

// ---------------------------------------------------------------------------
// 1. MATHEMATICS & GENERAL MATHEMATICS
// ---------------------------------------------------------------------------
export const MATHEMATICS_CURRICULUM: LevelCurriculumMap = {
  'jss-1': {
    1: [
      'Whole Numbers: Counting, writing in millions & place value in base 10',
      'Prime Numbers, Factors, Multiples, LCM and HCF of two and three numbers',
      'Fractions: Proper, improper, mixed numbers, and equivalent fraction concepts',
      'Operations on Fractions: Addition, subtraction, multiplication & division of fractions',
      'Decimals and Percentages: Conversions and commercial market calculations',
      'Approximation and Estimation: Rounding off numbers to nearest tens, hundreds, and decimal places',
      'Introduction to Algebra: Symbols, variables, and open mathematical sentences',
      'Simplification of Algebraic Expressions and collecting like terms',
      'Simple Linear Equations in One Unknown Variable with balance method',
      'Word Problems Leading to Simple Linear Algebraic Equations'
    ],
    2: [
      'Directed Numbers: Addition and subtraction on the standard number line',
      'Multiplication and Division of Directed Numbers and sign convention rules',
      'Plane Geometry: Basic properties of angles on a straight line and at a point',
      'Angles on Parallel Lines: Vertically opposite, alternate, and corresponding angles',
      'Triangles: Classification by sides and angles, and angle sum of a triangle',
      'Quadrilaterals: Properties of square, rectangle, parallelogram, rhombus, and trapezium',
      'Perimeter of Regular and Irregular Plane Polygons',
      'Area of Rectangles, Squares, and Right-Angled Triangles in metric units',
      'Statistics: Purpose of statistics, data collection methods, and tally charts',
      'Data Presentation: Frequency tables, pictograms, and simple bar charts'
    ],
    3: [
      'Angles of Elevation and Depression: Elementary conceptual models and clinometer introduction',
      'Geometric Construction: Constructing 60°, 90°, and 30° angles using pair of compasses',
      'Bisection of Angles and Line Segments with compass and straight edge',
      'Three-Dimensional Solid Shapes: Identification of cubes, cuboids, cylinders, and spheres',
      'Properties of 3D Solids: Faces, vertices, and edges (Euler\'s formula verification)',
      'Volume of Cubes and Right Rectangular Prisms (Cuboids)',
      'Surface Area of Cubes and Cuboids using net expansion diagrams',
      'Measures of Central Tendency: Calculating the Mean and Mode of ungrouped data sets',
      'The Median of Ungrouped Numerical Data and Range determination',
      'Basic Probability: Chance, likelihood, rolling fair dice, and coin tossing experiments'
    ]
  },
  'jss-2': {
    1: [
      'Whole Numbers: Standard form and scientific notation (A × 10ⁿ, 1 ≤ A < 10)',
      'Prime Factorization: Expressing numbers as product of prime factors in index form',
      'Square Roots and Cube Roots: Factorization and table estimation methods',
      'Commercial Arithmetic: Profit and loss percentage, cost price and selling price calculations',
      'Simple Interest: Principal, rate, time, and total amount (I = PRT / 100)',
      'Compound Fractions: Mixed operations and hierarchy of arithmetic operations (BODMAS)',
      'Algebraic Expansion: Multiplying single terms over brackets a(b + c)',
      'Expansion of Binomial Products (a + b)(c + d) and algebraic identities',
      'Factorization of Algebraic Expressions by grouping common factors',
      'Linear Algebraic Inequalities: Representing inequalities on the number line'
    ],
    2: [
      'Linear Equations Involving Fractional Coefficients and cross-multiplication',
      'Word Problems on Linear Equations Involving Everyday Nigerian Trade Scenarios',
      'Pythagoras Theorem: Proof, right-angled triangles, and calculating hypotenuse length',
      'Applications of Pythagoras Theorem in 2D Plane Problems and ladder leaning questions',
      'Circumference and Area of Circles (C = 2πr, A = πr²) with fractional sector parts',
      'Area of Composite Figures: Combining rectangles, triangles, and semicircles',
      'Surface Area and Volume of Right Circular Cylinders',
      'Volume of Triangular Prisms and Trapezoidal Water Troughs',
      'Bearing and Scale Drawing: Cardinal points, compass bearings, and 3-figure bearings',
      'Angles of Elevation and Depression with Scale Drawing Solutions'
    ],
    3: [
      'Simultaneous Linear Equations in Two Unknowns: Solution by Substitution Method',
      'Simultaneous Linear Equations: Solution by Elimination Method',
      'Graphical Solution of Simultaneous Linear Equations on Cartesian graph paper',
      'Polygons: Sum of interior angles of an n-sided polygon ((n - 2) × 180°)',
      'Exterior Angles of Regular Polygons and calculating number of sides',
      'Transformation Geometry: Reflection across x-axis and y-axis on Cartesian plane',
      'Translation and Rotation of Simple Geometric Figures',
      'Statistics: Grouped frequency distribution tables and class intervals',
      'Histograms and Frequency Polygons for continuous grouped data sets',
      'Experimental versus Theoretical Probability and sample space analysis'
    ]
  },
  'jss-3': {
    1: [
      'Number Bases: Conversion from Base 10 to Base 2, Base 8, and other bases',
      'Number Bases: Conversion from Base 2 and other bases to Base 10 with expansion method',
      'Addition and Subtraction of Binary Numbers (Base 2)',
      'Modular Arithmetic: Addition, subtraction, and multiplication in finite clock systems',
      'Indices: Fundamental laws of multiplication, division, and zero index (aᵐ × aⁿ = aᵐ⁺ⁿ)',
      'Negative and Fractional Indices with practical evaluation examples',
      'Direct and Inverse Proportion: Variation equations and constant of proportionality',
      'Compound Interest: Step-by-step annual calculation without formula',
      'Depreciation and Hire Purchase Arithmetic in commercial transactions',
      'Change of Subject of Formulae in algebraic and scientific relations'
    ],
    2: [
      'Quadratic Expressions: Factorization of trinomials (x² + bx + c)',
      'Factorization of General Quadratic Expressions (ax² + bx + c) using product-sum method',
      'Difference of Two Squares: Algebraic factorization and quantitative mental shortcuts',
      'Solution of Quadratic Equations by the Factorization Method (ax² + bx + c = 0)',
      'Graph of Quadratic Functions: Table of values, plotting parabolic curves, and finding roots',
      'Trigonometric Ratios: Defining Sine, Cosine, and Tangent (SOH CAH TOA) in right triangles',
      'Application of Trigonometric Ratios to solve right-angled triangle lengths and acute angles',
      'Angles of Elevation and Depression using Trigonometric Ratio calculations',
      'Similar Shapes: Ratio of lengths, areas, and scale factors in scale reduction',
      'Geometry of the Circle: Tangent, chord, arc, segment, and sector properties'
    ],
    3: [
      'Circle Theorems: Angle subtended at the center is twice the angle subtended at the circumference',
      'Circle Theorems: Angles in the same segment of a circle are equal',
      'Angle in a Semicircle is a Right Angle (90°) and cyclic quadrilateral properties',
      'Geometric Construction: Constructing triangles, circumscribed circles, and inscribed circles',
      'Measures of Dispersion: Calculating the Range and Mean Deviation of discrete data',
      'Cumulative Frequency and Construction of Ogive Curves',
      'Median and Quartile Estimation from Cumulative Frequency Graph',
      'Comprehensive BECE Past Examination Theory Question Clinic',
      'Chief Examiner Pitfall Analysis in National and State Junior WAEC Mathematics',
      'Final BECE Examination Readiness and Timed Multi-Choice Speed Drills'
    ]
  },
  'sss-1': {
    1: [
      'Number Bases: Operations and equations involving fractional and negative bases',
      'Modular Arithmetic: Addition, subtraction, and multiplication in residue classes',
      'Indices: Comprehensive laws of indices and exponential equations',
      'Logarithms: Definition, relation to indices, characteristic, and mantissa calculations',
      'Use of Four-Figure Mathematical Tables for multiplication and division of large numbers',
      'Sets and Set Theory: Notation, finite, infinite, null sets, subsets, and universal sets',
      'Set Operations: Union, intersection, complement, and symmetric difference',
      'Venn Diagrams: Application of 2-set and 3-set Venn diagrams to real-world surveys',
      'Simple Algebraic Fractions: Undefined fractions, zero fractions, and simplification',
      'Operations on Algebraic Fractions: Addition, subtraction, multiplication, and division'
    ],
    2: [
      'Quadratic Equations: Solution by Factorization Method and Completing the Square Method',
      'The Quadratic Formula: Derivation (x = (-b ± √(b² - 4ac)) / 2a) and roots analysis',
      'The Discriminant (b² - 4ac): Nature of roots (real, equal, unequal, and imaginary)',
      'Simultaneous Linear and Quadratic Equations: One linear and one quadratic equation',
      'Linear Inequalities in Two Variables: Graphing feasible half-planes and boundary lines',
      'Lengths of Arcs and Perimeters of Sectors of Circles in radians and degrees',
      'Area of Sectors and Segments of Circles with trigonometric chord formulas',
      'Surface Area and Volume of Spheres, Hemispheres, and Frustums of Cones',
      'Trigonometric Ratios of Special Angles (0°, 30°, 45°, 60°, 90°) without tables',
      'Trigonometric Graphs: Graphing y = sin x and y = cos x for 0° ≤ x ≤ 360°'
    ],
    3: [
      'Logical Reasoning: Simple and compound statements, negations, conjunctions, and disjunctions',
      'Conditional Statements: Implication, converse, inverse, and contrapositive in mathematical proofs',
      'Angles of Elevation and Depression: 3D multi-plane bearing and distance calculations',
      'Three-Figure Bearings and Surveying Triangulation in regional navigation',
      'Circle Theorems I: Chord bisector theorem and angles at the center and circumference',
      'Circle Theorems II: Angles in alternate segments and intersecting chords theorem',
      'Measures of Central Tendency for Grouped Data: Calculating the Mean using assumed mean method',
      'Median and Modal Class of Grouped Frequency Distributions with histogram estimation',
      'Measures of Dispersion: Mean deviation and variance of grouped distributions',
      'Standard Deviation of Grouped Data Sets with continuous frequency intervals'
    ]
  },
  'sss-2': {
    1: [
      'Logarithms of Numbers Less than 1: Characteristics, negative mantissa, and decimal roots',
      'Approximations, Significant Figures, and Percentage Errors in industrial measurements',
      'Sequence and Series I: Arithmetic Progression (AP) - nth term formula (Tₙ = a + (n - 1)d)',
      'Sum of the First n Terms of an Arithmetic Progression (Sₙ = n/2(2a + (n - 1)d))',
      'Geometric Progression (GP): Common ratio and nth term formula (Tₙ = arⁿ⁻¹)',
      'Sum of Geometric Progression (Finite GP and Sum to Infinity: S_∞ = a / (1 - r))',
      'Applications of AP and GP to Financial Depreciation, Compound Interest, and Population Growth',
      'Quadratic Equations: Formation of quadratic equations given sum (α + β) and product (αβ) of roots',
      'Maximum and Minimum Values of Quadratic Functions and coordinates of the vertex',
      'Graphing Quadratic Functions and locating roots, axis of symmetry, and turning points'
    ],
    2: [
      'Simultaneous Linear and Non-Linear Equations with graphical intersection confirmation',
      'Gradient of a Curve: Tangent lines and conceptual introduction to Differential Calculus',
      'Differentiation from First Principles for polynomial functions (f\'(x) = lim(h→0) [f(x+h) - f(x)]/h)',
      'General Differentiation Rule: d/dx(axⁿ) = naxⁿ⁻¹ and differentiation of polynomial sums',
      'Tangent and Normal to a Curve: Equations of tangent lines at given coordinate points',
      'Chord Properties of Circles: Perpendicular from center bisects chord and equidistant chords',
      'Tangent Properties of Circles: Tangent is perpendicular to radius at point of contact',
      'Cyclic Quadrilaterals: Opposite angles are supplementary and exterior angle theorem',
      'The Sine Rule: a/sin A = b/sin B = c/sin C for solving non-right angled triangles',
      'The Cosine Rule: a² = b² + c² - 2bc cos A and application to navigation and surveying'
    ],
    3: [
      'Vectors in Two Dimensions: Representation, column vectors, position vectors, and magnitude',
      'Vector Operations: Addition, subtraction, scalar multiplication, and unit vectors',
      'Dot Product (Scalar Product) of two 2D vectors and calculating angle between vectors',
      'Coordinate Geometry I: Distance between two points and midpoint formula on Cartesian plane',
      'Coordinate Geometry II: Gradient of a line, parallel lines (m₁ = m₂), and perpendicular lines (m₁m₂ = -1)',
      'Equation of a Straight Line: Point-slope form, slope-intercept form (y = mx + c), and general form',
      'Probability I: Mutually exclusive and independent events with addition and multiplication laws',
      'Probability II: Conditional probability, outcome tables, and tree diagram analysis',
      'Cumulative Frequency Curves (Ogive): Median, upper quartile (Q₃), lower quartile (Q₁), and IQR',
      'Percentiles and Deciles from Ogive curves with pass-mark cutoff determination'
    ]
  },
  'sss-3': {
    1: [
      'Surds: Definition, conjugate surds, rationalization of monomial and binomial denominators',
      'Simplification of Complex Surdic Expressions and solving radical equations',
      'Matrices and Determinants: Order of matrices, addition, scalar multiplication, and matrix products',
      'Determinants of 2×2 and 3×3 Matrices: Expansion by minors and cofactors',
      'Inverse of a 2×2 Matrix and solving simultaneous linear equations using Cramer\'s Rule',
      'Differentiation: Product rule, quotient rule, and function of a function (Chain Rule)',
      'Second Derivatives and classification of stationary points (local maxima, local minima, points of inflection)',
      'Applications of Differentiation: Rates of change, velocity, acceleration, and real-life optimization',
      'Integration: Indefinite integral as reverse of differentiation and standard power rule (∫ xⁿ dx)',
      'Definite Integrals and Area Under Polynomial Curves bounded by the x-axis and vertical limits'
    ],
    2: [
      'Longitude and Latitude I: The Earth as a sphere, Great Circles (Equator, Meridians), and Small Circles (Parallels)',
      'Longitude and Latitude II: Calculation of distance along parallels of latitude (d = 2πR cos θ × α/360°)',
      'Longitude and Latitude III: Calculation of distance along great circles (meridians and equator)',
      'Nautical Miles, Knots, and Speed calculations in aviation and maritime navigation',
      'Surface Area and Volume of Spheres, Hemispheres, and Frustums of Pyramids and Cones',
      'Linear Programming: Formulation of linear inequalities from real-world manufacturing constraints',
      'Linear Programming: Graphing feasible polygonal regions and finding optimal vertices (Max/Min)',
      'Statistics: Grouped data variance, standard deviation, and coefficient of variation calculations',
      'Bivariate Data and Scatter Plots: Line of best fit, positive, negative, and zero correlation',
      'WAEC Chief Examiner Pitfall Analysis on Multi-Step Theory and Proof Construction'
    ],
    3: [
      'WASSCE General Mathematics Comprehensive Revision: Numbers, Numeration, and Modular Systems',
      'WASSCE Revision: Algebraic Processes, Quadratic/Simultaneous Systems, and Linear Programming',
      'WASSCE Revision: Plane Geometry, Circle Theorems, and Formal Proof Verification',
      'WASSCE Revision: Trigonometry, Bearings, 3D Elevation, and Sine/Cosine Rules',
      'WASSCE Revision: Mensuration, Longitude & Latitude Navigation, and Volume Calculations',
      'WASSCE Revision: Differential and Integral Calculus High-Yield Problems',
      'WASSCE Revision: Statistics, Grouped Variance, and Cumulative Frequency Masterclass',
      'WASSCE Revision: Probability Laws, Tree Diagrams, and Permutations/Combinations',
      'Timed Mock Examination Simulation: WAEC Paper 1 (50 Objectives in 90 Minutes)',
      'Timed Mock Examination Simulation: WAEC Paper 2 (Theory Compulsory & Optional Sections)'
    ]
  }
};

// ---------------------------------------------------------------------------
// 2. ENGLISH STUDIES & ENGLISH LANGUAGE
// ---------------------------------------------------------------------------
export const ENGLISH_CURRICULUM: LevelCurriculumMap = {
  'jss-1': {
    1: [
      'Parts of Speech: Nouns (Common, proper, collective, abstract, and countable/uncountable)',
      'Pronouns: Personal, possessive, relative pronouns, and antecedent agreement rules',
      'Verbs: Action verbs, auxiliary verbs (primary and modal), and basic subject-verb concord',
      'Adjectives and Adverbs: Types, comparative and superlative degrees, and position in sentences',
      'Reading Comprehension: Skimming, scanning, topic sentences, and contextual vocabulary',
      'Descriptive Composition: "My School / My Local Community Market"',
      'Speech Work: Pure vowel sounds (monophthongs) - Long and short vowel contrasts (/i:/ vs /ɪ/)',
      'Prepositions and Conjunctions: Coordinating and subordinating conjunctions in simple sentences',
      'Informal Letter Writing: Features, layout, and writing a letter to a friend describing holiday',
      'Literature-in-English: Folktales, oral proverbs, dramatic role-play, and African oral lore'
    ],
    2: [
      'Tenses: Present tense, past tense, present continuous, and past continuous tenses',
      'Formal Letter Writing: Application for admission or casual leave to the school principal',
      'Speech Work: Diphthongs (/eɪ/, /aɪ/, /ɔɪ/, /aʊ/, /əʊ/) and contrast word pairs',
      'Expository Composition: "The Importance of Education in Modern Nigeria"',
      'Vocabulary Development: Words associated with hospital, healthcare, and disease prevention',
      'Punctuation Marks: Capital letters, full stops, question marks, and exclamation marks',
      'Direct and Indirect Speech: Elementary conversions of statements and reporting verbs',
      'Reading Comprehension: Identifying cause-and-effect relationships in passages',
      'Literature-in-English: Introduction to African poetry (stanza, rhythm, and imagery)',
      'Argumentative Essay: "Day Schools are Better than Boarding Schools for Young Learners"'
    ],
    3: [
      'Grammar: Active voice versus passive voice in simple present and past sentences',
      'Sentence Types: Simple sentences, compound sentences, and compound-complex structures',
      'Speech Work: Consonant sounds - Plosives (/p/, /b/, /t/, /d/, /k/, /g/) and fricatives (/f/, /v/)',
      'Narrative Composition: "An Unforgettable Experience in My Primary School"',
      'Vocabulary Development: Words associated with agriculture, farming, and food processing',
      'Summary Writing: Identifying main ideas from illustrative paragraphs in narrative prose',
      'Idiomatic Expressions and Colloquialisms: Meaning and contextual application',
      'Literature-in-English: Elements of drama (dialogue, stage directions, protagonist, antagonist)',
      'Informal Letter Writing: Writing to a sibling describing an inter-house sports festival',
      'Question Tags and Negative Responses in everyday spoken English'
    ]
  },
  'jss-2': {
    1: [
      'Grammar: Subject-Verb Agreement (Concord Rules I - Singular subjects take singular verbs)',
      'Concord Rules II: Subjects joined by "either...or", "neither...nor", "as well as", "together with"',
      'Nouns: Noun phrases as subjects, direct objects, and subject complements',
      'Speech Work: Vowel contrasts (/æ/ vs /ɑ:/, /ɒ/ vs /ɔ:/) with pronunciation drills',
      'Narrative Essay: "How I Spent My Last Long Vacation with My Grandparents"',
      'Reading Comprehension: Inferring author\'s attitude, tone, and rhetorical purpose',
      'Vocabulary Development: Words associated with government, elections, and public administration',
      'Formal Letter Writing: Letter of complaint to a business or municipal authority',
      'Punctuation Marks: Apostrophe for possession and contraction; commas in lists and apposition',
      'Literature-in-English: African prose study (setting, plot development, and character motivation)'
    ],
    2: [
      'Grammar: The Present Perfect Tense versus Past Perfect Tense with auxiliary "have/had"',
      'Clauses: Dependent (subordinate) clauses versus independent (main) clauses',
      'Adverbial Clauses: Adverbial clauses of time, place, manner, and condition',
      'Speech Work: Voiced and voiceless dental fricatives (/θ/ as in "think" vs /ð/ as in "this")',
      'Expository Composition: "Causes and Consequences of Road Traffic Accidents in Nigeria"',
      'Reading Comprehension: Distinguishing factual statements from subjective opinions',
      'Vocabulary Development: Words associated with commerce, banking, money, and stock market',
      'Semi-Formal Letter Writing: Writing to an elderly neighbor or family artisan',
      'Summary Writing: Condensing a 300-word passage into a 2-sentence summary without loss of meaning',
      'Literature-in-English: African drama (conflict, dramatic irony, climax, and catharsis)'
    ],
    3: [
      'Grammar: Transitive and Intransitive Verbs with direct and indirect objects',
      'Phrasal Verbs: Common phrasal verbs with "look", "take", "give", "break", and their meanings',
      'Speech Work: Consonant clusters at word-initial and word-final positions (e.g. "spl-", "str-", "-cts")',
      'Argumentative Essay: "Technology Has Done More Good than Harm to Nigerian Teenagers"',
      'Vocabulary Development: Words associated with telecommunications, internet, and mobile devices',
      'Articles: Definite article "the" and indefinite articles "a/an" with phonetic exceptions',
      'Direct and Indirect Speech: Shifting tenses and pronouns in questions and commands',
      'Literature-in-English: Poetic devices (metaphor, simile, personification, hyperbole, onomatopoeia)',
      'Speech Work: Word stress on two-syllable words (nouns versus verbs: \'record vs re\'cord)',
      'Comprehensive Grammar Drills and Writing Mechanics Clinic'
    ]
  },
  'jss-3': {
    1: [
      'Grammar: Complex Sentences - Main clauses and multiple subordinate clauses',
      'Relative Clauses: Defining and non-defining relative clauses with "who", "which", "that", "whose"',
      'Noun Clauses: Functions as subject, object of verb, object of preposition, and in apposition',
      'Speech Work: Diphthongs (/ɪə/, /eə/, /ʊə/) and centering triphthongs',
      'Article Writing: Writing articles for publication in a school magazine or national daily',
      'Reading Comprehension: Critical analysis of editorial prose and propaganda techniques',
      'Vocabulary Development: Words associated with legal systems, court trials, and judicial administration',
      'Formal Letter Writing: Application for secondary school scholarship or bursary support',
      'Hyphens, Dashes, Colons, and Semicolons: Advanced punctuation rules in complex prose',
      'Literature-in-English: Prescribed African drama text analysis for BECE examination'
    ],
    2: [
      'Grammar: Conditional Clauses (Type 1: Real/Probable, Type 2: Unreal, Type 3: Impossible past)',
      'Modals of Obligation and Deduction: "Must", "ought to", "should", "can\'t have", "must have"',
      'Speech Work: Consonant contrasts (/s/ vs /z/, /ʃ/ vs /ʒ/) with minimal word pairs',
      'Speech Writing: Writing a campaign speech for Senior Prefect or Student Representative Council',
      'Expository Essay: "The Role of Youth in Combating Corruption and Indiscipline in Nigeria"',
      'Vocabulary Development: Words associated with science, scientific research, and laboratory trials',
      'Summary Writing: Answering WAEC/BECE format summary questions with numbered concise points',
      'Report Writing: Formal report on an investigation into a laboratory fire or sports dispute',
      'Literature-in-English: Prescribed African poetry explication (themes, tone, mood, and diction)',
      'Informal Letter: Giving advice to a junior student on preparing for national examinations'
    ],
    3: [
      'Grammar: Subject-Verb Concord in Complex and Inverted Sentences',
      'Active and Passive Voice Transformation in Technical and Formal Reporting',
      'Speech Work: Sentence stress, intonation patterns (falling tune for statements, rising tune for questions)',
      'Argumentative Essay: "Female Child Education is as Vital as Male Child Education in Nigeria"',
      'Vocabulary Development: Synonyms, antonyms, and homophones in secondary examination tests',
      'BECE English Language Past Question Clinic: Lexis and Structure Section Analysis',
      'BECE Essay Writing Clinic: Time allocation, paragraph development, and grading rubrics',
      'BECE Comprehension and Summary Clinic: Eliminating extraneous material and verbatim lifting',
      'Literature-in-English: Prescribed prose and drama character sketches and thematic comparisons',
      'Final BECE Mock Examination Drills and Oral English Speed Test'
    ]
  },
  'sss-1': {
    1: [
      'Nouns and Noun Phrases: Internal structure, pre-modifiers, post-modifiers, and syntactic functions',
      'Pronouns and Case: Subjective, objective, possessive, reflexive, and demonstrative pronoun precision',
      'Verbs and Verbal Patterns: Finite, non-finite, gerunds, participles, and the subjunctive mood',
      'Adjectival Phrases and Clauses: Identification, functions, and punctuation in formal prose',
      'Speech Work: Monophthongs - Complete 12 pure vowel chart and phonetic transcription drills',
      'Descriptive Composition: "The Architectural Landscape of a Nigerian Megacity (Lagos / Abuja)"',
      'Reading Comprehension: Structural analysis of narrative prose and deducing contextual meanings',
      'Vocabulary Development: Words associated with agriculture, animal husbandry, and commodity marketing',
      'Formal Letter Writing: Letter of application for vacation employment with attached Curriculum Vitae',
      'Literature-in-English: Introduction to African drama prescribed by WAEC (exposition and background)'
    ],
    2: [
      'Tenses and Aspect: Present perfect continuous, past perfect continuous, and future perfect tenses',
      'Adverbial Clauses: Clauses of concession ("although", "even though"), result, and comparison',
      'Speech Work: Diphthongs - Complete 8 diphthongs with phonetic transcription and oral practice',
      'Expository Composition: "Harnessing Renewable Energy Sources to Solve Nigeria\'s Power Crisis"',
      'Vocabulary Development: Words associated with medicine, epidemiology, public health, and immunology',
      'Punctuation Mechanics: Inverted commas, ellipses, brackets, and capitalization conventions',
      'Summary Writing: Distinguishing main ideas from thematic illustrations in argumentative texts',
      'Semi-Formal Letter Writing: Letter to a school patron or community leader requesting sponsorship',
      'Direct and Indirect Speech: Advanced conversion of dialogues, questions, and exclamations',
      'Literature-in-English: Prescribed African poetry (thematic exploration and structural analysis)'
    ],
    3: [
      'Grammar: The Passive Voice in Academic and Scientific Discourse',
      'Nominalization: Forming nouns from verbs, adjectives, and roots for concise academic style',
      'Speech Work: Consonants - Fricatives, affricates (/tʃ/, /dʒ/), nasals (/m/, /n/, /ŋ/), and laterals',
      'Argumentative Essay: "The Introduction of Artificial Intelligence in Schools Will Harm Critical Thinking"',
      'Vocabulary Development: Words associated with petroleum exploration, refining, and mining in Nigeria',
      'Article Writing: Opinion editorial on "Reforming Youth Skills Acquisition in West Africa"',
      'Idioms and Phrasal Verbs in Formal Discourse: Avoiding cliches and slang in WASSCE writing',
      'Speech Work: Syllables, syllable division, and stress placement in polysyllabic words',
      'Literature-in-English: Prescribed Non-African prose (setting, character analysis, and narrative point of view)',
      'Comprehensive SSS 1 English Examination Masterclass and Script Moderation Review'
    ]
  },
  'sss-2': {
    1: [
      'Grammar: Advanced Concord Rules (Proximity, pseudo-coordination, fractional expressions, collectives)',
      'Clauses in Syntactic Combinations: Coordination, subordination, and parenthetical insertions',
      'Speech Work: Stress in words with prefixes and suffixes (derivational vs inflectional morphology)',
      'Narrative Composition: "An Unexpected Turn of Events During a National Youth Camp"',
      'Reading Comprehension: Rhetorical devices (irony, sarcasm, paradox, litotes, oxymoron, bathos)',
      'Vocabulary Development: Words associated with law, justice, courts, prosecution, and jurisprudence',
      'Formal Letter Writing: Petition to a State Commissioner of Education concerning school infrastructure',
      'Summary Writing: Writing a concise 60-word summary addressing two specific prompt requirements',
      'Speech Work: Emphatic stress - Contrastive accentuation and identifying implied communicative focus',
      'Literature-in-English: Prescribed Shakespearean drama (Act I and Act II analysis, dramatic irony)'
    ],
    2: [
      'Grammar: Modal Auxiliaries in Nuanced Discourse (Possibility, deduction, probability, necessity)',
      'Prepositional Phrases and Idiomatic Preposition Usage (e.g. "comply with", "protest against")',
      'Speech Work: Weak forms of grammatical words in connected speech (auxiliaries, prepositions, pronouns)',
      'Expository Essay: "Inflationary Pressures on the Cost of Living in West Africa: Causes and Solutions"',
      'Vocabulary Development: Words associated with banking, monetary policy, foreign exchange, and inflation',
      'Speech Writing: Formal address delivered at a high-level academic valedictory banquet',
      'Informal Letter Writing: Writing to a close family friend studying abroad about national affairs',
      'Summary Writing: Eliminating tautology, verbosity, and redundant modifiers in summary drafting',
      'Literature-in-English: Prescribed African drama (Act III and IV climax, dramatic conflict, and tension)',
      'Speech Work: Intonation patterns - The falling tune (wh-questions, commands), rising tune (polar questions)'
    ],
    3: [
      'Grammar: Inversion of Subject and Verb for Rhetorical Emphasis ("Hardly had...", "Not only...")',
      'Subjunctive Mood and Counter-Factual Conditionals in sophisticated analytical writing',
      'Speech Work: Silent letters in English spelling (e.g. "debt", "doubt", "subtle", "corps", "psychology")',
      'Argumentative Essay: "Privatization of Public Utilities is Detrimental to Low-Income Citizens"',
      'Vocabulary Development: Words associated with print and broadcast journalism, media, and publishing',
      'Report Writing: Investigatory committee report on examination malpractice with formal recommendations',
      'Collocations and Register: Domain-specific lexis in science, law, commerce, and sports',
      'Speech Work: Intonation in tag questions (genuine inquiry vs seeking confirmation)',
      'Literature-in-English: Prescribed Non-African poetry (themes of mortality, existentialism, and nature)',
      'Annual SSS 2 WASSCE Preparation Seminar and Multi-Format Paper Mock'
    ]
  },
  'sss-3': {
    1: [
      'Grammar: Complex Syntactic Inversion, Fronting, and Cleft Sentences for stylistic mastery',
      'Grammatical Ambiguity: Structural ambiguity, lexical ambiguity, and techniques for syntactic clarity',
      'Speech Work: Advanced phonetic transcription of complex multi-syllabic lexical items',
      'WASSCE Continuous Writing: Planning, thesis formulation, transition signals, and concluding impact',
      'Reading Comprehension: Deciphering dense academic, socio-philosophical, and scientific passages',
      'Vocabulary Development: High-frequency WASSCE lexis across government, economy, science, and arts',
      'Formal Letter Writing: Formal letter to international scholarship donor defending funding eligibility',
      'Summary Writing: Answering WAEC Paper 2 summary questions scoring maximum marks for conciseness',
      'Speech Work: Rhyme schemes, vowel-consonant harmony, and poetic phonology in oral examinations',
      'Literature-in-English: Prescribed African and Non-African texts thematic synthesis and character foil'
    ],
    2: [
      'Grammar: Punctuation Masterclass - Mastering semicolons, colons, em-dashes, and quotation integrity',
      'Lexis and Structure: Tackling 80 WAEC Paper 1 objective questions with systematic elimination strategies',
      'Speech Work: Oral English Section Analysis (Vowels, consonants, rhymes, word stress, sentence stress)',
      'Article Writing: Thought-leadership essay for international publication on African economic transformation',
      'Speech Writing: Valedictory speech for secondary graduation ceremonies with memorable rhetoric',
      'Summary Writing: Real-time timed summary drills adhering to WAEC word count and penalty deductions',
      'Vocabulary Development: Antonyms, synonyms, homophones, and idioms in past WASSCE papers',
      'WASSCE Chief Examiner Marking Rubric Clinic: Content, Organization, Expression, and Mechanical Accuracy',
      'Literature-in-English: WAEC Paper 1 (Objectives) and Paper 2 (Drama and Poetry) speed clinics',
      'Timed WASSCE Essay Writing Simulation: Producing 450 words in 50 minutes with flawless mechanics'
    ],
    3: [
      'WASSCE English Language Intensive Marathon: Grammar, Syntax, and Concord Diagnostic Clinic',
      'WASSCE Marathon: Formal, Informal, and Semi-Formal Letter Writing Exemplars and Pitfalls',
      'WASSCE Marathon: Argumentative, Expository, Narrative, and Descriptive Essay Blueprints',
      'WASSCE Marathon: Article, Speech, and Report Writing Model Scripts Analysis',
      'WASSCE Marathon: Reading Comprehension Speed Reading and Contextual Vocabulary Tactics',
      'WASSCE Marathon: Summary Writing Flawless Execution - 30 Marks Guaranteed Strategy',
      'WASSCE Marathon: Oral English Paper 3 Complete Revision (100 Objective Questions Drill)',
      'Literature-in-English: Complete Dossier on African Prose, Drama, and Poetry (Paper 1 & 2)',
      'Literature-in-English: Complete Dossier on Non-African Prose, Drama, and Poetry (Paper 1 & 2)',
      'Final National and Regional Mock Examination: 100% WASSCE Aligned Testing & Debrief'
    ]
  }
};

// ---------------------------------------------------------------------------
// 3. CHEMISTRY (SSS 1–3)
// ---------------------------------------------------------------------------
export const CHEMISTRY_CURRICULUM: LevelCurriculumMap = {
  'sss-1': {
    1: [
      'Introduction to Chemistry: Scientific method, branches, and career paths in chemical industries',
      'Particulate Nature of Matter: Kinetic theory, diffusion, osmosis, and Brownian motion',
      'Atomic Structure: Subatomic particles, atomic number, mass number, and isotopic abundances',
      'Dalton\'s Atomic Theory and Modern Modifications by Thomson, Rutherford, and Bohr',
      'Chemical Symbols, Valency, and Writing Chemical Formulae of Binary and Polyatomic Compounds',
      'Balancing Chemical Equations by Inspection and state symbols (s, l, g, aq)',
      'Chemical Bonding: Electrovalent (ionic) bonding, electron transfer, and lattice structures',
      'Covalent Bonding: Single, double, and triple bonds, coordinate dative bonding, and shapes of molecules',
      'States of Matter and Gas Laws: Kinetic molecular model of solids, liquids, and gases',
      'Gas Laws Calculations: Boyle\'s law, Charles\'s law, General Gas Equation, and Graham\'s law of diffusion'
    ],
    2: [
      'Standard Temperature and Pressure (s.t.p.) and Ideal Gas Equation (PV = nRT)',
      'Gay-Lussac\'s Law of Combining Volumes and Avogadro\'s Law',
      'The Mole Concept: Molar mass, Avogadro\'s constant (6.02 × 10²³), and mass-mole conversions',
      'Empirical and Molecular Formulae: Calculation from percentage composition by mass',
      'Stoichiometry of Chemical Reactions: Mole ratios and mass-volume relationships in gas reactions',
      'Acids, Bases, and Salts I: Physical and chemical properties, Arrhenius and Bronsted-Lowry definitions',
      'Acids, Bases, and Salts II: Basicity of acids, preparation of salts (precipitation, neutralization)',
      'The pH Scale and Indicators: Measuring acidity and basicity using universal indicator and pH meters',
      'Carbon and its Allotropes: Diamond, graphite, fullerenes, and amorphous carbon properties',
      'Oxides of Carbon: Carbon (II) oxide and Carbon (IV) oxide - Preparation, properties, and greenhouse effect'
    ],
    3: [
      'Periodic Table I: Historical development (Mendeleev, Moseley) and modern periodic law',
      'Periodic Table II: Electronic configurations and classification into s, p, d, f blocks',
      'Periodic Trends: Atomic radius, ionic radius, ionization energy, electronegativity, and electron affinity',
      'Group 1 Alkali Metals and Group 2 Alkaline Earth Metals: Physical and chemical trends',
      'Group 7 Halogens: Fluorine, chlorine, bromine, iodine - Laboratory preparation and displacement reactions',
      'Water and Solutions: Hard water (temporary and permanent hardness) and softening methods',
      'Solubility of Solids in Liquids: Saturated, unsaturated, and supersaturated solutions',
      'Solubility Curves: Plotting solubility curves, fractional crystallization, and industrial salt recovery',
      'Air Pollution and Atmospheric Chemistry: Acid rain, ozone depletion, and carbon monoxide toxicity',
      'Comprehensive SSS 1 Chemistry Revision, Laboratory Glassware Clinic, and Safety Assessment'
    ]
  },
  'sss-2': {
    1: [
      'Periodic Table and Periodicity: Advanced electronic configuration (Aufbau principle, Hund\'s rule, Pauli principle)',
      'Oxidation-Reduction (Redox) Reactions: Electron transfer, oxidation numbers, and balancing half-equations',
      'Oxidizing and Reducing Agents: Identification using acidified KMnO₄ and acidified K₂Cr₂O₇',
      'Rates of Chemical Reactions: Collision theory, activation energy, and factors affecting reaction rate',
      'Chemical Equilibrium: Dynamic equilibrium, reversible reactions, and Le Chatelier\'s principle',
      'Equilibrium Shift Calculations: Effect of temperature, pressure, and concentration on equilibrium constant (Kc)',
      'Acids, Bases, Salts and pH Concept: Weak acid dissociation constants (Ka), pOH, and Kw calculation',
      'Hydrolysis of Salts: Acidity or basicity of salt solutions (NH₄Cl, CH₃COONa, Na₂CO₃)',
      'Mass and Volume Concentration: Molarity (mol/dm³), mass concentration (g/dm³), and standard solutions',
      'Volumetric Analysis I: Acid-base titrations, choice of indicators (phenolphthalein vs methyl orange)'
    ],
    2: [
      'Volumetric Analysis II: Calculations of molar concentration, percentage purity, and water of crystallization',
      'Thermochemistry: Exothermic and endothermic reactions, enthalpy changes (ΔH), and Hess\'s Law',
      'Enthalpy of Neutralization, Solution, Combustion, and Formation measurements',
      'Electrochemistry I: Electrolysis - Principles, electrolytic cells, cathode and anode reactions',
      'Preferential Discharge of Ions: Factors affecting discharge (position in electrochemical series, concentration)',
      'Faraday\'s Laws of Electrolysis: First law (m = zIt) and Second law calculations with Faraday constant (96,500 C)',
      'Industrial Applications of Electrolysis: Electroplating, electro-refining of copper, and extraction of aluminium',
      'Electrochemical Cells: Galvanic/Daniell cell, standard electrode potential (E°), and cell electromotive force',
      'Corrosion of Metals: Mechanism of rusting in iron and prevention methods (galvanization, cathodic protection)',
      'Chemical Energetics: Entropy (S) and Gibbs Free Energy (ΔG = ΔH - TΔS) as criteria for reaction spontaneity'
    ],
    3: [
      'Introduction to Organic Chemistry: Tetravalency and catenation of carbon, hybridisation (sp³, sp², sp)',
      'Hydrocarbons: Classification into aliphatic (alkanes, alkenes, alkynes) and aromatic (benzene)',
      'Alkanes (Paraffins): Homologous series, IUPAC nomenclature, isomerism, and fractional distillation of petroleum',
      'Chemical Reactions of Alkanes: Combustion and free-radical substitution (chlorination mechanism)',
      'Alkenes (Olefins): IUPAC nomenclature, geometrical isomerism, and laboratory preparation of ethene',
      'Chemical Reactions of Alkenes: Addition reactions (hydrogenation, halogenation, hydration) and Markownikoff\'s rule',
      'Alkynes: IUPAC nomenclature, preparation of ethyne, chemical reactions, and tests for terminal alkynes',
      'Benzene and Aromatic Compounds: Resonance structure, stability, and electrophilic substitution reactions',
      'Qualitative Analysis I: Identification of cations (Cu²⁺, Fe²⁺, Fe³⁺, Al³⁺, Zn²⁺, Pb²⁺, Ca²⁺, NH₄⁺)',
      'Qualitative Analysis II: Identification of anions (CO₃²⁻, SO₄²⁻, SO₃²⁻, Cl⁻, NO₃⁻, S²⁻) and confirmatory tests'
    ]
  },
  'sss-3': {
    1: [
      'Organic Chemistry: Alkanols (Alcohols) - Classification (primary, secondary, tertiary), preparation, and oxidation',
      'Alkanoic Acids: IUPAC nomenclature, preparation, weak acidity, and salt formation',
      'Esters (Alkyl Alkanoates): Esterification reactions, pleasant fruity aromas, and alkaline hydrolysis (saponification)',
      'Fats, Oils, and Soaps: Manufacture of soap from palm oil, detergent action, and hard water scum formation',
      'Extraction of Metals: General principles (pyrometallurgy, electrometallurgy), extraction of Iron in Blast Furnace',
      'Extraction of Aluminium from Bauxite (Hall-Heroult Process) and industrial importance',
      'Extraction and Purification of Copper: Smelting, converting, and electrolytic refining',
      'Alloys: Composition, properties, and uses of bronze, brass, steel, stainless steel, and duralumin',
      'Qualitative Analysis Laboratory Intensive: Complete systematic identification of unknown salts (WAEC Practical Paper)',
      'Volumetric Titration Masterclass: Double titrations, redox titrations with KMnO₄, and chief examiner accuracy marking'
    ],
    2: [
      'Macromolecules & Polymers: Natural polymers (rubber, cellulose, starch, proteins) and synthetic polymers (plastics, nylon)',
      'Addition versus Condensation Polymerization: Mechanism, monomer units, and structural equations',
      'Carbohydrates: Monosaccharides (glucose, fructose), disaccharides (sucrose, maltose), polysaccharides (starch, cellulose)',
      'Proteins: Amino acids, peptide bonds, denaturation of proteins, and biochemical tests (Biuret, Million\'s, Xanthoproteic)',
      'Nuclear Chemistry: Natural and artificial radioactivity, alpha, beta, and gamma radiation properties',
      'Nuclear Reactions: Balancing nuclear transmutation equations, half-life (t_1/2) calculations, and carbon dating',
      'Nuclear Fission and Nuclear Fusion: Energy release (E = mc²) and applications in nuclear power and medicine',
      'Industrial Chemical Processes: Contact Process for H₂SO₄, Haber Process for NH₃, and Ostwald Process for HNO₃',
      'Chemical Waste Management, Heavy Metal Toxicity (Lead, Mercury), and Industrial Environmental Safety',
      'WASSCE Chemistry Chief Examiner Marking Guide Clinic: Section A Objectives and Section B Theory Blueprints'
    ],
    3: [
      'WASSCE Chemistry Intensive Revision: Physical Chemistry (Atomic structure, gas laws, thermodynamics, kinetics)',
      'WASSCE Revision: Inorganic Chemistry (Periodic table trends, non-metals, extraction of metals, and compounds)',
      'WASSCE Revision: Organic Chemistry (Hydrocarbons, functional groups, reactions, and polymer mechanisms)',
      'WASSCE Revision: Stoichiometry, Mole Concept, and Chemical Calculation Accuracy Drills',
      'WASSCE Practical Chemistry Laboratory Simulation I: Full Quantitative Acid-Base Titration (Paper 3)',
      'WASSCE Practical Chemistry Laboratory Simulation II: Full Qualitative Salt Analysis and Gas Identification',
      'WASSCE Practical Chemistry Laboratory Simulation III: General Laboratory Apparatus and Titration Error Analysis',
      'Timed WASSCE Objective Exam Clinic: 50 Questions in 60 Minutes Speed Strategy',
      'Timed WASSCE Theory Exam Clinic: Multi-Step Essay Explanations and Chemical Equation Balancing',
      'Final National and Regional Mock Examination: 100% WASSCE Aligned Testing & Debrief'
    ]
  }
};

// ---------------------------------------------------------------------------
// 4. PHYSICS (SSS 1–3)
// ---------------------------------------------------------------------------
export const PHYSICS_CURRICULUM: LevelCurriculumMap = {
  'sss-1': {
    1: [
      'Fundamental and Derived Physical Quantities and Standard SI Metric Units',
      'Dimensions of Physical Quantities and Dimensional Analysis Verification',
      'Measurement of Length, Mass, and Time: Vernier calipers, micrometer screw gauge, and stopwatches',
      'Position, Distance, and Displacement: Scalar and vector quantities, and rectangular resolution of vectors',
      'Concept of Motion: Types of motion (translational, rotational, oscillatory, random) and causes of motion',
      'Speed, Velocity, and Uniform Acceleration: Definitions, formulas, and ticker-tape timer analysis',
      'Rectilinear Motion and Equations of Uniformly Accelerated Motion (v = u + at, s = ut + 1/2at², v² = u² + 2as)',
      'Motion Under Gravity: Free fall, vertical projection, time of flight, and maximum height reached',
      'Graphical Analysis of Motion: Displacement-time and velocity-time graphs (gradient and area calculations)',
      'Scalars and Vectors: Vector addition using triangle of vectors, parallelogram law, and polygon of vectors'
    ],
    2: [
      'Force and Newton\'s Laws of Motion I: Newton\'s First Law and the concept of inertia',
      'Newton\'s Second Law: Force, mass, and acceleration (F = ma) with impulse and momentum (FΔt = Δp)',
      'Newton\'s Third Law: Action and reaction pairs, conservation of linear momentum, and rocket propulsion',
      'Friction: Solid friction (static and dynamic), laws of friction, coefficient of friction (μ = F/R)',
      'Work, Energy, and Power: Scientific definitions, work done by constant forces (W = Fd cos θ)',
      'Forms of Energy and Law of Conservation of Energy: Kinetic energy (1/2mv²) and potential energy (mgh)',
      'Mechanical Power (P = W/t = Fv) and percentage efficiency of energy conversion machines',
      'Simple Machines: Mechanical Advantage (MA), Velocity Ratio (VR), and Efficiency (η = MA/VR × 100%)',
      'Types of Simple Machines: Levers, pulleys, inclined plane, wheel and axle, screw, and hydraulic press',
      'Circular Motion: Centripetal acceleration (a = v²/r) and centripetal force (F = mv²/r) in banking of roads'
    ],
    3: [
      'Concept of Heat and Temperature: Thermometers, thermometric properties, and scale calibration (Celsius, Kelvin)',
      'Thermal Expansion of Solids: Linear expansivity (α), superficial expansivity (β), and cubical expansivity (γ)',
      'Anomalous Expansion of Water between 0°C and 4°C and ecological importance to aquatic life',
      'Real and Apparent Expansivity of Liquids with dilatometer measurements',
      'Gas Laws from Physics Perspective: Molecular interpretation of pressure, volume, and temperature',
      'Heat Transfer Mechanisms: Conduction, thermal conductivity, convection, and radiation (Stefan-Boltzmann law)',
      'Applications of Heat Transfer: Vacuum flask (Thermos), domestic water heating, and sea/land breezes',
      'Introduction to Wave Motion: Mechanical and electromagnetic waves, transverse and longitudinal waves',
      'Wave Parameters: Wavelength (λ), frequency (f), period (T), amplitude (A), and wave equation (v = fλ)',
      'Comprehensive SSS 1 Physics Laboratory Practical Clinic and Measurement Precision Assessment'
    ]
  },
  'sss-2': {
    1: [
      'Projectiles: Horizontal projection, projection at an angle to the horizontal, trajectory equation',
      'Calculations in Projectile Motion: Time of flight (T = 2u sin θ/g), maximum height (H = u² sin² θ/2g), horizontal range (R = u² sin 2θ/g)',
      'Simple Harmonic Motion (SHM): Definition (a = -ω²x), simple pendulum, mass on a helical spring',
      'Calculations in SHM: Period of simple pendulum (T = 2π√(l/g)), period of spring (T = 2π√(m/k)), energy in SHM',
      'Rotational Dynamics: Angular velocity (ω), torque, moment of inertia (I), angular momentum conservation',
      'Equilibrium of Forces: Concurrent forces, coplanar forces, conditions for equilibrium of rigid bodies',
      'Moments of a Force and Couples: Principle of moments, center of gravity, and stability of equilibrium',
      'Elastic Properties of Solids: Hooke\'s law (F = ke), stress, strain, Young\'s modulus (E = stress/strain)',
      'Fluid Mechanics: Density, relative density, pressure in liquids (P = hρg), and Pascal\'s principle',
      'Archimedes\' Principle and Law of Flotation: Buoyant upthrust and hydrometer applications'
    ],
    2: [
      'Heat Energy and Heat Capacity: Specific heat capacity (Q = mcΔθ) and method of mixtures calculations',
      'Latent Heat: Specific latent heat of fusion (Q = mL_f) and specific latent heat of vaporization (Q = mL_v)',
      'Evaporation versus Boiling: Vapor pressure, saturated and unsaturated vapors, and atmospheric boiling point',
      'Humidity and Hygrometry: Relative humidity, dew point, wet-and-dry bulb hygrometer, and cloud formation',
      'Reflection of Light at Plane Surfaces: Laws of reflection, regular vs diffuse reflection, periscope and mirrors',
      'Reflection at Curved Surfaces: Concave and convex spherical mirrors, mirror formula (1/f = 1/u + 1/v), magnification',
      'Refraction of Light at Plane Surfaces: Laws of refraction, Snell\'s law, refractive index (n = sin i / sin r)',
      'Total Internal Reflection and Critical Angle: Optical fibres, mirages, and prism periscopes',
      'Refraction Through Lenses: Convex and concave lenses, lens formula (1/f = 1/u + 1/v), and ray tracing',
      'Optical Instruments: The human eye versus the photographic camera, simple and compound microscopes, astronomical telescope'
    ],
    3: [
      'Dispersion of White Light: Spectrum, prism refraction, pure spectrum production, and rainbow formation',
      'Electromagnetic Spectrum: Order of wavelengths, detection methods, and applications (radio, microwaves, IR, UV, X-rays, gamma)',
      'Sound Waves: Production, propagation through media, speed of sound in air, solids, and liquids',
      'Characteristics of Sound: Pitch, loudness, quality (timbre), and musical scales',
      'Echoes and Acoustics: Speed of sound measurement by echo, sonar navigation, and reverberation in auditoriums',
      'Vibrations in Strings and Pipes: Fundamental frequency, harmonics, overtones in closed and open organ pipes',
      'Resonance: Acoustical resonance, resonance tube experiment, and end correction calculations',
      'Electrostatics I: Production of static electricity, conductors and insulators, Coulomb\'s inverse square law',
      'Electrostatics II: Electric field intensity (E = F/q), electric potential (V), equipotential surfaces',
      'Capacitors and Capacitance: Parallel plate capacitors, dielectric materials, and capacitors in series and parallel'
    ]
  },
  'sss-3': {
    1: [
      'Current Electricity I: Electric current, potential difference, electromotive force (e.m.f.), Ohm\'s law (V = IR)',
      'Current Electricity II: Resistors in series and parallel, internal resistance of cells (E = I(R + r))',
      'Electrical Energy and Power: Joule\'s heating law (E = I²Rt), commercial power consumption (Kilowatt-Hour - kWh)',
      'Electric Circuit Measurement Instruments: Galvanometers, conversion to ammeter (shunt) and voltmeter (multiplier)',
      'Wheatstone Bridge and Metre Bridge: Precision resistance measurement and resistivity calculations',
      'The Potentiometer: Comparison of cell e.m.f. and measurement of internal resistance',
      'Magnetic Fields: Magnetic poles, magnetic field lines, Earth\'s magnetic field (declination, dip, horizontal component)',
      'Magnetic Effect of Electric Current: Biot-Savart law, field around straight wire, circular coil, and solenoid',
      'Force on a Current-Carrying Conductor in a Magnetic Field (F = BIl sin θ) and moving-coil galvanometer',
      'Electromagnetic Induction: Faraday\'s law, Lenz\'s law, AC and DC electric generators, and transformers (Vp/Vs = Np/Ns)'
    ],
    2: [
      'Alternating Current (AC) Circuits: Peak and r.m.s. values (I_rms = I₀/√2), inductive reactance (X_L = 2πfL)',
      'Capacitive Reactance (X_C = 1/2πfC), RLC series circuits, impedance (Z = √(R² + (X_L - X_C)²))',
      'Resonance in AC Circuits: Resonant frequency (f₀ = 1/(2π√(LC))), power factor, and tuning circuits',
      'Models of the Atom: Thomson\'s plum pudding, Rutherford\'s alpha scattering, Bohr\'s quantized energy levels',
      'Photoelectric Effect: Work function, threshold frequency, Einstein\'s photoelectric equation (E = hf = W₀ + 1/2mv²)',
      'X-Rays: Production in Coolidge tube, hard and soft X-rays, Bragg\'s law (2d sin θ = nλ), and medical diagnostics',
      'Wave-Particle Duality: De Broglie wavelength (λ = h/p), Heisenberg\'s uncertainty principle',
      'Radioactivity: Alpha, beta, gamma decay mechanisms, half-life calculations, and Geiger-Muller tube detection',
      'Nuclear Energy: Mass defect, binding energy, binding energy per nucleon curve, fission, and fusion',
      'Semiconductor Electronics: Intrinsic and extrinsic semiconductors (p-type, n-type), p-n junction diode, rectification'
    ],
    3: [
      'WASSCE Physics Comprehensive Revision: Mechanics and Properties of Matter High-Yield Drills',
      'WASSCE Revision: Heat Energy, Thermodynamics, Expansivity, and Gas Laws Masterclass',
      'WASSCE Revision: Waves, Optics, Sound, Refraction, and Optical Instruments Formula Clinic',
      'WASSCE Revision: Current Electricity, AC Circuits, Magnetism, and Electromagnetic Induction',
      'WASSCE Revision: Modern Physics, Photoelectricity, Radioactivity, and Semiconductors',
      'WASSCE Practical Physics Simulation I: Mechanics Experiments (Simple pendulum, Hooke\'s law, metre rule equilibrium)',
      'WASSCE Practical Physics Simulation II: Optics Experiments (Glass prism refraction, concave mirror, converging lens)',
      'WASSCE Practical Physics Simulation III: Electricity Experiments (Metre bridge, potentiometer, Ohm\'s law verification)',
      'Timed WASSCE Objective Exam Simulation: 50 Questions in 75 Minutes Speed Strategy',
      'Final National and Regional Mock Examination: 100% WASSCE Aligned Testing & Debrief'
    ]
  }
};

// ---------------------------------------------------------------------------
// 5. BIOLOGY & BASIC SCIENCE
// ---------------------------------------------------------------------------
export const BIOLOGY_CURRICULUM: LevelCurriculumMap = {
  'jss-1': {
    1: [
      'Living and Non-Living Things: Meaning, characteristics (MR NIGER D), and differences',
      'Classification of Living Things: Kingdoms of life (Monera, Protista, Fungi, Plantae, Animalia)',
      'Plant Taxonomy: Flowering and non-flowering plants; monocotyledonous vs dicotyledonous plants',
      'Animal Taxonomy: Invertebrates (protozoa, annelids, arthropods, molluscs) and vertebrates',
      'Vertebrate Classes: Pisces, Amphibia, Reptilia, Aves, and Mammalia with physical adaptations',
      'The Microscope: Optical parts, mechanical parts, care, slide preparation, and magnification',
      'The Cell as a Living Unit: Plant cell and animal cell structures, organelles, and functions',
      'Levels of Organization of Life: Cell, tissue, organ, system, and complex living organism',
      'Plant Nutrition: Photosynthesis process, light and dark stages, chlorophyll, and word equations',
      'Animal Nutrition: Balanced diet, classes of food (carbohydrates, proteins, fats, vitamins, minerals, water)'
    ],
    2: [
      'The Human Digestive System: Organs of digestion, mechanical vs chemical breakdown, enzymes',
      'Enzymes in Digestion: Salivary amylase, pepsin, trypsin, lipase, and optimal pH conditions',
      'The Human Respiratory System: Breathing mechanism (inhalation and exhalation), lungs, and alveoli',
      'Cellular Respiration: Aerobic respiration (glucose + oxygen → carbon dioxide + water + ATP energy)',
      'Anaerobic Respiration: Fermentation in yeast, lactic acid in human muscles, and oxygen debt',
      'The Circulatory System: Structure of the mammalian heart, arteries, veins, and capillaries',
      'Blood Composition: Red blood cells, white blood cells, platelets, and plasma functions',
      'Blood Groups and Transfusion: ABO system, Rhesus factor (+/-), and compatibility tables',
      'Excretion in Humans: Organs of excretion (kidneys, lungs, skin, liver) and waste products',
      'The Human Urinary System: Kidney structure, nephron, ultrafiltration, and urine formation'
    ],
    3: [
      'Skeletal System: Axial and appendicular skeleton, bones of skull, vertebral column, ribs, limbs',
      'Joints in the Human Skeleton: Ball-and-socket, hinge, pivot, and gliding joints with movement',
      'The Muscular System: Skeletal, smooth, and cardiac muscles, voluntary vs involuntary actions',
      'Sense Organs I: The mammalian eye - Structure, image formation, accommodation, and defects (myopia, hypermetropia)',
      'Sense Organs II: The mammalian ear - Hearing mechanism, balance, and ear hygiene',
      'Sense Organs III: Skin as a sense organ of touch, temperature, pressure, and thermoregulation',
      'Ecology: Ecosystem components (biotic and abiotic factors), habitats (terrestrial and aquatic)',
      'Food Chains, Food Webs, and Trophic Levels: Producers, primary, secondary, and tertiary consumers',
      'Energy Flow in Ecosystems: Pyramid of numbers, pyramid of biomass, and ecological energy loss',
      'Pollution: Water, air, and soil pollution causes, consequences, and environmental conservation in Nigeria'
    ]
  },
  'jss-2': {
    1: [
      'Ecology of Habitats: Freshwater, marine, estuarine, tropical rainforest, and savanna ecosystems in Nigeria',
      'Ecological Adaptations: Adaptive coloration, mimicry, behavioral, and structural adaptations in animals',
      'Nutrient Cycles in Nature: The Carbon Cycle, Photosynthesis, Respiration, and Global Warming',
      'The Nitrogen Cycle: Nitrogen fixation, nitrification, denitrification, and role of rhizobium bacteria',
      'Microorganisms in Action: Bacteria, viruses, protozoa, and fungi - Useful vs pathogenic microbes',
      'Food Preservation Techniques: Dehydration, salting, refrigeration, canning, and smoking in Nigeria',
      'Human Health and Disease: Communicable (malaria, cholera, tuberculosis) vs non-communicable diseases',
      'Vectors of Disease: Anopheles mosquito, tsetse fly, housefly, and lifecycle control methods',
      'The Immune System: Natural and acquired immunity, antibodies, antigens, and childhood immunization vaccines',
      'Drug Abuse and Substance Dependency: Narcotics, stimulants, alcohol, tobacco, and psychological impacts'
    ],
    2: [
      'Reproduction in Plants: Asexual (vegetative propagation) vs sexual reproduction',
      'Floral Anatomy: Sepals, petals, stamen (anther, filament), carpel (stigma, style, ovary)',
      'Pollination: Self-pollination versus cross-pollination, wind vs insect-pollinated flower features',
      'Fertilization in Flowering Plants: Pollen tube germination, double fertilization, seed and fruit development',
      'Fruits and Seeds: Structure of monocot seed (maize) vs dicot seed (bean), fruit classification',
      'Seed Dispersal Mechanisms: Wind, water, animal, and explosive mechanism with structural adaptations',
      'Seed Germination: Epigeal vs hypogeal germination, environmental conditions necessary for germination',
      'Asexual Reproduction in Animals: Binary fission, budding in hydra, and regeneration in planaria',
      'Sexual Reproduction in Animals: Male and female reproductive systems in fish, birds, and mammals',
      'Metamorphosis in Insects: Complete metamorphosis (butterfly, mosquito) vs incomplete metamorphosis (cockroach)'
    ],
    3: [
      'Human Reproductive System: Male anatomy (testes, vas deferens, penis, prostate) and spermatogenesis',
      'Human Female Reproductive System: Ovaries, fallopian tubes, uterus, cervix, vagina, and oogenesis',
      'Menstrual Cycle: Hormonal regulation (FSH, estrogen, LH, progesterone), ovulation, and fertile window',
      'Fertilization, Implantation, and Embryonic Development in Humans: Placenta, umbilical cord, and gestation',
      'Secondary Sexual Characteristics: Puberty in boys and girls, physical, and emotional hormonal shifts',
      'Sexually Transmitted Infections (STIs): HIV/AIDS, syphilis, gonorrhoea - Symptoms, transmission, and prevention',
      'Family Planning and Contraception: Barrier methods, hormonal methods, IUDs, natural rhythm method',
      'Population Ecology: Population density, birth rate, death rate, immigration, emigration, and census in Nigeria',
      'Overpopulation: Consequences on food supply, housing, deforestation, and Nigerian public infrastructure',
      'Conservation of Natural Resources: National parks (Yankari, Kainji), wildlife preservation, and reforestation'
    ]
  },
  'jss-3': {
    1: [
      'Genetics and Heredity: Meaning of heredity, transmission of traits from parents to offspring',
      'Chromosomes and Genes: Structure of DNA, genes as hereditary units, and diploid vs haploid cells',
      'Mendel\'s First Law of Inheritance: Law of Segregation, monohybrid crosses, and phenotypic ratios (3:1)',
      'Dominant and Recessive Alleles: Genotypes (homozygous, heterozygous), phenotypes, and Punnett squares',
      'Inheritance of Human Traits: Blood groups, albinism, sickle cell trait, and genetic counseling',
      'Sex Determination in Humans: X and Y sex chromosomes, probability of male vs female offspring',
      'Variation in Living Organisms: Continuous variation (height, weight) vs discontinuous variation (blood groups)',
      'Evolution: Theories of evolution (Lamarck\'s acquired characteristics vs Darwin\'s Natural Selection)',
      'Evidence of Organic Evolution: Fossil records, comparative anatomy (homologous organs), embryology',
      'Biotechnology and Genetic Engineering: Selective breeding, cloning, and ethical considerations in agriculture'
    ],
    2: [
      'The Nervous System I: Central Nervous System (Brain and Spinal Cord) and Peripheral Nervous System',
      'The Mammalian Brain: Forebrain (Cerebrum), Midbrain, and Hindbrain (Cerebellum, Medulla Oblongata) functions',
      'The Reflex Arc: Sensory neurons, relay neurons, motor neurons, synapses, and involuntary reflex actions',
      'Voluntary Actions vs Involuntary Reflex Actions with everyday examples (knee-jerk, pupil reflex)',
      'The Endocrine System: Endocrine glands, hormone secretions, and differences from the nervous system',
      'Major Hormones and Functions: Adrenaline (fight-or-flight), insulin, glucagon, thyroxine, and growth hormone',
      'Hormonal Imbalances: Diabetes mellitus, goitre, dwarfism, gigantism, and clinical management',
      'Homeostasis: Maintenance of stable internal environment, negative feedback mechanisms',
      'Thermoregulation in Humans: Role of skin (sweating, vasodilation, vasoconstriction, shivering) in hot/cold environments',
      'Osmoregulation and Blood Sugar Regulation: Role of kidneys, ADH hormone, and liver metabolism'
    ],
    3: [
      'Comprehensive BECE Basic Science and Biology Curriculum Synthesis: Cellular Biology & Nutrition',
      'BECE Synthesis: Human Physiology, Respiration, Circulation, and Excretory Mechanisms',
      'BECE Synthesis: Reproductive Systems, Plant Propagation, and Ecological Habitat Analysis',
      'BECE Synthesis: Genetics, Heredity, Variation, and Environmental Conservation Drills',
      'BECE Practical Science Laboratory Clinic I: Testing for starch, glucose, protein, and lipids',
      'BECE Practical Science Laboratory Clinic II: Microscope operation, plant/animal cell slide identification',
      'BECE Practical Science Laboratory Clinic III: Dissection models, skeleton anatomy, and tooth structures',
      'Junior WAEC Past Examination Paper 1 (Objective Theory & Diagrammatic Recognition)',
      'Junior WAEC Past Examination Paper 2 (Structured Essay Questions and Diagnostic Marking Guides)',
      'Final BECE Examination Readiness and Timed Diagnostic Masterclass'
    ]
  },
  'sss-1': {
    1: [
      'Biology and Living Organisms: Scope, branches, and scientific inquiry in life sciences',
      'Classification of Living Things: Binomial nomenclature (genus and species), hierarchical taxonomy',
      'The 5 Kingdoms of Living Organisms: Monera, Protista, Fungi, Plantae, Animalia with diagnostic features',
      'Kingdom Monera and Protista: Bacteria cellular ultrastructure, Amoeba proteus, and Paramecium caudatum',
      'Kingdom Fungi: Mucor, Rhizopus, Yeast, and Mushroom - Nutrition, reproduction, and economic importance',
      'The Cell: Detailed ultrastructure of plant and animal cells under electron microscopy',
      'Cell Organelles: Mitochondria, ribosomes, endoplasmic reticulum, Golgi body, lysosomes, and chloroplasts',
      'Cell Specialization and Differentiation: Red blood cells, sperm cells, xylem vessels, and guard cells',
      'Movement of Substances in Cells: Diffusion, Osmosis, and Active Transport with physiological demonstrations',
      'Plasmolysis, Turgidity, Flaccidity, Hemolysis, and Crenation in plant and animal tissues'
    ],
    2: [
      'Plant Tissues: Meristematic, epidermal, parenchyma, collenchyma, sclerenchyma, xylem, and phloem',
      'Internal Anatomy of Dicot and Monocot Roots and Stems: Vascular bundles and cambium layer',
      'Photosynthesis: Detailed light-dependent stage (photolysis of water) and light-independent Calvin cycle',
      'Factors Affecting Photosynthesis: Light intensity, carbon dioxide concentration, temperature, and water availability',
      'Mineral Nutrition in Plants: Macro-elements (N, P, K, Ca, Mg, S) and micro-elements with deficiency chlorosis',
      'Holozoic Nutrition in Animals: Ingestion, digestion, absorption, assimilation, and egestion',
      'Dentition in Mammals: Dental formulas of herbivores, carnivores, omnivores, and tooth decay biology',
      'Alimentary Canal of Mammals: Peristalsis, stomach gastric juice, intestinal villi, and hepatic portal system',
      'Enzymatic Digestion: Classification, active sites, lock-and-key model, cofactors, and inhibition',
      'Transport System in Plants: Transpiration stream, root pressure, capillary action, and guttation'
    ],
    3: [
      'Transpiration in Plants: Mechanism of stomatal opening and closing, potometer measurement, and adaptations',
      'Transport System in Mammals: Double circulation (pulmonary and systemic), cardiac cycle, and blood pressure',
      'Blood Vessels: Histology and structural comparison of arteries, veins, and capillary networks',
      'The Lymphatic System: Lymph, lymph nodes, lymphocytes, and role in immune defense and lipid transport',
      'Respiratory Systems Across Animal Phyla: Body surface (earthworm), tracheal system (insects), gills (fish), lungs',
      'Mechanism of Gaseous Exchange in Bony Fish: Gill filaments, gill rakers, opercular flap, and counter-current flow',
      'Gaseous Exchange in Mammals: Trachea, bronchi, bronchioles, alveoli, diaphragm, and intercostal muscles',
      'Tissue Respiration: Glycolysis in cytoplasm, Krebs cycle in mitochondria, and electron transport phosphorylation',
      'Excretion Across Animals: Contractile vacuole (amoeba), flame cells (planaria), nephridia (earthworm), Malpighian tubules (insects)',
      'SSS 1 Biology Practical Examination: Biological drawings with accurate guidelines and magnification formulas'
    ]
  },
  'sss-2': {
    1: [
      'Digestive, Respiratory, and Excretory Homeostasis in Mammals',
      'The Mammalian Liver: Homeostatic functions - Deamination, glycogen storage, bile synthesis, and detoxification',
      'The Mammalian Kidney: Histology of the cortex and medulla, structure of the nephron, and ultrafiltration',
      'Mechanism of Urine Formation: Selective reabsorption in proximal convoluted tubule, loop of Henle, and ADH control',
      'Excretory Disorders: Kidney stones, nephritis, renal failure, and artificial kidney dialysis principles',
      'The Skeletal System and Locomotion: Bone histology, cartilage types (hyaline, elastic, fibrocartilage), and ligaments',
      'The Axial Skeleton: Vertebral column (cervical, thoracic, lumbar, sacral, caudal vertebrae) and spinal nerves',
      'The Appendicular Skeleton: Pectoral girdle, pelvic girdle, upper and lower limb bone biomechanics',
      'Joints, Movement, and Tendons: Antagonistic muscle action (biceps and triceps) during forearm flexion/extension',
      'Support Systems in Plants: Turgor pressure, mechanical collenchyma, sclerenchyma fibers, and xylem lignification'
    ],
    2: [
      'Plant Responses and Tropisms: Phototropism, geotropism, hydrotropism, thigmotropism, and auxin hormonal action',
      'Plant Growth Regulators (Phytohormones): Auxins, gibberellins, cytokinins, abscisic acid, and ethylene',
      'The Nervous System: Neuron histology (sensory, motor, interneuron), myelin sheath, and action potential conduction',
      'Synaptic Transmission: Neurotransmitters (acetylcholine), synaptic cleft, and one-way impulse propagation',
      'The Central Nervous System: Brain regions, cerebral cortex, cerebellum, brainstem, and cranial nerves',
      'The Peripheral and Autonomic Nervous System: Sympathetic vs parasympathetic nervous balance',
      'Sense Organs: Photoreception in mammalian eye, retinal rods and cones, optical defects, and surgical/lens corrections',
      'Sense Organs: Hearing and equilibrium in the inner ear (cochlea, organ of Corti, semicircular canals)',
      'The Endocrine System: Pituitary master gland, thyroid gland, adrenal gland, pancreas, and gonadal hormones',
      'Reproductive Biology: Spermatogenesis, oogenesis, gamete structure, and hormonal regulation of menstrual cycle'
    ],
    3: [
      'Ecology I: Synecology and autecology, ecological factors (edaphic, climatic, biotic), and instrument measurements',
      'Ecology II: Population studies - Quadrate sampling, line transect, mark-release-recapture (Lincoln-Petersen index)',
      'Ecological Succession: Primary and secondary succession, pioneer species, sere communities, and climax forest',
      'Biomes of the World and Nigeria: Tropical rainforest, Guinea savanna, Sudan savanna, Sahel, and mangrove swamps',
      'Symbiotic Relationships: Mutualism (lichen, nitrogen-fixing bacteria), commensalism, and parasitism',
      'Predation, Competition, and Ecological Niches: Interspecific vs intraspecific competition (Gause\'s Principle)',
      'Energy Flow and Ecological Pyramids: Energy dissipation across trophic levels and 10% ecological efficiency law',
      'Microbiology in Public Health: Airborne, waterborne, foodborne, and vector-borne epidemic diseases',
      'Conservation of Natural Resources in Nigeria: Forestry regulations, game reserves, and anti-poaching wildlife legislation',
      'SSS 2 Practical Biology Marathon: Animal and plant histology specimen drawings under stereomicroscopes'
    ]
  },
  'sss-3': {
    1: [
      'Genetics I: Mendelian Laws of Inheritance - Law of Segregation and Law of Independent Assortment',
      'Dihybrid Crosses: Independent assortment of two gene pairs, phenotypic ratio (9:3:3:1), and test crosses',
      'Non-Mendelian Genetics: Incomplete dominance (mirabilis jalapa), codominance (ABO blood groups), and multiple alleles',
      'Sex-Linked Inheritance: Hemophilia, red-green color blindness, and transmission through carrier mothers (X-linked)',
      'Linkage and Crossing Over: Gene mapping, chiasmata formation in meiosis, and genetic recombination',
      'Mutation: Gene mutations (sickle cell anemia, point mutations) and chromosomal aberrations (Down syndrome, Turner syndrome)',
      'Mutagens: Ionizing radiation, cosmic rays, and chemical carcinogens with mutagenic risk prevention',
      'Recombinant DNA Technology: Gene cloning, genetic modification (GMOs), gene therapy, and human genome sequencing',
      'Evolutionary Biology: Lamarkism vs Darwinian Natural Selection, survival of the fittest, and neo-Darwinian synthesis',
      'Evidence of Organic Evolution: Comparative anatomy, homologous and vestigial structures, embryology, and molecular DNA homology'
    ],
    2: [
      'Adaptations for Survival: Structural, physiological, and behavioral adaptations in terrestrial and aquatic fauna',
      'Adaptive Radiation: Darwin\'s finches in Galapagos Islands and divergent vs convergent evolutionary paths',
      'Social Insects and Caste Systems: Division of labor, pheromone communication, and nest architecture in termites and honeybees',
      'Behavioral Ecology: Innate instincts, imprinting, learned behavior, territoriality, and courtship displays in birds',
      'Applied Ecology: Pest management in agriculture, biological control methods versus chemical pesticide hazards',
      'Human Impact on the Biosphere: Desertification, deforestation in Northern Nigeria, erosion in Eastern Nigeria, oil spills in Niger Delta',
      'Pollution Management: Industrial effluent treatment, sewage disposal, biodegradable vs non-biodegradable solid waste',
      'Global Environmental Challenges: Greenhouse effect, global warming, carbon footprint reduction, and ozone layer recovery',
      'WASSCE Practical Biology Specimen Revision: Identification of bones, animal dissections, and plant reproductive organs',
      'WASSCE Chief Examiner Marking Scheme Analysis: Deductions for guide-line arrowheads, unmagnified scales, and woolly lines'
    ],
    3: [
      'WASSCE Biology Comprehensive Revision: Cell Biology, Plant Physiology, and Tissue Respiration Clinics',
      'WASSCE Revision: Animal Physiology, Digestion, Circulation, Excretion, and Nervous Integration',
      'WASSCE Revision: Genetics, Monohybrid and Dihybrid Crosses, Pedigree Charts, and Evolutionary Trends',
      'WASSCE Revision: Ecology, Ecosystem Bioenergetics, Population Dynamics, and Environmental Conservation',
      'WASSCE Practical Examination Simulation I: Complete Specimen Identification and Adaptation Analysis (Paper 3)',
      'WASSCE Practical Examination Simulation II: Food Test Biochemical Reactions and Enzyme Rate Experiments',
      'WASSCE Practical Examination Simulation III: Microscope Slide Preparation, Staining, and Magnification Formulas',
      'Timed WASSCE Objective Exam Simulation: 50 Questions in 50 Minutes Speed Drill',
      'Timed WASSCE Theory Exam Simulation: Structured Long-Answer Essay Masterclass',
      'Final National and Regional Mock Examination: 100% WASSCE Aligned Testing & Debrief'
    ]
  }
};

// ---------------------------------------------------------------------------
// 6. ECONOMICS (SSS 1–3)
// ---------------------------------------------------------------------------
export const ECONOMICS_CURRICULUM: LevelCurriculumMap = {
  'sss-1': {
    1: [
      'Meaning and Scope of Economics: Definitions (Adam Smith, Lionel Robbins), Economics as a Social Science',
      'Basic Concepts: Scarcity, Choice, Scale of Preference, and Opportunity Cost in Household Decision-Making',
      'Production: Meaning, types (primary, secondary, tertiary), and factors of production (Land, Labour, Capital, Entrepreneur)',
      'Division of Labour and Specialization: Advantages, disadvantages, and limitations in modern industries',
      'Economic Systems: Capitalism (Free Market), Socialism (Command Economy), and Mixed Economy Case Studies',
      'Basic Tools of Economic Analysis I: Tables, bar charts, pie charts, and frequency distributions',
      'Basic Tools of Economic Analysis II: Arithmetic mean, median, mode, and range in economic data sets',
      'Theory of Demand: Law of demand, demand schedule, demand curve, and shifts versus movements along curve',
      'Determinants of Demand: Price, consumer income, prices of substitute and complementary goods, tastes, population',
      'Theory of Supply: Law of supply, supply schedule, supply curve, and determinants of supply'
    ],
    2: [
      'Market Equilibrium: Determination of equilibrium price and quantity through demand and supply interactions',
      'Shifts in Demand and Supply Curves and effects on market clearing equilibrium price and quantity',
      'Elasticity of Demand I: Price elasticity of demand (formula, calculation, and degrees: elastic, inelastic, unitary)',
      'Elasticity of Demand II: Income elasticity of demand and cross elasticity of demand (substitutes vs complements)',
      'Price Elasticity of Supply: Calculation, degrees, and determinants of supply responsiveness over time',
      'Price Legislation / Price Controls: Maximum price legislation (Price ceiling) and minimum price legislation (Price floor)',
      'Theory of Consumer Behaviour: Cardinal utility approach, total utility, marginal utility, and law of diminishing marginal utility',
      'Ordinal Utility Theory: Indifference curves, budget lines, and consumer equilibrium properties',
      'Theory of the Firm: Plant, firm, industry, legal forms of business organization (sole trader, partnership, limited liability)',
      'Public Corporations and State Enterprises: Objectives, financing, advantages, and privatization programs in Nigeria'
    ],
    3: [
      'Population and Demography: Meaning, determinants of population growth (birth rate, death rate, migration)',
      'Theories of Population: Malthusian Population Theory and the Theory of Optimum Population',
      'Population Structure and Distribution: Age distribution, sex distribution, geographical distribution, dependency ratio',
      'Labour Market: Supply of labour, demand for labour, wage determination, and trade union collective bargaining',
      'Location of Industries: Factors determining industrial location, localization of industries, and regional development',
      'Agriculture in Nigeria: Farming systems, contributions of agriculture to GDP, problems, and government intervention policies',
      'Mining and Petroleum in Nigeria: Exploration, OPEC membership, petroleum subsidy, and sovereign wealth funds',
      'Financial Institutions: Commercial banks (functions, credit creation process) and Central Bank of Nigeria (CBN monetary policy)',
      'Non-Bank Financial Institutions: Insurance companies, pension fund managers, and microfinance banks',
      'Comprehensive SSS 1 Economics Revision, Graphical Plotting Clinic, and Evaluation Assessment'
    ]
  },
  'sss-2': {
    1: [
      'Theory of Cost I: Short-run costs - Fixed cost, variable cost, total cost (TC = TFC + TVC)',
      'Theory of Cost II: Average fixed cost (AFC), average variable cost (AVC), average total cost (ATC), and marginal cost (MC)',
      'Cost Curves Relationships: U-shaped cost curves, why MC cuts AC at its lowest point, and long-run average cost (LRAC)',
      'Theory of Revenue: Total revenue (TR = P × Q), average revenue (AR = TR/Q = P), and marginal revenue (MR = ΔTR/ΔQ)',
      'Market Structures I: Perfect Competition - Characteristics, short-run and long-run profit maximization (MR = MC)',
      'Market Structures II: Monopoly - Characteristics, causes of monopoly, price discrimination, and deadweight loss',
      'Market Structures III: Monopolistic Competition and Oligopoly (kinked demand curve, cartels, and non-price competition)',
      'National Income Accounting I: Concepts - Gross Domestic Product (GDP), Gross National Product (GNP), Net National Product (NNP)',
      'National Income Accounting II: Measurement methods - Output / Value Added Method, Income Method, and Expenditure Method',
      'Problems of Measuring National Income in Developing Countries: Subsistence production, informal sector, and inflation'
    ],
    2: [
      'The Circular Flow of Income: Two-sector, three-sector, and four-sector macroeconomic flow models',
      'The Keynesian Consumption Function: Autonomous consumption, marginal propensity to consume (MPC), and MPS',
      'The Investment Multiplier: Meaning, formula (K = 1/(1 - MPC) = 1/MPS), and multiplier accelerator interactions',
      'Money and Monetary Policy: Barter system, evolution of money, functions, and characteristics of good money',
      'Demand for Money and Supply of Money: Transactionary, precautionary, and speculative motives (Keynesian liquidity preference)',
      'Inflation: Meaning, types (demand-pull, cost-push, hyperinflation), causes, consequences, and control policies',
      'Deflation: Meaning, economic impacts, and comparison with inflationary economic recessions',
      'Public Finance I: Government revenue sources - Direct taxes (PAYE, CIT) vs indirect taxes (VAT, tariffs, excise duties)',
      'Public Finance II: Canons of taxation (Adam Smith), tax incidence, progressive, proportional, and regressive taxation',
      'Public Finance III: Government expenditure (recurrent vs capital), national budget (balanced, surplus, deficit budgets)'
    ],
    3: [
      'National Debt: Domestic public debt, external debt burden, debt servicing, and Paris/London Club restructuring',
      'International Trade I: Domestic trade versus foreign trade, reasons for international trade, and absolute advantage (Adam Smith)',
      'International Trade II: Theory of Comparative Cost Advantage (David Ricardo) with numerical trade balance matrices',
      'Terms of Trade and Balance of Trade: Visible exports, visible imports, favorable vs unfavorable trade balance',
      'Balance of Payments (BOP): Current account, capital account, financial account, BOP surplus, deficit, and disequilibrium remedies',
      'Commercial Policies / Trade Restrictions: Tariffs, import quotas, bans, subsidies, exchange control, and free trade zones',
      'Foreign Exchange Market (FOREX): Determination of exchange rates (fixed, floating, managed float), naira devaluation impact',
      'Economic Integration in West Africa: ECOWAS, African Continental Free Trade Area (AfCFTA), and single currency goals',
      'International Financial Organizations: International Monetary Fund (IMF), World Bank (IBRD), and African Development Bank (AfDB)',
      'SSS 2 Economics Essay Writing Clinic and Quantitative Computational Problem Sets'
    ]
  },
  'sss-3': {
    1: [
      'Macroeconomic Policy Objectives: Full employment, price stability, rapid economic growth, and BOP equilibrium',
      'Fiscal Policy: Expansionary versus contractionary fiscal instruments in combating inflation and recession in Nigeria',
      'Monetary Policy: Open Market Operations (OMO), Monetary Policy Rate (MPR), Cash Reserve Ratio (CRR), and liquidity ratios',
      'Economic Growth versus Economic Development: Indicators of development (Human Development Index - HDI, per capita income)',
      'Underdevelopment: Characteristics of developing economies, vicious circle of poverty, and development strategies',
      'Economic Planning: Development plans, rolling plans, Vision 2020, and contemporary national development plans',
      'International Commodity Agreements: Cocoa, crude oil, and rubber commodity cartels and price stabilization mechanisms',
      'Petroleum and the Nigerian Economy: Historical boom, Dutch disease, petrodollar dependence, and economic diversification',
      'Privatization, Commercialization, and Deregulation: Power sector and telecommunications liberalization case studies',
      'Quantitative Economics Intensive: Calculating National Income equilibrium, elasticity coefficients, and budget multipliers'
    ],
    2: [
      'WASSCE Economics Theory Paper 2: Answering quantitative data interpretation and calculus/graphical questions (Section A)',
      'WASSCE Economics Theory Paper 2: Structuring high-scoring descriptive and essay questions (Section B)',
      'Chief Examiner Pitfalls in WASSCE Economics: Confusion of shifts vs movements along curves, and omission of diagrams',
      'Poverty Alleviation and Sustainable Development Goals (SDGs) in Nigeria and Sub-Saharan Africa',
      'Contemporary Economic Issues: Digital currencies (eNaira, cryptocurrencies), fintech disruptions, and monetary stability',
      'Youth Unemployment and Entrepreneurship Development Programs in the Nigerian Informal Economy',
      'Environmental Economics: Cost-benefit analysis of industrial pollution, carbon credits, and sustainable development',
      'Regional Economic Disparities and Revenue Allocation Formulas in the Nigerian Federal System',
      'WASSCE Objective Question Clinic: 50 Questions in 50 Minutes Elimination Speed Drill',
      'Full Timed WASSCE Economics Mock Examination Simulation and Script Review'
    ],
    3: [
      'WASSCE Economics Marathon: Consumer Theory, Demand & Supply, and Price Mechanism Review',
      'WASSCE Marathon: Theory of Production, Costs, Revenues, and Market Structures Blueprint',
      'WASSCE Marathon: Macroeconomics, National Income, and Money & Banking Intensive',
      'WASSCE Marathon: Public Finance, Taxation, Government Budgets, and National Debt Synthesis',
      'WASSCE Marathon: International Trade, Exchange Rates, Balance of Payments, and Globalization',
      'WASSCE Marathon: Development Economics, Agriculture, Petroleum, and Industrialization Policies',
      'Multi-Year WAEC Past Question Masterclass: High-Frequency Theory Prompts & Model Marking Guides',
      'Timed Objective Speed Drills: 50 Objective Questions under strict exam timing',
      'Timed Essay Paper Drill: Selecting and answering 4 questions across micro and macroeconomics sections',
      'Final National and Regional Mock Examination: 100% WASSCE Aligned Testing & Debrief'
    ]
  }
};

// ---------------------------------------------------------------------------
// 7. CIVIC EDUCATION & SOCIAL STUDIES
// ---------------------------------------------------------------------------
export const CIVIC_CURRICULUM: LevelCurriculumMap = {
  'jss-1': {
    1: [
      'Meaning, Scope and Importance of Civic Education in Nigeria',
      'National Values I: Honesty and Integrity in Daily Conduct',
      'National Values II: Discipline and Contentment as Virtues for Nation Building',
      'Courage: Meaning, types of courage (moral, physical), and displaying bravery with integrity',
      'Self-Reliance: Importance of skills acquisition and vocational craftsmanship for youth',
      'Cooperation: Meaning, benefits of cooperative teamwork in school, family, and nation',
      'National Symbols: The National Flag, Coat of Arms, National Anthem, and Pledge',
      'Significance of National Symbols and showing respect to national institutions',
      'Citizenship: Meaning, acquiring Nigerian citizenship (by birth, registration, naturalization)',
      'Rights and Duties of Citizens under Chapter IV of the 1999 Constitution of Nigeria'
    ],
    2: [
      'Democracy: Meaning, historical origins (Ancient Greece), and democratic institutions in Nigeria',
      'Pillars of Democracy: Rule of law, political parties, free press, and independent judiciary',
      'Rule of Law: Supremacy of the constitution, equality before the law, and fundamental rights',
      'Representative Governance: Legislative, Executive, and Judicial responsibilities in Nigeria',
      'National Consciousness, National Integrity, and Building a Unified Multi-Ethnic Nigeria',
      'Promoting Peace: Conflict resolution mechanisms and peaceful coexistence in community life',
      'Constitution: Meaning, types of constitutions (written, unwritten, rigid, flexible)',
      'Constitutional Development in Nigeria: Colonial constitutions (Clifford, Richards, Macpherson)',
      'Electoral Process: Meaning of elections, voters\' card, voter registration, and secret ballot',
      'Voter Education: Duties of eligible voters during local, state, and presidential elections'
    ],
    3: [
      'Human Rights: Universal Declaration of Human Rights (UDHR) by the United Nations',
      'Fundamental Human Rights in the Nigerian Constitution (Right to life, dignity, liberty)',
      'Limitations to Human Rights: Public emergency, state security, and lawful judicial detention',
      'Cultism in Schools: Meaning, causes, dangerous consequences, and resistance strategies',
      'Combating Examination Malpractice: Causes, moral implications, and institutional punishments',
      'National Security Agencies: The Nigerian Police Force, Military, Civil Defence (NSCDC)',
      'Community Vigilance and Safety: Reporting suspicious activities and emergency hotlines',
      'Traffic Regulations: Functions of the Federal Road Safety Corps (FRSC) and road sign safety',
      'HIV/AIDS Awareness: Transmission, prevention, anti-stigmatization, and voluntary counseling',
      'Comprehensive JSS 1 Civic Education Revision, Values Discussion, and Term Assessment'
    ]
  },
  'jss-2': {
    1: [
      'Integrity and Moral Courage in Public and Private Life in Nigeria',
      'Contentment: Meaning, attributes, and role in eradicating corruption and greed in society',
      'Discipline: Self-discipline, communal orderliness, and consequences of indiscipline in schools',
      'Leadership: Qualities of an effective leader (vision, empathy, justice, accountability)',
      'Followership: Responsibilities of patriotic followers in holding leaders accountable',
      'Electoral Malpractice: Meaning, forms (vote-buying, ballot snatching, result manipulation)',
      'Consequences of Electoral Malpractice on democratic governance and economic progress',
      'Independent National Electoral Commission (INEC): Constitutional mandate and structure',
      'Anti-Corruption Agencies: Economic and Financial Crimes Commission (EFCC) and ICPC',
      'Promoting Transparency and Accountability in Nigerian Government and Private Sector'
    ],
    2: [
      'Consumer Rights and Responsibilities: Meaning of consumerism and consumer protection',
      'Federal Competition and Consumer Protection Commission (FCCPC): Functions and consumer petitions',
      'Standards Organisation of Nigeria (SON) and NAFDAC: Preventing substandard goods and counterfeit drugs',
      'Rule of Law in Practice: Judicial independence, legal aid council, and human rights courts',
      'The 1999 Constitution: Key features, fundamental objectives, and directive principles of state policy',
      'Separation of Powers: Checks and balances between the Executive, Legislature, and Judiciary',
      'Human Trafficking: Meaning, causes, victims\' exploitation, and NAPTIP rehabilitation interventions',
      'Preventing Substance and Drug Abuse: National Drug Law Enforcement Agency (NDLEA) operations',
      'Peace Building: Meaning, mediation, arbitration, and inter-communal conflict management',
      'Youth Empowerment: Government schemes (NYSC, N-Power, SMEDAN) and self-employment initiatives'
    ],
    3: [
      'Protection of the Environment: Environmental sanitation, waste management, and flood prevention',
      'National Environmental Standards and Regulations Enforcement Agency (NESREA): Mandates and fines',
      'Disaster Management: National Emergency Management Agency (NEMA) and State SEMA operations',
      'Civil Society Organizations (CSOs) and NGOs: Roles in promoting democratic accountability and rights',
      'Gender Equality and Social Inclusion: Eradication of gender-based violence and child labor',
      'Child Rights Act (2003): Right to free basic education, protection against child marriage and abuse',
      'Promoting National Unity: NYSC scheme, unity schools, and inter-ethnic cultural exchanges',
      'Community Development: Self-help projects, town unions, and youth development associations',
      'BECE Civic Education Revision: Values, National Identity, Democratic Institutions, and Rights',
      'Comprehensive Junior WAEC Civic Education Assessment and Formative Evaluation'
    ]
  },
  'jss-3': {
    1: [
      'The 1999 Constitution: Detailed features, amendment procedures, and judicial interpretations',
      'Democratic Governance in Nigeria: Historical transition from military regimes to democratic rule',
      'Electoral System in Nigeria: Proportional representation vs first-past-the-post systems',
      'Electronic Voting Technology: Bimodal Voter Accreditation System (BVAS) and IReV results viewing',
      'Negative Social Behaviours: Cultism, thuggery, internet fraud (Yahoo-Yahoo), and exam cheating',
      'Institutional Interventions Against Social Vices: Role of family, religious bodies, and law enforcement',
      'Promoting Responsible Sexual Behaviour and Adolescence Health Education',
      'National Security Challenges: Terrorism, banditry, piracy, and community policing solutions',
      'Defense of the Nation: Roles of the Nigerian Army, Navy, Air Force, and intelligence services',
      'Patriotism: Demonstrating loyalty, paying taxes promptly, and preserving public utilities'
    ],
    2: [
      'Human Rights Abuses: Identifying illegal detention, police brutality, and forced confessions',
      'Redress for Rights Violations: National Human Rights Commission (NHRC), Public Complaints Commission (PCC)',
      'Free and Fair Elections: Pre-requisites for credible democratic elections in West Africa',
      'Voting Procedure: Accreditation, voting, vote counting, announcement, and election petitions tribunals',
      'Economic Crimes: Money laundering, contract inflation, oil bunkering, and national economic impact',
      'Role of EFCC, ICPC, and Code of Conduct Bureau in recovering stolen public assets',
      'Ethics in the Workplace: Work ethic, punctuality, productivity, and avoiding official bribery',
      'Conflict Resolution Mechanisms: Dialogue, mediation, reconciliation, and traditional rulers\' councils',
      'BECE Examination Clinic: National Values, Citizenship, Democratic Governance, and Human Rights',
      'BECE Examination Clinic: Legal Institutions, Public Security, and Anti-Corruption Legislation'
    ],
    3: [
      'Comprehensive BECE Junior WAEC Civic Education Synthesis: Foundations of National Values',
      'BECE Synthesis: The 1999 Constitution, Electoral Guidelines, and Democratic Governance',
      'BECE Synthesis: Fundamental Human Rights, Rule of Law, and Civic Obligations',
      'BECE Synthesis: Public Safety, National Defense Forces, and Traffic Regulations',
      'BECE Synthesis: Consumer Protection, FCCPC, NAFDAC, and Environmental Preservation',
      'Junior WAEC Past Examination Paper 1 (Objective Section and Diagram Recognition Clinic)',
      'Junior WAEC Past Examination Paper 2 (Structured Theory and Civic Essay Formulation)',
      'Chief Examiner Pitfalls in National and State BECE Civic Education Examinations',
      'Timed Mock Examination Simulation: Speed Drills and Answering Strategy Review',
      'Final BECE Examination Readiness and Broadsheet Certification'
    ]
  },
  'sss-1': {
    1: [
      'Values Education: Meaning, types of values, and importance to national cohesion and stability',
      'National Consciousness, National Integrity, and Building a Unified Multi-Ethnic Nigeria',
      'National Identity: Symbols, historical heritage, and patriotic pride in Nigerian achievements',
      'Citizenship: Acquisition methods, dual citizenship, and renunciation under the 1999 Constitution',
      'Rights and Obligations of Citizens: Paying taxes, voting, obeying laws, and defending national integrity',
      'Fundamental Human Rights in Chapter IV of the Nigerian Constitution (Civil, political, economic rights)',
      'Limitations to Human Rights: State of emergency, lawful arrests, quarantine, and court judgments',
      'Universal Declaration of Human Rights (UDHR): Historical origins, 30 articles, and global impact',
      'Human Rights Violations: Extrajudicial killings, unlawful detention, discrimination, and remedies',
      'National Human Rights Commission (NHRC): Statutory powers, receiving petitions, and monitoring prisons'
    ],
    2: [
      'Democracy and Democratic Principles: Popular sovereignty, periodic elections, majority rule, minority rights',
      'Pillars of Democracy in Nigeria: Independent judiciary, vibrant free press, political parties, armed forces',
      'Rule of Law: A.V. Dicey\'s concepts - Supremacy of law, equality before law, protection of individual rights',
      'Threats to the Rule of Law: Executive arbitrariness, military interventions, and court order disobedience',
      'Cultism: Historical origins (Pirates Confraternity), modern violent degeneration, and campus cult laws',
      'Combating Cultism: Family upbringing, security surveillance, strict university expulsion, and penal codes',
      'Drug Abuse and Trafficking: High-risk substances (tramadol, cannabis, cocaine), and societal devastation',
      'National Drug Law Enforcement Agency (NDLEA): Interdiction at seaports/airports, and rehabilitation clinics',
      'HIV/AIDS and Stigmatization: National Agency for the Control of AIDS (NACA), anti-discrimination laws',
      'Youth Empowerment and National Development: Vocational training schemes, micro-credit, and entrepreneurship'
    ],
    3: [
      'Traffic Regulations and Road Safety: Highway code, speed limits, seatbelt enforcement, and drunk driving',
      'Federal Road Safety Corps (FRSC): Statutory mandates, speed-limiting devices, and road crash reduction',
      'Negative Social Behaviours: Thuggery, examination malpractice, indecent dressing, and internet fraud',
      'Promoting Positive Social Values: Modesty, hard work, punctuality, religious tolerance, and patriotism',
      'Public Service in Nigeria: Structure of Federal, State, and Local Government civil service bureaucracies',
      'Characteristics of the Civil Service: Permanence, political neutrality, anonymity, and meritocracy',
      'Problems Facing the Nigerian Civil Service: Red tape, corruption, nepotism, and inadequate technology',
      'Civil Service Reforms: Servicom charters, electronic governance, IPPIS payroll, and efficiency units',
      'National Security Agencies: Inter-agency intelligence sharing between Police, DSS, Military, and NSCDC',
      'Comprehensive SSS 1 Civic Education Revision, Case Study Debates, and Termly Examination'
    ]
  },
  'sss-2': {
    1: [
      'Citizenship and Constitutional Obligations: Legal distinctions between citizens, aliens, and refugees',
      'Duties and Obligations of Citizens: Compulsory civic tasks under Section 24 of the 1999 Constitution',
      'Capitalist Democracy: Market enterprise, multi-party democracy, and competitive political campaigns',
      'Characteristics of Democratic Governance: Transparency, public accountability, citizen participation',
      'Political Apathy: Meaning, causes (broken campaign promises, election violence, illiteracy), and remedies',
      'Eradicating Political Apathy: Civil society voter awareness, independent election observation, media debates',
      'Electoral System in Nigeria: Types of electoral systems (Plurality/Majoritarian, Proportional Representation)',
      'Independent National Electoral Commission (INEC): Composition, state resident electoral commissioners, mandate',
      'Electoral Malpractice in Nigeria: Pre-election, election day, and post-election rigging strategies',
      'Preventing Electoral Malpractice: BVAS technology, electronic transmission of results, and election tribunals'
    ],
    2: [
      'Human Rights Education: Teaching citizens their rights and recognizing legal remedies for abuses',
      'Human Trafficking: Meaning, cross-border routes, commercial sexual exploitation, and modern forced labor',
      'National Agency for the Prohibition of Trafficking in Persons (NAPTIP): Arrests, prosecution, and shelters',
      'Interpersonal Relationships: Meaning, types (cooperation, friendship, competition), and emotional maturity',
      'Inter-Communal Relationships: Promoting harmony among diverse ethnic and religious groups in Nigeria',
      'Inter-Communal Conflicts: Land boundary disputes, resource competition, and traditional mediation models',
      'Responsible Parenthood: Moral, nutritional, educational, and spiritual duties of parents to children',
      'Consequences of Irresponsible Parenthood: Street children, juvenile delinquency, and social insecurity',
      'Public Service Commission: Recruitment, promotion, discipline, and code of conduct for public servants',
      'Code of Conduct Bureau and Tribunal: Asset declaration enforcement, public integrity, and sanctions'
    ],
    3: [
      'Civil Society Organizations (CSOs): Definition, historical role in ending military dictatorships in Nigeria',
      'Functions of CSOs: Defending human rights, election monitoring, promoting budget transparency, and advocacy',
      'Limitations and Challenges of CSOs: Funding constraints, government harassment, and internal governance',
      'Electoral Offences and Penalties under the Electoral Act (2022) of the Federal Republic of Nigeria',
      'Consumer Rights and Redress: Protection against predatory pricing, expired goods, and misleading adverts',
      'National Orientation Agency (NOA): Mandates in communicating government policies and re-orienting values',
      'Promoting National Unity: Federal character principle, quota system debates, and inclusive governance',
      'Environmental Sanitation and Public Health Laws: Monthly sanitation exercises and environmental courts',
      'WASSCE Civic Education Past Question Clinic: Conceptual Definitions and Analytical Essay Formulations',
      'Comprehensive SSS 2 Civic Education Revision and Examination Readiness Assessment'
    ]
  },
  'sss-3': {
    1: [
      'Constitutional Democracy: Separation of powers, checks and balances, and judicial review mechanisms',
      'Constitutional Development in Nigeria: 1960 Independence, 1963 Republican, 1979 Second Republic, 1999 Constitution',
      'Features of the 1999 Constitution: Presidential system, bicameral legislature, federalism, and local government autonomy',
      'Electoral System in Nigeria: INEC mandate, voter registration, electronic voting, and declaration of election results',
      'Electoral Petitions Tribunals: Jurisdiction of Gubernatorial, National Assembly, and Presidential Election Tribunals',
      'Public Service and National Development: Implementation of socio-economic policies, infrastructure, and budgeting',
      'Challenges Facing Public Service: Corruption, bureaucratic inertia, ghost workers, and brain drain (Japa syndrome)',
      'Anti-Corruption Legislation: EFCC Act, ICPC Act, Fiscal Responsibility Act, and Public Procurement Act',
      'Recovering Stolen Public Assets: Mutual legal assistance with foreign jurisdictions, whistle-blower policy',
      'WASSCE Civic Education Section A: Tackling 50 Objective Questions with 100% Accuracy and Speed'
    ],
    2: [
      'WASSCE Civic Education Section B: Structuring 4 Compulsory Essay Answers across All Thematic Pillars',
      'Chief Examiner Marking Guidelines for WASSCE Civic Education: OEQA Rubrics and Point Allocations',
      'Case Study Analysis: Reconciling fundamental human rights with national security emergencies in Nigeria',
      'Democratic Consolidation in West Africa: Resisting unconstitutional changes of government and military coups',
      'The Role of the Mass Media in Democratic Accountability: Investigative journalism versus fake news and hate speech',
      'Cybersecurity and Data Protection: Nigeria Data Protection Act (NDPA 2023), cyberbullying, and digital ethics',
      'Promoting Inclusivity: Gender representation in political leadership, disability rights laws, and youth inclusion',
      'International Civic Engagements: ECOWAS Protocols on Good Governance, African Union Democracy Charter',
      'Timed WASSCE Civic Education Essay Simulation: Drafting 4 Structured Theory Answers in 120 Minutes',
      'Full WASSCE Mock Examination Simulation: Combined Objective (Paper 1) and Essay (Paper 2) Testing'
    ],
    3: [
      'WASSCE Civic Education Intensive Marathon: National Values, Identity, and Citizenship Masterclass',
      'WASSCE Marathon: The 1999 Constitution, Human Rights, and Legal Redress Mechanisms',
      'WASSCE Marathon: Democratic Governance, Electoral Systems, and Anti-Corruption Laws',
      'WASSCE Marathon: Public Service, Bureaucratic Efficiency, and Administrative Reforms',
      'WASSCE Marathon: Social Issues - Cultism, Drug Abuse, Human Trafficking, and Juvenile Crime',
      'WASSCE Marathon: Road Safety, FRSC Regulations, Traffic Signals, and Environmental Health',
      'WASSCE Marathon: Civil Society Organizations, Mass Media, and Democratic Vigilance',
      'Multi-Year WAEC Past Question Diagnostic Drills: Eliminating Examiner Pitfalls in Essay Scoring',
      'Timed Objective Speed Drills: 50 Objective Questions under strict exam timing',
      'Final National and Regional Mock Examination: 100% WASSCE Aligned Testing & Debrief'
    ]
  }
};

// ---------------------------------------------------------------------------
// 8. UNIVERSAL CURRICULUM RESOLVER
// ---------------------------------------------------------------------------
export function getStatutoryCurriculumTopics(
  levelId: string,
  subjectName: string,
  termNum: number
): string[] {
  const normLvl = (levelId || 'jss-1').toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanLvl = normLvl.startsWith('jss')
    ? normLvl.replace('jss', 'jss-')
    : normLvl.replace('sss', 'sss-');
  const trm = typeof termNum === 'number' && termNum >= 1 && termNum <= 3 ? termNum : 1;
  const subLower = (subjectName || '').toLowerCase().trim();

  // 1. Mathematics / General Mathematics
  if (subLower.includes('math') || subLower.includes('mth')) {
    const list = MATHEMATICS_CURRICULUM[cleanLvl]?.[trm];
    if (list && list.length >= 10) return list;
  }

  // 2. English Studies / English Language
  if (subLower.includes('eng') || subLower.includes('english')) {
    const list = ENGLISH_CURRICULUM[cleanLvl]?.[trm];
    if (list && list.length >= 10) return list;
  }

  // 3. Chemistry
  if (subLower.includes('chem') || subLower.includes('chm')) {
    const list = CHEMISTRY_CURRICULUM[cleanLvl]?.[trm];
    if (list && list.length >= 10) return list;
  }

  // 4. Physics
  if (subLower.includes('phys') && !subLower.includes('physical')) {
    const list = PHYSICS_CURRICULUM[cleanLvl]?.[trm];
    if (list && list.length >= 10) return list;
  }

  // 5. Biology & Basic Science
  if (subLower.includes('bio') || subLower.includes('basic science') || subLower.includes('bsc')) {
    const list = BIOLOGY_CURRICULUM[cleanLvl]?.[trm];
    if (list && list.length >= 10) return list;
  }

  // 6. Agricultural Science
  if (subLower.includes('agric') || subLower.includes('agr')) {
    const list = AGRICULTURAL_SCIENCE_CURRICULUM[cleanLvl]?.[trm];
    if (list && list.length >= 10) return list;
  }

  // 7. Basic Technology / Technical Drawing
  if (subLower.includes('tech') || subLower.includes('btech') || subLower.includes('drawing')) {
    const list = BASIC_TECHNOLOGY_CURRICULUM[cleanLvl]?.[trm];
    if (list && list.length >= 10) return list;
  }

  // 8. Computer Studies / ICT / Data Processing
  if (subLower.includes('comp') || subLower.includes('ict') || subLower.includes('data') || subLower.includes('processing')) {
    const list = COMPUTER_STUDIES_CURRICULUM[cleanLvl]?.[trm];
    if (list && list.length >= 10) return list;
  }

  // 9. Government
  if (subLower.includes('gov') || subLower.includes('pol')) {
    const list = GOVERNMENT_CURRICULUM[cleanLvl]?.[trm];
    if (list && list.length >= 10) return list;
  }

  // 10. Commerce & Business Studies
  if (subLower.includes('commer') || subLower.includes('business') || subLower.includes('bst') || subLower.includes('account') || subLower.includes('bookkeeping')) {
    const list = COMMERCE_AND_BUSINESS_CURRICULUM[cleanLvl]?.[trm];
    if (list && list.length >= 10) return list;
  }

  // 11. Economics
  if (subLower.includes('econ') || subLower.includes('ecn') || subLower.includes('eco')) {
    const list = ECONOMICS_CURRICULUM[cleanLvl]?.[trm];
    if (list && list.length >= 10) return list;
  }

  // 12. Civic Education & Social Studies
  if (subLower.includes('civic') || subLower.includes('cve') || subLower.includes('social studies') || subLower.includes('sos')) {
    const list = CIVIC_CURRICULUM[cleanLvl]?.[trm];
    if (list && list.length >= 10) return list;
  }

  // 13. General Class-Aware Fallback for remaining subjects
  return generateDynamicStatutoryCurriculum(cleanLvl, subjectName, trm);
}

function generateDynamicStatutoryCurriculum(levelId: string, subjectName: string, term: number): string[] {
  const isJunior = levelId.startsWith('jss');
  const classNum = levelId.slice(-1);
  const termLabel = term === 1 ? 'First Term Foundations' : term === 2 ? 'Second Term Intermediate Competencies' : 'Third Term Mastery & Exam Readiness';
  const examStandard = isJunior ? 'BECE / Junior WAEC' : 'WASSCE / NECO Senior';
  const displayClass = levelId.toUpperCase().replace('-', ' ');

  const pedagogicalPillars = [
    `Conceptual Framework, Historical Background and Core Principles of ${subjectName} in ${displayClass}`,
    `Standard Nomenclature, Operational Tools, and Measuring Techniques in ${subjectName}`,
    `Domestic Realia and Nigerian Socio-Cultural and Commercial Case Studies in ${subjectName}`,
    `Guided Demonstration, Problem-Solving Methodologies, and Worked Models in ${subjectName}`,
    `Institutional Frameworks, Statutory Regulators, and Quality Standards in ${subjectName}`,
    `Industrial Workflows, Technological Linkages, and Economic Applications of ${subjectName} in Nigeria`,
    `Diagnostic Review of Foundational Modules and Teacher-Led Remedial Clinic in ${subjectName}`,
    `Collaborative Studio/Field/Laboratory Exercises and Practical Skills Acquisition in ${subjectName}`,
    `Environmental Ethics, Civic Responsibility, and Professional Conduct in ${subjectName}`,
    `${displayClass} ${termLabel}: Comprehensive ${examStandard} Examination Masterclass and Model Solutions`
  ];

  return pedagogicalPillars;
}

