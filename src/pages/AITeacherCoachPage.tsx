import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  BookOpen,
  Users,
  Compass,
  Award,
  Globe,
  Send,
  Copy,
  Check,
  RotateCcw,
  Lightbulb,
  GraduationCap,
  ArrowRight,
  ShieldAlert,
  Flame,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { requestTeacherCoach } from '../lib/api.ts';
import { DashboardStats, TeacherUser } from '../types/index.ts';
import { resolveClientTierSummary } from '../config/pricing.ts';
import confetti from 'canvas-confetti';
import { ALL_CURRICULUM_SUBJECTS, SubjectMetadata } from '../data/allCurriculumSubjects.ts';

interface AITeacherCoachPageProps {
  user?: TeacherUser | null;
  stats?: DashboardStats | null;
  onOpenUpgrade?: (message: string, requiredTier?: string, title?: string) => void;
  onNavigateToComposer?: () => void;
  onNavigateToCopilot?: () => void;
}

const CLASS_TABS = [
  { id: 'all', label: 'All Classes' },
  { id: 'jss-1', label: 'JSS 1' },
  { id: 'jss-2', label: 'JSS 2' },
  { id: 'jss-3', label: 'JSS 3' },
  { id: 'sss-1', label: 'SSS 1' },
  { id: 'sss-2', label: 'SSS 2' },
  { id: 'sss-3', label: 'SSS 3' },
];

// Rich statutory topics across all subjects from JSS 1 to SSS 3
const CURATED_COACH_TOPICS = [
  // JSS 1
  { title: 'Whole Numbers: Place Value & Large Digits', subject: 'Mathematics', level: 'jss-1' },
  { title: 'Parts of Speech: Nouns & Concord Rules', subject: 'English Studies', level: 'jss-1' },
  { title: 'Living & Non-Living Things: Cell Structure', subject: 'Basic Science', level: 'jss-1' },
  { title: 'National Values: Honesty & Integrity', subject: 'Civic Education', level: 'jss-1' },
  { title: 'Importance of Agriculture & Food Security', subject: 'Agricultural Science', level: 'jss-1' },
  { title: 'Concept of Technology & Safety Guidelines', subject: 'Basic Technology', level: 'jss-1' },

  // JSS 2
  { title: 'Pythagoras Theorem & Right-Angled Triangles', subject: 'Mathematics', level: 'jss-2' },
  { title: 'Transitive & Intransitive Verbs', subject: 'English Studies', level: 'jss-2' },
  { title: 'Kinetic Theory of Matter & State Changes', subject: 'Basic Science', level: 'jss-2' },
  { title: 'The Nigerian Constitution & Rule of Law', subject: 'Civic Education', level: 'jss-2' },
  { title: 'Farm Animals: Monogastric & Ruminant Digestion', subject: 'Agricultural Science', level: 'jss-2' },
  { title: 'Woodwork Hand Tools & Maintenance', subject: 'Basic Technology', level: 'jss-2' },

  // JSS 3
  { title: 'Simultaneous Linear Equations', subject: 'Mathematics', level: 'jss-3' },
  { title: 'Formal vs Informal Letter Writing', subject: 'English Studies', level: 'jss-3' },
  { title: 'Atomic Structure & Chemical Bonding', subject: 'Basic Science', level: 'jss-3' },
  { title: 'Three Arms of Government: Separation of Powers', subject: 'Civic Education', level: 'jss-3' },
  { title: 'Soil Conservation & Erosion Prevention', subject: 'Agricultural Science', level: 'jss-3' },
  { title: 'Data Processing: Computer Memory & Storage', subject: 'Computer Studies', level: 'jss-3' },

  // SSS 1
  { title: 'Indices, Logarithms & Standard Form', subject: 'General Mathematics', level: 'sss-1' },
  { title: 'Oral English: Vowel Contrasts & Stress Timing', subject: 'English Studies', level: 'sss-1' },
  { title: 'Particulate Nature of Matter & Gas Laws', subject: 'Chemistry', level: 'sss-1' },
  { title: 'Rectilinear Motion, Velocity & Acceleration', subject: 'Physics', level: 'sss-1' },
  { title: 'Cell Structure: Prokaryotes vs Eukaryotes', subject: 'Biology', level: 'sss-1' },
  { title: 'Basic Concepts of Economics: Scarcity & Opportunity Cost', subject: 'Economics', level: 'sss-1' },
  { title: 'Introduction to Financial Accounting: Double Entry Bookkeeping', subject: 'Financial Accounting', level: 'sss-1' },

  // SSS 2
  { title: 'Quadratic Equations & Parabolic Graphs', subject: 'General Mathematics', level: 'sss-2' },
  { title: 'Periodic Table: Periodicity & Ionization Energy', subject: 'Chemistry', level: 'sss-2' },
  { title: 'Electric Circuits, Ohm’s Law & Resistance', subject: 'Physics', level: 'sss-2' },
  { title: 'Photosynthesis: Light & Dark Reactions', subject: 'Biology', level: 'sss-2' },
  { title: 'Elasticity of Demand & Supply: Price Elasticity', subject: 'Economics', level: 'sss-2' },
  { title: 'Colonial Administration in Nigeria: Indirect Rule', subject: 'Government', level: 'sss-2' },
  { title: 'Trial Balance & Correction of Errors', subject: 'Financial Accounting', level: 'sss-2' },

  // SSS 3
  { title: 'Differential Calculus & Rate of Change', subject: 'General Mathematics', level: 'sss-3' },
  { title: 'Electrolysis, Faraday’s Laws & Quantitative Deposition', subject: 'Chemistry', level: 'sss-3' },
  { title: 'Electromagnetic Induction & Faraday’s Laws', subject: 'Physics', level: 'sss-3' },
  { title: 'Mendelian Genetics: Monohybrid & Dihybrid Crosses', subject: 'Biology', level: 'sss-3' },
  { title: 'National Income Accounting: GDP, GNP & NNP', subject: 'Economics', level: 'sss-3' },
  { title: 'Nigeria’s Foreign Policy & Afrocentric Non-Alignment', subject: 'Government', level: 'sss-3' },
  { title: 'Balance Sheet & Final Accounts of Sole Proprietors', subject: 'Financial Accounting', level: 'sss-3' },
];

