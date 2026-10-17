import React, { useState } from 'react';
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
  Flame
} from 'lucide-react';
import { requestTeacherCoach } from '../lib/api.ts';
import confetti from 'canvas-confetti';

interface AITeacherCoachPageProps {
  onNavigateToComposer?: () => void;
}

export const AITeacherCoachPage: React.FC<AITeacherCoachPageProps> = ({ onNavigateToComposer }) => {
  const [topic, setTopic] = useState('Indices and Standard Form');
  const [subject, setSubject] = useState('General Mathematics');
  const [level, setLevel] = useState('sss-1');
  const [queryType, setQueryType] = useState<'deep_dive' | 'large_class' | 'nigerian_analogy' | 'waec_secrets' | 'bilingual_bridge' | 'general'>('deep_dive');
  const [customPrompt, setCustomPrompt] = useState('');
  const [language, setLanguage] = useState<'en' | 'yo' | 'ig' | 'ha'>('en');

  const [loading, setLoading] = useState(false);
  const [coachingResult, setCoachingResult] = useState<string | null>(null);
  const [provider, setProvider] = useState<string>('gemini-api');
  const [copied, setCopied] = useState(false);

  // Curated quick topics from NERDC syllabus
  const popularTopics = [
    { title: 'Indices & Standard Form', subject: 'General Mathematics', level: 'sss-1' },
    { title: 'Plant & Animal Cell Structure', subject: 'Basic Science & Tech', level: 'jss-1' },
    { title: 'Pythagoras Theorem & Geometry', subject: 'Mathematics', level: 'jss-2' },
    { title: 'Rule of Law & 3 Arms of Government', subject: 'Civic Education', level: 'jss-3' },
    { title: 'Photosynthesis & Plant Nutrition', subject: 'Biology', level: 'sss-2' },
    { title: 'Supply & Demand Price Elasticity', subject: 'Economics', level: 'sss-2' },
  ];

  const handleRunCoach = async (overridePrompt?: string, overrideType?: any) => {
    setLoading(true);
    setCoachingResult(null);

    const typeToUse = overrideType || queryType;
    const promptToUse = overridePrompt || customPrompt || 'Provide structured teacher learning advice for this topic.';

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
    } catch (err) {
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
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/30 text-xs font-semibold text-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Teacher Pedagogical Coach & Professional Development</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Master Any Topic Before You Step into the Classroom
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Enhance your own subject mastery, discover local Nigerian analogies, resolve difficult student misconceptions, and unlock WAEC chief examiner scoring secrets.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
      </div>

      {/* Quick Select Preset Topics */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
          Select From Core NERDC Curriculum Topics
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {popularTopics.map((pt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTopic(pt.title);
                setSubject(pt.subject);
                setLevel(pt.level);
              }}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                topic === pt.title
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
              }`}
            >
              <span className="text-[10px] font-extrabold uppercase opacity-80 block truncate">
                {pt.level.toUpperCase()} • {pt.subject}
              </span>
              <p className="text-xs font-bold mt-0.5 truncate">{pt.title}</p>
            </button>
          ))}
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
              Explain the core mechanics simply so you can answer tough student questions.
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
              Connect abstract theory to Balogun market, cassava farming, and Third Mainland Bridge.
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
              Discover common candidate traps, formula method marks (M), and accuracy marks (A).
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
              Explain tough definitions in English + Yorùbá, Igbo, or Hausa for ESL learners.
            </p>
          </div>
          <span className="text-[10px] font-bold text-rose-700 mt-3 block">Run Coach →</span>
        </button>
      </div>

      {/* Main Configuration & Interactive Prompt Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Topic Being Prepared</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full text-xs font-bold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Class Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
            >
              <option value="jss-1">JSS 1</option>
              <option value="jss-2">JSS 2</option>
              <option value="jss-3">JSS 3</option>
              <option value="sss-1">SSS 1</option>
              <option value="sss-2">SSS 2</option>
              <option value="sss-3">SSS 3</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
            Custom Pedagogical Question or Specific Inquiry (Optional)
          </label>
          <div className="relative">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. How can I explain the negative index law so students don't confuse it with negative numbers?"
              className="w-full text-xs px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 pr-24"
            />
            <button
              onClick={() => handleRunCoach()}
              disabled={loading}
              className="absolute right-1.5 top-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{loading ? 'Consulting...' : 'Ask AI'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Coaching Response Box */}
      {coachingResult && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-md space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Pedagogical Insights for "{topic}"
                </h3>
                <p className="text-[10px] text-gray-500">
                  Model: {provider === 'gemini-api' ? 'Gemini 2.5 Flash (NERDC Grounded)' : 'EduPlan NERDC Pedagogical Engine'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              {onNavigateToComposer && (
                <button
                  onClick={onNavigateToComposer}
                  className="px-3.5 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 flex items-center gap-1"
                >
                  <span>Apply in Composer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-slate-50/70 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-line">
            {coachingResult}
          </div>
        </div>
      )}
    </div>
  );
};
