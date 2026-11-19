'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { invitationConfig } from '@/config/invitation.config';
import { audioManager } from '@/lib/audio-manager';

interface EnvelopeOpenerProps {
  onOpenComplete: () => void;
  onOpenStart?: () => void;
  isOpen: boolean;
}

export const EnvelopeOpener: React.FC<EnvelopeOpenerProps> = ({ onOpenComplete, onOpenStart, isOpen }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const hasTriggeredRef = useRef(false);
  const hasFlashedRef = useRef(false);

  const videoSrc = invitationConfig.media.videos.envelopeOpening?.src || '/assets/videos/envelope-opening.mp4';
  const posterSrc = '/intro-poster.webp';

  // Synchronize state when re-opened from the share bar
  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      setIsFlashing(false);
      hasTriggeredRef.current = false;
      hasFlashedRef.current = false;
      if (introVideoRef.current) {
        introVideoRef.current.currentTime = 0;
        introVideoRef.current.pause();
      }
    }
  }, [isOpen]);

  // Lock body scroll while the intro gate or flash is active
  useEffect(() => {
    if (!isOpen || isFlashing) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
      };
    }
  }, [isOpen, isFlashing]);

  // Trigger the bright golden-white flash sequence immediately when video reaches actual end
  const triggerFlashTransition = useCallback(() => {
    if (hasFlashedRef.current) return;
    hasFlashedRef.current = true;
    setIsFlashing(true);

    // At 75ms into the flash (screen is 100% brilliant white and gold), signal parent that envelope is open
    // This allows HeroSection to mount and start video underneath the solid light with zero black frames
    const swapTimer = setTimeout(() => {
      onOpenComplete();
    }, 75);

    // After 420ms (total flash duration), smoothly end flash and unmount intro
    const finishTimer = setTimeout(() => {
      setIsFlashing(false);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }, 420);

    return () => {
      clearTimeout(swapTimer);
      clearTimeout(finishTimer);
    };
  }, [onOpenComplete]);

  // Direct seal click/tap interaction: iOS Safari & Android Chrome mobile-safe user gesture
  const handleUserTrigger = useCallback(() => {
    // 1. Play music directly and synchronously within the user gesture call stack
    audioManager.play().catch((err) => {
      console.warn('[EnvelopeOpener] Audio play in user gesture caught error:', err);
    });

    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setIsPlaying(true);

    // 2. Trigger parent callback
    onOpenStart?.();

    const video = introVideoRef.current;
    if (video) {
      try {
        video.muted = true;
        video.defaultMuted = true;
        video.volume = 0;
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            triggerFlashTransition();
          });
        }
      } catch (err) {
        triggerFlashTransition();
      }
    } else {
      triggerFlashTransition();
    }
  }, [triggerFlashTransition, onOpenStart]);

  // Trigger flash transition immediately when video reaches actual end
  const handleTimeUpdate = () => {
    const video = introVideoRef.current;
    if (!video || !isPlaying || hasFlashedRef.current) return;
    // Guard: when video reaches within the final 0.05 seconds of its duration
    if (video.duration > 0 && video.duration - video.currentTime <= 0.05) {
      triggerFlashTransition();
    }
  };

  if (isOpen && !isFlashing) {
    return null;
  }

  return (
    <>
      {/* 1. ENVELOPE INTRO GATE (Mounted while envelope is not open) */}
      {!isOpen && (
        <div
          className="fixed inset-0 z-50 h-[100dvh] w-full flex items-center justify-center bg-[#16110e] overflow-hidden cursor-pointer"
          style={{ willChange: 'opacity' }}
          onClick={handleUserTrigger}
        >
          {/* Centered Mobile Envelope Frame (Max 430px) */}
          <div className="relative w-full max-w-[430px] h-[100dvh] bg-[#1c1613] overflow-hidden shadow-2xl">
            {/* Cinematic Envelope Opening Video */}
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
              onEnded={triggerFlashTransition}
              className="w-full h-full object-cover"
            />

            {/* Interactive Seal Hotspot (Fades out when tapped, kept in DOM to preserve touch gesture token) */}
            <div
              className={`absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300 ${
                isPlaying ? 'opacity-0' : 'opacity-100'
              }`}
              aria-label="Interactive V&P Wax Seal"
            >
              {/* Seal Hotspot Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUserTrigger();
                }}
                aria-label="Tap seal to open invitation"
                className={`group relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center focus:outline-none cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 ${
                  isPlaying ? 'pointer-events-none' : 'pointer-events-auto'
                }`}
              >
                <div className="absolute inset-0 rounded-full bg-[#c5a059]/25 blur-xl animate-pulse group-hover:bg-[#c5a059]/40 transition-all duration-300" />
                <div className="absolute inset-3 rounded-full border border-[#ffe082]/40 animate-ping opacity-25 pointer-events-none" />
                <div className="absolute inset-5 rounded-full border border-[#f5e7c4]/50 animate-pulse pointer-events-none" />
              </button>

              {/* Clean, Cardless Tap Indicator */}
              <div className="pointer-events-none mt-4 sm:mt-5 flex flex-col items-center text-center select-none">
                <span className="text-xs sm:text-sm font-serif font-bold tracking-[0.25em] text-[#ffffff] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  ✦ TAP TO OPEN ✦
                </span>
                <span className="text-[11px] sm:text-xs font-tamil-serif font-semibold text-[#ffe599] tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)] mt-0.5">
                  அழைப்பிதழைத் திறக்க தட்டவும்
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. BRIGHT WARM-WHITE & GOLDEN FLASH OVERLAY (Duration: ~420ms, covers entire viewport edge to edge) */}
      {isFlashing && (
        <div
          className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center overflow-hidden"
          style={{
            animation: 'cinematicFlashOverlay 420ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
            willChange: 'opacity',
          }}
          aria-hidden="true"
        >
          {/* Edge-to-edge warm white & royal gold radiant wash */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, #FFFFFF 15%, #FFF8D6 40%, #FFE282 70%, #D4AF37 90%, #A88136 100%)',
            }}
          />

          {/* Central expanding radiant starburst / light bloom */}
          <div
            className="absolute w-[220px] h-[220px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 245, 200, 0.95) 25%, rgba(255, 215, 100, 0.6) 55%, transparent 80%)',
              boxShadow: '0 0 140px 70px rgba(255, 245, 180, 0.95), 0 0 240px 120px rgba(255, 215, 100, 0.8)',
              animation: 'cinematicFlashBurst 420ms cubic-bezier(0.2, 0.9, 0.3, 1) forwards',
              willChange: 'transform, opacity',
            }}
          />
        </div>
      )}
    </>
  );
};
