import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, Cpu, Rocket, Leaf, Train, 
  Smartphone, Users, ChevronRight, X, Sparkles, 
  CheckCircle2, Target, ArrowUpRight, ShieldCheck 
} from 'lucide-react';
import { ShiningStar } from './ShiningStar';
import { playClick, playChime } from '../lib/audio';
import { cn } from '../lib/utils';

interface Pillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  themeColor: 'saffron' | 'chakra' | 'green';
  icon: React.ElementType;
  keyStat: string;
  statLabel: string;
  description: string;
  targets: string[];
  strategicIniziatives: string[];
  civilizationalQuote: string;
}

const PILLARS: Pillar[] = [
  {
    id: 'economic',
    number: '01',
    title: 'Economic & Industrial Supremacy',
    tagline: 'From $4 Trillion to $35 Trillion: The Manufacturing & Sovereign Capital Hub',
    themeColor: 'saffron',
    icon: Briefcase,
    keyStat: '$35 Trillion',
    statLabel: 'GDP Target @ 2047',
    description: 'Propelling India into the world’s top two economies with high per-capita income, a dominant global export basket, sovereign semiconductor fabs, and advanced manufacturing clusters.',
    targets: [
      'Scale per-capita income to high-income nation threshold ($18,000+)',
      'Establish 10+ commercial semiconductor fabs and advanced packaging hubs',
      'Make in India 2.0 driving 25% share of GDP from manufacturing',
      'Global financial capital hub via GIFT City IFSC',
    ],
    strategicIniziatives: [
      'National Semiconductor Mission (Semicon India)',
      'Production Linked Incentive (PLI) for 14 Strategic Sectors',
      'Sovereign Infrastructure Investment Fund',
      'Global Export Corridors & Free Trade Pacts',
    ],
    civilizationalQuote: '“Wealth is not merely accumulation, but the foundation for societal righteousness and self-reliance.”',
  },
  {
    id: 'deeptech',
    number: '02',
    title: 'AI, Quantum & Deep Tech Sovereignty',
    tagline: 'Leading the Fourth Industrial Revolution with Sovereign Compute & LLMs',
    themeColor: 'chakra',
    icon: Cpu,
    keyStat: '10,000+ GPUs',
    statLabel: 'Sovereign Compute Cluster',
    description: 'Ensuring technological independence with indigenous foundational models, quantum key distribution networks, 6G telecom architecture, and open-source technological leadership.',
    targets: [
      'Train sovereign Indic LLMs natively in 22 Scheduled Indian languages',
      'Deploy 1000-qubit indigenous Quantum Computing systems',
      'Standardize 6G patents and indigenous telecom stack globally',
      'Incubate 10,000+ deep-tech startups in robotics, biotech & aerospace',
    ],
    strategicIniziatives: [
      'IndiaAI National Mission & Computing Capacity',
      'National Quantum Mission (NQM)',
      'Bharat 6G Vision Alliance',
      'AIRAWAT & PARAM Supercomputing Grid',
    ],
    civilizationalQuote: '“True intelligence elevates human dignity and secures sovereign autonomy.”',
  },
  {
    id: 'space-defense',
    number: '03',
    title: 'Defense, Aerospace & Deep Space',
    tagline: 'Guarding Sovereign Skies & Frontiers: From Oceans to the Moon & Mars',
    themeColor: 'green',
    icon: Rocket,
    keyStat: 'ISRO 2035',
    statLabel: 'Bharatiya Antariksh Station',
    description: 'Transforming India from the largest importer into an indigenously armed defense exporter and the foremost space exploration power pioneering the lunar South Pole and beyond.',
    targets: [
      'Operational Bharatiya Antariksh Station in Low Earth Orbit by 2035',
      'Human Lunar Landing by Indian Astronauts by 2040',
      '100% indigenous defense procurement (Aatmanirbhar Bharat)',
      'Hypersonic missile grid (BrahMos-II) & 5th-Gen AMCA stealth fighter',
    ],
    strategicIniziatives: [
      'ISRO Gaganyaan Crewed Flight Program',
      'Chandrayaan-4 Lunar Sample Return & Shukrayaan-1',
      'Indigenous Aircraft Carriers (IAC-2) & Nuclear Submarines',
      'Defense Space Agency & Cyber Command Integration',
    ],
    civilizationalQuote: '“Strength respects strength; peace is secured through unwavering readiness.”',
  },
  {
    id: 'green-energy',
    number: '04',
    title: 'Clean Energy & Green Hydrogen',
    tagline: 'Leading the Global Transition to Ecological Harmony & 500 GW Non-Fossil Power',
    themeColor: 'saffron',
    icon: Leaf,
    keyStat: '500 GW',
    statLabel: 'Renewable Capacity by 2030',
    description: 'Harmonizing exponential industrial development with planetary sustainability through green hydrogen corridors, solar gigawatt parks, and circular bio-economies.',
    targets: [
      '500 GW non-fossil fuel capacity by 2030, exceeding 50% energy mix',
      '5 Million Metric Tonnes annual Green Hydrogen production by 2030',
      'World’s largest unified EV charging and smart grid infrastructure',
      'Net-Zero carbon economy milestone achieved ahead of 2070',
    ],
    strategicIniziatives: [
      'National Green Hydrogen Mission',
      'PM-Surya Ghar Muft Bijli Yojana (10M rooftop solar homes)',
      'International Solar Alliance (ISA) Global HQ in Gurugram',
      'Bio-fuel & Green Ammonia Export Terminals',
    ],
    civilizationalQuote: '“माता भूमिः पुत्रोऽहं पृथिव्याः — Earth is our mother, and we are her children.”',
  },
  {
    id: 'infrastructure',
    number: '05',
    title: 'Hyper-Transit & Smart Megacities',
    tagline: 'Next-Generation High-Speed Bullet Trains, Expressways & Deep-Water Ports',
    themeColor: 'chakra',
    icon: Train,
    keyStat: '7 Corridors',
    statLabel: 'High Speed Bullet Rail Network',
    description: 'Creating frictionless logistics and smart urban ecosystems connecting rural prosperity to mega economic corridors through multimodal integration.',
    targets: [
      'Expand 320 km/h Bullet Train networks across major economic corridors',
      'Reduce logistics costs from 14% to under 8% of GDP via PM Gati Shakti',
      '100% electrified broad-gauge railway network with Kavach automatic protection',
      'Build 5 world-class transshipment container ports (Vadhavan, Vizhinjam)',
    ],
    strategicIniziatives: [
      'PM Gati Shakti National Master Plan for Multimodal Connectivity',
      'National High-Speed Rail Corporation Corridors',
      'Dedicated Freight Corridors (Western & Eastern DFC)',
      'Bharatmala & Sagarmala Infrastructure Grids',
    ],
    civilizationalQuote: '“Connectivity creates commerce, and seamless mobility unites a nation.”',
  },
  {
    id: 'dpi',
    number: '06',
    title: 'Digital Public Infrastructure (DPI)',
    tagline: 'The Global Gold Standard in Open-Source Financial & Identity Sovereignty',
    themeColor: 'green',
    icon: Smartphone,
    keyStat: '100 Billion+',
    statLabel: 'Monthly UPI Transactions',
    description: 'Empowering every citizen with zero-cost financial access, open commerce networks, verifiable digital credentials, and sovereign Central Bank Digital Currency (CBDC).',
    targets: [
      'Export India Stack to 50+ Global South and emerging nations',
      'Democratize retail e-commerce through ONDC with 90% MSME inclusion',
      'Universal digital literacy and high-speed broadband to 600,000 villages',
      'Digital Rupee (e-Rupee) cross-border trade settlement network',
    ],
    strategicIniziatives: [
      'UPI (Unified Payments Interface) Global Linkages (Singapore, UAE, France)',
      'Open Network for Digital Commerce (ONDC)',
      'Aadhaar, DigiLocker & Account Aggregator Ecosystem',
      'Digital India Bhashini (Real-time voice AI translation)',
    ],
    civilizationalQuote: '“Technology is true when it reaches the last person in the line.”',
  },
  {
    id: 'nari-yuva',
    number: '07',
    title: 'Yuva Shakti, Nari Shakti & Culture',
    tagline: 'Harnessing 500 Million Youth and Women-Led Development for Global Impact',
    themeColor: 'saffron',
    icon: Users,
    keyStat: '500 Million',
    statLabel: 'Skilled Workforce Pool',
    description: 'Transforming India’s demographic dividend into global leadership through women-led governance, world-class universities, Olympic excellence, and cultural renaissance.',
    targets: [
      'Top 3 in global Olympic medal tally and sports infrastructure',
      '50% female participation across STEM, defense leadership & boardrooms',
      'Build 100+ global research universities attracting international scholars',
      'Global leadership in Ayurveda, Yoga, holistic wellness and civilizational arts',
    ],
    strategicIniziatives: [
      'National Education Policy (NEP 2020) Multidisciplinary Reforms',
      'Nari Shakti Vandan Adhiniyam (Women reservation in Parliament)',
      'Target Olympic Podium Scheme (TOPS)',
      'Indian Knowledge Systems (IKS) & Global Cultural Heritage Promotion',
    ],
    civilizationalQuote: '“Arise, awake, and stop not till the goal is reached.” — Swami Vivekananda',
  },
];

