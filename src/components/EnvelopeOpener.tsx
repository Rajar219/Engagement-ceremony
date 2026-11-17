'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { invitationConfig } from '@/config/invitation.config';

export type EnvelopePhase =
  | 'INITIAL_GATE'
  | 'ENVELOPE_PLAYING'
  | 'CROSS_FADING'
  | 'CLOSED';

interface EnvelopeOpenerProps {
  onOpenComplete: () => void;
  isOpen: boolean;
}

export const EnvelopeOpener: React.FC<EnvelopeOpenerProps> = ({ onOpenComplete, isOpen }) => {
  const [phase, setPhase] = useState<EnvelopePhase>('INITIAL_GATE');
  const [isFading, setIsFading] = useState(false);
  const [autoOpenSecondsLeft, setAutoOpenSecondsLeft] = useState(6);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const hasTriggeredRef = useRef(false);
  const autoOpenTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const videoSrc = invitationConfig.media.videos.envelopeOpening?.src || '/assets/videos/envelope-opening.mp4';
  const posterSrc = '/intro-poster.webp';

  // Synchronize state when re-opened from the share bar
  useEffect(() => {
    if (!isOpen) {
      setPhase('INITIAL_GATE');
      setIsFading(false);
      setAutoOpenSecondsLeft(6);
      hasTriggeredRef.current = false;
    }
  }, [isOpen]);

  // Lock body scroll while the intro gate is active
  useEffect(() => {
    if (phase !== 'CLOSED' && !isOpen) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
      };
    }
  }, [phase, isOpen]);

  // Smooth cross-fade transition into hero (700ms)
  const finishIntroAndRevealHero = useCallback(() => {
    if (hasTriggeredRef.current && phase === 'CROSS_FADING') return;
    setPhase('CROSS_FADING');
    setIsFading(true);

    onOpenComplete();

    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    setTimeout(() => {
      setPhase('CLOSED');
    }, 700);
  }, [phase, onOpenComplete]);

  // Critical Mobile Rule: Triggered strictly inside user's touch/click event handler (iOS Safari & Android Chrome compliance)
  const handleUserTrigger = useCallback(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    if (autoOpenTimerRef.current) {
      clearTimeout(autoOpenTimerRef.current);
      autoOpenTimerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }

    setPhase('ENVELOPE_PLAYING');

    if (introVideoRef.current) {
      try {
        introVideoRef.current.currentTime = 0;
        const playPromise = introVideoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            if (introVideoRef.current) {
              introVideoRef.current.muted = true;
              introVideoRef.current.play().catch(() => {});
            }
          });
        }
      } catch (err) {
        finishIntroAndRevealHero();
      }
    }
  }, [finishIntroAndRevealHero]);

  // 6s auto-open fallback
  useEffect(() => {
    if (phase !== 'INITIAL_GATE') return;

    countdownIntervalRef.current = setInterval(() => {
      setAutoOpenSecondsLeft((prev) => {
        if (prev <= 1) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    autoOpenTimerRef.current = setTimeout(() => {
      if (!hasTriggeredRef.current) {
        handleUserTrigger();
      }
    }, 6000);

    return () => {
      if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [phase, handleUserTrigger]);

  const handleSkip = () => {
    if (introVideoRef.current) {
      introVideoRef.current.pause();
    }
    finishIntroAndRevealHero();
  };

  if (isOpen && phase === 'CLOSED') {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 h-[100dvh] w-full bg-[#1c1613] overflow-hidden select-none transition-opacity duration-700 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ willChange: 'opacity' }}
    >
      {/* 1. INITIAL WAX SEAL GATE (WARM STATIONERY AESTHETIC) */}
      {phase === 'INITIAL_GATE' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-[#251d18] via-[#1c1613] to-[#140f0c]">
          {/* Subtle Warm Amber Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(197,160,89,0.18)_0%,_transparent_65%)] pointer-events-none" />

          {/* Top Auspicious Invocation */}
          <div className="relative z-10 pt-4 text-center flex flex-col items-center">
            <div className="inline-block bg-[#2e231c]/90 text-[#fbf8f0] border border-[#c5a059]/60 px-5 py-1.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.4)] text-xs font-semibold mb-2 font-serif tracking-wider">
              அன்புடன் அழைக்கின்றோம் • Cordially Welcoming You
            </div>
            <p className="text-[11px] text-[#c5a059]/90 font-sans tracking-[0.25em] uppercase">
              Royal Engagement &amp; Wedding Invitation
            </p>
          </div>

          {/* CENTER: THE LUXURY IVORY STATIONERY CARD WITH STAMPED WAX SEAL */}
          <div className="relative z-20 w-full max-w-[400px] aspect-[4/3] rounded-3xl shadow-[0_25px_65px_-10px_rgba(0,0,0,0.7)] border border-[#c5a059]/45 bg-[#fdfbf7] flex flex-col justify-between overflow-hidden">
            {/* Fine Linen Texture Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#fbf9f4] to-[#f4eee4] opacity-95" />
            <div className="absolute inset-3 rounded-2xl border border-dashed border-[#c5a059]/40 pointer-events-none" />

            {/* Top Ornamental Header */}
            <div className="relative z-10 pt-3.5 px-6 flex justify-between text-[#8e6c2e] text-xs font-serif">
              <span>❧</span>
              <span className="tracking-[0.25em] uppercase text-[10px] text-[#5c4722] font-sans font-semibold">
                Engagement Celebration
              </span>
              <span>❧</span>
            </div>

            {/* Centered Wax Seal with Touch Trigger */}
            <div className="relative z-30 my-auto flex flex-col items-center">
              <button
                type="button"
                onClick={handleUserTrigger}
                onTouchStart={handleUserTrigger}
                aria-label="Tap seal to open the wedding invitation"
                className="group relative cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                {/* Glowing Pulsing Ripple Halo */}
                <div className="absolute -inset-4 rounded-full bg-[#c5a059]/30 blur-md animate-pulse opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -inset-8 rounded-full border border-[#c5a059]/35 animate-ping opacity-25 pointer-events-none" />

                {/* Heirloom Heart Wax Seal Emblem */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center filter drop-shadow-[0_12px_24px_rgba(35,28,24,0.45)]">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <radialGradient id="luxuryWaxGradVP" cx="38%" cy="32%" r="65%">
                        <stop offset="0%" stopColor="#8d2639" />
                        <stop offset="40%" stopColor="#701827" />
                        <stop offset="85%" stopColor="#480d17" />
                        <stop offset="100%" stopColor="#2c060d" />
                      </radialGradient>
                      <linearGradient id="luxuryGoldRimVP" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fff8e7" />
                        <stop offset="35%" stopColor="#c5a059" />
                        <stop offset="70%" stopColor="#8c6a28" />
                        <stop offset="100%" stopColor="#eedcb4" />
                      </linearGradient>
                    </defs>

                    {/* Outer Wax Relief */}
                    <path
                      d="M 50,32 C 50,16 34,4 18,4 C 6,4 -1,16 0,32 C 1,58 35,78 50,96 C 65,78 99,58 100,32 C 101,16 94,4 82,4 C 66,4 50,16 50,32 Z"
                      fill="url(#luxuryWaxGradVP)"
                      stroke="url(#luxuryGoldRimVP)"
                      strokeWidth="1.8"
                    />

                    {/* Inner Sculpted Ridge */}
                    <path
                      d="M 50,36 C 50,23 37,13 23,13 C 12,13 7,22 8,34 C 9,54 38,71 50,86 C 62,71 91,54 92,34 C 93,22 88,13 77,13 C 63,13 50,23 50,36 Z"
                      fill="none"
                      stroke="rgba(244, 232, 200, 0.45)"
                      strokeWidth="0.8"
                    />

                    {/* Monogram */}
                    <text
                      x="50"
                      y="51"
                      textAnchor="middle"
                      fontFamily="Cinzel, Cormorant Garamond, serif"
                      fontSize="18"
                      fontWeight="bold"
                      fill="#fffcf5"
                      stroke="#8c6a28"
                      strokeWidth="0.5"
                      letterSpacing="1.8"
                    >
                      V&amp;P
                    </text>

                    <text
                      x="50"
                      y="63"
                      textAnchor="middle"
                      fontFamily="system-ui, sans-serif"
                      fontSize="5.5"
                      letterSpacing="2.2"
                      fill="rgba(255, 252, 245, 0.85)"
                    >
                      2026
                    </text>
                  </svg>
                </div>
              </button>

              {/* GLOWING, PULSING CTA BUTTON AS SPECIFIED */}
              <div className="mt-3 flex flex-col items-center">
                <button
                  type="button"
                  onClick={handleUserTrigger}
                  onTouchStart={handleUserTrigger}
                  className="shimmer-sweep px-5 py-2 rounded-full bg-gradient-to-r from-[#c5a059] via-[#f1e2be] to-[#b08b41] text-[#231c18] font-bold text-xs uppercase tracking-wider shadow-[0_4px_18px_rgba(197,160,89,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span>✨</span>
                  <span className="font-tamil-sans">
                    Tap Seal to Open • முத்திரையைத் தட்டித் திறக்கவும்
                  </span>
                  <span>✨</span>
                </button>

                <span className="text-[12px] text-[#231c18] font-serif font-bold tracking-wider mt-2">
                  G. Vallalarasu &amp; K. Priyanka
                </span>

                <span className="text-[10px] text-[#766c62] tracking-wide mt-0.5 font-tamil-sans">
                  தானாக திறக்கப்படும் • Auto-opening in {autoOpenSecondsLeft}s
                </span>
              </div>
            </div>

            {/* Bottom Venue Note */}
            <div className="relative z-10 pb-3 px-6 text-center">
              <span className="text-[10px] text-[#766c62] tracking-wider font-serif">
                13 December 2026 • RSM Banquet Hall, Chennai
              </span>
            </div>
          </div>

          {/* Skip Button */}
          <div className="relative z-10 pb-2">
            <button
              type="button"
              onClick={handleSkip}
              className="text-xs text-[#c5a059]/85 hover:text-[#fff8e7] underline underline-offset-4 tracking-wider transition-colors font-tamil-sans"
            >
              Skip • தவிர் ➔
            </button>
          </div>
        </div>
      )}

      {/* 2. FULL-SCREEN ENVELOPE OPENING VIDEO */}
      <div
        className={`absolute inset-0 z-30 flex items-center justify-center bg-[#1c1613] ${
          phase === 'ENVELOPE_PLAYING' || phase === 'CROSS_FADING' ? 'block' : 'hidden'
        }`}
      >
        <video
          ref={introVideoRef}
          src={videoSrc}
          poster={posterSrc}
          playsInline
          // @ts-ignore - WebKit iOS attribute
          webkit-playsinline="true"
          preload="auto"
          onEnded={finishIntroAndRevealHero}
          className="w-full h-full object-cover"
        />

        {/* Top-Right Discreet Skip Button */}
        <button
          type="button"
          onClick={handleSkip}
          className="absolute top-6 right-6 z-40 px-4 py-1.5 rounded-full bg-black/60 hover:bg-black/85 border border-[#c5a059]/40 text-xs text-[#fdfbf7] tracking-wider font-tamil-sans backdrop-blur-md transition-all shadow-lg active:scale-95"
        >
          Skip • தவிர் ➔
        </button>
      </div>
    </div>
  );
};
