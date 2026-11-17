'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { GoldenDustParticles } from '@/components/GoldenDustParticles';

interface HeroSectionProps {
  isVisible?: boolean;
}

// 1. Pixel-perfect ornate filigree divider matching reference image: — ✤ —
const OrnamentalDivider: React.FC<{ className?: string }> = ({ className = 'my-1.5 sm:my-2.5' }) => (
  <div className={`flex items-center justify-center w-48 sm:w-60 max-w-[85vw] ${className}`}>
    <svg
      viewBox="0 0 240 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto text-[#dfb76c] drop-shadow-[0_2px_6px_rgba(0,0,0,0.65)]"
    >
      {/* Left Hairline Gradient */}
      <line x1="0" y1="9" x2="80" y2="9" stroke="url(#goldHairlineLeft)" strokeWidth="0.8" />

      {/* Left Flourish Scroll */}
      <path
        d="M80 9 C 85 9, 89 5, 94 5 C 98 5, 101 7.5, 99 10 C 97 12, 93 11, 94 8.5 C 95 6.5 98 6.5 100 8.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="102" cy="9" r="1" fill="currentColor" />
      <circle cx="94" cy="4" r="0.8" fill="currentColor" />

      {/* Center 4-Petal Floral Diamond & Dots */}
      <path
        d="M120 2 C 120 5.5, 122.5 7.5, 126 9 C 122.5 10.5, 120 12.5, 120 16 C 120 12.5, 117.5 10.5, 114 9 C 117.5 7.5, 120 5.5, 120 2 Z"
        fill="currentColor"
      />
      <circle cx="120" cy="9" r="1.3" fill="#fffdf2" />
      <circle cx="115.5" cy="5" r="0.85" fill="currentColor" />
      <circle cx="124.5" cy="5" r="0.85" fill="currentColor" />
      <circle cx="115.5" cy="13" r="0.85" fill="currentColor" />
      <circle cx="124.5" cy="13" r="0.85" fill="currentColor" />

      {/* Right Flourish Scroll */}
      <path
        d="M160 9 C 155 9, 151 5, 146 5 C 142 5, 139 7.5, 141 10 C 143 12, 147 11, 146 8.5 C 145 6.5 142 6.5 140 8.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="138" cy="9" r="1" fill="currentColor" />
      <circle cx="146" cy="4" r="0.8" fill="currentColor" />

      {/* Right Hairline Gradient */}
      <line x1="160" y1="9" x2="240" y2="9" stroke="url(#goldHairlineRight)" strokeWidth="0.8" />

      <defs>
        <linearGradient id="goldHairlineLeft" x1="0" y1="9" x2="80" y2="9" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#dfb76c" stopOpacity="0" />
          <stop offset="100%" stopColor="#dfb76c" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="goldHairlineRight" x1="160" y1="9" x2="240" y2="9" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#dfb76c" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#dfb76c" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// 2. Intertwined double hearts matching reference image: ─── ♡♡ ───
const IntertwinedHearts: React.FC<{ className?: string }> = ({ className = 'mt-2.5 sm:mt-3' }) => (
  <div className={`flex items-center justify-center gap-2.5 w-44 sm:w-56 mx-auto ${className}`}>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#dfb76c]/85" />
    <svg
      className="w-10 h-6 text-[#fbe8b5] drop-shadow-[0_2px_6px_rgba(0,0,0,0.65)]"
      viewBox="0 0 46 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left Heart (tilted right) */}
      <path
        d="M17 21 C 17 21 6.5 14 6.5 7.8 C 6.5 4.2 9.5 2.2 12.8 3.8 C 14.8 4.8 16.2 6.4 17 7.2 C 17.8 6.4 19.2 4.8 21.2 3.8 C 24.5 2.2 27.5 4.2 27.5 7.8 C 27.5 14 17 21 17 21 Z"
        stroke="#fbe5b8"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="rotate(-8 17 12)"
      />
      {/* Right Heart (tilted left, intertwined) */}
      <path
        d="M29 21.5 C 29 21.5 18.5 14.5 18.5 8.3 C 18.5 4.7 21.5 2.7 24.8 4.3 C 26.8 5.3 28.2 6.9 29 7.7 C 29.8 6.9 31.2 5.3 33.2 4.3 C 36.5 2.7 39.5 4.7 39.5 8.3 C 39.5 14.5 29 21.5 29 21.5 Z"
        stroke="#e5be6e"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="rotate(8 29 12)"
      />
    </svg>
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#dfb76c]/85" />
  </div>
);

export const HeroSection: React.FC<HeroSectionProps> = ({ isVisible = true }) => {
  const [mounted, setMounted] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const { language } = useLanguage();

  const videoSrc = '/assets/videos/hero-background.mp4';
  const posterSrc = '/hero-poster.webp';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isVisible && heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {});
    }
  }, [isVisible]);

  // Mobile optimization: IntersectionObserver to pause video when scrolled off-screen
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero-section"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between text-center overflow-hidden px-4 py-6 sm:py-10 select-none"
    >
      {/* 1. BACKGROUND LOCK (STRICTLY PRESERVED PURPLE CURTAINS, FLORAL DECORATIONS, SUNSET SKY & BALCONY) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={heroVideoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          // @ts-ignore - WebKit iOS attribute
          webkit-playsinline="true"
          preload="metadata"
          className="w-full h-full object-cover object-center scale-[1.01]"
        />

        {/* Soft edge vignette to frame the stage nicely without darkening the artwork */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35 pointer-events-none" />
      </div>

      {/* 2. SUBTLE DARK PLUM TRANSPARENT OVERLAY OVER THE CENTRAL CONTENT REGION */}
      {/* This darkens the bright clouds directly behind the typography while leaving the curtains, florals & balcony luminous */}
      <div
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-lg md:max-w-xl pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 95% 72% at 50% 48%, rgba(20, 5, 30, 0.70) 0%, rgba(22, 6, 32, 0.48) 52%, rgba(18, 4, 26, 0.18) 78%, transparent 100%)',
        }}
      />

      {/* FLOATING GOLDEN DUST PARTICLES */}
      <GoldenDustParticles />

      {/* TOP SPACER (keeps vertical balance with sticky navbar space) */}
      <div className="w-full pt-2 sm:pt-4" />

      {/* 3. MAIN POSTER CONTENT — EXACT 9-ITEM VERTICAL HIERARCHY */}
      {/* Occupies central 60–70% of the mobile viewport with tight, elegant vertical rhythm */}
      <div
        className={`relative z-10 w-full max-w-2xl my-auto flex flex-col items-center transition-all duration-1000 ease-out ${
          mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-[0.98]'
        }`}
        style={{ willChange: 'transform, opacity' }}
      >
        {/* 1. FAMILY INTRODUCTION */}
        <div className="flex flex-col items-center">
          <p className="text-[clamp(11px,2.8vw,13px)] tracking-[0.22em] sm:tracking-[0.3em] uppercase font-serif font-medium text-[#faebd0] cinematic-hero-text-shadow">
            {language === 'ta'
              ? 'எங்கள் குடும்பத்தினரின் நல்லாசியுடன்'
              : 'WITH THE BLESSINGS OF OUR FAMILIES'}
          </p>
        </div>

        {/* 2. DECORATIVE SEPARATOR */}
        <OrnamentalDivider className="my-1.5 sm:my-2.5" />

        {/* 3, 4, 5. COUPLE NAMES & AMPERSAND — MOST IMPORTANT CENTERPIECE (~40–45% of visual attention) */}
        <div className="my-0.5 sm:my-1 flex flex-col items-center w-full">
          {language === 'ta' ? (
            /* TAMIL EDITORIAL TYPOGRAPHY USING STYLISH PROJECT TAMIL FONT */
            <div className="flex flex-col items-center font-tamil-stylish text-center">
              {/* 3. Groom Name: Vallalarasu (வள்ளலரசு) */}
              <h1 className="cinematic-hero-gold text-[clamp(36px,9vw,52px)] font-bold tracking-[0.02em] leading-tight">
                வள்ளலரசு
              </h1>

              {/* 4. Ampersand flanked by hairline rules: ────── & ────── */}
              <div className="flex items-center justify-center w-full max-w-[200px] sm:max-w-[280px] my-0.5 sm:my-1">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#dfb76c] to-[#dfb76c]" />
                <span className="font-serif italic text-[clamp(26px,6.5vw,36px)] text-[#fbe5b8] px-3 sm:px-4 font-normal leading-none cinematic-hero-text-shadow">
                  &amp;
                </span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#dfb76c] to-[#dfb76c]" />
              </div>

              {/* 5. Bride Name: Priyanka (பிரியங்கா) */}
              <h2 className="cinematic-hero-gold text-[clamp(36px,9vw,52px)] font-bold tracking-[0.02em] leading-tight">
                பிரியங்கா
              </h2>
            </div>
          ) : (
            /* ENGLISH EDITORIAL TYPOGRAPHY — CORMORANT GARAMOND EDITORIAL SERIF */
            <div className="flex flex-col items-center text-center font-serif">
              {/* 3. Groom Name: Vallalarasu */}
              <h1 className="cinematic-hero-gold text-[clamp(44px,11.5vw,62px)] font-normal italic tracking-[0.015em] leading-[1.05]">
                Vallalarasu
              </h1>

              {/* 4. Ampersand flanked by hairline rules: ────── & ────── */}
              <div className="flex items-center justify-center w-full max-w-[200px] sm:max-w-[280px] my-0.5 sm:my-1">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#dfb76c] to-[#dfb76c]" />
                <span className="font-serif italic text-[clamp(28px,6.5vw,36px)] text-[#fbe5b8] px-3 sm:px-4 font-normal leading-none cinematic-hero-text-shadow">
                  &amp;
                </span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#dfb76c] to-[#dfb76c]" />
              </div>

              {/* 5. Bride Name: Priyanka */}
              <h2 className="cinematic-hero-gold text-[clamp(44px,11.5vw,62px)] font-normal italic tracking-[0.015em] leading-[1.05]">
                Priyanka
              </h2>
            </div>
          )}
        </div>

        {/* 6. ENGAGEMENT CEREMONY */}
        <div className="mt-1.5 sm:mt-2.5 flex flex-col items-center">
          <h3 className="font-serif uppercase tracking-[0.24em] sm:tracking-[0.32em] text-[clamp(13px,3.2vw,16px)] font-semibold text-[#fbe5b8] cinematic-hero-text-shadow">
            {language === 'ta'
              ? 'திருமண நிச்சயதார்த்த வைபவம்'
              : 'ENGAGEMENT CEREMONY'}
          </h3>
        </div>

        {/* 7. DECORATIVE SEPARATOR */}
        <OrnamentalDivider className="my-1.5 sm:my-2.5" />

        {/* 8. ROMANTIC QUOTATION IN DELICATE WARM IVORY ITALIC SERIF */}
        <div className="max-w-[340px] sm:max-w-md mx-auto px-4 mt-0.5 sm:mt-1">
          <p className="font-serif italic text-[clamp(15px,3.8vw,18.5px)] text-[#fffdf9] leading-[1.65] tracking-wide cinematic-hero-quote-shadow">
            {language === 'ta' ? (
              <>
                &ldquo;இரு இதயங்கள், ஒரு பயணம்,
                <br />
                வாழ்நாள் முழுமைக்குமான இணைவு
                <br />
                இங்கே தொடங்குகிறது...&rdquo;
              </>
            ) : (
              <>
                &ldquo;Two hearts, one journey,
                <br />
                a lifetime of togetherness
                <br />
                begins here...&rdquo;
              </>
            )}
          </p>

          {/* 9. SMALL HEART ORNAMENT (INTERTWINED DOUBLE HEARTS) */}
          <IntertwinedHearts className="mt-2.5 sm:mt-3" />
        </div>
      </div>

      {/* 4. SUBTLE EXPLORE INVITATION SCROLL INDICATOR */}
      <div className="relative z-10 pb-1 sm:pb-3 flex flex-col items-center">
        <a
          href="#couple-section"
          className="text-xs text-[#faebd0]/85 hover:text-white flex flex-col items-center gap-1 transition-colors group cursor-pointer"
        >
          <span className="tracking-[0.24em] uppercase text-[10px] font-sans font-medium drop-shadow-md">
            {language === 'ta' ? 'அழைப்பிதழைப் பார்வையிட' : 'Explore Invitation'}
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#dfb76c] group-hover:text-white drop-shadow-md" />
        </a>
      </div>
    </section>
  );
};