export const VisionPillars: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);

  const getBorderColor = (theme: Pillar['themeColor']) => {
    switch (theme) {
      case 'saffron':
        return 'border-[#FF671F]/40 hover:border-[#FF671F] shadow-[0_0_20px_rgba(255,103,31,0.2)] hover:shadow-[0_0_30px_rgba(255,103,31,0.45)]';
      case 'chakra':
        return 'border-[#0284c7]/40 hover:border-[#0284c7] shadow-[0_0_20px_rgba(2,132,199,0.2)] hover:shadow-[0_0_30px_rgba(2,132,199,0.45)]';
      case 'green':
        return 'border-[#10b981]/40 hover:border-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.45)]';
    }
  };

  const getTagColor = (theme: Pillar['themeColor']) => {
    switch (theme) {
      case 'saffron':
        return 'bg-[#FF671F]/20 text-[#FF9933] border-[#FF671F]/40';
      case 'chakra':
        return 'bg-[#0284c7]/20 text-cyan-300 border-[#0284c7]/40';
      case 'green':
        return 'bg-[#10b981]/20 text-emerald-300 border-[#10b981]/40';
    }
  };

  return (
    <section id="pillars" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12 sm:mb-16 relative">
          <div className="absolute -top-3 left-10 hidden sm:block">
            <ShiningStar size={26} color="gold" delay={0.4} />
          </div>
          <div className="absolute -top-3 right-10 hidden sm:block">
            <ShiningStar size={26} color="cyan" delay={1.2} />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-[0.25em] text-[#FF9933]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SAPTARISHI • THE 7 PILLARS OF 2047</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase font-display tracking-tight text-white">
            ARCHITECTING <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF671F] via-white to-[#10b981]">THE FUTURE</span>
          </h2>

          <p className="text-white/70 text-sm sm:text-base font-light">
            Seven strategic cornerstones driving India’s holistic transformation into a developed, sovereign, and self-reliant civilization by our centenary year.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => {
                  playChime();
                  setSelectedPillar(pillar);
                }}
                className={cn(
                  "glass-card rounded-2xl p-6 sm:p-7 border transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1.5",
                  getBorderColor(pillar.themeColor)
                )}
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black font-mono text-white/30 group-hover:text-white transition-colors">
                      {pillar.number}
                    </span>
                    <div className={cn("p-3 rounded-xl border", getTagColor(pillar.themeColor))}>
                      <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-amber-200 transition-colors">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-xs font-mono text-white/50 mt-1 uppercase tracking-wide">
                    {pillar.tagline}
                  </p>

                  <p className="text-sm text-white/70 mt-4 line-clamp-3 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Footer Metric and Action */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-black font-display text-white">
                      {pillar.keyStat}
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                      {pillar.statLabel}
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/60 group-hover:text-white transition-all group-hover:translate-x-1">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Deep Dive Modal */}
      <AnimatePresence>
        {selectedPillar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setSelectedPillar(null);
                }}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={cn("p-4 rounded-2xl border", getTagColor(selectedPillar.themeColor))}>
                  <selectedPillar.icon className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-white/50">
                    Pillar {selectedPillar.number} • Master Vision
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
                    {selectedPillar.title}
                  </h3>
                </div>
              </div>

              {/* Key Stat Highlight */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between mb-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">Primary Milestone</span>
                  <div className="text-2xl font-black text-[#FF9933]">{selectedPillar.keyStat}</div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">Metric Scope</span>
                  <div className="text-sm font-semibold text-white/80">{selectedPillar.statLabel}</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6">
                {selectedPillar.description}
              </p>

              {/* Specific Targets */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#FF9933] mb-3 flex items-center gap-1.5 font-bold">
                  <Target className="w-4 h-4" />
                  <span>Key Deliverables by 2047</span>
                </h4>
                <div className="space-y-2">
                  {selectedPillar.targets.map((target, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/75 bg-white/5 p-2.5 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                      <span>{target}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flagship Missions */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-300 mb-3 flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>National Strategic Programs</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedPillar.strategicIniziatives.map((init, i) => (
                    <div key={i} className="text-xs text-white/70 bg-white/5 p-2.5 rounded-xl border border-white/5 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{init}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Civilizational Quote */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#FF671F]/10 via-white/5 to-[#10b981]/10 border border-white/10 text-center">
                <p className="text-xs sm:text-sm font-serif italic text-amber-200">
                  {selectedPillar.civilizationalQuote}
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
