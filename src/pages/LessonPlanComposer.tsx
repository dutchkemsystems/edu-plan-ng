import React, { useState, useEffect, useRef } from 'react';
import {
  Save,
  CheckCircle2,
  Share2,
  FileDown,
  Copy,
  Sparkles,
  AlertTriangle,
  Globe,
  Plus,
  Trash2,
  Printer,
  FileText,
  Clock,
  Layers,
  HelpCircle,
  ArrowLeft,
  Image as ImageIcon,
  BookOpen,
  Edit3,
  Eye,
  Check,
  FileSpreadsheet,
  Mic,
  Tv,
  Video,
  Box
} from 'lucide-react';
import { VoiceToPlan } from '../components/VoiceToPlan.tsx';
import { VisualAidViewer } from '../components/VisualAidViewer.tsx';
import { VideoAidPlayer } from '../components/VideoAidPlayer.tsx';
import { LessonPlan, DifferentiatedInstruction, InstructionalMaterials } from '../types/index.ts';
import {
  createLessonPlan,
  updateLessonPlan,
  duplicateLessonPlan,
  requestAIAssist,
  autoGeneratePlanAndNote,
  generateDedicatedLessonPlan,
  generateDedicatedLessonNote
} from '../lib/api.ts';
import { curriculumDiagrams, EducationalDiagram, getBestDiagramForSubject } from '../data/diagrams.ts';
import { JUNIOR_SECONDARY_SUBJECTS, SENIOR_SECONDARY_SUBJECTS, getSubjectTermTopics, generateNerdcOeqaContent } from '../data/allCurriculumSubjects.ts';
import confetti from 'canvas-confetti';
import { offlineStorage } from '../lib/offline/offline-storage.ts';
import { GoogleClassroomExportModal } from '../components/GoogleClassroomExportModal.tsx';

interface LessonPlanComposerProps {
  initialPlan?: LessonPlan | null;
  onBack: () => void;
  onSaved: (plan: LessonPlan) => void;
}

export const LessonPlanComposer: React.FC<LessonPlanComposerProps> = ({
  initialPlan,
  onBack,
  onSaved,
}) => {
  const [composerMode, setComposerMode] = useState<'plan' | 'note' | 'preview' | 'visual-aids'>('plan');
  const [visual3DModel, setVisual3DModel] = useState<string>(
    initialPlan?.instructionalMaterials?.visual3D ||
    (initialPlan?.title?.toLowerCase().includes('heart') ? 'heart_model'
      : (initialPlan?.title?.toLowerCase().includes('solar') || initialPlan?.title?.toLowerCase().includes('planet')) ? 'solar_system'
      : (initialPlan?.title?.toLowerCase().includes('cube') || initialPlan?.title?.toLowerCase().includes('geometry') || initialPlan?.subject?.toLowerCase().includes('math')) ? 'geometry_cube'
      : (initialPlan?.title?.toLowerCase().includes('dna') || initialPlan?.title?.toLowerCase().includes('genet')) ? 'dna_helix'
      : (initialPlan?.title?.toLowerCase().includes('atom') || initialPlan?.title?.toLowerCase().includes('matter') || initialPlan?.subject?.toLowerCase().includes('chem')) ? 'atom_model'
      : (initialPlan?.title?.toLowerCase().includes('cell') || initialPlan?.title?.toLowerCase().includes('plant')) ? 'plant_cell'
      : 'geometry_cube')
  );
  const [video4KUrl, setVideo4KUrl] = useState<string>(
    initialPlan?.instructionalMaterials?.video4K ||
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  );
  const [physicalMaterials, setPhysicalMaterials] = useState<string[]>(
    initialPlan?.instructionalMaterials?.physical ||
    initialPlan?.materials ||
    ['Chalkboard & Dry-Erase Markers', 'Standard NERDC Textbook', 'Mathematical Set & Ruler']
  );
  const [activeVisualAidSubtab, setActiveVisualAidSubtab] = useState<'3d' | 'video' | 'physical'>('3d');
  const [newPhysicalItem, setNewPhysicalItem] = useState('');
  const [id, setId] = useState<string>(initialPlan?.id || '');
  const [title, setTitle] = useState(initialPlan?.title || 'Untitled NERDC Lesson Plan');
  const [level, setLevel] = useState(initialPlan?.level || 'jss-1');
  const [subject, setSubject] = useState(initialPlan?.subject || 'Mathematics');
  const [term, setTerm] = useState(initialPlan?.term || 1);
  const [week, setWeek] = useState(initialPlan?.week || 1);
  const [duration, setDuration] = useState(initialPlan?.duration || '40 mins');
  const [language, setLanguage] = useState<'en' | 'yo' | 'ig' | 'ha'>(initialPlan?.language || 'en');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>(initialPlan?.status || 'draft');
  const [isAutoGenerating, setIsAutoGenerating] = useState(false);
  const [isCustomSubject, setIsCustomSubject] = useState(false);
  const [manualTopicInput, setManualTopicInput] = useState('');
  const [showVoiceToPlan, setShowVoiceToPlan] = useState(false);
  const [showClassroomExport, setShowClassroomExport] = useState(false);

  const isJunior = level.toLowerCase().startsWith('jss');
  const statutorySubjects = isJunior ? JUNIOR_SECONDARY_SUBJECTS : SENIOR_SECONDARY_SUBJECTS;
  const currentSubjectMeta = statutorySubjects.find(
    (s) => s.name.toLowerCase() === subject.toLowerCase()
  );
  const syllabusTopics = currentSubjectMeta ? getSubjectTermTopics(currentSubjectMeta, term, level) : [];
  const currentSyllabusTopic = syllabusTopics[week - 1] || '';

  const [objectives, setObjectives] = useState<string[]>(
    initialPlan?.objectives?.length
      ? initialPlan.objectives
      : [
          'Define the core operational terms of the lesson accurately',
          'Solve 5 standard exercises using Nigerian real-world commercial examples',
          'Demonstrate Bloom-aligned analytical reasoning through peer discussion'
        ]
  );

  const [materials, setMaterials] = useState<string[]>(
    initialPlan?.materials?.length
      ? initialPlan.materials
      : [
          'NERDC Approved Textbook for Secondary Schools',
          'Whiteboard, markers & geometric drawing instruments',
          'Flashcards & realia specimen from local market'
        ]
  );

  const [previousKnowledge, setPreviousKnowledge] = useState(
    initialPlan?.previousKnowledge || 'Students have previously learned basic arithmetic and foundational definitions.'
  );
  const [introduction, setIntroduction] = useState(
    initialPlan?.introduction || 'Teacher engages students with a 5-minute interactive question connecting to daily Nigerian community life.'
  );
  const [teacherActivity, setTeacherActivity] = useState(
    initialPlan?.teacherActivity || 'Teacher defines key principles, writes sample problems on the chalkboard, and guides students step-by-step.'
  );
  const [studentActivity, setStudentActivity] = useState(
    initialPlan?.studentActivity || 'Students participate actively, take down chalkboard summary notes, and solve guided practice drills in pairs.'
  );
  const [evaluation, setEvaluation] = useState(
    initialPlan?.evaluation || 'Administer 3 rapid comprehension check questions on the chalkboard before class dismissal.'
  );
  const [assignment, setAssignment] = useState(
    initialPlan?.assignment || 'Complete Review Exercise 2.1, questions 1-5 from the recommended NERDC textbook.'
  );
  const [references, setReferences] = useState(
    initialPlan?.references || 'NERDC National Curriculum for Basic Education; New General Mathematics / STAN Science.'
  );

  const [diffInstruction, setDiffInstruction] = useState<DifferentiatedInstruction>(
    initialPlan?.differentiatedInstruction || {
      struggling: 'Step-by-step scaffolding with concrete manipulative aids and peer buddy support.',
      onLevel: 'Standard guided exercise from textbook with independent problem-solving tasks.',
      advanced: 'Higher-order word problems applying concepts to Nigerian commercial and industrial contexts.'
    }
  );

  // Phase 10 Differentiated Tasks (Remedial, Standard, Advanced)
  const [remedialTask, setRemedialTask] = useState<string>(
    initialPlan?.remedialTask ||
    `Tier 1 (Remedial Task): Scaffolded step-by-step worksheet on "${initialPlan?.title || 'the core concept'}" with visual templates, worked examples, and peer buddy assistance.`
  );
  const [standardTask, setStandardTask] = useState<string>(
    initialPlan?.standardTask ||
    `Tier 2 (Standard Task): Independent completion of standard NERDC curriculum questions 1-5 applying concepts with practical realia.`
  );
  const [advancedTask, setAdvancedTask] = useState<string>(
    initialPlan?.advancedTask ||
    `Tier 3 (Advanced Task): Non-routine analysis problem applying principles to Nigerian commercial trade or real-world industrial systems.`
  );
  const [isDiffTasksLoading, setIsDiffTasksLoading] = useState(false);

  // Lesson Note (Chalkboard Content) State
  const [lessonNote, setLessonNote] = useState({
    subtopics: '1. Conceptual Definitions & Nomenclature\n2. Fundamental Rules & Formulae\n3. Worked Classroom Examples\n4. Chalkboard Summary & Pupil Exercise',
    definitions: `${title} is a foundational concept in the Nigerian secondary school curriculum. It equips learners with analytical, practical, and problem-solving tools relevant to everyday domestic, scientific, and commercial activities.`,
    workedExamples: `Example 1 (Class Demonstration):
Given standard problem parameters, apply the core rule:
Step 1: Identify given variables and state the relevant formula.
Step 2: Substitute values with appropriate scientific or arithmetic units.
Step 3: Compute final solution and cross-check dimensional consistency.

Example 2 (Nigerian Context):
A commercial trader at Balogun Market, Lagos records daily sales. Applying today's principle simplifies the inventory reconciliation.`,
    blackboardSummary: `• Point 1: Always verify starting premises before applying formulae.
• Point 2: Write clear explanatory steps rather than lone numeric answers.
• Point 3: Copy all worked examples and definitions into your notebook before class ends.`,
    classDrill: `1. Define the topic in your own words.
2. Solve the 2 practice questions written on the chalkboard.
3. Compare your working with your desk partner.`
  });

  // Educational Illustration / Diagram state
  const [selectedDiagram, setSelectedDiagram] = useState<EducationalDiagram | null>(() =>
    getBestDiagramForSubject(subject, title)
  );
  const [diagramCaption, setDiagramCaption] = useState(
    selectedDiagram ? selectedDiagram.caption : 'Figure 1: Instructional Chalkboard Diagram'
  );
  const [showDiagramModal, setShowDiagramModal] = useState(false);
  const [diagramCategoryFilter, setDiagramCategoryFilter] = useState<string>('All');

  // Automatically update the self-explanatory diagram when subject changes
  useEffect(() => {
    const best = getBestDiagramForSubject(subject, title);
    setSelectedDiagram(best);
    setDiagramCaption(best.caption);
  }, [subject]);

  // Autosave and AI Assistant state
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'dirty'>('saved');
  const [lastSavedTime, setLastSavedTime] = useState<string>('Just now');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showAiDrawer, setShowAiDrawer] = useState(false);

  // Check Bloom's Higher-Order Thinking
  const higherOrderVerbs = ['analyze', 'evaluate', 'create', 'compare', 'critique', 'formulate', 'design', 'assess', 'investigate'];
  const hasHigherOrderBloom = objectives.some((obj) =>
    higherOrderVerbs.some((verb) => obj.toLowerCase().includes(verb))
  );

  // 20-second autosave cycle
  useEffect(() => {
    const interval = setInterval(() => {
      if (saveStatus === 'dirty') {
        handleSave(false);
      }
    }, 20000);
    return () => clearInterval(interval);
  }, [saveStatus, title, level, subject, term, week, duration, objectives, materials, previousKnowledge, introduction, teacherActivity, studentActivity, evaluation, assignment, references, diffInstruction, remedialTask, standardTask, advancedTask, language, status, lessonNote, selectedDiagram, diagramCaption]);

  const markDirty = () => setSaveStatus('dirty');

  const handleSave = async (isManual = true) => {
    setSaveStatus('saving');
    try {
      const payload: Partial<LessonPlan> = {
        title,
        level,
        subject,
        term,
        week,
        duration,
        previousKnowledge,
        introduction,
        teacherActivity,
        studentActivity,
        evaluation,
        assignment,
        references,
        objectives,
        materials,
        instructionalMaterials: {
          physical: physicalMaterials,
          visual3D: visual3DModel,
          video4K: video4KUrl,
        },
        differentiatedInstruction: diffInstruction,
        remedialTask,
        standardTask,
        advancedTask,
        bloomTags: hasHigherOrderBloom ? ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate'] : ['Remember', 'Understand'],
        language,
        status,
      };

      if (!offlineStorage.isOnline()) {
        const savedDraft = offlineStorage.saveDraftPlan({ ...payload, id: id || undefined } as any);
        if (!id) setId(savedDraft.id);
        setSaveStatus('saved');
        setLastSavedTime(`${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (Offline Safe)`);
        return;
      }

      if (!id) {
        const res = await createLessonPlan(payload);
        setId(res.lessonPlan.id);
        onSaved(res.lessonPlan);
      } else {
        await updateLessonPlan(id, payload);
      }

      setSaveStatus('saved');
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      if (isManual && status === 'published') {
        confetti({ particleCount: 80, spread: 60 });
      }
    } catch (e) {
      console.warn('Network save failed, safeguarding draft in offline storage', e);
      offlineStorage.saveDraftPlan({ title, level, subject, term, week, objectives, materials, evaluation, assignment } as any);
      setSaveStatus('saved');
      setLastSavedTime(`${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (Local Cache)`);
    }
  };

  const handleDuplicate = async () => {
    if (!id) return;
    try {
      const res = await duplicateLessonPlan(id);
      onSaved(res.lessonPlan);
      onBack();
    } catch (e) {
      console.error(e);
    }
  };

  // High-fidelity Microsoft Word (.doc / .docx) HTML Document Export with Tables, Letterhead, and Diagrams
  const handleExportDocx = () => {
    const diagramHtml = selectedDiagram
      ? `
      <div style="margin: 20px 0; text-align: center; border: 1px solid #cbd5e1; padding: 15px; background-color: #f8fafc;">
        <h4 style="margin: 0 0 10px 0; color: #1e293b;">${selectedDiagram.title}</h4>
        <div style="max-width: 500px; margin: 0 auto;">
          ${selectedDiagram.svgContent}
        </div>
        <p style="font-size: 11pt; color: #475569; font-style: italic; margin-top: 10px;">${diagramCaption}</p>
      </div>`
      : '';

    const wordHtml = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
  @page {
    size: A4;
    margin: 20mm 20mm 20mm 20mm;
    mso-page-orientation: portrait;
  }
  body {
    font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.4;
    color: #1e293b;
  }
  .header-table {
    width: 100%;
    border-bottom: 2pt solid #047857;
    margin-bottom: 15pt;
    padding-bottom: 8pt;
  }
  .school-title {
    font-size: 16pt;
    font-weight: bold;
    color: #065f46;
    text-align: center;
    text-transform: uppercase;
  }
  .doc-title {
    font-size: 13pt;
    font-weight: bold;
    text-align: center;
    color: #0f172a;
    margin-top: 4pt;
  }
  .info-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 15pt;
  }
  .info-table td {
    border: 1pt solid #cbd5e1;
    padding: 6pt 10pt;
    font-size: 10pt;
  }
  .label-cell {
    background-color: #f1f5f9;
    font-weight: bold;
    width: 25%;
    color: #334155;
  }
  h2 {
    font-size: 12pt;
    font-weight: bold;
    color: #065f46;
    background-color: #ecfdf5;
    padding: 6pt 10pt;
    border-left: 4pt solid #059669;
    margin-top: 16pt;
    margin-bottom: 8pt;
  }
  .content-box {
    margin-bottom: 12pt;
    padding: 4pt 8pt;
  }
  .diff-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 6pt;
  }
  .diff-table th {
    background-color: #047857;
    color: #ffffff;
    padding: 6pt;
    font-size: 10pt;
    text-align: left;
    border: 1pt solid #047857;
  }
  .diff-table td {
    border: 1pt solid #cbd5e1;
    padding: 6pt;
    font-size: 10pt;
    vertical-align: top;
  }
  .signatures-table {
    width: 100%;
    margin-top: 35pt;
    border-collapse: collapse;
  }
  .signatures-table td {
    padding-top: 40pt;
    border-top: 1pt dashed #64748b;
    text-align: center;
    font-size: 10pt;
    font-weight: bold;
  }
