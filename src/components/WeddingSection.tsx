'use client';

import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, Heart } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

export const WeddingSection: React.FC = () => {
  const { wedding } = invitationConfig;

  return (
    <section className="relative w-full py-16 px-4 max-w-4xl mx-auto text-center">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-champagne-400 font-semibold mb-2">
          Sacred Union
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold champagne-gradient-text tracking-wide">
          {wedding.title}
        </h2>
        <p className="text-xs sm:text-sm font-serif italic text-champagne-200/80 mt-2">
          {wedding.subtitle}
        </p>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-champagne-400 to-transparent mt-4 mb-4" />
      </div>

      {/* Wedding Announcement Card */}
      <div className="w-full p-8 rounded-3xl bg-gradient-to-b from-[#240e3d]/85 via-[#1a082c]/90 to-[#12051e]/95 border border-champagne-400/40 shadow-2xl backdrop-blur-md">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-champagne-500/20 border border-champagne-400/50 flex items-center justify-center text-champagne-300 mb-4 shadow-lg">
            <Heart className="w-7 h-7 text-rose-400 fill-rose-400/30" />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
            The Auspicious Muhurtham
          </h3>

          <p className="text-xs sm:text-sm text-ivory-100/80 max-w-lg mb-6 font-sans leading-relaxed">
            With the sacred blessings of elders and loved ones, Vallalarasu and Priyanka will take their holy vows in the traditional Hindu matrimony rituals.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md my-4">
            <div className="p-4 rounded-2xl bg-[#140624]/70 border border-champagne-400/25">
              <span className="text-[10px] uppercase tracking-widest text-champagne-400/80 font-semibold block mb-1">
                Wedding Muhurtham
              </span>
              <p className="font-serif text-base font-bold text-champagne-200">
                Auspicious Date To Be Announced
              </p>
              <span className="text-[11px] text-ivory-100/60 font-sans">
                Sacred Muhurtham Timings
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#140624]/70 border border-champagne-400/25">
              <span className="text-[10px] uppercase tracking-widest text-champagne-400/80 font-semibold block mb-1">
                Location
              </span>
              <p className="font-serif text-base font-bold text-champagne-200">
                Chennai, Tamil Nadu
              </p>
              <span className="text-[11px] text-ivory-100/60 font-sans">
                Main Mandap Ceremony
              </span>
            </div>
          </div>

          <p className="text-xs text-champagne-300/80 italic mt-3 mb-6">
            Dress Code: {wedding.dressCode || 'Royal Traditional Attire'}
          </p>

          <a
            href="#rsvp-section"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-champagne-500 to-champagne-600 text-[#18072d] font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>RSVP for Wedding Celebrations</span>
          </a>
        </div>
      </div>
    </section>
  );
};
