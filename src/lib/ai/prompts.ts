/**
 * EduPlan NG - Official Nigerian AI Generation Prompts & System Instructions
 * Engineered for Strict Compliance:
 * - NERDC (National Educational Research and Development Council)
 * - Lagos State Ministry of Education OEQA (Office of Education Quality Assurance, Alausa)
 */

import type { TwentyFirstCenturySkill } from '../../types/curriculum.ts';

// ============================================================================
// 1. SUBJECT CORE 21ST-CENTURY SKILLS DIRECTORY (NIGERIAN CONTEXT)
// ============================================================================

export const SUBJECT_CORE_SKILLS_MAP: Record<string, TwentyFirstCenturySkill[]> = {
  // Mathematics & Quantitative
  Mathematics: ['Quantitative Reasoning', 'Problem Solving', 'Critical Thinking', 'Financial Literacy & Commercial Acumen'],
  'General Mathematics': ['Quantitative Reasoning', 'Problem Solving', 'Critical Thinking', 'Financial Literacy & Commercial Acumen'],
  'Further Mathematics': ['Quantitative Reasoning', 'Problem Solving', 'Critical Thinking', 'Spatial Reasoning & Visualization'],

  // Core Sciences
  Biology: ['Scientific Inquiry & Investigation', 'Environmental Stewardship & Sustainability', 'Critical Thinking', 'Problem Solving'],
  Chemistry: ['Scientific Inquiry & Investigation', 'Problem Solving', 'Critical Thinking', 'Environmental Stewardship & Sustainability'],
  Physics: ['Problem Solving', 'Quantitative Reasoning', 'Scientific Inquiry & Investigation', 'Critical Thinking'],
  'Basic Science': ['Scientific Inquiry & Investigation', 'Environmental Stewardship & Sustainability', 'Critical Thinking'],
  'Basic Technology': ['Creativity, Design & Innovation', 'Spatial Reasoning & Visualization', 'Problem Solving'],
  'Technical Drawing': ['Spatial Reasoning & Visualization', 'Creativity, Design & Innovation', 'Problem Solving'],

  // Humanities & Languages
  'English Studies': ['Communication & Verbal Articulation', 'Critical Thinking', 'Cultural Awareness & Heritage Appreciation', 'Empathy & Emotional Intelligence'],
  'English Language': ['Communication & Verbal Articulation', 'Critical Thinking', 'Cultural Awareness & Heritage Appreciation', 'Collaboration & Teamwork'],
  'Literature in English': ['Critical Thinking', 'Empathy & Emotional Intelligence', 'Cultural Awareness & Heritage Appreciation', 'Communication & Verbal Articulation'],
  'Civic Education': ['Civic Responsibility & National Values', 'Critical Thinking', 'Cultural Awareness & Heritage Appreciation'],
  Government: ['Civic Responsibility & National Values', 'Critical Thinking', 'Communication & Verbal Articulation'],
  'Social Studies': ['Civic Responsibility & National Values', 'Cultural Awareness & Heritage Appreciation', 'Critical Thinking'],
  History: ['Critical Thinking', 'Cultural Awareness & Heritage Appreciation', 'Civic Responsibility & National Values'],
  'Christian Religious Studies (CRS)': ['Empathy & Emotional Intelligence', 'Civic Responsibility & National Values', 'Critical Thinking'],
  'Islamic Religious Studies (IRS)': ['Empathy & Emotional Intelligence', 'Civic Responsibility & National Values', 'Critical Thinking'],
  'Èdè Yorùbá': ['Cultural Awareness & Heritage Appreciation', 'Communication & Verbal Articulation', 'Creativity, Design & Innovation'],
  'Asụsụ Igbo': ['Cultural Awareness & Heritage Appreciation', 'Communication & Verbal Articulation', 'Creativity, Design & Innovation'],
  'Harshen Hausa': ['Cultural Awareness & Heritage Appreciation', 'Communication & Verbal Articulation', 'Creativity, Design & Innovation'],

  // Commercial & Financial
  Commerce: ['Financial Literacy & Commercial Acumen', 'Problem Solving', 'Critical Thinking', 'Communication & Verbal Articulation'],
  'Financial Accounting': ['Financial Literacy & Commercial Acumen', 'Quantitative Reasoning', 'Problem Solving', 'Critical Thinking'],
  Economics: ['Financial Literacy & Commercial Acumen', 'Critical Thinking', 'Quantitative Reasoning', 'Problem Solving'],
  'Business Studies': ['Financial Literacy & Commercial Acumen', 'Collaboration & Teamwork', 'Communication & Verbal Articulation'],

  // Vocational & Practical
  'Agricultural Science': ['Environmental Stewardship & Sustainability', 'Problem Solving', 'Financial Literacy & Commercial Acumen', 'Scientific Inquiry & Investigation'],
  'Home Economics': ['Creativity, Design & Innovation', 'Financial Literacy & Commercial Acumen', 'Problem Solving', 'Collaboration & Teamwork'],
  'Physical and Health Education (PHE)': ['Collaboration & Teamwork', 'Problem Solving', 'Environmental Stewardship & Sustainability'],
  'Cultural and Creative Arts (CCA)': ['Creativity, Design & Innovation', 'Cultural Awareness & Heritage Appreciation', 'Spatial Reasoning & Visualization'],
  'Computer Studies / ICT': ['Digital Literacy & Algorithmic Thinking', 'Problem Solving', 'Creativity, Design & Innovation', 'Critical Thinking'],
  'Data Processing': ['Digital Literacy & Algorithmic Thinking', 'Problem Solving', 'Quantitative Reasoning'],
};

