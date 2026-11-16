'use client';

import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

export const MomentsGallery: React.FC = () => {
  const { gallery } = invitationConfig.media;

  const moments = [
    {
      title: 'A Beautiful Beginning',
      caption: 'The moment two journeys intertwined with love and respect',
      category: 'Celebration',
      tag: 'Cherished Moment',
    },
    {
      title: 'Family Blessings',
      caption: 'Surrounded by the warm smiles and prayers of our elders',
      category: 'Tradition',
      tag: 'Sacred Rituals',
    },
    {
      title: 'Together Forever',
      caption: 'Stepping gracefully into a lifetime of shared dreams and happiness',
      category: 'Together',
      tag: 'The Promise',
    },
  ];

  return (
    <section className="relative w-full py-16 px-4 max-w-4xl mx-auto text-center">
      <div className="flex flex-col items-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-champagne-400 font-semibold mb-2">
          Memories &amp; Milestones
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold champagne-gradient-text tracking-wide">
          Cherished Moments
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-champagne-400 to-transparent mt-4 mb-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {moments.map((item, idx) => (
          <div
            key={idx}
            className="group relative p-6 rounded-3xl bg-gradient-to-b from-[#240e3d]/80 to-[#140624]/90 border border-champagne-400/30 backdrop-blur-md shadow-xl hover:border-champagne-400/60 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-champagne-500/15 border border-champagne-400/30 text-champagne-300 font-medium">
                  {item.tag}
                </span>
                <Heart className="w-4 h-4 text-rose-400/60 group-hover:text-rose-400 transition-colors" />
              </div>

              <h4 className="font-serif text-xl font-bold text-white mb-2">
                {item.title}
              </h4>
              <p className="text-xs text-ivory-100/75 leading-relaxed font-sans">
                {item.caption}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-champagne-400/15 flex items-center justify-between text-[11px] text-champagne-400/60">
              <span>Vallalarasu &amp; Priyanka</span>
              <Sparkles className="w-3.5 h-3.5 text-champagne-400/40" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
