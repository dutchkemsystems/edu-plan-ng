import React, { useState } from 'react';
import { Shield, FileText, RefreshCw, ArrowLeft } from 'lucide-react';

interface LegalPagesProps {
  initialTab?: 'privacy' | 'terms' | 'refund';
  onBack: () => void;
}

export const LegalPages: React.FC<LegalPagesProps> = ({ initialTab = 'privacy', onBack }) => {
  const [tab, setTab] = useState<'privacy' | 'terms' | 'refund'>(initialTab);

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Legal, Governance & NDPR Compliance</h1>
            <p className="text-xs text-gray-500 mt-0.5">Compliant with the Nigeria Data Protection Act (NDPA 2023 / NDPR)</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setTab('privacy')}
            className={`px-3 py-1.5 rounded-lg ${tab === 'privacy' ? 'bg-white shadow-2xs text-gray-900 font-bold' : 'text-gray-600'}`}
          >
            Privacy Policy (NDPR)
          </button>
          <button
            onClick={() => setTab('terms')}
            className={`px-3 py-1.5 rounded-lg ${tab === 'terms' ? 'bg-white shadow-2xs text-gray-900 font-bold' : 'text-gray-600'}`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setTab('refund')}
            className={`px-3 py-1.5 rounded-lg ${tab === 'refund' ? 'bg-white shadow-2xs text-gray-900 font-bold' : 'text-gray-600'}`}
          >
            Refund Policy
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6 text-xs text-gray-700 leading-relaxed">
        {tab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-gray-900">Nigeria Data Protection Regulation (NDPR) Privacy Policy</h2>
            <p><strong>Effective Date:</strong> September 1, 2026</p>
            <p>
              EduPlan NG ("we", "our", or "the Platform") takes the privacy of Nigerian educators, school administrators, and students very seriously. This Privacy Policy is prepared in strict accordance with the Nigeria Data Protection Act (NDPA 2023) and the guidelines issued by the Nigeria Data Protection Commission (NDPC).
            </p>

            <h3 className="font-bold text-gray-900 text-sm">1. Data Collected</h3>
            <p>
              We collect teacher professional information including name, official school email, school name, State of posting, Local Government Area (LGA), assigned curriculum classes, and subjects. Student assessment records entered into Broadsheets are held with strict confidentiality under teacher authorization.
            </p>

            <h3 className="font-bold text-gray-900 text-sm">2. Purpose of Processing</h3>
            <p>
              Personal data is processed solely for delivering lesson planning tools, generating Bloom-aligned Schemes of Work, managing student grades, facilitating Kora Pay subscription transactions, and maintaining academic compliance records.
            </p>

            <h3 className="font-bold text-gray-900 text-sm">3. Data Subject Rights</h3>
            <p>
              Under the NDPR, educators have the right to request access to their personal records, request rectification of inaccurate school details, object to processing, or request complete account erasure by contacting <code>privacy@eduplan.ng</code>.
            </p>
          </div>
        )}

        {tab === 'terms' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-gray-900">Terms of Service</h2>
            <p><strong>Effective Date:</strong> September 1, 2026</p>
            <p>
              By creating an account on EduPlan NG, you agree to comply with all Nigerian academic integrity standards and copyright guidelines regarding instructional materials.
            </p>

            <h3 className="font-bold text-gray-900 text-sm">1. Educational Use License</h3>
            <p>
              EduPlan NG grants licensed educators a non-transferable, royalty-free license to generate, export, print, and distribute lesson plans, Schemes of Work, and examination question papers for classroom instruction.
            </p>

            <h3 className="font-bold text-gray-900 text-sm">2. Curriculum Accuracy</h3>
            <p>
              Our syllabi follow the approved NERDC standard for Junior Secondary (Basic 7–9) and Senior Secondary (SSS 1–3). Teachers remain the final pedagogical authority responsible for adapting plans to their specific classroom requirements.
            </p>
          </div>
        )}

        {tab === 'refund' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-gray-900">Subscription & Refund Policy</h2>
            <p><strong>Effective Date:</strong> September 1, 2026</p>
            <p>
              We want every Nigerian teacher to be completely satisfied with EduPlan NG.
            </p>

            <h3 className="font-bold text-gray-900 text-sm">1. 14-Day Money-Back Guarantee</h3>
            <p>
              If you subscribe to EduPlan Pro (Annual or Monthly) via Kora Pay and find that it does not meet your instructional needs, you may request a 100% refund within 14 calendar days of payment with no questions asked.
            </p>

            <h3 className="font-bold text-gray-900 text-sm">2. Refund Processing</h3>
            <p>
              Refunds are credited directly to the original Nigerian bank account or debit card used during checkout within 3–5 business days via Kora Pay settlement channels.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
