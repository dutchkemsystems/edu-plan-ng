import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  CalendarCheck2,
  HelpCircle,
  Award,
  FolderArchive,
  BarChart3,
  CalendarDays,
  MessageSquare,
  Users2,
  Clock,
  Settings,
  CreditCard,
  ShieldAlert,
  Sparkles,
  LogOut,
  Smartphone,
  ShieldCheck,
  Box,
  ShoppingBag,
  Building2,
  Radio,
  FlaskConical,
  Bot,
  Lock
} from 'lucide-react';
import { AppLanguage, translations } from '../lib/i18n.ts';
import { PWAInstallButton } from './PWAInstallButton.tsx';
import { TeacherUser, DashboardStats } from '../types/index.ts';
import { resolveClientTierSummary } from '../config/pricing.ts';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onLogout: () => void;
  currentLang: AppLanguage;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  user?: TeacherUser | null;
  stats?: DashboardStats | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  onLogout,
  currentLang,
  isOpenMobile,
  onCloseMobile,
  user,
  stats,
}) => {
  const t = translations[currentLang];
  const tierSummary = resolveClientTierSummary(user, stats);
  const ent = tierSummary.config;

  const mainNav = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard, locked: false },
    { id: 'live-poll', label: 'EduPoll Live Clicker', icon: Radio, badge: 'Live 2G', locked: false },
    {
      id: 'stem-lab',
      label: 'STEM Realia Lab',
      icon: FlaskConical,
      badge: ent.has4KAccess ? '4K Active' : 'Gold 4K',
      locked: false,
    },
    { id: 'ai-coach', label: 'AI Teacher Coach', icon: Sparkles, badge: 'CPD', locked: false },
    { id: 'ai-copilot', label: 'Pedagogical Co-Pilot', icon: Bot, badge: 'Mastery', locked: false },
    { id: 'marketplace', label: 'Creator Marketplace', icon: ShoppingBag, badge: '80% Royalty', locked: false },
    { id: 'curriculum', label: t.curriculum, icon: BookOpen, badge: `${ent.allowedSourcesCount}/6 Src`, locked: false },
    { id: 'lesson-plans', label: t.lessonPlans || 'Lesson Plans', icon: FileText, badge: 'Core', locked: false },
    {
      id: '3d-visual-lab',
      label: '3D Lab & Teacher Hub',
      icon: Box,
      badge: ent.has3DAccess ? '3D Open' : 'Gold+',
      locked: !ent.has3DAccess,
    },
    { id: 'schemes', label: t.schemeOfWork || 'Scheme of Work', icon: CalendarCheck2, badge: '13-Wk', locked: false },
    {
      id: 'assessments',
      label: t.assessments,
      icon: HelpCircle,
      badge: ent.hasExamGen ? 'WAEC AI' : tierSummary.category === 'b2b' ? 'Silver+' : 'Termly+',
      locked: !ent.hasExamGen,
    },
    {
      id: 'grades',
      label: t.gradeBook,
      icon: Award,
      badge: ent.hasReportCardAi ? 'Report AI' : undefined,
      locked: false,
    },
    { id: 'resources', label: t.resources, icon: FolderArchive, locked: false },
    { id: 'progress', label: t.progress, icon: BarChart3, locked: false },
    { id: 'calendar', label: t.calendar, icon: CalendarDays, locked: false },
    { id: 'sms-access', label: 'SMS & Feature Phone', icon: Smartphone, badge: '2G', locked: false },
    {
      id: 'parent-comms',
      label: t.parentComms,
      icon: MessageSquare,
      badge: ent.hasParentAutopilot ? 'Autopilot' : tierSummary.category === 'b2b' ? 'Silver+' : 'Termly+',
      locked: !ent.hasParentAutopilot,
    },
    { id: 'community', label: t.communityLibrary, icon: Users2, locked: false },
    {
      id: 'timetable',
      label: t.timetable,
      icon: Clock,
      badge: ent.hasTimetableAi ? 'AI Active' : 'Silver+',
      locked: !ent.hasTimetableAi,
    },
  ];

  const adminNav = [
    {
      id: 'ministry',
      label: 'Ministry & LEA Command',
      icon: Building2,
      badge: ent.hasMinistryDashboard ? 'B2G Open' : 'B2G Only',
      locked: !ent.hasMinistryDashboard,
    },
    { id: 'oeqa', label: 'OEQA Compliance', icon: ShieldCheck, badge: 'MoE', locked: false },
    {
      id: 'admin',
      label: t.admin,
      icon: ShieldAlert,
      badge:
        tierSummary.category === 'b2g'
          ? 'Directorate'
          : tierSummary.category === 'b2b'
          ? ent.id.replace('b2b_', '').toUpperCase()
          : 'B2B Only',
      locked: tierSummary.category === 'b2c',
    },
    { id: 'pricing', label: t.pricing, icon: CreditCard, badge: ent.priceDisplay, locked: false },
    { id: 'settings', label: t.settings, icon: Settings, locked: false },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    onCloseMobile();
  };

  const segmentLabel = tierSummary.category === 'b2g' ? 'B2G' : tierSummary.category === 'b2b' ? 'B2B' : 'B2C';

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-2xs transition-opacity"
        />
      )}

      {/* Main Persistent Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[61px] left-0 h-screen lg:h-[calc(100vh-61px)] w-64 bg-slate-900 text-slate-200 z-50 flex flex-col justify-between border-r border-slate-800 transition-transform duration-200 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Main Navigation Group */}
          <div>
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Instructional Management
            </div>
            <nav className="space-y-1">
              {mainNav.map((item) => {
                const Icon = item.icon;
                const active = currentRoute === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                      active
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : item.locked
                        ? 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          active
                            ? 'text-white'
                            : item.id === 'ai-coach'
                            ? 'text-amber-400'
                            : 'text-slate-400 group-hover:text-emerald-400'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 ${
                          item.locked
                            ? 'bg-slate-800 text-amber-300 border border-slate-700'
                            : item.badge === 'CPD'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-950/80 text-amber-300 border border-amber-800/40'
                        }`}
                      >
                        {item.locked && <Lock className="w-2.5 h-2.5" />}
                        <span>{item.badge}</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* School Governance Group */}
          <div>
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              School &amp; Ministry Governance
            </div>
            <nav className="space-y-1">
              {adminNav.map((item) => {
                const Icon = item.icon;
                const active = currentRoute === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                      active
                        ? 'bg-emerald-600 text-white'
                        : item.locked
                        ? 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          active ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-semibold flex items-center gap-1 shrink-0 ${
                          item.locked
                            ? 'bg-slate-800 text-amber-300 border border-slate-700'
                            : 'bg-amber-950/80 text-amber-300 border border-amber-800/40'
                        }`}
                      >
                        {item.locked && <Lock className="w-2.5 h-2.5" />}
                        <span>{item.badge}</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Card: Active Plan Status + Sign Out */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 space-y-2">
          <PWAInstallButton variant="sidebar" />

          <button
            type="button"
            onClick={() => handleNavClick('pricing')}
            className="w-full text-left p-2.5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 hover:border-emerald-500/50 transition-colors text-xs text-slate-300"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="font-bold text-white text-[11px] truncate">{ent.name}</span>
              </div>
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {segmentLabel}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-snug">
              AI Quota:{' '}
              {tierSummary.maxGenerationsTotal !== null
                ? `${tierSummary.totalGenerated}/${tierSummary.maxGenerationsTotal} total`
                : `${tierSummary.usedToday}/${tierSummary.dailyFairUseCap}/day`}{' '}
              • {ent.allowedSourcesCount}/6 Sources
            </p>
          </button>

          {/* Prominent Log Out Button */}
          <button
            onClick={() => {
              onLogout();
              onCloseMobile();
            }}
            className="w-full py-2 px-3 rounded-xl text-xs font-bold text-rose-300 hover:text-white bg-rose-950/30 hover:bg-rose-900/60 border border-rose-800/40 flex items-center justify-between transition-all"
            title="Sign out of current account"
          >
            <div className="flex items-center gap-2">
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>Sign Out / Log Out</span>
            </div>
            <span className="text-[10px] text-rose-400/80 font-mono">Exit</span>
          </button>
        </div>
      </aside>
    </>
  );
};
