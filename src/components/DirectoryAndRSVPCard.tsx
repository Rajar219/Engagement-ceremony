'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Send,
  Sparkles,
  User,
  Phone,
  Users,
  MessageSquare,
  Heart,
  Share2,
  Edit3,
  AlertCircle,
  CalendarCheck,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { CornerOrnaments } from '@/components/CornerOrnaments';

interface RSVPResponseData {
  id: string;
  fullName: string;
  attendance: 'both' | 'engagement' | 'wedding' | 'declined';
  attendingEngagement: boolean;
  attendingWedding: boolean;
  guestCount: number;
  submittedAt: string;
}

export const DirectoryAndRSVPCard: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    attendance: 'both' as 'both' | 'engagement' | 'wedding' | 'declined',
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
    } catch (e) {}
  }, []);

  const handleAttendanceChange = (type: 'both' | 'engagement' | 'wedding' | 'declined') => {
    setFormData((prev) => ({
      ...prev,
      attendance: type,
      guestCount: type === 'declined' ? 0 : Math.max(1, prev.guestCount || 1),
    }));
  };

  const triggerCelebrationConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#e8daf5', '#bc95e0', '#ffffff', '#b89228'],
      });
    } catch (err) {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation 1: Name required
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setError(language === 'ta' ? 'தயவுசெய்து தங்கள் முழுப் பெயரை உள்ளிடவும்.' : 'Please enter your full name.');
      return;
    }

    // Validation 2: Indian mobile number format
    const cleanedPhone = formData.mobileNumber.replace(/[\s\-\(\)\+]/g, '');
    const indianMobileRegex = /^(?:91)?[6-9]\d{9}$/;
    if (!indianMobileRegex.test(cleanedPhone)) {
      setError(
        language === 'ta'
          ? 'தயவுசெய்து சரியான 10 இலக்க இந்திய அலைபேசி எண்ணை உள்ளிடவும் (எ.கா: 9876543210).'
          : 'Please enter a valid 10-digit Indian mobile number (e.g., 9876543210).'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: formData.mobileNumber.trim(),
          attendance: formData.attendance,
          attendingEngagement: formData.attendance === 'both' || formData.attendance === 'engagement',
          attendingWedding: formData.attendance === 'both' || formData.attendance === 'wedding',
          guestCount: formData.attendance === 'declined' ? 0 : formData.guestCount,
          message: formData.message.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit RSVP');

      const savedRecord: RSVPResponseData = {
        id: data.data?.id || `rsvp_${Date.now()}`,
        fullName: formData.fullName.trim(),
        attendance: formData.attendance,
        attendingEngagement: formData.attendance === 'both' || formData.attendance === 'engagement',
        attendingWedding: formData.attendance === 'both' || formData.attendance === 'wedding',
        guestCount: formData.attendance === 'declined' ? 0 : formData.guestCount,
        submittedAt: new Date().toISOString(),
      };

      setSubmittedRSVP(savedRecord);
      localStorage.setItem('vp_rsvp_record', JSON.stringify(savedRecord));
      triggerCelebrationConfetti();
    } catch (err: any) {
      const fallbackRecord: RSVPResponseData = {
        id: `local_${Date.now()}`,
        fullName: formData.fullName.trim(),
        attendance: formData.attendance,
        attendingEngagement: formData.attendance === 'both' || formData.attendance === 'engagement',
        attendingWedding: formData.attendance === 'both' || formData.attendance === 'wedding',
        guestCount: formData.attendance === 'declined' ? 0 : formData.guestCount,
        submittedAt: new Date().toISOString(),
      };

      setSubmittedRSVP(fallbackRecord);
      localStorage.setItem('vp_rsvp_record', JSON.stringify(fallbackRecord));
      triggerCelebrationConfetti();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditRSVP = () => {
    if (submittedRSVP) {
      setFormData((prev) => ({
        ...prev,
        fullName: submittedRSVP.fullName,
        attendance: submittedRSVP.attendance,
        guestCount: submittedRSVP.guestCount,
      }));
    }
    setSubmittedRSVP(null);
  };

  const handleShareWhatsApp = () => {
    if (!submittedRSVP) return;
    const attendanceText =
      submittedRSVP.attendance === 'both'
        ? 'Both Events (Engagement & Wedding)'
        : submittedRSVP.attendance === 'engagement'
        ? 'Engagement Only'
        : submittedRSVP.attendance === 'wedding'
        ? 'Wedding Only'
        : 'Unable to Attend (Warm Wishes)';

    const text = encodeURIComponent(
      `💐 RSVP Confirmation for Vallalarasu & Priyanka Engagement!\n\n` +
      `Guest: ${submittedRSVP.fullName}\n` +
      `Status: ${attendanceText}\n` +
      (submittedRSVP.attendance !== 'declined' ? `Number of Guests: ${submittedRSVP.guestCount}\n` : '') +
      `\nLooking forward to celebrating together!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section id="directory-rsvp-section" className="relative w-full py-8 px-4 max-w-3xl mx-auto text-center space-y-10">
      {/* 1. DIRECTORY CARD: "With Best Compliments From • அன்புடன் அழைக்கும்" */}
      <div className="luxury-card p-6 sm:p-10 shadow-xl overflow-hidden backdrop-blur-md text-left">
        <CornerOrnaments />

        <div className="relative z-10 text-center mb-6">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#a88136] font-semibold block font-tamil-serif mb-1.5">
            Cordially Welcoming You • இல்லத்தார் வரவேற்பு
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold gold-foil-text tracking-wide">
            {t.directoryCardTitle}
          </h2>

          <div className="ornament-divider text-[#c5a059]/50 font-serif text-sm my-4">
            ❖
          </div>
        </div>

        {/* 2-Column Key-Value Directory Rows */}
        <div className="relative z-10 space-y-3.5">
          {/* Row 1: Groom's Family */}
          <div className="p-4 rounded-2xl bg-[#faf8f4] border border-[#c5a059]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-1 shadow-sm">
            <span className="text-xs sm:text-sm font-serif font-bold text-[#231c18] tracking-wide font-tamil-serif">
              {t.dirGroomFamilyLabel}
            </span>
            <span className="text-xs sm:text-sm text-[#5a4a42] font-tamil">
              {t.dirGroomFamilyValue}
            </span>
          </div>

          {/* Row 2: Bride's Family */}
          <div className="p-4 rounded-2xl bg-[#faf8f4] border border-[#c5a059]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-1 shadow-sm">
            <span className="text-xs sm:text-sm font-serif font-bold text-[#231c18] tracking-wide font-tamil-serif">
              {t.dirBrideFamilyLabel}
            </span>
            <span className="text-xs sm:text-sm text-[#5a4a42] font-tamil">
              {t.dirBrideFamilyValue}
            </span>
          </div>

          {/* Row 3: Relatives & Friends */}
          <div className="p-4 rounded-2xl bg-[#faf8f4] border border-[#c5a059]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-1 shadow-sm">
            <span className="text-xs sm:text-sm font-serif font-bold text-[#231c18] tracking-wide font-tamil-serif">
              {t.dirRelativesLabel}
            </span>
            <span className="text-xs sm:text-sm text-[#5a4a42] font-tamil">
              {t.dirRelativesValue}
            </span>
          </div>
        </div>
      </div>

      {/* 2. RSVP FORM CARD (#rsvp-section) */}
      <div id="rsvp-section" className="luxury-dark-card p-6 sm:p-10 shadow-2xl overflow-hidden backdrop-blur-md text-left">
        <CornerOrnaments />

        <div className="relative z-10 text-center mb-6">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a059] font-semibold block font-tamil-serif mb-1.5">
            Your Presence • தங்களின் நல்வரவு
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold gold-foil-text tracking-wide">
            {t.rsvpHeading}
          </h2>
          <p className="text-xs sm:text-sm text-[#d4c3b3] font-tamil max-w-md mx-auto mt-2">
            {t.rsvpSubheading}
          </p>

          <div className="ornament-divider text-[#c5a059]/50 font-serif text-sm my-4">
            ❖
          </div>
        </div>

        {submittedRSVP ? (
          /* RSVP Confirmed Card */
          <div className="relative z-10 p-6 rounded-2xl bg-[#2a221c]/90 border border-[#c5a059]/40 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#c5a059]/20 border border-[#c5a059] mx-auto flex items-center justify-center text-[#c5a059]">
              <CheckCircle2 className="w-7 h-7 text-[#c5a059]" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              {t.rsvpSuccessTitle}
            </h3>

            <p className="text-xs sm:text-sm text-[#d4c3b3] font-tamil max-w-md mx-auto">
              {t.rsvpSuccessDesc}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleEditRSVP}
                className="px-5 py-2.5 rounded-xl bg-[#1c1613] hover:bg-[#c5a059]/15 border border-[#c5a059]/35 text-[#e5d5be] font-medium text-xs uppercase tracking-wider flex items-center gap-2 active:scale-95"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{language === 'ta' ? 'மாற்றம் செய்க' : 'Update RSVP'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Interactive RSVP Form */
          <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span className="font-tamil">{error}</span>
              </div>
            )}

            {/* Attendance Choice */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#c5a059] font-semibold mb-2.5 font-tamil-sans">
                {t.rsvpPrompt}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleAttendanceChange('both')}
                  className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 ${
                    formData.attendance === 'both'
                      ? 'bg-gradient-to-r from-[#b08b41] via-[#c5a059] to-[#99732f] text-[#1c1613] border-[#f4e8c8] shadow-md'
                      : 'bg-[#2a221c]/80 border-[#c5a059]/25 text-[#fcfaf6] hover:border-[#c5a059]/50'
                  }`}
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span className="font-tamil-sans">{t.optBoth}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAttendanceChange('engagement')}
                  className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 ${
                    formData.attendance === 'engagement'
                      ? 'bg-gradient-to-r from-[#b08b41] via-[#c5a059] to-[#99732f] text-[#1c1613] border-[#f4e8c8] shadow-md'
                      : 'bg-[#2a221c]/80 border-[#c5a059]/25 text-[#fcfaf6] hover:border-[#c5a059]/50'
                  }`}
                >
                  <CalendarCheck className="w-4 h-4 shrink-0" />
                  <span className="font-tamil-sans">{t.optEngagement}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAttendanceChange('wedding')}
                  className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 ${
                    formData.attendance === 'wedding'
                      ? 'bg-gradient-to-r from-[#b08b41] via-[#c5a059] to-[#99732f] text-[#1c1613] border-[#f4e8c8] shadow-md'
                      : 'bg-[#2a221c]/80 border-[#c5a059]/25 text-[#fcfaf6] hover:border-[#c5a059]/50'
                  }`}
                >
                  <Heart className="w-4 h-4 shrink-0" />
                  <span className="font-tamil-sans">{t.optWedding}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAttendanceChange('declined')}
                  className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 ${
                    formData.attendance === 'declined'
                      ? 'bg-rose-950/90 text-rose-100 border-rose-400'
                      : 'bg-[#2a221c]/80 border-[#c5a059]/25 text-[#fcfaf6] hover:border-[#c5a059]/50'
                  }`}
                >
                  <span>💌</span>
                  <span className="font-tamil-sans">{t.optDecline}</span>
                </button>
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c5a059] font-semibold mb-1.5 font-tamil-sans">
                  {t.labelName}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c5a059]/80" />
                  <input
                    type="text"
                    required
                    placeholder={language === 'ta' ? 'தங்கள் பெயர் (எ.கா: ஆனந்த் குமார்)' : 'Your Name (e.g. Anand Kumar)'}
                    value={formData.fullName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#2a221c]/90 border border-[#c5a059]/30 focus:border-[#c5a059] focus:outline-none text-white text-xs sm:text-sm placeholder:text-[#c5a059]/40 font-tamil-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c5a059] font-semibold mb-1.5 font-tamil-sans">
                  {t.labelPhone}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c5a059]/80" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData((prev) => ({ ...prev, mobileNumber: e.target.value }))}
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#2a221c]/90 border border-[#c5a059]/30 focus:border-[#c5a059] focus:outline-none text-white text-xs sm:text-sm placeholder:text-[#c5a059]/40 font-tamil-sans"
                  />
                </div>
              </div>
            </div>

            {/* Guest Count (if attending) */}
            {formData.attendance !== 'declined' && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c5a059] font-semibold mb-1.5 font-tamil-sans">
                  {t.labelGuests}
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c5a059]/80 pointer-events-none" />
                  <select
                    value={formData.guestCount}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, guestCount: parseInt(e.target.value, 10) }))
                    }
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#2a221c]/90 border border-[#c5a059]/30 focus:border-[#c5a059] focus:outline-none text-white text-xs sm:text-sm appearance-none cursor-pointer font-tamil-sans"
                  >
                    <option value={1} className="bg-[#1c1613] text-white">
                      {language === 'ta' ? '1 நபர் (1 Guest)' : '1 Guest'}
                    </option>
                    <option value={2} className="bg-[#1c1613] text-white">
                      {language === 'ta' ? '2 நபர்கள் (2 Guests)' : '2 Guests'}
                    </option>
                    <option value={3} className="bg-[#1c1613] text-white">
                      {language === 'ta' ? '3 நபர்கள் (3 Guests)' : '3 Guests'}
                    </option>
                    <option value={4} className="bg-[#1c1613] text-white">
                      {language === 'ta' ? '4 நபர்கள் (4 Guests)' : '4 Guests'}
                    </option>
                    <option value={5} className="bg-[#1c1613] text-white">
                      {language === 'ta' ? '5+ நபர்கள் (5+ Guests)' : '5+ Guests'}
                    </option>
                  </select>
                </div>
              </div>
            )}

            {/* Wishes / Blessing */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#c5a059] font-semibold mb-1.5 font-tamil-sans">
                {t.labelWishes}
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-[#c5a059]/80" />
                <textarea
                  rows={2}
                  placeholder={
                    language === 'ta'
                      ? 'மணமக்களுக்கான தங்களின் அன்பான வாழ்த்துச் செய்தி...'
                      : 'Share your warm prayers and blessings...'
                  }
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#2a221c]/90 border border-[#c5a059]/30 focus:border-[#c5a059] focus:outline-none text-white text-xs sm:text-sm placeholder:text-[#c5a059]/40 resize-none font-tamil-sans"
                />
              </div>
            </div>

            {/* Submit Button with Gold Shimmer Sweep */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="shimmer-sweep w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#b08b41] via-[#c5a059] to-[#99732f] text-[#1c1613] font-bold tracking-wider uppercase text-xs sm:text-sm shadow-[0_0_25px_rgba(197,160,89,0.35)] hover:scale-[1.01] active:scale-98 transition-transform flex items-center justify-center gap-2.5 disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#1c1613] border-t-transparent rounded-full animate-spin" />
                  <span className="font-tamil-sans">{t.rsvpSubmittingBtn}</span>
                </span>
              ) : (
                <>
                  <Send className="w-4 h-4 shrink-0" />
                  <span className="font-tamil-sans">{t.rsvpSubmitBtn}</span>
                  <Sparkles className="w-4 h-4 shrink-0" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
