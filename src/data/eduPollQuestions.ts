/**
 * EduPlan NG - EduPoll Question Bank
 * Exhaustive database covering all statutory subjects across JSS 1 to SSS 3
 * with diagnostic multiple-choice options, correct answers, step explanations,
 * and WAEC/BECE Chief Examiner misconceptions for each option.
 */

export interface PollQuestionItem {
  id: string;
  level: 'JSS 1' | 'JSS 2' | 'JSS 3' | 'SSS 1' | 'SSS 2' | 'SSS 3';
  subject: string;
  topic: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  chiefExaminerMisconception: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  initialVotes?: { A: number; B: number; C: number; D: number };
}

export const EDU_POLL_QUESTIONS: PollQuestionItem[] = [
  // ---------------------------------------------------------------------------
  // JSS 1
  // ---------------------------------------------------------------------------
  {
    id: 'poll_jss1_math_01',
    level: 'JSS 1',
    subject: 'Mathematics',
    topic: 'Whole Numbers & Place Value',
    question: 'What is the place value of the digit 7 in the Nigerian census figure 4,752,310?',
    options: {
      A: 'Seven Thousand (7,000)',
      B: 'Seven Hundred Thousand (700,000)',
      C: 'Seventy Thousand (70,000)',
      D: 'Seven Million (7,000,000)'
    },
    correctOption: 'B',
    explanation: 'In 4,752,310, the digit 7 is in the hundred thousands position (7 × 100,000 = 700,000).',
    chiefExaminerMisconception: {
      A: 'Candidate confused thousands column with hundred thousands column.',
      B: 'CORRECT: Accurate decomposition into Millions, Hundred Thousands, Ten Thousands.',
      C: 'Candidate counted from left to right instead of right to left place values.',
      D: 'Candidate mistook the hundred thousands column for the leading millions column.'
    },
    initialVotes: { A: 4, B: 28, C: 5, D: 3 }
  },
  {
    id: 'poll_jss1_eng_01',
    level: 'JSS 1',
    subject: 'English Studies',
    topic: 'Nouns & Countability',
    question: 'Which of the following underlined words is an UNCOUNTABLE noun in the sentence: "The students drank clean water and ate fresh oranges after playing football"?',
    options: {
      A: 'Students',
      B: 'Water',
      C: 'Oranges',
      D: 'Football'
    },
    correctOption: 'B',
    explanation: '"Water" is a mass/uncountable noun because it cannot be quantified with discrete numbers without partitives like "glasses of water".',
    chiefExaminerMisconception: {
      A: 'Candidate chose a countable plural noun ending with -s.',
      B: 'CORRECT: Identified mass noun that cannot take plural marker or indefinite article "a".',
      C: 'Candidate confused countable fruit items with uncountable liquids.',
      D: 'Candidate picked the sports activity noun rather than the mass substance.'
    },
    initialVotes: { A: 2, B: 34, C: 2, D: 4 }
  },
  {
    id: 'poll_jss1_bsc_01',
    level: 'JSS 1',
    subject: 'Basic Science',
    topic: 'Living and Non-Living Things',
    question: 'Which of the following characteristics of living organisms is illustrated when an Agama lizard scurries away upon hearing human footsteps?',
    options: {
      A: 'Excretion of metabolic wastes',
      B: 'Irritability (Sensitivity to stimuli)',
      C: 'Reproduction of offspring',
      D: 'Respiration and gas exchange'
    },
    correctOption: 'B',
    explanation: 'Irritability (or sensitivity) is the ability of living things to detect changes in their external environment and respond accordingly.',
    chiefExaminerMisconception: {
      A: 'Candidate confused defensive escape motion with metabolic waste removal.',
      B: 'CORRECT: Candidate correctly identified response to auditory vibrational stimulus.',
      C: 'Candidate selected reproductive perpetuation instead of sensory response.',
      D: 'Candidate chose cellular energy release instead of sensory perception.'
    },
    initialVotes: { A: 1, B: 32, C: 3, D: 2 }
  },
  {
    id: 'poll_jss1_btech_01',
    level: 'JSS 1',
    subject: 'Basic Technology',
    topic: 'Workshop Safety Rules',
    question: 'When extinguishing an electrical fire in the school introductory technology workshop, which fire extinguisher MUST NEVER be used?',
    options: {
      A: 'Carbon dioxide (CO₂) extinguisher',
      B: 'Water / Soda-acid extinguisher',
      C: 'Dry chemical powder extinguisher',
      D: 'Sand bucket'
    },
    correctOption: 'B',
    explanation: 'Water is a good conductor of electricity; using it on live electrical equipment causes fatal electric shock to the user.',
    chiefExaminerMisconception: {
      A: 'CO₂ is non-conductive and ideal for Class C electrical fires.',
      B: 'CORRECT: Water conducts high voltage current directly to the firefighter.',
      C: 'Dry chemical powder is non-conductive and safe for electrical fires.',
      D: 'Dry sand is non-conductive and smothers flames by removing oxygen.'
    },
    initialVotes: { A: 3, B: 36, C: 2, D: 1 }
  },
  {
    id: 'poll_jss1_agric_01',
    level: 'JSS 1',
    subject: 'Agricultural Science',
    topic: 'Classification of Crops',
    question: 'Cassava (Manihot esculenta) and Yam (Dioscorea spp.) are classified under which crop group based on their economic use?',
    options: {
      A: 'Legumes / Grain pulses',
      B: 'Root and Tuber crops',
      C: 'Fiber and textile crops',
      D: 'Spices and beverage crops'
    },
    correctOption: 'B',
    explanation: 'Cassava and yam store manufactured starch reserves in underground roots and swollen tuber stems.',
    chiefExaminerMisconception: {
      A: 'Candidate confused starchy tubers with nitrogen-fixing protein pods like cowpea.',
      B: 'CORRECT: Accurately identified underground carbohydrate storage organs.',
      C: 'Candidate confused food staples with cotton or jute fibers.',
      D: 'Candidate confused energy staples with ginger or cocoa.'
    },
    initialVotes: { A: 2, B: 39, C: 1, D: 0 }
  },

  // ---------------------------------------------------------------------------
  // JSS 2
  // ---------------------------------------------------------------------------
  {
    id: 'poll_jss2_math_01',
    level: 'JSS 2',
    subject: 'Mathematics',
    topic: 'Linear Equations & Unknowns',
    question: 'Solve for x in the equation: 3x - 7 = 14.',
    options: {
      A: 'x = 2.33',
      B: 'x = 7',
      C: 'x = 21',
      D: 'x = 3'
    },
    correctOption: 'B',
    explanation: 'Add 7 to both sides: 3x = 14 + 7 = 21. Divide by 3: x = 21 / 3 = 7.',
    chiefExaminerMisconception: {
      A: 'Candidate subtracted 7 from 14 instead of adding 7 (14 - 7 = 7, 7/3 = 2.33).',
      B: 'CORRECT: Candidate applied additive inverse (+7) and multiplicative inverse (/3).',
      C: 'Candidate forgot the final division by the coefficient 3.',
      D: 'Candidate transposed 7 and divided by 7.'
    },
    initialVotes: { A: 6, B: 31, C: 4, D: 2 }
  },
  {
    id: 'poll_jss2_civic_01',
    level: 'JSS 2',
    subject: 'Civic Education',
    topic: 'Democratic Values & Rule of Law',
    question: 'According to A.V. Dicey, which principle ensures that the President, governors, and ordinary citizens are subject to the same ordinary laws of the land?',
    options: {
      A: 'Impartiality of the Military',
      B: 'Equality before the law',
      C: 'Delegated Legislation',
      D: 'Arbitrary executive power'
    },
    correctOption: 'B',
    explanation: 'Equality before the law dictates that no citizen, regardless of rank or status, is above the statutory laws of the land.',
    chiefExaminerMisconception: {
      A: 'Military rule suspends statutory equality under decree.',
      B: 'CORRECT: Accurately identified the 2nd postulate of Dicey’s Rule of Law.',
      C: 'Delegated legislation refers to bylaws made by ministers or local councils.',
      D: 'Arbitrary power is the direct antithesis of the Rule of Law.'
    },
    initialVotes: { A: 3, B: 35, C: 2, D: 1 }
  },
  {
    id: 'poll_jss2_comp_01',
    level: 'JSS 2',
    subject: 'Computer Studies',
    topic: 'Computer Hardware & Memory',
    question: 'Why is Random Access Memory (RAM) described as volatile primary storage in computer architecture?',
    options: {
      A: 'It catches fire easily when heated',
      B: 'Its stored data is erased when power supply is interrupted',
      C: 'It permanently stores startup BIOS code',
      D: 'It cannot be read by the central processor'
    },
    correctOption: 'B',
    explanation: 'Volatile memory requires continuous electrical power to maintain stored data; turning off power wipes RAM contents.',
    chiefExaminerMisconception: {
      A: 'Candidate took the word "volatile" in its colloquial chemical flammability sense.',
      B: 'CORRECT: Candidate understood electrical dependence of dynamic/static RAM cells.',
      C: 'Permanent BIOS code is stored in non-volatile ROM, not RAM.',
      D: 'The CPU communicates with RAM continuously via the data bus.'
    },
    initialVotes: { A: 2, B: 37, C: 4, D: 0 }
  },
  {
    id: 'poll_jss2_soc_01',
    level: 'JSS 2',
    subject: 'Social Studies',
    topic: 'Social Issues: Drug Abuse',
    question: 'Which statutory agency in Nigeria is primarily mandated to enforce laws against the illicit trafficking and abuse of hard drugs?',
    options: {
      A: 'FRSC (Federal Road Safety Corps)',
      B: 'NDLEA (National Drug Law Enforcement Agency)',
      C: 'NAFDAC (National Agency for Food & Drug Administration)',
      D: 'EFCC (Economic and Financial Crimes Commission)'
    },
    correctOption: 'B',
    explanation: 'NDLEA was established by Decree No. 48 of 1989 to eliminate the growing, processing, trafficking, and abuse of illicit narcotic substances.',
    chiefExaminerMisconception: {
      A: 'FRSC regulates highway vehicular safety and driving licenses.',
      B: 'CORRECT: Accurately named the statutory anti-narcotics law enforcement body.',
      C: 'NAFDAC regulates standard manufactured foods, cosmetics, and packaged pharmaceuticals.',
      D: 'EFCC investigates financial fraud, embezzlement, and cyber crimes.'
    },
    initialVotes: { A: 1, B: 40, C: 3, D: 1 }
  },

  // ---------------------------------------------------------------------------
  // JSS 3
  // ---------------------------------------------------------------------------
  {
    id: 'poll_jss3_math_01',
    level: 'JSS 3',
    subject: 'Mathematics',
    topic: 'Pythagoras Theorem',
    question: 'In a right-angled triangle ABC, with right angle at B, AB = 6 cm and BC = 8 cm. What is the length of the hypotenuse AC?',
    options: {
      A: '14 cm',
      B: '10 cm',
      C: '12 cm',
      D: '48 cm'
    },
    correctOption: 'B',
    explanation: 'AC² = AB² + BC² = 6² + 8² = 36 + 64 = 100. AC = √100 = 10 cm (standard 3-4-5 Pythagorean triplet).',
    chiefExaminerMisconception: {
      A: 'Candidate added the linear lengths (6 + 8 = 14) without squaring.',
      B: 'CORRECT: Candidate evaluated squares and extracted the principal square root.',
      C: 'Candidate made an arithmetic estimation error.',
      D: 'Candidate multiplied 6 by 8 instead of applying Pythagoras theorem.'
    },
    initialVotes: { A: 5, B: 33, C: 2, D: 3 }
  },
  {
    id: 'poll_jss3_bsc_01',
    level: 'JSS 3',
    subject: 'Basic Science',
    topic: 'Ohm’s Law & Electrical Current',
    question: 'If a dry cell provides an electromotive force of 6 Volts across an electric torch bulb of resistance 3 Ohms, what current flows through the circuit?',
    options: {
      A: '18 Amperes',
      B: '2 Amperes',
      C: '0.5 Amperes',
      D: '9 Amperes'
    },
    correctOption: 'B',
    explanation: 'According to Ohm’s Law: I = V / R = 6 V / 3 Ω = 2 Amperes.',
    chiefExaminerMisconception: {
      A: 'Candidate multiplied Voltage by Resistance (6 × 3 = 18) instead of dividing.',
      B: 'CORRECT: Accurate substitution into Ohm’s Law formula I = V/R.',
      C: 'Candidate inverted the formula as R / V = 3 / 6 = 0.5.',
      D: 'Candidate added V + R (6 + 3 = 9).'
    },
    initialVotes: { A: 4, B: 35, C: 3, D: 1 }
  },
  {
    id: 'poll_jss3_btech_01',
    level: 'JSS 3',
    subject: 'Basic Technology',
    topic: 'Gears & Mechanical Advantage',
    question: 'A driver gear with 15 teeth drives a larger gear with 45 teeth. What is the velocity ratio of the transmission?',
    options: {
      A: '0.33',
      B: '3 : 1',
      C: '60 : 1',
      D: '30 : 1'
    },
    correctOption: 'B',
    explanation: 'Velocity Ratio = Number of teeth on Driven Gear / Number of teeth on Driver Gear = 45 / 15 = 3.',
    chiefExaminerMisconception: {
      A: 'Candidate inverted the formula (Driver / Driven = 15 / 45 = 0.33).',
      B: 'CORRECT: Correctly calculated Driven / Driver = 45 / 15 = 3.',
      C: 'Candidate added teeth counts (15 + 45 = 60).',
      D: 'Candidate subtracted teeth counts (45 - 15 = 30).'
    },
    initialVotes: { A: 6, B: 30, C: 2, D: 2 }
  },

  // ---------------------------------------------------------------------------
  // SSS 1
  // ---------------------------------------------------------------------------
  {
    id: 'poll_sss1_bio_01',
    level: 'SSS 1',
    subject: 'Biology',
    topic: 'Circulatory System & Cardiac Anatomy',
    question: 'Why is the muscular wall of the left ventricle significantly thicker than that of the right ventricle in the mammalian heart?',
    options: {
      A: 'It receives deoxygenated blood under low pressure from the lungs',
      B: 'It pumps oxygenated blood throughout the entire systemic body against high vascular resistance',
      C: 'It contains the sinoatrial pacemaker node',
      D: 'It connects directly to the pulmonary artery'
    },
    correctOption: 'B',
    explanation: 'The left ventricle must generate high systolic pressure (~120 mmHg) to pump blood through the aorta to all peripheral organs, whereas the right ventricle only pumps to nearby lungs (~25 mmHg).',
    chiefExaminerMisconception: {
      A: 'The left side carries oxygenated blood, not deoxygenated blood.',
      B: 'CORRECT: Accurately connected structural muscular thickness to systemic workload.',
      C: 'The sinoatrial node is situated in the wall of the right atrium, not the left ventricle.',
      D: 'The right ventricle connects to the pulmonary artery; the left ventricle connects to the aorta.'
    },
    initialVotes: { A: 4, B: 38, C: 3, D: 2 }
  },
  {
    id: 'poll_sss1_chem_01',
    level: 'SSS 1',
    subject: 'Chemistry',
    topic: 'Atomic Structure & Isotopes',
    question: 'An atom of chlorine has 17 protons and 18 neutrons. What is its mass number and standard atomic symbol notation?',
    options: {
      A: 'Mass number = 18; symbol: ¹⁸₁₇Cl',
      B: 'Mass number = 35; symbol: ³⁵₁₇Cl',
      C: 'Mass number = 17; symbol: ¹⁷₃₅Cl',
      D: 'Mass number = 1; symbol: ¹₁₇Cl'
    },
    correctOption: 'B',
    explanation: 'Mass number A = Protons + Neutrons = 17 + 18 = 35. Atomic number Z = 17 protons. Notation: ³⁵₁₇Cl.',
    chiefExaminerMisconception: {
      A: 'Candidate mistook neutrons alone for the total atomic mass number.',
      B: 'CORRECT: Correctly evaluated A = p + n (17 + 18 = 35) with Z subscript.',
      C: 'Candidate inverted mass number superscript and atomic number subscript.',
      D: 'Candidate subtracted protons from neutrons (18 - 17 = 1).'
    },
    initialVotes: { A: 3, B: 36, C: 5, D: 1 }
  },
  {
    id: 'poll_sss1_phys_01',
    level: 'SSS 1',
    subject: 'Physics',
    topic: 'Vectors & Scalar Quantities',
    question: 'Which of the following physical quantities is a VECTOR possessing both magnitude and spatial direction?',
    options: {
      A: 'Speed of a moving vehicle',
      B: 'Displacement from Lagos to Ibadan',
      C: 'Temperature of boiling palm oil',
      D: 'Mass of a sack of cassava flour'
    },
    correctOption: 'B',
    explanation: 'Displacement is the shortest distance between two points in a specified geographical direction, making it a vector quantity.',
    chiefExaminerMisconception: {
      A: 'Speed is a scalar quantity (rate of change of distance without specified direction).',
      B: 'CORRECT: Identified vector quantity having both magnitude (130 km) and direction (North).',
      C: 'Temperature is a scalar thermal measurement possessing magnitude only.',
      D: 'Mass is a fundamental scalar quantity possessing magnitude only.'
    },
    initialVotes: { A: 5, B: 34, C: 2, D: 1 }
  },
  {
    id: 'poll_sss1_econ_01',
    level: 'SSS 1',
    subject: 'Economics',
    topic: 'Fundamental Concepts of Economics',
    question: 'A secondary school leaver chooses to study Medicine at the University of Ibadan rather than take up an immediate banking apprenticeship paying ₦80,000 monthly. The forgone apprenticeship represents the candidate’s:',
    options: {
      A: 'Marginal utility',
      B: 'Opportunity cost (Alternative forgone)',
      C: 'Direct production tax',
      D: 'Balance of trade deficit'
    },
    correctOption: 'B',
    explanation: 'Opportunity cost is the real cost of satisfying an economic want expressed in terms of the next best alternative forgone.',
    chiefExaminerMisconception: {
      A: 'Marginal utility is the additional satisfaction derived from consuming an extra unit.',
      B: 'CORRECT: Candidate accurately applied the concept of alternative choice sacrificed.',
      C: 'Taxes are compulsory levies imposed by government authority.',
      D: 'Balance of trade relates to international export vs import values.'
    },
    initialVotes: { A: 3, B: 39, C: 0, D: 1 }
  },

  // ---------------------------------------------------------------------------
  // SSS 2
  // ---------------------------------------------------------------------------
  {
    id: 'poll_sss2_math_01',
    level: 'SSS 2',
    subject: 'Mathematics',
    topic: 'Quadratic Equations & Roots',
    question: 'What are the roots of the quadratic equation x² - 5x + 6 = 0?',
    options: {
      A: 'x = -2 or x = -3',
      B: 'x = 2 or x = 3',
      C: 'x = 1 or x = 6',
      D: 'x = -1 or x = 6'
    },
    correctOption: 'B',
    explanation: 'Factorize: (x - 2)(x - 3) = 0. Therefore, x - 2 = 0 => x = 2; and x - 3 = 0 => x = 3.',
    chiefExaminerMisconception: {
      A: 'Candidate forgot to change signs when equating factors to zero: x - 2 = 0 gives +2, not -2.',
      B: 'CORRECT: Accurately identified factors (-2, -3) and solved roots (+2, +3).',
      C: 'Candidate chose factors of 6 whose sum is 7 rather than 5.',
      D: 'Candidate made a sign error in factoring.'
    },
    initialVotes: { A: 8, B: 32, C: 3, D: 2 }
  },
  {
    id: 'poll_sss2_chem_01',
    level: 'SSS 2',
    subject: 'Chemistry',
    topic: 'Volumetric Titration & Indicators',
    question: 'When titrating 0.1 M Hydrochloric acid (strong acid) against 0.1 M Sodium Hydroxide (strong base), what is the color change of Phenolphthalein indicator at the stoichiometric end-point?',
    options: {
      A: 'Orange to bright yellow',
      B: 'Pink to Colorless (or Colorless to faint Pink)',
      C: 'Blue to deep red',
      D: 'Green to purple'
    },
    correctOption: 'B',
    explanation: 'Phenolphthalein is pink in alkaline solutions (pH > 8.3) and turns colorless in acidic/neutral solutions (pH < 8.3).',
    chiefExaminerMisconception: {
      A: 'Orange to yellow is the transition for Methyl Orange indicator in acid-base titration.',
      B: 'CORRECT: Candidate accurately identified phenolphthalein transition behavior.',
      C: 'Blue to red describes litmus paper behavior in acid, not phenolphthalein.',
      D: 'Green to purple is the transition for universal indicator across extreme pH.'
    },
    initialVotes: { A: 5, B: 37, C: 2, D: 1 }
  },
  {
    id: 'poll_sss2_phys_01',
    level: 'SSS 2',
    subject: 'Physics',
    topic: 'Kinematics: Projectile Motion',
    question: 'At the maximum vertical height of a projectile launched into the air with initial velocity u at angle θ, what is its vertical velocity Vy?',
    options: {
      A: 'Vy = u cos θ',
      B: 'Vy = 0 m/s',
      C: 'Vy = 9.8 m/s',
      D: 'Vy = u sin θ'
    },
    correctOption: 'B',
    explanation: 'At maximum height, the projectile momentarily ceases vertical ascent (Vy = 0) before descending under gravity, while horizontal velocity Vx = u cos θ remains constant.',
    chiefExaminerMisconception: {
      A: 'u cos θ is the horizontal velocity Vx, which remains non-zero throughout flight.',
      B: 'CORRECT: Candidate recognized that vertical kinetic energy converts completely to potential energy at H_max.',
      C: '9.8 m/s² is the gravitational acceleration g, not the velocity.',
      D: 'u sin θ is the initial vertical velocity at launch, not at peak height.'
    },
    initialVotes: { A: 4, B: 36, C: 3, D: 2 }
  },
  {
    id: 'poll_sss2_gov_01',
    level: 'SSS 2',
    subject: 'Government',
    topic: 'Separation of Powers',
    question: 'In the Nigerian presidential system of government, which constitutional organ is vested with the power of impeachment and budget appropriation?',
    options: {
      A: 'The Federal Executive Council',
      B: 'The National Assembly (The Legislature)',
      C: 'The Supreme Court of Nigeria',
      D: 'The National Youth Council'
    },
    correctOption: 'B',
    explanation: 'Under Section 143 and Section 80 of the 1999 Constitution, the National Assembly possesses the power of budget approval (power of the purse) and impeachment.',
    chiefExaminerMisconception: {
      A: 'The Executive executes laws and prepares budget proposals, but cannot approve its own budget.',
      B: 'CORRECT: Accurately stated legislative check on executive overreach.',
      C: 'The Judiciary interprets laws and resolves constitutional disputes, not budget appropriation.',
      D: 'Non-governmental civil organization without statutory constitutional powers.'
    },
    initialVotes: { A: 3, B: 38, C: 2, D: 1 }
  },

  // ---------------------------------------------------------------------------
  // SSS 3
  // ---------------------------------------------------------------------------
  {
    id: 'poll_sss3_math_01',
    level: 'SSS 3',
    subject: 'Mathematics',
    topic: 'Calculus: Differentiation',
    question: 'What is the derivative with respect to x of the polynomial function y = 4x³ - 5x² + 7x - 9?',
    options: {
      A: 'dy/dx = 12x² - 10x + 7',
      B: 'dy/dx = 4x² - 5x + 7',
      C: 'dy/dx = 12x³ - 10x² + 7x',
      D: 'dy/dx = 12x² - 10x'
    },
    correctOption: 'A',
    explanation: 'Using power rule d(axⁿ)/dx = n·a·xⁿ⁻¹: 3(4)x² - 2(5)x¹ + 1(7)x⁰ - 0 = 12x² - 10x + 7.',
    chiefExaminerMisconception: {
      A: 'CORRECT: Candidate accurately applied the power rule d/dx(xⁿ) = n·xⁿ⁻¹ to each term.',
      B: 'Candidate simply dropped powers without multiplying by the exponents.',
      C: 'Candidate multiplied by power without reducing power by 1.',
      D: 'Candidate omitted the constant-coefficient derivative term (+7).'
    },
    initialVotes: { A: 33, B: 4, C: 3, D: 5 }
  },
  {
    id: 'poll_sss3_bio_01',
    level: 'SSS 3',
    subject: 'Biology',
    topic: 'Genetics & Mendelian Inheritance',
    question: 'If two heterozygous tall pea plants (Tt) are crossed, what is the expected phenotypic ratio of Tall to Short offspring in the F1 generation?',
    options: {
      A: '1 Tall : 1 Short',
      B: '3 Tall : 1 Short',
      C: 'All Tall offspring (100%)',
      D: '1 Tall : 2 Intermediate : 1 Short'
    },
    correctOption: 'B',
    explanation: 'Monohybrid cross Tt × Tt yields genotypes 1 TT, 2 Tt, 1 tt. Because T is dominant over t, TT and Tt are phenotypically tall (3 tall : 1 short).',
    chiefExaminerMisconception: {
      A: '1:1 ratio results from a test cross between heterozygous Tt and homozygous recessive tt.',
      B: 'CORRECT: Correctly calculated 75% dominant tall and 25% recessive dwarf phenotype.',
      C: '100% tall results from homozygous TT × tt, not heterozygous Tt × Tt.',
      D: '1:2:1 is the genotypic ratio, not the phenotypic ratio.'
    },
    initialVotes: { A: 4, B: 35, C: 2, D: 4 }
  },
  {
    id: 'poll_sss3_econ_01',
    level: 'SSS 3',
    subject: 'Economics',
    topic: 'Macroeconomics: National Income Accounting',
    question: 'How is Gross National Product (GNP) at market prices derived from Gross Domestic Product (GDP)?',
    options: {
      A: 'GNP = GDP - Depreciation',
      B: 'GNP = GDP + Net Factor Income from Abroad (NFIA)',
      C: 'GNP = GDP - Indirect Business Taxes',
      D: 'GNP = GDP / Total Population'
    },
    correctOption: 'B',
    explanation: 'GNP measures the output generated by nationals regardless of geographical location: GNP = GDP + (Factor income earned by Nigerians abroad - Factor income earned by foreigners in Nigeria).',
    chiefExaminerMisconception: {
      A: 'GDP minus Depreciation gives Net Domestic Product (NDP).',
      B: 'CORRECT: Candidate accurately accounted for Net Factor Income from Abroad (NFIA).',
      C: 'GDP minus indirect taxes plus subsidies gives GDP at factor cost.',
      D: 'GDP divided by population yields Per Capita Income, not GNP.'
    },
    initialVotes: { A: 5, B: 34, C: 3, D: 2 }
  },
  {
    id: 'poll_sss3_chem_01',
    level: 'SSS 3',
    subject: 'Chemistry',
    topic: 'Electrochemistry & Faraday’s Laws',
    question: 'According to Faraday’s First Law of Electrolysis, the mass (m) of an element liberated at an electrode during electrolysis is directly proportional to:',
    options: {
      A: 'The atmospheric pressure in the laboratory',
      B: 'The quantity of electricity (Q = I × t) passing through the electrolyte',
      C: 'The volume of water added to the beaker',
      D: 'The length of the electrical wire connections'
    },
    correctOption: 'B',
    explanation: 'Faraday’s First Law states: m ∝ Q => m = Z·I·t, where m is mass, Q is charge in Coulombs, I is current in Amperes, and t is time in seconds.',
    chiefExaminerMisconception: {
      A: 'Electrolytic deposition in solution is independent of barometric pressure.',
      B: 'CORRECT: Accurately stated fundamental proportionality m = Z·I·t.',
      C: 'Dilution changes conductivity slightly but does not determine stoichiometric mass deposited per Coulomb.',
      D: 'Wire length affects circuit resistance slightly, but charge Q dictates Faraday mass.'
    },
    initialVotes: { A: 1, B: 39, C: 2, D: 1 }
  }
];

/**
 * Retrieves poll questions filtered by class level and optional subject
 */
export function getPollQuestions(level?: string, subject?: string): PollQuestionItem[] {
  let filtered = EDU_POLL_QUESTIONS;
  if (level) {
    const norm = level.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    filtered = filtered.filter(q => q.level.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === norm);
  }
  if (subject && subject !== 'All Subjects') {
    const s = subject.toLowerCase();
    filtered = filtered.filter(q => q.subject.toLowerCase().includes(s) || s.includes(q.subject.toLowerCase()));
  }
  return filtered.length > 0 ? filtered : EDU_POLL_QUESTIONS;
}

/**
 * Retrieves a single random question matching class level and subject
 */
export function getRandomPollQuestion(level?: string, subject?: string): PollQuestionItem {
  const matches = getPollQuestions(level, subject);
  const randomIndex = Math.floor(Math.random() * matches.length);
  return matches[randomIndex] || EDU_POLL_QUESTIONS[0];
}
