import React, { useState, useEffect } from 'react';
import {
  Wifi,
  WifiOff,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Check,
  X
} from 'lucide-react';
import { offlineStorage } from '../lib/offline/offline-storage.ts';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const PWAInstallBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [dismissBanner, setDismissBanner] = useState<boolean>(false);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    if (isStandalone) {
      setIsInstalled(true);
    }

    // Network status listener
    const handleOnline = () => {
      setIsOnline(true);
      refreshPending();
      triggerAutoSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
      refreshPending();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // PWA install prompt listener
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Initial check
    refreshPending();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const refreshPending = () => {
    setPendingCount(offlineStorage.getPendingCount());
  };

  const triggerAutoSync = async () => {
    if (!offlineStorage.isOnline()) return;
    const count = offlineStorage.getPendingCount();
    if (count === 0) return;

    setIsSyncing(true);
    try {
      const result = await offlineStorage.syncAllPending();
      refreshPending();
      if (result.syncedPlans > 0 || result.syncedQuizzes > 0) {
        setSyncFeedback(`Synced ${result.syncedPlans} plan(s) and ${result.syncedQuizzes} quiz submission(s)!`);
        setTimeout(() => setSyncFeedback(null), 4000);
      }
    } catch (err) {
      console.warn('[PWA] Auto sync warning:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setIsInstalled(true);
      setDeferredPrompt(null);
    }
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      const result = await offlineStorage.syncAllPending();
      refreshPending();
      setSyncFeedback(
        result.errors.length > 0
          ? `Synced ${result.syncedPlans + result.syncedQuizzes} items. Some errors occurred.`
          : `All ${result.syncedPlans + result.syncedQuizzes} pending items synchronized successfully!`
      );
      setTimeout(() => setSyncFeedback(null), 4000);
    } catch (e) {
      setSyncFeedback('Sync failed. Please check network.');
      setTimeout(() => setSyncFeedback(null), 3000);
    } finally {
      setIsSyncing(false);
    }
  };

  // If online, no pending items, installed or dismissed, stay hidden
  if (isOnline && pendingCount === 0 && (!deferredPrompt || dismissBanner) && !syncFeedback) {
    return null;
  }

  return (
    <aside
      aria-label="EduPlan NG Connectivity and Installation Status"
      className="bg-slate-900 text-white text-xs px-4 py-2.5 border-b border-slate-800 shadow-sm transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left side: Status badge and explanation */}
        <div className="flex items-center gap-2.5">
          {!isOnline ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              <WifiOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Offline Mode Active (NEPA / Network Safe)</span>
            </div>
          ) : pendingCount > 0 ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
              <RefreshCw className={`w-3.5 h-3.5 text-blue-400 shrink-0 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{pendingCount} item(s) awaiting sync to cloud</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              <Wifi className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>EduPlan NG Connected</span>
            </div>
          )}

          <p className="text-slate-300 text-[11px] hidden md:inline">
            {!isOnline
              ? 'Local cache active. Lesson notes & CBT drills save directly to your device and sync once internet is back.'
              : syncFeedback || 'Offline-first progressive web app engineered for Nigerian schools.'}
          </p>
        </div>

        {/* Right side: Action buttons */}
        <div className="flex items-center gap-2">
          {/* Manual sync button if pending */}
          {pendingCount > 0 && isOnline && (
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-lg text-[11px] flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : `Sync Now (${pendingCount})`}</span>
            </button>
          )}

          {/* Install PWA button */}
          {deferredPrompt && !isInstalled && !dismissBanner && (
            <button
              onClick={handleInstallClick}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-lg text-[11px] flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Download className="w-3 h-3 text-slate-950" />
              <span>Install EduPlan App</span>
            </button>
          )}

          {/* Dismiss button */}
          {deferredPrompt && !dismissBanner && (
            <button
              onClick={() => setDismissBanner(true)}
              className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
              title="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
