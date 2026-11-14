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
  Clock,
  Lock,
  Coins,
  GraduationCap,
  Radio,
  Terminal,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TeacherUser, DashboardStats } from '../types/index.ts';
import { resolveClientTierSummary } from '../config/pricing.ts';
import { getAuthHeaders } from '../lib/api.ts';

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

interface MinistrySchoolItem {
  id: string;
  name: string;
  slug: string;
  state: string;
  lga: string;
  b2bTier: string;
  status: string;
  teachersCount: number;
  studentsCount: number;
  compliancePct: number;
  oeqaGrade: string;
  activeSource: string;
}

interface MinistryCommandPageProps {
  user?: TeacherUser | null;
  stats?: DashboardStats | null;
  onOpenUpgrade?: (message: string, requiredTier?: string, featureTitle?: string) => void;
  onNavigate?: (route: string) => void;
}

export const MinistryCommandPage: React.FC<MinistryCommandPageProps> = ({
  user,
  stats,
  onOpenUpgrade,
  onNavigate,
}) => {
  const tierSummary = resolveClientTierSummary(user, stats);
  const ent = tierSummary.config;
  const hasMinistryAccess = ent.hasMinistryDashboard;

  const [districts, setDistricts] = useState<DistrictItem[]>([]);
  const [ministrySchools, setMinistrySchools] = useState<MinistrySchoolItem[]>([]);
  const [activeTab, setActiveTab] = useState<'districts' | 'schools' | 'policies' | 'levy' | 'cpd' | 'broadcast'>('districts');
  const [policies, setPolicies] = useState<any[]>([]);
  const [levyData, setLevyData] = useState<any | null>(null);
  const [cpdData, setCpdData] = useState<any | null>(null);
  const [broadcastTitle, setBroadcastTitle] = useState('OEQA Termly Scheme Synchronization Directive');
  const [broadcastMessage, setBroadcastMessage] = useState('All public and private school principals across Districts I–VI must align JSS1–SSS3 schemes to the latest Lagos State Unified Scheme circular.');
  const [broadcastResult, setBroadcastResult] = useState<any | null>(null);
  const [isSendingBroadcast, setIsSendingBroadcast] = useState(false);
  const [isPolicyLoading, setIsPolicyLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedState, setSelectedState] = useState<string>('lagos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isStateIsolated, setIsStateIsolated] = useState<boolean>(true);
  const [userMinistryState, setUserMinistryState] = useState<string>('lagos');
  const [isolationNotice, setIsolationNotice] = useState<string | null>(null);
  const [crossStateAlert, setCrossStateAlert] = useState<string | null>(null);

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
    if (!hasMinistryAccess) {
      setIsLoading(false);
      return;
    }
    fetchDistrictStats();
    fetchMinistrySchools();
    fetchPolicies();
    fetchLevyTracker();
    fetchCpdModule();
  }, [hasMinistryAccess, tierSummary.tierId]);

  const fetchLevyTracker = async () => {
    try {
      const res = await fetch('/api/ministry/levy-tracker', {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      if (res.ok) {
        setLevyData(await res.json());
      }
    } catch (e) {
      console.error('Failed to fetch levy tracker', e);
    }
  };

  const fetchCpdModule = async () => {
    try {
      const res = await fetch('/api/ministry/cpd', {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      if (res.ok) {
        setCpdData(await res.json());
      }
    } catch (e) {
      console.error('Failed to fetch CPD cohorts', e);
    }
  };

  const handleDispatchBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingBroadcast(true);
    try {
      const res = await fetch('/api/ministry/emergency-broadcast', {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify({
          title: broadcastTitle,
          message: broadcastMessage,
          targetDistricts: ['District I', 'District II', 'District III', 'District IV', 'District V', 'District VI'],
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBroadcastResult(data);
        confetti({ particleCount: 70, spread: 60 });
      }
    } catch (err) {
      console.error('Broadcast failed', err);
    } finally {
      setIsSendingBroadcast(false);
    }
  };

  const fetchPolicies = async () => {
    setIsPolicyLoading(true);
    try {
      const res = await fetch('/api/ministry/policy', {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      const data = await res.json();
      if (data && data.success && Array.isArray(data.policies)) {
        setPolicies(data.policies);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsPolicyLoading(false);
    }
  };

  const handleTogglePolicy = async (policyId: string, currentStatus: number) => {
    try {
      const nextStatus = currentStatus === 1 ? 0 : 1;
      const res = await fetch('/api/ministry/policy/toggle', {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify({ policyId, isActive: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setPolicies((prev) =>
          prev.map((p) => (p.id === policyId ? { ...p, isActive: nextStatus } : p))
        );
        confetti({ particleCount: 60 });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchDistrictStats = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ministry/district-stats', {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      const data = await res.json();
      if (data && data.districts) {
        setDistricts(data.districts);
        setIsStateIsolated(data.isStateIsolated ?? true);
        setUserMinistryState(data.ministryState || 'lagos');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMinistrySchools = async () => {
    try {
      const res = await fetch('/api/ministry/schools', {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      const data = await res.json();
      if (data && data.schools) {
        setMinistrySchools(data.schools);
        if (data.isolationPolicyNotice) {
          setIsolationNotice(data.isolationPolicyNotice);
        }
      }
    } catch (e) {
      console.error('Failed to fetch ministry schools', e);
    }
  };

  const handleStateTabClick = async (stateKey: string) => {
    if (stateKey !== 'all' && stateKey !== userMinistryState && isStateIsolated) {
      // Test the live backend cross-state boundary to demonstrate RLS enforcement
      try {
        const res = await fetch(`/api/ministry/schools?state=${stateKey}`, {
          headers: getAuthHeaders(),
          credentials: 'include',
        });
        const data = await res.json();
        if (res.status === 403 || data.error) {
          setCrossStateAlert(
            `Cross-State Boundary Enforcement (HTTP 403): ${data.error || 'Ministry official assigned to Lagos cannot view external state records.'}`
          );
          return;
        }
      } catch {
        setCrossStateAlert(`Cross-State Access Denied: Official is assigned strictly to ${userMinistryState.toUpperCase()} under NDPA 2023 Section 24.`);
        return;
      }
    }
    setSelectedState(stateKey);
    setCrossStateAlert(null);
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
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
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

  const filteredSchools = ministrySchools.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.lga.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.activeSource.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (!hasMinistryAccess) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-6 animate-in fade-in duration-200">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 border border-indigo-500/30 shadow-xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/30">
            <Lock className="w-4 h-4 text-indigo-400" />
            <span>B2G Government / Ministry Platinum Exclusive ({tierSummary.segmentLabel} Active)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            State Ministry Command Center &amp; Sovereign Direct API
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Your active subscription is <strong>{ent.name}</strong> ({ent.priceDisplay}). The Ministry Command Dashboard, State Policy Enforcement, State Levy Tracker, Teacher CPD Module, and Sovereign Direct API require a <strong>B2G State Ministry Platinum License (₦100M – ₦300M / year)</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-200">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">All 6 Statutory Curriculum Sources</div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">State Policy &amp; Mandate Enforcement</div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">Ministry Command Dashboard (Districts I–VI)</div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">State Levy &amp; OEQA Revenue Tracker</div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">Statewide Teacher CPD Certification</div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">Sovereign Direct API &amp; Broadcasts</div>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                onOpenUpgrade
                  ? onOpenUpgrade(
                      'Activate B2G State Ministry Platinum (₦100M – ₦300M/yr) for All 6 sources, State Policy Enforcement, Ministry Command Dashboard, State Levy Tracker, CPD Module & Sovereign Direct API.',
                      'b2g_state_platinum',
                      'Ministry Command Center (B2G Platinum)'
                    )
                  : onNavigate?.('pricing')
              }
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-extrabold rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <span>Activate B2G State Platinum</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('pricing')}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20"
              >
                View B2G Sovereign Contract
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

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

      {/* RLS State Isolation Status Banner */}
      <div className="bg-emerald-900/90 text-white p-5 rounded-2xl border border-emerald-700/80 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2 bg-emerald-800 rounded-xl shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider bg-emerald-800/80 px-2 py-0.5 rounded text-emerald-200">
                RLS Multi-Tenant Isolation Active
              </span>
              <span className="text-xs text-emerald-200 font-mono">
                Jurisdiction: {userMinistryState.toUpperCase()} STATE
              </span>
            </div>
            <h2 className="text-sm font-bold text-white">
              Lagos State Ministry of Basic & Secondary Education (Supervisory Boundary)
            </h2>
            <p className="text-xs text-emerald-100 leading-relaxed max-w-2xl">
              {isolationNotice || 'Pursuant to NDPA 2023 Sec 24 and Lagos State Education Law, this session is isolated strictly to schools and LEA districts within Lagos State. Cross-state queries are blocked at database middleware.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleStateTabClick('oyo')}
            className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-xs font-bold rounded-xl transition-colors border border-emerald-600/50 flex items-center gap-1.5"
            title="Attempts to query Oyo State records to verify RLS HTTP 403 boundary enforcement"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-300" />
            <span>Test Cross-State RLS Guard</span>
          </button>
        </div>
      </div>

      {/* Cross-State Warning Alert */}
      {crossStateAlert && (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-950 flex items-start justify-between gap-3 animate-in fade-in duration-100">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span className="font-semibold">{crossStateAlert}</span>
          </div>
          <button
            onClick={() => setCrossStateAlert(null)}
            className="text-amber-700 hover:text-amber-900 font-bold text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

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
            Across 420 Secondary & Junior Schools (Lagos State)
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Average 13-Week Syllabus Pacing</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-blue-700 font-mono mt-2">
            94.8%
          </div>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">
            Aligned with Lagos Unified Scheme & OEQA matrix
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>OEQA Inspection Pass Rate</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-amber-600 font-mono mt-2">
            95.8%
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
            6 LEA Districts
          </div>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">
            Lagos State Education Districts I - VI
          </span>
        </div>
      </div>

      {/* Main View Switcher: Districts vs Schools */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-slate-700" />
              <h2 className="text-base font-bold text-slate-900">
                {activeTab === 'districts'
                  ? 'Lagos State Education Districts & LEA Telemetry'
                  : activeTab === 'schools'
                  ? 'Accredited Lagos State Secondary Institutions (RLS Protected)'
                  : activeTab === 'policies'
                  ? 'Statutory State Curriculum Policies & Institutional Mandates'
                  : activeTab === 'levy'
                  ? 'State Education Levy & OEQA Accreditation Tracker'
                  : activeTab === 'cpd'
                  ? 'Statewide Teacher CPD Certification Module'
                  : 'Civil Emergency Broadcast & Sovereign Direct API'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {activeTab === 'districts'
                ? 'Supervisory pacing, syllabus compliance, and Tutor-General oversight for Lagos State.'
                : activeTab === 'schools'
                ? 'Isolated school records showing faculty size, student body, and OEQA accreditation.'
                : activeTab === 'policies'
                ? 'Executive mandates governing statutory curriculum selection and public school restrictions.'
                : activeTab === 'levy'
                ? 'Real-time state education development levy and OEQA inspection fee tracking.'
                : activeTab === 'cpd'
                ? 'EKOEXCEL & TRCN accredited professional development cohorts across districts.'
                : 'Immediate ministry directive broadcast and direct syllabus push API integration.'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveTab('districts')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'districts' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              LEA Districts ({filteredDistricts.length})
            </button>
            <button
              onClick={() => setActiveTab('schools')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'schools' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Schools ({ministrySchools.length})
            </button>
            <button
              onClick={() => setActiveTab('policies')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'policies' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Policies ({policies.length})
            </button>
            <button
              onClick={() => setActiveTab('levy')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                activeTab === 'levy' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Coins className="w-3.5 h-3.5 text-amber-600" />
              <span>Levy Tracker</span>
            </button>
            <button
              onClick={() => setActiveTab('cpd')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                activeTab === 'cpd' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
              <span>CPD Module</span>
            </button>
            <button
              onClick={() => setActiveTab('broadcast')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                activeTab === 'broadcast' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-indigo-600" />
              <span>Broadcast &amp; Direct API</span>
            </button>
          </div>
        </div>

        {/* Filter Input and Region Protection Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="max-w-md w-full">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by school name, district, LGA, or Tutor-General..."
                className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
              />
            </div>
          </div>

          {/* Region Tabs (Showing Lagos Active, others Locked) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg shrink-0 overflow-x-auto">
            {['lagos', 'oyo', 'kano', 'fct', 'accra', 'western'].map((st) => {
              const isLocked = st !== 'lagos' && isStateIsolated;
              const isSelected = selectedState === st;
              return (
                <button
                  key={st}
                  onClick={() => handleStateTabClick(st)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md capitalize transition-colors flex items-center gap-1 ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : isLocked
                      ? 'text-slate-400 hover:text-slate-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title={isLocked ? `Cross-state access to ${st.toUpperCase()} is locked under RLS isolation` : undefined}
                >
                  {isLocked && <Lock className="w-2.5 h-2.5 text-slate-400" />}
                  <span>{st}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Table: Districts vs Schools */}
        {activeTab === 'districts' ? (
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
        ) : activeTab === 'schools' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-3">Institution Name</th>
                  <th className="py-3 px-3">LGA & Jurisdiction</th>
                  <th className="py-3 px-3">Tier</th>
                  <th className="py-3 px-3">Teaching Staff</th>
                  <th className="py-3 px-3">Student Body</th>
                  <th className="py-3 px-3">Scheme Compliance</th>
                  <th className="py-3 px-3 text-right">OEQA Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {filteredSchools.map((sch) => (
                  <tr key={sch.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-slate-900 block">{sch.name}</span>
                      <span className="text-[11px] text-slate-400">
                        Source: {sch.activeSource}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-semibold text-slate-800 block">{sch.lga}</span>
                      <span className="text-[11px] text-emerald-700 font-medium">Lagos State</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="capitalize px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                        {sch.b2bTier}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono tabular-nums text-slate-800 font-medium">
                      {sch.teachersCount} Faculty
                    </td>
                    <td className="py-3.5 px-3 font-mono tabular-nums text-slate-800 font-medium">
                      {sch.studentsCount} Students
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-emerald-600"
                            style={{ width: `${sch.compliancePct}%` }}
                          />
                        </div>
                        <span className="font-mono tabular-nums font-bold text-emerald-800">
                          {sch.compliancePct}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{sch.oeqaGrade}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeTab === 'policies' ? (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-emerald-950">
                  Lagos State Ministry Curriculum Policy Directives & Statutory Enforcement
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
                  Under the Lagos State Education Quality Assurance Regulations (Gazette LASG/MOE/OEQA/CIR/2026/04), public schools are mandated to use the Lagos State Unified Scheme of Work. Selection of the generic NERDC syllabus is restricted for public schools to guarantee standardized pacing across all 6 education districts.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {policies.map((pol) => {
                const isActive = pol.isActive === 1;
                let restrictedList: string[] = [];
                try {
                  restrictedList = JSON.parse(pol.restrictedSourceIds);
                } catch {
                  restrictedList = [pol.restrictedSourceIds];
                }

                return (
                  <div
                    key={pol.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-3 shadow-2xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                          isActive ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {isActive ? 'Mandate Active & Enforced' : 'Mandate Suspended'}
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          Ref: {pol.gazetteReference || 'LASG/MOE/OEQA/CIR/2026/04'}
                        </span>
                      </div>

                      <button
                        onClick={() => handleTogglePolicy(pol.id, pol.isActive)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                            : 'bg-emerald-600 text-white hover:bg-emerald-500'
                        }`}
                      >
                        {isActive ? 'Deactivate Mandate' : 'Activate Mandate'}
                      </button>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {pol.statutoryDirective || 'Lagos State Unified Scheme of Work Public School Mandate'}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        <strong>Issuing Authority:</strong> {pol.issuingAuthority}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-[11px]">
                      <span className="font-semibold text-slate-700">Mandated Curriculum:</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                        Lagos State Unified Scheme of Work
                      </span>

                      <span className="font-semibold text-slate-700 ml-2">Restricted Sources for Public Schools:</span>
                      {restrictedList.map((src: string) => (
                        <span key={src} className="px-2 py-0.5 rounded bg-rose-50 text-rose-800 font-bold border border-rose-200 uppercase">
                          {src}
                        </span>
                      ))}

                      <span className="text-slate-400 ml-auto">
                        Last Modified: {new Date(pol.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : activeTab === 'levy' ? (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Fiscal Year</span>
                <div className="text-xl font-black text-slate-900 mt-1">{levyData?.fiscalYear || '2026/2027'}</div>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-[11px] font-bold text-emerald-800 uppercase">Collected Levy</span>
                <div className="text-xl font-black text-emerald-900 font-mono mt-1">
                  ₦{((levyData?.collectedLevyNgn || 482500000) / 1_000_000).toFixed(2)}M
                </div>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-[11px] font-bold text-amber-800 uppercase">Outstanding Levy</span>
                <div className="text-xl font-black text-amber-900 font-mono mt-1">
                  ₦{((levyData?.outstandingLevyNgn || 38750000) / 1_000_000).toFixed(2)}M
                </div>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <span className="text-[11px] font-bold text-blue-800 uppercase">Compliant Schools</span>
                <div className="text-xl font-black text-blue-900 font-mono mt-1">
                  {levyData?.compliantSchoolsCount || 319} / {levyData?.totalAccreditedSchools || 348}
                </div>
              </div>
            </div>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">School</th>
                    <th className="py-2.5 px-3">LGA</th>
                    <th className="py-2.5 px-3">Levy Category</th>
                    <th className="py-2.5 px-3">Amount (NGN)</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(levyData?.records || []).map((rec: any, i: number) => (
                    <tr key={i}>
                      <td className="py-3 px-3 font-bold text-slate-900">{rec.schoolName}</td>
                      <td className="py-3 px-3 text-slate-600">{rec.lga}</td>
                      <td className="py-3 px-3 text-slate-700">{rec.levyCategory}</td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">₦{Number(rec.amountNgn).toLocaleString()}</td>
                      <td className="py-3 px-3 text-right">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${rec.status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {rec.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'cpd' ? (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-extrabold text-emerald-950">{cpdData?.stateProgram || 'EKOEXCEL & TRCN / OEQA Continuous Teacher Accreditation'}</h4>
                <p className="text-[11px] text-emerald-800 mt-0.5">Statewide certified faculty ratio: <strong>{cpdData?.certifiedTeachersPct || 86.4}%</strong></p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-bold">TRCN Linked</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(cpdData?.activeCohorts || []).map((coh: any) => (
                <div key={coh.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">{coh.credits} CPD Credits</span>
                    <span className="text-[10px] font-bold text-emerald-700">{coh.status}</span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-900">{coh.title}</h5>
                  <div className="text-[11px] text-slate-600 font-mono">
                    {coh.completed.toLocaleString()} / {coh.enrolled.toLocaleString()} teachers completed
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-150">
            <form onSubmit={handleDispatchBroadcast} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
                <Radio className="w-4 h-4 text-rose-600" />
                <span>Statewide Principal &amp; Teacher Emergency Broadcast</span>
              </div>
              <input
                type="text"
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800"
                required
              />
              <textarea
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                rows={3}
                className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                required
              />
              <button
                type="submit"
                disabled={isSendingBroadcast}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors"
              >
                {isSendingBroadcast ? 'Broadcasting...' : 'Dispatch Across All 6 Districts'}
              </button>
              {broadcastResult && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                  <strong>{broadcastResult.broadcastId}:</strong> Delivered to {broadcastResult.recipientCount?.toLocaleString()} educators via {(broadcastResult.dispatchedChannels || []).join(', ')}.
                </div>
              )}
            </form>

            <div className="p-5 rounded-2xl border border-indigo-200 bg-indigo-50/50 space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-950">
                <Terminal className="w-4 h-4 text-indigo-700" />
                <span>Sovereign Direct API Access (B2G Platinum)</span>
              </div>
              <p className="text-xs text-indigo-900 leading-relaxed">
                Push gazetted state syllabus amendments directly into every school&apos;s Lesson Plan Composer with cryptographic audit signing.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 text-emerald-300 font-mono text-[11px] overflow-x-auto">
                POST /api/ministry/curriculum-push{'\n'}
                Authorization: Bearer {'<STATE_PLATINUM_TOKEN>'}{'\n'}
                {`{"sourceId":"lagos_scheme","version":"2026.4"}`}
              </div>
            </div>
          </div>
        )}
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
