import React, { useState } from 'react';
import {
  ShieldCheck,
  ClipboardCheck,
  AlertTriangle,
  Award,
  CheckCircle2,
  FileDown,
  Printer,
  Plus,
  Search,
  School,
  UserCheck,
  Check,
  FileText,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SelfAssessmentCriterion {
  id: string;
  domain: string;
  label: string;
  description: string;
  score: 1 | 2 | 3 | 4; // 1: Ineffective, 2: Developing, 3: Good, 4: Outstanding
  evidence: string;
}

interface IncidentReport {
  id: string;
  incidentDate: string;
  time: string;
  category: 'Safeguarding' | 'Medical/Health' | 'Bullying' | 'Infrastructure' | 'Disciplinary';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  location: string;
  personsInvolved: string;
  description: string;
  immediateAction: string;
  parentNotified: boolean;
  status: 'Investigating' | 'Resolved' | 'Escalated to Ministry';
}

export const OEQAPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'self-assessment' | 'evaluation' | 'incidents'>('self-assessment');

  // Self-assessment Criteria state
  const [criteria, setCriteria] = useState<SelfAssessmentCriterion[]>([
    {
      id: 'crit_01',
      domain: 'Domain 1: Teaching, Learning & Assessment',
      label: 'NERDC Lesson Plan & Note Preparedness',
      description: 'Teacher has approved written lesson plans and chalkboard notes ready before entering the classroom.',
      score: 4,
      evidence: 'All weekly lesson plans generated and HOD signed on EduPlan NG'
    },
    {
      id: 'crit_02',
      domain: 'Domain 1: Teaching, Learning & Assessment',
      label: 'Cognitive Taxonomy & Bloom Alignment',
      description: 'Instructional objectives incorporate Higher-Order Thinking Skills (HOTs - Analysis, Evaluation, Creation).',
      score: 4,
      evidence: 'Bloom taxonomy tags validated across 100% of term plans'
    },
    {
      id: 'crit_03',
      domain: 'Domain 2: Curriculum Management & Delivery',
      label: '13-Week Scheme of Work Coverage',
      description: 'Curriculum topics match the statutory NERDC term schedule with weekly pacing adherence.',
      score: 3,
      evidence: 'Week 3 of 13 currently in progress with 92% student attendance'
    },
    {
      id: 'crit_04',
      domain: 'Domain 2: Curriculum Management & Delivery',
      label: 'Differentiated Learning Matrix',
      description: 'Specific pedagogical scaffolding provided for struggling learners, on-level, and advanced learners.',
      score: 4,
      evidence: 'Tiered exercises and buddy pairing implemented in lesson plans'
    },
    {
      id: 'crit_05',
      domain: 'Domain 3: Safeguarding, Welfare & Inclusion',
      label: 'Safe Classroom Environment & Equity',
      description: 'Classroom free from physical and psychological harassment; emergency evacuation protocols displayed.',
      score: 3,
      evidence: 'Safety rules pasted on chalkboard perimeter; no physical punishment'
    },
    {
      id: 'crit_06',
      domain: 'Domain 4: Leadership, Governance & Quality Assurance',
      label: 'Continuous Assessment & Record Keeping',
      description: 'CA1, CA2, homework marks systematically recorded in broadsheet within 48 hours of assessment.',
      score: 4,
      evidence: 'EduPlan NG electronic gradebook synchronized with terminal broadsheet'
    }
  ]);

  // Teacher Evaluation Rubric state
  const [evalTeacher, setEvalTeacher] = useState('Mrs. Amina Balogun');
  const [evalSubject, setEvalSubject] = useState('General Mathematics');
  const [evalClass, setEvalClass] = useState('JSS 1B');
  const [evalTopic, setEvalTopic] = useState('Algebraic Expressions & Word Problems');
  const [evalScores, setEvalScores] = useState<Record<string, number>>({
    punctuality: 4,
    subjectMastery: 4,
    teachingAids: 4,
    pupilParticipation: 3,
    boardWork: 4,
    classroomControl: 4,
    evaluationQuality: 4,
    conclusionSummary: 3
  });
  const [evalStrengths, setEvalStrengths] = useState(
    'Masterful connection of algebraic variables to daily shopping transactions in Balogun Market. Enthusiastic pupil engagement and pristine blackboard layout.'
  );
  const [evalRecommendations, setEvalRecommendations] = useState(
    'Increase cold-calling of back-row female students during formative drill solving to maintain uniform participation.'
  );
  const [evalSaved, setEvalSaved] = useState(false);

  // Incident reports state
  const [incidents, setIncidents] = useState<IncidentReport[]>([
    {
      id: 'INC/2026/089',
      incidentDate: '2026-10-12',
      time: '11:45 AM',
      category: 'Medical/Health',
      severity: 'Medium',
      location: 'Junior Laboratory Corridor',
      personsInvolved: 'Chukwuebuka Obi (JSS 2A)',
      description: 'Student tripped on drainage grill during recess, sustaining minor abrasion on left knee.',
      immediateAction: 'Administered antiseptic cleaning and bandage at School Sick Bay. Student rested for 20 mins and returned to class.',
      parentNotified: true,
      status: 'Resolved'
    },
    {
      id: 'INC/2026/088',
      incidentDate: '2026-10-09',
      time: '02:15 PM',
      category: 'Infrastructure',
      severity: 'Low',
      location: 'Block C Ceiling Fan',
      personsInvolved: 'Facilities Caretaker',
      description: 'Excessive rattling noise noticed from ceiling fan bearing in Classroom SSS 1B.',
      immediateAction: 'Power isolated at main distribution board. Electrician replaced bearing same afternoon.',
      parentNotified: false,
      status: 'Resolved'
    }
  ]);

  // Incident Modal
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [newCategory, setNewCategory] = useState<IncidentReport['category']>('Safeguarding');
  const [newSeverity, setNewSeverity] = useState<IncidentReport['severity']>('Medium');
  const [newLocation, setNewLocation] = useState('Classroom JSS 1A');
  const [newPersons, setNewPersons] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newAction, setNewAction] = useState('');

  // Calculate Self-Assessment Grade
  const totalScore = criteria.reduce((sum, c) => sum + c.score, 0);
  const maxScore = criteria.length * 4;
  const percentage = Math.round((totalScore / maxScore) * 100);

  let oeqaRating = 'Good (Grade B)';
  let oeqaColor = 'bg-blue-100 text-blue-800 border-blue-200';
  if (percentage >= 85) {
    oeqaRating = 'Outstanding (Grade A)';
    oeqaColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
  } else if (percentage < 65) {
    oeqaRating = 'Developing (Grade C)';
    oeqaColor = 'bg-amber-100 text-amber-800 border-amber-200';
  }

  const handleScoreChange = (id: string, newScore: 1 | 2 | 3 | 4) => {
    setCriteria(criteria.map((c) => (c.id === id ? { ...c, score: newScore } : c)));
  };

  const handleSaveEvaluation = () => {
    setEvalSaved(true);
    confetti({ particleCount: 50, spread: 60 });
    setTimeout(() => setEvalSaved(false), 3000);
  };

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    const newInc: IncidentReport = {
      id: `INC/2026/${Math.floor(100 + Math.random() * 900)}`,
      incidentDate: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: newCategory,
      severity: newSeverity,
      location: newLocation,
      personsInvolved: newPersons || 'Pupils of JSS 1',
      description: newDesc,
      immediateAction: newAction,
      parentNotified: true,
      status: 'Investigating'
    };

    setIncidents([newInc, ...incidents]);
    setShowIncidentModal(false);
    confetti({ particleCount: 40 });
    setNewDesc('');
    setNewAction('');
    setNewPersons('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 tracking-wider">
              Statutory Quality Assurance
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">
              Lagos State & Federal MoE
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mt-1.5 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-700" />
            <span>OEQA School Compliance & Quality Assurance Suite</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1 max-w-2xl">
            Officially aligned with the Office of Education Quality Assurance (OEQA) inspection guidelines.
            Manage statutory school self-assessment, TRCN teacher classroom observations, and safeguarding incident reporting.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition"
          >
            <Printer className="w-4 h-4 text-gray-500" />
            <span>Print Dossier</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto text-xs font-bold print:hidden">
        <button
          onClick={() => setActiveTab('self-assessment')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
            activeTab === 'self-assessment' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ClipboardCheck className="w-4 h-4" />
          <span>OEQA Self-Assessment Rubric ({percentage}%)</span>
        </button>

        <button
          onClick={() => setActiveTab('evaluation')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
            activeTab === 'evaluation' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Teacher Classroom Observation</span>
        </button>

        <button
          onClick={() => setActiveTab('incidents')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
            activeTab === 'incidents' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Incident & Safeguarding Log ({incidents.length})</span>
        </button>
      </div>

      {/* TAB 1: SELF-ASSESSMENT */}
      {activeTab === 'self-assessment' && (
        <div className="space-y-6">
          {/* Score Summary Card */}
          <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                Official Inspection Readiness Score
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-4xl sm:text-5xl font-black">{percentage}%</span>
                <span className="text-xs text-emerald-200">({totalScore} of {maxScore} Maximum Points)</span>
              </div>
              <p className="text-xs text-emerald-100 mt-2 max-w-xl">
                Statutory rating derived across 4 OEQA evaluation domains. Ready for Lagos State Ministry of Basic & Secondary Education inspection.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center min-w-[200px]">
              <span className="text-[10px] text-emerald-200 uppercase font-bold block mb-1">Assessed Quality Grade</span>
              <span className="text-lg font-extrabold text-amber-300">{oeqaRating}</span>
              <span className="block text-[10px] text-white/80 mt-1">Full Certification Valid</span>
            </div>
          </div>

          {/* Criteria Table */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-gray-900">Statutory Evaluative Criteria & Evidence</h2>
                <p className="text-xs text-gray-500">Rate your institution on 1-4 scale as required during whole-school evaluation</p>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {criteria.map((c) => (
                <div key={c.id} className="p-4 sm:p-6 hover:bg-gray-50/60 transition flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {c.domain}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 mt-1">{c.label}</h3>
                    <p className="text-xs text-gray-600">{c.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-500 font-medium">
                      <span className="font-bold text-gray-700">Audit Evidence:</span>
                      <span>{c.evidence}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 self-start lg:self-center">
                    {[
                      { num: 1, label: 'Ineffective' },
                      { num: 2, label: 'Developing' },
                      { num: 3, label: 'Good' },
                      { num: 4, label: 'Outstanding' }
                    ].map((s) => (
                      <button
                        key={s.num}
                        onClick={() => handleScoreChange(c.id, s.num as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                          c.score === s.num
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                        title={s.label}
                      >
                        <span>{s.num}</span>
                        <span className="hidden sm:inline text-[10px] font-normal">({s.label})</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TEACHER OBSERVATION */}
      {activeTab === 'evaluation' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-gray-900">TRCN & OEQA Teacher Observation Rubric</h2>
              <p className="text-xs text-gray-500">Official 8-point observational assessment for instructional quality assurance</p>
            </div>
            {evalSaved && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Evaluation Endorsed & Saved</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Teacher Observed</label>
              <input
                type="text"
                value={evalTeacher}
                onChange={(e) => setEvalTeacher(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl font-medium focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">Subject</label>
              <input
                type="text"
                value={evalSubject}
                onChange={(e) => setEvalSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl font-medium focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">Class / Arm</label>
              <input
                type="text"
                value={evalClass}
                onChange={(e) => setEvalClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl font-medium focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">Topic Observed</label>
              <input
                type="text"
                value={evalTopic}
                onChange={(e) => setEvalTopic(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl font-medium focus:outline-none"
              />
            </div>
          </div>

          {/* 8 Observational Criteria Grid */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">8 Evaluative Criteria Ratings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {[
                { key: 'punctuality', label: '1. Punctuality & Lesson Introduction' },
                { key: 'subjectMastery', label: '2. Subject Matter Mastery & Clarity' },
                { key: 'teachingAids', label: '3. Use of Instructional Materials & Realia' },
                { key: 'pupilParticipation', label: '4. Active Pupil Participation & Inclusivity' },
                { key: 'boardWork', label: '5. Board Organization & Lesson Note Neatness' },
                { key: 'classroomControl', label: '6. Large Class Management & Decorum' },
                { key: 'evaluationQuality', label: '7. Formative Evaluation & Questioning' },
                { key: 'conclusionSummary', label: '8. Conclusion & Homework Assignment' }
              ].map((c) => (
                <div key={c.key} className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                  <span className="font-semibold text-gray-800">{c.label}</span>
                  <select
                    value={evalScores[c.key]}
                    onChange={(e) => setEvalScores({ ...evalScores, [c.key]: parseInt(e.target.value, 10) })}
                    className="bg-white border border-gray-300 rounded-lg px-2 py-1 font-bold text-emerald-800 text-xs focus:outline-none"
                  >
                    <option value={4}>4 - Outstanding</option>
                    <option value={3}>3 - Good</option>
                    <option value={2}>2 - Developing</option>
                    <option value={1}>1 - Ineffective</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Recommendations */}
          <div className="space-y-3 pt-2 text-xs">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Key Instructional Strengths</label>
              <textarea
                rows={2}
                value={evalStrengths}
                onChange={(e) => setEvalStrengths(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">Recommendations for Pedagogical Improvement</label>
              <textarea
                rows={2}
                value={evalRecommendations}
                onChange={(e) => setEvalRecommendations(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              onClick={handleSaveEvaluation}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
            >
              Endorse & Save Evaluation
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: INCIDENT & SAFEGUARDING LOG */}
      {activeTab === 'incidents' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-gray-900">Statutory Incident & Safeguarding Register</h2>
              <p className="text-xs text-gray-500">Record all critical school events for internal accountability and OEQA inspection dossiers</p>
            </div>
            <button
              onClick={() => setShowIncidentModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Report New Incident</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Case ID</th>
                  <th className="py-2.5 px-3">Date & Time</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Severity</th>
                  <th className="py-2.5 px-3">Location & Persons</th>
                  <th className="py-2.5 px-3">Description & Action</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {incidents.map((inc) => (
                  <tr key={inc.id} className="hover:bg-gray-50/80">
                    <td className="py-3 px-3 font-mono font-bold text-gray-700">{inc.id}</td>
                    <td className="py-3 px-3 text-gray-600">
                      <div>{inc.incidentDate}</div>
                      <div className="text-[10px] text-gray-400">{inc.time}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-100 text-slate-800">
                        {inc.category}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          inc.severity === 'High' || inc.severity === 'Critical'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {inc.severity}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-gray-900 font-semibold">{inc.location}</div>
                      <div className="text-[10px] text-gray-500">{inc.personsInvolved}</div>
                    </td>
                    <td className="py-3 px-3 max-w-sm">
                      <p className="text-gray-800 leading-tight">{inc.description}</p>
                      <p className="text-[11px] text-emerald-700 mt-1 font-semibold">{inc.immediateAction}</p>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {inc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Incident Modal */}
      {showIncidentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">
              File Official School Incident Report
            </h3>

            <form onSubmit={handleCreateIncident} className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none bg-white font-medium"
                  >
                    <option value="Safeguarding">Safeguarding</option>
                    <option value="Medical/Health">Medical/Health</option>
                    <option value="Bullying">Bullying</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Disciplinary">Disciplinary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Severity</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none bg-white font-medium"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Location on Campus</label>
                <input
                  type="text"
                  required
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="E.g. Senior Science Laboratory"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Persons Involved</label>
                <input
                  type="text"
                  required
                  value={newPersons}
                  onChange={(e) => setNewPersons(e.target.value)}
                  placeholder="Pupils, Teachers or Staff names"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Description of Incident</label>
                <textarea
                  rows={2}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Objective account of what occurred"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Immediate Remedial Action Taken</label>
                <textarea
                  rows={2}
                  required
                  value={newAction}
                  onChange={(e) => setNewAction(e.target.value)}
                  placeholder="First-aid, parental notification, counseling or escalation"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none leading-relaxed"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowIncidentModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs"
                >
                  Log Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
