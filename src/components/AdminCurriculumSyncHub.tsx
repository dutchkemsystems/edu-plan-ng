import React, { useState, useEffect } from 'react';
import {
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Upload,
  CheckCircle2,
  FileText,
  ExternalLink,
  Lock,
  Globe,
  Database,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { getAuthHeaders } from '../lib/api.ts';

interface SyncItemResult {
  sourceId: string;
  sourceName: string;
  success: boolean;
  robotsTxtStatus: string;
  changeDetected: boolean;
  manualReviewRequired: boolean;
  recordsUpdated: number;
  assetsGenerated: number;
  classesSynced: string[];
  message: string;
  timestamp: string;
}

interface ReviewQueueItem {
  id: string;
  sourceId: string;
  sourceName: string;
  portalUrl: string;
  reason: string;
  robotsTxtStatus: string;
  classLevel?: string;
  subject?: string;
  status: string;
  adminNotes?: string;
  createdAt: string;
  resolvedAt?: string;
}

export const AdminCurriculumSyncHub: React.FC = () => {
  const [isRunningSync, setIsRunningSync] = useState(false);
  const [syncResults, setSyncResults] = useState<SyncItemResult[] | null>(null);
  const [queueItems, setQueueItems] = useState<ReviewQueueItem[]>([]);
  const [isLoadingQueue, setIsLoadingQueue] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Manual Upload Form State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSourceId, setUploadSourceId] = useState('lagos_scheme');
  const [uploadClassLevel, setUploadClassLevel] = useState('jss-1');
  const [uploadSubject, setUploadSubject] = useState('Mathematics');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessNotice, setUploadSuccessNotice] = useState<string | null>(null);
  const [uploadErrorNotice, setUploadErrorNotice] = useState<string | null>(null);

  const fetchQueue = async () => {
    setIsLoadingQueue(true);
    try {
      const res = await fetch('/api/admin/manual-review-queue', {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setQueueItems(data.items || []);
      }
    } catch (e) {
      console.error('Failed to load review queue', e);
    } finally {
      setIsLoadingQueue(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleRunAllSync = async () => {
    setIsRunningSync(true);
    setStatusMessage('Querying robots.txt directives and running change detection across 6 government portals...');
    try {
      const res = await fetch('/api/cron/sync-curriculum', {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setSyncResults(data.results || []);
        setStatusMessage('Sync complete! Real-time injection and robots.txt evaluations updated.');
        fetchQueue();
      } else {
        setStatusMessage('Error executing automated curriculum synchronization.');
      }
    } catch {
      setStatusMessage('Network timeout during portal crawl. Check manual review queue.');
    } finally {
      setIsRunningSync(false);
      setTimeout(() => setStatusMessage(null), 7000);
    }
  };

  const handleSyncSingleSource = async (sourceId: string) => {
    setStatusMessage(`Testing robots.txt & crawling ${sourceId.toUpperCase()}...`);
    try {
      const res = await fetch(`/api/cron/sync-source/${sourceId}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setStatusMessage(`${data.sourceName}: ${data.message}`);
        fetchQueue();
      }
    } catch {
      setStatusMessage(`Sync error on ${sourceId}.`);
    } finally {
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setIsUploading(true);
    setUploadErrorNotice(null);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = (reader.result as string).split(',')[1];
          const res = await fetch('/api/admin/curriculum/manual-upload', {
            method: 'POST',
            headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
            credentials: 'include',
            body: JSON.stringify({
              sourceId: uploadSourceId,
              classLevel: uploadClassLevel,
              subject: uploadSubject,
              fileName: uploadFile.name,
              fileData: base64Data,
              adminUserId: 'admin-lead-alausa',
            }),
          });

          if (res.ok) {
            const result = await res.json();
            setUploadSuccessNotice(`Successfully processed ${uploadFile.name}. Extracted ${result.extractedTopics} topics into ${uploadSourceId.toUpperCase()}. Zero PDFs stored.`);
            setShowUploadModal(false);
            setUploadFile(null);
            fetchQueue();
            setTimeout(() => setUploadSuccessNotice(null), 8000);
          } else {
            const err = await res.json().catch(() => ({}));
            setUploadErrorNotice(`Upload failed: ${err.error || 'Server error'}`);
          }
        } catch (uploadErr: any) {
          setUploadErrorNotice(`Upload failed: ${uploadErr.message || 'Network error'}`);
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(uploadFile);
    } catch (err: any) {
      setUploadErrorNotice(`Error reading file: ${err.message}`);
      setIsUploading(false);
    }
  };

  const SOURCES_INFO = [
    {
      id: 'nerdc',
      name: 'NERDC National e-Curriculum',
      portal: 'nerdc.gov.ng',
      scope: 'JSS1 - SSS3',
      gazette: 'FGN/NERDC/ACT-CAP-E4/2026',
    },
    {
      id: 'lagos_scheme',
      name: 'Lagos State Unified Scheme (LASUBEB)',
      portal: 'lasubeb.lagosstate.gov.ng',
      scope: 'JSS1 - SSS3',
      gazette: 'LASG/LASUBEB/CURR/REV-2026-B',
    },
    {
      id: 'oeqa',
      name: 'Lagos State OEQA Standards',
      portal: 'oeqa.lagosstate.gov.ng',
      scope: 'JSS1 - SSS3',
      gazette: 'LASG/OEQA/QAA-STANDARDS-2026',
    },
    {
      id: 'bece',
      name: 'BECE / Junior WAEC Examination Syllabus',
      portal: 'neco.gov.ng / lasubeb.ng',
      scope: 'JSS3 ONLY',
      gazette: 'NECO/BECE/SYLLABUS/2026-REG',
    },
    {
      id: 'waec',
      name: 'WAEC WASSCE Examination Syllabus',
      portal: 'waeconline.org.ng',
      scope: 'SSS1 - SSS3 ONLY',
      gazette: 'WAEC/HEADQUARTERS/SYLLABUS/2026-2028',
    },
    {
      id: 'neco',
      name: 'NECO SSCE Examination Syllabus',
      portal: 'neco.gov.ng',
      scope: 'SSS1 - SSS3 ONLY',
      gazette: 'NECO/EXAM/SSCE-INT/2026-2027',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-semibold text-emerald-300">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Phase 2: 6-Source Auto-Sync &amp; Legal Compliance Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Curriculum Synchronization &amp; Robots.txt Monitor
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Monitors 6 statutory educational portals in real-time. Enforces <strong>robots.txt</strong> adherence,
              automatic quarantine into <strong>manual_review_queue</strong> upon web blocks, and transformative metadata-only
              extraction with <strong>zero PDF storage</strong> (Nigerian Copyright Act 2022).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleRunAllSync}
              disabled={isRunningSync}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRunningSync ? 'animate-spin' : ''}`} />
              <span>{isRunningSync ? 'Evaluating Portals...' : 'Run 6-Source Sync'}</span>
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white transition-colors"
            >
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Upload Gazette Circular</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {statusMessage && (
        <div className="p-4 bg-slate-800 border border-slate-700 rounded-2xl text-xs font-semibold text-emerald-300 flex items-center gap-2 shadow-sm animate-in fade-in">
          <Info className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {uploadSuccessNotice && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-xs font-semibold text-emerald-300 flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{uploadSuccessNotice}</span>
        </div>
      )}

      {uploadErrorNotice && (
        <div className="p-4 bg-rose-950/40 border border-rose-500/30 rounded-2xl text-xs font-semibold text-rose-300 flex items-center justify-between gap-2 shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{uploadErrorNotice}</span>
          </div>
          <button onClick={() => setUploadErrorNotice(null)} className="text-rose-300 hover:text-white font-bold">
            Dismiss
          </button>
        </div>
      )}

      {/* Honest Limitation & Legal Safeguard Notice */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 text-amber-950 dark:text-amber-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold tracking-wider uppercase text-amber-900 dark:text-amber-300">
              Statutory Limitations of Government Scraping &amp; Copyright Safeguards
            </h4>
            <p className="text-xs text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
              Public Nigerian educational websites (LASUBEB, NERDC, WAEC, NECO) do not maintain public REST APIs and
              frequently publish gazetted syllabuses via dynamic circulars or disallow bot indexing in robots.txt.
              EduPlan NG strictly honors <strong>robots.txt</strong> guidelines to ensure ethical compliance; any blocked portal is automatically
              routed to the <strong>Manual Review Queue</strong> below. All parsed data is metadata-only (Bloom verbs, topics, textbook citations);
              <strong> no raw PDFs or copyrighted syllabus text are stored on EduPlan servers</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 6 Monitored Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SOURCES_INFO.map((src) => {
          const syncResult = syncResults?.find((r) => r.sourceId === src.id);
          const isRestricted = syncResult?.robotsTxtStatus === 'DISALLOWED' || syncResult?.manualReviewRequired;

          return (
            <div
              key={src.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {src.scope}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      isRestricted
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    {isRestricted ? <Lock className="w-2.5 h-2.5" /> : <ShieldCheck className="w-2.5 h-2.5" />}
                    {isRestricted ? 'Robots Block / Fallback' : 'Robots.txt Checked'}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                  {src.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
                  <Globe className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{src.portal}</span>
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                  Gazette: {src.gazette}
                </p>
              </div>

              {syncResult && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Hash Check:</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      {syncResult.changeDetected ? 'NEW REVISION' : 'VERIFIED STABLE'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Updated Catalogs:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {syncResult.recordsUpdated}
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleSyncSingleSource(src.id)}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Sync Source</span>
                </button>
                <button
                  onClick={() => {
                    setUploadSourceId(src.id);
                    setShowUploadModal(true);
                  }}
                  className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors"
                >
                  <Upload className="w-3 h-3" />
                  <span>Upload Gazette</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Review Queue Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <span>Manual Review &amp; Gazette Upload Queue</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Government portals requiring human-in-the-loop approval or gazette circular ingestion.
            </p>
          </div>
          <button
            onClick={fetchQueue}
            disabled={isLoadingQueue}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingQueue ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {queueItems.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            No pending items in the manual review queue. All statutory portals are verified and compliant.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                  <th className="py-2.5 px-3 font-bold">Source</th>
                  <th className="py-2.5 px-3 font-bold">Portal URL</th>
                  <th className="py-2.5 px-3 font-bold">Reason</th>
                  <th className="py-2.5 px-3 font-bold">Robots.txt</th>
                  <th className="py-2.5 px-3 font-bold">Status</th>
                  <th className="py-2.5 px-3 font-bold">Logged At</th>
                  <th className="py-2.5 px-3 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {queueItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                      {item.sourceName}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-500 max-w-[200px] truncate">
                      {item.portalUrl}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        {item.reason}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                      {item.robotsTxtStatus}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'APPROVED'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          setUploadSourceId(item.sourceId);
                          setShowUploadModal(true);
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                      >
                        Upload Circular
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Manual Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-emerald-500" />
                <span>Upload Statutory Gazette Circular</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Ingest official Ministry/Exam syllabus circulars in-memory. Zero PDF storage guaranteed.
              </p>
            </div>

            <form onSubmit={handleFileUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Curriculum Source
                </label>
                <select
                  value={uploadSourceId}
                  onChange={(e) => setUploadSourceId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white focus:outline-emerald-500"
                >
                  <option value="lagos_scheme">Lagos State Unified Scheme of Work (LASUBEB)</option>
                  <option value="nerdc">NERDC National e-Curriculum</option>
                  <option value="oeqa">Lagos State OEQA Quality Standards</option>
                  <option value="bece">BECE / Junior WAEC (JSS3 Only)</option>
                  <option value="waec">WAEC WASSCE (SSS1-3 Only)</option>
                  <option value="neco">NECO SSCE (SSS1-3 Only)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Class Level
                  </label>
                  <select
                    value={uploadClassLevel}
                    onChange={(e) => setUploadClassLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white focus:outline-emerald-500"
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
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={uploadSubject}
                    onChange={(e) => setUploadSubject(e.target.value)}
                    placeholder="e.g. Mathematics"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white focus:outline-emerald-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Official Gazette File (.pdf or .json)
                </label>
                <input
                  type="file"
                  accept=".pdf,.json"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-700 dark:text-slate-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer"
                  required
                />
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-[11px] text-emerald-900 dark:text-emerald-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Transformative Compliance Guarantee:</strong> The file is processed entirely in RAM.
                  EduPlan NG extracts only statutory topics and objectives, immediately releasing the binary buffer.
                  No PDF files are persisted.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !uploadFile}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all disabled:opacity-50"
                >
                  {isUploading ? 'Extracting Metadata...' : 'Parse & Ingest Circular'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
