'use client';

import React, { useState, useEffect } from 'react';
import { Heart, MessageSquare, Send, Sparkles, User } from 'lucide-react';
import { Wish } from '@/types';

const INITIAL_WISHES: Wish[] = [
  {
    id: 'wish-1',
    name: 'V. Gnanasekar & G. Meena',
    relation: "Groom's Parents",
    message: 'May Almighty shower Vallalarasu & Priyanka with boundless love, wisdom, peace, and eternal happiness together.',
    likes: 28,
    createdAt: '2026-11-14T10:00:00Z',
  },
  {
    id: 'wish-2',
    name: 'Kabali & K. Sumathy',
    relation: "Bride's Parents",
    message: 'Wishing our beloved Priyanka and dear Vallalarasu a lifetime of harmonious companionship, shared dreams, and joyful laughter.',
    likes: 31,
    createdAt: '2026-11-14T11:30:00Z',
  },
  {
    id: 'wish-3',
    name: 'Friends & Cousins',
    relation: 'Family & Well-wishers',
    message: 'Heartiest congratulations to the wonderful couple! Excited to celebrate the engagement on December 13th!',
    likes: 19,
    createdAt: '2026-11-15T09:15:00Z',
  },
];

export const WishesWall: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const savedWishes = localStorage.getItem('engagement_wishes');
      if (savedWishes) {
        setWishes(JSON.parse(savedWishes));
      }
      const savedLikes = localStorage.getItem('engagement_wishes_likes');
      if (savedLikes) {
        setLikedMap(JSON.parse(savedLikes));
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  const handleLike = (id: string) => {
    const isCurrentlyLiked = likedMap[id];
    const newLikedMap = { ...likedMap, [id]: !isCurrentlyLiked };
    setLikedMap(newLikedMap);

    const updated = wishes.map((w) => {
      if (w.id === id) {
        return {
          ...w,
          likes: isCurrentlyLiked ? Math.max(0, w.likes - 1) : w.likes + 1,
        };
      }
      return w;
    });

    setWishes(updated);
    try {
      localStorage.setItem('engagement_wishes', JSON.stringify(updated));
      localStorage.setItem('engagement_wishes_likes', JSON.stringify(newLikedMap));
    } catch (e) {}
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Wish = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      relation: 'Well-wisher',
      message: message.trim(),
      likes: 1,
      createdAt: new Date().toISOString(),
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    setName('');
    setMessage('');

    try {
      localStorage.setItem('engagement_wishes', JSON.stringify(updated));
      const newLikedMap = { ...likedMap, [newWish.id]: true };
      setLikedMap(newLikedMap);
      localStorage.setItem('engagement_wishes_likes', JSON.stringify(newLikedMap));
    } catch (e) {}
  };

  return (
    <section className="relative w-full py-20 px-4 max-w-4xl mx-auto text-center">
      <div className="flex flex-col items-center mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-2">
          Blessings & Love
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold gold-gradient-text tracking-wide">
          Wishes for the Couple
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mt-4 mb-4" />
        <p className="text-sm text-gold-200/80 max-w-md">
          Leave your loving blessings and heartfelt congratulatory wishes for Vallalarasu & Priyanka.
        </p>
      </div>

      {/* Write a Wish Box */}
      <form
        onSubmit={handleAddWish}
        className="w-full max-w-2xl mx-auto mb-12 p-6 rounded-2xl bg-black/40 border border-gold-500/30 backdrop-blur-md shadow-xl text-left"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-gold-300 font-semibold mb-1">
              Your Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh & Family"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-gold-500/30 focus:border-gold-400 focus:outline-none text-white text-xs sm:text-sm placeholder:text-gold-300/30 transition-all"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[11px] uppercase tracking-wider text-gold-300 font-semibold mb-1">
            Your Blessing / Message
          </label>
          <textarea
            rows={2}
            required
            placeholder="Share your prayers, love, or wishes for their new journey..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-gold-500/30 focus:border-gold-400 focus:outline-none text-white text-xs sm:text-sm placeholder:text-gold-300/30 transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 text-burgundy-950 font-bold tracking-wider uppercase text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Post Blessing</span>
          <Sparkles className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Wishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        {wishes.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-gradient-to-br from-[#20090e]/70 to-black/80 border border-gold-500/30 backdrop-blur-md shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-serif font-bold text-white text-base">
                  {item.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold-500/10 border border-gold-400/20 text-gold-300">
                  {item.relation}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gold-200/90 leading-relaxed font-sans italic">
                "{item.message}"
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gold-500/15 flex items-center justify-between text-xs text-gold-400/60">
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
              <button
                type="button"
                onClick={() => handleLike(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors ${
                  likedMap[item.id]
                    ? 'text-rose-400 bg-rose-500/10'
                    : 'text-gold-400/60 hover:text-gold-200'
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    likedMap[item.id] ? 'fill-rose-400 text-rose-400' : ''
                  }`}
                />
                <span className="font-medium text-xs">{item.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
