import React, { useState } from 'react';
import { CalendarDays, Plus, Clock, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

export const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Term 1 Resumption & Orientation',
      date: 'Sept 15, 2026',
      type: 'resumption',
      notes: 'Federal & State secondary schools resume across Nigeria.',
    },
    {
      id: 2,
      title: 'Nigeria Independence Day National Holiday',
      date: 'Oct 01, 2026',
      type: 'holiday',
      notes: 'Public holiday — school closed.',
    },
    {
      id: 3,
      title: 'Continuous Assessment (CA 1) Submission',
      date: 'Oct 23, 2026',
      type: 'academic',
      notes: 'All teachers must upload Week 1–6 CA marks to broadsheet.',
    },
    {
      id: 4,
      title: 'Mid-Term Break (Term 1)',
      date: 'Oct 29 – Oct 30, 2026',
      type: 'break',
      notes: 'Open Day on Thursday followed by mid-term rest.',
    },
    {
      id: 5,
      title: 'Terminal Examination Commencement',
      date: 'Dec 07, 2026',
      type: 'exam',
      notes: 'Terminal theory & practical exams begin for JSS 1–3 and SSS 1–3.',
    },
    {
      id: 6,
      title: 'Vacation & Report Card Distribution',
      date: 'Dec 18, 2026',
      type: 'vacation',
      notes: 'End of 1st Term. Printed broadsheets and student report cards issued.',
    },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventType, setNewEventType] = useState('academic');

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle) return;
    setEvents([
      ...events,
      {
        id: Date.now(),
        title: newEventTitle,
        date: newEventDate || 'Nov 12, 2026',
        type: newEventType,
        notes: 'User-scheduled school calendar event.',
      },
    ]);
    setShowAdd(false);
    setNewEventTitle('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Nigerian Academic Calendar</h1>
          <p className="text-xs text-gray-500 mt-1">
            2026/2027 Academic Session: Resumption dates, CA test windows, mid-term breaks, and national holidays.
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add School Event</span>
        </button>
      </div>

      {/* Calendar Timeline */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold text-gray-900">1st Term Official Schedule</h2>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
          {events.map((ev) => {
            const isExam = ev.type === 'exam';
            const isBreak = ev.type === 'break' || ev.type === 'vacation';
            const isHoliday = ev.type === 'holiday';

            return (
              <div key={ev.id} className="relative group">
                <span
                  className={`absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white ring-2 ${
                    isExam
                      ? 'bg-rose-500 ring-rose-200'
                      : isBreak
                      ? 'bg-purple-500 ring-purple-200'
                      : isHoliday
                      ? 'bg-amber-500 ring-amber-200'
                      : 'bg-emerald-500 ring-emerald-200'
                  }`}
                />
                <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-200/70 hover:bg-gray-100/60 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-xs font-bold text-gray-900">{ev.title}</h3>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80 self-start sm:self-auto">
                      {ev.date}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{ev.notes}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Event Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <form
            onSubmit={handleAddEvent}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-4 border border-gray-200"
          >
            <h3 className="text-base font-bold text-gray-900">Add School Calendar Event</h3>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Event Title</label>
              <input
                required
                type="text"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="e.g. Inter-House Sports Competition"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Date</label>
                <input
                  type="text"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                  placeholder="e.g. Nov 14, 2026"
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Type</label>
                <select
                  value={newEventType}
                  onChange={(e) => setNewEventType(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                >
                  <option value="academic">Academic / Test</option>
                  <option value="exam">Examination</option>
                  <option value="break">Break / Holiday</option>
                  <option value="activity">Extracurricular</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs"
              >
                Save Event
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
