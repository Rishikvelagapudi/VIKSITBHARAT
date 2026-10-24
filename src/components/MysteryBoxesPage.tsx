import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, ExternalLink, Gift, Sparkles, PartyPopper, 
  Zap, Lock, Unlock, Check, Globe, RefreshCw, Star
} from 'lucide-react';
import { AshokaChakra } from './AshokaChakra';
import { ShiningStar } from './ShiningStar';
import { playClick, playFanfare, playChime } from '../lib/audio';

interface MysteryBoxesPageProps {
  onBack: () => void;
}

interface MysteryBoxData {
  id: 'saffron' | 'white' | 'green';
  num: string;
  boxName: string;
  tagline: string;
  mysteryHint: string;
  title: string;
  subtitle: string;
  defaultUrl: string;
  glowColor: string;
  ribbonGradient: string;
  boxGradient: string;
  textColor: string;
  beamColor: string;
  accentHex: string;
}

const INITIAL_BOXES: MysteryBoxData[] = [
  {
    id: 'saffron',
    num: '01',
    boxName: 'Saffron Mystery Box',
    tagline: 'Kesari Tier • AI Surveillance & Incident Response',
    mysteryHint: 'Break the seal to unlock Incident Desk',
    title: 'Incident Desk',
    subtitle: 'Multi-Camera AI Incident Management & Surveillance',
    defaultUrl: 'https://incidentdesk-ko48.onrender.com',
    glowColor: 'rgba(255, 103, 31, 0.8)',
    ribbonGradient: 'from-[#FF671F] via-amber-200 to-[#FF9933]',
    boxGradient: 'from-[#200802]/95 via-[#380e04]/90 to-[#120401]/95',
    textColor: 'text-[#FF9933]',
    beamColor: 'from-[#FF671F]/70 to-transparent',
    accentHex: '#FF671F',
  },
  {
    id: 'white',
    num: '02',
    boxName: 'Ashoka White Mystery Box',
    tagline: 'Shweta Tier • Visual Intelligence & Forensic AI',
    mysteryHint: 'Break the seal to unlock TrueSight AI',
    title: 'TrueSight AI',
    subtitle: 'Forensic & Visual Intelligence Engine',
    defaultUrl: 'https://truesight-ai-1.onrender.com/',
    glowColor: 'rgba(2, 132, 199, 0.85)',
    ribbonGradient: 'from-cyan-300 via-white to-blue-500',
    boxGradient: 'from-[#050b18]/95 via-[#081e44]/90 to-[#020712]/95',
    textColor: 'text-cyan-300',
    beamColor: 'from-cyan-400/70 to-transparent',
    accentHex: '#0284c7',
  },
  {
    id: 'green',
    num: '03',
    boxName: 'Emerald Green Mystery Box',
    tagline: 'Harit Tier • Digital Forensics & Steganography AI',
    mysteryHint: 'Break the seal to unlock StegoVision AI',
    title: 'StegoVision AI',
    subtitle: 'Steganography Detection & Hidden Extraction',
    defaultUrl: 'https://stegovision-ai-1.onrender.com/',
    glowColor: 'rgba(16, 185, 129, 0.8)',
    ribbonGradient: 'from-emerald-400 via-teal-100 to-emerald-600',
    boxGradient: 'from-[#03150d]/95 via-[#062c1a]/90 to-[#010c07]/95',
    textColor: 'text-emerald-300',
    beamColor: 'from-emerald-400/70 to-transparent',
    accentHex: '#10b981',
  },
];

