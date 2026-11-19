import { audioManager } from '@/lib/audio-manager';

/**
 * Dedicated Fireworks Sound Effects Controller
 * Preloads local audio files and plays synchronized sounds for the 75% scratch card celebration.
 * Respects global mute state and does NOT interrupt background music.
 */
class FireworksAudioManager {
  private boomAudio: HTMLAudioElement | null = null;
  private whistleAudio: HTMLAudioElement | null = null;
  private burstAudio: HTMLAudioElement | null = null;
  private crackleAudio: HTMLAudioElement | null = null;
  private isPreloaded = false;

  public preload() {
    if (typeof window === 'undefined' || this.isPreloaded) return;
    this.isPreloaded = true;

    try {
      this.boomAudio = new Audio('/assets/sounds/celebration-boom.wav');
      this.boomAudio.volume = 0.6;
      this.boomAudio.preload = 'auto';

      this.whistleAudio = new Audio('/assets/sounds/rocket-whistle.wav');
      this.whistleAudio.volume = 0.45;
      this.whistleAudio.preload = 'auto';

      this.burstAudio = new Audio('/assets/sounds/firework-burst.wav');
      this.burstAudio.volume = 0.55;
      this.burstAudio.preload = 'auto';

      this.crackleAudio = new Audio('/assets/sounds/sparkle-crackle.wav');
      this.crackleAudio.volume = 0.5;
      this.crackleAudio.preload = 'auto';
    } catch (e) {
      console.warn('[FireworksAudio] Preload error:', e);
    }
  }

  private playSound(audio: HTMLAudioElement | null, defaultVolume: number) {
    if (typeof window === 'undefined') return;

    // Respect user's global mute toggle
    if (audioManager.getState().isMuted) return;

    if (!audio) {
      this.preload();
    }

    try {
      const snd = audio;
      if (snd) {
        snd.volume = defaultVolume;
        snd.currentTime = 0;
        const p = snd.play();
        if (p !== undefined) {
          p.catch(() => {
            // Autoplay policy or user gesture restriction handled gracefully
          });
        }
      }
    } catch (e) {}
  }

  public playBoom() {
    this.playSound(this.boomAudio, 0.65);
  }

  public playWhistle() {
    this.playSound(this.whistleAudio, 0.45);
  }

  public playBurst() {
    this.playSound(this.burstAudio, 0.55);
  }

  public playCrackle() {
    this.playSound(this.crackleAudio, 0.5);
  }

  public stopAll() {
    [this.boomAudio, this.whistleAudio, this.burstAudio, this.crackleAudio].forEach((a) => {
      if (a) {
        try {
          a.pause();
          a.currentTime = 0;
        } catch (e) {}
      }
    });
  }
}

export const fireworksAudio = new FireworksAudioManager();
