import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Award,
  ArrowRight,
  ArrowLeft,
  Share2,
  RefreshCw,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Check,
  HelpCircle,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLowDataMode } from '../lib/LowDataContext.tsx';
import { offlineStorage } from '../lib/offline/offline-storage.ts';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  waecMarkType: string; // e.g. M1, A1, B1
}

interface StudentQuizPortalProps {
  quizId?: string;
  onExit?: () => void;
}

export const StudentQuizPortalPage: React.FC<StudentQuizPortalProps> = ({
  quizId = 'sample-quiz-01',
  onExit,
}) => {
  const { isLowDataMode } = useLowDataMode();
  const [studentName, setStudentName] = useState('Chinedu Okafor');
  const [parentPhone, setParentPhone] = useState('08031234567');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(600); // 10 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [submissionSyncStatus, setSubmissionSyncStatus] = useState<string>('');

  // Homework Quiz details based on Nigerian NERDC curriculum
  const quizMeta = {
    title: 'Whole Numbers, Fractions & Commercial Trade Math',
    subject: 'Mathematics',
    level: 'JSS 1',
    term: '1st Term',
    week: 'Week 3',
    schoolName: "King's College, Lagos",
    teacherName: 'Mrs. Amina Balogun',
    totalMarks: 20,
  };

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question:
        'A trader in Balogun Market, Lagos purchased a bag of rice for ₦65,000 and sold it for ₦78,000. Calculate the profit made by the trader.',
      options: ['₦12,000', '₦13,000', '₦15,000', '₦14,500'],
      correctAnswer: 1,
      explanation:
        'Profit = Selling Price - Cost Price = ₦78,000 - ₦65,000 = ₦13,000. Award A1 for the correct difference and statutory Naira (₦) symbol.',
      waecMarkType: 'A1 (Accuracy Mark)',
    },
    {
      id: 2,
      question:
        'Express 3/5 as a percentage for an agricultural yield calculation in Ogun State.',
      options: ['35%', '50%', '60%', '75%'],
      correctAnswer: 2,
      explanation:
        'To express 3/5 as a percentage: (3/5) * 100% = 60%. Award M1 for multiplying by 100% and A1 for 60%.',
      waecMarkType: 'M1 & A1 (Method + Accuracy)',
    },
    {
      id: 3,
      question:
        'Which of the following is the place value of the digit 7 in the Nigerian population figure 217,450,000?',
      options: ['Tens of Millions', 'Millions', 'Hundred Thousands', 'Ten Thousands'],
      correctAnswer: 1,
      explanation:
        'In 217,450,000: 2 is in Hundred Millions, 1 is in Ten Millions, and 7 is in Millions. Award B1 for direct conceptual recall.',
      waecMarkType: 'B1 (Independent Concept Mark)',
    },
    {
      id: 4,
      question:
        'If 4 exercise books cost ₦2,400 at an Ikeja bookshop, how much will 7 identical exercise books cost?',
      options: ['₦4,000', '₦4,200', '₦4,500', '₦4,800'],
      correctAnswer: 1,
      explanation:
        'Unit cost per book = ₦2,400 / 4 = ₦600. Cost of 7 books = 7 * ₦600 = ₦4,200.',
      waecMarkType: 'M1 (Unitary Method) + A1 (Result)',
    },
    {
      id: 5,
      question:
        'According to the Lagos State OEQA standard, how is a proper fraction characterized?',
      options: [
        'The numerator is strictly less than the denominator',
        'The numerator is greater than the denominator',
        'The denominator is always equal to zero',
        'The fraction contains an integer and a decimal',
      ],
      correctAnswer: 0,
      explanation:
        'In a proper fraction, the numerator (top number) is strictly less than the denominator (bottom number), representing a quantity less than 1 whole.',
      waecMarkType: 'B1 (Curriculum Definition Mark)',
    },
  ];

  // Timer countdown
  useEffect(() => {
    if (!isTimerRunning || isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, isSubmitted]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setIsTimerRunning(true);
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / questions.length) * 100);
    return {
      correctCount,
      total: questions.length,
      percentage,
      marksAwarded: correctCount * 4,
      totalMarks: questions.length * 4,
    };
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitted(true);
    setIsTimerRunning(false);
    confetti({ particleCount: 70, spread: 60 });

    const calculated = calculateScore();
    const waecGrade = getWaecGrade(calculated.percentage);

    const submissionPayload = {
      quizId,
      studentName: studentName || 'Student',
      parentPhone: parentPhone || '08000000000',
      score: calculated.marksAwarded,
      totalQuestions: calculated.total,
      percentage: calculated.percentage,
      grade: `${waecGrade.grade} (${waecGrade.label})`,
      selectedAnswers,
    };

    if (offlineStorage.isOnline()) {
      try {
        const res = await fetch('/api/quizzes/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionPayload),
        });
        if (res.ok) {
          setSubmissionSyncStatus('✅ Synced to School Gradebook & Cloud Portal');
        } else {
          offlineStorage.queueQuizSubmission(submissionPayload);
          setSubmissionSyncStatus('💾 Saved Locally (NEPA/Offline Safe) · Will auto-sync when online');
        }
      } catch (e) {
        offlineStorage.queueQuizSubmission(submissionPayload);
        setSubmissionSyncStatus('💾 Saved Locally (NEPA/Offline Safe) · Will auto-sync when online');
      }
    } else {
      offlineStorage.queueQuizSubmission(submissionPayload);
      setSubmissionSyncStatus('⚡ Saved Offline (No Internet / Power Safe) · Queued for auto-sync');
    }
  };

  const scoreResult = calculateScore();

  const getWaecGrade = (pct: number) => {
    if (pct >= 75) return { grade: 'A1', label: 'Distinction' };
    if (pct >= 70) return { grade: 'B2', label: 'Very Good' };
    if (pct >= 65) return { grade: 'B3', label: 'Good' };
    if (pct >= 60) return { grade: 'C4', label: 'Credit' };
    if (pct >= 55) return { grade: 'C5', label: 'Credit' };
    if (pct >= 50) return { grade: 'C6', label: 'Credit' };
    if (pct >= 45) return { grade: 'D7', label: 'Pass' };
    if (pct >= 40) return { grade: 'E8', label: 'Pass' };
    return { grade: 'F9', label: 'Fail' };
  };

  const gradeInfo = getWaecGrade(scoreResult.percentage);

  // Generate WhatsApp Share Message for parents
  const generateWhatsAppShareLink = () => {
    const cleanPhone = parentPhone.replace(/\D/g, '');
    const intlPhone = cleanPhone.startsWith('0') ? '234' + cleanPhone.slice(1) : cleanPhone;
    const msg = `Good day, Sir/Ma. 🌟\n\nI have completed my ${quizMeta.subject} online homework quiz on "${quizMeta.title}" for ${quizMeta.schoolName}.\n\nScore: ${scoreResult.correctCount}/${scoreResult.total} (${scoreResult.percentage}%) — Grade: ${gradeInfo.grade} (${gradeInfo.label})\nTeacher: ${quizMeta.teacherName}\nDate: ${new Date().toLocaleDateString('en-GB')}\n\nCompleted via EduPlan NG Student Homework Portal 🇳🇬📚`;
    return `https://wa.me/${intlPhone}?text=${encodeURIComponent(msg)}`;
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 font-sans text-slate-900">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
              EP
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900">EduPlan NG · Student Homework Portal</h1>
              <p className="text-xs text-slate-500">
                {quizMeta.schoolName} · {quizMeta.level} {quizMeta.subject} ({quizMeta.term})
              </p>
            </div>
          </div>

          {onExit && (
            <button
              onClick={onExit}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Back to App
            </button>
          )}
        </div>

        {/* STEP 1: Quiz Welcome & Student Entry */}
        {!quizStarted ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                <span>Statutory NERDC Curriculum Homework Quiz</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {quizMeta.title}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Assigned by <strong>{quizMeta.teacherName}</strong>. Complete all 5 formative multiple-choice questions aligned with NERDC {quizMeta.week} syllabus.
              </p>
            </div>

            {/* Quick Metadata Box */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Class</span>
                <p className="font-bold text-slate-900">{quizMeta.level}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Questions</span>
                <p className="font-bold text-slate-900">{questions.length} Items</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Time Limit</span>
                <p className="font-bold text-slate-900">10 Minutes</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Max Score</span>
                <p className="font-bold text-slate-900">{quizMeta.totalMarks} Marks</p>
              </div>
            </div>

            {/* Student info fields */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Full Name:
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="E.g. Chinedu Okafor"
                  className="w-full text-xs text-slate-800 bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Parent / Guardian WhatsApp Phone (for report delivery):
                </label>
                <input
                  type="text"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  placeholder="E.g. 08031234567"
                  className="w-full text-xs text-slate-800 bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                />
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Begin Homework Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : !isSubmitted ? (
          /* STEP 2: Active Quiz Taking Mode */
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            {/* Question Progress & Timer */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 tabular-nums">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>{formatTimer(timeLeftSeconds)}</span>
              </div>
            </div>

            {/* Current Question */}
            <div className="space-y-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {questions[currentIdx].waecMarkType}
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {questions[currentIdx].question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {questions[currentIdx].options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[questions[currentIdx].id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(questions[currentIdx].id, optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-600 shadow-2xs'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <span>
                        <strong className="mr-2 uppercase">
                          {String.fromCharCode(65 + optIdx)}.
                        </strong>
                        {opt}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-emerald-700 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-40 rounded-lg"
              >
                Previous
              </button>

              {currentIdx < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors shadow-2xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Quiz</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* STEP 3: Results & Statutory Score Breakdown */
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-200">
            {/* Score Banner */}
            <div className="text-center space-y-2 pb-6 border-b border-slate-100">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
                <Award className="w-9 h-9" />
              </div>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
                Quiz Result for {studentName}
              </span>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {scoreResult.percentage}%
                </span>
                <span className="text-base font-bold text-emerald-700">
                  {gradeInfo.grade} ({gradeInfo.label})
                </span>
              </div>
              <p className="text-xs text-slate-500">
                You answered {scoreResult.correctCount} out of {scoreResult.total} questions correctly ({scoreResult.marksAwarded} / {scoreResult.totalMarks} marks).
              </p>
              {submissionSyncStatus && (
                <div className="inline-block mt-2 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {submissionSyncStatus}
                </div>
              )}
            </div>

            {/* Parent WhatsApp Autopilot Broadcast Trigger */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-emerald-700" />
                  <span>Notify Parents via WhatsApp Autopilot</span>
                </span>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Send your verified test score and teacher feedback directly to {parentPhone}.
                </p>
              </div>

              <a
                href={generateWhatsAppShareLink()}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs self-start sm:self-auto shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send to WhatsApp</span>
              </a>
            </div>

            {/* Detailed Question by Question Review */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Question Review & WAEC Step-by-Step Marking Scheme
              </h4>

              <div className="space-y-3">
                {questions.map((q, idx) => {
                  const studentAns = selectedAnswers[q.id];
                  const isCorrect = studentAns === q.correctAnswer;
                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border text-xs space-y-2 ${
                        isCorrect ? 'border-emerald-200 bg-emerald-50/40' : 'border-rose-200 bg-rose-50/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">
                          {idx + 1}. {q.question}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isCorrect ? 'Correct (+4 Marks)' : 'Incorrect (0 Marks)'}
                        </span>
                      </div>

                      <div className="text-slate-600 text-[11px]">
                        <strong>Correct Answer:</strong> {q.options[q.correctAnswer]}
                      </div>

                      <div className="p-2.5 bg-white/80 rounded-lg border border-slate-200/80 text-[11px] text-slate-700">
                        <strong className="text-emerald-800 font-semibold block mb-0.5">
                          Examiner Note ({q.waecMarkType}):
                        </strong>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setQuizStarted(false);
                  setCurrentIdx(0);
                  setSelectedAnswers({});
                  setTimeLeftSeconds(600);
                }}
                className="px-5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
