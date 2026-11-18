'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { GoldenDustParticles } from '@/components/GoldenDustParticles';

interface HeroSectionProps {
  isVisible?: boolean;
}

// Delicate floral diamond ornament: ─── ❀ ───
const FloralDivider: React.FC<{ className?: string }> = ({ className = 'my-1.5 xs:my-2' }) => (
  <div
    className={`flex items-center justify-center gap-2 w-36 xs:w-44 sm:w-52 mx-auto ${className} select-none pointer-events-none`}
  >
    <div className="flex-1 h-[0.75px] bg-gradient-to-r from-transparent via-[#ffe082]/70 to-[#ffe082]" />
    <svg
      className="w-5 h-3 text-[#ffe599] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
      viewBox="0 0 24 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 1L14 7L12 13L10 7L12 1Z" fill="#ffe082" />
      <circle cx="6" cy="7" r="1.3" fill="#ffe082" />
      <circle cx="18" cy="7" r="1.3" fill="#ffe082" />
      <path d="M1 7H4.5M19.5 7H23" stroke="#ffe082" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
    <div className="flex-1 h-[0.75px] bg-gradient-to-l from-transparent via-[#ffe082]/70 to-[#ffe082]" />
  </div>
);

// Delicate intertwined double hearts: ♡♡
const IntertwinedHearts: React.FC<{ className?: string }> = ({ className = 'mt-2 xs:mt-2.5' }) => (
  <div className={`flex items-center justify-center ${className} select-none pointer-events-none`}>
    <svg
      className="w-10 h-5 text-[#ffe599] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
      viewBox="0 0 48 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left Heart (tilted -8 deg) */}
      <path
        d="M17 21.5 C 17 21.5 6 14.5 6 8 C 6 4.2 9.2 2.2 12.6 3.8 C 14.6 4.8 16.2 6.5 17 7.4 C 17.8 6.5 19.4 4.8 21.4 3.8 C 24.8 2.2 28 4.2 28 8 C 28 14.5 17 21.5 17 21.5 Z"
        stroke="#ffe082"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="rotate(-8 17 12)"
      />
      {/* Right Heart (tilted +8 deg, overlapping) */}
      <path
        d="M31 22 C 31 22 20 15 20 8.5 C 20 4.7 23.2 2.7 26.6 4.3 C 28.6 5.3 30.2 7 31 7.9 C 31.8 7 33.4 5.3 35.4 4.3 C 38.8 2.7 42 4.7 42 8.5 C 42 15 31 22 31 22 Z"
        stroke="#fff3cc"
        strokeWidth="1.4"
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

  // Ultra-bright luminous white text styling with golden ambient radiance
  const brightWhiteStyle: React.CSSProperties = {
    color: '#FFFFFF',
    opacity: 1,
    WebkitTextFillColor: '#FFFFFF',
    WebkitTextStroke: '0',
    textShadow:
      '0 0 12px rgba(255, 235, 170, 0.75), 0 2px 4px rgba(0, 0, 0, 0.95), 0 4px 14px rgba(0, 0, 0, 0.85)',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9))',
  };

  // Stylish flowing script typography for couple names (Great Vibes / Allura / Alex Brush)
  const stylishCoupleNameStyle: React.CSSProperties = {
    color: '#FFFFFF',
    opacity: 1,
    WebkitTextFillColor: '#FFFFFF',
    WebkitTextStroke: '0',
    textShadow:
      '0 0 16px rgba(255, 240, 185, 0.95), 0 0 32px rgba(255, 215, 120, 0.7), 0 2px 6px rgba(0, 0, 0, 0.95), 0 4px 16px rgba(0, 0, 0, 0.85)',
    filter:
      'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(255, 225, 140, 0.6))',
    fontFamily: "'Great Vibes', 'Allura', 'Alex Brush', 'Pinyon Script', cursive",
    fontWeight: 400,
    letterSpacing: '0.02em',
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

      {/* FLOATING GOLDEN DUST PARTICLES */}
      <GoldenDustParticles />

      {/* 2. UNIFIED POSTER COMPOSITION (All content strictly ordered, centered, and harmoniously spaced) */}
      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center text-center mt-[max(1.75rem,5svh)] sm:mt-[6.5svh] px-3">
        {/* 1 & 2: WITH THE BLESSINGS OF OUR FAMILIES / எங்கள் குடும்பத்தினரின் நல்லாசியுடன் */}
        <div
          className={`flex flex-col items-center gap-0.5 transition-all duration-700 ease-out delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <span
            className="font-serif uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[clamp(11px,2.6vw,13.5px)] font-bold select-none text-center"
            style={brightWhiteStyle}
          >
            WITH THE BLESSINGS OF OUR FAMILIES
          </span>
          <span
            className="font-tamil-serif text-[clamp(11px,2.6vw,13.5px)] font-bold tracking-[0.02em] select-none text-center"
            style={brightWhiteStyle}
          >
            எங்கள் குடும்பத்தினரின் நல்லாசியுடன்
          </span>

          <FloralDivider className="mt-1 xs:mt-1.5 mb-0.5 xs:mb-1" />
        </div>

        {/* 3 & 4: COUPLE NAMES (Large, flowing stylish calligraphy script) */}
        <div
          className={`w-full max-w-sm sm:max-w-md mx-auto my-0.5 xs:my-1 flex flex-col items-center justify-center transition-all duration-700 ease-out delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h1
            className="text-[clamp(3.1rem,10.5vw,5rem)] leading-[1.08] select-none py-0.5"
            style={stylishCoupleNameStyle}
          >
            Vallarasu
          </h1>

          {/* Ampersand separator: — & — */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 w-32 xs:w-40 sm:w-48 mx-auto my-0.5 select-none pointer-events-none">
            <div className="flex-1 h-[0.75px] bg-gradient-to-r from-transparent via-[#ffe082]/70 to-[#ffe082]" />
            <span
              className="font-serif italic text-base xs:text-lg sm:text-xl text-[#ffe599] font-normal leading-none"
              style={{
                textShadow: '0 0 12px rgba(255, 225, 120, 0.8), 0 2px 4px rgba(0, 0, 0, 0.9)',
              }}
            >
              &amp;
            </span>
            <div className="flex-1 h-[0.75px] bg-gradient-to-l from-transparent via-[#ffe082]/70 to-[#ffe082]" />
          </div>

          <h1
            className="text-[clamp(3.1rem,10.5vw,5rem)] leading-[1.08] select-none py-0.5"
            style={stylishCoupleNameStyle}
          >
            Priyanka
          </h1>

          <FloralDivider className="mt-1 xs:mt-1.5 mb-0.5 xs:mb-1" />
        </div>

        {/* 5 & 6: ENGAGEMENT CEREMONY / திருமண நிச்சயதார்த்த விழா */}
        <div
          className={`flex flex-col items-center gap-0.5 transition-all duration-700 ease-out delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <h2
            className="font-serif uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[clamp(12px,2.9vw,15px)] font-bold select-none text-center"
            style={brightWhiteStyle}
          >
            ENGAGEMENT CEREMONY
          </h2>
          <h2
            className="font-tamil-heading text-[clamp(12px,2.9vw,15px)] font-bold tracking-[0.03em] select-none text-center"
            style={brightWhiteStyle}
          >
            திருமண நிச்சயதார்த்த விழா
          </h2>
        </div>

        {/* 7 & 8: CEREMONY DESCRIPTION (Two hearts, one journey... & Tamil translation) */}
        <div
          className={`max-w-[300px] xs:max-w-[340px] sm:max-w-md mx-auto px-2 mt-2 xs:mt-2.5 text-center transition-all duration-700 ease-out delay-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <p
            className="font-serif italic font-medium text-[clamp(11.5px,2.7vw,13.5px)] leading-[1.4] select-none text-[#FFFFFF]"
            style={brightWhiteStyle}
          >
            &ldquo;Two hearts, one journey,
            <br />
            a lifetime of togetherness begins here...&rdquo;
          </p>

          <p
            className="font-tamil font-medium text-[clamp(11px,2.5vw,13px)] leading-[1.5] select-none text-[#FFFFFF] mt-1"
            style={brightWhiteStyle}
          >
            &ldquo;இரு இதயங்கள், ஒரு பயணம்,
            <br />
            வாழ்நாள் முழுமைக்குமான இணைவு இங்கு தொடங்குகிறது...&rdquo;
          </p>

          {/* Delicate intertwined double hearts */}
          <IntertwinedHearts className="mt-1.5 xs:mt-2" />
        </div>
      </div>

      {/* FIFTH – EXPLORE INDICATOR (Pinned near the bottom over the terrace floor) */}
      <div
        className={`absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-0 right-0 flex flex-col items-center z-10 transition-all duration-700 ease-out delay-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <a
          href="#couple-section"
          className="text-xs text-[#FFFFFF] hover:text-[#FFF2C6] flex flex-col items-center gap-0.5 transition-colors group cursor-pointer"
        >
          <span
            className="tracking-[0.2em] uppercase text-[10px] sm:text-[11px] font-sans font-semibold"
            style={brightWhiteStyle}
          >
            EXPLORE INVITATION
          </span>
          <span
            className="text-[10px] sm:text-[11px] font-tamil font-medium tracking-[0.02em]"
            style={brightWhiteStyle}
          >
            அழைப்பிதழை காண்க
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#ffe082] group-hover:text-white drop-shadow-md mt-0.5" />
        </a>
      </div>
    </section>
  );
};
