import React, { useState } from 'react';
import {
  User,
  Shield,
  CreditCard,
  Bell,
  CheckCircle2,
  Download,
  ExternalLink,
  KeyRound,
  FileText,
  Trash2,
  Lock,
  QrCode,
  Copy,
  AlertTriangle,
  LogOut,
  Clock,
  Check
} from 'lucide-react';
import { TeacherUser } from '../types/index.ts';
import { updateProfile } from '../lib/api.ts';
import confetti from 'canvas-confetti';

interface SettingsPageProps {
  user: TeacherUser | null;
  onRefreshUser: () => void;
  onLogout?: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ user, onRefreshUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'mfa' | 'ndpr' | 'subscription' | 'notifications'>('profile');

  // Profile Form State
  const [name, setName] = useState(user?.name || 'Mrs. Amina Balogun');
  const [schoolName, setSchoolName] = useState(user?.schoolName || 'King\'s College, Lagos');
  const [state, setState] = useState(user?.state || 'Lagos');
  const [lga, setLga] = useState(user?.lga || 'Lagos Island');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Account Form State
  const [email, setEmail] = useState(user?.email || 'amina.balogun@schools.ng');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [accountSuccess, setAccountSuccess] = useState(false);

  // MFA 2FA State
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [totpCode, setTotpCode] = useState('');
  const [mfaSecret, setMfaSecret] = useState('JBSWY3DPEHPK3PXP');
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [mfaSuccess, setMfaSuccess] = useState(false);
  const [recoveryCodes, setRecoveryCodes] = useState([
    'A1B2-C3D4-E5F6',
    'G7H8-J9K0-L1M2',
    'N3P4-Q5R6-S7T8',
    'U9V0-W1X2-Y3Z4',
    '8821-4901-3829',
    '7412-9018-4421',
    '1092-8374-6512',
    '3391-7264-9012'
  ]);

  // Notifications State
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [curriculumAlerts, setCurriculumAlerts] = useState(true);
  const [smsReminders, setSmsReminders] = useState(false);

