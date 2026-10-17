import fs from 'node:fs';
import path from 'node:path';
import { db } from './index.ts';
import {
  users,
  curriculumLevels,
  curriculumSubjects,
  curriculumTopics,
  lessonPlans,
  resources,
  subscriptions,
  notifications,
  schemesOfWork,
  gradeRecords
} from './schema.ts';
import { eq } from 'drizzle-orm';

export async function seedDatabase() {
  console.log('🌱 Checking / seeding curriculum datasets from data/curriculum/*.json...');
  const curriculumDir = path.resolve(process.cwd(), 'data/curriculum');
  const files = ['jss1.json', 'jss2.json', 'jss3.json', 'sss1.json', 'sss2.json', 'sss3.json'];

  let totalTopics = 0;
  let totalSubjects = 0;

  for (const file of files) {
    const filePath = path.join(curriculumDir, file);
    if (!fs.existsSync(filePath)) continue;

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Insert level
    await db.insert(curriculumLevels).values({
      id: data.levelId,
      name: data.levelName,
      category: data.category,
      code: data.code,
      description: data.description,
      sortOrder: data.sortOrder,
    }).onConflictDoNothing();

    // Insert subjects and topics
    for (const sub of data.subjects) {
      totalSubjects++;
      await db.insert(curriculumSubjects).values({
        id: sub.id,
        levelId: data.levelId,
        name: sub.name,
        code: sub.code,
        description: sub.description,
        icon: sub.icon,
        termCount: sub.terms.length,
      }).onConflictDoNothing();

      for (const term of sub.terms) {
        for (const weekItem of term.weeks) {
          totalTopics++;
          const topicId = `${sub.id}-t${term.term}-w${weekItem.week}`;
          await db.insert(curriculumTopics).values({
            id: topicId,
            subjectId: sub.id,
            levelId: data.levelId,
            term: term.term,
            week: weekItem.week,
            topic: weekItem.topic,
            subtopics: JSON.stringify(weekItem.subtopics),
            objectives: JSON.stringify(weekItem.objectives),
            teacherActivities: JSON.stringify(weekItem.teacherActivities),
            studentActivities: JSON.stringify(weekItem.studentActivities),
            materials: JSON.stringify(weekItem.materials),
            evaluation: JSON.stringify(weekItem.evaluation),
          }).onConflictDoNothing();
        }
      }
    }
  }

  // --- SEED ALL STATUTORY JUNIOR & SENIOR SECONDARY SUBJECTS ---
  const { JUNIOR_SECONDARY_SUBJECTS, SENIOR_SECONDARY_SUBJECTS, getSubjectTermTopics } = await import('../data/allCurriculumSubjects.ts');

  const juniorLevels = [
    { id: 'jss-1', name: 'Junior Secondary School 1', code: 'JSS 1', order: 1 },
    { id: 'jss-2', name: 'Junior Secondary School 2', code: 'JSS 2', order: 2 },
    { id: 'jss-3', name: 'Junior Secondary School 3', code: 'JSS 3', order: 3 },
  ];

  const seniorLevels = [
    { id: 'sss-1', name: 'Senior Secondary School 1', code: 'SSS 1', order: 4 },
    { id: 'sss-2', name: 'Senior Secondary School 2', code: 'SSS 2', order: 5 },
    { id: 'sss-3', name: 'Senior Secondary School 3', code: 'SSS 3', order: 6 },
  ];

  // Seed Junior Subjects & Topics
  for (const lvl of juniorLevels) {
    for (const sub of JUNIOR_SECONDARY_SUBJECTS) {
      const subjectId = `${lvl.id}-${sub.id}`;
      totalSubjects++;

      await db.insert(curriculumSubjects).values({
        id: subjectId,
        levelId: lvl.id,
        name: sub.name,
        code: sub.code,
        description: sub.description,
        icon: sub.icon,
        termCount: 3,
      }).onConflictDoNothing();

      for (let term = 1; term <= 3; term++) {
        const weeklyTopics = getSubjectTermTopics(sub, term, lvl.id);
        for (let wk = 1; wk <= 13; wk++) {
          const topicId = `${subjectId}-t${term}-w${wk}`;
          const topicName = weeklyTopics[wk - 1] || `${sub.name}: Week ${wk} Curriculum Module`;
          const isMidterm = wk === 7;
          const isRevision = wk === 12;
          const isExam = wk === 13;

          const objectives = isMidterm
            ? [
                `Demonstrate mastery on diagnostic Continuous Assessment questions covering Weeks 1–6 (20 Marks).`,
                `Identify personal learning gaps and misconceptions through teacher review.`,
                `Formulate targeted remedial revision goals.`
              ]
            : isRevision
            ? [
                `Synthesize core operational formulas, definitions, and rules from Weeks 1–11.`,
                `Solve past BECE and state examination model questions within timed limits.`,
                `Critique typical candidate errors identified in Chief Examiner reports.`
              ]
            : isExam
            ? [
                `Complete statutory End-of-Term Examination according to NERDC specifications (60 Marks).`,
                `Demonstrate high-order analytical proficiency across multiple-choice and theory sections.`
              ]
            : [
                `Define and explain the core principles of ${topicName.split(':')[0]} (Bloom: Remember & Understand).`,
                `Apply standard methods to solve 5 structured exercises accurately (Bloom: Apply).`,
                `Illustrate real-world Nigerian commercial, environmental, or community applications (Bloom: Analyze).`,
                `Score at least 80% on the formative exit card evaluation questions.`
              ];

          const teacherActs = isMidterm
            ? [
                'Distribute standardized 20-mark CA test papers.',
                'Enforce strict examination ethics and timing.',
                'Record CA1 scores onto the academic broadsheet.'
              ]
            : [
                `Introduce ${topicName.split(':')[0]} using local Nigerian contextual analogies.`,
                'Demonstrate step-by-step methodology and formulas on the chalkboard.',
                'Facilitate cooperative paired problem-solving and provide real-time corrections.',
                'Administer formative exit-ticket evaluation to assess individual learner mastery.'
              ];

          const studentActs = isMidterm
            ? [
                'Complete Continuous Assessment test independently under examination conditions.',
                'Participate in post-test diagnostic question review.'
              ]
            : [
                'Record chalkboard notes, definitions, formulas, and diagrams in subject notebooks.',
                'Participate actively in classroom brainstorming and answer exploratory questions.',
                'Solve paired classroom drill questions with desk partners.',
                'Complete individual exit evaluation exercise.'
              ];

          const materials = [
            `NERDC Approved ${sub.name} Textbook for ${lvl.code}`,
            'Chalkboard, white chalk/dry-erase markers, and instructional wall charts',
            'Authentic Nigerian local realia, concrete models, and everyday artifacts'
          ];

          const evaluation = isMidterm
            ? ['Continuous Assessment Test 1 (20 Marks) administered and recorded']
            : isExam
            ? ['End-of-Term Examination (60 Marks) completed and scripts moderated']
            : [
                `State 3 key characteristics or definitions of ${topicName.split(':')[0]}`,
                'Solve the 2 practice drill questions on the chalkboard',
                'Explain one real-life Nigerian application in business, household, or community'
              ];

          totalTopics++;
          await db.insert(curriculumTopics).values({
            id: topicId,
            subjectId: subjectId,
            levelId: lvl.id,
            term: term,
            week: wk,
            topic: topicName,
            subtopics: JSON.stringify([
              `Foundational concepts and operational definitions for ${topicName.split(':')[0]}`,
              `Contextual Nigerian applications and demonstration examples`,
              `Chalkboard summary, class drill, and formative examination preparation`
            ]),
            objectives: JSON.stringify(objectives),
            teacherActivities: JSON.stringify(teacherActs),
            studentActivities: JSON.stringify(studentActs),
            materials: JSON.stringify(materials),
            evaluation: JSON.stringify(evaluation),
          }).onConflictDoNothing();
        }
      }
    }
  }

  // Seed Senior Subjects & Topics
  for (const lvl of seniorLevels) {
    for (const sub of SENIOR_SECONDARY_SUBJECTS) {
      const subjectId = `${lvl.id}-${sub.id}`;
      totalSubjects++;

      await db.insert(curriculumSubjects).values({
        id: subjectId,
        levelId: lvl.id,
        name: sub.name,
        code: sub.code,
        description: sub.description,
        icon: sub.icon,
        termCount: 3,
      }).onConflictDoNothing();

      for (let term = 1; term <= 3; term++) {
        const weeklyTopics = getSubjectTermTopics(sub, term, lvl.id);
        for (let wk = 1; wk <= 13; wk++) {
          const topicId = `${subjectId}-t${term}-w${wk}`;
          const topicName = weeklyTopics[wk - 1] || `${sub.name}: Week ${wk} Curriculum Module`;
          const isMidterm = wk === 7;
          const isRevision = wk === 12;
          const isExam = wk === 13;

          const objectives = isMidterm
            ? [
                `Demonstrate mastery on standardized Continuous Assessment questions covering Weeks 1–6 (20 Marks).`,
                `Identify personal learning gaps and review WAEC/NECO marking scheme standards.`,
                `Formulate targeted remedial revision goals.`
              ]
            : isRevision
            ? [
                `Synthesize core operational formulas, definitions, and rules from Weeks 1–11.`,
                `Solve past WASSCE and NECO SSCE model questions with correct method, accuracy, and unit marks.`,
                `Critique typical candidate errors identified in WAEC Chief Examiner reports.`
              ]
            : isExam
            ? [
                `Complete statutory End-of-Term Examination according to NERDC and WAEC specifications (60 Marks).`,
                `Demonstrate high-order analytical proficiency across essay, practical, and objective sections.`
              ]
            : [
                `Define and explain the core principles of ${topicName.split(':')[0]} (Bloom: Remember & Understand).`,
                `Apply standard methods and SI units to solve 5 structured problems accurately (Bloom: Apply).`,
                `Illustrate real-world Nigerian industrial, commercial, scientific, or governance applications (Bloom: Analyze).`,
                `Score at least 80% on the formative exit card evaluation questions.`
              ];

          const teacherActs = isMidterm
            ? [
                'Distribute standardized 20-mark CA test papers.',
                'Enforce strict examination ethics and timing.',
                'Record CA1 scores onto the academic broadsheet.'
              ]
            : [
                `Introduce ${topicName.split(':')[0]} using local Nigerian contextual analogies and industrial case studies.`,
                'Demonstrate step-by-step methodology, statutory equations, and SI units on the chalkboard.',
                'Facilitate cooperative paired problem-solving and provide real-time corrections.',
                'Administer formative exit-ticket evaluation to assess individual learner mastery.'
              ];

          const studentActs = isMidterm
            ? [
                'Complete Continuous Assessment test independently under WAEC-standard examination conditions.',
                'Participate in post-test diagnostic question review.'
              ]
            : [
                'Record chalkboard notes, definitions, formulas, and diagrams in subject notebooks.',
                'Participate actively in classroom brainstorming and answer exploratory questions.',
                'Solve paired classroom drill questions with desk partners.',
                'Complete individual exit evaluation exercise.'
              ];

          const materials = [
            `NERDC Approved ${sub.name} Textbook for ${lvl.code} (WASSCE / NECO aligned)`,
            'Chalkboard, white chalk/dry-erase markers, and instructional wall charts',
            'Authentic Nigerian local realia, laboratory apparatus, or industry specimens'
          ];

          const evaluation = isMidterm
            ? ['Continuous Assessment Test 1 (20 Marks) administered and recorded']
            : isExam
            ? ['End-of-Term Examination (60 Marks) completed and scripts moderated']
            : [
                `State 3 key characteristics or definitions of ${topicName.split(':')[0]}`,
                'Solve the 2 practice drill questions on the chalkboard showing all steps and units',
                'Explain one real-life Nigerian application in commerce, industry, or public governance'
              ];

          totalTopics++;
          await db.insert(curriculumTopics).values({
            id: topicId,
            subjectId: subjectId,
            levelId: lvl.id,
            term: term,
            week: wk,
            topic: topicName,
            subtopics: JSON.stringify([
              `Foundational concepts, statutory laws, and operational definitions for ${topicName.split(':')[0]}`,
              `Contextual Nigerian applications, worked mathematical/theoretical examples`,
              `Chalkboard summary, class drill, and formative examination preparation`
            ]),
            objectives: JSON.stringify(objectives),
            teacherActivities: JSON.stringify(teacherActs),
            studentActivities: JSON.stringify(studentActs),
            materials: JSON.stringify(materials),
            evaluation: JSON.stringify(evaluation),
          }).onConflictDoNothing();
        }
      }
    }
  }

  console.log(`✅ Fully seeded all core subjects (${totalSubjects} subjects) and ${totalTopics} curriculum topics across JSS & SSS.`);

  // Create demo teacher user if not exists
  const demoUserId = 'usr_teacher_demo_01';
  const existingUser = await db.select().from(users).where(eq(users.id, demoUserId));
  
  if (existingUser.length === 0) {
    console.log('👤 Seeding default demo teacher user...');
    await db.insert(users).values({
      id: demoUserId,
      name: 'Mrs. Amina Balogun',
      email: 'amina.balogun@schools.ng',
      passwordHash: 'argon2id_mock_hash_eduplan_demo',
      schoolName: 'King\'s College, Lagos',
      state: 'Lagos',
      lga: 'Lagos Island',
      assignedLevels: JSON.stringify(['jss-1', 'jss-2', 'sss-1']),
      assignedSubjects: JSON.stringify(['Mathematics', 'Basic Science & Technology', 'General Mathematics']),
      role: 'teacher',
      onboardingCompletedAt: new Date().toISOString(),
      streakCount: 5,
      lastActiveDate: new Date().toISOString().split('T')[0],
      referralCode: 'AMINA-EDU-2026',
      createdAt: new Date().toISOString(),
    }).onConflictDoNothing();

    // Seed Active Pro Subscription
    await db.insert(subscriptions).values({
      id: 'sub_demo_pro_01',
      userId: demoUserId,
      plan: 'pro_annual',
      status: 'active',
      koraReference: 'kora_ref_demo_annual_2026',
      amount: 22000,
      currency: 'NGN',
      startDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      autoRenew: 1,
      receiptUrl: 'https://pay.korapay.com/receipt/demo_annual_2026',
    }).onConflictDoNothing();

    // Seed Notifications
    await db.insert(notifications).values([
      {
        id: 'notif_1',
        userId: demoUserId,
        title: 'Welcome to EduPlan NG',
        message: 'Your school term dashboard is ready. NERDC 2026 curriculum standards are loaded for JSS 1–3 and SSS 1–3.',
        type: 'system',
        read: 0,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'notif_2',
        userId: demoUserId,
        title: 'Term 1 Week 3 Lesson Plans Due',
        message: 'Kindly submit your lesson plans for Algebraic Expressions and Cell Theory for HOD review.',
        type: 'curriculum',
        read: 0,
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
      {
        id: 'notif_3',
        userId: demoUserId,
        title: 'Annual Pro Subscription Confirmed',
        message: 'Your payment of ₦22,000 via Kora Pay was successful. Unlimited lesson plans & AI tools unlocked.',
        type: 'billing',
        read: 1,
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      }
    ]).onConflictDoNothing();

    // Seed realistic Lesson Plans
    await db.insert(lessonPlans).values([
      {
        id: 'lp_sample_01',
        userId: demoUserId,
        title: 'Whole Numbers: Place Value and Large Digits in Base 10',
        level: 'jss-1',
        subject: 'Mathematics',
        term: 1,
        week: 1,
        duration: '40 mins',
        previousKnowledge: 'Pupils can count numbers up to 100,000 and write simple numerals from Primary 6.',
        introduction: 'Display a large budget figure from the Nigerian Federal Budget (e.g., ₦28 Trillion) and ask students to determine the place value of the leftmost digits.',
        teacherActivity: 'Guide students on place value charts (Units, Tens, Hundreds, Thousands, Millions, Billions, Trillions). Demonstrate writing numbers in words and figures.',
        studentActivity: 'Students practice reading figures from flashcards in pairs and solve 5 drill problems in their exercise books.',
        evaluation: 'What is the place value of 7 in 4,789,120? Write seventy-five million, four hundred and two thousand in figures.',
        assignment: 'Complete exercise 1.2, questions 1-10 on page 14 of the NERDC Mathematics textbook.',
        references: 'NERDC National Curriculum for Basic 7; New General Mathematics for Junior Secondary Schools, Book 1.',
        objectives: JSON.stringify([
          'Identify and write place values of digits up to 10 digits in Base 10',
          'Convert numbers written in words to standard numerical digits accurately',
          'Solve practical word problems involving real-life commercial budgets'
        ]),
        materials: JSON.stringify([
          'Place value chart',
          'Flashcards of numbers in millions and billions',
          'Whiteboard & markers',
          'Sample Nigerian currency denomination models'
        ]),
        differentiatedInstruction: JSON.stringify({
          struggling: 'Use physical abacus and 4-digit place value counters with direct teacher guidance.',
          onLevel: 'Standard place value worksheet with numbers up to 8 digits.',
          advanced: 'Solve Nigerian national GDP comparison figures and convert into expanded index notation.'
        }),
        bloomTags: JSON.stringify(['Remember', 'Understand', 'Apply']),
        language: 'en',
        status: 'published',
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
      {
        id: 'lp_sample_02',
        userId: demoUserId,
        title: 'Living and Non-Living Things: Botanical & Zoological Classification',
        level: 'jss-1',
        subject: 'Basic Science & Technology',
        term: 1,
        week: 2,
        duration: '40 mins',
        previousKnowledge: 'Students observe trees, birds, rocks, and water around their school compound.',
        introduction: 'Take students to the school garden for 3 minutes. Have them pick or point to two distinct items and contrast their movement.',
        teacherActivity: 'Explain MR NIGER D (Movement, Respiration, Nutrition, Irritability, Growth, Excretion, Reproduction, Death). Illustrate with living plants and stones.',
        studentActivity: 'Draw a comparative table in notebooks contrasting living vs non-living characteristics.',
        evaluation: 'Mention four characteristics that distinguish a mango tree from a wooden school desk.',
        assignment: 'Collect and paste three leaves from different plants in your science project scrap book.',
        references: 'NERDC Basic Science & Tech Curriculum; STAN Basic Science for Junior Secondary Schools.',
        objectives: JSON.stringify([
          'State at least six characteristics of living organisms (MR NIGER D)',
          'Distinguish between plant and animal nutritional modes with 100% accuracy',
          'Classify a given list of 10 schoolyard items into living and non-living'
        ]),
        materials: JSON.stringify([
          'Potted hibiscus plant',
          'Aquarium or live earthworm specimen in glass jar',
          'Wall chart of animal classification',
          'Magnifying hand lenses'
        ]),
        differentiatedInstruction: JSON.stringify({
          struggling: 'Match picture flashcards of living things with their life process cards.',
          onLevel: 'Write short descriptions of how plants carry out respiration and irritability.',
          advanced: 'Debate viruses: why viruses exhibit both living and non-living characteristics.'
        }),
        bloomTags: JSON.stringify(['Understand', 'Analyze']),
        language: 'en',
        status: 'published',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        id: 'lp_sample_03',
        userId: demoUserId,
        title: 'Indices and Standard Form: Laws of Multiplication & Division',
        level: 'sss-1',
        subject: 'General Mathematics',
        term: 1,
        week: 2,
        duration: '80 mins (Double Period)',
        previousKnowledge: 'Students know how to compute powers of 2 and 10 from JSS 3.',
        introduction: 'Challenge students to calculate the distance from Earth to the Sun (150,000,000 km) in compact exponential form.',
        teacherActivity: 'Derive the index laws: a^m * a^n = a^(m+n) and a^m / a^n = a^(m-n). Work through 4 WASSCE standard examples on the board.',
        studentActivity: 'Students simplify 6 algebraic index problems individually and cross-check answers on the board.',
        evaluation: 'Simplify: (3x^2 y^3) * (4x^4 y^-1) / (6x^3 y^2). Express 0.000456 in standard form.',
        assignment: 'WASSCE Past Questions 2022-2025: Section A, numbers 1 to 5.',
        references: 'NERDC Senior Secondary School Curriculum for General Mathematics; New General Mathematics for SSS 1.',
        objectives: JSON.stringify([
          'Apply the first and second laws of indices to simplify algebraic expressions',
          'Explain the zero index (a^0 = 1) and negative index (a^-n = 1/a^n) rigorously',
          'Convert large astronomical numbers and microscopic dimensions into standard form'
        ]),
        materials: JSON.stringify([
          'Mathematical log tables (4-figure tables)',
          'Scientific calculators',
          'Formula display charts'
        ]),
        differentiatedInstruction: JSON.stringify({
          struggling: 'Step-by-step expansion of powers into repeated factors before applying the rule.',
          onLevel: 'Direct application of product and quotient index rules on algebraic terms.',
          advanced: 'Solve fractional index equations involving radicals and simultaneous unknowns.'
        }),
        bloomTags: JSON.stringify(['Apply', 'Analyze']),
        language: 'en',
        status: 'published',
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      }
    ]).onConflictDoNothing();

    // Seed Resources
    await db.insert(resources).values([
      {
        id: 'res_01',
        userId: demoUserId,
        title: 'NERDC Curriculum Handbook — Junior Secondary Mathematics',
        description: 'Complete syllabus, weekly breakdown, and behavioral objectives approved by the Federal Ministry of Education.',
        level: 'jss-1',
        subject: 'Mathematics',
        fileType: 'pdf',
        fileUrl: '/assets/docs/nerdc_jss_math_syllabus.pdf',
        fileSize: '2.4 MB',
        topicTag: 'Whole Numbers',
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      },
      {
        id: 'res_02',
        userId: demoUserId,
        title: 'WASSCE Past Questions & Detailed Solutions (2018–2025)',
        description: 'Curated 7-year compilation of General Mathematics Theory and Objective past questions with marking rubrics.',
        level: 'sss-1',
        subject: 'General Mathematics',
        fileType: 'pdf',
        fileUrl: '/assets/docs/waec_math_compilation.pdf',
        fileSize: '4.8 MB',
        topicTag: 'Indices and Standard Form',
        createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
      },
      {
        id: 'res_03',
        userId: demoUserId,
        title: 'Basic Science Laboratory Safety & Apparatus Identification Chart',
        description: 'High-resolution printable guide showing Bunsen burners, test tubes, pipettes, and safety symbols.',
        level: 'jss-1',
        subject: 'Basic Science & Technology',
        fileType: 'slide',
        fileUrl: '/assets/slides/lab_safety_apparatus.pptx',
        fileSize: '6.1 MB',
        topicTag: 'Living and Non-Living Things',
        createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
      }
    ]).onConflictDoNothing();

    // Seed sample Scheme of Work
    await db.insert(schemesOfWork).values({
      id: 'sow_demo_01',
      userId: demoUserId,
      title: 'First Term Scheme of Work — JSS 1 Mathematics',
      level: 'jss-1',
      subject: 'Mathematics',
      term: 1,
      academicYear: '2026/2027',
      weeksData: JSON.stringify([
        { week: 1, topic: 'Whole Numbers: Counting & Place Value', periods: 4, evaluation: 'Class test 1' },
        { week: 2, topic: 'Prime Numbers, Factors & LCM/HCF', periods: 4, evaluation: 'Oral drill' },
        { week: 3, topic: 'Fractions: Types & Conversions', periods: 4, evaluation: 'Homework check' },
        { week: 4, topic: 'Operations on Fractions (+, -, *, /)', periods: 4, evaluation: 'Peer grading' },
        { week: 5, topic: 'Decimals & Percentage Calculations', periods: 4, evaluation: 'Commercial math quiz' },
        { week: 6, topic: 'Approximations & Significant Figures', periods: 4, evaluation: 'Speed drill' },
        { week: 7, topic: 'Mid-Term Assessment & CA Test 1', periods: 4, evaluation: 'CA Score sheet' },
        { week: 8, topic: 'Introduction to Algebra & Open Sentences', periods: 4, evaluation: 'Whiteboard challenge' },
        { week: 9, topic: 'Addition and Subtraction of Like Terms', periods: 4, evaluation: 'Group problem set' },
        { week: 10, topic: 'Simple Linear Equations in One Unknown', periods: 4, evaluation: 'Diagnostic test' },
        { week: 11, topic: 'Word Problems Leading to Linear Equations', periods: 4, evaluation: 'Real-world application' },
        { week: 12, topic: 'Comprehensive Termly Revision', periods: 4, evaluation: 'Mock exam' },
        { week: 13, topic: 'Terminal Examination & Broadsheets', periods: 4, evaluation: 'Report card entry' }
      ]),
      status: 'active',
      createdAt: new Date().toISOString(),
    }).onConflictDoNothing();

    // Seed Sample Grade Records
    const sampleStudents = [
      { name: 'Chukwuebuka Okonkwo', reg: 'KC/2026/041', ca1: 18, ca2: 17, exam: 58, total: 93, grade: 'A1', remark: 'Distinction' },
      { name: 'Fatima Abubakar', reg: 'KC/2026/042', ca1: 16, ca2: 18, exam: 52, total: 86, grade: 'A1', remark: 'Distinction' },
      { name: 'Babatunde Adeleke', reg: 'KC/2026/043', ca1: 14, ca2: 15, exam: 48, total: 77, grade: 'B2', remark: 'Very Good' },
      { name: 'Grace Nnamdi', reg: 'KC/2026/044', ca1: 15, ca2: 14, exam: 43, total: 72, grade: 'B3', remark: 'Good' },
      { name: 'Yakubu Danjuma', reg: 'KC/2026/045', ca1: 12, ca2: 13, exam: 40, total: 65, grade: 'C4', remark: 'Credit' },
      { name: 'Zainab Bello', reg: 'KC/2026/046', ca1: 11, ca2: 12, exam: 38, total: 61, grade: 'C5', remark: 'Credit' }
    ];

    for (let i = 0; i < sampleStudents.length; i++) {
      const s = sampleStudents[i];
      await db.insert(gradeRecords).values({
        id: `grd_demo_${i + 1}`,
        userId: demoUserId,
        level: 'jss-1',
        subject: 'Mathematics',
        term: 1,
        studentName: s.name,
        studentRegNo: s.reg,
        ca1Score: s.ca1,
        ca2Score: s.ca2,
        examScore: s.exam,
        totalScore: s.total,
        gradeLetter: s.grade,
        remark: s.remark,
        createdAt: new Date().toISOString(),
      }).onConflictDoNothing();
    }

    console.log('✅ Demo user, lesson plans, resources, schemes, and broadsheets seeded.');
  }

  console.log('🎉 Database seeding complete!');
}