export function getCoreSkillsForSubject(subjectName: string): TwentyFirstCenturySkill[] {
  const match = Object.keys(SUBJECT_CORE_SKILLS_MAP).find((k) =>
    subjectName.toLowerCase().includes(k.toLowerCase())
  );
  return match
    ? SUBJECT_CORE_SKILLS_MAP[match]
    : ['Critical Thinking', 'Problem Solving', 'Communication & Verbal Articulation'];
}

// ============================================================================
// 2. SYSTEM INSTRUCTION: ADMINISTRATIVE LESSON PLAN (OEQA ALAUZA & NERDC)
// ============================================================================

export const LESSON_PLAN_SYSTEM_INSTRUCTION = `
You are the Chief Curriculum Inspector for the Nigerian Educational Research and Development Council (NERDC) and Senior Quality Assurance Evaluator at the Office of Education Quality Assurance (OEQA), Lagos State Ministry of Education, Alausa, Ikeja.

YOUR MANDATE:
Generate an administrative-facing, statutory Lesson Plan dossier for a Nigerian secondary school teacher (JSS 1-3 or SSS 1-3). This document is evaluated during school inspection clinics by Subject HODs, Vice Principals Academics, and visiting OEQA evaluators.

STRICT REGULATORY STANDARDS YOU MUST ENFORCE:
1. NERDC BEHAVIORAL OBJECTIVES PHRASING:
   - Every single objective MUST start with the exact statutory stem:
     "By the end of the lesson, learners should be able to: [measurable action verb]..."
   - Use Bloom's taxonomy verbs suitable for cognitive domain (Remember, Understand, Apply, Analyze, Evaluate, Create) and psychomotor domain.
   - Absolutely NEVER use unmeasurable verbs like "know", "understand", "learn", or "appreciate".

2. 21ST-CENTURY SKILLS INTEGRATION (FEATURE 1):
   - You MUST identify the specific 21st-century skills tied to this subject (e.g., Mathematics -> Quantitative Reasoning, Problem Solving; Chemistry -> Scientific Inquiry; Civic Education -> Civic Responsibility).
   - Explicitly map each behavioral objective to a primary skill with a concise pedagogical rationale.

3. INSTRUCTIONAL REALIA & VISUAL AIDS (FEATURE 3):
   - Describe physical materials readily available in the Nigerian community (e.g., cassava tubers, battery cells, local market receipts, discarded carton templates, metric rulers, conical flasks).
   - Specify visual aids that the teacher must bring or prepare.

4. EXACT LAGOS STATE OEQA ALAUZA 5-STEP TABULAR MATRIX (FEATURE 4):
   - You MUST structure the delivery presentation into 5 sequential steps:
     * Step 1: Set Induction & Prior Knowledge (Connecting previous week's work to today)
     * Step 2: Exploration & Concept Introduction (Hooking interest, presenting realia)
     * Step 3: Teacher Explanation & Demonstration (Direct instruction, modeling, chalkboard illustration)
     * Step 4: Guided Group / Individual Practice (Students working, teacher circulating)
     * Step 5: Formative Evaluation & Summary (Rapid check questions, golden takeaway)
   - For EACH step, provide: stepNumber, stageName, durationMinutes (totaling the allotted period, e.g. 40 or 80 minutes), teacherActivity, studentActivity, teachingMethod, materialsUsed, and evaluationRemark.

5. 3-TIER DIFFERENTIATED INSTRUCTION:
   - Tier 1 (Struggling Learners): Scaffolding, concrete realia, peer-buddy support, simplified templates.
   - Tier 2 (On-Level Learners): Standard curriculum drills, independent problem-solving.
   - Tier 3 (Advanced Learners): Higher-order extension word problems with Nigerian economic/industrial application.

OUTPUT FORMAT:
Return ONLY clean, valid JSON strictly adhering to the LessonPlan schema without markdown codeblocks or outer text.
`.trim();

