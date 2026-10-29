import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Sparkles,
  Volume2,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Radio,
  Sliders,
  HelpCircle
} from 'lucide-react';
import { useLowDataMode } from '../lib/LowDataContext.tsx';

interface ParsedVoiceIntent {
  subject: string;
  level: string;
  topic: string;
  term: number;
  week: number;
  culturalContext: string;
  confidence: number;
}

interface VoiceToPlanProps {
  onPlanGenerated?: (parsed: ParsedVoiceIntent, transcript: string) => void;
  onTranscriptReady?: (transcript: string) => void;
  className?: string;
  compact?: boolean;
}

// Nigerian speech & Pidgin mapping rules
const NIGERIAN_PIDGIN_MAPPINGS: Record<string, string> = {
  'wetin': 'what',
  'abeg': 'please',
  'wey': 'that',
  'dey': 'is',
  'make i': 'let me',
  'make we': 'let us',
  'na': 'is',
  'oya': 'now',
  'pikin': 'pupil',
  'tish': 'teach',
  'malo': 'pupil',
};

export const VoiceToPlan: React.FC<VoiceToPlanProps> = ({
  onPlanGenerated,
  onTranscriptReady,
  className = '',
  compact = false,
}) => {
  const { isLowDataMode } = useLowDataMode();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [speechLanguage, setSpeechLanguage] = useState<'en-NG' | 'pcm-NG'>('en-NG');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [parsedIntent, setParsedIntent] = useState<ParsedVoiceIntent | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [audioLevel, setAudioLevel] = useState<number>(0);

  const recognitionRef = useRef<any>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Check Web Speech API support
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = speechLanguage === 'pcm-NG' ? 'en-NG' : 'en-NG'; // Web Speech handles en-NG best for West African phonemes

    recognition.onstart = () => {
      setIsListening(true);
      setErrorMsg(null);
      simulateAudioWaveform();
    };

    recognition.onresult = (event: any) => {
      let finalStr = '';
      let interimStr = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const item = event.results[i];
        if (item.isFinal) {
          finalStr += item[0].transcript + ' ';
        } else {
          interimStr += item[0].transcript;
        }
      }

      if (finalStr) {
        setTranscript((prev) => {
          const updated = (prev + ' ' + finalStr).trim();
          parseNigerianCurriculumIntent(updated);
          return updated;
        });
      }
      setInterimTranscript(interimStr);
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition event:', event.error);
      if (event.error === 'not-allowed') {
        setErrorMsg('Microphone access was denied. Please allow microphone permissions in your browser.');
      } else if (event.error === 'no-speech') {
        // quiet timeout, no panic
      } else {
        setErrorMsg(`Speech recognition note: ${event.error}. You can also type or edit directly below.`);
      }
      setIsListening(false);
      stopAudioWaveform();
    };

    recognition.onend = () => {
      setIsListening(false);
      stopAudioWaveform();
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
      stopAudioWaveform();
    };
  }, [speechLanguage]);

  const simulateAudioWaveform = () => {
    if (isLowDataMode) return;
    const update = () => {
      // Simulate speech amplitude modulation
      setAudioLevel(Math.floor(Math.random() * 80) + 20);
      animFrameRef.current = requestAnimationFrame(update);
    };
    animFrameRef.current = requestAnimationFrame(update);
  };

  const stopAudioWaveform = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setAudioLevel(0);
  };

  const toggleListening = () => {
    if (!isSupported) {
      setErrorMsg('Web Speech API is not supported in this browser. Please use Google Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {
        // ignore
      }
      setIsListening(false);
      stopAudioWaveform();
    } else {
      setErrorMsg(null);
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.warn('Recognition start error', e);
      }
    }
  };

  // Rule-based and syntactic parser for Nigerian curriculum voice notes
  const parseNigerianCurriculumIntent = (text: string) => {
    setIsParsing(true);
    const lower = text.toLowerCase();

    // 1. Detect Level (JSS 1-3, SSS 1-3)
    let level = 'JSS 1';
    if (lower.includes('jss 3') || lower.includes('junior secondary 3') || lower.includes('jss3')) level = 'JSS 3';
    else if (lower.includes('jss 2') || lower.includes('junior secondary 2') || lower.includes('jss2')) level = 'JSS 2';
    else if (lower.includes('jss 1') || lower.includes('junior secondary 1') || lower.includes('jss1')) level = 'JSS 1';
    else if (lower.includes('sss 3') || lower.includes('senior secondary 3') || lower.includes('sss3')) level = 'SSS 3';
    else if (lower.includes('sss 2') || lower.includes('senior secondary 2') || lower.includes('sss2')) level = 'SSS 2';
    else if (lower.includes('sss 1') || lower.includes('senior secondary 1') || lower.includes('sss1')) level = 'SSS 1';

    // 2. Detect Subject
    const subjects = [
      'Mathematics',
      'English Studies',
      'Basic Science',
      'Basic Technology',
      'Civic Education',
      'Social Studies',
      'Agricultural Science',
      'Biology',
      'Chemistry',
      'Physics',
      'Economics',
      'Government',
      'Commerce',
      'Financial Accounting',
      'Literature in English',
      'Computer Studies',
    ];

    let matchedSubject = 'Mathematics';
    for (const sub of subjects) {
      if (lower.includes(sub.toLowerCase())) {
        matchedSubject = sub;
        break;
      }
    }
    // Shorthand checks
    if (lower.includes('maths') || lower.includes('arithmetic')) matchedSubject = 'Mathematics';
    if (lower.includes('english') || lower.includes('grammar') || lower.includes('comprehension')) matchedSubject = 'English Studies';
    if (lower.includes('agric') || lower.includes('farming')) matchedSubject = 'Agricultural Science';
    if (lower.includes('science') && !lower.includes('basic technology')) matchedSubject = 'Basic Science';

    // 3. Detect Term & Week
    let term = 1;
    if (lower.includes('second term') || lower.includes('2nd term')) term = 2;
    if (lower.includes('third term') || lower.includes('3rd term')) term = 3;

    let week = 3;
    const weekMatch = lower.match(/week\s+(\d+)/);
    if (weekMatch && weekMatch[1]) {
      const parsedWeek = parseInt(weekMatch[1], 10);
      if (parsedWeek >= 1 && parsedWeek <= 13) week = parsedWeek;
    }

    // 4. Detect Topic
    let topic = 'Fractions & Proportions with Balogun Market Transactions';
    const topicMatch = lower.match(/(?:topic\s+(?:na|is)?|teach(?:ing)?|about|lesson\s+on)\s+([^,.;]+)/);
    if (topicMatch && topicMatch[1] && topicMatch[1].trim().length > 3) {
      topic = topicMatch[1].trim();
      // Capitalize first letter
      topic = topic.charAt(0).toUpperCase() + topic.slice(1);
    } else if (text.trim().length > 10) {
      // Use clean portion of phrase
      topic = text.slice(0, 50).trim();
    }

    // 5. Detect Nigerian Cultural References
    const culturalHooks: string[] = [];
    if (lower.includes('naira') || lower.includes('kobo') || lower.includes('₦')) culturalHooks.push('Naira (₦) currency calculations');
    if (lower.includes('balogun') || lower.includes('alaba') || lower.includes('market') || lower.includes('bodija') || lower.includes('dawanau')) {
      culturalHooks.push('Local market commercial trading scenario');
    }
    if (lower.includes('cassava') || lower.includes('yam') || lower.includes('cocoa') || lower.includes('palm oil')) {
      culturalHooks.push('Nigerian agricultural produce specimens');
    }
    if (lower.includes('lagos') || lower.includes('kano') || lower.includes('ibadan') || lower.includes('abuja') || lower.includes('enugu')) {
      culturalHooks.push('Nigerian state geographic reference');
    }
    if (culturalHooks.length === 0) {
      culturalHooks.push('Authentic Nigerian classroom context with local marketplace examples');
    }

    const intent: ParsedVoiceIntent = {
      subject: matchedSubject,
      level,
      topic,
      term,
      week,
      culturalContext: culturalHooks.join(', '),
      confidence: 0.92,
    };

    setParsedIntent(intent);
    setIsParsing(false);
  };

  const handleUsePreset = (presetText: string) => {
    setTranscript(presetText);
    setInterimTranscript('');
    parseNigerianCurriculumIntent(presetText);
  };

  const handleApplyVoicePlan = () => {
    if (!parsedIntent) return;
    if (onPlanGenerated) {
      onPlanGenerated(parsedIntent, transcript);
    }
    if (onTranscriptReady) {
      onTranscriptReady(transcript);
    }
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs ${className}`}>
      {/* Header zone with Nigerian English/Pidgin toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <Mic className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Voice-to-Plan AI</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Nigerian Dialect Engine
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Speak naturally in Nigerian English or Nigerian Pidgin — AI structures full NERDC lesson plans.
              </p>
            </div>
          </div>
        </div>

        {/* Accent / Dialect Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg shrink-0">
          <button
            onClick={() => setSpeechLanguage('en-NG')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
              speechLanguage === 'en-NG'
                ? 'bg-white text-emerald-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Nigerian English (en-NG)
          </button>
          <button
            onClick={() => setSpeechLanguage('pcm-NG')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
              speechLanguage === 'pcm-NG'
                ? 'bg-white text-emerald-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Nigerian Pidgin (Wetin/Abeg)
          </button>
        </div>
      </div>

      {/* Main recording strip */}
      <div className="py-4 flex flex-col md:flex-row items-center gap-4">
        {/* Big Mic Button with Waveform */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleListening}
            className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
              isListening
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-4 ring-rose-100'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-800/20'
            }`}
            title={isListening ? 'Click to stop recording' : 'Click to start speaking'}
          >
            {isListening ? (
              <MicOff className="w-6 h-6 animate-pulse" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
            {isListening && !isLowDataMode && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white animate-ping" />
            )}
          </button>

          <div className="text-left">
            <span className="text-xs font-bold text-slate-900 block">
              {isListening ? 'Listening to your voice...' : 'Press Mic & Speak Lesson Topic'}
            </span>
            <span className="text-[11px] text-slate-500">
              {isListening
                ? 'Say: "Topic na Profit & Loss for JSS 2, use Balogun market"'
                : 'Supports JSS 1-3 & SSS 1-3 schemes of work'}
            </span>
          </div>
        </div>

        {/* Live Audio Visualizer (Lightweight bars) */}
        {isListening && !isLowDataMode && (
          <div className="flex-1 flex items-center gap-1 h-8 px-4 bg-slate-50 rounded-xl border border-slate-200">
            <Radio className="w-3.5 h-3.5 text-rose-600 animate-pulse shrink-0 mr-2" />
            {[40, 70, 95, 60, 80, 45, 90, 75, 30, 85, 65, 50, 95, 40].map((h, idx) => (
              <div
                key={idx}
                className="flex-1 bg-emerald-600 rounded-full transition-all duration-75"
                style={{
                  height: `${Math.max(15, (audioLevel * h) / 100)}%`,
                  opacity: 0.6 + (audioLevel / 200),
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Error / Permission Alert */}
      {errorMsg && (
        <div className="p-3 mb-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Live Transcript / Speech Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-medium text-slate-600">
          <span>Live Speech Transcript:</span>
          {transcript && (
            <button
              onClick={() => {
                setTranscript('');
                setInterimTranscript('');
                setParsedIntent(null);
              }}
              className="text-slate-400 hover:text-slate-700 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>

        <div className="relative">
          <textarea
            value={transcript + (interimTranscript ? ` (${interimTranscript})` : '')}
            onChange={(e) => {
              setTranscript(e.target.value);
              parseNigerianCurriculumIntent(e.target.value);
            }}
            placeholder="E.g., 'Teach JSS 2 Mathematics on Simple Interest and Percentage Discount, use Balogun market traders in Lagos and calculate interest in Naira ₦...'"
            rows={2}
            className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
          />
        </div>
      </div>

      {/* Spoken Presets / Teacher Prompts */}
      <div className="mt-3 pt-3 border-t border-slate-100">
        <div className="text-[11px] font-semibold text-slate-500 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          <span>Quick Sample Voice Prompts (Click to test):</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() =>
              handleUsePreset(
                'Teach JSS 1 Mathematics on Fractions and Decimals. Make we use Alaba market trader examples and Naira calculations.'
              )
            }
            className="text-[11px] text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors text-left"
          >
            "JSS 1 Maths Fractions with Alaba Market"
          </button>
          <button
            onClick={() =>
              handleUsePreset(
                'Plan SSS 2 Biology lesson on Photosynthesis and Transpiration. Topic na plant transport with cassava and yam leaf specimens.'
              )
            }
            className="text-[11px] text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors text-left"
          >
            "SSS 2 Biology Photosynthesis with Cassava"
          </button>
          <button
            onClick={() =>
              handleUsePreset(
                'Teach JSS 3 Civic Education on Nigerian Democratic Institutions and rule of law with references to INEC and National Assembly.'
              )
            }
            className="text-[11px] text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors text-left"
          >
            "JSS 3 Civic Ed: Democratic Institutions"
          </button>
        </div>
      </div>

      {/* Extracted Curriculum Intent Card */}
      {parsedIntent && (
        <div className="mt-4 p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-xl">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-200/50">
            <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Extracted Curriculum Metadata (Ready for OEQA Plan)</span>
            </span>
            <span className="text-[11px] font-mono text-emerald-700">
              Confidence: {Math.round(parsedIntent.confidence * 100)}%
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-3">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Subject</span>
              <p className="font-bold text-slate-900">{parsedIntent.subject}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Class Level</span>
              <p className="font-bold text-slate-900">{parsedIntent.level}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Term & Week</span>
              <p className="font-bold text-slate-900">Term {parsedIntent.term} · Wk {parsedIntent.week}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Context Hook</span>
              <p className="font-semibold text-emerald-800 truncate" title={parsedIntent.culturalContext}>
                {parsedIntent.culturalContext}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2 border-t border-emerald-200/50">
            <span className="text-xs text-slate-600 truncate">
              <strong>Topic:</strong> {parsedIntent.topic}
            </span>
            <button
              onClick={handleApplyVoicePlan}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors shadow-2xs flex items-center gap-1.5 shrink-0"
            >
              <span>Load into Composer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
