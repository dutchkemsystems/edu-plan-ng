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
  BarChart3,
  FileSpreadsheet,
  Layers,
  Stamp,
  ExternalLink,
  XCircle,
  Eye,
  CheckCheck
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

interface VettingPlanItem {
  id: string;
  title: string;
  teacherName: string;
  subject: string;
  level: string;
  term: number;
  week: number;
  submittedAt: string;
  status: 'pending_review' | 'vetted_approved' | 'revision_requested';
  sealNumber?: string;
  endorserName?: string;
  objectives: string[];
}

import { TeacherUser } from '../types/index.ts';

interface AdminDashboardPageProps {
  user?: TeacherUser | null;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ user }) => {
  // Gold Tier Gatekeeper: verify user has gold tier or principal/admin role
  const [isGoldTier, setIsGoldTier] = useState<boolean>(() => {
    if (!user) return true; // demo preview fallback
    if (user.role === 'principal' || user.role === 'admin' || user.b2bTier === 'gold') return true;
    return false;
  });
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Phase 7 States
  const [showCertModal, setShowCertModal] = useState(false);
  const [certData, setCertData] = useState<any>(null);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [portfolioSubject, setPortfolioSubject] = useState('Mathematics');
  const [portfolioLevel, setPortfolioLevel] = useState('jss-1');
  const [portfolioTerm, setPortfolioTerm] = useState(1);
  const [isExportingPortfolio, setIsExportingPortfolio] = useState(false);

  // Vetting Queue State
  const [selectedPlanToVet, setSelectedPlanToVet] = useState<VettingPlanItem | null>(null);
  const [vettingRemarks, setVettingRemarks] = useState('');
  const [vettingQueue, setVettingQueue] = useState<VettingPlanItem[]>([
    {
      id: 'plan_tch_01',
      title: 'Decimals, Percentages & Commercial Market Calculations',
      teacherName: 'Mrs. Amina Balogun',
      subject: 'Mathematics',
      level: 'JSS 1',
      term: 1,
      week: 4,
      submittedAt: 'Today, 08:30 AM',
      status: 'pending_review',
      objectives: [
        'Convert decimals to percentages with 90% accuracy.',
        'Calculate percentage profit on transactions in Naira and Kobo.',
        'Apply financial literacy rules to personal budget planning.'
      ]
    },
    {
      id: 'plan_tch_02',
      title: 'Structural Forms & Clean Energy Devices in Nigeria',
      teacherName: 'Mrs. Folake Adeleke',
      subject: 'Basic Technology',
      level: 'JSS 2',
      term: 1,
      week: 3,
      submittedAt: 'Yesterday, 04:15 PM',
      status: 'vetted_approved',
      sealNumber: 'OEQA-SEAL-8921',
      endorserName: 'Dr. Mrs. A. O. Phillips (Vice-Principal Academics)',
      objectives: [
        'Identify 3 clean energy sources in Nigeria.',
        'Demonstrate safe handling of basic solar panels and DC meters.'
      ]
    },
    {
      id: 'plan_tch_03',
      title: 'Digital Citizenship, Cybercrime Awareness & National Security (NDPA)',
      teacherName: 'Mr. Chukwuma Obi',
      subject: 'Civic Education',
      level: 'SSS 2',
      term: 1,
      week: 4,
      submittedAt: '2 days ago',
      status: 'pending_review',
      objectives: [
        'State 3 key provisions of the Nigeria Data Protection Act 2023.',
        'Distinguish between legitimate digital services and phishing schemes.'
      ]
    }
  ]);

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

  const handleOpenCertificate = async () => {
    try {
      const res = await fetch('/api/admin/oeqa-certificate');
      const data = await res.json();
      setCertData(data);
      setShowCertModal(true);
    } catch (e) {
      setCertData({
        certificateNumber: 'OEQA/LAG/2026/CERT-8902',
        schoolName: "King's College, Lagos",
        educationDistrict: 'District III, Lagos State',
        accreditationStatus: 'FULL_STATUTORY_COMPLIANCE',
        complianceScore: 94.8,
        validUntil: '2027-10-18',
        qualityRating: 'Category A (Exemplary Institutional Delivery)',
      });
      setShowCertModal(true);
    }
  };

  const handleExportPortfolio = async () => {
    setIsExportingPortfolio(true);
    try {
      const res = await fetch('/api/export/bulk-term-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: portfolioLevel,
          subject: portfolioSubject,
          term: portfolioTerm,
          schoolName: "King's College, Lagos",
          teacherName: 'Mrs. Amina Balogun',
        }),
      });
      const data = await res.json();
      if (data.success && data.htmlContent) {
        const blob = new Blob([data.htmlContent], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = data.fileName || `Teaching_Portfolio_${portfolioSubject}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setShowPortfolioModal(false);
        confetti({ particleCount: 80, spread: 60 });
        setExportNotice(`Successfully exported 13-Week Teaching Portfolio for ${portfolioSubject} (${portfolioLevel.toUpperCase()}).`);
        setTimeout(() => setExportNotice(null), 5000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsExportingPortfolio(false);
    }
  };

  const handleEndorsePlan = async (plan: VettingPlanItem) => {
    const sealNumber = `OEQA-SEAL-${Math.floor(1000 + Math.random() * 9000)}`;
    const endorserName = 'Dr. Mrs. A. O. Phillips (Vice-Principal Academics)';

    try {
      await fetch('/api/admin/vetting/endorse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: plan.id,
          endorserName,
          remarks: vettingRemarks || 'Officially vetted and endorsed according to Lagos State OEQA standards.',
        }),
      });
    } catch (e) {
      // offline fallback
    }

    setVettingQueue((prev) =>
      prev.map((p) =>
        p.id === plan.id
          ? {
              ...p,
              status: 'vetted_approved',
              sealNumber,
              endorserName,
            }
          : p
      )
    );

    setSelectedPlanToVet(null);
    setVettingRemarks('');
    confetti({ particleCount: 70, spread: 60 });
  };

  const handleRejectPlan = async (plan: VettingPlanItem) => {
    try {
      await fetch('/api/admin/vetting/request-revision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: plan.id,
          remarks: vettingRemarks || 'Please include concrete Nigerian realia and explicit chalkboard summary steps.',
        }),
      });
    } catch (e) {
      // offline fallback
    }

    setVettingQueue((prev) =>
      prev.map((p) =>
        p.id === plan.id
          ? {
              ...p,
              status: 'revision_requested',
            }
          : p
      )
    );

    setSelectedPlanToVet(null);
    setVettingRemarks('');
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
            onClick={handleOpenCertificate}
            className="px-3.5 py-2 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Award className="w-4 h-4 text-amber-700" />
            <span>OEQA Quality Certificate</span>
          </button>
          <button
            onClick={() => setShowPortfolioModal(true)}
            className="px-3.5 py-2 text-xs font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Layers className="w-4 h-4 text-emerald-700" />
            <span>Export 13-Week Term Portfolio</span>
          </button>
          <button
            onClick={handleExportOeqaDossier}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Printer className="w-4 h-4" />
            <span>Statutory Audit Dossier</span>
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

      {/* Institutional Academic Vetting Board */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1">
              <Stamp className="w-3 h-3 text-emerald-600" />
              <span>Institutional Oversight · Statutory Rule 42</span>
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Principal & HOD Academic Vetting Board
            </h2>
            <p className="text-xs text-slate-500">
              Review weekly lesson notes submitted by faculty, audit OEQA 5-step matrix conformity, and affix official digital endorsement seals prior to classroom presentation.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
              Queue: {vettingQueue.filter(p => p.status === 'pending_review').length} Pending
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3">Teacher & Level</th>
                <th className="py-3 px-3">Subject & Topic</th>
                <th className="py-3 px-3">Week & Date</th>
                <th className="py-3 px-3">OEQA Matrix Quality</th>
                <th className="py-3 px-3">Vetting Status</th>
                <th className="py-3 px-3 text-right">Statutory Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {vettingQueue.map((plan) => (
                <tr key={plan.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-slate-900 block">{plan.teacherName}</span>
                    <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 inline-block mt-0.5">
                      {plan.level.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-slate-900 block">{plan.subject}</span>
                    <span className="text-[11px] text-slate-500 line-clamp-1">{plan.title}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-slate-700 block">Week {plan.week}</span>
                    <span className="text-[11px] text-slate-400">{plan.submittedAt}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        5-Steps
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                        Realia
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                        Chalkboard
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    {plan.status === 'vetted_approved' ? (
                      <div>
                        <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-bold inline-flex items-center gap-1 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Endorsed & Sealed</span>
                        </span>
                        {plan.sealNumber && (
                          <div className="text-[10px] font-mono text-emerald-700 mt-0.5 font-bold">
                            {plan.sealNumber}
                          </div>
                        )}
                      </div>
                    ) : plan.status === 'revision_requested' ? (
                      <span className="text-rose-800 bg-rose-50 px-2 py-0.5 rounded text-[11px] font-bold inline-flex items-center gap-1 border border-rose-200">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Revision Requested</span>
                      </span>
                    ) : (
                      <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-bold inline-flex items-center gap-1 border border-amber-200">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Pending HOD Vetting</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedPlanToVet(plan);
                        setVettingRemarks('');
                      }}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center gap-1.5 ml-auto ${
                        plan.status === 'vetted_approved'
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                      }`}
                    >
                      <Stamp className="w-3.5 h-3.5" />
                      <span>{plan.status === 'vetted_approved' ? 'Inspect Seal' : 'Audit & Endorse'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: OEQA Statutory Quality Compliance Certificate */}
      {showCertModal && certData && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border-4 border-amber-400/80 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Certificate Header Banner */}
            <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-amber-950 p-6 text-center text-white relative">
              <button
                onClick={() => setShowCertModal(false)}
                className="absolute top-4 right-4 text-slate-300 hover:text-white text-xs bg-white/10 px-2.5 py-1 rounded-full"
              >
                ✕ Close
              </button>
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold text-xl shadow-lg border-2 border-white">
                  ★
                </div>
              </div>
              <p className="text-[10px] tracking-widest uppercase font-mono text-amber-300 font-bold">
                Federal Republic of Nigeria · Lagos State Ministry of Basic Education
              </p>
              <h2 className="text-xl sm:text-2xl font-serif font-black tracking-wide text-white mt-1">
                Office of Education Quality Assurance (OEQA)
              </h2>
              <p className="text-xs text-emerald-200 mt-1 font-serif italic">
                Statutory Certificate of Curriculum Compliance & Academic Excellence
              </p>
            </div>

            {/* Certificate Body */}
            <div className="p-6 sm:p-8 space-y-6 bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] [background-size:16px_16px]">
              <div className="text-center space-y-2">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  This Is To Certify That
                </span>
                <h3 className="text-2xl font-serif font-black text-slate-900 border-b-2 border-amber-300 pb-2 inline-block">
                  {certData.institutionName}
                </h3>
                <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed pt-1">
                  Has satisfactorily met all statutory curriculum guidelines, lesson note quality matrix standards (5-Step pedagogy), and WAEC/NECO syllabus pacing under the supervision of the Department of Quality Assurance.
                </p>
              </div>

              {/* Compliance Scores Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Overall Rating</span>
                  <div className="text-2xl font-black text-emerald-700 font-mono">
                    {certData.overallScore}%
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                    Grade A1
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">NERDC Pacing</span>
                  <div className="text-2xl font-black text-slate-900 font-mono">
                    {certData.breakdown.nerdcAlignment}%
                  </div>
                  <span className="text-[10px] text-slate-400">13-Week Pace</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Nigerian Realia</span>
                  <div className="text-2xl font-black text-blue-700 font-mono">
                    {certData.breakdown.culturalRealia}%
                  </div>
                  <span className="text-[10px] text-slate-400">Contextual</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Exam Rigor</span>
                  <div className="text-2xl font-black text-amber-700 font-mono">
                    {certData.breakdown.examReadiness}%
                  </div>
                  <span className="text-[10px] text-slate-400">WAEC / NECO</span>
                </div>
              </div>

              {/* Signatures & Seal */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-200">
                <div className="text-left space-y-1">
                  <div className="text-xs font-mono font-bold text-slate-800">
                    Certificate No: <span className="text-emerald-700">{certData.certificateNumber}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    District: {certData.district} · Academic Session: {certData.session}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Issue Date: {certData.issueDate}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-4 border-double border-amber-500 flex flex-col items-center justify-center text-center p-1 bg-amber-50 shadow-inner">
                    <span className="text-[7px] font-black uppercase text-amber-900 leading-tight">OEQA SEAL</span>
                    <span className="text-[10px] font-bold text-amber-700">★ ★ ★</span>
                    <span className="text-[7px] font-mono text-amber-800">2026/27</span>
                  </div>

                  <div className="text-right">
                    <div className="font-serif italic text-sm text-slate-900 font-bold border-b border-slate-400 pb-0.5">
                      {certData.signatory}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold mt-0.5">
                      {certData.signatoryRole}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Footer Buttons */}
            <div className="p-4 bg-slate-100 flex items-center justify-between border-t border-slate-200">
              <span className="text-[11px] text-slate-500">
                Authenticity verifiable via Lagos State Ministry of Basic Education Portal.
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Certificate</span>
                </button>
                <button
                  onClick={() => setShowCertModal(false)}
                  className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Bulk 13-Week Teaching Portfolio Exporter */}
      {showPortfolioModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-1">
                  <Layers className="w-4 h-4" />
                  <span>Statutory Accreditation Export</span>
                </div>
                <h3 className="text-xl font-extrabold text-white">
                  Bulk 13-Week Term Teaching Portfolio
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Bundle complete 13-week schemes, daily lesson notes, CAT tests, and OEQA stamps into a single inspection-ready dossier.
                </p>
              </div>
              <button
                onClick={() => setShowPortfolioModal(false)}
                className="text-slate-400 hover:text-white text-xs bg-white/10 px-2.5 py-1 rounded-full"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Class Level
                  </label>
                  <select
                    value={portfolioLevel}
                    onChange={(e) => setPortfolioLevel(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800"
                  >
                    <option value="jss1">JSS 1 (Basic 7)</option>
                    <option value="jss2">JSS 2 (Basic 8)</option>
                    <option value="jss3">JSS 3 (Basic 9 - BECE)</option>
                    <option value="sss1">SSS 1 (Senior Sec 1)</option>
                    <option value="sss2">SSS 2 (Senior Sec 2)</option>
                    <option value="sss3">SSS 3 (WAEC / NECO Class)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subject
                  </label>
                  <select
                    value={portfolioSubject}
                    onChange={(e) => setPortfolioSubject(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="English Language">English Language</option>
                    <option value="Biology">Biology</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Physics">Physics</option>
                    <option value="Civic Education">Civic Education</option>
                    <option value="Economics">Economics</option>
                    <option value="Agricultural Science">Agricultural Science</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Academic Term
                </label>
                <select
                  value={portfolioTerm}
                  onChange={(e) => setPortfolioTerm(parseInt(e.target.value, 10))}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800"
                >
                  <option value={1}>1st Term (September – December)</option>
                  <option value={2}>2nd Term (January – April)</option>
                  <option value={3}>3rd Term (May – July)</option>
                </select>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                <span className="font-bold text-slate-800 block">Dossier Contents Included:</span>
                <div className="grid grid-cols-2 gap-2 text-slate-600 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Complete 13-Week NERDC Scheme</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Weeks 1–13 OEQA 5-Step Notes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Chalkboard Plan Illustrations</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>CAT 1 & CAT 2 Test Papers</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Terminal Exam Blueprint</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Statutory HOD Vetting Seals</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 flex items-center justify-end gap-3 border-t border-slate-200">
              <button
                onClick={() => setShowPortfolioModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleExportPortfolio}
                disabled={isExportingPortfolio}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
              >
                {isExportingPortfolio ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Compiling 13-Week Dossier...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Generate & Download Dossier (.html)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Lesson Plan Vetting & Endorsement Review */}
      {selectedPlanToVet && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold mb-1">
                  <Stamp className="w-4 h-4" />
                  <span>Statutory Vetting & Endorsement</span>
                </div>
                <h3 className="text-xl font-extrabold text-white">
                  Audit Lesson Plan: {selectedPlanToVet.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Teacher: {selectedPlanToVet.teacherName} · {selectedPlanToVet.subject} ({selectedPlanToVet.level.toUpperCase()}) · Week {selectedPlanToVet.week}
                </p>
              </div>
              <button
                onClick={() => setSelectedPlanToVet(null)}
                className="text-slate-400 hover:text-white text-xs bg-white/10 px-2.5 py-1 rounded-full"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
              {/* OEQA Checklist Verification */}
              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-emerald-900 block">
                  OEQA 5-Step Integrity Checklist:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-900">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Step 1: Prior Knowledge (P.K) Tested</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Step 2: Guided Nigerian Realia Exploration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Step 3: Discussion & Collaborative Activity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Step 4: Formal Application & Practice</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Step 5: Chalkboard Summary & Evaluation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>WAEC/NECO Chief Examiner Pitfalls Noted</span>
                  </div>
                </div>
              </div>

              {/* Endorsement Status Banner */}
              {selectedPlanToVet.status === 'vetted_approved' && selectedPlanToVet.sealNumber && (
                <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-amber-900 block">
                      Officially Endorsed & Affixed with Digital Seal
                    </span>
                    <p className="text-[11px] text-amber-700">
                      Endorser: {selectedPlanToVet.endorserName || 'Dr. Mrs. A. O. Phillips'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-black text-amber-800 bg-amber-200/80 px-2 py-1 rounded border border-amber-400">
                      {selectedPlanToVet.sealNumber}
                    </span>
                  </div>
                </div>
              )}

              {/* Vetting Remarks Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Principal / HOD Statutory Inspection Remarks:
                </label>
                <textarea
                  value={vettingRemarks}
                  onChange={(e) => setVettingRemarks(e.target.value)}
                  placeholder="e.g. Excellent 5-step adherence. Local market realia properly integrated. Approved for classroom presentation."
                  className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 min-h-[90px]"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 flex items-center justify-between border-t border-slate-200">
              <button
                onClick={() => setSelectedPlanToVet(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Close
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => handleRejectPlan(selectedPlanToVet)}
                  className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 text-xs font-bold rounded-xl transition-colors"
                >
                  Request Revision
                </button>
                <button
                  onClick={() => handleEndorsePlan(selectedPlanToVet)}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <Stamp className="w-4 h-4" />
                  <span>Affix OEQA Endorsement Seal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
