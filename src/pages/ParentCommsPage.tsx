import React, { useState } from 'react';
import { MessageSquare, Share2, Copy, Send, CheckCircle2, Globe } from 'lucide-react';
import { AppLanguage } from '../lib/i18n.ts';

export const ParentCommsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'attendance' | 'academic' | 'fee' | 'openday'>('attendance');
  const [lang, setLang] = useState<AppLanguage>('en');
  const [studentName, setStudentName] = useState('Chukwuebuka Okonkwo');
  const [parentPhone, setParentPhone] = useState('08031234567');
  const [copied, setCopied] = useState(false);

  const templates: Record<string, Record<AppLanguage, string>> = {
    attendance: {
      en: `Good day Parent/Guardian. This is to inform you that your child, ${studentName}, was absent from school today without prior notice. Kindly verify and contact the school office. Thank you. — EduPlan School Admin`,
      yo: `Ẹ kú àbọ̀ Òbí/Olùtọ́jú. A fẹ́ sọ fún yín pé ọmọ yín, ${studentName}, kò wá sí ilé-ìwé lónìí láìsí àkíyèsí tẹ́lẹ̀. Ẹ jọ̀wọ́ kàn sí ọ́fíìsì ilé-ẹ̀kọ́. Ẹ ṣeun. — Olùtọ́jú Ilé-Ìwé`,
      ig: `Ekele nne na nna. Anyị na-ede akwụkwọ iji mee ka ị mara na nwa gị, ${studentName}, abịaghị ụlọ akwụkwọ taa na-enweghị akwụkwọ ikike. Biko kpọtụrụ ụlọ akwụkwọ. Daalụ. — Ndị Isi Ụlọ Akwụkwọ`,
      ha: `Gaisuwa ga iyaye. Muna sanar da ku cewa ɗanku/ƴarku, ${studentName}, bai/bata zo makaranta ba a yau ba tare da izini ba. Da fatan za a tuntuɓi makaranta. Mun gode. — Hukumar Makaranta`,
    },
    academic: {
      en: `Dear Parent, ${studentName} demonstrated outstanding performance in today's Mathematics Continuous Assessment (CA) test, scoring 18/20! Keep encouraging their studies at home. — Class Teacher`,
      yo: `Òbí Àtàtà, ${studentName} ṣe dáadáa gidigidi nínú ìdánwò ìṣirò (Mathematics CA) lónìí pẹ̀lú àmì 18/20! Ẹ tẹ̀síwájú láti gba wọn níyànjú nílé. — Olùkọ́ Kíláàsì`,
      ig: `Ezigbo nne na nna, ${studentName} mere nke ọma nke ukwuu n'ule mgbakọ na mwepụ (Mathematics CA) nke taa, nweta 18/20! Gaa n'ihu na-agba ha ume n'ụlọ. — Onye Nkuzi`,
      ha: `Zuwa ga iyaye, ${studentName} ya/ta nuna ƙwazo sosai a gwajin lissafi (Mathematics CA) na yau inda ya/ta sami maki 18/20! A ci gaba da ba su kwarin gwiwa a gida. — Malamin Aji`,
    },
    fee: {
      en: `Dear Parent, this is a gentle reminder that the deadline for 1st Term School Examination Registration and PTF levy is this Friday. Please ensure prompt payment. Thank you. — Bursar's Office`,
      yo: `Òbí Àtàtà, ìránlétí nípa owó ìdánwò àti owó ẹgbẹ́ òbí àti olùkọ́ (PTF levy) fún sáà kìíní yìí tí yóò parí ní Ọjọ́ Ẹtì (Friday). Ẹ jọ̀wọ́ ẹ san owó yìí lásìkò. Ẹ ṣeun. — Ọ́fíìsì Bọ́ọ̀sà`,
      ig: `Ezigbo nne na nna, nke a bụ ncheta dị nwayọọ na oge ịkwụ ụgwọ ndebanye aha ule na PTF na-agwụ na Fraịde a. Biko mee ngwa ngwa kwụọ ụgwọ ahụ. Daalụ. — Ụlọ Ọrụ Bursar`,
      ha: `Zuwa ga iyaye, muna tunatar da ku cewa ranar ƙarshe ta biyan kuɗin jarrabawa da harajin PTF na wannan zangon ita ce wannan Juma'a. Da fatan za a biya akan kari. Mun gode. — Ofishin Karɓar Kuɗi`,
    },
    openday: {
      en: `Dear Parent/Guardian, you are cordially invited to our Mid-Term Open Day & Report Card review this Thursday from 10:00 AM to 2:00 PM. We look forward to meeting you. — Principal`,
      yo: `Òbí Àtàtà, a fi tọ̀wọ̀tọ̀wọ̀ pè yín wá sí Ọjọ́ Ìkíni Ilé-Ẹ̀kọ́ (Open Day) àti àtúnyẹ̀wò ìwé máàkì ní Ọjọ́bọ̀ yìí láti agogo mẹ́wàá òwúrọ̀ sí agogo méjì ọ̀sán. A ń retí yín. — Ọ̀gá Ilé-Ìwé`,
      ig: `Ezigbo nne na nna, anyị na-akpọ gị òkù ka ị bịa mmemme Open Day na nyocha akwụkwọ akara ule na Tọsdee a site n'elekere 10:00 nke ụtụtụ ruo 2:00 nke ehihie. Anyị na-atụ anya ịhụ gị. — Onye Isi Ụlọ Akwụkwọ`,
      ha: `Zuwa ga iyaye, muna gayyatar ku zuwa ranar duba makin ɗalibai (Open Day) a wannan Alhamis daga ƙarfe 10:00 na safe zuwa 2:00 na rana. Muna fatan ganinku. — Shugaban Makaranta`,
    },
  };

  const currentMessage = templates[selectedCategory][lang];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const formattedPhone = parentPhone.replace(/^0/, '234');
    const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(currentMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Parent Communication Center</h1>
        <p className="text-xs text-gray-500 mt-1">
          Instant parent notifications via WhatsApp and SMS in English, Yorùbá, Igbo, and Hausa.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Message Category</label>
            <div className="space-y-1.5">
              {[
                { id: 'attendance', label: 'Student Absence Notice' },
                { id: 'academic', label: 'Academic Commendation' },
                { id: 'fee', label: 'Term Fee / PTF Reminder' },
                { id: 'openday', label: 'Open Day Invitation' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id as any)}
                  className={`w-full p-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                    selectedCategory === c.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Language Selection</label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { code: 'en', label: 'English' },
                { code: 'yo', label: 'Yorùbá' },
                { code: 'ig', label: 'Asụsụ Igbo' },
                { code: 'ha', label: 'Harshen Hausa' },
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code as AppLanguage)}
                  className={`p-2 rounded-xl text-xs font-bold transition-all ${
                    lang === l.code
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 space-y-2">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Student Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Parent Phone Number</label>
              <input
                type="text"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xl focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Message Preview & Action */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Message Preview ({lang.toUpperCase()})
              </span>
              <span className="text-xs text-gray-400 font-mono">{currentMessage.length} Characters</span>
            </div>

            <div className="mt-4 p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200 text-sm text-gray-800 leading-relaxed font-sans">
              {currentMessage}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Copy className="w-4 h-4" />
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-2 shadow-xs transition-all hover:scale-105"
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
