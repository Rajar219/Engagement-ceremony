'use client';

import React from 'react';
import { Calendar, MapPin, Sparkles, Heart } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';
import { useLanguage } from '@/context/LanguageContext';
import { CornerOrnaments } from '@/components/CornerOrnaments';

export const WeddingSection: React.FC = () => {
  const { wedding } = invitationConfig;
  const { t, language } = useLanguage();

  return (
    <section id="wedding-section" className="relative w-full py-12 px-4 max-w-4xl mx-auto text-center">
      {/* 07. WEDDING / MUHURTHAM INVITATION CARD */}
      <div className="luxury-card p-6 sm:p-10 shadow-xl text-center">
        <CornerOrnaments color="text-[#c5a059]/40" />

        <div className="relative z-10 mb-6">
          <span className={`text-[11px] text-[#8e6c2e] font-semibold block mb-1.5 ${language === 'ta' ? 'font-tamil-serif' : 'uppercase tracking-[0.25em] font-serif'}`}>
            Holy Matrimony • திருமண நன்னாள்
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold gold-foil-text tracking-wide">
            {language === 'ta' ? 'புனித திருமண சுபமுகூர்த்தம்' : 'The Sacred Wedding Muhurtham'}
          </h2>
          <div className="ornament-divider text-[#c5a059]/50 font-serif text-sm w-44 mx-auto my-3">
            ❖
          </div>
          <p className="text-xs sm:text-sm text-[#5c534b] font-tamil max-w-lg mx-auto leading-relaxed">
            {language === 'ta'
              ? 'இறைவன் திருவருளாலும் பெரியோர்களின் ஆசிகளாலும் ஞா. வல்லரசு & க. பிரியங்கா ஆகியோரின் திருமண முகூர்த்தம் முறைப்படி இனிதே நடைபெற உள்ளது.'
              : 'With the sacred blessings of elders and loved ones, G. Vallalarasu and K. Priyanka will unite in holy matrimony following traditional Vedic rites.'}
          </p>
        </div>

        {/* Configurable Announcement Details */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto my-6 text-left">
          <div className="p-4 rounded-2xl bg-[#faf8f4] border border-[#c5a059]/35 flex flex-col items-center text-center shadow-sm">
            <Calendar className="w-5 h-5 text-[#8e6c2e] mb-1.5" />
            <span className="text-[10px] uppercase tracking-widest text-[#8e6c2e] font-semibold block mb-1 font-tamil-sans">
              {language === 'ta' ? 'முகூர்த்த தேதி' : 'Muhurtham Date'}
            </span>
            <p className="font-serif text-base font-bold text-[#231c18]">
              {language === 'ta' ? 'சுப தேதி விரைவில் அறிவிக்கப்படும்' : 'To Be Announced'}
            </p>
            <span className="text-[11px] text-[#766c62] font-tamil-sans mt-0.5">
              {language === 'ta' ? 'சுப முகூர்த்த நேரம்' : 'Sacred Vedic Timings'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#faf8f4] border border-[#c5a059]/35 flex flex-col items-center text-center shadow-sm">
            <MapPin className="w-5 h-5 text-[#8e6c2e] mb-1.5" />
            <span className="text-[10px] uppercase tracking-widest text-[#8e6c2e] font-semibold block mb-1 font-tamil-sans">
              {language === 'ta' ? 'திருமண இடம்' : 'Location'}
            </span>
            <p className="font-serif text-base font-bold text-[#231c18]">
              {language === 'ta' ? 'சென்னை, தமிழ்நாடு' : 'Chennai, Tamil Nadu'}
            </p>
            <span className="text-[11px] text-[#766c62] font-tamil-sans mt-0.5">
              {language === 'ta' ? 'மணவறை நிகழ்வு' : 'Main Mandap Ceremony'}
            </span>
          </div>
        </div>

        <p className="relative z-10 text-xs text-[#8e6c2e] font-tamil-sans italic mt-2 mb-4">
          {language === 'ta'
            ? 'உடை முறை: பாரம்பரிய பட்டு ஆடைகள்'
            : `Dress Code: ${wedding.dressCode || 'Royal Traditional Festive Attire'}`}
        </p>
      </div>
    </section>
  );
};
