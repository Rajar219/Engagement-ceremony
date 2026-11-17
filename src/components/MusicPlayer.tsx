'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingBeforeHiddenRef = useRef(false);

  const audioSrc = invitationConfig.media.music.src || '/assets/music/invitation-theme.mp3';

  // Autoplay after visitor interaction (e.g. seal breaking)
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [autoPlayTrigger]);

  // Page visibility listener: stop audio when user leaves or switches tab, resume on return
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (audioRef.current && !audioRef.current.paused) {
          wasPlayingBeforeHiddenRef.current = true;
          audioRef.current.pause();
          setIsPlaying(false);
        }
      } else {
        if (wasPlayingBeforeHiddenRef.current && audioRef.current) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
            wasPlayingBeforeHiddenRef.current = false;
          }).catch(() => {});
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.error('Audio play error:', e);
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
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
        className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#ffffff]/92 hover:bg-[#faf8f4] border border-[#c5a059]/45 shadow-[0_8px_24px_rgba(35,28,24,0.12)] hover:shadow-[0_8px_30px_rgba(197,160,89,0.35)] backdrop-blur-md transition-all duration-300 cursor-pointer"
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

        <span className="text-[11px] font-sans uppercase tracking-wider text-[#231c18] font-semibold hidden sm:inline">
          {isPlaying ? 'Music On' : 'Play Music'}
        </span>
      </button>
    </div>
  );
};
