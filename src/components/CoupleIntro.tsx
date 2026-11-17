'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';
import { useLanguage } from '@/context/LanguageContext';
import { CornerOrnaments } from '@/components/CornerOrnaments';

export const CoupleIntro: React.FC = () => {
  const { couple, story } = invitationConfig;
  const { t, language } = useLanguage();

  return (
    <section id="couple-section" className="relative w-full py-16 px-4 max-w-4xl mx-auto text-center">
      {/* Ornamental Section Header */}
      <div className="flex flex-col items-center mb-12">
        <span className={`text-[11px] text-[#8e6c2e] font-semibold mb-2 ${language === 'ta' ? 'font-tamil-serif' : 'uppercase tracking-[0.25em] font-serif'}`}>
          {language === 'ta' ? 'மணமக்கள் அறிமுகம்' : 'Two Souls • One Beautiful Journey'}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold gold-foil-text tracking-wide">
          {language === 'ta' ? 'மணமகன் & மணமகள்' : 'The Groom & Bride'}
        </h2>
        <div className="ornament-divider text-[#c5a059]/60 font-serif text-sm w-48 mx-auto my-4">
          ❦
        </div>
        <p className="text-xs sm:text-sm text-[#5c534b] max-w-lg font-serif italic leading-relaxed">
          "{story.narrative}"
        </p>
      </div>

      {/* Couple Profile Cards (Luxury Editorial Stationery Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 my-6 text-center">
        {/* GROOM CARD */}
        <div className="luxury-card p-8 sm:p-10 flex flex-col items-center group transition-all duration-300 hover:shadow-2xl">
          <CornerOrnaments color="text-[#c5a059]/40" />

          {/* Monogram Medallion with Authentic Tamil Initial: ஜி. */}
          <div className="w-20 h-20 rounded-full border border-[#c5a059] bg-[#fdfbf7] flex items-center justify-center text-[#231c18] font-tamil-heading font-bold text-2xl mb-4 shadow-sm group-hover:scale-105 transition-transform select-none">
            <span className="leading-none pt-0.5">ஜி.</span>
          </div>

          <span className={`text-[10px] text-[#8e6c2e] font-semibold ${language === 'ta' ? 'font-tamil-sans' : 'uppercase tracking-[0.25em] font-sans'}`}>
            {language === 'ta' ? 'மணமகன் • Groom' : 'Groom'}
          </span>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231c18] mt-1 mb-1">
            {couple.groom.fullName}
          </h3>

          <span className="text-sm font-tamil-serif font-semibold text-[#8e6c2e] mb-2">
            ஜி. வள்ளலரசு
          </span>

          <div className="w-16 h-px bg-[#c5a059]/40 my-2" />

          <p className="text-xs sm:text-sm text-[#5c534b] font-tamil leading-relaxed">
            {couple.groom.parents}
          </p>
          <p className="text-[11px] text-[#766c62] font-sans mt-1">
            Triplicane, Chennai
          </p>

          {couple.groom.bio && (
            <p className="text-xs text-[#8e6c2e]/90 font-serif italic mt-3">
              "{couple.groom.bio}"
            </p>
          )}
        </div>

        {/* BRIDE CARD */}
        <div className="luxury-card p-8 sm:p-10 flex flex-col items-center group transition-all duration-300 hover:shadow-2xl">
          <CornerOrnaments color="text-[#c5a059]/40" />

          {/* Monogram Medallion with Authentic Tamil Initial: கே. */}
          <div className="w-20 h-20 rounded-full border border-[#c5a059] bg-[#fdfbf7] flex items-center justify-center text-[#231c18] font-tamil-heading font-bold text-2xl mb-4 shadow-sm group-hover:scale-105 transition-transform select-none">
            <span className="leading-none pt-0.5">கே.</span>
          </div>

          <span className={`text-[10px] text-[#8e6c2e] font-semibold ${language === 'ta' ? 'font-tamil-sans' : 'uppercase tracking-[0.25em] font-sans'}`}>
            {language === 'ta' ? 'மணமகள் • Bride' : 'Bride'}
          </span>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231c18] mt-1 mb-1">
            {couple.bride.fullName}
          </h3>

          <span className="text-sm font-tamil-serif font-semibold text-[#8e6c2e] mb-2">
            கே. பிரியங்கா
          </span>

          <div className="w-16 h-px bg-[#c5a059]/40 my-2" />

          <p className="text-xs sm:text-sm text-[#5c534b] font-tamil leading-relaxed">
            {couple.bride.parents}
          </p>
          <p className="text-[11px] text-[#766c62] font-sans mt-1">
            Chennai, Tamil Nadu
          </p>

          {couple.bride.bio && (
            <p className="text-xs text-[#8e6c2e]/90 font-serif italic mt-3">
              "{couple.bride.bio}"
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
