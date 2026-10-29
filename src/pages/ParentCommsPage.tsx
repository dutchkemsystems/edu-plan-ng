import React, { useState } from 'react';
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
  RefreshCw
} from 'lucide-react';
import { AppLanguage } from '../lib/i18n.ts';
import confetti from 'canvas-confetti';

export const ParentCommsPage: React.FC = () => {
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
    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/ai/parent-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      const data = await res.json();
      if (data.success && data.data) {
        setAiMessage(data.data.messageText);
        setDirectWaLink(data.data.waLink);
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

  const handleWhatsApp = () => {
    if (directWaLink) {
      window.open(directWaLink, '_blank');
      return;
    }
    const cleanPhone = parentPhone.replace(/\D/g, '');
    const intlPhone = cleanPhone.startsWith('0') ? '234' + cleanPhone.slice(1) : cleanPhone;
    const url = `https://wa.me/${intlPhone}?text=${encodeURIComponent(currentMessage)}`;
    window.open(url, '_blank');
  };

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

            <button
              onClick={handleWhatsApp}
              className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl flex items-center gap-2 shadow-2xs transition-all hover:scale-102"
            >
              <Share2 className="w-4 h-4" />
              <span>Send via WhatsApp (+234)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
