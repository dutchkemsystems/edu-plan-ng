import React, { useState } from 'react';
import {
  Lock,
  Mail,
  User,
  School,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Home,
  CheckCircle2,
  BookOpen,
  ArrowLeft,
  Eye,
  EyeOff
} from 'lucide-react';
import { signInUser, signUpUser } from '../lib/api.ts';
import { ActiveSessionConflictModal } from '../components/ActiveSessionConflictModal.tsx';
import confetti from 'canvas-confetti';

interface LoginPageProps {
  onSuccess: () => void;
  onGoToHome: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccess, onGoToHome }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [state, setState] = useState('Lagos');
  const [lga, setLga] = useState('Lagos Island');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [conflictIp, setConflictIp] = useState('102.89.44.12');
  const [conflictUa, setConflictUa] = useState<string | undefined>();
  const [conflictLastActive, setConflictLastActive] = useState<string | undefined>();
  const [pendingEmail, setPendingEmail] = useState('');
  const [pendingPassword, setPendingPassword] = useState('');

  const handleForceLogoutAndLogin = async () => {
    try {
      await signInUser(pendingEmail, pendingPassword, { forceLogout: true });
      setShowConflictModal(false);
      confetti({ particleCount: 60 });
      onSuccess();
    } catch (e: any) {
      setErrorMessage(e?.message || 'Failed to force logout other session');
      setShowConflictModal(false);
    }
  };

  const handleDemoTeacherLogin = async () => {
    setLoading(true);
    setErrorMessage('');
    const demoEmail = 'amina.balogun@schools.ng';
    const demoPass = 'password123';
    setPendingEmail(demoEmail);
    setPendingPassword(demoPass);
    try {
      await signInUser(demoEmail, demoPass);
      confetti({ particleCount: 50 });
      onSuccess();
    } catch (e: any) {
      if (e?.code === 'ACTIVE_SESSION_CONFLICT') {
        setConflictIp(e.activeIp || '102.89.44.12');
        setConflictUa(e.activeUserAgent);
        setConflictLastActive(e.lastActivity);
        setShowConflictModal(true);
        return;
      }
      setErrorMessage(e?.message || 'Login failed. Please check network connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoPrincipalLogin = async () => {
    setLoading(true);
    setErrorMessage('');
    const demoEmail = 'principal@kingscollege.sch.ng';
    const demoPass = 'password123';
    setPendingEmail(demoEmail);
    setPendingPassword(demoPass);
    try {
      await signInUser(demoEmail, demoPass);
      confetti({ particleCount: 50 });
      onSuccess();
    } catch (e: any) {
      if (e?.code === 'ACTIVE_SESSION_CONFLICT') {
        setConflictIp(e.activeIp || '102.89.44.12');
        setConflictUa(e.activeUserAgent);
        setConflictLastActive(e.lastActivity);
        setShowConflictModal(true);
        return;
      }
      setErrorMessage(e?.message || 'Login failed. Please check network connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setPendingEmail(email);
    setPendingPassword(password);
    try {
      if (mode === 'signin') {
        await signInUser(email, password);
      } else {
        await signUpUser({
          email,
          password,
          name,
          schoolName: schoolName || "King's College, Lagos",
          state: state || 'Lagos',
          lga: lga || 'Lagos Island',
        });
      }
      confetti({ particleCount: 60 });
      onSuccess();
    } catch (err: any) {
      if (err?.code === 'ACTIVE_SESSION_CONFLICT') {
        setConflictIp(err.activeIp || '102.89.44.12');
        setConflictUa(err.activeUserAgent);
        setConflictLastActive(err.lastActivity);
        setShowConflictModal(true);
        return;
      }
      setErrorMessage(err?.message || 'Authentication error. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-white relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between z-10 relative">
        <button
          onClick={onGoToHome}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold border border-slate-700 transition-all hover:scale-102"
          title="Return to EduPlan NG public homepage"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Go to Homepage</span>
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-xs shadow-sm">
            EP
          </div>
          <div className="hidden sm:block text-left">
            <span className="font-bold text-sm text-white">EduPlan NG</span>
            <span className="text-[10px] text-emerald-400 ml-1.5 font-medium">Federal & State Standards</span>
          </div>
        </div>

        <button
          onClick={onGoToHome}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 font-medium transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Public Homepage</span>
        </button>
      </header>

      {/* Center Form Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 z-10">
        <div className="w-full max-w-md bg-white text-slate-900 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 border border-slate-200">
          {/* Header */}
          <div className="text-center space-y-1.5 pb-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>NERDC & OEQA Accredited Portal</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {mode === 'signin' ? 'Sign In to Your Workspace' : 'Create Teacher Account'}
            </h1>
            <p className="text-xs text-slate-500">
              {mode === 'signin'
                ? 'Enter your school credentials or use 1-click test profiles'
                : 'Join thousands of Nigerian educators preparing compliant lesson plans'}
            </p>
          </div>

          {/* 1-Click Fast Track Demo Profiles */}
          <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                1-Click Fast Demo Login
              </span>
              <span className="text-[10px] text-emerald-700 font-medium bg-emerald-100/60 px-2 py-0.5 rounded-full">
                Instant Access
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDemoTeacherLogin}
                disabled={loading}
                className="p-2.5 rounded-xl border border-emerald-200 bg-white hover:bg-emerald-50 text-left transition-all hover:scale-101 flex items-center gap-2 group shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  AB
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700">Mrs. Amina Balogun</p>
                  <p className="text-[10px] text-emerald-600 truncate">Math & Science Teacher</p>
                </div>
              </button>

              <button
                type="button"
                onClick={handleDemoPrincipalLogin}
                disabled={loading}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-left transition-all hover:scale-101 flex items-center gap-2 group shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  KC
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-900 truncate group-hover:text-slate-800">Principal / HOD</p>
                  <p className="text-[10px] text-slate-500 truncate">School Admin Portal</p>
                </div>
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Or sign in with email
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-800 text-xs font-medium border border-rose-200 flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Credentials Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Emeka Okafor"
                      className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">School / College</label>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      required
                      type="text"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="e.g. King's College, Lagos"
                      className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 bg-white"
                    >
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja FCT">Abuja FCT</option>
                      <option value="Kano">Kano</option>
                      <option value="Rivers">Rivers</option>
                      <option value="Oyo">Oyo</option>
                      <option value="Kaduna">Kaduna</option>
                      <option value="Anambra">Anambra</option>
                      <option value="Ogun">Ogun</option>
                      <option value="Edo">Edo</option>
                      <option value="Enugu">Enugu</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">LGA</label>
                    <input
                      type="text"
                      value={lga}
                      onChange={(e) => setLga(e.target.value)}
                      placeholder="e.g. Lagos Island"
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Teacher Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="teacher@schools.ng"
                  className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs pl-9 pr-9 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              <span>{loading ? 'Authenticating...' : mode === 'signin' ? 'Sign In to Workspace' : 'Create Teacher Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle between Sign In and Sign Up */}
          <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
            <div className="text-center text-slate-500">
              {mode === 'signin' ? (
                <p>
                  New to EduPlan NG?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setErrorMessage('');
                    }}
                    className="font-bold text-emerald-700 hover:underline"
                  >
                    Create teacher account
                  </button>
                </p>
              ) : (
                <p>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      setErrorMessage('');
                    }}
                    className="font-bold text-emerald-700 hover:underline"
                  >
                    Sign in to your account
                  </button>
                </p>
              )}
            </div>

            {/* Clear "Go to Homepage" Option */}
            <div className="pt-2 border-t border-dashed border-slate-200 flex flex-col items-center gap-1">
              <button
                type="button"
                onClick={onGoToHome}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                title="Go to EduPlan NG public homepage"
              >
                <Home className="w-4 h-4 text-emerald-600" />
                <span>Go to Homepage / Public Portal</span>
              </button>
              <p className="text-[11px] text-slate-400">
                You can browse curriculum, sample lesson plans, and pricing on the homepage.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 text-center text-xs text-slate-500 border-t border-slate-800">
        <p>© 2026 EduPlan NG. Approved for Nigerian Basic & Senior Secondary Education.</p>
      </footer>

      {showConflictModal && (
        <ActiveSessionConflictModal
          isOpen={showConflictModal}
          onClose={() => setShowConflictModal(false)}
          activeIp={conflictIp}
          activeUserAgent={conflictUa}
          lastActivity={conflictLastActive}
          onForceLogoutAndProceed={handleForceLogoutAndLogin}
        />
      )}
    </div>
  );
};
