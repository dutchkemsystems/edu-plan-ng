import React, { useState } from 'react';
import {
  FileText,
  PlusCircle,
  Search,
  Filter,
  Copy,
  Trash2,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Calendar,
  Share2
} from 'lucide-react';
import { LessonPlan } from '../types/index.ts';

interface LessonPlansListProps {
  plans: LessonPlan[];
  onSelectPlan: (id: string) => void;
  onCreateNew: () => void;
  onDuplicatePlan: (id: string) => void;
  onDeletePlan: (id: string) => void;
}

export const LessonPlansList: React.FC<LessonPlansListProps> = ({
  plans,
  onSelectPlan,
  onCreateNew,
  onDuplicatePlan,
  onDeletePlan,
}) => {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = plans.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.subject.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === 'all' || p.level === levelFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesLevel && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Lesson Plans Library</h1>
          <p className="text-xs text-gray-500 mt-1">
            Browse, manage, duplicate, and export your weekly NERDC lesson plans.
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all hover:scale-105 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Lesson Plan</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search plans by title or subject..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="text-xs font-medium px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
          >
            <option value="all">All Levels</option>
            <option value="jss-1">JSS 1</option>
            <option value="jss-2">JSS 2</option>
            <option value="jss-3">JSS 3</option>
            <option value="sss-1">SSS 1</option>
            <option value="sss-2">SSS 2</option>
            <option value="sss-3">SSS 3</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-medium px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Plans List Table / Grid */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-xs text-gray-400">
            No lesson plans found matching your search criteria.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map((plan) => (
              <div
                key={plan.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50/70 transition-colors"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{plan.title}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                        plan.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {plan.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span className="font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">
                      {plan.level.toUpperCase()}
                    </span>
                    <span>{plan.subject}</span>
                    <span>•</span>
                    <span>Term {plan.term}</span>
                    <span>•</span>
                    <span>Week {plan.week}</span>
                    <span>•</span>
                    <span>{plan.duration}</span>
                    <span>•</span>
                    <span>Updated {new Date(plan.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onDuplicatePlan(plan.id)}
                    className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeletePlan(plan.id)}
                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onSelectPlan(plan.id)}
                    className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>Edit Plan</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
