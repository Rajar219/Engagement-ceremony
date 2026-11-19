import { audioManager } from '@/lib/audio-manager';

/**
 * Pure Firework Blast Audio Controller
 *
 * Requirements:
 * - Plays ONLY clean, authentic celebratory firework blast sounds ("blast sound only enough")
 * - Zero frequency sounds: No rocket whistles, no high-pitch tones, no sizzles, no crackles
 * - Preserves background music continuously without pause, restart, or stutter
 * - Volume balanced gently (0.35) so it creates a pleasant celebration impact without distortion
 * - Respects global mute state
 */

class FireworksAudioManager {
  private blastAudio: HTMLAudioElement | null = null;
  private isPreloaded = false;
  private lastPlayedAt = 0;
  private readonly minIntervalMs = 700; // Enforce clean spacing between blasts

  public preload() {
    if (typeof window === 'undefined' || this.isPreloaded) return;
    this.isPreloaded = true;

    try {
      this.blastAudio = new Audio('/assets/sounds/initial-blast.wav');
      this.blastAudio.preload = 'auto';
      this.blastAudio.volume = 0.35;

      this.blastAudio.addEventListener('error', (e) => {
        console.warn('[FireworksAudio] Blast track error:', e);
      });
    } catch (e) {
      console.warn('[FireworksAudio] Preload error:', e);
    }
  }

  public playBlast(volume: number = 0.35) {
    if (typeof window === 'undefined') return;

    // Respect master mute toggle
    if (audioManager.getState().isMuted) return;

    if (!this.isPreloaded) {
      this.preload();
    }

    const now = performance.now();
    // Prevent overlapping collision or digital clipping
    if (now - this.lastPlayedAt < this.minIntervalMs) {
      return;
    }
    this.lastPlayedAt = now;

    try {
      let audio = this.blastAudio;
      if (!audio) {
        audio = new Audio('/assets/sounds/initial-blast.wav');
        this.blastAudio = audio;
      }

      audio.volume = Math.max(0, Math.min(1, volume));

      if (!audio.paused) {
        audio.currentTime = 0;
      }

      const p = audio.play();
      if (p !== undefined) {
        p.catch(() => {
          // Autoplay policy or gesture caught gracefully
        });
      }
    } catch (err) {}
  }

  // Initial 70% scratch celebration blast
  public playInitialBlast() {
    this.playBlast(0.38);
  }

  // Aerial firework detonation blast
  public playAerialExplosion() {
    this.playBlast(0.34);
  }

  // Frequency sounds are strictly disabled per user request ("dont want that frequency sound")
  public playRocketWhistle() {
    // Intentionally silent
  }

  public playFountainSizzle() {
    // Intentionally silent
  }

  public playCrackle() {
    // Intentionally silent
  }

  public stopAll() {
    if (this.blastAudio) {
      try {
        this.blastAudio.pause();
        this.blastAudio.currentTime = 0;
      } catch (e) {}
    }
  }
}

export const fireworksAudio = new FireworksAudioManager();
