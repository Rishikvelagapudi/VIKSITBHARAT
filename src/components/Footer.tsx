import React from 'react';
import { Linkedin, ExternalLink } from 'lucide-react';
import { AshokaChakra } from './AshokaChakra';
import { ShiningStar } from './ShiningStar';

export const Footer: React.FC = () => {
  const linkedinUrl = "https://www.linkedin.com/in/rishik-velagapudi-46224a358?utm_source=share_via&utm_content=profile&utm_medium=member_android";

  return (
    <footer className="relative border-t border-white/10 bg-[#02040b] text-white overflow-hidden py-10 sm:py-14">
      
      {/* Tricolor Top Banner Stripe */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF671F] via-white to-[#10b981]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-6">
        
        {/* Centerpiece Emblem */}
        <div className="flex items-center gap-3 select-none">
          <div className="p-1 rounded-full bg-gradient-to-tr from-[#FF671F] via-white to-[#10b981] shadow-[0_0_25px_rgba(255,103,31,0.5)]">
            <div className="w-9 h-9 rounded-full bg-[#03060f] flex items-center justify-center p-0.5">
              <AshokaChakra size={28} spinning={true} glow={false} />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-black font-display tracking-wider uppercase text-white">
            VIKSIT <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF671F] via-white to-[#10b981]">BHARAT</span>
          </span>
          <ShiningStar size={16} color="gold" delay={0.4} />
        </div>

        {/* Kalam Quote */}
        <blockquote className="max-w-xl text-xs sm:text-sm text-amber-200/90 italic font-serif leading-relaxed px-4">
          “Dream, Dream, Dream. Dreams transform into thoughts and thoughts result in action.”
          <span className="block font-mono text-white/50 text-[10px] mt-1 not-italic uppercase tracking-widest">
            — Dr. A.P.J. Abdul Kalam, 11th President of India
          </span>
        </blockquote>

        {/* Rishik Velagapudi Photo in Circular Frame linked to LinkedIn */}
        <div className="pt-2 flex flex-col items-center">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="View Rishik Velagapudi on LinkedIn"
            className="group flex flex-col items-center cursor-pointer select-none transition-transform duration-300 hover:scale-105"
          >
            {/* Circular Photo Frame with Tricolor Gradient & Glowing Shadow */}
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#FF671F] via-white to-[#10b981] shadow-[0_0_30px_rgba(255,103,31,0.6)] group-hover:shadow-[0_0_45px_rgba(2,132,199,0.9)] transition-all duration-300">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-black/60 border-2 border-black/40">
                <img
                  src="/rishik.jpg"
                  alt="Rishik Velagapudi"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* LinkedIn Blue Badge on corner */}
              <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#0A66C2] text-white shadow-md border-2 border-[#02040b] group-hover:scale-110 transition-transform">
                <Linkedin className="w-3.5 h-3.5 fill-white" />
              </div>
            </div>

            {/* Name & LinkedIn Link Label */}
            <div className="mt-3 flex items-center gap-1.5 text-xs sm:text-sm font-display font-bold tracking-wider text-white group-hover:text-cyan-300 transition-colors">
              <span>Rishik Velagapudi</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>

            <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400/80 group-hover:text-cyan-200 transition-colors mt-0.5">
              Connect on LinkedIn
            </span>
          </a>
        </div>

        {/* Bottom Sovereign Motto */}
        <div className="pt-4 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-white/50">
          <span>सत्यमेव जयते • Truth Alone Triumphs • 1947 — 2047</span>
          <div className="flex items-center gap-1.5 text-white/60">
            <span>Built for</span>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF671F] via-white to-[#10b981]">
              VIKSIT BHARAT
            </span>
            <span>with Pride 🇮🇳</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
