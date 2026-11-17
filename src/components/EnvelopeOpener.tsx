'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { invitationConfig } from '@/config/invitation.config';

interface EnvelopeOpenerProps {
  onOpenComplete: () => void;
  isOpen: boolean;
}

export const EnvelopeOpener: React.FC<EnvelopeOpenerProps> = ({ onOpenComplete, isOpen }) => {
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

    const video = introVideoRef.current;
    if (video) {
      try {
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Mobile fallback if unmuted playback is blocked
            video.muted = true;
            video.play().catch(() => {
              finishIntroAndRevealHero();
            });
          });
        }
      } catch (err) {
        finishIntroAndRevealHero();
      }
    } else {
      finishIntroAndRevealHero();
    }
  }, [finishIntroAndRevealHero]);

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
        playsInline
        // @ts-ignore - WebKit iOS attribute
        webkit-playsinline="true"
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={finishIntroAndRevealHero}
        className="w-full h-full object-cover"
      />

      {/* 2. DIRECT INTERACTIVE SEAL HOTSPOT (Centered exactly over the V&P heart seal) */}
      {!isPlaying && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-auto"
          aria-label="Interactive V&P Wax Seal"
        >
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
            aria-label="Tap seal to open invitation"
            className="group relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center focus:outline-none cursor-pointer"
          >
            {/* Subtle shimmering ambient glow over the seal */}
            <div className="absolute inset-0 rounded-full bg-[#c5a059]/20 blur-xl animate-pulse group-hover:bg-[#c5a059]/35 transition-all duration-300" />
            <div className="absolute inset-4 rounded-full border border-[#e8d29b]/40 animate-ping opacity-30 pointer-events-none" />
            <div className="absolute inset-6 rounded-full border border-[#f5e7c4]/50 animate-pulse pointer-events-none" />
          </button>
        </div>
      )}
    </div>
  );
};
