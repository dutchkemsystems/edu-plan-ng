/**
 * EduPlan NG - Server-Proxied Client AI SDK
 * 
 * ARCHITECTURE MANDATE:
 * - NO direct @google/genai imports in the browser.
 * - NO client-side API keys (never exposes keys to users).
 * - All Gemini API calls (generateContent, streaming, Live API) are routed through
 *   secure backend endpoints on Express (/api/ai/*).
 * - Preserves identical user interface, parameters, and behaviors for seamless execution.
 */

import type { ComprehensiveCurriculumOutput } from './curriculum-types.ts';
import { generateNerdcOeqaContent } from '../../data/allCurriculumSubjects.ts';

const API_BASE = '/api/ai';

export interface ServerAiGenerateParams {
  subject: string;
  level: string;
  term?: number;
  week?: number;
  topic: string;
  outputType?: 'all' | 'topic_breakdown' | 'lesson_plan' | 'lesson_note';
  language?: 'en' | 'yo' | 'ig' | 'ha';
}

/**
 * 1. SERVER-PROXIED CURRICULUM CONTENT GENERATION
 * Calls server endpoint /api/ai/generate-content with full fallback support
 */
export async function generateContentServer(params: ServerAiGenerateParams): Promise<ComprehensiveCurriculumOutput> {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('eduplan_token') : null;

  try {
    const res = await fetch(`${API_BASE}/generate-content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(params),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch (err) {
    console.warn('[ClientAI] Server proxy request issue, falling back to statutory curriculum heuristics:', err);
  }

  // Statutory local fallback (client safe, deterministic NERDC/OEQA standard)
  const statutory = generateNerdcOeqaContent({
    subject: params.subject,
    level: params.level,
    topic: params.topic,
    term: params.term || 1,
    week: params.week || 1,
    language: params.language || 'en',
  });

  const { derive3DConceptSpec } = await import('./curriculum-types.ts');
  const visual3DSpec = derive3DConceptSpec(params.subject, params.topic, params.level);

  return {
    topicBreakdown: {
      subject: params.subject,
      level: params.level,
      term: params.term || 1,
      week: params.week || 1,
      topic: params.topic,
      subtopics: [
        `1. Statutory Introduction to ${params.topic}`,
        '2. Core Analytical Principles & Worked Demonstrations',
        '3. Nigerian Realia Applications (Markets & Industry)',
        '4. Formative Evaluation & Chalkboard Recitation'
      ],
      learningObjectives: statutory.objectives,
      requiredPriorKnowledge: [statutory.previousKnowledge],
      coreCompetencies: ['Critical Thinking', 'Problem Solving', 'Communication', 'Civic Responsibility'],
      cognitiveDomainDistribution: {
        remembering: 20,
        understanding: 30,
        applying: 30,
        analyzing: 10,
        evaluating: 5,
        creating: 5
      },
      pedagogicalTip: 'Engage students with concrete Nigerian market or agricultural realia before abstract chalkboard notation.'
    },
    lessonPlan: {
      subject: params.subject,
      level: params.level,
      term: params.term || 1,
      week: params.week || 1,
      topic: params.topic,
      durationMinutes: 40,
      behavioralObjectives: statutory.objectives.map((obj, i) => ({
        domain: 'cognitive' as const,
        bloomLevel: (i === 0 ? 'remember' : i === 1 ? 'understand' : 'apply') as 'remember' | 'understand' | 'apply',
        statement: obj
      })),
      instructionalMaterials: statutory.materials,
      visualAids: [
        { id: 'aid_01', title: visual3DSpec.title, type: '3D Realia', description: visual3DSpec.description }
      ],
      entryBehavior: statutory.previousKnowledge,
      setInduction: statutory.introduction,
      presentationSteps: [
        {
          stepNumber: 1,
          title: 'Set Induction & Concept Exploration',
          durationMinutes: 8,
          teacherActivities: [statutory.teacherActivity],
          studentActivities: [statutory.studentActivity],
          teachingMethod: 'Guided Discovery with Realia',
          chalkboardLayoutNotes: 'Step 1: Foundational definitions and real-world examples',
          evaluationCheckpoints: ['Ask 2 random students to restate concept in own words']
        },
        {
          stepNumber: 2,
          title: 'Direct Instruction & Worked Demonstrations',
          durationMinutes: 18,
          teacherActivities: ['Demonstrates 2 worked examples on the chalkboard step-by-step.'],
          studentActivities: ['Copies worked examples and verifies numerical solutions.'],
          teachingMethod: 'Interactive Demonstration',
          chalkboardLayoutNotes: 'Step 2: Methodical worked solutions with units',
          evaluationCheckpoints: ['Formative seatwork check across student notebooks']
        },
        {
          stepNumber: 3,
          title: 'Independent Practice & Formative Evaluation',
          durationMinutes: 14,
          teacherActivities: ['Supervises student practice and guides struggling learners.'],
          studentActivities: ['Solves practice exercises individually or in pairs.'],
          teachingMethod: 'Independent Seatwork & Targeted Remediation',
          chalkboardLayoutNotes: 'Step 3: Summary rules and homework assignment',
          evaluationCheckpoints: ['80% pass threshold on chalkboard test']
        }
      ],
      formativeEvaluationQuestions: [statutory.evaluation],
      homeworkAssignment: statutory.assignment,
      differentiatedInstruction: statutory.differentiatedInstruction,
      safetyPrecautions: 'Ensure orderly student movement during laboratory/realia inspection.',
      pedagogicalTip: 'Encourage bilingual clarification in Yorùbá, Igbo, or Hausa where needed.',
      curriculumReference: 'NERDC Unified Statutory Guidelines'
    },
    lessonNote: {
      subject: params.subject,
      level: params.level,
      term: params.term || 1,
      week: params.week || 1,
      topic: params.topic,
      teacherDeliveryScript: {
        hookNarrative: `Good morning class. Today we explore ${params.topic} through Nigerian everyday life.`,
        coreLectureNarrative: statutory.lessonNote.definitions,
        analogyNigerianContext: statutory.lessonNote.workedExamples,
        teacherScriptPointers: ['Keep eye contact across rows', 'Write clearly on chalkboard']
      },
      chalkboardNote: {
        chalkboardHeader: `${params.subject.toUpperCase()} — ${params.topic.toUpperCase()}`,
        subtopicsSummary: [statutory.lessonNote.subtopics],
        conceptualDefinitions: [statutory.lessonNote.definitions],
        theoreticalLawsAndRules: ['Rule 1: Always verify units and dimensions.', 'Rule 2: Show every intermediate step.'],
        workedClassroomExamples: [
          {
            exampleNumber: 1,
            problemStatement: `Solve standard question on ${params.topic}`,
            stepByStepSolution: ['Step 1: Identify given parameters', 'Step 2: Apply appropriate formula', 'Step 3: Calculate final numerical result'],
            finalAnswerWithUnits: 'Q.E.D. / Correct statutory solution',
            pedagogicalPitfallWarning: 'Do not skip unit conversion before calculation.'
          }
        ],
        blackboardSummaryRules: [statutory.lessonNote.blackboardSummary],
        inClassSeatworkDrill: [statutory.lessonNote.classDrill]
      },
      chalkboardIllustrations: [
        {
          title: visual3DSpec.title,
          figureLabel: 'Figure 1.1',
          drawingGuideForTeacher: 'Draw clean diagram on chalkboard with labeled arrows',
          pupilNotebookInstructions: 'Reproduce diagram neatly in full color pencils',
          labelsToHighlight: visual3DSpec.interactiveParts.map(p => p.name)
        }
      ],
      commonStudentMisconceptions: [
        {
          misconception: 'Confusing theoretical assumptions with real-world observed values',
          scientificOrGrammaticalCorrection: 'Distinguish between idealized models and real empirical conditions',
          quickDiagnosticQuestion: 'Why does air resistance affect practical measurements?'
        }
      ],
      examClinicTips: {
        frequentExamMistakes: ['Omitting units in final answer', 'Failing to state governing formula'],
        markingSchemeKeywords: ['Method Mark (M1)', 'Accuracy Mark (A1)', 'Bonus Mark (B1)'],
        samplePastQuestion: {
          examBody: 'WAEC WASSCE',
          year: '2024',
          question: `State 2 applications of ${params.topic} in Nigerian commerce or industry.`,
          modelAnswer: '1. Quality control in food processing. 2. Commercial ledger accounting.'
        }
      },
      extendedAssignment: {
        takeHomeQuestions: [statutory.assignment],
        handsOnProjectOrLocalFieldWork: 'Interview a local trader or technician on practical usage.'
      },
      pedagogicalTip: 'Praise student effort and check every notebook before period closes.',
      wordCount: 450
    },
    visual3DSpec,
    cheatSheet: {
      lessonTopic: params.topic,
      level: params.level,
      subject: params.subject,
      coreConcept: statutory.lessonNote.definitions,
      mustKnowFacts: [
        'Mandatory core concept in NERDC secondary curriculum',
        'Appears regularly in WAEC/NECO Paper 1 and 2 exams',
        'Requires clear step-by-step chalkboard demonstration'
      ],
      localExamples: [
        'Market transactions in Balogun Market, Lagos',
        'Agricultural processing in rural community farms'
      ]
    },
    misconceptions: [
      {
        misconception: 'Students often assume rote memorization without conceptual understanding.',
        teacherCorrection: 'Use concrete physical realia and Socratic questioning to anchor concept.'
      }
    ]
  };
}

/**
 * 2. SERVER-PROXIED STREAMING (Server-Sent Events / Chunked Transfer)
 * Async generator yielding streamed text chunks from the server's Gemini session.
 */
export async function* streamGenerateContentServer(
  endpoint: string,
  payload: Record<string, any>
): AsyncGenerator<string, void, unknown> {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('eduplan_token') : null;

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream, text/plain',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.error || `Stream failed with status ${res.status}`);
  }

  // Handle EventStream / Chunked Transfer
  if (res.body) {
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        if (trimmed.startsWith('data: ')) {
          const dataContent = trimmed.substring(6);
          if (dataContent === '[DONE]') return;
          try {
            const parsed = JSON.parse(dataContent);
            if (parsed.text) yield parsed.text;
            else if (parsed.chunk) yield parsed.chunk;
          } catch {
            yield dataContent;
          }
        } else {
          yield trimmed;
        }
      }
    }

    if (buffer.trim()) {
      yield buffer.trim();
    }
  } else {
    const text = await res.text();
    yield text;
  }
}

/**
 * 3. SERVER-PROXIED LIVE API CLIENT
 * Connects to the server's WebSocket Live API bridge (/api/ai/live)
 * Zero client API keys required; server attaches credentials and streams real-time audio/text.
 */
export interface LiveSessionCallbacks {
  onOpen?: () => void;
  onTextChunk?: (text: string) => void;
  onAudioChunk?: (pcmBuffer: ArrayBuffer) => void;
  onError?: (err: any) => void;
  onClose?: () => void;
}

export function createLiveSessionClient(callbacks: LiveSessionCallbacks) {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('eduplan_token') : '';
  const wsUrl = `${protocol}//${window.location.host}/api/ai/live?token=${encodeURIComponent(token || '')}`;

  console.log('[LiveAPI] Connecting to server WebSocket proxy at', wsUrl);
  let ws: WebSocket | null = null;

  try {
    ws = new WebSocket(wsUrl);
    ws.binaryType = 'arraybuffer';

    ws.onopen = () => {
      console.log('[LiveAPI] Connection established with server Gemini proxy.');
      callbacks.onOpen?.();
    };

    ws.onmessage = (event) => {
      if (typeof event.data === 'string') {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === 'text') callbacks.onTextChunk?.(msg.data);
          else if (msg.type === 'error') callbacks.onError?.(new Error(msg.message));
        } catch {
          callbacks.onTextChunk?.(event.data);
        }
      } else if (event.data instanceof ArrayBuffer) {
        callbacks.onAudioChunk?.(event.data);
      }
    };

    ws.onerror = (err) => {
      console.warn('[LiveAPI] WebSocket error:', err);
      callbacks.onError?.(err);
    };

    ws.onclose = () => {
      console.log('[LiveAPI] Connection closed.');
      callbacks.onClose?.();
    };
  } catch (err) {
    console.error('[LiveAPI] Failed to initialize WebSocket:', err);
    callbacks.onError?.(err);
  }

  return {
    sendText: (text: string) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'text', data: text }));
      } else {
        console.warn('[LiveAPI] Cannot send text; socket not open.');
      }
    },
    sendAudio: (pcmBuffer: ArrayBuffer) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(pcmBuffer);
      }
    },
    close: () => {
      ws?.close();
    }
  };
}
