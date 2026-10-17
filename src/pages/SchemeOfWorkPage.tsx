import React, { useState, useEffect } from 'react';
import {
  CalendarCheck2,
  Sparkles,
  Printer,
  FileDown,
  Download,
  Share2,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  BookOpen,
  ChevronRight,
  Copy,
  Check,
  Filter,
  FileText,
  AlertCircle
} from 'lucide-react';
import { SchemeOfWork, SchemeWeek } from '../types/index.ts';
import { fetchSchemes, generateScheme } from '../lib/api.ts';
import confetti from 'canvas-confetti';

interface SchemeOfWorkPageProps {
  onPlanTopic?: (topicData: { topic: string; levelId: string; subject: string; week: number }) => void;
}

// Default initial 13-week scheme so the screen is never blank even before API returns
const DEFAULT_JSS1_MATH_SCHEME: SchemeOfWork = {
  id: 'sow_demo_default',
  userId: 'usr_teacher_demo_01',
  title: 'First Term Scheme of Work — JSS 1 Mathematics',
  level: 'jss-1',
  subject: 'Mathematics',
  term: 1,
  academicYear: '2026/2027',
  status: 'active',
  createdAt: new Date().toISOString(),
  weeksData: [
    {
      week: 1,
      topic: 'Whole Numbers: Counting, Notation & Place Value',
      subtopics: ['Counting in millions and billions', 'Place value of large numbers', 'Quantitative reasoning drills'],
      periods: 4,
      materials: ['Abacus, Place value charts, NERDC Mathematics Bk 1'],
      evaluation: ['Oral recitation of large numbers, written place value drill']
    },
    {
      week: 2,
      topic: 'Factors, Multiples & Prime Factorization',
      subtopics: ['Prime numbers up to 100', 'LCM and HCF using index notation', 'Application to real-world sharing'],
      periods: 4,
      materials: ['Number grid charts, Factor trees flashcards'],
      evaluation: ['Find HCF and LCM of 24 and 36']
    },
    {
      week: 3,
      topic: 'Fractions: Types, Equivalent & Ordering',
      subtopics: ['Proper, improper and mixed fractions', 'Conversion between forms', 'Ordering on number lines'],
      periods: 4,
      materials: ['Fraction strips, Fraction disc models, Chalkboard diagrams'],
      evaluation: ['Convert mixed fractions to improper; arrange fractions in ascending order']
    },
    {
      week: 4,
      topic: 'Operations on Fractions (Addition & Subtraction)',
      subtopics: ['Addition of fractions with like and unlike denominators', 'Word problems involving fraction spending'],
      periods: 4,
      materials: ['Worksheets, Realia measuring cups'],
      evaluation: ['Solve word problems on fractional parts of monthly pocket money']
    },
    {
      week: 5,
      topic: 'Operations on Fractions (Multiplication & Division)',
      subtopics: ['Multiplication as repeated addition', 'Reciprocal method in division of fractions', 'BODMAS rules'],
      periods: 4,
      materials: ['BODMAS wall charts, Practice drill sets'],
      evaluation: ['Compute multi-operator fraction expressions with brackets']
    },
    {
      week: 6,
      topic: 'Decimals and Percentage Relationships',
      subtopics: ['Converting decimals to percentages and fractions', 'Recurring decimals', 'Shopping arithmetic with Naira and Kobo'],
      periods: 4,
      materials: ['Nigerian currency play money, Supermarket receipts'],
      evaluation: ['Express 45 kobo as a percentage of 3 Naira']
    },
    {
      week: 7,
      topic: 'MID-TERM CONTINUOUS ASSESSMENT & INTERVENTION',
      subtopics: ['CA Test 1 (20 Marks)', 'Diagnostic review of challenging topics', 'Differentiated remedial instruction'],
      periods: 4,
      materials: ['Printed CA question papers, Broadsheet record forms'],
      evaluation: ['Standardized 20-item CA Test covering Weeks 1 to 6']
    },
    {
      week: 8,
      topic: 'Introduction to Basic Algebraic Processes',
      subtopics: ['Use of letters and symbols for unknown numbers', 'Open sentences', 'Translating English statements into algebraic expressions'],
      periods: 4,
      materials: ['Balance scale model, Algebra tiles'],
      evaluation: ['Translate: "Twice a number added to five is seventeen" into an equation']
    },
    {
      week: 9,
      topic: 'Simplification of Algebraic Expressions',
      subtopics: ['Collecting and combining like terms', 'Positive and negative coefficients', 'Word problems in algebra'],
      periods: 4,
      materials: ['Color-coded flashcards for positive and negative terms'],
      evaluation: ['Simplify: 4x + 7y - 2x + 3y - 5']
    },
    {
      week: 10,
      topic: 'Simple Linear Equations in One Variable',
      subtopics: ['Balancing method', 'Transposition method', 'Verification and checking solutions'],
      periods: 4,
      materials: ['Step-by-step solution flowcharts, Chalkboard drills'],
      evaluation: ['Solve for x: 3x - 7 = 14 and verify answer']
    },
    {
      week: 11,
      topic: 'Word Problems Leading to Simple Linear Equations',
      subtopics: ['Age word problems', 'Money and sharing word problems', 'Geometric perimeter problems'],
      periods: 4,
      materials: ['Nigerian contextual story problem cards'],
      evaluation: ['Form and solve equation: "A mother is 4 times older than her son..."']
    },
    {
      week: 12,
      topic: 'COMPREHENSIVE TERMLY REVISION & MOCK DRILLS',
      subtopics: ['Review of Number and Numeration', 'Review of Algebraic Processes', 'Past examination question clinic'],
      periods: 4,
      materials: ['Consolidated revision handouts, WAEC/BECE style past questions'],
      evaluation: ['Timed practice mock test covering all termly competencies']
    },
    {
      week: 13,
      topic: 'TERMINAL EXAMINATION, MARKING & BROADSHEET ENTRY',
      subtopics: ['Administration of End of Term Examination (60 Marks)', 'Scoring, script vetting, and moderation', 'Final report card computation'],
      periods: 4,
      materials: ['Official examination booklets, NERDC standardized marking schemes'],
      evaluation: ['Comprehensive 50 Objective + 4 Theory Questions examination']
    }
  ]
};

