'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { GoldenDustParticles } from '@/components/GoldenDustParticles';

interface HeroSectionProps {
  isVisible?: boolean;
}

// Small decorative double outline hearts motif: ─── ♡♡ ───
const HeartOrnament: React.FC<{ className?: string }> = ({ className = 'mt-3 sm:mt-4' }) => (
  <div className={`flex items-center justify-center gap-2.5 w-40 sm:w-52 mx-auto ${className}`}>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/70" />
    <svg
      className="w-9 h-5 text-white drop-shadow-[1px_2px_4px_rgba(0,0,0,0.65)]"
      viewBox="0 0 46 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left Heart (tilted right) */}
      <path
        d="M17 21 C 17 21 6.5 14 6.5 7.8 C 6.5 4.2 9.5 2.2 12.8 3.8 C 14.8 4.8 16.2 6.4 17 7.2 C 17.8 6.4 19.2 4.8 21.2 3.8 C 24.5 2.2 27.5 4.2 27.5 7.8 C 27.5 14 17 21 17 21 Z"
        stroke="#FFFFFF"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="rotate(-8 17 12)"
      />
      {/* Right Heart (tilted left, intertwined) */}
      <path
        d="M29 21.5 C 29 21.5 18.5 14.5 18.5 8.3 C 18.5 4.7 21.5 2.7 24.8 4.3 C 26.8 5.3 28.2 6.9 29 7.7 C 29.8 6.9 31.2 5.3 33.2 4.3 C 36.5 2.7 39.5 4.7 39.5 8.3 C 39.5 14.5 29 21.5 29 21.5 Z"
        stroke="#FFF8ED"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="rotate(8 29 12)"
      />
    </svg>
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/70" />
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

  return (
    <section
      id="hero-section"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between text-center overflow-hidden px-4 pt-6 pb-4 sm:pt-8 sm:pb-6 select-none"
    >
      {/* 1. ORIGINAL BACKGROUND (100% BRIGHTNESS RESTORED — ZERO DARK OVERLAYS, ZERO DIMMING) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
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

      {/* 2. MAIN POSTER CONTENT — CLEAN, PURE CINEMATIC TYPOGRAPHY WITHOUT GLASSMORPHISM */}
      <div
        className={`relative z-10 w-full max-w-xl mx-auto px-2 transition-opacity duration-700 ease-out flex flex-col items-center text-center ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* ITEM 1: WITH THE BLESSINGS OF OUR FAMILIES (English + Tamil on separate lines, equal size) */}
        <div className="flex flex-col items-center gap-1">
          <p
            className="text-[clamp(11px,2.6vw,13px)] tracking-[0.2em] uppercase font-serif font-semibold text-[#FFFFFF] select-none hero-solid-white"
            style={{
              color: '#FFFFFF',
              opacity: 1,
              WebkitTextFillColor: '#FFFFFF',
              WebkitTextStroke: '0px transparent',
              textShadow: '1px 2px 4px rgba(0, 0, 0, 0.75)',
            }}
          >
            WITH THE BLESSINGS OF OUR FAMILIES
          </p>
          <p
            className="text-[clamp(11px,2.6vw,13px)] tracking-[0.06em] font-tamil-serif font-semibold text-[#FFFFFF] select-none hero-solid-white"
            style={{
              color: '#FFFFFF',
              opacity: 1,
              WebkitTextFillColor: '#FFFFFF',
              WebkitTextStroke: '0px transparent',
              textShadow: '1px 2px 4px rgba(0, 0, 0, 0.75)',
            }}
          >
            எங்கள் குடும்பத்தினரின் நல்லாசியுடன்
          </p>
        </div>

        {/* ITEM 2: NEW SILVER COUPLE NAME LOGO & TAMIL NAMES */}
        <div className="my-2 sm:my-3 flex flex-col items-center w-full">
          <div className="w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[380px] md:max-w-[420px] mx-auto">
            <picture>
              <source srcSet="/assets/images/couple-name-silver.webp" type="image/webp" />
              <img
                src="/assets/images/couple-name-silver.png"
                alt="Vallarasu & Priyanka"
                className="w-full h-auto object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] select-none pointer-events-none"
                loading="eager"
                width={1536}
                height={1024}
              />
            </picture>
          </div>
          <h1
            className="font-tamil-heading text-[clamp(20px,5vw,28px)] font-bold tracking-[0.04em] leading-tight text-[#FFFFFF] select-none hero-solid-white mt-1.5"
            style={{
              color: '#FFFFFF',
              opacity: 1,
              WebkitTextFillColor: '#FFFFFF',
              WebkitTextStroke: '0px transparent',
              textShadow: '1px 2px 4px rgba(0, 0, 0, 0.75)',
            }}
          >
            ஞா. வல்லரசு &amp; க. பிரியங்கா
          </h1>
        </div>

        {/* ITEM 3: ENGAGEMENT & WEDDING CELEBRATION (Strict Rule: English line, then Tamil line) */}
        <div className="mt-1 sm:mt-1.5 flex flex-col items-center gap-1">
          <h2
            className="font-serif uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[clamp(13px,3.2vw,16px)] font-bold text-[#FFFFFF] select-none hero-solid-white"
            style={{
              color: '#FFFFFF',
              opacity: 1,
              WebkitTextFillColor: '#FFFFFF',
              WebkitTextStroke: '0px transparent',
              textShadow: '1px 2px 4px rgba(0, 0, 0, 0.75)',
            }}
          >
            Engagement &amp; Wedding Celebration
          </h2>
          <p
            className="font-tamil-heading text-[clamp(13px,3.2vw,16px)] font-bold tracking-[0.05em] text-[#FFFFFF] select-none hero-solid-white"
            style={{
              color: '#FFFFFF',
              opacity: 1,
              WebkitTextFillColor: '#FFFFFF',
              WebkitTextStroke: '0px transparent',
              textShadow: '1px 2px 4px rgba(0, 0, 0, 0.75)',
            }}
          >
            திருமண நிச்சயதார்த்த விழா
          </p>
        </div>

        {/* ITEM 4: CORDIALLY INVITING YOU (English line, then Tamil line) */}
        <div className="mt-1.5 sm:mt-2 flex flex-col items-center gap-0.5">
          <p
            className="font-serif text-[clamp(12px,2.8vw,14px)] tracking-[0.16em] uppercase font-semibold text-[#FFFFFF] select-none hero-solid-white"
            style={{
              color: '#FFFFFF',
              opacity: 1,
              WebkitTextFillColor: '#FFFFFF',
              WebkitTextStroke: '0px transparent',
              textShadow: '1px 2px 4px rgba(0, 0, 0, 0.75)',
            }}
          >
            Cordially Inviting You
          </p>
          <p
            className="font-tamil-invitation text-[clamp(12px,2.8vw,14px)] font-semibold text-[#FFFFFF] select-none hero-solid-white"
            style={{
              color: '#FFFFFF',
              opacity: 1,
              WebkitTextFillColor: '#FFFFFF',
              WebkitTextStroke: '0px transparent',
              textShadow: '1px 2px 4px rgba(0, 0, 0, 0.75)',
            }}
          >
            அன்போடு அழைக்கிறோம்
          </p>
        </div>

        {/* ITEM 5: ROMANTIC QUOTATION (English line, then Tamil line, matching sizes) */}
        <div className="max-w-[340px] sm:max-w-md mx-auto px-2 mt-2 sm:mt-2.5 flex flex-col items-center gap-1 text-center">
          <p
            className="font-serif italic font-medium text-[clamp(12px,3vw,14px)] text-[#FFFFFF] leading-[1.6] select-none hero-solid-white"
            style={{
              color: '#FFFFFF',
              opacity: 1,
              WebkitTextFillColor: '#FFFFFF',
              WebkitTextStroke: '0px transparent',
              textShadow: '1px 2px 4px rgba(0, 0, 0, 0.75)',
            }}
          >
            &ldquo;Two hearts, one journey, a lifetime of togetherness begins here...&rdquo;
          </p>
          <p
            className="font-tamil-body text-[clamp(12px,3vw,14px)] text-[#FFFFFF] leading-[1.6] select-none hero-solid-white font-medium"
            style={{
              color: '#FFFFFF',
              opacity: 1,
              WebkitTextFillColor: '#FFFFFF',
              WebkitTextStroke: '0px transparent',
              textShadow: '1px 2px 4px rgba(0, 0, 0, 0.75)',
            }}
          >
            &ldquo;இரு இதயங்கள், ஒரு பயணம், வாழ்நாள் முழுமைக்குமான இணைவு இங்கே தொடங்குகிறது...&rdquo;
          </p>

          {/* ITEM 6: SMALL DECORATIVE HEART ORNAMENT */}
          <HeartOrnament className="mt-2" />
        </div>
      </div>

      {/* 3. SUBTLE EXPLORE INVITATION SCROLL INDICATOR */}
      <div className="relative z-10 pb-2 sm:pb-3 flex flex-col items-center">
        <a
          href="#couple-section"
          className="text-xs text-[#FFFFFF] hover:text-white flex flex-col items-center gap-1 transition-colors group cursor-pointer hero-solid-white"
        >
          <span
            className="tracking-[0.18em] uppercase text-[10px] font-sans font-medium"
            style={{
              color: '#FFFFFF',
              opacity: 1,
              WebkitTextFillColor: '#FFFFFF',
              WebkitTextStroke: '0px transparent',
              textShadow: '1px 2px 4px rgba(0, 0, 0, 0.75)',
            }}
          >
            Explore Invitation
          </span>
          <span
            className="text-[10px] font-tamil font-medium"
            style={{
              color: '#FFFFFF',
              opacity: 1,
              WebkitTextFillColor: '#FFFFFF',
              WebkitTextStroke: '0px transparent',
              textShadow: '1px 2px 4px rgba(0, 0, 0, 0.75)',
            }}
          >
            அழைப்பிதழைப் பார்வையிட
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-white group-hover:text-[#FFFFFF] drop-shadow-md" />
        </a>
      </div>
    </section>
  );
};
