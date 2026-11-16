'use client';

import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

export const CoupleIntro: React.FC = () => {
  const { couple, story } = invitationConfig;

  return (
    <section className="relative w-full py-20 px-4 max-w-4xl mx-auto text-center">
      {/* Ornamental Section Header */}
      <div className="flex flex-col items-center mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-champagne-400 font-semibold mb-2">
          Two Souls • One Journey
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold champagne-gradient-text tracking-wide">
          The Bride &amp; Groom
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-champagne-400 to-transparent mt-4 mb-4" />
        <p className="text-sm text-ivory-100/80 max-w-lg font-serif italic">
          "{story.narrative}"
        </p>
      </div>

      {/* Couple Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 text-center">
        {/* GROOM CARD */}
        <div className="p-8 rounded-3xl bg-gradient-to-b from-[#25103f]/75 to-[#160728]/90 border border-champagne-400/35 shadow-xl backdrop-blur-md flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border-2 border-champagne-400/60 bg-[#1e0a35] flex items-center justify-center text-champagne-200 font-serif font-bold text-2xl mb-4 shadow-lg">
            G
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-champagne-400 font-semibold">
            The Groom
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            {couple.groom.fullName}
          </h3>
          <div className="w-12 h-0.5 bg-champagne-400/40 my-3" />
          <p className="text-xs sm:text-sm text-ivory-100/80 font-sans leading-relaxed">
            {couple.groom.parents}
          </p>
          {couple.groom.bio && (
            <p className="text-xs text-champagne-200/70 font-sans italic mt-3">
              "{couple.groom.bio}"
            </p>
          )}
        </div>

        {/* BRIDE CARD */}
        <div className="p-8 rounded-3xl bg-gradient-to-b from-[#25103f]/75 to-[#160728]/90 border border-champagne-400/35 shadow-xl backdrop-blur-md flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border-2 border-champagne-400/60 bg-[#1e0a35] flex items-center justify-center text-champagne-200 font-serif font-bold text-2xl mb-4 shadow-lg">
            P
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-champagne-400 font-semibold">
            The Bride
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            {couple.bride.fullName}
          </h3>
          <div className="w-12 h-0.5 bg-champagne-400/40 my-3" />
          <p className="text-xs sm:text-sm text-ivory-100/80 font-sans leading-relaxed">
            {couple.bride.parents}
          </p>
          {couple.bride.bio && (
            <p className="text-xs text-champagne-200/70 font-sans italic mt-3">
              "{couple.bride.bio}"
            </p>
          )}
        </div>
      </div>

      {/* Chapters / Journey Cards */}
      {story.chapters && story.chapters.length > 0 && (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {story.chapters.map((chap, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#1e0a35]/60 border border-champagne-400/25 backdrop-blur-sm"
            >
              <span className="text-[10px] uppercase tracking-widest text-champagne-400/80 font-semibold block mb-1">
                {chap.label}
              </span>
              <h4 className="font-serif text-base font-bold text-white mb-1">
                {chap.title}
              </h4>
              <p className="text-xs text-ivory-100/75 leading-relaxed font-sans">
                {chap.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
