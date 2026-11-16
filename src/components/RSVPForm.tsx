'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Heart, Send, Sparkles, User, Phone, Users, MessageSquare, Edit3, Share2 } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

interface RSVPData {
  name: string;
  phone: string;
  attending: 'yes' | 'no';
  guestsCount: number;
  message: string;
  submittedAt: string;
}

export const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    attending: 'yes' as 'yes' | 'no',
    guestsCount: 2,
    message: '',
  });

  const [submittedRSVP, setSubmittedRSVP] = useState<RSVPData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Load existing RSVP from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('engagement_rsvp_data');
      if (saved) {
        setSubmittedRSVP(JSON.parse(saved));
      }
    } catch (e) {
      // LocalStorage not available or parse error
    }
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#e3c67c', '#be123c', '#ffffff'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#d4af37', '#f43f5e', '#ffd700'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#d4af37', '#f43f5e', '#ffd700'],
        });
      }, 250);
    } catch (err) {
      // Non-blocking
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Please provide your full name');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setError('Please provide a valid phone or WhatsApp number');
      return;
    }

    setIsSubmitting(true);

    const submission: RSVPData = {
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    setTimeout(() => {
      try {
        localStorage.setItem('engagement_rsvp_data', JSON.stringify(submission));
      } catch (err) {
        // LocalStorage fallback
      }
      setSubmittedRSVP(submission);
      setIsSubmitting(false);
      triggerConfetti();
    }, 600);
  };

  const handleEdit = () => {
    if (submittedRSVP) {
      setFormData({
        name: submittedRSVP.name,
        phone: submittedRSVP.phone,
        attending: submittedRSVP.attending,
        guestsCount: submittedRSVP.guestsCount,
        message: submittedRSVP.message,
      });
    }
    setSubmittedRSVP(null);
  };

  const handleShareWhatsApp = () => {
    if (!submittedRSVP) return;
    const text = encodeURIComponent(
      `✨ *RSVP Confirmation for Engagement Ceremony*\n` +
      `Couple: ${invitationConfig.couple.groom.fullName} & ${invitationConfig.couple.bride.fullName}\n` +
      `Date: Sunday, 13th December 2026 (6:00 PM - 9:00 PM)\n` +
      `Venue: RSM Banquet Hall, Triplicane, Chennai\n\n` +
      `Guest Name: ${submittedRSVP.name}\n` +
      `Attending: ${submittedRSVP.attending === 'yes' ? 'Joyfully Attending ✅' : 'Regretfully Unable to Attend ❌'}\n` +
      `Number of Guests: ${submittedRSVP.guestsCount}\n` +
      (submittedRSVP.message ? `Message: "${submittedRSVP.message}"\n\n` : `\n`) +
      `Looking forward to celebrating with you!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section id="rsvp-section" className="relative w-full py-20 px-4 max-w-3xl mx-auto text-center">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-2">
          Your Presence is Our Honor
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold gold-gradient-text tracking-wide">
          Kindly RSVP
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mt-4 mb-4" />
        <p className="text-sm text-gold-200/80 max-w-md">
          Please confirm your attendance by letting us know if you can join us for this joyous occasion.
        </p>
      </div>

      {submittedRSVP ? (
        /* CONFIRMATION PASS / TICKET */
        <div className="w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#240a11] via-[#1a060d] to-[#100306] border-2 border-gold-500/60 shadow-2xl p-6 sm:p-10 text-center animate-subtle-float">
          <div className="w-16 h-16 rounded-full bg-gold-500/20 border-2 border-gold-400 mx-auto flex items-center justify-center text-gold-300 shadow-lg mb-4">
            <CheckCircle2 className="w-8 h-8 text-gold-400" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold">
            RSVP Confirmed
          </span>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Thank You, {submittedRSVP.name}!
          </h3>

          <p className="text-sm text-gold-200/80 mt-2 max-w-md mx-auto">
            {submittedRSVP.attending === 'yes'
              ? 'Your response has been warmly received! We are overjoyed to celebrate our special day with you.'
              : 'Thank you for letting us know. Your warm blessings are deeply cherished by the couple and our families.'}
          </p>

          {/* Ticket Details Pill */}
          <div className="my-8 p-5 rounded-2xl bg-black/50 border border-gold-500/30 flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm text-gold-100">
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-gold-400/80">
                Attendance
              </span>
              <span className="font-semibold text-emerald-400">
                {submittedRSVP.attending === 'yes' ? 'Attending' : 'Decline with Love'}
              </span>
            </div>

            <div className="w-px h-8 bg-gold-500/30 hidden sm:block" />

            <div>
              <span className="block text-[10px] uppercase tracking-widest text-gold-400/80">
                Guests Count
              </span>
              <span className="font-semibold text-white">
                {submittedRSVP.guestsCount} {submittedRSVP.guestsCount === 1 ? 'Guest' : 'Guests'}
              </span>
            </div>

            <div className="w-px h-8 bg-gold-500/30 hidden sm:block" />

            <div>
              <span className="block text-[10px] uppercase tracking-widest text-gold-400/80">
                Date & Venue
              </span>
              <span className="font-semibold text-white">
                13 Dec 2026 • RSM Hall
              </span>
            </div>
          </div>

          {submittedRSVP.message && (
            <div className="mb-8 p-4 rounded-xl bg-gold-500/10 border border-gold-500/20 italic text-xs sm:text-sm text-gold-200/90 max-w-md mx-auto">
              "{submittedRSVP.message}"
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleShareWhatsApp}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-wider text-xs uppercase shadow-lg transition-all flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share RSVP on WhatsApp</span>
            </button>

            <button
              onClick={handleEdit}
              className="px-5 py-3 rounded-xl bg-black/40 hover:bg-gold-500/10 border border-gold-400/40 text-gold-300 font-medium text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>Update RSVP</span>
            </button>
          </div>
        </div>
      ) : (
        /* INTERACTIVE RSVP FORM */
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-3xl bg-gradient-to-b from-[#22090f] to-[#120407] border border-gold-500/40 shadow-2xl p-6 sm:p-10 text-left"
        >
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-900/50 border border-rose-500/50 text-rose-200 text-xs sm:text-sm font-medium">
              {error}
            </div>
          )}

          {/* Attendance Selection */}
          <div className="mb-8">
            <label className="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-3">
              Will you be joining us? *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, attending: 'yes' }))}
                className={`p-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2.5 ${
                  formData.attending === 'yes'
                    ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-burgundy-950 border-gold-300 shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                    : 'bg-black/40 border-gold-500/30 text-gold-200/80 hover:border-gold-400/50'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Joyfully Accept</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, attending: 'no' }))}
                className={`p-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2.5 ${
                  formData.attending === 'no'
                    ? 'bg-rose-900/80 text-rose-100 border-rose-400 shadow-lg'
                    : 'bg-black/40 border-gold-500/30 text-gold-200/80 hover:border-gold-400/50'
                }`}
              >
                <span>Regretfully Decline</span>
              </button>
            </div>
          </div>

          {/* Name & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-2">
                Your Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/60" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-gold-500/30 focus:border-gold-400 focus:outline-none text-white text-sm placeholder:text-gold-300/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-2">
                Phone / WhatsApp Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/60" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-gold-500/30 focus:border-gold-400 focus:outline-none text-white text-sm placeholder:text-gold-300/30 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Number of Guests (only if attending) */}
          {formData.attending === 'yes' && (
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-2">
                Number of Guests Attending (including yourself)
              </label>
              <div className="flex flex-wrap gap-2.5">
                {[1, 2, 3, 4, 5].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, guestsCount: count }))}
                    className={`flex-1 py-2.5 px-3 rounded-xl border text-sm font-semibold transition-all ${
                      formData.guestsCount === count
                        ? 'bg-gold-500 text-burgundy-950 border-gold-300 shadow-md'
                        : 'bg-black/50 border-gold-500/30 text-gold-200 hover:border-gold-400/50'
                    }`}
                  >
                    {count === 5 ? '5+ Guests' : `${count} ${count === 1 ? 'Guest' : 'Guests'}`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Warm Message / Blessing */}
          <div className="mb-8">
            <label className="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-2">
              Blessings & Wishes for the Couple (Optional)
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gold-400/60" />
              <textarea
                rows={3}
                placeholder="Write a sweet congratulatory note or blessing..."
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-gold-500/30 focus:border-gold-400 focus:outline-none text-white text-sm placeholder:text-gold-300/30 transition-all resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 text-burgundy-950 font-bold tracking-wider uppercase text-sm shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.8)] hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-burgundy-950 border-t-transparent rounded-full animate-spin" />
                <span>Confirming RSVP...</span>
              </span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit RSVP</span>
                <Sparkles className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </section>
  );
};
