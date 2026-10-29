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
  Printer,
  Edit3,
  FileSpreadsheet
} from 'lucide-react';
import { LessonPlan } from '../types/index.ts';
import { JUNIOR_SECONDARY_SUBJECTS, SENIOR_SECONDARY_SUBJECTS, generateNerdcOeqaContent } from '../data/allCurriculumSubjects.ts';
import { getBestDiagramForSubject } from '../data/diagrams.ts';
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

  // Custom / Manual Topic Modal State
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [customTopicInput, setCustomTopicInput] = useState('');
  const [customLevel, setCustomLevel] = useState('jss-1');
  const [customSubject, setCustomSubject] = useState('Mathematics');
  const [customTerm, setCustomTerm] = useState(1);
  const [customWeek, setCustomWeek] = useState(1);
  const [customLang, setCustomLang] = useState<'en' | 'yo' | 'ig' | 'ha'>('en');
  const [isCustomGenerating, setIsCustomGenerating] = useState(false);

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

        const nerdcContent = generateNerdcOeqaContent({
          level: batchLevel,
          subject: batchSubject,
          topic: topicTitle,
          week: wk,
          term: batchTerm,
          language: batchLang,
        });

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
          objectives: nerdcContent.objectives,
          materials: nerdcContent.materials,
          previousKnowledge: nerdcContent.previousKnowledge,
          introduction: nerdcContent.introduction,
          teacherActivity: nerdcContent.teacherActivity,
          studentActivity: nerdcContent.studentActivity,
          evaluation: nerdcContent.evaluation,
          assignment: nerdcContent.assignment,
          references: 'NERDC National Curriculum for Basic Education / FME & OEQA Standardized Scheme.',
          differentiatedInstruction: nerdcContent.differentiatedInstruction,
          safetyPrecautions: nerdcContent.safetyPrecautions,
          lessonNote: nerdcContent.lessonNote,
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

  const handleCreateFromCustomTopic = (mode: 'plan' | 'note' | 'both') => {
    setIsCustomGenerating(true);
    const topicTitle = customTopicInput.trim() || `${customSubject} Core Topic — Week ${customWeek}`;

    setTimeout(() => {
      const nerdcContent = generateNerdcOeqaContent({
        level: customLevel,
        subject: customSubject,
        topic: topicTitle,
        week: customWeek,
        term: customTerm,
        language: customLang,
      });

      const newPlan: LessonPlan = {
        id: `plan_custom_${Date.now()}`,
        userId: 'usr_teacher_demo_01',
        title: topicTitle,
        level: customLevel,
        subject: customSubject,
        term: customTerm,
        week: customWeek,
        duration: '40 mins',
        status: 'published',
        language: customLang,
        bloomTags: ['Remember', 'Understand', 'Apply', 'Analyze'],
        objectives: nerdcContent.objectives,
        materials: nerdcContent.materials,
        previousKnowledge: nerdcContent.previousKnowledge,
        introduction: nerdcContent.introduction,
        teacherActivity: nerdcContent.teacherActivity,
        studentActivity: nerdcContent.studentActivity,
        evaluation: nerdcContent.evaluation,
        assignment: nerdcContent.assignment,
        references: 'NERDC National Curriculum for Basic Education / FME & OEQA Standardized Scheme.',
        differentiatedInstruction: nerdcContent.differentiatedInstruction,
        safetyPrecautions: nerdcContent.safetyPrecautions,
        lessonNote: nerdcContent.lessonNote,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (onBatchPlansCreated) {
        onBatchPlansCreated([newPlan]);
      }
      setIsCustomGenerating(false);
      setShowTopicModal(false);
      setCustomTopicInput('');
      confetti({ particleCount: 75, spread: 65 });
      onSelectPlan(newPlan.id);
    }, 500);
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

${target.map((p, idx) => {
  const diag = getBestDiagramForSubject(p.subject, p.title);
  const note = p.lessonNote || generateNerdcOeqaContent({ level: p.level, subject: p.subject, topic: p.title, week: p.week, term: p.term }).lessonNote;
  return `
<div class="plan-page">
  <div style="text-align: center; border-bottom: 2pt solid #047857; padding-bottom: 4pt; margin-bottom: 8pt;">
    <strong style="color: #065f46; font-size: 13pt;">WEEK ${p.week}: ${p.title.toUpperCase()}</strong>
    <div style="font-size: 9pt; color: #475569; margin-top: 2pt;">Class: ${p.level.toUpperCase()} | Subject: ${p.subject} | Duration: ${p.duration} | Academic Session: 2026/2027</div>
  </div>

  <h3 style="color: #065f46; font-size: 11pt; border-left: 3pt solid #047857; padding-left: 6pt; margin: 10pt 0 4pt 0;">PART I: STATUTORY LESSON PLAN SPECIFICATIONS</h3>
  <table>
    <tr><th style="width: 25%;">Component</th><th>NERDC Instructional Specifications</th></tr>
    <tr><td><strong>Behavioral Objectives</strong></td><td><ol style="margin: 0; padding-left: 15pt;">${p.objectives.map(o => `<li style="margin-bottom: 2pt;">${o}</li>`).join('')}</ol></td></tr>
    <tr><td><strong>Instructional Materials</strong></td><td>${p.materials.join(', ')}</td></tr>
    <tr><td><strong>Previous Knowledge</strong></td><td>${p.previousKnowledge}</td></tr>
    <tr><td><strong>Introduction</strong></td><td>${p.introduction}</td></tr>
    <tr><td><strong>Teacher's Presentation</strong></td><td style="white-space: pre-line;">${p.teacherActivity}</td></tr>
    <tr><td><strong>Students' Activities</strong></td><td style="white-space: pre-line;">${p.studentActivity}</td></tr>
    <tr><td><strong>Formative Evaluation</strong></td><td>${p.evaluation}</td></tr>
    <tr><td><strong>Home Assignment</strong></td><td>${p.assignment}</td></tr>
    <tr><td><strong>Differentiated Instruction</strong></td><td>
      <strong>Tier 1 (Struggling):</strong> ${p.differentiatedInstruction?.struggling || 'Scaffolding'}<br>
      <strong>Tier 2 (On-Level):</strong> ${p.differentiatedInstruction?.onLevel || 'Textbook drills'}<br>
      <strong>Tier 3 (Advanced):</strong> ${p.differentiatedInstruction?.advanced || 'Extension tasks'}
    </td></tr>
  </table>

  ${diag ? `
  <div style="margin: 15pt 0; text-align: center; border: 1pt solid #cbd5e1; padding: 12pt; background-color: #f8fafc; border-radius: 4pt;">
    <h4 style="margin: 0 0 8pt 0; color: #0f172a; font-size: 10.5pt;">PART II: INSTRUCTIONAL CHALKBOARD DIAGRAM & ILLUSTRATION</h4>
    <div style="font-weight: bold; color: #065f46; margin-bottom: 6pt; font-size: 10pt;">${diag.title}</div>
    <div style="max-width: 480pt; margin: 0 auto;">
      ${diag.svgContent}
    </div>
    <p style="font-size: 9.5pt; color: #475569; font-style: italic; margin-top: 8pt;">Figure ${idx + 1}: ${diag.caption}</p>
  </div>` : ''}

  ${note ? `
  <h3 style="color: #065f46; font-size: 11pt; border-left: 3pt solid #047857; padding-left: 6pt; margin: 12pt 0 4pt 0;">PART III: CHALKBOARD LESSON NOTE (PUPILS' NOTEBOOK COPY)</h3>
  <div style="background-color: #f8fafc; border: 1pt solid #cbd5e1; padding: 10pt; margin-bottom: 12pt; border-radius: 4pt;">
    <p style="margin: 0 0 6pt 0;"><strong>Subtopics:</strong></p>
    <p style="margin: 0 0 8pt 0; white-space: pre-line; color: #1e293b;">${note.subtopics || '1. Core Definitions\n2. Worked Examples\n3. Summary & Practice'}</p>
    
    <p style="margin: 0 0 6pt 0;"><strong>Key Conceptual Definitions:</strong></p>
    <p style="margin: 0 0 8pt 0; white-space: pre-line; color: #1e293b;">${note.definitions || ''}</p>

    <p style="margin: 0 0 6pt 0;"><strong>Step-by-Step Worked Classroom Examples:</strong></p>
    <div style="background-color: #ffffff; padding: 8pt; border: 1pt dashed #94a3b8; margin-bottom: 8pt; white-space: pre-line; color: #0f172a;">
      ${note.workedExamples || ''}
    </div>

    <p style="margin: 0 0 6pt 0;"><strong>Blackboard Summary Takeaways:</strong></p>
    <p style="margin: 0 0 8pt 0; white-space: pre-line; color: #1e293b;">${note.blackboardSummary || ''}</p>

    <p style="margin: 0 0 6pt 0;"><strong>Classroom Practice Drill:</strong></p>
    <p style="margin: 0; white-space: pre-line; color: #1e293b;">${note.classDrill || ''}</p>
  </div>` : ''}

  <div style="margin-top: 20pt; padding-top: 10pt; border-top: 1pt solid #cbd5e1;">
    <table style="border: none; margin: 0;">
      <tr style="border: none;">
        <td style="border: none; width: 33%; text-align: center;">
          <div style="border-top: 1pt dashed #64748b; margin-top: 25pt; padding-top: 4pt; font-size: 8.5pt; font-weight: bold;">Subject Teacher</div>
        </td>
        <td style="border: none; width: 33%; text-align: center;">
          <div style="border-top: 1pt dashed #64748b; margin-top: 25pt; padding-top: 4pt; font-size: 8.5pt; font-weight: bold;">HOD Moderation & Stamp</div>
        </td>
        <td style="border: none; width: 33%; text-align: center;">
          <div style="border-top: 1pt dashed #64748b; margin-top: 25pt; padding-top: 4pt; font-size: 8.5pt; font-weight: bold;">Principal / Director of Academics</div>
        </td>
      </tr>
    </table>
  </div>
</div>
`;
}).join('')}
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
            onClick={() => setShowTopicModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xs transition-all hover:scale-102"
            title="Type any custom topic to auto-generate a full lesson plan and chalkboard note"
          >
            <Edit3 className="w-4 h-4 text-amber-300" />
            <span>⚡ Custom Topic Generator</span>
          </button>

          <button
            onClick={() => setShowBatchModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs transition-all hover:scale-102"
            title="Auto-generate complete 13-week term dossier"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>13-Week Term Pack</span>
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
                    onChange={(e) => {
                      const newLvl = e.target.value;
                      setBatchLevel(newLvl);
                      const isNewJunior = newLvl.toLowerCase().startsWith('jss');
                      const subs = isNewJunior ? JUNIOR_SECONDARY_SUBJECTS : SENIOR_SECONDARY_SUBJECTS;
                      if (!subs.some((s) => s.name.toLowerCase() === batchSubject.toLowerCase())) {
                        setBatchSubject(subs[0].name);
                      }
                    }}
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
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                    Subject ({(batchLevel.toLowerCase().startsWith('jss') ? JUNIOR_SECONDARY_SUBJECTS : SENIOR_SECONDARY_SUBJECTS).length} Statutory)
                  </label>
                  <select
                    value={batchSubject}
                    onChange={(e) => setBatchSubject(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
                  >
                    {(batchLevel.toLowerCase().startsWith('jss') ? JUNIOR_SECONDARY_SUBJECTS : SENIOR_SECONDARY_SUBJECTS).map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.department})
                      </option>
                    ))}
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

      {/* FEATURE: MANUAL / CUSTOM TOPIC GENERATOR MODAL */}
      {showTopicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 border border-gray-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900">
                  <Edit3 className="w-5 h-5 text-emerald-800" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Manual / Custom Topic Generator</h3>
                  <p className="text-xs text-gray-500">Generate full NERDC lesson plans and chalkboard notes from any custom topic</p>
                </div>
              </div>
              <button
                onClick={() => setShowTopicModal(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Manual Topic Input */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Custom Lesson Topic Title <span className="text-emerald-700 font-normal">(Required)</span>
                </label>
                <input
                  type="text"
                  value={customTopicInput}
                  onChange={(e) => setCustomTopicInput(e.target.value)}
                  placeholder="e.g. Simultaneous Equations by Elimination, Photosynthesis, Separation of Powers, etc."
                  className="w-full text-xs font-bold px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Class Level & Subject */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Class Level</label>
                  <select
                    value={customLevel}
                    onChange={(e) => {
                      const newLvl = e.target.value;
                      setCustomLevel(newLvl);
                      const isNewJunior = newLvl.toLowerCase().startsWith('jss');
                      const subs = isNewJunior ? JUNIOR_SECONDARY_SUBJECTS : SENIOR_SECONDARY_SUBJECTS;
                      if (!subs.some((s) => s.name.toLowerCase() === customSubject.toLowerCase())) {
                        setCustomSubject(subs[0].name);
                      }
                    }}
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
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
                  >
                    {(customLevel.toLowerCase().startsWith('jss') ? JUNIOR_SECONDARY_SUBJECTS : SENIOR_SECONDARY_SUBJECTS).map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.department})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Academic Term, Week, and Language */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Term</label>
                  <select
                    value={customTerm}
                    onChange={(e) => setCustomTerm(parseInt(e.target.value, 10))}
                    className="w-full text-xs font-semibold px-2 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                  >
                    <option value={1}>1st Term</option>
                    <option value={2}>2nd Term</option>
                    <option value={3}>3rd Term</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Week</label>
                  <select
                    value={customWeek}
                    onChange={(e) => setCustomWeek(parseInt(e.target.value, 10))}
                    className="w-full text-xs font-semibold px-2 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                  >
                    {Array.from({ length: 13 }).map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Week {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Language</label>
                  <select
                    value={customLang}
                    onChange={(e) => setCustomLang(e.target.value as any)}
                    className="w-full text-xs font-semibold px-2 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                  >
                    <option value="en">English</option>
                    <option value="yo">Yorùbá</option>
                    <option value="ig">Igbo</option>
                    <option value="ha">Hausa</option>
                  </select>
                </div>
              </div>

              {/* Inclusions summary */}
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
                <span className="font-bold">What will be synthesized:</span>
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  Both documents adhere strictly to national NERDC phrasing ("By the end of the lesson, learners should be able to..."), Lagos State OEQA Alausa presentation matrix, subject 21st-century skills, and include rich chalkboard diagrams and instructional materials.
                </p>
              </div>
            </div>

            {/* Direct Generation Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowTopicModal(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 order-last sm:order-first"
              >
                Cancel
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={isCustomGenerating}
                  onClick={() => handleCreateFromCustomTopic('plan')}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white transition flex items-center gap-1.5 shadow-2xs disabled:opacity-50"
                  title="Generate administrative Lesson Plan"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Generate Plan</span>
                </button>

                <button
                  type="button"
                  disabled={isCustomGenerating}
                  onClick={() => handleCreateFromCustomTopic('note')}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-600 text-white transition flex items-center gap-1.5 shadow-2xs disabled:opacity-50"
                  title="Generate deep chalkboard Lesson Note"
                >
                  <BookOpen className="w-3.5 h-3.5 text-teal-200" />
                  <span>Generate Note</span>
                </button>

                <button
                  type="button"
                  disabled={isCustomGenerating}
                  onClick={() => handleCreateFromCustomTopic('both')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-gray-950 transition shadow-md flex items-center gap-1.5 disabled:opacity-50"
                  title="Generate both lesson plan and chalkboard lesson note"
                >
                  <Sparkles className={`w-3.5 h-3.5 text-gray-950 ${isCustomGenerating ? 'animate-spin' : ''}`} />
                  <span>{isCustomGenerating ? 'Generating...' : '⚡ Generate Both'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
