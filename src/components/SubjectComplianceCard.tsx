import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Copy,
  Check,
  ExternalLink,
  Award,
  Filter,
  Sparkles,
  Info
} from 'lucide-react';
import { APPROVED_TEXTBOOKS, ApprovedTextbookRecord, getApprovedTextbookForSubject } from '../data/approvedTextbooks.ts';

interface SubjectComplianceCardProps {
  initialLevel?: string;
  initialSubject?: string;
  onNavigateToComposer?: (level: string, subject: string) => void;
}

export const SubjectComplianceCard: React.FC<SubjectComplianceCardProps> = ({
  initialLevel = 'sss-1',
  initialSubject = 'Biology',
  onNavigateToComposer,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>(initialLevel);
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'focused' | 'all'>('focused');
  const [complianceStats, setComplianceStats] = useState<{
    complianceRate: number;
    totalBooks: number;
    approvedBooksCount: number;
  }>({
    complianceRate: 100,
    totalBooks: 92,
    approvedBooksCount: 92,
  });

  // Query server API for compliance data if available
  useEffect(() => {
    fetch('/api/textbooks/compliance')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setComplianceStats({
            complianceRate: data.complianceRate,
            totalBooks: data.totalBooks,
            approvedBooksCount: data.approvedBooksCount,
          });
        }
      })
      .catch(() => {
        // Fallback to local count
      });
  }, []);

  const classLevels = [
    { id: 'jss-1', label: 'JSS 1 (Basic 7)' },
    { id: 'jss-2', label: 'JSS 2 (Basic 8)' },
    { id: 'jss-3', label: 'JSS 3 (Basic 9 / BECE)' },
    { id: 'sss-1', label: 'SSS 1 (Senior Sec)' },
    { id: 'sss-2', label: 'SSS 2 (Senior Sec)' },
    { id: 'sss-3', label: 'SSS 3 (WAEC / NECO)' },
  ];

  // List of unique subjects available for the selected level
  const booksForLevel = APPROVED_TEXTBOOKS.filter(
    b => b.classLevel.toLowerCase().replace(/[^a-z0-9]/g, '') === selectedLevel.toLowerCase().replace(/[^a-z0-9]/g, '')
  );

  const availableSubjects = Array.from(new Set(booksForLevel.map(b => b.subject)));

  // If selected subject is not in this level, default to first available
  useEffect(() => {
    if (availableSubjects.length > 0 && !availableSubjects.includes(selectedSubject)) {
      setSelectedSubject(availableSubjects[0]);
    }
  }, [selectedLevel]);

  // Find exact approved textbook for the selected class + subject
  const currentTextbook: ApprovedTextbookRecord | null | undefined =
    booksForLevel.find(b => b.subject.toLowerCase() === selectedSubject.toLowerCase()) ||
    getApprovedTextbookForSubject(selectedLevel, selectedSubject);

  const citationString = currentTextbook
    ? `"${currentTextbook.title}" by ${currentTextbook.author}, published by ${currentTextbook.publisher} (${currentTextbook.edition}). Officially approved by ${currentTextbook.approvedBy} (${currentTextbook.approvalDate}).`
    : '';

  const handleCopyCitation = () => {
    if (!citationString) return;
    navigator.clipboard.writeText(citationString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden transition-all">
      {/* Header with Statutory Badging */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-400/30 text-[11px] font-semibold text-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Phase 2 Compliance • NERDC & Lagos OEQA Standard</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-300" />
              <span>Government-Approved Textbooks & Subject Compliance</span>
            </h3>
            <p className="text-xs text-emerald-100/80 max-w-xl">
              Every lesson plan must cite the exact statutory textbook and author approved by the Nigerian Educational Research and Development Council (NERDC).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-2 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 text-center">
              <div className="text-xl font-black text-emerald-300">{complianceStats.complianceRate}%</div>
              <div className="text-[10px] text-emerald-100 uppercase tracking-wider font-semibold">Compliance</div>
            </div>
            <div className="px-3 py-2 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 text-center">
              <div className="text-xl font-black text-amber-300">{complianceStats.approvedBooksCount}</div>
              <div className="text-[10px] text-emerald-100 uppercase tracking-wider font-semibold">Approved Books</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Class Level Selector */}
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-xs font-bold text-gray-500">Class:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="text-xs font-bold text-emerald-950 bg-transparent border-none focus:outline-hidden cursor-pointer"
            >
              {classLevels.map((lvl) => (
                <option key={lvl.id} value={lvl.id}>
                  {lvl.label}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Selector */}
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-xs font-bold text-gray-500">Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="text-xs font-bold text-emerald-950 bg-transparent border-none focus:outline-hidden cursor-pointer"
            >
              {availableSubjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center p-1 bg-gray-200/70 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('focused')}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === 'focused' ? 'bg-white text-emerald-900 shadow-2xs font-bold' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Subject Compliance Card
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === 'all' ? 'bg-white text-emerald-900 shadow-2xs font-bold' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All {selectedLevel.toUpperCase()} Textbooks ({booksForLevel.length})
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 sm:p-6">
        {activeTab === 'focused' ? (
          currentTextbook ? (
            <div className="space-y-5">
              {/* Textbook Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Book Card Display */}
                <div className="lg:col-span-2 p-5 rounded-2xl bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/40 border border-emerald-200/70 shadow-2xs space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Official Statutory Textbook • {currentTextbook.classLevel.toUpperCase()}
                      </span>
                      <h4 className="text-base sm:text-lg font-black text-gray-950 leading-snug">
                        {currentTextbook.title}
                      </h4>
                      <p className="text-xs sm:text-sm font-semibold text-emerald-800">
                        Author(s): <span className="text-gray-900 font-bold">{currentTextbook.author}</span>
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white border border-emerald-300 shadow-2xs text-center shrink-0">
                      <Award className="w-6 h-6 text-emerald-600 mb-1" />
                      <span className="text-[9px] font-extrabold uppercase text-emerald-900">NERDC</span>
                      <span className="text-[8px] font-bold text-gray-500">Approved</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-emerald-100 text-xs">
                    <div>
                      <span className="text-gray-500 block text-[10px] font-medium">Publisher</span>
                      <span className="font-bold text-gray-900">{currentTextbook.publisher}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px] font-medium">Edition</span>
                      <span className="font-bold text-gray-900">{currentTextbook.edition}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px] font-medium">Approved Date</span>
                      <span className="font-bold text-gray-900">{currentTextbook.approvalDate}</span>
                    </div>
                  </div>

                  {/* Exact Citation Snippet for Teacher Clipboard */}
                  <div className="p-3 rounded-xl bg-white border border-gray-200/90 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-gray-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Exact Mandatory Lesson Plan Citation:
                      </span>
                      <button
                        onClick={handleCopyCitation}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Citation</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs font-mono text-gray-800 bg-gray-50 p-2.5 rounded-lg border border-gray-100 leading-relaxed break-words">
                      {citationString}
                    </p>
                  </div>
                </div>

                {/* Quality Assurance Checklist Column */}
                <div className="p-5 rounded-2xl bg-gray-50/90 border border-gray-200/80 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h5 className="text-xs font-extrabold uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Compliance Verification</span>
                    </h5>

                    <ul className="space-y-2 text-xs text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>NERDC Approved:</strong> Compliant with statutory curriculum specifications.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>OEQA Aligned:</strong> Approved for Lagos State Unified Scheme of Work.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Class Isolated:</strong> Zero topic bleeding into adjacent secondary forms.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Auto-Injected:</strong> Automatically added to new AI lesson plans.</span>
                      </li>
                    </ul>
                  </div>

                  {onNavigateToComposer && (
                    <button
                      onClick={() => onNavigateToComposer(selectedLevel, selectedSubject)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 flex items-center justify-center gap-2 shadow-xs transition-colors"
                    >
                      <span>Plan Lesson with {currentTextbook.subject}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
              <Info className="w-6 h-6 text-gray-400 mx-auto" />
              <p className="text-sm font-semibold text-gray-700">
                No statutory textbook metadata registered for {selectedSubject} in {selectedLevel.toUpperCase()}.
              </p>
            </div>
          )
        ) : (
          /* All Textbooks in Class Level */
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span>Displaying <strong>{booksForLevel.length}</strong> statutory textbooks approved for <strong>{selectedLevel.toUpperCase()}</strong>:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
              {booksForLevel.map((tb) => (
                <div
                  key={tb.id}
                  onClick={() => {
                    setSelectedSubject(tb.subject);
                    setActiveTab('focused');
                  }}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    tb.subject.toLowerCase() === selectedSubject.toLowerCase()
                      ? 'border-emerald-500 bg-emerald-50/60 shadow-2xs ring-1 ring-emerald-500'
                      : 'border-gray-200 bg-white hover:border-emerald-300 hover:bg-gray-50/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase px-2 py-0.5 rounded bg-emerald-100/70">
                      {tb.subject}
                    </span>
                    <span className="text-[10px] text-gray-400 font-semibold">{tb.approvalDate}</span>
                  </div>
                  <h6 className="text-xs font-extrabold text-gray-900 mt-1 line-clamp-1">{tb.title}</h6>
                  <p className="text-[11px] text-gray-600 mt-0.5 line-clamp-1">Author: {tb.author}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{tb.publisher} • {tb.edition}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
