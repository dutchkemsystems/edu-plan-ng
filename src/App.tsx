import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { CommandPalette } from './components/CommandPalette.tsx';
import { NotificationModal } from './components/NotificationModal.tsx';
import { OnboardingModal } from './components/OnboardingModal.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { PaywallModal } from './components/PaywallModal.tsx';
import { UpgradeModal } from './components/UpgradeModal.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { PWAInstallBanner } from './components/PWAInstallBanner.tsx';
import { checkUserAccess } from './lib/trial.ts';
import { resolveClientTierSummary } from './config/pricing.ts';

// Pages
import { LandingPage } from './pages/LandingPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { DashboardPage } from './pages/DashboardPage.tsx';
import { AITeacherCoachPage } from './pages/AITeacherCoachPage.tsx';
import { CurriculumBrowser } from './pages/CurriculumBrowser.tsx';
import { LessonPlanComposer } from './pages/LessonPlanComposer.tsx';
import { LessonPlansList } from './pages/LessonPlansList.tsx';
import { SchemeOfWorkPage } from './pages/SchemeOfWorkPage.tsx';
import { AssessmentsPage } from './pages/AssessmentsPage.tsx';
import { GradeBookPage } from './pages/GradeBookPage.tsx';
import { ResourcesPage } from './pages/ResourcesPage.tsx';
import { ProgressPage } from './pages/ProgressPage.tsx';
import { CalendarPage } from './pages/CalendarPage.tsx';
import { TimetablePage } from './pages/TimetablePage.tsx';
import { ParentCommsPage } from './pages/ParentCommsPage.tsx';
import { CommunityLibraryPage } from './pages/CommunityLibraryPage.tsx';
import { AdminDashboardPage } from './pages/AdminDashboardPage.tsx';
import { PricingPage } from './pages/PricingPage.tsx';
import { SettingsPage } from './pages/SettingsPage.tsx';
import { LegalPages } from './pages/LegalPages.tsx';
import { SMSAccessPage } from './pages/SMSAccessPage.tsx';
import { OEQAPage } from './pages/OEQAPage.tsx';
import { LessonViewerPage } from './pages/LessonViewerPage.tsx';
import { StudentQuizPortalPage } from './pages/StudentQuizPortalPage.tsx';
import { MarketplacePage } from './pages/MarketplacePage.tsx';
import { MinistryCommandPage } from './pages/MinistryCommandPage.tsx';
import { LivePollPage } from './pages/LivePollPage.tsx';
import { STEMLabPage } from './pages/STEMLabPage.tsx';
import { AIPedagogicalCoPilotPage } from './pages/AIPedagogicalCoPilotPage.tsx';
import { AudioLessonNarratorModal } from './components/AudioLessonNarratorModal.tsx';

