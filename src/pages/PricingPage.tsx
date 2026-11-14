import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Building2,
  Users,
  Sparkles,
  Check,
  X,
  Copy,
  Clock,
  ArrowRight,
  ExternalLink,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Zap,
  Printer,
  Landmark,
  Lock,
  Flame,
  FileCheck2,
  Layers,
  BookMarked
} from 'lucide-react';
import { TeacherUser } from '../types/index.ts';
import {
  SUBSCRIPTION_PLANS,
  B2B_SCHOOL_PLANS,
  B2G_GOVERNMENT_PLANS,
  SubscriptionPlan,
} from '../data/subscriptionPlans.ts';
import { resolveClientTierSummary } from '../config/pricing.ts';
import { getAuthHeaders } from '../lib/api.ts';
import confetti from 'canvas-confetti';

interface PricingPageProps {
  user?: TeacherUser | null;
  onPlanUpgraded?: () => void;
  onNavigate?: (route: string) => void;
}

interface VirtualAccountData {
  accountNumber: string;
  bankName: string;
  accountName: string;
  ussdCode: string;
  expiresInMinutes: number;
  transferInstructions: string;
}

interface CheckoutState {
  reference: string;
  planId: string;
  planName: string;
  amount: number;
  amountFormatted: string;
  accountType: 'b2c_individual' | 'b2b_school' | 'b2g_government';
  virtualAccount: VirtualAccountData;
  checkoutUrl?: string;
}

