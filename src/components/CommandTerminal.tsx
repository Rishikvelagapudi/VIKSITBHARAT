import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal as TerminalIcon, Radio, X, Send, 
  CornerDownLeft, Shield, Sparkles, Cpu, Award 
} from 'lucide-react';
import { playClick, playChime, playFanfare, playLaser, playKeyTick } from '../lib/audio';

interface CommandTerminalProps {
  onClose: () => void;
  onOpenPledge: () => void;
}

interface LogEntry {
  type: 'system' | 'user' | 'response' | 'error' | 'success';
  text: string;
  time: string;
}

const BOOT_SEQUENCE = [
  "Initializing Viksit Bharat 2047 Core Kernel v4.7...",
  "Authenticating Digital Public Infrastructure (UPI / Aadhaar / ONDC)...",
  "Connecting ISRO Deep Space Ground Station (IDSN Byalalu)...",
  "Synchronizing National Green Hydrogen & 500 GW Renewable Grid...",
  "AIRAWAT & PARAM Sovereign AI Supercomputing Online [128.4 PFLOPS]...",
  "National Quantum Key Distribution (QKD) Mesh: ENCRYPTED & ACTIVE...",
  "Status: SOVEREIGN OPERATIONAL CONTROL ESTABLISHED.",
];

export const CommandTerminal: React.FC<CommandTerminalProps> = ({
  onClose,
  onOpenPledge,
}) => {
  const [bootPhase, setBootPhase] = useState<'boot' | 'ready'>('boot');
  const [bootMsgs, setBootMsgs] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Boot sequence animation
  useEffect(() => {
    let idx = 0;
    const timer = setInterval(() => {
      if (idx < BOOT_SEQUENCE.length) {
        setBootMsgs((prev) => [...prev, BOOT_SEQUENCE[idx]]);
        playKeyTick();
        idx++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setBootPhase('ready');
          playChime();
          setLogs([
            {
              type: 'system',
              text: 'Welcome to the Viksit Bharat 2047 Sovereign AI Command Console. Type "help" or click any shortcut chip below to explore.',
              time: new Date().toLocaleTimeString(),
            },
          ]);
        }, 600);
      }
    }, 380);

    return () => clearInterval(timer);
  }, []);

  // Scroll to bottom on log change
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Focus input on ready
  useEffect(() => {
    if (bootPhase === 'ready') {
      inputRef.current?.focus();
    }
  }, [bootPhase]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const time = new Date().toLocaleTimeString();

    // Log the user's input
    const userLog: LogEntry = { type: 'user', text: `$ ${rawCmd}`, time };

    let responseLog: LogEntry;

    switch (cmd) {
      case 'help':
        playClick();
        responseLog = {
          type: 'response',
          text: `AVAILABLE COMMANDS:
• vision    - Read the Master Declaration for Viksit Bharat @ 2047
• pillars   - Telemetry status for the 7 Saptarishi Pillars
• economy   - $35 Trillion GDP and manufacturing projections
• space     - ISRO Gaganyaan, Space Station & Lunar exploration status
• defense   - Indigenous weapons, 5th-gen fighter & hypersonic defense
• tech      - IndiaAI compute cluster, Indic LLMs & Quantum roadmap
• anthem    - Play sovereign ceremonial fanfare
• pledge    - Open the Citizen Pledge & Gold Certificate generator
• clear     - Clear terminal logs
• exit      - Return to main landing portal`,
          time,
        };
        break;

      case 'vision':
        playChime();
        responseLog = {
          type: 'response',
          text: `[DECLARATION OF VIKSIT BHARAT @ 2047]
By 2047, commemorating 100 years of Independence, Bharat shall stand as a fully developed nation—economically dominant ($35T+), technologically sovereign, ecologically sustainable (500GW+), and civilizational guardian of global peace and knowledge.`,
          time,
        };
        break;

      case 'pillars':
        playClick();
        responseLog = {
          type: 'response',
          text: `[7 SAPTARISHI PILLARS TELEMETRY]
1. Economic & Manufacturing Supremacy  [ACTIVE - Target $35T]
2. AI, Quantum & Deep-Tech            [ACTIVE - 10k GPUs online]
3. Defense & Deep Space               [ACTIVE - BAS 2035 Target]
4. Clean Energy & Green Hydrogen      [ACTIVE - 500 GW Target]
5. Hyper-Infrastructure & Transit     [ACTIVE - 7 Bullet Corridors]
6. Digital Public Infrastructure      [ACTIVE - #1 in Global UPI]
7. Yuva Shakti & Cultural Renaissance [ACTIVE - 500M Skilled Youth]`,
          time,
        };
        break;

      case 'economy':
        playClick();
        responseLog = {
          type: 'response',
          text: `[ECONOMIC TRAJECTORY @ 2047]
• Nominal GDP: Projected $35.0 Trillion USD
• Per-Capita Income: $18,500+ (High-Income Classification)
• Manufacturing Share: 25% of GDP (Make in India 2.0)
• Forex Reserves: Anticipated $1.5+ Trillion
• Status: Top 2 Global Economic Superpower.`,
          time,
        };
        break;

      case 'space':
        playLaser();
        responseLog = {
          type: 'response',
          text: `[ISRO DEEP SPACE MISSION SCHEDULE]
• 2025: Gaganyaan uncrewed & crewed Low-Earth Orbit test flights
• 2028: Chandrayaan-4 Lunar Sample Return mission
• 2035: Bharatiya Antariksh Station (BAS) core operational module
• 2040: First Indian Astronaut Lunar Landing
• Status: All telemetry nominal.`,
          time,
        };
        break;

      case 'defense':
        playLaser();
        responseLog = {
          type: 'response',
          text: `[DEFENSE & SOVEREIGN INTEGRITY]
• Aatmanirbhar Bharat: 100% indigenous defense procurement target
• Next-Gen Assets: AMCA 5th-gen fighter, IAC-2 Carrier, BrahMos-II Hypersonic
• Cyber & Space Command: Integrated quantum-safe communication grid.`,
          time,
        };
        break;

      case 'tech':
        playClick();
        responseLog = {
          type: 'response',
          text: `[DEEP TECH & SOVEREIGN COMPUTE]
• IndiaAI Grid: 10,000+ national GPU capacity deployed
• Sovereign LLMs: Indigenous models in 22 official Indian languages
• Quantum Mission: 1000-qubit quantum architecture underway
• Telecom: Bharat 6G standard patents submitted to ITU.`,
          time,
        };
        break;

      case 'anthem':
      case 'fanfare':
        playFanfare();
        responseLog = {
          type: 'success',
          text: `[FANFARE PLAYING]
♪ Sovereign Victory Fanfare synthesized via Web Audio API. 
"वन्दे मातरम् • जय हिन्द • भारत माता की जय"`,
          time,
        };
        break;

      case 'pledge':
        playFanfare();
        onOpenPledge();
        responseLog = {
          type: 'success',
          text: `[PLEDGE PORTAL OPENED]
Launching Citizen Dedication & Gold Certificate Generator...`,
          time,
        };
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        playClick();
        onClose();
        return;

      default:
        playClick();
        responseLog = {
          type: 'error',
          text: `Command not recognized: "${rawCmd}". Type "help" to view the available command set.`,
          time,
        };
        break;
    }

    setLogs((prev) => [...prev, userLog, responseLog]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  const commandShortcuts = [
    'vision', 'pillars', 'economy', 'space', 'defense', 'tech', 'anthem', 'pledge', 'help', 'clear'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col font-mono text-cyan-400">
      
      {/* Terminal Top Window Bar */}
      <div className="h-12 border-b border-cyan-500/30 bg-[#040814] px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF671F]" />
            <span className="w-3 h-3 rounded-full bg-white" />
            <span className="w-3 h-3 rounded-full bg-[#10b981]" />
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-white/90">
            <TerminalIcon className="w-4 h-4 text-cyan-400" />
            <span>VIKSIT BHARAT @ 2047 // SOVEREIGN AI TERMINAL</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            playClick();
            onClose();
          }}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Terminal Body */}
      {bootPhase === 'boot' ? (
        <div className="flex-1 flex flex-col justify-center items-center p-6 text-left max-w-2xl mx-auto w-full">
          <div className="w-full space-y-3">
            <div className="flex items-center gap-2 text-amber-400 mb-6">
              <Radio className="w-6 h-6 animate-pulse" />
              <span className="text-lg font-black tracking-widest uppercase">
                NATIONAL BOOT SEQUENCE INITIATED
              </span>
            </div>

            {bootMsgs.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs sm:text-sm text-cyan-300"
              >
                <span className="text-white/40 mr-2">[{new Date().toISOString().slice(11, 19)}]</span>
                <span>{msg}</span>
              </motion.div>
            ))}

            <div className="mt-8 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${(bootMsgs.length / BOOT_SEQUENCE.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-[#FF671F] via-cyan-400 to-[#10b981]"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden max-w-5xl mx-auto w-full p-4 sm:p-6">
          
          {/* Scrollable logs area */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-xs sm:text-sm">
            {logs.map((log, i) => (
              <div key={i} className="leading-relaxed">
                {log.type === 'user' && (
                  <div className="text-white font-bold flex items-start gap-2">
                    <span className="text-cyan-400">citizen@bharat:~$</span>
                    <span>{log.text.replace('$ ', '')}</span>
                  </div>
                )}
                {log.type === 'response' && (
                  <div className="text-cyan-300/90 whitespace-pre-wrap pl-4 border-l-2 border-cyan-500/40 my-2">
                    {log.text}
                  </div>
                )}
                {log.type === 'system' && (
                  <div className="text-amber-300/90 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                    {log.text}
                  </div>
                )}
                {log.type === 'success' && (
                  <div className="text-emerald-400 whitespace-pre-wrap pl-4 border-l-2 border-emerald-500/60 font-semibold my-2">
                    {log.text}
                  </div>
                )}
                {log.type === 'error' && (
                  <div className="text-rose-400 pl-4 border-l-2 border-rose-500/60 my-2">
                    {log.text}
                  </div>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Quick Command Chips */}
          <div className="pt-3 pb-2 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] text-white/40 uppercase tracking-widest shrink-0">Quick Actions:</span>
            {commandShortcuts.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => executeCommand(cmd)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] text-cyan-300 hover:text-white transition-all cursor-pointer shrink-0"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Prompt Input Box */}
          <div className="pt-2 flex items-center gap-2">
            <span className="text-cyan-400 font-bold shrink-0">citizen@bharat:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                playKeyTick();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type command (e.g., vision, pillars, space, pledge, anthem, help)..."
              className="flex-1 bg-transparent border-b border-cyan-500/40 focus:border-cyan-400 px-2 py-1.5 text-white outline-none font-mono text-xs sm:text-sm"
            />
            <button
              type="button"
              onClick={() => executeCommand(inputVal)}
              className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
