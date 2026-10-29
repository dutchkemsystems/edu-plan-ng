import React, { useState } from 'react';
import {
  X,
  Share2,
  Download,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import {
  getGoogleClassroomShareUrl,
  buildClassroomPayloadFromLessonPlan,
  downloadGoogleClassroomCourseworkJson,
  downloadGoogleClassroomCsv,
  GoogleClassroomCourseworkPayload
} from '../lib/lms/google-classroom.ts';

interface GoogleClassroomExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: {
    id?: string;
    title: string;
    level: string;
    subject: string;
    term?: number | string;
    week?: number | string;
    objectives?: string[];
    materials?: string[];
    evaluation?: string;
    assignment?: string;
    studentActivity?: string;
    bloomTags?: string[];
  };
}

export const GoogleClassroomExportModal: React.FC<GoogleClassroomExportModalProps> = ({
  isOpen,
  onClose,
  plan
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [activeTab, setActiveTab] = useState<'share' | 'json' | 'csv'>('share');

  if (!isOpen || !plan) return null;

  const coursework: GoogleClassroomCourseworkPayload = buildClassroomPayloadFromLessonPlan(plan);
  const shareTargetUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/quiz/sample-quiz-01`
    : 'https://eduplan.ng';

  const shareUrl = getGoogleClassroomShareUrl({
    url: shareTargetUrl,
    title: coursework.title,
    body: coursework.description,
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(coursework, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleDownloadJson = () => {
    const slug = `${plan.subject}-${plan.level}-wk${plan.week || 1}`.toLowerCase().replace(/[^a-z0-9]/g, '-');
    downloadGoogleClassroomCourseworkJson(coursework, `classroom-assignment-${slug}.json`);
  };

  const handleDownloadCsv = () => {
    const slug = `${plan.subject}-${plan.level}-wk${plan.week || 1}`.toLowerCase().replace(/[^a-z0-9]/g, '-');
    downloadGoogleClassroomCsv(
      [
        {
          title: coursework.title,
          instructions: coursework.description,
          maxPoints: coursework.maxPoints,
          subject: plan.subject,
          level: String(plan.level).toUpperCase(),
          dueDate: '7 Days Post-Lesson',
        },
      ],
      `google-classroom-${slug}.csv`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold shadow-xs">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span>Google Classroom LMS Export</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  NERDC Aligned
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Publish Nigerian lesson notes and assignments directly to your students' Google Classroom.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-100 px-5 pt-3 gap-4 text-xs font-semibold text-slate-500">
          <button
            onClick={() => setActiveTab('share')}
            className={`pb-2.5 transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'share'
                ? 'border-emerald-700 text-emerald-800 font-bold'
                : 'border-transparent hover:text-slate-700'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>1-Click Share</span>
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`pb-2.5 transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'json'
                ? 'border-emerald-700 text-emerald-800 font-bold'
                : 'border-transparent hover:text-slate-700'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Coursework JSON</span>
          </button>
          <button
            onClick={() => setActiveTab('csv')}
            className={`pb-2.5 transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'csv'
                ? 'border-emerald-700 text-emerald-800 font-bold'
                : 'border-transparent hover:text-slate-700'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>LMS CSV Batch Import</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {activeTab === 'share' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wide">
                  Target Classroom Assignment:
                </span>
                <p className="font-bold text-slate-900 text-sm">{coursework.title}</p>
                <div className="flex flex-wrap gap-2 text-[11px] text-emerald-800">
                  <span className="bg-white/80 px-2 py-0.5 rounded border border-emerald-200">
                    Class: {String(plan.level).toUpperCase()}
                  </span>
                  <span className="bg-white/80 px-2 py-0.5 rounded border border-emerald-200">
                    Subject: {plan.subject}
                  </span>
                  <span className="bg-white/80 px-2 py-0.5 rounded border border-emerald-200">
                    Week: {plan.week || 1}
                  </span>
                  <span className="bg-white/80 px-2 py-0.5 rounded border border-emerald-200">
                    Max Marks: 100
                  </span>
                </div>
              </div>

              {/* Direct Share Button */}
              <div className="pt-2">
                <a
                  href={shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md text-sm"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Launch Google Classroom Share</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
                <p className="text-[11px] text-slate-500 text-center mt-2">
                  Opens Google Classroom so you can select your school class section, assign due dates, and post to students.
                </p>
              </div>

              {/* Share URL copy box */}
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Direct Shareable Link
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="w-full text-[11px] bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-600 font-mono"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg shrink-0 flex items-center gap-1 text-[11px] transition-colors"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-3">
              <p className="text-slate-600 leading-relaxed text-xs">
                Download or copy the standardized Google Classroom Coursework API specification JSON. This schema matches the official <code>v1.courses.courseWork</code> schema for automated LMS pipelines.
              </p>

              <div className="relative">
                <pre className="bg-slate-900 text-slate-100 p-3.5 rounded-xl text-[11px] font-mono overflow-x-auto max-h-56 leading-relaxed border border-slate-800">
                  {JSON.stringify(coursework, null, 2)}
                </pre>
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                  <button
                    onClick={handleCopyJson}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-colors"
                  >
                    {copiedJson ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                </div>
              </div>

              <button
                onClick={handleDownloadJson}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors text-xs shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Coursework JSON (.json)</span>
              </button>
            </div>
          )}

          {activeTab === 'csv' && (
            <div className="space-y-3">
              <p className="text-slate-600 leading-relaxed text-xs">
                Export assignments into a universal spreadsheet format accepted by school learning management systems (Google Classroom, Moodle, Edmodo, and SchoolGate).
              </p>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Includes Formatted Instructions & Rubric</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Contains title, objectives, student activity, homework drills, and maximum score.
                </p>
              </div>

              <button
                onClick={handleDownloadCsv}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors text-xs shadow-xs"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Download Classroom Batch CSV (.csv)</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>EduPlan NG · Google Workspace for Education Certified Interchange</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
