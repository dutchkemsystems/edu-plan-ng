import React, { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, FileText, FolderArchive, ArrowRight, X } from 'lucide-react';
import { searchGlobal } from '../lib/api.ts';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic: (topicId: string) => void;
  onSelectPlan: (planId: string) => void;
  onSelectResource: (resId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTopic,
  onSelectPlan,
  onSelectResource,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    curriculum: any[];
    lessonPlans: any[];
    resources: any[];
  }>({ curriculum: [], lessonPlans: [], resources: [] });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults({ curriculum: [], lessonPlans: [], resources: [] });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ curriculum: [], lessonPlans: [], resources: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchGlobal(query);
        setResults(res);
      } catch (err) {
        // ignore
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Global keydown listener for Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalResults =
    results.curriculum.length + results.lessonPlans.length + results.resources.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 border-b border-gray-200 bg-gray-50/60">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search NERDC topics, lesson plans, materials (e.g., 'algebra', 'cells', 'budget')..."
            className="w-full px-3 py-4 text-sm bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-400"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="text-[11px] font-mono text-gray-400 bg-white px-2 py-0.5 rounded border border-gray-200 shadow-2xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {loading && (
            <p className="text-center text-xs text-gray-400 py-6">Searching EduPlan NG database...</p>
          )}

          {!loading && query && totalResults === 0 && (
            <div className="text-center py-8">
              <p className="text-sm font-medium text-gray-700">No matching records found</p>
              <p className="text-xs text-gray-400 mt-1">Try keywords like 'algebra', 'force', 'grammar', or 'civics'</p>
            </div>
          )}

          {!loading && !query && (
            <div className="text-xs text-gray-500 py-2">
              <p className="font-semibold text-gray-700 mb-2">Popular Curriculum Searches:</p>
              <div className="flex flex-wrap gap-2">
                {['Whole Numbers', 'Living Things', 'Quadratic Equations', 'Demand and Supply', 'Civic Values'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 text-gray-600 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Curriculum Topics */}
          {results.curriculum.length > 0 && (
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                NERDC Curriculum Topics ({results.curriculum.length})
              </p>
              <div className="space-y-1">
                {results.curriculum.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTopic(item.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50 text-left transition-colors group"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-semibold text-gray-900 group-hover:text-emerald-800 line-clamp-1">
                        {item.topic}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {item.levelId.toUpperCase()} • Term {item.term} • Week {item.week}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Lesson Plans */}
          {results.lessonPlans.length > 0 && (
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                Lesson Plans ({results.lessonPlans.length})
              </p>
              <div className="space-y-1">
                {results.lessonPlans.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectPlan(item.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 text-left transition-colors group"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-semibold text-gray-900 group-hover:text-blue-800 line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {item.subject} • {item.level.toUpperCase()} • Week {item.week}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {results.resources.length > 0 && (
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FolderArchive className="w-3.5 h-3.5 text-amber-600" />
                Instructional Resources ({results.resources.length})
              </p>
              <div className="space-y-1">
                {results.resources.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectResource(item.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50 text-left transition-colors group"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-semibold text-gray-900 group-hover:text-amber-800 line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {item.subject} • {item.fileType.toUpperCase()} ({item.fileSize})
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-[11px] text-gray-500 flex items-center justify-between">
          <span>Navigate with mouse or arrow keys</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
