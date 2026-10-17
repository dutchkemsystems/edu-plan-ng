import React from 'react';
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
  Download
} from 'lucide-react';
import { DashboardStats, LessonPlan, TeacherUser } from '../types/index.ts';
import { AppLanguage, translations } from '../lib/i18n.ts';

interface DashboardPageProps {
  stats: DashboardStats | null;
  plans: LessonPlan[];
  user: TeacherUser | null;
  currentLang: AppLanguage;
  onNavigate: (route: string) => void;
  onSelectPlan: (id: string) => void;
  onDuplicatePlan: (id: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  stats,
  plans,
  user,
  currentLang,
  onNavigate,
  onSelectPlan,
  onDuplicatePlan,
}) => {
  const t = translations[currentLang];

  const sub = stats?.subscription;
  const daysRemaining = sub?.daysRemaining || 320;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner: Teacher Welcome & Academic Status */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/30 text-xs font-semibold text-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Nigerian NERDC 2026 Curriculum Standard</span>
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
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-700/60 hover:bg-emerald-700 border border-emerald-500/40 text-white transition-colors"
            >
              <CalendarCheck2 className="w-4 h-4 text-amber-300" />
              <span>{t.generateScheme}</span>
            </button>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      </div>

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
          onClick={() => onNavigate('assessments')}
          className="p-3.5 bg-white rounded-2xl border border-gray-200/80 hover:border-emerald-500 shadow-2xs hover:shadow-xs transition-all text-left group"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Award className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-gray-900 group-hover:text-amber-700 transition-colors">WAEC / BECE Exams</p>
          <p className="text-[10px] text-gray-500 mt-0.5">Objective & essay marking keys</p>
        </button>

        <button
          onClick={() => onNavigate('grades')}
          className="p-3.5 bg-white rounded-2xl border border-gray-200/80 hover:border-emerald-500 shadow-2xs hover:shadow-xs transition-all text-left group"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Download className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-gray-900 group-hover:text-purple-700 transition-colors">Broadsheet & Reports</p>
          <p className="text-[10px] text-gray-500 mt-0.5">WAEC A1-F9 grade rankings</p>
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

        {/* Subscription Card with Days Remaining */}
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-6 rounded-2xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Active Membership
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Pro Annual
              </span>
            </div>

            <div className="mt-4">
              <div className="text-3xl font-extrabold">{daysRemaining}</div>
              <p className="text-xs text-slate-300 mt-0.5">Days remaining in your annual license</p>
            </div>

            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Unlimited lesson plan creation, 1-click Scheme of Work generator, and WAEC/BECE exam builder unlocked.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-400">Paid via Kora Pay</span>
            <button
              onClick={() => onNavigate('pricing')}
              className="text-xs font-bold text-white underline hover:text-emerald-300"
            >
              Manage Plan
            </button>
          </div>
        </div>
      </div>

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
          {plans.slice(0, 4).map((plan) => (
            <div
              key={plan.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/60 rounded-xl px-2 transition-colors"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
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
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-1">
                  <span className="font-semibold text-gray-700">{plan.level.toUpperCase()}</span>
                  <span>•</span>
                  <span>{plan.subject}</span>
                  <span>•</span>
                  <span>Week {plan.week}</span>
                  <span>•</span>
                  <span>Updated {new Date(plan.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
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
