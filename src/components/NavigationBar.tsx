'use client';

import React, { useState, useEffect } from 'react';

interface NavigationBarProps {
  isVisible: boolean;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ isVisible }) => {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-40 w-full max-w-[430px] bg-[#faf8f4]/95 backdrop-blur-md border-b border-[#c5a059]/30 py-2.5 shadow-sm text-[#231c18] transition-all duration-300">
      <div className="w-full px-4 flex items-center justify-center text-center">
        {/* Couple Title (Clean Centered Typography) */}
        <a
          href="#hero-section"
          className="flex flex-col items-center group cursor-pointer transition-opacity"
        >
          <span className="font-serif text-sm font-bold tracking-wider text-[#231c18]">
            Vallalarasu &amp; Priyanka
          </span>
          <span className="font-tamil text-[11px] font-semibold text-[#8e6c2e]">
            ஞா. வள்ளலரசு &amp; க. பிரியங்கா
          </span>
        </a>
      </div>
    </header>
  );
};
