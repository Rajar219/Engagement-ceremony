'use client';

import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { CornerOrnaments } from '@/components/CornerOrnaments';

export const MomentsGallery: React.FC = () => {
  const { language } = useLanguage();

  const moments = [
    {
      title: language === 'ta' ? 'அழகிய தொடக்கம்' : 'A Beautiful Beginning',
      caption: language === 'ta'
        ? 'அன்பும் ஆசிகளும் நிறைந்த இல்லறப் பயணத்தின் இனிய சுபமுகூர்த்த தொடக்கம்.'
        : 'The auspicious moment two journeys intertwined with love, laughter, and family blessings.',
      tag: language === 'ta' ? 'இனிய தருணம்' : 'Cherished Moment',
      date: language === 'ta' ? 'அன்பின் தொடக்கம்' : 'The Beginning',
    },
    {
      title: language === 'ta' ? 'குடும்பத்தின் நல்லாசி' : 'Family Blessings',
      caption: language === 'ta'
        ? 'பெரியோர்களின் அன்பான ஆசிகளுடனும், உற்றார் உறவினர்களின் வாழ்த்துகளுடனும்.'
        : 'Surrounded by the warm smiles, gentle guidance, and heartfelt prayers of our elders.',
      tag: language === 'ta' ? 'பாரம்பரியம்' : 'Sacred Rituals',
      date: language === 'ta' ? 'குடும்ப ஒற்றுமை' : 'Family Harmony',
    },
    {
      title: language === 'ta' ? 'என்றென்றும் இணைந்திருத்தல்' : 'Together Forever',
      caption: language === 'ta'
        ? 'வாழ்நாள் முழுமைக்கும் துணைநிற்கும் அன்பான உறுதிமொழியும் மகிழ்ச்சியான வாழ்க்கையும்.'
        : 'Stepping gracefully into a lifetime of shared dreams, eternal companionship, and joy.',
      tag: language === 'ta' ? 'சுப வாக்குறுதி' : 'The Sacred Vow',
      date: language === 'ta' ? 'அன்பின் வாக்குறுதி' : 'A Promise of Love',
    },
  ];

  return (
    <section id="gallery-section" className="relative w-full py-14 px-4 max-w-4xl mx-auto text-center">
      {/* 09. CHERISHED MEMORIES GALLERY HEADER */}
      <div className="flex flex-col items-center mb-10">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8e6c2e] font-semibold mb-2 font-tamil-serif">
          {language === 'ta' ? 'நினைவுகள் & தருணங்கள்' : 'Memories & Milestones'}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold gold-foil-text tracking-wide">
          {language === 'ta' ? 'இனிய தருணங்கள்' : 'Cherished Moments'}
        </h2>
        <div className="ornament-divider text-[#c5a059]/50 font-serif text-sm w-44 mx-auto my-3">
          ❖
        </div>
        <p className="text-xs sm:text-sm text-[#5c534b] max-w-md font-tamil">
          {language === 'ta'
            ? 'அன்பும் பண்பும் நிறைந்த தருணங்களின் அழகிய சிறு தொகுப்பு.'
            : 'A glimpse into the milestones of love, family harmony, and joyous anticipation.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {moments.map((item, idx) => (
          <div
            key={idx}
            className="luxury-card p-6 sm:p-7 shadow-lg flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
          >
            <CornerOrnaments color="text-[#c5a059]/30" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-[#f4efe6] border border-[#c5a059]/30 text-[#8e6c2e] font-medium font-tamil-sans">
                  {item.tag}
                </span>
                <Heart className="w-4 h-4 text-[#8e6c2e]/60" />
              </div>

              <h4 className="font-serif text-xl font-bold text-[#231c18] mb-2">
                {item.title}
              </h4>
              <p className="text-xs text-[#5c534b] leading-relaxed font-tamil">
                {item.caption}
              </p>
            </div>

            <div className="relative z-10 mt-6 pt-3 border-t border-[#c5a059]/20 flex items-center justify-between text-[11px] text-[#766c62] font-tamil-sans">
              <span>{item.date}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#8e6c2e]/50" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
