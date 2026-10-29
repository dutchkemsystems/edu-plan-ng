import React, { useState, useEffect } from 'react';
import {
  Building2,
  Users,
  ShieldCheck,
  FileSpreadsheet,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  Check,
  Key,
  Smartphone,
  ExternalLink,
  Award,
  Globe2,
  FileCheck2,
  TrendingUp,
  MapPin,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DistrictItem {
  id: string;
  name: string;
  state: string;
  country: string;
  tutorGeneral: string;
  schoolsCount: number;
  teachersCount: number;
  compliancePct: number;
  pacingPct: number;
  activeTerm: string;
  status: string;
}

interface ProvisionedAccount {
  id: string;
  name: string;
  email: string;
  schoolName: string;
  subject: string;
  level: string;
  state: string;
  district: string;
  country: string;
  licenseKey: string;
  temporaryPassword: string;
  status: string;
  oeqaCertified: boolean;
  quotaAllotted: string;
  onboardedAt: string;
}

export const MinistryCommandPage: React.FC = () => {
  const [districts, setDistricts] = useState<DistrictItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedState, setSelectedState] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Bulk onboarding modal & state
  const [showOnboardModal, setShowOnboardModal] = useState(false);
  const [onboardState, setOnboardState] = useState('Lagos State');
  const [onboardDistrict, setOnboardDistrict] = useState('Education District III');
  const [onboardCountry, setOnboardCountry] = useState('Nigeria');
  const [rawCsvInput, setRawCsvInput] = useState('');
  const [isSubmittingOnboard, setIsSubmittingOnboard] = useState(false);
  const [provisionedBatch, setProvisionedBatch] = useState<{
    batchId: string;
    totalOnboarded: number;
    accounts: ProvisionedAccount[];
    summary: string;
  } | null>(null);

  useEffect(() => {
    fetchDistrictStats();
  }, []);

  const fetchDistrictStats = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ministry/district-stats');
      const data = await res.json();
      if (data && data.districts) {
        setDistricts(data.districts);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSampleCsv = () => {
    const sample = `Name,Email,School,Subject,Level
Mr. Kelechi Nwosu,k.nwosu@kingscollege.lagos.gov.ng,King's College Lagos,Physics,sss-2
Mrs. Funmilayo Bakare,f.bakare@queenscollege.edu.ng,Queen's College Yaba,Chemistry,sss-1
Mr. Ahmed Sani,a.sani@fgc.kano.gov.ng,FGC Kano,Mathematics,jss-3
Ms. Grace Addo,g.addo@ges.accra.edu.gh,Achimota School Accra,Integrated Science,shs-2
Mr. Mohamed Kamara,m.kamara@mbsse.gov.sl,Sierra Leone Grammar School,Social Studies,jss-2
Mrs. Chioma Okonkwo,c.okonkwo@kingscollege.lagos.gov.ng,King's College Lagos,Biology,sss-3
Mr. Tunde Adeyemi,t.adeyemi@gss.ibadan.edu.ng,Government College Ibadan,Economics,sss-2`;
    setRawCsvInput(sample);
  };

  const handleProcessBulkOnboard = async () => {
    setIsSubmittingOnboard(true);
    try {
      // Parse CSV rows
      const lines = rawCsvInput
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      const parsedTeachers = [];
      const startIndex = lines[0]?.toLowerCase().includes('name') ? 1 : 0;

      for (let i = startIndex; i < lines.length; i++) {
        const parts = lines[i].split(',').map((p) => p.trim());
        if (parts.length >= 2) {
          parsedTeachers.push({
            name: parts[0],
            email: parts[1],
            schoolName: parts[2] || `${onboardState} Model School`,
            subject: parts[3] || 'General Studies',
            level: parts[4] || 'jss-1',
          });
        }
      }

      const res = await fetch('/api/ministry/bulk-onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          state: onboardState,
          district: onboardDistrict,
          country: onboardCountry,
          teachersList: parsedTeachers,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setProvisionedBatch(data);
        confetti({ particleCount: 90, spread: 70 });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmittingOnboard(false);
    }
  };

  const filteredDistricts = districts.filter((d) => {
    const matchesState = selectedState === 'all' || d.state.toLowerCase().includes(selectedState.toLowerCase());
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tutorGeneral.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-150">
      {/* Top Banner: Ministerial Oversight */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>West African Regional & State Ministry Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              State Ministry & Local Education Authority (LEA) Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Supervisory monitoring platform for State Universal Basic Education Boards (SUBEB), Ministry Tutors-General, and Regional Quality Assurance Inspectorates across Nigeria, Ghana, and Sierra Leone.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setShowOnboardModal(true);
                setProvisionedBatch(null);
                if (!rawCsvInput) handleLoadSampleCsv();
              }}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Bulk Ingest 500+ Teachers</span>
            </button>
            <button
              onClick={fetchDistrictStats}
              className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 border border-white/10"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Telemetry</span>
            </button>
          </div>
        </div>
      </div>

      {/* Aggregate Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Supervised Teaching Staff</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono mt-2">
            6,650
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
            Across 420 Secondary & Junior Schools
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Average 13-Week Syllabus Pacing</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-blue-700 font-mono mt-2">
            93.4%
          </div>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">
            Aligned with NERDC & GES standard calendar
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>OEQA Inspection Pass Rate</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-amber-600 font-mono mt-2">
            94.8%
          </div>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">
            5-Step pedagogical matrix verified
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Active Jurisdictions</span>
            <MapPin className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-extrabold text-purple-700 font-mono mt-2">
            7 LEA Zones
          </div>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">
            Nigeria (5) · Ghana (1) · Sierra Leone (1)
          </span>
        </div>
      </div>

      {/* District Oversight Heatmap & Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Regional Education Districts & LEA Telemetry
            </h2>
            <p className="text-xs text-slate-500">
              Real-time monitoring of weekly lesson submissions, curriculum coverage, and statutory OEQA inspections.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg shrink-0 overflow-x-auto">
            {['all', 'lagos', 'oyo', 'kano', 'fct', 'accra', 'western'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md capitalize transition-colors ${
                  selectedState === st
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Input */}
        <div className="max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by district name, state, or Tutor-General..."
              className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3">District & Authority</th>
                <th className="py-3 px-3">Jurisdiction</th>
                <th className="py-3 px-3">Tutor-General / Lead</th>
                <th className="py-3 px-3">Faculty / Schools</th>
                <th className="py-3 px-3">Syllabus Pacing</th>
                <th className="py-3 px-3">OEQA Compliance</th>
                <th className="py-3 px-3 text-right">Accreditation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredDistricts.map((dist) => (
                <tr key={dist.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-slate-900 block">{dist.name}</span>
                    <span className="text-[11px] text-slate-400">{dist.activeTerm}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-slate-800 block">{dist.state}</span>
                    <span className="text-[11px] text-slate-500">{dist.country}</span>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-slate-700">
                    {dist.tutorGeneral}
                  </td>
                  <td className="py-3.5 px-3 font-mono tabular-nums">
                    <span className="font-bold text-slate-900">{dist.teachersCount}</span> Teachers
                    <span className="text-[11px] text-slate-400 block">{dist.schoolsCount} Schools</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{ width: `${dist.pacingPct}%` }}
                        />
                      </div>
                      <span className="font-mono tabular-nums font-semibold text-slate-700">
                        {dist.pacingPct}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-600"
                          style={{ width: `${dist.compliancePct}%` }}
                        />
                      </div>
                      <span className="font-mono tabular-nums font-bold text-emerald-800">
                        {dist.compliancePct}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{dist.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Bulk 500+ Teacher CSV Ingestion & License Provisioning */}
      {showOnboardModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-1">
                  <Upload className="w-4 h-4" />
                  <span>State Ministry Enterprise Ingestion</span>
                </div>
                <h3 className="text-xl font-extrabold text-white">
                  Bulk Provision Statutory Teaching Accounts
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Ingest district rosters via CSV. Instantly provisions verified teacher seats, NERDC licenses, and WhatsApp/SMS credentials.
                </p>
              </div>
              <button
                onClick={() => setShowOnboardModal(false)}
                className="text-slate-400 hover:text-white text-xs bg-white/10 px-2.5 py-1 rounded-full"
              >
                ✕
              </button>
            </div>

            {!provisionedBatch ? (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Country Jurisdiction</label>
                    <select
                      value={onboardCountry}
                      onChange={(e) => setOnboardCountry(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800"
                    >
                      <option value="Nigeria">Nigeria 🇳🇬 (NERDC)</option>
                      <option value="Ghana">Ghana 🇬🇭 (GES)</option>
                      <option value="Sierra Leone">Sierra Leone 🇸🇱 (MBSSE)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">State / Province</label>
                    <input
                      type="text"
                      value={onboardState}
                      onChange={(e) => setOnboardState(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">LEA / District</label>
                    <input
                      type="text"
                      value={onboardDistrict}
                      onChange={(e) => setOnboardDistrict(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Roster CSV Data (Name, Email, School, Subject, Level):
                    </label>
                    <button
                      type="button"
                      onClick={handleLoadSampleCsv}
                      className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1"
                    >
                      <span>Load Sample District Batch</span>
                    </button>
                  </div>
                  <textarea
                    value={rawCsvInput}
                    onChange={(e) => setRawCsvInput(e.target.value)}
                    placeholder="Name,Email,School,Subject,Level..."
                    className="w-full font-mono text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 min-h-[140px]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Accepts up to 500 rows per batch. Automatic deduplication against state civil service records.
                  </p>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Accounts provisioned through this portal receive statutory OEQA compliance seals and institutional license keys immediately.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setShowOnboardModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProcessBulkOnboard}
                    disabled={isSubmittingOnboard || !rawCsvInput.trim()}
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmittingOnboard ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Provisioning District Accounts...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Execute Bulk Provisioning</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              /* Success Provisioning Report */
              <div className="p-6 space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900">
                      {provisionedBatch.summary}
                    </h4>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      Batch Identifier: <span className="font-mono font-bold">{provisionedBatch.batchId}</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800 block">
                    Provisioned Faculty Credentials:
                  </span>
                  <div className="max-h-[220px] overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100">
                    {provisionedBatch.accounts.map((acc) => (
                      <div key={acc.id} className="p-3 bg-slate-50/50 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-slate-900 block">{acc.name}</span>
                          <span className="text-[11px] text-slate-500">
                            {acc.email} · {acc.schoolName} ({acc.subject})
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 block">
                            {acc.licenseKey}
                          </span>
                          <span className="text-[10px] text-slate-400 mt-0.5 block">
                            Pass: {acc.temporaryPassword}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      const csvRows = [
                        'Teacher ID,Name,Email,School,Subject,Level,License Key,Temporary Password,State',
                        ...provisionedBatch.accounts.map(
                          (a) =>
                            `"${a.id}","${a.name}","${a.email}","${a.schoolName}","${a.subject}","${a.level}","${a.licenseKey}","${a.temporaryPassword}","${a.state}"`
                        ),
                      ].join('\n');
                      const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `District_Credentials_${provisionedBatch.batchId}.csv`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-4 h-4 text-slate-600" />
                    <span>Download Credentials CSV</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowOnboardModal(false);
                      setProvisionedBatch(null);
                      fetchDistrictStats();
                    }}
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                  >
                    Done & Return
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
