// Web Audio API Synthesizer - Clean, low-latency, zero external audio asset dependencies

let audioEnabled = true;

export const setSoundEnabled = (enabled: boolean) => {
  audioEnabled = enabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem('viksit_sound_enabled', enabled ? '1' : '0');
  }
};

export const getSoundEnabled = (): boolean => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('viksit_sound_enabled');
    if (saved !== null) {
      audioEnabled = saved === '1';
    }
  }
  return audioEnabled;
};

const getAudioContext = (): AudioContext | null => {
  if (!audioEnabled || typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtx) return null;
  return new AudioCtx();
};

// Subtle modern UI click
export const playClick = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.05);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch (_) {}
};

// Sovereign Harmonic Chime (Saffron-White-Green ascending harmonics)
export const playChime = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Pentatonic scale frequencies evoking ascension & triumph: C5, D5, E5, G5, A5
    const freqs = [523.25, 587.33, 659.25, 783.99, 880.00];

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.07);

      gain.gain.setValueAtTime(0.07, now + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.5);
    });
  } catch (_) {}
};

// Celebration Fanfare (for Citizen Pledge & Major Accomplishments)
export const playFanfare = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Grand celebratory progression: C4, G4, C5, E5, G5
    const notes = [
      { f: 261.63, t: 0.0, d: 0.25 },
      { f: 392.00, t: 0.15, d: 0.25 },
      { f: 523.25, t: 0.3, d: 0.3 },
      { f: 659.25, t: 0.45, d: 0.35 },
      { f: 783.99, t: 0.6, d: 0.7 },
      { f: 1046.50, t: 0.75, d: 0.9 },
    ];

    notes.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + t);

      gain.gain.setValueAtTime(0.12, now + t);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + t + d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + t);
      osc.stop(now + t + d);
    });
  } catch (_) {}
};

// Cyber Scan / Laser Ping
export const playLaser = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.18);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  } catch (_) {}
};

// Subtle Terminal Keystroke
export const playKeyTick = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600 + Math.random() * 200, now);

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  } catch (_) {}
};
