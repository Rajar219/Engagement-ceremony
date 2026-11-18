'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { VolumeX } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasEverStartedRef = useRef(false);

  const audioSrc = invitationConfig.media.music.src || '/assets/music/invitation-theme.mp3';

  const stopMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const playMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          hasEverStartedRef.current = true;
        })
        .catch((err) => {
          console.warn('Audio play request prevented:', err);
        });
    }
  }, []);

  // Immediate synchronous play handler for user interactions (e.g. seal tapping)
  useEffect(() => {
    const handleImmediatePlay = () => {
      playMusic();
    };

    const handleImmediateStop = () => {
      stopMusic();
    };

    window.addEventListener('play-invitation-music', handleImmediatePlay);
    window.addEventListener('stop-invitation-music', handleImmediateStop);

    return () => {
      window.removeEventListener('play-invitation-music', handleImmediatePlay);
      window.removeEventListener('stop-invitation-music', handleImmediateStop);
    };
  }, [playMusic, stopMusic]);

  // Autoplay after visitor interaction (e.g. seal breaking)
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      playMusic();
    }
  }, [autoPlayTrigger, playMusic]);

  // If user navigates away, clicks out, or switches tabs/apps, and then comes back without closing browser:
  // Music must stop immediately and NOT auto-resume.
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopMusic();
      } else {
        // If returning to the tab/window, stop music immediately
        if (hasEverStartedRef.current) {
          stopMusic();
        }
      }
    };

    const handleWindowBlur = () => {
      stopMusic();
    };

    const handlePageHide = () => {
      stopMusic();
    };

    const handlePageShow = () => {
      if (hasEverStartedRef.current) {
        stopMusic();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [stopMusic]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.loop = true;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          hasEverStartedRef.current = true;
        })
        .catch((e) => {
          console.error('Audio play error:', e);
        });
    }
  };

  return (
    <div className="fixed bottom-6 z-40 flex items-center justify-end px-4 w-full max-w-[430px] left-1/2 -translate-x-1/2 pointer-events-none">
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
      />

      {/* Floating Audio Control Button */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className="pointer-events-auto group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#ffffff] hover:bg-[#faf8f4] border border-[#c5a059]/50 shadow-[0_8px_24px_rgba(35,28,24,0.14)] hover:shadow-[0_8px_30px_rgba(197,160,89,0.35)] transition-all duration-300 cursor-pointer"
      >
        {/* Equalizer Wave / Icon */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-4 w-4">
            <span className="w-1 bg-[#c5a059] rounded-full eq-bar-1" />
            <span className="w-1 bg-[#c5a059] rounded-full eq-bar-2" />
            <span className="w-1 bg-[#c5a059] rounded-full eq-bar-3" />
          </div>
        ) : (
          <VolumeX className="w-4 h-4 text-[#a88136]" />
        )}

        <span className="text-[11px] font-sans uppercase tracking-wider text-[#231c18] font-semibold">
          {isPlaying ? 'Music On' : 'Play Music'}
        </span>
      </button>
    </div>
  );
};
