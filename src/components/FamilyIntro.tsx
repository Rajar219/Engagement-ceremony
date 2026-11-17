'use client';

import React from 'react';
import { Users, Sparkles } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';
import { useLanguage } from '@/context/LanguageContext';

export const FamilyIntro: React.FC = () => {
  const { couple } = invitationConfig;
  const { t, language } = useLanguage();

  return (
    <section id="family-section" className="relative w-full py-16 px-4 max-w-4xl mx-auto text-center">
      {/* Ornamental Section Header */}
      <div className="flex flex-col items-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-[#a88136] font-semibold mb-2 font-tamil-serif">
          {language === 'ta' ? 'குடும்பங்கள் அறிமுகம்' : 'Our Families'}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold gold-foil-text tracking-wide">
          {language === 'ta' ? 'பெரியோர்களின் நல்லாசி' : 'With Divine Blessings of Elders'}
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mt-4 mb-4" />
        <p className="text-xs sm:text-sm text-[#5a4a42] max-w-lg font-tamil">
          {language === 'ta'
            ? 'திருமணம் என்பது இரு மனங்களின் சங்கமம் மட்டுமல்ல, இரு குடும்பங்கள் இணையும் புனிதமான உறவுப் பாலம்.'
            : '"A wedding is the sacred union not only of two hearts, but of two families bound by affection, respect, and shared traditions."'}
        </p>
      </div>

      {/* Family Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 my-6 text-center">
        {/* GROOM'S PARENTS CARD */}
        <div className="luxury-card p-8 flex flex-col items-center group transition-all duration-300">
          <div className="w-16 h-16 rounded-full border border-[#c5a059]/50 bg-[#faf8f4] flex items-center justify-center text-[#c5a059] mb-4 shadow-sm">
            <Users className="w-7 h-7 text-[#a88136]" />
          </div>

          <span className="text-[11px] uppercase tracking-[0.25em] text-[#a88136] font-semibold font-tamil-sans">
            {t.groomParentsTitle}
          </span>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#231c18] mt-2 mb-1">
            Mr. V. Gnanasekar &amp; Mrs. G. Meena
          </h3>

          <p className="text-xs text-[#8c6b32] font-tamil-sans tracking-wide mt-1">
            {language === 'ta' ? 'திருவல்லிக்கேணி, சென்னை' : 'Triplicane, Chennai'}
          </p>

          <div className="w-16 h-0.5 bg-[#c5a059]/30 my-4" />

          <p className="text-xs text-[#5a4a42] font-tamil leading-relaxed">
            {language === 'ta'
              ? 'தங்கள் மூத்த புதல்வன் G. வல்லளரசுவின் நிச்சயதார்த்த வைபவத்திற்கு தங்களை அன்புடன் அழைக்கின்றனர்.'
              : `Cordially invite your gracious presence and heartfelt blessings on the celebration of their son, ${couple.groom.fullName}.`}
          </p>
        </div>

        {/* BRIDE'S PARENTS CARD */}
        <div className="luxury-card p-8 flex flex-col items-center group transition-all duration-300">
          <div className="w-16 h-16 rounded-full border border-[#c5a059]/50 bg-[#faf8f4] flex items-center justify-center text-[#c5a059] mb-4 shadow-sm">
            <Users className="w-7 h-7 text-[#a88136]" />
          </div>

          <span className="text-[11px] uppercase tracking-[0.25em] text-[#a88136] font-semibold font-tamil-sans">
            {t.brideParentsTitle}
          </span>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#231c18] mt-2 mb-1">
            Mr. Kabali &amp; Mrs. K. Sumathy
          </h3>

          <p className="text-xs text-[#8c6b32] font-tamil-sans tracking-wide mt-1">
            {language === 'ta' ? 'சென்னை, தமிழ்நாடு' : 'Chennai, Tamil Nadu'}
          </p>

          <div className="w-16 h-0.5 bg-[#c5a059]/30 my-4" />

          <p className="text-xs text-[#5a4a42] font-tamil leading-relaxed">
            {language === 'ta'
              ? 'தங்கள் அன்பு மகள் K. பிரியங்காவின் நல்வாழ்வு தொடங்கும் இந்நாளில் தங்களின் ஆசிகளையும் நல்வரவையும் நாடுகின்றனர்.'
              : `Warmly request your esteemed company, prayers, and loving blessings as their beloved daughter, ${couple.bride.fullName}, begins this sacred new chapter.`}
          </p>
        </div>
      </div>

      {/* Auspicious note */}
      <div className="mt-8 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#faf8f4] border border-[#c5a059]/30 text-xs text-[#5a4a42] font-tamil-sans shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-[#a88136] shrink-0" />
        <span>
          {language === 'ta'
            ? 'உற்றார், உறவினர்கள் மற்றும் நண்பர்கள் அனைவரின் நல்வரவை வேண்டுகிறோம்'
            : 'Joined by extended families, relatives, and beloved well-wishers'}
        </span>
      </div>
    </section>
  );
};
