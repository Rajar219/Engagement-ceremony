'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

export const Footer: React.FC = () => {
  const { closing } = invitationConfig;

  return (
    <footer id="footer-section" className="relative w-full py-16 px-4 bg-gradient-to-b from-transparent via-[#f5f0ea] to-[#eee7dd] text-center border-t border-[#c5a059]/30">
      {/* 13. FINAL THANK-YOU SECTION (Strict Rule: English line, then Tamil line, matching size) */}
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Minimal Monogram Typography (No Icon Container) */}
        <div className="text-xl sm:text-2xl font-serif font-bold text-[#c5a059] mb-3 tracking-widest">
          V &amp; P
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold gold-foil-text tracking-wide mb-1">
          {closing.heading}
        </h3>
        <h3 className="font-tamil-heading text-2xl sm:text-3xl font-bold gold-foil-text tracking-wide mb-4">
          தங்களின் வருகையை அன்போடு வேண்டுகிறோம்
        </h3>

        <p className="text-xs sm:text-sm text-[#5a4a42] leading-relaxed font-serif italic max-w-lg mb-1.5">
          {closing.message}
        </p>
        <p className="text-xs sm:text-sm text-[#5a4a42] leading-relaxed font-tamil max-w-lg mb-4">
          தங்களின் வருகையும் நல்லாசியும் மணமக்களின் புதிய இல்லற வாழ்க்கைக்கு அளப்பரிய மகிழ்ச்சியையும் ஆசிகளையும் தரும்.
        </p>

        <p className="text-xs sm:text-sm text-[#8c6b32] font-serif italic mb-1">
          &ldquo;{closing.blessing}&rdquo;
        </p>
        <p className="text-xs sm:text-sm text-[#8c6b32] font-tamil italic mb-6">
          &ldquo;எல்லாம் வல்ல இறைவன் அருளால் அன்பு, அமைதி மற்றும் மகிழ்ச்சி தழைத்தோங்கட்டும்.&rdquo;
        </p>

        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mb-6" />

        <p className="font-serif text-base sm:text-lg font-bold text-[#231c18] tracking-wider mb-1">
          {closing.signature}
        </p>
        <p className="font-tamil-heading text-base sm:text-lg font-bold text-[#231c18] tracking-wider">
          ஞா. வல்லரசு &amp; க. பிரியங்கா மற்றும் குடும்பத்தினர்
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
