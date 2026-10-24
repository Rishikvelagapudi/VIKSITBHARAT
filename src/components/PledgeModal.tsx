import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, X, CheckCircle2, Download, Printer, 
  Sparkles, ShieldCheck, Flag, Copy, Check 
} from 'lucide-react';
import { AshokaChakra } from './AshokaChakra';
import { playClick, playFanfare } from '../lib/audio';

interface PledgeModalProps {
  onClose: () => void;
}

const STATES_AND_UTS = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman & Nicobar', 'Chandigarh', 'Dadra & Nagar Haveli and Daman & Diu', 
  'Delhi (NCT)', 'Jammu & Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const SECTORS = [
  'Deep Technology, AI & Computing',
  'Green Energy, Clean Tech & Environment',
  'Manufacturing, Hardware & Semiconductors',
  'Education, Research & Skilling',
  'Agriculture & Rural Transformation',
  'Healthcare & Biomedical Innovation',
  'Defense, Aerospace & Public Security',
  'Commerce, Finance & Entrepreneurship',
  'Culture, Heritage & Creative Arts',
];

export const PledgeModal: React.FC<PledgeModalProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [stateUt, setStateUt] = useState('Andhra Pradesh');
  const [sector, setSector] = useState(SECTORS[0]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [pledgeId, setPledgeId] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newId = `VB2047-${stateUt.slice(0, 2).toUpperCase()}-${randomNum}`;
    setPledgeId(newId);
    setIsGenerated(true);
    playFanfare();
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(pledgeId);
    setCopied(true);
    playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-card max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative my-auto"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isGenerated ? (
          /* Form View */
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-[#FF671F] via-amber-400 to-[#10b981] text-white">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#FF9933] font-bold">
                  Sovereign Citizen Commitment
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
                  CITIZEN PLEDGE FOR 2047
                </h3>
              </div>
            </div>

            <p className="text-white/70 text-xs sm:text-sm mb-6 leading-relaxed">
              Every great nation is built by the daily dedication of its citizens. Record your formal pledge toward making Bharat a fully developed, self-reliant, and sovereign global leader by 2047.
            </p>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                  Full Citizen Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#FF671F] outline-none text-white font-medium text-sm transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                    State / Union Territory
                  </label>
                  <select
                    value={stateUt}
                    onChange={(e) => setStateUt(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080e1e] border border-white/15 focus:border-cyan-400 outline-none text-white text-sm"
                  >
                    {STATES_AND_UTS.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                    Domain of Contribution
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080e1e] border border-white/15 focus:border-[#10b981] outline-none text-white text-sm"
                  >
                    {SECTORS.map((sec) => (
                      <option key={sec} value={sec}>{sec}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Core Pledge Clauses */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 mt-4 text-xs text-white/80">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                  <span>I pledge to prioritize sovereign Indian innovation, manufacturing, and indigenous capabilities.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                  <span>I will protect national unity, foster scientific temper, and practice environmental stewardship.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                  <span>I dedicate my daily labor to the realization of Viksit Bharat @ 2047.</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF671F] via-amber-500 to-[#10b981] text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-[#FF671F]/30 hover:shadow-[0_0_30px_rgba(255,103,31,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Official Certificate of Commitment</span>
              </button>
            </form>
          </div>
        ) : (
          /* Certificate Preview View */
          <div>
            <div 
              id="printable-certificate" 
              className="relative p-6 sm:p-8 rounded-2xl bg-[#080e1e] border-4 border-amber-400/80 shadow-[0_0_40px_rgba(245,158,11,0.3)] text-center overflow-hidden"
            >
              {/* Tricolor Ribbon on Corners */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FF671F] via-white to-[#10b981]" />

              {/* Background Ashoka Chakra Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <AshokaChakra size={280} glow={false} spinning={false} />
              </div>

              <div className="relative z-10 space-y-4">
                {/* Header Seal */}
                <div className="flex items-center justify-center gap-3">
                  <AshokaChakra size={50} glow={false} spinning={false} />
                </div>

                <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#FF9933] font-bold">
                  GOVERNMENT & CITIZENS OF INDIA • NATIONAL CHARTER
                </div>

                <h2 className="text-xl sm:text-3xl font-black font-serif uppercase tracking-wider text-white">
                  CERTIFICATE OF DEDICATION
                </h2>

                <p className="text-xs font-mono text-white/50 tracking-widest uppercase">
                  VIKSIT BHARAT @ 2047 • 100 YEARS OF INDEPENDENCE
                </p>

                <div className="my-6 py-2 border-y border-amber-400/40">
                  <p className="text-xs text-white/70 italic">This is proudly certified and recognized that</p>
                  <div className="text-2xl sm:text-3xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-[#FF671F] via-white to-[#10b981] my-1">
                    {name}
                  </div>
                  <p className="text-xs text-white/80 font-mono">
                    Citizen of <span className="text-cyan-300 font-bold">{stateUt}</span> • Domain: <span className="text-emerald-400 font-bold">{sector}</span>
                  </p>
                </div>

                <p className="text-[11px] sm:text-xs text-white/70 max-w-md mx-auto leading-relaxed">
                  has formally taken the sovereign pledge to dedicate their personal effort, intellect, and civic duty to propel the Republic of India into a fully developed nation (Viksit Bharat) by 2047.
                </p>

                {/* Footer of Certificate */}
                <div className="pt-4 flex items-center justify-between text-left border-t border-white/10 text-[10px] font-mono text-white/50">
                  <div>
                    <span>Pledge ID: </span>
                    <span className="text-amber-300 font-bold">{pledgeId}</span>
                  </div>
                  <div className="text-right">
                    <span>Date: </span>
                    <span className="text-white/80">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleCopyId}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-white flex items-center gap-2 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied ID' : 'Copy Pledge ID'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-xs font-mono text-cyan-300 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Certificate</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsGenerated(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white/80 transition-all cursor-pointer"
                >
                  Create Another
                </button>
              </div>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
};
