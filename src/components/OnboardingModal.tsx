import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, School, BookOpen, Layers, Sparkles } from 'lucide-react';
import { completeOnboarding } from '../lib/api.ts';
import confetti from 'canvas-confetti';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
  userId?: string;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onComplete,
  userId,
}) => {
  const [step, setStep] = useState(1);
  const [selectedLevels, setSelectedLevels] = useState<string[]>(['jss-1', 'jss-2']);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Mathematics']);
  const [schoolName, setSchoolName] = useState('King\'s College, Lagos');
  const [state, setState] = useState('Lagos');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const toggleLevel = (lvl: string) => {
    setSelectedLevels((prev) =>
      prev.includes(lvl) ? prev.filter((l) => l !== lvl) : [...prev, lvl]
    );
  };

  const toggleSubject = (sub: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      await completeOnboarding({
        userId,
        levels: selectedLevels,
        subjects: selectedSubjects,
        schoolName,
      });
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      onComplete();
    } catch (e) {
      onComplete();
    } finally {
      setLoading(false);
    }
  };

  const levelsList = [
    { id: 'jss-1', label: 'JSS 1 (Basic 7)' },
    { id: 'jss-2', label: 'JSS 2 (Basic 8)' },
    { id: 'jss-3', label: 'JSS 3 (Basic 9 / BECE)' },
    { id: 'sss-1', label: 'SSS 1 (Senior Sec 1)' },
    { id: 'sss-2', label: 'SSS 2 (Senior Sec 2)' },
    { id: 'sss-3', label: 'SSS 3 (WAEC / NECO Candidates)' },
  ];

  const subjectsList = [
    'Mathematics',
    'English Studies',
    'Basic Science & Technology',
    'Civic Education',
    'General Mathematics',
    'English Language',
    'Biology',
    'Economics',
    'Physics',
    'Chemistry',
    'Agricultural Science',
    'Computer Studies / ICT',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header Progress */}
        <div className="p-6 bg-gradient-to-r from-emerald-800 to-teal-900 text-white">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-200 mb-2">
            <span>TEACHER SETUP WIZARD</span>
            <span>STEP {step} OF 4</span>
          </div>
          <h2 className="text-xl font-bold">Welcome to EduPlan NG</h2>
          <p className="text-xs text-emerald-100/90 mt-1">
            Configure your teaching classes, subjects, and school details for automated NERDC curriculum alignment.
          </p>

          <div className="w-full bg-emerald-950/50 h-1.5 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-emerald-400 h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 space-y-4">
          {step === 1 && (
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-1">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>Select Your Teaching Level(s)</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">Choose all classes you currently handle in your school.</p>

              <div className="grid grid-cols-2 gap-2.5">
                {levelsList.map((lvl) => {
                  const isSelected = selectedLevels.includes(lvl.id);
                  return (
                    <button
                      key={lvl.id}
                      onClick={() => toggleLevel(lvl.id)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <span>{lvl.label}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-1">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Select Your Core Subject(s)</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">You can add or modify your subject assignments anytime.</p>

              <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto p-1">
                {subjectsList.map((sub) => {
                  const isSelected = selectedSubjects.includes(sub);
                  return (
                    <button
                      key={sub}
                      onClick={() => toggleSubject(sub)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <span className="truncate">{sub}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-1">
                <School className="w-4 h-4 text-emerald-600" />
                <span>Your School & Location</span>
              </div>
              <p className="text-xs text-gray-500">This will be printed on generated Scheme of Work headers and exam papers.</p>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">School Name</label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-emerald-600 focus:outline-none"
                  placeholder="e.g. Federal Government College, Lagos"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">State</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-emerald-600 focus:outline-none"
                  >
                    <option value="Lagos">Lagos State</option>
                    <option value="Abuja">FCT Abuja</option>
                    <option value="Oyo">Oyo State</option>
                    <option value="Rivers">Rivers State</option>
                    <option value="Kaduna">Kaduna State</option>
                    <option value="Kano">Kano State</option>
                    <option value="Enugu">Enugu State</option>
                    <option value="Edo">Edo State</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Academic Year</label>
                  <input
                    type="text"
                    disabled
                    value="2026/2027 (Term 1)"
                    className="w-full px-3 py-2 text-xs bg-gray-100 border border-gray-300 rounded-xl text-gray-600"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-4 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <Sparkles className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">You are All Set!</h3>
              <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                We have prepared the NERDC curriculum syllabus for your {selectedLevels.length} selected levels and {selectedSubjects.length} subjects.
              </p>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/70 text-xs text-emerald-800 text-left max-w-sm mx-auto">
                <p className="font-bold">Next steps on your dashboard:</p>
                <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11px] text-emerald-900">
                  <li>Browse full 13-week syllabus topics</li>
                  <li>Auto-generate 1-click Schemes of Work</li>
                  <li>Create and export your first lesson plan to PDF</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={loading}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-md"
            >
              <span>{loading ? 'Launching...' : 'Go to Teacher Dashboard'}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
