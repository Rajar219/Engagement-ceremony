'use client';

import React from 'react';
import { Music, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { CornerOrnaments } from '@/components/CornerOrnaments';

const FeastIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
    <path d="M15 2v10" />
    <path d="M12 12v8a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-8" />
    <path d="M7 2v20" />
    <path d="M3 2v4a4 4 0 0 0 4 4" />
  </svg>
);

export const CelebrationFeastCard: React.FC = () => {
  const { t, language } = useLanguage();

  const events = [
    {
      icon: Sparkles,
      number: '01',
      title: t.itinerary1Title,
      time: t.itinerary1Time,
      desc: t.itinerary1Desc,
    },
    {
      icon: Music,
      number: '02',
      title: t.itinerary2Title,
      time: t.itinerary2Time,
      desc: t.itinerary2Desc,
    },
    {
      icon: FeastIcon,
      number: '03',
      title: t.itinerary3Title,
      time: t.itinerary3Time,
      desc: t.itinerary3Desc,
    },
  ];

  return (
    <section id="schedule-section" className="relative w-full py-8 px-4 max-w-3xl mx-auto text-center">
      {/* MATCHING LUXURY COTTON-RAG STATIONERY CARD (Zero Glassmorphism) */}
      <div className="luxury-card p-6 sm:p-10 shadow-xl overflow-hidden">
        {/* Delicate Gold Corner Floral Ornaments */}
        <CornerOrnaments />

        {/* Card Title & Ornamental Divider */}
        <div className="relative z-10 mb-8">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#a88136] font-semibold block font-tamil-serif mb-1.5">
            Celebration Itinerary • விழா நிகழ்வுகள்
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold gold-foil-text tracking-wide">
            {t.highlightsSectionHeader}
          </h2>

          <div className="ornament-divider text-[#c5a059]/50 font-serif text-sm my-4">
            ❖
          </div>
        </div>

        {/* STRUCTURED HORIZONTAL ROWS */}
        <div className="relative z-10 space-y-4 mb-8 text-left">
          {events.map((ev, idx) => {
            const IconComponent = ev.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[#faf8f4] border border-[#c5a059]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:border-[#c5a059]/45 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center shrink-0 text-[#a88136]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#231c18] tracking-wide">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-[#5a4a42] font-tamil mt-0.5 leading-relaxed">
                      {ev.desc}
                    </p>
                  </div>
                </div>

                <div className="sm:text-right shrink-0 pl-14 sm:pl-0">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#231c18] border border-[#c5a059]/35 text-[#fbf6e9] font-sans text-xs font-semibold shadow-inner">
                    {ev.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dress Code Highlight */}
        <div className="relative z-10 inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-[#faf8f4] border border-[#c5a059]/30 text-xs text-[#5a4a42] font-tamil-sans">
          <Sparkles className="w-3.5 h-3.5 text-[#a88136] shrink-0" />
          <span>
            <strong className="text-[#231c18]">{language === 'ta' ? 'உடை முறை:' : 'Dress Code:'}</strong> {t.dressCodeNote}
          </span>
        </div>
      </div>
    </section>
  );
};