// ============================================================================
// 3. SYSTEM INSTRUCTION: CHALKBOARD LESSON NOTE (CLASSROOM SCRIPT)
// ============================================================================

export const LESSON_NOTE_SYSTEM_INSTRUCTION = `
You are an Award-Winning Senior Nigerian Master Teacher and Subject Lead with over 25 years of classroom experience preparing students for WAEC (WASSCE), NECO (SSCE), and BECE with distinction.

YOUR MANDATE:
Generate a vast, deeply detailed, comprehensive Chalkboard Lesson Note for a Nigerian classroom (JSS 1-3 or SSS 1-3).
THIS IS NOT AN OUTLINE. IT IS A COMPLETE, UNTRUNCATED INSTRUCTIONAL SCRIPT AND BLACKBOARD COMPENDIUM.
The teacher must be able to walk into a classroom of 50-80 Nigerian students and deliver the entire 40 or 80-minute lesson verbatim using this document.

STRICT TEACHING PRACTICES YOU MUST EMBED:
1. EXHAUSTIVE CHALKBOARD NOTES (PUPILS' COPY):
   - Everything written under chalkboardNote MUST be suitable for students to copy word-for-word into their 2A/2B/40-leaves notebooks.
   - Definitions must be rigorous, precise, and exam-standard.
   - Core theoretical laws, rules, and formulas must be highlighted with standard notation.

2. STEP-BY-STEP WORKED EXAMPLES (NIGERIAN CONTEXT):
   - Provide at least 2 to 3 fully worked examples with EVERY algebraic, arithmetic, grammatical, or scientific step shown in full.
   - Contextualize at least one example in everyday Nigerian life: e.g. calculating cost of bags of rice in Mile 12 Market, electrical resistance of a generator in Ikeja, solar radiation in Kano, drainage basins of River Niger and River Benue, or accounting entries for a retail shop in Onitsha.
   - Note frequent pitfalls ("Pedagogical Pitfall") where Nigerian students commonly lose marks.

3. CHALKBOARD ILLUSTRATION & VISUAL AIDS SKETCH GUIDE (FEATURE 3):
   - Provide explicit, step-by-step instructions for the teacher on how to sketch the required diagram on a standard wooden or magnetic blackboard using chalk or whiteboard markers.
   - Include clear guidance for pupils on ruling notebook margins, drawing axes, arrows, or labels accurately.

4. COMMON STUDENT MISCONCEPTIONS & CORRECTION:
   - Identify 2 to 3 common erroneous beliefs students hold about this topic and provide the scientific/academic retort and a rapid diagnostic question to debunk it.

5. WAEC / NECO / BECE EXAMINATION CLINIC:
   - State specific keywords that examiners look for in marking schemes.
   - Provide 1 authentic past question with a model solution showing step-by-step mark distribution (M1, A1, C1).

OUTPUT FORMAT:
Return ONLY clean, valid JSON strictly adhering to the LessonNote schema without markdown wrappers or conversational filler.
`.trim();

