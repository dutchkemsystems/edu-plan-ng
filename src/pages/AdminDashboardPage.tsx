import React, { useState } from 'react';
import { ShieldCheck, Users, CheckCircle2, AlertCircle, FileCheck, Printer, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminDashboardPage: React.FC = () => {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: 'Mrs. Amina Balogun',
      subject: 'Mathematics',
      levels: 'JSS 1, SSS 1',
      coverage: 23,
      submittedPlans: 3,
      status: 'approved',
    },
    {
      id: 2,
      name: 'Mr. Chukwuma Obi',
      subject: 'English Studies',
      levels: 'JSS 2, SSS 2',
      coverage: 31,
      submittedPlans: 4,
      status: 'approved',
    },
    {
      id: 3,
      name: 'Mrs. Folake Adeleke',
      subject: 'Basic Science & Tech',
      levels: 'JSS 1, JSS 2',
      coverage: 15,
      submittedPlans: 2,
      status: 'pending_review',
    },
    {
      id: 4,
      name: 'Mr. Danjuma Ibrahim',
      subject: 'Civic Education',
      levels: 'JSS 3, SSS 3',
      coverage: 28,
      submittedPlans: 3,
      status: 'approved',
    },
  ]);

  const handleApprove = (id: number) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'approved' } : t))
    );
    confetti({ particleCount: 40 });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 inline-flex mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Principal & Head of Department (HOD) Portal</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            School Academic Oversight & Approvals
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            King's College, Lagos • 2026/2027 1st Term Faculty Progress Audit.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center gap-1.5 shadow-2xs"
        >
          <Printer className="w-4 h-4" />
          <span>Print School Audit Report</span>
        </button>
      </div>

      {/* School Aggregate Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Active Faculty Members</span>
          <div className="text-2xl font-extrabold text-gray-900 mt-2">24 Teachers</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">100% Onboarded</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Total Lesson Plans Vetted</span>
          <div className="text-2xl font-extrabold text-emerald-700 mt-2">184 Plans</div>
          <p className="text-[11px] text-gray-500 mt-0.5">Approved for classroom delivery</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">School-Wide Syllabus Coverage</span>
          <div className="text-2xl font-extrabold text-blue-700 mt-2">24.2%</div>
          <p className="text-[11px] text-gray-500 mt-0.5">On target for Week 3</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Pending HOD Reviews</span>
          <div className="text-2xl font-extrabold text-amber-600 mt-2">1 Submission</div>
          <p className="text-[11px] text-amber-700 font-semibold mt-0.5">Requires approval</p>
        </div>
      </div>

      {/* Faculty Submissions Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-700 uppercase">
            Faculty Lesson Plan Submission & Syllabus Compliance
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase font-bold text-[10px] tracking-wider border-b border-gray-200">
                <th className="p-3.5">Teacher Name</th>
                <th className="p-3.5">Assigned Subject</th>
                <th className="p-3.5">Classes</th>
                <th className="p-3.5 text-center">Coverage</th>
                <th className="p-3.5 text-center">Plans Filed</th>
                <th className="p-3.5 text-center">Approval Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {teachers.map((tch) => (
                <tr key={tch.id} className="hover:bg-gray-50">
                  <td className="p-3.5 font-bold text-gray-900">{tch.name}</td>
                  <td className="p-3.5 font-semibold text-gray-700">{tch.subject}</td>
                  <td className="p-3.5 text-gray-600">{tch.levels}</td>
                  <td className="p-3.5 text-center font-extrabold text-emerald-800">{tch.coverage}%</td>
                  <td className="p-3.5 text-center font-bold text-gray-700">{tch.submittedPlans} Plans</td>
                  <td className="p-3.5 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        tch.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {tch.status === 'approved' ? 'Approved' : 'Pending Review'}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    {tch.status === 'pending_review' ? (
                      <button
                        onClick={() => handleApprove(tch.id)}
                        className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-2xs"
                      >
                        Approve Plan
                      </button>
                    ) : (
                      <span className="text-gray-400 font-semibold text-xs">Vetted</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
