'use client';

import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

export const Footer: React.FC = () => {
  const { closing, couple } = invitationConfig;

  return (
    <footer className="relative w-full py-16 px-4 bg-gradient-to-t from-black via-[#140407] to-transparent text-center border-t border-gold-500/20">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Monogram Seal */}
        <div className="w-14 h-14 rounded-full border border-gold-400/40 bg-burgundy-950/60 flex items-center justify-center text-gold-300 font-serif font-bold text-xl mb-4 shadow-lg">
          {couple.monogram}
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold gold-gradient-text tracking-wide mb-3">
          {closing.heading}
        </h3>

        <p className="text-xs sm:text-sm text-gold-200/80 leading-relaxed font-sans max-w-lg mb-4">
          {closing.message}
        </p>

        <p className="text-xs text-gold-300/70 font-sans italic mb-6">
          {closing.blessing}
        </p>

        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-500/60 to-transparent mb-6" />

        <p className="font-serif text-base sm:text-lg font-bold text-white tracking-wider">
          {closing.signature}
        </p>

        <div className="mt-8 flex items-center gap-1.5 text-[11px] text-gold-400/50 uppercase tracking-widest font-sans">
          <span>Celebrating Love & Union</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          <span>December 2026</span>
        </div>
      </div>
    </footer>
  );
};
