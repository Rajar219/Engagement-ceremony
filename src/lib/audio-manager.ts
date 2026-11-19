/**
 * Central Universal Audio Manager
 * Production-ready singleton for rock-solid mobile audio playback across
 * iOS Safari, Android Chrome, Samsung Internet, and desktop browsers.
 */

export interface AudioState {
  isPlaying: boolean;
  hasStarted: boolean;
  hasError: boolean;
  isMuted: boolean;
}

type AudioListener = (state: AudioState) => void;

class CentralAudioManager {
  private audio: HTMLAudioElement | null = null;
  private listeners: Set<AudioListener> = new Set();
  private audioSrc = '/assets/music/invitation-theme.mp3';
  private wasPlayingBeforeHidden = false;
  private isInitializing = false;

  private state: AudioState = {
    isPlaying: false,
    hasStarted: false,
    hasError: false,
    isMuted: false,
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.setupVisibilityHandler();
    }
  }

  /**
   * Lazily retrieve or create the single central HTMLAudioElement
   */
  public getAudioElement(): HTMLAudioElement | null {
    if (typeof window === 'undefined') return null;

    if (!this.audio) {
      this.audio = new Audio();
      this.audio.src = this.audioSrc;
      this.audio.loop = true;
      this.audio.preload = 'auto';
      this.audio.volume = 1.0;

      // Ensure proper mobile playback configuration
      // @ts-ignore
      this.audio.playsInline = true;

      // Event listeners for state sync
      this.audio.addEventListener('play', () => {
        this.updateState({ isPlaying: true, hasStarted: true, hasError: false });
      });

      this.audio.addEventListener('pause', () => {
        this.updateState({ isPlaying: false });
      });

      this.audio.addEventListener('ended', () => {
        // Since loop is true, this is a fallback
        if (this.audio) {
          this.audio.currentTime = 0;
          this.audio.play().catch(() => {});
        }
      });

      this.audio.addEventListener('error', (e) => {
        console.warn('[AudioManager] Audio element error:', e);
        this.updateState({ hasError: true, isPlaying: false });
      });
    }

    return this.audio;
  }

  /**
   * Subscribe to audio state changes
   */
  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getState(): AudioState {
    return { ...this.state };
  }

  private updateState(partial: Partial<AudioState>) {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach((listener) => {
      try {
        listener(this.state);
      } catch (err) {
        console.error('[AudioManager] Listener error:', err);
      }
    });
  }

  /**
   * Play music immediately within a user gesture handler (tap/click).
   * Returns a promise resolving to true if playback started, false otherwise.
   */
  public async play(): Promise<boolean> {
    const audio = this.getAudioElement();
    if (!audio) return false;

    try {
      audio.loop = true;
      audio.volume = 1.0;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        this.updateState({ isPlaying: true, hasStarted: true, hasError: false });
        return true;
      }
      return false;
    } catch (err: any) {
      console.warn('[AudioManager] Playback blocked or failed:', err);
      this.updateState({ isPlaying: false, hasError: true });
      return false;
    }
  }

  /**
   * Pause music safely
   */
  public pause(): void {
    const audio = this.getAudioElement();
    if (!audio) return;

    try {
      audio.pause();
      this.updateState({ isPlaying: false });
    } catch (err) {
      console.warn('[AudioManager] Pause error:', err);
    }
  }

  /**
   * Toggle music playback
   */
  public async toggle(): Promise<boolean> {
    if (this.state.isPlaying) {
      this.pause();
      return false;
    } else {
      return await this.play();
    }
  }

  /**
   * Handle backgrounding and foregrounding smoothly
   * Reopening the browser or switching back does not break playback
   */
  private setupVisibilityHandler() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (this.audio && !this.audio.paused) {
          this.wasPlayingBeforeHidden = true;
          this.audio.pause();
        }
      } else {
        // When returning to tab, resume smoothly if it was playing before
        if (this.wasPlayingBeforeHidden && this.audio) {
          this.audio.play().catch(() => {
            // If browser blocks resume without gesture, set error state for user tap
            this.updateState({ isPlaying: false, hasError: true });
          });
          this.wasPlayingBeforeHidden = false;
        }
      }
    });
  }
}

// Global Singleton Export
export const audioManager = new CentralAudioManager();
