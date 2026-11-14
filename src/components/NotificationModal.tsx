import React, { useState } from 'react';
import {
  Bell,
  CheckCheck,
  Trash2,
  X,
  AlertCircle,
  Info,
  DollarSign,
  BookCheck,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Zap,
  Filter
} from 'lucide-react';
import { NotificationItem } from '../types/index.ts';
import { markNotificationRead, markAllNotificationsRead, deleteNotification } from '../lib/api.ts';
import confetti from 'canvas-confetti';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onRefresh: () => void;
}

const SOURCE_NAMES: Record<string, string> = {
  lagos_scheme: 'Lagos State Unified Scheme',
  nerdc: 'NERDC National e-Curriculum',
  oeqa: 'Lagos State OEQA Standard',
  bece: 'BECE Junior WAEC',
  waec: 'WAEC WASSCE',
  neco: 'NECO SSCE',
};

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onRefresh,
}) => {
  if (!isOpen) return null;

  const [activeSourceFilter, setActiveSourceFilter] = useState<string>(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('eduplan_curriculum_source') || 'lagos_scheme';
    }
    return 'lagos_scheme';
  });
  const [isSimulating, setIsSimulating] = useState(false);

  const handleMarkRead = async (id: string) => {
    await markNotificationRead(id);
    onRefresh();
  };

  const handleMarkAll = async () => {
    await markAllNotificationsRead();
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    await deleteNotification(id);
    onRefresh();
  };

  const handleSimulateSourceUpdate = async () => {
    setIsSimulating(true);
    try {
      const res = await fetch('/api/notifications/source-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceId: activeSourceFilter === 'all' ? 'lagos_scheme' : activeSourceFilter,
          classLevel: 'jss-1',
          subject: 'Mathematics',
        }),
      });
      if (res.ok) {
        confetti({ particleCount: 40, spread: 50 });
        onRefresh();
      }
    } catch (e) {
      console.error('Failed to trigger simulated update', e);
    } finally {
      setIsSimulating(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'curriculum':
      case 'curriculum_update':
        return <BookCheck className="w-4 h-4 text-emerald-600" />;
      case 'billing':
        return <DollarSign className="w-4 h-4 text-amber-600" />;
      case 'lesson':
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <Info className="w-4 h-4 text-slate-600" />;
    }
  };

  // Phase 3 Requirement: Filter notifications strictly by user's selected source
  const filteredNotifications = notifications.filter((item) => {
    if (activeSourceFilter === 'all') return true;
    return !item.sourceId || item.sourceId === activeSourceFilter;
  });

  const activeSourceName = SOURCE_NAMES[activeSourceFilter] || 'All Sources';

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-black/30 backdrop-blur-2xs animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-top-4 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50/70 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-700" />
              <h3 className="font-bold text-sm text-gray-900">Per-Source Syllabus Alerts</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleMarkAll}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark read</span>
              </button>
              <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Source Banner */}
          <div className="flex items-center justify-between text-[11px] bg-emerald-50 border border-emerald-200/80 rounded-xl px-2.5 py-1.5 text-emerald-900">
            <div className="flex items-center gap-1.5 truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span className="truncate">
                Active Source: <strong>{activeSourceName}</strong>
              </span>
            </div>
            <button
              onClick={handleSimulateSourceUpdate}
              disabled={isSimulating}
              className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition flex items-center gap-1 shrink-0 shadow-2xs"
              title="Simulate receiving an official syllabus change event from government portal"
            >
              <Zap className="w-2.5 h-2.5 text-amber-300" />
              <span>{isSimulating ? 'Syncing...' : 'Test Sync Alert'}</span>
            </button>
          </div>

          {/* Source Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pt-1 pb-0.5 no-scrollbar text-[11px]">
            <button
              onClick={() => setActiveSourceFilter('lagos_scheme')}
              className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-colors ${
                activeSourceFilter === 'lagos_scheme'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Lagos Scheme
            </button>
            <button
              onClick={() => setActiveSourceFilter('nerdc')}
              className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-colors ${
                activeSourceFilter === 'nerdc'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              NERDC
            </button>
            <button
              onClick={() => setActiveSourceFilter('waec')}
              className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-colors ${
                activeSourceFilter === 'waec'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              WAEC
            </button>
            <button
              onClick={() => setActiveSourceFilter('neco')}
              className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-colors ${
                activeSourceFilter === 'neco'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              NECO
            </button>
            <button
              onClick={() => setActiveSourceFilter('bece')}
              className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-colors ${
                activeSourceFilter === 'bece'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              BECE
            </button>
            <button
              onClick={() => setActiveSourceFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-colors ${
                activeSourceFilter === 'all'
                  ? 'bg-slate-800 text-white shadow-2xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All Sources
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-gray-100 p-1">
          {filteredNotifications.length === 0 ? (
            <div className="py-10 text-center text-xs text-gray-400 space-y-1">
              <p>No new updates for <strong>{activeSourceName}</strong>.</p>
              <p className="text-[10px] text-gray-400">Click "Test Sync Alert" above to simulate an official update.</p>
            </div>
          ) : (
            filteredNotifications.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-xl transition-colors flex items-start justify-between gap-3 ${
                  item.read === 0 ? 'bg-emerald-50/60' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-white border border-gray-200 shrink-0 mt-0.5 shadow-2xs">
                    {getIcon(item.type)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className={`text-xs ${item.read === 0 ? 'font-black text-gray-900' : 'font-medium text-gray-700'}`}>
                        {item.title}
                      </p>
                      {item.sourceId && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {item.sourceId}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-700 mt-0.5 line-clamp-3 leading-relaxed">
                      {item.message}
                    </p>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Transformative Use Compliant
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {item.read === 0 && (
                    <button
                      onClick={() => handleMarkRead(item.id)}
                      className="p-1 text-emerald-600 hover:text-emerald-800"
                      title="Mark read"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 text-gray-400 hover:text-rose-600"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Legal Disclaimer Footer */}
        <div className="p-2.5 bg-gray-50 border-t border-gray-200 text-center text-[10px] text-gray-500">
          Curriculum topics referenced from {activeSourceName}. Lesson plans are original works generated by EduPlan NG.
        </div>
      </div>
    </div>
  );
};
