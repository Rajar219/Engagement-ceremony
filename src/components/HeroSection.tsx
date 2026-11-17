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
      {/* 1. ORIGINAL BACKGROUND (100% BRIGHTNESS RESTORED — ZERO DARK OVERLAYS, ZERO DIMMING) */}
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
      </div>

      {/* FLOATING GOLDEN DUST PARTICLES */}
      <GoldenDustParticles />

      {/* TOP SPACER (keeps vertical balance with viewport top) */}
      <div className="w-full pt-3 sm:pt-6" />

      {/* 2. MAIN POSTER CONTENT — EXACT SPECIFIED ORDER (ALL WHITE & WARM IVORY TYPOGRAPHY) */}
      <div
        className={`relative z-10 w-full max-w-2xl my-auto flex flex-col items-center transition-all duration-1000 ease-out ${
          mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-[0.98]'
        }`}
        style={{ willChange: 'transform, opacity' }}
      >
        {/* ITEM 1: WITH THE BLESSINGS OF OUR FAMILIES */}
        <p
          className="text-[clamp(11px,2.8vw,13px)] tracking-[0.24em] sm:tracking-[0.32em] uppercase font-serif font-medium text-[#FFFFFF] select-none hero-subtle-stroke"
          style={{
            WebkitTextStroke: '0.35px rgba(0, 0, 0, 0.65)',
            textShadow: '1px 2px 4px rgba(0, 0, 0, 0.55)',
          }}
        >
          {language === 'ta'
            ? 'எங்கள் குடும்பத்தினரின் நல்லாசியுடன்'
            : 'WITH THE BLESSINGS OF OUR FAMILIES'}
        </p>

        {/* ITEMS 2, 3, 4: Vallalarasu & Priyanka (CENTERPIECE EDITORIAL SERIF) */}
        <div className="my-2 sm:my-3 flex flex-col items-center w-full">
          {language === 'ta' ? (
            /* Tamil Couple Names */
            <div className="flex flex-col items-center font-tamil-heading text-center">
              {/* ITEM 2: Vallalarasu (வள்ளலரசு) */}
              <h1
                className="font-tamil-heading text-[clamp(38px,9.5vw,56px)] font-bold tracking-[0.02em] leading-tight text-[#FFFFFF] select-none hero-subtle-stroke"
                style={{
                  WebkitTextStroke: '0.35px rgba(0, 0, 0, 0.65)',
                  textShadow: '1px 2px 4px rgba(0, 0, 0, 0.55)',
                }}
              >
                வள்ளலரசு
              </h1>

              {/* ITEM 3: Ampersand flanked by hairlines: ────── & ────── */}
              <div className="flex items-center justify-center w-full max-w-[200px] sm:max-w-[280px] my-1 sm:my-1.5">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/70 to-white/70" />
                <span
                  className="font-serif italic text-[clamp(28px,6.5vw,36px)] text-[#FFFFFF] px-3 sm:px-4 font-normal leading-none select-none hero-subtle-stroke"
                  style={{
                    WebkitTextStroke: '0.35px rgba(0, 0, 0, 0.65)',
                    textShadow: '1px 2px 4px rgba(0, 0, 0, 0.55)',
                  }}
                >
                  &amp;
                </span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/70 to-white/70" />
              </div>

              {/* ITEM 4: Priyanka (பிரியங்கா) */}
              <h2
                className="font-tamil-heading text-[clamp(38px,9.5vw,56px)] font-bold tracking-[0.02em] leading-tight text-[#FFFFFF] select-none hero-subtle-stroke"
                style={{
                  WebkitTextStroke: '0.35px rgba(0, 0, 0, 0.65)',
                  textShadow: '1px 2px 4px rgba(0, 0, 0, 0.55)',
                }}
              >
                பிரியங்கா
              </h2>
            </div>
          ) : (
            /* English Couple Names */
            <div className="flex flex-col items-center text-center font-serif">
              {/* ITEM 2: Vallalarasu */}
              <h1
                className="font-serif italic font-normal text-[clamp(46px,11.5vw,64px)] text-[#FFFFFF] tracking-[0.015em] leading-[1.06] select-none hero-subtle-stroke"
                style={{
                  WebkitTextStroke: '0.35px rgba(0, 0, 0, 0.65)',
                  textShadow: '1px 2px 4px rgba(0, 0, 0, 0.55)',
                }}
              >
                Vallalarasu
              </h1>

              {/* ITEM 3: Ampersand flanked by hairlines: ────── & ────── */}
              <div className="flex items-center justify-center w-full max-w-[200px] sm:max-w-[280px] my-1 sm:my-1.5">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/70 to-white/70" />
                <span
                  className="font-serif italic text-[clamp(28px,6.5vw,36px)] text-[#FFFFFF] px-3 sm:px-4 font-normal leading-none select-none hero-subtle-stroke"
                  style={{
                    WebkitTextStroke: '0.35px rgba(0, 0, 0, 0.65)',
                    textShadow: '1px 2px 4px rgba(0, 0, 0, 0.55)',
                  }}
                >
                  &amp;
                </span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/70 to-white/70" />
              </div>

              {/* ITEM 4: Priyanka */}
              <h2
                className="font-serif italic font-normal text-[clamp(46px,11.5vw,64px)] text-[#FFFFFF] tracking-[0.015em] leading-[1.06] select-none hero-subtle-stroke"
                style={{
                  WebkitTextStroke: '0.35px rgba(0, 0, 0, 0.65)',
                  textShadow: '1px 2px 4px rgba(0, 0, 0, 0.55)',
                }}
              >
                Priyanka
              </h2>
            </div>
          )}
        </div>

        {/* ITEM 5: ENGAGEMENT CEREMONY */}
        <div className="mt-1 sm:mt-2 flex flex-col items-center">
          <h3
            className="font-serif uppercase tracking-[0.24em] sm:tracking-[0.34em] text-[clamp(13px,3.2vw,16px)] font-semibold text-[#FFFFFF] select-none hero-subtle-stroke"
            style={{
              WebkitTextStroke: '0.35px rgba(0, 0, 0, 0.65)',
              textShadow: '1px 2px 4px rgba(0, 0, 0, 0.55)',
            }}
          >
            {language === 'ta'
              ? 'திருமண நிச்சயதார்த்த வைபவம்'
              : 'ENGAGEMENT CEREMONY'}
          </h3>
        </div>

        {/* ITEM 6: TAMIL INVITATION TEXT — அன்போடு அழைக்கிறோம் */}
        <div className="mt-1 sm:mt-1.5 flex flex-col items-center">
          <p
            className="font-tamil-invitation text-[clamp(14px,3.5vw,17px)] font-medium text-[#FFFFFF] tracking-[0.05em] select-none hero-subtle-stroke"
            style={{
              WebkitTextStroke: '0.35px rgba(0, 0, 0, 0.65)',
              textShadow: '1px 2px 4px rgba(0, 0, 0, 0.55)',
            }}
          >
            அன்போடு அழைக்கிறோம்
          </p>
        </div>

        {/* ITEM 7: ROMANTIC QUOTATION IN ELEGANT WARM IVORY ITALIC SERIF */}
        <div className="max-w-[340px] sm:max-w-md mx-auto px-4 mt-3 sm:mt-4">
          <p
            className="font-serif italic text-[clamp(15px,3.8vw,18.5px)] text-[#FFF8ED] leading-[1.65] tracking-wide select-none hero-subtle-stroke"
            style={{
              WebkitTextStroke: '0.35px rgba(0, 0, 0, 0.65)',
              textShadow: '1px 2px 4px rgba(0, 0, 0, 0.55)',
            }}
          >
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

          {/* ITEM 8: SMALL DECORATIVE HEART ORNAMENT */}
          <HeartOrnament className="mt-2.5 sm:mt-3" />
        </div>
      </div>

      {/* 3. SUBTLE EXPLORE INVITATION SCROLL INDICATOR */}
      <div className="relative z-10 pb-2 sm:pb-3 flex flex-col items-center">
        <a
          href="#couple-section"
          className="text-xs text-[#FFFFFF]/90 hover:text-white flex flex-col items-center gap-1 transition-colors group cursor-pointer"
        >
          <span
            className="tracking-[0.24em] uppercase text-[10px] font-sans font-medium hero-subtle-stroke"
            style={{
              WebkitTextStroke: '0.35px rgba(0, 0, 0, 0.65)',
              textShadow: '1px 2px 4px rgba(0, 0, 0, 0.55)',
            }}
          >
            {language === 'ta' ? 'அழைப்பிதழைப் பார்வையிட' : 'Explore Invitation'}
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-white group-hover:text-[#FFF8ED] drop-shadow-md" />
        </a>
      </div>
    </section>
  );
};
