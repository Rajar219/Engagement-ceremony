'use client';

import React from 'react';
import { CornerOrnaments } from '@/components/CornerOrnaments';

export const DirectoryAndRSVPCard: React.FC = () => {
  return (
    <section id="directory-section" className="relative w-full py-12 px-4 max-w-4xl mx-auto text-center">
      {/* DIRECTORY CARD: "With Best Compliments From" (Zero Glassmorphism) */}
      <div className="luxury-card p-6 sm:p-10 shadow-xl overflow-hidden text-left">
        <CornerOrnaments />

        <div className="relative z-10 text-center mb-6">
          <span className="text-xs sm:text-sm text-[#a88136] font-semibold uppercase tracking-[0.25em] font-serif block mb-0.5">
            Cordially Welcoming You
          </span>
          <span className="text-xs sm:text-sm text-[#a88136] font-semibold font-tamil-serif block mb-3">
            இல்லத்தார் நல்வரவேற்பு
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold gold-foil-text tracking-wide mb-1">
            With Best Compliments From
          </h2>
          <h2 className="font-tamil-heading text-2xl sm:text-3xl md:text-4xl font-bold gold-foil-text tracking-wide">
            அன்புடன் அழைக்கும் குடும்பத்தினர்
          </h2>

          <div className="ornament-divider text-[#c5a059]/50 font-serif text-sm my-4">
            ❖
          </div>
        </div>

        {/* 2-Column Key-Value Directory Rows (Strict Rule: English line, then Tamil line) */}
        <div className="relative z-10 space-y-4">
          {/* Row 1: Groom's Family */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8f4] border border-[#c5a059]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm">
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-serif font-bold text-[#231c18] tracking-wide">
                Groom&apos;s Family
              </span>
              <span className="text-xs sm:text-sm font-tamil-serif font-bold text-[#8e6c2e]">
                மணமகன் இல்லத்தார்
              </span>
            </div>
            <div className="flex flex-col sm:text-right">
              <span className="text-xs sm:text-sm font-sans text-[#5a4a42]">
                Mr. V. Gnanasekar &amp; Family
              </span>
              <span className="text-xs sm:text-sm text-[#5a4a42] font-tamil">
                திரு. V. ஞானசேகர் மற்றும் குடும்பத்தினர்
              </span>
            </div>
          </div>

          {/* Row 2: Bride's Family */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8f4] border border-[#c5a059]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm">
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-serif font-bold text-[#231c18] tracking-wide">
                Bride&apos;s Family
              </span>
              <span className="text-xs sm:text-sm font-tamil-serif font-bold text-[#8e6c2e]">
                மணமகள் இல்லத்தார்
              </span>
            </div>
            <div className="flex flex-col sm:text-right">
              <span className="text-xs sm:text-sm font-sans text-[#5a4a42]">
                Mr. S. Kabali &amp; Family
              </span>
              <span className="text-xs sm:text-sm text-[#5a4a42] font-tamil">
                திரு. S. கபாலி மற்றும் குடும்பத்தினர்
              </span>
            </div>
          </div>

          {/* Row 3: Relatives & Friends */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8f4] border border-[#c5a059]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm">
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-serif font-bold text-[#231c18] tracking-wide">
                Relatives &amp; Well-Wishers
              </span>
              <span className="text-xs sm:text-sm font-tamil-serif font-bold text-[#8e6c2e]">
                உற்றார், உறவினர்கள் மற்றும் நண்பர்கள்
              </span>
            </div>
            <div className="flex flex-col sm:text-right">
              <span className="text-xs sm:text-sm font-sans text-[#5a4a42]">
                All Near and Dear Ones
              </span>
              <span className="text-xs sm:text-sm text-[#5a4a42] font-tamil">
                அனைத்து நல் உள்ளங்களும்
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
