import React from 'react';
import { Bell, CheckCheck, Trash2, X, AlertCircle, Info, DollarSign, BookCheck } from 'lucide-react';
import { NotificationItem } from '../types/index.ts';
import { markNotificationRead, markAllNotificationsRead, deleteNotification } from '../lib/api.ts';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onRefresh: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onRefresh,
}) => {
  if (!isOpen) return null;

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

  const getIcon = (type: string) => {
    switch (type) {
      case 'curriculum':
        return <BookCheck className="w-4 h-4 text-emerald-600" />;
      case 'billing':
        return <DollarSign className="w-4 h-4 text-amber-600" />;
      case 'lesson':
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <Info className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-black/30 backdrop-blur-2xs">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-top-4 duration-150">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-700" />
            <h3 className="font-bold text-sm text-gray-900">Notifications</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAll}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto divide-y divide-gray-100 p-1">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-400">
              No new notifications. You are all caught up!
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-xl transition-colors flex items-start justify-between gap-3 ${
                  item.read === 0 ? 'bg-emerald-50/50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-white border border-gray-200 shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs ${item.read === 0 ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                      {item.title}
                    </p>
                    <p className="text-[11px] text-gray-600 mt-0.5 line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
      </div>
    </div>
  );
};
