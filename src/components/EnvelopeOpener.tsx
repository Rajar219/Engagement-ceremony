'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { invitationConfig } from '@/config/invitation.config';

interface EnvelopeOpenerProps {
  onOpenComplete: () => void;
  onOpenStart?: () => void;
  isOpen: boolean;
}

export const EnvelopeOpener: React.FC<EnvelopeOpenerProps> = ({ onOpenComplete, onOpenStart, isOpen }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const hasTriggeredRef = useRef(false);

  const videoSrc = invitationConfig.media.videos.envelopeOpening?.src || '/assets/videos/envelope-opening.mp4';
  const posterSrc = '/intro-poster.webp';

  // Synchronize state when re-opened from the share bar
  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      setIsFading(false);
      hasTriggeredRef.current = false;
      if (introVideoRef.current) {
        introVideoRef.current.currentTime = 0;
        introVideoRef.current.pause();
      }
    }
  }, [isOpen]);

  // Lock body scroll while the intro gate is active
  useEffect(() => {
    if (!isOpen) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
      };
    }
  }, [isOpen]);

  // Smooth cross-fade transition into hero (600ms)
  const finishIntroAndRevealHero = useCallback(() => {
    if (isFading) return;
    setIsFading(true);
    onOpenComplete();
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }, [isFading, onOpenComplete]);

  // Direct seal click/tap interaction: iOS Safari & Android Chrome mobile-safe user gesture
  const handleUserTrigger = useCallback(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setIsPlaying(true);

    // 1. Play music immediately and synchronously in user gesture call stack
    try {
      window.dispatchEvent(new CustomEvent('play-invitation-music'));
    } catch (e) {}

    // 2. Trigger parent callback
    onOpenStart?.();

    const video = introVideoRef.current;
    if (video) {
      try {
        video.muted = true;
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            finishIntroAndRevealHero();
          });
        }
      } catch (err) {
        finishIntroAndRevealHero();
      }
    } else {
      finishIntroAndRevealHero();
    }
  }, [finishIntroAndRevealHero, onOpenStart]);

  // Optional: trigger reveal when video blooms into white light near end (~7.2s of 7.9s)
  const handleTimeUpdate = () => {
    const video = introVideoRef.current;
    if (!video || !isPlaying || isFading) return;
    if (video.duration > 0 && video.duration - video.currentTime <= 0.6) {
      finishIntroAndRevealHero();
    }
  };

  if (isOpen && isFading) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 h-[100dvh] w-full bg-[#1c1613] overflow-hidden select-none transition-opacity duration-700 ease-out cursor-pointer ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ willChange: 'opacity' }}
      onClick={handleUserTrigger}
      onTouchStart={handleUserTrigger}
    >
      {/* 1. CINEMATIC DIRECT SEAL VIDEO & POSTER */}
      <video
        ref={introVideoRef}
        src={videoSrc}
        poster={posterSrc}
        muted
        playsInline
        // @ts-ignore - WebKit iOS attribute
        webkit-playsinline="true"
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={finishIntroAndRevealHero}
        className="w-full h-full object-cover"
      />

      {/* 2. DIRECT INTERACTIVE SEAL HOTSPOT & RADIANT TAP-TO-OPEN CALL-TO-ACTION */}
      <div
        className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
        aria-label="Interactive V&P Wax Seal"
      >
        {/* Seal Hotspot Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleUserTrigger();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            handleUserTrigger();
          }}
          aria-label={isPlaying ? 'Opening invitation' : 'Tap seal to open invitation'}
          className={`pointer-events-auto group relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center focus:outline-none cursor-pointer transition-transform duration-300 ${
            isPlaying ? 'scale-105' : 'hover:scale-105 active:scale-95'
          }`}
        >
          {/* Subtle shimmering ambient glow over the seal */}
          <div className="absolute inset-0 rounded-full bg-[#c5a059]/25 blur-xl animate-pulse group-hover:bg-[#c5a059]/40 transition-all duration-300" />
          <div className="absolute inset-3 rounded-full border border-[#ffe082]/40 animate-ping opacity-25 pointer-events-none" />
          <div className="absolute inset-5 rounded-full border border-[#f5e7c4]/50 animate-pulse pointer-events-none" />
        </button>

        {/* TAP TO OPEN BADGE (Bilingual English & Tamil with live feedback while tapping) */}
        <div
          className={`pointer-events-auto mt-4 sm:mt-6 flex flex-col items-center gap-1.5 px-6 py-2.5 rounded-full backdrop-blur-md transition-all duration-500 cursor-pointer ${
            isPlaying
              ? 'bg-[#1c1613]/90 border border-[#ffe082] shadow-[0_0_30px_rgba(255,224,130,0.5)] scale-105'
              : 'bg-[#1c1613]/80 border border-[#c5a059]/70 shadow-[0_0_22px_rgba(197,160,89,0.4)] hover:border-[#ffe082] animate-pulse'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            handleUserTrigger();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            handleUserTrigger();
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-[#ffe082] text-xs sm:text-sm">✦</span>
            <span className="text-xs sm:text-sm font-serif font-bold tracking-[0.25em] text-[#ffffff] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {isPlaying ? 'OPENING INVITATION...' : 'TAP TO OPEN'}
            </span>
            <span className="text-[#ffe082] text-xs sm:text-sm">✦</span>
          </div>

          <span className="text-[11px] sm:text-xs font-tamil-serif font-semibold text-[#ffe599] tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            {isPlaying ? 'அழைப்பிதழ் திறக்கப்படுகிறது...' : 'அழைப்பிதழைத் திறக்க தட்டவும்'}
          </span>
        </div>

        {/* Helpful tap prompt */}
        {!isPlaying && (
          <span className="pointer-events-none text-[10px] sm:text-[11px] font-sans font-medium text-[#ffffff]/80 uppercase tracking-[0.16em] mt-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Tap seal or screen to view
          </span>
        )}
      </div>
    </div>
  );
};
