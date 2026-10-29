import React, { useState, useEffect } from 'react';
import { Interactive3DViewer } from '../../../components/Interactive3DViewer.tsx';
import { EL5AudioPlayer } from '../../../components/EL5AudioPlayer.tsx';
import {
  type ComprehensiveCurriculumOutput,
  derive3DConceptSpec,
} from '../../../lib/ai/curriculum-types.ts';
import { generateContentServer } from '../../../lib/ai/client-ai.ts';
import { TeacherCheatSheet, MisconceptionAlert } from '../../../types/index.ts';
import {
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
  Box,
  Eye,
  EyeOff,
  ChevronRight,
  Printer,
  Download,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Award,
  ArrowLeft,
  Columns,
  Maximize2,
  RefreshCw,
  Zap,
  ShieldAlert,
  Headphones,
  FileText,
  Volume2,
  HelpCircle,
  Copy,
  Check,
} from 'lucide-react';

interface LessonPageProps {
  params?: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
  onBack?: () => void;
  initialTopic?: string;
  initialSubject?: string;
  initialLevel?: string;
}

export default function LessonDetailPage({
  params,
  onBack,
  initialTopic = 'Transport System: Human Circulatory Anatomy & Heart Mechanics',
  initialSubject = 'Biology',
  initialLevel = 'sss1',
}: LessonPageProps) {
  const [topic, setTopic] = useState(initialTopic);
  const [subject, setSubject] = useState(initialSubject);
  const [level, setLevel] = useState(initialLevel);
  const [term, setTerm] = useState(1);
  const [week, setWeek] = useState(3);

  // Layout View States (Zero-Occlusion UI)
  const [viewMode, setViewMode] = useState<'split' | 'drawer' | 'hidden'>('split');
  const [activeTab, setActiveTab] = useState<'note' | 'plan' | 'cheat-sheet' | 'misconceptions' | 'eli5' | 'breakdown'>('note');
  const [loading, setLoading] = useState(false);
  const [curriculumData, setCurriculumData] = useState<ComprehensiveCurriculumOutput | null>(null);

  // Dedicated feature loading & local states
  const [cheatSheetData, setCheatSheetData] = useState<TeacherCheatSheet | null>(null);
  const [misconceptionsData, setMisconceptionsData] = useState<MisconceptionAlert[]>([]);
  const [loadingCheatSheet, setLoadingCheatSheet] = useState(false);
  const [loadingMisconceptions, setLoadingMisconceptions] = useState(false);
  const [selectedEli5Source, setSelectedEli5Source] = useState<'concept' | 'analogy' | 'hook' | 'custom'>('concept');
  const [customEli5Text, setCustomEli5Text] = useState('');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Fetch or synthesize curriculum content on initial load
  useEffect(() => {
    loadContent();
  }, [topic, subject, level]);

  const loadContent = async () => {
    setLoading(true);
    try {
      // First attempt to call the dedicated AI curriculum engine endpoint
      const res = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          level,
          term,
          week,
          topic,
          outputType: 'all',
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setCurriculumData(json.data);
          if (json.data.cheatSheet) setCheatSheetData(json.data.cheatSheet);
          if (json.data.misconceptions) setMisconceptionsData(json.data.misconceptions);
          return;
        }
      }

      // Server-proxied curriculum generation with statutory fallback
      const generated = await generateContentServer({
        subject,
        level,
        term,
        week,
        topic,
        outputType: 'all',
        language: 'en',
      });
      setCurriculumData(generated);
      if (generated.cheatSheet) setCheatSheetData(generated.cheatSheet);
      if (generated.misconceptions) setMisconceptionsData(generated.misconceptions);
    } catch (err) {
      console.warn('[LessonPage] Could not fetch from endpoint, generating fallback locally', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCheatSheet = async () => {
    setLoadingCheatSheet(true);
    try {
      const res = await fetch('/api/ai/cheat-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonTopic: topic, level, subject }),
      });
      if (res.ok) {
        const data = await res.json();
        setCheatSheetData(data);
      }
    } catch (err) {
      console.warn('[LessonPage] Cheat sheet fetch issue:', err);
    } finally {
      setLoadingCheatSheet(false);
    }
  };

  const fetchMisconceptions = async () => {
    setLoadingMisconceptions(true);
    try {
      const res = await fetch('/api/ai/misconceptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonTopic: topic, level, subject }),
      });
      if (res.ok) {
        const data = await res.json();
        setMisconceptionsData(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.warn('[LessonPage] Misconceptions fetch issue:', err);
    } finally {
      setLoadingMisconceptions(false);
    }
  };

  const handleCopyText = (content: string, id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(content);
      setCopiedSection(id);
      setTimeout(() => setCopiedSection(null), 2000);
    }
  };

  const visualSpec = curriculumData?.visual3DSpec || derive3DConceptSpec(subject, topic, level);
  const note = curriculumData?.lessonNote;
  const plan = curriculumData?.lessonPlan;
  const breakdown = curriculumData?.topicBreakdown;
  const pedagogicalTip =
    plan?.pedagogicalTip ||
    note?.pedagogicalTip ||
    `Pedagogical Strategy: Use Think-Pair-Share and familiar Nigerian household materials to ground abstract principles before formal chalkboard notation.`;


  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Statutory Header Bar */}
      <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Return to Lesson Plans"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-white text-base tracking-tight">EduPlan NG</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase">
                NERDC & Lagos OEQA Standard
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {level.toUpperCase()} • {subject} • Term {term}, Week {week}
            </p>
          </div>
        </div>

        {/* Zero-Occlusion 3D Viewer Layout Toggles */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/80">
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'split'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Split View: Lesson Note on Left, 3D Laboratory on Right (Zero-Occlusion)"
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Split 3D View</span>
            </button>

            <button
              onClick={() => setViewMode(viewMode === 'drawer' ? 'hidden' : 'drawer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'drawer'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Drawer Mode: Dockable 3D Viewer toggled on demand"
            >
              <Box className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">3D Dock</span>
            </button>

            <button
              onClick={() => setViewMode(viewMode === 'hidden' ? 'split' : 'hidden')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'hidden' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title={viewMode === 'hidden' ? 'Show 3D Viewer' : 'Hide 3D Viewer'}
            >
              {viewMode === 'hidden' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>
          </div>

          <button
            onClick={loadContent}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-sm flex items-center gap-1.5 disabled:opacity-50 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">Regenerate with AI Engine</span>
          </button>
        </div>
      </header>

      {/* Main Multi-Column Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        {/* Left Column: Lesson Content (Unoccluded, Scholarly & Tabular) */}
        <div
          className={`flex-1 transition-all duration-300 space-y-6 ${
            viewMode === 'split' ? 'lg:max-w-[55%] xl:max-w-[58%]' : 'w-full'
          }`}
        >
          {/* Topic Hero Banner */}
          <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-black uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Statutory Scheme of Work Topic</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {topic}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Structured strictly according to the Nigerian Educational Research and Development Council (NERDC) and Lagos State Ministry of Education OEQA quality assurance framework.
              </p>
            </div>
          </div>

          {/* Pedagogical Micro-Tip Banner */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/70 border border-emerald-500/40 shadow-lg relative overflow-hidden">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <Lightbulb className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                    Pedagogical Micro-Tip
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold border border-amber-400/30">
                    High-Impact Teaching Strategy
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {pedagogicalTip}
                </p>
              </div>
            </div>
          </div>

          {/* Clean Tab Navigation Bar (6 Uncluttered Teacher Hub Tabs) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-950 rounded-2xl border border-slate-800 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('note')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'note'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Chalkboard Note</span>
            </button>

            <button
              onClick={() => setActiveTab('plan')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'plan'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>OEQA 5-Step Plan</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('cheat-sheet');
                if (!cheatSheetData) fetchCheatSheet();
              }}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'cheat-sheet'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Teacher's Cheat Sheet</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('misconceptions');
                if (misconceptionsData.length === 0) fetchMisconceptions();
              }}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'misconceptions'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Misconception Alerts</span>
            </button>

            <button
              onClick={() => setActiveTab('eli5')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'eli5'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Headphones className="w-4 h-4" />
              <span>Audio ELI5 Player</span>
            </button>

            <button
              onClick={() => setActiveTab('breakdown')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'breakdown'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Breakdown</span>
            </button>
          </div>


          {/* TAB 1: TEACHER-FACING CHALKBOARD LESSON NOTE */}
          {activeTab === 'note' && note && (
            <div className="space-y-6">
              {/* Teacher Delivery Script & Nigerian Everyday Analogy */}
              <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/60 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4" />
                  <span>Verbatim Teacher Delivery Script & Hook</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm text-slate-200 italic leading-relaxed">
                  "{note.teacherDeliveryScript.hookNarrative}"
                </div>

                <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-xs text-amber-200 space-y-1">
                  <strong className="block font-black text-amber-300 uppercase tracking-wider">
                    Nigerian Everyday Contextual Analogy:
                  </strong>
                  <p className="leading-relaxed">{note.teacherDeliveryScript.analogyNigerianContext}</p>
                </div>
              </div>

              {/* Verbatim Chalkboard Notes for Pupil Exercise Books */}
              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-black text-amber-400 font-mono">
                    {note.chalkboardNote.chalkboardHeader}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Notebook Copy Standard
                  </span>
                </div>

                {/* Subtopics Summary */}
                <div className="space-y-1.5">
                  <span className="text-xs font-black text-slate-300">Classroom Subtopics:</span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
                    {note.chalkboardNote.subtopicsSummary.map((sub, i) => (
                      <li key={i} className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Conceptual Definitions */}
                <div className="space-y-2">
                  <span className="text-xs font-black text-slate-300">Core Definitions:</span>
                  <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    {note.chalkboardNote.conceptualDefinitions.map((def, i) => (
                      <div key={i} className="p-3 bg-slate-900 rounded-xl border-l-4 border-emerald-500">
                        {def}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Worked Demonstration Examples */}
                <div className="space-y-3">
                  <span className="text-xs font-black text-slate-300">Worked Classroom Examples:</span>
                  {note.chalkboardNote.workedClassroomExamples.map((ex, i) => (
                    <div key={i} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                        <span>Example {ex.exampleNumber}</span>
                        <span className="text-[10px] text-slate-500">Board Demonstration</span>
                      </div>
                      <p className="text-xs font-semibold text-white">{ex.problemStatement}</p>
                      <div className="p-3 bg-slate-950 rounded-xl font-mono text-[11px] text-slate-300 space-y-1">
                        {ex.stepByStepSolution.map((step, sIdx) => (
                          <div key={sIdx}>{step}</div>
                        ))}
                      </div>
                      <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs font-black text-emerald-300 flex items-center justify-between">
                        <span>Final Answer:</span>
                        <span>{ex.finalAnswerWithUnits}</span>
                      </div>
                      <p className="text-[11px] text-amber-300/90 italic">
                        ⚠️ Pedagogical Warning: {ex.pedagogicalPitfallWarning}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chalkboard Drawing Instructions */}
                {note.chalkboardIllustrations.map((ill, i) => (
                  <div key={i} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2 text-xs">
                    <div className="font-black text-white flex items-center gap-2">
                      <Box className="w-4 h-4 text-blue-400" />
                      <span>{ill.title} ({ill.figureLabel})</span>
                    </div>
                    <p className="text-slate-300">{ill.drawingGuideForTeacher}</p>
                    <p className="text-[11px] text-slate-400 italic">
                      Student Notebook: {ill.pupilNotebookInstructions}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ADMINISTRATIVE OEQA 5-STEP LESSON PLAN */}
          {activeTab === 'plan' && plan && (
            <div className="space-y-6">
              {/* Behavioral Objectives Phrased in Bloom's Verbs */}
              <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-3">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">
                  NERDC Statutory Behavioral Objectives
                </span>
                <ul className="space-y-2 text-xs text-slate-200">
                  {plan.behavioralObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">
                        {typeof obj === 'string' ? obj : obj.statement || JSON.stringify(obj)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lagos State OEQA 5-Step Presentation Matrix Table */}
              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 overflow-x-auto">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="text-sm font-black text-white">
                    Lagos State OEQA 5-Step Presentation Matrix (Alauza Certified)
                  </h3>
                  <span className="text-xs font-bold text-emerald-400">
                    Total Duration: {plan.duration || (plan.durationMinutes ? `${plan.durationMinutes} mins` : '40 mins')}
                  </span>
                </div>

                <div className="space-y-3">
                  {plan.presentationSteps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-amber-400">
                          {step.stageName || step.title || `Step ${step.stepNumber}`}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] font-bold">
                          {step.durationMinutes} mins
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                        <div className="p-2.5 bg-slate-950 rounded-xl">
                          <strong className="text-emerald-400 block mb-1">Teacher Activity:</strong>
                          <p className="text-[11px] leading-relaxed">
                            {step.teacherActivity || (step.teacherActivities || []).join(' ')}
                          </p>
                        </div>
                        <div className="p-2.5 bg-slate-950 rounded-xl">
                          <strong className="text-blue-400 block mb-1">Student Activity:</strong>
                          <p className="text-[11px] leading-relaxed">
                            {step.studentActivity || (step.studentActivities || []).join(' ')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TOPIC BREAKDOWN & PRIOR KNOWLEDGE */}
          {activeTab === 'breakdown' && breakdown && (
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-black text-white">Curriculum Prerequisite Knowledge</h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {breakdown.requiredPriorKnowledge.map((pk, idx) => (
                    <li key={idx} className="flex items-center gap-2 p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{pk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-black text-white">21st-Century Core Competencies</h3>
                <div className="flex flex-wrap gap-2">
                  {breakdown.coreCompetencies.map((comp, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: THE TEACHER'S CHEAT SHEET */}
          {activeTab === 'cheat-sheet' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span>Teacher's 3-Minute Quick Cheat Sheet</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    High-yield summary designed for fast pre-class preparation without teacher burnout.
                  </p>
                </div>
                <button
                  onClick={fetchCheatSheet}
                  disabled={loadingCheatSheet}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 flex items-center gap-1.5 disabled:opacity-50 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingCheatSheet ? 'animate-spin text-emerald-400' : ''}`} />
                  <span>{loadingCheatSheet ? 'Regenerating...' : 'Regenerate'}</span>
                </button>
              </div>

              {loadingCheatSheet && !cheatSheetData && (
                <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center gap-3 text-slate-400">
                  <RefreshCw className="w-6 h-6 animate-spin text-emerald-400" />
                  <p className="text-xs font-medium">Synthesizing Nigerian teacher cheat sheet...</p>
                </div>
              )}

              {cheatSheetData && (
                <div className="space-y-5">
                  {/* Core Concept (1 Paragraph) */}
                  <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                          Core Concept (In One Paragraph)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyText(cheatSheetData.coreConcept, 'core-concept')}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-bold text-slate-300 border border-slate-700/60 flex items-center gap-1.5 transition-colors"
                        >
                          {copiedSection === 'core-concept' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedEli5Source('concept');
                            setActiveTab('eli5');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                          title="Open in Audio ELI5 Player"
                        >
                          <Volume2 className="w-3 h-3 text-cyan-400" />
                          <span>Listen ELI5</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed font-normal">
                      {cheatSheetData.coreConcept}
                    </p>
                  </div>

                  {/* 3 Must-Know Facts */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">
                        3 Must-Know Facts for Board Delivery
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">
                      {cheatSheetData.mustKnowFacts.map((fact, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 flex items-start gap-3 text-xs text-slate-200 hover:border-slate-700 transition-colors"
                        >
                          <span className="w-6 h-6 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-emerald-500/30">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed font-medium">{fact}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2 Local Examples with Nigerian Contexts */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">🇳🇬</span>
                      <h4 className="text-xs font-black uppercase tracking-wider text-amber-300">
                        2 Authentic Nigerian Classroom Context Examples
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {cheatSheetData.localExamples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-amber-400/5 border border-amber-400/20 space-y-1.5 text-xs text-slate-200"
                        >
                          <div className="flex items-center gap-2 text-amber-400 font-bold text-[11px] uppercase tracking-wider">
                            <span>Nigerian Real-World Context #{idx + 1}</span>
                          </div>
                          <p className="text-slate-300 leading-relaxed font-normal">{ex}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: MISCONCEPTION ALERTS */}
          {activeTab === 'misconceptions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>Pupil Misconception Alerts & Teacher Corrections</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Pre-empt the common errors Nigerian students bring to class with scripted diagnostic answers.
                  </p>
                </div>
                <button
                  onClick={fetchMisconceptions}
                  disabled={loadingMisconceptions}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 flex items-center gap-1.5 disabled:opacity-50 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingMisconceptions ? 'animate-spin text-rose-400' : ''}`} />
                  <span>{loadingMisconceptions ? 'Regenerating...' : 'Regenerate'}</span>
                </button>
              </div>

              {loadingMisconceptions && misconceptionsData.length === 0 && (
                <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center gap-3 text-slate-400">
                  <RefreshCw className="w-6 h-6 animate-spin text-rose-400" />
                  <p className="text-xs font-medium">Scanning syllabus for student misconceptions...</p>
                </div>
              )}

              {misconceptionsData.length > 0 && (
                <div className="space-y-4">
                  {misconceptionsData.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3.5 relative overflow-hidden"
                    >
                      {/* Erroneous Student Belief */}
                      <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-1">
                        <div className="flex items-center gap-2 text-rose-400 font-extrabold text-[11px] uppercase tracking-wider">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Common Student Misconception #{idx + 1}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-rose-200 font-semibold leading-relaxed">
                          "{item.misconception}"
                        </p>
                      </div>

                      {/* Teacher's Clarification & Scripted Question */}
                      <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                        <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-[11px] uppercase tracking-wider">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Teacher Correction & Classroom Script</span>
                        </div>
                        <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed font-medium">
                          {item.teacherCorrection}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: AUDIO "EXPLAIN LIKE I'M 5" (ELI5) COMPONENT */}
          {activeTab === 'eli5' && (
            <div className="space-y-6">
              <div className="p-5 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-950 to-blue-950/40 border border-cyan-500/30 space-y-2">
                <div className="flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-black text-white">
                    Audio "Explain Like I'm 5" (ELI5) Voice Companion
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Listen to plain-language, jargon-free explanations on your phone or laptop while heading to school, or play it aloud to your pupils as an auditory hook.
                </p>
              </div>

              {/* Text Source Switcher */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-300 uppercase tracking-wider">
                    Select Narration Source:
                  </span>
                  <span className="text-[10px] text-cyan-400 font-bold">SpeechSynthesis Enabled</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => setSelectedEli5Source('concept')}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                      selectedEli5Source === 'concept'
                        ? 'bg-cyan-500 text-slate-950 shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span className="block text-[10px] opacity-75 uppercase">Cheat Sheet</span>
                    <span>Core Concept</span>
                  </button>

                  <button
                    onClick={() => setSelectedEli5Source('analogy')}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                      selectedEli5Source === 'analogy'
                        ? 'bg-cyan-500 text-slate-950 shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span className="block text-[10px] opacity-75 uppercase">Analogy</span>
                    <span>Nigerian Story</span>
                  </button>

                  <button
                    onClick={() => setSelectedEli5Source('hook')}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                      selectedEli5Source === 'hook'
                        ? 'bg-cyan-500 text-slate-950 shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span className="block text-[10px] opacity-75 uppercase">Class Hook</span>
                    <span>Teacher Delivery</span>
                  </button>

                  <button
                    onClick={() => setSelectedEli5Source('custom')}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                      selectedEli5Source === 'custom'
                        ? 'bg-cyan-500 text-slate-950 shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span className="block text-[10px] opacity-75 uppercase">Custom</span>
                    <span>Your Words</span>
                  </button>
                </div>

                {selectedEli5Source === 'custom' && (
                  <div className="space-y-1 pt-2">
                    <label className="text-[11px] font-bold text-slate-400">
                      Type or paste custom notes to read aloud:
                    </label>
                    <textarea
                      value={customEli5Text}
                      onChange={(e) => setCustomEli5Text(e.target.value)}
                      placeholder="Enter the simplified explanation you want to hear..."
                      rows={3}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                )}
              </div>

              {/* The Audio Player Component */}
              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                <EL5AudioPlayer
                  text={
                    selectedEli5Source === 'custom'
                      ? customEli5Text || 'Please type custom text in the box above to listen.'
                      : selectedEli5Source === 'analogy'
                      ? note?.teacherDeliveryScript?.analogyNigerianContext ||
                        cheatSheetData?.localExamples?.[0] ||
                        'Imagine the heart as a borehole water pump that pushes water through pipes to every single room in the house.'
                      : selectedEli5Source === 'hook'
                      ? note?.teacherDeliveryScript?.hookNarrative ||
                        'Good morning class. Have you ever wondered why running round the football field makes your chest beat so quickly?'
                      : cheatSheetData?.coreConcept ||
                        note?.chalkboardNote?.conceptualDefinitions?.[0] ||
                        'The circulatory system is the internal transport network of the human body, driven by the muscular heart pumping oxygen and essential nutrients through arteries, veins, and capillaries.'
                  }
                  topic={topic}
                  level={level}
                  title={`ELI5 Audio Narration: ${topic}`}
                />
              </div>
            </div>
          )}
        </div>


        {/* Right Column: Interactive 3D Viewer (Zero-Occlusion Layout) */}
        {viewMode === 'split' && (
          <div className="lg:w-[45%] xl:w-[42%] flex flex-col gap-4">
            <div className="sticky top-20 space-y-4">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <Box className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-black text-white uppercase tracking-wider">
                    Interactive 3D Visual Laboratory
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold bg-slate-800 px-2 py-0.5 rounded-full">
                  Zero-Occlusion View
                </span>
              </div>

              {/* 3D WebGL Three.js Component */}
              <Interactive3DViewer
                spec={visualSpec}
                topic={topic}
                subject={subject}
                className="h-[460px] w-full"
              />

              {/* Key Concept Explanations Attached to 3D Model */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <div className="font-bold text-slate-200 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>3D Educational Concept Annotations</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  {visualSpec.description}
                </p>

                <div className="space-y-1.5 pt-1">
                  {visualSpec.interactiveParts.map((part, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800/80">
                      <span
                        className="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
                        style={{ backgroundColor: part.color }}
                      />
                      <div>
                        <strong className="text-white block text-[11px]">{part.name}</strong>
                        <p className="text-[10px] text-slate-400 leading-tight">{part.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button (FAB) for Drawer Mode */}
      {viewMode === 'drawer' && (
        <div className="fixed bottom-6 right-6 z-40">
          <div className="w-[380px] sm:w-[440px] shadow-2xl animate-in slide-in-from-bottom-6 duration-200">
            <Interactive3DViewer
              spec={visualSpec}
              topic={topic}
              subject={subject}
              isCompact
            />
          </div>
        </div>
      )}

      {/* Bottom Floating Action Bar if 3D viewer is hidden */}
      {viewMode === 'hidden' && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setViewMode('split')}
            className="px-5 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-xl flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Box className="w-4 h-4 text-slate-950" />
            <span>Launch 3D Visual Lab</span>
          </button>
        </div>
      )}
    </div>
  );
}
