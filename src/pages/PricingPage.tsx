import React, { useState } from 'react';
import {
  Check,
  Sparkles,
  ShieldCheck,
  Zap,
  Users,
  Gift,
  Copy,
  CreditCard,
  Building2,
  PhoneCall,
  QrCode,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { initializeKoraPayment } from '../lib/api.ts';
import confetti from 'canvas-confetti';

interface PricingPageProps {
  onPlanUpgraded?: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onPlanUpgraded }) => {
  const [interval, setInterval] = useState<'monthly' | 'annual'>('annual');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [checkoutModal, setCheckoutModal] = useState<{
    reference: string;
    checkoutUrl: string;
    amount: number;
    mode: string;
    plan: string;
  } | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState<'card' | 'transfer' | 'ussd' | 'opay'>('card');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Form states for card simulation
  const [cardNumber, setCardNumber] = useState('5399 4120 8931 4410');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('819');
  const [cardPin, setCardPin] = useState('1234');

  const referralLink = 'https://eduplan.ng/ref/AMINA-EDU-2026';

  const handleSubscribe = async (planKey: string, amount: number) => {
    setLoadingPlan(planKey);
    setPaymentSuccess(false);
    try {
      const res = await initializeKoraPayment({
        plan: planKey,
        email: 'amina.balogun@schools.ng',
        name: 'Mrs. Amina Balogun',
        amount,
        interval,
      });

      setCheckoutModal({ ...res, plan: planKey });
      confetti({ particleCount: 70, spread: 60 });
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleSimulatePaymentCompletion = async () => {
    if (!checkoutModal) return;
    setProcessingPayment(true);

    try {
      // Post to Kora Pay Webhook to activate subscription in database
      const response = await fetch('/api/payment/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'charge.success',
          data: {
            reference: checkoutModal.reference,
            status: 'success',
            amount: checkoutModal.amount,
            currency: 'NGN',
            customer: {
              email: 'amina.balogun@schools.ng',
              name: 'Mrs. Amina Balogun',
            },
            metadata: {
              userId: 'usr_teacher_demo_01',
              plan: checkoutModal.plan,
            },
          },
        }),
      });

      if (response.ok) {
        setPaymentSuccess(true);
        confetti({ particleCount: 120, spread: 80 });
        if (onPlanUpgraded) onPlanUpgraded();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setProcessingPayment(false);
    }
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Naira-First Subscriptions for Nigerian Teachers</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Simple, Transparent Plans for Every Nigerian Educator
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
          Pay via Nigerian Bank Transfer, Debit Card (Verve / Mastercard / Visa), USSD, or OPay via Kora Pay.
        </p>

        {/* Annual / Monthly Toggle (Annual First) */}
        <div className="inline-flex items-center p-1 bg-gray-100 rounded-2xl border border-gray-200">
          <button
            onClick={() => setInterval('annual')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              interval === 'annual'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>Annual Billing</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-400 text-amber-950 font-extrabold uppercase">
              Save 27%
            </span>
          </button>
          <button
            onClick={() => setInterval('monthly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              interval === 'monthly'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly Billing
          </button>
        </div>
      </div>

      {/* 3 Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* FREE TIER */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">Free Tier</h3>
              <p className="text-xs text-gray-500 mt-1">For student teachers and lesson observation.</p>
            </div>

            <div className="text-3xl font-black text-gray-900">
              ₦0 <span className="text-xs font-medium text-gray-500">/ forever</span>
            </div>

            <ul className="space-y-2.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>5 Lesson Plans per month</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Full NERDC Curriculum Access</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span>— No Scheme of Work generator</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span>— No WAEC exam builder</span>
              </li>
            </ul>
          </div>

          <button
            disabled
            className="w-full mt-6 py-2.5 rounded-xl text-xs font-bold bg-gray-100 text-gray-500 cursor-default"
          >
            Current Baseline
          </button>
        </div>

        {/* PRO TIER (RECOMMENDED) */}
        <div className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between relative border-2 border-emerald-500">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
            Most Popular
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Pro Teacher</h3>
              <p className="text-xs text-emerald-200/90 mt-1">Full pedagogical automation suite for Nigerian educators.</p>
            </div>

            <div className="text-3xl font-black text-white">
              {interval === 'annual' ? '₦22,000' : '₦2,500'}{' '}
              <span className="text-xs font-medium text-emerald-300">
                {interval === 'annual' ? '/ year (₦1,833/mo)' : '/ month'}
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-emerald-100 pt-2 border-t border-emerald-800">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span><strong>Unlimited</strong> Lesson Plans (Auto-save)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span><strong>1-Click</strong> 13-Week Scheme of Work Generator</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>WAEC/BECE Exam & Marking Scheme Builder</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Chalkboard Lesson Notes & Diagrams</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Export to Microsoft Word (.doc) & PDF</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSubscribe('pro_' + interval, interval === 'annual' ? 22000 : 2500)}
            disabled={loadingPlan !== null}
            className="w-full mt-6 py-3 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-emerald-950 shadow-md transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            <span>{loadingPlan ? 'Connecting Kora Pay...' : 'Pay with Kora Pay'}</span>
          </button>
        </div>

        {/* SCHOOL LICENSE */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">School License</h3>
              <p className="text-xs text-gray-500 mt-1">For Principals, Administrators, and HODs.</p>
            </div>

            <div className="text-3xl font-black text-gray-900">
              ₦45,000{' '}
              <span className="text-xs font-medium text-gray-500">/ yr (Up to 10 Teachers)</span>
            </div>

            <ul className="space-y-2.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>10 Pro Teacher Accounts</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Principal Syllabus Audit Dashboard</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Official School Letterhead on All Exams</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Dedicated Lagos-based Phone Support</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSubscribe('school', 45000)}
            disabled={loadingPlan !== null}
            className="w-full mt-6 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-all"
          >
            {loadingPlan ? 'Connecting...' : 'Activate School License'}
          </button>
        </div>
      </div>

      {/* Referral Program Widget */}
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase">
            <Gift className="w-4 h-4 text-emerald-600" />
            <span>Teacher Referral Program</span>
          </div>
          <h3 className="text-base font-bold text-gray-900">Give 1 Free Month, Get 1 Free Month</h3>
          <p className="text-xs text-gray-600 max-w-md leading-relaxed">
            Invite fellow secondary school teachers. When they subscribe to Pro, you both receive 30 days free Pro access added to your account.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="text-xs font-mono bg-white px-3 py-2 border border-emerald-200 rounded-xl text-gray-600 max-w-[200px]"
          />
          <button
            onClick={handleCopyRef}
            className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-colors"
          >
            {copiedRef ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>

      {/* Kora Pay Interactive Checkout Gateway Modal */}
      {checkoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-4 border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                  KP
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Kora Pay Secure Nigerian Gateway</h4>
                  <p className="text-[10px] text-gray-500">256-bit SSL Encrypted • CBN Regulated</p>
                </div>
              </div>
              <button
                onClick={() => setCheckoutModal(null)}
                className="text-xs font-semibold text-gray-400 hover:text-gray-600 p-1"
              >
                Close
              </button>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Amount Due</span>
                <div className="text-xl font-black text-emerald-950">
                  ₦{checkoutModal.amount.toLocaleString()} NGN
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-800 bg-white px-2 py-1 rounded-md border border-emerald-200">
                {checkoutModal.reference}
              </span>
            </div>

            {paymentSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-950">Payment Approved!</h4>
                <p className="text-xs text-emerald-800">
                  Your EduPlan Pro subscription is now active. All curriculum tools, Schemes of Work, and exports are fully unlocked.
                </p>
                <button
                  onClick={() => setCheckoutModal(null)}
                  className="px-6 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs"
                >
                  Continue to Workspace
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Method Tabs */}
                <div className="grid grid-cols-4 gap-1 p-1 bg-gray-100 rounded-xl text-[11px] font-bold">
                  <button
                    onClick={() => setActivePaymentMethod('card')}
                    className={`py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                      activePaymentMethod === 'card' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-600'
                    }`}
                  >
                    <CreditCard className="w-3 h-3" />
                    <span>Card</span>
                  </button>
                  <button
                    onClick={() => setActivePaymentMethod('transfer')}
                    className={`py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                      activePaymentMethod === 'transfer' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-600'
                    }`}
                  >
                    <Building2 className="w-3 h-3" />
                    <span>Transfer</span>
                  </button>
                  <button
                    onClick={() => setActivePaymentMethod('ussd')}
                    className={`py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                      activePaymentMethod === 'ussd' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-600'
                    }`}
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>USSD</span>
                  </button>
                  <button
                    onClick={() => setActivePaymentMethod('opay')}
                    className={`py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                      activePaymentMethod === 'opay' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-600'
                    }`}
                  >
                    <QrCode className="w-3 h-3" />
                    <span>OPay</span>
                  </button>
                </div>

                {/* TAB 1: CARD */}
                {activePaymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                        Card Number (Verve / Mastercard / Visa)
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full text-xs font-mono px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Expiry</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full text-xs font-mono px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full text-xs font-mono px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: BANK TRANSFER */}
                {activePaymentMethod === 'transfer' && (
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-2">
                    <p className="font-bold text-gray-900">Transfer directly to Providus Virtual Account:</p>
                    <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-gray-200 font-mono">
                      <div>
                        <span className="text-[10px] text-gray-400 block font-sans">Account Number:</span>
                        <span className="font-bold text-gray-900 text-sm">9920 1849 20</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        Providus Bank
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500">
                      Beneficiary: <strong>EduPlan NG / Kora Pay</strong> • Funds reflect instantly.
                    </p>
                  </div>
                )}

                {/* TAB 3: USSD */}
                {activePaymentMethod === 'ussd' && (
                  <div className="space-y-2 text-xs">
                    <p className="font-bold text-gray-900">Dial from your registered mobile phone:</p>
                    <div className="space-y-1 font-mono text-[11px]">
                      <div className="p-2 bg-gray-50 rounded border border-gray-200 flex justify-between">
                        <span>GTBank:</span> <strong>*737*2*{checkoutModal.amount}*891#</strong>
                      </div>
                      <div className="p-2 bg-gray-50 rounded border border-gray-200 flex justify-between">
                        <span>Zenith Bank:</span> <strong>*966*00*{checkoutModal.amount}#</strong>
                      </div>
                      <div className="p-2 bg-gray-50 rounded border border-gray-200 flex justify-between">
                        <span>FirstBank:</span> <strong>*894*00*{checkoutModal.amount}#</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: OPAY */}
                {activePaymentMethod === 'opay' && (
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center space-y-2 text-xs">
                    <QrCode className="w-16 h-16 text-gray-800 mx-auto" />
                    <p className="font-bold text-gray-900">Scan with your OPay or PalmPay App</p>
                    <p className="text-[10px] text-gray-500">Instant merchant clearance via NIBSS.</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={handleSimulatePaymentCompletion}
                    disabled={processingPayment}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>
                      {processingPayment
                        ? 'Verifying with Kora Pay...'
                        : `Authorize & Pay ₦${checkoutModal.amount.toLocaleString()} NGN`}
                    </span>
                  </button>

                  <div className="text-center">
                    <a
                      href={checkoutModal.checkoutUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-semibold text-gray-500 hover:text-emerald-700 inline-flex items-center gap-1"
                    >
                      <span>Or open standard Kora Pay checkout page</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
