'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, ChevronDown, Sparkles } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

interface HeroSectionProps {
  isVisible?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isVisible = true }) => {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = invitationConfig.media.videos.heroBackground?.src || '/assets/videos/hero-background.mp4';
  const posterSrc = invitationConfig.media.videos.heroBackground?.poster || '/assets/images/hero-poster.jpg';

  useEffect(() => {
    setMounted(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col items-center justify-between text-center overflow-hidden px-4 py-8 select-none">
      {/* 1. ROYAL LAVENDER CURTAIN VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#180a2b]">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center scale-[1.02] filter brightness-95"
        />

        {/* Soft, non-intrusive vignette that preserves the central open entrance and heavenly clouds */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#180a2b]/70 via-transparent to-[#12051e]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_35%,_rgba(18,5,30,0.6)_95%)] pointer-events-none" />
      </div>

      {/* 2. TOP HEADER (Delicate Auspicious Greeting) */}
      <div
        className={`relative z-10 w-full max-w-2xl pt-6 sm:pt-8 flex flex-col items-center transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#200c38]/60 border border-champagne-400/30 backdrop-blur-md shadow-lg">
          <span className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-champagne-200 font-serif">
            ॥ श्री गणेशाय नमः ॥
          </span>
        </div>
        <p className="text-[11px] sm:text-xs tracking-[0.25em] text-champagne-200/80 uppercase font-sans mt-2">
          With Divine Blessings of our Elders &amp; Family
        </p>
      </div>

      {/* 3. CENTER CONTENT: COUPLE NAME OVERLAY IN THE OPEN ENTRANCE */}
      <div
        className={`relative z-10 w-full max-w-4xl my-auto py-4 flex flex-col items-center transition-all duration-1000 delay-300 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Monogram Seal */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-champagne-400/50 bg-[#261042]/70 backdrop-blur-md flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.35)] mb-4">
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-champagne-200 drop-shadow">
            {invitationConfig.couple.monogram}
          </span>
        </div>

        <p className="text-xs sm:text-sm font-serif italic text-champagne-200/90 tracking-widest mb-3">
          Together with their families, cordially invite you to celebrate the
        </p>

        {/* Subtitle */}
        <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-champagne-300 font-sans font-semibold mb-2">
          Engagement &amp; Wedding Ceremonies
        </span>

        {/* COUPLE NAMES OVERLAY */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-wide text-white drop-shadow-[0_4px_16px_rgba(15,4,26,0.9)] my-2">
          <span className="champagne-gradient-text block sm:inline">
            {invitationConfig.couple.groom.fullName}
          </span>
          <span className="font-script text-champagne-300 text-3xl sm:text-5xl mx-2 sm:mx-4 font-normal">
            &amp;
          </span>
          <span className="champagne-gradient-text block sm:inline">
            {invitationConfig.couple.bride.fullName}
          </span>
        </h1>

        {/* Parents Information */}
        <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 my-4 text-center px-4">
          <div className="p-2.5 rounded-xl bg-[#1e0a35]/50 border border-champagne-400/20 backdrop-blur-sm">
            <span className="text-[10px] tracking-widest uppercase text-champagne-400/90 font-semibold block">
              Groom
            </span>
            <p className="text-xs text-ivory-100/90 font-sans mt-0.5">
              {invitationConfig.couple.groom.parents}
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-[#1e0a35]/50 border border-champagne-400/20 backdrop-blur-sm">
            <span className="text-[10px] tracking-widest uppercase text-champagne-400/90 font-semibold block">
              Bride
            </span>
            <p className="text-xs text-ivory-100/90 font-sans mt-0.5">
              {invitationConfig.couple.bride.parents}
            </p>
          </div>
        </div>

        {/* Primary Event Date & Venue Highlight */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs text-ivory-100 font-sans">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e0a35]/65 border border-champagne-400/30 backdrop-blur-sm shadow-md">
            <Calendar className="w-3.5 h-3.5 text-champagne-400" />
            <span className="font-medium">Engagement: {invitationConfig.engagement.date}</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e0a35]/65 border border-champagne-400/30 backdrop-blur-sm shadow-md">
            <Clock className="w-3.5 h-3.5 text-champagne-400" />
            <span className="font-medium">{invitationConfig.engagement.time}</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e0a35]/65 border border-champagne-400/30 backdrop-blur-sm shadow-md">
            <MapPin className="w-3.5 h-3.5 text-champagne-400" />
            <span className="font-medium">{invitationConfig.engagement.venue.name}, Chennai</span>
          </div>
        </div>

        {/* Quick Action CTAs */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#rsvp-section"
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-champagne-500 via-champagne-400 to-champagne-600 text-[#18072d] font-bold tracking-wider uppercase text-xs sm:text-sm shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>RSVP for Celebrations</span>
          </a>

          <a
            href="#events-section"
            className="px-6 py-3 rounded-xl bg-[#1e0a35]/60 border border-champagne-400/40 hover:bg-champagne-500/15 text-champagne-200 font-medium tracking-wider uppercase text-xs sm:text-sm backdrop-blur-md transition-all duration-300 flex items-center gap-2"
          >
            <span>View Events &amp; Details</span>
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 4. BOTTOM SCROLL INDICATOR */}
      <div className="relative z-10 pb-2 flex flex-col items-center">
        <a
          href="#events-section"
          className="text-xs text-champagne-300/80 hover:text-champagne-100 flex flex-col items-center gap-1 transition-colors group"
        >
          <span className="tracking-[0.25em] uppercase text-[10px] font-sans font-medium">
            Explore Invitation
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-champagne-400 group-hover:text-champagne-200" />
        </a>
      </div>
    </section>
  );
};
