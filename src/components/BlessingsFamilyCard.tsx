'use client';

import React from 'react';
import { Users, Sparkles } from 'lucide-react';
import { CornerOrnaments } from '@/components/CornerOrnaments';

export const BlessingsFamilyCard: React.FC = () => {
  return (
    <section id="blessings-section" className="relative w-full py-12 px-4 max-w-4xl mx-auto text-center">
      {/* MATCHING LUXURY COTTON-RAG STATIONERY CARD (Zero Glassmorphism) */}
      <div className="luxury-card p-6 sm:p-10 shadow-xl overflow-hidden">
        {/* Delicate Gold Corner Floral Ornaments */}
        <CornerOrnaments />

        {/* Card Title & Ornamental Divider (Strict Rule: English line, then Tamil line, matching size) */}
        <div className="relative z-10 mb-6">
          <span className="text-xs sm:text-sm text-[#a88136] font-semibold uppercase tracking-[0.25em] font-serif block mb-0.5">
            Divine Grace &amp; Blessings
          </span>
          <span className="text-xs sm:text-sm text-[#a88136] font-semibold font-tamil-serif block mb-3">
            திருவருளும் குடும்ப ஆசிகளும்
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold gold-foil-text tracking-wide mb-1">
            With the Blessings of Our Families
          </h2>
          <h2 className="font-tamil-heading text-2xl sm:text-3xl md:text-4xl font-bold gold-foil-text tracking-wide">
            குடும்பத்தினரின் நல்லாசியுடன்
          </h2>

          <div className="ornament-divider text-[#c5a059]/50 font-serif text-sm my-4">
            ❖
          </div>
        </div>

        {/* Traditional Tamil & English Wedding Blessing Verse (Separate lines, matching size) */}
        <div className="relative z-10 max-w-2xl mx-auto mb-8 px-2 flex flex-col items-center gap-3">
          <p className="text-xs sm:text-sm text-[#4a3b32] font-serif italic leading-relaxed">
            &ldquo;With the divine grace of the Almighty and the heartfelt blessings of our elders, we cordially invite you with your family to join us in celebrating the auspicious Engagement Ceremony of Vallarasu and Priyanka.&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-[#4a3b32] font-tamil leading-relaxed">
            &ldquo;அன்பும் பண்பும் நிறைந்த எங்கள் இல்லத்து மணமக்கள் ஞா. வள்ளலரசு &amp; க. பிரியங்கா ஆகியோரின் திருமண நிச்சயதார்த்த நன்னாளில் தாங்கள் தங்கள் குடும்ப சகிதமாக வருகை தந்து வாழ்த்தி அருள அன்புடன் அழைக்கின்றோம்.&rdquo;
          </p>
        </div>

        {/* HIGHLIGHTED INNER BOX NAMING BOTH FAMILIES */}
        <div className="relative z-10 p-5 sm:p-6 rounded-2xl bg-[#faf8f4] border border-[#c5a059]/30 text-left shadow-sm">
          <div className="flex flex-col items-center justify-center gap-1 mb-5 pb-3 border-b border-[#c5a059]/20 text-center">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#a88136] shrink-0" />
              <h3 className="font-serif text-sm sm:text-base font-bold text-[#231c18] tracking-wide uppercase">
                Families of the Couple
              </h3>
            </div>
            <h3 className="font-tamil text-xs sm:text-sm font-bold text-[#231c18]">
              மணமக்களின் பெற்றோர் இல்லத்தார்
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Groom's Family */}
            <div className="space-y-1 min-w-0">
              <span className="text-xs uppercase tracking-widest text-[#a88136] font-sans font-semibold block">
                Groom&apos;s Parents
              </span>
              <span className="text-xs text-[#a88136] font-tamil-sans font-semibold block mb-1">
                மணமகனின் பெற்றோர்
              </span>

              <h4 className="font-serif text-sm sm:text-base font-bold text-[#231c18] leading-snug whitespace-nowrap">
                Mr. V. Gnanasekar &amp; Mrs. G. Meena
              </h4>
              <h4 className="font-tamil text-[clamp(11px,3.2vw,13.5px)] font-bold text-[#231c18] leading-snug mb-1 whitespace-nowrap">
                திரு. V. ஞானசேகர் &amp; திருமதி. G. மீனா
              </h4>

              <p className="text-xs text-[#715c4d] font-sans">
                Triplicane, Chennai
              </p>
              <p className="text-xs text-[#715c4d] font-tamil">
                திருவல்லிக்கேணி, சென்னை
              </p>
            </div>

            {/* Bride's Family */}
            <div className="space-y-1 min-w-0">
              <span className="text-xs uppercase tracking-widest text-[#a88136] font-sans font-semibold block">
                Bride&apos;s Parents
              </span>
              <span className="text-xs text-[#a88136] font-tamil-sans font-semibold block mb-1">
                மணமகளின் பெற்றோர்
              </span>

              <h4 className="font-serif text-sm sm:text-base font-bold text-[#231c18] leading-snug whitespace-nowrap">
                Mr. S. Kabali &amp; Mrs. K. Sumathi
              </h4>
              <h4 className="font-tamil text-[clamp(11px,3.2vw,13.5px)] font-bold text-[#231c18] leading-snug mb-1 whitespace-nowrap">
                திரு. S. கபாலி &amp; திருமதி. K. சுமதி
              </h4>

              <p className="text-xs text-[#715c4d] font-sans">
                Chennai, Tamil Nadu
              </p>
              <p className="text-xs text-[#715c4d] font-tamil">
                சென்னை, தமிழ்நாடு
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Auspicious Pill Note */}
        <div className="relative z-10 mt-6 inline-flex flex-col items-center gap-0.5 px-5 py-2 rounded-2xl bg-[#faf8f4] border border-[#c5a059]/30 text-center">
          <div className="flex items-center gap-1.5 text-xs text-[#5a4a42] font-sans">
            <Sparkles className="w-3.5 h-3.5 text-[#a88136] shrink-0" />
            <span>Joined by extended families, relatives, and beloved well-wishers</span>
          </div>
          <span className="text-xs text-[#5a4a42] font-tamil">
            உற்றார், உறவினர்கள் மற்றும் நண்பர்கள் அனைவரின் வருகையை வேண்டுகிறோம்
          </span>
        </div>
      </div>
    </section>
  );
};
