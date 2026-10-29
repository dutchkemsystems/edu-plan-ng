import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Award,
  Users,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Printer,
  Download,
  Building2,
  Lock,
  ArrowRight,
  TrendingUp,
  Clock,
  Filter,
  Check,
  RefreshCw,
  Sparkles,
  BarChart3
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TeacherAuditRow {
  id: string;
  name: string;
  department: 'Sciences' | 'Humanities' | 'Commercial' | 'Vocational';
  subject: string;
  levels: string;
  coveragePct: number;
  submittedPlans: number;
  expectedPlans: number;
  oeqaStatus: 'compliant' | 'needs_review' | 'overdue';
  lastSubmitted: string;
}

export default function PrincipalAdminDashboard() {
  // Gold Tier Gatekeeper simulation state (toggleable so principals can preview)
  const [isGoldTier, setIsGoldTier] = useState<boolean>(true);
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const [teachers, setTeachers] = useState<TeacherAuditRow[]>([
    {
      id: 'tch_01',
      name: 'Mrs. Amina Balogun',
      department: 'Sciences',
      subject: 'Mathematics',
      levels: 'JSS 1, SSS 1',
      coveragePct: 92,
      submittedPlans: 12,
      expectedPlans: 12,
      oeqaStatus: 'compliant',
      lastSubmitted: 'Today, 08:30 AM',
    },
    {
      id: 'tch_02',
      name: 'Mr. Chukwuma Obi',
      department: 'Humanities',
      subject: 'English Studies',
      levels: 'JSS 2, SSS 2',
      coveragePct: 88,
      submittedPlans: 11,
      expectedPlans: 12,
      oeqaStatus: 'compliant',
      lastSubmitted: 'Yesterday',
    },
    {
      id: 'tch_03',
      name: 'Mrs. Folake Adeleke',
      department: 'Sciences',
      subject: 'Basic Science & Tech',
      levels: 'JSS 1, JSS 2',
      coveragePct: 75,
      submittedPlans: 9,
      expectedPlans: 12,
      oeqaStatus: 'needs_review',
      lastSubmitted: '3 days ago',
    },
    {
      id: 'tch_04',
      name: 'Mr. Danjuma Ibrahim',
      department: 'Humanities',
      subject: 'Civic Education',
      levels: 'JSS 3, SSS 3',
      coveragePct: 95,
      submittedPlans: 12,
      expectedPlans: 12,
      oeqaStatus: 'compliant',
      lastSubmitted: 'Today, 09:15 AM',
    },
    {
      id: 'tch_05',
      name: 'Dr. Adeyemi Alabi',
      department: 'Sciences',
      subject: 'Physics',
      levels: 'SSS 1, SSS 2, SSS 3',
      coveragePct: 90,
      submittedPlans: 12,
      expectedPlans: 12,
      oeqaStatus: 'compliant',
      lastSubmitted: '2 days ago',
    },
    {
      id: 'tch_06',
      name: 'Mrs. Ngozi Eze',
      department: 'Commercial',
      subject: 'Financial Accounting',
      levels: 'SSS 1, SSS 2',
      coveragePct: 62,
      submittedPlans: 7,
      expectedPlans: 12,
      oeqaStatus: 'overdue',
      lastSubmitted: '6 days ago',
    },
    {
      id: 'tch_07',
      name: 'Mr. Babatunde Lawal',
      department: 'Commercial',
      subject: 'Commerce & Economics',
      levels: 'SSS 2, SSS 3',
      coveragePct: 85,
      submittedPlans: 10,
      expectedPlans: 12,
      oeqaStatus: 'compliant',
      lastSubmitted: 'Yesterday',
    },
    {
      id: 'tch_08',
      name: 'Mrs. Zainab Umar',
      department: 'Vocational',
      subject: 'Agricultural Science',
      levels: 'JSS 1, JSS 2, SSS 1',
      coveragePct: 89,
      submittedPlans: 11,
      expectedPlans: 12,
      oeqaStatus: 'compliant',
      lastSubmitted: 'Today, 07:45 AM',
    },
  ]);

  const handleApproveTeacher = (id: string) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, oeqaStatus: 'compliant' } : t))
    );
    confetti({ particleCount: 45, spread: 50 });
  };

  const handleExportOeqaDossier = () => {
    setExportNotice('Lagos State OEQA / Federal Ministry of Education Statutory Inspection Dossier generated.');
    setTimeout(() => {
      window.print();
      setExportNotice(null);
    }, 600);
  };

  const handleExportCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Teacher Name,Department,Subject,Levels,Scheme Coverage %,Submitted Plans,OEQA Status\n' +
      teachers
        .map(
          (t) =>
            `"${t.name}","${t.department}","${t.subject}","${t.levels}",${t.coveragePct}%,${t.submittedPlans}/${t.expectedPlans},"${t.oeqaStatus}"`
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EduPlanNG_OEQA_Audit_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredTeachers = teachers.filter((t) => {
    const matchesDept = selectedDept === 'all' || t.department.toLowerCase() === selectedDept.toLowerCase();
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.levels.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const compliantCount = teachers.filter((t) => t.oeqaStatus === 'compliant').length;
  const compliantPct = Math.round((compliantCount / teachers.length) * 100);

  // If NOT Gold Tier, show institutional gatekeeper
  if (!isGoldTier) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-8 animate-in fade-in duration-200">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-8 sm:p-12 border border-amber-500/30 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Gold Tier Enterprise Feature</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Principal’s Academic Oversight & OEQA Analytics Portal
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Designed exclusively for School Principals, Head Administrators, and Federal Unity College Directors.
              Monitor every teacher across all departments, guarantee 100% Lagos OEQA and Federal Ministry compliance, and export instant statutory inspection dossiers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Unlimited Faculty Seats (up to 500)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Real-time OEQA Compliance Heatmap</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>10-Year WAEC/NECO Syllabus Alignment</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>White-Label Custom Portal Domain</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#pricing"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <span>Upgrade to Gold Enterprise (₦250,000 / Term)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsGoldTier(true)}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-all border border-white/20"
              >
                Preview Gold Analytics (Demo Mode)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Gold Tier Dashboard View
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-150">
      {/* Top Banner: School Identification & Gold Status */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-md border border-amber-200/80 inline-flex mb-2">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Principal’s Sovereign Analytics Portal · Gold Tier Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            King’s College, Lagos · Faculty Academic Audit
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            2026/2027 Academic Session · 1st Term (Week 3 of 13) · Lagos State OEQA District III Certified
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleExportOeqaDossier}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Printer className="w-4 h-4" />
            <span>Generate OEQA Statutory Audit Dossier</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-xs font-medium text-slate-500">OEQA Statutory Compliance</span>
          <div className="text-3xl font-extrabold text-emerald-700 font-mono tabular-nums mt-1.5">
            {compliantPct}%
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
            {compliantCount} of {teachers.length} Faculty on track
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Lesson Plans Submitted</span>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums mt-1.5">
            84 Plans
          </div>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">
            96.8% Vetted by Departmental HODs
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Scheme of Work Coverage</span>
          <div className="text-3xl font-extrabold text-blue-700 font-mono tabular-nums mt-1.5">
            84.2%
          </div>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">
            Aligned with NERDC 13-Week Pace
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-xs font-medium text-slate-500">WAEC / NECO Readiness</span>
          <div className="text-3xl font-extrabold text-amber-600 font-mono tabular-nums mt-1.5">
            High (92%)
          </div>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">
            Chief Examiner pitfalls addressed
          </span>
        </div>
      </div>

      {/* Faculty Oversight Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">Faculty Compliance & Lesson Plan Heatmap</h2>
            <p className="text-xs text-slate-500">
              Departmental audit of all teaching staff for Week 3 classroom inspections.
            </p>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg shrink-0">
            {['all', 'sciences', 'humanities', 'commercial', 'vocational'].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md capitalize transition-colors ${
                  selectedDept === dept
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by teacher name, subject, or class (e.g. Mathematics, SSS 1)..."
            className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
          />
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3">Teacher</th>
                <th className="py-3 px-3">Subject & Department</th>
                <th className="py-3 px-3">Assigned Classes</th>
                <th className="py-3 px-3">Scheme Coverage</th>
                <th className="py-3 px-3">Submissions</th>
                <th className="py-3 px-3">OEQA Status</th>
                <th className="py-3 px-3 text-right">HOD Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredTeachers.map((tch) => (
                <tr key={tch.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-slate-900 block">{tch.name}</span>
                    <span className="text-[11px] text-slate-400">Last: {tch.lastSubmitted}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-slate-800 block">{tch.subject}</span>
                    <span className="text-[11px] text-slate-500">{tch.department} Dept</span>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-slate-700">{tch.levels}</td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            tch.coveragePct >= 85
                              ? 'bg-emerald-600'
                              : tch.coveragePct >= 70
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${tch.coveragePct}%` }}
                        />
                      </div>
                      <span className="font-mono tabular-nums font-semibold text-slate-700">
                        {tch.coveragePct}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-mono tabular-nums text-slate-700 font-medium">
                    {tch.submittedPlans} / {tch.expectedPlans}
                  </td>
                  <td className="py-3.5 px-3">
                    {tch.oeqaStatus === 'compliant' ? (
                      <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-bold inline-flex items-center gap-1 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Compliant</span>
                      </span>
                    ) : tch.oeqaStatus === 'needs_review' ? (
                      <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-bold inline-flex items-center gap-1 border border-amber-200">
                        <AlertCircle className="w-3 h-3 text-amber-600" />
                        <span>Needs Review</span>
                      </span>
                    ) : (
                      <span className="text-rose-800 bg-rose-50 px-2 py-0.5 rounded text-[11px] font-bold inline-flex items-center gap-1 border border-rose-200">
                        <Clock className="w-3 h-3 text-rose-600" />
                        <span>Overdue</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    {tch.oeqaStatus !== 'compliant' ? (
                      <button
                        onClick={() => handleApproveTeacher(tch.id)}
                        className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-[11px] transition-colors"
                      >
                        Approve Plan
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">Vetted</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
