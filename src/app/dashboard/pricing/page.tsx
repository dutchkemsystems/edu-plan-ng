import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Building2,
  Users,
  Sparkles,
  Check,
  Copy,
  Clock,
  ArrowRight,
  ExternalLink,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

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
  accountType: 'b2c_individual' | 'b2b_school';
  virtualAccount: VirtualAccountData;
  checkoutUrl?: string;
}

export default function PricingPage() {
  const [accountType, setAccountType] = useState<'b2c' | 'b2b'>('b2c');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [checkoutModal, setCheckoutModal] = useState<CheckoutState | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedUssd, setCopiedUssd] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [activeTab, setActiveTab] = useState<'transfer' | 'ussd'>('transfer');
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const b2cPlans = [
    {
      id: 'trial_5day',
      name: '5-Day Fast Trial',
      tagline: 'Ideal for short teaching assessments & interviews',
      price: 500,
      priceFormatted: '₦500',
      duration: '5 Days',
      badge: null,
      features: [
        '1 Curriculum Source of choice',
        '10 AI Lesson Plan generations total',
        'Basic text output & pedagogical guides',
        'Watermarked "Draft" PDF export',
      ],
      cta: 'Start 5-Day Trial (₦500)',
    },
    {
      id: 'monthly',
      name: '1-Month Standard',
      tagline: 'Flexible month-to-month teaching support',
      price: 1000,
      priceFormatted: '₦1,000',
      duration: '30 Days',
      badge: null,
      features: [
        '1 Curriculum Source of choice',
        '30 AI Lesson Plan generations total',
        'Full text generation & chalkboard notes',
        'Standard clean PDF export (no watermark)',
        'Save up to 5 notes in Library',
      ],
      cta: 'Subscribe Monthly (₦1,000)',
    },
    {
      id: 'termly',
      name: 'Termly Master (Recommended)',
      tagline: 'Complete 13-week academic term coverage',
      price: 1500,
      priceFormatted: '₦1,500',
      duration: '1 Term (105 Days)',
      badge: 'Most Popular for Educators',
      popular: true,
      features: [
        '2 Curriculum Sources simultaneously (e.g. Lagos Scheme + WAEC)',
        'Unlimited AI generations (Fair Use: 50/day)',
        '2D diagrammatic notes & charts',
        'WAEC & NECO exam & marking scheme generators',
        'WhatsApp Parent Communication Autopilot',
        'Unlimited Library saving & bulk PDF/Word exports',
      ],
      cta: 'Activate Termly Plan (₦1,500)',
    },
    {
      id: 'full_session',
      name: 'Full Academic Session',
      tagline: 'Best value for career Nigerian educators (3 terms)',
      price: 3000,
      priceFormatted: '₦3,000',
      duration: '1 Full Year (365 Days)',
      badge: 'Best Annual Value',
      features: [
        'Full 3-Term Coverage (1st, 2nd, and 3rd Term)',
        '2 Curriculum Sources simultaneously',
        'Unlimited AI generations (Fair Use: 50/day)',
        'Full access to 2D diagrammatic notes',
        'WAEC & NECO exam predictor engine',
        'Parent Autopilot WhatsApp templates',
        'Save ₦1,500 vs paying termly',
      ],
      cta: 'Get Full Session Access (₦3,000)',
    },
  ];

  const b2bPlans = [
    {
      id: 'b2b_bronze',
      name: 'Bronze School Tier',
      tagline: 'For private academies & community schools',
      price: 45000,
      priceFormatted: '₦45,000',
      duration: 'Per Term (105 Days)',
      capacity: 'Up to 15 Faculty Members',
      features: [
        '1 Curriculum Source per Class (Lagos Scheme or NERDC)',
        '15 Dedicated Teacher Seats with unified logins',
        'Unlimited AI Lesson Plans for all 15 teachers (Fair Use: 50/day)',
        'School broadsheet report card export',
        'Virtual NUBAN & centralized school billing',
      ],
      cta: 'Activate Bronze (₦45,000 / Term)',
    },
    {
      id: 'b2b_silver',
      name: 'Silver Model School',
      tagline: 'For established private colleges & high schools',
      price: 120000,
      priceFormatted: '₦120,000',
      duration: 'Per Term (105 Days)',
      capacity: 'Up to 40 Faculty Members',
      popular: true,
      badge: 'Recommended for Colleges',
      features: [
        '2 Curriculum Sources across all departments',
        '40 Dedicated Teacher Seats across all departments',
        'WAEC, NECO & BECE Exam & Marking Scheme Generators',
        'Master Timetable Generator AI',
        'Special Educational Needs (SEN / Differentiated IEP) Engine',
        'Parent Portal & Autopilot (WhatsApp / SMS broadcasting)',
      ],
      cta: 'Activate Silver (₦120,000 / Term)',
    },
    {
      id: 'b2b_gold',
      name: 'Gold Enterprise Unity',
      tagline: 'For Federal Unity Colleges & Large Multi-Campus Institutions',
      price: 250000,
      priceFormatted: '₦250,000',
      duration: 'Per Term (105 Days)',
      capacity: 'Unlimited Faculty Members',
      badge: 'Full Institutional Power',
      features: [
        'All 6 Curriculum Sources Unlocked: NERDC, Lagos, OEQA, BECE, WAEC, NECO',
        'Unlimited Teacher Accounts across all departments',
        'Principal Multi-Source Compliance Heatmap & Outdated Syllabus Detector',
        'Automated Tuition Fee Recovery & Parent Arrears Engine',
        'Full access to 2D/3D Interactive Lab & 4K STEM Visual Aids',
        'White-Label Portal (Custom Subdomain & Watermark) & LMS Exports',
      ],
      cta: 'Deploy Gold Elite (₦250,000 / Term)',
    },
  ];

  const handleInitializeCheckout = async (planId: string) => {
    setLoadingPlan(planId);
    setPaymentConfirmed(false);
    setPaymentError(null);

    try {
      const response = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          userId: 'usr_teacher_demo_01',
          accountType,
          schoolId: accountType === 'b2b' ? 'sch_kings_college_01' : undefined,
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

    try {
      // Simulate/trigger Kora Pay webhook check
      const res = await fetch('/api/payments/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'charge.success',
          data: {
            reference: checkoutModal.reference,
            status: 'success',
            amount: checkoutModal.amount,
            currency: 'NGN',
          },
        }),
      });

      if (res.ok) {
        setPaymentConfirmed(true);
        confetti({ particleCount: 100, spread: 70 });
      }
    } catch (e) {
      console.error('Webhook verification error', e);
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Title & Tier Switcher */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Statutory Nigerian Curriculum SaaS · NGN Pricing Only</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          Transparent, High-Impact Pricing for Nigerian Education
        </h1>
        <p className="text-sm text-slate-600">
          Empowering individual classroom teachers (B2C) and modern schools of all sizes (B2B) across all 36 States and the FCT.
        </p>

        {/* B2C vs B2B Segmented Switcher */}
        <div className="pt-2 flex justify-center">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-2xs">
            <button
              onClick={() => setAccountType('b2c')}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                accountType === 'b2c'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-700" />
              <span>Individual Educators (B2C)</span>
            </button>
            <button
              onClick={() => setAccountType('b2b')}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                accountType === 'b2b'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-700" />
              <span>Schools & Colleges (B2B)</span>
            </button>
          </div>
        </div>
      </div>

      {paymentError && (
        <div className="max-w-xl mx-auto p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-between gap-3">
          <span>{paymentError}</span>
          <button onClick={() => setPaymentError(null)} className="text-rose-600 hover:text-rose-900 font-black">
            Dismiss
          </button>
        </div>
      )}

      {/* Plan Grid */}
      {accountType === 'b2c' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {b2cPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl border p-6 flex flex-col justify-between transition-shadow relative ${
                plan.popular
                  ? 'border-emerald-600 shadow-md ring-1 ring-emerald-600'
                  : 'border-slate-200/90 shadow-2xs hover:shadow-xs'
              }`}
            >
              {plan.badge && (
                <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md inline-block self-start mb-3 border border-emerald-200">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900">{plan.name}</h3>
                <p className="text-xs text-slate-500 min-h-[32px]">{plan.tagline}</p>

                <div className="pt-2 pb-4 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                      {plan.priceFormatted}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ {plan.duration}</span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Features Included
                  </span>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  onClick={() => handleInitializeCheckout(plan.id)}
                  disabled={loadingPlan === plan.id}
                  className={`w-full py-2.5 px-4 text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center justify-center gap-1.5 ${
                    plan.popular
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-800/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {loadingPlan === plan.id ? (
                    <span>Generating Virtual Account...</span>
                  ) : (
                    <>
                      <span>{plan.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* B2B School Plans */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {b2bPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl border p-6 flex flex-col justify-between transition-shadow relative ${
                plan.id === 'b2b_gold'
                  ? 'border-amber-500 shadow-md ring-1 ring-amber-500'
                  : plan.popular
                  ? 'border-emerald-600 shadow-md ring-1 ring-emerald-600'
                  : 'border-slate-200/90 shadow-2xs hover:shadow-xs'
              }`}
            >
              {plan.badge && (
                <div
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md inline-block self-start mb-3 border ${
                    plan.id === 'b2b_gold'
                      ? 'text-amber-900 bg-amber-50 border-amber-200'
                      : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                  }`}
                >
                  {plan.badge}
                </div>
              )}

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                <p className="text-xs text-slate-500 min-h-[32px]">{plan.tagline}</p>

                <div className="pt-2 pb-4 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                      {plan.priceFormatted}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ Term</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded mt-2 inline-block">
                    {plan.capacity}
                  </span>
                </div>

                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Institutional Capabilities
                  </span>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  onClick={() => handleInitializeCheckout(plan.id)}
                  disabled={loadingPlan === plan.id}
                  className={`w-full py-2.5 px-4 text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center justify-center gap-1.5 ${
                    plan.id === 'b2b_gold'
                      ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20'
                      : plan.popular
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-800/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {loadingPlan === plan.id ? (
                    <span>Generating Virtual Account...</span>
                  ) : (
                    <>
                      <span>{plan.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
                    window.location.reload();
                  }}
                  className="px-6 py-2.5 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 shadow-2xs"
                >
                  Go to Dashboard
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
}
