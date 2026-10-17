import React, { useState, useEffect } from 'react';
import { Download, Check, Smartphone, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallButton: React.FC<{ variant?: 'navbar' | 'sidebar' | 'banner' }> = ({
  variant = 'navbar'
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  useEffect(() => {
    // Detect standalone mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsInstalled(isStandalone);

    // Detect iOS
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua);
    setIsIOS(isIOSDevice);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setInstalledSuccess(true);
      setTimeout(() => setInstalledSuccess(false), 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
      }
    } else {
      // Fallback instruction for browsers without active prompt event
      setShowIOSModal(true);
    }
  };

  if (isInstalled) {
    if (variant === 'sidebar') {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-emerald-300 font-medium">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>App Installed (Offline Ready)</span>
        </div>
      );
    }
    return null;
  }

  return (
    <>
      {variant === 'navbar' && (
        <button
          onClick={handleInstallClick}
          aria-label="Install EduPlan NG application for offline access"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/80 shadow-2xs transition-all hover:shadow-xs"
          title="Install EduPlan NG to use offline without internet"
        >
          <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
          <span className="hidden lg:inline">Install App</span>
        </button>
      )}

      {variant === 'sidebar' && (
        <button
          onClick={handleInstallClick}
          aria-label="Install offline progressive web app"
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-emerald-300 hover:text-white bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-700/50 transition-all shadow-2xs group"
        >
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-emerald-400 group-hover:animate-bounce" />
            <span>Install App (Works Offline)</span>
          </div>
          <span className="text-[10px] bg-emerald-800/80 px-1.5 py-0.5 rounded text-emerald-200">PWA</span>
        </button>
      )}

      {variant === 'banner' && (
        <div className="p-3 bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-xl shadow-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10">
              <Smartphone className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs font-bold">Install EduPlan NG on your phone or PC</p>
              <p className="text-[10px] text-emerald-200">Access curriculum, lesson notes & past questions anytime offline</p>
            </div>
          </div>
          <button
            onClick={handleInstallClick}
            className="px-3 py-1.5 rounded-lg bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-extrabold shadow-xs transition"
          >
            Install
          </button>
        </div>
      )}

      {/* iOS & Browser Fallback Guide Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Install EduPlan NG</h3>
                  <p className="text-[10px] text-gray-500">Offline PWA Installation Guide</p>
                </div>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-gray-600 leading-relaxed">
              <div className="p-3 bg-slate-50 rounded-xl border border-gray-200">
                <p className="font-bold text-gray-800 mb-1">On iPhone / iPad (Safari):</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Tap the <strong>Share</strong> button (box with upward arrow) at bottom of Safari.</li>
                  <li>Scroll down and tap <strong>"Add to Home Screen"</strong>.</li>
                  <li>Tap <strong>Add</strong> at top right to launch offline.</li>
                </ol>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-gray-200">
                <p className="font-bold text-gray-800 mb-1">On Android / Chrome / Edge:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Tap the 3-dots browser menu in upper right.</li>
                  <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
                </ol>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-5 w-full rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition"
            >
              Got it, close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