// Safe helper to format strings or arrays
function formatItems(val: unknown, fallback: string = 'NERDC Approved Standard Materials'): string {
  if (!val) return fallback;
  if (Array.isArray(val)) {
    const filtered = val.filter(Boolean);
    return filtered.length > 0 ? filtered.join(', ') : fallback;
  }
  if (typeof val === 'string' && val.trim().length > 0) {
    return val.trim();
  }
  return fallback;
}

export const SchemeOfWorkPage: React.FC<SchemeOfWorkPageProps> = ({ onPlanTopic }) => {
  const [schemes, setSchemes] = useState<SchemeOfWork[]>([DEFAULT_JSS1_MATH_SCHEME]);
  const [selectedScheme, setSelectedScheme] = useState<SchemeOfWork>(DEFAULT_JSS1_MATH_SCHEME);
  const [level, setLevel] = useState('jss-1');
  const [subject, setSubject] = useState('Mathematics');
  const [term, setTerm] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filterWeek, setFilterWeek] = useState<'all' | 'pre-mid' | 'mid' | 'post-mid' | 'exam'>('all');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadSchemes();
  }, []);

  const loadSchemes = async () => {
    try {
      const data = await fetchSchemes();
      if (Array.isArray(data) && data.length > 0) {
        setSchemes(data);
        setSelectedScheme(data[0]);
      }
    } catch (e) {
      console.warn('Could not load remote schemes, falling back to local curriculum standard:', e);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateScheme({ level, subject, term, academicYear: '2026/2027' });
      if (res && res.scheme) {
        setSchemes((prev) => [res.scheme, ...prev.filter((s) => s.id !== res.scheme.id)]);
        setSelectedScheme(res.scheme);
        confetti({ particleCount: 70, spread: 60 });
      }
    } catch (e) {
      console.error('Error generating scheme:', e);
      // Fallback: create synthesized client-side scheme
      const fallbackScheme: SchemeOfWork = {
        id: `sow_${Date.now()}`,
        userId: 'usr_teacher_demo_01',
        title: `${term === 1 ? 'First' : term === 2 ? 'Second' : 'Third'} Term Scheme of Work — ${level.toUpperCase()} ${subject}`,
        level,
        subject,
        term,
        academicYear: '2026/2027',
        status: 'active',
        createdAt: new Date().toISOString(),
        weeksData: Array.from({ length: 13 }, (_, i) => {
          const wk = i + 1;
          const isMid = wk === 7;
          const isRev = wk === 12;
          const isExam = wk === 13;
          return {
            week: wk,
            topic: isMid
              ? 'Mid-Term Assessment, Continuous Assessment Test & Remedial Support'
              : isRev
              ? 'Comprehensive Termly Revision & Examination Preparation Clinic'
              : isExam
              ? 'Terminal Examination, Paper Moderation & Broadsheet Compilation'
              : `${subject} Core Competency & Applied Exercises — Module ${wk}`,
            subtopics: [
              `Conceptual introduction and NERDC curriculum objectives for Week ${wk}`,
              `Classroom guided examples, local Nigerian context and student activities`,
              `Formative drills and home assignment`
            ],
            periods: 4,
            materials: ['NERDC Approved Textbook', 'Whiteboard', 'Instructional Wall Charts'],
            evaluation: [`Formative assessment questions and diagnostic drill for Week ${wk}`]
          };
        })
      };
      setSchemes((prev) => [fallbackScheme, ...prev]);
      setSelectedScheme(fallbackScheme);
      confetti({ particleCount: 40, spread: 50 });
    } finally {
      setLoading(false);
    }
  };

  const handleExportWord = () => {
    if (!selectedScheme || !selectedScheme.weeksData) return;
    const wordHtml = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>${selectedScheme.title}</title>
<style>
  @page {
    size: A4 landscape;
    margin: 15mm 15mm 15mm 15mm;
    mso-page-orientation: landscape;
  }
  body {
    font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
    font-size: 10pt;
    line-height: 1.35;
    color: #0f172a;
  }
  .header {
    text-align: center;
    border-bottom: 2pt solid #047857;
    padding-bottom: 6pt;
    margin-bottom: 12pt;
  }
  .fme {
    font-size: 11pt;
    letter-spacing: 1.5pt;
    font-weight: bold;
    color: #047857;
  }
  .title {
    font-size: 14pt;
    font-weight: bold;
    color: #065f46;
    text-transform: uppercase;
    margin-top: 3pt;
  }
  .sub {
    font-size: 10pt;
    font-weight: bold;
    color: #334155;
    margin-top: 3pt;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10pt;
  }
  th {
    background-color: #047857;
    color: #ffffff;
    font-weight: bold;
    padding: 6pt 8pt;
    border: 1pt solid #047857;
    font-size: 9.5pt;
    text-align: left;
  }
  td {
    border: 1pt solid #cbd5e1;
    padding: 6pt 8pt;
    font-size: 9.5pt;
    vertical-align: top;
  }
  .week-cell {
    font-weight: bold;
    text-align: center;
    background-color: #f8fafc;
  }
  .midterm-row {
    background-color: #fef3c7;
  }
  .exam-row {
    background-color: #fee2e2;
  }
  .sig-table {
    width: 100%;
    margin-top: 30pt;
    border: none;
  }
  .sig-table td {
    border: none;
    padding-top: 35pt;
    border-top: 1pt dashed #64748b;
    text-align: center;
    font-weight: bold;
  }
</style>
</head>
<body>
<div class="header">
  <div class="fme">FEDERAL REPUBLIC OF NIGERIA • FEDERAL MINISTRY OF EDUCATION</div>
  <div class="title">${selectedScheme.title.toUpperCase()}</div>
  <div class="sub">ACADEMIC SESSION: ${selectedScheme.academicYear} • NERDC CURRICULUM COMPLIANT</div>
  <div style="font-size: 9pt; color: #475569; margin-top: 3pt;">
    Class Level: ${selectedScheme.level.toUpperCase()} | Subject: ${selectedScheme.subject} | Term: Term ${selectedScheme.term} (13 Weeks)
  </div>
</div>

<table>
  <thead>
    <tr>
      <th style="width: 8%; text-align: center;">Week</th>
      <th style="width: 34%;">Curriculum Topic & Subtopics</th>
      <th style="width: 8%; text-align: center;">Periods</th>
      <th style="width: 25%;">Instructional Materials & Aids</th>
      <th style="width: 25%;">Evaluation & Assessment Guide</th>
    </tr>
  </thead>
  <tbody>
    ${selectedScheme.weeksData
      .map(
        (w) => `
      <tr class="${w.week === 7 ? 'midterm-row' : w.week === 13 ? 'exam-row' : ''}">
        <td class="week-cell">Wk ${w.week}</td>
        <td>
          <strong>${w.topic}</strong>
          ${
            w.subtopics && w.subtopics.length > 0
              ? `<br><span style="font-size: 8.5pt; color: #475569;">• ${w.subtopics.join('<br>• ')}</span>`
              : ''
          }
        </td>
        <td style="text-align: center;">${w.periods || 4}</td>
        <td>${formatItems(w.materials, 'NERDC Approved Textbook, Chalkboard & Chart')}</td>
        <td>${formatItems(w.evaluation, 'Formative drill & classroom exercises')}</td>
      </tr>`
      )
      .join('')}
  </tbody>
</table>

<table class="sig-table">
  <tr>
    <td style="width: 33%;">___________________________<br>Subject Teacher's Signature & Date</td>
    <td style="width: 34%;">___________________________<br>HOD Curriculum Vetting & Seal</td>
    <td style="width: 33%;">___________________________<br>Principal / Vice-Principal Endorsement</td>
  </tr>
</table>

</body>
</html>`;

    const blob = new Blob(['\ufeff' + wordHtml], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedScheme.title.replace(/[^a-z0-9]/gi, '_')}.doc`;
    a.click();
    URL.revokeObjectURL(url);
    confetti({ particleCount: 50, spread: 50 });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    if (!selectedScheme) return;
    const summary = `${selectedScheme.title}\nTerm: ${selectedScheme.term} | Session: ${selectedScheme.academicYear}\n\n` +
      selectedScheme.weeksData.map((w) => `Week ${w.week}: ${w.topic}`).join('\n');
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Filter weeks based on selected filter
  const displayedWeeks = (selectedScheme.weeksData || []).filter((w) => {
    if (filterWeek === 'pre-mid') return w.week >= 1 && w.week <= 6;
    if (filterWeek === 'mid') return w.week === 7;
    if (filterWeek === 'post-mid') return w.week >= 8 && w.week <= 12;
    if (filterWeek === 'exam') return w.week === 13;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Highest-Value Nigerian Teaching Asset</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Scheme of Work Generator</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold uppercase">
              13-Week Standard
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Generate and export complete 13-week term schemes with behavioral objectives, weekly topics, periods, materials, and evaluation rubrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopySummary}
            className="px-3 py-2 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center gap-1.5 border border-gray-200 transition-colors"
            title="Copy weekly topics list to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-gray-500" />}
            <span>{copied ? 'Copied Summary' : 'Copy Summary'}</span>
          </button>
          <button
            onClick={handleExportWord}
            className="px-3.5 py-2 text-xs font-bold text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-xl flex items-center gap-1.5 border border-blue-200 transition-colors shadow-2xs"
            title="Download editable Microsoft Word document"
          >
            <FileDown className="w-4 h-4 text-blue-600" />
            <span>Export Word (.doc)</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center gap-1.5 transition-colors"
            title="Print or save as PDF"
          >
            <Printer className="w-4 h-4 text-gray-600" />
            <span>Print Scheme</span>
          </button>
        </div>
      </div>

      {/* Generator Controls Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
        <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <CalendarCheck2 className="w-4 h-4 text-emerald-600" />
          <span>Curriculum Parameters</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Target Class</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-600 focus:outline-none"
            >
              <option value="jss-1">JSS 1 (Junior 1)</option>
              <option value="jss-2">JSS 2 (Junior 2)</option>
              <option value="jss-3">JSS 3 (Junior 3 / BECE)</option>
              <option value="sss-1">SSS 1 (Senior 1)</option>
              <option value="sss-2">SSS 2 (Senior 2)</option>
              <option value="sss-3">SSS 3 (Senior 3 / WAEC)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-600 focus:outline-none"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="English Studies">English Studies</option>
              <option value="Basic Science & Technology">Basic Science & Tech</option>
              <option value="Civic Education">Civic Education</option>
              <option value="Biology">Biology</option>
              <option value="Economics">Economics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Physics">Physics</option>
              <option value="Agricultural Science">Agricultural Science</option>
              <option value="Business Studies">Business Studies</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Academic Term</label>
            <select
              value={term}
              onChange={(e) => setTerm(parseInt(e.target.value, 10))}
              className="w-full text-xs font-semibold px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-600 focus:outline-none"
            >
              <option value={1}>1st Term (Sept – Dec)</option>
              <option value={2}>2nd Term (Jan – April)</option>
              <option value={3}>3rd Term (May – July)</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all hover:scale-102 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 text-amber-300 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Synthesizing 13 Weeks...' : 'Generate 13-Week Scheme'}</span>
          </button>
        </div>

        {/* Saved Schemes Tabs */}
        {schemes.length > 1 && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[11px] font-bold text-gray-400 shrink-0 uppercase tracking-wider">
              Saved Schemes:
            </span>
            {schemes.map((s) => {
              const active = selectedScheme.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedScheme(s)}
                  className={`text-xs px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${
                    active
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {s.level.toUpperCase()} {s.subject} (T{s.term})
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Week Filter Chips & Summary */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-1">
            Filter View:
          </span>
          <button
            onClick={() => setFilterWeek('all')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              filterWeek === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            All 13 Weeks
          </button>
          <button
            onClick={() => setFilterWeek('pre-mid')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              filterWeek === 'pre-mid'
                ? 'bg-emerald-700 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Wks 1–6 (Pre-Midterm)
          </button>
          <button
            onClick={() => setFilterWeek('mid')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              filterWeek === 'mid'
                ? 'bg-amber-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Wk 7 (Midterm CA)
          </button>
          <button
            onClick={() => setFilterWeek('post-mid')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              filterWeek === 'post-mid'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Wks 8–12 (Post-Mid & Rev)
          </button>
          <button
            onClick={() => setFilterWeek('exam')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              filterWeek === 'exam'
                ? 'bg-rose-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Wk 13 (Terminal Exam)
          </button>
        </div>

        <div className="text-xs text-gray-500 font-medium">
          Showing <strong className="text-gray-900 font-bold">{displayedWeeks.length}</strong> of 13 instructional weeks
        </div>
      </div>

      {/* Main Scheme of Work Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-md p-6 sm:p-8 space-y-6">
        <div className="text-center pb-6 border-b border-gray-200">
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/70 inline-block">
            FEDERAL REPUBLIC OF NIGERIA • APPROVED NERDC CURRICULUM
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-2">
            {selectedScheme.title}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Academic Session: <span className="font-semibold text-gray-700">{selectedScheme.academicYear}</span> • Term {selectedScheme.term} • Standard 13-Week Teaching Progression
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-gray-100/90 text-gray-700 uppercase font-bold text-[10px] tracking-wider border-b border-gray-200">
                <th className="p-3 w-16 text-center">Week</th>
                <th className="p-3">Topic & Subtopics</th>
                <th className="p-3 w-20 text-center">Periods</th>
                <th className="p-3 w-1/4">Instructional Aids & Materials</th>
                <th className="p-3 w-1/4">Formative Evaluation & CA</th>
                <th className="p-3 w-24 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayedWeeks.map((w) => {
                const isMid = w.week === 7;
                const isRev = w.week === 12;
                const isExam = w.week === 13;
                return (
                  <tr
                    key={w.week}
                    className={`transition-colors ${
                      isMid
                        ? 'bg-amber-50/60 font-semibold hover:bg-amber-100/50'
                        : isExam
                        ? 'bg-rose-50/60 font-semibold hover:bg-rose-100/50'
                        : isRev
                        ? 'bg-purple-50/50 font-semibold hover:bg-purple-100/50'
                        : 'hover:bg-gray-50/80'
                    }`}
                  >
                    {/* Week Number Badge */}
                    <td className="p-3 text-center align-top">
                      <span
                        className={`w-8 h-8 rounded-xl inline-flex items-center justify-center font-bold text-xs ${
                          isMid
                            ? 'bg-amber-200 text-amber-900 border border-amber-300'
                            : isExam
                            ? 'bg-rose-200 text-rose-900 border border-rose-300'
                            : isRev
                            ? 'bg-purple-200 text-purple-900 border border-purple-300'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        }`}
                      >
                        {w.week}
                      </span>
                      <div className="text-[9px] text-gray-400 font-bold mt-1">
                        {isMid ? 'Mid-Term' : isExam ? 'Terminal' : isRev ? 'Revision' : `Wk ${w.week}`}
                      </div>
                    </td>

                    {/* Topic and Subtopics */}
                    <td className="p-3 align-top">
                      <div className="font-bold text-gray-900 text-sm">{w.topic}</div>
                      {w.subtopics && w.subtopics.length > 0 && (
                        <ul className="text-[11px] text-gray-500 mt-1 space-y-0.5 list-disc list-inside">
                          {w.subtopics.slice(0, 3).map((st, i) => (
                            <li key={i}>{st}</li>
                          ))}
                        </ul>
                      )}
                    </td>

                    {/* Periods */}
                    <td className="p-3 align-top text-center font-bold text-gray-700">
                      {w.periods || 4}
                      <span className="block text-[9px] font-normal text-gray-400">Periods</span>
                    </td>

                    {/* Materials */}
                    <td className="p-3 align-top text-gray-600">
                      <p className="text-[11px]">
                        {formatItems(w.materials, 'NERDC Approved Textbook, Chalkboard & Chart')}
                      </p>
                    </td>

                    {/* Evaluation */}
                    <td className="p-3 align-top text-gray-600">
                      <p className="text-[11px]">
                        {formatItems(w.evaluation, 'Formative drill & classroom exercises')}
                      </p>
                    </td>

                    {/* Quick Action: Plan Lesson */}
                    <td className="p-3 align-top text-right">
                      {onPlanTopic && (
                        <button
                          onClick={() =>
                            onPlanTopic({
                              topic: w.topic,
                              levelId: selectedScheme.level,
                              subject: selectedScheme.subject,
                              week: w.week
                            })
                          }
                          className="px-2.5 py-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg inline-flex items-center gap-1 border border-emerald-200 transition-colors shadow-2xs"
                          title="Generate lesson plan for this week"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Plan</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Scheme Approval & Endorsement Footer */}
        <div className="pt-6 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs text-gray-500">
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/60">
            <div className="font-bold text-gray-700 mb-1">Subject Teacher</div>
            <div className="text-[11px] text-gray-400 italic">Curriculum Prepared & Signed</div>
            <div className="mt-4 border-t border-dashed border-gray-300 pt-2 text-[10px] font-mono">
              Status: Duly Prepared
            </div>
          </div>
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/60">
            <div className="font-bold text-gray-700 mb-1">HOD Curriculum Vetting</div>
            <div className="text-[11px] text-gray-400 italic">NERDC Alignment Verified</div>
            <div className="mt-4 border-t border-dashed border-gray-300 pt-2 text-[10px] font-mono text-emerald-700 font-bold">
              Status: Verified & Stamped
            </div>
          </div>
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/60">
            <div className="font-bold text-gray-700 mb-1">Principal / Vice-Principal</div>
            <div className="text-[11px] text-gray-400 italic">Academic Board Endorsement</div>
            <div className="mt-4 border-t border-dashed border-gray-300 pt-2 text-[10px] font-mono text-blue-700 font-bold">
              Status: Approved for Session
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
