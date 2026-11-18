'use client';

import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { CornerOrnaments } from '@/components/CornerOrnaments';

export const WeddingSection: React.FC = () => {
  return (
    <section id="wedding-section" className="relative w-full py-12 px-4 max-w-4xl mx-auto text-center">
      {/* 07. WEDDING / MUHURTHAM INVITATION CARD (Zero Glassmorphism) */}
      <div className="luxury-card p-6 sm:p-10 shadow-xl text-center">
        <CornerOrnaments color="text-[#c5a059]/40" />

        {/* Section Header (Strict Rule: English line, then Tamil line, matching size) */}
        <div className="relative z-10 mb-6">
          <span className="text-xs sm:text-sm text-[#8e6c2e] font-semibold uppercase tracking-[0.25em] font-serif block mb-0.5">
            Holy Matrimony
          </span>
          <span className="text-xs sm:text-sm text-[#8e6c2e] font-semibold font-tamil-serif block mb-3">
            திருமண நன்னாள்
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold gold-foil-text tracking-wide mb-1">
            The Sacred Wedding Muhurtham
          </h2>
          <h2 className="font-tamil-heading text-2xl sm:text-3xl md:text-4xl font-bold gold-foil-text tracking-wide">
            புனித திருமண சுபமுகூர்த்தம்
          </h2>

          <div className="ornament-divider text-[#c5a059]/50 font-serif text-sm w-44 mx-auto my-3">
            ❖
          </div>

          <p className="text-xs sm:text-sm text-[#5c534b] font-serif italic max-w-lg mx-auto leading-relaxed mb-1.5">
            &ldquo;With the sacred blessings of elders and loved ones, G. Vallarasu and K. Priyanka will unite in holy matrimony following traditional Vedic rites.&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-[#5c534b] font-tamil max-w-lg mx-auto leading-relaxed">
            &ldquo;இறைவன் திருவருளாலும் பெரியோர்களின் ஆசிகளாலும் ஞா. வல்லரசு &amp; க. பிரியங்கா ஆகியோரின் திருமண முகூர்த்தம் முறைப்படி இனிதே நடைபெற உள்ளது.&rdquo;
          </p>
        </div>

        {/* Configurable Announcement Details */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto my-6 text-left">
          {/* Muhurtham Date Box */}
          <div className="p-4 rounded-2xl bg-[#faf8f4] border border-[#c5a059]/35 flex flex-col items-center text-center shadow-sm">
            <Calendar className="w-5 h-5 text-[#8e6c2e] mb-1.5" />
            <span className="text-xs uppercase tracking-widest text-[#8e6c2e] font-semibold font-sans block">
              Muhurtham Date
            </span>
            <span className="text-xs text-[#8e6c2e] font-semibold font-tamil-sans block mb-1">
              முகூர்த்த தேதி
            </span>

            <p className="font-serif text-base font-bold text-[#231c18]">
              To Be Announced
            </p>
            <p className="font-tamil-heading text-base font-bold text-[#231c18] mb-1">
              சுப தேதி விரைவில் அறிவிக்கப்படும்
            </p>

            <span className="text-xs text-[#766c62] font-sans">
              Sacred Vedic Timings
            </span>
            <span className="text-xs text-[#766c62] font-tamil-sans">
              சுப முகூர்த்த நேரம்
            </span>
          </div>

          {/* Location Box */}
          <div className="p-4 rounded-2xl bg-[#faf8f4] border border-[#c5a059]/35 flex flex-col items-center text-center shadow-sm">
            <MapPin className="w-5 h-5 text-[#8e6c2e] mb-1.5" />
            <span className="text-xs uppercase tracking-widest text-[#8e6c2e] font-semibold font-sans block">
              Location
            </span>
            <span className="text-xs text-[#8e6c2e] font-semibold font-tamil-sans block mb-1">
              திருமண இடம்
            </span>

            <p className="font-serif text-base font-bold text-[#231c18]">
              Chennai, Tamil Nadu
            </p>
            <p className="font-tamil-heading text-base font-bold text-[#231c18] mb-1">
              சென்னை, தமிழ்நாடு
            </p>

            <span className="text-xs text-[#766c62] font-sans">
              Main Mandap Ceremony
            </span>
            <span className="text-xs text-[#766c62] font-tamil-sans">
              மணவறை நிகழ்வு
            </span>
          </div>
        </div>

        {/* Dress Code (English line, then Tamil line) */}
        <div className="relative z-10 flex flex-col items-center gap-0.5 text-xs text-[#8e6c2e] font-sans mt-2 mb-2">
          <span>Dress Code: Royal Traditional Festive Attire</span>
          <span className="font-tamil-sans">உடை முறை: பாரம்பரிய பட்டு ஆடைகள்</span>
        </div>
      </div>
    </section>
  );
};
