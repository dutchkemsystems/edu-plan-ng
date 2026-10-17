import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Sparkles,
  Printer,
  FileDown,
  CheckCircle2,
  School,
  Download,
  Share2,
  Clock,
  Award,
  Check,
  X,
  RotateCcw,
  BookOpen,
  Filter
} from 'lucide-react';
import { AssessmentItem } from '../types/index.ts';
import { fetchAssessments, generateAssessment } from '../lib/api.ts';
import { waecNecoPastQuestions, PastQuestion } from '../data/waecNecoQuestions.ts';
import confetti from 'canvas-confetti';

export const AssessmentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generator' | 'practice'>('generator');

  // Generator state
  const [assessments, setAssessments] = useState<AssessmentItem[]>([]);
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentItem | null>(null);
  const [level, setLevel] = useState('jss-1');
  const [subject, setSubject] = useState('Mathematics');
  const [term, setTerm] = useState(1);
  const [week, setWeek] = useState(7);
  const [topic, setTopic] = useState('Algebraic Expressions and Simple Equations');
  const [assessmentType, setAssessmentType] = useState<'ca_test' | 'mid_term' | 'final_exam'>('ca_test');
  const [schoolHeader, setSchoolHeader] = useState('King\'s College, Lagos — Department of Mathematics');
  const [loading, setLoading] = useState(false);
  const [showMarkingScheme, setShowMarkingScheme] = useState(true);

  // Practice Mode state
  const [selectedExamFilter, setSelectedExamFilter] = useState<string>('ALL');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('ALL');
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes timer
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    loadAssessments();
  }, []);

  // Practice mode countdown
  useEffect(() => {
    if (!isTimerRunning || submitted || activeTab !== 'practice') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitPractice();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimerRunning, submitted, activeTab]);

  const loadAssessments = async () => {
    try {
      const data = await fetchAssessments();
      setAssessments(data);
      if (data.length > 0) setSelectedAssessment(data[0]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateAssessment({
        level,
        subject,
        term,
        week,
        topic,
        assessmentType,
        schoolHeader,
      });
      setAssessments([res.assessment, ...assessments]);
      setSelectedAssessment(res.assessment);
      confetti({ particleCount: 80, spread: 60 });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportWord = () => {
    if (!selectedAssessment) return;
    const wordHtml = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>${selectedAssessment.title}</title>
<style>
  @page {
    size: A4 portrait;
    margin: 20mm;
  }
  body {
    font-family: 'Calibri', Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.4;
    color: #0f172a;
  }
  .header {
    text-align: center;
    border-bottom: 2pt solid #000;
    padding-bottom: 8pt;
    margin-bottom: 12pt;
  }
  .school-title {
    font-size: 14pt;
    font-weight: bold;
    text-transform: uppercase;
  }
  .exam-title {
    font-size: 12pt;
    font-weight: bold;
    margin-top: 4pt;
  }
  .student-box {
    border: 1pt solid #cbd5e1;
    padding: 8pt;
    margin-bottom: 14pt;
    font-size: 10pt;
  }
  .section-header {
    font-size: 11pt;
    font-weight: bold;
    background-color: #f1f5f9;
    padding: 4pt 8pt;
    border-left: 4pt solid #047857;
    margin-top: 14pt;
    margin-bottom: 8pt;
  }
  .q-item {
    margin-bottom: 10pt;
  }
  .options-grid {
    margin-left: 15pt;
    margin-top: 4pt;
  }
</style>
</head>
<body>
<div class="header">
  <div class="school-title">${selectedAssessment.schoolHeader || "MINISTRY OF BASIC EDUCATION"}</div>
  <div class="exam-title">${selectedAssessment.title.toUpperCase()} • ${selectedAssessment.level.toUpperCase()}</div>
  <div style="font-size: 9.5pt; color: #475569; margin-top: 3pt;">
    Time Allowed: 1 Hr 30 Mins | Total Marks: 60 Marks | Academic Year: 2026/2027
  </div>
</div>

<div class="student-box">
  Candidate Name: _____________________________________ &nbsp;&nbsp;&nbsp;&nbsp; Reg No: _________________________
</div>

<div class="section-header">SECTION A: OBJECTIVE QUESTIONS (Answer All Questions)</div>
${selectedAssessment.questions
  .filter((q) => q.type === 'objective')
  .map(
    (q, idx) => `
  <div class="q-item">
    <strong>${idx + 1}. ${q.question}</strong> (${q.marks} Marks)
    <div class="options-grid">
      ${(q.options || [])
        .map(
          (opt, oIdx) => `
        <span style="display: inline-block; width: 45%; margin-bottom: 3pt;">
          <strong>${String.fromCharCode(65 + oIdx)}.</strong> ${opt}
        </span>`
        )
        .join('')}
    </div>
  </div>`
  )
  .join('')}

<div class="section-header">SECTION B: THEORY & ESSAY (Answer All Questions With Detailed Working)</div>
${selectedAssessment.questions
  .filter((q) => q.type === 'theory')
  .map(
    (q, idx) => `
  <div class="q-item">
    <strong>${idx + 1}. ${q.question}</strong> (${q.marks} Marks)
    <div style="height: 60pt; border-bottom: 1pt dashed #cbd5e1; margin-top: 4pt;"></div>
  </div>`
  )
  .join('')}

${
  showMarkingScheme && selectedAssessment.markingScheme
    ? `
<div style="page-break-before: always; margin-top: 30pt; border-top: 2pt solid #000; padding-top: 15pt;">
  <div style="font-weight: bold; font-size: 12pt; text-align: center; color: #b91c1c;">
    CONFIDENTIAL TEACHER MARKING SCHEME & SCORING RUBRICS
  </div>
  ${selectedAssessment.markingScheme
    .map(
      (m) => `
    <div style="margin-top: 8pt; font-size: 10pt; padding: 4pt 8pt; background-color: #f8fafc; border-left: 2pt solid #047857;">
      <strong>Question ${m.questionId}:</strong> ${m.guide}
    </div>`
    )
    .join('')}
</div>`
    : ''
}
</body>
</html>`;

    const blob = new Blob(['\ufeff' + wordHtml], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedAssessment.title.replace(/[^a-z0-9]/gi, '_')}.doc`;
    a.click();
    URL.revokeObjectURL(url);
    confetti({ particleCount: 50, spread: 50 });
  };

  // Practice mode helpers
  const filteredQuestions = waecNecoPastQuestions.filter((q) => {
    if (selectedExamFilter !== 'ALL' && q.exam !== selectedExamFilter) return false;
    if (selectedSubjectFilter !== 'ALL' && !q.subject.toLowerCase().includes(selectedSubjectFilter.toLowerCase())) return false;
    return true;
  });

  const handleSelectOption = (questionId: string, optIdx: number) => {
    if (submitted) return;
    setUserAnswers({ ...userAnswers, [questionId]: optIdx });
  };

  const handleSubmitPractice = () => {
    setSubmitted(true);
    setIsTimerRunning(false);
    confetti({ particleCount: 90, spread: 70 });
  };

  const handleResetPractice = () => {
    setUserAnswers({});
    setSubmitted(false);
    setTimeLeft(600);
    setIsTimerRunning(true);
  };

  // Calculate practice score
  const correctCount = filteredQuestions.filter(
    (q) => userAnswers[q.id] === q.correctAnswer
  ).length;
  const percentage = filteredQuestions.length > 0 ? Math.round((correctCount / filteredQuestions.length) * 100) : 0;

  const getWaecGrade = (pct: number) => {
    if (pct >= 75) return { grade: 'A1', label: 'Distinction', color: 'text-emerald-700 bg-emerald-50 border-emerald-300' };
    if (pct >= 70) return { grade: 'B2', label: 'Very Good', color: 'text-blue-700 bg-blue-50 border-blue-300' };
    if (pct >= 65) return { grade: 'B3', label: 'Good', color: 'text-blue-700 bg-blue-50 border-blue-300' };
    if (pct >= 60) return { grade: 'C4', label: 'Credit', color: 'text-teal-700 bg-teal-50 border-teal-300' };
    if (pct >= 55) return { grade: 'C5', label: 'Credit', color: 'text-teal-700 bg-teal-50 border-teal-300' };
    if (pct >= 50) return { grade: 'C6', label: 'Credit', color: 'text-teal-700 bg-teal-50 border-teal-300' };
    if (pct >= 45) return { grade: 'D7', label: 'Pass', color: 'text-amber-700 bg-amber-50 border-amber-300' };
    if (pct >= 40) return { grade: 'E8', label: 'Pass', color: 'text-amber-700 bg-amber-50 border-amber-300' };
    return { grade: 'F9', label: 'Fail', color: 'text-rose-700 bg-rose-50 border-rose-300' };
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header with Dual Mode Switcher */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>WAEC, NECO & BECE Standard Aligned</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Assessments & Exam Practice Studio
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Build formal Continuous Assessment (CA) papers or practice authentic WAEC/NECO questions with live CBT scoring.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-gray-100 p-1 rounded-2xl flex items-center gap-1 text-xs font-bold self-start md:self-auto">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'generator'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Printer className="w-4 h-4 text-emerald-600" />
            <span>Exam Paper Generator</span>
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'practice'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>WAEC/NECO Practice Mode</span>
          </button>
        </div>
      </div>

      {/* TAB 1: EXAM GENERATOR */}
      {activeTab === 'generator' && (
        <div className="space-y-6">
          {/* Action Row */}
          {selectedAssessment && (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowMarkingScheme(!showMarkingScheme)}
                className="px-3 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl"
              >
                {showMarkingScheme ? 'Hide Scheme' : 'Show Scheme'}
              </button>
              <button
                onClick={handleExportWord}
                className="px-3.5 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl flex items-center gap-1.5 border border-blue-200"
              >
                <FileDown className="w-4 h-4" />
                <span>Export Word (.doc)</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-1.5 shadow-2xs"
              >
                <Printer className="w-4 h-4" />
                <span>Print Paper</span>
              </button>
            </div>
          )}

          {/* Generator Configuration Panel */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Class Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
              >
                <option value="jss-1">JSS 1</option>
                <option value="jss-2">JSS 2</option>
                <option value="jss-3">JSS 3 (BECE Prep)</option>
                <option value="sss-1">SSS 1</option>
                <option value="sss-2">SSS 2</option>
                <option value="sss-3">SSS 3 (WAEC/NECO)</option>
              </select>
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
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Assessment Type</label>
              <select
                value={assessmentType}
                onChange={(e) => setAssessmentType(e.target.value as any)}
                className="w-full text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
              >
                <option value="ca_test">Continuous Assessment 1 (20 Marks)</option>
                <option value="mid_term">Mid-Term Assessment (20 Marks)</option>
                <option value="final_exam">Terminal Exam Paper (60 Marks)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Topic / Coverage</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-2 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{loading ? 'Building Paper...' : 'Generate Exam Paper'}</span>
              </button>
            </div>
          </div>

          {/* Assessment Paper Preview */}
          {selectedAssessment && (
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-6">
              <div className="text-center pb-4 border-b-2 border-gray-900">
                <h2 className="text-base font-black uppercase tracking-wider">{selectedAssessment.schoolHeader}</h2>
                <h3 className="text-sm font-bold uppercase mt-1">{selectedAssessment.title}</h3>
                <div className="flex items-center justify-center gap-4 text-xs text-gray-600 mt-2 font-medium">
                  <span>Class: {selectedAssessment.level.toUpperCase()}</span>
                  <span>•</span>
                  <span>Subject: {selectedAssessment.subject}</span>
                  <span>•</span>
                  <span>Time Allowed: 1 Hr 30 Mins</span>
                </div>
              </div>

              {/* Section A: Objectives */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-2 rounded-lg font-bold text-xs uppercase text-gray-800 border-l-4 border-emerald-600">
                  Section A: Multiple Choice Objectives (Answer All Questions)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedAssessment.questions
                    .filter((q) => q.type === 'objective')
                    .map((q, idx) => (
                      <div key={q.id} className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/40 space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs font-bold text-gray-900">
                            {idx + 1}. {q.question}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-200 text-gray-700 shrink-0">
                            {q.marks} mks
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 text-xs text-gray-600 pl-2">
                          {q.options?.map((opt, oIdx) => (
                            <div key={oIdx} className="flex items-center gap-1.5">
                              <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-700">
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span>{opt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Section B: Theory */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="bg-gray-50 p-2 rounded-lg font-bold text-xs uppercase text-gray-800 border-l-4 border-emerald-600">
                  Section B: Theory & Essay (Show All Working Clearly)
                </div>

                <div className="space-y-3">
                  {selectedAssessment.questions
                    .filter((q) => q.type === 'theory')
                    .map((q, idx) => (
                      <div key={q.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50/40 space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-gray-900">
                            Question {idx + 1}: {q.question}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                            {q.marks} Marks
                          </span>
                        </div>
                        <div className="h-16 border-b border-dashed border-gray-300"></div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Marking Scheme */}
              {showMarkingScheme && selectedAssessment.markingScheme && (
                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-950 uppercase">Confidential Teacher Marking Guide</span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                      Rubrics
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-amber-900">
                    {selectedAssessment.markingScheme.map((m, idx) => (
                      <div key={idx} className="flex gap-2 p-2 bg-white rounded-lg border border-amber-200">
                        <span className="font-bold shrink-0">Q{m.questionId}:</span>
                        <span>{m.guide}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: WAEC/NECO PRACTICE MODE (CBT SIMULATOR) */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          {/* Practice Controls Bar */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Filter Examination</label>
                <select
                  value={selectedExamFilter}
                  onChange={(e) => setSelectedExamFilter(e.target.value)}
                  className="text-xs font-bold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                >
                  <option value="ALL">All Examinations (WAEC / NECO / BECE)</option>
                  <option value="WAEC">WAEC WASSCE Only</option>
                  <option value="NECO">NECO SSCE Only</option>
                  <option value="BECE">Junior BECE Only</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Filter Subject</label>
                <select
                  value={selectedSubjectFilter}
                  onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                  className="text-xs font-bold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                >
                  <option value="ALL">All Subjects</option>
                  <option value="Mathematics">General Mathematics</option>
                  <option value="English">English Studies</option>
                  <option value="Biology">Biology</option>
                  <option value="Civic">Civic Education</option>
                  <option value="Economics">Economics</option>
                </select>
              </div>
            </div>

            {/* Timer & CBT Status */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-2 bg-emerald-50 rounded-xl border border-emerald-200 font-mono text-xs font-black text-emerald-900">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>Time Remaining: {formatTimer(timeLeft)}</span>
              </div>

              {submitted ? (
                <button
                  onClick={handleResetPractice}
                  className="px-4 py-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Practice</span>
                </button>
              ) : (
                <button
                  onClick={handleSubmitPractice}
                  className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-all hover:scale-105"
                >
                  Submit & Grade Exam
                </button>
              )}
            </div>
          </div>

          {/* Results Score Banner (Appears after submission) */}
          {submitted && (
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  WAEC/NECO Diagnostic Result
                </span>
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-black text-gray-900">
                    {correctCount} / {filteredQuestions.length}{' '}
                    <span className="text-base font-semibold text-gray-500">({percentage}%)</span>
                  </div>
                  {(() => {
                    const gradeInfo = getWaecGrade(percentage);
                    return (
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase border ${gradeInfo.color}`}>
                        Grade {gradeInfo.grade} — {gradeInfo.label}
                      </span>
                    );
                  })()}
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Examine detailed step-by-step solutions and Chief Examiner remarks below.
                </p>
              </div>

              <button
                onClick={handleResetPractice}
                className="px-4 py-2.5 text-xs font-bold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors self-start sm:self-auto"
              >
                Practice Another Set
              </button>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-4">
            {filteredQuestions.map((q, qIndex) => {
              const selectedOpt = userAnswers[q.id];
              const isCorrect = selectedOpt === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-3xl border bg-white shadow-2xs space-y-4 transition-all ${
                    submitted
                      ? isCorrect
                        ? 'border-emerald-300 bg-emerald-50/20'
                        : 'border-rose-300 bg-rose-50/20'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-slate-800 text-white">
                        {q.exam} {q.year}
                      </span>
                      <span className="text-xs font-bold text-gray-500">{q.subject}</span>
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-500 italic">{q.topic}</span>
                    </div>

                    {submitted && (
                      <span className="flex items-center gap-1 text-xs font-bold">
                        {isCorrect ? (
                          <span className="text-emerald-700 flex items-center gap-1 font-bold">
                            <Check className="w-4 h-4 text-emerald-600" /> Correct (+1 Mark)
                          </span>
                        ) : (
                          <span className="text-rose-700 flex items-center gap-1 font-bold">
                            <X className="w-4 h-4 text-rose-600" /> Incorrect (0 Marks)
                          </span>
                        )}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-bold text-gray-900">
                    {qIndex + 1}. {q.question}
                  </p>

                  {/* Radio Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, oIdx) => {
                      const isOptionSelected = selectedOpt === oIdx;
                      const isOptionCorrect = q.correctAnswer === oIdx;

                      let btnStyle = 'border-gray-200 hover:border-gray-300 bg-gray-50 text-gray-700';
                      if (submitted) {
                        if (isOptionCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-100 text-emerald-950 font-bold';
                        } else if (isOptionSelected && !isOptionCorrect) {
                          btnStyle = 'border-rose-400 bg-rose-100 text-rose-950';
                        }
                      } else if (isOptionSelected) {
                        btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-2xs';
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleSelectOption(q.id, oIdx)}
                          disabled={submitted}
                          className={`p-3 rounded-2xl border text-left text-xs transition-all flex items-center gap-3 ${btnStyle}`}
                        >
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 ${
                              isOptionSelected
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="flex-1 leading-snug">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Step-by-Step Marking Explanation (Shown after submit) */}
                  {submitted && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1 mt-2">
                      <span className="font-bold text-gray-900 block flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Examiner Solution & Rationale:</span>
                      </span>
                      <p className="text-gray-700 leading-relaxed font-sans">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
