'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { GoldenDustParticles } from '@/components/GoldenDustParticles';

interface HeroSectionProps {
  isVisible?: boolean;
}

// Delicate floral diamond ornament matching Reference Image 2: ─── ❀ ───
const FloralDivider: React.FC<{ className?: string }> = ({ className = 'my-2 xs:my-2.5' }) => (
  <div
    className={`flex items-center justify-center gap-2 w-32 xs:w-40 sm:w-48 mx-auto ${className} select-none pointer-events-none`}
  >
    <div className="flex-1 h-[0.75px] bg-gradient-to-r from-transparent via-[#e6ca85]/50 to-[#e6ca85]" />
    <svg
      className="w-5 h-3 text-[#f3dfa2] drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]"
      viewBox="0 0 24 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 1L14 7L12 13L10 7L12 1Z" fill="#e6ca85" />
      <circle cx="6" cy="7" r="1.3" fill="#e6ca85" />
      <circle cx="18" cy="7" r="1.3" fill="#e6ca85" />
      <path d="M1 7H4.5M19.5 7H23" stroke="#e6ca85" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
    <div className="flex-1 h-[0.75px] bg-gradient-to-l from-transparent via-[#e6ca85]/50 to-[#e6ca85]" />
  </div>
);

// Delicate intertwined double hearts matching Reference Image 2: ♡♡
const IntertwinedHearts: React.FC<{ className?: string }> = ({ className = 'mt-2.5 xs:mt-3' }) => (
  <div className={`flex items-center justify-center ${className} select-none pointer-events-none`}>
    <svg
      className="w-10 h-5 text-[#f3dfa2] drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
      viewBox="0 0 48 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left Heart (tilted -8 deg) */}
      <path
        d="M17 21.5 C 17 21.5 6 14.5 6 8 C 6 4.2 9.2 2.2 12.6 3.8 C 14.6 4.8 16.2 6.5 17 7.4 C 17.8 6.5 19.4 4.8 21.4 3.8 C 24.8 2.2 28 4.2 28 8 C 28 14.5 17 21.5 17 21.5 Z"
        stroke="#e6ca85"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="rotate(-8 17 12)"
      />
      {/* Right Heart (tilted +8 deg, overlapping) */}
      <path
        d="M31 22 C 31 22 20 15 20 8.5 C 20 4.7 23.2 2.7 26.6 4.3 C 28.6 5.3 30.2 7 31 7.9 C 31.8 7 33.4 5.3 35.4 4.3 C 38.8 2.7 42 4.7 42 8.5 C 42 15 31 22 31 22 Z"
        stroke="#f3dfa2"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="rotate(8 31 12)"
      />
    </svg>
  </div>
);

