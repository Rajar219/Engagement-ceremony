import { audioManager } from '@/lib/audio-manager';

/**
 * High-Fidelity Realistic Fireworks Audio Controller
 * Manages dedicated audio channels for:
 * 1. Initial Celebration Blast (0ms)
 * 2. Rocket Launch Whistle (with ascending rocket flight)
 * 3. Aerial Explosion Boom (at apex chrysanthemum detonations)
 * 4. Ground Flower-Pot Fountain Sizzle (continuous fountain spray)
 * 5. Crackling & Sparkling Bursts (secondary crackles)
 *
 * Guaranteed:
 * - Does NOT stop, restart, or degrade background music
 * - Respects global mute control (audioManager.getState().isMuted)
 * - Safely handles browser autoplay promises
 */
class FireworksAudioManager {
  private initialBlastAudio: HTMLAudioElement | null = null;
  private rocketWhistleAudio: HTMLAudioElement | null = null;
  private aerialExplosionAudio: HTMLAudioElement | null = null;
  private fountainSizzleAudio: HTMLAudioElement | null = null;
  private crackleAudio: HTMLAudioElement | null = null;
  private isPreloaded = false;

  public preload() {
    if (typeof window === 'undefined' || this.isPreloaded) return;
    this.isPreloaded = true;

    try {
      this.initialBlastAudio = new Audio('/assets/sounds/initial-blast.wav');
      this.initialBlastAudio.volume = 0.65;
      this.initialBlastAudio.preload = 'auto';

      this.rocketWhistleAudio = new Audio('/assets/sounds/rocket-whistle.wav');
      this.rocketWhistleAudio.volume = 0.45;
      this.rocketWhistleAudio.preload = 'auto';

      this.aerialExplosionAudio = new Audio('/assets/sounds/aerial-explosion.wav');
      this.aerialExplosionAudio.volume = 0.60;
      this.aerialExplosionAudio.preload = 'auto';

      this.fountainSizzleAudio = new Audio('/assets/sounds/fountain-sizzle.wav');
      this.fountainSizzleAudio.volume = 0.50;
      this.fountainSizzleAudio.preload = 'auto';

      this.crackleAudio = new Audio('/assets/sounds/crackle-sparkle.wav');
      this.crackleAudio.volume = 0.50;
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
            // Autoplay policy or gesture restriction caught gracefully
          });
        }
      }
    } catch (e) {}
  }

  public playInitialBlast() {
    this.playSound(this.initialBlastAudio, 0.70);
  }

  public playRocketWhistle() {
    this.playSound(this.rocketWhistleAudio, 0.45);
  }

  public playAerialExplosion() {
    this.playSound(this.aerialExplosionAudio, 0.65);
  }

  public playFountainSizzle() {
    this.playSound(this.fountainSizzleAudio, 0.50);
  }

  public playCrackle() {
    this.playSound(this.crackleAudio, 0.50);
  }

  public stopAll() {
    [
      this.initialBlastAudio,
      this.rocketWhistleAudio,
      this.aerialExplosionAudio,
      this.fountainSizzleAudio,
      this.crackleAudio,
    ].forEach((a) => {
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
