import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  UserCheck,
  AlertTriangle,
  FileCheck2,
  X,
  RefreshCw,
  Eye,
  CheckCircle2,
  Clock,
  UserX,
  FileText,
  Building2,
  Users
} from 'lucide-react';

interface DpoDashboardData {
  tenantSchoolId: string;
  dpoOfficer: string;
  statutoryFramework: string;
  metrics: {
    totalStudents: number;
    consentsGranted: number;
    consentsPending: number;
    consentComplianceRate: string;
    dpiaProcessingLogsCount: number;
    blockedViolationsCount: number;
    dataMinimizationScore: string;
  };
  recentViolations: any[];
  recentLogs: any[];
}

interface StudentItem {
  id: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  classLevel: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail?: string;
  consentStatus: string;
}

interface DpoDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DpoDashboardModal: React.FC<DpoDashboardModalProps> = ({ isOpen, onClose }) => {
  const [data, setData] = useState<DpoDashboardData | null>(null);
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'audit_logs' | 'violations' | 'monthly_report'>('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStudentForConsent, setSelectedStudentForConsent] = useState<StudentItem | null>(null);
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [isSubmittingConsent, setIsSubmittingConsent] = useState(false);
  const [consentSuccessMsg, setConsentSuccessMsg] = useState<string | null>(null);
  const [consentErrorMsg, setConsentErrorMsg] = useState<string | null>(null);

  // Phase 2D: Monthly DPIA Report State
  const [monthlyReport, setMonthlyReport] = useState<any | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>('2026-11');
  const [isLoadingReport, setIsLoadingReport] = useState(false);

  const fetchMonthlyReport = async (month?: string) => {
    setIsLoadingReport(true);
    try {
      const res = await fetch(`/api/ndpa/dpia-monthly-report?month=${month || selectedMonth}`);
      if (res.ok) {
        const d = await res.json();
        setMonthlyReport(d.report);
      }
    } catch (e) {
      console.error('Failed to load monthly DPIA report', e);
    } finally {
      setIsLoadingReport(false);
    }
  };

  const fetchDpoData = async () => {
    setIsLoading(true);
    try {
      const [dpoRes, studentsRes] = await Promise.all([
        fetch('/api/ndpa/dpo-dashboard'),
        fetch('/api/students'),
      ]);
      if (dpoRes.ok) {
        setData(await dpoRes.json());
      }
      if (studentsRes.ok) {
        const sData = await studentsRes.json();
        setStudents(sData.students || []);
      }
      await fetchMonthlyReport();
    } catch (e) {
      console.error('Failed to load DPO dashboard', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchDpoData();
    }
  }, [isOpen]);

  const handleGrantConsent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentForConsent) return;

