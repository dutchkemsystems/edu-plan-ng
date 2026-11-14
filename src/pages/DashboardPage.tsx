import React, { useState } from 'react';
import {
  FileText,
  Clock,
  BookmarkCheck,
  Flame,
  PieChart,
  CalendarCheck2,
  Sparkles,
  ArrowRight,
  PlusCircle,
  Copy,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Award,
  Download,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  Lock,
  Layers,
  Users,
  BookMarked
} from 'lucide-react';
import { DashboardStats, LessonPlan, TeacherUser } from '../types/index.ts';
import { AppLanguage, translations } from '../lib/i18n.ts';
import { resolveClientTierSummary } from '../config/pricing.ts';
import { getAuthHeaders } from '../lib/api.ts';
import { SubjectComplianceCard } from '../components/SubjectComplianceCard.tsx';
import { EduPollLiveChecker } from '../components/EduPollLiveChecker.tsx';
import { CurriculumSourceSelector } from '../components/CurriculumSourceSelector.tsx';

interface DashboardPageProps {
  stats: DashboardStats | null;
  plans: LessonPlan[];
  user: TeacherUser | null;
  currentLang: AppLanguage;
  onNavigate: (route: string) => void;
  onSelectPlan: (id: string) => void;
  onDuplicatePlan: (id: string) => void;
  onOpenUpgrade?: (message: string, requiredTier?: string, title?: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  stats,
  plans,
  user,
  currentLang,
  onNavigate,
  onSelectPlan,
  onDuplicatePlan,
  onOpenUpgrade,
}) => {
  const t = translations[currentLang];

  const tierSummary = resolveClientTierSummary(user, stats);
  const ent = tierSummary.config;
  const daysRemaining = tierSummary.daysRemaining;

  const [localPlans, setLocalPlans] = useState<LessonPlan[]>(plans);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const [regeneratedNotice, setRegeneratedNotice] = useState<string | null>(null);
  const [selectedCurriculumSource, setSelectedCurriculumSource] = useState<string>(() => {
    return localStorage.getItem('eduplan_curriculum_source') || 'lagos_scheme';
  });

  // Sync props to localPlans if plans prop changes
  React.useEffect(() => {
    setLocalPlans(plans);
  }, [plans]);

  const handleRegeneratePlan = async (planId: string) => {
    setRegeneratingId(planId);
    try {
      const res = await fetch(`/api/lesson-plans/${planId}/regenerate`, {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        const updatedVer = data.lessonPlan?.curriculumVersion || 'Curriculum v1.3';
        setRegeneratedNotice(`Successfully re-aligned lesson plan to ${updatedVer}! Textbook citation and behavioral objectives updated.`);
        setLocalPlans((prev) =>
          prev.map((p) =>
            p.id === planId
              ? {
                  ...p,
                  isOutdated: false,
                  curriculumVersion: updatedVer,
                  latestCurriculumVersion: updatedVer,
                  outdatedReason: undefined,
                  recommendedTextbook: data.lessonPlan?.recommendedTextbook || p.recommendedTextbook,
                }
              : p
          )
        );
        setTimeout(() => setRegeneratedNotice(null), 6000);
      } else {
        const err = await res.json().catch(() => ({}));
        if ((res.status === 403 || res.status === 429) && onOpenUpgrade) {
          onOpenUpgrade(err.error || 'Subscription quota or tier restriction reached.', err.requiredTier);
        }
      }
    } catch (err) {
      console.error('Failed to regenerate plan:', err);
    } finally {
      setRegeneratingId(null);
    }
  };

  const outdatedPlans = localPlans.filter((p) => p.isOutdated === true || (p as any).status === 'outdated');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner: Teacher Welcome & Academic Status */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/30 text-xs font-semibold text-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Lagos State Unified Scheme of Work & NERDC Standard • Auto-Sync Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Good day, {user?.name || 'Mrs. Amina Balogun'} 👋
            </h1>
            <p className="text-sm text-emerald-100/90 max-w-xl leading-relaxed">
              {user?.schoolName || 'King\'s College, Lagos'} • Term 1 syllabus coverage is currently at{' '}
              <strong className="text-white font-bold">{stats?.curriculumCoverage || 24}%</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('lesson-plans-new')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-emerald-950 hover:bg-emerald-50 shadow-md transition-all hover:scale-105"
            >
              <PlusCircle className="w-4 h-4 text-emerald-700" />
              <span>{t.createPlan}</span>
            </button>
            <button
              onClick={() => onNavigate('schemes')}
              aria-label="Generate 13-Week Scheme of Work"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-700/60 hover:bg-emerald-700 border border-emerald-500/40 text-white transition-colors"
            >
              <CalendarCheck2 className="w-4 h-4 text-amber-300" />
              <span>{t.generateScheme || 'Generate Scheme of Work'}</span>
            </button>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      </div>

      {/* PHASE 1: Multi-Source Curriculum Registry & Transformative Legal Notice */}
      <CurriculumSourceSelector
        currentSourceId={selectedCurriculumSource}
        tierKey={`${tierSummary.tierId}_${user?.schoolId || ''}`}
        onOpenPricing={() => onNavigate('pricing')}
        onSourceChange={(sourceId) => setSelectedCurriculumSource(sourceId)}
      />

      {/* Regeneration Success Notice */}
      {regeneratedNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs font-semibold text-emerald-950 flex items-center gap-2 shadow-2xs animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{regeneratedNotice}</span>
        </div>
      )}

      {/* PHASE 4: Government Curriculum Revision & Version Cascade Alert */}
      {outdatedPlans.length > 0 && (
        <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-3xl p-5 sm:p-6 text-amber-950 shadow-sm animate-in fade-in duration-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-950 border border-amber-300">
                    Government Curriculum Revision
                  </span>
                  <span className="text-xs font-bold text-amber-800">
                    NERDC Abuja & Lagos State OEQA Alausa Approved
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                  Your lesson plan for {outdatedPlans[0].level.toUpperCase()} {outdatedPlans[0].subject} Week {outdatedPlans[0].week} uses Curriculum {outdatedPlans[0].curriculumVersion || 'v1.2'}. Curriculum {outdatedPlans[0].latestCurriculumVersion || 'v1.3'} is now approved. Regenerate now?
                </h3>
                <p className="text-xs text-amber-900/80 leading-relaxed max-w-3xl">
                  {outdatedPlans[0].outdatedReason || 'Official gazette update: statutory topic, instructional realia, and recommended textbook edition have been updated.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
              <button
                onClick={() => handleRegeneratePlan(outdatedPlans[0].id)}
                disabled={regeneratingId === outdatedPlans[0].id}
                className="px-4 py-2.5 text-xs font-extrabold text-white bg-amber-600 hover:bg-amber-700 active:scale-95 rounded-xl shadow-sm transition-all flex items-center gap-2"
              >
                {regeneratingId === outdatedPlans[0].id ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Regenerating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>Regenerate Now ({outdatedPlans[0].latestCurriculumVersion || 'v1.3'})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nigerian Teacher Power Tools Quick Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => onNavigate('lesson-plans-new')}
          className="p-3.5 bg-white rounded-2xl border border-gray-200/80 hover:border-emerald-500 shadow-2xs hover:shadow-xs transition-all text-left group"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <FileText className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">Lesson Plans & Notes</p>
          <p className="text-[10px] text-gray-500 mt-0.5">Bloom's & chalkboard copies</p>
        </button>

        <button
          onClick={() => onNavigate('schemes')}
          className="p-3.5 bg-white rounded-2xl border border-gray-200/80 hover:border-emerald-500 shadow-2xs hover:shadow-xs transition-all text-left group"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <CalendarCheck2 className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-gray-900 group-hover:text-blue-700 transition-colors">13-Week Schemes</p>
          <p className="text-[10px] text-gray-500 mt-0.5">1-click NERDC term builder</p>
        </button>

        <button
          onClick={() => {
            if (!ent.hasExamGen && onOpenUpgrade) {
              onOpenUpgrade(
                'WAEC/NECO/BECE Exam & Marking Scheme Generators require Pro Teacher (Termly ₦1,500 / Session ₦3,000) or B2B School Silver/Gold.',
                tierSummary.category === 'b2b' ? 'b2b_silver' : 'b2c_termly',
                'Exam Generator Locked'
              );
            } else {
              onNavigate('assessments');
            }
          }}
          className="p-3.5 bg-white rounded-2xl border border-gray-200/80 hover:border-emerald-500 shadow-2xs hover:shadow-xs transition-all text-left group relative"
        >
          {!ent.hasExamGen && (
            <span className="absolute top-2.5 right-2.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-0.5">
              <Lock className="w-2.5 h-2.5" />
              <span>{tierSummary.category === 'b2b' ? 'Silver+' : 'Termly+'}</span>
            </span>
          )}
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Award className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-gray-900 group-hover:text-amber-700 transition-colors">WAEC / BECE Exams</p>
          <p className="text-[10px] text-gray-500 mt-0.5">Objective &amp; essay marking keys</p>
        </button>

        <button
          onClick={() => onNavigate('grades')}
          className="p-3.5 bg-white rounded-2xl border border-gray-200/80 hover:border-emerald-500 shadow-2xs hover:shadow-xs transition-all text-left group relative"
        >
          {!ent.hasReportCardAi && (
            <span className="absolute top-2.5 right-2.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
              AI Locked
            </span>
          )}
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Download className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-gray-900 group-hover:text-purple-700 transition-colors">Broadsheet &amp; Reports</p>
          <p className="text-[10px] text-gray-500 mt-0.5">
            {ent.hasReportCardAi ? 'WAEC A1-F9 & Report Card AI' : 'Broadsheet ledger (Upgrade for AI)'}
          </p>
        </button>
      </div>

      {/* 4 Core Stat Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Lessons Completed */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>Lessons Completed</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-gray-900">{stats?.lessonsCompleted ?? 3}</div>
            <p className="text-[11px] text-gray-500 mt-0.5">
              {stats?.draftLessons ?? 1} in draft • {stats?.totalPlans ?? 4} total created
            </p>
          </div>
        </div>

        {/* Total Hours Planned */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>Hours Planned</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-gray-900">{stats?.hoursPlanned ?? '2.8'}h</div>
            <p className="text-[11px] text-gray-500 mt-0.5">Standard 40m/80m Nigerian periods</p>
          </div>
        </div>

        {/* Saved Teaching Resources */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>Teaching Resources</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <BookmarkCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-gray-900">{stats?.savedResources ?? 3}</div>
            <p className="text-[11px] text-gray-500 mt-0.5">Syllabi, past questions & slides</p>
          </div>
        </div>

        {/* Daily Streak & Gamification */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>Daily Streak</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-gray-900 flex items-center gap-1.5">
              <span>{stats?.currentStreak ?? 5}</span>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">Days</span>
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>Bronze Planning Badge</span>
            </p>
          </div>
        </div>
      </div>

      {/* Middle Row: Curriculum Coverage Progress + Next Scheduled Lesson + Subscription Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Curriculum Coverage Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900">Term 1 Curriculum Coverage</h2>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {stats?.curriculumCoverage ?? 23}%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Based on JSS 1–3 & SSS 1–3 13-week NERDC syllabus progression.
            </p>

            <div className="w-full bg-gray-100 h-3 rounded-full mt-4 overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${stats?.curriculumCoverage ?? 23}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs mt-4 pt-4 border-t border-gray-100">
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-bold">Week 1–4</p>
                <p className="font-extrabold text-emerald-700">Covered</p>
              </div>
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-bold">Week 5–7</p>
                <p className="font-extrabold text-amber-600">In Progress</p>
              </div>
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-bold">Week 8–13</p>
                <p className="font-extrabold text-gray-400">Scheduled</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('progress')}
            className="w-full mt-4 py-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 rounded-xl flex items-center justify-center gap-1 transition-colors"
          >
            <span>View Detailed Subject Breakdown</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Next Scheduled Lesson Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900">Next Scheduled Lesson</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                Period 2 Today
              </span>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 space-y-1.5">
              <p className="text-xs font-bold text-gray-900 line-clamp-1">
                {stats?.nextScheduledLesson?.title || 'Whole Numbers: Place Value and Large Digits'}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-gray-600">
                <span className="font-semibold text-emerald-700">
                  {stats?.nextScheduledLesson?.level || 'JSS 1'}
                </span>
                <span>•</span>
                <span>{stats?.nextScheduledLesson?.subject || 'Mathematics'}</span>
                <span>•</span>
                <span>{stats?.nextScheduledLesson?.duration || '40 mins'}</span>
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-500 space-y-1">
              <p className="flex items-center gap-1 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>NERDC behavioral objectives verified</span>
              </p>
              <p className="flex items-center gap-1 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Differentiated instruction matrix prepared</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectPlan(plans[0]?.id || 'lp_sample_01')}
            className="w-full mt-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl flex items-center justify-center gap-1 transition-colors"
          >
            <span>Open Lesson Plan in Composer</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subscription Card with Real Active Tier, Days Remaining & Segment */}
        <div
          className={`text-white p-6 rounded-2xl shadow-xs flex flex-col justify-between ${
            tierSummary.category === 'b2g'
              ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950'
              : tierSummary.tierId === 'b2b_gold'
              ? 'bg-gradient-to-br from-slate-900 via-amber-950 to-slate-950'
              : 'bg-gradient-to-br from-slate-900 to-emerald-950'
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                {tierSummary.segmentLabel}
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {ent.name} • {ent.priceDisplay}
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <div className="text-3xl font-extrabold">{daysRemaining}</div>
              <p className="text-xs text-slate-300">
                Days remaining ({ent.billingCycle.replace('_', ' ')})
              </p>
            </div>

            <div className="mt-3 space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">AI Quota:</span>
                <span className="font-bold text-white">
                  {tierSummary.maxGenerationsTotal !== null
                    ? `${tierSummary.totalGenerated} / ${tierSummary.maxGenerationsTotal} total`
                    : `${tierSummary.usedToday} / ${tierSummary.dailyFairUseCap} today`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Curriculum Sources:</span>
                <span className="font-bold text-emerald-300">{ent.allowedSourcesCount} of 6 unlocked</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Library &amp; Export:</span>
                <span className="font-bold text-white">
                  {!ent.hasLibrarySaving
                    ? '0 Saves (Draft Watermark)'
                    : tierSummary.maxSavedLibraryNotes > 0
                    ? `${tierSummary.savedNotesCount}/${tierSummary.maxSavedLibraryNotes} Saves • Clean`
                    : 'Unlimited • Clean PDF/Doc'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-400">
              {tierSummary.isExpired ? 'Plan Expired (Trial Fallback)' : 'Active via Kora Pay'}
            </span>
            <button
              onClick={() => onNavigate('pricing')}
              className="text-xs font-bold text-white underline hover:text-emerald-300"
            >
              {tierSummary.tierId === 'b2g_state_platinum' ? 'Manage License' : 'Upgrade / Manage'}
            </button>
          </div>
        </div>
      </div>

      {/* Subscription Quotas & Service Matrix Enforced for Active Segment */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-extrabold text-gray-900">
                Your Plan Entitlements, Quotas &amp; Service Access ({ent.name})
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {tierSummary.segmentLabel} — Live feature access strictly synchronized with your active subscription tier.
            </p>
          </div>
          <button
            onClick={() => onNavigate('pricing')}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors self-start sm:self-auto"
          >
            Compare &amp; Upgrade Tiers
          </button>
        </div>

        {/* 4 Quota Progress Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center justify-between text-slate-500 font-semibold">
              <span>AI Generations</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="text-base font-black text-slate-900">
              {tierSummary.maxGenerationsTotal !== null
                ? `${tierSummary.totalGenerated} / ${tierSummary.maxGenerationsTotal} Total`
                : `${tierSummary.usedToday} / ${tierSummary.dailyFairUseCap} Today`}
            </div>
            <p className="text-[10px] text-slate-500">
              {tierSummary.maxGenerationsTotal !== null
                ? `Daily cap: ${tierSummary.dailyFairUseCap}/day`
                : 'Unlimited total (Fair Use cap)'}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center justify-between text-slate-500 font-semibold">
              <span>Library Saving</span>
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-base font-black text-slate-900">
              {!ent.hasLibrarySaving
                ? 'Locked (0 Saves)'
                : tierSummary.maxSavedLibraryNotes < 0
                ? 'Unlimited Notes'
                : `${tierSummary.savedNotesCount} / ${tierSummary.maxSavedLibraryNotes} Saved`}
            </div>
            <p className="text-[10px] text-slate-500">
              {ent.hasDraftWatermark ? 'Exports carry DRAFT watermark' : 'Clean official PDF/Word export'}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center justify-between text-slate-500 font-semibold">
              <span>Curriculum Sources</span>
              <BookMarked className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="text-base font-black text-slate-900">
              {ent.allowedSourcesCount} / 6 Active
            </div>
            <p className="text-[10px] text-slate-500">{ent.sourceAccessSummary}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center justify-between text-slate-500 font-semibold">
              <span>Teacher Seats</span>
              <Users className="w-3.5 h-3.5 text-purple-600" />
            </div>
            <div className="text-base font-black text-slate-900">
              {ent.maxTeachers < 0 ? 'Unlimited Seats' : `${ent.maxTeachers} ${ent.maxTeachers === 1 ? 'Teacher' : 'Teachers'}`}
            </div>
            <p className="text-[10px] text-slate-500">
              {tierSummary.category === 'b2g'
                ? 'Statewide public & private seats'
                : tierSummary.category === 'b2b'
                ? 'School staff directory allocation'
                : 'Single individual license'}
            </p>
          </div>
        </div>

        {/* Clickable Service Status Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
          {[
            {
              label: 'Lesson Plans & Notes',
              enabled: true,
              route: 'lesson-plans',
              reqTier: 'b2c_trial_5day',
              desc: ent.hasDraftWatermark ? 'Draft watermark active' : 'Clean NERDC & Lagos exports',
            },
            {
              label: '13-Wk Bulk Portfolio Export',
              enabled: ent.hasBulkExports,
              route: 'lesson-plans',
              reqTier: tierSummary.category === 'b2b' ? 'b2b_bronze' : 'b2c_termly',
              desc: ent.hasBulkExports ? '13-week scheme & Word pack ready' : 'Requires Termly+ or School Bronze+',
            },
            {
              label: 'WAEC / NECO Exam AI',
              enabled: ent.hasExamGen,
              route: 'assessments',
              reqTier: tierSummary.category === 'b2b' ? 'b2b_silver' : 'b2c_termly',
              desc: ent.hasExamGen ? 'Predictor & AI script grader active' : 'Requires Termly+ or School Silver+',
            },
            {
              label: 'Report Card AI Comments',
              enabled: ent.hasReportCardAi,
              route: 'grades',
              reqTier: tierSummary.category === 'b2b' ? 'b2b_silver' : 'b2c_termly',
              desc: ent.hasReportCardAi ? 'A1–F9 automated parent remarks' : 'Requires Termly+ or School Silver+',
            },
            {
              label: 'Parent WhatsApp Autopilot',
              enabled: ent.hasParentAutopilot,
              route: 'parent-comms',
              reqTier: tierSummary.category === 'b2b' ? 'b2b_silver' : 'b2c_termly',
              desc: ent.hasParentAutopilot ? 'WhatsApp broadcasts & PTA alerts' : 'Requires Termly+ or School Silver+',
            },
            {
              label: 'Timetable AI & SEN IEPs',
              enabled: ent.hasTimetableAi && ent.hasSenSupport,
              route: 'timetable',
              reqTier: 'b2b_silver',
              desc: ent.hasTimetableAi ? 'Conflict-free scheduler + 3-Tier SEN' : 'Requires School Silver (₦120k) or Gold',
            },
            {
              label: '3D / 4K STEM & LMS Export',
              enabled: ent.has3DAccess && ent.has4KAccess && ent.hasLmsExport,
              route: 'stem-lab',
              reqTier: 'b2b_gold',
              desc: ent.has3DAccess ? 'WebGL 3D, 4K streams & Classroom LMS' : 'Exclusive to Gold (₦250k) & B2G',
            },
            {
              label: 'Principal Heatmap & Fee Recovery',
              enabled: ent.hasPrincipalHeatmap && ent.hasFeeRecovery,
              route: 'admin',
              reqTier: 'b2b_gold',
              desc: ent.hasPrincipalHeatmap ? 'School audit heatmap & arrears engine' : 'Exclusive to Gold (₦250k) & B2G',
            },
            {
              label: 'Ministry Command, Levy & CPD',
              enabled: ent.hasMinistryDashboard && ent.hasStateLevyTracker && ent.hasCpdModule,
              route: 'ministry',
              reqTier: 'b2g_state_platinum',
              desc: ent.hasMinistryDashboard ? 'Policy mandate, levy & emergency SMS' : 'Exclusive to B2G Ministry Platinum',
            },
          ].map((svc) => (
            <button
              key={svc.label}
              type="button"
              onClick={() => {
                if (svc.enabled) {
                  onNavigate(svc.route);
                } else if (onOpenUpgrade) {
                  onOpenUpgrade(`${svc.label}: ${svc.desc}`, svc.reqTier, `${svc.label} Locked`);
                } else {
                  onNavigate('pricing');
                }
              }}
              className={`p-3 rounded-xl border text-left transition-all flex items-start justify-between gap-2 ${
                svc.enabled
                  ? 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-400'
                  : 'bg-slate-50/80 border-slate-200 hover:border-amber-400 opacity-90'
              }`}
            >
              <div className="min-w-0">
                <p className="font-bold text-slate-900 truncate">{svc.label}</p>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{svc.desc}</p>
              </div>
              {svc.enabled ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* EduPoll Live Checker: Diagnostic Class Clicker */}
      <EduPollLiveChecker onNavigateToFullPoll={() => onNavigate('live-poll')} />

      {/* Phase 2: Subject Compliance & Approved Textbooks Widget */}
      <SubjectComplianceCard
        initialLevel={stats?.nextScheduledLesson?.level?.toLowerCase()?.replace(' ', '-') || 'sss-1'}
        initialSubject={stats?.nextScheduledLesson?.subject || 'Biology'}
        onNavigateToComposer={(level, subject) => onNavigate('lesson-plans-new')}
      />

      {/* Activity Heatmap (GitHub-style) for Nigerian Academic Term */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Term 1 Planning Activity Heatmap</h2>
            <p className="text-xs text-gray-500">
              Daily preparation, curriculum browsing, and lesson plan editing activity over the past 12 weeks.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-xs bg-gray-100" />
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-200" />
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-400" />
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600" />
            <span>More</span>
          </div>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[640px]">
            {stats?.heatmap?.map((item, idx) => {
              const count = item.count;
              const bg =
                count === 0
                  ? 'bg-gray-100'
                  : count === 1
                  ? 'bg-emerald-200'
                  : count === 2
                  ? 'bg-emerald-400'
                  : 'bg-emerald-600';
              return (
                <div
                  key={idx}
                  title={`${item.date}: ${count} activity items recorded`}
                  className={`w-3.5 h-3.5 rounded-xs ${bg} transition-transform hover:scale-125 cursor-pointer`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Lesson Plans List */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Recent Lesson Plans</h2>
            <p className="text-xs text-gray-500">Live records from your school database</p>
          </div>
          <button
            onClick={() => onNavigate('lesson-plans')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All ({plans.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {localPlans.slice(0, 4).map((plan) => (
            <div
              key={plan.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/60 rounded-xl px-2 transition-colors"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-gray-900 line-clamp-1">{plan.title}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.2 rounded-full capitalize ${
                      plan.status === 'published'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {plan.status}
                  </span>
                  {plan.isOutdated ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                      <span>⚠️ OUTDATED</span>
                      <span className="opacity-75 font-normal">({plan.curriculumVersion || 'v1.0'} → {plan.latestCurriculumVersion || 'v1.3'})</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      Curriculum {plan.curriculumVersion || 'v1.2'}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500 mt-1">
                  <span className="font-semibold text-gray-700">{plan.level.toUpperCase()}</span>
                  <span>•</span>
                  <span>{plan.subject}</span>
                  <span>•</span>
                  <span>Week {plan.week}</span>
                  <span>•</span>
                  <span>Updated {new Date(plan.updatedAt).toLocaleDateString()}</span>
                  {plan.recommendedTextbook && (
                    <>
                      <span>•</span>
                      <span className="text-slate-600 truncate max-w-[200px]" title={plan.recommendedTextbook.title}>
                        📖 {plan.recommendedTextbook.title}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {plan.isOutdated && (
                  <button
                    onClick={() => handleRegeneratePlan(plan.id)}
                    disabled={regeneratingId === plan.id}
                    className="px-2.5 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg flex items-center gap-1 shadow-2xs transition-colors"
                    title="Regenerate to latest approved curriculum"
                  >
                    {regeneratingId === plan.id ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    <span>Regenerate</span>
                  </button>
                )}
                <button
                  onClick={() => onDuplicatePlan(plan.id)}
                  className="px-2.5 py-1.5 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg flex items-center gap-1 font-semibold"
                  title="Duplicate Plan"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Duplicate</span>
                </button>
                <button
                  onClick={() => onSelectPlan(plan.id)}
                  className="px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg flex items-center gap-1"
                >
                  <span>Edit in Composer</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