// ============================================================================
// 4. USER PROMPT GENERATOR FOR LESSON PLAN
// ============================================================================

export interface GeneratePlanPromptParams {
  level: string; // e.g. "jss-2", "sss-1"
  subject: string;
  topic: string;
  subtopics?: string[];
  week: number;
  term: number;
  durationMinutes?: number;
  language?: 'en' | 'yo' | 'ig' | 'ha';
}

export function buildLessonPlanPrompt(params: GeneratePlanPromptParams): string {
  const {
    level,
    subject,
    topic,
    subtopics = [],
    week,
    term,
    durationMinutes = 40,
    language = 'en',
  } = params;

  const coreSkills = getCoreSkillsForSubject(subject);

  return `
GENERATE AN OFFICIAL NERDC & OEQA ALAUZA LESSON PLAN FOR:
- Academic Level: ${level.toUpperCase()} (Secondary Education)
- Subject: ${subject}
- Target Topic: "${topic}"
${subtopics.length > 0 ? `- Recommended Subtopics: ${subtopics.join(', ')}` : ''}
- Academic Session: 2026/2027
- Term: Term ${term}
- Curriculum Week: Week ${week} of 13
- Allotted Duration: ${durationMinutes} minutes
- Language of Instruction: ${language === 'en' ? 'English (NERDC Standard)' : language}
- Associated 21st-Century Subject Skills: ${coreSkills.join(', ')}

MANDATORY JSON FIELDS REQUIRED:
{
  "subject": "${subject}",
  "level": "${level}",
  "term": ${term},
  "week": ${week},
  "topic": "${topic}",
  "subtopics": ["Subtopic 1", "Subtopic 2", "Subtopic 3"],
  "durationMinutes": ${durationMinutes},
  "averageAgeYears": ${level.toLowerCase().startsWith('j') ? 12 : 16},
  "nerdcObjectives": [
    "By the end of the lesson, learners should be able to: [Bloom Action Verb] ...",
    "By the end of the lesson, learners should be able to: [Bloom Action Verb] ...",
    "By the end of the lesson, learners should be able to: [Bloom Action Verb] ..."
  ],
  "subjectSkillsMapping": [
    {
      "skill": "${coreSkills[0] || 'Problem Solving'}",
      "objectiveIndex": 0,
      "objectiveText": "...",
      "rationale": "How this specific objective builds ${coreSkills[0] || 'Problem Solving'} in the student."
    }
  ],
  "instructionalMaterials": [
    "Locally sourced realia (e.g., ...)",
    "NERDC Approved Textbook for ${level.toUpperCase()} ...",
    "Chalkboard ruler, protractor, or relevant equipment ..."
  ],
  "visualAids": [
    {
      "id": "va_1",
      "title": "Chalkboard Diagram: Key Structural Layout of ${topic}",
      "type": "chalkboard_diagram",
      "description": "Clear annotated visual representation illustrating ...",
      "sourceContext": "chalkboard_drawing",
      "caption": "Figure 1: Statutory Diagram of ${topic}",
      "chalkboardSketchPrompt": "Draw central axis first, label left-hand inputs, then highlight terminal outputs."
    }
  ],
  "entryBehavior": "Detailed description of what pupils already learned in Week ${Math.max(1, week - 1)} that prepares them for this topic.",
  "setInduction": "A 3-minute engaging hook or real-world Nigerian scenario to capture students' curiosity.",
  "oeqaPresentationSteps": [
    {
      "stepNumber": 1,
      "stageName": "Step 1: Set Induction & Prior Knowledge",
      "durationMinutes": 5,
      "teacherActivity": "...",
      "studentActivity": "...",
      "teachingMethod": "Discussion",
      "materialsUsed": ["Chalkboard"],
      "evaluationRemark": "Posing 2 oral diagnostic questions to verify readiness."
    },
    {
      "stepNumber": 2,
      "stageName": "Step 2: Exploration & Concept Introduction",
      "durationMinutes": 8,
      "teacherActivity": "...",
      "studentActivity": "...",
      "teachingMethod": "Inquiry-Based",
      "materialsUsed": ["Physical Realia Specimen"],
      "evaluationRemark": "Assessing students' observation accuracy."
    },
    {
      "stepNumber": 3,
      "stageName": "Step 3: Teacher Explanation & Demonstration",
      "durationMinutes": 12,
      "teacherActivity": "...",
      "studentActivity": "...",
      "teachingMethod": "Demonstration",
      "materialsUsed": ["Chalkboard Diagram", "Specimen"],
      "evaluationRemark": "Checking pupil understanding of the core rule."
    },
    {
      "stepNumber": 4,
      "stageName": "Step 4: Guided Group / Individual Practice",
      "durationMinutes": 10,
      "teacherActivity": "...",
      "studentActivity": "...",
      "teachingMethod": "Drill & Practice",
      "materialsUsed": ["Pupil Exercise Books"],
      "evaluationRemark": "Verifying step-by-step working on the board and desk circulating."
    },
    {
      "stepNumber": 5,
      "stageName": "Step 5: Formative Evaluation & Summary",
      "durationMinutes": 5,
      "teacherActivity": "...",
      "studentActivity": "...",
      "teachingMethod": "Discussion",
      "materialsUsed": ["Chalkboard"],
      "evaluationRemark": "Reviewing 3 rapid-fire oral assessment questions."
    }
  ],
  "formativeEvaluationQuestions": [
    "Question 1 (Recall & Understanding)",
    "Question 2 (Application & Problem Solving)",
    "Question 3 (Higher-Order Analysis)"
  ],
  "homeworkAssignment": "Specific textbook page and problem numbers from NERDC syllabus.",
  "differentiatedInstruction": {
    "struggling": "Tier 1: Concrete realia, peer-buddy support, and step-by-step formula cards.",
    "onLevel": "Tier 2: Standard textbook exercises with independent solutions.",
    "advanced": "Tier 3: Multi-variable extension problems with Nigerian industrial or commercial application."
  },
  "safetyPrecautions": "Safety advice relevant to classroom laboratory, handling specimens, or practical tools.",
  "pedagogicalTip": "A modern interactive teaching strategy (e.g., Think-Pair-Share, Jigsaw cooperative learning, or use of local everyday Nigerian materials) tailored specifically for ${topic} to maximize engagement and comprehension.",
  "curriculumReference": "NERDC National Curriculum for Basic/Senior Education; Lagos State Unified Scheme of Work, Week ${week}."
}
`.trim();
}

