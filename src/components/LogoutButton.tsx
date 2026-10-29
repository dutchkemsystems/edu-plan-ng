import React, { useState } from 'react';
import { LogOut, Loader2 } from 'lucide-react';
import { executeTotalWipeLogout } from '../app/actions/auth.ts';

interface LogoutButtonProps {
  redirectUrl?: string;
  className?: string;
  variant?: 'navbar' | 'dropdown' | 'icon' | 'danger';
  showLabel?: boolean;
  onLogoutStart?: () => void;
}

/**
 * Bulletproof Logout Button for EduPlan NG
 * 
 * Enforces the 5-step Total Wipe sequence:
 * 1. Server-side session invalidation
 * 2. Complete cookie deletion
 * 3. LocalStorage & SessionStorage total wipe
 * 4. Cache & Service Worker cache drain
 * 5. Hard window.location.href redirect (no stale UI memory)
 */
export const LogoutButton: React.FC<LogoutButtonProps> = ({
  redirectUrl = '/',
  className = '',
  variant = 'navbar',
  showLabel = true,
  onLogoutStart
}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    if (onLogoutStart) onLogoutStart();

    try {
      await executeTotalWipeLogout(redirectUrl);
    } catch (err) {
      console.error('Logout error, forcing hard redirect:', err);
      // Fallback hard redirect
      window.location.href = redirectUrl;
    }
  };

  const variantStyles = {
    navbar: 'p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold active:scale-95 disabled:opacity-50 cursor-pointer',
    dropdown: 'w-full text-left px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer',
    icon: 'p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors disabled:opacity-50 cursor-pointer',
    danger: 'px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer'
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      aria-label="Log Out of EduPlan NG"
      className={`${variantStyles[variant]} ${className}`}
      title="Secure Total Wipe Sign Out"
    >
      {isLoggingOut ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
          {showLabel && <span>Wiping Session...</span>}
        </>
      ) : (
        <>
          <LogOut className="w-4 h-4 text-rose-600" />
          {showLabel && <span>Log Out</span>}
        </>
      )}
    </button>
  );
};
