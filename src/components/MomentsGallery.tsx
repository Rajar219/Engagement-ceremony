'use client';

import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { CornerOrnaments } from '@/components/CornerOrnaments';

export const MomentsGallery: React.FC = () => {
  const moments = [
    {
      titleEn: 'A Beautiful Beginning',
      titleTa: 'அழகிய தொடக்கம்',
      captionEn: 'The auspicious moment two journeys intertwined with love, laughter, and family blessings.',
      captionTa: 'அன்பும் ஆசிகளும் நிறைந்த இல்லறப் பயணத்தின் இனிய சுபமுகூர்த்த தொடக்கம்.',
      tagEn: 'Cherished Moment',
      tagTa: 'இனிய தருணம்',
      dateEn: 'The Beginning',
      dateTa: 'அன்பின் தொடக்கம்',
    },
    {
      titleEn: 'Family Blessings',
      titleTa: 'குடும்பத்தின் நல்லாசி',
      captionEn: 'Surrounded by the warm smiles, gentle guidance, and heartfelt prayers of our elders.',
      captionTa: 'பெரியோர்களின் அன்பான ஆசிகளுடனும், உற்றார் உறவினர்களின் வாழ்த்துகளுடனும்.',
      tagEn: 'Sacred Rituals',
      tagTa: 'பாரம்பரியம்',
      dateEn: 'Family Harmony',
      dateTa: 'குடும்ப ஒற்றுமை',
    },
    {
      titleEn: 'Together Forever',
      titleTa: 'என்றென்றும் இணைந்திருத்தல்',
      captionEn: 'Stepping gracefully into a lifetime of shared dreams, eternal companionship, and joy.',
      captionTa: 'வாழ்நாள் முழுமைக்கும் துணைநிற்கும் அன்பான உறுதிமொழியும் மகிழ்ச்சியான வாழ்க்கையும்.',
      tagEn: 'The Sacred Vow',
      tagTa: 'சுப வாக்குறுதி',
      dateEn: 'A Promise of Love',
      dateTa: 'அன்பின் வாக்குறுதி',
    },
  ];

  return (
    <section id="gallery-section" className="relative w-full py-12 px-4 max-w-4xl mx-auto text-center">
      {/* 09. CHERISHED MEMORIES GALLERY HEADER (Strict Rule: English line, then Tamil line, matching size) */}
      <div className="flex flex-col items-center mb-10">
        <span className="text-xs sm:text-sm text-[#8e6c2e] font-semibold uppercase tracking-[0.25em] font-serif block mb-0.5">
          Memories &amp; Milestones
        </span>
        <span className="text-xs sm:text-sm text-[#8e6c2e] font-semibold font-tamil-serif block mb-3">
          நினைவுகள் &amp; தருணங்கள்
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold gold-foil-text tracking-wide mb-1">
          Cherished Moments
        </h2>
        <h2 className="font-tamil-heading text-3xl sm:text-4xl md:text-5xl font-bold gold-foil-text tracking-wide">
          இனிய தருணங்கள்
        </h2>

        <div className="ornament-divider text-[#c5a059]/50 font-serif text-sm w-44 mx-auto my-3">
          ❖
        </div>

        <p className="text-xs sm:text-sm text-[#5c534b] font-serif italic max-w-md mb-1">
          A glimpse into the milestones of love, family harmony, and joyous anticipation.
        </p>
        <p className="text-xs sm:text-sm text-[#5c534b] font-tamil max-w-md">
          அன்பும் பண்பும் நிறைந்த தருணங்களின் அழகிய சிறு தொகுப்பு.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 text-left">
        {moments.map((item, idx) => (
          <div
            key={idx}
            className="luxury-card p-6 sm:p-7 shadow-lg flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
          >
            <CornerOrnaments color="text-[#c5a059]/30" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col gap-0.5 px-3 py-1 rounded-full bg-[#f4efe6] border border-[#c5a059]/30 text-[#8e6c2e]">
                  <span className="text-[10px] uppercase tracking-widest font-sans font-medium">{item.tagEn}</span>
                  <span className="text-[10px] font-tamil-sans font-medium">{item.tagTa}</span>
                </div>
                <Heart className="w-4 h-4 text-[#8e6c2e]/60" />
              </div>

              <h4 className="font-serif text-xl font-bold text-[#231c18] mb-0.5">
                {item.titleEn}
              </h4>
              <h4 className="font-tamil-heading text-xl font-bold text-[#231c18] mb-2">
                {item.titleTa}
              </h4>

              <p className="text-xs text-[#5c534b] leading-relaxed font-serif italic mb-1.5">
                {item.captionEn}
              </p>
              <p className="text-xs text-[#5c534b] leading-relaxed font-tamil">
                {item.captionTa}
              </p>
            </div>

            <div className="relative z-10 mt-6 pt-3 border-t border-[#c5a059]/20 flex items-center justify-between text-[11px] text-[#766c62]">
              <div className="flex flex-col">
                <span className="font-sans">{item.dateEn}</span>
                <span className="font-tamil-sans">{item.dateTa}</span>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-[#8e6c2e]/50" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
