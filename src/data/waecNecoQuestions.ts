export interface PastQuestion {
  id: string;
  exam: 'WAEC' | 'NECO' | 'BECE';
  year: number;
  subject: string;
  level: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0 for A, 1 for B, 2 for C, 3 for D
  explanation: string;
  category: 'Objective' | 'Theory';
  topic: string;
}

export const waecNecoPastQuestions: PastQuestion[] = [
  {
    id: 'waec_math_2024_01',
    exam: 'WAEC',
    year: 2024,
    subject: 'General Mathematics',
    level: 'sss-3',
    question: 'Solve for x if 3^(2x - 1) = 81.',
    options: ['x = 2', 'x = 2.5', 'x = 3', 'x = 5'],
    correctAnswer: 1, // B
    explanation: 'Express 81 as a power of 3: 81 = 3^4. Since bases are equal: 2x - 1 = 4 => 2x = 5 => x = 5/2 = 2.5.',
    category: 'Objective',
    topic: 'Indices and Logarithms'
  },
  {
    id: 'waec_math_2024_02',
    exam: 'WAEC',
    year: 2024,
    subject: 'General Mathematics',
    level: 'sss-3',
    question: 'A trader in Balogun Market bought a bag of rice for ₦75,000 and sold it at a profit of 15%. What was the selling price?',
    options: ['₦82,500', '₦85,000', '₦86,250', '₦88,500'],
    correctAnswer: 2, // C
    explanation: 'Profit = 15% of ₦75,000 = 0.15 * 75,000 = ₦11,250. Selling Price = Cost Price + Profit = 75,000 + 11,250 = ₦86,250.',
    category: 'Objective',
    topic: 'Commercial Arithmetic'
  },
  {
    id: 'neco_math_2023_03',
    exam: 'NECO',
    year: 2023,
    subject: 'General Mathematics',
    level: 'sss-2',
    question: 'The angles of a triangle are in the ratio 2 : 3 : 5. Find the measure of the smallest angle.',
    options: ['18°', '36°', '54°', '90°'],
    correctAnswer: 1, // B
    explanation: 'Sum of angles in a triangle = 180°. Total parts = 2 + 3 + 5 = 10 parts. Smallest angle = (2/10) * 180° = 36°.',
    category: 'Objective',
    topic: 'Geometry and Trigonometry'
  },
  {
    id: 'waec_eng_2024_01',
    exam: 'WAEC',
    year: 2024,
    subject: 'English Studies',
    level: 'sss-3',
    question: 'Choose the option that best completes the sentence: "Neither the principal nor the teachers ______ present at the assembly."',
    options: ['was', 'were', 'is', 'are being'],
    correctAnswer: 1, // B
    explanation: 'Rule of Proximity for "neither...nor": The verb agrees in number with the subject closest to it. "The teachers" is plural, so plural verb "were" is required.',
    category: 'Objective',
    topic: 'Grammatical Concord'
  },
  {
    id: 'neco_bio_2023_01',
    exam: 'NECO',
    year: 2023,
    subject: 'Biology',
    level: 'sss-2',
    question: 'Which of the following cellular organelles is known as the site of protein synthesis in eukaryotic cells?',
    options: ['Mitochondria', 'Ribosome', 'Golgi apparatus', 'Lysosome'],
    correctAnswer: 1, // B
    explanation: 'Ribosomes translate mRNA into amino acid polypeptide chains (protein synthesis). Mitochondria produce ATP (cellular respiration).',
    category: 'Objective',
    topic: 'Cell Biology and Organization'
  },
  {
    id: 'bece_math_2024_01',
    exam: 'BECE',
    year: 2024,
    subject: 'Mathematics',
    level: 'jss-3',
    question: 'Simplify the algebraic expression: 5x + 3y - 2x + 4y.',
    options: ['3x + 7y', '7x + 7y', '3x - y', '10xy'],
    correctAnswer: 0, // A
    explanation: 'Group like terms: (5x - 2x) + (3y + 4y) = 3x + 7y.',
    category: 'Objective',
    topic: 'Algebraic Processes'
  },
  {
    id: 'waec_civic_2024_01',
    exam: 'WAEC',
    year: 2024,
    subject: 'Civic Education',
    level: 'sss-2',
    question: 'Under the 1999 Constitution of the Federal Republic of Nigeria, the power to interpret laws is vested in the:',
    options: ['Executive', 'Legislature', 'Judiciary', 'Electoral Commission'],
    correctAnswer: 2, // C
    explanation: 'Section 6 of the 1999 Constitution vests judicial powers in the courts (Judiciary). The Legislature makes laws; the Executive enforces them.',
    category: 'Objective',
    topic: 'Arms of Government'
  },
  {
    id: 'neco_econ_2023_01',
    exam: 'NECO',
    year: 2023,
    subject: 'Economics',
    level: 'sss-3',
    question: 'When the percentage change in quantity demanded is less than the percentage change in price, elasticity of demand is:',
    options: ['Unitary', 'Inelastic', 'Perfect elastic', 'Infinitely elastic'],
    correctAnswer: 1, // B
    explanation: 'Price elasticity of demand (PED) = %ΔQ / %ΔP. When %ΔQ < %ΔP, PED < 1, which defines inelastic demand.',
    category: 'Objective',
    topic: 'Theory of Demand and Price Elasticity'
  }
];
