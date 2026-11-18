'use client';

import React from 'react';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import { CornerOrnaments } from '@/components/CornerOrnaments';

export const MainCeremonyCard: React.FC = () => {
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'RSM Banquet Hall 35/37 Dr Besant Rd Triplicane Chennai 600005'
  )}`;

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Engagement Ceremony: G. Vallarasu & K. Priyanka`);
    const details = encodeURIComponent(
      `Cordially inviting you to the auspicious Engagement Ceremony of G. Vallarasu & K. Priyanka at RSM Banquet Hall, Triplicane, Chennai.`
    );
    const location = encodeURIComponent('RSM Banquet Hall, 35/37, Dr Besant Road, Near Hotel Viveka, Triplicane, Chennai – 600005');
    const dates = '20261213T123000Z/20261213T153000Z'; // 6:00 PM - 9:00 PM IST in UTC
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`,
      '_blank'
    );
  };

  return (
    <section id="ceremony-section" className="relative w-full py-12 px-4 max-w-4xl mx-auto text-center">
      {/* ELEVATED LUXURY ESPRESSO & GILDED GOLD CARD (Zero Glassmorphism) */}
      <div className="luxury-dark-card p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Delicate Gold Corner Floral Ornaments */}
        <CornerOrnaments />

        {/* Card Title & Ornamental Divider (Strict Rule: English line, then Tamil line, matching size) */}
        <div className="relative z-10 mb-8">
          <span className="text-xs sm:text-sm text-[#c5a059] font-semibold uppercase tracking-[0.25em] font-serif block mb-0.5">
            Auspicious Occasion
          </span>
          <span className="text-xs sm:text-sm text-[#c5a059] font-semibold font-tamil block mb-3">
            சுபமுகூர்த்த வைபவம்
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold gold-foil-text tracking-wide mb-1">
            The Engagement Ceremony
          </h2>
          <h2 className="font-tamil text-lg sm:text-xl md:text-2xl font-bold gold-foil-text tracking-wide">
            திருமண நிச்சயதார்த்த விழா
          </h2>

          <div className="ornament-divider text-[#c5a059]/50 font-serif text-sm my-4">
            ❖
          </div>
        </div>

        {/* 3 STRUCTURED INFO PILLS (Strict Rule: English line, then Tamil line) */}
        <div className="relative z-10 space-y-4 mb-8">
          {/* Pill 1: Date */}
          <div className="p-4 rounded-2xl bg-[#2a221c] border border-[#c5a059]/30 flex items-center gap-4 text-left shadow-md hover:border-[#c5a059]/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#c5a059]/15 border border-[#c5a059]/35 flex items-center justify-center shrink-0 text-[#c5a059]">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs uppercase tracking-widest text-[#c5a059]/90 font-sans font-semibold block">
                Date &amp; Day
              </span>
              <span className="text-[11px] text-[#c5a059]/90 font-tamil font-medium block mb-1">
                மங்கல நன்னாள்
              </span>

              <h4 className="font-serif text-base sm:text-lg font-bold text-[#faf8f4]">
                Sunday, 13th December 2026
              </h4>
              <h4 className="font-tamil text-xs sm:text-[13.5px] font-medium text-[#e2d5c3] mt-0.5 leading-snug">
                ஞாயிற்றுக்கிழமை, 13 டிசம்பர் 2026
              </h4>
            </div>
          </div>

          {/* Pill 2: Time */}
          <div className="p-4 rounded-2xl bg-[#2a221c] border border-[#c5a059]/30 flex items-center gap-4 text-left shadow-md hover:border-[#c5a059]/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#c5a059]/15 border border-[#c5a059]/35 flex items-center justify-center shrink-0 text-[#c5a059]">
              <Clock className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs uppercase tracking-widest text-[#c5a059]/90 font-sans font-semibold block">
                Auspicious Time
              </span>
              <span className="text-[11px] text-[#c5a059]/90 font-tamil font-medium block mb-1">
                சுபமுகூர்த்த நேரம்
              </span>

              <h4 className="font-serif text-base sm:text-lg font-bold text-[#faf8f4]">
                Evening 6:00 PM to 9:00 PM IST
              </h4>
              <h4 className="font-tamil text-xs sm:text-[13.5px] font-medium text-[#e2d5c3] mt-0.5 leading-snug">
                மாலை 6:00 மணி முதல் 9:00 மணி வரை
              </h4>
            </div>
          </div>

          {/* Pill 3: Venue & Full Address */}
          <div className="p-4 rounded-2xl bg-[#2a221c] border border-[#c5a059]/30 flex items-center gap-4 text-left shadow-md hover:border-[#c5a059]/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#c5a059]/15 border border-[#c5a059]/35 flex items-center justify-center shrink-0 text-[#c5a059]">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs uppercase tracking-widest text-[#c5a059]/90 font-sans font-semibold block">
                Ceremony Venue
              </span>
              <span className="text-[11px] text-[#c5a059]/90 font-tamil font-medium block mb-1">
                விழா நடைபெறும் இடம்
              </span>

              <h4 className="font-serif text-base sm:text-lg font-bold text-[#faf8f4]">
                RSM Banquet Hall
              </h4>
              <h4 className="font-tamil text-xs sm:text-[13.5px] font-medium text-[#e2d5c3] mt-0.5 mb-1.5 leading-snug">
                ஆர்.எஸ்.எம் பேங்க்வெட் ஹால்
              </h4>

              <p className="text-xs sm:text-[13px] text-[#d4c3b3] font-sans">
                35/37, Dr Besant Road, Near Hotel Viveka, Triplicane, Chennai – 600005
              </p>
              <p className="text-[11px] sm:text-xs text-[#c0b09f] font-tamil leading-relaxed">
                35/37, டாக்டர் பெசன்ட் சாலை, விவேகா ஹோட்டல் அருகில், திருவல்லிக்கேணி, சென்னை - 600005
              </p>
            </div>
          </div>
        </div>

        {/* 2 FULL-WIDTH STACKED ACTION BUTTONS */}
        <div className="relative z-10 space-y-3">
          {/* Primary Action: Google Maps Navigation */}
          <a
            href={mapSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer-sweep w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#b08b41] via-[#c5a059] to-[#99732f] hover:from-[#c5a059] hover:to-[#b08b41] text-[#1c1613] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(197,160,89,0.35)] border border-[#f4e8c8]/40 flex flex-col items-center justify-center gap-0.5 active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 shrink-0 text-[#1c1613]" />
              <span className="font-sans">Get Venue Directions</span>
            </div>
            <span className="font-tamil-sans text-xs">மண்டப வழித்தடம் காண</span>
          </a>

          {/* Secondary Action: Add to Google Calendar */}
          <button
            type="button"
            onClick={handleAddToCalendar}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#2a221c] hover:bg-[#352b24] text-[#faf8f4] font-bold text-xs sm:text-sm tracking-wider uppercase border border-[#c5a059]/40 shadow-md flex flex-col items-center justify-center gap-0.5 active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 shrink-0 text-[#c5a059]" />
              <span className="font-sans">Add to Google Calendar</span>
            </div>
            <span className="font-tamil-sans text-xs text-[#c5a059]">நாட்காட்டியில் சேர்க்க</span>
          </button>
        </div>
      </div>
    </section>
  );
};
