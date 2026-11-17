'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface NavigationBarProps {
  isVisible: boolean;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ isVisible }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) {
    return null;
  }

  const navLinks = [
    { label: language === 'ta' ? 'மணமக்கள்' : 'Couple', href: '#couple-section' },
    { label: language === 'ta' ? 'குடும்பம்' : 'Family', href: '#family-section' },
    { label: language === 'ta' ? 'சுரண்டும் அட்டை' : 'Save Date', href: '#scratch-section' },
    { label: language === 'ta' ? 'நிச்சயதார்த்தம்' : 'Engagement', href: '#ceremony-section' },
    { label: language === 'ta' ? 'நிகழ்ச்சி நிரல்' : 'Schedule', href: '#schedule-section' },
    { label: language === 'ta' ? 'மண்டபம்' : 'Venue', href: '#venue-section' },
    { label: language === 'ta' ? 'நினைவுகள்' : 'Moments', href: '#gallery-section' },
    { label: language === 'ta' ? 'வருகைப் பதிவு' : 'RSVP', href: '#rsvp-section' },
    { label: language === 'ta' ? 'வாழ்த்துகள்' : 'Wishes', href: '#wishes-section' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#faf8f4]/95 backdrop-blur-md border-b border-[#c5a059]/30 py-2.5 shadow-sm text-[#231c18]'
          : 'bg-transparent py-4 pointer-events-none'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Monogram Brand: Only appears on scroll */}
        {isScrolled ? (
          <a
            href="#hero-section"
            className="pointer-events-auto flex items-center gap-2.5 group cursor-pointer shrink-0 transition-opacity duration-300"
          >
            <div className="w-8 h-8 rounded-full border border-[#c5a059] bg-[#231c18] flex items-center justify-center text-[#fbf8f0] font-serif font-bold text-xs shadow-sm group-hover:scale-105 transition-transform">
              V&amp;P
            </div>
            <span className="font-serif text-sm font-bold tracking-wider text-[#231c18] hidden sm:inline">
              Vallalarasu &amp; Priyanka
            </span>
          </a>
        ) : (
          <div className="w-8 h-8" />
        )}

        {/* Desktop Nav Links: Only on scroll */}
        {isScrolled && (
          <nav className="pointer-events-auto hidden lg:flex items-center gap-5 text-xs font-tamil-sans uppercase tracking-wider text-[#231c18]/80 transition-colors">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#8e6c2e] transition-colors py-1 relative group whitespace-nowrap"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c5a059] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
        )}

        {/* Right Section: Language Toggle (always accessible) + RSVP Pill (only on scroll) */}
        <div className="pointer-events-auto flex items-center gap-2.5 sm:gap-3">
          {/* SLEEK, COMPACT PILL TOGGLE (தமிழ் | EN) */}
          <div
            className={`flex items-center p-0.5 rounded-full border text-[11px] font-sans shadow-sm shrink-0 transition-colors ${
              isScrolled
                ? 'bg-[#f4efe6] border-[#c5a059]/40 text-[#231c18]'
                : 'bg-black/45 backdrop-blur-md border-[#dfb76c]/50 text-white'
            }`}
          >
            <button
              type="button"
              onClick={() => setLanguage(language === 'ta' ? 'bilingual' : 'ta')}
              title={language === 'ta' ? 'இருமொழிக்கு மாற்ற' : 'முழு தமிழிற்கு மாற்ற'}
              className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                language === 'ta'
                  ? 'bg-gradient-to-r from-[#c5a059] to-[#b08b41] text-[#231c18] font-bold shadow-sm'
                  : 'hover:text-[#dfb76c]'
              }`}
            >
              தமிழ்
            </button>
            <span className="text-[#c5a059]/40 text-[10px] select-none">|</span>
            <button
              type="button"
              onClick={() => setLanguage(language === 'en' ? 'bilingual' : 'en')}
              title={language === 'en' ? 'Switch to Bilingual' : 'Switch to English'}
              className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                language === 'en'
                  ? 'bg-gradient-to-r from-[#c5a059] to-[#b08b41] text-[#231c18] font-bold shadow-sm'
                  : 'hover:text-[#dfb76c]'
              }`}
            >
              EN
            </button>
          </div>

          {/* RSVP PILL: Only visible after scrolling down away from the clean poster */}
          {isScrolled && (
            <a
              href="#rsvp-section"
              className="shimmer-sweep px-4 py-1.5 rounded-full bg-gradient-to-r from-[#c5a059] via-[#e8d29b] to-[#b08b41] text-[#231c18] font-bold text-xs uppercase tracking-wider shadow-sm hover:scale-105 active:scale-95 transition-transform flex items-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-3 h-3 shrink-0" />
              <span className="font-tamil-sans">RSVP</span>
            </a>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`lg:hidden p-2 rounded-xl border transition-colors active:scale-95 ${
              isScrolled
                ? 'bg-[#f4efe6] border-[#c5a059]/40 text-[#231c18]'
                : 'bg-[#231c18]/80 border-[#c5a059]/40 text-[#fbf8f0]'
            }`}
          >
            {mobileMenuOpen ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf8f4]/98 border-b border-[#c5a059]/30 px-5 py-4 flex flex-col gap-2 text-xs font-tamil-sans uppercase tracking-wider text-[#231c18] shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-[#f4efe6] hover:text-[#8e6c2e] transition-colors flex items-center justify-between"
            >
              <span>{link.label}</span>
              <span className="text-[#c5a059] text-[10px]">➔</span>
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
