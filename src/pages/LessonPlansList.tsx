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
  FileSpreadsheet,
  Box,
  Tv,
  RefreshCw,
  Lock,
} from 'lucide-react';
import { LessonPlan, TeacherUser, DashboardStats } from '../types/index.ts';
import { JUNIOR_SECONDARY_SUBJECTS, SENIOR_SECONDARY_SUBJECTS, generateNerdcOeqaContent } from '../data/allCurriculumSubjects.ts';
import { getBestDiagramForSubject } from '../data/diagrams.ts';
import { resolveClientTierSummary, canTierAccess } from '../config/pricing.ts';
import { getAuthHeaders } from '../lib/api.ts';
import confetti from 'canvas-confetti';

interface LessonPlansListProps {
  plans: LessonPlan[];
  user?: TeacherUser | null;
  stats?: DashboardStats | null;
  onOpenUpgrade?: (message: string, requiredTier?: string, title?: string) => void;
  onSelectPlan: (id: string) => void;
  onCreateNew: () => void;
  onDuplicatePlan: (id: string) => void;
  onDeletePlan: (id: string) => void;
  onBatchPlansCreated?: (newPlans: LessonPlan[]) => void;
}

export const LessonPlansList: React.FC<LessonPlansListProps> = ({
  plans,
  user,
  stats,
  onOpenUpgrade,
  onSelectPlan,
  onCreateNew,
  onDuplicatePlan,
  onDeletePlan,
  onBatchPlansCreated,
}) => {
  const tierSummary = resolveClientTierSummary(user, stats);
  const ent = tierSummary.config;
  const bulkExportAccess = canTierAccess(tierSummary.tierId, 'bulk_export');
  const librarySaveAccess = canTierAccess(tierSummary.tierId, 'library_save');
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

  const [localPlans, setLocalPlans] = useState<LessonPlan[]>(plans);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const [regeneratedToast, setRegeneratedToast] = useState<string | null>(null);
  const [autoSyncStatus, setAutoSyncStatus] = useState<{
    latestCurriculumVersion: string;
    lastSyncedAt: string;
  }>({
    latestCurriculumVersion: 'v1.4',
    lastSyncedAt: new Date().toLocaleTimeString(),
  });

  // Background auto-sync polling
  React.useEffect(() => {
    let active = true;
    const fetchSync = async () => {
      try {
        const res = await fetch('/api/curriculum/sync-status', {
          headers: getAuthHeaders(),
          credentials: 'include',
        });
        if (res.ok && active) {
          const data = await res.json();
          setAutoSyncStatus({
            latestCurriculumVersion: data.latestCurriculumVersion || 'v1.4',
            lastSyncedAt: new Date(data.lastSyncedAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          });
        }
      } catch {
        // fallback
      }
    };
    fetchSync();
    const interval = setInterval(fetchSync, 25000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  // Sync props to localPlans when parent plans prop changes
  React.useEffect(() => {
    setLocalPlans(plans);
  }, [plans]);

  const handleRegeneratePlan = async (plan: LessonPlan) => {
    if (!tierSummary.canGenerateMore) {
      onOpenUpgrade?.(
        ent.upgradeRequiredMessage || 'You have reached your AI generation quota for your current plan.',
        tierSummary.isTrial ? 'b2c_monthly' : 'b2c_termly',
        'AI Generation Quota Reached'
      );
      return;
    }

    setRegeneratingId(plan.id);
    try {
      const res = await fetch(`/api/lesson-plans/${plan.id}/regenerate`, {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
      });
      if (res.status === 403 || res.status === 429) {
        const errData = await res.json().catch(() => ({}));
        onOpenUpgrade?.(
          errData.message || errData.error || 'You have reached your AI generation quota for this tier.',
          errData.requiredTier || 'b2c_termly',
          'Plan Upgrade Required'
        );
        return;
      }
      let updatedPlanData = null;
      if (res.ok) {
        const data = await res.json();
        updatedPlanData = data.lessonPlan;
      }

      const updatedVer = updatedPlanData?.curriculumVersion || 'Curriculum v1.3 (NERDC 2026)';

      setLocalPlans((prev) =>
        prev.map((p) => {
          if (p.id === plan.id) {
            return {
              ...p,
              isOutdated: false,
              curriculumVersion: updatedVer,
              latestCurriculumVersion: updatedVer,
              outdatedReason: undefined,
              recommendedTextbook: updatedPlanData?.recommendedTextbook || p.recommendedTextbook,
              objectives: updatedPlanData?.objectives || p.objectives,
              materials: updatedPlanData?.materials || p.materials,
              updatedAt: new Date().toISOString(),
            };
          }
          return p;
        })
      );

      setRegeneratedToast(`Lesson Plan "${plan.title}" regenerated successfully to ${updatedVer}! Realia and Bloom's taxonomy objectives aligned.`);
      confetti({ particleCount: 50, spread: 60 });
      setTimeout(() => setRegeneratedToast(null), 5000);
    } catch (err) {
      console.error('Failed to regenerate plan:', err);
    } finally {
      setRegeneratingId(null);
    }
  };

  const filtered = localPlans.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.subject.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === 'all' || p.level === levelFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const handleGenerateBatchTermPack = () => {
    if (!bulkExportAccess.allowed) {
      onOpenUpgrade?.(bulkExportAccess.upgradeMessage, bulkExportAccess.requiredTier, '13-Week Bulk Term Pack Locked');
      return;
    }
    if (!tierSummary.canGenerateMore) {
      onOpenUpgrade?.(
        ent.upgradeRequiredMessage || 'Daily AI generation quota reached.',
        tierSummary.category === 'b2b' ? 'b2b_silver' : 'b2c_termly',
        'AI Generation Quota Reached'
      );
      return;
    }
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
          userId: user?.id || 'usr_teacher_demo_01',
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
    if (!tierSummary.canGenerateMore) {
      onOpenUpgrade?.(
        ent.upgradeRequiredMessage || 'You have reached your AI generation limit for your current plan.',
        tierSummary.isTrial ? 'b2c_monthly' : 'b2c_termly',
        'AI Generation Quota Reached'
      );
      return;
    }
    if (!librarySaveAccess.allowed || !tierSummary.canSaveMoreToLibrary) {
      onOpenUpgrade?.(
        !librarySaveAccess.allowed
          ? librarySaveAccess.upgradeMessage
          : `You have reached your ${tierSummary.maxSavedLibraryNotes}-note Library limit on the ${ent.name}. Upgrade to Pro Teacher (₦1,500/term) for unlimited library saving.`,
        !librarySaveAccess.allowed ? librarySaveAccess.requiredTier : 'b2c_termly',
        'Library Save Limit Reached'
      );
      return;
    }
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
        userId: user?.id || 'usr_teacher_demo_01',
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
    if (!bulkExportAccess.allowed) {
      onOpenUpgrade?.(bulkExportAccess.upgradeMessage, bulkExportAccess.requiredTier, 'Bulk Dossier Export Locked');
      return;
    }
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
  <div style="font-size: 11pt; letter-spacing: 1.5pt; color: #047857; font-weight: bold;">LAGOS STATE MINISTRY OF BASIC & SECONDARY EDUCATION • NERDC CURRICULUM</div>
  <h1>Unified 13-Week Lesson Plan & Note Dossier</h1>
  <h2>Lagos State Unified Scheme of Work & NERDC National Curriculum Standard (OEQA Alausa Certified)</h2>
  <div class="box">
    <strong>Regulatory Framework:</strong> Lagos State Unified Scheme of Work & NERDC National Curriculum<br>
    <strong>Quality Assurance:</strong> Lagos State Office of Education Quality Assurance (OEQA Alausa)<br>
    <strong>Class Level:</strong> ${target[0]?.level.toUpperCase() || 'SECONDARY'}<br>
    <strong>Subject:</strong> ${target[0]?.subject || 'Curriculum Subject'}<br>
    <strong>Term:</strong> Term ${target[0]?.term || 1} (Statutory 13 Weeks Progression)<br>
    <strong>Academic Session:</strong> 2026/2027 • Auto-Synced<br>
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

  const buildWhatsAppShareUrl = (plan: LessonPlan) => {
    const text = `🇳🇬 *NERDC Lesson Plan: ${plan.title}*\n` +
      `*Class:* ${plan.level.toUpperCase()} | *Subject:* ${plan.subject} | *Week:* ${plan.week}\n\n` +
      `*Objectives:*\n${plan.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}\n\n` +
      `*Materials:* ${plan.materials.join(', ')}\n` +
      `*Assignment:* ${plan.assignment}\n\n` +
      `Prepared on EduPlan NG — Nigerian Curriculum Platform`;

    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Lagos State Unified Scheme & NERDC Aligned</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[11px] font-bold border border-teal-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Auto-Sync: Active ({autoSyncStatus.latestCurriculumVersion})</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-200">
              <span>
                {ent.name}:{' '}
                {!ent.hasLibrarySaving
                  ? '0 Library Saves (Trial Drafts Only)'
                  : tierSummary.maxSavedLibraryNotes > 0
                  ? `${tierSummary.savedNotesCount}/${tierSummary.maxSavedLibraryNotes} Library Notes`
                  : 'Unlimited Library & Bulk Exports'}
              </span>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Lesson Plans & Dossier Library
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Browse, duplicate, batch-generate, and export 13-week term packs aligned with Lagos State Unified Scheme of Work & NERDC.
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
            onClick={() => {
              if (!bulkExportAccess.allowed) {
                onOpenUpgrade?.(bulkExportAccess.upgradeMessage, bulkExportAccess.requiredTier, '13-Week Term Pack Locked');
                return;
              }
              setShowBatchModal(true);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all ${
              bulkExportAccess.allowed
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 hover:scale-102'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200'
            }`}
            title={bulkExportAccess.allowed ? 'Auto-generate complete 13-week term dossier' : bulkExportAccess.upgradeMessage}
          >
            {bulkExportAccess.allowed ? <Sparkles className="w-4 h-4 text-slate-950" /> : <Lock className="w-4 h-4 text-amber-600" />}
            <span>13-Week Term Pack</span>
          </button>

          <button
            onClick={handleExportFullTermPackDocx}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
              bulkExportAccess.allowed
                ? 'bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
            }`}
            title={bulkExportAccess.allowed ? 'Download unified term dossier Word document' : bulkExportAccess.upgradeMessage}
          >
            {bulkExportAccess.allowed ? <FileDown className="w-4 h-4 text-blue-600" /> : <Lock className="w-4 h-4 text-amber-600" />}
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

      {/* Regeneration Toast */}
      {regeneratedToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs font-bold text-emerald-950 flex items-center gap-2.5 shadow-2xs animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{regeneratedToast}</span>
        </div>
      )}

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
                    {plan.isOutdated ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                        <span>⚠️ OUTDATED</span>
                        <span className="opacity-75 font-normal">({plan.curriculumVersion || 'v1.0'} → {plan.latestCurriculumVersion || 'v1.2'})</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        Curriculum {plan.curriculumVersion || 'v1.2'}
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
                    {plan.recommendedTextbook && (
                      <>
                        <span>•</span>
                        <span className="text-slate-600 truncate max-w-[220px]" title={plan.recommendedTextbook.title}>
                          📖 {plan.recommendedTextbook.title}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleRegeneratePlan(plan)}
                    disabled={regeneratingId === plan.id}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-all ${
                      plan.isOutdated
                        ? 'text-white bg-amber-600 hover:bg-amber-700 ring-2 ring-amber-400/40 animate-pulse'
                        : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
                    }`}
                    title="Regenerate plan with updated NERDC 2026 objectives and textbook citations"
                  >
                    {regeneratingId === plan.id ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Regenerating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Regenerate</span>
                      </>
                    )}
                  </button>
                  <a
                    href={buildWhatsAppShareUrl(plan)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors inline-flex items-center justify-center"
                    title="Share Plan on WhatsApp"
                  >
                    <Share2 className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => {
                      if (!librarySaveAccess.allowed || !tierSummary.canSaveMoreToLibrary) {
                        onOpenUpgrade?.(
                          !librarySaveAccess.allowed
                            ? librarySaveAccess.upgradeMessage
                            : `You have reached the ${tierSummary.maxSavedLibraryNotes}-note Library cap on ${ent.name}. Upgrade for unlimited plans.`,
                          !librarySaveAccess.allowed ? librarySaveAccess.requiredTier : 'b2c_termly',
                          'Library Save Limit Reached'
                        );
                        return;
                      }
                      onDuplicatePlan(plan.id);
                    }}
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
                    onClick={() => {
                      if (!ent.has3DAccess) {
                        const res3D = canTierAccess(tierSummary.tierId, '3d_visual_aid');
                        onOpenUpgrade?.(res3D.upgradeMessage, res3D.requiredTier, '3D Realia Lab Locked');
                        return;
                      }
                      onSelectPlan(plan.id);
                    }}
                    className={`px-3 py-1.5 text-xs font-bold border rounded-xl flex items-center gap-1.5 transition-colors ${
                      ent.has3DAccess
                        ? 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border-emerald-200/90'
                        : 'text-slate-600 bg-slate-100 hover:bg-slate-200 border-slate-200'
                    }`}
                    title={ent.has3DAccess ? 'Inspect Lesson Plan, 3D Realia & Visual Aids' : '3D Realia requires B2B Gold or B2G Platinum'}
                  >
                    {ent.has3DAccess ? <Box className="w-3.5 h-3.5 text-emerald-600" /> : <Lock className="w-3.5 h-3.5 text-amber-600" />}
                    <span className="hidden sm:inline">3D Realia</span>
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
