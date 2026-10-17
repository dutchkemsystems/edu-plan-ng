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
  ChevronRight,
  Sparkles,
  LogOut,
  GraduationCap,
  Smartphone,
  ShieldCheck
} from 'lucide-react';
import { AppLanguage, translations } from '../lib/i18n.ts';
import { PWAInstallButton } from './PWAInstallButton.tsx';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onLogout: () => void;
  currentLang: AppLanguage;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  onLogout,
  currentLang,
  isOpenMobile,
  onCloseMobile,
}) => {
  const t = translations[currentLang];

  const mainNav = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'ai-coach', label: 'AI Teacher Coach', icon: Sparkles, badge: 'CPD' },
    { id: 'curriculum', label: t.curriculum, icon: BookOpen },
    { id: 'lesson-plans', label: t.lessonPlans, icon: FileText, badge: 'Core' },
    { id: 'schemes', label: t.schemeOfWork, icon: CalendarCheck2, isPro: true },
    { id: 'assessments', label: t.assessments, icon: HelpCircle, isPro: true },
    { id: 'grades', label: t.gradeBook, icon: Award },
    { id: 'resources', label: t.resources, icon: FolderArchive },
    { id: 'progress', label: t.progress, icon: BarChart3 },
    { id: 'calendar', label: t.calendar, icon: CalendarDays },
    { id: 'sms-access', label: 'SMS & Feature Phone', icon: Smartphone, badge: '2G' },
    { id: 'parent-comms', label: t.parentComms, icon: MessageSquare },
    { id: 'community', label: t.communityLibrary, icon: Users2 },
    { id: 'timetable', label: t.timetable, icon: Clock },
  ];

  const adminNav = [
    { id: 'oeqa', label: 'OEQA Compliance', icon: ShieldCheck, badge: 'MoE' },
    { id: 'admin', label: t.admin, icon: ShieldAlert, badge: 'Principal/HOD' },
    { id: 'pricing', label: t.pricing, icon: CreditCard },
    { id: 'settings', label: t.settings, icon: Settings },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    onCloseMobile();
  };

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
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          active ? 'text-white' : item.id === 'ai-coach' ? 'text-amber-400' : 'text-slate-400 group-hover:text-emerald-400'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider ${
                          item.badge === 'CPD'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-950/80 text-amber-300 border border-amber-800/40'
                        }`}
                      >
                        {item.badge}
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
              School Administration
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
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/40">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Card: Sign Out / Logout Button & NERDC Status */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 space-y-2">
          {/* In-App PWA Install Prompt */}
          <PWAInstallButton variant="sidebar" />

          <div className="p-2.5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 text-xs text-slate-300">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold text-white text-[11px]">NERDC 2026 Ready</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-snug">
              Curriculum database synced. JSS 1–3 & SSS 1–3 terminal topics active.
            </p>
          </div>

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
