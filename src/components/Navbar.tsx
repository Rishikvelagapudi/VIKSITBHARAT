import React from 'react';
import { Sparkles, Star } from 'lucide-react';
import { AshokaChakra } from './AshokaChakra';
import { ShiningStar } from './ShiningStar';
import { playChime } from '../lib/audio';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#03060f]/85 backdrop-blur-2xl shadow-2xl shadow-black/80">
      {/* Top Tricolor Ultra-thin Gradient Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#FF671F] via-white to-[#10b981]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 sm:h-24 flex items-center justify-center relative">
        
        {/* Ambient Subtle Shining Star Flairs */}
        <div className="absolute left-6 sm:left-12 hidden md:block opacity-75">
          <ShiningStar size={24} color="saffron" delay={0.2} />
        </div>
        <div className="absolute right-6 sm:right-12 hidden md:block opacity-75">
          <ShiningStar size={26} color="cyan" delay={0.7} />
        </div>

        {/* Centerpiece Sovereign Brand */}
        <div 
          onClick={() => { playChime(); }}
          className="flex items-center gap-3.5 sm:gap-4 select-none cursor-pointer group"
        >
          {/* Emblem with Tricolor Outer Halo */}
          <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#FF671F] via-white to-[#10b981] shadow-[0_0_30px_rgba(255,103,31,0.6)] group-hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#03060f] flex items-center justify-center p-1 border border-white/20">
              <AshokaChakra size={40} spinning={true} glow={false} />
            </div>
            
            {/* Tiny Star Accents on Emblem */}
            <div className="absolute -top-1 -right-1">
              <ShiningStar size={14} color="gold" delay={0.3} />
            </div>
          </div>

          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-[0.14em] font-display uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#FF671F] via-white to-[#10b981] drop-shadow-[0_0_18px_rgba(255,103,31,0.7)] leading-none">
                VIKSIT <span className="text-white drop-shadow-[0_0_20px_rgba(2,132,199,0.9)]">BHARAT</span>
              </h1>
              <ShiningStar size={18} color="white" delay={0.5} />
            </div>

            <p className="text-[10px] sm:text-xs font-mono tracking-[0.28em] uppercase text-white/60 group-hover:text-cyan-300 transition-colors mt-1">
              सत्यमेव जयते • आत्मनिर्भर भारत
            </p>
          </div>
        </div>

      </div>
    </header>
  );
};