export const PricingPage: React.FC<PricingPageProps> = ({ user, onPlanUpgraded, onNavigate }) => {
  const tierSummary = resolveClientTierSummary(user, null);
  const [accountType, setAccountType] = useState<'b2c' | 'b2b' | 'b2g'>(() =>
    tierSummary.category === 'b2g' ? 'b2g' : tierSummary.category === 'b2b' ? 'b2b' : 'b2c'
  );
  React.useEffect(() => {
    setAccountType(tierSummary.category === 'b2g' ? 'b2g' : tierSummary.category === 'b2b' ? 'b2b' : 'b2c');
  }, [tierSummary.category]);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [checkoutModal, setCheckoutModal] = useState<CheckoutState | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedUssd, setCopiedUssd] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [activeTab, setActiveTab] = useState<'transfer' | 'ussd'>('transfer');
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleInitializeCheckout = async (planId: string) => {
    setLoadingPlan(planId);
    setPaymentConfirmed(false);
    setPaymentError(null);

    try {
      const response = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify({
          planId,
          userId: user?.id || 'usr_teacher_demo_01',
          email: user?.email || 'teacher@eduplan.ng',
          name: user?.name || 'Nigerian Educator',
          schoolId: accountType === 'b2b' ? user?.schoolId || 'sch_kings_college_01' : undefined,
          schoolName: user?.schoolName,
          accountType,
          paymentMethod: 'virtual_account',
        }),
      });

      const data = await response.json();
      if (data.success && data.virtualAccount) {
        setCheckoutModal(data);
        confetti({ particleCount: 50, spread: 50 });
      } else {
        setPaymentError(data.error || 'Unable to generate virtual payment account. Please retry.');
      }
    } catch (err) {
      console.error('Payment init error', err);
      setPaymentError('Network error connecting to payment gateway. Please check your connection.');
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleVerifyPayment = async () => {
    if (!checkoutModal) return;
    setVerifyingPayment(true);
    setPaymentError(null);

    try {
      const targetCategory = checkoutModal.planId.startsWith('b2g_')
        ? 'b2g'
        : checkoutModal.planId.startsWith('b2b_')
        ? 'b2b'
        : 'b2c';
      const res = await fetch('/api/payments/webhook', {
        method: 'POST',
        headers: getAuthHeaders({
          'Content-Type': 'application/json',
          'x-korapay-signature': 'simulated_local_test_sig',
        }),
        credentials: 'include',
        body: JSON.stringify({
          event: 'charge.success',
          data: {
            reference: checkoutModal.reference,
            status: 'success',
            amount: checkoutModal.amount,
            currency: 'NGN',
            customer: {
              email: user?.email || 'teacher@eduplan.ng',
              name: user?.name || 'Nigerian Educator',
            },
            metadata: {
              planId: checkoutModal.planId,
              accountType: targetCategory,
              userId: user?.id || 'usr_teacher_demo_01',
              schoolId: targetCategory === 'b2b' ? user?.schoolId || 'sch_kings_college_01' : undefined,
              ministryStateId: targetCategory === 'b2g' ? user?.state || 'Lagos' : undefined,
            },
          },
        }),
      });

      if (res.ok) {
        setPaymentConfirmed(true);
        confetti({ particleCount: 100, spread: 70 });
        if (onPlanUpgraded) await onPlanUpgraded();
      } else {
        const err = await res.json().catch(() => ({}));
        setPaymentError(err.error || 'Could not confirm payment webhook.');
      }
    } catch (e) {
      console.error('Webhook verification error', e);
      setPaymentError('Network error while verifying payment.');
    } finally {
      setVerifyingPayment(false);
    }
  };

  const handleCopy = (text: string, type: 'account' | 'ussd') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === 'account') {
        setCopiedAccount(true);
        setTimeout(() => setCopiedAccount(false), 2500);
      } else {
        setCopiedUssd(true);
        setTimeout(() => setCopiedUssd(false), 2500);
      }
    }
  };

  const currentPlans: SubscriptionPlan[] =
    accountType === 'b2c'
      ? SUBSCRIPTION_PLANS
      : accountType === 'b2b'
      ? B2B_SCHOOL_PLANS
      : B2G_GOVERNMENT_PLANS;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-150">
      {/* Title & Tier Switcher */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Strict Regulatory Curriculum SaaS · Statutory NGN Pricing Only</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
          Subscription Tiers & Exact Feature Allocation
        </h1>
        <p className="text-sm text-slate-600">
          Strictly tiered for individual Nigerian educators (B2C), private colleges (B2B), and state education ministries (B2G). Hardcoded fair-use rate limits protect platform stability and curriculum delivery.
        </p>

        {/* 3-Way Role differentiation tabs */}
        <div className="pt-2 flex justify-center">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200/90 shadow-xs max-w-2xl w-full">
            <button
              onClick={() => setAccountType('b2c')}
              className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                accountType === 'b2c'
                  ? 'bg-white text-emerald-950 shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-700" />
              <span>1. Teachers (B2C)</span>
            </button>
            <button
              onClick={() => setAccountType('b2b')}
              className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                accountType === 'b2b'
                  ? 'bg-white text-emerald-950 shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-700" />
              <span>2. Schools & Principals (B2B)</span>
            </button>
            <button
              onClick={() => setAccountType('b2g')}
              className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                accountType === 'b2g'
                  ? 'bg-white text-emerald-950 shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Landmark className="w-4 h-4 text-blue-700" />
              <span>3. State Ministry (B2G)</span>
            </button>
          </div>
        </div>

        {/* Distinct account description callout */}
        <div className="pt-2">
          {accountType === 'b2c' ? (
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs text-emerald-950 max-w-2xl mx-auto flex items-center gap-2 text-left">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>
                <strong>B2C Individual Teacher Tiers:</strong> From 5-Day Test Drive (10 generations total) to Pro Teacher passes (Fair Use cap: 50 generations/day). 3D/4K aids and Principal Heatmaps are strictly reserved for B2B Gold to prevent account resale.
              </span>
            </div>
          ) : accountType === 'b2b' ? (
            <div className="p-3.5 bg-amber-50/70 border border-amber-300 rounded-2xl text-xs text-amber-950 max-w-2xl mx-auto flex items-center gap-2 text-left">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <span>
                <strong>B2B Private School Tiers:</strong> Bronze (up to 15 teachers), Silver (up to 40 teachers with Exam AI), and Gold (unlimited teachers, Principal Compliance Heatmap & 2D/3D/4K visual realia).
              </span>
            </div>
          ) : (
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs text-blue-950 max-w-2xl mx-auto flex items-center gap-2 text-left">
              <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
              <span>
                <strong>B2G State Ministry Directorate:</strong> Sovereign state-wide license (₦100M–₦300M/year) powering public/private schools, direct curriculum push API, and Ministry compliance analytics command center.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Payment Error Banner */}
      {paymentError && (
        <div className="max-w-2xl mx-auto p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-between gap-3">
          <span>{paymentError}</span>
          <button onClick={() => setPaymentError(null)} className="text-rose-600 hover:text-rose-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Plan Grid */}
      <div
        className={`grid grid-cols-1 ${
          accountType === 'b2c'
            ? 'md:grid-cols-2 lg:grid-cols-4 gap-5'
            : accountType === 'b2b'
            ? 'md:grid-cols-3 gap-6'
            : 'max-w-xl mx-auto'
        }`}
      >
        {currentPlans.map((plan) => {
          const isGold = plan.id === 'b2b_gold' || plan.id === 'b2g_state_platinum';
          const isBestTeacher = plan.id === 'b2c_session' || plan.popular;
          const isCurrentPlan = tierSummary.tierId === plan.id && !tierSummary.isExpired;

          return (
            <div
              key={plan.id}
              className={`bg-white rounded-3xl border p-6 flex flex-col justify-between transition-all relative ${
                isCurrentPlan
                  ? 'border-emerald-600 shadow-lg ring-2 ring-emerald-500/30'
                  : isGold
                  ? 'border-amber-500 shadow-md ring-2 ring-amber-500/20'
                  : isBestTeacher
                  ? 'border-emerald-600 shadow-md ring-2 ring-emerald-600/20'
                  : 'border-slate-200/90 shadow-2xs hover:shadow-xs'
              }`}
            >
              <div className="flex flex-wrap items-center gap-1.5 mb-3">
                {isCurrentPlan && (
                  <div className="text-[11px] font-black px-2.5 py-0.5 rounded-md inline-flex items-center gap-1 text-white bg-emerald-700">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Active Plan</span>
                  </div>
                )}
                {plan.badge && (
                  <div
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md inline-block border ${
                      isGold
                        ? 'text-amber-900 bg-amber-50 border-amber-200'
                        : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                    }`}
                  >
                    {plan.badge}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-black text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-500 min-h-[30px] mt-1">{plan.description}</p>
                </div>

                <div className="pt-2 pb-3 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900 font-mono tabular-nums">
                      {plan.priceDisplay}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ {plan.periodLabel}</span>
                  </div>

                  {plan.savings && (
                    <span className="inline-block mt-2 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                      {plan.savings}
                    </span>
                  )}

                  {/* Quota & Source Access Badges */}
                  <div className="mt-2.5 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <Layers className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>
                        {plan.maxGenerationsTotal
                          ? `Quota: ${plan.maxGenerationsTotal} Generations Total`
                          : `Fair Use Cap: ${plan.dailyFairUseCap}/day`}
                      </span>
                    </div>
                    {plan.sourceAccessSummary && (
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-900 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg">
                        <BookMarked className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>{plan.sourceAccessSummary}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features Included */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                    ✓ Features Included
                  </span>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Restrictions (Anti-Feature Creep & Upgrade Driver) */}
                {plan.restrictions && plan.restrictions.length > 0 && (
                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
                      ✕ Tier Restrictions
                    </span>
                    {plan.restrictions.map((res, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-500 font-medium">
                        <Lock className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  onClick={() => handleInitializeCheckout(plan.id)}
                  disabled={loadingPlan === plan.id}
                  className={`w-full py-2.5 px-4 text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center justify-center gap-1.5 ${
                    isGold
                      ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20'
                      : isBestTeacher
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-800/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {loadingPlan === plan.id ? (
                    <span>Generating Virtual Account...</span>
                  ) : (
                    <>
                      <span>{isCurrentPlan ? `Renew / Extend ${plan.name}` : plan.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete Dual/Triple Comparison Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold mb-2">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Complete Statutory Specification Matrix</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              B2C Teacher vs. B2B School vs. B2G State Directorate
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Exact feature allocation and security boundaries designed to prevent credential sharing and protect AI infrastructure.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 text-slate-900 bg-slate-50/70">
                <th className="py-3.5 px-4 font-black">Dimension</th>
                <th className="py-3.5 px-4 font-black text-emerald-950 bg-emerald-50/60">
                  👨‍🏫 Teacher (B2C)
                </th>
                <th className="py-3.5 px-4 font-black text-amber-950 bg-amber-50/60">
                  🏛️ School (B2B)
                </th>
                <th className="py-3.5 px-4 font-black text-blue-950 bg-blue-50/60">
                  🏢 State Ministry (B2G)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">Pricing Models</td>
                <td className="py-3.5 px-4 font-bold text-emerald-900 bg-emerald-50/20">
                  ₦500 (5-day), ₦1,000 (month), ₦1,500 (term), ₦3,000 (session)
                </td>
                <td className="py-3.5 px-4 font-bold text-amber-950 bg-amber-50/20">
                  Bronze: ₦45,000 | Silver: ₦120,000 | Gold: ₦250,000 / term
                </td>
                <td className="py-3.5 px-4 font-bold text-blue-950 bg-blue-50/20">
                  ₦100M – ₦300M / year (State-wide)
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 bg-emerald-50/15">
                <td className="py-3.5 px-4 font-black text-slate-900">
                  Curriculum Source Access
                </td>
                <td className="py-3.5 px-4 font-bold text-emerald-900 bg-emerald-50/30">
                  Trial/Monthly: 1 source | Term/Session: 2 sources
                </td>
                <td className="py-3.5 px-4 font-bold text-amber-950 bg-amber-50/30">
                  Bronze: 1 source/class | Silver: 2 sources | Gold: All 6 sources
                </td>
                <td className="py-3.5 px-4 font-bold text-blue-950 bg-blue-50/30">
                  All 6 sources + Sovereign Source Policy Enforcement
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">Exams, SEN & Timetable AI</td>
                <td className="py-3.5 px-4 font-medium bg-emerald-50/20">
                  Term/Session: WAEC/NECO Exams (No SEN/Timetable)
                </td>
                <td className="py-3.5 px-4 font-medium bg-amber-50/20">
                  Bronze: None | Silver & Gold: WAEC/NECO/BECE Exams, Timetables & SEN
                </td>
                <td className="py-3.5 px-4 font-medium bg-blue-50/20">
                  Full Adaptive SEN, Statewide Timetable & Exam Bank
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">Seat Allocation</td>
                <td className="py-3.5 px-4 font-medium bg-emerald-50/20">
                  Single Teacher (1 seat)
                </td>
                <td className="py-3.5 px-4 font-medium bg-amber-50/20">
                  Bronze: 15 seats | Silver: 40 seats | Gold: Unlimited
                </td>
                <td className="py-3.5 px-4 font-medium bg-blue-50/20">
                  Unlimited public and private teachers across state
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">AI Generation Quota</td>
                <td className="py-3.5 px-4 font-medium bg-emerald-50/20">
                  Trial: 10 total | Monthly: 30 total | Pro: Fair Use 50/day
                </td>
                <td className="py-3.5 px-4 font-medium bg-amber-50/20">
                  Unlimited (Fair Use 50/day per teacher)
                </td>
                <td className="py-3.5 px-4 font-medium bg-blue-50/20">
                  Sovereign dedicated cluster capacity (100/day per user)
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">Library Saves &amp; PDF Exports</td>
                <td className="py-3.5 px-4 font-medium bg-emerald-50/20">
                  Trial: Draft Watermark, 0 saves | Monthly: Clean PDF, 5 saves | Term/Session: Unlimited + Bulk
                </td>
                <td className="py-3.5 px-4 font-medium bg-amber-50/20">
                  Unlimited Library + Clean Bulk Exports | Gold adds White-Label &amp; LMS Export
                </td>
                <td className="py-3.5 px-4 font-medium bg-blue-50/20">
                  Unlimited State Repository + Levy Tracker + CPD Module + Emergency Broadcast
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">3D/4K Visual Aids &amp; Fee Recovery</td>
                <td className="py-3.5 px-4 font-semibold text-rose-700 bg-emerald-50/20">
                  Locked (Reserved for B2B Gold)
                </td>
                <td className="py-3.5 px-4 font-medium bg-amber-50/20">
                  Bronze/Silver: Locked | Gold: Full 2D/3D, 4K STEM, Heatmap &amp; Fee Recovery
                </td>
                <td className="py-3.5 px-4 font-medium bg-blue-50/20">
                  Full 4K Ultra-HD STEM Simulation &amp; State Levy Audits state-wide
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">Principal Compliance Heatmap</td>
                <td className="py-3.5 px-4 font-semibold text-rose-700 bg-emerald-50/20">
                  Not available on teacher tier
                </td>
                <td className="py-3.5 px-4 font-medium bg-amber-50/20">
                  Gold Tier Exclusive
                </td>
                <td className="py-3.5 px-4 font-medium bg-blue-50/20">
                  State-Wide Ministry Command Dashboard &amp; OEQA Audit
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">WAEC / NECO Exam Predictor</td>
                <td className="py-3.5 px-4 font-medium bg-emerald-50/20">
                  Unlocked on Termly (₦1,500) and Session (₦3,000)
                </td>
                <td className="py-3.5 px-4 font-medium bg-amber-50/20">
                  Silver &amp; Gold Tiers Only
                </td>
                <td className="py-3.5 px-4 font-medium bg-blue-50/20">
                  Included state-wide with mock broadsheet analytics
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">Ministry Direct API Sync</td>
                <td className="py-3.5 px-4 font-semibold text-rose-700 bg-emerald-50/20">
                  No API access
                </td>
                <td className="py-3.5 px-4 font-semibold text-rose-700 bg-amber-50/20">
                  No API access
                </td>
                <td className="py-3.5 px-4 font-bold text-blue-900 bg-blue-50/20">
                  Sovereign Direct API + State Policy Enforcement
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Kora Pay Dynamic Virtual Account & USSD Checkout Modal */}
      {checkoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  ₦
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Kora Pay Checkout · {checkoutModal.planName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ref: {checkoutModal.reference}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCheckoutModal(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Success state */}
            {paymentConfirmed ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  Payment Confirmed Successfully!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your subscription to <strong>{checkoutModal.planName}</strong> is now active. All curriculum tools, OEQA formats, and exam predictors are unlocked.
                </p>
                <button
                  onClick={() => {
                    setCheckoutModal(null);
                    onPlanUpgraded?.();
                    onNavigate?.('dashboard');
                  }}
                  className="px-6 py-2.5 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 shadow-2xs"
                >
                  Return to Workspace
                </button>
              </div>
            ) : (
              /* Payment instructions */
              <div className="space-y-4 pt-4">
                {/* Amount strip */}
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-200/80">
                  <span className="text-xs text-slate-600 font-medium">Amount Due:</span>
                  <span className="text-xl font-mono font-extrabold text-slate-900 tabular-nums">
                    {checkoutModal.amountFormatted}
                  </span>
                </div>

                {/* Tabs: Bank Transfer vs USSD */}
                <div className="flex p-1 bg-slate-100 rounded-lg">
                  <button
                    onClick={() => setActiveTab('transfer')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      activeTab === 'transfer'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Bank Transfer (Virtual NUBAN)
                  </button>
                  <button
                    onClick={() => setActiveTab('ussd')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      activeTab === 'ussd'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Direct USSD Dial Code
                  </button>
                </div>

                {activeTab === 'transfer' ? (
                  /* Virtual Account Card */
                  <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-3">
                    <div className="flex items-center justify-between text-xs text-emerald-900 font-semibold">
                      <span>Bank Name:</span>
                      <span className="font-bold">{checkoutModal.virtualAccount.bankName}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-emerald-900 font-semibold">
                      <span>Account Name:</span>
                      <span className="font-bold">{checkoutModal.virtualAccount.accountName}</span>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-emerald-300 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">
                          Dedicated Account Number
                        </span>
                        <span className="text-xl font-mono font-extrabold tracking-wider text-slate-900 tabular-nums">
                          {checkoutModal.virtualAccount.accountNumber}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          handleCopy(checkoutModal.virtualAccount.accountNumber, 'account')
                        }
                        className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        {copiedAccount ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-tight">
                      Open your bank app (Opay, PalmPay, GTBank, Zenith, Access, Kuda, FirstBank) and transfer exactly{' '}
                      <strong>{checkoutModal.amountFormatted}</strong> to the account above. It is dedicated to this transaction and expires in 60 minutes.
                    </p>
                  </div>
                ) : (
                  /* USSD Card */
                  <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200 space-y-3">
                    <span className="text-xs text-blue-900 font-bold block">
                      Dial on your registered SIM:
                    </span>

                    <div className="p-3 bg-white rounded-lg border border-blue-300 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">
                          Wema / Kora USSD String
                        </span>
                        <span className="text-lg font-mono font-extrabold text-blue-950">
                          {checkoutModal.virtualAccount.ussdCode}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          handleCopy(checkoutModal.virtualAccount.ussdCode, 'ussd')
                        }
                        className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        {copiedUssd ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-500">
                      Dial directly from your MTN, Airtel, Glo, or 9mobile device to approve with your 4-digit bank USSD PIN.
                    </p>
                  </div>
                )}

                {/* Confirm Action Button */}
                <div className="pt-2">
                  <button
                    onClick={handleVerifyPayment}
                    disabled={verifyingPayment}
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center justify-center gap-2"
                  >
                    {verifyingPayment ? (
                      <span>Verifying Transfer with Gateway...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>I Have Transferred {checkoutModal.amountFormatted}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
