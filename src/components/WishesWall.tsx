'use client';

import React, { useState, useEffect } from 'react';
import { Heart, MessageSquare, Send, Sparkles, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { Wish } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { CornerOrnaments } from '@/components/CornerOrnaments';

export const WishesWall: React.FC = () => {
  const { language } = useLanguage();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  // Fetch approved wishes from real backend API on mount
  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const res = await fetch('/api/wishes');
        const data = await res.json();
        if (data.success && Array.isArray(data.wishes)) {
          setWishes(data.wishes);
        }
      } catch (err) {
        console.error('Error fetching guest wishes:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishes();

    try {
      const savedLikes = localStorage.getItem('vp_wishes_liked');
      if (savedLikes) {
        setLikedMap(JSON.parse(savedLikes));
      }
    } catch (e) { }
  }, []);

  const handleLike = async (id: string) => {
    const isCurrentlyLiked = Boolean(likedMap[id]);
    const nextState = !isCurrentlyLiked;
    const newLikedMap = { ...likedMap, [id]: nextState };
    setLikedMap(newLikedMap);

    setWishes((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          return {
            ...w,
            likes: Math.max(0, w.likes + (nextState ? 1 : -1)),
          };
        }
        return w;
      })
    );

    try {
      localStorage.setItem('vp_wishes_liked', JSON.stringify(newLikedMap));
      await fetch('/api/wishes/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, increment: nextState }),
      });
    } catch (e) {
      console.error('Failed to update like status:', e);
    }
  };

  const handleAddWish = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitSuccess(false);

    const cleanName = name.trim();
    const cleanMessage = message.trim();
    const cleanRelation = relation.trim() || 'Well-wisher';

    if (cleanName.length < 2) {
      setError(language === 'ta' ? 'தயவுசெய்து தங்கள் பெயரை உள்ளிடவும் (குறைந்தது 2 எழுத்துக்கள்).' : 'Please provide your name (at least 2 characters).');
      return;
    }

    if (cleanMessage.length < 5) {
      setError(language === 'ta' ? 'தயவுசெய்து வாழ்த்துச் செய்தியை உள்ளிடவும் (குறைந்தது 5 எழுத்துக்கள்).' : 'Please write a heartfelt blessing of at least 5 characters.');
      return;
    }

    if (cleanMessage.length > 500) {
      setError(language === 'ta' ? 'வாழ்த்துச் செய்தி 500 எழுத்துகளுக்கு மிகாமல் இருக்க வேண்டும்.' : 'Blessing message cannot exceed 500 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          relation: cleanRelation,
          message: cleanMessage,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit your blessing. Please try again.');
      }

      setWishes((prev) => [data.wish, ...prev]);
      setName('');
      setRelation('');
      setMessage('');
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Error sending blessing.';
      setError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="wishes-section" className="relative w-full py-14 px-4 max-w-4xl mx-auto text-center">
      {/* 11. GUEST BLESSINGS & WISHES HEADER (Strict Rule: English line, then Tamil line, matching size) */}
      <div className="flex flex-col items-center mb-10">
        <span className="text-xs sm:text-sm text-[#8e6c2e] font-semibold uppercase tracking-[0.25em] font-serif block mb-0.5">
          Warm Blessings &amp; Prayers
        </span>
        <span className="text-xs sm:text-sm text-[#8e6c2e] font-semibold font-tamil-serif block mb-3">
          வாழ்த்துகள் &amp; பிரார்த்தனைகள்
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold gold-foil-text tracking-wide mb-1">
          Guest Blessings &amp; Wishes
        </h2>
        <h2 className="font-tamil-heading text-3xl sm:text-4xl md:text-5xl font-bold gold-foil-text tracking-wide">
          உறவினர்கள் &amp; நண்பர்கள் வாழ்த்துகள்
        </h2>

        <div className="ornament-divider text-[#c5a059]/50 font-serif text-sm w-44 mx-auto my-3">
          ❖
        </div>

        <p className="text-xs sm:text-sm text-[#5c534b] font-serif italic max-w-md mb-1">
          Leave your loving prayers, heartfelt blessings, and congratulations for Vallalarasu &amp; Priyanka.
        </p>
        <p className="text-xs sm:text-sm text-[#5c534b] font-tamil max-w-md">
          மணமக்களுக்கான தங்களின் அன்பான வாழ்த்துகளையும் ஆசிகளையும் இங்கு பதிவு செய்யலாம்.
        </p>
      </div>

      {/* Write a Wish Form (Luxury Card) */}
      <form
        onSubmit={handleAddWish}
        className="luxury-card w-full max-w-2xl mx-auto mb-12 p-6 sm:p-8 text-left shadow-xl"
      >
        <CornerOrnaments color="text-[#c5a059]/30" />

        <div className="relative z-10 mb-4 flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#8e6c2e] shrink-0" />
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#231c18]">
              Write a Blessing for the Couple
            </h4>
          </div>
          <h4 className="font-tamil text-sm font-semibold text-[#8e6c2e]">
            மணமக்களுக்கு வாழ்த்துச் செய்தி எழுதுங்கள்
          </h4>
        </div>

        {error && (
          <div className="relative z-10 mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span className="font-tamil">{error}</span>
          </div>
        )}

        {submitSuccess && (
          <div className="relative z-10 mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span className="font-tamil">
              {language === 'ta'
                ? 'நன்றி! தங்களின் அன்பான வாழ்த்து வெற்றிகரமாகப் பதிவு செய்யப்பட்டது.'
                : 'Thank you! Your heartfelt blessing has been shared on the wall.'}
            </span>
          </div>
        )}

        <div className="relative z-10 grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#5c534b] font-semibold mb-1 font-tamil-sans">
              {language === 'ta' ? 'தங்கள் பெயர் *' : 'Your Name *'}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8e6c2e]/60" />
              <input
                type="text"
                required
                placeholder={language === 'ta' ? 'எ.கா: ஆனந்த் & குடும்பத்தினர்' : 'e.g. Anand & Family'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#faf8f4] border border-[#c5a059]/35 focus:border-[#c5a059] focus:outline-none text-[#231c18] text-xs sm:text-sm placeholder:text-[#948a7f] transition-all font-tamil-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#5c534b] font-semibold mb-1 font-tamil-sans">
              {language === 'ta' ? 'உறவுமுறை / ஊர்' : 'Relationship / City'} <span className="text-[#8e6c2e]/60 normal-case">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder={language === 'ta' ? 'எ.கா: குடும்ப நண்பர் • சென்னை' : 'e.g. Family Friend • Chennai'}
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f4] border border-[#c5a059]/35 focus:border-[#c5a059] focus:outline-none text-[#231c18] text-xs sm:text-sm placeholder:text-[#948a7f] transition-all font-tamil-sans"
            />
          </div>
        </div>

        <div className="relative z-10 mb-5">
          <label className="block text-[11px] uppercase tracking-wider text-[#5c534b] font-semibold mb-1 font-tamil-sans">
            {language === 'ta' ? 'தங்களின் நல்வாழ்த்துச் செய்தி *' : 'Your Blessing *'}
          </label>
          <textarea
            required
            rows={3}
            placeholder={
              language === 'ta'
                ? 'மணமக்களுக்கான தங்களின் அன்பான வாழ்த்துக்கள் மற்றும் பிரார்த்தனைகளைப் பகிரவும்...'
                : 'May your journey together be blessed with endless happiness and love...'
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3.5 rounded-xl bg-[#faf8f4] border border-[#c5a059]/35 focus:border-[#c5a059] focus:outline-none text-[#231c18] text-xs sm:text-sm placeholder:text-[#948a7f] transition-all resize-none font-tamil"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="shimmer-sweep relative z-10 px-6 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#e8d29b] to-[#b08b41] text-[#231c18] font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60 font-tamil-sans"
        >
          <Send className="w-3.5 h-3.5 shrink-0" />
          <span>{isSubmitting ? (language === 'ta' ? 'பதிவு செய்யப்படுகிறது...' : 'Posting Blessing...') : (language === 'ta' ? 'வாழ்த்துகளை அனுப்புக' : 'Send Blessing')}</span>
        </button>
      </form>

      {/* Wishes Wall Cards */}
      {isLoading ? (
        <div className="py-12 flex flex-col items-center justify-center gap-3">
          <div className="w-6 h-6 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[#766c62] font-tamil">
            {language === 'ta' ? 'வாழ்த்துகள் பதிவேற்றப்படுகிறது...' : 'Loading loving blessings...'}
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 text-left">
          {wishes.map((w) => {
            const isLiked = Boolean(likedMap[w.id]);
            return (
              <div
                key={w.id}
                className="luxury-card p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div>
                      <h5 className="font-serif font-bold text-[#231c18] text-sm sm:text-base">
                        {w.name}
                      </h5>
                      <span className="text-[10px] text-[#8e6c2e] uppercase tracking-widest font-sans font-medium">
                        {w.relation}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleLike(w.id)}
                      className={`px-2.5 py-1 rounded-full border text-xs flex items-center gap-1.5 transition-all active:scale-95 ${isLiked
                          ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-sm'
                          : 'bg-[#faf8f4] border-[#c5a059]/30 text-[#766c62] hover:text-rose-600 hover:border-rose-300'
                        }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-[#8e6c2e]'
                          }`}
                      />
                      <span className="text-[11px] font-semibold">{w.likes}</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-[#322c27] leading-relaxed font-tamil my-2 italic">
                    "{w.message}"
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#c5a059]/15 flex items-center justify-between text-[10px] text-[#766c62] font-sans">
                  <span>{new Date(w.createdAt).toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1 text-[#8e6c2e]">
                    <Sparkles className="w-3 h-3 text-[#c5a059]" />
                    <span>Blessed</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