export const HeroSection: React.FC<HeroSectionProps> = ({ isVisible = true }) => {
  const [mounted, setMounted] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = '/assets/videos/hero-background.mp4';
  const posterSrc = '/hero-poster.webp';

  useEffect(() => {
    // Subtle tick to trigger smooth CSS transitions
    const timer = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible && heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {});
    } else if (!isVisible && heroVideoRef.current) {
      heroVideoRef.current.pause();
    }
  }, [isVisible]);

  // Mobile optimization: IntersectionObserver to pause video when scrolled off-screen
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isVisible) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isVisible]);

  // Warm pearl ivory text styling with subtle cinematic shadow for contrast against sky
  const pearlTextStyle: React.CSSProperties = {
    color: '#FFF8ED',
    opacity: 1,
    WebkitTextFillColor: '#FFF8ED',
    WebkitTextStroke: '0.25px rgba(0, 0, 0, 0.55)',
    textShadow: '0 2px 6px rgba(0, 0, 0, 0.85), 0 4px 14px rgba(0, 0, 0, 0.65)',
  };

  const coupleNameStyle: React.CSSProperties = {
    color: '#FFF9EE',
    opacity: 1,
    WebkitTextFillColor: '#FFF9EE',
    WebkitTextStroke: '0.3px rgba(0, 0, 0, 0.6)',
    textShadow:
      '0 2px 10px rgba(0, 0, 0, 0.9), 0 4px 22px rgba(0, 0, 0, 0.75), 0 0 35px rgba(230, 202, 133, 0.25)',
    fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
    fontStyle: 'italic',
    fontWeight: 600,
    letterSpacing: '-0.01em',
  };

  return (
    <section
      id="hero-section"
      className="relative h-[100svh] min-h-[100svh] w-full flex flex-col items-center justify-start overflow-hidden px-4 select-none"
    >
      {/* 1. ORIGINAL BACKGROUND (Cinematic purple curtains, palace, chandeliers & clouds video) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={heroVideoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          loop
          playsInline
          // @ts-ignore - WebKit iOS attribute
          webkit-playsinline="true"
          preload="metadata"
          className="w-full h-full object-cover object-center scale-[1.01]"
        />
      </div>

      {/* SUBTLE VIGNETTE FOR TEXT CONTRAST (Preserves curtains, palace, and architectural details) */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_40%,rgba(0,0,0,0.32)_0%,rgba(0,0,0,0)_72%)] pointer-events-none" />

      {/* FLOATING GOLDEN DUST PARTICLES */}
      <GoldenDustParticles />

      {/* 2. UNIFIED POSTER COMPOSITION (All content strictly ordered, centered, and harmoniously spaced) */}
      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center text-center mt-[max(3rem,11.5svh)] sm:mt-[12svh] px-2">
        {/* FIRST – ENGAGEMENT TITLE */}
        <div
          className={`flex flex-col items-center gap-0.5 sm:gap-1 transition-all duration-700 ease-out delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <h2
            className="font-serif uppercase tracking-[0.22em] sm:tracking-[0.28em] text-[clamp(12px,2.9vw,15px)] font-bold select-none text-center"
            style={pearlTextStyle}
          >
            ENGAGEMENT CEREMONY
          </h2>
          <p
            className="font-tamil-heading text-[clamp(12px,2.9vw,15px)] font-bold tracking-[0.03em] select-none text-center"
            style={pearlTextStyle}
          >
            அன்புடன் அழைக்கிறோம்
          </p>

          <FloralDivider className="mt-2 xs:mt-2.5 mb-1.5 xs:mb-2" />
        </div>

        {/* SECOND – COUPLE NAMES (Large, flowing, high-quality calligraphy serif actual website text) */}
        <div
          className={`w-full max-w-sm sm:max-w-md mx-auto my-1 xs:my-1.5 sm:my-2 flex flex-col items-center justify-center transition-all duration-700 ease-out delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h1
            className="text-[clamp(2.75rem,9.5vw,4.5rem)] leading-[1.05] select-none"
            style={coupleNameStyle}
          >
            Vallarasu
          </h1>

          {/* Ampersand separator: — & — */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 w-36 xs:w-44 sm:w-52 mx-auto my-1 xs:my-1.5 select-none pointer-events-none">
            <div className="flex-1 h-[0.75px] bg-gradient-to-r from-transparent via-[#e6ca85]/60 to-[#e6ca85]" />
            <span
              className="font-serif italic text-lg xs:text-xl sm:text-2xl text-[#f3dfa2] font-normal leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
              style={{
                WebkitTextStroke: '0.2px rgba(0, 0, 0, 0.5)',
              }}
            >
              &amp;
            </span>
            <div className="flex-1 h-[0.75px] bg-gradient-to-l from-transparent via-[#e6ca85]/60 to-[#e6ca85]" />
          </div>

          <h1
            className="text-[clamp(2.75rem,9.5vw,4.5rem)] leading-[1.05] select-none"
            style={coupleNameStyle}
          >
            Priyanka
          </h1>

          <FloralDivider className="mt-2.5 xs:mt-3 mb-1.5 xs:mb-2" />
        </div>

        {/* THIRD – CEREMONY DESCRIPTION & FOURTH – DECORATION */}
        <div
          className={`max-w-[300px] xs:max-w-[340px] sm:max-w-md mx-auto px-2 mt-2 xs:mt-2.5 text-center transition-all duration-700 ease-out delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <p
            className="font-serif italic font-medium text-[clamp(13px,3.1vw,15px)] leading-[1.5] xs:leading-[1.55] select-none text-[#FFF8ED]"
            style={pearlTextStyle}
          >
            &ldquo;Two hearts, one journey,
            <br />
            a lifetime of togetherness
            <br />
            begins here...&rdquo;
          </p>

          {/* FOURTH – DECORATION: Delicate intertwined double heart ornament beneath quotation */}
          <IntertwinedHearts className="mt-2.5 xs:mt-3" />
        </div>
      </div>

      {/* FIFTH – EXPLORE INDICATOR (Pinned near the bottom over the terrace floor) */}
      <div
        className={`absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-0 right-0 flex flex-col items-center z-10 transition-all duration-700 ease-out delay-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <a
          href="#couple-section"
          className="text-xs text-[#FFF8ED] hover:text-white flex flex-col items-center gap-0.5 transition-colors group cursor-pointer"
        >
          <span
            className="tracking-[0.2em] uppercase text-[10px] sm:text-[11px] font-sans font-semibold"
            style={pearlTextStyle}
          >
            EXPLORE INVITATION
          </span>
          <span
            className="text-[10px] sm:text-[11px] font-tamil font-medium tracking-[0.02em]"
            style={pearlTextStyle}
          >
            அழைப்பிதழை காண்க
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#f3dfa2] group-hover:text-white drop-shadow-md mt-0.5" />
        </a>
      </div>
    </section>
  );
};
