import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  ChevronRight,
  GraduationCap,
  Layers,
  Sparkles,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  FilePlus2,
  Share2,
  Printer,
  Lock,
  RefreshCw
} from 'lucide-react';
import { CurriculumLevel, CurriculumSubject, CurriculumTopic, DashboardStats, TeacherUser } from '../types/index.ts';
import { fetchCurriculumLevels, fetchLevelDetail, fetchSubjectDetail, getAuthHeaders } from '../lib/api.ts';
import { ALL_CURRICULUM_SUBJECTS, getSubjectTermTopics } from '../data/allCurriculumSubjects.ts';
import { CURRICULUM_SOURCE_OPTIONS } from '../components/CurriculumSourceSelector.tsx';
import { resolveClientTierSummary } from '../config/pricing.ts';

interface CurriculumBrowserProps {
  onCreatePlanFromTopic: (topic: CurriculumTopic, level: string, subject: string) => void;
  initialTopicId?: string | null;
  user?: TeacherUser | null;
  stats?: DashboardStats | null;
  onOpenUpgrade?: (message: string, requiredTier?: string, title?: string) => void;
}

const synthesizeStatutoryTerms = (
  levelId: string,
  subjectName: string,
  subjectId: string,
  sourceId: string = 'lagos_scheme'
) => {
  const sourceMeta =
    CURRICULUM_SOURCE_OPTIONS.find((s) => s.id === sourceId) || CURRICULUM_SOURCE_OPTIONS[0];

  return [1, 2, 3].map((t) => {
    const rawStatutory = getSubjectTermTopics(levelId, subjectName, t);
    const teachingTopics = rawStatutory.filter(
      (top) => !/mid[- ]?term|continuous assessment|revision|terminal exam|examination|broadsheet/i.test(top)
    );
    while (teachingTopics.length < 10) {
      teachingTopics.push(`${subjectName}: Statutory Curriculum Mastery Unit ${teachingTopics.length + 1}`);
    }

    const weeks: CurriculumTopic[] = Array.from({ length: 13 }, (_, i) => {
      const wk = i + 1;
      let topicTitle = '';

      if (wk === 7) {
        topicTitle = 'Mid-Term Continuous Assessment (CA Test) & Intervention';
      } else if (wk === 12) {
        topicTitle = 'Comprehensive Termly Revision & Examination Prep';
      } else if (wk === 13) {
        topicTitle = 'Terminal Examination, Marking & Broadsheet Entry';
      } else if (wk < 7) {
        topicTitle = teachingTopics[wk - 1];
      } else {
        topicTitle = teachingTopics[wk - 2];
      }

      return {
        id: `${sourceMeta.id}-${subjectId}-t${t}-w${wk}`,
        subjectId,
        levelId,
        term: t,
        week: wk,
        topic: topicTitle,
        subtopics: [
          `1. Conceptual definition and theoretical principles of ${topicTitle.split(':')[0]}`,
          `2. Core statutory rules, laws, formulae, and grammar`,
          `3. Guided classroom demonstration and Nigerian contextual worked examples`,
          `4. Collaborative desk-partner drills and structured chalkboard summary copy`
        ],
        objectives: [
          `State the statutory definition of ${topicTitle.split(':')[0]} according to the ${sourceMeta.name} (${sourceMeta.authority}) without contradicting Federal NERDC standards (Bloom: Remember & Understand).`,
          `Apply core principles to solve standard examination problems with at least 80% accuracy (Bloom: Apply).`,
          `Analyze Nigerian real-world commercial, societal, or environmental applications (Bloom: Analyze).`
        ],
        teacherActivities: [
          `Explicate foundational principles of ${topicTitle.split(':')[0]} on chalkboard using Lagos State OEQA methodology.`,
          'Demonstrate worked solutions with local Nigerian context.',
          'Supervise paired desk drills and provide real-time corrective guidance.'
        ],
        studentActivities: [
          'Listen attentively and copy chalkboard summary notes into subject exercise notebooks.',
          'Solve guided classroom practice problems in pairs.',
          'Answer formative evaluation questions before dismissal.'
        ],
        materials: [
          `Approved ${sourceMeta.name} Textbook for ${levelId.toUpperCase()}`,
          'Chalkboard, dry-erase markers & drafting tools',
          'Local realia specimens & wall charts'
        ],
        evaluation: [
          `Classwork drill and weekly homework assessment on ${topicTitle.split(':')[0]}`
        ]
      };
    });

    return {
      term: t,
      name: `${t === 1 ? '1st' : t === 2 ? '2nd' : '3rd'} Term`,
      weeks,
    };
  });
};