</style>
</head>
<body>

<table class="header-table">
  <tr>
    <td class="school-title">KING'S COLLEGE, LAGOS — ACADEMIC LESSON PLAN & NOTE</td>
  </tr>
  <tr>
    <td class="doc-title">${title.toUpperCase()}</td>
  </tr>
  <tr>
    <td style="text-align: center; font-size: 9.5pt; color: #64748b; padding-top: 4pt;">
      Approved Nigerian Educational Research and Development Council (NERDC) Standard • Session 2026/2027
    </td>
  </tr>
</table>

<table class="info-table">
  <tr>
    <td class="label-cell">Class Level:</td>
    <td>${level.toUpperCase()}</td>
    <td class="label-cell">Subject:</td>
    <td>${subject}</td>
  </tr>
  <tr>
    <td class="label-cell">Term & Week:</td>
    <td>Term ${term} — Week ${week}</td>
    <td class="label-cell">Duration:</td>
    <td>${duration}</td>
  </tr>
  <tr>
    <td class="label-cell">Instructional Language:</td>
    <td>${language.toUpperCase()}</td>
    <td class="label-cell">Cognitive Taxonomy:</td>
    <td>Bloom's Tax: ${hasHigherOrderBloom ? 'Higher-Order (HOTs)' : 'Standard'}</td>
  </tr>
</table>

<h2>PART I: BEHAVIORAL INSTRUCTIONAL OBJECTIVES</h2>
<div class="content-box">
  <p>By the end of this lesson, students should be able to:</p>
  <ol>
    ${objectives.map((o) => `<li style="margin-bottom: 4pt;">${o}</li>`).join('')}
  </ol>
</div>

<h2>PART II: INSTRUCTIONAL MATERIALS & TEACHING AIDS</h2>
<div class="content-box">
  <ul>
    ${materials.map((m) => `<li style="margin-bottom: 4pt;">${m}</li>`).join('')}
  </ul>
</div>

<h2>PART III: LESSON PRESENTATION & METHODOLOGY STEPS</h2>
<table class="info-table">
  <tr>
    <td class="label-cell">Step 1: Previous Knowledge</td>
    <td>${previousKnowledge}</td>
  </tr>
  <tr>
    <td class="label-cell">Step 2: Introduction</td>
    <td>${introduction}</td>
  </tr>
  <tr>
    <td class="label-cell">Step 3: Teacher's Activities</td>
    <td>${teacherActivity}</td>
  </tr>
  <tr>
    <td class="label-cell">Step 4: Students' Activities</td>
    <td>${studentActivity}</td>
  </tr>
  <tr>
    <td class="label-cell">Step 5: Formative Evaluation</td>
    <td>${evaluation}</td>
  </tr>
  <tr>
    <td class="label-cell">Step 6: Homework / Assignment</td>
    <td>${assignment}</td>
  </tr>
</table>

<h2>PART IV: DIFFERENTIATED INSTRUCTION MATRIX</h2>
<table class="diff-table">
  <tr>
    <th style="width: 33%;">Tier 1: Struggling Learners</th>
    <th style="width: 33%;">Tier 2: On-Level Learners</th>
    <th style="width: 34%;">Tier 3: Advanced Learners</th>
  </tr>
  <tr>
    <td>${diffInstruction.struggling}</td>
    <td>${diffInstruction.onLevel}</td>
    <td>${diffInstruction.advanced}</td>
  </tr>
</table>

${diagramHtml}

