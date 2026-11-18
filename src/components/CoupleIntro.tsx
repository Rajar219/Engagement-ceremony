'use client';

import React from 'react';
import { invitationConfig } from '@/config/invitation.config';
import { CornerOrnaments } from '@/components/CornerOrnaments';

export const CoupleIntro: React.FC = () => {
  const { couple, story } = invitationConfig;

  return (
    <section id="couple-section" className="relative w-full py-12 px-4 max-w-4xl mx-auto text-center">
      {/* Ornamental Section Header (Strict Rule: English line, then Tamil line, equal font size) */}
      <div className="flex flex-col items-center mb-10">
        <span className="text-xs sm:text-sm text-[#8e6c2e] font-semibold uppercase tracking-[0.25em] font-serif block mb-1">
          Two Souls • One Beautiful Journey
        </span>
        <span className="text-xs sm:text-sm text-[#8e6c2e] font-semibold font-tamil-serif block mb-3">
          இரு இதயங்கள் • ஒரு இனிய இல்லறப் பயணம்
        </span>

        <h2 className="font-serif text-[clamp(1.35rem,5.5vw,2.5rem)] font-bold gold-foil-text tracking-wide whitespace-nowrap mb-1">
          The Groom &amp; Bride
        </h2>
        <h2 className="font-tamil-heading text-[clamp(1.35rem,5.5vw,2.5rem)] font-bold gold-foil-text tracking-wide whitespace-nowrap">
          மணமகன் &amp; மணமகள்
        </h2>

        <div className="ornament-divider text-[#c5a059]/60 font-serif text-sm w-48 mx-auto my-4">
          ❦
        </div>

        <p className="text-xs sm:text-sm text-[#5c534b] max-w-lg font-serif italic leading-relaxed mb-1">
          &ldquo;{story.narrative}&rdquo;
        </p>
        <p className="text-xs sm:text-sm text-[#5c534b] max-w-lg font-tamil leading-relaxed">
          &ldquo;பெற்றோர்கள் மற்றும் குடும்பத்தினரின் நல்லாசியுடன் இணையும் இரு இதயங்கள்.&rdquo;
        </p>
      </div>

      {/* Couple Profile Cards (Luxury Editorial Stationery Style — Zero Glassmorphism) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 my-6 text-center">
        {/* GROOM CARD */}
        <div className="luxury-card h-full px-4 py-8 sm:px-8 sm:py-10 flex flex-col items-center justify-between group transition-all duration-300 hover:shadow-2xl">
          <CornerOrnaments color="text-[#c5a059]/40" />

          {/* Role (English line, then Tamil line, matching size) */}
          <span className="text-xs sm:text-sm text-[#8e6c2e] font-semibold uppercase tracking-[0.22em] font-sans block mb-0.5">
            The Groom
          </span>
          <span className="text-xs sm:text-sm text-[#8e6c2e] font-semibold font-tamil-sans block mb-3">
            மணமகன்
          </span>

          {/* Groom Names (English line, then Tamil line, matching size) */}
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231c18] mb-1">
            {couple.groom.fullName}
          </h3>
          <h3 className="font-tamil-heading text-2xl sm:text-3xl font-bold text-[#231c18] mb-3">
            ஞா. வள்ளலரசு
          </h3>

          <div className="w-16 h-px bg-[#c5a059]/40 my-2" />

          {/* Parents Lineage (Strictly single line for both English and Tamil) */}
          <p className="text-[clamp(11px,2.8vw,14px)] text-[#5c534b] font-sans leading-relaxed whitespace-nowrap mb-1">
            Son of Mr. V. Gnanasekar &amp; Mrs. G. Meena
          </p>
          <p className="text-[clamp(10.5px,2.7vw,13.5px)] text-[#5c534b] font-tamil leading-relaxed whitespace-nowrap mb-3">
            திரு. V. ஞானசேகர் &amp; திருமதி. G. மீனா அவர்களின் அன்பு மகன்
          </p>

          {/* Location (English line, then Tamil line, matching size) */}
          <p className="text-xs sm:text-sm text-[#766c62] font-sans">
            Triplicane, Chennai
          </p>
          <p className="text-xs sm:text-sm text-[#766c62] font-tamil">
            திருவல்லிக்கேணி, சென்னை
          </p>
        </div>

        {/* BRIDE CARD */}
        <div className="luxury-card h-full px-4 py-8 sm:px-8 sm:py-10 flex flex-col items-center justify-between group transition-all duration-300 hover:shadow-2xl">
          <CornerOrnaments color="text-[#c5a059]/40" />

          {/* Role (English line, then Tamil line, matching size) */}
          <span className="text-xs sm:text-sm text-[#8e6c2e] font-semibold uppercase tracking-[0.22em] font-sans block mb-0.5">
            The Bride
          </span>
          <span className="text-xs sm:text-sm text-[#8e6c2e] font-semibold font-tamil-sans block mb-3">
            மணமகள்
          </span>

          {/* Bride Names (English line, then Tamil line, matching size) */}
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231c18] mb-1">
            {couple.bride.fullName}
          </h3>
          <h3 className="font-tamil-heading text-2xl sm:text-3xl font-bold text-[#231c18] mb-3">
            க. பிரியங்கா
          </h3>

          <div className="w-16 h-px bg-[#c5a059]/40 my-2" />

          {/* Parents Lineage (Strictly single line for both English and Tamil) */}
          <p className="text-[clamp(11px,2.8vw,14px)] text-[#5c534b] font-sans leading-relaxed whitespace-nowrap mb-1">
            Daughter of Mr. S. Kabali &amp; Mrs. K. Sumathi
          </p>
          <p className="text-[clamp(10.5px,2.7vw,13.5px)] text-[#5c534b] font-tamil leading-relaxed whitespace-nowrap mb-3">
            திரு. S. கபாலி &amp; திருமதி. K. சுமதி அவர்களின் அன்பு மகள்
          </p>

          {/* Location (English line, then Tamil line, matching size) */}
          <p className="text-xs sm:text-sm text-[#766c62] font-sans">
            Chennai, Tamil Nadu
          </p>
          <p className="text-xs sm:text-sm text-[#766c62] font-tamil">
            சென்னை, தமிழ்நாடு
          </p>
        </div>
      </div>
    </section>
  );
};
