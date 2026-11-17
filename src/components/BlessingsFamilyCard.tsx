'use client';

import React from 'react';
import { Heart, Users, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { CornerOrnaments } from '@/components/CornerOrnaments';

export const BlessingsFamilyCard: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="blessings-section" className="relative w-full py-12 px-4 max-w-4xl mx-auto text-center">
      {/* MATCHING LUXURY COTTON-RAG STATIONERY CARD */}
      <div className="luxury-card p-6 sm:p-10 shadow-xl overflow-hidden backdrop-blur-md">
        {/* Delicate Gold Corner Floral Ornaments */}
        <CornerOrnaments />

        {/* Card Title & Ornamental Divider */}
        <div className="relative z-10 mb-6">
          <span className={`text-[11px] text-[#a88136] font-semibold block mb-1.5 ${language === 'ta' ? 'font-tamil-serif' : 'uppercase tracking-[0.25em] font-serif'}`}>
            Divine Grace • திருவருள் ஆசி
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold gold-foil-text tracking-wide">
            {t.blessingsSectionHeader}
          </h2>

          <div className="ornament-divider text-[#c5a059]/50 font-serif text-sm my-4">
            ❖
          </div>
        </div>

        {/* Traditional Tamil & English Wedding Blessing Verse */}
        <div className="relative z-10 max-w-2xl mx-auto mb-8 px-2">
          {language !== 'en' && (
            <p className="text-xs sm:text-sm text-[#4a3b32] font-tamil leading-relaxed mb-3">
              {t.blessingsVerseTamil}
            </p>
          )}

          {language !== 'ta' && (
            <p className="text-xs sm:text-sm text-[#4a3b32] font-serif italic leading-relaxed">
              "{t.blessingsVerse}"
            </p>
          )}
        </div>

        {/* HIGHLIGHTED INNER BOX NAMING BOTH FAMILIES */}
        <div className="relative z-10 p-5 sm:p-6 rounded-2xl bg-[#faf8f4] border border-[#c5a059]/30 text-left shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-4 pb-3 border-b border-[#c5a059]/20 text-center">
            <Users className="w-4 h-4 text-[#a88136] shrink-0" />
            <h3 className="font-serif text-sm sm:text-base font-bold text-[#231c18] tracking-wide uppercase font-tamil-serif">
              {t.familyBoxTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Groom's Family */}
            <div className="space-y-1">
              <span className="text-[10px] text-[#a88136] uppercase tracking-widest font-tamil-sans font-semibold block">
                {t.groomParentsTitle}
              </span>
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#231c18] leading-snug">
                {t.groomParentsNames}
              </h4>
              <p className="text-[11px] text-[#715c4d] font-tamil-sans">
                {language === 'ta' ? 'திருவல்லிக்கேணி, சென்னை' : 'Triplicane, Chennai'}
              </p>
            </div>

            {/* Bride's Family */}
            <div className="space-y-1">
              <span className="text-[10px] text-[#a88136] uppercase tracking-widest font-tamil-sans font-semibold block">
                {t.brideParentsTitle}
              </span>
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#231c18] leading-snug">
                {t.brideParentsNames}
              </h4>
              <p className="text-[11px] text-[#715c4d] font-tamil-sans">
                {language === 'ta' ? 'சென்னை, தமிழ்நாடு' : 'Chennai, Tamil Nadu'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Auspicious Pill Note */}
        <div className="relative z-10 mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#faf8f4] border border-[#c5a059]/30 text-[11px] text-[#5a4a42] font-tamil-sans">
          <Sparkles className="w-3.5 h-3.5 text-[#a88136] shrink-0" />
          <span>
            {language === 'ta'
              ? 'உற்றார், உறவினர்கள் மற்றும் நண்பர்கள் அனைவரின் வருகையை வேண்டுகிறோம்'
              : 'Joined by extended families, relatives, and beloved well-wishers'}
          </span>
        </div>
      </div>
    </section>
  );
};
