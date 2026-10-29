import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  Sparkles,
  RotateCcw,
  Gauge,
  Headphones,
  Check,
  AlertCircle
} from 'lucide-react';

export interface EL5AudioPlayerProps {
  /** The ELI5 simplified text to read out loud */
  text: string;
  /** Optional topic title */
  topic?: string;
  /** Optional custom title for the player */
  title?: string;
  /** Optional level (e.g., JSS 1, SSS 2) */
  level?: string;
  /** Optional styling class */
  className?: string;
}

export const EL5AudioPlayer: React.FC<EL5AudioPlayerProps> = ({
  text,
  topic = 'Lesson Concept',
  title = "Audio 'Explain Like I'm 5' (ELI5)",
  level,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState<number>(1.0);
  const [isSupported, setIsSupported] = useState(true);
  const [copied, setCopied] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    // Stop audio on unmount or when text changes
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [text]);

  const handlePlay = () => {
    if (!isSupported || typeof window === 'undefined') return;

    const synth = window.speechSynthesis;

    // If already paused, resume
    if (isPaused) {
      synth.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Cancel any previous speech before starting fresh
    synth.cancel();

    const cleanText = text.replace(/[*_#`]/g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utteranceRef.current = utterance;
    utterance.rate = rate;
    utterance.pitch = 1.05; // Slightly warmer/friendly tone for ELI5

    // Pick English voice if available
    const voices = synth.getVoices();
    const englishVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Online'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      console.warn('[EL5AudioPlayer] SpeechSynthesis error:', e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    synth.speak(utterance);
  };

  const handlePause = () => {
    if (!isSupported || typeof window === 'undefined') return;
    const synth = window.speechSynthesis;
    if (synth.speaking && !synth.paused) {
      synth.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (!isSupported || typeof window === 'undefined') return;
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    if (isPlaying) {
      // Restart with new rate
      handleStop();
      setTimeout(handlePlay, 100);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-2xl bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-950 border border-amber-500/30 p-5 text-slate-100 shadow-xl relative overflow-hidden ${className}`}
    >
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-400/20">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-white tracking-wide">{title}</h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black uppercase tracking-wider">
                Voice AI
              </span>
            </div>
            <p className="text-[11px] text-amber-200/70">
              Child-friendly intuitive breakdown for {topic} {level ? `(${level.toUpperCase()})` : ''}
            </p>
          </div>
        </div>

        {/* Audio Visualizer Waves Indicator */}
        <div className="flex items-center gap-1 h-6 px-3 py-1 rounded-full bg-slate-900/80 border border-amber-500/20">
          <span className="text-[10px] font-bold text-amber-300 mr-1.5 hidden sm:inline">
            {isPlaying ? 'Narration Active' : isPaused ? 'Audio Paused' : 'Ready'}
          </span>
          <span
            className={`w-1 rounded-full bg-amber-400 transition-all ${
              isPlaying ? 'h-5 animate-pulse' : 'h-1.5 opacity-40'
            }`}
          />
          <span
            className={`w-1 rounded-full bg-amber-300 transition-all ${
              isPlaying ? 'h-3 animate-ping' : 'h-1.5 opacity-40'
            }`}
          />
          <span
            className={`w-1 rounded-full bg-amber-500 transition-all ${
              isPlaying ? 'h-6 animate-pulse' : 'h-1.5 opacity-40'
            }`}
          />
          <span
            className={`w-1 rounded-full bg-amber-400 transition-all ${
              isPlaying ? 'h-4 animate-ping' : 'h-1.5 opacity-40'
            }`}
          />
        </div>
      </div>

      {/* Spoken Text Transcript Area */}
      <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800/80 mb-4 relative">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium selection:bg-amber-400 selection:text-slate-950">
            "{text}"
          </p>
        </div>
      </div>

      {/* Playback Controls & Speed Selectors */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-800/80">
        {/* Main Controls: Play / Pause / Stop */}
        <div className="flex items-center gap-2">
          {!isPlaying ? (
            <button
              onClick={handlePlay}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-md shadow-amber-400/20 transition-all hover:scale-105 active:scale-95"
              title="Play ELI5 Audio"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{isPaused ? 'Resume Audio' : 'Play Narration'}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center gap-2 transition-all"
              title="Pause Audio"
            >
              <Pause className="w-4 h-4 fill-amber-300" />
              <span>Pause</span>
            </button>
          )}

          <button
            onClick={handleStop}
            disabled={!isPlaying && !isPaused}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 text-slate-300 border border-slate-700/60 text-xs transition-colors"
            title="Stop Audio"
          >
            <Square className="w-4 h-4 fill-current" />
          </button>

          <button
            onClick={handlePlay}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 text-xs transition-colors hidden sm:block"
            title="Replay from Beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Speed Controls & Copy Action */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-900/90 rounded-lg p-1 border border-slate-800 text-[11px] font-bold">
            <span className="text-slate-400 px-1.5 flex items-center gap-1 text-[10px]">
              <Gauge className="w-3 h-3" />
              <span>Speed:</span>
            </span>
            {[0.8, 1.0, 1.25].map((s) => (
              <button
                key={s}
                onClick={() => handleRateChange(s)}
                className={`px-2 py-0.5 rounded-md transition-colors ${
                  rate === s
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-bold transition-colors flex items-center gap-1"
            title="Copy ELI5 Text"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : null}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {!isSupported && (
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-amber-300/80 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Speech synthesis is not supported in this browser. You can still read the simplified text transcript above!</span>
        </div>
      )}
    </div>
  );
};
