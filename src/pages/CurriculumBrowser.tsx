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
  Printer
} from 'lucide-react';
import { CurriculumLevel, CurriculumSubject, CurriculumTopic } from '../types/index.ts';
import { fetchCurriculumLevels, fetchLevelDetail, fetchSubjectDetail } from '../lib/api.ts';

interface CurriculumBrowserProps {
  onCreatePlanFromTopic: (topic: CurriculumTopic, level: string, subject: string) => void;
  initialTopicId?: string | null;
}

export const CurriculumBrowser: React.FC<CurriculumBrowserProps> = ({
  onCreatePlanFromTopic,
  initialTopicId,
}) => {
  const [levels, setLevels] = useState<CurriculumLevel[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<CurriculumLevel | null>(null);
  const [subjects, setSubjects] = useState<CurriculumSubject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<CurriculumSubject | null>(null);
  const [termsData, setTermsData] = useState<{ term: number; name: string; weeks: CurriculumTopic[] }[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<number>(1);
  const [selectedTopic, setSelectedTopic] = useState<CurriculumTopic | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLevels();
  }, []);

  const loadLevels = async () => {
    setLoading(true);
    try {
      const data = await fetchCurriculumLevels();
      setLevels(data);
    } catch (e) {
      console.error(e);
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
    setLoading(true);
    try {
      if (selectedLevel) {
        const detail = await fetchSubjectDetail(selectedLevel.id, sub.id);
        setTermsData(detail.terms);
        setSelectedTerm(1);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
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

            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              {!selectedLevel
                ? 'NERDC National Curriculum Explorer'
                : !selectedSubject
                ? `${selectedLevel.name} Syllabus`
                : !selectedTopic
                ? `${selectedSubject.name} (${selectedLevel.code})`
                : `Week ${selectedTopic.week} Topic Details`}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Federal Ministry of Education & NERDC Approved Secondary School Syllabus (13 Weeks per Term).
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
      </div>

      {/* VIEW 1: LEVELS INDEX (/curriculum) */}
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
                      <span>4 Core Subjects • 39 Weeks</span>
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
                      <span>4 Core Subjects • 39 Weeks</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              onClick={() => handleSelectSubject(sub)}
              className="p-6 bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm mb-4 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5 text-emerald-700" />
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
          ))}
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
