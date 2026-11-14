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
  Filter,
  RefreshCw,
  AlertCircle,
  Lock
} from 'lucide-react';
import { AssessmentItem, TeacherUser, DashboardStats } from '../types/index.ts';
import { fetchAssessments, generateAssessment, getAuthHeaders } from '../lib/api.ts';
import { resolveClientTierSummary } from '../config/pricing.ts';
import { waecNecoPastQuestions, PastQuestion } from '../data/waecNecoQuestions.ts';
import confetti from 'canvas-confetti';
import { GoogleClassroomExportModal } from '../components/GoogleClassroomExportModal.tsx';
import { MultimodalScriptScanner } from '../components/MultimodalScriptScanner.tsx';

interface AssessmentsPageProps {
  user?: TeacherUser | null;
  stats?: DashboardStats | null;
  onOpenUpgrade?: (msg: string, tier?: string, title?: string) => void;
  onPlanQuotaChanged?: () => void;
}

export const AssessmentsPage: React.FC<AssessmentsPageProps> = ({
  user,
  stats,
  onOpenUpgrade,
  onPlanQuotaChanged,
}) => {
  const tierSummary = resolveClientTierSummary(user, stats);
  const ent = tierSummary.config;
  const recommendedExamUpgradeTier = tierSummary.category === 'b2b' ? 'b2b_silver' : 'b2c_termly';
  const [activeTab, setActiveTab] = useState<'generator' | 'predict' | 'grading' | 'practice'>(
    ent.hasExamGen ? 'generator' : 'practice'
  );
  const [showClassroomModal, setShowClassroomModal] = useState(false);

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
  const [includeOmrSheet, setIncludeOmrSheet] = useState(true);

  // Exam Predictor state (Phase 5)
  const [predictExamBody, setPredictExamBody] = useState<'WAEC' | 'NECO' | 'BECE'>('WAEC');
  const [predictTopic, setPredictTopic] = useState('Profit, Loss & Simple Interest in Commercial Trading');
  const [predictSubject, setPredictSubject] = useState('Mathematics');
  const [predictLevel, setPredictLevel] = useState('SSS 2');
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState<any>(null);

  // AI Grading Assistant state (Phase 5)
  const [gradeQuestion, setGradeQuestion] = useState(
    'A trader in Balogun Market purchased goods for ₦120,000 and sold them for ₦150,000. Calculate (i) the profit (ii) the percentage profit on cost.'
  );
  const [gradeMarkingScheme, setGradeMarkingScheme] = useState(
    'M1 for Profit = SP - CP (₦150,000 - ₦120,000 = ₦30,000). A1 for ₦30,000. M1 for (Profit / CP) * 100%. A1 for 25%.'
  );
  const [gradeStudentText, setGradeStudentText] = useState(
    'Profit = Selling Price - Cost Price\n= 150,000 - 120,000\n= 30,000\nPercentage Profit = (30,000 / 120,000) * 100% = 25%'
  );
  const [isGrading, setIsGrading] = useState(false);
  const [gradingResult, setGradingResult] = useState<any>(null);

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
    if (!ent.hasExamGen) {
      onOpenUpgrade?.(
        'Exam Generator is unlocked on B2C Pro Termly (₦1,500), B2C Session (₦3,000), B2B Silver (₦120,000), B2B Gold (₦250,000), and B2G Platinum.',
        recommendedExamUpgradeTier,
        'Exam & Assessment Generator'
      );
      return;
    }
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
      onPlanQuotaChanged?.();
      confetti({ particleCount: 80, spread: 60 });
    } catch (e: any) {
      if (e?.status === 403 || e?.status === 429) {
        onOpenUpgrade?.(e.message, e.requiredTier || recommendedExamUpgradeTier, 'Exam & Assessment Generator');
      } else {
        console.error(e);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRunExamPrediction = async () => {
    if (!ent.hasExamGen) {
      onOpenUpgrade?.(
        '10-Year WAEC / NECO Predictor is unlocked on B2C Pro Termly (₦1,500), B2B Silver (₦120,000), and B2B Gold (₦250,000).',
        recommendedExamUpgradeTier,
        'WAEC 10-Year Exam Predictor'
      );
      return;
    }
    setIsPredicting(true);
    try {
      const res = await fetch('/api/ai/predict-exam', {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify({
          subject: predictSubject,
          level: predictLevel.toLowerCase().replace(/\s+/g, '-'),
          topic: predictTopic,
          examBody: predictExamBody,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 403 || res.status === 429) {
          onOpenUpgrade?.(data?.error || data?.message || 'Upgrade required for Exam Predictor.', data?.requiredTier || recommendedExamUpgradeTier, 'WAEC 10-Year Exam Predictor');
        }
        return;
      }
      if (data.success && data.data) {
        setPredictionResult(data.data);
        onPlanQuotaChanged?.();
        confetti({ particleCount: 60, spread: 55 });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsPredicting(false);
    }
  };

  const handleRunGrading = async () => {
    if (!ent.hasExamGen) {
      onOpenUpgrade?.(
        'AI Script Grader is unlocked on B2C Pro Termly (₦1,500), B2B Silver (₦120,000), and B2B Gold (₦250,000).',
        recommendedExamUpgradeTier,
        'AI Script Grader'
      );
      return;
    }
    setIsGrading(true);
    try {
      const res = await fetch('/api/ai/grade-paper', {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify({
          questionText: gradeQuestion,
          markingScheme: gradeMarkingScheme,
          studentText: gradeStudentText,
          maxMarks: 10,
          subject: predictSubject,
          level: predictLevel,
          examType: predictExamBody,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 403 || res.status === 429) {
          onOpenUpgrade?.(data?.error || data?.message || 'Upgrade required for AI Script Grader.', data?.requiredTier || recommendedExamUpgradeTier, 'AI Script Grader');
        }
        return;
      }
      if (data.success && data.data) {
        setGradingResult(data.data);
        onPlanQuotaChanged?.();
        confetti({ particleCount: 50, spread: 50 });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGrading(false);
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
${ent.hasDraftWatermark ? `
<div style="border: 2pt dashed #dc2626; background-color: #fef2f2; color: #b91c1c; text-align: center; font-weight: bold; padding: 6pt; margin-bottom: 12pt; font-size: 10pt;">
  DRAFT — 5-DAY TRIAL PASS (EDUPLAN NG) • UPGRADE TO REMOVE WATERMARK
</div>` : ''}
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
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-2xl flex flex-wrap items-center gap-1 text-xs font-bold self-start md:self-auto">
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'generator'
                  ? 'bg-white text-emerald-950 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {ent.hasExamGen ? <Printer className="w-4 h-4 text-emerald-600" /> : <Lock className="w-3.5 h-3.5 text-amber-600" />}
              <span>Exam Generator</span>
            </button>
            <button
              onClick={() => setActiveTab('predict')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'predict'
                  ? 'bg-white text-emerald-950 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {ent.hasExamGen ? <Sparkles className="w-4 h-4 text-amber-500" /> : <Lock className="w-3.5 h-3.5 text-amber-600" />}
              <span>WAEC 10-Yr Predictor</span>
            </button>
            <button
              onClick={() => setActiveTab('grading')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'grading'
                  ? 'bg-white text-emerald-950 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {ent.hasExamGen ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Lock className="w-3.5 h-3.5 text-amber-600" />}
              <span>AI Script Grader</span>
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'practice'
                  ? 'bg-white text-emerald-950 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>CBT Practice</span>
            </button>
          </div>

          <a
            href="/quiz/sample-quiz-01"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Homework Portal (/quiz)</span>
          </a>
        </div>
      </div>

      {/* Locked Plan Gate Banner for Exam Gen / Predictor / AI Grader */}
      {!ent.hasExamGen && activeTab !== 'practice' && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">
                Locked on {tierSummary.segmentLabel} • {ent.name}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Exam Generator, 10-Year Predictor & AI Script Grader Locked
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                {tierSummary.category === 'b2b'
                  ? 'Your school is on B2B Bronze (₦45,000/term). Upgrade to B2B Silver (₦120,000/term) or B2B Gold (₦250,000/term) to unlock automated Exams, WAEC Predictor & AI Script Grading. CBT Past Questions Practice remains free.'
                  : 'Upgrade from 5-Day Trial / Monthly Standard to B2C Pro Termly (₦1,500/term) or B2C Session (₦3,000/yr) to unlock Exam Generator, WAEC Predictor & AI Script Grading. CBT Practice remains open.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('practice')}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl"
            >
              Open CBT Practice
            </button>
            <button
              onClick={() =>
                onOpenUpgrade?.(
                  'Unlock Automated Exam Papers, WAEC 10-Year Predictor & AI Script Grading.',
                  recommendedExamUpgradeTier,
                  'Unlock Exam Generator Suite'
                )
              }
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-2xs"
            >
              {tierSummary.category === 'b2b' ? 'Upgrade to B2B Silver' : 'Upgrade to Pro Termly'}
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: EXAM GENERATOR */}
      {activeTab === 'generator' && ent.hasExamGen && (
        <div className="space-y-6">
          {/* Action Row */}
          {selectedAssessment && (
            <div className="flex flex-wrap items-center justify-end gap-2">
              <button
                onClick={() => setIncludeOmrSheet(!includeOmrSheet)}
                className={`px-3 py-2 text-xs font-bold rounded-xl border transition-colors ${
                  includeOmrSheet
                    ? 'bg-purple-50 text-purple-800 border-purple-200'
                    : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}
                title="Toggle candidate OMR bubble answer sheet for photocopying"
              >
                <span>{includeOmrSheet ? 'OMR Sheet: Included' : '+ Include OMR Sheet'}</span>
              </button>
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
                onClick={() => {
                  if (!ent.hasLmsExport) {
                    onOpenUpgrade?.(
                      'Google Classroom LMS Export is exclusive to B2B Gold (₦250,000/term) and B2G State Platinum.',
                      'b2b_gold',
                      'Google Classroom LMS Export'
                    );
                    return;
                  }
                  setShowClassroomModal(true);
                }}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 border ${
                  ent.hasLmsExport
                    ? 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border-emerald-300'
                    : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border-amber-300'
                }`}
                title={ent.hasLmsExport ? 'Share to Google Classroom' : 'Requires B2B Gold (₦250,000/term) or B2G Platinum'}
              >
                {ent.hasLmsExport ? <Share2 className="w-4 h-4 text-emerald-700" /> : <Lock className="w-3.5 h-3.5 text-amber-700" />}
                <span>Google Classroom{!ent.hasLmsExport ? ' (Gold)' : ''}</span>
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

          {/* Google Classroom Export Modal */}
          {selectedAssessment && (
            <GoogleClassroomExportModal
              isOpen={showClassroomModal}
              onClose={() => setShowClassroomModal(false)}
              plan={{
                id: selectedAssessment.id,
                title: selectedAssessment.title,
                level: selectedAssessment.level,
                subject: selectedAssessment.subject,
                term: selectedAssessment.term,
                week: selectedAssessment.week,
                objectives: [
                  `Answer continuous assessment items aligned with NERDC standards.`,
                  `Demonstrate mastery of ${selectedAssessment.topic}`,
                ],
                evaluation: `Paper includes ${selectedAssessment.questions.length} objective and theory questions. Total marks: 60.`,
                assignment: `Review marking scheme rubrics and correct errors in exercise notebook.`,
              }}
            />
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

              {/* OMR (Optical Mark Recognition) Candidate Bubble Answer Sheet */}
              {includeOmrSheet && (
                <div className="pt-6 border-t-2 border-dashed border-gray-400 space-y-4 print:break-before-page">
                  <div className="text-center pb-2 border-b-2 border-purple-900">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-900 bg-purple-50 px-3 py-0.5 rounded-full border border-purple-200">
                      Standardized Candidate Objective Response Sheet (OMR)
                    </span>
                    <h3 className="text-sm font-extrabold text-gray-900 mt-1 uppercase">
                      {selectedAssessment.schoolHeader || "King's College, Lagos"}
                    </h3>
                    <p className="text-[10px] text-gray-500">
                      Use HB Pencil Only • Shade Completely within the Oval • Example: [ ● ]
                    </p>
                  </div>

                  {/* Candidate Particulars Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-purple-50/40 border border-purple-200 text-xs">
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase">Candidate Name:</span>
                      <div className="border-b border-gray-400 h-5 mt-1"></div>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase">Examination / Reg No:</span>
                      <div className="border-b border-gray-400 h-5 mt-1 font-mono"></div>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase">Class & Arm:</span>
                      <div className="border-b border-gray-400 h-5 mt-1 font-semibold">{selectedAssessment.level.toUpperCase()}</div>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase">Subject:</span>
                      <div className="border-b border-gray-400 h-5 mt-1 font-semibold">{selectedAssessment.subject}</div>
                    </div>
                  </div>

                  {/* 20 OMR Bubble Rows */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-white border border-gray-200 rounded-xl">
                    {Array.from({ length: 20 }, (_, i) => (
                      <div key={i} className="flex items-center justify-between py-1 px-2 border-b border-gray-100 text-xs">
                        <span className="font-bold text-gray-600 w-6 text-right mr-2">{i + 1}.</span>
                        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-gray-700">
                          {['A', 'B', 'C', 'D'].map((letter) => (
                            <span
                              key={letter}
                              className="w-5 h-5 rounded-full border border-gray-400 inline-flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                            >
                              {letter}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Invigilator / Supervisor Seal */}
                  <div className="grid grid-cols-2 gap-6 pt-2 text-center text-xs text-gray-500">
                    <div className="border-t border-dashed border-gray-300 pt-1">
                      <div className="text-[10px] font-bold text-gray-700">Candidate's Signature & Date</div>
                    </div>
                    <div className="border-t border-dashed border-gray-300 pt-1">
                      <div className="text-[10px] font-bold text-emerald-800">Invigilator / Supervisor's Verification Stamp</div>
                    </div>
                  </div>
                </div>
              )}

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

      {/* TAB 2: WAEC/NECO 10-YEAR EXAM PREDICTOR (PHASE 5) */}
      {activeTab === 'predict' && ent.hasExamGen && (
        <div className="space-y-6">
          {/* Configuration Form */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  10-Year WAEC / NECO / BECE Exam Forecast Engine
                </h2>
                <p className="text-xs text-slate-500">
                  Cross-references current NERDC syllabus with past 10 years of WAEC/NECO papers to predict high-probability questions and marking schemes.
                </p>
              </div>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                Statutory M1, A1, B1 Rubrics
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Examination Body</label>
                <select
                  value={predictExamBody}
                  onChange={(e) => setPredictExamBody(e.target.value as any)}
                  className="w-full text-xs font-bold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                >
                  <option value="WAEC">WAEC (WASSCE)</option>
                  <option value="NECO">NECO (SSCE)</option>
                  <option value="BECE">Junior Secondary (BECE)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Class Level</label>
                <select
                  value={predictLevel}
                  onChange={(e) => setPredictLevel(e.target.value)}
                  className="w-full text-xs font-bold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                >
                  <option value="SSS 3">SSS 3 (Final Year Exam)</option>
                  <option value="SSS 2">SSS 2 (Senior Model)</option>
                  <option value="SSS 1">SSS 1 (Foundational Senior)</option>
                  <option value="JSS 3">JSS 3 (BECE Candidates)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                <select
                  value={predictSubject}
                  onChange={(e) => setPredictSubject(e.target.value)}
                  className="w-full text-xs font-bold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="English Studies">English Studies</option>
                  <option value="Biology">Biology</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Physics">Physics</option>
                  <option value="Economics">Economics</option>
                  <option value="Civic Education">Civic Education</option>
                  <option value="Agricultural Science">Agricultural Science</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">NERDC Scheme Topic</label>
                <input
                  type="text"
                  value={predictTopic}
                  onChange={(e) => setPredictTopic(e.target.value)}
                  placeholder="Topic to forecast..."
                  className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleRunExamPrediction}
                disabled={isPredicting}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-2xs transition-all"
              >
                {isPredicting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 text-amber-300" />
                )}
                <span>{isPredicting ? 'Mining 10-Yr WAEC Papers...' : 'Forecast Predicted Exam Questions'}</span>
              </button>
            </div>
          </div>

          {/* Prediction Result Display */}
          {predictionResult && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      {predictionResult.examBody || predictExamBody} Forecast
                    </span>
                    <span className="text-xs font-bold text-slate-900">{predictTopic}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {predictionResult.historicalFrequency || 'High recurring frequency in past 10 years.'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Occurrence Probability</span>
                  <span className="text-2xl font-mono font-extrabold text-emerald-700 tabular-nums">
                    {predictionResult.probabilityScore || 88}%
                  </span>
                </div>
              </div>

              {/* Section A: Predicted Multiple Choice */}
              {predictionResult.sectionA_MultipleChoice && (
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                    Section A: High-Probability Multiple Choice Questions
                  </span>
                  <div className="space-y-3">
                    {predictionResult.sectionA_MultipleChoice.map((q: any, idx: number) => (
                      <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                        <div className="font-bold text-slate-900">
                          {idx + 1}. {q.question}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-slate-700 pl-2">
                          {q.options?.map((opt: string, oIdx: number) => (
                            <div key={oIdx}>
                              <span className="font-semibold mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                              {opt}
                            </div>
                          ))}
                        </div>
                        <div className="pt-1 text-[11px] text-emerald-800 font-semibold border-t border-slate-200">
                          <strong>Official Key:</strong> Option {String.fromCharCode(65 + q.correctAnswer)} · <em>{q.explanation}</em>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section B: Predicted Theory & Marking Scheme */}
              {predictionResult.sectionB_Theory && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                    Section B: Predicted Theory Questions with M1/A1 Marking Scheme
                  </span>
                  <div className="space-y-3">
                    {predictionResult.sectionB_Theory.map((item: any, idx: number) => (
                      <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-emerald-50/30 space-y-3 text-xs">
                        <div className="flex items-start justify-between">
                          <span className="font-bold text-slate-900">
                            Question {idx + 1}: {item.question}
                          </span>
                          <span className="font-mono text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                            {item.marks} Marks
                          </span>
                        </div>

                        {item.subParts && (
                          <div className="space-y-1.5 pl-3 border-l-2 border-emerald-300">
                            {item.subParts.map((sub: any, sIdx: number) => (
                              <div key={sIdx} className="text-slate-800">
                                <strong>({sub.part})</strong> {sub.text}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="p-3 bg-white rounded-lg border border-emerald-200 text-slate-800 space-y-1">
                          <strong className="text-emerald-900 block text-[11px] uppercase">
                            Chief Examiner Marking Guide ({item.statutoryStandard || 'WAEC Standard'}):
                          </strong>
                          <p className="text-[11px] leading-relaxed text-slate-700">
                            {item.markingSchemeGuide}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Chief Examiner Pitfall Warnings */}
              {predictionResult.chiefExaminerPitfalls && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                  <span className="text-xs font-bold text-amber-950 uppercase flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <span>WAEC / NECO Chief Examiner Critical Warnings</span>
                  </span>
                  <ul className="list-disc list-inside text-xs text-amber-900 space-y-1">
                    {predictionResult.chiefExaminerPitfalls.map((p: string, idx: number) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MULTIMODAL AI SCRIPT SCANNER & GRADING ASSISTANT (PHASE 7) */}
      {activeTab === 'grading' && ent.hasExamGen && (
        <div className="space-y-6">
          <MultimodalScriptScanner
            onOpenUpgrade={onOpenUpgrade}
            onQuotaChanged={onPlanQuotaChanged}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  AI Paper & Script Grading Assistant (WAEC/NECO Standard)
                </h2>
                <p className="text-xs text-slate-500">
                  Transcribe handwritten student exam answers or paste OCR text to grade against statutory step-by-step marking rubrics.
                </p>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                OCR & Step Scoring Engine
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Exam Question:</label>
                  <textarea
                    value={gradeQuestion}
                    onChange={(e) => setGradeQuestion(e.target.value)}
                    rows={3}
                    className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Marking Scheme:</label>
                  <textarea
                    value={gradeMarkingScheme}
                    onChange={(e) => setGradeMarkingScheme(e.target.value)}
                    rows={3}
                    className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Student's Written Submission (Chalkboard / Paper OCR):
                </label>
                <textarea
                  value={gradeStudentText}
                  onChange={(e) => setGradeStudentText(e.target.value)}
                  rows={7}
                  className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none font-mono"
                  placeholder="Paste student response or OCR scan text here..."
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleRunGrading}
                disabled={isGrading}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-2xs transition-all"
              >
                {isGrading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                )}
                <span>{isGrading ? 'Grading Script with Chief Examiner...' : 'Grade Script with Chief Examiner AI'}</span>
              </button>
            </div>
          </div>

          {/* Grading Evaluation Result */}
          {gradingResult && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Evaluation Standard</span>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">
                    Official WAEC / NECO Examiner Assessment
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Assessed using Method Marks (M), Accuracy Marks (A), and Independent Definitions (B).
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Score Awarded</span>
                    <span className="text-3xl font-mono font-extrabold text-slate-900 tabular-nums">
                      {gradingResult.awardedMarks} / {gradingResult.maxMarks || 10}
                    </span>
                  </div>
                  <div className="p-3 bg-emerald-100 text-emerald-800 font-extrabold text-sm rounded-xl border border-emerald-300">
                    {gradingResult.waecGrade}
                  </div>
                </div>
              </div>

              {/* Step-by-Step Mark Breakdown Table */}
              {gradingResult.markBreakdown && (
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                    Step-by-Step Examiner Rubric Allocation
                  </span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                          <th className="py-2.5 px-3">Mark Criterion</th>
                          <th className="py-2.5 px-3">Type</th>
                          <th className="py-2.5 px-3">Awarded</th>
                          <th className="py-2.5 px-3">Examiner Justification</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-800">
                        {gradingResult.markBreakdown.map((row: any, rIdx: number) => (
                          <tr key={rIdx} className="hover:bg-slate-50">
                            <td className="py-3 px-3 font-semibold text-slate-900">{row.criterion}</td>
                            <td className="py-3 px-3 font-mono text-[11px] text-slate-600">{row.markType}</td>
                            <td className="py-3 px-3 font-mono font-bold text-slate-900">
                              {row.awarded} / {row.available}
                            </td>
                            <td className="py-3 px-3 text-slate-600 leading-relaxed">{row.justification}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Pedagogical Feedback & Correction */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block">
                    Student Pedagogical Feedback
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {gradingResult.studentPedagogicalFeedback}
                  </p>
                </div>

                <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1">
                  <span className="font-bold text-emerald-950 uppercase text-[10px] tracking-wider block">
                    Correction & Mastery Guide
                  </span>
                  <p className="text-emerald-900 leading-relaxed">
                    {gradingResult.correctionGuide}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: WAEC/NECO PRACTICE MODE (CBT SIMULATOR) */}
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
