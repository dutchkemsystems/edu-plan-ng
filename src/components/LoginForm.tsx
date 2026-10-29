import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Sparkles, AlertCircle, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { executeSeamlessLogin } from '../app/actions/auth.ts';
import { TeacherUser } from '../types/index.ts';
import confetti from 'canvas-confetti';

interface LoginFormProps {
  onSuccess?: (user: TeacherUser) => void;
  redirectTo?: string;
  className?: string;
  onSwitchToSignup?: () => void;
}

/**
 * Production-Grade Seamless Login Form for EduPlan NG
 * 
 * Features:
 * - Better Auth session authentication
 * - Automatic session cookie handling (httpOnly, secure, sameSite: 'lax')
 * - Immediate state hydration (no manual refresh needed)
 * - Seamless transition to dashboard workspace
 * - Verified 1-click Quick Logins for Nigerian Secondary School Demo Profiles
 */
export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  redirectTo = '/#dashboard',
  className = '',
  onSwitchToSignup
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please enter your school email address.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await executeSeamlessLogin(email, password);
      setSuccessMessage(`Welcome back, ${result.user.name}!`);
      confetti({ particleCount: 60, spread: 70 });

      if (onSuccess) {
        onSuccess(result.user);
      } else {
        // Immediate seamless transition to dashboard
        window.location.href = redirectTo;
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async (demoEmail: string, title: string) => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const result = await executeSeamlessLogin(demoEmail, 'password123');
      setSuccessMessage(`Logged in as ${title} (${result.user.name})`);
      confetti({ particleCount: 50, spread: 60 });

      if (onSuccess) {
        onSuccess(result.user);
      } else {
        window.location.href = redirectTo;
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Demo login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center shadow-xs">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Educator Portal Sign In
        </h2>
        <p className="text-xs text-slate-500">
          Statutory NERDC Curriculum & Lagos OEQA Lesson Planning Platform
        </p>
      </div>

      {/* Error / Success Feedback */}
      {errorMessage && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-xs text-rose-800 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{errorMessage}</p>
        </div>
      )}

      {successMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-800 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <p className="font-semibold">{successMessage}</p>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            School Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. teacher@kingscollege.sch.ng"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/10 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating Session...</span>
            </>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Quick Demo Logins for Instant Evaluation */}
      <div className="pt-2 border-t border-slate-100 space-y-2.5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">
          Instant 1-Click Verification Logins
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleQuickDemoLogin('amina.balogun@schools.ng', 'Teacher')}
            className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/80 text-left transition-colors flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
              AB
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-slate-900 truncate">Mrs. Amina Balogun</p>
              <p className="text-[10px] text-emerald-800 font-medium">Secondary Teacher</p>
            </div>
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleQuickDemoLogin('principal@kingscollege.sch.ng', 'Principal')}
            className="p-2.5 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100/80 text-left transition-colors flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
              CO
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-slate-900 truncate">Dr. C. Okafor</p>
              <p className="text-[10px] text-indigo-800 font-medium">Principal (Gold Tier)</p>
            </div>
          </button>
        </div>
      </div>

      {/* Switch to Signup */}
      {onSwitchToSignup && (
        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">
            Don't have an educator account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="font-bold text-emerald-700 hover:text-emerald-800 underline ml-1 cursor-pointer"
            >
              Register your school
            </button>
          </p>
        </div>
      )}
    </div>
  );
};
