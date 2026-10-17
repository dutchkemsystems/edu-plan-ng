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
  Check
} from 'lucide-react';
import { LessonPlan, DifferentiatedInstruction } from '../types/index.ts';
import { createLessonPlan, updateLessonPlan, duplicateLessonPlan, requestAIAssist } from '../lib/api.ts';
import { curriculumDiagrams, EducationalDiagram } from '../data/diagrams.ts';
import confetti from 'canvas-confetti';

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
  const [composerMode, setComposerMode] = useState<'plan' | 'note'>('plan');
  const [id, setId] = useState<string>(initialPlan?.id || '');
  const [title, setTitle] = useState(initialPlan?.title || 'Untitled NERDC Lesson Plan');
  const [level, setLevel] = useState(initialPlan?.level || 'jss-1');
  const [subject, setSubject] = useState(initialPlan?.subject || 'Mathematics');
  const [term, setTerm] = useState(initialPlan?.term || 1);
  const [week, setWeek] = useState(initialPlan?.week || 1);
  const [duration, setDuration] = useState(initialPlan?.duration || '40 mins');
  const [language, setLanguage] = useState<'en' | 'yo' | 'ig' | 'ha'>(initialPlan?.language || 'en');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>(initialPlan?.status || 'draft');

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
  const [selectedDiagram, setSelectedDiagram] = useState<EducationalDiagram | null>(
    subject.toLowerCase().includes('science')
      ? curriculumDiagrams[0]
      : subject.toLowerCase().includes('civic')
      ? curriculumDiagrams[4]
      : curriculumDiagrams[1]
  );
  const [diagramCaption, setDiagramCaption] = useState(
    selectedDiagram ? selectedDiagram.caption : 'Figure 1: Instructional Chalkboard Diagram'
  );
  const [showDiagramModal, setShowDiagramModal] = useState(false);

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
  }, [saveStatus, title, level, subject, term, week, duration, objectives, materials, previousKnowledge, introduction, teacherActivity, studentActivity, evaluation, assignment, references, diffInstruction, language, status, lessonNote, selectedDiagram, diagramCaption]);

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
        differentiatedInstruction: diffInstruction,
        bloomTags: hasHigherOrderBloom ? ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate'] : ['Remember', 'Understand'],
        language,
        status,
      };

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
      console.error(e);
      setSaveStatus('dirty');
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
        } else {
          setObjectives([
            `Define the core theoretical principles of ${title}.`,
            `Analyze 3 localized Nigerian real-world commercial and scientific applications.`,
            `Solve 5 standard classroom drills with at least 80% accuracy.`
          ]);
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
          {/* Mode Switcher: Lesson Plan vs Lesson Note */}
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
          </div>

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
            onClick={() => handleSave(true)}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-1.5 shadow-2xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Plan</span>
          </button>
        </div>
      </div>

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
          {/* Multilingual AI Lesson Plan Generator Toolbar */}
          <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white p-4 sm:p-5 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 text-amber-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Speaks Local Languages — 1-Click AI NERDC Generator</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-700/80 text-emerald-200 uppercase font-extrabold">Multilingual</span>
                </h3>
                <p className="text-[11px] text-emerald-200 mt-0.5">
                  Draft complete lesson plans, objectives, and chalkboard notes in Nigerian native languages.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={!!langGenerating}
                onClick={() => handleGenerateInLanguage('yo')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition flex items-center gap-1.5 disabled:opacity-50"
              >
                <span>🇳🇬 Yorùbá</span>
                {langGenerating === 'yo' && <span className="animate-spin text-[10px]">⌛</span>}
              </button>

              <button
                type="button"
                disabled={!!langGenerating}
                onClick={() => handleGenerateInLanguage('ig')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition flex items-center gap-1.5 disabled:opacity-50"
              >
                <span>🇳🇬 Asụsụ Igbo</span>
                {langGenerating === 'ig' && <span className="animate-spin text-[10px]">⌛</span>}
              </button>

              <button
                type="button"
                disabled={!!langGenerating}
                onClick={() => handleGenerateInLanguage('ha')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition flex items-center gap-1.5 disabled:opacity-50"
              >
                <span>🇳🇬 Harshen Hausa</span>
                {langGenerating === 'ha' && <span className="animate-spin text-[10px]">⌛</span>}
              </button>

              <button
                type="button"
                disabled={!!langGenerating}
                onClick={() => handleGenerateInLanguage('en')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1.5 disabled:opacity-50 shadow-xs"
              >
                <span>English (NERDC)</span>
                {langGenerating === 'en' && <span className="animate-spin text-[10px]">⌛</span>}
              </button>
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
                    setLevel(e.target.value);
                    markDirty();
                  }}
                  className="w-full text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
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
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    markDirty();
                  }}
                  className="w-full text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                />
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
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                    markDirty();
                  }}
                  className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                />
              </div>
            </div>
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
            <button
              onClick={() => {
                setLessonNote({
                  subtopics: `1. Definition of ${title}\n2. Core Laws & Theoretical Rules\n3. Worked Classroom Demonstrations\n4. Blackboard Practice Drill`,
                  definitions: `${title} is the systematic study and application of fundamental concepts in ${subject}. It is essential for understanding advanced secondary principles and solving WAEC/NECO examination problems.`,
                  workedExamples: `Worked Example 1:\nSolve the basic configuration given on the board with full working.\n\nWorked Example 2:\nA commercial scenario in Nigeria illustrating the practical use of ${title}.`,
                  blackboardSummary: `• Always double-check calculations and definitions.\n• Memorize the standard rules and formulas.\n• Complete the review questions in your notebook.`,
                  classDrill: `1. Define ${title} in 2 sentences.\n2. Work through the 2 test drills written on the board.`
                });
                markDirty();
              }}
              className="px-3.5 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 flex items-center gap-1.5 self-start"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto-Generate from Topic</span>
            </button>
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
          </div>
        </div>
      )}

      {/* Embedded Diagram / Illustration Preview */}
      {selectedDiagram && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3 print:border-none print:shadow-none print:p-0">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 print:hidden">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-bold text-gray-900 uppercase">
                Attached Educational Illustration: {selectedDiagram.title}
              </h3>
            </div>
            <button
              onClick={() => setSelectedDiagram(null)}
              className="text-xs text-rose-600 font-bold hover:underline"
            >
              Remove Diagram
            </button>
          </div>

          <div className="max-w-xl mx-auto p-4 bg-gray-50 rounded-2xl border border-gray-200 print:bg-transparent print:border-none">
            <div
              className="w-full flex justify-center"
              dangerouslySetInnerHTML={{ __html: selectedDiagram.svgContent }}
            />
            <div className="mt-3 text-center print:mt-1">
              <input
                type="text"
                value={diagramCaption}
                onChange={(e) => setDiagramCaption(e.target.value)}
                className="w-full text-center text-xs font-semibold text-gray-600 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-emerald-600 focus:outline-none italic"
              />
            </div>
          </div>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {curriculumDiagrams.map((diag) => (
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