// ============================================================================
// 5. USER PROMPT GENERATOR FOR CHALKBOARD LESSON NOTE
// ============================================================================

export function buildLessonNotePrompt(params: GeneratePlanPromptParams): string {
  const { level, subject, topic, week, term } = params;

  return `
GENERATE AN EXHAUSTIVE, UNTRUNCATED CHALKBOARD LESSON NOTE FOR:
- Academic Level: ${level.toUpperCase()}
- Subject: ${subject}
- Topic: "${topic}"
- Term: Term ${term}, Week ${week}

MANDATORY JSON FIELDS REQUIRED (EVERY SECTION MUST BE FULLY EXPANDED):
{
  "subject": "${subject}",
  "level": "${level}",
  "term": ${term},
  "week": ${week},
  "topic": "${topic}",
  "teacherDeliveryScript": {
    "hookNarrative": "Exact opening words the teacher speaks to silence the room and command attention.",
    "coreLectureNarrative": "Deep, scholarly, yet accessible lecture script explaining the core mechanics of ${topic}.",
    "analogyNigerianContext": "Vivid Nigerian everyday analogy (e.g. traffic on Lagos Third Mainland Bridge, sorting tomatoes in Mile 12, running a diesel generator in Onitsha, or harvesting cocoa in Ondo).",
    "teacherScriptPointers": [
      "Pointer 1: Pause after introducing the formula and ask a student in row 2 to restate it.",
      "Pointer 2: Highlight common signs or units on the chalkboard with colored chalk."
    ]
  },
  "chalkboardNote": {
    "chalkboardHeader": "${subject.toUpperCase()} | CLASS: ${level.toUpperCase()} | WEEK ${week}: ${topic.toUpperCase()}",
    "subtopicsSummary": [
      "1. Definition and Fundamental Principles",
      "2. Core Laws and Operational Rules",
      "3. Step-by-Step Worked Demonstration Examples",
      "4. Classroom Drill & Summary Takeaway"
    ],
    "conceptualDefinitions": [
      "Comprehensive definition 1 written in formal academic English for notebooks ...",
      "Comprehensive definition 2 explaining secondary attributes and units of measurement ..."
    ],
    "theoreticalLawsAndRules": [
      "Statutory Law/Rule 1: Detailed statement and mathematical/grammatical formula ...",
      "Statutory Law/Rule 2: Boundary conditions and practical constraints ..."
    ],
    "workedClassroomExamples": [
      {
        "exampleNumber": 1,
        "problemStatement": "Standard classroom demonstration question with complete parameters and units.",
        "stepByStepSolution": [
          "Step 1: Write down known and unknown variables with standard units.",
          "Step 2: State the primary operational formula.",
          "Step 3: Substitute given quantities carefully into the equation.",
          "Step 4: Execute arithmetic calculations showing cross-multiplication or algebraic rearrangement.",
          "Step 5: Verify significant figures and dimensional consistency."
        ],
        "finalAnswerWithUnits": "Final answer clearly enclosed in a box with exact metric/Naira units.",
        "pedagogicalPitfallWarning": "Point out the exact step where 40% of WAEC candidates commit calculation or sign errors."
      },
      {
        "exampleNumber": 2,
        "problemStatement": "A realistic Nigerian socio-economic word problem applying ${topic} to practical daily commerce or science.",
        "stepByStepSolution": [
          "Step 1: Interpret the Nigerian scenario into algebraic or conceptual variables.",
          "Step 2: Apply the governing law.",
          "Step 3: Solve for the target variable with complete workings."
        ],
        "finalAnswerWithUnits": "Final evaluated solution with proper currency or scientific units.",
        "pedagogicalPitfallWarning": "Remind students not to omit units in their final answer."
      }
    ],
    "blackboardSummaryRules": [
      "Rule 1: Always double-check substitutions and units.",
      "Rule 2: Never skip the formula declaration step in external examinations.",
      "Rule 3: Ensure all chalkboard notes are copied completely before period dismissal."
    ],
    "inClassSeatworkDrill": [
      "Drill Question 1 (To be solved in exercise books within 4 minutes): ...",
      "Drill Question 2 (Board volunteer to solve under teacher moderation): ..."
    ]
  },
  "chalkboardIllustrations": [
    {
      "title": "Chalkboard Diagram: Schematic Structure of ${topic}",
      "figureLabel": "Figure 1",
      "drawingGuideForTeacher": "Instructions for teacher: Draw a clean horizontal baseline across the middle chalkboard. Divide into 3 columns. Use yellow chalk for the primary component and white chalk for connecting arrows.",
      "pupilNotebookInstructions": "Instruct all students to rule a 1-inch left margin in their exercise books, use pencil for drawing, and write labels in capital letters.",
      "labelsToHighlight": ["Primary Input", "Core Processing Zone", "Equilibrium Output", "Boundary Wall"]
    }
  ],
  "commonStudentMisconceptions": [
    {
      "misconception": "Common fallacy held by secondary school students regarding ${topic}.",
      "scientificOrGrammaticalCorrection": "Precise empirical refutation and the correct principle.",
      "quickDiagnosticQuestion": "Oral question the teacher can ask to instantly reveal if this misconception exists in the room."
    }
  ],
  "examClinicTips": {
    "frequentExamMistakes": [
      "WAEC Chief Examiner Report: Candidates frequently confuse ...",
      "NECO Observation: Failure to state definitions verbatim as approved by NERDC."
    ],
    "markingSchemeKeywords": [
      "Keyword 1 (Award 1 mark)",
      "Keyword 2 (Award 1 mark)",
      "Correct calculation step (Award M1)",
      "Accuracy with correct unit (Award A1)"
    ],
    "samplePastQuestion": {
      "examBody": "${level.toLowerCase().startsWith('j') ? 'BECE' : 'WAEC'}",
      "year": "2024 Past Question",
      "question": "Authentic examination question on ${topic} carrying 8 marks.",
      "modelAnswer": "Model solution showing step-by-step mark distribution according to official grading rubric."
    }
  },
  "extendedAssignment": {
    "takeHomeQuestions": [
      "Assignment 1: Solve problem 4 on page 62 of the NERDC recommended textbook.",
      "Assignment 2: Write a concise 1-page essay on how ${topic} impacts Nigerian national development."
    ],
    "handsOnProjectOrLocalFieldWork": "Practical task: Observe a local artisan, market stall, or kitchen process in your neighborhood that demonstrates ${topic} and record observations."
  },
  "pedagogicalTip": "A modern interactive pedagogical micro-strategy (e.g. Think-Pair-Share, Jigsaw method, use of local everyday Nigerian materials) tailored to make ${topic} intuitive and memorable for students.",
  "wordCount": 1200
}
`.trim();
}

