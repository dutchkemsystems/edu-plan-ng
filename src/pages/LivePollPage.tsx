import React, { useState, useEffect } from 'react';
import {
  Radio,
  Users,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Smartphone,
  Sparkles,
  BarChart3,
  RefreshCw,
  PlusCircle,
  Award,
  ArrowRight,
  Wifi,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PollData {
  code: string;
  teacherName: string;
  schoolName: string;
  subject: string;
  level: string;
  question: string;
  options: { [key: string]: string };
  votes: { [key: string]: number };
  totalVotes: number;
  correctOption: string;
  explanation: string;
  chiefExaminerMisconception: { [key: string]: string };
}

export const LivePollPage: React.FC = () => {
  const [activePoll, setActivePoll] = useState<PollData | null>(null);
  const [selectedStudentVote, setSelectedStudentVote] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isTeacherView, setIsTeacherView] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Create Poll Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newSubject, setNewSubject] = useState('Mathematics');
  const [newLevel, setNewLevel] = useState('SSS 2');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctOpt, setCorrectOpt] = useState('B');
  const [newExplanation, setNewExplanation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchActivePoll();
    const interval = setInterval(fetchActivePoll, 4000);
    return () => clearInterval(interval);
  }, []);

  const fetchActivePoll = async () => {
    try {
      const res = await fetch('/api/polls/KC-892');
      if (res.ok) {
        const data = await res.json();
        setActivePoll(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleStudentVote = async (optionKey: string) => {
    if (!activePoll || hasVoted) return;
    setSelectedStudentVote(optionKey);
    setHasVoted(true);

    try {
      const res = await fetch(`/api/polls/${activePoll.code}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ option: optionKey }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.isCorrect) {
          confetti({ particleCount: 70, spread: 60 });
        }
        fetchActivePoll();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreatePoll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !optA || !optB) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/polls/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: newSubject,
          level: newLevel,
          question: newQuestion,
          options: { A: optA, B: optB, C: optC || 'None of the above', D: optD || 'Cannot be determined' },
          correctOption: correctOpt,
          explanation: newExplanation || 'Solved with standard NERDC formula.',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setActivePoll(data.poll);
        setShowCreateModal(false);
        setHasVoted(false);
        setSelectedStudentVote(null);
        setShowExplanation(false);
        confetti({ particleCount: 60, spread: 50 });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!activePoll) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold">Connecting to live classroom clicker network...</p>
      </div>
    );
  }

  const votePercentages: { [key: string]: number } = {};
  ['A', 'B', 'C', 'D'].forEach((key) => {
    const count = activePoll.votes[key] || 0;
    votePercentages[key] = activePoll.totalVotes > 0 ? Math.round((count / activePoll.totalVotes) * 100) : 0;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-150">
      {/* Top Banner: Mode Switcher & Join Code */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-2">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>EduPoll Live · Low-Bandwidth Student Clicker</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {activePoll.schoolName} · {activePoll.subject} ({activePoll.level})
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Teacher: {activePoll.teacherName} · Real-time OEQA Step 3/5 Diagnostic Polling
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Join Pin Badge */}
          <div className="bg-emerald-950/80 border border-emerald-500/40 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-inner">
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase block tracking-wider">
                Classroom PIN
              </span>
              <span className="text-xl font-mono font-black text-white tracking-widest">
                {activePoll.code}
              </span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/#poll`);
                setCopiedLink(true);
                setTimeout(() => setCopiedLink(false), 2500);
              }}
              className="p-1.5 bg-emerald-800/60 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              title="Copy Student Join Link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Teacher / Student Toggle */}
          <div className="p-1 bg-slate-800 rounded-xl flex items-center gap-1 border border-slate-700">
            <button
              onClick={() => setIsTeacherView(true)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                isTeacherView ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Teacher View
            </button>
            <button
              onClick={() => setIsTeacherView(false)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                !isTeacherView ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Student Clicker
            </button>
          </div>
        </div>
      </div>

      {isTeacherView ? (
        /* TEACHER PROJECTOR VIEW */
        <div className="space-y-6">
          {/* Question Box */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Diagnostic Question
              </span>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{activePoll.totalVotes} Students Responded</span>
                </span>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>New Poll</span>
                </button>
              </div>
            </div>

            <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {activePoll.question}
            </p>

            {/* Live Distribution Bars */}
            <div className="space-y-3 pt-2">
              {Object.entries(activePoll.options).map(([key, text]) => {
                const pct = votePercentages[key] || 0;
                const isCorrect = key === activePoll.correctOption;
                const isRevealed = showExplanation;

                return (
                  <div
                    key={key}
                    className={`p-4 rounded-2xl border transition-all ${
                      isRevealed && isCorrect
                        ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/20'
                        : 'bg-slate-50/70 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                            isRevealed && isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 text-slate-800'
                          }`}
                        >
                          {key}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-800">
                          {text}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="font-bold text-slate-900">{pct}%</span>
                        <span className="text-slate-400">({activePoll.votes[key] || 0})</span>
                      </div>
                    </div>

                    {/* Progress Fill */}
                    <div className="w-full bg-slate-200/80 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          isRevealed && isCorrect
                            ? 'bg-emerald-600'
                            : 'bg-slate-600'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    {/* Chief Examiner Misconception Warning (Revealed) */}
                    {isRevealed && activePoll.chiefExaminerMisconception?.[key] && (
                      <div className="mt-2 text-[11px] pt-2 border-t border-slate-200/60 flex items-start gap-1.5">
                        {isCorrect ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        )}
                        <span className={isCorrect ? 'text-emerald-800' : 'text-amber-900'}>
                          <strong>{isCorrect ? 'Examiner Marking Rule:' : 'Candidate Pitfall:'}</strong>{' '}
                          {activePoll.chiefExaminerMisconception[key]}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Low-bandwidth mode active: updates use under 1KB per broadcast.
              </span>
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 ${
                  showExplanation
                    ? 'bg-slate-800 text-white hover:bg-slate-900'
                    : 'bg-emerald-700 text-white hover:bg-emerald-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{showExplanation ? 'Hide Examiner Analysis' : 'Unmask WAEC Marking Rules'}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* STUDENT CLICKER VIEW */
        <div className="max-w-md mx-auto space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-4">
            <div className="text-center space-y-1 pb-2 border-b border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Student Response Terminal
              </span>
              <h3 className="text-base font-bold text-slate-900 pt-1">
                {activePoll.question}
              </h3>
            </div>

            {/* Big Clicker Buttons A / B / C / D */}
            <div className="grid grid-cols-1 gap-2.5">
              {Object.entries(activePoll.options).map(([key, text]) => {
                const isSelected = selectedStudentVote === key;
                return (
                  <button
                    key={key}
                    disabled={hasVoted}
                    onClick={() => handleStudentVote(key)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-500/30'
                        : hasVoted
                        ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200/90 shadow-2xs hover:border-emerald-500 active:scale-98'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                          isSelected ? 'bg-white text-emerald-700' : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {key}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold">{text}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-white" />}
                  </button>
                );
              })}
            </div>

            {hasVoted && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1 animate-in zoom-in-95">
                <span className="text-xs font-bold text-emerald-900 block">
                  Vote Recorded in Room {activePoll.code}!
                </span>
                <p className="text-[11px] text-emerald-700">
                  Your response has been collated into the teacher’s diagnostic matrix.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: Create New Live Classroom Diagnostic Poll */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <form onSubmit={handleCreatePoll}>
              <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
                <div>
                  <span className="text-xs text-emerald-400 font-bold block">OEQA Step 3/5 Formative Drill</span>
                  <h3 className="text-base font-bold text-white">Create Live Classroom Poll</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="text-slate-400 hover:text-white text-xs bg-white/10 px-2.5 py-1 rounded-full"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Question Text</label>
                  <textarea
                    required
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="e.g. Calculate the resultant velocity of a boat crossing the River Niger..."
                    className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 min-h-[60px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Option A</label>
                    <input
                      required
                      type="text"
                      value={optA}
                      onChange={(e) => setOptA(e.target.value)}
                      placeholder="Option A text"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Option B</label>
                    <input
                      required
                      type="text"
                      value={optB}
                      onChange={(e) => setOptB(e.target.value)}
                      placeholder="Option B text"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Option C</label>
                    <input
                      type="text"
                      value={optC}
                      onChange={(e) => setOptC(e.target.value)}
                      placeholder="Option C text"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Option D</label>
                    <input
                      type="text"
                      value={optD}
                      onChange={(e) => setOptD(e.target.value)}
                      placeholder="Option D text"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Correct Answer</label>
                    <select
                      value={correctOpt}
                      onChange={(e) => setCorrectOpt(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-bold"
                    >
                      <option value="A">Option A</option>
                      <option value="B">Option B</option>
                      <option value="C">Option C</option>
                      <option value="D">Option D</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Subject & Level</label>
                    <input
                      type="text"
                      value={`${newSubject} (${newLevel})`}
                      onChange={() => {}}
                      readOnly
                      className="w-full text-xs bg-slate-100 text-slate-600 border border-slate-200 rounded-xl px-3 py-1.5"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Chalkboard Step & Explanation
                  </label>
                  <input
                    type="text"
                    value={newExplanation}
                    onChange={(e) => setNewExplanation(e.target.value)}
                    placeholder="e.g. Formula: V = d/t. Substitute 50m / 5s = 10 m/s."
                    className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <PlusCircle className="w-3.5 h-3.5" />
                  )}
                  <span>Launch Live Classroom Poll</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
