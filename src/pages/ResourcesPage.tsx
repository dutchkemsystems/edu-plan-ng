import React, { useState, useEffect } from 'react';
import {
  FolderArchive,
  Upload,
  Search,
  Filter,
  FileText,
  Trash2,
  ExternalLink,
  Plus,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { ResourceItem } from '../types/index.ts';
import { fetchResources, createResource, deleteResource } from '../lib/api.ts';
import confetti from 'canvas-confetti';

export const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Upload Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('jss-1');
  const [subject, setSubject] = useState('Mathematics');
  const [fileType, setFileType] = useState<'pdf' | 'docx' | 'slide' | 'image' | 'link'>('pdf');
  const [topicTag, setTopicTag] = useState('Whole Numbers');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const data = await fetchResources();
      setResources(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 150);

    setTimeout(async () => {
      try {
        const res = await createResource({
          title,
          description,
          level,
          subject,
          fileType,
          fileUrl: `/uploads/${fileType}/${title.replace(/[^a-z0-9]/gi, '_')}.${fileType === 'slide' ? 'pptx' : fileType}`,
          fileSize: '2.5 MB',
          topicTag,
        });

        clearInterval(interval);
        setUploadProgress(100);
        setResources([res.resource, ...resources]);
        confetti({ particleCount: 50 });

        setTimeout(() => {
          setUploading(false);
          setShowUploadModal(false);
          setTitle('');
          setDescription('');
          setUploadProgress(0);
        }, 400);
      } catch (err) {
        setUploading(false);
        clearInterval(interval);
      }
    }, 800);
  };

  const handleDelete = async (id: string) => {
    await deleteResource(id);
    setResources(resources.filter((r) => r.id !== id));
  };

  const filtered = resources.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      (r.topicTag && r.topicTag.toLowerCase().includes(search.toLowerCase()));
    const matchesLevel = levelFilter === 'all' || r.level === levelFilter;
    const matchesType = typeFilter === 'all' || r.fileType === typeFilter;
    return matchesSearch && matchesLevel && matchesType;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Teaching Resources</h1>
          <p className="text-xs text-gray-500 mt-1">
            Store, tag, and attach textbooks, past questions, lesson slides, and teaching aids to syllabus topics.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all hover:scale-105 shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Teaching Resource</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources by title, topic tag, or subject..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="text-xs font-medium px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
          >
            <option value="all">All Classes</option>
            <option value="jss-1">JSS 1</option>
            <option value="jss-2">JSS 2</option>
            <option value="jss-3">JSS 3</option>
            <option value="sss-1">SSS 1</option>
            <option value="sss-2">SSS 2</option>
            <option value="sss-3">SSS 3</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs font-medium px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
          >
            <option value="all">All File Types</option>
            <option value="pdf">PDF Documents</option>
            <option value="docx">Word Files</option>
            <option value="slide">Slides & PPT</option>
          </select>
        </div>
      </div>

      {/* Grid of Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((res) => (
          <div
            key={res.id}
            className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {res.level.toUpperCase()} • {res.subject}
                </span>
                <span className="text-xs font-bold text-gray-400 uppercase">{res.fileType}</span>
              </div>

              <h2 className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                {res.title}
              </h2>
              <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                {res.description}
              </p>

              {res.topicTag && (
                <div className="mt-3 inline-block px-2.5 py-1 rounded-lg bg-gray-100 text-[11px] font-medium text-gray-600">
                  Topic Tag: {res.topicTag}
                </div>
              )}
            </div>

            <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>{res.fileSize}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDelete(res.id)}
                  className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <a
                  href={res.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 font-bold text-emerald-700 hover:underline"
                >
                  <span>Download</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal Drawer */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <form
            onSubmit={handleUpload}
            className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-4 border border-gray-100"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Upload Teaching Resource</h2>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xs font-semibold"
              >
                Close
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Resource Title</label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. WASSCE 2024 General Mathematics Worked Solutions"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Description / Notes</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe how to use this aid during lessons..."
                className="w-full text-xs p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Target Class</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
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
                <label className="block text-xs font-semibold text-gray-700 mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="English Studies">English Studies</option>
                  <option value="Basic Science & Technology">Basic Science & Tech</option>
                  <option value="General Mathematics">General Mathematics</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">File Format</label>
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                >
                  <option value="pdf">PDF Document</option>
                  <option value="docx">Word Document (.docx)</option>
                  <option value="slide">PowerPoint Presentation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Curriculum Topic Tag</label>
                <input
                  type="text"
                  value={topicTag}
                  onChange={(e) => setTopicTag(e.target.value)}
                  placeholder="e.g. Whole Numbers, Cell Theory..."
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            {/* Upload Progress Simulation */}
            {uploading && (
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-semibold text-gray-600">
                  <span>Uploading to EduPlan Storage...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full transition-all duration-150"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="px-6 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs"
              >
                {uploading ? 'Processing...' : 'Upload Resource'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