// ============================================================================
// 6. SYSTEM INSTRUCTION: TOPIC BREAKDOWN & PREREQUISITE KNOWLEDGE
// ============================================================================

export const TOPIC_BREAKDOWN_SYSTEM_INSTRUCTION = `
You are the Chief Curriculum Developer for the Nigerian Educational Research and Development Council (NERDC) and Lead Specialist for the Lagos State Ministry of Education Unified Schemes of Work.

YOUR MANDATE:
Break down a Nigerian secondary school curriculum topic into concise, pedagogically sequenced sub-topics, measurable behavioral objectives, prerequisite entry behavior, core 21st-century competencies, and key technical vocabulary.

STRICT REQUIREMENTS:
1. Every sub-topic must be clear and teachable within a 40-minute Nigerian secondary school period.
2. Learning objectives must begin with "By the end of the lesson, learners should be able to: [Bloom's action verb]...".
3. Prior knowledge must specify the exact prerequisite concept taught in earlier weeks or terms.
4. Output must be strictly valid JSON matching the requested schema.
`.trim();

export function buildTopicBreakdownPrompt(params: {
  level: string;
  subject: string;
  topic: string;
  week: number;
  term: number;
}): string {
  const { level, subject, topic, week, term } = params;

  return `
GENERATE A RIGOROUS TOPIC BREAKDOWN FOR:
- Academic Level: ${level.toUpperCase()}
- Subject: ${subject}
- Scheme of Work Topic: "${topic}"
- Term: Term ${term}, Week ${week}

RETURN VALID JSON MATCHING THIS EXACT SCHEMA:
{
  "subject": "${subject}",
  "level": "${level}",
  "term": ${term},
  "week": ${week},
  "topic": "${topic}",
  "subtopics": [
    "Subtopic 1: Conceptual foundation and terminology",
    "Subtopic 2: Principles, formulas, and operational rules",
    "Subtopic 3: Worked demonstration examples and calculations",
    "Subtopic 4: Practical Nigerian everyday applications and drills"
  ],
  "learningObjectives": [
    "By the end of the lesson, learners should be able to: define ${topic} using standard NERDC terms.",
    "By the end of the lesson, learners should be able to: identify and state the core governing laws.",
    "By the end of the lesson, learners should be able to: calculate or analyze demonstration examples accurately."
  ],
  "requiredPriorKnowledge": [
    "Prerequisite knowledge of earlier foundational concepts from Week ${week > 1 ? week - 1 : 1}",
    "Familiarity with standard metric units and classroom realia"
  ],
  "coreCompetencies": [
    "Critical Thinking",
    "Problem Solving",
    "Quantitative Reasoning"
  ],
  "keyVocabulary": [
    "Principle",
    "Formula",
    "Application",
    "Analysis"
  ],
  "estimatedPeriods": 2
}
`.trim();
}

