import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { AshokaChakra } from './AshokaChakra';
import { ShiningStar } from './ShiningStar';
import { playFanfare } from '../lib/audio';

interface HeroSectionProps {
  onLaunchProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLaunchProject,
}) => {
  return (
    <section className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center pt-4 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center my-auto">
        
        {/* Ashoka Chakra Centerpiece with Revolving Orbits & Sparkling Stars */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative my-4 sm:my-6 group"
        >
          {/* Ambient Starlight Radial Aura */}
          <div className="absolute inset-0 -m-12 rounded-full blur-3xl opacity-80 bg-gradient-to-tr from-[#FF671F]/50 via-[#0284c7]/40 to-[#10b981]/50 group-hover:opacity-100 transition-opacity" />

          {/* Orbiting Shining Stars around Chakra */}
          <div className="absolute -top-5 -left-8 sm:-left-12 z-20">
            <ShiningStar size={38} color="gold" delay={0.1} />
          </div>
          <div className="absolute -bottom-4 -right-8 sm:-right-12 z-20">
            <ShiningStar size={40} color="cyan" delay={0.6} />
          </div>
          <div className="absolute top-1/2 -right-10 sm:-right-16 -translate-y-1/2 z-20">
            <ShiningStar size={30} color="saffron" delay={1.1} />
          </div>
          <div className="absolute top-1/2 -left-10 sm:-left-16 -translate-y-1/2 z-20">
            <ShiningStar size={32} color="white" delay={1.6} />
          </div>

          {/* Central Chakra */}
          <div className="relative p-3.5 sm:p-5 rounded-full bg-gradient-to-tr from-[#FF671F] via-white to-[#10b981] shadow-[0_0_65px_rgba(2,132,199,0.8)] group-hover:shadow-[0_0_85px_rgba(255,103,31,0.95)] transition-all duration-500">
            <div className="rounded-full bg-[#03060f]/95 p-2.5 sm:p-3.5 border border-white/20">
              <AshokaChakra size={130} className="sm:w-44 sm:h-44 md:w-52 md:h-52" glow={true} />
            </div>
          </div>
        </motion.div>

        {/* Main Hero Title: VIKSIT BHARAT with Brilliant Starlight Accents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-4 max-w-5xl relative"
        >
          {/* Floating Shining Stars around Typography */}
          <div className="absolute -top-8 left-2 sm:left-12 z-20">
            <ShiningStar size={46} color="saffron" delay={0.3} />
          </div>
          <div className="absolute -top-6 right-2 sm:right-12 z-20">
            <ShiningStar size={50} color="gold" delay={0.9} />
          </div>
          <div className="absolute top-1/2 -left-6 sm:left-2 z-20">
            <ShiningStar size={36} color="cyan" delay={1.3} />
          </div>
          <div className="absolute top-1/2 -right-6 sm:right-2 z-20">
            <ShiningStar size={38} color="white" delay={0.7} />
          </div>
          <div className="absolute -bottom-6 left-1/4 z-20">
            <ShiningStar size={32} color="saffron" delay={1.8} />
          </div>
          <div className="absolute -bottom-6 right-1/4 z-20">
            <ShiningStar size={34} color="gold" delay={1.5} />
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black uppercase tracking-tight font-display leading-[0.9] select-none relative z-10">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF671F] via-[#FF8533] to-[#FFB366] drop-shadow-[0_0_45px_rgba(255,103,31,0.95)]">
              VIKSIT
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#86efac] to-[#10b981] drop-shadow-[0_0_50px_rgba(16,185,129,0.9)] mt-1 sm:mt-3">
              BHARAT
            </span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-bold font-display uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-cyan-200 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] max-w-3xl mx-auto px-4 pt-4">
            “Let Youth Be The Frontier For Bharat”
          </p>

          <p className="text-sm sm:text-base md:text-lg font-light text-white/80 max-w-2xl mx-auto tracking-wide leading-relaxed px-4 pt-1">
            Empowering 1.4 Billion dreams through bold innovation, fearless intellect, and sovereign technological supremacy by 2047.
          </p>

          <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#FF9933] font-semibold pt-1">
            — युवा शक्ति • राष्ट्र शक्ति • विकसित भारत @ 2047 —
          </p>
        </motion.div>

        {/* ONLY ONE Call to Action: Launch Project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center mt-10 sm:mt-14"
        >
          <button
            type="button"
            onClick={() => {
              onLaunchProject();
              try {
                playFanfare();
              } catch (_) {}
            }}
            className="group relative px-10 sm:px-14 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#FF671F] via-amber-400 to-[#10b981] text-white font-black text-base sm:text-lg uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(255,103,31,0.75)] hover:shadow-[0_0_65px_rgba(2,132,199,0.95)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer select-none"
          >
            {/* Sparkle Star on Button */}
            <div className="absolute -top-2.5 -right-2.5">
              <ShiningStar size={22} color="gold" delay={0.2} />
            </div>
            <span>Launch Project</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
