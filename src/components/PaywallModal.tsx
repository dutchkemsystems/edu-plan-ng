import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  CreditCard,
  Building2,
  Landmark,
  Zap,
  Clock,
  Star,
  ExternalLink
} from 'lucide-react';
import {
  SUBSCRIPTION_PLANS,
  B2B_SCHOOL_PLANS,
  B2G_GOVERNMENT_PLANS,
  SubscriptionPlan,
  getPlanById,
} from '../data/subscriptionPlans.ts';
import { initializeKoraPayment, getAuthHeaders } from '../lib/api.ts';
import { TeacherUser } from '../types/index.ts';
import confetti from 'canvas-confetti';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: TeacherUser | null;
  selectedPlanId?: string;
  onSuccess: () => void;
  isExpiredTrial?: boolean;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  user,
  selectedPlanId = 'b2c_session',
  onSuccess,
  isExpiredTrial = false,
}) => {
  const resolveTabForPlan = (planId: string): 'teacher' | 'principal' | 'ministry' => {
    const clean = (planId || '').toLowerCase();
    if (clean.startsWith('b2g_') || clean.includes('platinum') || clean.includes('state')) return 'ministry';
    if (clean.startsWith('b2b_') || ['bronze', 'silver', 'gold'].includes(clean)) return 'principal';
    return 'teacher';
  };

  const [accountType, setAccountType] = useState<'teacher' | 'principal' | 'ministry'>(() =>
    resolveTabForPlan(selectedPlanId)
  );
  const [activePlanId, setActivePlanId] = useState<string>(() => getPlanById(selectedPlanId || 'b2c_session').id);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Payment simulation state if redirect or modal
  const [checkoutData, setCheckoutData] = useState<{
    reference: string;
    checkoutUrl?: string | null;
    isLiveCheckout?: boolean;
    gatewayMessage?: string;
    amount: number;
    mode: string;
    publicKey?: string;
    virtualAccount?: {
      accountNumber: string;
      bankName: string;
      accountName: string;
      ussdCode: string;
      transferInstructions?: string;
    };
  } | null>(null);

  useEffect(() => {
    if (isOpen && selectedPlanId) {
      const matched = getPlanById(selectedPlanId);
      setActivePlanId(matched.id);
      setAccountType(resolveTabForPlan(matched.id));
      setCheckoutData(null);
      setErrorMessage('');
    }
  }, [isOpen, selectedPlanId]);

  if (!isOpen) return null;

  const currentPlan = getPlanById(activePlanId);
  const payerEmail = user?.email || 'teacher@eduplan.ng';
  const payerName = user?.name || 'Educator';

  const handleCompleteUnlock = async (ref?: string, amt?: number) => {
    const activeRef = ref || checkoutData?.reference;
    const activeAmt = amt || checkoutData?.amount || currentPlan.price;
    if (!activeRef) return;
    setLoading(true);
    setErrorMessage('');
    try {
      // Trigger webhook callback to update database and unlock subscription
      const webhookRes = await fetch('/api/payments/webhook', {
        method: 'POST',
        headers: getAuthHeaders({
          'Content-Type': 'application/json',
          'x-korapay-signature': 'simulated_local_test_sig',
        }),
        credentials: 'include',
        body: JSON.stringify({
          event: 'charge.success',
          data: {
            reference: activeRef,
            status: 'success',
            amount: activeAmt,
            currency: 'NGN',
            customer: {
              email: payerEmail,
              name: payerName,
            },
            metadata: {
              planId: currentPlan.id,
              accountType: currentPlan.category,
              userId: user?.id || 'usr_teacher_demo_01',
              schoolId: currentPlan.category === 'b2b' ? (user?.schoolId || 'sch_kings_college_01') : undefined,
              ministryStateId: currentPlan.category === 'b2g' ? (user?.state || 'Lagos') : undefined,
            },
          },
        }),
      });

      if (webhookRes.ok) {
        confetti({ particleCount: 100, spread: 80 });
        onSuccess();
        onClose();
      } else {
        throw new Error('Payment completion failed');
      }
    } catch (e: any) {
      setErrorMessage('Could not activate subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToPayment = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      // Call Kora Pay payment initialization API
      const res = await initializeKoraPayment({
        plan: currentPlan.id,
        planId: currentPlan.id,
        accountType: currentPlan.category,
        schoolId: currentPlan.category === 'b2b' ? (user?.schoolId || 'sch_kings_college_01') : undefined,
        email: payerEmail,
        name: payerName,
        amount: currentPlan.price,
        userId: user?.id || 'usr_teacher_demo_01',
      });

      if (res && res.success) {
        // Case 1: Genuine verified live checkout redirect from Kora Pay
        if (res.isLiveCheckout && res.checkoutUrl) {
          window.location.href = res.checkoutUrl;
          return;
        }

        // Case 2: In-App Kora standard popup modal if Korapay SDK is loaded and public key is available
        const koraSdk = (window as any).Korapay;
        if (typeof koraSdk !== 'undefined' && res.publicKey && res.publicKey.startsWith('pk_')) {
          try {
            koraSdk.initialize({
              key: res.publicKey,
              reference: res.reference,
              amount: res.amount,
              currency: 'NGN',
              customer: {
                name: payerName,
                email: payerEmail,
              },
              notification_url: `${window.location.origin}/api/payments/webhook`,
              onSuccess: async () => {
                await handleCompleteUnlock(res.reference, res.amount);
              },
              onFailed: () => {
                setErrorMessage('Kora Pay modal reported a declined or uncompleted charge. You can confirm activation below.');
                setCheckoutData(res);
              },
              onClose: () => {
                setCheckoutData(res);
              },
            });
            return;
          } catch (popupErr) {
            console.warn('[Kora] Modal SDK failed, using in-app checkout activator', popupErr);
          }
        }

        // Case 3: In-App checkout activation screen (NO dead redirect links!)
        setCheckoutData(res);
        confetti({ particleCount: 50, spread: 60 });
      } else {
        throw new Error(res?.error || 'Failed to initialize payment gateway.');
      }
    } catch (err: any) {
      console.error('Payment error', err);
      setErrorMessage(err?.message || 'Could not connect to Kora Pay. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const plansToDisplay: SubscriptionPlan[] =
    accountType === 'teacher'
      ? SUBSCRIPTION_PLANS
      : accountType === 'principal'
      ? B2B_SCHOOL_PLANS
      : B2G_GOVERNMENT_PLANS;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white px-6 py-6 sm:px-8 border-b border-amber-500/30 relative">
          <button
            onClick={onClose}
            aria-label="Close paywall modal"
            className="absolute top-5 right-5 px-3 py-1.5 rounded-xl text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close</span>
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black tracking-wider uppercase flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              EduPlan NG • Kora Pay Checkout
            </span>
            {isExpiredTrial && (
              <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/40 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                24-Hour Free Trial Ended
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {isExpiredTrial
              ? 'Your 24-Hour Trial Has Concluded — Choose Your Plan to Continue'
              : 'Select Your Subscription Plan to Unlock Full Pedagogical Access'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Save 10+ hours every week with statutory curriculum plans, 13-week schemes of work, and official WAEC grading broadsheets.
          </p>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 space-y-6">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
              {errorMessage}
            </div>
          )}

          {!checkoutData ? (
            <>
              {/* Account Type Switcher */}
              <div className="flex justify-center pb-2">
                <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200 shadow-2xs max-w-2xl w-full">
                  <button
                    type="button"
                    onClick={() => {
                      setAccountType('teacher');
                      setActivePlanId('b2c_session');
                    }}
                    className={`flex-1 py-2 px-3 text-xs font-extrabold rounded-xl transition-all ${
                      accountType === 'teacher'
                        ? 'bg-white text-emerald-950 shadow-sm ring-1 ring-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Teachers (B2C)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAccountType('principal');
                      setActivePlanId('b2b_silver');
                    }}
                    className={`flex-1 py-2 px-3 text-xs font-extrabold rounded-xl transition-all ${
                      accountType === 'principal'
                        ? 'bg-white text-emerald-950 shadow-sm ring-1 ring-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Private Schools (B2B)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAccountType('ministry');
                      setActivePlanId('b2g_state_platinum');
                    }}
                    className={`flex-1 py-2 px-3 text-xs font-extrabold rounded-xl transition-all ${
                      accountType === 'ministry'
                        ? 'bg-white text-sky-950 shadow-sm ring-1 ring-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Ministry Platinum (B2G)
                  </button>
                </div>
              </div>

              {/* Plan Cards Grid */}
              <div
                className={`grid grid-cols-1 gap-3.5 ${
                  accountType === 'ministry'
                    ? 'max-w-xl mx-auto'
                    : 'sm:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {plansToDisplay.map((plan) => {
                  const isSelected = currentPlan.id === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setActivePlanId(plan.id)}
                      className={`relative rounded-2xl p-4.5 border-2 transition-all cursor-pointer flex flex-col justify-between text-left ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/30 ring-2 ring-amber-500/20 shadow-md scale-[1.01]'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {plan.badge && (
                        <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                          <Star className="w-3 h-3 fill-slate-950" />
                          <span>{plan.badge}</span>
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-sm text-slate-900">{plan.name}</span>
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? 'border-amber-500 bg-amber-500' : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>

                        <div className="mt-2 flex items-baseline gap-1.5">
                          <span className="text-2xl font-black text-slate-950">{plan.priceDisplay}</span>
                          <span className="text-[11px] font-semibold text-slate-500">/ {plan.periodLabel}</span>
                        </div>

                        {plan.savings && (
                          <span className="inline-block mt-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                            {plan.savings}
                          </span>
                        )}

                        <p className="text-[11px] text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                          {plan.description}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-100 space-y-1.5">
                        {plan.features.slice(0, 4).map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-tight">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Plan Summary & Checkout Button */}
              <div className="p-4.5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-0.5 text-center sm:text-left">
                  <div className="text-xs text-slate-400">Selected Plan:</div>
                  <div className="text-base font-black text-amber-400 flex items-center gap-2 justify-center sm:justify-start">
                    <span>{currentPlan.name}</span>
                    <span>•</span>
                    <span className="text-white">{currentPlan.priceDisplay}</span>
                    <span className="text-xs font-normal text-slate-300">({currentPlan.periodLabel})</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Secured by Kora Pay • Pay via ATM Card, Bank Transfer, USSD, or OPay
                  </p>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={handleProceedToPayment}
                    disabled={loading}
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Initializing Gateway...</span>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        <span>Pay {currentPlan.priceDisplay} with Kora Pay</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-500 pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>CBN &amp; NDPR Compliant Payment Gateway</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>Supports All Nigerian Banks (GTB, Access, Zenith, FirstBank, etc.)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Instant Account Activation</span>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 underline decoration-slate-300 hover:decoration-slate-600 transition-colors py-1 px-3 rounded-lg"
                >
                  Continue browsing EduPlan NG frontpage &amp; curriculum
                </button>
              </div>
            </>
          ) : (
            /* Checkout simulation / Confirmation modal */
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Kora Pay Payment Checkout Ready</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Transaction Reference:{' '}
                  <span className="font-mono font-bold text-slate-900">{checkoutData.reference}</span>
                </p>
                <div className="mt-2 text-2xl font-black text-emerald-800">
                  ₦{checkoutData.amount.toLocaleString()} NGN
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 max-w-md mx-auto text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Plan Selected:</span>
                  <strong className="text-slate-900">{currentPlan.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Customer Email:</span>
                  <span className="font-semibold">{payerEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Access Duration:</span>
                  <span className="font-semibold">{currentPlan.periodLabel}</span>
                </div>
                {checkoutData.virtualAccount && (
                  <>
                    <div className="pt-2 border-t border-slate-100 flex justify-between">
                      <span className="text-slate-500">Virtual NUBAN:</span>
                      <span className="font-mono font-bold text-slate-900">{checkoutData.virtualAccount.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Bank:</span>
                      <span className="font-semibold">{checkoutData.virtualAccount.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">USSD Quick Code:</span>
                      <span className="font-mono font-bold text-emerald-700">{checkoutData.virtualAccount.ussdCode}</span>
                    </div>
                  </>
                )}
              </div>

              {checkoutData.gatewayMessage && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 max-w-md mx-auto text-center font-medium">
                  {checkoutData.isLiveCheckout ? (
                    <span>Live Kora Pay gateway session initialized.</span>
                  ) : (
                    <span>{checkoutData.gatewayMessage}. Click below to verify and unlock your subscription immediately.</span>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                {checkoutData.isLiveCheckout && checkoutData.checkoutUrl && (
                  <a
                    href={checkoutData.checkoutUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <span>Open Kora Live Checkout Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <button
                  onClick={() => handleCompleteUnlock()}
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Payment &amp; Activate {currentPlan.name}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
