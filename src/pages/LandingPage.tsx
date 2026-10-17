import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Calendar,
  Award,
  CheckCircle2,
  ArrowRight,
  Printer,
  FileDown,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  Users,
  Star,
  ChevronRight,
  School,
  ExternalLink
} from 'lucide-react';
import { curriculumDiagrams } from '../data/diagrams.ts';

interface LandingPageProps {
  onEnterApp: () => void;
  onOpenAuth: () => void;
  onExploreCurriculum: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterApp,
  onOpenAuth,
  onExploreCurriculum,
}) => {
  const [activePreviewTab, setActivePreviewTab] = useState<'plan' | 'scheme' | 'exam' | 'broadsheet'>('plan');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Top Banner */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 rounded-full bg-emerald-800 text-[10px] font-bold uppercase tracking-wider text-amber-300">
          2026/2027 Session
        </span>
        <span>Approved NERDC Curriculum Standards for Junior (JSS 1–3) and Senior Secondary (SSS 1–3).</span>
      </div>

      {/* Frontpage Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between border-b border-gray-200/80 bg-white/70 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20">
            <span className="font-extrabold text-lg tracking-wider">EP</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-gray-900 text-lg tracking-tight">EduPlan</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
                NG
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-medium hidden sm:block">Nigerian Educational Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExploreCurriculum}
            className="text-xs font-semibold text-gray-600 hover:text-emerald-700 px-3 py-1.5 rounded-lg transition-colors hidden sm:block"
          >
            Curriculum Browser
          </button>
          <button
            onClick={onOpenAuth}
            className="text-xs font-bold text-gray-700 hover:text-gray-900 px-3 py-2 rounded-xl transition-colors"
          >
            Teacher Login
          </button>
          <button
            onClick={onEnterApp}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all hover:scale-105 flex items-center gap-1.5"
          >
            <span>Launch Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 pb-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-900 text-xs font-bold border border-emerald-200 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Nigeria's Premier Pedagogical Operations Suite</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
          Empowering Nigerian Teachers with <span className="text-emerald-700">Intelligent Lesson Planning</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Prepare 13-week Schemes of Work in seconds. Generate Bloom's-aligned lesson plans, chalkboard lesson notes, WAEC/BECE exam papers, and broadsheets designed strictly for Nigerian secondary schools.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onEnterApp}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <span>Open Teaching Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenAuth}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <School className="w-4 h-4 text-emerald-700" />
            <span>School / HOD Sign-In</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-8 border-t border-gray-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-3 bg-white rounded-xl border border-gray-200/70 shadow-2xs">
            <span className="text-xl font-black text-emerald-700">936</span>
            <p className="text-xs font-bold text-gray-800 mt-0.5">NERDC Topics</p>
            <p className="text-[11px] text-gray-500">JSS 1–3 & SSS 1–3</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-gray-200/70 shadow-2xs">
            <span className="text-xl font-black text-blue-700">13 Weeks</span>
            <p className="text-xs font-bold text-gray-800 mt-0.5">Scheme of Work</p>
            <p className="text-[11px] text-gray-500">1-click automated build</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-gray-200/70 shadow-2xs">
            <span className="text-xl font-black text-amber-600">WAEC / BECE</span>
            <p className="text-xs font-bold text-gray-800 mt-0.5">Marking Schemes</p>
            <p className="text-[11px] text-gray-500">Printable school papers</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-gray-200/70 shadow-2xs">
            <span className="text-xl font-black text-purple-700">4 Languages</span>
            <p className="text-xs font-bold text-gray-800 mt-0.5">Nigerian Localization</p>
            <p className="text-[11px] text-gray-500">EN, Yorùbá, Igbo, Hausa</p>
          </div>
        </div>
      </section>

      {/* Interactive Feature Demo Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
          {/* Tab navigation */}
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1 bg-gray-200/80 p-1 rounded-xl">
              {[
                { id: 'plan', label: 'Lesson Plan & Note Composer' },
                { id: 'scheme', label: '13-Week Scheme of Work' },
                { id: 'exam', label: 'WAEC Exam Paper Generator' },
                { id: 'broadsheet', label: 'Broadsheet Grade Book' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePreviewTab(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activePreviewTab === tab.id
                      ? 'bg-white text-emerald-900 shadow-2xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={onEnterApp}
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              <span>Try Live in Workspace</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="p-6 sm:p-10">
            {activePreviewTab === 'plan' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      JSS 1 • Mathematics
                    </span>
                    <h3 className="text-base font-bold text-gray-900 mt-1">
                      Whole Numbers: Place Value and Large Digits in Base 10
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                      Word (.doc) & PDF Ready
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                    <strong className="text-gray-900 block font-bold">Behavioral Objectives:</strong>
                    <p className="text-gray-600">1. Identify and write place values of digits up to 10 digits in Base 10.</p>
                    <p className="text-gray-600">2. Convert numbers written in words to standard numerical digits accurately.</p>
                    <p className="text-gray-600">3. Solve practical word problems involving real-life commercial budgets.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                    <strong className="text-gray-900 block font-bold">Chalkboard Lesson Note Summary:</strong>
                    <p className="text-gray-600">
                      Definitions: Place value indicates the numerical value of a digit depending on its position in the numeral.
                    </p>
                    <p className="text-gray-600 font-mono text-[11px] bg-white p-2 rounded border border-gray-200">
                      Example: In 4,789,120, the place value of 7 is 700,000 (Seven Hundred Thousand).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activePreviewTab === 'scheme' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900">
                    First Term Scheme of Work — 13 Instructional Weeks
                  </h3>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                    NERDC Syllabus
                  </span>
                </div>
                <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-gray-100 text-gray-700 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5 w-16 text-center">Week</th>
                        <th className="p-2.5">Topic & Subtopics</th>
                        <th className="p-2.5">Periods</th>
                        <th className="p-2.5">Formative Evaluation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="p-2.5 text-center font-bold text-emerald-700">Wk 1</td>
                        <td className="p-2.5 font-semibold">Whole Numbers: Counting & Place Value</td>
                        <td className="p-2.5">4 Periods</td>
                        <td className="p-2.5 text-gray-600">Class test & oral drill</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-center font-bold text-emerald-700">Wk 7</td>
                        <td className="p-2.5 font-bold text-amber-900 bg-amber-50/50">
                          Mid-Term Continuous Assessment (CA 1) & Open Day
                        </td>
                        <td className="p-2.5">4 Periods</td>
                        <td className="p-2.5 text-amber-800">CA 1 Test Script (20 Marks)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-center font-bold text-emerald-700">Wk 13</td>
                        <td className="p-2.5 font-bold text-rose-900 bg-rose-50/50">
                          Terminal Promotional Examination & Broadsheets
                        </td>
                        <td className="p-2.5">Terminal</td>
                        <td className="p-2.5 text-rose-800">Final Exam (60 Marks)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activePreviewTab === 'exam' && (
              <div className="space-y-3">
                <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-black uppercase text-emerald-950">
                      WAEC & BECE Aligned Examination Paper
                    </h3>
                    <p className="text-[11px] text-emerald-800">Section A (Objectives) + Section B (Theory) + Marking Scheme</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-white text-emerald-900 rounded-lg shadow-2xs">
                    60 Marks Total
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-2">
                  <p className="font-semibold text-gray-900">
                    Question 1 (Objective): What is the place value of 8 in 5,824,190?
                  </p>
                  <p className="pl-4 text-gray-600">A) 8,000 &nbsp;&nbsp; B) 80,000 &nbsp;&nbsp; C) 800,000 &nbsp;&nbsp; D) 8,000,000</p>
                  <p className="font-semibold text-gray-900 pt-2">
                    Question 2 (Theory): A Nigerian trader deposits ₦450,000 into a savings account at 5% simple interest per annum...
                  </p>
                </div>
              </div>
            )}

            {activePreviewTab === 'broadsheet' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900">Official Class Broadsheet (WAEC A1–F9)</h3>
                  <span className="text-xs text-gray-500">Term 1 Summary</span>
                </div>
                <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-gray-100 text-gray-700 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-2">Student Name</th>
                        <th className="p-2 text-center">CA 1 (20)</th>
                        <th className="p-2 text-center">CA 2 (20)</th>
                        <th className="p-2 text-center">Exam (60)</th>
                        <th className="p-2 text-center">Total (100)</th>
                        <th className="p-2 text-center">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="p-2 font-bold text-gray-900">Chukwuebuka Okonkwo</td>
                        <td className="p-2 text-center">18</td>
                        <td className="p-2 text-center">17</td>
                        <td className="p-2 text-center">58</td>
                        <td className="p-2 text-center font-extrabold text-emerald-800">93%</td>
                        <td className="p-2 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            A1 Distinction
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-gray-900">Fatima Abubakar</td>
                        <td className="p-2 text-center">16</td>
                        <td className="p-2 text-center">18</td>
                        <td className="p-2 text-center">52</td>
                        <td className="p-2 text-center font-extrabold text-emerald-800">86%</td>
                        <td className="p-2 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            A1 Distinction
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Teacher Testimonials */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Trusted by Certified Educators Nationwide</h2>
          <p className="text-xs text-gray-500">From Federal Unity Colleges to State Secondary Schools.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed italic">
              "Before EduPlan NG, compiling the 13-week Mathematics scheme of work used to take my entire weekend. Now, I generate and export it to Word in under two minutes!"
            </p>
            <div className="pt-2 border-t border-gray-100">
              <strong className="text-xs font-bold text-gray-900 block">Mrs. Amina Balogun</strong>
              <span className="text-[11px] text-gray-500">Senior Mathematics Teacher, King's College, Lagos</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed italic">
              "The WhatsApp parent notification templates in Yorùbá, Igbo, and Hausa have completely eliminated misunderstandings with parents over student absences."
            </p>
            <div className="pt-2 border-t border-gray-100">
              <strong className="text-xs font-bold text-gray-900 block">Mr. Chukwuma Obi</strong>
              <span className="text-[11px] text-gray-500">English Studies HOD, Enugu State</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed italic">
              "Our school inspectors commended our lesson plans for integrating Bloom's cognitive taxonomy and differentiated instruction for struggling students."
            </p>
            <div className="pt-2 border-t border-gray-100">
              <strong className="text-xs font-bold text-gray-900 block">Mallam Aliyu Haruna</strong>
              <span className="text-[11px] text-gray-500">Basic Science Teacher, Barewa College, Zaria</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white py-16 px-4 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black max-w-xl mx-auto">
          Start Teaching with Certified NERDC Standards Today
        </h2>
        <p className="text-xs sm:text-sm text-emerald-200/80 max-w-md mx-auto">
          Join thousands of secondary educators building structured academic success.
        </p>
        <button
          onClick={onEnterApp}
          className="px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-emerald-950 shadow-lg transition-all hover:scale-105 inline-flex items-center gap-2"
        >
          <span>Launch EduPlan Workspace</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
