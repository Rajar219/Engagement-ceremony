/**
 * Central Universal Audio Controller
 * Engineered specifically for iOS Safari, Android Chrome, Samsung Internet, and modern desktop browsers.
 * Reuses the single persistent #vp-global-audio element rendered in root layout.
 */

export interface AudioState {
  isPlaying: boolean;
  hasStarted: boolean;
  hasError: boolean;
  isMuted: boolean;
  errorMessage: string | null;
}

type AudioListener = (state: AudioState) => void;

class CentralAudioManager {
  private audio: HTMLAudioElement | null = null;
  private listeners: Set<AudioListener> = new Set();
  private hasInitializedListeners = false;
  private unlockedCtx: any = null;

  private state: AudioState = {
    isPlaying: false,
    hasStarted: false,
    hasError: false,
    isMuted: false,
    errorMessage: null,
  };

  /**
   * Retrieve the single persistent HTMLAudioElement from DOM
   */
  public getAudioElement(): HTMLAudioElement | null {
    if (typeof window === 'undefined') return null;

    if (!this.audio) {
      this.audio = document.getElementById('vp-global-audio') as HTMLAudioElement;

      // Fallback if not yet in DOM
      if (!this.audio) {
        console.warn('[Audio] #vp-global-audio element not found in DOM, creating fallback');
        this.audio = new Audio('/assets/music/invitation-theme.mp3');
        this.audio.id = 'vp-global-audio';
        this.audio.loop = true;
        this.audio.preload = 'auto';
        // @ts-ignore
        this.audio.playsInline = true;
        document.body.appendChild(this.audio);
      }

      this.attachDebugListeners();
    }

    return this.audio;
  }

  /**
   * Attach robust lifecycle and debugging event listeners
   */
  private attachDebugListeners() {
    if (this.hasInitializedListeners || !this.audio) return;
    this.hasInitializedListeners = true;

    const a = this.audio;

    a.addEventListener('loadstart', () => {
      console.log('[Audio] File loadstart: /assets/music/invitation-theme.mp3');
    });

    a.addEventListener('loadedmetadata', () => {
      console.log(`[Audio] Metadata loaded. Duration: ${a.duration.toFixed(2)}s`);
    });

    a.addEventListener('canplay', () => {
      console.log(`[Audio] Canplay reached. readyState: ${a.readyState}`);
    });

    a.addEventListener('play', () => {
      console.log('[Audio] Native play event fired');
      this.updateState({ isPlaying: true, hasStarted: true, hasError: false, errorMessage: null });
    });

    a.addEventListener('playing', () => {
      console.log('[Audio] Native playing event fired (audio actively streaming to speakers)');
      this.updateState({ isPlaying: true });
    });

    a.addEventListener('pause', () => {
      console.log('[Audio] Native pause event fired');
      this.updateState({ isPlaying: false });
    });

    a.addEventListener('waiting', () => {
      console.warn('[Audio] Native waiting event (buffering stream)');
    });

    a.addEventListener('stalled', () => {
      console.warn('[Audio] Native stalled event (network stream paused)');
    });

    a.addEventListener('ended', () => {
      console.log('[Audio] Track ended, looping back to start');
      a.currentTime = 0;
      a.play().catch((err) => console.warn('[Audio] Loop replay error:', err));
    });

    a.addEventListener('volumechange', () => {
      console.log(`[Audio] Volume changed: ${a.volume}, muted: ${a.muted}`);
      this.updateState({ isMuted: a.muted });
    });

    a.addEventListener('error', (e) => {
      const err = a.error;
      const msg = err ? `Code ${err.code}: ${err.message}` : 'Unknown audio error';
      console.error('[Audio] Native error event:', msg, e);
      this.updateState({ hasError: true, isPlaying: false, errorMessage: msg });
    });

    // When invitation links are clicked or user switches tabs/apps, immediately stop audio
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          console.log('[Audio] Page hidden/link opened. Stopping music immediately.');
          this.pause();
        }
      });
      window.addEventListener('pagehide', () => {
        console.log('[Audio] Pagehide event. Stopping music immediately.');
        this.pause();
      });
    }
  }

  /**
   * Subscribe to state updates
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
        console.error('[Audio] Listener error:', err);
      }
    });
  }

  /**
   * Directly invoked within user interaction (seal tap).
   * Guaranteed to execute synchronously in the gesture context.
   */
  public async play(): Promise<boolean> {
    const audio = this.getAudioElement();
    if (!audio) {
      console.error('[Audio] play() aborted: no audio element');
      return false;
    }

    console.log('[Audio] Executing audio.play() in user gesture handler. readyState:', audio.readyState);

    // 1. Hardware session unlock for iOS WebKit & Android Chrome
    try {
      if (typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          if (!this.unlockedCtx) {
            this.unlockedCtx = new AudioCtx();
          }
          if (this.unlockedCtx.state === 'suspended') {
            this.unlockedCtx.resume();
          }
        }
      }
    } catch (e) {
      // Non-blocking
    }

    // 2. HTMLAudioElement playback
    try {
      audio.loop = true;
      audio.muted = false;
      audio.volume = 1.0;

      if (audio.readyState === 0) {
        audio.load();
      }
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        console.log('[Audio] audio.play() Promise RESOLVED successfully! Music is playing.');
        this.updateState({
          isPlaying: true,
          hasStarted: true,
          hasError: false,
          isMuted: false,
          errorMessage: null,
        });
        return true;
      }
      return false;
    } catch (err: any) {
      const errMsg = err?.message || err?.name || 'Audio playback blocked';
      console.error('[Audio] audio.play() Promise REJECTED by browser:', errMsg, err);
      this.updateState({
        isPlaying: false,
        hasError: true,
        errorMessage: errMsg,
      });
      return false;
    }
  }

  /**
   * Toggle mute/unmute
   * Changing muted property preserves audio playback session without needing re-activation.
   */
  public toggleMute(): boolean {
    const audio = this.getAudioElement();
    if (!audio) return false;

    // If audio was never started or paused, try to play
    if (audio.paused) {
      this.play().catch(() => {});
      return false;
    }

    audio.muted = !audio.muted;
    console.log('[Audio] Mute toggled. audio.muted =', audio.muted);
    this.updateState({ isMuted: audio.muted });
    return audio.muted;
  }

  /**
   * Pause music safely (e.g. user explicit pause or envelope reset)
   */
  public pause(): void {
    const audio = this.getAudioElement();
    if (!audio) return;
    try {
      console.log('[Audio] Explicit pause requested');
      audio.pause();
      this.updateState({ isPlaying: false });
    } catch (err) {
      console.warn('[Audio] Pause error:', err);
    }
  }

  /**
   * Toggle playback state
   */
  public async togglePlay(): Promise<boolean> {
    const audio = this.getAudioElement();
    if (!audio) return false;

    if (audio.paused) {
      return await this.play();
    } else {
      this.pause();
      return false;
    }
  }
}

// Global Singleton Export
export const audioManager = new CentralAudioManager();
