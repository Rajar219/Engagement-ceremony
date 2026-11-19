'use client';

import React, { useState, useEffect } from 'react';
import { VolumeX, Volume2, AlertCircle } from 'lucide-react';
import { audioManager, AudioState } from '@/lib/audio-manager';

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlayTrigger }) => {
  const [audioState, setAudioState] = useState<AudioState>(audioManager.getState());

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((state) => {
      setAudioState(state);
    });
    return () => unsubscribe();
  }, []);

  // When autoPlayTrigger turns true (after user interaction), trigger play
  useEffect(() => {
    if (autoPlayTrigger && !audioState.isPlaying) {
      audioManager.play().catch(() => {});
    }
  }, [autoPlayTrigger, audioState.isPlaying]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioManager.toggle().catch(() => {});
  };

  const isPlaying = audioState.isPlaying;
  const hasError = audioState.hasError && !isPlaying;

  return (
    <div className="fixed bottom-6 z-40 flex items-center justify-end px-4 w-full max-w-[430px] left-1/2 -translate-x-1/2 pointer-events-none">
      {/* Floating Audio Control Button */}
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? 'Mute music' : 'Play music'}
        className={`pointer-events-auto group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-md active:scale-95 ${
          hasError
            ? 'bg-[#fff8e1] border-2 border-[#e6a836] animate-pulse text-[#8c6b32]'
            : isPlaying
            ? 'bg-[#ffffff] hover:bg-[#faf8f4] border border-[#c5a059]/60 text-[#231c18]'
            : 'bg-[#ffffff] hover:bg-[#faf8f4] border border-[#c5a059]/40 text-[#5a4a42]'
        }`}
      >
        {/* Equalizer Wave / Error / Mute Icon */}
        {hasError ? (
          <AlertCircle className="w-4 h-4 text-[#c5a059] animate-bounce shrink-0" />
        ) : isPlaying ? (
          <div className="flex items-end gap-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true">
            <span className="w-0.5 bg-[#c5a059] rounded-full eq-bar-1" />
            <span className="w-0.5 bg-[#c5a059] rounded-full eq-bar-2" />
            <span className="w-0.5 bg-[#c5a059] rounded-full eq-bar-3" />
          </div>
        ) : (
          <VolumeX className="w-4 h-4 text-[#a88136] shrink-0" />
        )}

        <span className="text-[10.5px] font-sans uppercase tracking-wider font-semibold whitespace-nowrap">
          {hasError ? 'Tap to Play Music' : isPlaying ? 'Music On' : 'Play Music'}
        </span>
      </button>
    </div>
  );
};
