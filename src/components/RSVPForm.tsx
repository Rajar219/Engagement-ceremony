'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Send,
  Sparkles,
  User,
  Phone,
  Mail,
  Users,
  MessageSquare,
  Edit3,
  Share2,
  AlertCircle,
  CalendarCheck,
} from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

interface RSVPResponseData {
  id: string;
  fullName: string;
  attendance: 'both' | 'engagement' | 'wedding' | 'declined';
  attendingEngagement: boolean;
  attendingWedding: boolean;
  guestCount: number;
  submittedAt: string;
}

export const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    attendance: 'both' as 'both' | 'engagement' | 'wedding' | 'declined',
    attendingEngagement: true,
    attendingWedding: true,
    guestCount: 2,
    message: '',
  });

  const [submittedRSVP, setSubmittedRSVP] = useState<RSVPResponseData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore saved RSVP on page load
  useEffect(() => {
    try {
      const saved = localStorage.getItem('vp_rsvp_record');
      if (saved) {
        setSubmittedRSVP(JSON.parse(saved));
      }
    } catch (e) {
      // LocalStorage not available or parse error
    }
  }, []);

  // Update boolean flags whenever attendance radio/button changes
  const handleAttendanceChange = (type: 'both' | 'engagement' | 'wedding' | 'declined') => {
    setFormData((prev) => ({
      ...prev,
      attendance: type,
      attendingEngagement: type === 'both' || type === 'engagement',
      attendingWedding: type === 'both' || type === 'wedding',
      guestCount: type === 'declined' ? 0 : Math.max(1, prev.guestCount || 1),
    }));
  };

  const triggerCelebrationConfetti = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#e8daf5', '#bc95e0', '#ffffff', '#b89228'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#d4af37', '#bc95e0', '#f6ecd5'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#d4af37', '#bc95e0', '#f6ecd5'],
        });
      }, 200);
    } catch (err) {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Client-side Validation
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setError('Please provide your full name (at least 2 characters).');
      return;
    }

    const cleanMobile = formData.mobileNumber.replace(/[\s\-\(\)]/g, '');
    if (!cleanMobile || cleanMobile.length < 8 || !/^\+?[0-9]{8,15}$/.test(cleanMobile)) {
      setError('Please enter a valid mobile number with at least 8 digits.');
      return;
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        setError('Please enter a valid email address.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // 2. Real Backend Database API Call
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          mobileNumber: cleanMobile,
          email: formData.email.trim() || undefined,
          attendance: formData.attendance,
          attendingEngagement: formData.attendingEngagement,
          attendingWedding: formData.attendingWedding,
          guestCount: formData.attendance === 'declined' ? 0 : Number(formData.guestCount),
          message: formData.message.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit RSVP. Please check your information and try again.');
      }

      // 3. Confirm Save Succeeded & Update UI
      const result: RSVPResponseData = data.rsvp;
      setSubmittedRSVP(result);
      try {
        localStorage.setItem('vp_rsvp_record', JSON.stringify(result));
      } catch (e) {}

      triggerCelebrationConfetti();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred while saving your RSVP.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditRSVP = () => {
    if (submittedRSVP) {
      setFormData({
        fullName: submittedRSVP.fullName,
        mobileNumber: formData.mobileNumber,
        email: formData.email,
        attendance: submittedRSVP.attendance,
        attendingEngagement: submittedRSVP.attendingEngagement,
        attendingWedding: submittedRSVP.attendingWedding,
        guestCount: submittedRSVP.guestCount || 2,
        message: formData.message,
      });
    }
    setSubmittedRSVP(null);
  };

  const handleShareWhatsApp = () => {
    if (!submittedRSVP) return;
    const attendanceText =
      submittedRSVP.attendance === 'both'
        ? 'Attending Both Engagement & Wedding 🎉'
        : submittedRSVP.attendance === 'engagement'
        ? 'Attending Engagement Ceremony (13 Dec) 💍'
        : submittedRSVP.attendance === 'wedding'
        ? 'Attending Wedding Ceremony 💒'
        : 'Warm Blessings (Unable to Attend) ❤️';

    const text = encodeURIComponent(
      `✨ *RSVP Confirmation for V&P Celebrations*\n` +
      `Couple: ${invitationConfig.couple.groom.fullName} & ${invitationConfig.couple.bride.fullName}\n\n` +
      `Guest Name: ${submittedRSVP.fullName}\n` +
      `Status: ${attendanceText}\n` +
      (submittedRSVP.attendance !== 'declined' ? `Number of Guests: ${submittedRSVP.guestCount}\n` : '') +
      `\nLooking forward to celebrating with you!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section id="rsvp-section" className="relative w-full py-20 px-4 max-w-3xl mx-auto text-center">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-champagne-400 font-semibold mb-2">
          Your Presence is Our Honor
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold champagne-gradient-text tracking-wide">
          Kindly RSVP
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-champagne-400 to-transparent mt-4 mb-4" />
        <p className="text-xs sm:text-sm text-ivory-100/80 max-w-md font-sans">
          Please let us know if you will be celebrating with us so we can arrange every detail for your gracious comfort.
        </p>
      </div>

      {submittedRSVP ? (
        /* RSVP CONFIRMATION SUCCESS CARD */
        <div className="w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#281144]/90 via-[#1c0a32]/95 to-[#12051e] border-2 border-champagne-400/60 shadow-2xl p-6 sm:p-10 text-center backdrop-blur-md animate-subtle-float">
          <div className="w-16 h-16 rounded-full bg-champagne-500/20 border-2 border-champagne-400 mx-auto flex items-center justify-center text-champagne-300 shadow-lg mb-4">
            <CheckCircle2 className="w-8 h-8 text-champagne-400" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-champagne-400 font-semibold">
            RSVP Confirmed
          </span>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Thank You for Being Part of Our Special Celebration
          </h3>

          <p className="text-xs sm:text-sm text-ivory-100/80 mt-2 max-w-md mx-auto">
            Dear <span className="font-bold text-white">{submittedRSVP.fullName}</span>, your confirmation has been recorded.
          </p>

          {/* Details Card */}
          <div className="my-8 p-5 rounded-2xl bg-[#140624]/70 border border-champagne-400/30 flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm text-ivory-100">
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-champagne-400/80">
                Attendance
              </span>
              <span className="font-semibold text-champagne-200">
                {submittedRSVP.attendance === 'both'
                  ? 'Engagement & Wedding'
                  : submittedRSVP.attendance === 'engagement'
                  ? 'Engagement Ceremony'
                  : submittedRSVP.attendance === 'wedding'
                  ? 'Wedding Ceremony'
                  : 'Declined with Blessings'}
              </span>
            </div>

            {submittedRSVP.attendance !== 'declined' && (
              <>
                <div className="w-px h-8 bg-champagne-500/30 hidden sm:block" />
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-champagne-400/80">
                    Confirmed Guests
                  </span>
                  <span className="font-semibold text-white">
                    {submittedRSVP.guestCount} {submittedRSVP.guestCount === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
              </>
            )}

            <div className="w-px h-8 bg-champagne-500/30 hidden sm:block" />
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-champagne-400/80">
                Engagement Date
              </span>
              <span className="font-semibold text-white">
                13 Dec 2026 • 6 PM
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleShareWhatsApp}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-wider text-xs uppercase shadow-lg transition-all flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share RSVP on WhatsApp</span>
            </button>

            <button
              onClick={handleEditRSVP}
              className="px-5 py-3 rounded-xl bg-[#140624]/60 hover:bg-champagne-500/10 border border-champagne-400/40 text-champagne-300 font-medium text-xs uppercase tracking-wider transition-all flex items-center gap-2"
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
          className="w-full rounded-3xl bg-gradient-to-b from-[#260f3f]/90 via-[#1a082c]/95 to-[#12051e] border border-champagne-400/40 shadow-2xl p-6 sm:p-10 text-left backdrop-blur-md"
        >
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs sm:text-sm font-medium flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Attendance Selection (Engagement, Wedding, Both, Unable) */}
          <div className="mb-8">
            <label className="block text-xs uppercase tracking-wider text-champagne-300 font-semibold mb-3">
              Will you be attending the celebrations? *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option 1: Both Events */}
              <button
                type="button"
                onClick={() => handleAttendanceChange('both')}
                className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-start gap-3 ${
                  formData.attendance === 'both'
                    ? 'bg-gradient-to-r from-champagne-500 to-champagne-600 text-[#18072d] border-champagne-300 shadow-[0_0_20px_rgba(212,175,55,0.45)]'
                    : 'bg-[#140624]/60 border-champagne-400/30 text-ivory-100 hover:border-champagne-400/60'
                }`}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <div className="text-left">
                  <span className="block font-bold">Both Events</span>
                  <span className="text-[11px] opacity-80 font-normal">Engagement &amp; Wedding</span>
                </div>
              </button>

              {/* Option 2: Engagement Only */}
              <button
                type="button"
                onClick={() => handleAttendanceChange('engagement')}
                className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-start gap-3 ${
                  formData.attendance === 'engagement'
                    ? 'bg-gradient-to-r from-champagne-500 to-champagne-600 text-[#18072d] border-champagne-300 shadow-[0_0_20px_rgba(212,175,55,0.45)]'
                    : 'bg-[#140624]/60 border-champagne-400/30 text-ivory-100 hover:border-champagne-400/60'
                }`}
              >
                <CalendarCheck className="w-4 h-4 shrink-0" />
                <div className="text-left">
                  <span className="block font-bold">Engagement Only</span>
                  <span className="text-[11px] opacity-80 font-normal">13th December 2026</span>
                </div>
              </button>

              {/* Option 3: Wedding Only */}
              <button
                type="button"
                onClick={() => handleAttendanceChange('wedding')}
                className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-start gap-3 ${
                  formData.attendance === 'wedding'
                    ? 'bg-gradient-to-r from-champagne-500 to-champagne-600 text-[#18072d] border-champagne-300 shadow-[0_0_20px_rgba(212,175,55,0.45)]'
                    : 'bg-[#140624]/60 border-champagne-400/30 text-ivory-100 hover:border-champagne-400/60'
                }`}
              >
                <CalendarCheck className="w-4 h-4 shrink-0" />
                <div className="text-left">
                  <span className="block font-bold">Wedding Only</span>
                  <span className="text-[11px] opacity-80 font-normal">Holy Matrimony</span>
                </div>
              </button>

              {/* Option 4: Unable to Attend */}
              <button
                type="button"
                onClick={() => handleAttendanceChange('declined')}
                className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-start gap-3 ${
                  formData.attendance === 'declined'
                    ? 'bg-rose-950/90 text-rose-100 border-rose-400 shadow-lg'
                    : 'bg-[#140624]/60 border-champagne-400/30 text-ivory-100 hover:border-champagne-400/60'
                }`}
              >
                <span className="text-base">💌</span>
                <div className="text-left">
                  <span className="block font-bold">Unable to Attend</span>
                  <span className="text-[11px] opacity-80 font-normal">Sending warm blessings</span>
                </div>
              </button>
            </div>
          </div>

          {/* Guest Information: Name, Mobile, Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-champagne-300 font-semibold mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-champagne-400/70" />
                <input
                  type="text"
                  required
                  placeholder="Your Name (e.g. Anand Kumar)"
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#140624]/80 border border-champagne-400/30 focus:border-champagne-400 focus:outline-none text-white text-xs sm:text-sm placeholder:text-champagne-400/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-champagne-300 font-semibold mb-2">
                Mobile / WhatsApp Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-champagne-400/70" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, mobileNumber: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#140624]/80 border border-champagne-400/30 focus:border-champagne-400 focus:outline-none text-white text-xs sm:text-sm placeholder:text-champagne-400/30 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-xs uppercase tracking-wider text-champagne-300 font-semibold mb-2">
              Email Address <span className="text-champagne-400/50 normal-case">(Optional)</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-champagne-400/70" />
              <input
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#140624]/80 border border-champagne-400/30 focus:border-champagne-400 focus:outline-none text-white text-xs sm:text-sm placeholder:text-champagne-400/30 transition-all"
              />
            </div>
          </div>

          {/* Conditional: Number of Guests (Only if attending) */}
          {formData.attendance !== 'declined' && (
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-wider text-champagne-300 font-semibold mb-2">
                Total Number of Guests Attending (including yourself)
              </label>
              <div className="flex flex-wrap gap-2.5">
                {[1, 2, 3, 4, 5].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, guestCount: count }))}
                    className={`flex-1 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                      formData.guestCount === count
                        ? 'bg-champagne-500 text-[#18072d] border-champagne-300 shadow-md'
                        : 'bg-[#140624]/60 border-champagne-400/30 text-ivory-100 hover:border-champagne-400/60'
                    }`}
                  >
                    {count === 5 ? '5+ Guests' : `${count} ${count === 1 ? 'Guest' : 'Guests'}`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message / Blessing */}
          <div className="mb-8">
            <label className="block text-xs uppercase tracking-wider text-champagne-300 font-semibold mb-2">
              Blessings &amp; Message for Vallalarasu &amp; Priyanka (Optional)
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-champagne-400/70" />
              <textarea
                rows={3}
                placeholder="Share your warm prayers, heartfelt blessings, or special wishes..."
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#140624]/80 border border-champagne-400/30 focus:border-champagne-400 focus:outline-none text-white text-xs sm:text-sm placeholder:text-champagne-400/30 transition-all resize-none"
              />
            </div>
          </div>

          {/* Submit Button with Loading State */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-champagne-500 via-champagne-400 to-champagne-600 text-[#18072d] font-bold tracking-wider uppercase text-xs sm:text-sm shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#18072d] border-t-transparent rounded-full animate-spin" />
                <span>Saving Your RSVP...</span>
              </span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Confirm &amp; Submit RSVP</span>
                <Sparkles className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </section>
  );
};