// ============================================================================
// 7. SYSTEM INSTRUCTION & PROMPTS: TEACHER'S CHEAT SHEET
// ============================================================================

export const CHEAT_SHEET_SYSTEM_INSTRUCTION = `
You are an expert Nigerian Master Teacher and Subject Lead.
Generate a high-yield, 30-second Teacher's Cheat Sheet for Nigerian secondary school teachers (NERDC standard).
The response must be ultra-focused, practical, and grounded in Nigerian reality (e.g. Danfo transport, Kainji Dam, Mile 12 Market, cassava processing, NEPA/generator power, local solar systems).
Output MUST be valid JSON only.
`.trim();

export function buildCheatSheetPrompt(lessonTopic: string, level: string, subject?: string): string {
  return `
GENERATE A HIGH-YIELD TEACHER CHEAT SHEET FOR:
- Topic: "${lessonTopic}"
- Academic Level: ${level.toUpperCase()}
${subject ? `- Subject: ${subject}` : ''}

MANDATORY JSON OUTPUT (RETURN ONLY VALID JSON, NO MARKDOWN):
{
  "lessonTopic": "${lessonTopic}",
  "level": "${level}",
  "subject": "${subject || ''}",
  "coreConcept": "A sharp, clear 1-paragraph explanation of the core concept that an educator can review in 30 seconds before walking into the classroom.",
  "mustKnowFacts": [
    "Fact 1: Fundamental statutory definition or governing formula.",
    "Fact 2: Key operational rule or WAEC/NECO marking scheme criterion.",
    "Fact 3: Non-negotiable boundary condition or distinction."
  ],
  "localExamples": [
    "Nigerian Context Example 1 (e.g., using Danfo buses, Third Mainland Bridge, Kainji Dam, Mile 12 Market, cassava garri processing, NEPA/generator power, etc.)",
    "Nigerian Context Example 2 (another vivid, relatable everyday Nigerian situation that pupils see daily)"
  ]
}
`.trim();
}

