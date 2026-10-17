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
  Share2,
  Sparkles,
  FileDown,
  Layers,
  CheckCircle2,
  X,
  Printer
} from 'lucide-react';
import { LessonPlan } from '../types/index.ts';
import confetti from 'canvas-confetti';

interface LessonPlansListProps {
  plans: LessonPlan[];
  onSelectPlan: (id: string) => void;
  onCreateNew: () => void;
  onDuplicatePlan: (id: string) => void;
  onDeletePlan: (id: string) => void;
  onBatchPlansCreated?: (newPlans: LessonPlan[]) => void;
}

export const LessonPlansList: React.FC<LessonPlansListProps> = ({
  plans,
  onSelectPlan,
  onCreateNew,
  onDuplicatePlan,
  onDeletePlan,
  onBatchPlansCreated,
}) => {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchLevel, setBatchLevel] = useState('jss-1');
  const [batchSubject, setBatchSubject] = useState('Mathematics');
  const [batchTerm, setBatchTerm] = useState(1);
  const [batchLang, setBatchLang] = useState<'en' | 'yo' | 'ig' | 'ha'>('en');
  const [batchGenerating, setBatchGenerating] = useState(false);

  const filtered = plans.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.subject.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === 'all' || p.level === levelFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const handleGenerateBatchTermPack = () => {
    setBatchGenerating(true);
    setTimeout(() => {
      const newPlans: LessonPlan[] = Array.from({ length: 13 }, (_, i) => {
        const wk = i + 1;
        const isMid = wk === 7;
        const isRev = wk === 12;
        const isExam = wk === 13;

        const topicTitle = isMid
          ? 'Mid-Term Assessment & Continuous Assessment Test 1'
          : isRev
          ? 'Comprehensive Termly Revision & WAEC/BECE Drill'
          : isExam
          ? 'Terminal Examination, Paper Moderation & Broadsheet Entry'
          : `${batchSubject} Week ${wk}: Foundational NERDC Curriculum Competency`;

        return {
          id: `plan_term_${Date.now()}_wk_${wk}`,
          userId: 'usr_teacher_demo_01',
          title: topicTitle,
          level: batchLevel,
          subject: batchSubject,
          term: batchTerm,
          week: wk,
          duration: '40 mins',
          status: 'published',
          language: batchLang,
          bloomTags: isMid || isRev || isExam ? ['Analyze', 'Evaluate'] : ['Remember', 'Understand', 'Apply'],
          objectives: [
            `Define and explain the core principles of ${topicTitle}`,
            `Demonstrate problem-solving mastery through structured practice exercises`,
            `Analyze real-world Nigerian applications in daily commerce and society`
          ],
          materials: [
            `NERDC Approved Textbook for ${batchLevel.toUpperCase()}`,
            'Chalkboard, dry-erase markers, and instructional wall charts',
            'Real-life specimens and local Nigerian manipulative realia'
          ],
          previousKnowledge: `Learners possess working familiarity with prerequisite concepts taught in Week ${Math.max(1, wk - 1)}.`,
          introduction: `Teacher introduces ${topicTitle} using a relatable 5-minute Nigerian community scenario.`,
          teacherActivity: 'Teacher presents conceptual framework on the chalkboard and works through 2 demonstration problems.',
          studentActivity: 'Students copy structured notes into exercise notebooks and solve 2 guided classroom drill exercises in pairs.',
          evaluation: 'Teacher administers 3 oral comprehension check questions and an exit card drill.',
          assignment: `Complete Review Exercise questions 1 to 5 from the recommended textbook for Week ${wk}.`,
          references: 'NERDC National Curriculum for Basic Education / New General Series.',
          differentiatedInstruction: {
            struggling: 'Step-by-step scaffolding with concrete manipulative aids and teacher buddy support.',
            onLevel: 'Independent completion of standard curriculum drill exercises.',
            advanced: 'Higher-order word problems applying concepts to Nigerian commercial and industrial contexts.'
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      });

      if (onBatchPlansCreated) {
        onBatchPlansCreated(newPlans);
      }
      setBatchGenerating(false);
      setShowBatchModal(false);
      confetti({ particleCount: 80, spread: 70 });
    }, 600);
  };

  const handleExportFullTermPackDocx = () => {
    if (plans.length === 0) return;
    const termPlans = plans.filter((p) => p.level === (levelFilter === 'all' ? plans[0].level : levelFilter));
    const target = termPlans.length > 0 ? termPlans : plans;

    const dossierHtml = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>Unified 13-Week Termly Lesson Dossier</title>
<style>
  @page { size: A4; margin: 20mm; }
  body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; font-size: 10.5pt; color: #0f172a; line-height: 1.35; }
  .cover { text-align: center; padding-top: 80pt; page-break-after: always; }
  .cover h1 { font-size: 20pt; color: #065f46; text-transform: uppercase; margin-bottom: 5pt; }
  .cover h2 { font-size: 14pt; color: #1e293b; margin-top: 0; }
  .box { border: 2pt solid #047857; padding: 15pt; margin: 40pt auto; max-width: 450pt; text-align: left; }
  .plan-page { page-break-after: always; padding-top: 10pt; }
  table { width: 100%; border-collapse: collapse; margin-top: 8pt; margin-bottom: 12pt; }
  th { background-color: #047857; color: white; padding: 5pt 7pt; font-size: 9pt; border: 1pt solid #047857; text-align: left; }
  td { border: 1pt solid #cbd5e1; padding: 5pt 7pt; font-size: 9pt; vertical-align: top; }
</style>
</head>
<body>
<div class="cover">
  <div style="font-size: 12pt; letter-spacing: 2pt; color: #047857; font-weight: bold;">FEDERAL REPUBLIC OF NIGERIA</div>
  <h1>Unified 13-Week Lesson Plan Dossier</h1>
  <h2>NERDC Approved Curriculum Framework</h2>
  <div class="box">
    <strong>Institution:</strong> Secondary School Academic Directorate<br>
    <strong>Class Level:</strong> ${target[0]?.level.toUpperCase() || 'SECONDARY'}<br>
    <strong>Subject:</strong> ${target[0]?.subject || 'Curriculum Subject'}<br>
    <strong>Term:</strong> Term ${target[0]?.term || 1} (Standard 13 Weeks)<br>
    <strong>Academic Session:</strong> 2026/2027<br>
    <strong>Vetted By HOD:</strong> ____________________________________
  </div>
</div>

${target.map((p, idx) => `
<div class="plan-page">
  <div style="text-align: center; border-bottom: 2pt solid #047857; padding-bottom: 4pt; margin-bottom: 8pt;">
    <strong style="color: #065f46; font-size: 12pt;">WEEK ${p.week}: ${p.title.toUpperCase()}</strong>
    <div style="font-size: 8.5pt; color: #64748b;">Class: ${p.level.toUpperCase()} | Subject: ${p.subject} | Duration: ${p.duration}</div>
  </div>

  <table>
    <tr><th style="width: 25%;">Component</th><th>NERDC Instructional Specifications</th></tr>
    <tr><td><strong>Behavioral Objectives</strong></td><td><ul>${p.objectives.map(o => `<li>${o}</li>`).join('')}</ul></td></tr>
    <tr><td><strong>Instructional Materials</strong></td><td>${p.materials.join(', ')}</td></tr>
    <tr><td><strong>Previous Knowledge</strong></td><td>${p.previousKnowledge}</td></tr>
    <tr><td><strong>Introduction</strong></td><td>${p.introduction}</td></tr>
    <tr><td><strong>Teacher's Presentation</strong></td><td>${p.teacherActivity}</td></tr>
    <tr><td><strong>Students' Activities</strong></td><td>${p.studentActivity}</td></tr>
    <tr><td><strong>Formative Evaluation</strong></td><td>${p.evaluation}</td></tr>
    <tr><td><strong>Home Assignment</strong></td><td>${p.assignment}</td></tr>
    <tr><td><strong>Differentiated Instruction</strong></td><td>
      <strong>Tier 1 (Struggling):</strong> ${p.differentiatedInstruction?.struggling || 'Scaffolding'}<br>
      <strong>Tier 2 (On-Level):</strong> ${p.differentiatedInstruction?.onLevel || 'Textbook drills'}<br>
      <strong>Tier 3 (Advanced):</strong> ${p.differentiatedInstruction?.advanced || 'Extension tasks'}
    </td></tr>
  </table>
</div>
`).join('')}
</body>
</html>`;

    const blob = new Blob(['\ufeff' + dossierHtml], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Full_Term_Lesson_Dossier_13Weeks_${Date.now()}.doc`;
    a.click();
    URL.revokeObjectURL(url);
    confetti({ particleCount: 50 });
  };

  const handleSharePlanWhatsApp = (plan: LessonPlan) => {
    const text = `🇳🇬 *NERDC Lesson Plan: ${plan.title}*\n` +
      `*Class:* ${plan.level.toUpperCase()} | *Subject:* ${plan.subject} | *Week:* ${plan.week}\n\n` +
      `*Objectives:*\n${plan.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}\n\n` +
      `*Materials:* ${plan.materials.join(', ')}\n` +
      `*Assignment:* ${plan.assignment}\n\n` +
      `Prepared on EduPlan NG — Nigerian Curriculum Platform`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Master Lesson Repository</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Lesson Plans & Dossier Library
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Browse, duplicate, batch-generate, and export 13-week term packs ready for HOD vetting.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowBatchModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs transition-all hover:scale-102"
            title="Auto-generate complete 13-week term dossier"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>⚡ 13-Week Term Pack</span>
          </button>

          <button
            onClick={handleExportFullTermPackDocx}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 transition-colors"
            title="Download unified term dossier Word document"
          >
            <FileDown className="w-4 h-4 text-blue-600" />
            <span>Export Dossier (.doc)</span>
          </button>

          <button
            onClick={onCreateNew}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all hover:scale-102 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Plan</span>
          </button>
        </div>
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
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
              <FileText className="w-6 h-6" />
            </div>
            <p className="text-xs text-gray-500">No lesson plans found matching your filter criteria.</p>
            <button
              onClick={() => setShowBatchModal(true)}
              className="px-4 py-2 text-xs font-bold bg-emerald-600 text-white rounded-xl"
            >
              Generate 13-Week Term Pack
            </button>
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
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-900 font-extrabold text-[11px] flex items-center justify-center shrink-0">
                      W{plan.week}
                    </span>
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
                    {plan.language && plan.language !== 'en' && (
                      <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-purple-100 text-purple-900 uppercase">
                        {plan.language.toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span className="font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">
                      {plan.level.toUpperCase()}
                    </span>
                    <span>{plan.subject}</span>
                    <span>•</span>
                    <span>Term {plan.term}</span>
                    <span>•</span>
                    <span>Week {plan.week} of 13</span>
                    <span>•</span>
                    <span>{plan.duration}</span>
                    <span>•</span>
                    <span>Updated {new Date(plan.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleSharePlanWhatsApp(plan)}
                    className="p-2 text-gray-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="Share Plan on WhatsApp"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDuplicatePlan(plan.id)}
                    className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Duplicate Plan"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeletePlan(plan.id)}
                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Plan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onSelectPlan(plan.id)}
                    className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors"
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

      {/* 13-WEEK TERM PACK BATCH GENERATOR MODAL */}
      {showBatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 border border-gray-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-900">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">13-Week Term Pack Generator</h3>
                  <p className="text-xs text-gray-500">Auto-generate a complete termly lesson plan dossier</p>
                </div>
              </div>
              <button
                onClick={() => setShowBatchModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Class Level</label>
                  <select
                    value={batchLevel}
                    onChange={(e) => setBatchLevel(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
                  >
                    <option value="jss-1">JSS 1</option>
                    <option value="jss-2">JSS 2</option>
                    <option value="jss-3">JSS 3</option>
                    <option value="sss-1">SSS 1</option>
                    <option value="sss-2">SSS 2</option>
                    <option value="sss-3">SSS 3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Subject</label>
                  <select
                    value={batchSubject}
                    onChange={(e) => setBatchSubject(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="English Studies">English Studies</option>
                    <option value="Basic Science & Technology">Basic Science & Tech</option>
                    <option value="Civic Education">Civic Education</option>
                    <option value="Biology">Biology</option>
                    <option value="Economics">Economics</option>
                    <option value="Agricultural Science">Agricultural Science</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Academic Term</label>
                  <select
                    value={batchTerm}
                    onChange={(e) => setBatchTerm(parseInt(e.target.value, 10))}
                    className="w-full text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
                  >
                    <option value={1}>1st Term (Sept – Dec)</option>
                    <option value={2}>2nd Term (Jan – Apr)</option>
                    <option value={3}>3rd Term (May – Jul)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Language</label>
                  <select
                    value={batchLang}
                    onChange={(e) => setBatchLang(e.target.value as any)}
                    className="w-full text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
                  >
                    <option value="en">English (NERDC Standard)</option>
                    <option value="yo">Yorùbá (Local)</option>
                    <option value="ig">Asụsụ Igbo (Local)</option>
                    <option value="ha">Harshen Hausa (Local)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-xs text-emerald-950 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Dossier Package Inclusions (13 Weeks):</span>
                </div>
                <ul className="text-[11px] text-emerald-800 list-disc list-inside space-y-0.5">
                  <li>Weeks 1–6: Foundational modules & Bloom's behavioral objectives</li>
                  <li>Week 7: Mid-Term Continuous Assessment & Intervention test</li>
                  <li>Weeks 8–11: Advanced concepts & differentiated instruction tiers</li>
                  <li>Week 12: Comprehensive Termly Revision & Examination clinic</li>
                  <li>Week 13: Terminal Examination, marking scheme, & broadsheet</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowBatchModal(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={batchGenerating}
                onClick={handleGenerateBatchTermPack}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all hover:scale-102 flex items-center gap-2 disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 text-amber-300 ${batchGenerating ? 'animate-spin' : ''}`} />
                <span>{batchGenerating ? 'Synthesizing 13 Plans...' : 'Generate 13-Week Dossier'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
