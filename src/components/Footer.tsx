'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';
import { useLanguage } from '@/context/LanguageContext';

export const Footer: React.FC = () => {
  const { closing, couple } = invitationConfig;
  const { language } = useLanguage();

  return (
    <footer id="footer-section" className="relative w-full py-16 px-4 bg-gradient-to-b from-transparent via-[#f5f0ea] to-[#eee7dd] text-center border-t border-[#c5a059]/30">
      {/* 13. FINAL THANK-YOU SECTION */}
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Monogram Seal */}
        <div className="w-14 h-14 rounded-full border border-[#c5a059]/50 bg-[#231c18] flex items-center justify-center text-[#c5a059] font-serif font-bold text-xl mb-4 shadow-md">
          {couple.monogram}
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold gold-foil-text tracking-wide mb-3">
          {language === 'ta' ? 'தங்களின் வருகையை அன்போடு வேண்டுகிறோம்' : closing.heading}
        </h3>

        <p className="text-xs sm:text-sm text-[#5a4a42] leading-relaxed font-tamil max-w-lg mb-3">
          {language === 'ta'
            ? 'தங்களின் வருகையும் நல்லாசியும் மணமக்களின் புதிய இல்லற வாழ்க்கைக்கு அளப்பரிய மகிழ்ச்சியையும் ஆசிகளையும் தரும்.'
            : closing.message}
        </p>

        <p className="text-xs text-[#8c6b32] font-tamil italic mb-6">
          {language === 'ta'
            ? '"எல்லாம் வல்ல இறைவன் அருளால் அன்பு, அமைதி மற்றும் மகிழ்ச்சி தழைத்தோங்கட்டும்."'
            : `"${closing.blessing}"`}
        </p>

        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mb-6" />

        <p className="font-serif text-base sm:text-lg font-bold text-[#231c18] tracking-wider font-tamil-serif">
          {language === 'ta'
            ? 'ஞானசேகர் & கபாலி குடும்பத்தினர்'
            : closing.signature}
        </p>

        <div className="mt-8 flex items-center gap-1.5 text-[11px] text-[#8c6b32] uppercase tracking-widest font-sans">
          <span>Celebrating Love &amp; Sacred Union</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          <span>V&amp;P 2026</span>
        </div>
      </div>
    </footer>
  );
};
