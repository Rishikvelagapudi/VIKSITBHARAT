import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flag, Rocket, CheckCircle2, ChevronRight, Sparkles, Calendar, Award } from 'lucide-react';
import { ShiningStar } from './ShiningStar';
import { playClick, playChime } from '../lib/audio';
import { cn } from '../lib/utils';

interface Milestone {
  year: string;
  phase: string;
  themeColor: string;
  badge: string;
  title: string;
  headline: string;
  achievements: string[];
  economicProjection: string;
}

const MILESTONES: Milestone[] = [
  {
    year: '2025',
    phase: 'Phase I',
    themeColor: '#FF671F',
    badge: 'Foundation',
    title: 'The Manufacturing & Digital Awakening',
    headline: 'Breaching $4 Trillion GDP with first indigenous commercial semiconductor packaging and DPI scale.',
    achievements: [
      'Commercial production commences at Dholera & Morigaon semiconductor facilities',
      'India Stack & UPI operational in 25+ international destinations',
      'First uncrewed orbital orbital flight tests of Gaganyaan capsule',
      'National Logistics Policy brings freight turnaround down by 30%',
    ],
    economicProjection: '$4.2 Trillion GDP • #4 Global Economy',
  },
  {
    year: '2030',
    phase: 'Phase II',
    themeColor: '#0284c7',
    badge: 'Acceleration',
    title: '500 GW Clean Grid & Gaganyaan Crewed Flights',
    headline: 'Surpassing $7 Trillion GDP as the world’s third-largest economy with half of power from renewables.',
    achievements: [
      '500 GW non-fossil installed energy capacity achieved',
      'First Indian vyomanauts execute crewed orbital space missions',
      'First operational stretch of Mumbai-Ahmedabad High Speed Bullet Train',
      'Production Linked Incentive drives $500B annual electronics manufacturing',
    ],
    economicProjection: '$7.5 Trillion GDP • #3 Global Economy',
  },
  {
    year: '2035',
    phase: 'Phase III',
    themeColor: '#10b981',
    badge: 'Sovereign Hegemony',
    title: 'Bharatiya Antariksh Station & Sovereign AI Supremacy',
    headline: 'Permanent Indian presence in Low Earth Orbit and indigenous 6G telecom standard adoption.',
    achievements: [
      'Core module of Bharatiya Antariksh Station (BAS) launched and crewed',
      '7 National High-Speed Bullet Train corridors operational across India',
      'Full quantum key distribution (QKD) defense and banking backbone',
      '5 Million Metric Tonnes of annual Green Hydrogen exports commenced',
    ],
    economicProjection: '$13.5 Trillion GDP • High Middle-Income Status',
  },
  {
    year: '2040',
    phase: 'Phase IV',
    themeColor: '#f59e0b',
    badge: 'Deep Frontiers',
    title: 'Indian Lunar Landing & Quantum Supremacy',
    headline: 'Indian astronauts step foot on the Moon; domestic defense and deep-tech exports reach global peak.',
    achievements: [
      'ISRO lands first Indian astronaut crew on the Lunar surface',
      '1000-qubit commercial quantum computers deployed for sovereign research',
      '100% electrified, zero-accident intelligent transport ecosystem',
      'Net-zero emission manufacturing corridors across Western & Eastern seaboards',
    ],
    economicProjection: '$22.0 Trillion GDP • Global Innovation Hub',
  },
  {
    year: '2047',
    phase: 'Centenary Milestone',
    themeColor: '#FF671F',
    badge: 'VIKSIT BHARAT',
    title: 'The Developed Sovereign Superpower',
    headline: '100 Years of Independence: A $35 Trillion High-Income Nation, Global Knowledge & Civilizational Leader.',
    achievements: [
      'High-income status with per-capita GDP exceeding $18,000 USD',
      'Zero extreme poverty and 100% access to world-class healthcare & education',
      'World’s primary hub for clean energy, deep technology, and ethical AI',
      'Permanent lunar base and interplanetary mission headquarters operational',
    ],
    economicProjection: '$35.0 Trillion GDP • Top 2 Global Powerhouse',
  },
];

export const Timeline2047: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = MILESTONES[activeIdx];

  return (
    <section id="timeline" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12 sm:mb-16 relative">
          <div className="absolute -top-3 left-8 hidden sm:block">
            <ShiningStar size={24} color="gold" delay={0.5} />
          </div>
          <div className="absolute -top-3 right-8 hidden sm:block">
            <ShiningStar size={24} color="cyan" delay={1.5} />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-[0.25em] text-cyan-300">
            <Calendar className="w-3.5 h-3.5" />
            <span>ROADMAP • 2024 TO 2047</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white">
            THE CHRONICLES OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF671F] via-white to-[#10b981]">AMRIT KAAL</span>
          </h2>

          <p className="text-white/70 text-sm sm:text-base font-light">
            The decade-by-decade strategic milestones transforming dreams into tangible sovereign supremacy.
          </p>
        </div>

        {/* Milestone Navigation Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-4 overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar">
          {MILESTONES.map((m, idx) => (
            <button
              key={m.year}
              type="button"
              onClick={() => {
                playClick();
                setActiveIdx(idx);
              }}
              className={cn(
                "px-5 py-3 rounded-2xl font-mono text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2.5 shrink-0 border",
                activeIdx === idx
                  ? "bg-white/15 text-white border-white/40 shadow-[0_0_25px_rgba(255,103,31,0.35)] scale-105"
                  : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white/80"
              )}
            >
              <span className="font-bold text-base">{m.year}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 font-sans">
                {m.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Active Milestone Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.year}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="glass-card max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-semibold">
                  {current.phase} • Target Milestone Year
                </span>
                <div className="text-4xl sm:text-6xl font-black font-display text-white mt-1">
                  {current.year}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                  Target Trajectory
                </span>
                <div className="text-base sm:text-lg font-bold font-mono text-emerald-400 mt-1">
                  {current.economicProjection}
                </div>
              </div>
            </div>

            {/* Title & Headline */}
            <div className="my-6">
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
                {current.title}
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
                {current.headline}
              </p>
            </div>

            {/* Key Accomplishments */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Strategic Deliverables Completed</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.achievements.map((ach, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3 text-xs sm:text-sm text-white/80"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF671F] shrink-0 mt-1.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
