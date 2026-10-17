import React, { useState, useEffect } from 'react';
import { Award, Plus, Printer, FileDown, TrendingUp, CheckCircle2 } from 'lucide-react';
import { GradeRecord } from '../types/index.ts';
import { fetchGrades, createGrade } from '../lib/api.ts';
import confetti from 'canvas-confetti';

export const GradeBookPage: React.FC = () => {
  const [grades, setGrades] = useState<GradeRecord[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentRegNo, setStudentRegNo] = useState('');
  const [ca1, setCa1] = useState(15);
  const [ca2, setCa2] = useState(16);
  const [exam, setExam] = useState(55);

  useEffect(() => {
    loadGrades();
  }, []);

  const loadGrades = async () => {
    try {
      const data = await fetchGrades();
      setGrades(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createGrade({
        studentName,
        studentRegNo,
        level: 'jss-1',
        subject: 'Mathematics',
        term: 1,
        ca1Score: ca1,
        ca2Score: ca2,
        examScore: exam,
      });
      setGrades([res.record, ...grades]);
      setShowAddModal(false);
      setStudentName('');
      setStudentRegNo('');
      confetti({ particleCount: 50 });
    } catch (err) {
      console.error(err);
    }
  };

  // Class analytics
  const classAvg =
    grades.length > 0
      ? (grades.reduce((acc, g) => acc + g.totalScore, 0) / grades.length).toFixed(1)
      : '0';

  const distinctionCount = grades.filter((g) => g.gradeLetter === 'A1' || g.gradeLetter === 'A').length;
  const passRate =
    grades.length > 0
      ? Math.round(
          (grades.filter((g) => !['F9', 'F'].includes(g.gradeLetter)).length /
            grades.length) *
            100
        )
      : 100;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Class Broadsheet & Grade Book
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Nigerian WAEC A1–F9 & JSS grading standard (CA 1: 20%, CA 2: 20%, Exam: 60%).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print Broadsheet</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student Scores</span>
          </button>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Class Average Score</span>
          <div className="text-2xl font-extrabold text-gray-900 mt-2">{classAvg}%</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">High Performance Benchmark</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Distinctions (A1)</span>
          <div className="text-2xl font-extrabold text-emerald-700 mt-2">{distinctionCount} Students</div>
          <p className="text-[11px] text-gray-500 mt-0.5">Scored 75% and above</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Class Pass Rate</span>
          <div className="text-2xl font-extrabold text-blue-700 mt-2">{passRate}%</div>
          <p className="text-[11px] text-blue-600 font-semibold mt-0.5">Qualifies for promotion</p>
        </div>
      </div>

      {/* Broadsheet Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-gray-100/80 text-gray-700 uppercase font-bold text-[10px] tracking-wider border-b border-gray-200">
                <th className="p-3.5 w-12 text-center">Rank</th>
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5">Reg Number</th>
                <th className="p-3.5 text-center">CA 1 (20)</th>
                <th className="p-3.5 text-center">CA 2 (20)</th>
                <th className="p-3.5 text-center">Exam (60)</th>
                <th className="p-3.5 text-center">Total (100)</th>
                <th className="p-3.5 text-center">WAEC Grade</th>
                <th className="p-3.5">Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {grades.map((g, idx) => (
                <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3.5 font-bold text-center text-gray-400">#{idx + 1}</td>
                  <td className="p-3.5 font-bold text-gray-900">{g.studentName}</td>
                  <td className="p-3.5 font-mono text-gray-500">{g.studentRegNo}</td>
                  <td className="p-3.5 text-center font-semibold">{g.ca1Score}</td>
                  <td className="p-3.5 text-center font-semibold">{g.ca2Score}</td>
                  <td className="p-3.5 text-center font-semibold">{g.examScore}</td>
                  <td className="p-3.5 text-center font-extrabold text-emerald-800">{g.totalScore}%</td>
                  <td className="p-3.5 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-extrabold text-[11px] ${
                        g.gradeLetter === 'A1'
                          ? 'bg-emerald-100 text-emerald-800'
                          : g.gradeLetter.startsWith('B')
                          ? 'bg-blue-100 text-blue-800'
                          : g.gradeLetter.startsWith('C')
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {g.gradeLetter}
                    </span>
                  </td>
                  <td className="p-3.5 font-semibold text-gray-700">{g.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <form
            onSubmit={handleAddStudent}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-4 border border-gray-200"
          >
            <h3 className="text-base font-bold text-gray-900">Add Student Assessment Score</h3>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Student Full Name</label>
              <input
                required
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Oluwaseun Adeleke"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Registration / Roll No</label>
              <input
                required
                type="text"
                value={studentRegNo}
                onChange={(e) => setStudentRegNo(e.target.value)}
                placeholder="e.g. KC/2026/089"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">CA 1 (Max 20)</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={ca1}
                  onChange={(e) => setCa1(parseInt(e.target.value, 10))}
                  className="w-full text-xs px-2.5 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">CA 2 (Max 20)</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={ca2}
                  onChange={(e) => setCa2(parseInt(e.target.value, 10))}
                  className="w-full text-xs px-2.5 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Exam (Max 60)</label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={exam}
                  onChange={(e) => setExam(parseInt(e.target.value, 10))}
                  className="w-full text-xs px-2.5 py-2 border border-gray-300 rounded-xl"
                />
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl text-xs font-semibold flex items-center justify-between">
              <span>Calculated Total:</span>
              <span className="font-extrabold text-emerald-800 text-sm">{ca1 + ca2 + exam}%</span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs"
              >
                Save Record
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
