import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Calendar,
  Award,
  CheckCircle2,
  ArrowRight,
  Printer,
  FileDown,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  Users,
  Star,
  ChevronRight,
  School,
  ExternalLink,
  Clock,
  Zap,
  Target,
  Compass,
  Building,
  Check,
  HelpCircle,
  TrendingUp,
  Cpu,
  Landmark,
  Building2
} from 'lucide-react';
import {
  SUBSCRIPTION_PLANS,
  B2B_SCHOOL_PLANS,
  B2G_GOVERNMENT_PLANS,
  SubscriptionPlan,
} from '../data/subscriptionPlans.ts';
import { TeacherUser } from '../types/index.ts';

interface LandingPageProps {
  onEnterApp: () => void;
  onOpenAuth: () => void;
  onExploreCurriculum: () => void;
  onSelectPlan?: (planId: string) => void;
  user?: TeacherUser | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterApp,
  onOpenAuth,
  onExploreCurriculum,
  onSelectPlan,
  user,
}) => {
  const [activePreviewTab, setActivePreviewTab] = useState<'plan' | 'scheme' | 'exam' | 'broadsheet'>('plan');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlanClick = (planId: string) => {
    if (onSelectPlan) {
      onSelectPlan(planId);
    } else if (!user) {
      onOpenAuth();
    } else {
      onEnterApp();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-amber-200 selection:text-slate-950">
      {/* Top Regulatory Compliance Banner */}
      <div className="bg-[#0A192F] text-slate-200 text-xs py-2.5 px-4 text-center font-medium border-b border-amber-500/20 flex flex-wrap items-center justify-center gap-2">
        <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
          2026/2027 Academic Session
        </span>
        <span className="text-slate-300">
          Aligned with Lagos State Ministry of Basic & Secondary Education • OEQA Certified Standards for JSS 1–3 & SSS 1–3.
        </span>
      </div>

      {/* Frontpage Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A192F] via-blue-900 to-slate-900 flex items-center justify-center text-amber-400 shadow-md shadow-slate-900/20 border border-amber-400/30">
            <span className="font-black text-lg tracking-wider">EP</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-slate-950 text-xl tracking-tight">EduPlan</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase bg-amber-400 text-slate-950">
                NG
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-semibold hidden sm:block">
              Nigeria’s Statutory Pedagogical Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={scrollToPricing}
            className="text-xs font-bold text-slate-700 hover:text-amber-600 transition-colors hidden md:block"
          >
            Subscription Plans
          </button>
          <button
            onClick={onExploreCurriculum}
            className="text-xs font-bold text-slate-700 hover:text-blue-700 transition-colors hidden sm:block"
          >
            Curriculum Browser
          </button>
          <button
            onClick={onOpenAuth}
            className="text-xs font-bold text-slate-800 hover:text-slate-950 px-3 py-2 rounded-xl transition-colors"
          >
            {user ? 'My Profile' : 'Teacher Login'}
          </button>
          <button
            onClick={scrollToPricing}
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm transition-all hover:scale-105 flex items-center gap-1.5"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION (High-Contrast, Conversion-Focused) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-[#F8FAFC] pt-14 pb-20 sm:pt-20 sm:pb-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-7 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-amber-300 text-xs font-black shadow-sm border border-amber-400/40">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>NERDC & Lagos State OEQA Compliant Lesson System</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight max-w-4xl mx-auto leading-[1.12]">
            Save <span className="text-amber-500 underline decoration-amber-400/60 decoration-wavy">10+ hours a week</span> with NERDC/OEQA-compliant lesson plans.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Eliminate tedious weekend handwriting. Generate 13-week Schemes of Work, Bloom's-aligned classroom lesson notes, WAEC/BECE marking schemes, and broadsheets built strictly to Nigerian statutory guidelines in seconds.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={scrollToPricing}
              className="w-full sm:w-auto px-9 py-4 rounded-2xl text-sm sm:text-base font-black bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>View Pricing & Start 1-Day Trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onEnterApp}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl text-sm sm:text-base font-bold bg-[#0A192F] hover:bg-slate-800 text-white shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Launch Teaching Workspace</span>
            </button>
          </div>

          {/* Free 1-Day Trial Callout */}
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-500 pt-1">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 font-bold" />
              Instant 24-Hour Full Access Upon Signup
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 font-bold" />
              No Hidden Fees
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 font-bold" />
              Instant Kora Pay Verification
            </span>
          </div>
        </div>
      </section>

      {/* 2. TRUST SIGNALS & OEQA COMPLIANCE BADGES */}
      <section className="bg-white py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="text-center space-y-1.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
              Approved By Nigerian Educational Frameworks
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950">
              Trusted by Top Educators Across Federal Unity Colleges & State Schools
            </h2>
          </div>

          {/* Metric Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left">
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">936</span>
                <BookOpen className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-xs font-bold text-slate-800 mt-1">NERDC Statutory Topics</p>
              <p className="text-[11px] text-slate-500">JSS 1–3 & SSS 1–3 Complete</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left">
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">100%</span>
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-xs font-bold text-slate-800 mt-1">Lagos OEQA Compliant</p>
              <p className="text-[11px] text-slate-500">5-step tabular presentation</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left">
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">13 Weeks</span>
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-xs font-bold text-slate-800 mt-1">Automated Schemes</p>
              <p className="text-[11px] text-slate-500">From resumption to exam week</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left">
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">4 Dialects</span>
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-xs font-bold text-slate-800 mt-1">Parent Comms & Notes</p>
              <p className="text-[11px] text-slate-500">EN, Yorùbá, Igbo, Hausa</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LAGOS STATE T.H.E.M.E.S+ AGENDA STRATEGIC ALIGNMENT */}
      <section className="py-16 bg-[#0A192F] text-white relative overflow-hidden border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black border border-amber-400/30 uppercase tracking-wider">
              <Target className="w-3.5 h-3.5" />
              Lagos State Strategic Development Blueprint
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Aligning with the Lagos State Government <span className="text-amber-400">T.H.E.M.E.S+ Agenda</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              EduPlan NG is architected to accelerate Governor Babajide Olusola Sanwo-Olu’s developmental agenda—spearheading Pillar <strong>E (Education and Technology)</strong> while actively advancing the <strong>“+” (Social Inclusion, Gender Equality, and Youth Empowerment)</strong> across all six Lagos Education Districts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vision Statement */}
            <div className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4 hover:border-amber-400/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Strategic Blueprint</span>
                  <h3 className="text-lg font-bold text-white">Our Vision</h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                “To serve as the primary digital pedagogical infrastructure that powers Lagos State’s <strong>T.H.E.M.E.S+</strong> vision—transforming public and private classrooms into 21st-century centers of excellence, eliminating geographical learning disparities across Education Districts I through VI, and ensuring every Nigerian learner is equipped for the modern digital knowledge economy.”
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-2 text-[10px] text-amber-300 font-bold">
                <span className="bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">Districts I – VI Covered</span>
                <span className="bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">21st-Century Economy</span>
                <span className="bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">OEQA Gold Standard</span>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4 hover:border-amber-400/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center font-black">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-blue-400 tracking-wider">Execution Mandate</span>
                  <h3 className="text-lg font-bold text-white">Our Mission</h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                “To emancipate teachers from clerical fatigue by automating syllabus-compliant Schemes of Work, Bloom's cognitive taxonomy lesson plans, and continuous assessment gradebooks—thereby elevating teacher retention, fostering inclusive instruction for both male and female pupils, and raising WAEC/BECE achievement standards across Nigeria.”
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-2 text-[10px] text-blue-300 font-bold">
                <span className="bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-400/20">Teacher Empowerment</span>
                <span className="bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-400/20">Social Inclusion (+)</span>
                <span className="bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-400/20">STEM & Literacy Mastery</span>
              </div>
            </div>
          </div>

          {/* Pillars breakdown */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            <div className="p-2.5 rounded-xl bg-slate-900/60">
              <span className="text-amber-400 font-black text-lg block">T</span>
              <span className="text-[10px] text-slate-300">Traffic Management</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60">
              <span className="text-amber-400 font-black text-lg block">H</span>
              <span className="text-[10px] text-slate-300">Health & Environment</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 font-black ring-2 ring-amber-300 shadow-md">
              <span className="text-lg block">E</span>
              <span className="text-[10px] font-black">Education & Tech</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60">
              <span className="text-amber-400 font-black text-lg block">M</span>
              <span className="text-[10px] text-slate-300">Making 21st C. Economy</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60">
              <span className="text-amber-400 font-black text-lg block">E</span>
              <span className="text-[10px] text-slate-300">Entertainment & Tourism</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-400/20 border border-amber-400/40">
              <span className="text-amber-300 font-black text-lg block">+</span>
              <span className="text-[10px] text-amber-200">Social Inclusion & Youth</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE MOCKUP & STATUTORY SAMPLES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase text-amber-600 tracking-wider">
            Tangible Classroom Artifacts
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Certified OEQA & WAEC Quality Inspection Mockups
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Review the exact documents EduPlan NG generates for HODs, Vice Principals, and visiting Quality Assurance Officers.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Tab selector */}
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl">
              {[
                { id: 'plan', label: 'Lagos OEQA 5-Step Lesson Plan' },
                { id: 'scheme', label: '13-Week Scheme of Work' },
                { id: 'exam', label: 'WAEC Examination Paper' },
                { id: 'broadsheet', label: 'Terminal Broadsheet' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePreviewTab(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activePreviewTab === tab.id
                      ? 'bg-white text-slate-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={onEnterApp}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              <span>Test in Workspace</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="p-6 sm:p-8">
            {activePreviewTab === 'plan' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                      JSS 2 • Basic Science & Technology
                    </span>
                    <h3 className="text-base font-bold text-slate-950 mt-1">
                      Energy: Forms, Transformations and Nigerian Contextual Applications
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    OEQA Quality Assured
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <strong className="text-slate-900 block font-bold">Bloom's Cognitive Objectives:</strong>
                    <p className="text-slate-700">1. <em>Recall</em> the law of conservation of energy with classroom examples.</p>
                    <p className="text-slate-700">2. <em>Distinguish</em> kinetic from potential energy in local hydroelectric dams (Kainji/Shiroro).</p>
                    <p className="text-slate-700">3. <em>Calculate</em> mechanical energy transfers in everyday domestic appliances.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <strong className="text-slate-900 block font-bold">Chalkboard Presentation (OEQA 5-Step):</strong>
                    <p className="text-slate-700">
                      <strong>Step 1:</strong> Introduction (5 mins) — Elicit prior knowledge of solar panels in Lagos bus shelters.
                    </p>
                    <p className="text-slate-700">
                      <strong>Step 2:</strong> Demonstration (10 mins) — Release toy car down incline; analyze energy conversion.
                    </p>
                    <p className="text-slate-700">
                      <strong>Step 3:</strong> Student Activity (15 mins) — Group calculation of mechanical potential energy.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activePreviewTab === 'scheme' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">
                    First Term 13-Week Scheme of Work — SSS 1 Mathematics
                  </h3>
                  <span className="text-xs font-bold text-slate-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                    NERDC Syllabus
                  </span>
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5 w-16 text-center">Week</th>
                        <th className="p-2.5">Topic & Subtopics</th>
                        <th className="p-2.5">Periods</th>
                        <th className="p-2.5">Inspection Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-2.5 text-center font-bold text-amber-700">Wk 1</td>
                        <td className="p-2.5 font-semibold">Number Bases: Operations and Conversion to Base 10</td>
                        <td className="p-2.5">4 Periods</td>
                        <td className="p-2.5 text-emerald-700 font-bold">Verified NERDC Standard</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-center font-bold text-amber-700">Wk 7</td>
                        <td className="p-2.5 font-bold text-amber-900 bg-amber-50/60">
                          Mid-Term Continuous Assessment (CA 1) & Open Day
                        </td>
                        <td className="p-2.5">4 Periods</td>
                        <td className="p-2.5 text-amber-800 font-bold">CA 1 Test Script (20 Marks)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-center font-bold text-amber-700">Wk 13</td>
                        <td className="p-2.5 font-bold text-rose-900 bg-rose-50/60">
                          Terminal Examination & Official Class Broadsheets
                        </td>
                        <td className="p-2.5">Terminal</td>
                        <td className="p-2.5 text-rose-800 font-bold">Final Exam (60 Marks)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activePreviewTab === 'exam' && (
              <div className="space-y-3">
                <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-black uppercase text-amber-400">
                      WAEC & BECE Aligned Examination Paper & Marking Scheme
                    </h3>
                    <p className="text-[11px] text-slate-300">Section A (Objectives) + Section B (Theory) + Step-by-Step Marking Guide</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-amber-400 text-slate-950 rounded-lg">
                    60 Marks Terminal
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <p className="font-semibold text-slate-900">
                    Question 1 (Objective): Which of the following organelles is responsible for cellular respiration in plant cells?
                  </p>
                  <p className="pl-4 text-slate-600">A) Chloroplast &nbsp;&nbsp; B) Mitochondria &nbsp;&nbsp; C) Ribosome &nbsp;&nbsp; D) Vacuole</p>
                  <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900 mt-2">
                    <strong>Official Marking Guide:</strong> Correct Answer: B (1 Mark). Award 0.5 mark for identifying ATP synthesis role.
                  </div>
                </div>
              </div>
            )}

            {activePreviewTab === 'broadsheet' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">Official Class Broadsheet (WAEC A1–F9 Grading)</h3>
                  <span className="text-xs text-slate-500 font-medium">Term 1 Summary Table</span>
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-2">Student Name</th>
                        <th className="p-2 text-center">CA 1 (20)</th>
                        <th className="p-2 text-center">CA 2 (20)</th>
                        <th className="p-2 text-center">Exam (60)</th>
                        <th className="p-2 text-center">Total (100)</th>
                        <th className="p-2 text-center">Grade Letter</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-2 font-bold text-slate-900">Adeshina Olumide</td>
                        <td className="p-2 text-center">19</td>
                        <td className="p-2 text-center">18</td>
                        <td className="p-2 text-center">56</td>
                        <td className="p-2 text-center font-black text-emerald-800">93%</td>
                        <td className="p-2 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                            A1 Distinction
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-slate-900">Fatima Balarabe</td>
                        <td className="p-2 text-center">17</td>
                        <td className="p-2 text-center">16</td>
                        <td className="p-2 text-center">51</td>
                        <td className="p-2 text-center font-black text-emerald-800">84%</td>
                        <td className="p-2 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                            A1 Distinction
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. PRICING SECTION (Dedicated 6 Tiers with Exact Naira Prices) */}
      <section id="pricing" className="py-20 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30">
              <CreditCard className="w-3.5 h-3.5" />
              Transparent, Teacher-Friendly Pricing
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Simple, Affordable Pricing for Every Nigerian Educator
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Choose the pass that matches your teaching workflow. Live payments powered securely by Kora Pay (Card, Bank Transfer, USSD, OPay).
            </p>
          </div>

          {/* Pricing Grid (4 B2C Individual Teacher Tiers) */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/80 pb-3">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400">
                  1. B2C — Individual Teachers
                </span>
                <h3 className="text-xl font-black text-white">Flexible Passes for Classroom Educators</h3>
              </div>
              <span className="text-xs text-slate-400 font-semibold">Instant activation via Kora Pay • No auto-billing</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SUBSCRIPTION_PLANS.map((plan) => {
                const isBestValue = plan.popular;
                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-3xl p-6 sm:p-7 transition-all flex flex-col justify-between ${
                      isBestValue
                        ? 'bg-gradient-to-b from-slate-900 via-slate-850 to-blue-950 border-2 border-amber-400 shadow-2xl shadow-amber-500/10 scale-[1.02] ring-4 ring-amber-400/20'
                        : 'bg-slate-800/80 border border-slate-700/80 hover:border-slate-500'
                    }`}
                  >
                    {plan.badge && (
                      <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 fill-slate-950" />
                        <span>{plan.badge}</span>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-white">{plan.name}</h3>
                      </div>

                      <div className="mt-3 flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-black text-amber-400">{plan.priceDisplay}</span>
                        <span className="text-xs font-semibold text-slate-400">/ {plan.periodLabel}</span>
                      </div>

                      {plan.savings && (
                        <div className="mt-2 inline-block text-[11px] font-black text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-lg">
                          {plan.savings}
                        </div>
                      )}

                      <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                        {plan.description}
                      </p>

                      <div className="pt-4 mt-4 border-t border-slate-700/80 space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Features</div>
                        {plan.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-tight">{feat}</span>
                          </div>
                        ))}
                      </div>

                      {plan.restrictions && plan.restrictions.length > 0 && (
                        <div className="pt-3 mt-3 border-t border-slate-700/50 space-y-1.5">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Restrictions</div>
                          {plan.restrictions.map((res, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-400">
                              <span className="text-rose-400 font-bold shrink-0">✕</span>
                              <span className="leading-tight">{res}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-6 mt-6">
                      <button
                        onClick={() => handlePlanClick(plan.id)}
                        className={`w-full py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
                          isBestValue
                            ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 hover:scale-[1.02]'
                            : 'bg-white hover:bg-slate-100 text-slate-950'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>{plan.ctaText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. B2B — Private Schools (Bronze, Silver, Gold) */}
          <div className="space-y-5 pt-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/80 pb-3">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  2. B2B — Private Schools &amp; Colleges
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">Whole-School Licenses (Per Term)</h3>
              </div>
              <span className="text-xs text-slate-400 font-semibold">Dedicated School Workspace • Virtual NUBAN Billing</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {B2B_SCHOOL_PLANS.map((plan) => {
                const isGold = plan.id === 'b2b_gold';
                const isPopular = Boolean(plan.popular);
                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-3xl p-6 sm:p-7 transition-all flex flex-col justify-between ${
                      isGold
                        ? 'bg-gradient-to-b from-slate-900 via-amber-950/30 to-slate-900 border-2 border-amber-400 shadow-2xl shadow-amber-500/10'
                        : isPopular
                        ? 'bg-gradient-to-b from-slate-800/95 to-emerald-950/40 border-2 border-emerald-400/80 shadow-xl'
                        : 'bg-slate-800/80 border border-slate-700/80 hover:border-slate-500'
                    }`}
                  >
                    {plan.badge && (
                      <div
                        className={`absolute -top-3.5 right-6 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 ${
                          isGold ? 'bg-amber-400 text-slate-950' : 'bg-emerald-400 text-slate-950'
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{plan.badge}</span>
                      </div>
                    )}

                    <div>
                      <h4 className="text-lg font-black text-white">{plan.name}</h4>
                      <div className="mt-3 flex flex-wrap items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-black text-amber-400">{plan.priceDisplay}</span>
                        <span className="text-xs font-semibold text-slate-400">/ {plan.periodLabel}</span>
                      </div>

                      <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-200 bg-slate-950/60 border border-slate-700 px-2.5 py-1 rounded-lg">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        <span>{plan.maxTeachers === -1 ? 'Unlimited teachers' : `${plan.maxTeachers} teachers`}</span>
                        <span>•</span>
                        <span>{plan.sourceAccessSummary}</span>
                      </div>

                      <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                        {plan.description}
                      </p>

                      <div className="pt-4 mt-4 border-t border-slate-700/80 space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Included Capabilities</div>
                        {plan.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-tight">{feat}</span>
                          </div>
                        ))}
                      </div>

                      {plan.restrictions && plan.restrictions.length > 0 && (
                        <div className="pt-3 mt-3 border-t border-slate-700/50 space-y-1.5">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Restrictions</div>
                          {plan.restrictions.map((res, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-400">
                              <span className="text-rose-400 font-bold shrink-0">✕</span>
                              <span className="leading-tight">{res}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-6 mt-6">
                      <button
                        onClick={() => handlePlanClick(plan.id)}
                        className={`w-full py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
                          isGold
                            ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                            : 'bg-white hover:bg-slate-100 text-slate-950'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>{plan.ctaText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. B2G — Government / Ministry (Platinum) */}
          <div className="space-y-4 pt-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/80 pb-3">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5" />
                  3. B2G — Government / State Ministry of Education
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">Sovereign State-Wide Directorate Infrastructure</h3>
              </div>
              <span className="text-xs text-slate-400 font-semibold">Custom On-Premise / Cloud Cluster • SLA-Backed</span>
            </div>

            {B2G_GOVERNMENT_PLANS.map((plan) => (
              <div
                key={plan.id}
                className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-800/95 via-slate-900 to-sky-950/70 border-2 border-sky-400/60 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
              >
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full bg-sky-400 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5" />
                      Platinum — {plan.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-600 text-sky-300 text-xs font-bold">
                      All 6 Sources Unlocked State-Wide
                    </span>
                  </div>

                  <div>
                    <h4 className="text-2xl sm:text-3xl font-black text-white">{plan.name}</h4>
                    <div className="mt-2 flex flex-wrap items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-amber-400">₦100M – ₦300M / year</span>
                      <span className="text-xs font-semibold text-slate-300">Annual State Ministry Deployment License</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
                    {[
                      'All 6 Curriculum Sources (NERDC, Lagos Scheme, OEQA, BECE, WAEC, NECO)',
                      'State Policy Enforcement (Mandate Statutory State Schemes)',
                      'Ministry Command Dashboard (RLS-Isolated State Telemetry)',
                      'State Levy Tracker & School Accreditation Compliance',
                      'CPD Module (State Teacher Certification & Training)',
                      'Sovereign Direct API Access & Emergency Broadcast Engine',
                    ].map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-200 bg-slate-950/50 border border-slate-700/70 rounded-xl p-2.5">
                        <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full lg:w-72 shrink-0 bg-slate-950/70 border border-slate-700/80 rounded-2xl p-5 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">Ministry Procurement</span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Deploy across all public &amp; private secondary schools in your state with Kora Pay institutional escrow or sovereign PO billing.
                    </p>
                  </div>
                  <button
                    onClick={() => handlePlanClick(plan.id)}
                    className="w-full py-3.5 px-4 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Landmark className="w-4 h-4" />
                    <span>Activate Platinum License</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Trust Bar */}
          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Kora Pay Verified Gateway</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Instant 24-Hour Free Trial Upon Registration</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span>No Automatic Recurring Card Deduction</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS (Trust Signals) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase text-amber-600 tracking-wider">
            Verified Teacher Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Endorsed by Secondary School Educators Across Nigeria
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "Before EduPlan NG, compiling the 13-week Mathematics scheme of work used to consume my entire weekend. Now, I generate and export it to Word with OEQA-compliant objectives in under two minutes!"
            </p>
            <div className="pt-3 border-t border-slate-100">
              <strong className="text-xs font-bold text-slate-900 block">Mrs. Amina Balogun</strong>
              <span className="text-[11px] text-slate-500">Senior Mathematics Teacher, King's College, Lagos</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "Our school inspectors from the Lagos State OEQA commended our lesson plans for strictly observing Bloom’s cognitive verbs and clear teacher/student activity separation."
            </p>
            <div className="pt-3 border-t border-slate-100">
              <strong className="text-xs font-bold text-slate-900 block">Mr. Adebayo Ogunlesi</strong>
              <span className="text-[11px] text-slate-500">Vice Principal Academics, Alimosho Senior Grammar School (District XIX)</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "The ₦3,000 Full Session plan is an incredible bargain. It covers all 3 terms without worrying about recurring billing, and the automated terminal broadsheets saved our school days of manual entry."
            </p>
            <div className="pt-3 border-t border-slate-100">
              <strong className="text-xs font-bold text-slate-900 block">Mrs. Chioma Eze</strong>
              <span className="text-[11px] text-slate-500">English Studies HOD, Vivian Fowler Memorial College, Ikeja</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="bg-slate-100/70 py-16 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-950">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-600">Everything you need to know about EduPlan NG and Kora Pay payments.</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How does the 1-Day (24-Hour) Free Trial work?',
                a: 'Upon registering a new teacher account, you automatically receive 24 hours of completely unrestricted access to curriculum topics, lesson notes, schemes of work, and exam generators. After 24 hours, you can choose from our Individual B2C passes (starting at ₦500), Private School B2B Bronze/Silver/Gold tiers, or B2G State Ministry Platinum licenses.',
              },
              {
                q: 'What payment methods does Kora Pay support?',
                a: 'Kora Pay allows you to pay securely using your Nigerian ATM card (Mastercard, Visa, Verve), Direct Bank Transfer, USSD codes for all major Nigerian banks (GTBank, Zenith, Access, FirstBank, UBA, etc.), or your OPay wallet.',
              },
              {
                q: 'Does EduPlan NG comply with Lagos State OEQA inspection guidelines?',
                a: 'Yes. All lesson plans are formatted with the 5-step instructional presentation structure, measurable Bloom’s taxonomy behavioral objectives, chalkboard summaries, previous knowledge links, and differentiated instruction for mixed-ability classes required by Lagos State OEQA evaluators.',
              },
              {
                q: 'Why is the Full Session (₦3,000) marked as Best Value?',
                a: 'Paying for individual terms would cost ₦1,500 (Term 1) + ₦1,500 (Term 2) + ₦1,500 (Term 3) = ₦4,500. The Full Session pass is only ₦3,000—saving you ₦1,500 while ensuring seamless access through the entire academic year without interruption.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full p-4.5 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      faqOpen === i ? 'rotate-90 text-amber-500' : ''
                    }`}
                  />
                </button>
                {faqOpen === i && (
                  <div className="px-4.5 pb-4.5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FOOTER CALL TO ACTION */}
      <section className="bg-gradient-to-r from-slate-950 via-[#0A192F] to-slate-900 text-white py-16 px-4 text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-black">
            Reclaim Your Evenings & Weekends Today
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Join thousands of secondary school educators building certified academic success with EduPlan NG.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={scrollToPricing}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-xs sm:text-sm font-black bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <span>Choose a Subscription Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onEnterApp}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <span>Enter Teaching Workspace</span>
          </button>
        </div>
      </section>
    </div>
  );
};