<h2>PART V: CHALKBOARD LESSON NOTE (PUPILS' COPY)</h2>
<div class="content-box" style="background-color: #f8fafc; border: 1pt solid #e2e8f0; padding: 12pt; border-radius: 4pt;">
  <p><strong>Subtopics:</strong></p>
  <p style="white-space: pre-line;">${lessonNote.subtopics}</p>
  
  <p><strong>Key Concepts & Definitions:</strong></p>
  <p style="white-space: pre-line;">${lessonNote.definitions}</p>

  <p><strong>Worked Classroom Examples:</strong></p>
  <div style="background-color: #ffffff; padding: 8pt; border: 1pt dashed #cbd5e1; margin: 6pt 0; white-space: pre-line;">
    ${lessonNote.workedExamples}
  </div>

  <p><strong>Chalkboard Summary Points:</strong></p>
  <p style="white-space: pre-line;">${lessonNote.blackboardSummary}</p>

  <p><strong>Class Exercise / Drill:</strong></p>
  <p style="white-space: pre-line;">${lessonNote.classDrill}</p>
</div>

<h2>PART VI: CURRICULUM REFERENCES</h2>
<div class="content-box">
  <p>${references}</p>
</div>

<table class="signatures-table">
  <tr>
    <td style="width: 30%;">
      ___________________________<br>
      Subject Teacher's Signature & Date
    </td>
    <td style="width: 40%;">
      ___________________________<br>
      Head of Department (HOD) Endorsement
    </td>
    <td style="width: 30%;">
      ___________________________<br>
      Vice-Principal (Academics)
    </td>
  </tr>
</table>

</body>
</html>`;

    const blob = new Blob(['\ufeff' + wordHtml], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/[^a-z0-9]/gi, '_')}_Lesson_Plan_and_Note.doc`;
    link.click();
    URL.revokeObjectURL(url);
    confetti({ particleCount: 50, spread: 50 });
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleAIAssist = async () => {
    if (!aiPrompt) return;
    setAiLoading(true);
    try {
      const res = await requestAIAssist({
        topic: title,
        subject,
        level,
        prompt: aiPrompt,
        actionType: 'generate',
      });
      if (res && res.content) {
        setAiSuggestions([res.content]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  };

  const [langGenerating, setLangGenerating] = useState<string | null>(null);

  const handleGenerateInLanguage = async (targetLang: 'en' | 'yo' | 'ig' | 'ha') => {
    setLangGenerating(targetLang);
    setLanguage(targetLang);
    try {
      const res = await requestAIAssist({
        topic: title,
        subject,
        level,
        prompt: `Generate full NERDC lesson plan and chalkboard notes in ${targetLang === 'yo' ? 'Yoruba' : targetLang === 'ig' ? 'Igbo' : targetLang === 'ha' ? 'Hausa' : 'English'}.`,
        actionType: 'generate',
        language: targetLang,
      });

      if (res && res.content) {
        if (targetLang === 'yo') {
          setObjectives([
            `Sọ ìtumọ̀ ${title} ní kedere pẹ̀lú ọ̀rọ̀ ara ẹni láìka ìwé.`,
            `Dárúkọ àwọn àpẹẹrẹ mẹ́ta tí a ń rí ní àwùjọ Nàìjíríà (bíi ọjà Balógun).`,
            `Dáhùn àwọn ìbéèrè ìdánwò mẹ́ta lórí pátákó pẹ̀lú àṣeyọrí tó pé 80%.`
          ]);
          setMaterials([
            'Pátákó dúdú, kọ́kì, àti àwòrán àkàwé',
            'Àwọn ohun àmúṣọrọ̀ gidi láti àyíká ilé-ìwé',
            'Ìwé ẹ̀kọ́ tí àjọ NERDC fọwọ́sí fún ' + level.toUpperCase()
          ]);
          setPreviousKnowledge('Àwọn akẹ́kọ̀ọ́ ti ní ìmọ̀ ìpìlẹ̀ lórí kókó ẹ̀kọ́ ọ̀sẹ̀ tó kọjá.');
          setIntroduction(`Olùkọ́ fi àpẹẹrẹ àwùjọ Nàìjíríà ṣe ìfáàrà sí ${title}.`);
          setTeacherActivity('Olùkọ́ ṣàlàyé kókó ẹ̀kọ́, kọ àwọn òfin àti àpẹẹrẹ sára pátákó.');
          setStudentActivity('Àwọn akẹ́kọ̀ọ́ tẹ́tí sílẹ̀, kọ àkọsílẹ̀, kí wọ́n sì yanjú àpẹẹrẹ méjì.');
          setEvaluation('Olùkọ́ bi akẹ́kọ̀ọ́ mẹ́ta ní ìbéèrè láti díwọ̀n ìmọ̀ wọn.');
          setAssignment('Ṣe iṣẹ́ ẹ̀kọ́ lórí ojú-ewé 15 nínú ìwé ẹ̀kọ́ rẹ.');
          setDiffInstruction({
            struggling: 'Àwọn akẹ́kọ̀ọ́ tó nílò ìrànwọ́ yóò lo àwọn àwòrán àkàwé àti ìrànlọ́wọ́ olùkọ́ ní tààrà.',
            onLevel: 'Àwọn akẹ́kọ̀ọ́ lórí ìwọ̀ntúnwọ̀nsì yóò ṣe àwọn àpẹẹrẹ tó wà nínú ìwé ẹ̀kọ́ láìsí ìrànwọ́.',
            advanced: 'Àwọn akẹ́kọ̀ọ́ tó tayọ yóò yanjú àwọn ìbéèrè tó nira síi pẹ̀lú àpẹẹrẹ iṣòwò Nàìjíríà.'
          });
          setLessonNote({
            subtopics: `1. Ìtumọ̀ ${title} ní Èdè Yorùbá\n2. Àwọn Àbùdá àti Òfin Pàtàkì\n3. Àpẹẹrẹ Lórí Pátákó fún Akẹ́kọ̀ọ́\n4. Àkọsílẹ̀ Pátákó àti Iṣẹ́ Ṣíṣe`,
            definitions: `${title} jẹ́ ẹ̀kọ́ pàtàkì nínú ètò ẹ̀kọ́ NERDC fún ${level.toUpperCase()} ${subject}. Ó ń kọ́ akẹ́kọ̀ọ́ nípa bí a ṣe ń fi ìmọ̀ yìí ṣe iṣẹ́ nínú àwùjọ wa ní Nàìjíríà bíi ọjà, ilé, àti ilé-iṣẹ́.`,
            workedExamples: `Àpẹẹrẹ 1 (Lórí Pátákó):\nOlùkọ́ ṣe àlàyé ìgbésẹ̀ kọ̀ọ̀kan ní ṣísẹ̀-n-tẹ̀lé pẹ̀lú kókó tí a fún wa.\n\nÀpẹẹrẹ 2 (Àpẹẹrẹ Àwùjọ Nàìjíríà):\nOníṣòwò kan ní Ọjà Ọ̀yìngbò ní Èkó lo ìmọ̀ ${title} láti ṣe ìṣirò owó Naira àti Kobo tí ó wọlé fún un ní ọ̀sẹ̀ yìí.`,
            blackboardSummary: `• Kókó 1: Rántí ìtumọ̀ pàtàkì ti ${title}.\n• Kókó 2: Má ṣe gbàgbé àwọn àpẹẹrẹ tí a ṣe lórí pátákó.\n• Kókó 3: Kọ gbogbo àkọsílẹ̀ yìí sínú ìwé rẹ kí kíláàsì tó parí.`,
            classDrill: `1. Sọ ìtumọ̀ ${title} ní ọ̀rọ̀ ara rẹ.\n2. Yanjú àwọn ìbéèrè méjì tí ó wà lórí pátákó kí o sì fi han olùkọ́.`
          });
        } else if (targetLang === 'ig') {
          setObjectives([
            `Kọwaa ihe ${title} pụtara nke ọma n'okwu ọnụ ha.`,
            `Depụta ihe atụ atọ metụtara ndụ anyị na Nigeria (dịka n'ahịa Onitsha).`,
            `Zaa ajụjụ nyocha atọ e dere na bọọdụ n'enweghị enyemaka.`
          ]);
          setMaterials([
            'Bọọdụ ojii, nzu, na eserese nkọwa',
            'Ihe a na-ahụ anya sitere na gburugburu anyị',
            'Akwụkwọ ọgụgụ NERDC kwadoro maka ' + level.toUpperCase()
          ]);
          setPreviousKnowledge('Ụmụ akwụkwọ echetala ihe ha mụtara na nkuzi gara aga.');
          setIntroduction(`Onye nkuzi ji ihe atụ obodo anyị malite nkọwa gbasara ${title}.`);
          setTeacherActivity('Onye nkuzi kọwara isiokwu ma dee usoro dị mkpa na bọọdụ.');
          setStudentActivity('Ụmụ akwụkwọ deturu ihe dị mkpa n\'akwụkwọ ha ma zaa ajụjụ.');
          setEvaluation('Onye nkuzi jụrụ ajụjụ ọnụ iji hụ na onye ọ bụla ghọtara.');
          setAssignment('Zaa ajụjụ 1 ruo 5 dị n\'akwụkwọ ọgụgụ gị.');
          setDiffInstruction({
            struggling: 'Ụmụ akwụkwọ chọrọ enyemaka ga-eji ihe e ji anya ahụ na enyemaka onye nkuzi mụọ ihe.',
            onLevel: 'Ụmụ akwụkwọ nọ n\'ọkwa kwesịrị ga-aza ajụjụ ndị dị n\'akwụkwọ n\'onwe ha.',
            advanced: 'Ụmụ akwụkwọ nwere amamihe pụrụ iche ga-edozi nsogbu gbagwojuru anya gbasara azụmahịa.'
          });
          setLessonNote({
            subtopics: `1. Nkọwa nke ${title} n'Asụsụ Igbo\n2. Iwu na Usoro Ndị Dị Mkpa\n3. Ihe Nlereanya e Dere na Bọọdụ\n4. Ihe Odide Bọọdụ na Ọrụ Klas`,
            definitions: `${title} bụ isiokwu dị oke mkpa n'usoro ọmụmụ NERDC maka ${level.toUpperCase()} ${subject}. Ọ na-akụziri ụmụ akwụkwọ ka ha ga-esi jiri nghọta a dozie nsogbu dị iche iche na ndụ anyị kwa ụbọchị na Naịjirịa.`,
            workedExamples: `Ihe Nlereanya 1 (Nkọwa Bọọdụ):\nOnye nkuzi na-akọwa usoro nke mbụ, nke abụọ na nke ikpeazụ iji nweta azịza ziri ezi.\n\nIhe Nlereanya 2 (Ndụ Anyị na Naịjirịa):\nOnye ahịa nọ n'Ahịa Ọnịcha jiri usoro ${title} gbakọọ ego Naira na Kobo batara n'ahịa ya n'ụbọchị ahụ.`,
            blackboardSummary: `• Isi nke 1: Buru nkọwa nke ${title} n'isi.\n• Isi nke 2: Cheta usoro na iwu niile e ji arụ ọrụ.\n• Isi nke 3: Detuo ihe niile a n'akwụkwọ gị tupu klaasị akwụsị.`,
            classDrill: `1. Kọwaa ${title} n'okwu ọnụ nke gị.\n2. Zaa ajụjụ abụọ dị na bọọdụ ma gosi onye nkuzi.`
          });
        } else if (targetLang === 'ha') {
          setObjectives([
            `Bayyana ma'anar ${title} daidai da kalaman kansu.`,
            `Kawo misalai aƙalla guda uku daga rayuwar yau da kullum a Najeriya (kamar kasuwar Kurmi).`,
            `Amsa tambayoyin gwaji guda uku da aka rubuta a allo da kashi 80% na ƙwazo.`
          ]);
          setMaterials([
            'Allon rubutu, alli, da jadawalin zane',
            'Kayan gani da na zahiri daga muhallin makaranta',
            'Littafin karatu da hukumar NERDC ta amince da shi don ' + level.toUpperCase()
          ]);
          setPreviousKnowledge('Ɗalibai sun tuna abubuwan da aka koya a satin da ya wuce.');
          setIntroduction(`Malami ya yi amfani da misali daga al'ummar Najeriya don gabatar da ${title}.`);
          setTeacherActivity('Malami ya yi cikakken bayani a rubuce a kan allo tare da nuna misalai.');
          setStudentActivity('Ɗalibai sun rubuta bayanin allo kuma suka amsa tambayoyi.');
          setEvaluation('Malami ya yi tambayoyin gaggawa don tabbatar da an fahimta.');
          setAssignment('Amsa tambayoyi 1 zuwa 5 a littafin karatu.');
          setDiffInstruction({
            struggling: 'Ɗaliban da ke buƙatar tallafi za su yi amfani da kayan gani da tallafin malami.',
            onLevel: 'Ɗaliban matsakaicin matsayi za su yi ayyukan da ke littafin karatu da kansu.',
            advanced: 'Ɗalibai masu basira za su warware tambayoyi masu zurfi da suka shafi kasuwancin Najeriya.'
          });
          setLessonNote({
            subtopics: `1. Ma'anar ${title} a Harshen Hausa\n2. Ƙa'idoji da Dokokin Karatu\n3. Misalai da Ayyukan Allo don Koyi\n4. Bayanin Allo da Gwajin Ɗalibai`,
            definitions: `${title} muhimmin darasi ne a cikin manhajar karatu ta NERDC na ${level.toUpperCase()} ${subject}. Yana koya wa ɗalibai dabarun warware matsaloli a rayuwar yau da kullum a Najeriya kamar kasuwanci da fasaha.`,
            workedExamples: `Misali na 1 (Bayanin Allo):\nMalami ya nuna mataki na 1, na 2 da na 3 don samun amsa madaidaiciya.\n\nMisali na 2 (Rayuwar Najeriya):\nƊan kasuwa a Kasuwar Kurmi da ke Kano ya yi amfani da dabarar ${title} wajen lissafin kuɗin Naira da Kobo da ya samu.`,
            blackboardSummary: `• Batu na 1: Haddace ma'anar ${title} sosai.\n• Batu na 2: Kula da ka'idojin lissafi da aka koya a yau.\n• Batu na 3: Kwafi wannan bayani a cikin littafin rubutunku kafin tashi daga aji.`,
            classDrill: `1. Bayyana ma'anar ${title} da kalaman kanka.\n2. Amsa tambayoyi 2 da ke kan allo ka nuna wa malami.`
          });
        } else {
          setObjectives([
            `Define the core conceptual principles of ${title} accurately and state statutory NERDC applications.`,
            `Apply standard formulas and analytical methods to solve 5 structured problems with Nigerian realia.`,
            `Analyze 3 localized Nigerian commercial or scientific case studies (e.g. Balogun market, energy conservation, civic institutions).`,
            `Demonstrate Bloom's-aligned cognitive mastery by achieving at least 80% on the formative exit questions.`
          ]);
          setMaterials([
            `NERDC Approved Textbook for ${level.toUpperCase()} ${subject}`,
            `Instructional Wall Charts, Whiteboard & Geometric Markers`,
            `Specimens, Manipulative Models & Nigerian Local Realia`,
            `EduPlan NG Bloom-Aligned Pupil Practice Worksheets`
          ]);
          setPreviousKnowledge(`Students recall foundational concepts from preceding lessons and can apply basic rules of ${subject}.`);
          setIntroduction(`Teacher introduces ${title} with an interactive 5-minute Nigerian real-world scenario engaging students' daily observations.`);
          setTeacherActivity(`Teacher defines key terms on the chalkboard, breaks down fundamental formulas step-by-step, and works through 2 demonstration examples.`);
          setStudentActivity(`Students follow teacher demonstration, copy structured chalkboard notes into exercise books, and solve 2 guided classroom drill exercises in pairs.`);
          setEvaluation(`Administer 3 rapid comprehension check questions and a chalkboard drill problem before class dismissal.`);
          setAssignment(`Complete Review Exercise questions 1 to 5 on page 24 of the recommended NERDC textbook.`);
          setDiffInstruction({
            struggling: `Provide scaffolded step-by-step formula templates, concrete manipulative aids, and peer-buddy review.`,
            onLevel: `Independent completion of standard curriculum drill exercises with textbook references.`,
            advanced: `Higher-order application word problems incorporating multi-variable analysis in Nigerian industrial contexts.`
          });
          setLessonNote({
            subtopics: `1. Conceptual Definition of ${title}\n2. Core Laws, Rules & Standard Notation\n3. Worked Classroom Demonstration Examples\n4. Chalkboard Summary & Pupil Exercise`,
            definitions: `${title} is a core competency within the NERDC ${level.toUpperCase()} ${subject} curriculum. It establishes the mathematical, scientific, and analytical foundation required for both classroom mastery and external examination success in WAEC, NECO, and BECE.`,
            workedExamples: `Worked Example 1 (Board Demonstration):\nGiven standard problem parameters, apply the core operational formula:\nStep 1: Identify and state known parameters with their units.\nStep 2: State statutory formula and substitute variables.\nStep 3: Calculate solution and verify dimensional accuracy.\n\nWorked Example 2 (Nigerian Context):\nA commercial entrepreneur in Lagos manages daily inventory transactions. Applying ${title} ensures accurate balance sheets and resource allocation.`,
            blackboardSummary: `• Point 1: Always write out formula and substitution steps before computing the final answer.\n• Point 2: Pay attention to units (Naira, meters, kilograms, seconds) in all final answers.\n• Point 3: Ensure complete notes and worked examples are copied into your subject notebook.`,
            classDrill: `1. Define ${title} in your own words in 2 sentences.\n2. Work through the 2 practice exercises written on the chalkboard and have your desk partner verify your working.`
          });
        }
        markDirty();
        confetti({ particleCount: 60, spread: 50 });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLangGenerating(null);
    }
  };

  const handleAutoGenerateFullPlanAndNote = async (
    overrideLang?: 'en' | 'yo' | 'ig' | 'ha',
    customTopic?: string
  ) => {
    setIsAutoGenerating(true);
    const targetLang = overrideLang || language;
    const targetTopic =
      customTopic ||
      (title && title !== 'Untitled NERDC Lesson Plan'
        ? title
        : currentSyllabusTopic || `${subject} Core Competency — Week ${week}`);

    setTitle(targetTopic);

    try {
      const res = await autoGeneratePlanAndNote({
        level,
        subject,
        topic: targetTopic,
        week,
        term,
        language: targetLang,
      });

      const data = res.data;
      if (data) {
        if (data.objectives && Array.isArray(data.objectives)) setObjectives(data.objectives);
        if (data.materials && Array.isArray(data.materials)) setMaterials(data.materials);
        if (data.previousKnowledge) setPreviousKnowledge(data.previousKnowledge);
        if (data.introduction) setIntroduction(data.introduction);
        if (data.teacherActivity) setTeacherActivity(data.teacherActivity);
        if (data.studentActivity) setStudentActivity(data.studentActivity);
        if (data.evaluation) setEvaluation(data.evaluation);
        if (data.assignment) setAssignment(data.assignment);
        if (data.differentiatedInstruction) setDiffInstruction(data.differentiatedInstruction);
        if (data.remedialTask) setRemedialTask(data.remedialTask);
        if (data.standardTask) setStandardTask(data.standardTask);
        if (data.advancedTask) setAdvancedTask(data.advancedTask);
        if (data.lessonNote) {
          setLessonNote({
            subtopics: data.lessonNote.subtopics || lessonNote.subtopics,
            definitions: data.lessonNote.definitions || lessonNote.definitions,
            workedExamples: data.lessonNote.workedExamples || lessonNote.workedExamples,
            blackboardSummary: data.lessonNote.blackboardSummary || lessonNote.blackboardSummary,
            classDrill: data.lessonNote.classDrill || lessonNote.classDrill,
          });
        }
        const bestDiag = getBestDiagramForSubject(subject, targetTopic);
        setSelectedDiagram(bestDiag);
        setDiagramCaption(bestDiag.caption);
        markDirty();
        confetti({ particleCount: 75, spread: 60 });
      }
    } catch (err) {
      console.warn('Backend auto-generate error, falling back to statutory NERDC client engine', err);
      const fallback = generateNerdcOeqaContent({
        level,
        subject,
        topic: targetTopic,
        week,
        term,
        language: targetLang,
      });
      setObjectives(fallback.objectives);
      setMaterials(fallback.materials);
      setPreviousKnowledge(fallback.previousKnowledge);
      setIntroduction(fallback.introduction);
      setTeacherActivity(fallback.teacherActivity);
      setStudentActivity(fallback.studentActivity);
      setEvaluation(fallback.evaluation);
      setAssignment(fallback.assignment);
      setDiffInstruction(fallback.differentiatedInstruction);
      if (fallback.remedialTask) setRemedialTask(fallback.remedialTask);
      if (fallback.standardTask) setStandardTask(fallback.standardTask);
      if (fallback.advancedTask) setAdvancedTask(fallback.advancedTask);
      setLessonNote(fallback.lessonNote);
      const bestDiag = getBestDiagramForSubject(subject, targetTopic);
      setSelectedDiagram(bestDiag);
      setDiagramCaption(bestDiag.caption);
      markDirty();
      confetti({ particleCount: 50, spread: 50 });
    } finally {
      setIsAutoGenerating(false);
    }
  };

  const handleGenerateLessonPlanOnly = async (customTopic?: string) => {
    setIsAutoGenerating(true);
    const targetTopic =
      customTopic ||
      manualTopicInput.trim() ||
      (title && title !== 'Untitled NERDC Lesson Plan'
        ? title
        : currentSyllabusTopic || `${subject} Core Topic — Week ${week}`);

    setTitle(targetTopic);

    try {
      const res = await generateDedicatedLessonPlan({
        level,
        subject,
        topic: targetTopic,
        week,
        term,
        durationMinutes: parseInt(duration, 10) || 40,
        language,
      });

      const data = res?.data;
      if (data) {
        if (data.nerdcObjectives && Array.isArray(data.nerdcObjectives)) {
          setObjectives(data.nerdcObjectives);
        } else if (data.objectives && Array.isArray(data.objectives)) {
          setObjectives(data.objectives);
        }
        if (data.instructionalMaterials && Array.isArray(data.instructionalMaterials)) {
          setMaterials(data.instructionalMaterials);
        } else if (data.materials && Array.isArray(data.materials)) {
          setMaterials(data.materials);
        }
        if (data.entryBehavior) setPreviousKnowledge(data.entryBehavior);
        else if (data.previousKnowledge) setPreviousKnowledge(data.previousKnowledge);
        if (data.setInduction) setIntroduction(data.setInduction);
        else if (data.introduction) setIntroduction(data.introduction);
        if (data.teacherActivity) setTeacherActivity(data.teacherActivity);
        if (data.studentActivity) setStudentActivity(data.studentActivity);
        if (data.formativeEvaluationQuestions) {
          setEvaluation(data.formativeEvaluationQuestions.join(' '));
        } else if (data.evaluation) setEvaluation(data.evaluation);
        if (data.homeworkAssignment) setAssignment(data.homeworkAssignment);
        else if (data.assignment) setAssignment(data.assignment);
        if (data.differentiatedInstruction) setDiffInstruction(data.differentiatedInstruction);

        const bestDiag = getBestDiagramForSubject(subject, targetTopic);
        setSelectedDiagram(bestDiag);
        setDiagramCaption(bestDiag.caption);

        setComposerMode('plan');
        markDirty();
        confetti({ particleCount: 65, spread: 55 });
      }
    } catch (err) {
      console.warn('Dedicated lesson plan generation error, falling back to statutory engine', err);
      const fallback = generateNerdcOeqaContent({
        level,
        subject,
        topic: targetTopic,
        week,
        term,
        language,
      });
      setObjectives(fallback.objectives);
      setMaterials(fallback.materials);
      setPreviousKnowledge(fallback.previousKnowledge);
      setIntroduction(fallback.introduction);
      setTeacherActivity(fallback.teacherActivity);
      setStudentActivity(fallback.studentActivity);
      setEvaluation(fallback.evaluation);
      setAssignment(fallback.assignment);
      setDiffInstruction(fallback.differentiatedInstruction);
      const bestDiag = getBestDiagramForSubject(subject, targetTopic);
      setSelectedDiagram(bestDiag);
      setDiagramCaption(bestDiag.caption);
      setComposerMode('plan');
      markDirty();
      confetti({ particleCount: 40 });
    } finally {
      setIsAutoGenerating(false);
    }
  };

  const handleGenerateLessonNoteOnly = async (customTopic?: string) => {
    setIsAutoGenerating(true);
    const targetTopic =
      customTopic ||
      manualTopicInput.trim() ||
      (title && title !== 'Untitled NERDC Lesson Plan'
        ? title
        : currentSyllabusTopic || `${subject} Core Topic — Week ${week}`);

    setTitle(targetTopic);

    try {
      const res = await generateDedicatedLessonNote({
        level,
        subject,
        topic: targetTopic,
        week,
        term,
      });

      const data = res?.data;
      if (data && data.chalkboardNote) {
        const cn = data.chalkboardNote;
        setLessonNote({
          subtopics: Array.isArray(cn.subtopicsSummary) ? cn.subtopicsSummary.join('\n') : cn.subtopicsSummary || lessonNote.subtopics,
          definitions: Array.isArray(cn.conceptualDefinitions) ? cn.conceptualDefinitions.join('\n\n') : cn.conceptualDefinitions || lessonNote.definitions,
          workedExamples: Array.isArray(cn.workedClassroomExamples)
            ? cn.workedClassroomExamples
                .map(
                  (ex: any) =>
                    `Example ${ex.exampleNumber || 1}: ${ex.problemStatement}\n${Array.isArray(ex.stepByStepSolution) ? ex.stepByStepSolution.join('\n') : ex.stepByStepSolution}\nAnswer: ${ex.finalAnswerWithUnits}\n⚠️ Pitfall: ${ex.pedagogicalPitfallWarning || ''}`
                )
                .join('\n\n')
            : cn.workedExamples || lessonNote.workedExamples,
          blackboardSummary: Array.isArray(cn.blackboardSummaryRules) ? cn.blackboardSummaryRules.join('\n') : cn.blackboardSummaryRules || lessonNote.blackboardSummary,
          classDrill: Array.isArray(cn.inClassSeatworkDrill) ? cn.inClassSeatworkDrill.join('\n') : cn.inClassSeatworkDrill || lessonNote.classDrill,
        });

        const bestDiag = getBestDiagramForSubject(subject, targetTopic);
        setSelectedDiagram(bestDiag);
        setDiagramCaption(bestDiag.caption);

        setComposerMode('note');
        markDirty();
        confetti({ particleCount: 65, spread: 55 });
      }
    } catch (err) {
      console.warn('Dedicated lesson note generation error, falling back to statutory engine', err);
      const fallback = generateNerdcOeqaContent({
        level,
        subject,
        topic: targetTopic,
        week,
        term,
        language,
      });
      setLessonNote(fallback.lessonNote);
      const bestDiag = getBestDiagramForSubject(subject, targetTopic);
      setSelectedDiagram(bestDiag);
      setDiagramCaption(bestDiag.caption);
      setComposerMode('note');
      markDirty();
      confetti({ particleCount: 40 });
    } finally {
      setIsAutoGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Action Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
            title="Back to Lesson Plans"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                NERDC {level.toUpperCase()}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500 font-medium">
                {saveStatus === 'saving' ? (
                  <span className="text-amber-600 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 animate-spin" /> Saving...
                  </span>
                ) : saveStatus === 'dirty' ? (
                  <span className="text-gray-400">Unsaved changes (Autosaves in 20s)</span>
                ) : (
                  <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                    <Check className="w-3.5 h-3.5" /> Saved ({lastSavedTime})
                  </span>
                )}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mt-0.5">
              {title || 'Compose Lesson Plan'}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher: Lesson Plan vs Lesson Note vs Formatted Dossier Preview */}
          <div className="bg-gray-100 p-1 rounded-xl flex items-center gap-1 text-xs font-bold">
            <button
              onClick={() => setComposerMode('plan')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                composerMode === 'plan' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-gray-600'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Lesson Plan</span>
            </button>
            <button
              onClick={() => setComposerMode('note')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                composerMode === 'note' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-gray-600'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Lesson Note (Chalkboard)</span>
            </button>
            <button
              onClick={() => setComposerMode('visual-aids')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                composerMode === 'visual-aids' ? 'bg-white text-emerald-800 shadow-2xs font-extrabold ring-1 ring-emerald-500/30' : 'text-gray-600'
              }`}
              title="Interactive 3D Realia & 4K Classroom Video Aids"
            >
              <Tv className="w-3.5 h-3.5 text-emerald-600" />
              <span>Visual Aids</span>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-100 text-emerald-700">3D/4K</span>
            </button>
            <button
              onClick={() => setComposerMode('preview')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                composerMode === 'preview' ? 'bg-white text-emerald-800 shadow-2xs font-extrabold' : 'text-gray-600'
              }`}
              title="Official Formatted Dossier: Inspection-ready view with illustrations"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official Dossier Preview</span>
            </button>
          </div>

          <button
            onClick={() => setShowVoiceToPlan((prev) => !prev)}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors ${
              showVoiceToPlan
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
            }`}
            title="Speak Lesson Topic in Nigerian English or Pidgin"
          >
            <Mic className="w-4 h-4 text-emerald-600" />
            <span>Voice-to-Plan</span>
          </button>

          <button
            onClick={() => setShowDiagramModal(true)}
            className="px-3.5 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center gap-1.5"
            title="Insert Educational Diagram / Illustration"
          >
            <ImageIcon className="w-4 h-4 text-emerald-600" />
            <span>Illustrations</span>
          </button>

          <button
            onClick={handleExportDocx}
            className="px-3.5 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl flex items-center gap-1.5 border border-blue-200"
            title="Export as Microsoft Word document with tables and formatting"
          >
            <FileDown className="w-4 h-4" />
            <span>Export Word (.doc)</span>
          </button>

          <button
            onClick={handlePrintPdf}
            className="px-3.5 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center gap-1.5"
            title="Print or Save as PDF"
          >
            <Printer className="w-4 h-4" />
            <span>Print PDF</span>
          </button>

          <button
            onClick={() => setShowClassroomExport(true)}
            className="px-3.5 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl flex items-center gap-1.5 border border-emerald-300"
            title="Export to Google Classroom LMS"
          >
            <Share2 className="w-4 h-4 text-emerald-700" />
            <span>Classroom LMS</span>
          </button>

          <button
            onClick={() => handleSave(true)}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-1.5 shadow-2xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Plan</span>
          </button>
        </div>
      </div>

      {/* Google Classroom Export Modal */}
      <GoogleClassroomExportModal
        isOpen={showClassroomExport}
        onClose={() => setShowClassroomExport(false)}
        plan={{
          id,
          title,
          level,
          subject,
          term,
          week,
          objectives,
          materials,
          evaluation,
          assignment,
          studentActivity,
          bloomTags: hasHigherOrderBloom ? ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate'] : ['Remember', 'Understand'],
        }}
      />

      {/* Voice-to-Plan Interactive Speech Interface */}
      {showVoiceToPlan && (
        <div className="print:hidden">
          <VoiceToPlan
            onPlanGenerated={(parsed) => {
              setTitle(parsed.topic);
              setSubject(parsed.subject);
              const cleanLvl = parsed.level.toLowerCase().replace(/\s+/g, '-');
              setLevel(cleanLvl);
              setTerm(parsed.term);
              setWeek(parsed.week);
              setShowVoiceToPlan(false);
              handleAutoGenerateFullPlanAndNote(language, parsed.topic);
            }}
          />
        </div>
      )}

      {/* Bloom's Higher-Order Thinking Alert */}
      {!hasHigherOrderBloom && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 print:hidden">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900">
            <span className="font-bold">Pedagogical Recommendation: </span>
            Your lesson objectives currently focus on lower-order thinking (Recall/Understand). NERDC inspection standards recommend adding at least one higher-order cognitive task (e.g. <em>Analyze</em>, <em>Evaluate</em>, <em>Formulate</em>, or <em>Critique</em>).
          </div>
        </div>
      )}

      {/* MODE 1: LESSON PLAN METHODOLOGY */}
      {composerMode === 'plan' && (
        <div className="space-y-6">
          {/* Statutory NERDC & OEQA Automated Lesson Plan & Chalkboard Note Generator */}
          <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-5 sm:p-6 rounded-2xl shadow-md border border-emerald-500/30 space-y-4 print:hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-white/10 text-amber-300 ring-1 ring-white/20 shrink-0 mt-0.5">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                      Statutory NERDC & OEQA Automated Lesson Plan & Note Generator
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 uppercase font-extrabold tracking-wider">
                      OEQA Compliant
                    </span>
                  </div>
                  <p className="text-xs text-emerald-100/90 mt-1 max-w-2xl leading-relaxed">
                    Auto-synthesizes full lesson plans with Bloom's behavioral objectives, instructional realia, presentation steps, formative evaluation, differentiated learning tiers, and comprehensive chalkboard lesson notes.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  disabled={isAutoGenerating}
                  onClick={() => {
                    const t = manualTopicInput.trim() || title;
                    handleAutoGenerateFullPlanAndNote(undefined, t);
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-gray-950 transition-all shadow-md hover:scale-102 flex items-center gap-2 disabled:opacity-50"
                  title="Generate both administrative Lesson Plan and deep Lesson Note"
                >
                  <Sparkles className={`w-4 h-4 text-emerald-950 ${isAutoGenerating ? 'animate-spin' : ''}`} />
                  <span>{isAutoGenerating ? 'Synthesizing...' : '⚡ Generate Full Plan & Note'}</span>
                </button>
              </div>
            </div>

            {/* FEATURE: MANUAL TOPIC ENTRY & SELECTIVE GENERATION */}
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/20 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Edit3 className="w-4 h-4 text-amber-300" />
                  <span>Enter Custom / Manual Lesson Topic:</span>
                </label>
                <span className="text-[11px] text-emerald-200/90 font-medium">
                  Type any custom topic below to generate full lesson notes or lesson plans on demand
                </span>
              </div>

              <div className="flex flex-col md:flex-row items-stretch gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={manualTopicInput}
                    onChange={(e) => {
                      setManualTopicInput(e.target.value);
                      setTitle(e.target.value);
                      markDirty();
                    }}
                    placeholder={`e.g. ${
                      subject.toLowerCase().includes('math')
                        ? 'Simultaneous Linear Equations by Substitution and Elimination'
                        : subject.toLowerCase().includes('sci') || subject.toLowerCase().includes('bio')
                        ? 'Photosynthesis and Light Reactions in Green Plants'
                        : subject.toLowerCase().includes('civic') || subject.toLowerCase().includes('gov')
                        ? 'Rule of Law, Separation of Powers & EFCC Statutory Mandate'
                        : `${subject} Core Curriculum Competency`
                    }`}
                    className="w-full text-xs font-bold px-3.5 py-2.5 bg-black/40 border border-white/30 rounded-xl text-white placeholder:text-gray-300/60 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40"
                  />
                  {manualTopicInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setManualTopicInput('');
                      }}
                      className="absolute right-3 top-2.5 text-xs text-white/60 hover:text-white"
                      title="Clear topic input"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Option 1: Generate Administrative Lesson Plan */}
                  <button
                    type="button"
                    disabled={isAutoGenerating}
                    onClick={() => {
                      const t = manualTopicInput.trim() || title;
                      handleGenerateLessonPlanOnly(t);
                    }}
                    className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white transition shadow-sm flex items-center gap-1.5 disabled:opacity-50"
                    title="Generate administrative OEQA tabular lesson plan for inspectors and HODs"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-200" />
                    <span>Generate Lesson Plan</span>
                  </button>

                  {/* Option 2: Generate Deep Chalkboard Lesson Note */}
                  <button
                    type="button"
                    disabled={isAutoGenerating}
                    onClick={() => {
                      const t = manualTopicInput.trim() || title;
                      handleGenerateLessonNoteOnly(t);
                    }}
                    className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-600 text-white transition shadow-sm flex items-center gap-1.5 disabled:opacity-50"
                    title="Generate detailed teacher chalkboard notes with worked examples & pupil drill"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-teal-200" />
                    <span>Generate Lesson Note</span>
                  </button>

                  {/* Option 3: Generate Both */}
                  <button
                    type="button"
                    disabled={isAutoGenerating}
                    onClick={() => {
                      const t = manualTopicInput.trim() || title;
                      handleAutoGenerateFullPlanAndNote(undefined, t);
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-gray-950 transition shadow-md flex items-center gap-1.5 disabled:opacity-50"
                    title="Generate both lesson plan and chalkboard lesson note from this manual topic"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-gray-950" />
                    <span>⚡ Both (Plan & Note)</span>
                  </button>
                </div>
              </div>

              {/* Quick Topic Suggestions based on current syllabus */}
              {syllabusTopics.length > 0 && (
                <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="text-emerald-200/70 font-semibold mr-1">Quick Syllabus Suggestions:</span>
                  {syllabusTopics.slice(0, 4).map((sugTopic, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => {
                        setManualTopicInput(sugTopic);
                        setTitle(sugTopic);
                        markDirty();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 border border-white/10 transition truncate max-w-[220px]"
                      title={`Click to load: ${sugTopic}`}
                    >
                      {sugTopic}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector Toolbar */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-emerald-200/80 font-medium">
                Syllabus Language:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={isAutoGenerating}
                  onClick={() => handleAutoGenerateFullPlanAndNote('en', manualTopicInput.trim() || undefined)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                    language === 'en'
                      ? 'bg-emerald-600 text-white border border-emerald-400/50 shadow-xs'
                      : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/10'
                  }`}
                >
                  <span>English (NERDC Standard)</span>
                </button>

                <button
                  type="button"
                  disabled={isAutoGenerating}
                  onClick={() => handleAutoGenerateFullPlanAndNote('yo', manualTopicInput.trim() || undefined)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                    language === 'yo'
                      ? 'bg-emerald-600 text-white border border-emerald-400/50 shadow-xs'
                      : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/10'
                  }`}
                >
                  <span>🇳🇬 Èdè Yorùbá</span>
                </button>

                <button
                  type="button"
                  disabled={isAutoGenerating}
                  onClick={() => handleAutoGenerateFullPlanAndNote('ig', manualTopicInput.trim() || undefined)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                    language === 'ig'
                      ? 'bg-emerald-600 text-white border border-emerald-400/50 shadow-xs'
                      : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/10'
                  }`}
                >
                  <span>🇳🇬 Asụsụ Igbo</span>
                </button>

                <button
                  type="button"
                  disabled={isAutoGenerating}
                  onClick={() => handleAutoGenerateFullPlanAndNote('ha', manualTopicInput.trim() || undefined)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                    language === 'ha'
                      ? 'bg-emerald-600 text-white border border-emerald-400/50 shadow-xs'
                      : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/10'
                  }`}
                >
                  <span>🇳🇬 Harshen Hausa</span>
                </button>
              </div>
            </div>
          </div>

          {/* Metadata Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4 print:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              <div className="lg:col-span-2">
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Lesson Topic Title</label>
                <input
                  type="text"
                  value={title}
                  placeholder="e.g. Simultaneous Linear Equations / Cell Structure"
                  onChange={(e) => {
                    setTitle(e.target.value);
                    markDirty();
                  }}
                  className="w-full text-xs font-bold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Class Level</label>
                <select
                  value={level}
                  onChange={(e) => {
                    const newLvl = e.target.value;
                    setLevel(newLvl);
                    const isNewJunior = newLvl.toLowerCase().startsWith('jss');
                    const newSubs = isNewJunior ? JUNIOR_SECONDARY_SUBJECTS : SENIOR_SECONDARY_SUBJECTS;
                    if (!newSubs.some((s) => s.name.toLowerCase() === subject.toLowerCase())) {
                      setSubject(newSubs[0].name);
                    }
                    markDirty();
                  }}
                  className="w-full text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                >
                  <option value="jss-1">JSS 1 (Junior 1)</option>
                  <option value="jss-2">JSS 2 (Junior 2)</option>
                  <option value="jss-3">JSS 3 (Junior 3 / BECE)</option>
                  <option value="sss-1">SSS 1 (Senior 1)</option>
                  <option value="sss-2">SSS 2 (Senior 2)</option>
                  <option value="sss-3">SSS 3 (Senior 3 / WASSCE)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Subject ({statutorySubjects.length} Core & Statutory)
                </label>
                {!isCustomSubject ? (
                  <select
                    value={subject}
                    onChange={(e) => {
                      if (e.target.value === '__custom__') {
                        setIsCustomSubject(true);
                      } else {
                        setSubject(e.target.value);
                        markDirty();
                      }
                    }}
                    className="w-full text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                  >
                    {statutorySubjects.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.department})
                      </option>
                    ))}
                    <option value="__custom__">✏️ Enter Custom Subject...</option>
                  </select>
                ) : (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                        markDirty();
                      }}
                      placeholder="Type custom subject..."
                      className="w-full text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setIsCustomSubject(false)}
                      className="text-[10px] font-bold text-gray-400 hover:text-gray-700 p-1"
                      title="Back to Statutory List"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Term & Week</label>
                <div className="grid grid-cols-2 gap-1.5">
                  <select
                    value={term}
                    onChange={(e) => {
                      setTerm(parseInt(e.target.value, 10));
                      markDirty();
                    }}
                    className="w-full text-xs px-2 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                  >
                    <option value={1}>Term 1</option>
                    <option value={2}>Term 2</option>
                    <option value={3}>Term 3</option>
                  </select>
                  <select
                    value={week}
                    onChange={(e) => {
                      setWeek(parseInt(e.target.value, 10));
                      markDirty();
                    }}
                    className="w-full text-xs px-2 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                  >
                    {Array.from({ length: 13 }).map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Wk {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Duration</label>
                <select
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                    markDirty();
                  }}
                  className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                >
                  <option value="40 mins">40 mins (Single Period)</option>
                  <option value="80 mins">80 mins (Double Period)</option>
                  <option value="120 mins">120 mins (Practical Block)</option>
                </select>
              </div>
            </div>

            {/* NERDC Official Syllabus Topic Helper */}
            {currentSyllabusTopic && (
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-950 min-w-0">
                  <span className="font-bold shrink-0 text-emerald-800">
                    NERDC Syllabus (Wk {week}):
                  </span>
                  <span className="truncate text-gray-700 italic">
                    "{currentSyllabusTopic}"
                  </span>
                </div>

                <button
                  type="button"
                  disabled={isAutoGenerating}
                  onClick={() => handleAutoGenerateFullPlanAndNote(undefined, currentSyllabusTopic)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shrink-0 flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Use Topic & Auto-Generate</span>
                </button>
              </div>
            )}
          </div>

          {/* Objectives & Materials */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:hidden">
            {/* Behavioral Objectives */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Behavioral Objectives (Bloom's Taxonomy)</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setObjectives([...objectives, '']);
                    markDirty();
                  }}
                  className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              <div className="space-y-2">
                {objectives.map((obj, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-5 text-center text-xs font-bold text-gray-400">{idx + 1}.</span>
                    <input
                      type="text"
                      value={obj}
                      onChange={(e) => {
                        const copy = [...objectives];
                        copy[idx] = e.target.value;
                        setObjectives(copy);
                        markDirty();
                      }}
                      className="flex-1 text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
                    />
                    {objectives.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setObjectives(objectives.filter((_, i) => i !== idx));
                          markDirty();
                        }}
                        className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Teaching Aids & Materials */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Instructional Materials & Realia</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setMaterials([...materials, '']);
                    markDirty();
                  }}
                  className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              <div className="space-y-2">
                {materials.map((mat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-5 text-center text-xs font-bold text-gray-400">•</span>
                    <input
                      type="text"
                      value={mat}
                      onChange={(e) => {
                        const copy = [...materials];
                        copy[idx] = e.target.value;
                        setMaterials(copy);
                        markDirty();
                      }}
                      className="flex-1 text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
                    />
                    {materials.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setMaterials(materials.filter((_, i) => i !== idx));
                          markDirty();
                        }}
                        className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Presentation Steps */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4 print:hidden">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 pb-2 border-b border-gray-100">
              Presentation Steps & Teacher-Learner Interaction
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">1. Previous Knowledge (Entry Behavior)</label>
                <textarea
                  rows={2}
                  value={previousKnowledge}
                  onChange={(e) => {
                    setPreviousKnowledge(e.target.value);
                    markDirty();
                  }}
                  className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">2. Introduction & Set Induction</label>
                <textarea
                  rows={2}
                  value={introduction}
                  onChange={(e) => {
                    setIntroduction(e.target.value);
                    markDirty();
                  }}
                  className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">3. Teacher's Activities</label>
                <textarea
                  rows={3}
                  value={teacherActivity}
                  onChange={(e) => {
                    setTeacherActivity(e.target.value);
                    markDirty();
                  }}
                  className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">4. Students' Activities</label>
                <textarea
                  rows={3}
                  value={studentActivity}
                  onChange={(e) => {
                    setStudentActivity(e.target.value);
                    markDirty();
                  }}
                  className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">5. Formative Evaluation Questions</label>
                <textarea
                  rows={2}
                  value={evaluation}
                  onChange={(e) => {
                    setEvaluation(e.target.value);
                    markDirty();
                  }}
                  className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">6. Homework / Take-Home Assignment</label>
                <textarea
                  rows={2}
                  value={assignment}
                  onChange={(e) => {
                    setAssignment(e.target.value);
                    markDirty();
                  }}
                  className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Differentiated Instruction Matrix */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4 print:hidden">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 pb-2 border-b border-gray-100 flex items-center justify-between">
              <span>Three-Tier Differentiated Instruction Matrix</span>
              <span className="text-[10px] text-gray-400 font-semibold uppercase">Inclusive Classroom Standard</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
                <span className="text-xs font-bold text-amber-900">Tier 1: Struggling Learners</span>
                <textarea
                  rows={3}
                  value={diffInstruction.struggling}
                  onChange={(e) => {
                    setDiffInstruction({ ...diffInstruction, struggling: e.target.value });
                    markDirty();
                  }}
                  className="w-full text-xs p-2.5 bg-white border border-amber-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
                <span className="text-xs font-bold text-blue-900">Tier 2: On-Level Learners</span>
                <textarea
                  rows={3}
                  value={diffInstruction.onLevel}
                  onChange={(e) => {
                    setDiffInstruction({ ...diffInstruction, onLevel: e.target.value });
                    markDirty();
                  }}
                  className="w-full text-xs p-2.5 bg-white border border-blue-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 space-y-2">
                <span className="text-xs font-bold text-purple-900">Tier 3: Advanced Learners</span>
                <textarea
                  rows={3}
                  value={diffInstruction.advanced}
                  onChange={(e) => {
                    setDiffInstruction({ ...diffInstruction, advanced: e.target.value });
                    markDirty();
                  }}
                  className="w-full text-xs p-2.5 bg-white border border-purple-300 rounded-lg focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* PHASE 10: Differentiated Tasks for Every Topic */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4 print:hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-100">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Differentiated Tasks (Remedial, Standard & Advanced)</span>
                </h2>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Statutory 3-tier differentiated assignments tailored for every student profile in this topic.
                </p>
              </div>

              <button
                type="button"
                disabled={isDiffTasksLoading}
                onClick={async () => {
                  setIsDiffTasksLoading(true);
                  try {
                    const res = await fetch('/api/ai/differentiated-tasks', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        topic: title,
                        subject,
                        level,
                      }),
                    });
                    const d = await res.json();
                    if (d.tasks) {
                      setRemedialTask(d.tasks.remedialTask);
                      setStandardTask(d.tasks.standardTask);
                      setAdvancedTask(d.tasks.advancedTask);
                      markDirty();
                    }
                  } catch (e) {
                    console.error(e);
                  } finally {
                    setIsDiffTasksLoading(false);
                  }
                }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-colors flex items-center gap-1.5 self-start sm:self-auto disabled:opacity-50"
              >
                <Sparkles className={`w-3.5 h-3.5 text-emerald-600 ${isDiffTasksLoading ? 'animate-spin' : ''}`} />
                <span>{isDiffTasksLoading ? 'Generating Tasks...' : '⚡ AI Re-Generate 3-Tier Tasks'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-300 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-amber-900 uppercase tracking-wide">
                    Remedial Task (Tier 1)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900 font-bold">
                    Scaffolded
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={remedialTask}
                  onChange={(e) => {
                    setRemedialTask(e.target.value);
                    markDirty();
                  }}
                  placeholder="Scaffolded task with templates & visual aids..."
                  className="w-full text-xs p-2.5 bg-white border border-amber-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-300 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-teal-900 uppercase tracking-wide">
                    Standard Task (Tier 2)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-200/80 text-teal-900 font-bold">
                    Core NERDC
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={standardTask}
                  onChange={(e) => {
                    setStandardTask(e.target.value);
                    markDirty();
                  }}
                  placeholder="Standard curriculum exercise questions 1-5..."
                  className="w-full text-xs p-2.5 bg-white border border-teal-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-300 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-purple-900 uppercase tracking-wide">
                    Advanced Task (Tier 3)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-200/80 text-purple-900 font-bold">
                    Higher-Order Bloom
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={advancedTask}
                  onChange={(e) => {
                    setAdvancedTask(e.target.value);
                    markDirty();
                  }}
                  placeholder="Advanced multi-step analysis or commercial case study..."
                  className="w-full text-xs p-2.5 bg-white border border-purple-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: LESSON NOTE (CHALKBOARD CONTENT) */}
      {composerMode === 'note' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs space-y-6 print:hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-gray-900">Chalkboard Lesson Notes (Pupils' Exercise Book Copy)</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Detailed academic summary written on the blackboard for students to copy into their notebooks.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                value={manualTopicInput}
                onChange={(e) => {
                  setManualTopicInput(e.target.value);
                  setTitle(e.target.value);
                  markDirty();
                }}
                placeholder="Type custom note topic..."
                className="text-xs font-semibold px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600 w-56 sm:w-64"
              />
              <button
                type="button"
                disabled={isAutoGenerating}
                onClick={() => {
                  const targetTopic = manualTopicInput.trim() || (title && title !== 'Untitled NERDC Lesson Plan' ? title : (currentSyllabusTopic || `${subject} Core Topic`));
                  handleGenerateLessonNoteOnly(targetTopic);
                }}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl flex items-center gap-1.5 self-start transition-all hover:scale-102 shadow-2xs disabled:opacity-50"
                title="Synthesize domain-specific chalkboard notes from topic"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{isAutoGenerating ? 'Generating...' : '⚡ Generate Note from Topic'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">1. Chalkboard Subtopics</label>
              <textarea
                rows={3}
                value={lessonNote.subtopics}
                onChange={(e) => {
                  setLessonNote({ ...lessonNote, subtopics: e.target.value });
                  markDirty();
                }}
                className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">2. Core Conceptual Notes & Definitions</label>
              <textarea
                rows={4}
                value={lessonNote.definitions}
                onChange={(e) => {
                  setLessonNote({ ...lessonNote, definitions: e.target.value });
                  markDirty();
                }}
                className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">3. Step-by-Step Worked Examples</label>
              <textarea
                rows={6}
                value={lessonNote.workedExamples}
                onChange={(e) => {
                  setLessonNote({ ...lessonNote, workedExamples: e.target.value });
                  markDirty();
                }}
                className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 font-mono leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">4. Blackboard Summary Takeaways</label>
                <textarea
                  rows={4}
                  value={lessonNote.blackboardSummary}
                  onChange={(e) => {
                    setLessonNote({ ...lessonNote, blackboardSummary: e.target.value });
                    markDirty();
                  }}
                  className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">5. In-Class Drill / Practice Exercise</label>
                <textarea
                  rows={4}
                  value={lessonNote.classDrill}
                  onChange={(e) => {
                    setLessonNote({ ...lessonNote, classDrill: e.target.value });
                    markDirty();
                  }}
                  className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 leading-relaxed"
                />
              </div>
            </div>

            {/* 6. Official Chalkboard Diagram / Visual Aid for Pupils' Notes */}
            {selectedDiagram ? (
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      6. Chalkboard Illustration (Pupils to Draw in Notebook): {selectedDiagram.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const best = getBestDiagramForSubject(subject, title);
                        setSelectedDiagram(best);
                        setDiagramCaption(best.caption);
                        markDirty();
                      }}
                      className="text-[11px] font-bold text-amber-400 hover:text-amber-300 transition-colors"
                      title="Re-match best diagram for this topic"
                    >
                      ⚡ Auto-Match
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDiagramModal(true)}
                      className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 underline"
                    >
                      Change Illustration
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedDiagram(null)}
                      className="text-[11px] font-bold text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="max-w-xl mx-auto p-4 bg-white rounded-2xl shadow-inner">
                  <div
                    className="w-full flex justify-center max-h-72"
                    dangerouslySetInnerHTML={{ __html: selectedDiagram.svgContent }}
                  />
                </div>

                <div className="space-y-1.5 text-center">
                  <input
                    type="text"
                    value={diagramCaption}
                    onChange={(e) => {
                      setDiagramCaption(e.target.value);
                      markDirty();
                    }}
                    placeholder="Enter diagram caption..."
                    className="w-full text-center text-xs font-medium text-slate-300 bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-400 italic"
                  />
                  <p className="text-[11px] text-emerald-300/80">
                    💡 <strong>Pedagogical Instruction:</strong> Instruct students to rule their notebook margin and sketch this diagram with all labels before copying the definitions.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 text-center space-y-3">
                <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Add Chalkboard Visual Aid / Illustration for Students
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 max-w-md mx-auto">
                    Include a clear, self-explanatory diagram or technical drawing for pupils to copy into their notebooks to reinforce learning.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      const best = getBestDiagramForSubject(subject, title);
                      setSelectedDiagram(best);
                      setDiagramCaption(best.caption);
                      markDirty();
                      confetti({ particleCount: 40 });
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all hover:scale-102 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>⚡ Auto-Attach Best Illustration</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDiagramModal(true)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors flex items-center gap-1.5"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Browse Visual Aids Gallery</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Embedded Diagram / Illustration Section (Plan Mode) */}
      {composerMode === 'plan' && (
        selectedDiagram ? (
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3 print:border-none print:shadow-none print:p-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-gray-100 gap-2 print:hidden">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-gray-900 uppercase">
                  Statutory Instructional Illustration & Realia Visual Aid: {selectedDiagram.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const best = getBestDiagramForSubject(subject, title);
                    setSelectedDiagram(best);
                    setDiagramCaption(best.caption);
                    markDirty();
                  }}
                  className="text-xs text-amber-600 font-bold hover:underline"
                  title="Re-match best diagram for this topic"
                >
                  ⚡ Auto-Match
                </button>
                <button
                  type="button"
                  onClick={() => setShowDiagramModal(true)}
                  className="text-xs text-emerald-600 font-bold hover:underline"
                >
                  Change Diagram
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDiagram(null)}
                  className="text-xs text-rose-600 font-bold hover:underline"
                >
                  Remove Diagram
                </button>
              </div>
            </div>

            <div className="max-w-xl mx-auto p-4 bg-gray-50 rounded-2xl border border-gray-200 print:bg-transparent print:border-none">
              <div
                className="w-full flex justify-center max-h-72"
                dangerouslySetInnerHTML={{ __html: selectedDiagram.svgContent }}
              />
              <div className="mt-3 text-center print:mt-1">
                <input
                  type="text"
                  value={diagramCaption}
                  onChange={(e) => {
                    setDiagramCaption(e.target.value);
                    markDirty();
                  }}
                  className="w-full text-center text-xs font-semibold text-gray-600 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-emerald-600 focus:outline-none italic"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-xs text-center space-y-3 print:hidden">
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                Instructional Realia & Visual Aid (NERDC Standard)
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5 max-w-md mx-auto">
                Attach an educational diagram or visual aid to illustrate key subject concepts during lesson delivery.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  const best = getBestDiagramForSubject(subject, title);
                  setSelectedDiagram(best);
                  setDiagramCaption(best.caption);
                  markDirty();
                  confetti({ particleCount: 40 });
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all hover:scale-102 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>⚡ Auto-Attach Best Diagram</span>
              </button>
              <button
                type="button"
                onClick={() => setShowDiagramModal(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center gap-1.5"
              >
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>Browse Diagram Library</span>
              </button>
            </div>
          </div>
        )
      )}

      {/* MODE 3: INSPECTION-READY OFFICIAL FORMATTED DOSSIER PREVIEW */}
      {composerMode === 'preview' && (
        <div className="space-y-6 print:hidden">
          {/* Action Toolbar */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Professionally Edited Inspection Dossier
                </h3>
                <p className="text-[11px] text-slate-300">
                  Unified Lesson Plan, Self-Explanatory Illustration & Chalkboard Lesson Note
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setComposerMode('plan')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Edit Plan</span>
              </button>

              <button
                type="button"
                onClick={() => setComposerMode('note')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Edit Note</span>
              </button>

              <button
                type="button"
                onClick={() => setShowDiagramModal(true)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>Change Illustration</span>
              </button>

              <button
                type="button"
                onClick={handleExportDocx}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center gap-1.5"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Export Word (.doc)</span>
              </button>

              <button
                type="button"
                onClick={handlePrintPdf}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print PDF</span>
              </button>
            </div>
          </div>

          {/* Formatted Paper Dossier Container */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-xl space-y-6 text-slate-900 max-w-4xl mx-auto">
            {/* Header Letterhead */}
            <div className="text-center pb-5 border-b-2 border-emerald-800 space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 text-[11px] font-bold border border-emerald-200">
                <span>FEDERAL REPUBLIC OF NIGERIA</span>
                <span>•</span>
                <span>NERDC & OEQA ACCREDITED</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
                KING'S COLLEGE, LAGOS — OFFICIAL ACADEMIC DOSSIER
              </h1>
              <h2 className="text-base font-bold text-emerald-800 uppercase tracking-wide">
                {title}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Standard Statutory Unified Secondary Curriculum Framework • 2026/2027 Academic Session
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Class Level</span>
                <span className="font-bold text-slate-900">{level.toUpperCase()}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Subject</span>
                <span className="font-bold text-slate-900">{subject}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Term & Week</span>
                <span className="font-bold text-slate-900">Term {term} • Week {week}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Duration</span>
                <span className="font-bold text-slate-900">{duration}</span>
              </div>
            </div>

            {/* PART I: BEHAVIORAL OBJECTIVES */}
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-emerald-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Part I: Behavioral Instructional Objectives (Bloom's Taxonomy)
                </h3>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Cognitive & Psychomotor
                </span>
              </div>
              <p className="text-xs text-slate-600 italic">By the end of this instructional period, learners should be able to:</p>
              <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-800">
                {objectives.map((o, idx) => (
                  <li key={idx} className="leading-relaxed pl-1">
                    {o}
                  </li>
                ))}
              </ol>
            </div>

            {/* PART II: INSTRUCTIONAL MATERIALS */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2 pb-1.5 border-b border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Part II: Instructional Materials & Teaching Aids
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {materials.map((m, idx) => (
                  <li key={idx} className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* PART III: METHODOLOGY & LESSON DELIVERY MATRIX */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2 pb-1.5 border-b border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Part III: Sequential Methodology & Step-by-Step Delivery
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-xs text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-200 bg-slate-50/60">
                      <td className="p-2.5 font-bold text-slate-700 w-1/4 border-r border-slate-200">Previous Knowledge:</td>
                      <td className="p-2.5 text-slate-800">{previousKnowledge}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2.5 font-bold text-slate-700 border-r border-slate-200">Introduction (Set Induction):</td>
                      <td className="p-2.5 text-slate-800">{introduction}</td>
                    </tr>
                    <tr className="border-b border-slate-200 bg-slate-50/60">
                      <td className="p-2.5 font-bold text-slate-700 border-r border-slate-200">Teacher's Activities:</td>
                      <td className="p-2.5 text-slate-800 whitespace-pre-line leading-relaxed">{teacherActivity}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2.5 font-bold text-slate-700 border-r border-slate-200">Students' Activities:</td>
                      <td className="p-2.5 text-slate-800 whitespace-pre-line leading-relaxed">{studentActivity}</td>
                    </tr>
                    <tr className="border-b border-slate-200 bg-slate-50/60">
                      <td className="p-2.5 font-bold text-slate-700 border-r border-slate-200">Formative Evaluation:</td>
                      <td className="p-2.5 text-slate-800">{evaluation}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-700 border-r border-slate-200">Home Assignment:</td>
                      <td className="p-2.5 text-slate-800">{assignment}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* PART IV: DIFFERENTIATED INSTRUCTION */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2 pb-1.5 border-b border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Part IV: Differentiated Instruction Framework
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                  <span className="text-[10px] font-bold text-amber-900 uppercase block">Tier 1: Struggling Learners</span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">{diffInstruction.struggling}</p>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-900 uppercase block">Tier 2: On-Level Learners</span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">{diffInstruction.onLevel}</p>
                </div>
                <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1">
                  <span className="text-[10px] font-bold text-indigo-900 uppercase block">Tier 3: Advanced Learners</span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">{diffInstruction.advanced}</p>
                </div>
              </div>
            </div>

            {/* PART V: OFFICIAL SELF-EXPLANATORY EDUCATIONAL ILLUSTRATION */}
            {selectedDiagram && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-emerald-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    Part V: Official Instructional Illustration & Chalkboard Diagram
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Self-Explanatory Diagram
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3 shadow-2xs">
                  <div className="inline-block px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs">
                    {selectedDiagram.title}
                  </div>
                  <div className="max-w-xl mx-auto p-3 bg-white rounded-2xl border border-slate-200 shadow-inner flex justify-center">
                    <div
                      className="w-full flex justify-center max-h-72"
                      dangerouslySetInnerHTML={{ __html: selectedDiagram.svgContent }}
                    />
                  </div>
                  <p className="text-xs text-slate-600 italic max-w-lg mx-auto">
                    {diagramCaption}
                  </p>
                </div>
              </div>
            )}

            {/* PART VI: CHALKBOARD LESSON NOTE (PUPILS' COPY) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-emerald-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Part VI: Official Chalkboard Lesson Note (Pupils' Notebook Copy)
                </h3>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  Lesson Note
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="block text-slate-900 font-bold uppercase text-[11px] tracking-wider">
                    1. Subtopics Covered:
                  </strong>
                  <p className="text-slate-800 whitespace-pre-line leading-relaxed">{lessonNote.subtopics}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="block text-slate-900 font-bold uppercase text-[11px] tracking-wider">
                    2. Conceptual Definitions & Theoretical Framework:
                  </strong>
                  <p className="text-slate-800 whitespace-pre-line leading-relaxed">{lessonNote.definitions}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="block text-slate-900 font-bold uppercase text-[11px] tracking-wider">
                    3. Step-by-Step Worked Classroom Examples (WAEC/NECO Standard):
                  </strong>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 font-mono text-[11.5px] text-slate-900 whitespace-pre-line leading-relaxed">
                    {lessonNote.workedExamples}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <strong className="block text-slate-900 font-bold uppercase text-[11px] tracking-wider">
                      4. Blackboard Summary Takeaways:
                    </strong>
                    <p className="text-slate-800 whitespace-pre-line leading-relaxed">{lessonNote.blackboardSummary}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <strong className="block text-slate-900 font-bold uppercase text-[11px] tracking-wider">
                      5. Classroom Practice Drill & Homework:
                    </strong>
                    <p className="text-slate-800 whitespace-pre-line leading-relaxed">{lessonNote.classDrill}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PART VII: ADMINISTRATIVE VETTING & QUALITY ASSURANCE */}
            <div className="pt-8 border-t-2 border-slate-200 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 text-center">
                Administrative Moderation, Quality Assurance & Approvals
              </h3>
              <div className="grid grid-cols-3 gap-6 text-center text-xs">
                <div className="space-y-2">
                  <div className="h-10 border-b border-dashed border-slate-400 flex items-end justify-center pb-1">
                    <span className="font-serif italic text-slate-700 text-sm">A. Balogun</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Subject Teacher</p>
                    <p className="text-[10px] text-slate-400">Date: {new Date().toLocaleDateString('en-GB')}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="h-10 border-b border-dashed border-slate-400 flex items-end justify-center pb-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">Vetted & Recommended</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Head of Department (HOD)</p>
                    <p className="text-[10px] text-slate-400">Stamp & Official Signature</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="h-10 border-b border-dashed border-slate-400 flex items-end justify-center pb-1">
                    <span className="text-[10px] uppercase font-bold text-purple-800 bg-purple-100/70 px-2 py-0.5 rounded">Approved for Delivery</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Vice-Principal / Principal</p>
                    <p className="text-[10px] text-slate-400">OEQA Academic Directorate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 4: VISUAL AIDS ENGINE (3D & 4K INSTRUCTIONAL REALIA) */}
      {composerMode === 'visual-aids' && (
        <div className="space-y-6">
          {/* Top Realia Engine Banner */}
          <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-indigo-950 p-6 rounded-3xl text-white border border-emerald-800/40 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>3D & 4K STEM Visual Aid Engine</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-slate-200">
                  Nigerian Classroom Realia
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Procedural 3D Models & 4K Visual Aids for {subject}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Overcome shortages of physical laboratory equipment in Nigerian schools. Project interactive, rotatable 3D realia models and Ultra-HD demonstration clips onto any classroom chalkboard or projector screen.
              </p>

              {/* Sub-tab Navigation: 3D Model, 4K Video, Physical Realia */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveVisualAidSubtab('3d')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeVisualAidSubtab === '3d'
                      ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Box className="w-4 h-4" />
                  <span>3D Procedural Realia (WebGL)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveVisualAidSubtab('video')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeVisualAidSubtab === 'video'
                      ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>4K Demonstration Video</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveVisualAidSubtab('physical')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeVisualAidSubtab === 'physical'
                      ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Low-Cost Physical Realia</span>
                </button>
              </div>
            </div>
          </div>

          {/* Subtab 1: 3D Interactive Model */}
          {activeVisualAidSubtab === '3d' && (
            <div className="space-y-4">
              <VisualAidViewer
                modelType={visual3DModel}
                topicTitle={title}
                onModelChange={(newModel) => {
                  setVisual3DModel(newModel);
                  markDirty();
                }}
              />
            </div>
          )}

          {/* Subtab 2: 4K Video Player */}
          {activeVisualAidSubtab === 'video' && (
            <div className="space-y-4">
              <VideoAidPlayer
                videoUrl={video4KUrl}
                topicTitle={title}
                onUrlChange={(newUrl) => {
                  setVideo4KUrl(newUrl);
                  markDirty();
                }}
              />
            </div>
          )}

          {/* Subtab 3: Physical Low-Cost Realia */}
          {activeVisualAidSubtab === 'physical' && (
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Physical & Locally Sourced Teaching Aids</h3>
                  <p className="text-xs text-gray-500">
                    Low-cost instructional materials sourced from the local environment (NERDC Improvised Realia Standard)
                  </p>
                </div>
              </div>

              {/* Physical items list */}
              <div className="flex flex-wrap gap-2">
                {physicalMaterials.map((mat, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2"
                  >
                    <span>{mat}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = physicalMaterials.filter((_, idx) => idx !== i);
                        setPhysicalMaterials(updated);
                        markDirty();
                      }}
                      className="text-emerald-700 hover:text-red-600 transition-colors"
                      title="Remove material"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Add item input */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  placeholder="e.g. Empty matchboxes, broomstick bundle, local orange for spherical geometry..."
                  value={newPhysicalItem}
                  onChange={(e) => setNewPhysicalItem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newPhysicalItem.trim()) {
                      e.preventDefault();
                      setPhysicalMaterials([...physicalMaterials, newPhysicalItem.trim()]);
                      setNewPhysicalItem('');
                      markDirty();
                    }
                  }}
                  className="flex-1 px-4 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newPhysicalItem.trim()) {
                      setPhysicalMaterials([...physicalMaterials, newPhysicalItem.trim()]);
                      setNewPhysicalItem('');
                      markDirty();
                    }
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Add Realia
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PRINT-ONLY OFFICIAL DOCUMENT VIEW (Formatted for Black & White or Color A4) */}
      <div className="hidden print:block space-y-6 text-xs text-gray-900 leading-relaxed">
        <div className="text-center pb-4 border-b-2 border-gray-900">
          <h1 className="text-lg font-black uppercase tracking-wider">
            KING'S COLLEGE, LAGOS — ACADEMIC LESSON PLAN & NOTE
          </h1>
          <h2 className="text-sm font-bold uppercase mt-1">{title}</h2>
          <p className="text-[10px] text-gray-600 font-medium mt-1">
            Compliant with Federal Ministry of Education & NERDC Secondary Guidelines • 2026/2027
          </p>
        </div>

        {/* Metadata Table */}
        <table className="w-full border-collapse border border-gray-400 text-left">
          <tbody>
            <tr>
              <td className="p-2 border border-gray-400 font-bold bg-gray-100 w-1/4">Class Level:</td>
              <td className="p-2 border border-gray-400">{level.toUpperCase()}</td>
              <td className="p-2 border border-gray-400 font-bold bg-gray-100 w-1/4">Subject:</td>
              <td className="p-2 border border-gray-400">{subject}</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-400 font-bold bg-gray-100">Term & Week:</td>
              <td className="p-2 border border-gray-400">Term {term} — Week {week}</td>
              <td className="p-2 border border-gray-400 font-bold bg-gray-100">Duration:</td>
              <td className="p-2 border border-gray-400">{duration}</td>
            </tr>
          </tbody>
        </table>

        {/* Objectives */}
        <div>
          <h3 className="font-bold text-xs uppercase bg-gray-100 p-1.5 border border-gray-400">
            1. Behavioral Objectives (Bloom's Taxonomy)
          </h3>
          <ol className="list-decimal pl-6 pt-2 space-y-1">
            {objectives.map((o, idx) => (
              <li key={idx}>{o}</li>
            ))}
          </ol>
        </div>

        {/* Instructional Materials */}
        <div>
          <h3 className="font-bold text-xs uppercase bg-gray-100 p-1.5 border border-gray-400">
            2. Instructional Materials
          </h3>
          <ul className="list-disc pl-6 pt-2 space-y-1">
            {materials.map((m, idx) => (
              <li key={idx}>{m}</li>
            ))}
          </ul>
        </div>

        {/* Presentation Steps */}
        <div>
          <h3 className="font-bold text-xs uppercase bg-gray-100 p-1.5 border border-gray-400">
            3. Lesson Methodology & Step-by-Step Delivery
          </h3>
          <table className="w-full border-collapse border border-gray-400 mt-2">
            <tbody>
              <tr>
                <td className="p-2 border border-gray-400 font-bold bg-gray-50 w-1/4">Previous Knowledge:</td>
                <td className="p-2 border border-gray-400">{previousKnowledge}</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-400 font-bold bg-gray-50">Introduction:</td>
                <td className="p-2 border border-gray-400">{introduction}</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-400 font-bold bg-gray-50">Teacher's Activities:</td>
                <td className="p-2 border border-gray-400">{teacherActivity}</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-400 font-bold bg-gray-50">Students' Activities:</td>
                <td className="p-2 border border-gray-400">{studentActivity}</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-400 font-bold bg-gray-50">Evaluation:</td>
                <td className="p-2 border border-gray-400">{evaluation}</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-400 font-bold bg-gray-50">Assignment:</td>
                <td className="p-2 border border-gray-400">{assignment}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Differentiated Instruction */}
        <div>
          <h3 className="font-bold text-xs uppercase bg-gray-100 p-1.5 border border-gray-400">
            4. Differentiated Instruction Matrix
          </h3>
          <table className="w-full border-collapse border border-gray-400 mt-2">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 border border-gray-400 text-left">Tier 1: Struggling</th>
                <th className="p-2 border border-gray-400 text-left">Tier 2: On-Level</th>
                <th className="p-2 border border-gray-400 text-left">Tier 3: Advanced</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-400 align-top">{diffInstruction.struggling}</td>
                <td className="p-2 border border-gray-400 align-top">{diffInstruction.onLevel}</td>
                <td className="p-2 border border-gray-400 align-top">{diffInstruction.advanced}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Diagram in Print */}
        {selectedDiagram && (
          <div className="pt-2">
            <h3 className="font-bold text-xs uppercase bg-gray-100 p-1.5 border border-gray-400">
              5. Instructional Chalkboard Diagram
            </h3>
            <div className="p-4 border border-gray-300 text-center mt-2">
              <div
                className="w-full flex justify-center max-h-60"
                dangerouslySetInnerHTML={{ __html: selectedDiagram.svgContent }}
              />
              <p className="italic text-[11px] text-gray-700 mt-2">{diagramCaption}</p>
            </div>
          </div>
        )}

        {/* Chalkboard Lesson Notes */}
        <div>
          <h3 className="font-bold text-xs uppercase bg-gray-100 p-1.5 border border-gray-400">
            6. Chalkboard Lesson Notes (Pupils' Copy)
          </h3>
          <div className="p-3 border border-gray-400 space-y-3 mt-2">
            <div>
              <strong className="block text-gray-800">Subtopics:</strong>
              <p className="whitespace-pre-line">{lessonNote.subtopics}</p>
            </div>
            <div>
              <strong className="block text-gray-800">Key Concepts:</strong>
              <p className="whitespace-pre-line">{lessonNote.definitions}</p>
            </div>
            <div>
              <strong className="block text-gray-800">Worked Examples:</strong>
              <p className="whitespace-pre-line font-mono">{lessonNote.workedExamples}</p>
            </div>
            <div>
              <strong className="block text-gray-800">Blackboard Summary:</strong>
              <p className="whitespace-pre-line">{lessonNote.blackboardSummary}</p>
            </div>
            <div>
              <strong className="block text-gray-800">Class Drill:</strong>
              <p className="whitespace-pre-line">{lessonNote.classDrill}</p>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="pt-8 grid grid-cols-3 gap-6 text-center text-xs font-bold border-t border-gray-300">
          <div>
            <div className="h-10"></div>
            <p className="border-t border-gray-800 pt-1">Subject Teacher</p>
          </div>
          <div>
            <div className="h-10"></div>
            <p className="border-t border-gray-800 pt-1">Head of Department (HOD)</p>
          </div>
          <div>
            <div className="h-10"></div>
            <p className="border-t border-gray-800 pt-1">Vice-Principal (Academics)</p>
          </div>
        </div>
      </div>

      {/* DIAGRAM SELECTION MODAL */}
      {showDiagramModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-4 border border-gray-100 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">Select Educational Diagram & Illustration</h3>
                <p className="text-xs text-gray-500">
                  Embed curriculum-aligned diagrams directly into your lesson plan, lesson notes, Word export, and printouts.
                </p>
              </div>
              <button
                onClick={() => setShowDiagramModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xs font-semibold"
              >
                Close
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-gray-100 text-xs">
              {['All', 'Science', 'Mathematics', 'Technology', 'Social Studies', 'Commercial', 'Humanities'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setDiagramCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-xl font-bold transition-colors ${
                    diagramCategoryFilter === cat
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {curriculumDiagrams
                .filter((d) => diagramCategoryFilter === 'All' || d.category === diagramCategoryFilter)
                .map((diag) => (
                <div
                  key={diag.id}
                  onClick={() => {
                    setSelectedDiagram(diag);
                    setDiagramCaption(diag.caption);
                    setShowDiagramModal(false);
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between ${
                    selectedDiagram?.id === diag.id
                      ? 'border-emerald-600 bg-emerald-50/50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                      {diag.category} • {diag.level.toUpperCase()}
                    </span>
                    <h4 className="text-xs font-bold text-gray-900 mt-2">{diag.title}</h4>
                    <div
                      className="mt-3 max-h-36 overflow-hidden rounded-lg bg-white border border-gray-100 p-2"
                      dangerouslySetInnerHTML={{ __html: diag.svgContent }}
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 italic mt-2 line-clamp-2">{diag.caption}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowDiagramModal(false)}
                className="px-5 py-2 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