export const AITeacherCoachPage: React.FC<AITeacherCoachPageProps> = ({
  user,
  stats,
  onOpenUpgrade,
  onNavigateToComposer,
  onNavigateToCopilot,
}) => {
  const tierSummary = resolveClientTierSummary(user, stats);
  const [level, setLevel] = useState('sss-1');
  const [subject, setSubject] = useState('General Mathematics');
  const [topic, setTopic] = useState('Indices, Logarithms & Standard Form');
  const [classFilter, setClassFilter] = useState('all');
  const [queryType, setQueryType] = useState<'deep_dive' | 'large_class' | 'nigerian_analogy' | 'waec_secrets' | 'bilingual_bridge' | 'general'>('deep_dive');
  const [customPrompt, setCustomPrompt] = useState('');
  const [language, setLanguage] = useState<'en' | 'yo' | 'ig' | 'ha'>('en');

  const [loading, setLoading] = useState(false);
  const [coachingResult, setCoachingResult] = useState<string | null>(null);
  const [provider, setProvider] = useState<string>('gemini-api');
  const [copied, setCopied] = useState(false);

  // Available subjects from standard Nigerian curriculum
  const availableSubjectList = useMemo(() => {
    return ALL_CURRICULUM_SUBJECTS;
  }, []);

  // Currently selected subject metadata
  const currentSubjectMeta = useMemo(() => {
    return availableSubjectList.find(
      (s) => s.name.toLowerCase() === subject.toLowerCase() || subject.toLowerCase().includes(s.name.toLowerCase())
    ) || availableSubjectList[0];
  }, [availableSubjectList, subject]);

  // Statutory topics for current subject
  const currentStatutoryTopics = useMemo(() => {
    return currentSubjectMeta?.defaultTopics || [];
  }, [currentSubjectMeta]);

  // Filter curated quick-cards by class level
  const filteredQuickTopics = useMemo(() => {
    if (classFilter === 'all') return CURATED_COACH_TOPICS;
    return CURATED_COACH_TOPICS.filter((t) => t.level === classFilter);
  }, [classFilter]);

  const handleSubjectChange = (newSubName: string) => {
    setSubject(newSubName);
    const subObj = availableSubjectList.find((s) => s.name === newSubName);
    if (subObj && subObj.defaultTopics && subObj.defaultTopics.length > 0) {
      setTopic(subObj.defaultTopics[0]);
    }
  };

  const handleRunCoach = async (overridePrompt?: string, overrideType?: any) => {
    setLoading(true);
    setCoachingResult(null);

    const typeToUse = overrideType || queryType;
    const promptToUse = overridePrompt || customPrompt || 'Provide structured teacher pedagogical mastery advice for this topic.';

    try {
      const res = await requestTeacherCoach({
        topic,
        subject,
        level,
        queryType: typeToUse,
        prompt: promptToUse,
        language,
      });

      setCoachingResult(res.content);
      setProvider(res.provider);
      confetti({ particleCount: 50, spread: 50 });
    } catch (err: any) {
      if (err?.status === 403 || err?.status === 429) {
        onOpenUpgrade?.(
          err.message || 'Your current plan AI coaching quota limit has been reached. Upgrade to continue.',
          err.requiredTier || 'b2c_termly',
          'AI Coaching Quota Reached'
        );
        setCoachingResult('Subscription plan upgrade required to continue AI coaching generations.');
        return;
      }
      console.error(err);
      setCoachingResult('Failed to generate response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!coachingResult) return;
    navigator.clipboard.writeText(coachingResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Hero Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/30 text-xs font-semibold text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Teacher Pedagogical Coach · {tierSummary.config.name}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Master Any Topic Before You Step into the Classroom
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Fully loaded with all statutory Nigerian NERDC subjects and topics across JSS 1 to SSS 3. Discover local analogies, resolve tough misconceptions, and unlock WAEC/BECE Chief Examiner scoring criteria.
            </p>
          </div>
          <div className="shrink-0 px-3.5 py-2 rounded-2xl bg-white/10 border border-white/15 text-xs font-bold text-emerald-50">
            AI Quota:{' '}
            <span className="text-amber-300">
              {tierSummary.maxGenerationsTotal !== null
                ? `${tierSummary.totalGenerated}/${tierSummary.maxGenerationsTotal} total`
                : `${tierSummary.usedToday}/${tierSummary.dailyFairUseCap} today`}
            </span>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
      </div>

      {/* Phase 10 Co-Pilot Quick Launcher */}
      {onNavigateToCopilot && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-gray-900">AI Pedagogical Co-Pilot (Teacher Mastery)</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold uppercase">
                  Phase 10
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">
                Practice with the Nigerian Secondary Classroom Simulator, test explanations on the Feynman Bot, and generate 3-minute WhatsApp flipped audio scripts.
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToCopilot}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>Launch Co-Pilot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Topic Discovery & Class Filter Header */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-extrabold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Curriculum Topic Presets Across Classes (JSS 1 – SSS 3)
          </span>

          {/* Class Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1">
            {CLASS_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setClassFilter(tab.id)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  classFilter === tab.id
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Curated Grid of Topics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {filteredQuickTopics.slice(0, 12).map((pt, idx) => {
            const isCurrent = topic.toLowerCase() === pt.title.toLowerCase();
            return (
              <button
                key={idx}
                onClick={() => {
                  setTopic(pt.title);
                  setSubject(pt.subject);
                  setLevel(pt.level);
                }}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isCurrent
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-500/20'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/30'
                }`}
              >
                <span className="text-[10px] font-extrabold uppercase opacity-80 block truncate">
                  {pt.level.toUpperCase()} • {pt.subject}
                </span>
                <p className="text-xs font-bold mt-1 line-clamp-2 leading-tight">{pt.title}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Configuration Form: Class Level, Subject & Statutory Topics Selectors */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs space-y-5">
        <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
          <GraduationCap className="w-4 h-4 text-emerald-600" />
          <span>Statutory Nigerian Curriculum Setup (All Subjects & Classes)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Class Level Selector */}
          <div>
            <label className="block text-[11px] font-extrabold text-gray-700 uppercase mb-1.5">
              1. Class Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full text-xs font-bold px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-gray-900"
            >
              <option value="jss-1">Junior Secondary 1 (JSS 1)</option>
              <option value="jss-2">Junior Secondary 2 (JSS 2)</option>
              <option value="jss-3">Junior Secondary 3 (JSS 3 - BECE)</option>
              <option value="sss-1">Senior Secondary 1 (SSS 1)</option>
              <option value="sss-2">Senior Secondary 2 (SSS 2)</option>
              <option value="sss-3">Senior Secondary 3 (SSS 3 - WAEC/NECO)</option>
            </select>
          </div>

          {/* Statutory Subject Selector (All 24+ Subjects) */}
          <div>
            <label className="block text-[11px] font-extrabold text-gray-700 uppercase mb-1.5">
              2. Statutory Subject
            </label>
            <select
              value={subject}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="w-full text-xs font-bold px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-gray-900"
            >
              {availableSubjectList.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name} ({s.department})
                </option>
              ))}
            </select>
          </div>

          {/* Statutory Topics Dropdown */}
          <div>
            <label className="block text-[11px] font-extrabold text-gray-700 uppercase mb-1.5">
              3. Statutory Curriculum Topic
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-gray-900"
            >
              {currentStatutoryTopics.map((top, idx) => (
                <option key={idx} value={top}>
                  Week {idx + 1}: {top}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Custom topic override if teacher wants to type their own */}
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
            Or Type Custom Topic / Subtopic
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full text-xs font-bold px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-emerald-600 text-gray-900"
            placeholder="Type or edit topic name..."
          />
        </div>

        {/* Custom Pedagogical Question input */}
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
            Custom Pedagogical Question or Specific Inquiry (Optional)
          </label>
          <div className="relative">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. How can I explain this concept to mixed-ability Nigerian learners without confusion?"
              className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-emerald-600 pr-28 text-gray-900"
            />
            <button
              onClick={() => handleRunCoach()}
              disabled={loading}
              className="absolute right-1.5 top-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-2xs flex items-center gap-1 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{loading ? 'Consulting...' : 'Ask AI'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 Pedagogical Coach Mode Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <button
          onClick={() => {
            setQueryType('deep_dive');
            handleRunCoach('Deep-dive explanation of this topic for teachers', 'deep_dive');
          }}
          className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
            queryType === 'deep_dive'
              ? 'border-emerald-600 bg-emerald-50/70 shadow-2xs'
              : 'border-gray-200 bg-white hover:border-emerald-300'
          }`}
        >
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 pt-1">Subject Deep-Dive</h3>
            <p className="text-[11px] text-gray-500 leading-snug">
              Explain core mechanics simply so you can answer tough student questions with ease.
            </p>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 mt-3 block">Run Coach →</span>
        </button>

        <button
          onClick={() => {
            setQueryType('large_class');
            handleRunCoach('Classroom management strategies for 60+ Nigerian students', 'large_class');
          }}
          className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
            queryType === 'large_class'
              ? 'border-emerald-600 bg-emerald-50/70 shadow-2xs'
              : 'border-gray-200 bg-white hover:border-emerald-300'
          }`}
        >
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 pt-1">Large Class Control</h3>
            <p className="text-[11px] text-gray-500 leading-snug">
              Engagement and quiet concentration drills for 50–80 students per classroom.
            </p>
          </div>
          <span className="text-[10px] font-bold text-blue-700 mt-3 block">Run Coach →</span>
        </button>

        <button
          onClick={() => {
            setQueryType('nigerian_analogy');
            handleRunCoach('Generate Nigerian real-world analogies', 'nigerian_analogy');
          }}
          className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
            queryType === 'nigerian_analogy'
              ? 'border-emerald-600 bg-emerald-50/70 shadow-2xs'
              : 'border-gray-200 bg-white hover:border-emerald-300'
          }`}
        >
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 pt-1">Nigerian Analogies</h3>
            <p className="text-[11px] text-gray-500 leading-snug">
              Connect abstract theory to Balogun market, cassava farming, and Nigerian daily life.
            </p>
          </div>
          <span className="text-[10px] font-bold text-amber-700 mt-3 block">Run Coach →</span>
        </button>

        <button
          onClick={() => {
            setQueryType('waec_secrets');
            handleRunCoach('WAEC/BECE marking guide traps and scoring keys', 'waec_secrets');
          }}
          className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
            queryType === 'waec_secrets'
              ? 'border-emerald-600 bg-emerald-50/70 shadow-2xs'
              : 'border-gray-200 bg-white hover:border-emerald-300'
          }`}
        >
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 pt-1">WAEC Examiner Secrets</h3>
            <p className="text-[11px] text-gray-500 leading-snug">
              Common candidate traps, method marks (M), accuracy marks (A), and BECE standards.
            </p>
          </div>
          <span className="text-[10px] font-bold text-purple-700 mt-3 block">Run Coach →</span>
        </button>

        <button
          onClick={() => {
            setQueryType('bilingual_bridge');
            handleRunCoach('Explain concept with bilingual Nigerian vocabulary', 'bilingual_bridge');
          }}
          className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
            queryType === 'bilingual_bridge'
              ? 'border-emerald-600 bg-emerald-50/70 shadow-2xs'
              : 'border-gray-200 bg-white hover:border-emerald-300'
          }`}
        >
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
              <Globe className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 pt-1">Bilingual Bridge</h3>
            <p className="text-[11px] text-gray-500 leading-snug">
              Explain tough definitions in English + Yorùbá, Igbo, or Hausa for bilingual learners.
            </p>
          </div>
          <span className="text-[10px] font-bold text-rose-700 mt-3 block">Run Coach →</span>
        </button>
      </div>

      {/* Coaching Output Panel */}
      {coachingResult && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200/90 shadow-sm space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-base font-extrabold text-gray-900">
                Pedagogical Brief: {topic} ({level.toUpperCase()})
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Advice'}</span>
              </button>
              {onNavigateToComposer && (
                <button
                  onClick={onNavigateToComposer}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-xs font-bold text-white flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Use in Lesson Composer</span>
                </button>
              )}
            </div>
          </div>

          <div className="prose prose-sm max-w-none text-gray-800 whitespace-pre-wrap font-sans leading-relaxed text-xs sm:text-sm">
            {coachingResult}
          </div>
        </div>
      )}
    </div>
  );
};
