import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Globe,
  Download,
  Copy,
  Check,
  Radio,
  FileAudio
} from 'lucide-react';

interface AudioLessonNarratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle?: string;
  lessonSubject?: string;
  lessonLevel?: string;
}

export const AudioLessonNarratorModal: React.FC<AudioLessonNarratorModalProps> = ({
  isOpen,
  onClose,
  lessonTitle = 'Commercial Arithmetic & Profit Margin Calculations',
  lessonSubject = 'Mathematics',
  lessonLevel = 'SSS 2',
}) => {
  const [selectedLang, setSelectedLang] = useState<'en' | 'yo' | 'ig' | 'ha'>('en');
  const [narrationData, setNarrationData] = useState<{
    narrationText: string;
    phoneticGuide: string;
    realiaReference: string;
  } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(0.95);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchNarration();
    } else {
      stopSpeech();
    }
  }, [isOpen, selectedLang, lessonTitle, lessonSubject, lessonLevel]);

  const fetchNarration = async () => {
    try {
      const res = await fetch('/api/ai/narrate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: lessonTitle,
          subject: lessonSubject,
          level: lessonLevel,
          language: selectedLang,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setNarrationData({
          narrationText: data.narrationText,
          phoneticGuide: data.phoneticGuide,
          realiaReference: data.realiaReference,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const startSpeech = () => {
    if (!narrationData || typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(narrationData.narrationText);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    // Pick appropriate voice if available
    const voices = window.speechSynthesis.getVoices();
    const ngVoice = voices.find(
      (v) =>
        v.lang.includes('NG') ||
        v.lang.includes('ng') ||
        v.name.includes('Nigeria') ||
        v.name.includes('African')
    );
    if (ngVoice) {
      utterance.voice = ngVoice;
    }

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSpeech();
    } else {
      startSpeech();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold mb-1">
              <FileAudio className="w-4 h-4" />
              <span>Indigenous Language Audio Recitation & CPD</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              AI Voice Lesson Narrator
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              {lessonSubject} ({lessonLevel.toUpperCase()}) · {lessonTitle}
            </p>
          </div>
          <button
            onClick={() => {
              stopSpeech();
              onClose();
            }}
            className="text-slate-400 hover:text-white text-xs bg-white/10 px-2.5 py-1 rounded-full"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Language Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            {[
              { id: 'en', label: 'English (NG)' },
              { id: 'yo', label: 'Yorùbá' },
              { id: 'ig', label: 'Asụsụ Igbo' },
              { id: 'ha', label: 'Harshen Hausa' },
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => {
                  stopSpeech();
                  setSelectedLang(lang.id as any);
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  selectedLang === lang.id
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Waveform Animation & Playback Bar */}
          <div className="bg-slate-900 p-4 rounded-2xl flex items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center font-bold shadow-md transition-transform active:scale-95 shrink-0"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              {/* Animated Waveform Visualizer */}
              <div className="flex items-center gap-1 h-8">
                {[12, 24, 18, 30, 16, 26, 22, 14, 28, 20, 12, 18].map((h, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full bg-emerald-400 transition-all ${
                      isPlaying ? 'animate-pulse' : 'opacity-40'
                    }`}
                    style={{
                      height: isPlaying ? `${Math.max(6, (h * (i % 2 === 0 ? 1 : 0.7)))}px` : '6px',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Speed Selector */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Speed:</span>
              <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700">
                {[0.85, 1.0, 1.15].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => {
                      setSpeechRate(rate);
                      if (isPlaying) {
                        stopSpeech();
                        setTimeout(startSpeech, 100);
                      }
                    }}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      speechRate === rate ? 'bg-emerald-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Spoken Narration Script Content */}
          {narrationData && (
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-500 text-[10px] uppercase font-bold">
                  <span>Pedagogical Narration Text</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(narrationData.narrationText);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy Text'}</span>
                  </button>
                </div>
                <p className="text-slate-800 leading-relaxed font-serif text-sm">
                  "{narrationData.narrationText}"
                </p>
              </div>

              {/* Phonetic & Contextual Advice */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-0.5">
                  <span className="text-[10px] font-bold text-amber-900 uppercase block">
                    Phonetic Pacing Guide
                  </span>
                  <p className="text-[11px] text-amber-900 leading-snug">
                    {narrationData.phoneticGuide}
                  </p>
                </div>

                <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-0.5">
                  <span className="text-[10px] font-bold text-emerald-900 uppercase block">
                    Realia Context
                  </span>
                  <p className="text-[11px] text-emerald-900 leading-snug">
                    {narrationData.realiaReference}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 flex items-center justify-between border-t border-slate-200">
          <span className="text-[11px] text-slate-500">
            Exportable to WhatsApp Voice Note or classroom public address amplifier.
          </span>
          <button
            onClick={() => {
              stopSpeech();
              onClose();
            }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
