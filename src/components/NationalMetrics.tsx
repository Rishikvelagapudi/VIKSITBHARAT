import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Activity, ArrowUpRight, Zap, RefreshCw, 
  Satellite, Cpu, ShieldCheck, Database, CreditCard 
} from 'lucide-react';
import { playClick, playLaser } from '../lib/audio';

export const NationalMetrics: React.FC = () => {
  // Live Simulated Telemetry States
  const [upiTps, setUpiTps] = useState(4820);
  const [solarOutput, setSolarOutput] = useState(214.8);
  const [startupCount, setStartupCount] = useState(148920);
  const [aiComputePflops, setAiComputePflops] = useState(128.4);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  // Real-time subtle fluctuation simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setUpiTps((prev) => prev + Math.floor(Math.random() * 9) - 4);
      setSolarOutput((prev) => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(1));
      setStartupCount((prev) => prev + (Math.random() > 0.6 ? 1 : 0));
      setLastUpdated(new Date().toLocaleTimeString());
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  const handleRecalibrate = () => {
    playLaser();
    setIsCalibrating(true);
    setTimeout(() => {
      setUpiTps(4800 + Math.floor(Math.random() * 50));
      setSolarOutput(+(215 + Math.random() * 2).toFixed(1));
      setAiComputePflops(+(128 + Math.random() * 3).toFixed(1));
      setIsCalibrating(false);
    }, 800);
  };

  return (
    <section id="telemetry" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono uppercase tracking-widest text-cyan-300 mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>LIVE NATIONAL GRID • REAL-TIME TELEMETRY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white">
              SOVEREIGN <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">PULSE</span>
            </h2>
            <p className="text-white/60 text-sm mt-1">
              Real-time synchronized performance tracking across digital infrastructure, green grid, and sovereign tech clusters.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-white/40">
              Synced: {lastUpdated}
            </span>
            <button
              type="button"
              onClick={handleRecalibrate}
              disabled={isCalibrating}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-cyan-300 flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCalibrating ? 'animate-spin text-amber-400' : ''}`} />
              <span>{isCalibrating ? 'Recalibrating...' : 'Refresh Telemetry'}</span>
            </button>
          </div>
        </div>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Tile 1: UPI TPS */}
          <div className="glass-card rounded-2xl p-5 border border-cyan-500/30 hover:border-cyan-400 transition-all group">
            <div className="flex items-center justify-between text-white/50 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider">UPI Instant TPS</span>
              <CreditCard className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
              {upiTps.toLocaleString()} <span className="text-xs font-mono text-cyan-400">txns/sec</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-mono">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18.4% YoY Volume Expansion</span>
            </div>
          </div>

          {/* Tile 2: Solar Output */}
          <div className="glass-card rounded-2xl p-5 border border-emerald-500/30 hover:border-emerald-400 transition-all group">
            <div className="flex items-center justify-between text-white/50 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider">Renewables Installed</span>
              <Zap className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
              {solarOutput} <span className="text-xs font-mono text-emerald-400">GW</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-mono">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>On-track for 500 GW target</span>
            </div>
          </div>

          {/* Tile 3: Recognized Startups */}
          <div className="glass-card rounded-2xl p-5 border border-[#FF671F]/30 hover:border-[#FF671F] transition-all group">
            <div className="flex items-center justify-between text-white/50 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider">DPIIT Startups</span>
              <Activity className="w-4 h-4 text-[#FF9933] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
              {startupCount.toLocaleString()} <span className="text-xs font-mono text-[#FF9933]">Ventures</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-300 mt-2 font-mono">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>#3 Largest Global Startup Base</span>
            </div>
          </div>

          {/* Tile 4: AI Sovereign Compute */}
          <div className="glass-card rounded-2xl p-5 border border-purple-500/30 hover:border-purple-400 transition-all group">
            <div className="flex items-center justify-between text-white/50 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider">National AI Compute</span>
              <Cpu className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
              {aiComputePflops} <span className="text-xs font-mono text-purple-400">PFLOPS</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-purple-300 mt-2 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>IndiaAI National Grid Online</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
