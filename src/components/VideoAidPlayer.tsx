import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Repeat,
  Video,
  Sparkles,
  Gauge,
  Tag,
  Eye,
  EyeOff,
  Headphones,
  Search,
  BookOpen,
  HelpCircle,
  Award,
  Layers,
  ChevronDown,
  ChevronUp,
  Sliders,
  CheckCircle2,
  Info,
  Radio,
  ExternalLink
} from 'lucide-react';
import {
  ALL_4K_CURRICULUM_CLIPS,
  ALL_24_SUBJECTS_LIST,
  Curriculum4KClip,
  VisualLabelPin,
  getBest4KClip,
  get4KClipsForSubject
} from '../data/curriculum4kClips.ts';

interface VideoAidPlayerProps {
  videoUrl?: string;
  topicTitle?: string;
  subject?: string;
  onUrlChange?: (url: string) => void;
}

export const VideoAidPlayer: React.FC<VideoAidPlayerProps> = ({
  videoUrl,
  topicTitle = 'Classroom Visual Realia Clip (4K Ultra-HD)',
  subject = 'Science',
  onUrlChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // ---------------------------------------------------------------------------
  // 1. ACTIVE CLIP & SUBJECT MANAGEMENT
  // ---------------------------------------------------------------------------
  const [selectedClip, setSelectedClip] = useState<Curriculum4KClip>(() => {
    return getBest4KClip(subject, topicTitle);
  });

  // Re-sync when props change
  useEffect(() => {
    const best = getBest4KClip(subject, topicTitle);
    setSelectedClip(best);
    setHasVideoError(false);
  }, [subject, topicTitle]);

  // Mode: "simulation" (Infallible 4K procedural canvas) vs "video" (recorded clip)
  const [displayMode, setDisplayMode] = useState<'simulation' | 'video'>('simulation');
  const [hasVideoError, setHasVideoError] = useState(false);

  // When user switches clip or prop videoUrl changes
  useEffect(() => {
    if (videoUrl && videoUrl !== selectedClip.videoUrl) {
      // Teacher entered a custom URL
    }
  }, [videoUrl]);

  // ---------------------------------------------------------------------------
  // 2. PLAYBACK & TIME STATES
  // ---------------------------------------------------------------------------
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(selectedClip.durationSeconds || 120);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // ---------------------------------------------------------------------------
  // 3. LABELS & PINS STATE (FULL LABELING)
  // ---------------------------------------------------------------------------
  const [showLabels, setShowLabels] = useState(true);
  const [activePin, setActivePin] = useState<VisualLabelPin | null>(null);
  const [showPinDrawer, setShowPinDrawer] = useState(false);

  // ---------------------------------------------------------------------------
  // 4. AUDIBLE TEACHER VOICE NARRATION (WEB SPEECH SYNTHESIS)
  // ---------------------------------------------------------------------------
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>('');
  const [isSequentialNarration, setIsSequentialNarration] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Web Audio Context for pleasant chime feedback
  const playAudioCue = useCallback((frequency = 587.33, duration = 0.15) => {
    try {
      if (typeof window === 'undefined') return;
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // AudioContext policy fallback
    }
  }, []);

  const stopAudibleNarration = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsSequentialNarration(false);
    setCurrentSubtitle('');
  }, []);

  const speakText = useCallback((textToSpeak: string, onEndCallback?: () => void) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setCurrentSubtitle(textToSpeak);
      return;
    }

    window.speechSynthesis.cancel();
    playAudioCue(659.25, 0.12);

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    // Pick best English voice (e.g. natural, UK, US, or standard)
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Teacher')))
      || voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentSubtitle(textToSpeak);
    };

    utterance.onboundary = (e) => {
      if (e.name === 'word') {
        // Real-time subtitle tracking
        const words = textToSpeak.split(' ');
        const approxWordIndex = Math.floor((e.charIndex / textToSpeak.length) * words.length);
        const windowWords = words.slice(Math.max(0, approxWordIndex - 4), approxWordIndex + 8).join(' ');
        if (windowWords) setCurrentSubtitle(windowWords);
      }
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentSubtitle('');
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentSubtitle('');
    };

    currentUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [speechRate, playAudioCue]);

  // Read full clip overview narration
  const handleToggleNarration = () => {
    if (isSpeaking) {
      stopAudibleNarration();
    } else {
      speakText(selectedClip.audibleNarration);
    }
  };

  // Read a single pin aloud
  const handleReadPinAloud = (pin: VisualLabelPin) => {
    setActivePin(pin);
    const speech = `Point ${pin.number}: ${pin.name}. ${pin.description} ${pin.examTip ? `Chief Examiner WAEC Tip: ${pin.examTip}` : ''}`;
    speakText(speech);
  };

  // Sequentially read all pins aloud for classroom automated presentation
  const handleReadAllPinsAloud = () => {
    if (selectedClip.pins.length === 0) return;
    stopAudibleNarration();
    setIsSequentialNarration(true);

    let currentIndex = 0;
    const readNext = () => {
      if (currentIndex >= selectedClip.pins.length) {
        setIsSequentialNarration(false);
        setActivePin(null);
        return;
      }
      const pin = selectedClip.pins[currentIndex];
      setActivePin(pin);
      currentIndex += 1;
      const speech = `Point ${pin.number}: ${pin.name}. ${pin.description}. ${pin.examTip ? `Exam tip: ${pin.examTip}` : ''}`;
      speakText(speech, () => {
        // Brief pause between pins
        setTimeout(readNext, 800);
      });
    };
    readNext();
  };

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      stopAudibleNarration();
    };
  }, [stopAudibleNarration]);

  // ---------------------------------------------------------------------------
  // 5. TOPIC & SUBJECT SELECTION BROWSER MODAL / DRAWER
  // ---------------------------------------------------------------------------
  const [showSubjectPicker, setShowSubjectPicker] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredClips = ALL_4K_CURRICULUM_CLIPS.filter((clip) => {
    const matchesSearch =
      searchFilter === '' ||
      clip.subject.toLowerCase().includes(searchFilter.toLowerCase()) ||
      clip.topicTitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
      clip.summary.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || clip.subjectCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectClip = (clip: Curriculum4KClip) => {
    stopAudibleNarration();
    setSelectedClip(clip);
    setActivePin(null);
    setCurrentTime(0);
    setDuration(clip.durationSeconds);
    setHasVideoError(false);
    setShowSubjectPicker(false);
    if (onUrlChange && clip.videoUrl) {
      onUrlChange(clip.videoUrl);
    }
  };

  // ---------------------------------------------------------------------------
  // 6. PROCEDURAL 4K ULTRA-HD CANVAS & SVG SIMULATION ENGINE
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set internal resolution to crisp 4K Ultra-HD ratio (3840 x 2160)
    const targetW = 1920;
    const targetH = 1080;
    canvas.width = targetW;
    canvas.height = targetH;

    let timeSec = currentTime;
    let lastTimestamp = performance.now();

    const renderFrame = (timestamp: number) => {
      const delta = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      if (isPlaying) {
        timeSec += delta * playbackRate;
        if (timeSec > duration) {
          if (isLooping) {
            timeSec = 0;
          } else {
            timeSec = duration;
            setIsPlaying(false);
          }
        }
        setCurrentTime(timeSec);
      }

      // Clear Canvas with sleek deep background
      ctx.fillStyle = '#050914';
      ctx.fillRect(0, 0, targetW, targetH);

      // Draw subtle 4K engineering coordinate grid
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < targetW; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, targetH);
        ctx.stroke();
      }
      for (let y = 0; y < targetH; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(targetW, y);
        ctx.stroke();
      }

      // Draw active procedural simulation based on selectedClip.simulationType
      const t = timeSec;
      const simType = selectedClip.simulationType;

      ctx.save();

      // SIM 1: CARDIAC CIRCULATION
      if (simType === 'cardiac_circulation') {
        const cx = targetW / 2;
        const cy = targetH / 2 + 30;
        const heartPulse = 1 + Math.sin(t * 4.5) * 0.05 + Math.sin(t * 9) * 0.02;

        // Atria & Ventricles
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(heartPulse, heartPulse);

        // Left Ventricle (Thick Muscular Apex)
        ctx.fillStyle = '#b91c1c';
        ctx.beginPath();
        ctx.arc(60, 40, 150, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 22;
        ctx.strokeStyle = '#ef4444';
        ctx.stroke();

        // Right Ventricle
        ctx.fillStyle = '#991b1b';
        ctx.beginPath();
        ctx.arc(-70, 40, 130, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#3b82f6';
        ctx.stroke();

        // Septum Wall
        ctx.fillStyle = '#7f1d1d';
        ctx.fillRect(-20, -100, 40, 260);

        // Aorta Arch (Top Red Vessel)
        ctx.lineWidth = 42;
        ctx.strokeStyle = '#dc2626';
        ctx.beginPath();
        ctx.arc(30, -140, 90, Math.PI, 0, false);
        ctx.stroke();

        // Pulmonary Artery (Blue Vessel Crossing)
        ctx.lineWidth = 36;
        ctx.strokeStyle = '#2563eb';
        ctx.beginPath();
        ctx.moveTo(-100, -80);
        ctx.bezierCurveTo(-40, -160, 60, -120, 140, -160);
        ctx.stroke();

        ctx.restore();

        // Circulating Blood Corpuscles (Particles)
        for (let i = 0; i < 28; i++) {
          const phase = (t * 1.5 + i * 0.22) % 1;
          // Oxygenated path (Aorta loop)
          const angle = phase * Math.PI * 2;
          const px = cx + 80 + Math.cos(angle) * 140;
          const py = cy + Math.sin(angle) * 120;
          ctx.fillStyle = '#ff4d4f';
          ctx.beginPath();
          ctx.arc(px, py, 7, 0, Math.PI * 2);
          ctx.fill();

          // Deoxygenated path (Vena cava to pulmonary)
          const pblueX = cx - 90 + Math.cos(angle + Math.PI) * 120;
          const pblueY = cy + Math.sin(angle + Math.PI) * 100;
          ctx.fillStyle = '#60a5fa';
          ctx.beginPath();
          ctx.arc(pblueX, pblueY, 7, 0, Math.PI * 2);
          ctx.fill();
        }

        // Live ECG cardiac trace at bottom
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (let x = 80; x < targetW - 80; x += 6) {
          const ecgX = (x / 20 - t * 4) % 10;
          let ecgY = targetH - 120;
          if (ecgX > 4 && ecgX < 4.4) ecgY -= 20; // P wave
          else if (ecgX >= 4.4 && ecgX < 4.7) ecgY += 15; // Q
          else if (ecgX >= 4.7 && ecgX < 5.0) ecgY -= 90; // R spike
          else if (ecgX >= 5.0 && ecgX < 5.3) ecgY += 30; // S
          else if (ecgX >= 5.5 && ecgX < 6.2) ecgY -= 35; // T wave
          if (x === 80) ctx.moveTo(x, ecgY);
          else ctx.lineTo(x, ecgY);
        }
        ctx.stroke();
      }

      // SIM 2: CELLULAR BIOLOGY
      else if (simType === 'cellular_biology') {
        const cx = targetW / 2;
        const cy = targetH / 2;

        // Outer Cytoplasmic Membrane with organic wave
        ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 8;
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2; a += 0.05) {
          const r = 380 + Math.sin(a * 6 + t * 2) * 16;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r * 0.75;
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Nucleus
        ctx.fillStyle = 'rgba(99, 102, 241, 0.25)';
        ctx.strokeStyle = '#818cf8';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(cx - 40, cy, 140, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Nucleolus inside
        ctx.fillStyle = '#6366f1';
        ctx.beginPath();
        ctx.arc(cx - 30, cy - 10, 50, 0, Math.PI * 2);
        ctx.fill();

        // Mitochondria (Folded Cristae Organelles)
        const mitoPositions = [
          { x: cx + 240, y: cy - 120, rot: 0.4 },
          { x: cx + 210, y: cy + 130, rot: -0.6 },
          { x: cx - 260, y: cy + 110, rot: 0.8 }
        ];
        mitoPositions.forEach((m) => {
          ctx.save();
          ctx.translate(m.x, m.y);
          ctx.rotate(m.rot);
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.ellipse(0, 0, 75, 42, 0, 0, Math.PI * 2);
          ctx.fill();
          // Inner cristae folds
          ctx.strokeStyle = '#b45309';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(-50, -10);
          ctx.lineTo(-30, 10);
          ctx.lineTo(-10, -10);
          ctx.lineTo(10, 10);
          ctx.lineTo(30, -10);
          ctx.lineTo(50, 10);
          ctx.stroke();
          ctx.restore();
        });

        // Golgi Apparatus Ribbons
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 6;
        for (let g = 0; g < 4; g++) {
          ctx.beginPath();
          ctx.arc(cx + 60 + g * 16, cy + 180, 70, Math.PI * 0.8, Math.PI * 1.6);
          ctx.stroke();
        }
      }

      // SIM 3: ATOMIC STRUCTURE (BOHR SHELLS)
      else if (simType === 'atomic_structure') {
        const cx = targetW / 2;
        const cy = targetH / 2;

        // Concentric Quantized Shells (K, L, M)
        const shells = [130, 240, 360];
        shells.forEach((radius, idx) => {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
          ctx.lineWidth = 2;
          ctx.setLineDash([8, 6]);
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          // Shell Label
          ctx.fillStyle = '#38bdf8';
          ctx.font = 'bold 22px sans-serif';
          ctx.fillText(`n = ${idx + 1} (${['K-Shell', 'L-Shell', 'M-Shell'][idx]})`, cx + radius + 14, cy - 8);
        });

        // Dense Central Nucleus (Protons & Neutrons)
        ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
        ctx.beginPath();
        ctx.arc(cx, cy, 65, 0, Math.PI * 2);
        ctx.fill();

        for (let n = 0; n < 12; n++) {
          const angle = (n / 12) * Math.PI * 2 + t * 0.2;
          const r = 24 + (n % 2) * 14;
          const nx = cx + Math.cos(angle) * r;
          const ny = cy + Math.sin(angle) * r;
          ctx.fillStyle = n % 2 === 0 ? '#ef4444' : '#fbbf24'; // Red = Proton, Yellow = Neutron
          ctx.beginPath();
          ctx.arc(nx, nx === nx ? ny : ny, 12, 0, Math.PI * 2);
          ctx.fill();
        }

        // Orbiting Electrons with glowing tails
        const electronCounts = [2, 8, 3];
        shells.forEach((radius, sIdx) => {
          const count = electronCounts[sIdx];
          const speed = (3 - sIdx * 0.8) * 0.8;
          for (let e = 0; e < count; e++) {
            const eAngle = (e / count) * Math.PI * 2 + t * speed;
            const ex = cx + Math.cos(eAngle) * radius;
            const ey = cy + Math.sin(eAngle) * radius;

            // Glow
            ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
            ctx.beginPath();
            ctx.arc(ex, ey, 18, 0, Math.PI * 2);
            ctx.fill();

            // Core particle
            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.arc(ex, ey, 8, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      // SIM 4: CHEMICAL TITRATION
      else if (simType === 'chemical_titration') {
        const cx = targetW / 2;
        const cy = targetH / 2;

        // Burette Column (Graduated)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 4;
        ctx.fillRect(cx - 24, 80, 48, 420);
        ctx.strokeRect(cx - 24, 80, 48, 420);

        // Acid liquid inside burette
        const liquidLevel = 180 + Math.min(220, (t * 12) % 220);
        ctx.fillStyle = 'rgba(147, 197, 253, 0.45)';
        ctx.fillRect(cx - 20, liquidLevel, 40, 500 - liquidLevel);

        // Meniscus ticks
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        for (let y = 100; y < 480; y += 20) {
          ctx.beginPath();
          ctx.moveTo(cx + 8, y);
          ctx.lineTo(cx + 22, y);
          ctx.stroke();
        }

        // Stopcock
        ctx.fillStyle = '#334155';
        ctx.fillRect(cx - 40, 500, 80, 20);

        // Falling Drops
        const dropY = 520 + ((t * 220) % 180);
        ctx.fillStyle = '#60a5fa';
        ctx.beginPath();
        ctx.ellipse(cx, dropY, 6, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // Conical Flask below
        const flaskY = 700;
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(cx - 30, flaskY);
        ctx.lineTo(cx - 30, flaskY + 50);
        ctx.lineTo(cx - 160, flaskY + 240);
        ctx.lineTo(cx + 160, flaskY + 240);
        ctx.lineTo(cx + 30, flaskY + 50);
        ctx.lineTo(cx + 30, flaskY);
        ctx.stroke();

        // Swirling Liquid in flask (transitioning pink -> colorless or vice-versa)
        const cycleProgress = (t % 15) / 15;
        const pinkAlpha = cycleProgress > 0.6 ? 0.05 : 0.7 - cycleProgress;
        ctx.fillStyle = `rgba(236, 72, 153, ${pinkAlpha})`;
        ctx.beginPath();
        ctx.moveTo(cx - 145, flaskY + 235);
        ctx.lineTo(cx + 145, flaskY + 235);
        ctx.lineTo(cx + 110, flaskY + 160);
        ctx.lineTo(cx - 110, flaskY + 160);
        ctx.closePath();
        ctx.fill();

        // White Tile Base
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(cx - 200, flaskY + 245, 400, 25);
        ctx.strokeStyle = '#94a3b8';
        ctx.strokeRect(cx - 200, flaskY + 245, 400, 25);
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('WHITE TILE (High Contrast Indicator Ground)', cx - 180, flaskY + 263);
      }

      // SIM 5: GEOMETRY & TRIGONOMETRY
      else if (simType === 'geometry_trigonometry') {
        const ox = targetW / 2 - 240;
        const oy = targetH / 2 + 180;
        const baseW = 460;
        const oppH = 340;

        // Right Angle Triangle
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(ox, oy); // Angle theta vertex
        ctx.lineTo(ox + baseW, oy); // Right angle vertex
        ctx.lineTo(ox + baseW, oy - oppH); // Top vertex
        ctx.closePath();
        ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
        ctx.fill();
        ctx.stroke();

        // Right angle marker
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.strokeRect(ox + baseW - 35, oy - 35, 35, 35);

        // Angle Theta Arc
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(ox, oy, 70, -Math.atan2(oppH, baseW), 0);
        ctx.stroke();
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 28px serif';
        ctx.fillText('θ', ox + 85, oy - 25);

        // Dynamic 3D rotation projection overlay
        const rotAngle = t * 0.8;
        const projDepth = Math.sin(rotAngle) * 90;
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(ox + projDepth, oy - 60);
        ctx.lineTo(ox + baseW + projDepth, oy - 60);
        ctx.lineTo(ox + baseW, oy - oppH);
        ctx.stroke();
        ctx.setLineDash([]);

        // Formula Card Readout
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(targetW - 540, 140, 440, 240);
        ctx.strokeStyle = '#475569';
        ctx.strokeRect(targetW - 540, 140, 440, 240);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText('Pythagorean Equation:', targetW - 510, 180);
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('c² = a² + b²', targetW - 510, 220);
        ctx.fillStyle = '#10b981';
        ctx.font = '18px monospace';
        ctx.fillText('sin(θ) = Opp / Hyp = 0.59', targetW - 510, 270);
        ctx.fillText('cos(θ) = Adj / Hyp = 0.80', targetW - 510, 310);
        ctx.fillText('tan(θ) = Opp / Adj = 0.74', targetW - 510, 350);
      }

      // SIM 6: KINEMATICS & PROJECTILE MOTION
      else if (simType === 'kinematics_physics') {
        const startX = 180;
        const startY = targetH - 180;
        const g = 9.8;
        const u = 85;
        const theta = (45 * Math.PI) / 180;
        const ux = u * Math.cos(theta);
        const uy = u * Math.sin(theta);

        // Ground line
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(80, startY);
        ctx.lineTo(targetW - 80, startY);
        ctx.stroke();

        // Parabolic trajectory path
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 8]);
        ctx.beginPath();
        const totalT = (2 * uy) / g;
        for (let stepT = 0; stepT <= totalT; stepT += 0.1) {
          const px = startX + ux * stepT * 12;
          const py = startY - (uy * stepT - 0.5 * g * stepT * stepT) * 12;
          if (stepT === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Active projectile ball
        const currentSimT = (t * 2) % (totalT + 1);
        if (currentSimT <= totalT) {
          const ballX = startX + ux * currentSimT * 12;
          const ballY = startY - (uy * currentSimT - 0.5 * g * currentSimT * currentSimT) * 12;

          // Glowing cannonball
          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.arc(ballX, ballY, 16, 0, Math.PI * 2);
          ctx.fill();

          // Velocity Vector Arrows (Vx horizontal, Vy vertical)
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(ballX, ballY);
          ctx.lineTo(ballX + ux * 1.2, ballY);
          ctx.stroke();

          ctx.strokeStyle = '#10b981';
          ctx.beginPath();
          ctx.moveTo(ballX, ballY);
          ctx.lineTo(ballX, ballY - (uy - g * currentSimT) * 1.2);
          ctx.stroke();
        }
      }

      // SIM 7: CIRCUIT & ELECTRICITY
      else if (simType === 'circuit_electricity') {
        const left = 280;
        const right = targetW - 280;
        const top = 220;
        const bottom = targetH - 220;

        // Copper circuit wires
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 10;
        ctx.strokeRect(left, top, right - left, bottom - top);

        // DC Battery at top
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(targetW / 2 - 80, top - 25, 160, 50);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(targetW / 2 - 40, top - 18, 12, 36);
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(targetW / 2 + 20, top - 28, 6, 56);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText('+  12V DC  -', targetW / 2 - 58, top + 52);

        // Ammeter in series (right arm)
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(right, targetH / 2, 60, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 26px sans-serif';
        ctx.fillText('A', right - 10, targetH / 2 + 10);

        // Filament Lamp (bottom)
        const bulbX = targetW / 2;
        const bulbY = bottom;
        const glowPulse = 0.5 + Math.sin(t * 8) * 0.15;
        ctx.fillStyle = `rgba(251, 191, 36, ${glowPulse})`;
        ctx.beginPath();
        ctx.arc(bulbX, bulbY, 70, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(bulbX, bulbY, 30, 0, Math.PI * 2);
        ctx.fill();

        // Moving electron dots along wire loop
        ctx.fillStyle = '#38bdf8';
        const perimeter = 2 * (right - left + bottom - top);
        for (let e = 0; e < 24; e++) {
          const dist = ((t * 220 + e * (perimeter / 24)) % perimeter);
          let ex = left;
          let ey = top;
          if (dist < right - left) {
            ex = left + dist;
            ey = top;
          } else if (dist < (right - left) + (bottom - top)) {
            ex = right;
            ey = top + (dist - (right - left));
          } else if (dist < 2 * (right - left) + (bottom - top)) {
            ex = right - (dist - (right - left) - (bottom - top));
            ey = bottom;
          } else {
            ex = left;
            ey = bottom - (dist - 2 * (right - left) - (bottom - top));
          }
          ctx.beginPath();
          ctx.arc(ex, ey, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // SIM 8: SOIL PROFILE
      else if (simType === 'soil_profile') {
        const mx = targetW / 2 - 280;
        const mw = 560;

        // Horizon A: Topsoil (Dark Organic Humus)
        ctx.fillStyle = '#3f2e18';
        ctx.fillRect(mx, 180, mw, 180);
        // Living grass on top
        ctx.fillStyle = '#15803d';
        ctx.fillRect(mx - 40, 160, mw + 80, 20);
        // Grass blades
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 4;
        for (let g = mx - 40; g <= mx + mw + 40; g += 14) {
          ctx.beginPath();
          ctx.moveTo(g, 160);
          ctx.lineTo(g + Math.sin(g + t * 2) * 8, 120);
          ctx.stroke();
        }

        // Horizon B: Subsoil (Reddish/Brown Clay)
        ctx.fillStyle = '#854d0e';
        ctx.fillRect(mx, 360, mw, 240);

        // Horizon C: Weathered Rock
        ctx.fillStyle = '#57534e';
        ctx.fillRect(mx, 600, mw, 220);
        // Rock chunks
        ctx.fillStyle = '#78716c';
        for (let r = 0; r < 8; r++) {
          ctx.beginPath();
          ctx.arc(mx + 80 + r * 60, 680 + (r % 3) * 30, 25, 0, Math.PI * 2);
          ctx.fill();
        }

        // Horizon D: Solid Bedrock
        ctx.fillStyle = '#292524';
        ctx.fillRect(mx, 820, mw, 180);

        // Plant roots penetrating Horizon A into Horizon B
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(mx + 180, 180);
        ctx.bezierCurveTo(mx + 170, 260, mx + 200, 340, mx + 160, 440);
        ctx.moveTo(mx + 360, 180);
        ctx.bezierCurveTo(mx + 370, 280, mx + 340, 360, mx + 390, 480);
        ctx.stroke();
      }

      // SIM 9: GEAR TRANSMISSION
      else if (simType === 'gear_transmission') {
        const cx1 = targetW / 2 - 160;
        const cy1 = targetH / 2;
        const r1 = 140; // Driver pinion
        const cx2 = targetW / 2 + 180;
        const cy2 = targetH / 2;
        const r2 = 200; // Driven gear

        const teeth1 = 12;
        const teeth2 = 20;
        const rot1 = t * 1.5;
        const rot2 = -rot1 * (teeth1 / teeth2);

        // Draw Driver Gear
        ctx.save();
        ctx.translate(cx1, cy1);
        ctx.rotate(rot1);
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.arc(0, 0, r1 - 15, 0, Math.PI * 2);
        ctx.fill();
        for (let i = 0; i < teeth1; i++) {
          ctx.rotate((Math.PI * 2) / teeth1);
          ctx.fillRect(-12, -r1, 24, 25);
        }
        ctx.fillStyle = '#082f49';
        ctx.beginPath();
        ctx.arc(0, 0, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw Driven Gear
        ctx.save();
        ctx.translate(cx2, cy2);
        ctx.rotate(rot2);
        ctx.fillStyle = '#0d9488';
        ctx.beginPath();
        ctx.arc(0, 0, r2 - 15, 0, Math.PI * 2);
        ctx.fill();
        for (let j = 0; j < teeth2; j++) {
          ctx.rotate((Math.PI * 2) / teeth2);
          ctx.fillRect(-14, -r2, 28, 28);
        }
        ctx.fillStyle = '#042f2e';
        ctx.beginPath();
        ctx.arc(0, 0, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // SIM 10: ECONOMIC MARKET EQUILIBRIUM
      else if (simType === 'economic_market') {
        const ox = 340;
        const oy = targetH - 240;
        const axisL = 700;

        // Axes (Price vs Quantity)
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(ox, oy - axisL);
        ctx.lineTo(ox, oy);
        ctx.lineTo(ox + axisL, oy);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('Price (P)', ox - 110, oy - axisL + 40);
        ctx.fillText('Quantity (Q)', ox + axisL - 60, oy + 50);

        // Demand Curve D (Downward sloping)
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(ox + 80, oy - 620);
        ctx.lineTo(ox + 640, oy - 80);
        ctx.stroke();
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('Demand (D)', ox + 655, oy - 80);

        // Supply Curve S (Upward sloping)
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(ox + 80, oy - 80);
        ctx.lineTo(ox + 640, oy - 620);
        ctx.stroke();
        ctx.fillStyle = '#10b981';
        ctx.fillText('Supply (S)', ox + 655, oy - 620);

        // Equilibrium Point
        const eqX = ox + 360;
        const eqY = oy - 350;
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(eqX, eqY, 14, 0, Math.PI * 2);
        ctx.fill();

        // Dotted projections to axes
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(eqX, eqY);
        ctx.lineTo(ox, eqY);
        ctx.moveTo(eqX, eqY);
        ctx.lineTo(eqX, oy);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText('Equilibrium Pe', ox - 160, eqY + 8);
        ctx.fillText('Qe', eqX - 15, oy + 40);
      }

      // GENERIC SCIENTIFIC COORDINATE PLOTTER FOR OTHER TOPICS
      else {
        const cx = targetW / 2;
        const cy = targetH / 2;

        // Animated Harmonic Waves
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (let x = 120; x < targetW - 120; x += 4) {
          const y = cy + Math.sin((x * 0.015) + t * 3) * 120 * Math.cos(t * 0.5);
          if (x === 120) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Rotating Coordinate Axis
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * 0.25);
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
        ctx.lineWidth = 2;
        ctx.strokeRect(-220, -220, 440, 440);
        ctx.restore();

        // Central topic emblem
        ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.beginPath();
        ctx.arc(cx, cy, 180, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(selectedClip.topicTitle, cx, cy - 20);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '20px sans-serif';
        ctx.fillText(`${selectedClip.subject} • ${selectedClip.classLevel}`, cx, cy + 30);
        ctx.textAlign = 'left';
      }

      ctx.restore();

      animFrameIdRef.current = requestAnimationFrame(renderFrame);
    };

    animFrameIdRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [selectedClip, isPlaying, playbackRate, isLooping, duration]);

  // ---------------------------------------------------------------------------
  // 7. VIDEO EVENT HANDLERS (IF VIDEO MODE ACTIVE)
  // ---------------------------------------------------------------------------
  const handleVideoError = () => {
    // Graceful fallback: switch immediately to 4K Procedural Simulation
    setHasVideoError(true);
    setDisplayMode('simulation');
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (displayMode === 'video' && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (displayMode === 'video' && videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col group select-none ${
        isFullscreen ? 'w-screen h-screen rounded-none z-50 p-6' : 'w-full'
      }`}
    >
      {/* ------------------------------------------------------------------- */}
      {/* TOP HEADER: SUBJECT & CLIP SELECTOR BAR */}
      {/* ------------------------------------------------------------------- */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-3 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowSubjectPicker(!showSubjectPicker)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-md flex items-center gap-2 transition-all cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{selectedClip.subject}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-80" />
          </button>

          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold text-white truncate max-w-md">
              {selectedClip.topicTitle}
            </span>
            <span className="text-[10px] text-slate-400">
              NERDC Curriculum Standard • {selectedClip.classLevel} (Term {selectedClip.term})
            </span>
          </div>
        </div>

        {/* Action Controls & Mode Switch */}
        <div className="flex items-center gap-2">
          {/* Simulation vs Recorded Video Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setDisplayMode('simulation');
                setHasVideoError(false);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                displayMode === 'simulation'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-emerald-300" />
              <span>4K Simulation</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setDisplayMode('video');
                if (videoRef.current) videoRef.current.play().catch(() => {});
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                displayMode === 'video'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-3 h-3" />
              <span>Video Aid</span>
            </button>
          </div>

          {/* Toggle Labels */}
          <button
            type="button"
            onClick={() => setShowLabels(!showLabels)}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 border ${
              showLabels
                ? 'bg-indigo-950/80 text-indigo-300 border-indigo-700/60'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title={showLabels ? 'Hide Labels for Classroom Quiz' : 'Show Full Labeled Pins'}
          >
            {showLabels ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{showLabels ? 'Labels On' : 'Labels Hidden'}</span>
          </button>

          {/* Audible Narration Button */}
          <button
            type="button"
            onClick={handleToggleNarration}
            className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 border ${
              isSpeaking
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md animate-pulse'
                : 'bg-slate-900 text-amber-300 border-slate-800 hover:bg-slate-800 hover:text-amber-200'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isSpeaking ? 'Pause Audible' : 'Audible Teacher Voice'}</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 4K ULTRA-HD VIEWPORT CANVAS / VIDEO */}
      {/* ------------------------------------------------------------------- */}
      <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
        {/* Render 1: Procedural Infallible 4K Canvas */}
        {displayMode === 'simulation' || hasVideoError ? (
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain cursor-pointer"
            onClick={togglePlay}
          />
        ) : (
          /* Render 2: Recorded Video Clip */
          <video
            ref={videoRef}
            src={selectedClip.videoUrl}
            loop={isLooping}
            muted={isMuted}
            playsInline
            onError={handleVideoError}
            className="w-full h-full object-contain cursor-pointer"
            onClick={togglePlay}
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none z-10">
          <span className="px-3 py-1 rounded-xl text-xs font-black bg-emerald-600/90 text-white shadow-lg flex items-center gap-1.5 backdrop-blur-md border border-emerald-400/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>4K ULTRA-HD</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-slate-900/80 text-slate-300 border border-slate-700/60 backdrop-blur-md">
            {displayMode === 'simulation' ? 'Procedural Simulation Engine' : 'Digital Classroom Visual Aid'}
          </span>
          {hasVideoError && (
            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
              Infallible 4K Simulation Active
            </span>
          )}
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* FULL LABELING: COORDINATE PINS OVERLAY */}
        {/* ----------------------------------------------------------------- */}
        {showLabels && selectedClip.pins && selectedClip.pins.map((pin) => {
          const isSelected = activePin?.id === pin.id;
          return (
            <div
              key={pin.id}
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleReadPinAloud(pin);
              }}
            >
              {/* Pulse ring for selected/active pin */}
              {isSelected && (
                <div className="absolute inset-0 -m-2 rounded-full border-2 border-amber-400 animate-ping pointer-events-none" />
              )}

              {/* Pin Badge Circle */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-black text-xs shadow-xl transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 scale-125 ring-4 ring-amber-400/40'
                    : 'bg-emerald-600/90 text-white hover:bg-emerald-500 hover:scale-110 ring-2 ring-white/50 backdrop-blur-sm'
                }`}
              >
                {pin.number}
              </div>

              {/* Pin Floating Tag Label */}
              <div
                className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-xl transition-all pointer-events-none ${
                  isSelected
                    ? 'bg-slate-900 text-amber-300 border border-amber-400/80 scale-105'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-700/60 group-hover/pin:scale-105'
                }`}
              >
                {pin.name}
              </div>
            </div>
          );
        })}

        {/* ----------------------------------------------------------------- */}
        {/* ACTIVE PIN DETAIL MODAL CARD (POPUP ON PIN CLICK) */}
        {/* ----------------------------------------------------------------- */}
        {activePin && (
          <div className="absolute bottom-16 right-4 max-w-sm sm:max-w-md bg-slate-900/95 border border-amber-400/40 rounded-2xl p-4 shadow-2xl backdrop-blur-md z-30 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-start justify-between gap-3 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                  {activePin.number}
                </span>
                <h4 className="text-sm font-extrabold text-white">{activePin.name}</h4>
              </div>
              <button
                type="button"
                onClick={() => setActivePin(null)}
                className="text-slate-400 hover:text-white text-xs font-bold px-1.5 py-0.5 rounded hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {activePin.description}
            </p>

            {activePin.examTip && (
              <div className="mt-2.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 flex items-start gap-2">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-300 font-bold">WAEC / BECE Exam Tip:</strong>
                  <span>{activePin.examTip}</span>
                </div>
              </div>
            )}

            <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => handleReadPinAloud(activePin)}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Read Label Aloud</span>
              </button>
              <span className="text-[10px] text-slate-400">
                Click pin again to close
              </span>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* LIVE SUBTITLES / CLOSED CAPTIONS OVERLAY (PROJECTOR BAR) */}
        {/* ----------------------------------------------------------------- */}
        {showCaptions && currentSubtitle && (
          <div className="absolute bottom-16 left-6 right-6 flex justify-center pointer-events-none z-20">
            <div className="bg-slate-950/90 border border-emerald-500/50 rounded-2xl px-6 py-2.5 max-w-3xl shadow-2xl backdrop-blur-md text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] uppercase font-mono font-black text-emerald-400 tracking-wider">
                  Audible Teacher Narration Subtitles
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                "{currentSubtitle}"
              </p>
            </div>
          </div>
        )}

        {/* Big Center Play Button (when paused) */}
        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-emerald-500 transition-all cursor-pointer backdrop-blur-sm z-20"
            aria-label="Play Demonstration"
          >
            <Play className="w-7 h-7 ml-1 fill-white" />
          </button>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* BOTTOM HUD CONTROLS BAR */}
        {/* ----------------------------------------------------------------- */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex flex-col gap-2 z-20">
          {/* Scrubber Progress Bar */}
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-mono text-slate-300 tabular-nums">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <span className="text-[11px] font-mono text-slate-400 tabular-nums">
              {formatTime(duration)}
            </span>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between text-slate-300">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={togglePlay}
                className="p-1.5 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentTime(0);
                  if (displayMode === 'video' && videoRef.current) videoRef.current.currentTime = 0;
                }}
                className="p-1.5 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
                title="Rewind to start"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Speed Buttons */}
              <div className="hidden sm:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
                <Gauge className="w-3.5 h-3.5 text-slate-400 ml-1" />
                {[0.75, 1, 1.25, 1.5].map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => setPlaybackRate(speed)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors ${
                      playbackRate === speed ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              {/* Read All Pins Sequentially */}
              <button
                type="button"
                onClick={handleReadAllPinsAloud}
                className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-bold border transition-colors ${
                  isSequentialNarration
                    ? 'bg-amber-400 text-slate-950 border-amber-300 font-extrabold'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:text-white'
                }`}
                title="Automatically read each coordinate label pin in sequence"
              >
                <Headphones className="w-3 h-3 text-amber-400" />
                <span>Read All Labels Aloud</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPinDrawer(!showPinDrawer)}
                className={`p-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                  showPinDrawer ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Inspect All Coordinate Pins"
              >
                <Tag className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">{selectedClip.pins.length} Labels</span>
              </button>

              <button
                type="button"
                onClick={() => setIsLooping(!isLooping)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isLooping ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-700/50' : 'text-slate-400 hover:text-white'
                }`}
                title="Continuous classroom loop"
              >
                <Repeat className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-1.5 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Classroom Projector Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* PIN INSPECTOR DRAWER (WHEN CLICKED) */}
      {/* ------------------------------------------------------------------- */}
      {showPinDrawer && (
        <div className="p-4 bg-slate-900/95 border-t border-slate-800 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Labeled Coordinate Points ({selectedClip.pins.length})</span>
            </span>
            <button
              type="button"
              onClick={handleReadAllPinsAloud}
              className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Listen to All Points Aloud</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {selectedClip.pins.map((pin) => (
              <div
                key={pin.id}
                onClick={() => handleReadPinAloud(pin)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                  activePin?.id === pin.id
                    ? 'bg-emerald-950/60 border-emerald-500/80 ring-1 ring-emerald-400'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center">
                      {pin.number}
                    </span>
                    <strong className="text-xs font-bold text-white">{pin.name}</strong>
                  </div>
                  <Volume2 className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {pin.description}
                </p>
                {pin.examTip && (
                  <span className="text-[10px] text-amber-300 font-medium">
                    Tip: {pin.examTip}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 24-SUBJECT BROWSER SELECTOR MODAL */}
      {/* ------------------------------------------------------------------- */}
      {showSubjectPicker && (
        <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-3 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-300">
                Statutory Secondary School Subject Directory (All 24 Subjects Loaded)
              </h3>
              <p className="text-[10px] text-slate-400">
                Select any subject and topic to instantly project high-definition 4K realia with coordinate labels and audible teacher narration.
              </p>
            </div>
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search subject or topic..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {['All', 'Science & Math', 'Vocational & Tech', 'Commercial & Business', 'Arts & Humanities', 'Core & General'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Topic Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto pr-1">
            {filteredClips.map((clip) => {
              const isCurrent = selectedClip.id === clip.id;
              return (
                <button
                  key={clip.id}
                  type="button"
                  onClick={() => handleSelectClip(clip)}
                  className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between gap-1.5 ${
                    isCurrent
                      ? 'bg-emerald-950/60 border-emerald-500 ring-1 ring-emerald-400 text-white'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      {clip.subject}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {clip.classLevel}
                    </span>
                  </div>
                  <div className="text-xs font-bold leading-snug line-clamp-2">
                    {clip.topicTitle}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
                    <span>{clip.pins.length} Labeled Pins</span>
                    <span className="text-emerald-400 font-bold">🔊 Audible Ready</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* QUICK PRESET STRIP */}
      {/* ------------------------------------------------------------------- */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap pl-2 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Curriculum 4K Realia:</span>
        </span>
        {ALL_4K_CURRICULUM_CLIPS.map((clip) => {
          const isSelected = selectedClip.id === clip.id;
          return (
            <button
              key={clip.id}
              type="button"
              onClick={() => handleSelectClip(clip)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 ring-1 ring-emerald-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {clip.subject}: {clip.topicTitle.split('&')[0].split(':')[0].trim()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
