import React, { useState } from 'react';
import {
  Sparkles,
  MessageSquare,
  Bot,
  Brain,
  Volume2,
  Share2,
  Copy,
  Check,
  Send,
  RefreshCw,
  Sliders,
  Layers,
  ArrowRight,
  BookOpen,
  HelpCircle,
  AlertCircle,
  FileText,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DashboardStats, TeacherUser } from '../types/index.ts';
import { getAuthHeaders } from '../lib/api.ts';
import { resolveClientTierSummary, canTierAccess } from '../config/pricing.ts';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

interface AIPedagogicalCoPilotPageProps {
  user?: TeacherUser | null;
  stats?: DashboardStats | null;
  onOpenUpgrade?: (message: string, requiredTier?: string, title?: string) => void;
}

export const AIPedagogicalCoPilotPage: React.FC<AIPedagogicalCoPilotPageProps> = ({
  user,
  stats,
  onOpenUpgrade,
}) => {
  const tierSummary = resolveClientTierSummary(user, stats);
  const senAccess = canTierAccess(tierSummary.tierId, 'sen_module');
  const [activeTab, setActiveTab] = useState<'simulator' | 'feynman' | 'flipped' | 'reflection' | 'differentiated'>('simulator');

  // 1. Simulator State
  const [simTopic, setSimTopic] = useState('Commercial Profit Margin & Realia');
  const [simSubject, setSimSubject] = useState('Mathematics');
  const [simLevel, setSimLevel] = useState('SSS 2');
  const [simInput, setSimInput] = useState('');
  const [simHistory, setSimHistory] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Good morning sir/ma! We are ready for today's lesson, but please don't just write formulas on the board. Exactly why does this concept matter when buying goods in Balogun market? Prove it to us!"
    }
  ]);
  const [isSimLoading, setIsSimLoading] = useState(false);

  // 2. Feynman Bot State
  const [feynmanTopic, setFeynmanTopic] = useState('Photosynthesis in Tropical Plants');
  const [feynmanInput, setFeynmanInput] = useState('');
  const [feynmanHistory, setFeynmanHistory] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hello! I'm 10 years old. My teacher told me plants eat sunlight, but I'm confused! How can something eat light? Can you explain it to me without using big science words?"
    }
  ]);
  const [isFeynmanLoading, setIsFeynmanLoading] = useState(false);

  // 3. Flipped Classroom State
  const [flippedTopic, setFlippedTopic] = useState('Electric Current & Ohm\'s Law in Inverter Circuits');
  const [flippedSubject, setFlippedSubject] = useState('Physics');
  const [flippedLevel, setFlippedLevel] = useState('SSS 2');
  const [flippedScript, setFlippedScript] = useState<any>(null);
  const [isFlippedLoading, setIsFlippedLoading] = useState(false);
  const [copiedFlipped, setCopiedFlipped] = useState(false);

  // 4. Post-Class Reflection State
  const [refTopic, setRefTopic] = useState('Quadratic Equations by Factorization');
  const [refObservations, setRefObservations] = useState('Students understood the definition, but when signs were negative (e.g. x² - 5x + 6 = 0), half the class confused -2 and -3. Pacing dragged and I ran out of time for independent practice.');
  const [reflectionResult, setReflectionResult] = useState<any>(null);
  const [isReflecting, setIsReflecting] = useState(false);

  // 5. Differentiated Tasks State
  const [diffTopic, setDiffTopic] = useState('Fractions, Decimals & Market Transactions');
  const [diffSubject, setDiffSubject] = useState('Mathematics');
  const [diffLevel, setDiffLevel] = useState('JSS 1');
  const [diffTasks, setDiffTasks] = useState<any>({
    remedialTask: 'Tier 1 (Remedial Task): Scaffolded step-by-step practice worksheet on "Fractions & Decimals" with predefined decimal conversion templates, colored visual aids, and 2 supported peer-guided worked examples.',
    standardTask: 'Tier 2 (Standard Task): Independent core NERDC curriculum exercise on "Fractions & Decimals" solving 5 textbook questions requiring conversion and Balogun market price calculations.',
    advancedTask: 'Tier 3 (Advanced Task): Non-routine synthesis inquiry on "Fractions & Decimals" calculating multi-tier compound discount margins for a commercial wholesale distributor.'
  });
  const [isDiffLoading, setIsDiffLoading] = useState(false);

  const handleTierOrQuotaResponse = async (res: Response, fallbackTier: string, featureTitle: string): Promise<boolean> => {
    if (res.status !== 403 && res.status !== 429) return false;
    const errData = await res.json().catch(() => ({}));
    onOpenUpgrade?.(
      errData?.error || errData?.message || 'Your current subscription tier quota or feature gate does not include this tool.',
      errData?.requiredTier || fallbackTier,
      res.status === 403 ? featureTitle : 'AI Generation Quota Reached'
    );
    return true;
  };

  // Handlers
  const handleSendSimulator = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!simInput.trim() || isSimLoading) return;
    const userMsg = simInput.trim();
    setSimInput('');
    const updatedHistory: ChatMessage[] = [...simHistory, { role: 'user', text: userMsg }];
    setSimHistory(updatedHistory);
    setIsSimLoading(true);

    try {
      const res = await fetch('/api/ai/simulate-classroom', {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify({
          message: userMsg,
          history: updatedHistory,
          topic: simTopic,
          subject: simSubject,
          level: simLevel,
        }),
      });
      if (await handleTierOrQuotaResponse(res, 'b2c_termly', 'Classroom Simulator Upgrade')) {
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data && data.reply) {
        setSimHistory((prev) => [...prev, { role: 'model', text: data.reply }]);
      } else {
        setSimHistory((prev) => [
          ...prev,
          {
            role: 'model',
            text: `Sir/Ma, I hear what you just explained, but how does that apply if a market woman in Balogun is doing inventory? Could you break down the formula step by step on the chalkboard?`
          }
        ]);
      }
    } catch (err) {
      console.error(err);
      setSimHistory((prev) => [
        ...prev,
        {
          role: 'model',
          text: `Excuse me teacher, what if the given conditions change during a WAEC theory exam? Why didn't you account for that exception in your definition?`
        }
      ]);
    } finally {
      setIsSimLoading(false);
    }
  };

  const handleSendFeynman = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feynmanInput.trim() || isFeynmanLoading) return;
    const userMsg = feynmanInput.trim();
    setFeynmanInput('');
    const updatedHistory: ChatMessage[] = [...feynmanHistory, { role: 'user', text: userMsg }];
    setFeynmanHistory(updatedHistory);
    setIsFeynmanLoading(true);

    try {
      const res = await fetch('/api/ai/feynman-test', {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify({
          message: userMsg,
          history: updatedHistory,
          topic: feynmanTopic,
        }),
      });
      if (await handleTierOrQuotaResponse(res, 'b2c_termly', 'Feynman Bot Upgrade')) {
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data && data.reply) {
        setFeynmanHistory((prev) => [...prev, { role: 'model', text: data.reply }]);
      } else {
        setFeynmanHistory((prev) => [
          ...prev,
          {
            role: 'model',
            text: "I'm still a bit confused! That sounds like big words from an adult textbook. What would I see with my own eyes if it was happening in front of me?"
          }
        ]);
      }
    } catch (err) {
      console.error(err);
      setFeynmanHistory((prev) => [
        ...prev,
        {
          role: 'model',
          text: "I don't understand the big technical words! Can you explain it using chin-chin, mangoes, or a football match?"
        }
      ]);
    } finally {
      setIsFeynmanLoading(false);
    }
  };

  const handleGenerateFlipped = async () => {
    setIsFlippedLoading(true);
    try {
      const res = await fetch('/api/ai/flipped-classroom', {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify({
          topic: flippedTopic,
          subject: flippedSubject,
          level: flippedLevel,
        }),
      });
      if (await handleTierOrQuotaResponse(res, 'b2c_termly', 'Flipped Classroom Upgrade')) {
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data && data.success) {
        setFlippedScript(data);
        confetti({ particleCount: 70, spread: 60 });
      } else {
        throw new Error('API returned fallback needed');
      }
    } catch (err) {
      console.warn('Flipped classroom fallback generation activated:', err);
      const fallbackData = {
        success: true,
        topic: flippedTopic,
        subject: flippedSubject,
        level: flippedLevel,
        durationMinutes: 3,
        whatsappAudioScript: `🎙️ [START AUDIO VOICE NOTE — 3 MINUTES]\n\n"Good evening class! This is your ${flippedSubject} teacher. Tomorrow morning in first period, we are tackling a critical topic: *${flippedTopic}*.\n\nBefore you step into the classroom, listen closely to this 3-minute voice note so you already have an advantage.\n\nHave you ever wondered how fundamental rules govern interactions and balance in our daily Nigerian environment—like commercial transactions in Balogun market or electrical currents during a power surge? That exact principle is governed by *${flippedTopic}*.\n\nUnder the NERDC curriculum, WAEC tests this concept almost every single year in Paper 2 theory.\n\nHere is what I want everyone to do tonight:\n1. Open your ${flippedSubject} notebook to a fresh page and write the heading: *${flippedTopic} — Pre-Class Inquiry*.\n2. Think of ONE real-life example you have seen in your home, street, or school that shows this concept in action.\n3. Write down your prediction to this teaser challenge: If we double the initial input under standard conditions, what do you predict will happen to the result?\n\nTomorrow, we will test your hypotheses on the chalkboard during Step 2. Have a wonderful evening and see you in class at 8:00 AM!"\n\n🎙️ [END AUDIO VOICE NOTE]`,
        formattedWhatsAppMessage: `📢 *PRE-CLASS ANNOUNCEMENT: ${flippedSubject.toUpperCase()} (${flippedLevel})*\n\n📌 *Topic:* ${flippedTopic}\n⏱️ *Duration:* 3-Minute Voice Note\n\nListen to the 3-minute voice note and write your answer to the teaser question in your notebook before 8:00 AM tomorrow!\n\n_Sent via EduPlan NG Flipped Classroom Autopilot_`,
      };
      setFlippedScript(fallbackData);
      confetti({ particleCount: 40, spread: 50 });
    } finally {
      setIsFlippedLoading(false);
    }
  };

  const handleRunReflection = async () => {
    setIsReflecting(true);
    try {
      const res = await fetch('/api/ai/reflect', {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify({
          lessonTopic: refTopic,
          teacherObservations: refObservations,
        }),
      });
      if (await handleTierOrQuotaResponse(res, 'b2c_termly', 'Post-Class Reflection Upgrade')) {
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data && data.success) {
        setReflectionResult(data);
        confetti({ particleCount: 60, spread: 50 });
      } else {
        throw new Error('Fallback needed');
      }
    } catch (err) {
      console.warn('Reflection fallback activated:', err);
      const fallbackResult = {
        success: true,
        lessonTopic: refTopic,
        adviceList: [
          `1. Scaffold Sign Inversion with Concrete Color Coding: Spend the first 5 minutes of tomorrow's lesson running a 2-question chalkboard drill highlighting operational signs in colored chalk to fix the negative coefficient confusion.`,
          `2. Transition to Timed Desk-Partner Pairs: Prevent pacing drag by allocating strictly 90 seconds for think-pair-share before whole-class feedback.`,
          `3. End with a 3-Minute Individual Exit Ticket: Verify that 100% of learners can independently factorize equations without sign errors before leaving the classroom.`
        ],
        fullPedagogicalGuidance: `Based on your observations during "${refTopic}", students demonstrated initial conceptual acquisition but struggled during algebraic sign reduction. Implementing immediate row-leader peer checks will eliminate student hesitation and guarantee full OEQA presentation compliance.`
      };
      setReflectionResult(fallbackResult);
      confetti({ particleCount: 40, spread: 45 });
    } finally {
      setIsReflecting(false);
    }
  };

  const handleFetchDifferentiated = async () => {
    if (!senAccess.allowed) {
      onOpenUpgrade?.(
        senAccess.upgradeMessage || 'SEN Differentiated Tasks Matrix requires School Silver (₦120,000/term) or State Ministry Platinum.',
        senAccess.requiredTier || 'b2b_silver',
        'SEN Differentiated Matrix Locked'
      );
      return;
    }
    setIsDiffLoading(true);
    try {
      const res = await fetch('/api/ai/differentiated-tasks', {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify({
          topic: diffTopic,
          subject: diffSubject,
          level: diffLevel,
        }),
      });
      if (await handleTierOrQuotaResponse(res, 'b2b_silver', 'SEN Differentiated Matrix Locked')) {
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data && data.success) {
        setDiffTasks(data);
        confetti({ particleCount: 50, spread: 45 });
      } else {
        throw new Error('Fallback needed');
      }
    } catch (err) {
      console.warn('Differentiated tasks fallback activated:', err);
      setDiffTasks({
        remedialTask: `Tier 1 (Remedial Task): Scaffolded step-by-step practice worksheet on "${diffTopic}" with predefined formula templates, visual vocabulary prompts, and 2 supported peer-guided worked examples.`,
        standardTask: `Tier 2 (Standard Task): Independent core NERDC curriculum exercise on "${diffTopic}" solving 5 textbook questions requiring accurate formula substitution and Nigerian contextual problem-solving.`,
        advancedTask: `Tier 3 (Advanced Task): Non-routine synthesis inquiry or multi-step extension on "${diffTopic}" formulating an original real-world case study or leading a classroom chalkboard demonstration.`
      });
    } finally {
      setIsDiffLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-150">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Pedagogical Co-Pilot · {tierSummary.config.name}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Teacher Pedagogical Mastery & Simulator Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Hone your instructional clarity before walking into class. Challenge simulated inquisitive students, test jargon with the Feynman Bot, auto-generate WhatsApp flipped classroom scripts, and produce 3-tier differentiated tasks.
            </p>
          </div>
          <div className="shrink-0 px-3.5 py-2 rounded-2xl bg-white/10 border border-white/15 text-xs font-bold text-slate-100">
            AI Quota:{' '}
            <span className="text-amber-300">
              {tierSummary.maxGenerationsTotal !== null
                ? `${tierSummary.totalGenerated}/${tierSummary.maxGenerationsTotal} total`
                : `${tierSummary.usedToday}/${tierSummary.dailyFairUseCap} today`}
            </span>
          </div>
        </div>

        {/* Feature Tabs */}
        <div className="flex items-center gap-2 pt-6 mt-6 border-t border-white/10 overflow-x-auto">
          {[
            { id: 'simulator', label: 'Classroom Simulator (Challenging Student)', icon: Bot, locked: false },
            { id: 'feynman', label: 'Feynman Bot (10-Year-Old Jargon Test)', icon: Brain, locked: false },
            { id: 'flipped', label: 'Flipped Classroom (WhatsApp Script)', icon: Volume2, locked: false },
            { id: 'reflection', label: 'Post-Class 3-Point Reflection', icon: HelpCircle, locked: false },
            { id: 'differentiated', label: 'Differentiated Tasks Matrix (SEN)', icon: Layers, locked: !senAccess.allowed },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  active
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.locked && <Lock className="w-3.5 h-3.5 text-amber-300" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: Classroom Simulator */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 lg:col-span-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Simulation Scenario Parameters
            </span>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Concept to Explain</label>
                <input
                  type="text"
                  value={simTopic}
                  onChange={(e) => setSimTopic(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject</label>
                  <input
                    type="text"
                    value={simSubject}
                    onChange={(e) => setSimSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Level</label>
                  <input
                    type="text"
                    value={simLevel}
                    onChange={(e) => setSimLevel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] text-amber-900 space-y-1">
              <span className="font-bold block">AI Student Behavior:</span>
              <p>Act as a challenging Nigerian secondary school student. Will ask difficult, realistic questions and refuse vague answers until explanations are crystal clear.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col justify-between overflow-hidden lg:col-span-2 min-h-[460px]">
            {/* Chat Messages */}
            <div className="p-6 space-y-4 overflow-y-auto max-h-[380px]">
              {simHistory.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                      👨🏾‍🎓
                    </div>
                  )}
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/80'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isSimLoading && (
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Student is raising their hand to challenge...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendSimulator} className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={simInput}
                onChange={(e) => setSimInput(e.target.value)}
                placeholder="Explain the concept to the student in clear Nigerian terms..."
                className="flex-1 text-xs bg-white border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-600/30"
              />
              <button
                type="submit"
                disabled={isSimLoading || !simInput.trim()}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Explain</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: Feynman Bot */}
      {activeTab === 'feynman' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 lg:col-span-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Feynman Jargon Eliminator
            </span>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Topic to Simplify</label>
                <input
                  type="text"
                  value={feynmanTopic}
                  onChange={(e) => setFeynmanTopic(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                />
              </div>
            </div>

            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-[11px] text-emerald-900 space-y-1">
              <span className="font-bold block">Richard Feynman Principle:</span>
              <p>"If you can't explain it to a six-year-old, you don't understand it yourself." The bot acts as a curious 10-year-old and forces you to avoid jargon.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col justify-between overflow-hidden lg:col-span-2 min-h-[460px]">
            <div className="p-6 space-y-4 overflow-y-auto max-h-[380px]">
              {feynmanHistory.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                      🧒🏾
                    </div>
                  )}
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/80'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isFeynmanLoading && (
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Curious 10-year-old is thinking...</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSendFeynman} className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={feynmanInput}
                onChange={(e) => setFeynmanInput(e.target.value)}
                placeholder="Explain simply using everyday Nigerian objects (e.g. food, football)..."
                className="flex-1 text-xs bg-white border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
              />
              <button
                type="submit"
                disabled={isFeynmanLoading || !feynmanInput.trim()}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Simplify</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: Flipped Classroom WhatsApp Script Generator */}
      {activeTab === 'flipped' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 lg:col-span-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Audio Note Specifications
            </span>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Upcoming Lesson Topic</label>
                <input
                  type="text"
                  value={flippedTopic}
                  onChange={(e) => setFlippedTopic(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject</label>
                  <input
                    type="text"
                    value={flippedSubject}
                    onChange={(e) => setFlippedSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Class</label>
                  <input
                    type="text"
                    value={flippedLevel}
                    onChange={(e) => setFlippedLevel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerateFlipped}
              disabled={isFlippedLoading}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isFlippedLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Volume2 className="w-4 h-4" />}
              <span>Generate 3-Min WhatsApp Voice Note Script</span>
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 lg:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-700">
                Generated WhatsApp Flipped Audio Script (3 Minutes):
              </span>
              {flippedScript && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(flippedScript.whatsappAudioScript);
                    setCopiedFlipped(true);
                    setTimeout(() => setCopiedFlipped(false), 2000);
                  }}
                  className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  {copiedFlipped ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedFlipped ? 'Copied' : 'Copy Audio Script'}</span>
                </button>
              )}
            </div>

            {flippedScript ? (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl font-serif text-xs text-slate-800 leading-relaxed whitespace-pre-wrap max-h-[360px] overflow-y-auto">
                  {flippedScript.whatsappAudioScript}
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
                  <span>Pacing: ~400 words (3 minutes speaking time). Send to parents/students before 8:00 PM.</span>
                  <span className="font-bold">Flipped Autopilot</span>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center space-y-2 text-slate-400 text-xs">
                <Volume2 className="w-8 h-8 mx-auto text-slate-300" />
                <p>Click "Generate" to create a bespoke 3-minute WhatsApp voice note script.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: Post-Class Reflection */}
      {activeTab === 'reflection' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 lg:col-span-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Teacher Reflection Log
            </span>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Lesson Topic Taught</label>
                <input
                  type="text"
                  value={refTopic}
                  onChange={(e) => setRefTopic(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Your Observations / Bottlenecks</label>
                <textarea
                  value={refObservations}
                  onChange={(e) => setRefObservations(e.target.value)}
                  placeholder="What went well? Where did students struggle or disengage?"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-600/30"
                />
              </div>
            </div>

            <button
              onClick={handleRunReflection}
              disabled={isReflecting || !refObservations.trim()}
              className="w-full py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isReflecting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
              <span>Generate 3-Point Advice for Next Lesson</span>
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 lg:col-span-2">
            <span className="text-xs font-bold text-slate-700 block border-b border-slate-100 pb-3">
              Targeted Pedagogical Remediation:
            </span>

            {reflectionResult ? (
              <div className="space-y-4 animate-in fade-in">
                <div className="space-y-2.5">
                  {reflectionResult.adviceList.map((adv: string, i: number) => (
                    <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-xs font-semibold text-slate-800 leading-relaxed">{adv}</p>
                    </div>
                  ))}
                </div>

                {reflectionResult.fullPedagogicalGuidance && (
                  <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-xs text-indigo-950 space-y-1">
                    <span className="font-bold block">OEQA Mentorship Rationale:</span>
                    <p className="leading-relaxed">{reflectionResult.fullPedagogicalGuidance}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-20 text-center space-y-2 text-slate-400 text-xs">
                <HelpCircle className="w-8 h-8 mx-auto text-slate-300" />
                <p>Input what happened in your classroom to receive an actionable 3-point remediation plan.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: Differentiated Tasks Matrix */}
      {activeTab === 'differentiated' && !senAccess.allowed && (
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">
            SEN & 3-Tier Differentiated Tasks Engine Locked
          </h3>
          <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
            {senAccess.upgradeMessage || 'Differentiated remedial, standard, and accelerated tasks belong to the School Silver (₦120,000/term), Gold (₦250,000/term), and State Ministry Platinum tiers.'}
          </p>
          <button
            onClick={() =>
              onOpenUpgrade?.(
                senAccess.upgradeMessage || 'Upgrade to School Silver (₦120,000/term) to unlock the SEN & Differentiated Tasks Engine.',
                senAccess.requiredTier || 'b2b_silver',
                'SEN Differentiated Matrix Locked'
              )
            }
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
          >
            Upgrade to School Silver
          </button>
        </div>
      )}

      {activeTab === 'differentiated' && senAccess.allowed && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Statutory 3-Tier Differentiated Tasks Engine
              </h3>
              <p className="text-xs text-slate-500">
                Populates remedialTask, standardTask, and advancedTask according to OEQA differentiated instruction standards.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={diffTopic}
                onChange={(e) => setDiffTopic(e.target.value)}
                placeholder="Topic..."
                className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-medium"
              />
              <button
                onClick={handleFetchDifferentiated}
                disabled={isDiffLoading}
                className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5"
              >
                {isDiffLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                <span>Regenerate</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Remedial Task */}
            <div className="p-5 bg-rose-50/60 border border-rose-200 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-rose-800">
                  Tier 1: Remedial Task
                </span>
                <span className="text-[10px] font-bold bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full">
                  Struggling Learners
                </span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                {diffTasks.remedialTask}
              </p>
              <div className="text-[11px] text-rose-700 pt-2 border-t border-rose-200/60">
                Scaffolded with visual cues & peer-buddy support.
              </div>
            </div>

            {/* Standard Task */}
            <div className="p-5 bg-blue-50/60 border border-blue-200 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-blue-800">
                  Tier 2: Standard Task
                </span>
                <span className="text-[10px] font-bold bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full">
                  On-Level Core
                </span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                {diffTasks.standardTask}
              </p>
              <div className="text-[11px] text-blue-700 pt-2 border-t border-blue-200/60">
                NERDC syllabus textbook exercises with market realia.
              </div>
            </div>

            {/* Advanced Task */}
            <div className="p-5 bg-emerald-50/60 border border-emerald-200 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                  Tier 3: Advanced Task
                </span>
                <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                  Gifted / Accelerated
                </span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                {diffTasks.advancedTask}
              </p>
              <div className="text-[11px] text-emerald-700 pt-2 border-t border-emerald-200/60">
                Higher-order synthesis and WAEC Paper 2 proof challenges.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
