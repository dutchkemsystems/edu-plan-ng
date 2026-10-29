import React, { useRef, useState, useEffect } from 'react';
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
  CheckCircle2,
  Sparkles,
  Gauge
} from 'lucide-react';

interface VideoAidPlayerProps {
  videoUrl?: string;
  topicTitle?: string;
  onUrlChange?: (url: string) => void;
}

const SAMPLE_4K_CURRICULUM_CLIPS = [
  {
    id: 'biology_cell',
    title: 'Biological Cell Division & Mitosis (4K Microscopic)',
    subject: 'Biology (SSS 1–3)',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 'physics_mechanics',
    title: 'Kinematics & Newton’s Third Law Demonstration (4K Ultra-HD)',
    subject: 'Physics (SSS 1–2)',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 'chemistry_titration',
    title: 'Volumetric Acid-Base Titration Laboratory Setup (4K Lab)',
    subject: 'Chemistry (SSS 2–3)',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  {
    id: 'geography_weathering',
    title: 'Plate Tectonics, River Erosion & Landforms (4K Aerial)',
    subject: 'Geography (JSS 3 / SSS 1)',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  }
];

export const VideoAidPlayer: React.FC<VideoAidPlayerProps> = ({
  videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  topicTitle = 'Classroom Visual Realia Clip (4K Ultra-HD)',
  onUrlChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeUrl, setActiveUrl] = useState(videoUrl);

  useEffect(() => {
    if (videoUrl) setActiveUrl(videoUrl);
  }, [videoUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [activeUrl]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const toggleLoop = () => {
    const nextLoop = !isLooping;
    setIsLooping(nextLoop);
    if (videoRef.current) {
      videoRef.current.loop = nextLoop;
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

  const handleSelectPreset = (url: string) => {
    setActiveUrl(url);
    if (onUrlChange) onUrlChange(url);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col group ${
        isFullscreen ? 'w-screen h-screen rounded-none z-50 p-6' : 'w-full'
      }`}
    >
      {/* 4K Ultra-HD Video Element */}
      <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src={activeUrl}
          loop={isLooping}
          muted={isMuted}
          playsInline
          className="w-full h-full object-contain cursor-pointer"
          onClick={togglePlay}
        />

        {/* Top Header Badge */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-emerald-600/90 text-white shadow-lg flex items-center gap-1.5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>4K ULTRA-HD</span>
            </span>
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-900/80 text-slate-300 border border-slate-700/60 backdrop-blur-md">
              Ad-Free Classroom Projection
            </span>
          </div>

          {isLooping && (
            <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-indigo-900/80 text-indigo-300 border border-indigo-700/60 flex items-center gap-1 backdrop-blur-md">
              <Repeat className="w-3 h-3" />
              <span>Loop Enabled</span>
            </span>
          )}
        </div>

        {/* Big Center Play Overlay (when paused) */}
        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-emerald-500 transition-all cursor-pointer backdrop-blur-sm"
            aria-label="Play Video"
          >
            <Play className="w-7 h-7 ml-1 fill-white" />
          </button>
        )}

        {/* Bottom Control Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col gap-2">
          {/* Progress Scrubber */}
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
            <div className="flex items-center gap-3">
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
                  if (videoRef.current) videoRef.current.currentTime = 0;
                }}
                className="p-1.5 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
                title="Rewind to start"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="p-1.5 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
              </button>

              {/* Speed Buttons */}
              <div className="hidden sm:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
                <Gauge className="w-3.5 h-3.5 text-slate-400 ml-1" />
                {[0.75, 1, 1.25, 1.5].map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => handleSpeedChange(speed)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors ${
                      playbackRate === speed ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleLoop}
                className={`p-1.5 rounded-lg transition-colors ${
                  isLooping ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-700/50' : 'text-slate-400 hover:text-white'
                }`}
                title="Toggle continuous classroom demonstration loop"
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

      {/* Preset Video Bank */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap pl-2 flex items-center gap-1">
          <Video className="w-3.5 h-3.5 text-emerald-400" />
          <span>Statutory 4K Realia:</span>
        </span>
        {SAMPLE_4K_CURRICULUM_CLIPS.map((clip) => (
          <button
            key={clip.id}
            type="button"
            onClick={() => handleSelectPreset(clip.url)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeUrl === clip.url
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 ring-1 ring-emerald-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {clip.title.split('(')[0].trim()}
          </button>
        ))}
      </div>
    </div>
  );
};
