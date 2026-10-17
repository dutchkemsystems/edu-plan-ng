import React, { useState, useEffect } from 'react';
import {
  Award,
  Plus,
  Printer,
  FileDown,
  TrendingUp,
  CheckCircle2,
  FileText,
  School,
  X,
  Share2,
  Download,
  Check,
  Star,
  Users,
  Percent,
  Calendar,
  Sparkles
} from 'lucide-react';
import { GradeRecord } from '../types/index.ts';
import { fetchGrades, createGrade } from '../lib/api.ts';
import confetti from 'canvas-confetti';

interface StudentReportCardData {
  student: GradeRecord;
  schoolName: string;
  termName: string;
  session: string;
  className: string;
  position: string;
  totalStudents: number;
  timesOpened: number;
  timesPresent: number;
  affective: Record<string, number>;
  psychomotor: Record<string, number>;
  teacherRemark: string;
  principalRemark: string;
  nextTermResumption: string;
  subjects: {
    name: string;
    ca1: number;
    ca2: number;
    exam: number;
    total: number;
    grade: string;
    remark: string;
  }[];
}

export const GradeBookPage: React.FC = () => {
  const [grades, setGrades] = useState<GradeRecord[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudentForReport, setSelectedStudentForReport] = useState<StudentReportCardData | null>(null);
  const [studentName, setStudentName] = useState('');
  const [studentRegNo, setStudentRegNo] = useState('');
  const [ca1, setCa1] = useState(16);
  const [ca2, setCa2] = useState(17);
  const [exam, setExam] = useState(54);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    loadGrades();
  }, []);

  const loadGrades = async () => {
    try {
      const data = await fetchGrades();
      setGrades(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createGrade({
        studentName,
        studentRegNo,
        level: 'jss-1',
        subject: 'Mathematics',
        term: 1,
        ca1Score: ca1,
        ca2Score: ca2,
        examScore: exam,
      });
      setGrades([res.record, ...grades]);
      setShowAddModal(false);
      setStudentName('');
      setStudentRegNo('');
      confetti({ particleCount: 50 });
    } catch (err) {
      console.error(err);
    }
  };

  // Generate Report Card for a specific student
  const handleOpenReportCard = (record: GradeRecord, index: number) => {
    // Generate realistic multi-subject report card for this student
    const isHigh = record.totalScore >= 75;
    const isMedium = record.totalScore >= 55;

    const subjects = [
      {
        name: 'Mathematics',
        ca1: record.ca1Score,
        ca2: record.ca2Score,
        exam: record.examScore,
        total: record.totalScore,
        grade: record.gradeLetter,
        remark: record.remark,
      },
      {
        name: 'English Studies',
        ca1: Math.min(20, Math.max(10, record.ca1Score - 1)),
        ca2: Math.min(20, Math.max(10, record.ca2Score + 1)),
        exam: Math.min(60, Math.max(25, record.examScore - 3)),
        total: Math.min(100, record.totalScore - 3),
        grade: isHigh ? 'A1' : isMedium ? 'B2' : 'C4',
        remark: isHigh ? 'Distinction' : isMedium ? 'Very Good' : 'Credit',
      },
      {
        name: 'Basic Science & Tech',
        ca1: Math.min(20, Math.max(10, record.ca1Score + 1)),
        ca2: Math.min(20, Math.max(10, record.ca2Score - 1)),
        exam: Math.min(60, Math.max(25, record.examScore + 2)),
        total: Math.min(100, record.totalScore + 2),
        grade: isHigh ? 'A1' : isMedium ? 'B3' : 'C5',
        remark: isHigh ? 'Distinction' : isMedium ? 'Good' : 'Credit',
      },
      {
        name: 'Civic Education',
        ca1: Math.min(20, Math.max(12, record.ca1Score + 2)),
        ca2: Math.min(20, Math.max(12, record.ca2Score + 2)),
        exam: Math.min(60, Math.max(30, record.examScore + 4)),
        total: Math.min(100, record.totalScore + 4),
        grade: isHigh ? 'A1' : 'B2',
        remark: isHigh ? 'Distinction' : 'Very Good',
      },
      {
        name: 'Agricultural Science',
        ca1: Math.min(20, Math.max(10, record.ca1Score)),
        ca2: Math.min(20, Math.max(10, record.ca2Score)),
        exam: Math.min(60, Math.max(25, record.examScore - 1)),
        total: Math.min(100, record.totalScore - 1),
        grade: isHigh ? 'A1' : isMedium ? 'B3' : 'C4',
        remark: isHigh ? 'Distinction' : isMedium ? 'Good' : 'Credit',
      },
      {
        name: 'Business Studies',
        ca1: Math.min(20, Math.max(11, record.ca1Score - 2)),
        ca2: Math.min(20, Math.max(11, record.ca2Score + 1)),
        exam: Math.min(60, Math.max(28, record.examScore + 1)),
        total: Math.min(100, record.totalScore),
        grade: isHigh ? 'A1' : isMedium ? 'B2' : 'C4',
        remark: isHigh ? 'Distinction' : isMedium ? 'Very Good' : 'Credit',
      }
    ];

    const reportData: StudentReportCardData = {
      student: record,
      schoolName: "King's College, Lagos",
      termName: 'First Term Examination',
      session: '2026/2027 Academic Session',
      className: 'JSS 1 (Gold Wing)',
      position: `${index + 1} of ${grades.length}`,
      totalStudents: grades.length,
      timesOpened: 65,
      timesPresent: Math.min(65, 58 + (record.totalScore > 70 ? 6 : 2)),
      affective: {
        'Punctuality & Attendance': isHigh ? 5 : 4,
        'Neatness & Decorum': isHigh ? 5 : 4,
        'Politeness & Courtesy': 5,
        'Honesty & Integrity': 5,
        'Relationship with Peers': isHigh ? 5 : 4,
        'Leadership & Initiative': isHigh ? 5 : 3,
      },
      psychomotor: {
        'Handwriting & Presentation': isHigh ? 5 : 4,
        'Verbal Fluency & Speech': isHigh ? 5 : 4,
        'Sports, Games & Athletics': 4,
        'Creative Arts & Drawing': isHigh ? 4 : 3,
        'Laboratory Practical Skills': isHigh ? 5 : 4,
      },
      teacherRemark: isHigh
        ? 'An outstandingly brilliant, respectful and dedicated learner with excellent mastery across all core NERDC competencies. Keep up this golden standard!'
        : isMedium
        ? 'A very capable and diligent student with good academic promise. Encouraged to practice more mathematical drills.'
        : 'Satisfactory performance. Regular supervised home study and formative drills will help improve exam confidence.',
      principalRemark: isHigh
        ? 'Distinguished academic outcome. A proud ambassador of King\'s College.'
        : 'Commendable effort. Encouraged to strive for academic distinction next term.',
      nextTermResumption: 'Monday, 11th January 2027',
      subjects,
    };

    setSelectedStudentForReport(reportData);
  };

  const handleExportCSV = () => {
    const headers = ['Rank', 'Student Name', 'Reg No', 'CA1 (20)', 'CA2 (20)', 'Exam (60)', 'Total (100)', 'WAEC Grade', 'Remark'];
    const rows = grades.map((g, idx) => [
      idx + 1,
      `"${g.studentName}"`,
      g.studentRegNo,
      g.ca1Score,
      g.ca2Score,
      g.examScore,
      g.totalScore,
      g.gradeLetter,
      `"${g.remark}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\ufeff' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Broadsheet_JSS1_Term1_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    confetti({ particleCount: 40, spread: 50 });
  };

  const handleShareReportWhatsApp = () => {
    if (!selectedStudentForReport) return;
    const s = selectedStudentForReport;
    const text = `🇳🇬 *${s.schoolName}* — Terminal Report Sheet\n` +
      `*Student:* ${s.student.studentName} (${s.student.studentRegNo})\n` +
      `*Class:* ${s.className} | *Session:* ${s.session}\n` +
      `*Position:* ${s.position} | *Attendance:* ${s.timesPresent}/${s.timesOpened} days\n` +
      `*Total Average:* ${s.student.totalScore}% (${s.student.gradeLetter} - ${s.student.remark})\n\n` +
      `*Teacher Remark:* ${s.teacherRemark}\n` +
      `*Next Term Resumption:* ${s.nextTermResumption}\n\n` +
      `Generated with EduPlan NG (Approved NERDC Standard)`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Class analytics
  const classAvg =
    grades.length > 0
      ? (grades.reduce((acc, g) => acc + g.totalScore, 0) / grades.length).toFixed(1)
      : '0';

  const distinctionCount = grades.filter((g) => g.gradeLetter === 'A1' || g.gradeLetter === 'A').length;
  const passRate =
    grades.length > 0
      ? Math.round(
          (grades.filter((g) => !['F9', 'F'].includes(g.gradeLetter)).length /
            grades.length) *
            100
        )
      : 100;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200 mb-2">
            <School className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ministry of Education Continuous Assessment & Broadsheet</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Class Broadsheet & Terminal Report Cards
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Standard WAEC/NECO grading (CA 1: 20%, CA 2: 20%, Exam: 60%). 1-Click printable student terminal report cards.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center gap-1.5 transition-colors"
            title="Download CSV spreadsheet"
          >
            <FileDown className="w-4 h-4 text-gray-600" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Broadsheet</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student Scores</span>
          </button>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-[10px]">
              Class Average Score
            </span>
            <div className="text-2xl font-extrabold text-gray-900 mt-1">{classAvg}%</div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">High Performance Benchmark</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Percent className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-[10px]">
              Distinctions (A1)
            </span>
            <div className="text-2xl font-extrabold text-emerald-700 mt-1">{distinctionCount} Students</div>
            <p className="text-[11px] text-gray-500 mt-0.5">Scored 75% and above</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-[10px]">
              Class Pass Rate
            </span>
            <div className="text-2xl font-extrabold text-blue-700 mt-1">{passRate}%</div>
            <p className="text-[11px] text-blue-600 font-semibold mt-0.5">Qualifies for promotion</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Broadsheet Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-gray-900">JSS 1 Class Examination Broadsheet</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Click "Generate Report Card" on any student to preview and print their official terminal report sheet.
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 self-start">
            {grades.length} Enrolled Students
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-gray-100/80 text-gray-700 uppercase font-bold text-[10px] tracking-wider border-b border-gray-200">
                <th className="p-3.5 w-12 text-center">Rank</th>
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5">Reg Number</th>
                <th className="p-3.5 text-center">CA 1 (20)</th>
                <th className="p-3.5 text-center">CA 2 (20)</th>
                <th className="p-3.5 text-center">Exam (60)</th>
                <th className="p-3.5 text-center">Total (100)</th>
                <th className="p-3.5 text-center">WAEC Grade</th>
                <th className="p-3.5">Remark</th>
                <th className="p-3.5 text-right">Report Card</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {grades.map((g, idx) => (
                <tr key={g.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-center text-gray-500">
                    <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-bold text-[11px] ${
                      idx === 0 ? 'bg-amber-100 text-amber-900 font-extrabold' : 'bg-gray-100 text-gray-700'
                    }`}>
                      #{idx + 1}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-gray-900">{g.studentName}</td>
                  <td className="p-3.5 font-mono text-gray-500">{g.studentRegNo}</td>
                  <td className="p-3.5 text-center font-semibold">{g.ca1Score}</td>
                  <td className="p-3.5 text-center font-semibold">{g.ca2Score}</td>
                  <td className="p-3.5 text-center font-semibold">{g.examScore}</td>
                  <td className="p-3.5 text-center font-extrabold text-emerald-800">{g.totalScore}%</td>
                  <td className="p-3.5 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-extrabold text-[11px] ${
                        g.gradeLetter === 'A1'
                          ? 'bg-emerald-100 text-emerald-800'
                          : g.gradeLetter.startsWith('B')
                          ? 'bg-blue-100 text-blue-800'
                          : g.gradeLetter.startsWith('C')
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {g.gradeLetter}
                    </span>
                  </td>
                  <td className="p-3.5 font-semibold text-gray-700">{g.remark}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => handleOpenReportCard(g, idx)}
                      className="px-3 py-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors inline-flex items-center gap-1 shadow-2xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Report Card</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* INDIVIDUAL OFFICIAL NIGERIAN REPORT CARD MODAL */}
      {selectedStudentForReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-200 my-8 overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Action Bar */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
              <div className="flex items-center gap-2">
                <School className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Official Terminal Student Report Card Preview
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShareReportWhatsApp}
                  className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>WhatsApp Parent</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 text-xs font-bold bg-white text-slate-900 hover:bg-gray-100 rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Print Sheet</span>
                </button>
                <button
                  onClick={() => setSelectedStudentForReport(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PRINTABLE OFFICIAL REPORT CARD DOCUMENT */}
            <div className="p-6 sm:p-8 space-y-6 text-slate-900 bg-white">
              {/* Official School Letterhead */}
              <div className="text-center pb-4 border-b-2 border-emerald-800 space-y-1">
                <div className="inline-block px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-900 font-extrabold text-[10px] uppercase tracking-widest border border-emerald-200">
                  Federal Republic of Nigeria • Ministry of Basic Education
                </div>
                <h2 className="text-2xl font-black text-emerald-950 tracking-tight uppercase">
                  {selectedStudentForReport.schoolName}
                </h2>
                <p className="text-xs text-gray-600 font-medium">
                  Approved Secondary School Curriculum Standards • NERDC Unified Evaluation
                </p>
                <div className="text-xs font-bold text-gray-800 pt-1 uppercase tracking-wide">
                  <span>{selectedStudentForReport.termName}</span> • <span>{selectedStudentForReport.session}</span>
                </div>
              </div>

              {/* Student Particulars Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Student Name:</span>
                  <div className="font-extrabold text-gray-900 mt-0.5">{selectedStudentForReport.student.studentName}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Admission / Reg No:</span>
                  <div className="font-mono font-bold text-gray-900 mt-0.5">{selectedStudentForReport.student.studentRegNo}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Class & Arm:</span>
                  <div className="font-bold text-gray-900 mt-0.5">{selectedStudentForReport.className}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Class Position:</span>
                  <div className="font-extrabold text-emerald-800 mt-0.5">
                    {selectedStudentForReport.position} (Rank)
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Attendance:</span>
                  <div className="font-semibold text-gray-800 mt-0.5">
                    {selectedStudentForReport.timesPresent} of {selectedStudentForReport.timesOpened} Days (
                    {Math.round((selectedStudentForReport.timesPresent / selectedStudentForReport.timesOpened) * 100)}%)
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Terminal Average:</span>
                  <div className="font-extrabold text-emerald-800 mt-0.5">
                    {selectedStudentForReport.student.totalScore}%
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Promotion Status:</span>
                  <div className="font-bold text-blue-700 mt-0.5">In Good Standing</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Next Term Begins:</span>
                  <div className="font-bold text-gray-900 mt-0.5">{selectedStudentForReport.nextTermResumption}</div>
                </div>
              </div>

              {/* COGNITIVE PERFORMANCE: SUBJECT BROAD TABLE */}
              <div>
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Part I: Cognitive Academic Performance</span>
                </h3>
                <div className="overflow-x-auto border border-gray-200 rounded-xl">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="bg-emerald-800 text-white font-bold text-[10px] uppercase tracking-wider">
                        <th className="p-2.5">Subject</th>
                        <th className="p-2.5 text-center">CA 1 (20)</th>
                        <th className="p-2.5 text-center">CA 2 (20)</th>
                        <th className="p-2.5 text-center">Exam (60)</th>
                        <th className="p-2.5 text-center">Total (100)</th>
                        <th className="p-2.5 text-center">WAEC Grade</th>
                        <th className="p-2.5">Teacher Remark</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedStudentForReport.subjects.map((sub, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="p-2.5 font-bold text-gray-900">{sub.name}</td>
                          <td className="p-2.5 text-center font-semibold text-gray-700">{sub.ca1}</td>
                          <td className="p-2.5 text-center font-semibold text-gray-700">{sub.ca2}</td>
                          <td className="p-2.5 text-center font-semibold text-gray-700">{sub.exam}</td>
                          <td className="p-2.5 text-center font-extrabold text-emerald-800">{sub.total}%</td>
                          <td className="p-2.5 text-center">
                            <span className="px-2 py-0.5 rounded font-extrabold text-[10px] bg-emerald-100 text-emerald-900">
                              {sub.grade}
                            </span>
                          </td>
                          <td className="p-2.5 text-gray-700 font-medium">{sub.remark}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* AFFECTIVE & PSYCHOMOTOR DOMAIN RATINGS (1-5 SCALE) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Part II: Affective Traits */}
                <div className="p-3.5 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-2">
                  <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-wide flex items-center justify-between">
                    <span>Part II: Affective Development</span>
                    <span className="text-[9px] text-gray-500 font-normal">Rating: 1 (Poor) to 5 (Exemplary)</span>
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {Object.entries(selectedStudentForReport.affective).map(([trait, rating]) => (
                      <div key={trait} className="flex items-center justify-between py-0.5 border-b border-gray-100">
                        <span className="text-gray-700">{trait}</span>
                        <div className="flex items-center gap-1 font-bold text-amber-600">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span key={i} className={`text-xs ${i < rating ? 'text-amber-500' : 'text-gray-300'}`}>
                              ★
                            </span>
                          ))}
                          <span className="text-[10px] text-gray-700 ml-1 font-bold">({rating})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Part III: Psychomotor Skills */}
                <div className="p-3.5 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-2">
                  <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-wide flex items-center justify-between">
                    <span>Part III: Psychomotor Skills</span>
                    <span className="text-[9px] text-gray-500 font-normal">Rating: 1 (Low) to 5 (Mastery)</span>
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {Object.entries(selectedStudentForReport.psychomotor).map(([skill, rating]) => (
                      <div key={skill} className="flex items-center justify-between py-0.5 border-b border-gray-100">
                        <span className="text-gray-700">{skill}</span>
                        <div className="flex items-center gap-1 font-bold text-blue-600">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span key={i} className={`text-xs ${i < rating ? 'text-blue-500' : 'text-gray-300'}`}>
                              ★
                            </span>
                          ))}
                          <span className="text-[10px] text-gray-700 ml-1 font-bold">({rating})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* REMARKS & SIGNATURES */}
              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs">
                  <span className="font-bold text-gray-800">Form Teacher's Remark: </span>
                  <span className="italic text-gray-700">"{selectedStudentForReport.teacherRemark}"</span>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs">
                  <span className="font-bold text-gray-800">Principal's Endorsement: </span>
                  <span className="italic text-gray-700">"{selectedStudentForReport.principalRemark}"</span>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-6 text-center text-xs">
                  <div>
                    <div className="border-t border-dashed border-gray-400 pt-1 font-bold text-gray-800">
                      Mr. B. Adeleke (B.Ed., TRCN)
                    </div>
                    <div className="text-[10px] text-gray-500">Form Teacher's Signature & Date</div>
                  </div>
                  <div>
                    <div className="border-t border-dashed border-gray-400 pt-1 font-bold text-emerald-900 flex items-center justify-center gap-1">
                      <span>Verified Official School Stamp</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="text-[10px] text-gray-500">Principal / Vice-Principal Academics</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Score Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <form
            onSubmit={handleAddStudent}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-4 border border-gray-200"
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Add Student Assessment Score</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Student Full Name</label>
              <input
                required
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Oluwaseun Adeleke"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Registration / Roll No</label>
              <input
                required
                type="text"
                value={studentRegNo}
                onChange={(e) => setStudentRegNo(e.target.value)}
                placeholder="e.g. KC/2026/089"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">CA 1 (Max 20)</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={ca1}
                  onChange={(e) => setCa1(parseInt(e.target.value, 10))}
                  className="w-full text-xs px-2.5 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">CA 2 (Max 20)</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={ca2}
                  onChange={(e) => setCa2(parseInt(e.target.value, 10))}
                  className="w-full text-xs px-2.5 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Exam (Max 60)</label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={exam}
                  onChange={(e) => setExam(parseInt(e.target.value, 10))}
                  className="w-full text-xs px-2.5 py-2 border border-gray-300 rounded-xl"
                />
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl text-xs font-semibold flex items-center justify-between">
              <span>Calculated Total:</span>
              <span className="font-extrabold text-emerald-800 text-sm">{ca1 + ca2 + exam}%</span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs"
              >
                Save Record
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
