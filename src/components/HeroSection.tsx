'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { GoldenDustParticles } from '@/components/GoldenDustParticles';

interface HeroSectionProps {
  isVisible?: boolean;
}

// Minimal decorative double outline hearts motif: ─── ♡♡ ───
const HeartOrnament: React.FC<{ className?: string }> = ({ className = 'my-2 sm:my-2.5' }) => (
  <div className={`flex items-center justify-center gap-2.5 w-36 sm:w-44 mx-auto ${className}`}>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/60" />
    <svg
      className="w-8 h-4 text-white drop-shadow-[1px_2px_4px_rgba(0,0,0,0.65)]"
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
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/60" />
  </div>
);

export const HeroSection: React.FC<HeroSectionProps> = ({ isVisible = true }) => {
  const [mounted, setMounted] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = '/assets/videos/hero-background.mp4';
  const posterSrc = '/hero-poster.webp';

  useEffect(() => {
    // Slight tick to trigger staggered CSS transitions
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

  const subtleTextStyle: React.CSSProperties = {
    color: '#FFFFFF',
    opacity: 1,
    WebkitTextFillColor: '#FFFFFF',
    WebkitTextStroke: '0.35px rgba(0, 0, 0, 0.65)',
    textShadow: '1px 2px 4px rgba(0, 0, 0, 0.75)',
  };

  return (
    <section
      id="hero-section"
      className="relative h-[100svh] min-h-[100svh] w-full flex flex-col justify-between items-center text-center overflow-hidden px-4 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] select-none"
    >
      {/* 1. ORIGINAL BACKGROUND (Cinematic purple curtains, palace, chandeliers & clouds video) */}
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

      {/* 2. TOP CONTENT: Blessings from our families (Element 1) */}
      <div
        className={`relative z-10 w-full max-w-xl mx-auto flex flex-col items-center gap-0.5 sm:gap-1 transition-all duration-700 ease-out delay-100 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        <p
          className="text-[clamp(11px,2.6vw,13px)] tracking-[0.2em] uppercase font-serif font-semibold text-[#FFFFFF] select-none"
          style={subtleTextStyle}
        >
          WITH THE BLESSINGS OF OUR FAMILIES
        </p>
        <p
          className="text-[clamp(11px,2.6vw,13px)] tracking-[0.04em] font-tamil-serif font-semibold text-[#FFFFFF] select-none"
          style={subtleTextStyle}
        >
          எங்கள் குடும்பத்தினரின் நல்லாசியுடன்
        </p>
      </div>

      {/* 3. CENTERPIECE CONTENT: Silver Artwork (Element 2), Ceremony (Element 3), Subtitle (Element 4), Quote (Element 5), Heart (Element 6) */}
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center justify-center my-auto px-2">
        {/* ELEMENT 2: Silver Vallalarasu & Priyanka artwork (Strongest visual focal point) */}
        <div
          className={`w-full max-w-[260px] xs:max-w-[300px] sm:max-w-[360px] md:max-w-[400px] mx-auto my-2 xs:my-3 sm:my-4 transition-all duration-700 ease-out delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <picture>
            <source srcSet="/assets/images/couple-name-silver.webp" type="image/webp" />
            <img
              src="/assets/images/couple-name-silver.png"
              alt="Vallalarasu & Priyanka"
              className="w-full h-auto object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] select-none pointer-events-none"
              loading="eager"
              width={1536}
              height={1024}
            />
          </picture>
        </div>

        {/* ELEMENT 3 & 4: ENGAGEMENT CEREMONY & Tamil Subtitle */}
        <div
          className={`flex flex-col items-center gap-0.5 sm:gap-1 mt-1 xs:mt-1.5 transition-all duration-700 ease-out delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <h2
            className="font-serif uppercase tracking-[0.2em] sm:tracking-[0.26em] text-[clamp(13px,3.2vw,16px)] font-bold text-[#FFFFFF] select-none"
            style={subtleTextStyle}
          >
            ENGAGEMENT CEREMONY
          </h2>
          <p
            className="font-tamil-heading text-[clamp(13px,3.2vw,16px)] font-bold tracking-[0.04em] text-[#FFFFFF] select-none"
            style={subtleTextStyle}
          >
            திருமண நிச்சயதார்த்த வைபவம்
          </p>
        </div>

        {/* ELEMENT 5: Short romantic quotation */}
        <div
          className={`max-w-[330px] sm:max-w-md mx-auto px-2 mt-2 xs:mt-3 flex flex-col items-center gap-1 text-center transition-all duration-700 ease-out delay-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <p
            className="font-serif italic font-medium text-[clamp(12px,2.9vw,14px)] text-[#FFFFFF] leading-[1.55] select-none"
            style={subtleTextStyle}
          >
            &ldquo;Two hearts, one journey, a lifetime of togetherness begins here...&rdquo;
          </p>
          <p
            className="font-tamil-body text-[clamp(12px,2.9vw,14px)] text-[#FFFFFF] leading-[1.55] select-none font-medium"
            style={subtleTextStyle}
          >
            &ldquo;இரு இதயங்கள், ஒரு பயணம், வாழ்நாள் முழுமைக்குமான இணைவு இங்கே தொடங்குகிறது...&rdquo;
          </p>

          {/* ELEMENT 6: Minimal decorative heart ornament */}
          <HeartOrnament className="mt-2 sm:mt-2.5" />
        </div>
      </div>

      {/* 4. ELEMENT 7: EXPLORE INVITATION indicator */}
      <div
        className={`relative z-10 flex flex-col items-center transition-all duration-700 ease-out delay-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <a
          href="#couple-section"
          className="text-xs text-[#FFFFFF] hover:text-white flex flex-col items-center gap-0.5 transition-colors group cursor-pointer"
        >
          <span
            className="tracking-[0.2em] uppercase text-[10px] sm:text-[11px] font-sans font-semibold"
            style={subtleTextStyle}
          >
            EXPLORE INVITATION
          </span>
          <span
            className="text-[10px] sm:text-[11px] font-tamil font-medium"
            style={subtleTextStyle}
          >
            அழைப்பிதழைப் பார்வையிட
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-white group-hover:text-[#FFFFFF] drop-shadow-md mt-0.5" />
        </a>
      </div>
    </section>
  );
};
