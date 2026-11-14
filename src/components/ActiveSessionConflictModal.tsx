import React, { useState } from 'react';
import { ShieldAlert, LogOut, Laptop, AlertTriangle, ArrowRight } from 'lucide-react';

interface ActiveSessionConflictModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeIp: string;
  activeUserAgent?: string;
  lastActivity?: string;
  onForceLogoutAndProceed: () => Promise<void>;
}

export const ActiveSessionConflictModal: React.FC<ActiveSessionConflictModalProps> = ({
  isOpen,
  onClose,
  activeIp,
  activeUserAgent,
  lastActivity,
  onForceLogoutAndProceed,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleForceLogout = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      await onForceLogoutAndProceed();
    } catch (err: any) {
      setError(err?.message || 'Failed to force logout other session. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formattedLastActive = lastActivity
    ? new Date(lastActivity).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'Recently';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 border border-gray-100">
        {/* Warning Icon & Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 leading-tight">
              Active Session on Another Device
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              EduPlan NG enforces strict single-device login security to prevent account sharing and unauthorized access.
            </p>
          </div>
        </div>

        {/* Device & IP Details Box */}
        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-900">
            <Laptop className="w-4 h-4 text-amber-700" />
            <span>Currently Active Session</span>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed font-medium">
            This account is currently active on another device (IP: <strong className="font-mono text-amber-950 font-bold">{activeIp}</strong>). Please log out from that device before logging in here.
          </p>
          <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-amber-700">
            <span>Last Activity: {formattedLastActive}</span>
            <span className="truncate max-w-[180px]">{activeUserAgent ? activeUserAgent.split(' ')[0] : 'Remote Browser'}</span>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleForceLogout}
            disabled={isProcessing}
            className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            <span>{isProcessing ? 'Terminating other session...' : 'Force Logout from other device'}</span>
          </button>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="w-full py-2.5 px-4 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-medium transition-colors"
          >
            Cancel Login
          </button>
        </div>

        {/* Policy Notice */}
        <p className="text-[11px] text-gray-400 text-center">
          In accordance with statutory school data privacy standards, accounts can only maintain one active concurrent session.
        </p>
      </div>
    </div>
  );
};
