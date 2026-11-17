'use client';

import React from 'react';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { CornerOrnaments } from '@/components/CornerOrnaments';

export const MainCeremonyCard: React.FC = () => {
  const { t, language } = useLanguage();

  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'RSM Banquet Hall 35/37 Dr Besant Rd Triplicane Chennai 600005'
  )}`;

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Engagement Ceremony: G. Vallalarasu & K. Priyanka`);
    const details = encodeURIComponent(
      `Cordially inviting you to the auspicious Engagement Ceremony of G. Vallalarasu & K. Priyanka at RSM Banquet Hall, Triplicane, Chennai.`
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
      {/* ELEVATED LUXURY ESPRESSO & GILDED GOLD CARD */}
      <div className="luxury-dark-card p-6 sm:p-10 shadow-2xl overflow-hidden backdrop-blur-md">
        {/* Delicate Gold Corner Floral Ornaments */}
        <CornerOrnaments />

        {/* Card Title & Ornamental Divider */}
        <div className="relative z-10 mb-8">
          <span className={`text-[11px] text-[#c5a059] font-semibold block mb-1.5 ${language === 'ta' ? 'font-tamil-serif' : 'uppercase tracking-[0.25em] font-serif'}`}>
            Auspicious Occasion • சுபமுகூர்த்த வைபவம்
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold gold-foil-text tracking-wide">
            {t.ceremonyCardTitle}
          </h2>

          <div className="ornament-divider text-[#c5a059]/50 font-serif text-sm my-4">
            ❖
          </div>
        </div>

        {/* 3 STRUCTURED INFO PILLS */}
        <div className="relative z-10 space-y-3.5 mb-8">
          {/* Pill 1: Date */}
          <div className="p-4 rounded-2xl bg-[#2a221c]/80 border border-[#c5a059]/30 flex items-center gap-4 text-left shadow-md hover:border-[#c5a059]/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#c5a059]/15 border border-[#c5a059]/35 flex items-center justify-center shrink-0 text-[#c5a059]">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-[#c5a059]/90 uppercase tracking-widest font-tamil-sans font-medium block">
                {t.datePillLabel}
              </span>
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#faf8f4] mt-0.5">
                {t.datePillValue}
              </h4>
            </div>
          </div>

          {/* Pill 2: Time */}
          <div className="p-4 rounded-2xl bg-[#2a221c]/80 border border-[#c5a059]/30 flex items-center gap-4 text-left shadow-md hover:border-[#c5a059]/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#c5a059]/15 border border-[#c5a059]/35 flex items-center justify-center shrink-0 text-[#c5a059]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-[#c5a059]/90 uppercase tracking-widest font-tamil-sans font-medium block">
                {t.timePillLabel}
              </span>
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#faf8f4] mt-0.5">
                {t.timePillValue}
              </h4>
            </div>
          </div>

          {/* Pill 3: Venue */}
          <div className="p-4 rounded-2xl bg-[#2a221c]/80 border border-[#c5a059]/30 flex items-center gap-4 text-left shadow-md hover:border-[#c5a059]/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#c5a059]/15 border border-[#c5a059]/35 flex items-center justify-center shrink-0 text-[#c5a059]">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-[#c5a059]/90 uppercase tracking-widest font-tamil-sans font-medium block">
                {t.venuePillLabel}
              </span>
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#faf8f4] mt-0.5">
                {t.venuePillValue}
              </h4>
              <p className="text-[11px] text-[#d4c3b3] font-sans mt-0.5">
                35/37, Dr Besant Road, Near Hotel Viveka, Triplicane, Chennai – 600005
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
            className="shimmer-sweep w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#b08b41] via-[#c5a059] to-[#99732f] hover:from-[#c5a059] hover:to-[#b08b41] text-[#1c1613] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(197,160,89,0.35)] border border-[#f4e8c8]/40 flex items-center justify-center gap-2.5 active:scale-[0.99] transition-all font-tamil-sans"
          >
            <Navigation className="w-4 h-4 shrink-0 text-[#1c1613]" />
            <span>{t.viewMapBtn}</span>
          </a>

          {/* Secondary Action: Add to Google Calendar */}
          <button
            type="button"
            onClick={handleAddToCalendar}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#2a221c] hover:bg-[#352b24] text-[#faf8f4] font-bold text-xs sm:text-sm tracking-wider uppercase border border-[#c5a059]/40 shadow-md flex items-center justify-center gap-2.5 active:scale-[0.99] transition-all font-tamil-sans cursor-pointer"
          >
            <Calendar className="w-4 h-4 shrink-0 text-[#c5a059]" />
            <span>{t.addCalendarBtn}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