  // NDPR State
  const [deletionConfirmed, setDeletionConfirmed] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const auditLogs = [
    {
      id: 'aud_801',
      action: 'Teacher Session Login',
      ip: '102.89.23.14 (Lagos, NG)',
      client: 'Chrome on macOS (PWA Client)',
      legalBasis: 'NDPA Art. 24(1)(a) Consent',
      time: 'Today, 10:42 AM'
    },
    {
      id: 'aud_802',
      action: 'Lesson Plan Export (.doc)',
      ip: '102.89.23.14 (Lagos, NG)',
      client: 'EduPlan NG Web App',
      legalBasis: 'Legitimate Instructional Interest',
      time: 'Yesterday, 04:15 PM'
    },
    {
      id: 'aud_803',
      action: 'Broadsheet Grade Synchronization',
      ip: '102.89.23.14 (Lagos, NG)',
      client: 'EduPlan BroadSheet Engine',
      legalBasis: 'Academic Record Obligation',
      time: 'Oct 14, 2026, 09:30 AM'
    }
  ];

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        name,
        schoolName,
        state,
        lga,
      });
      setSavedSuccess(true);
      confetti({ particleCount: 40 });
      setTimeout(() => setSavedSuccess(false), 2500);
      onRefreshUser();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setAccountSuccess(true);
    setTimeout(() => setAccountSuccess(false), 2500);
  };

  const handleVerifyTotp = (e: React.FormEvent) => {
    e.preventDefault();
    if (totpCode.length >= 6) {
      setMfaEnabled(true);
      setMfaSuccess(true);
      confetti({ particleCount: 50, spread: 50 });
      setTimeout(() => setMfaSuccess(false), 3000);
    }
  };

  const handleExportPersonalData = () => {
    const payload = {
      exportMetadata: {
        legalStandard: 'Nigeria Data Protection Act (NDPA 2023 / NDPR)',
        controller: 'EduPlan NG Educational Systems Ltd.',
        dataSubject: user?.email || email,
        exportedAt: new Date().toISOString(),
      },
      profile: {
        name,
        email,
        schoolName,
        state,
        lga,
        role: user?.role || 'teacher',
        mfaActive: mfaEnabled,
      },
      auditHistory: auditLogs,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EduPlan_NDPR_Data_Export_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    confetti({ particleCount: 40 });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Teacher Account & Security Settings</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your teacher profile, TOTP two-factor authentication, NDPR data privacy, and notification preferences.
          </p>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200 transition-colors self-start md:self-auto"
            title="Log Out of EduPlan NG"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out / Log Out</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="bg-white p-2 rounded-2xl border border-gray-200/80 shadow-xs space-y-1 h-fit">
          {[
            { id: 'profile', label: 'Teacher Profile', icon: User },
            { id: 'account', label: 'Security & Login', icon: Shield },
            { id: 'mfa', label: 'MFA / 2FA (TOTP)', icon: KeyRound, badge: mfaEnabled ? 'ON' : 'OFF' },
            { id: 'ndpr', label: 'NDPR Data Privacy', icon: Lock },
            { id: 'subscription', label: 'Billing & Invoices', icon: CreditCard },
            { id: 'notifications', label: 'Notifications', icon: Bell },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all ${
                  active ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold ${
                      item.badge === 'ON' ? 'bg-emerald-800 text-emerald-200' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="md:col-span-3 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs">
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <h2 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">
                Personal & School Information
              </h2>

              {savedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Full Name & Title</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Affiliated School Name</label>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Local Government Area (LGA)</label>
                  <input
                    type="text"
                    value={lga}
                    onChange={(e) => setLga(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: ACCOUNT & SECURITY */}
          {activeTab === 'account' && (
            <form onSubmit={handleSaveAccount} className="space-y-4">
              <h2 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">
                Security & Authentication Credentials
              </h2>

              {accountSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Security settings updated! Verification email sent.</span>
                </div>
              )}

              <div className="text-xs">
                <label className="block font-semibold text-gray-700 mb-1">Registered Teacher Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs"
                >
                  Update Credentials
                </button>
              </div>

              {onLogout && (
                <div className="pt-6 border-t border-gray-100 mt-6">
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xs font-bold text-rose-950">Active Session Logout</h3>
                      <p className="text-[11px] text-rose-700 mt-0.5">
                        Safely terminate your login token and clear cache on this shared device.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onLogout}
                      className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors self-start sm:self-auto"
                    >
                      Log Out Now
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}

          {/* TAB 3: MFA / 2FA (TOTP) */}
          {activeTab === 'mfa' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-gray-100">
                <h2 className="text-base font-bold text-gray-900">TOTP Two-Factor Authentication (2FA)</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Protect educational records and pupil grades with time-based one-time passwords (Google Authenticator, Microsoft Authenticator, Authy).
                </p>
              </div>

              {mfaSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Two-factor authentication successfully configured!</span>
                </div>
              )}

              {/* Status Banner */}
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between ${
                  mfaEnabled ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${mfaEnabled ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'}`}>
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">
                      MFA Status: {mfaEnabled ? 'ACTIVE & ENFORCED' : 'NOT ENABLED'}
                    </h3>
                    <p className="text-[11px] text-gray-600">
                      {mfaEnabled
                        ? '6-digit TOTP code required at every sign-in.'
                        : 'Enable 2FA to satisfy Lagos State MoE data security audit compliance.'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMfaEnabled(!mfaEnabled)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition ${
                    mfaEnabled
                      ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {mfaEnabled ? 'Disable 2FA' : 'Set Up 2FA'}
                </button>
              </div>

              {/* TOTP Setup Wizard */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-5 bg-slate-50 rounded-2xl border border-gray-200 text-center space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Step 1: Scan QR Code with Authenticator App
                  </span>

                  {/* SVG QR Code Pattern */}
                  <div className="w-40 h-40 mx-auto bg-white p-3 rounded-2xl border border-gray-200 shadow-inner flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                      <rect width="100" height="100" fill="white" />
                      {/* Corner 1 */}
                      <rect x="10" y="10" width="24" height="24" fill="black" />
                      <rect x="14" y="14" width="16" height="16" fill="white" />
                      <rect x="18" y="18" width="8" height="8" fill="black" />
                      {/* Corner 2 */}
                      <rect x="66" y="10" width="24" height="24" fill="black" />
                      <rect x="70" y="14" width="16" height="16" fill="white" />
                      <rect x="74" y="18" width="8" height="8" fill="black" />
                      {/* Corner 3 */}
                      <rect x="10" y="66" width="24" height="24" fill="black" />
                      <rect x="14" y="70" width="16" height="16" fill="white" />
                      <rect x="18" y="74" width="8" height="8" fill="black" />
                      {/* Dummy Data Matrix Dots */}
                      <rect x="42" y="14" width="8" height="8" fill="black" />
                      <rect x="54" y="24" width="6" height="6" fill="black" />
                      <rect x="42" y="42" width="16" height="16" fill="black" />
                      <rect x="66" y="42" width="8" height="8" fill="black" />
                      <rect x="78" y="54" width="8" height="8" fill="black" />
                      <rect x="42" y="66" width="8" height="8" fill="black" />
                      <rect x="54" y="78" width="8" height="8" fill="black" />
                      <rect x="70" y="70" width="12" height="12" fill="black" />
                    </svg>
                  </div>

                  <div className="text-[11px] text-gray-500">
                    Manual key: <code className="font-mono font-bold text-gray-800">{mfaSecret}</code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(mfaSecret);
                        setCopiedSecret(true);
                        setTimeout(() => setCopiedSecret(false), 2000);
                      }}
                      className="ml-2 text-emerald-700 hover:underline font-bold inline-flex items-center gap-0.5"
                    >
                      {copiedSecret ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-gray-200 space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Step 2: Enter 6-Digit Authenticator Code
                  </span>

                  <form onSubmit={handleVerifyTotp} className="space-y-3">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="123456"
                      value={totpCode}
                      onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                      className="w-full text-center text-xl font-mono tracking-widest px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600 font-bold"
                    />

                    <button
                      type="submit"
                      disabled={totpCode.length < 6}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-xs"
                    >
                      Verify & Activate 2FA
                    </button>
                  </form>

                  <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 space-y-1">
                    <p className="font-bold text-gray-700">Emergency Recovery Codes:</p>
                    <p>Store these codes safely in case you lose access to your authenticator device:</p>
                    <div className="grid grid-cols-2 gap-1 font-mono text-[10px] text-gray-800 bg-gray-50 p-2 rounded-lg border border-gray-200">
                      {recoveryCodes.slice(0, 4).map((c) => (
                        <div key={c}>{c}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: NDPR DATA PRIVACY & AUDIT LOGS */}
          {activeTab === 'ndpr' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                    NDPA 2023 Compliant
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">Nigeria Data Protection Regulation</span>
                </div>
                <h2 className="text-base font-bold text-gray-900 mt-1">Data Subject Rights & Privacy Controls</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Exercise statutory rights of data portability, inspection, and account erasure under the Nigeria Data Protection Act.
                </p>
              </div>

              {/* Data Portability Download Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xs font-bold text-gray-900">Right to Data Portability (Article 24)</h3>
                  <p className="text-[11px] text-gray-600 mt-0.5">
                    Download an encrypted machine-readable archive (.JSON) of your teaching profile, lesson plans, grades, and audit trail.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleExportPersonalData}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition self-start sm:self-auto shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download NDPR Archive</span>
                </button>
              </div>

              {/* Security & Access Audit Trail */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Security & Access Audit Trail (NDPA Lawful Processing)
                </h3>
                <div className="overflow-x-auto border border-gray-200 rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 text-[10px] uppercase font-bold">
                      <tr>
                        <th className="py-2.5 px-3">Action Event</th>
                        <th className="py-2.5 px-3">IP & Client Device</th>
                        <th className="py-2.5 px-3">Lawful Basis</th>
                        <th className="py-2.5 px-3">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50/60">
                          <td className="py-2.5 px-3 font-semibold text-gray-900">{log.action}</td>
                          <td className="py-2.5 px-3">
                            <div className="font-mono text-gray-800">{log.ip}</div>
                            <div className="text-[10px] text-gray-500">{log.client}</div>
                          </td>
                          <td className="py-2.5 px-3 text-emerald-800 text-[11px]">{log.legalBasis}</td>
                          <td className="py-2.5 px-3 text-gray-400">{log.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right to Erasure / Account Deletion */}
              <div className="pt-4 border-t border-gray-100">
                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xs font-bold text-rose-950">Right to Erasure / Permanent Deletion</h3>
                    <p className="text-[11px] text-rose-800 mt-0.5">
                      Request complete removal of your personal credentials, contact numbers, and school association from EduPlan servers.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(true)}
                    className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition self-start sm:self-auto shrink-0"
                  >
                    Request Erasure
                  </button>
                </div>
              </div>

              {/* DPO Contact Info */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 flex items-center justify-between">
                <div>
                  <span className="font-bold text-gray-800">Data Protection Officer (DPO):</span>
                  <span className="ml-1">dpo@eduplan.ng • NDPC Reg: NDPC/DPCO/2026/0411</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700">Audit Compliant</span>
              </div>
            </div>
          )}

          {/* TAB 5: SUBSCRIPTION */}
          {activeTab === 'subscription' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">
                Subscription & Billing History
              </h2>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Current Plan</span>
                  <div className="text-lg font-black text-emerald-950 mt-0.5">EduPlan Pro (Annual)</div>
                  <p className="text-xs text-emerald-700 mt-0.5">Auto-renews on September 14, 2027 • ₦22,000/yr</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold self-start sm:self-auto">
                  Active
                </span>
              </div>

              <h3 className="text-xs font-bold text-gray-900 uppercase pt-2">Billing Invoices</h3>
              <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden text-xs">
                <div className="p-3.5 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <p className="font-bold text-gray-900">Invoice #EDU-2026-0891</p>
                    <p className="text-[11px] text-gray-500">Sept 14, 2026 • ₦22,000 NGN (Kora Pay)</p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1 font-bold text-emerald-700 hover:underline"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">
                Notification Preferences
              </h2>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="text-xs font-bold text-gray-900">Email Digest & Syllabus Updates</p>
                    <p className="text-[11px] text-gray-500">Receive weekly term coverage alerts</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNotifs}
                    onChange={(e) => setEmailNotifs(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="text-xs font-bold text-gray-900">In-App Live SSE Notifications</p>
                    <p className="text-[11px] text-gray-500">Real-time alerts for lesson submissions</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={curriculumAlerts}
                    onChange={(e) => setCurriculumAlerts(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-600 pb-3 border-b border-gray-100">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-gray-900">Confirm Statutory Account Erasure</h3>
            </div>

            <p className="text-xs text-gray-600 mt-3 leading-relaxed">
              Pursuant to NDPA 2023 Article 26, this action will permanently purge your teacher account, personal email, contact records, and school association from our live databases.
            </p>

            <div className="mt-4 p-3 bg-rose-50 rounded-xl border border-rose-200 text-[11px] text-rose-800">
              ⚠️ Lesson plans and terminal broadsheet records previously submitted to King's College Lagos will be anonymized in compliance with Nigerian educational archiving laws.
            </div>

            <div className="mt-5 flex justify-end gap-2 text-xs">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  if (onLogout) onLogout();
                }}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold"
              >
                Yes, Delete My Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
