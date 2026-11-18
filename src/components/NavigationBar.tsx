'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface NavigationBarProps {
  isVisible: boolean;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ isVisible }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Minimal, clean header that only mounts upon scrolling down into invitation
  if (!isVisible || !isScrolled) {
    return null;
  }

  const navLinks = [
    { labelEn: 'Couple', labelTa: 'மணமக்கள்', href: '#couple-section' },
    { labelEn: 'Ceremony', labelTa: 'நிச்சயதார்த்தம்', href: '#ceremony-section' },
    { labelEn: 'Family', labelTa: 'குடும்பம்', href: '#blessings-section' },
    { labelEn: 'Venue', labelTa: 'மண்டபம்', href: '#venue-section' },
    { labelEn: 'RSVP', labelTa: 'பதிவு செய்ய', href: '#rsvp-section' },
  ];

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-40 w-full max-w-[430px] bg-[#faf8f4] border-b border-[#c5a059]/30 py-2.5 shadow-sm text-[#231c18] transition-all duration-300">
      <div className="w-full px-4 flex items-center justify-between">
        {/* Couple Title (Clean Typography) */}
        <a
          href="#hero-section"
          className="flex flex-col text-left group cursor-pointer shrink-0 transition-opacity"
        >
          <span className="font-serif text-sm font-bold tracking-wider text-[#231c18]">
            Vallarasu &amp; Priyanka
          </span>
          <span className="font-tamil-serif text-[11px] font-semibold text-[#8e6c2e]">
            ஞா. வள்ளலரசு &amp; க. பிரியங்கா
          </span>
        </a>

        {/* Clean Text-Only Pill Toggle */}
        <div className="flex items-center p-0.5 rounded-full border border-[#c5a059]/40 bg-[#f4efe6] text-[11px] font-sans shadow-sm shrink-0">
          <button
            type="button"
            onClick={() => setLanguage(language === 'ta' ? 'bilingual' : 'ta')}
            title="தமிழ்"
            className={`px-2.5 py-0.5 rounded-full transition-all duration-200 cursor-pointer ${
              language === 'ta'
                ? 'bg-[#c5a059] text-[#231c18] font-bold shadow-sm'
                : 'hover:text-[#8e6c2e] text-[#5c534b]'
            }`}
          >
            தமிழ்
          </button>
          <span className="text-[#c5a059]/40 text-[10px]">|</span>
          <button
            type="button"
            onClick={() => setLanguage(language === 'en' ? 'bilingual' : 'en')}
            title="English"
            className={`px-2.5 py-0.5 rounded-full transition-all duration-200 cursor-pointer ${
              language === 'en'
                ? 'bg-[#c5a059] text-[#231c18] font-bold shadow-sm'
                : 'hover:text-[#8e6c2e] text-[#5c534b]'
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
};
