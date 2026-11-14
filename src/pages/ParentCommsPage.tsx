import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Share2,
  Copy,
  Send,
  CheckCircle2,
  Globe,
  Sparkles,
  PhoneCall,
  User,
  School,
  ExternalLink,
  RefreshCw,
  ShieldCheck,
  Lock,
  FileCheck2,
  AlertCircle,
  Check,
  Users
} from 'lucide-react';
import { AppLanguage } from '../lib/i18n.ts';
import { TeacherUser, DashboardStats } from '../types/index.ts';
import { resolveClientTierSummary } from '../config/pricing.ts';
import { getAuthHeaders } from '../lib/api.ts';
import confetti from 'canvas-confetti';

interface ParentCommsPageProps {
  user?: TeacherUser | null;
  stats?: DashboardStats | null;
  onOpenUpgrade?: (msg: string, tier?: string, title?: string) => void;
  onPlanQuotaChanged?: () => void;
}

export const ParentCommsPage: React.FC<ParentCommsPageProps> = ({
  user,
  stats,
  onOpenUpgrade,
  onPlanQuotaChanged,
}) => {
  const tierSummary = resolveClientTierSummary(user, stats);
  const ent = tierSummary.config;
  const recommendedParentTier = tierSummary.category === 'b2b' ? 'b2b_silver' : 'b2c_termly';
  const [activeMainTab, setActiveMainTab] = useState<'messaging' | 'consent_portal'>('messaging');
  const [selectedCategory, setSelectedCategory] = useState<'attendance' | 'academic' | 'fee' | 'homework' | 'openday'>('academic');
  const [lang, setLang] = useState<AppLanguage>('en');
  const [studentName, setStudentName] = useState('Chinedu Okafor');
  const [parentName, setParentName] = useState('Mr. & Mrs. Okafor');
  const [parentPhone, setParentPhone] = useState('08031234567');
  const [topicCovered, setTopicCovered] = useState('Mathematics: Fractions & Commercial Math');
  const [performance, setPerformance] = useState('Scored 18/20 (90%) in today\'s class test');
  const [teacherRemarks, setTeacherRemarks] = useState('Very active in class and completed all board exercises');
  const [copied, setCopied] = useState(false);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [directWaLink, setDirectWaLink] = useState<string | null>(null);

  // Phase 2D: Digital Parental Consent State (NDPA 2023 Sec 24)
  const [studentsRoster, setStudentsRoster] = useState<any[]>([]);
  const [selectedConsentStudentId, setSelectedConsentStudentId] = useState<string>('');
  const [guardianFullName, setGuardianFullName] = useState<string>('');
  const [guardianPhoneInput, setGuardianPhoneInput] = useState<string>('');
  const [guardianEmailInput, setGuardianEmailInput] = useState<string>('');
  const [guardianRelationship, setGuardianRelationship] = useState<string>('Parent / Guardian');
  const [consentPurposes, setConsentPurposes] = useState({
    caAnalytics: true,
    iepDifferentiation: true,
    whatsappAlerts: true,
    examVerification: true,
  });
  const [isSubmittingConsent, setIsSubmittingConsent] = useState(false);
  const [consentSuccessNotice, setConsentSuccessNotice] = useState<string | null>(null);

  const fetchRoster = async () => {
    try {
      const res = await fetch('/api/students', {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setStudentsRoster(data.students || []);
        if (data.students?.length > 0 && !selectedConsentStudentId) {
          setSelectedConsentStudentId(data.students[0].id);
          setGuardianFullName(data.students[0].guardianName || '');
          setGuardianPhoneInput(data.students[0].guardianPhone?.startsWith('*') ? '' : data.students[0].guardianPhone);
          setGuardianEmailInput(data.students[0].guardianEmail?.includes('RESTRICTED') ? '' : (data.students[0].guardianEmail || ''));
        }
      }
    } catch (e) {
      console.error('Failed to load roster for consent form', e);
    }
  };

  useEffect(() => {
    if (ent.hasParentAutopilot) {
      fetchRoster();
    }
  }, [ent.hasParentAutopilot]);

  const selectedConsentStudent = studentsRoster.find((s) => s.id === selectedConsentStudentId);

  const handleSelectStudentForConsent = (studentId: string) => {
    setSelectedConsentStudentId(studentId);
    const s = studentsRoster.find((st) => st.id === studentId);
    if (s) {
      setGuardianFullName(s.guardianName || '');
      setGuardianPhoneInput(s.guardianPhone?.startsWith('*') ? '' : s.guardianPhone);
      setGuardianEmailInput(s.guardianEmail?.includes('RESTRICTED') ? '' : (s.guardianEmail || ''));
    }
  };

  const handleExecuteConsent = async (consentGranted: boolean) => {
    if (!selectedConsentStudentId) return;
    setIsSubmittingConsent(true);
    try {
      const res = await fetch(`/api/students/${selectedConsentStudentId}/consent`, {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify({
          parentName: guardianFullName || selectedConsentStudent?.guardianName,
          parentPhone: guardianPhoneInput || '0803-123-4567',
          parentEmail: guardianEmailInput || null,
          consentGranted,
          purpose: 'Continuous Assessment, IEP Differentiated Instruction & Examination Verification (NDPA 2023 Sec 24)',
        }),
      });

      if (res.ok) {
        confetti({ particleCount: 50, spread: 60 });
        setConsentSuccessNotice(
          consentGranted
            ? `Statutory parental consent authorized for ${selectedConsentStudent?.firstName} ${selectedConsentStudent?.lastName}. Records and IEP processing unlocked.`
            : `Consent revoked for ${selectedConsentStudent?.firstName} ${selectedConsentStudent?.lastName}. Student PII restricted.`
        );
        await fetchRoster();
        setTimeout(() => setConsentSuccessNotice(null), 6000);
      }
    } catch (e) {
      console.error('Failed to submit consent', e);
    } finally {
      setIsSubmittingConsent(false);
    }
  };

  const defaultTemplates: Record<string, Record<AppLanguage, string>> = {
    attendance: {
      en: `Good day, ${parentName} Sir/Ma. 🙏\n\nWarm greetings from King's College, Lagos. This is to inform you that your child, ${studentName}, was absent from school today without prior notice. Kindly verify and contact the school administration office. Thank you.\n\n— Mrs. Amina Balogun (Class Teacher)`,
      yo: `Ẹ kú àbọ̀ Òbí/Olùtọ́jú (${parentName}). A fẹ́ sọ fún yín pé ọmọ yín, ${studentName}, kò wá sí ilé-ìwé lónìí láìsí àkíyèsí tẹ́lẹ̀. Ẹ jọ̀wọ́ kàn sí ọ́fíìsì ilé-ẹ̀kọ́ King's College. Ẹ ṣeun.\n\n— Olùkọ́ Kíláàsì`,
      ig: `Ekele nne na nna (${parentName}). Anyị na-ede akwụkwọ iji mee ka ị mara na nwa gị, ${studentName}, abịaghị ụlọ akwụkwọ taa na-enweghị akwụkwọ ikike. Biko kpọtụrụ ụlọ akwụkwọ King's College. Daalụ.\n\n— Onye Nkuzi`,
      ha: `Gaisuwa ga iyaye (${parentName}). Muna sanar da ku cewa ɗanku/ƴarku, ${studentName}, bai/bata zo makaranta ba a yau ba tare da izini ba. Da fatan za a tuntuɓi makarantar King's College. Mun gode.\n\n— Malamin Aji`,
    },
    academic: {
      en: `Good day, ${parentName} Sir/Ma. 🌟\n\nDelighted to share that ${studentName} demonstrated outstanding performance today in ${topicCovered}, scoring ${performance}! ${teacherRemarks}. Thank you for supporting their studies at home.\n\n— Mrs. Amina Balogun (King's College, Lagos) 📚🇳🇬`,
      yo: `Òbí Àtàtà (${parentName}), ${studentName} ṣe dáadáa gidigidi nínú ìdánwò ${topicCovered} lónìí pẹ̀lú àmì ${performance}! Ẹ tẹ̀síwájú láti gba wọn níyànjú nílé.\n\n— Olùkọ́ Kíláàsì (King's College, Lagos)`,
      ig: `Ezigbo nne na nna (${parentName}), ${studentName} mere nke ọma nke ukwuu n'ule ${topicCovered} nke taa, nweta ${performance}! Gaa n'ihu na-agba ha ume n'ụlọ.\n\n— Onye Nkuzi (King's College, Lagos)`,
      ha: `Zuwa ga iyaye (${parentName}), ${studentName} ya/ta nuna ƙwazo sosai a darasin ${topicCovered} na yau tare da maki ${performance}! A ci gaba da ba su kwarin gwiwa a gida.\n\n— Malamin Aji (King's College, Lagos)`,
    },
    homework: {
      en: `Good day, ${parentName} Sir/Ma. 📚\n\nKindly note that ${studentName} has been assigned a 20-minute homework exercise on ${topicCovered} due tomorrow morning. Please ensure they review the chalkboard worked examples in their exercise book tonight. Thank you for your support!\n\n— Mrs. Amina Balogun (King's College, Lagos)`,
      yo: `Òbí Àtàtà (${parentName}), a fi tọ̀wọ̀tọ̀wọ̀ rán yín létí iṣẹ́ àmurele fún ${studentName} lórí ${topicCovered}. Ẹ jọ̀wọ́ ríi dájú pé wọ́n ṣe é lálẹ́ yìí.\n\n— Olùkọ́ Kíláàsì`,
      ig: `Ezigbo nne na nna (${parentName}), biko mara na e nyere ${studentName} omume ụlọ na ${topicCovered} nke a ga-edozi echi. Biko nyere ha aka mee ya taa.\n\n— Onye Nkuzi`,
      ha: `Zuwa ga iyaye (${parentName}), muna sanar da ku cewa an ba ${studentName} aikin gida a kan ${topicCovered}. Da fatan za a tabbatar sun yi shi a daren yau.\n\n— Malamin Aji`,
    },
    fee: {
      en: `Dear ${parentName}, this is a gentle reminder that the deadline for 1st Term School Examination Registration and PTF levy is this Friday. Please ensure prompt payment to avoid disruption. Thank you.\n\n— Bursar's Office, King's College, Lagos`,
      yo: `Òbí Àtàtà (${parentName}), ìránlétí nípa owó ìdánwò àti owó ẹgbẹ́ òbí àti olùkọ́ (PTF levy) fún sáà kìíní yìí tí yóò parí ní Ọjọ́ Ẹtì (Friday). Ẹ jọ̀wọ́ ẹ san owó yìí lásìkò. Ẹ ṣeun.\n\n— Ọ́fíìsì Bọ́ọ̀sà`,
      ig: `Ezigbo nne na nna (${parentName}), nke a bụ ncheta dị nwayọọ na oge ịkwụ ụgwọ ndebanye aha ule na PTF na-agwụ na Fraịde a. Biko mee ngwa ngwa kwụọ ụgwọ ahụ. Daalụ.\n\n— Ụlọ Ọrụ Bursar`,
      ha: `Zuwa ga iyaye (${parentName}), muna tunatar da ku cewa ranar ƙarshe ta biyan kuɗin jarrabawa da harajin PTF na wannan zangon ita ce wannan Juma'a. Mun gode.\n\n— Ofishin Karɓar Kuɗi`,
    },
    openday: {
      en: `Dear ${parentName}, you are cordially invited to our Mid-Term Open Day & Report Card review this Thursday from 10:00 AM to 2:00 PM at King's College, Lagos. We look forward to discussing ${studentName}'s academic progress with you.\n\n— Principal & Vice Principal Academic`,
      yo: `Òbí Àtàtà (${parentName}), a fi tọ̀wọ̀tọ̀wọ̀ pè yín wá sí Ọjọ́ Ìkíni Ilé-Ẹ̀kọ́ (Open Day) àti àtúnyẹ̀wò ìwé máàkì fún ${studentName} ní Ọjọ́bọ̀ yìí láti agogo mẹ́wàá òwúrọ̀ sí agogo méjì ọ̀sán. A ń retí yín.\n\n— Ọ̀gá Ilé-Ìwé`,
      ig: `Ezigbo nne na nna (${parentName}), anyị na-akpọ gị òkù ka ị bịa mmemme Open Day na nyocha akwụkwọ akara ule nke ${studentName} na Tọsdee a site n'elekere 10:00 nke ụtụtụ. Anyị na-atụ anya ịhụ gị.\n\n— Onye Isi Ụlọ Akwụkwọ`,
      ha: `Zuwa ga iyaye (${parentName}), muna gayyatar ku zuwa ranar duba makin ɗalibai (Open Day) don duba ƙwazon ${studentName} a wannan Alhamis daga ƙarfe 10:00 na safe. Muna fatan ganinku.\n\n— Shugaban Makaranta`,
    },
  };

  const currentMessage = aiMessage || defaultTemplates[selectedCategory]?.[lang] || defaultTemplates.academic.en;

  const handleGenerateAiMessage = async () => {
    if (!ent.hasParentAutopilot) {
      onOpenUpgrade?.(
        'WhatsApp Parent Autopilot requires B2C Pro Termly (₦1,500), B2B Silver (₦120,000), or B2B Gold (₦250,000).',
        recommendedParentTier,
        'Parent Autopilot'
      );
      return;
    }
    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/ai/parent-message', {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify({
          studentName,
          parentName,
          parentPhone,
          messageType: selectedCategory,
          topicCovered,
          performance,
          remarks: teacherRemarks,
          teacherName: 'Mrs. Amina Balogun',
          schoolName: "King's College, Lagos",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 403 || res.status === 429) {
          onOpenUpgrade?.(data?.error || data?.message || 'Upgrade required for Parent Autopilot.', data?.requiredTier || recommendedParentTier, 'Parent Autopilot');
        }
        return;
      }
      if (data.success && data.data) {
        setAiMessage(data.data.messageText);
        setDirectWaLink(data.data.waLink);
        onPlanQuotaChanged?.();
        confetti({ particleCount: 50, spread: 50 });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cleanPhone = parentPhone.replace(/\D/g, '');
  const intlPhone = cleanPhone.startsWith('0') ? '234' + cleanPhone.slice(1) : cleanPhone;
  const whatsappHref = directWaLink || `https://wa.me/${intlPhone}?text=${encodeURIComponent(currentMessage)}`;

  if (!ent.hasParentAutopilot) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-amber-200 shadow-2xs text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto">
          <Lock className="w-7 h-7" />
        </div>
        <div className="max-w-lg mx-auto space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
            Locked on {tierSummary.segmentLabel} • {ent.name}
          </span>
          <h2 className="text-lg font-extrabold text-slate-900">
            Parent Portal & WhatsApp Autopilot Locked
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Multilingual Yorùbá/Igbo/Hausa/English WhatsApp Parent Autopilot and the NDPA 2023 Digital Parental Consent Portal unlock on B2C Pro Termly (₦1,500/term), B2C Session (₦3,000/yr), B2B Silver (₦120,000/term), B2B Gold (₦250,000/term), and B2G State Platinum.
          </p>
        </div>
        <button
          onClick={() =>
            onOpenUpgrade?.(
              'Unlock Parent Portal, Multilingual WhatsApp Autopilot, and NDPA 2023 Consent Ledger.',
              recommendedParentTier,
              'Unlock Parent Portal & Autopilot'
            )
          }
          className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-2xs"
        >
          {tierSummary.category === 'b2b' ? 'Upgrade to B2B Silver (₦120k/term)' : 'Upgrade to Pro Termly (₦1,500)'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-flex mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>WhatsApp Parent Autopilot · Nigerian Cultural Tone</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Parent Communication & WhatsApp Dispatch
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Send polite, culturally respectful updates in Nigerian English, Yorùbá, Igbo, or Hausa directly to parents' WhatsApp with one tap.
          </p>
        </div>

        <button
          onClick={handleGenerateAiMessage}
          disabled={isGeneratingAi}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-2xs transition-all shrink-0"
        >
          {isGeneratingAi ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4 text-amber-300" />
          )}
          <span>{isGeneratingAi ? 'Drafting Polite Message...' : 'AI Compose Polite Message'}</span>
        </button>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveMainTab('messaging')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeMainTab === 'messaging'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp Parent Dispatch</span>
        </button>

        <button
          onClick={() => setActiveMainTab('consent_portal')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeMainTab === 'consent_portal'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Digital Parental Consent Portal (NDPA 2023 Sec 24)</span>
          {studentsRoster.filter(s => s.consentStatus !== 'GRANTED').length > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-amber-100 text-amber-800 border border-amber-300">
              {studentsRoster.filter(s => s.consentStatus !== 'GRANTED').length} Pending
            </span>
          )}
        </button>
      </div>

      {consentSuccessNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs font-semibold text-emerald-900 flex items-center gap-2.5 shadow-2xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{consentSuccessNotice}</span>
        </div>
      )}

      {activeMainTab === 'messaging' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Column */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Message Category</label>
            <div className="space-y-1.5">
              {[
                { id: 'academic', label: 'Academic Commendation & Progress' },
                { id: 'homework', label: 'Homework & Evening Study Alert' },
                { id: 'attendance', label: 'Student Absence Notice' },
                { id: 'fee', label: 'Term Fee / PTF Reminder' },
                { id: 'openday', label: 'Open Day & Report Card Review' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCategory(c.id as any);
                    setAiMessage(null);
                    setDirectWaLink(null);
                  }}
                  className={`w-full p-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                    selectedCategory === c.id
                      ? 'bg-emerald-700 text-white shadow-2xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Language Selection</label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { code: 'en', label: 'Nigerian English' },
                { code: 'yo', label: 'Yorùbá' },
                { code: 'ig', label: 'Asụsụ Igbo' },
                { code: 'ha', label: 'Harshen Hausa' },
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code as AppLanguage);
                    setAiMessage(null);
                    setDirectWaLink(null);
                  }}
                  className={`p-2 rounded-xl text-xs font-bold transition-all ${
                    lang === l.code
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Student Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Parent Salutation / Name</label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Parent WhatsApp Phone (NG)</label>
              <input
                type="text"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Message Preview & Action Column */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Message Preview · {lang.toUpperCase()}</span>
              </span>
              <span className="text-xs text-slate-400 font-mono tabular-nums">
                {currentMessage.length} Characters
              </span>
            </div>

            {/* Visual Phone Chat Bubble Mockup */}
            <div className="mt-4 p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 text-sm text-slate-800 leading-relaxed font-sans relative shadow-2xs">
              <div className="text-[10px] text-emerald-700 font-semibold mb-2 flex items-center gap-1">
                <PhoneCall className="w-3 h-3" />
                <span>Recipient: {parentPhone} ({parentName})</span>
              </div>
              <div className="whitespace-pre-wrap">{currentMessage}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Copy className="w-4 h-4" />
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
            </button>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl flex items-center gap-2 shadow-2xs transition-all hover:scale-102"
            >
              <Share2 className="w-4 h-4" />
              <span>Send via WhatsApp (+234)</span>
            </a>
          </div>
        </div>
      </div>
      ) : (
        /* Digital Parental Consent Portal View (NDPA 2023 Sec 24) */
        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-flex mb-1.5 border border-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Statutory Compliance: Section 24, Nigeria Data Protection Act 2023</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Digital Parental & Guardian Consent Gate
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Under the NDPA 2023, schools and educational platforms are legally forbidden from processing personal identifiable information (PII) or administering individualized instruction/IEP data for minor learners without verified parental or legal guardian consent.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Roster Status</span>
                <span className="text-xs font-bold text-slate-800">
                  {studentsRoster.filter(s => s.consentStatus === 'GRANTED').length} / {studentsRoster.length} Authorized
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Student Picker Column */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Enrolled Learners</span>
                </h4>
                <span className="text-[11px] text-slate-400 font-medium">{studentsRoster.length} Students</span>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {studentsRoster.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => handleSelectStudentForConsent(st.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      selectedConsentStudentId === st.id
                        ? 'border-emerald-600 bg-emerald-50/60 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        {st.firstName} {st.lastName}
                      </span>
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          st.consentStatus === 'GRANTED'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {st.consentStatus === 'GRANTED' ? 'GRANTED' : 'PENDING'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                      <span>{st.admissionNumber}</span>
                      <span className="uppercase font-semibold">{st.classLevel}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Statutory Consent Form Column */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
              {selectedConsentStudent ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <FileCheck2 className="w-4 h-4 text-emerald-600" />
                        <span>Digital Consent Agreement for {selectedConsentStudent.firstName} {selectedConsentStudent.lastName}</span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Admission No: {selectedConsentStudent.admissionNumber} • Class: {selectedConsentStudent.classLevel?.toUpperCase()}
                      </p>
                    </div>

                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5 ${
                        selectedConsentStudent.consentStatus === 'GRANTED'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {selectedConsentStudent.consentStatus === 'GRANTED' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Active Consent</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5 text-amber-700" />
                          <span>Consent Required</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Parent / Legal Guardian Full Name</label>
                      <input
                        type="text"
                        value={guardianFullName}
                        onChange={(e) => setGuardianFullName(e.target.value)}
                        placeholder="e.g. Dr. Babatunde Adeyemi"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Relationship to Learner</label>
                      <select
                        value={guardianRelationship}
                        onChange={(e) => setGuardianRelationship(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-emerald-600 bg-white"
                      >
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Legal Guardian">Legal Guardian</option>
                        <option value="Authorized Sponsor">Authorized Sponsor</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Guardian WhatsApp / Phone (Nigeria)</label>
                      <input
                        type="text"
                        value={guardianPhoneInput}
                        onChange={(e) => setGuardianPhoneInput(e.target.value)}
                        placeholder="0802-345-6789"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Guardian Email Address (Optional)</label>
                      <input
                        type="email"
                        value={guardianEmailInput}
                        onChange={(e) => setGuardianEmailInput(e.target.value)}
                        placeholder="parent@example.ng"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-emerald-600"
                      />
                    </div>
                  </div>

                  {/* Purpose Matrix */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-700 uppercase block mb-1">
                      Authorized Data Processing Purposes (NDPA 2023 Sec 24)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <label className="flex items-start gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consentPurposes.caAnalytics}
                          onChange={(e) => setConsentPurposes({ ...consentPurposes, caAnalytics: e.target.checked })}
                          className="mt-0.5 rounded text-emerald-600"
                        />
                        <span>Continuous Assessment (CA) & Terminal Grade Computation</span>
                      </label>

                      <label className="flex items-start gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consentPurposes.iepDifferentiation}
                          onChange={(e) => setConsentPurposes({ ...consentPurposes, iepDifferentiation: e.target.checked })}
                          className="mt-0.5 rounded text-emerald-600"
                        />
                        <span>AI Differentiated Instruction & Special Educational Needs (IEP)</span>
                      </label>

                      <label className="flex items-start gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consentPurposes.whatsappAlerts}
                          onChange={(e) => setConsentPurposes({ ...consentPurposes, whatsappAlerts: e.target.checked })}
                          className="mt-0.5 rounded text-emerald-600"
                        />
                        <span>Pastoral & Attendance WhatsApp / SMS Dispatch</span>
                      </label>

                      <label className="flex items-start gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consentPurposes.examVerification}
                          onChange={(e) => setConsentPurposes({ ...consentPurposes, examVerification: e.target.checked })}
                          className="mt-0.5 rounded text-emerald-600"
                        />
                        <span>Statutory Exam Verification (BECE / WAEC / NECO)</span>
                      </label>
                    </div>
                  </div>

                  {/* Statutory Legal Declaration Box */}
                  <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-[11px] text-emerald-950 space-y-2 leading-relaxed">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Statutory Declaration under Section 24 of Nigeria Data Protection Act 2023:</span>
                    </div>
                    <p>
                      I hereby confirm that I am the parent or lawful guardian of <strong>{selectedConsentStudent.firstName} {selectedConsentStudent.lastName}</strong>. In accordance with Section 24 of the Nigeria Data Protection Act 2023, I grant explicit consent to King's College, Lagos and EduPlan NG to process my child's academic, evaluation, and assessment records for the specified educational purposes. I retain the statutory right to review, rectify, or withdraw this consent at any time.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                    {selectedConsentStudent.consentStatus === 'GRANTED' && (
                      <button
                        type="button"
                        onClick={() => handleExecuteConsent(false)}
                        disabled={isSubmittingConsent}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
                      >
                        {isSubmittingConsent ? 'Updating...' : 'Revoke Consent'}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleExecuteConsent(true)}
                      disabled={isSubmittingConsent}
                      className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md transition-all flex items-center gap-2 hover:scale-102"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isSubmittingConsent ? 'Recording Consent...' : 'Authorize & Digitally Sign Consent'}</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-12 text-center text-xs text-slate-400">
                  Select a student from the enrolled list to review or grant parental consent.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