import { AppLanguage } from './lib/i18n.ts';
import { generateNerdcOeqaContent } from './data/allCurriculumSubjects.ts';
import {
  DashboardStats,
  LessonPlan,
  TeacherUser,
  NotificationItem,
  CurriculumTopic
} from './types/index.ts';
import {
  fetchCurrentUser,
  fetchDashboardStats,
  fetchLessonPlans,
  fetchNotifications,
  deleteLessonPlan,
  duplicateLessonPlan,
  createLessonPlan,
  signOutUser
} from './lib/api.ts';
import { Menu, WifiOff, Download, Sparkles, LogOut, Clock } from 'lucide-react';
import { useInactivityTimeout } from './hooks/useInactivityTimeout.ts';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash && hash !== 'pricing') return hash;
      const path = window.location.pathname;
      if (path === '/dashboard') return 'dashboard';
      if (path === '/login') return 'login';
      if (path === '/curriculum') return 'curriculum';
      if (path === '/pricing') return 'pricing';
      if (path === '/marketplace') return 'marketplace';
      if (path === '/ministry') return 'ministry';
      if (path === '/poll' || path.startsWith('/poll')) return 'live-poll';
      if (path === '/stem-lab') return 'stem-lab';
      if (path === '/ai-copilot') return 'ai-copilot';
      if (path.startsWith('/quiz')) return 'quiz';
    }
    return 'landing';
  });
  const [currentLang, setCurrentLang] = useState<AppLanguage>('en');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Data states
  const [user, setUser] = useState<TeacherUser | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [plans, setPlans] = useState<LessonPlan[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Selected entities for detail/composer
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const [initialTopicForComposer, setInitialTopicForComposer] = useState<CurriculumTopic | null>(null);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<string>('b2c_session');
  const [inactivityNotice, setInactivityNotice] = useState<string | null>(null);
  const [upgradePrompt, setUpgradePrompt] = useState<{
    open: boolean;
    message: string;
    requiredTier?: string;
    title?: string;
  }>({ open: false, message: '' });

  const openUpgradeModal = (message: string, requiredTier?: string, title?: string) => {
    setUpgradePrompt({ open: true, message, requiredTier, title });
  };

  // 10-Minute Inactivity Auto-Logout Tracker (Phase 6)
  useInactivityTimeout({
    isAuthenticated: Boolean(user),
    onTimeout: (msg) => {
      setUser(null);
      setInactivityNotice(msg);
      setIsAuthOpen(true);
      setCurrentRoute('landing');
    },
  });

  // PWA Offline status
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    loadInitialData();

    // Online/offline listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Hash route synchronization
    const handleHashSync = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash && hash !== 'pricing') {
        setCurrentRoute(hash);
      } else if (!hash && window.location.pathname === '/') {
        setCurrentRoute('landing');
      }
    };
    window.addEventListener('hashchange', handleHashSync);

    // SSE notification stream (only when authenticated/on non-landing workspace or softly handled)
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/notifications/stream');
      eventSource.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.type === 'unread_sync' && typeof data.unreadCount === 'number') {
            setUnreadCount(data.unreadCount);
          }
        } catch {
          // ignore
        }
      };
      eventSource.onerror = () => {
        eventSource?.close();
      };
    } catch {
      // SSE fallback
    }

    return () => {
      eventSource?.close();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('hashchange', handleHashSync);
    };
  }, []);

  // Safely redirect authenticated users away from the dedicated login route
  useEffect(() => {
    if (currentRoute === 'login' && user) {
      setCurrentRoute('dashboard');
    }
  }, [currentRoute, user]);

  const loadInitialData = async () => {
    try {
      const [userData, statsData, plansData, notifsData] = await Promise.all([
        fetchCurrentUser().catch(() => null),
        fetchDashboardStats().catch(() => null),
        fetchLessonPlans().catch(() => []),
        fetchNotifications().catch(() => ({ notifications: [], unreadCount: 0 })),
      ]);

      if (userData) {
        setUser(userData);
        if (!userData.onboardingCompletedAt) {
          setIsOnboardingOpen(true);
        }

        // Free Trial status is verified silently without blocking the user
        // Users can browse and explore the entire page uninterrupted
      }
      if (statsData) setStats(statsData);
      if (plansData) setPlans(plansData);
      if (notifsData) {
        setNotifications(notifsData.notifications);
        setUnreadCount(notifsData.unreadCount);
      }
    } catch (err) {
      console.error('Data loading error', err);
    }
  };

  const handleSelectPlanFromLanding = (planId: string) => {
    setSelectedPlanForCheckout(planId);
    if (!user) {
      setIsAuthOpen(true);
    } else {
      setIsPaywallOpen(true);
    }
  };

  const handleLogout = async () => {
    // Total Wipe: Server session invalidation, cookies purge, storage clear, cache purge, hard redirect
    await signOutUser(true, '/');
  };

  const handleCreatePlanFromTopic = (topic: CurriculumTopic, level: string, subject: string) => {
    setInitialTopicForComposer({
      ...topic,
      levelId: level || topic.levelId,
      subjectName: subject,
    } as any);
    setActivePlanId(null);
    setCurrentRoute('lesson-plans-new');
  };

  const handleSelectPlan = (planId: string) => {
    setActivePlanId(planId);
    setInitialTopicForComposer(null);
    setCurrentRoute('lesson-plan-edit');
  };

  const handleDuplicatePlan = async (planId: string) => {
    try {
      const res = await duplicateLessonPlan(planId);
      setPlans([res.lessonPlan, ...plans]);
      handleSelectPlan(res.lessonPlan.id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeletePlan = async (planId: string) => {
    try {
      await deleteLessonPlan(planId);
      setPlans(plans.filter((p) => p.id !== planId));
    } catch (e) {
      console.error(e);
    }
  };

  const handlePlanSaved = (savedPlan: LessonPlan) => {
    const existingIdx = plans.findIndex((p) => p.id === savedPlan.id);
    if (existingIdx >= 0) {
      const copy = [...plans];
      copy[existingIdx] = savedPlan;
      setPlans(copy);
    } else {
      setPlans([savedPlan, ...plans]);
    }
    // refresh stats
    fetchDashboardStats().then(setStats).catch(() => {});
  };

  const activePlan = plans.find((p) => p.id === activePlanId) || null;

  // Render Student Homework Quiz Portal
  if (currentRoute === 'quiz' || currentRoute.startsWith('quiz')) {
    return (
      <ErrorBoundary>
        <StudentQuizPortalPage onExit={() => setCurrentRoute('dashboard')} />
      </ErrorBoundary>
    );
  }

  // Route Guard - authenticated users on login route transition via useEffect above
  if (currentRoute === 'login' && user) {
    return null;
  }

  // TASK 3: Route Guard - If logged-out user tries to access protected views, immediately redirect to login
  const protectedRoutes = ['dashboard', 'admin', 'settings', 'progress', 'gradebook', 'lesson-plans-new', 'lesson-plan-edit'];
  if (!user && protectedRoutes.includes(currentRoute)) {
    return (
      <ErrorBoundary>
        {inactivityNotice && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[92%] bg-red-900/95 text-white p-4 rounded-2xl shadow-2xl border border-red-700/80 flex items-center justify-between gap-3 animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-800 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-red-200" />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">Session Expired</p>
                <p className="text-[11px] text-red-100 mt-0.5">{inactivityNotice}</p>
              </div>
            </div>
            <button
              onClick={() => setInactivityNotice(null)}
              className="p-1 px-2 rounded-lg hover:bg-red-800 text-red-200 hover:text-white text-xs font-bold transition-colors"
            >
              Dismiss
            </button>
          </div>
        )}
        <LoginPage
          onSuccess={() => {
            setInactivityNotice(null);
            loadInitialData();
            setCurrentRoute('dashboard');
          }}
          onGoToHome={() => {
            setCurrentRoute('landing');
          }}
        />
      </ErrorBoundary>
    );
  }

  // Render Dedicated Login Screen if selected or after logout
  if (currentRoute === 'login') {
    return (
      <ErrorBoundary>
        {inactivityNotice && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[92%] bg-red-900/95 text-white p-4 rounded-2xl shadow-2xl border border-red-700/80 flex items-center justify-between gap-3 animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-800 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-red-200" />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">Session Expired</p>
                <p className="text-[11px] text-red-100 mt-0.5">{inactivityNotice}</p>
              </div>
            </div>
            <button
              onClick={() => setInactivityNotice(null)}
              className="p-1 px-2 rounded-lg hover:bg-red-800 text-red-200 hover:text-white text-xs font-bold transition-colors"
            >
              Dismiss
            </button>
          </div>
        )}
        <LoginPage
          onSuccess={() => {
            setInactivityNotice(null);
            loadInitialData();
            setCurrentRoute('dashboard');
          }}
          onGoToHome={() => {
            setCurrentRoute('landing');
          }}
        />
      </ErrorBoundary>
    );
  }

  const userAccess = checkUserAccess(user);
  const tierSummary = resolveClientTierSummary(user, stats);

  // Render Frontpage / Landing page if selected
  if (currentRoute === 'landing') {
    return (
      <ErrorBoundary>
        <LandingPage
          onEnterApp={() => setCurrentRoute(user ? 'dashboard' : 'login')}
          onOpenAuth={() => {
            if (user) {
              setCurrentRoute('dashboard');
            } else {
              setIsAuthOpen(true);
            }
          }}
          onExploreCurriculum={() => setCurrentRoute('curriculum')}
          onSelectPlan={handleSelectPlanFromLanding}
          user={user}
        />
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => {
            setIsAuthOpen(false);
          }}
          onGoToHome={() => {
            setIsAuthOpen(false);
            setCurrentRoute('landing');
          }}
          onSuccess={() => {
            setIsAuthOpen(false);
            loadInitialData();
            setCurrentRoute('dashboard');
            // If they registered after selecting a plan, show checkout
            if (selectedPlanForCheckout) {
              setIsPaywallOpen(true);
            }
          }}
        />
        <PaywallModal
          isOpen={isPaywallOpen}
          onClose={() => setIsPaywallOpen(false)}
          user={user}
          selectedPlanId={selectedPlanForCheckout || 'b2c_session'}
          isExpiredTrial={userAccess.isTrialExpired && !userAccess.hasActiveSubscription}
          onSuccess={() => {
            setIsPaywallOpen(false);
            loadInitialData();
          }}
        />
      </ErrorBoundary>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
      {/* Dynamic Active Subscription & Quota Status Strip */}
      {user && (
        <div
          className={`text-white text-xs py-2 px-4 border-b flex flex-wrap items-center justify-between gap-3 shadow-xs ${
            tierSummary.category === 'b2g'
              ? 'bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 border-blue-400/30'
              : tierSummary.tierId === 'b2b_gold'
              ? 'bg-gradient-to-r from-slate-950 via-amber-950 to-slate-900 border-amber-400/40'
              : 'bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 border-emerald-400/30'
          }`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
              {tierSummary.segmentLabel} · {tierSummary.config.name}
            </span>
            <span className="text-slate-200">
              {tierSummary.isExpired ? (
                <strong className="text-rose-300">Subscription expired — operating on 5-Day Trial limits.</strong>
              ) : (
                <>
                  <strong>{tierSummary.daysRemaining} days left</strong> • AI Quota:{' '}
                  <strong>
                    {tierSummary.maxGenerationsTotal !== null
                      ? `${tierSummary.totalGenerated}/${tierSummary.maxGenerationsTotal} total`
                      : `${tierSummary.usedToday}/${tierSummary.dailyFairUseCap} today`}
                  </strong>{' '}
                  • <strong>{tierSummary.config.allowedSourcesCount}/6 Sources</strong>
                </>
              )}
            </span>
          </div>
          {tierSummary.tierId !== 'b2g_state_platinum' && (
            <button
              onClick={() => setCurrentRoute('pricing')}
              className="px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-colors"
            >
              {tierSummary.isTrial
                ? 'Upgrade Plan (Remove Watermark & Unlock Tools)'
                : tierSummary.category === 'b2b'
                ? 'Manage School Tier'
                : 'Upgrade / Manage Plan'}
            </button>
          )}
        </div>
      )}
      {/* WCAG 2.1 AA Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-800 focus:text-white focus:rounded-xl focus:shadow-xl focus:ring-2 focus:ring-white text-xs font-bold"
      >
        Skip to main content
      </a>

      {/* Progressive Web App Status & Offline Sync Banner */}
      <PWAInstallBanner />

      {/* Main Top Header Navbar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotifOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        unreadCount={unreadCount}
        user={user}
        stats={stats}
        onNavigate={setCurrentRoute}
        streak={stats?.currentStreak || 5}
      />

      {/* Mobile Top Bar with Menu Hamburger */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
        <button
          onClick={() => setIsMobileNavOpen(true)}
          className="flex items-center gap-2 text-xs font-bold text-gray-700 p-1.5 rounded-lg hover:bg-gray-100"
        >
          <Menu className="w-5 h-5 text-emerald-700" />
          <span>Teaching Menu</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentRoute('landing')}
            className="text-xs font-bold text-gray-600 hover:text-emerald-800"
          >
            Frontpage
          </button>
          <button
            onClick={handleLogout}
            className="text-xs font-bold text-rose-600 hover:text-rose-800 ml-1"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="flex-1 flex">
        {/* Sidebar Navigation */}
        <Sidebar
          currentRoute={currentRoute}
          onNavigate={setCurrentRoute}
          onLogout={handleLogout}
          currentLang={currentLang}
          isOpenMobile={isMobileNavOpen}
          onCloseMobile={() => setIsMobileNavOpen(false)}
          user={user}
          stats={stats}
        />

        {/* Content Viewport with WCAG Landmark */}
        <main
          id="main-content"
          tabIndex={-1}
          role="main"
          aria-label="Main Teaching Portal Content"
          className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full pb-16 focus:outline-none"
        >
          <ErrorBoundary>
          {currentRoute === 'dashboard' && (
            <DashboardPage
              stats={stats}
              plans={plans}
              user={user}
              currentLang={currentLang}
              onNavigate={setCurrentRoute}
              onSelectPlan={handleSelectPlan}
              onDuplicatePlan={handleDuplicatePlan}
              onOpenUpgrade={openUpgradeModal}
            />
          )}

          {currentRoute === 'ai-coach' && (
            <AITeacherCoachPage
              user={user}
              stats={stats}
              onOpenUpgrade={openUpgradeModal}
              onNavigateToComposer={() => setCurrentRoute('lesson-plans-new')}
              onNavigateToCopilot={() => setCurrentRoute('ai-copilot')}
            />
          )}

          {currentRoute === 'curriculum' && (
            <CurriculumBrowser
              user={user}
              stats={stats}
              onOpenUpgrade={openUpgradeModal}
              onCreatePlanFromTopic={handleCreatePlanFromTopic}
            />
          )}

          {currentRoute === 'lesson-plans' && (
            <LessonPlansList
              plans={plans}
              user={user}
              stats={stats}
              onOpenUpgrade={openUpgradeModal}
              onSelectPlan={handleSelectPlan}
              onCreateNew={() => {
                setActivePlanId(null);
                setInitialTopicForComposer(null);
                setCurrentRoute('lesson-plans-new');
              }}
              onDuplicatePlan={handleDuplicatePlan}
              onDeletePlan={handleDeletePlan}
              onBatchPlansCreated={(newPlans) => {
                setPlans([...newPlans, ...plans]);
                loadInitialData();
              }}
            />
          )}

          {(currentRoute === '3d-visual-lab' || currentRoute === 'lesson-view') && (
            <LessonViewerPage
              topic={activePlan?.title || initialTopicForComposer?.topic || 'Transport System: Human Circulatory Anatomy & Heart Mechanics'}
              subject={activePlan?.subject || (initialTopicForComposer as any)?.subjectName || 'Biology'}
              level={activePlan?.level || initialTopicForComposer?.levelId || 'sss1'}
              user={user}
              stats={stats}
              onOpenUpgrade={openUpgradeModal}
              onBack={() => setCurrentRoute('lesson-plans')}
            />
          )}

          {(currentRoute === 'lesson-plans-new' || currentRoute === 'lesson-plan-edit') && (
            <LessonPlanComposer
              initialPlan={
                activePlan ||
                (initialTopicForComposer
                  ? (() => {
                      const topicSub = (initialTopicForComposer as any).subjectName || 'Mathematics';
                      const topicLvl = initialTopicForComposer.levelId;
                      const synth = generateNerdcOeqaContent({
                        level: topicLvl,
                        subject: topicSub,
                        topic: initialTopicForComposer.topic,
                        week: initialTopicForComposer.week,
                        term: initialTopicForComposer.term,
                        language: 'en',
                      });
                      return {
                        id: '',
                        userId: user?.id || 'usr_teacher_demo_01',
                        title: initialTopicForComposer.topic,
                        level: topicLvl,
                        subject: topicSub,
                        term: initialTopicForComposer.term,
                        week: initialTopicForComposer.week,
                        duration: '40 mins',
                        previousKnowledge: synth.previousKnowledge,
                        introduction: synth.introduction,
                        teacherActivity: Array.isArray(initialTopicForComposer.teacherActivities) && initialTopicForComposer.teacherActivities.length > 0
                          ? initialTopicForComposer.teacherActivities.join('\n')
                          : synth.teacherActivity,
                        studentActivity: Array.isArray(initialTopicForComposer.studentActivities) && initialTopicForComposer.studentActivities.length > 0
                          ? initialTopicForComposer.studentActivities.join('\n')
                          : synth.studentActivity,
                        evaluation: Array.isArray(initialTopicForComposer.evaluation) && initialTopicForComposer.evaluation.length > 0
                          ? initialTopicForComposer.evaluation.join('\n')
                          : synth.evaluation,
                        assignment: synth.assignment,
                        references: `NERDC Approved National Curriculum Guide / Lagos State OEQA Syllabus for ${topicLvl.toUpperCase()} ${topicSub}.`,
                        objectives: initialTopicForComposer.objectives?.length ? initialTopicForComposer.objectives : synth.objectives,
                        materials: initialTopicForComposer.materials?.length ? initialTopicForComposer.materials : synth.materials,
                        differentiatedInstruction: synth.differentiatedInstruction,
                        safetyPrecautions: synth.safetyPrecautions,
                        lessonNote: synth.lessonNote,
                        status: 'draft',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                      };
                    })()
                  : null)
              }
              user={user}
              stats={stats}
              onOpenUpgrade={openUpgradeModal}
              onPlanQuotaChanged={loadInitialData}
              onBack={() => setCurrentRoute('lesson-plans')}
              onSaved={handlePlanSaved}
            />
          )}

          {currentRoute === 'schemes' && (
            <SchemeOfWorkPage
              user={user}
              stats={stats}
              onOpenUpgrade={openUpgradeModal}
              onPlanTopic={(topicData) => {
                setInitialTopicForComposer({
                  id: `sow_plan_${Date.now()}`,
                  levelId: topicData.levelId,
                  subjectId: topicData.subject.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                  subjectName: topicData.subject,
                  term: 1,
                  week: topicData.week,
                  topic: topicData.topic,
                  subtopics: [],
                  objectives: [
                    `Understand foundational principles of ${topicData.topic}`,
                    `Apply concepts to solve classroom exercises accurately`,
                  ],
                  materials: ['NERDC Approved Curriculum Syllabus', 'Chalkboard, dry-erase markers & wall charts', 'Student textbooks'],
                  teacherActivities: [
                    `Introduce ${topicData.topic} with relevant Nigerian contextual examples`,
                    `Work through demonstration exercises on the board with student participation`,
                  ],
                  studentActivities: [
                    `Take structured lesson notes in their exercise notebooks`,
                    `Solve classroom formative drill exercises individually and in pairs`,
                  ],
                  evaluation: [
                    `Oral formative questions assessing recall and comprehension`,
                    `Exit card exercise to verify mastery before class dismissal`,
                  ],
                } as any);
                setCurrentRoute('lesson-plans-new');
              }}
            />
          )}

          {currentRoute === 'assessments' && (
            <AssessmentsPage user={user} stats={stats} onOpenUpgrade={openUpgradeModal} />
          )}

          {currentRoute === 'grades' && (
            <GradeBookPage user={user} stats={stats} onOpenUpgrade={openUpgradeModal} />
          )}

          {currentRoute === 'resources' && <ResourcesPage />}

          {currentRoute === 'progress' && <ProgressPage stats={stats} />}

          {currentRoute === 'calendar' && <CalendarPage />}

          {currentRoute === 'timetable' && (
            <TimetablePage user={user} stats={stats} onOpenUpgrade={openUpgradeModal} />
          )}

          {currentRoute === 'sms-access' && <SMSAccessPage />}

          {currentRoute === 'oeqa' && <OEQAPage />}

          {currentRoute === 'parent-comms' && (
            <ParentCommsPage user={user} stats={stats} onOpenUpgrade={openUpgradeModal} />
          )}

          {currentRoute === 'community' && (
            <CommunityLibraryPage
              user={user}
              stats={stats}
              onOpenUpgrade={openUpgradeModal}
              onPlanForked={(plan) => {
                setPlans([plan, ...plans]);
                handleSelectPlan(plan.id);
              }}
            />
          )}

          {currentRoute === 'marketplace' && (
            <MarketplacePage
              user={user}
              stats={stats}
              onOpenUpgrade={openUpgradeModal}
              onNavigateToComposer={(planId) => {
                handleSelectPlan(planId);
              }}
            />
          )}

          {currentRoute === 'live-poll' && <LivePollPage />}

          {currentRoute === 'stem-lab' && (
            <STEMLabPage user={user} stats={stats} onOpenUpgrade={openUpgradeModal} />
          )}

          {currentRoute === 'ai-copilot' && (
            <AIPedagogicalCoPilotPage
              user={user}
              stats={stats}
              onOpenUpgrade={openUpgradeModal}
            />
          )}

          {currentRoute === 'ministry' && (
            <MinistryCommandPage user={user} stats={stats} onOpenUpgrade={openUpgradeModal} />
          )}

          {currentRoute === 'admin' && (
            <AdminDashboardPage
              user={user}
              stats={stats}
              onOpenUpgrade={openUpgradeModal}
              onNavigate={setCurrentRoute}
            />
          )}

          {currentRoute === 'pricing' && (
            <PricingPage user={user} onPlanUpgraded={loadInitialData} onNavigate={setCurrentRoute} />
          )}

          {currentRoute === 'settings' && (
            <SettingsPage user={user} onRefreshUser={loadInitialData} onLogout={handleLogout} />
          )}

          {currentRoute === 'legal' && (
            <LegalPages onBack={() => setCurrentRoute('dashboard')} />
          )}
          </ErrorBoundary>

          {/* Footer with Legal Links & Version */}
          <footer className="mt-16 pt-8 border-t border-gray-200/80 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-700">EduPlan NG v1.0.0</span>
              <span>•</span>
              <span>Acquisition-Grade Nigerian Educational SaaS</span>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-gray-600">
              <button onClick={() => setCurrentRoute('landing')} className="hover:text-emerald-700">
                Frontpage
              </button>
              <button onClick={() => setCurrentRoute('ai-coach')} className="hover:text-emerald-700 flex items-center gap-1 text-emerald-800 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>AI Teacher Coach</span>
              </button>
              <button onClick={() => setCurrentRoute('legal')} className="hover:text-emerald-700">
                NDPR Privacy Policy
              </button>
              <button onClick={() => setCurrentRoute('legal')} className="hover:text-emerald-700">
                Terms of Service
              </button>
              <button onClick={handleLogout} className="text-rose-600 hover:text-rose-800 font-bold">
                Log Out
              </button>
            </div>
          </footer>
        </main>
      </div>

      {/* Modals & Dialogs */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTopic={(topicId) => {
          setCurrentRoute('curriculum');
        }}
        onSelectPlan={(planId) => {
          handleSelectPlan(planId);
        }}
        onSelectResource={(resId) => {
          setCurrentRoute('resources');
        }}
      />

      <NotificationModal
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        notifications={notifications}
        onRefresh={loadInitialData}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        userId={user?.id}
        onComplete={() => {
          setIsOnboardingOpen(false);
          loadInitialData();
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setCurrentRoute('landing');
        }}
        onGoToHome={() => {
          setIsAuthOpen(false);
          setCurrentRoute('landing');
        }}
        onSuccess={() => {
          setIsAuthOpen(false);
          loadInitialData();
          setCurrentRoute('dashboard');
        }}
      />

      {inactivityNotice && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[92%] bg-red-900/95 text-white p-4 rounded-2xl shadow-2xl border border-red-700/80 flex items-center justify-between gap-3 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-800 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-red-200" />
            </div>
            <div>
              <p className="text-xs font-bold leading-tight">Session Expired</p>
              <p className="text-[11px] text-red-100 mt-0.5">{inactivityNotice}</p>
            </div>
          </div>
          <button
            onClick={() => setInactivityNotice(null)}
            className="p-1 px-2 rounded-lg hover:bg-red-800 text-red-200 hover:text-white text-xs font-bold transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}

      <PaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        user={user}
        selectedPlanId={selectedPlanForCheckout || 'b2c_session'}
        isExpiredTrial={userAccess.isTrialExpired && !userAccess.hasActiveSubscription}
        onSuccess={() => {
          setIsPaywallOpen(false);
          loadInitialData();
        }}
      />

      <UpgradeModal
        isOpen={upgradePrompt.open}
        onClose={() => setUpgradePrompt((prev) => ({ ...prev, open: false }))}
        title={upgradePrompt.title}
        message={upgradePrompt.message}
        requiredTier={upgradePrompt.requiredTier}
        onNavigateToPricing={() => {
          setUpgradePrompt((prev) => ({ ...prev, open: false }));
          setCurrentRoute('pricing');
        }}
        onDirectCheckout={(tierId) => {
          setUpgradePrompt((prev) => ({ ...prev, open: false }));
          setSelectedPlanForCheckout(tierId);
          setIsPaywallOpen(true);
        }}
      />
    </div>
  );
}