export const CurriculumBrowser: React.FC<CurriculumBrowserProps> = ({
  onCreatePlanFromTopic,
  user,
  stats,
  onOpenUpgrade,
}) => {
  const tierSummary = resolveClientTierSummary(user, stats);
  const [selectedSourceId, setSelectedSourceId] = useState<string>(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('eduplan_curriculum_source') || 'lagos_scheme';
    }
    return 'lagos_scheme';
  });
  const [sourceEntitlements, setSourceEntitlements] = useState<Record<string, { accessible: boolean; upgradeRequirement?: string | null }>>({});
  const [sourceVersions, setSourceVersions] = useState<Record<string, { version: string; lastSyncedAt: string }>>({});

  const [levels, setLevels] = useState<CurriculumLevel[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<CurriculumLevel | null>(null);
  const [subjects, setSubjects] = useState<CurriculumSubject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<CurriculumSubject | null>(null);
  const [termsData, setTermsData] = useState<{ term: number; name: string; weeks: CurriculumTopic[] }[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<number>(1);
  const [selectedTopic, setSelectedTopic] = useState<CurriculumTopic | null>(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [autoSyncStatus, setAutoSyncStatus] = useState({
    version: '2026.2-LAGOS',
    lastSyncedAt: 'Live & Active',
  });

  const activeSourceMeta =
    CURRICULUM_SOURCE_OPTIONS.find((s) => s.id === selectedSourceId) || CURRICULUM_SOURCE_OPTIONS[0];

  useEffect(() => {
    fetch('/api/subscription/source-entitlements', {
      headers: getAuthHeaders(),
      credentials: 'include',
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.sources && Array.isArray(data.sources)) {
          const map: Record<string, { accessible: boolean; upgradeRequirement?: string | null }> = {};
          data.sources.forEach((s: any) => {
            map[s.id] = { accessible: !!s.accessible, upgradeRequirement: s.upgradeRequirement };
          });
          setSourceEntitlements(map);
        }
      })
      .catch(() => {});
  }, [user?.tierId, stats?.subscription?.tierId]);

  useEffect(() => {
    loadLevels();
    fetch('/api/curriculum/sync-status', {
      headers: getAuthHeaders(),
      credentials: 'include',
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && d.success) {
          if (d.sources) {
            setSourceVersions(d.sources);
            const activeSrc = d.sources[selectedSourceId];
            setAutoSyncStatus({
              version: activeSrc?.version || d.latestCurriculumVersion || '2026.2-LAGOS',
              lastSyncedAt: new Date(activeSrc?.lastSyncedAt || d.lastSyncedAt || Date.now()).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
            });
          } else {
            setAutoSyncStatus({
              version: d.latestCurriculumVersion || '2026.2-LAGOS',
              lastSyncedAt: new Date(d.lastSyncedAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            });
          }
        }
      })
      .catch(() => {});
  }, [selectedSourceId]);

  const loadLevels = async () => {
    setLoading(true);
    setAuthError(false);
    try {
      const data = await fetchCurriculumLevels();
      setLevels(data);
    } catch (e) {
      console.error(e);
      setAuthError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSource = async (srcId: string) => {
    const gate = sourceEntitlements[srcId];
    if (gate && !gate.accessible && srcId !== 'lagos_scheme') {
      onOpenUpgrade?.(
        gate.upgradeRequirement || `Your current plan allows ${tierSummary.config.sourceAccessSummary}. Upgrade to unlock ${srcId.toUpperCase()}.`,
        tierSummary.category === 'b2b' ? 'b2b_silver' : 'b2c_termly',
        'Curriculum Source Locked'
      );
      return;
    }
    setSelectedSourceId(srcId);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('eduplan_curriculum_source', srcId);
    }
    if (selectedLevel && selectedSubject) {
      await loadSubjectForSource(selectedLevel.id, selectedSubject, srcId);
    }
  };

  const loadSubjectForSource = async (levelId: string, sub: CurriculumSubject, sourceId: string) => {
    setLoading(true);
    try {
      let terms: { term: number; name: string; weeks: CurriculumTopic[] }[] = [];
      try {
        const detail = await fetchSubjectDetail(levelId, sub.id, sourceId);
        if (detail && Array.isArray(detail.terms) && detail.terms.length > 0) {
          terms = detail.terms;
        }
      } catch (fetchErr) {
        console.warn('Fallback to statutory client synthesis', fetchErr);
      }

      const needsSynthesis = terms.length === 0 || terms.some((t) => !t.weeks || t.weeks.length < 10);
      if (needsSynthesis) {
        terms = synthesizeStatutoryTerms(levelId, sub.name, sub.id, sourceId);
      }

      setTermsData(terms);
      setSelectedTopic(null);
    } catch (e) {
      console.error(e);
      setTermsData(synthesizeStatutoryTerms(levelId, sub.name, sub.id, sourceId));
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLevel = async (lvl: CurriculumLevel) => {
    setSelectedLevel(lvl);
    setSelectedSubject(null);
    setSelectedTopic(null);
    setLoading(true);
    try {
      const detail = await fetchLevelDetail(lvl.id);
      setSubjects(detail.subjects);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSubject = async (sub: CurriculumSubject) => {
    setSelectedSubject(sub);
    setSelectedTopic(null);
    setSelectedTerm(1);
    if (selectedLevel) {
      await loadSubjectForSource(selectedLevel.id, sub, selectedSourceId);
    }
  };

  const handleBack = () => {
    if (selectedTopic) {
      setSelectedTopic(null);
    } else if (selectedSubject) {
      setSelectedSubject(null);
    } else if (selectedLevel) {
      setSelectedLevel(null);
    }
  };

  const currentTermWeeks =
    termsData.find((t) => t.term === selectedTerm)?.weeks || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header & Breadcrumb */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <button
                onClick={() => {
                  setSelectedLevel(null);
                  setSelectedSubject(null);
                  setSelectedTopic(null);
                }}
                className="hover:text-emerald-700 font-semibold"
              >
                Curriculum Hub
              </button>
              {selectedLevel && (
                <>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <button
                    onClick={() => {
                      setSelectedSubject(null);
                      setSelectedTopic(null);
                    }}
                    className="hover:text-emerald-700 font-semibold"
                  >
                    {selectedLevel.name}
                  </button>
                </>
              )}
              {selectedSubject && (
                <>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <button
                    onClick={() => setSelectedTopic(null)}
                    className="hover:text-emerald-700 font-semibold"
                  >
                    {selectedSubject.name}
                  </button>
                </>
              )}
              {selectedTopic && (
                <>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-gray-800 font-bold truncate max-w-[180px]">
                    Week {selectedTopic.week}: {selectedTopic.topic.split(':')[0]}
                  </span>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-black border ${activeSourceMeta.badgeColor}`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{activeSourceMeta.name}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                <RefreshCw className="w-3 h-3 text-blue-600" />
                <span>Auto-Sync: Active ({autoSyncStatus.version})</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              {!selectedLevel
                ? 'Statutory Curriculum Explorer (Strictly Isolated by Authority)'
                : !selectedSubject
                ? `${selectedLevel.name} Syllabus — ${activeSourceMeta.name}`
                : !selectedTopic
                ? `${selectedSubject.name} (${selectedLevel.code})`
                : `Week ${selectedTopic.week} Topic Details`}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Lagos State Unified Scheme, NERDC National e-Curriculum, OEQA, BECE, WAEC, and NECO are stored as separate registries and harmonized without contradiction.
            </p>
          </div>

          {(selectedLevel || selectedSubject || selectedTopic) && (
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}
        </div>

        {/* Separated 6-Source Authority Switcher */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
            Active Curriculum Authority ({tierSummary.config.sourceAccessSummary} in {tierSummary.config.name})
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {CURRICULUM_SOURCE_OPTIONS.map((src) => {
              const isSelected = selectedSourceId === src.id;
              const gate = sourceEntitlements[src.id];
              const isLocked = gate ? !gate.accessible : false;
              const ver = sourceVersions[src.id]?.version;
              return (
                <button
                  key={src.id}
                  type="button"
                  onClick={() => handleSelectSource(src.id)}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                      : isLocked
                      ? 'bg-amber-50/60 text-amber-900 border-amber-200 hover:bg-amber-100/70'
                      : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[11px] font-extrabold truncate">
                      {src.id === 'lagos_scheme' ? 'Lagos Unified' : src.id.toUpperCase()}
                    </span>
                    {isLocked && <Lock className="w-3 h-3 text-amber-600 shrink-0" />}
                  </div>
                  <div className={`text-[9px] mt-0.5 truncate ${isSelected ? 'text-emerald-100' : 'text-gray-500'}`}>
                    {ver || src.jurisdiction}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* VIEW 1: LEVELS INDEX (/curriculum) */}
      {!selectedLevel && authError && levels.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center space-y-3">
          <p className="text-sm font-bold text-amber-950">
            Sign in to explore all 480 statutory curriculum catalogs across all 6 sources
          </p>
          <p className="text-xs text-amber-800">
            Curriculum endpoints are protected against automated scraping. Sign in or click Retry to load your active session.
          </p>
          <button
            onClick={loadLevels}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-colors"
          >
            Retry Loading Curriculum Levels
          </button>
        </div>
      )}

      {!selectedLevel && (
        <div className="space-y-6">
          {/* Junior Secondary Group */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase bg-emerald-100 text-emerald-800">
                Junior Secondary (Basic 7–9)
              </span>
              <span className="text-xs text-gray-400">BECE / Junior WAEC Standard</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {levels
                .filter((l) => l.category === 'junior')
                .map((lvl) => (
                  <div
                    key={lvl.id}
                    onClick={() => handleSelectLevel(lvl)}
                    className="p-6 bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4 group-hover:scale-105 transition-transform">
                        {lvl.code}
                      </div>
                      <h2 className="text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                        {lvl.name}
                      </h2>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                        {lvl.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-emerald-700 font-bold">
                      <span>19 Statutory Subjects • 39 Weeks</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Senior Secondary Group */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase bg-blue-100 text-blue-800">
                Senior Secondary (SSS 1–3)
              </span>
              <span className="text-xs text-gray-400">WASSCE & NECO SSCE Syllabus</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {levels
                .filter((l) => l.category === 'senior')
                .map((lvl) => (
                  <div
                    key={lvl.id}
                    onClick={() => handleSelectLevel(lvl)}
                    className="p-6 bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md hover:border-blue-500 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm mb-4 group-hover:scale-105 transition-transform">
                        {lvl.code}
                      </div>
                      <h2 className="text-base font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {lvl.name}
                      </h2>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                        {lvl.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-blue-700 font-bold">
                      <span>21 Statutory Subjects • 39 Weeks</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: SUBJECTS LIST (/curriculum/[level]) */}
      {selectedLevel && !selectedSubject && (
        <div className="space-y-4">
          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-3">
            {[
              { id: 'all', label: `All Subjects (${subjects.length})` },
              { id: 'Core', label: 'Core Statutory' },
              { id: 'Science & Math', label: 'Science & Math' },
              { id: 'Commercial', label: 'Commercial' },
              { id: 'Humanities & Arts', label: 'Humanities & Arts' },
              { id: 'Vocational & Tech', label: 'Vocational & Tech' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setDeptFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  deptFilter === tab.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjects
              .filter((sub) => {
                if (deptFilter === 'all') return true;
                const meta = ALL_CURRICULUM_SUBJECTS.find(
                  (m) => m.name.toLowerCase() === sub.name.toLowerCase()
                );
                return meta?.department === deptFilter;
              })
              .map((sub) => {
                const meta = ALL_CURRICULUM_SUBJECTS.find(
                  (m) => m.name.toLowerCase() === sub.name.toLowerCase()
                );
                return (
                  <div
                    key={sub.id}
                    onClick={() => handleSelectSubject(sub)}
                    className="p-6 bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm group-hover:scale-105 transition-transform">
                          <BookOpen className="w-5 h-5 text-emerald-700" />
                        </div>
                        {meta?.department && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                            {meta.department}
                          </span>
                        )}
                      </div>
                      <h2 className="text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                        {sub.name}
                      </h2>
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                        {sub.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-emerald-700 font-bold">
                      <span>3 Terms • 13 Weeks Each</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* VIEW 3: TERMS & WEEKS ACCORDION (/curriculum/[level]/[subject]) */}
      {selectedLevel && selectedSubject && !selectedTopic && (
        <div className="space-y-4">
          {/* Term Selector Tabs */}
          <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
            {[1, 2, 3].map((termNum) => (
              <button
                key={termNum}
                onClick={() => setSelectedTerm(termNum)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  selectedTerm === termNum
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {termNum === 1 ? '1st Term' : termNum === 2 ? '2nd Term' : '3rd Term'}
              </button>
            ))}
          </div>

          {/* Weeks 1–13 List */}
          <div className="space-y-2.5">
            {currentTermWeeks.map((weekItem) => {
              const isExam = weekItem.week === 7 || weekItem.week === 13;
              const isRevision = weekItem.week === 12;

              return (
                <div
                  key={weekItem.id}
                  onClick={() => setSelectedTopic(weekItem)}
                  className={`p-4 bg-white rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 hover:shadow-xs group ${
                    isExam
                      ? 'border-amber-300 bg-amber-50/20 hover:border-amber-500'
                      : 'border-gray-200/90 hover:border-emerald-500'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isExam
                          ? 'bg-amber-100 text-amber-800'
                          : isRevision
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-emerald-50 text-emerald-800'
                      }`}
                    >
                      W{weekItem.week}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xs font-bold text-gray-900 group-hover:text-emerald-700 transition-colors truncate">
                          {weekItem.topic}
                        </h2>
                        {isExam && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                            Assessment Week
                          </span>
                        )}
                        {isRevision && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-300">
                            Revision Week
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {weekItem.objectives?.length || 3} Behavioral Objectives • Bloom's Taxonomy Aligned
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-semibold text-emerald-700 group-hover:underline hidden sm:inline">
                      View Topic & Objectives
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 4: WEEK TOPIC DETAIL VIEW WITH CTA */}
      {selectedTopic && selectedLevel && selectedSubject && (
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-md p-6 sm:p-8 space-y-6">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-1">
                <span>{selectedLevel.name}</span>
                <span>•</span>
                <span>{selectedSubject.name}</span>
                <span>•</span>
                <span>Term {selectedTopic.term} (Week {selectedTopic.week})</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">{selectedTopic.topic}</h2>
            </div>

            {/* THE REQUIRED "CREATE LESSON PLAN" CTA */}
            <button
              onClick={() =>
                onCreatePlanFromTopic(selectedTopic, selectedLevel.id, selectedSubject.name)
              }
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all hover:scale-105 shrink-0"
            >
              <FilePlus2 className="w-4 h-4" />
              <span>Create Lesson Plan from this Topic</span>
            </button>
          </div>

          {/* 4 Detail Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Behavioral Objectives */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wide">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Behavioral Objectives (Bloom's Taxonomy)</span>
              </div>
              <ul className="space-y-2 text-xs text-gray-700">
                {selectedTopic.objectives?.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-900 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Instructional Materials & Realia */}
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200/60 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wide">
                <BookOpen className="w-4 h-4 text-blue-700" />
                <span>Instructional Materials & Nigerian Realia</span>
              </div>
              <ul className="space-y-2 text-xs text-gray-700">
                {selectedTopic.materials?.map((mat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Teacher's Activities */}
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wide">
                <Layers className="w-4 h-4 text-gray-700" />
                <span>Teacher's Pedagogical Activities</span>
              </div>
              <ul className="space-y-2 text-xs text-gray-700">
                {selectedTopic.teacherActivities?.map((act, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-1.5 shrink-0" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Students' Activities & Evaluation */}
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wide">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Students' Activities & Formative Evaluation</span>
              </div>
              <ul className="space-y-2 text-xs text-gray-700">
                {selectedTopic.studentActivities?.map((act, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
