import React, { useState, useEffect, useRef } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronRight,
  BarChart3,
  Users,
  Sparkles,
  Award,
  BookOpen,
} from 'lucide-react';
import {
  EDU_POLL_QUESTIONS,
  PollQuestionItem,
  getPollQuestions,
} from '../data/eduPollQuestions.ts';

interface EduPollLiveCheckerProps {
  onNavigateToFullPoll?: () => void;
}

const CLASS_LEVELS: Array<'All Classes' | 'JSS 1' | 'JSS 2' | 'JSS 3' | 'SSS 1' | 'SSS 2' | 'SSS 3'> = [
  'All Classes',
  'JSS 1',
  'JSS 2',
  'JSS 3',
  'SSS 1',
  'SSS 2',
  'SSS 3',
];

export const EduPollLiveChecker: React.FC<EduPollLiveCheckerProps> = ({ onNavigateToFullPoll }) => {
  const [selectedClass, setSelectedClass] = useState<string>('All Classes');
  const [selectedSubject, setSelectedSubject] = useState<string>('All Subjects');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [autoRotateSecondsLeft, setAutoRotateSecondsLeft] = useState<number>(14);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [localVotes, setLocalVotes] = useState<{ [id: string]: { A: number; B: number; C: number; D: number } }>({});

  // Filter questions based on selected class and subject
  const filteredQuestions = React.useMemo(() => {
    const levelFilter = selectedClass === 'All Classes' ? undefined : selectedClass;
    const subjectFilter = selectedSubject === 'All Subjects' ? undefined : selectedSubject;
    return getPollQuestions(levelFilter, subjectFilter);
  }, [selectedClass, selectedSubject]);

  // Extract unique subjects for current class filter
  const availableSubjects = React.useMemo(() => {
    const pool = selectedClass === 'All Classes'
      ? EDU_POLL_QUESTIONS
      : EDU_POLL_QUESTIONS.filter(q => q.level === selectedClass);
    const set = new Set(pool.map(q => q.subject));
    return ['All Subjects', ...Array.from(set).sort()];
  }, [selectedClass]);

  // Current active question
  const currentQuestion: PollQuestionItem = filteredQuestions[currentIndex % filteredQuestions.length] || EDU_POLL_QUESTIONS[0];

  // Initialize or get votes for the current question
  const votes = localVotes[currentQuestion.id] || currentQuestion.initialVotes || { A: 12, B: 34, C: 6, D: 3 };
  const totalVotes = votes.A + votes.B + votes.C + votes.D;

  // Auto-rotation timer
  const autoRotateTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isAutoRotating) {
      if (autoRotateTimerRef.current) clearInterval(autoRotateTimerRef.current);
      return;
    }

    autoRotateTimerRef.current = window.setInterval(() => {
      setAutoRotateSecondsLeft((prev) => {
        if (prev <= 1) {
          // Advance to next question automatically
          setCurrentIndex((old) => (old + 1) % Math.max(1, filteredQuestions.length));
          setSelectedOption(null);
          setShowResults(false);
          return 14;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (autoRotateTimerRef.current) clearInterval(autoRotateTimerRef.current);
    };
  }, [isAutoRotating, filteredQuestions.length]);

  // When class or subject changes, reset index and reset auto-timer
  const handleClassChange = (lvl: string) => {
    setSelectedClass(lvl);
    setSelectedSubject('All Subjects');
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResults(false);
    setAutoRotateSecondsLeft(14);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value);
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResults(false);
    setAutoRotateSecondsLeft(14);
  };

  const handleSelectOption = (opt: 'A' | 'B' | 'C' | 'D') => {
    if (selectedOption !== null) return; // Prevent multiple voting per question
    setSelectedOption(opt);
    setShowResults(true);

    // Increment vote count locally
    setLocalVotes((prev) => {
      const current = prev[currentQuestion.id] || currentQuestion.initialVotes || { A: 12, B: 34, C: 6, D: 3 };
      return {
        ...prev,
        [currentQuestion.id]: {
          ...current,
          [opt]: current[opt] + 1,
        },
      };
    });
  };

  const handleNextQuestion = () => {
    setCurrentIndex((old) => (old + 1) % Math.max(1, filteredQuestions.length));
    setSelectedOption(null);
    setShowResults(false);
    setAutoRotateSecondsLeft(14);
  };

  const handlePreviousQuestion = () => {
    setCurrentIndex((old) => (old - 1 + filteredQuestions.length) % Math.max(1, filteredQuestions.length));
    setSelectedOption(null);
    setShowResults(false);
    setAutoRotateSecondsLeft(14);
  };

  // Audible text-to-speech for whole-classroom projection
  const handleSpeakQuestion = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${currentQuestion.subject}, for ${currentQuestion.level}. Topic: ${currentQuestion.topic}. Question: ${currentQuestion.question}. Option A: ${currentQuestion.options.A}. Option B: ${currentQuestion.options.B}. Option C: ${currentQuestion.options.C}. Option D: ${currentQuestion.options.D}.`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white rounded-3xl border border-emerald-900/10 shadow-sm overflow-hidden">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 px-6 py-5 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
              <BarChart3 className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  EduPoll Live Classroom Checker
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[10px] font-bold text-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync
                </span>
              </div>
              <h3 className="text-lg font-black tracking-tight text-white">
                NERDC Statutory Diagnostic & Misconception Engine
              </h3>
            </div>
          </div>

          {/* Quick controls: Auto-cycle toggle, Voice speech, Full Poll link */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isAutoRotating
                  ? 'bg-emerald-700/80 hover:bg-emerald-700 text-white border border-emerald-500/30'
                  : 'bg-white/10 hover:bg-white/20 text-emerald-200 border border-white/10'
              }`}
              title={isAutoRotating ? 'Pause auto-update' : 'Resume auto-update'}
            >
              {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoRotating ? `Auto-Update (${autoRotateSecondsLeft}s)` : 'Paused'}</span>
            </button>

            <button
              onClick={handleSpeakQuestion}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isSpeaking
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
              }`}
              title="Project audible voice for classroom students"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? 'Mute' : 'Voice Aid'}</span>
            </button>

            {onNavigateToFullPoll && (
              <button
                onClick={onNavigateToFullPoll}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-emerald-950 hover:bg-emerald-50 shadow-xs transition-colors"
              >
                <span>Full Screen Clicker</span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-700" />
              </button>
            )}
          </div>
        </div>

        {/* Class level filter tabs */}
        <div className="mt-4 pt-4 border-t border-emerald-700/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {CLASS_LEVELS.map((lvl) => {
              const active = selectedClass === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => handleClassChange(lvl)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-white text-emerald-950 shadow-xs'
                      : 'bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-200 border border-emerald-700/50'
                  }`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>

          {/* Subject filter selector */}
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <select
              value={selectedSubject}
              onChange={handleSubjectChange}
              aria-label="Filter EduPoll by statutory subject"
              className="bg-emerald-950/70 border border-emerald-600/40 text-emerald-100 text-xs font-semibold rounded-xl px-2.5 py-1 focus:outline-hidden focus:ring-1 focus:ring-emerald-400"
            >
              {availableSubjects.map((sub) => (
                <option key={sub} value={sub} className="bg-slate-900 text-white">
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Auto-rotation indicator progress bar */}
      {isAutoRotating && (
        <div className="w-full bg-emerald-100 h-1 overflow-hidden">
          <div
            className="bg-emerald-600 h-full transition-all duration-1000 ease-linear"
            style={{ width: `${((14 - autoRotateSecondsLeft) / 14) * 100}%` }}
          />
        </div>
      )}

      {/* Main question card */}
      <div className="p-6 space-y-6">
        {/* Topic & Metadata strip */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-extrabold px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-200">
              {currentQuestion.level}
            </span>
            <span className="font-bold text-slate-800">{currentQuestion.subject}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 font-medium">{currentQuestion.topic}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{totalVotes} Student Responses Recorded</span>
            <span className="text-slate-300">|</span>
            <span>
              Q {((currentIndex % filteredQuestions.length) + 1)} of {filteredQuestions.length}
            </span>
          </div>
        </div>

        {/* Question Prompt */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
          <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {currentQuestion.question}
          </p>
        </div>

        {/* Options grid with live voting bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {(['A', 'B', 'C', 'D'] as const).map((key) => {
            const label = currentQuestion.options[key];
            const optVotes = votes[key];
            const pct = totalVotes > 0 ? Math.round((optVotes / totalVotes) * 100) : 0;
            const isSelected = selectedOption === key;
            const isCorrect = key === currentQuestion.correctOption;

            let borderClass = 'border-slate-200 hover:border-emerald-300 bg-white hover:bg-slate-50/70';
            let badgeBg = 'bg-slate-100 text-slate-700';

            if (showResults) {
              if (isCorrect) {
                borderClass = 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20';
                badgeBg = 'bg-emerald-600 text-white';
              } else if (isSelected && !isCorrect) {
                borderClass = 'border-rose-400 bg-rose-50/60 ring-2 ring-rose-400/20';
                badgeBg = 'bg-rose-600 text-white';
              } else {
                borderClass = 'border-slate-200 bg-slate-50/40 opacity-70';
              }
            } else if (isSelected) {
              borderClass = 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20';
              badgeBg = 'bg-emerald-700 text-white';
            }

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectOption(key)}
                className={`relative text-left p-4 rounded-2xl border transition-all text-sm group ${borderClass}`}
              >
                {/* Background vote fill bar */}
                {showResults && (
                  <div
                    className={`absolute inset-y-0 left-0 rounded-2xl transition-all duration-700 pointer-events-none ${
                      isCorrect ? 'bg-emerald-200/40' : 'bg-slate-200/40'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                )}

                <div className="relative z-10 flex items-start gap-3">
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${badgeBg}`}>
                    {key}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 leading-snug">{label}</p>

                    {showResults && (
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-700">
                          {pct}% ({optVotes} votes)
                        </span>
                        {isCorrect && (
                          <span className="font-bold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Statutory Key
                          </span>
                        )}
                        {isSelected && !isCorrect && (
                          <span className="font-bold text-rose-600 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Incorrect
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation & WAEC / BECE Chief Examiner Misconception Panel */}
        {showResults && (
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-300/60 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
                WAEC / BECE Chief Examiner Diagnostic Breakdown
              </h4>
            </div>

            <p className="text-xs text-slate-800 leading-relaxed">
              <strong className="text-emerald-900 font-bold">Standard Solution: </strong>
              {currentQuestion.explanation}
            </p>

            {selectedOption && currentQuestion.chiefExaminerMisconception[selectedOption] && (
              <div className="mt-2 p-3 rounded-xl bg-white/80 border border-amber-200 text-xs">
                <span className="font-bold text-amber-950">
                  Diagnostic note on Option {selectedOption}:{' '}
                </span>
                <span className="text-slate-700">
                  {currentQuestion.chiefExaminerMisconception[selectedOption]}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Action strip: Previous, Next, Reset */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousQuestion}
              className="px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Previous
            </button>
            <button
              onClick={handleNextQuestion}
              className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors flex items-center gap-1 shadow-xs"
            >
              <span>Next Question</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {!showResults ? (
              <button
                onClick={() => setShowResults(true)}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline px-2 py-1"
              >
                Reveal Answer & Examiner Report
              </button>
            ) : (
              <button
                onClick={() => {
                  setSelectedOption(null);
                  setShowResults(false);
                }}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 px-2 py-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Vote</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