    setIsSubmittingConsent(true);
    setConsentErrorMsg(null);
    try {
      const res = await fetch(`/api/students/${selectedStudentForConsent.id}/consent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: parentName || selectedStudentForConsent.guardianName,
          parentPhone: parentPhone || '0803-123-4567',
          purpose: 'Official Continuous Assessment & WAEC/NECO Terminal Verification (NDPA 2023 Sec 24)',
          consentGranted: true,
        }),
      });

      if (res.ok) {
        setConsentSuccessMsg(`Parental consent successfully registered for ${selectedStudentForConsent.firstName} ${selectedStudentForConsent.lastName}. PII access unlocked.`);
        setSelectedStudentForConsent(null);
        fetchDpoData();
        setTimeout(() => setConsentSuccessMsg(null), 6000);
      } else {
        setConsentErrorMsg('Failed to record parental consent. Please try again.');
      }
    } catch (err) {
      setConsentErrorMsg('Failed to record parental consent. Network error.');
    } finally {
      setIsSubmittingConsent(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  NDPA 2023 Data Protection Officer (DPO) Hub
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Statutory Privacy Audit
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Nigeria Data Protection Act 2023 Compliance • Multi-Tenant Row-Level Security (RLS) &amp; Consent Gates
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Nav */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-100 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Compliance Overview
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'students'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Student Consent Gates ({students.length})
          </button>
          <button
            onClick={() => setActiveTab('audit_logs')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'audit_logs'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            DPIA Processing Logs ({data?.recentLogs.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('violations')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'violations'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Blocked Violations ({data?.recentViolations.length || 0})
          </button>
          <button
            onClick={() => {
              setActiveTab('monthly_report');
              fetchMonthlyReport();
            }}
            className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'monthly_report'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Monthly DPIA Report</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {consentSuccessMsg && (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded-2xl text-xs font-semibold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{consentSuccessMsg}</span>
            </div>
          )}

          {consentErrorMsg && (
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-700 rounded-2xl text-xs font-semibold text-rose-900 dark:text-rose-200 flex items-center justify-between gap-2">
              <span>{consentErrorMsg}</span>
              <button onClick={() => setConsentErrorMsg(null)} className="text-rose-600 hover:text-rose-800 font-bold">
                Dismiss
              </button>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 4 Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500">Student Minor Records</span>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">
                    {data?.metrics.totalStudents ?? students.length}
                  </p>
                  <span className="text-[10px] text-slate-400">Classrooms Isolated</span>
                </div>

                <div className="bg-emerald-50/60 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 space-y-1">
                  <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">Parental Consents</span>
                  <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                    {data?.metrics.consentComplianceRate || '100%'}
                  </p>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                    {data?.metrics.consentsGranted || 0} Granted / {data?.metrics.consentsPending || 0} Pending
                  </span>
                </div>

                <div className="bg-blue-50/60 dark:bg-blue-950/30 p-4 rounded-2xl border border-blue-200 dark:border-blue-800/60 space-y-1">
                  <span className="text-[11px] font-bold text-blue-800 dark:text-blue-300">DPIA Processing Logs</span>
                  <p className="text-2xl font-black text-blue-700 dark:text-blue-400">
                    {data?.metrics.dpiaProcessingLogsCount || 0}
                  </p>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400">Section 24 Audited</span>
                </div>

                <div className="bg-rose-50/60 dark:bg-rose-950/30 p-4 rounded-2xl border border-rose-200 dark:border-rose-800/60 space-y-1">
                  <span className="text-[11px] font-bold text-rose-800 dark:text-rose-300">Intrusions Blocked</span>
                  <p className="text-2xl font-black text-rose-700 dark:text-rose-400">
                    {data?.metrics.blockedViolationsCount || 0}
                  </p>
                  <span className="text-[10px] text-rose-600 dark:text-rose-400">Zero-Leakage RLS</span>
                </div>
              </div>

              {/* Legal Mandate Breakdown */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white space-y-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Row-Level Security (RLS) &amp; Isolation Architecture
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
                  <div className="space-y-1">
                    <p className="font-bold text-white">1. Multi-Tenant School Isolation:</p>
                    <p className="text-slate-400">
                      Every database query enforces <code>school_id = current_setting(&apos;app.current_school_id&apos;)</code>.
                      Private schools and public colleges cannot access each other&apos;s lesson plans, fees, or students.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-white">2. Ministry State Isolation:</p>
                    <p className="text-slate-400">
                      Ministry officials are strictly bounded by <code>state_id = session.user.ministry_state_id</code>.
                      A Lagos State Ministry inspector cannot view schools in other states.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Student Roster with NDPA 2023 Consent Gate
                </h4>
                <span className="text-[11px] text-slate-400">
                  Sensitive PII masked until parental consent is granted
                </span>
              </div>

              {students.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                  No student records loaded for this school tenant.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                        <th className="py-2.5 px-3 font-bold">Admission No.</th>
                        <th className="py-2.5 px-3 font-bold">Student Name</th>
                        <th className="py-2.5 px-3 font-bold">Class</th>
                        <th className="py-2.5 px-3 font-bold">Guardian Contact (PII)</th>
                        <th className="py-2.5 px-3 font-bold">NDPA Consent</th>
                        <th className="py-2.5 px-3 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                      {students.map((std) => (
                        <tr key={std.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                          <td className="py-3 px-3 font-mono text-[11px] font-bold text-slate-900 dark:text-white">
                            {std.admissionNumber}
                          </td>
                          <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                            {std.firstName} {std.lastName}
                          </td>
                          <td className="py-3 px-3 uppercase text-[10px] font-bold text-slate-500">
                            {std.classLevel}
                          </td>
                          <td className="py-3 px-3 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                            {std.guardianPhone}
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                std.consentStatus === 'GRANTED'
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              }`}
                            >
                              {std.consentStatus}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            {std.consentStatus !== 'GRANTED' && (
                              <button
                                onClick={() => {
                                  setSelectedStudentForConsent(std);
                                  setParentName(std.guardianName);
                                }}
                                className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                              >
                                Record Consent
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'audit_logs' && (
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Recent Data Processing Impact Assessment (DPIA) Audit Logs
              </h4>
              <div className="space-y-2">
                {data?.recentLogs.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">No data processing logs recorded.</p>
                ) : (
                  data?.recentLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">{log.action}</span>
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                            {log.dataSubjectCategory}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">{log.processingPurpose}</p>
                      </div>
                      <div className="text-right text-[11px] font-mono text-slate-400">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'violations' && (
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Blocked Cross-Tenant Data Pilfering Attempts (RLS Shield)
              </h4>
              <div className="space-y-2">
                {data?.recentViolations.length === 0 ? (
                  <div className="p-8 text-center text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                    Zero isolation breaches detected. All tenant boundaries are sealed.
                  </div>
                ) : (
                  data?.recentViolations.map((v) => (
                    <div
                      key={v.id}
                      className="p-3.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-xl space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                          {v.violationType}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white">
                          BLOCKED
                        </span>
                      </div>
                      <p className="text-[11px] text-rose-800/90 dark:text-rose-300/90 font-mono">
                        {v.details}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'monthly_report' && (
            <div className="space-y-6">
              {/* Header and Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Statutory Data Protection Impact Assessment (DPIA)</span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Mandated monthly compliance audit under NDPA 2023 Sections 24, 28, 30 & 32.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedMonth}
                    onChange={(e) => {
                      setSelectedMonth(e.target.value);
                      fetchMonthlyReport(e.target.value);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-emerald-500"
                  >
                    <option value="2026-11">November 2026</option>
                    <option value="2026-10">October 2026</option>
                    <option value="2026-09">September 2026</option>
                  </select>

                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-1.5 shadow-2xs"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Print DPIA Report</span>
                  </button>
                </div>
              </div>

              {isLoadingReport ? (
                <div className="p-12 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                  <span>Synthesizing monthly DPIA audit telemetry...</span>
                </div>
              ) : monthlyReport ? (
                <div className="space-y-6">
                  {/* Report Card Meta */}
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">Official Report ID</span>
                        <p className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">{monthlyReport.reportId}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">Statutory Status</span>
                        <div>
                          <span className="text-[11px] font-black px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                            {monthlyReport.complianceStatus}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-[11px] font-medium text-slate-400">Reporting Month:</span>
                        <p className="font-bold text-slate-900 dark:text-white">{monthlyReport.reportingPeriod}</p>
                      </div>
                      <div>
                        <span className="text-[11px] font-medium text-slate-400">DPO Registration:</span>
                        <p className="font-bold text-slate-900 dark:text-white">{monthlyReport.dpoOfficer?.registrationId}</p>
                      </div>
                      <div>
                        <span className="text-[11px] font-medium text-slate-400">Tenant Domain:</span>
                        <p className="font-bold text-slate-900 dark:text-white">{monthlyReport.tenantContext?.schoolId}</p>
                      </div>
                      <div>
                        <span className="text-[11px] font-medium text-slate-400">Consent Rate:</span>
                        <p className="font-bold text-emerald-600 dark:text-emerald-400">{monthlyReport.metrics?.consentComplianceRate}</p>
                      </div>
                    </div>
                  </div>

                  {/* 4 Metric Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Processing Events</span>
                      <p className="text-xl font-black text-slate-900 dark:text-white mt-1">{monthlyReport.metrics?.totalProcessingEvents}</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Minor Students</span>
                      <p className="text-xl font-black text-slate-900 dark:text-white mt-1">{monthlyReport.metrics?.studentRecordsProtected}</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">IEP Scaffolds</span>
                      <p className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-1">{monthlyReport.metrics?.differentiatedInstructionIepGenerations}</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">RLS Violations Blocked</span>
                      <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{monthlyReport.metrics?.unconsentedPiiBlocks}</p>
                    </div>
                  </div>

                  {/* Statutory Risk Assessment Matrix */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-black uppercase text-slate-700 dark:text-slate-300">
                      Statutory Risk Assessment & Mitigation Controls (NDPA 2023 Sec 28)
                    </h5>
                    <div className="space-y-2">
                      {monthlyReport.riskAssessmentFindings?.map((risk: any, rIdx: number) => (
                        <div key={rIdx} className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 dark:text-white">{risk.hazard}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                              {risk.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400">{risk.controlsEnforced}</p>
                          <div className="text-[10px] font-semibold text-slate-400">
                            Risk Rating: <span className="font-bold text-slate-700 dark:text-slate-200">{risk.riskLevel}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* DPO Formal Conclusion */}
                  <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl space-y-2">
                    <span className="text-xs font-extrabold uppercase text-emerald-900 dark:text-emerald-300">
                      DPO Audit Assessment & Certification
                    </span>
                    <p className="text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed">
                      {monthlyReport.auditConclusions}
                    </p>
                    <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-between text-[11px] text-emerald-800 dark:text-emerald-400">
                      <span>Certified by: <strong>{monthlyReport.signoff?.signedBy}</strong></span>
                      <span>Verified: {new Date(monthlyReport.signoff?.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between text-xs text-slate-500">
          <span>Officer: <strong>{data?.dpoOfficer || 'Compliance Lead'}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 transition-colors"
          >
            Close Dashboard
          </button>
        </div>
      </div>

      {/* Grant Consent Submodal */}
      {selectedStudentForConsent && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="space-y-1">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-500" />
                <span>Parental Consent Verification (NDPA 2023)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Grant statutory processing consent for <strong>{selectedStudentForConsent.firstName} {selectedStudentForConsent.lastName}</strong>.
              </p>
            </div>

            <form onSubmit={handleGrantConsent} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Parent / Legal Guardian Name
                </label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white focus:outline-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Parent Phone (for SMS Verification)
                </label>
                <input
                  type="text"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  placeholder="0803-123-4567"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white focus:outline-emerald-500"
                  required
                />
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-[11px] text-emerald-900 dark:text-emerald-300">
                By clicking Confirm, the school certifies that physical or digital consent was executed pursuant to Section 24 of the Nigeria Data Protection Act 2023.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedStudentForConsent(null)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingConsent}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all"
                >
                  {isSubmittingConsent ? 'Recording...' : 'Grant Consent'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
