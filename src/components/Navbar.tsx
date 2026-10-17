import React from 'react';
import {
  Bell,
  Search,
  Flame,
  Globe,
  Sparkles,
  School,
  CheckCircle2,
  Calendar,
  X,
  Home,
  User as UserIcon,
  LogOut
} from 'lucide-react';
import { AppLanguage, translations } from '../lib/i18n.ts';
import { TeacherUser, NotificationItem } from '../types/index.ts';
import { PWAInstallButton } from './PWAInstallButton.tsx';

interface NavbarProps {
  currentLang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  unreadCount: number;
  user: TeacherUser | null;
  onNavigate: (route: string) => void;
  streak: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenSearch,
  onOpenNotifications,
  onOpenAuth,
  onLogout,
  unreadCount,
  user,
  onNavigate,
  streak,
}) => {
  const t = translations[currentLang];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-950/10 px-4 lg:px-8 py-3 flex items-center justify-between shadow-xs">
      {/* Brand & Term Info */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2.5 text-left group transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-lg tracking-wider">EP</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-gray-900 text-lg tracking-tight">EduPlan</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 tracking-wider">NG</span>
            </div>
            <p className="text-xs text-gray-500 hidden sm:block">NERDC Curriculum Platform</p>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-2 pl-4 border-l border-gray-200 text-xs text-gray-600">
          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-semibold text-gray-800">2026/2027</span>
          <span className="text-gray-400">•</span>
          <span className="bg-emerald-50 text-emerald-700 font-medium px-2 py-0.5 rounded-full border border-emerald-200/60">
            1st Term (Week 3 of 13)
          </span>
        </div>
      </div>

      {/* Global Search Bar (Trigger for Cmd+K) */}
      <div className="flex-1 max-w-md mx-4 hidden lg:block">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-gray-400 bg-gray-50 hover:bg-gray-100 border border-gray-200/80 rounded-xl transition-all shadow-2xs group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
            <span className="text-gray-500">Search curriculum, plans, resources...</span>
          </div>
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono bg-white text-gray-500 border border-gray-200 rounded shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls: Home, Streak, Language, Notifications, Upgrade, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Frontpage Link */}
        <button
          onClick={() => onNavigate('landing')}
          className="p-2 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors hidden sm:flex items-center gap-1 text-xs font-semibold"
          title="Visit Public Frontpage"
        >
          <Home className="w-4 h-4" />
          <span className="hidden xl:inline">Frontpage</span>
        </button>

        {/* Mobile Search Icon */}
        <button
          onClick={onOpenSearch}
          className="p-2 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg lg:hidden"
          title="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Streak Counter */}
        <div
          title={`${streak} Days Daily Lesson Planning Streak`}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/70 text-amber-800 text-xs font-bold cursor-default shadow-2xs"
        >
          <Flame className="w-4 h-4 text-amber-600 fill-amber-500 animate-pulse" />
          <span>{streak}d Streak</span>
        </div>

        {/* Multilingual Selector */}
        <div className="relative group">
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
            <Globe className="w-3.5 h-3.5 text-gray-500" />
            <select
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value as AppLanguage)}
              className="bg-transparent border-none text-xs font-bold text-gray-800 focus:outline-none cursor-pointer"
            >
              <option value="en">English (EN)</option>
              <option value="yo">Yorùbá (YO)</option>
              <option value="ig">Asụsụ Igbo (IG)</option>
              <option value="ha">Harshen Hausa (HA)</option>
            </select>
          </div>
        </div>

        {/* Notifications Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Upgrade / Pro CTA */}
        <button
          onClick={() => onNavigate('pricing')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-xs transition-all hover:shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Pro Active</span>
        </button>

        {/* PWA Install Button */}
        <PWAInstallButton variant="navbar" />

        {/* User Avatar & School */}
        <button
          onClick={onOpenAuth}
          className="flex items-center gap-2 pl-2 hover:opacity-85 transition-opacity text-left"
          title="Switch User / Sign In"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold text-xs">
            {user?.name ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2) : 'AB'}
          </div>
          <div className="hidden xl:block text-xs">
            <p className="font-semibold text-gray-800 leading-tight">{user?.name || 'Mrs. Amina Balogun'}</p>
            <p className="text-[10px] text-gray-500 leading-tight truncate max-w-[120px]">
              {user?.schoolName || 'King\'s College, Lagos'}
            </p>
          </div>
        </button>

        {/* Clear Logout Button */}
        <button
          onClick={onLogout}
          className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold"
          title="Sign Out / Log Out"
        >
          <LogOut className="w-4 h-4 text-rose-600" />
          <span className="hidden md:inline">Log Out</span>
        </button>
      </div>
    </header>
  );
};