export const MysteryBoxesPage: React.FC<MysteryBoxesPageProps> = ({ onBack }) => {
  const [unwrappingBox, setUnwrappingBox] = useState<'saffron' | 'white' | 'green' | null>(null);
  const [revealedBoxes, setRevealedBoxes] = useState<Record<string, boolean>>({});
  const [projectUrls, setProjectUrls] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('viksit_mystery_urls');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (!parsed.saffron || parsed.saffron.includes('example.com')) {
            parsed.saffron = 'https://incidentdesk-ko48.onrender.com';
          }
          if (!parsed.white || !parsed.white.includes('truesight')) {
            parsed.white = 'https://truesight-ai-1.onrender.com/';
          }
          if (!parsed.green || parsed.green.includes('example.com')) {
            parsed.green = 'https://stegovision-ai-1.onrender.com/';
          }
          return parsed;
        } catch (_) {}
      }
    }
    return {
      saffron: 'https://incidentdesk-ko48.onrender.com',
      white: 'https://truesight-ai-1.onrender.com/',
      green: 'https://stegovision-ai-1.onrender.com/',
    };
  });

  // Persist URLs in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('viksit_mystery_urls', JSON.stringify(projectUrls));
    }
  }, [projectUrls]);

  const handleOpenBox = (boxId: 'saffron' | 'white' | 'green') => {
    if (unwrappingBox) return;
    setUnwrappingBox(boxId);
    playFanfare();

    setTimeout(() => {
      setRevealedBoxes((prev) => ({ ...prev, [boxId]: true }));
      setUnwrappingBox(null);
    }, 1200);
  };

  return (
    <div className="min-h-screen text-white font-sans flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-6 relative z-10">
      
      {/* Top Bar with Back Navigation */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4 pb-6 border-b border-white/10">
        <button
          type="button"
          onClick={() => {
            playClick();
            onBack();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs sm:text-sm tracking-wider transition-all hover:-translate-x-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#FF9933]" />
          <span>Back to Viksit Bharat</span>
        </button>

        {/* Center Emblem */}
        <div className="flex items-center gap-3 select-none">
          <div className="p-1 rounded-full bg-gradient-to-tr from-[#FF671F] via-white to-[#10b981] shadow-[0_0_20px_rgba(255,103,31,0.5)]">
            <div className="w-9 h-9 rounded-full bg-[#03060f] flex items-center justify-center p-0.5">
              <AshokaChakra size={26} spinning={true} glow={false} />
            </div>
          </div>
          <span className="font-display font-black text-lg sm:text-xl uppercase tracking-wider hidden sm:inline">
            VIKSIT <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF671F] via-white to-[#10b981]">BHARAT</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>PROJECT VAULT</span>
        </div>
      </div>

      {/* Main Vault Content */}
      <div className="max-w-6xl mx-auto w-full py-8 sm:py-12 flex flex-col items-center text-center">
        
        {/* Vault Header Banner */}
        <div className="space-y-3 max-w-3xl mx-auto mb-10 sm:mb-14 relative">
          <div className="absolute -top-4 -left-6 hidden sm:block">
            <ShiningStar size={28} color="saffron" delay={0.2} />
          </div>
          <div className="absolute -top-4 -right-6 hidden sm:block">
            <ShiningStar size={30} color="green" delay={0.8} />
          </div>

          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-1.5 rounded-full bg-gradient-to-r from-[#FF671F]/20 via-white/10 to-[#10b981]/20 border border-white/20 text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.3)] backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>✦ THE TRICOLOR MYSTERY BOXES ✦</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase font-display tracking-tight text-white pt-2">
            UNWRAP THE <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF671F] via-white to-[#10b981]">PROJECTS</span>
          </h2>

          <p className="text-white/70 text-sm sm:text-base font-light max-w-xl mx-auto">
            Three sealed Indian Tricolor Mystery Boxes containing project destinations. Tap any box to break the sovereign seal and reveal the project portal!
          </p>
        </div>

        {/* 3 Tricolor Mystery Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-5xl px-2">
          {INITIAL_BOXES.map((box) => {
            const isUnwrapping = unwrappingBox === box.id;
            const isRevealed = revealedBoxes[box.id] || false;
            const currentUrl = projectUrls[box.id] || box.defaultUrl;

            return (
              <motion.div
                key={box.id}
                animate={
                  isUnwrapping
                    ? {
                        scale: [1, 1.08, 0.96, 1.05],
                        rotate: [0, -6, 6, -3, 3, 0],
                      }
                    : {
                        y: [0, -8, 0],
                      }
                }
                transition={
                  isUnwrapping
                    ? { duration: 0.7, times: [0, 0.25, 0.5, 1] }
                    : {
                        y: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' },
                      }
                }
                whileHover={!isUnwrapping ? { scale: 1.04, y: -12 } : {}}
                whileTap={!isUnwrapping ? { scale: 0.97 } : {}}
                className={`relative min-h-[380px] sm:min-h-[420px] rounded-3xl p-[2.5px] select-none transition-all duration-300 shadow-2xl flex flex-col justify-between ${
                  isUnwrapping ? 'z-30' : 'z-10'
                }`}
                style={{
                  boxShadow: isUnwrapping || isRevealed
                    ? `0 0 65px ${box.glowColor}`
                    : `0 15px 40px -10px ${box.glowColor}`,
                }}
              >
                {/* Outer Glowing Ribbon Border */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${box.ribbonGradient} rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity`}
                />

                {/* Inner Gift Box Container */}
                <div
                  className={`relative w-full h-full rounded-[22px] bg-gradient-to-b ${box.boxGradient} backdrop-blur-2xl border border-white/25 p-6 flex flex-col items-center justify-between overflow-hidden flex-1`}
                >
                  {/* CROSS RIBBONS (The Gift Wrap Bands) */}
                  {!isRevealed && (
                    <>
                      <div
                        className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-9 bg-gradient-to-b ${box.ribbonGradient} opacity-80 pointer-events-none shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-500 ${
                          isUnwrapping ? 'opacity-20 scale-y-125' : ''
                        }`}
                      />
                      <div
                        className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-9 bg-gradient-to-r ${box.ribbonGradient} opacity-80 pointer-events-none shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-500 ${
                          isUnwrapping ? 'opacity-20 scale-x-125' : ''
                        }`}
                      />
                    </>
                  )}

                  {/* Ambient Shimmer Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* CONTENT VIEW: UNREVEALED (MYSTERY BOX) */}
                  {!isRevealed && !isUnwrapping && (
                    <div 
                      onClick={() => handleOpenBox(box.id)}
                      className="w-full h-full flex flex-col items-center justify-between text-center relative z-20 cursor-pointer py-2"
                    >
                      {/* Top Box Tag */}
                      <div className="flex items-center justify-between w-full">
                        <span className="text-2xl font-black font-mono text-white/40">
                          {box.num}
                        </span>
                        <div className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono uppercase tracking-wider text-white/80">
                          SEALED
                        </div>
                      </div>

                      {/* Center Gift Box Emblem with Sparkling Star */}
                      <div className="relative my-4">
                        <div className="p-6 rounded-3xl bg-white/10 border border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.3)] relative group">
                          <Gift className={`w-14 h-14 ${box.textColor} animate-pulse`} />
                          <div className="absolute -top-3 -right-3">
                            <ShiningStar size={24} color={box.id === 'saffron' ? 'saffron' : box.id === 'white' ? 'white' : 'gold'} delay={0.3} />
                          </div>
                        </div>
                      </div>

                      {/* Box Name & Hint */}
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black uppercase font-display text-white tracking-wide">
                          {box.boxName}
                        </h3>
                        <p className={`text-xs font-mono font-bold uppercase tracking-wider mt-1 ${box.textColor}`}>
                          {box.tagline}
                        </p>
                        <p className="text-[11px] text-white/60 font-light mt-2 max-w-[200px] mx-auto">
                          {box.mysteryHint}
                        </p>
                      </div>

                      {/* Tap to Unlock Button */}
                      <div className="mt-4 px-6 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-mono text-xs uppercase tracking-widest font-bold shadow-lg flex items-center gap-2 group-hover:scale-105 transition-transform">
                        <Unlock className="w-3.5 h-3.5" />
                        <span>Tap to Unwrap</span>
                      </div>
                    </div>
                  )}

                  {/* UNWRAPPING ANIMATION IN PROGRESS */}
                  {isUnwrapping && (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center relative z-20 py-4">
                      {/* Upward Energy Beam */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${box.beamColor} blur-2xl animate-pulse pointer-events-none`} />

                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.4, 1] }}
                        className="flex items-center gap-3 mb-4"
                      >
                        <PartyPopper className="w-10 h-10 text-amber-300 animate-bounce" />
                        <Sparkles className="w-10 h-10 text-cyan-300 animate-pulse" />
                        <PartyPopper className="w-10 h-10 text-emerald-400 animate-bounce" />
                      </motion.div>

                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 text-black text-xs font-black uppercase tracking-widest shadow-[0_0_20px_#f59e0b] animate-bounce">
                        <Sparkles className="w-4 h-4 fill-black" />
                        <span>Breaking Seal...</span>
                      </div>

                      <div className="w-44 h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/20 mt-6">
                        <motion.div
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.1, ease: 'linear' }}
                          className={`h-full bg-gradient-to-r ${box.ribbonGradient}`}
                        />
                      </div>
                    </div>
                  )}

                  {/* REVEALED PROJECT DESTINATION CARD */}
                  {isRevealed && !isUnwrapping && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full h-full flex flex-col items-center justify-between text-center relative z-20 py-2"
                    >
                      {/* Top Status */}
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>UNLOCKED</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            playClick();
                            setRevealedBoxes((prev) => ({ ...prev, [box.id]: false }));
                          }}
                          className="text-[10px] font-mono text-white/50 hover:text-white uppercase tracking-wider underline cursor-pointer"
                        >
                          Re-Seal Box
                        </button>
                      </div>

                      {/* Revealed Icon & Badge */}
                      <div className="my-2">
                        <div className={`p-4 rounded-2xl bg-white/10 border border-white/20 ${box.textColor} shadow-[0_0_25px_rgba(255,255,255,0.4)] relative inline-block mb-2`}>
                          <Globe className="w-10 h-10" />
                          <div className="absolute -top-2 -right-2">
                            <ShiningStar size={20} color="gold" delay={0.2} />
                          </div>
                        </div>

                        <h4 className="text-xl sm:text-2xl font-black text-white uppercase font-display tracking-tight">
                          {box.title}
                        </h4>
                        <p className={`text-xs font-mono font-bold tracking-wider uppercase mt-0.5 ${box.textColor}`}>
                          {box.subtitle}
                        </p>
                      </div>

                      {/* Current Link Preview */}
                      <div className="w-full my-3 p-3 rounded-xl bg-black/40 border border-white/10 text-left">
                        <span className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">
                          Project URL:
                        </span>
                        <div className="text-xs font-mono text-white/80 truncate font-light" title={currentUrl}>
                          {currentUrl}
                        </div>
                      </div>

                      {/* Open Project Button */}
                      <a
                        href={currentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playChime()}
                        className={`w-full py-3 sm:py-3.5 rounded-full bg-gradient-to-r ${box.ribbonGradient} text-black font-black text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer`}
                      >
                        <span>Open Project Page</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </motion.div>
                  )}

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Subtle Footer Note */}
      <div className="max-w-5xl mx-auto w-full pt-6 border-t border-white/10 text-center text-xs font-mono text-white/50">
        <span>VIKSIT BHARAT @ 2047 • 3 SOVEREIGN PROJECT DESTINATIONS 🇮🇳</span>
      </div>

    </div>
  );
};
