import React from 'react';
import {
  Lock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  X,
  Zap,
  Building2,
  Landmark
} from 'lucide-react';
import { resolveTierConfig, SubscriptionTierType } from '../config/pricing.ts';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  requiredTier?: SubscriptionTierType | string;
  onNavigateToPricing?: () => void;
  onDirectCheckout?: (tierId: string) => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  requiredTier = 'b2b_gold',
  onNavigateToPricing,
  onDirectCheckout,
}) => {
  if (!isOpen) return null;

  const lowerMsg = message.toLowerCase();
  const lowerTier = (requiredTier || '').toLowerCase();

  const isPlatinumRequired =
    lowerTier.includes('b2g') ||
    lowerTier.includes('platinum') ||
    lowerTier.includes('state') ||
    lowerMsg.includes('ministry') ||
    lowerMsg.includes('levy') ||
    lowerMsg.includes('cpd') ||
    lowerMsg.includes('emergency broadcast') ||
    lowerMsg.includes('state directorate');

  const isGoldRequired =
    !isPlatinumRequired &&
    (lowerTier === 'b2b_gold' ||
      lowerMsg.includes('gold') ||
      lowerMsg.includes('3d') ||
      lowerMsg.includes('4k') ||
      lowerMsg.includes('heatmap') ||
      lowerMsg.includes('white-label') ||
      lowerMsg.includes('fee recovery') ||
      lowerMsg.includes('all 6'));

  const isSilverRequired =
    !isPlatinumRequired &&
    !isGoldRequired &&
    (lowerTier === 'b2b_silver' ||
      lowerMsg.includes('silver') ||
      lowerMsg.includes('timetable') ||
      lowerMsg.includes('sen'));

  const isBronzeRequired =
    !isPlatinumRequired &&
    !isGoldRequired &&
    !isSilverRequired &&
    (lowerTier === 'b2b_bronze' || lowerMsg.includes('bronze') || lowerMsg.includes('school plan'));

  const isMonthlyRequired =
    !isPlatinumRequired &&
    !isGoldRequired &&
    !isSilverRequired &&
    !isBronzeRequired &&
    (lowerTier === 'b2c_monthly' || lowerMsg.includes('1-month'));

  const targetTierId: SubscriptionTierType = isPlatinumRequired
    ? 'b2g_state_platinum'
    : isGoldRequired
    ? 'b2b_gold'
    : isSilverRequired
    ? 'b2b_silver'
    : isBronzeRequired
    ? 'b2b_bronze'
    : isMonthlyRequired
    ? 'b2c_monthly'
    : 'b2c_termly';

  const targetConfig = resolveTierConfig(targetTierId);

  const handleUpgradeAction = () => {
    if (onDirectCheckout) {
      onDirectCheckout(targetTierId);
    } else if (onNavigateToPricing) {
      onNavigateToPricing();
    } else if (typeof window !== 'undefined') {
      window.location.hash = '#/pricing';
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Top Accent Strip */}
        <div
          className={`h-2.5 w-full ${
            isPlatinumRequired
              ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500'
              : isGoldRequired
              ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500'
              : isSilverRequired || isBronzeRequired
              ? 'bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500'
              : 'bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500'
          }`}
        />

        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close upgrade modal"
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-7 space-y-5 text-center">
          {/* Badge Icon */}
          <div
            className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center shadow-sm ${
              isPlatinumRequired
                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                : isGoldRequired
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            }`}
          >
            {isPlatinumRequired ? (
              <Landmark className="w-7 h-7" />
            ) : isGoldRequired || isSilverRequired || isBronzeRequired ? (
              <Building2 className="w-7 h-7" />
            ) : (
              <Zap className="w-7 h-7" />
            )}
          </div>

          {/* Heading */}
          <div className="space-y-1.5">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase ${
                isPlatinumRequired
                  ? 'bg-blue-50 text-blue-900 border border-blue-200'
                  : isGoldRequired
                  ? 'bg-amber-50 text-amber-900 border border-amber-200'
                  : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
              }`}
            >
              <Lock className="w-3 h-3" />
              <span>
                {isPlatinumRequired
                  ? 'B2G Ministry Platinum'
                  : isGoldRequired
                  ? 'B2B Gold Exclusive'
                  : isSilverRequired
                  ? 'B2B Silver Tier+'
                  : isBronzeRequired
                  ? 'B2B School License'
                  : `${targetConfig.name} Required`}
              </span>
            </span>

            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              {title || `${targetConfig.name} Required`}
            </h3>
          </div>

          {/* User Message */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            {message}
          </div>

          {/* Highlights */}
          <div className="text-left space-y-2 text-xs text-slate-600 pt-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {isPlatinumRequired
                  ? 'Unlocks Ministry Command, State Policy Enforcement, Levy Tracker, CPD & Sovereign Direct API'
                  : isGoldRequired
                  ? 'Unlocks All 6 Sources, Unlimited Teachers, Heatmap, Fee Recovery, 3D/4K, White-Label & LMS Export'
                  : isSilverRequired
                  ? 'Unlocks 2 Sources, 40 Teachers, Exams, Timetable AI, SEN Module & Parent Portal'
                  : isMonthlyRequired
                  ? 'Clean PDF/DOC exports (no Draft watermark), 30 AI generations & 5 Library saves'
                  : 'Unlocks 2 Sources, Unlimited Library & Bulk Exports, WAEC/NECO Exams, Report Card AI & Parent Autopilot'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Instant activation via Kora Pay (Card, Virtual NUBAN, USSD)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2.5">
            <button
              type="button"
              onClick={handleUpgradeAction}
              className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 ${
                isPlatinumRequired
                  ? 'bg-blue-700 hover:bg-blue-800 shadow-blue-700/20'
                  : isGoldRequired
                  ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
                  : isSilverRequired
                  ? 'bg-blue-700 hover:bg-blue-800 shadow-blue-800/20'
                  : 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-800/20'
              }`}
            >
              <span>
                {isPlatinumRequired
                  ? 'Upgrade to Ministry Platinum (₦100M–₦300M / yr)'
                  : `Upgrade to ${targetConfig.name} (${targetConfig.priceDisplay})`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
