import { audioManager } from '@/lib/audio-manager';

/**
 * Premium Realistic Fireworks Audio Controller
 *
 * Sound Architecture:
 * 1. Initial Launch / Blast: Short, deep, warm celebratory acoustic thud (no harsh noise)
 * 2. Rocket Whistle: Pure, realistic upward acoustic bottle/rocket whistle (no 60Hz alien buzz)
 * 3. Aerial Explosion: Deep, clean, realistic night-sky chrysanthemum boom (no video-game crunch)
 * 4. Fountain Sizzle: Soft, delicate golden flower-pot fountain shimmer (no harsh static)
 * 5. Gentle Crackle: Distant, delicate golden sparkler crackles (no sharp clicks)
 *
 * Mixing Standards:
 * - Strictly preserves background music (never pauses, restarts, or degrades it)
 * - Volume balanced gently (0.18 - 0.38) to sit harmoniously with the music
 * - Minimum spacing guards to eliminate audio collision, distortion, and clipping
 * - Graceful promise error handling
 * - Respects global mute state
 */

interface SoundTrack {
  name: string;
  url: string;
  defaultVolume: number;
  minIntervalMs: number;
  lastPlayedAt: number;
  audio: HTMLAudioElement | null;
}

class FireworksAudioManager {
  private isPreloaded = false;
  private tracks: Record<string, SoundTrack> = {
    initialBlast: {
      name: 'Initial Blast',
      url: '/assets/sounds/initial-blast.wav',
      defaultVolume: 0.36,
      minIntervalMs: 1200,
      lastPlayedAt: 0,
      audio: null,
    },
    rocketWhistle: {
      name: 'Rocket Whistle',
      url: '/assets/sounds/rocket-whistle.wav',
      defaultVolume: 0.22,
      minIntervalMs: 700,
      lastPlayedAt: 0,
      audio: null,
    },
    aerialExplosion: {
      name: 'Aerial Explosion',
      url: '/assets/sounds/aerial-explosion.wav',
      defaultVolume: 0.34,
      minIntervalMs: 750,
      lastPlayedAt: 0,
      audio: null,
    },
    fountainSizzle: {
      name: 'Fountain Sizzle',
      url: '/assets/sounds/fountain-sizzle.wav',
      defaultVolume: 0.18,
      minIntervalMs: 2500,
      lastPlayedAt: 0,
      audio: null,
    },
    crackle: {
      name: 'Sparkler Crackle',
      url: '/assets/sounds/crackle-sparkle.wav',
      defaultVolume: 0.20,
      minIntervalMs: 1800,
      lastPlayedAt: 0,
      audio: null,
    },
  };

  public preload() {
    if (typeof window === 'undefined' || this.isPreloaded) return;
    this.isPreloaded = true;

    try {
      Object.keys(this.tracks).forEach((key) => {
        const track = this.tracks[key];
        const audio = new Audio(track.url);
        audio.preload = 'auto';
        audio.volume = track.defaultVolume;

        // Diagnostic listeners
        audio.addEventListener('ended', () => {
          console.log(`[FireworksAudio] ■ Ended: ${track.name}`);
        });
        audio.addEventListener('error', (e) => {
          console.warn(`[FireworksAudio] ✖ Track error on ${track.name}:`, e);
        });

        track.audio = audio;
      });
    } catch (e) {
      console.warn('[FireworksAudio] Preload caught error:', e);
    }
  }

  private playTrack(key: string, customVolume?: number) {
    if (typeof window === 'undefined') return;

    // Respect user's master mute control
    if (audioManager.getState().isMuted) return;

    if (!this.isPreloaded) {
      this.preload();
    }

    const track = this.tracks[key];
    if (!track) return;

    const now = performance.now();
    // Guard against rapid duplicate triggers / sound pile-up
    if (now - track.lastPlayedAt < track.minIntervalMs) {
      return;
    }
    track.lastPlayedAt = now;

    try {
      // Create or reuse clean audio instance
      let audio = track.audio;
      if (!audio) {
        audio = new Audio(track.url);
        track.audio = audio;
      }

      const volume = customVolume !== undefined ? customVolume : track.defaultVolume;
      audio.volume = Math.max(0, Math.min(1, volume));

      // If audio is currently playing, smoothly seek back without popping
      if (!audio.paused) {
        audio.currentTime = 0;
      }

      console.log(
        `[FireworksAudio] ▶ Starting: ${track.name} (${track.url}) | Volume: ${audio.volume.toFixed(2)} | Time: ${Math.round(now)}ms`
      );

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn(`[FireworksAudio] ✖ Playback rejected for ${track.name}:`, err);
        });
      }
    } catch (err) {}
  }

  public playInitialBlast() {
    this.playTrack('initialBlast', 0.36);
  }

  public playRocketWhistle() {
    this.playTrack('rocketWhistle', 0.22);
  }

  public playAerialExplosion() {
    this.playTrack('aerialExplosion', 0.34);
  }

  public playFountainSizzle() {
    this.playTrack('fountainSizzle', 0.18);
  }

  public playCrackle() {
    this.playTrack('crackle', 0.20);
  }

  public stopAll() {
    Object.keys(this.tracks).forEach((key) => {
      const audio = this.tracks[key].audio;
      if (audio) {
        try {
          audio.pause();
          audio.currentTime = 0;
        } catch (e) {}
      }
    });
  }
}

export const fireworksAudio = new FireworksAudioManager();