// ============================================================================
// 8. SYSTEM INSTRUCTION & PROMPTS: MISCONCEPTION ALERTS
// ============================================================================

export const MISCONCEPTIONS_SYSTEM_INSTRUCTION = `
You are a Senior WAEC & NECO Chief Examiner and Nigerian Teacher Quality Assurance Specialist.
Identify the top 3-4 most dangerous, persistent student misconceptions for Nigerian secondary school students on the given topic.
For each misconception, provide the exact pedagogical retort and teacher correction to dismantle it.
Output MUST be valid JSON array of objects only.
`.trim();

export function buildMisconceptionsPrompt(lessonTopic: string, level?: string, subject?: string): string {
  return `
IDENTIFY TOP MISCONCEPTIONS FOR:
- Topic: "${lessonTopic}"
${level ? `- Level: ${level.toUpperCase()}` : ''}
${subject ? `- Subject: ${subject}` : ''}

RETURN A VALID JSON ARRAY OF OBJECTS (NO MARKDOWN WRAPPERS):
[
  {
    "misconception": "Specific erroneous belief or common confusion held by Nigerian students.",
    "teacherCorrection": "The exact scientific, grammatical, or conceptual correction the teacher should give to debunk it."
  },
  {
    "misconception": "Second common mistake or misconception.",
    "teacherCorrection": "The clear conceptual explanation and counter-example."
  },
  {
    "misconception": "Third common mistake or calculation pitfall.",
    "teacherCorrection": "The correct principle and how examiners grade it."
  }
]
`.trim();
}

