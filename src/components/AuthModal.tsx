import React, { useState } from 'react';
import { X, Lock, Mail, User, School, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { signInUser, signUpUser } from '../lib/api.ts';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleDemoTeacherLogin = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      await signInUser('amina.balogun@schools.ng', 'password123');
      confetti({ particleCount: 50 });
      onSuccess();
      onClose();
    } catch (e: any) {
      setErrorMessage(e?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoPrincipalLogin = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      await signInUser('amina.balogun@schools.ng', 'password123');
      confetti({ particleCount: 50 });
      onSuccess();
      onClose();
    } catch (e: any) {
      setErrorMessage(e?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      if (mode === 'signin') {
        await signInUser(email, password);
      } else {
        await signUpUser({
          email,
          password,
          name,
          schoolName: schoolName || 'King\'s College, Lagos',
          state: 'Lagos',
          lga: 'Lagos Island',
        });
      }
      confetti({ particleCount: 60 });
      onSuccess();
      onClose();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Authentication error. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              EP
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                {mode === 'signin' ? 'Sign In to EduPlan NG' : 'Create Teacher Account'}
              </h2>
              <p className="text-[11px] text-gray-500">NERDC Curriculum & Lesson Planning Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1-Click Fast Track Demo Buttons */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
            Instant Access (Demo Profiles)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleDemoTeacherLogin}
              disabled={loading}
              className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/70 text-left transition-colors flex items-center gap-2 group"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                AB
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-emerald-950 truncate">Mrs. Amina Balogun</p>
                <p className="text-[10px] text-emerald-700 truncate">Math Teacher (JSS 1 / SSS 1)</p>
              </div>
            </button>

            <button
              onClick={handleDemoPrincipalLogin}
              disabled={loading}
              className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left transition-colors flex items-center gap-2 group"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                KC
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-900 truncate">Principal / HOD</p>
                <p className="text-[10px] text-slate-600 truncate">School Admin Portal</p>
              </div>
            </button>
          </div>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-3 text-[10px] text-gray-400 font-bold uppercase">Or sign in with email</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-800 text-xs font-medium border border-rose-200">
            {errorMessage}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mr. Babatunde Adeleke"
                    className="w-full text-xs pl-9 pr-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">School Name</label>
                <div className="relative">
                  <School className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="e.g. Federal Government College, Lagos"
                    className="w-full text-xs pl-9 pr-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teacher@schools.ng"
                className="w-full text-xs pl-9 pr-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs pl-9 pr-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
              />
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

        <div className="text-center pt-2 border-t border-gray-100 text-xs text-gray-500">
          {mode === 'signin' ? (
            <p>
              New educator?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="font-bold text-emerald-700 hover:underline"
              >
                Create account
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="font-bold text-emerald-700 hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
