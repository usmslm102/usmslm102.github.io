/**
 * Tactile Web Audio Synthesizer for subtle UI micro-interactions.
 * Zero external audio assets, zero network requests, 100% synthesized.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

export function isSoundEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return localStorage.getItem('sound_enabled') === 'true';
}

export function toggleSound(): boolean {
  const current = isSoundEnabled();
  const next = !current;
  localStorage.setItem('sound_enabled', String(next));
  window.dispatchEvent(new CustomEvent('sound-toggle', { detail: { enabled: next } }));
  if (next) {
    playSuccessSound();
  }
  return next;
}

export function playClickSound(pitchFactor = 1): void {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(850 * pitchFactor, t);
    osc.frequency.exponentialRampToValueAtTime(240 * pitchFactor, t + 0.02);

    gain.gain.setValueAtTime(0.04, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.025);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.025);
  } catch {
    // Audio failures silently ignore
  }
}

export function playSuccessSound(): void {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(587.33, t); // D5
    osc1.frequency.setValueAtTime(880, t + 0.06); // A5

    osc2.frequency.setValueAtTime(880, t); // A5
    osc2.frequency.setValueAtTime(1174.66, t + 0.06); // D6

    gain.gain.setValueAtTime(0.035, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.18);
    osc2.stop(t + 0.18);
  } catch {
    // Audio failures silently ignore
  }
}
