import React, { useState } from 'react';
import { Clock, Users, Printer, Plus, AlertTriangle, CheckCircle2, UserCheck, UserX, Lock, Sparkles, RefreshCw } from 'lucide-react';
import { TeacherUser, DashboardStats } from '../types/index.ts';
import { resolveClientTierSummary } from '../config/pricing.ts';
import { getAuthHeaders } from '../lib/api.ts';

interface TimetablePageProps {
  user?: TeacherUser | null;
  stats?: DashboardStats | null;
  onOpenUpgrade?: (msg: string, tier?: string, title?: string) => void;
}

export const TimetablePage: React.FC<TimetablePageProps> = ({
  user,
  stats,
  onOpenUpgrade,
}) => {
  const tierSummary = resolveClientTierSummary(user, stats);
  const ent = tierSummary.config;
  const [activeTab, setActiveTab] = useState<'timetable' | 'attendance'>(
    ent.hasTimetableAi ? 'timetable' : 'attendance'
  );
  const [aiLevel, setAiLevel] = useState('JSS 1');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiNotice, setAiNotice] = useState<string | null>(null);
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');

  // Timetable state
  const periods = [
    'Period 1 (8:00 - 8:40 AM)',
    'Period 2 (8:40 - 9:20 AM)',
    'Period 3 (9:20 - 10:00 AM)',
    'BREAK (10:00 - 10:30 AM)',
    'Period 4 (10:30 - 11:10 AM)',
    'Period 5 (11:10 - 11:50 AM)',
    'Period 6 (11:50 - 12:30 PM)',
    'LUNCH (12:30 - 1:10 PM)',
    'Period 7 (1:10 - 1:50 PM)',
    'Period 8 (1:50 - 2:30 PM)',
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const [schedule, setSchedule] = useState<Record<string, string>>({
    'Monday-0': 'MTH (JSS 1A)',
    'Monday-1': 'ENG (JSS 1A)',
    'Monday-2': 'BST (JSS 1B)',
    'Monday-4': 'CVE (JSS 1A)',
    'Monday-5': 'MTH (JSS 2B)',
    'Tuesday-0': 'BST (JSS 1A)',
    'Tuesday-1': 'BST (JSS 1A) - Lab',
    'Tuesday-4': 'MTH (JSS 1A)',
    'Wednesday-0': 'ENG (JSS 1A)',
    'Wednesday-1': 'MTH (JSS 1A)',
    'Wednesday-4': 'CVE (JSS 1A)',
    'Thursday-0': 'MTH (JSS 1A)',
    'Thursday-1': 'BST (JSS 1A)',
    'Friday-0': 'ENG (JSS 1A)',
    'Friday-1': 'MTH Quiz (JSS 1A)',
  });

  const handleGenerateAiTimetable = async () => {
    if (!ent.hasTimetableAi) {
      onOpenUpgrade?.(
        'Clash-Free Timetable AI is available starting on B2B Silver (₦120,000/term) and B2B Gold (₦250,000/term).',
        'b2b_silver',
        'Clash-Free Timetable AI'
      );
      return;
    }
    setAiGenerating(true);
    setAiNotice(null);
    try {
      const res = await fetch('/api/timetable/generate-ai', {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify({
          level: aiLevel,
          subjects: ['Mathematics', 'English Studies', 'Basic Science', 'Civic Education', 'Business Studies', 'Agricultural Science'],
          periodsPerDay: 8,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 403 || res.status === 429) {
          onOpenUpgrade?.(data?.error || data?.message || 'Timetable AI requires B2B Silver or Gold.', data?.requiredTier || 'b2b_silver', 'Timetable AI');
        } else {
          setAiNotice(data?.error || 'Could not generate AI timetable.');
        }
        return;
      }
      if (data.success && Array.isArray(data.schedule)) {
        const nextMap: Record<string, string> = {};
        const teachingRowIndices = [0, 1, 2, 4, 5, 6, 8, 9];
        data.schedule.forEach((dayObj: any) => {
          const dayName = dayObj.day;
          const teachingSlots = (dayObj.slots || []).filter((s: any) => !s.isBreak);
          teachingSlots.forEach((slot: any, idx: number) => {
            const pIdx = teachingRowIndices[idx];
            if (pIdx !== undefined && slot.subject) {
              nextMap[`${dayName}-${pIdx}`] = `${slot.subject} (${aiLevel})`;
            }
          });
        });
        setSchedule(nextMap);
        setAiNotice(`Clash-free ${aiLevel} weekly timetable generated (${data.generatedBy || 'Timetable AI Engine'}).`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAiGenerating(false);
    }
  };

  // Attendance state
  const [students, setStudents] = useState([
    { id: 1, name: 'Chukwuebuka Okonkwo', reg: 'KC/041', status: 'present' },
    { id: 2, name: 'Fatima Abubakar', reg: 'KC/042', status: 'present' },
    { id: 3, name: 'Babatunde Adeleke', reg: 'KC/043', status: 'present' },
    { id: 4, name: 'Grace Nnamdi', reg: 'KC/044', status: 'absent' },
    { id: 5, name: 'Yakubu Danjuma', reg: 'KC/045', status: 'present' },
    { id: 6, name: 'Zainab Bello', reg: 'KC/046', status: 'present' },
    { id: 7, name: 'Emeka Eze', reg: 'KC/047', status: 'present' },
    { id: 8, name: 'Blessing Okafor', reg: 'KC/048', status: 'absent' },
  ]);

  const toggleAttendance = (id: number) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === 'present' ? 'absent' : 'present' } : s
      )
    );
  };

  const presentCount = students.filter((s) => s.status === 'present').length;
  const absentCount = students.filter((s) => s.status === 'absent').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header with Switch */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Class Timetable & Daily Roll Call
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Weekly 8-period teaching roster with clash-free AI scheduling and automated attendance tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-gray-100 p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setActiveTab('timetable')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'timetable' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-600'
              }`}
            >
              {!ent.hasTimetableAi && <Lock className="w-3 h-3 text-amber-600" />}
              <span>Weekly Timetable AI</span>
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                activeTab === 'attendance' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-600'
              }`}
            >
              Daily Roll Call
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print A4</span>
          </button>
        </div>
      </div>

      {/* TAB 1: WEEKLY TIMETABLE */}
      {activeTab === 'timetable' && (
        !ent.hasTimetableAi ? (
          <div className="bg-white rounded-2xl border border-amber-200 shadow-xs p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <div className="max-w-lg mx-auto space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                B2B Silver / Gold Exclusive • Current: {ent.name}
              </span>
              <h2 className="text-lg font-extrabold text-slate-900">
                Clash-Free Timetable AI Requires B2B Silver (₦120,000/term)
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated multi-class school timetable optimization and conflict resolution are included in B2B Silver (40 teachers), B2B Gold (unlimited teachers), and B2G State Platinum licenses.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <button
                onClick={() =>
                  onOpenUpgrade?.(
                    'Clash-Free Timetable AI is available starting on B2B Silver (₦120,000/term) and B2B Gold (₦250,000/term).',
                    'b2b_silver',
                    'Upgrade to B2B Silver for Timetable AI'
                  )
                }
                className="px-5 py-2.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-2xs"
              >
                Upgrade to B2B Silver (₦120k/term)
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Use Daily Roll Call
              </button>
            </div>
          </div>
        ) : (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-gray-900">{aiLevel} Clash-Free Teaching Schedule (Term 1)</h2>
              <p className="text-[11px] text-gray-500">Click any slot to edit inline, or run Timetable AI for an instant conflict-free weekly roster.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={aiLevel}
                onChange={(e) => setAiLevel(e.target.value)}
                className="text-xs font-bold px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl"
              >
                <option value="JSS 1">JSS 1</option>
                <option value="JSS 2">JSS 2</option>
                <option value="JSS 3">JSS 3</option>
                <option value="SSS 1">SSS 1</option>
                <option value="SSS 2">SSS 2</option>
                <option value="SSS 3">SSS 3</option>
              </select>
              <button
                onClick={handleGenerateAiTimetable}
                disabled={aiGenerating}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs"
              >
                {aiGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                <span>{aiGenerating ? 'Optimizing...' : 'AI Generate Clash-Free Roster'}</span>
              </button>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>No Period Clashes</span>
              </span>
            </div>
          </div>

          {aiNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-900">
              {aiNotice}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 font-bold uppercase text-[10px] tracking-wider">
                  <th className="p-3 border border-gray-200 text-left w-36">Time / Period</th>
                  {days.map((day) => (
                    <th key={day} className="p-3 border border-gray-200">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {periods.map((period, pIdx) => {
                  const isBreak = period.includes('BREAK') || period.includes('LUNCH');
                  if (isBreak) {
                    return (
                      <tr key={pIdx} className="bg-amber-50/70 font-bold text-amber-900">
                        <td className="p-2 border border-gray-200 text-left font-mono text-[11px]">
                          {period}
                        </td>
                        <td colSpan={5} className="p-2 border border-gray-200 text-center tracking-widest text-[11px] uppercase">
                          {period.split(' ')[0]} INTERVAL
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={pIdx} className="hover:bg-gray-50/50">
                      <td className="p-2.5 border border-gray-200 text-left font-mono text-gray-600 font-semibold">
                        {period}
                      </td>
                      {days.map((day) => {
                        const cellKey = `${day}-${pIdx}`;
                        const subjectValue = schedule[cellKey];
                        const isEditing = editingCell === cellKey;
                        return (
                          <td
                            key={day}
                            onClick={() => {
                              if (!isEditing) {
                                setEditingCell(cellKey);
                                setEditingValue(subjectValue || '');
                              }
                            }}
                            className={`p-2 border border-gray-200 font-bold cursor-pointer transition-colors ${
                              subjectValue
                                ? 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100/70'
                                : 'text-gray-300 hover:bg-gray-100/50'
                            }`}
                          >
                            {isEditing ? (
                              <input
                                autoFocus
                                type="text"
                                value={editingValue}
                                onChange={(e) => setEditingValue(e.target.value)}
                                onBlur={() => {
                                  setSchedule({ ...schedule, [cellKey]: editingValue.trim() });
                                  setEditingCell(null);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    setSchedule({ ...schedule, [cellKey]: editingValue.trim() });
                                    setEditingCell(null);
                                  } else if (e.key === 'Escape') {
                                    setEditingCell(null);
                                  }
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full px-2 py-1 text-xs font-bold text-slate-900 bg-white border border-emerald-500 rounded focus:outline-none"
                                placeholder="e.g. MTH (JSS 1A)"
                              />
                            ) : (
                              subjectValue || '+ Free'
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        )
      )}

      {/* TAB 2: ATTENDANCE TRACKER */}
      {activeTab === 'attendance' && (
        <div className="space-y-4">
          {/* Summary Roll Call Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
              <span className="text-xs font-semibold text-gray-500">Total Enrolled</span>
              <div className="text-2xl font-extrabold text-gray-900 mt-2">{students.length} Students</div>
              <p className="text-[11px] text-gray-500 mt-0.5">JSS 1 Alpha Register</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
              <span className="text-xs font-semibold text-gray-500">Present Today</span>
              <div className="text-2xl font-extrabold text-emerald-700 mt-2">{presentCount}</div>
              <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                {Math.round((presentCount / students.length) * 100)}% Attendance Rate
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
              <span className="text-xs font-semibold text-gray-500">Absent Today</span>
              <div className="text-2xl font-extrabold text-rose-700 mt-2">{absentCount}</div>
              <p className="text-[11px] text-rose-600 font-semibold mt-0.5">Parent SMS alert available</p>
            </div>
          </div>

          {/* Roll Call List */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700 uppercase">
                Daily Roll Call — {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="text-xs text-gray-500">Click student status to toggle</span>
            </div>

            <div className="divide-y divide-gray-100">
              {students.map((st) => (
                <div
                  key={st.id}
                  onClick={() => toggleAttendance(st.id)}
                  className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        st.status === 'present'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {st.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{st.name}</p>
                      <p className="text-[11px] text-gray-500 font-mono">{st.reg}</p>
                    </div>
                  </div>

                  <button
                    className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                      st.status === 'present'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}
                  >
                    {st.status === 'present' ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Present</span>
                      </>
                    ) : (
                      <>
                        <UserX className="w-3.5 h-3.5" />
                        <span>Absent</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
