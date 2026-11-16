'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Heart, Sparkles, ChevronDown, Bell } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export const HeroSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
  });

  const videoSrc = invitationConfig.media.videos.heroBackground?.src || '/assets/videos/hero-background.mp4';
  const posterSrc = invitationConfig.media.videos.heroBackground?.poster || '/assets/images/hero-poster.jpg';

  useEffect(() => {
    const targetDate = new Date(invitationConfig.engagement.isoDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isComplete: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col items-center justify-between text-center overflow-hidden px-4 py-8">
      {/* VIDEO HERO BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Luxury Vignette & Darkening Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#120508]/85 via-[#1a060d]/75 to-[#0e0306]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#0e0306_90%)]" />
      </div>

      {/* TOP CONTENT: Invocations & Badges */}
      <div className="relative z-10 w-full max-w-4xl pt-6 flex flex-col items-center">
        {/* Auspicious Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-gold-500/30 backdrop-blur-md mb-4 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold-300 font-serif">
            ॥ श्री गणेशाय नमः ॥
          </span>
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
        </div>

        <p className="text-xs sm:text-sm text-gold-200/80 tracking-widest uppercase font-sans max-w-md mx-auto">
          With the blessings of our elders and Almighty
        </p>
      </div>

      {/* CENTER CONTENT: Couple Presentation */}
      <div className="relative z-10 w-full max-w-3xl my-auto py-6 flex flex-col items-center">
        {/* Monogram Seal */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-gold-400/50 bg-burgundy-950/70 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)] mb-4 animate-subtle-float">
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-gold-300">
            {invitationConfig.couple.monogram}
          </span>
        </div>

        <p className="text-sm sm:text-base font-serif italic text-gold-300/90 mb-3 tracking-wider">
          Together with their families, cordially invite you to celebrate the
        </p>

        {/* Ceremony Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-wider uppercase mb-6 gold-gradient-text drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          {invitationConfig.engagement.title}
        </h1>

        {/* Couple Cards Grid */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 my-3">
          {/* GROOM */}
          <div className="w-full sm:w-72 p-5 rounded-2xl bg-black/40 border border-gold-500/30 backdrop-blur-md shadow-xl flex flex-col items-center text-center">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400/80 font-sans mb-1 font-semibold">
              The Groom
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              {invitationConfig.couple.groom.fullName}
            </h2>
            <div className="w-12 h-0.5 bg-gold-500/40 my-2" />
            <p className="text-xs text-gold-200/80 leading-relaxed font-sans">
              {invitationConfig.couple.groom.parents}
            </p>
          </div>

          {/* Heart / Ampersand Emblem */}
          <div className="flex flex-col items-center justify-center my-1 md:my-0">
            <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-400/50 flex items-center justify-center shadow-lg text-gold-300">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400/30" />
            </div>
          </div>

          {/* BRIDE */}
          <div className="w-full sm:w-72 p-5 rounded-2xl bg-black/40 border border-gold-500/30 backdrop-blur-md shadow-xl flex flex-col items-center text-center">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400/80 font-sans mb-1 font-semibold">
              The Bride
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              {invitationConfig.couple.bride.fullName}
            </h2>
            <div className="w-12 h-0.5 bg-gold-500/40 my-2" />
            <p className="text-xs text-gold-200/80 leading-relaxed font-sans">
              {invitationConfig.couple.bride.parents}
            </p>
          </div>
        </div>

        {/* Date, Time & Venue Highlight Pill */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gold-100 font-sans">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-gold-500/30 backdrop-blur-sm">
            <Calendar className="w-4 h-4 text-gold-400" />
            <span className="font-medium">{invitationConfig.engagement.date}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-gold-500/30 backdrop-blur-sm">
            <Clock className="w-4 h-4 text-gold-400" />
            <span className="font-medium">{invitationConfig.engagement.time}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-gold-500/30 backdrop-blur-sm">
            <MapPin className="w-4 h-4 text-gold-400" />
            <span className="font-medium">{invitationConfig.engagement.venue.name}, Chennai</span>
          </div>
        </div>

        {/* LIVE COUNTDOWN TIMER */}
        <div className="mt-8 w-full max-w-lg">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold-300/75 mb-3 font-medium">
            Counting down to our forever
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-xl bg-black/60 border border-gold-500/30 backdrop-blur-md shadow-lg flex flex-col items-center">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-gold-300">
                {timeLeft.days}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-gold-400/80 mt-1">
                Days
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-black/60 border border-gold-500/30 backdrop-blur-md shadow-lg flex flex-col items-center">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-gold-300">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-gold-400/80 mt-1">
                Hours
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-black/60 border border-gold-500/30 backdrop-blur-md shadow-lg flex flex-col items-center">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-gold-300">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-gold-400/80 mt-1">
                Mins
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-black/60 border border-gold-500/30 backdrop-blur-md shadow-lg flex flex-col items-center">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-gold-300">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-gold-400/80 mt-1">
                Secs
              </span>
            </div>
          </div>
        </div>

        {/* PRIMARY CALL TO ACTIONS */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#rsvp-section"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 text-burgundy-950 font-bold tracking-wider uppercase text-sm shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.8)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <span>RSVP Joyfully</span>
            <Sparkles className="w-4 h-4" />
          </a>

          <a
            href="#event-details"
            className="px-6 py-3.5 rounded-xl bg-black/50 border border-gold-400/50 hover:bg-gold-500/10 text-gold-200 font-semibold tracking-wider uppercase text-sm backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
          >
            <span>Ceremony Schedule</span>
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* BOTTOM SCROLL INDICATOR */}
      <div className="relative z-10 pt-4 flex flex-col items-center">
        <a
          href="#event-details"
          className="text-xs text-gold-300/70 hover:text-gold-200 flex flex-col items-center gap-1 transition-colors group"
        >
          <span className="tracking-widest uppercase text-[10px]">Scroll to Discover</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-gold-400 group-hover:text-gold-200" />
        </a>
      </div>
    </section>
  );
};
