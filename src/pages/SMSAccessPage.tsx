import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Send,
  RotateCcw,
  CheckCircle2,
  Clock,
  Radio,
  BookOpen,
  HelpCircle,
  CalendarCheck2,
  PhoneCall,
  Hash,
  Download,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SmsLogItem {
  id: string;
  senderPhone: string;
  carrier: 'MTN NG' | 'Airtel Nigeria' | 'Glo Mobile' | '9mobile';
  inboundText: string;
  outboundParts: string[];
  segments: number;
  status: 'DELIVERED' | 'PROCESSED' | 'QUEUED';
  timestamp: string;
}

export const SMSAccessPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'ussd' | 'subscribers' | 'logs'>('simulator');
  const [phoneScreenState, setPhoneScreenState] = useState<'idle' | 'typing' | 'sending' | 'received'>('idle');
  const [inputCommand, setInputCommand] = useState('PLAN MATH JSS1 WEEK3');
  const [carrier, setCarrier] = useState<'MTN NG' | 'Airtel Nigeria' | 'Glo Mobile' | '9mobile'>('MTN NG');
  const [phoneNumber, setPhoneNumber] = useState('0803 456 7890');
  const [responseParts, setResponseParts] = useState<string[]>([]);
  const [activePartIndex, setActivePartIndex] = useState(0);

  // USSD State
  const [ussdInput, setUssdInput] = useState('*384*234#');
  const [ussdStep, setUssdStep] = useState<number>(0);
  const [ussdDisplay, setUssdDisplay] = useState<string>('EduPlan NG Offline Portal\n1. Get Lesson Plan\n2. Scheme of Work\n3. WAEC Past Question\n4. Today\'s Teaching Tip\n0. Exit');

  // Logs state
  const [smsLogs, setSmsLogs] = useState<SmsLogItem[]>([
    {
      id: 'sms_9012',
      senderPhone: '+234 803 234 5678',
      carrier: 'MTN NG',
      inboundText: 'PLAN MATH JSS1 WEEK3',
      outboundParts: [
        'EduPlan NG [1/2] Math JSS1 Wk3: Fractions & Decimals. Obj: 1) Convert mixed fractions to decimals 2) Solve 4 arithmetic word problems.',
        'EduPlan NG [2/2] Teacher: Use real market prices (Balogun). Drill: Convert 3 1/4 to 3.25. Assign: Ex 3.2 Q1-5. Text: NERDC Bk 1.'
      ],
      segments: 2,
      status: 'DELIVERED',
      timestamp: '2 mins ago'
    },
    {
      id: 'sms_9011',
      senderPhone: '+234 812 987 6543',
      carrier: 'Airtel Nigeria',
      inboundText: 'WAEC MATH 2024',
      outboundParts: [
        'EduPlan NG: WAEC 2024 Math Q1: Solve 3^(2x-1)=81. Ans: x=2.5. Explanation: 81=3^4. 2x-1=4 => 2x=5 => x=2.5. (NERDC indices)'
      ],
      segments: 1,
      status: 'DELIVERED',
      timestamp: '14 mins ago'
    },
    {
      id: 'sms_9010',
      senderPhone: '+234 805 111 2233',
      carrier: 'Glo Mobile',
      inboundText: 'SCHEME BST JSS2',
      outboundParts: [
        'EduPlan NG: BST JSS2 1st Term Scheme: Wk1 Work, Energy & Power; Wk2 Simple Machines; Wk3 Friction; Wk4 Habitat; Wk5 Adaptation; Wk6 MidTerm.'
      ],
      segments: 1,
      status: 'DELIVERED',
      timestamp: '1 hour ago'
    }
  ]);

  // Daily Digest Subscriptions
  const [digestPhone, setDigestPhone] = useState('0802 334 4556');
  const [digestLevel, setDigestLevel] = useState('jss-1');
  const [digestSubject, setDigestSubject] = useState('Mathematics');
  const [digestSubscribed, setDigestSubscribed] = useState(false);

  const executeSmsCommand = async (cmdToRun?: string) => {
    const cmd = (cmdToRun || inputCommand).trim().toUpperCase();
    setPhoneScreenState('sending');

    try {
      const res = await fetch('/api/sms/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          command: cmd,
          phoneNumber,
          carrier
        })
      });

      const data = await res.json();
      if (data.parts && data.parts.length > 0) {
        setResponseParts(data.parts);
        setActivePartIndex(0);
        setPhoneScreenState('received');

        // Add to live log
        const newLog: SmsLogItem = {
          id: `sms_${Date.now().toString().slice(-4)}`,
          senderPhone: phoneNumber,
          carrier,
          inboundText: cmd,
          outboundParts: data.parts,
          segments: data.parts.length,
          status: 'DELIVERED',
          timestamp: 'Just now'
        };
        setSmsLogs([newLog, ...smsLogs]);
        confetti({ particleCount: 30, spread: 40 });
      } else {
        setResponseParts(['EduPlan NG: Unknown SMS command. Reply HELP for instructions. E.g. PLAN MATH JSS1']);
        setPhoneScreenState('received');
      }
    } catch (e) {
      // Offline fallback simulator
      const mockParts = generateOfflineSms(cmd);
      setResponseParts(mockParts);
      setActivePartIndex(0);
      setPhoneScreenState('received');
    }
  };

  const generateOfflineSms = (cmd: string): string[] => {
    if (cmd.startsWith('PLAN')) {
      return [
        'EduPlan NG [1/2] NERDC Plan: ' + cmd + '. Obj: 1) State statutory definitions 2) Solve 3 classroom drills with Nigerian context.',
        'EduPlan NG [2/2] Steps: Intro 5m, Teacher demo 15m, Student pairs 10m, Eval 10m. Text: NERDC Syllabus. End of lesson.'
      ];
    }
    if (cmd.startsWith('WAEC')) {
      return [
        'EduPlan NG WAEC Drill: Solve for x: 3^(2x-1)=81. Options: A)2 B)2.5 C)3 D)5. Ans: B (2.5). Exp: 81=3^4, 2x-1=4, x=2.5.'
      ];
    }
    if (cmd.startsWith('SCHEME')) {
      return [
        'EduPlan NG Scheme: Wk1 Intro, Wk2 Formulae, Wk3 Worked examples, Wk4 Practical, Wk5 Review, Wk6 Mid-Term, Wk7 Applications.'
      ];
    }
    return [
      'EduPlan NG SMS Guide: 1) PLAN [SUBJ] [LVL] [WK] (e.g. PLAN MATH JSS1) 2) WAEC [SUBJ] 3) SCHEME [SUBJ] [LVL] 4) HELP. Shortcode: 38120.'
    ];
  };

  const handleUssdSubmit = (choice: string) => {
    if (ussdStep === 0) {
      if (choice === '1') {
        setUssdDisplay('Select Class Level:\n1. JSS 1\n2. JSS 2\n3. JSS 3\n4. SSS 1\n5. SSS 2\n6. SSS 3\n9. Back');
        setUssdStep(1);
      } else if (choice === '2') {
        setUssdDisplay('Select Term:\n1. First Term (Weeks 1-13)\n2. Second Term\n3. Third Term\n9. Back');
        setUssdStep(2);
      } else if (choice === '3') {
        setUssdDisplay('WAEC 2024 Practice:\nQ: A bag of rice costs N75,000, sold at 15% profit. SP?\n1. N82,500\n2. N86,250\n3. N88,000\nReply with answer');
        setUssdStep(3);
      } else if (choice === '4') {
        setUssdDisplay('Today\'s Teaching Tip:\n"For classes of 60+, always write 2 teaser review questions on board before bell rings."\n0. Main Menu');
        setUssdStep(4);
      } else {
        setUssdDisplay('Thank you for using EduPlan NG USSD. Dial *384*234# anytime.');
        setUssdStep(99);
      }
    } else if (ussdStep === 1) {
      setUssdDisplay('JSS 1 Lesson Plans:\nWeek 3: Algebraic Fractions\nObjectives: 2\nDuration: 40m\nSMS with full note sent to your phone!\n0. Exit');
      setUssdStep(99);
    } else if (ussdStep === 3) {
      if (choice === '2') {
        setUssdDisplay('Correct! Profit=15% of 75k=11,250. SP=N86,250 (+10 XP)\n0. Exit');
      } else {
        setUssdDisplay('Incorrect. Correct is 2 (N86,250). Profit is N11,250 added to CP.\n0. Exit');
      }
      setUssdStep(99);
    } else {
      setUssdDisplay('EduPlan NG Offline Portal\n1. Get Lesson Plan\n2. Scheme of Work\n3. WAEC Past Question\n4. Today\'s Teaching Tip\n0. Exit');
      setUssdStep(0);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 tracking-wider">
              Offline Equity & Inclusivity
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
              GSM 2G Standard
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mt-1.5 flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-emerald-600" />
            <span>EduPlan SMS & USSD Access for Basic Phones</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1 max-w-2xl">
            Over 45% of rural Nigerian educators use basic feature phones (Nokia/Tecno) with intermittent 2G coverage.
            EduPlan NG provides 2-way SMS curriculum query and USSD gateway (<code className="bg-gray-100 px-1 py-0.5 rounded font-mono">*384*234#</code>),
            delivering NERDC lesson plans directly to any handset without mobile data.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 text-xs">
            <span className="block font-bold text-[10px] uppercase text-emerald-700">Toll-Free Shortcode</span>
            <span className="text-base font-black font-mono">38120</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
            activeTab === 'simulator' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>Interactive Phone Simulator</span>
        </button>

        <button
          onClick={() => setActiveTab('ussd')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
            activeTab === 'ussd' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Hash className="w-4 h-4" />
          <span>USSD Gateway (*384*234#)</span>
        </button>

        <button
          onClick={() => setActiveTab('subscribers')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
            activeTab === 'subscribers' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>Scheduled SMS Digests</span>
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
            activeTab === 'logs' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Live Gateway Logs ({smsLogs.length})</span>
        </button>
      </div>

      {/* TAB 1: PHONE SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Basic Phone Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-[300px] bg-slate-800 rounded-[44px] p-5 shadow-2xl border-4 border-slate-700 relative text-slate-100">
              {/* Phone Speaker */}
              <div className="w-16 h-1.5 bg-slate-600 rounded-full mx-auto mb-4" />

              {/* Branding */}
              <div className="text-center mb-2">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase">
                  TECNO T301 • {carrier}
                </span>
              </div>

              {/* Monochrome LCD Screen (Retro Greenish Backlight) */}
              <div className="bg-[#8fae85] text-[#1b2f15] font-mono p-3.5 rounded-xl border-2 border-[#76936c] shadow-inner min-h-[220px] flex flex-col justify-between select-none">
                {/* Screen Header Bar */}
                <div className="flex items-center justify-between text-[10px] pb-1 border-b border-[#76936c]/60">
                  <span className="font-bold flex items-center gap-1">
                    <span>▲</span> 38120
                  </span>
                  <span>{responseParts.length > 0 ? `SMS ${activePartIndex + 1}/${responseParts.length}` : 'SMS 1/1'}</span>
                </div>

                {/* Screen Content Body */}
                <div className="py-2 flex-1 text-[11px] leading-tight flex flex-col justify-center">
                  {phoneScreenState === 'idle' && (
                    <div className="text-center space-y-1">
                      <p className="font-bold">EDUPAN NG SMS</p>
                      <p className="text-[10px]">Type command & press Send to receive curriculum.</p>
                      <p className="text-[9px] opacity-80">E.g. PLAN MATH JSS1</p>
                    </div>
                  )}

                  {phoneScreenState === 'typing' && (
                    <div>
                      <p className="text-[9px] opacity-75">Message:</p>
                      <p className="font-bold text-[11px] break-all">{inputCommand}_</p>
                    </div>
                  )}

                  {phoneScreenState === 'sending' && (
                    <div className="text-center py-4 space-y-1">
                      <p className="animate-pulse font-bold">SENDING SMS...</p>
                      <p className="text-[10px]">Connecting to {carrier} tower...</p>
                    </div>
                  )}

                  {phoneScreenState === 'received' && responseParts.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-[9.5px] leading-snug">
                        {responseParts[activePartIndex]}
                      </p>
                    </div>
                  )}
                </div>

                {/* Screen Footer Pagination */}
                <div className="pt-1 border-t border-[#76936c]/60 flex items-center justify-between text-[9px] font-bold">
                  {phoneScreenState === 'received' && responseParts.length > 1 ? (
                    <>
                      <button
                        onClick={() => setActivePartIndex((prev) => Math.max(0, prev - 1))}
                        className="hover:underline"
                        disabled={activePartIndex === 0}
                      >
                        [◄ Prev]
                      </button>
                      <span>Part {activePartIndex + 1}/{responseParts.length}</span>
                      <button
                        onClick={() => setActivePartIndex((prev) => Math.min(responseParts.length - 1, prev + 1))}
                        className="hover:underline"
                        disabled={activePartIndex === responseParts.length - 1}
                      >
                        [Next ►]
                      </button>
                    </>
                  ) : (
                    <>
                      <span>Options</span>
                      <span>Back</span>
                    </>
                  )}
                </div>
              </div>

              {/* Hardware Navigation & Keypad */}
              <div className="mt-4 space-y-2">
                {/* Softkeys */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <button
                    onClick={() => executeSmsCommand()}
                    className="bg-emerald-700 hover:bg-emerald-600 text-white p-2 rounded-lg font-bold shadow-xs active:translate-y-0.5"
                    title="Send SMS"
                  >
                    SEND
                  </button>
                  <div className="w-8 h-8 rounded-full border-2 border-slate-600 mx-auto flex items-center justify-center text-[10px] text-slate-400">
                    OK
                  </div>
                  <button
                    onClick={() => {
                      setPhoneScreenState('idle');
                      setResponseParts([]);
                    }}
                    className="bg-rose-800 hover:bg-rose-700 text-white p-2 rounded-lg font-bold shadow-xs active:translate-y-0.5"
                    title="Clear Screen"
                  >
                    END
                  </button>
                </div>

                {/* Numeric Keypad Grid */}
                <div className="grid grid-cols-3 gap-1.5 pt-2 text-center">
                  {[
                    { num: '1', sub: '. , ?' },
                    { num: '2', sub: 'ABC' },
                    { num: '3', sub: 'DEF' },
                    { num: '4', sub: 'GHI' },
                    { num: '5', sub: 'JKL' },
                    { num: '6', sub: 'MNO' },
                    { num: '7', sub: 'PQRS' },
                    { num: '8', sub: 'TUV' },
                    { num: '9', sub: 'WXYZ' },
                    { num: '*', sub: 'SYM' },
                    { num: '0', sub: 'SPACE' },
                    { num: '#', sub: 'CAPS' }
                  ].map((k) => (
                    <div
                      key={k.num}
                      className="bg-slate-700/80 hover:bg-slate-700 p-1.5 rounded-lg border border-slate-600/60 cursor-pointer active:scale-95 transition select-none"
                    >
                      <div className="font-bold text-xs">{k.num}</div>
                      <div className="text-[8px] text-slate-400">{k.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Controller & Command Palette */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-600" />
                <span>Simulate Teacher Outgoing SMS Query</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Teacher Phone Number</label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Nigerian Telco Network</label>
                  <select
                    value={carrier}
                    onChange={(e) => setCarrier(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none bg-white font-medium"
                  >
                    <option value="MTN NG">MTN Nigeria (0803, 0806, 0814)</option>
                    <option value="Airtel Nigeria">Airtel Nigeria (0802, 0808, 0812)</option>
                    <option value="Glo Mobile">Globacom (0805, 0807, 0815)</option>
                    <option value="9mobile">9mobile (0809, 0817, 0818)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-600 font-semibold mb-1 text-xs">
                  SMS Message Body (Standard GSM 03.38)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputCommand}
                    onChange={(e) => {
                      setInputCommand(e.target.value);
                      setPhoneScreenState('typing');
                    }}
                    placeholder="E.g. PLAN MATH JSS1 WEEK3"
                    className="flex-1 px-3.5 py-2.5 border border-gray-200 rounded-xl font-mono text-xs focus:outline-none"
                  />
                  <button
                    onClick={() => executeSmsCommand()}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send SMS</span>
                  </button>
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px] text-gray-500">
                  <span>Character count: {inputCommand.length} / 160 characters</span>
                  <span>Shortcode: 38120 (Zero data charge)</span>
                </div>
              </div>

              {/* Quick Preset Commands */}
              <div>
                <span className="text-[11px] font-bold text-gray-700 block mb-2 uppercase tracking-wider">
                  Quick Teacher Command Shortcuts (Click to Test):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { label: 'PLAN MATH JSS1 WEEK3', desc: 'Get Week 3 Algebra lesson plan' },
                    { label: 'PLAN ENG SSS2 WEEK2', desc: 'Summary Writing lesson plan' },
                    { label: 'WAEC MATH 2024', desc: 'Practice WAEC 2024 Question 1' },
                    { label: 'WAEC ENG 2024', desc: 'Concord & lexis past question' },
                    { label: 'SCHEME BST JSS2', desc: 'First Term 13-week Scheme of Work' },
                    { label: 'HELP', desc: 'Full SMS command reference' }
                  ].map((p) => (
                    <button
                      key={p.label}
                      onClick={() => {
                        setInputCommand(p.label);
                        executeSmsCommand(p.label);
                      }}
                      className="text-left p-2.5 rounded-xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/60 transition group"
                    >
                      <div className="font-mono font-bold text-emerald-800 text-[11px] group-hover:text-emerald-950">
                        {p.label}
                      </div>
                      <div className="text-[10px] text-gray-500">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Architecture Explanation */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-gray-200 text-xs text-gray-600 space-y-2">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <Info className="w-4 h-4 text-emerald-600" />
                <span>How Nigerian Rural Teachers Rely on EduPlan SMS</span>
              </div>
              <p>
                In remote communities across Adamawa, Taraba, Sokoto, and rural Oyo, teachers often lack 3G/4G connectivity.
                EduPlan NG connects through local SMPP telco interconnects (Termii & Africa's Talking), allowing teachers to text
                their weekly topic to <span className="font-mono font-bold text-gray-800">38120</span>.
                Within 5 seconds, an optimized 2-part SMS containing NERDC behavioral objectives, chalkboard exercises, and homework
                arrives directly on their torchlight feature phone.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USSD GATEWAY (*384*234#) */}
      {activeTab === 'ussd' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold text-gray-900">EduPlan NG USSD Gateway (*384*234#)</h2>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Live Telco Session
              </span>
            </div>

            {/* USSD Modal Dialog Representation */}
            <div className="bg-slate-900 text-emerald-400 font-mono p-6 rounded-2xl shadow-xl border border-slate-800 space-y-4">
              <div className="text-xs text-slate-400 flex items-center justify-between border-b border-slate-800 pb-2">
                <span>USSD Service: *384*234#</span>
                <span>Session Active</span>
              </div>

              <div className="text-sm whitespace-pre-line leading-relaxed text-slate-100">
                {ussdDisplay}
              </div>

              {ussdStep !== 99 && (
                <div className="pt-2 flex gap-2">
                  <input
                    type="text"
                    id="ussd-response"
                    placeholder="Enter choice (e.g. 1)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = (e.target as HTMLInputElement).value;
                        handleUssdSubmit(val);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                    className="flex-1 bg-slate-800 text-white px-3 py-2 rounded-xl text-xs border border-slate-700 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                  <button
                    onClick={() => {
                      const el = document.getElementById('ussd-response') as HTMLInputElement;
                      if (el) {
                        handleUssdSubmit(el.value);
                        el.value = '';
                      }
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                  >
                    Reply
                  </button>
                </div>
              )}

              {ussdStep === 99 && (
                <button
                  onClick={() => handleUssdSubmit('')}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
                >
                  Restart USSD Session (*384*234#)
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SCHEDULED DAILY DIGEST */}
      {activeTab === 'subscribers' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900">Daily Morning SMS Lesson Digest</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Automatically receive daily curriculum outlines at 7:00 AM every school morning.
              </p>
            </div>

            {digestSubscribed && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold">Active Digest Subscription</p>
                  <p className="text-[11px] text-emerald-700">
                    Your line ({digestPhone}) will receive daily {digestLevel.toUpperCase()} {digestSubject} teaching outlines at 7:00 AM.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Mobile Phone Number</label>
                <input
                  type="text"
                  value={digestPhone}
                  onChange={(e) => setDigestPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl font-mono focus:outline-none"
                  placeholder="0803 123 4567"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Teaching Class Level</label>
                  <select
                    value={digestLevel}
                    onChange={(e) => setDigestLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none bg-white font-medium"
                  >
                    <option value="jss-1">JSS 1</option>
                    <option value="jss-2">JSS 2</option>
                    <option value="jss-3">JSS 3</option>
                    <option value="sss-1">SSS 1</option>
                    <option value="sss-2">SSS 2</option>
                    <option value="sss-3">SSS 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Subject</label>
                  <select
                    value={digestSubject}
                    onChange={(e) => setDigestSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none bg-white font-medium"
                  >
                    <option value="Mathematics">General Mathematics</option>
                    <option value="English Studies">English Studies</option>
                    <option value="Basic Science">Basic Science & Technology</option>
                    <option value="Civic Education">Civic Education</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setDigestSubscribed(!digestSubscribed);
                    confetti({ particleCount: 40 });
                  }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs transition"
                >
                  {digestSubscribed ? 'Update SMS Digest Preferences' : 'Enable Daily 7:00 AM SMS Digest'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LIVE GATEWAY LOGS */}
      {activeTab === 'logs' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-gray-900">Telco SMS Dispatch Gateway Logs</h2>
              <p className="text-xs text-gray-500">Real-time audit record of 2-way SMS curriculum transmissions</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              Gateway Uptime: 99.98%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Log ID</th>
                  <th className="py-2.5 px-3">Phone & Carrier</th>
                  <th className="py-2.5 px-3">Teacher Command</th>
                  <th className="py-2.5 px-3">Response Preview</th>
                  <th className="py-2.5 px-3">Segments</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {smsLogs.map((l) => (
                  <tr key={l.id} className="hover:bg-gray-50/80">
                    <td className="py-2.5 px-3 font-mono text-[11px] text-gray-500">{l.id}</td>
                    <td className="py-2.5 px-3">
                      <div className="font-mono text-gray-900">{l.senderPhone}</div>
                      <div className="text-[10px] text-gray-500">{l.carrier}</div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-emerald-800 font-bold">{l.inboundText}</td>
                    <td className="py-2.5 px-3 max-w-xs truncate text-gray-600">{l.outboundParts[0]}</td>
                    <td className="py-2.5 px-3 font-mono">{l.segments}x 160c</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {l.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-gray-400 text-[11px]">{l.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
