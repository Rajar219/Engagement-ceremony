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

  const audioSrc = invitationConfig.media.music.src || '/assets/music/invitation-theme.mp3';

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay policy might block until explicit user interaction
        setIsPlaying(false);
      });
    }
  }, [autoPlayTrigger]);

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
        className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-[#2a0b12] to-[#160509] border border-gold-400/50 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] backdrop-blur-md transition-all duration-300"
      >
        {/* Equalizer Wave / Icon */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-4 w-4">
            <span className="w-1 bg-gold-400 rounded-full eq-bar-1" />
            <span className="w-1 bg-gold-400 rounded-full eq-bar-2" />
            <span className="w-1 bg-gold-400 rounded-full eq-bar-3" />
          </div>
        ) : (
          <VolumeX className="w-4 h-4 text-gold-400/70" />
        )}

        <span className="text-[11px] font-sans uppercase tracking-wider text-gold-300 font-medium hidden sm:inline">
          {isPlaying ? 'Music On' : 'Play Music'}
        </span>
      </button>
    </div>
  );
};
