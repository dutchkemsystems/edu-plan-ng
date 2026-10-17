import React from 'react';
import { BarChart3, TrendingUp, AlertCircle, CheckCircle2, Calendar, Printer } from 'lucide-react';
import { DashboardStats } from '../types/index.ts';

interface ProgressPageProps {
  stats: DashboardStats | null;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({ stats }) => {
  const subjectsCoverage = [
    { name: 'Mathematics (JSS 1)', totalWeeks: 13, completed: 3, percentage: 23, status: 'On Track' },
    { name: 'Basic Science & Tech (JSS 1)', totalWeeks: 13, completed: 2, percentage: 15, status: 'Behind Schedule' },
    { name: 'General Mathematics (SSS 1)', totalWeeks: 13, completed: 3, percentage: 23, status: 'On Track' },
    { name: 'English Studies (JSS 1)', totalWeeks: 13, completed: 4, percentage: 31, status: 'Ahead of Schedule' },
    { name: 'Biology (SSS 1)', totalWeeks: 13, completed: 2, percentage: 15, status: 'Behind Schedule' },
    { name: 'Economics (SSS 1)', totalWeeks: 13, completed: 3, percentage: 23, status: 'On Track' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Curriculum Coverage Tracker</h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time syllabus progression against the Nigerian Federal Ministry of Education 13-week term calendar.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center gap-1.5 shadow-2xs"
        >
          <Printer className="w-4 h-4" />
          <span>Export Coverage Audit PDF</span>
        </button>
      </div>

      {/* Behind Schedule Alert Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900">
          <p className="font-bold">Term 1 Schedule Advisory:</p>
          <p className="mt-0.5 leading-relaxed">
            The school term is currently in <strong>Week 3</strong>. <em>Basic Science & Technology</em> and <em>Biology</em> are currently 1 week behind schedule for scheduled mid-term assessment readiness.
          </p>
        </div>
      </div>

      {/* Subject by Subject Coverage Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjectsCoverage.map((sub, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900">{sub.name}</h2>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  sub.status === 'Behind Schedule'
                    ? 'bg-rose-100 text-rose-800'
                    : sub.status === 'Ahead of Schedule'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {sub.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>{sub.completed} of {sub.totalWeeks} Weeks Covered</span>
              <span className="font-bold text-gray-900">{sub.percentage}%</span>
            </div>

            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  sub.status === 'Behind Schedule'
                    ? 'bg-amber-500'
                    : 'bg-emerald-600'
                }`}
                style={{ width: `${sub.percentage}%` }}
              />
            </div>

            <div className="grid grid-cols-13 gap-1 pt-1">
              {Array.from({ length: 13 }).map((_, wIdx) => {
                const isCovered = wIdx < sub.completed;
                const isCurrent = wIdx === 2;
                return (
                  <div
                    key={wIdx}
                    title={`Week ${wIdx + 1}`}
                    className={`h-5 rounded-xs text-[9px] font-bold flex items-center justify-center ${
                      isCovered
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-amber-300 text-amber-950 ring-1 ring-amber-500'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {wIdx + 1}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
