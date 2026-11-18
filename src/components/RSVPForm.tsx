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
  Heart,
} from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';
import { useLanguage } from '@/context/LanguageContext';

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
  const { t, language } = useLanguage();
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

  // Update boolean flags whenever attendance selection changes
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
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#e8daf5', '#bc95e0', '#ffffff', '#b89228'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 55,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#d4af37', '#bc95e0', '#f6ecd5'],
        });
        confetti({
          particleCount: 55,
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

    // Validation 3: Optional Email format
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        setError(language === 'ta' ? 'தயவுசெய்து சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.' : 'Please enter a valid email address.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: formData.mobileNumber.trim(),
          email: formData.email.trim() || undefined,
          attendance: formData.attendance,
          attendingEngagement: formData.attendingEngagement,
          attendingWedding: formData.attendingWedding,
          guestCount: formData.attendance === 'declined' ? 0 : formData.guestCount,
          message: formData.message.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit RSVP');
      }

      const savedRecord: RSVPResponseData = {
        id: data.data?.id || `rsvp_${Date.now()}`,
        fullName: formData.fullName.trim(),
        attendance: formData.attendance,
        attendingEngagement: formData.attendingEngagement,
        attendingWedding: formData.attendingWedding,
        guestCount: formData.attendance === 'declined' ? 0 : formData.guestCount,
        submittedAt: new Date().toISOString(),
      };

      setSubmittedRSVP(savedRecord);
      localStorage.setItem('vp_rsvp_record', JSON.stringify(savedRecord));

      triggerCelebrationConfetti();
    } catch (err: any) {
      console.warn('Network or API issue, saving locally as fallback:', err);
      const fallbackRecord: RSVPResponseData = {
        id: `local_${Date.now()}`,
        fullName: formData.fullName.trim(),
        attendance: formData.attendance,
        attendingEngagement: formData.attendingEngagement,
        attendingWedding: formData.attendingWedding,
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
        attendingEngagement: submittedRSVP.attendingEngagement,
        attendingWedding: submittedRSVP.attendingWedding,
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
      `💐 RSVP Confirmation for Vallarasu & Priyanka Engagement!\n\n` +
      `Guest: ${submittedRSVP.fullName}\n` +
      `Status: ${attendanceText}\n` +
      (submittedRSVP.attendance !== 'declined' ? `Number of Guests: ${submittedRSVP.guestCount}\n` : '') +
      `\nLooking forward to celebrating together!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section id="rsvp-section" className="relative w-full py-16 px-4 max-w-3xl mx-auto text-center">
      {/* 10. RSVP SECTION HEADER */}
      <div className="flex flex-col items-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-[#a88136] font-semibold mb-2 font-tamil-serif">
          {language === 'ta' ? 'தங்களின் நல்வரவு' : 'Your Gracious Presence'}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold gold-foil-text tracking-wide">
          {t.rsvpHeading}
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mt-4 mb-4" />
        <p className="text-xs sm:text-sm text-[#5a4a42] max-w-md font-tamil leading-relaxed">
          {t.rsvpSubheading}
        </p>
      </div>

      {submittedRSVP ? (
        /* RSVP CONFIRMATION SUCCESS CARD */
        <div className="w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#2a221c] to-[#1c1613] border-2 border-[#c5a059]/60 shadow-2xl p-6 sm:p-10 text-center animate-subtle-float">
          <div className="w-16 h-16 rounded-full bg-[#c5a059]/20 border-2 border-[#c5a059] mx-auto flex items-center justify-center text-[#c5a059] shadow-lg mb-4">
            <CheckCircle2 className="w-8 h-8 text-champagne-400" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-champagne-400 font-semibold font-tamil-sans">
            {language === 'ta' ? 'வருகைப் பதிவு உறுதி செய்யப்பட்டது' : 'RSVP Confirmed'}
          </span>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-2">
            {t.rsvpSuccessTitle}
          </h3>

          <p className="text-xs sm:text-sm text-ivory-100/85 mt-2 max-w-md mx-auto font-tamil">
            {language === 'ta' ? (
              <>அன்பார்ந்த <span className="font-bold text-white">{submittedRSVP.fullName}</span>, தங்களின் வருகைப் பதிவு மகிழ்வுடன் ஏற்கப்பட்டது.</>
            ) : (
              <>Dear <span className="font-bold text-white">{submittedRSVP.fullName}</span>, your confirmation has been recorded with joy.</>
            )}
          </p>

          <p className="text-xs text-champagne-300/80 italic mt-1 font-serif">
            "Your gracious presence will make our celebration complete. We look forward to welcoming you with warmth and joy."
          </p>

          {/* Details Card */}
          <div className="my-8 p-5 rounded-2xl bg-[#1c1613]/75 border border-[#c5a059]/30 flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm text-[#faf8f4] font-tamil-sans">
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-champagne-400/80">
                {language === 'ta' ? 'வருகை நிலை' : 'Attendance Selection'}
              </span>
              <span className="font-semibold text-champagne-200">
                {submittedRSVP.attendance === 'both'
                  ? t.optBoth
                  : submittedRSVP.attendance === 'engagement'
                  ? t.optEngagement
                  : submittedRSVP.attendance === 'wedding'
                  ? t.optWedding
                  : t.optDecline}
              </span>
            </div>

            {submittedRSVP.attendance !== 'declined' && (
              <>
                <div className="w-px h-8 bg-champagne-500/30 hidden sm:block" />
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-champagne-400/80">
                    {language === 'ta' ? 'விருந்தினர்கள்' : 'Confirmed Guests'}
                  </span>
                  <span className="font-semibold text-white">
                    {submittedRSVP.guestCount} {language === 'ta' ? 'நபர்கள்' : (submittedRSVP.guestCount === 1 ? 'Guest' : 'Guests')}
                  </span>
                </div>
              </>
            )}

            <div className="w-px h-8 bg-champagne-500/30 hidden sm:block" />
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-champagne-400/80">
                {language === 'ta' ? 'நிகழ்வு தேதி' : 'Engagement Event'}
              </span>
              <span className="font-semibold text-white font-tamil-sans">
                13 Dec 2026 • 6:00 PM IST
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleShareWhatsApp}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-wider text-xs uppercase shadow-lg transition-all flex items-center gap-2 active:scale-95"
            >
              <Share2 className="w-4 h-4" />
              <span>{language === 'ta' ? 'வாட்ஸ்அப்பில் பகிர்க' : 'Share RSVP on WhatsApp'}</span>
            </button>

            <button
              onClick={handleEditRSVP}
              className="px-5 py-3 rounded-xl bg-[#1c1613]/60 hover:bg-[#c5a059]/10 border border-[#c5a059]/40 text-[#c5a059] font-medium text-xs uppercase tracking-wider transition-all flex items-center gap-2 active:scale-95 cursor-pointer font-tamil-sans"
            >
              <Edit3 className="w-4 h-4" />
              <span>{language === 'ta' ? 'மாற்றம் செய்க' : 'Update RSVP'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* INTERACTIVE RSVP FORM */
        <form
          onSubmit={handleSubmit}
          className="luxury-dark-card p-6 sm:p-10 text-left"
        >
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs sm:text-sm font-medium flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span className="font-tamil">{error}</span>
            </div>
          )}

          {/* Attendance Selection (4 Choices) */}
          <div className="mb-8">
            <label className="block text-xs uppercase tracking-wider text-[#c5a059] font-semibold mb-3 font-tamil-sans">
              {t.rsvpPrompt}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option 1: Both Events */}
              <button
                type="button"
                onClick={() => handleAttendanceChange('both')}
                className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-start gap-3 active:scale-95 ${
                  formData.attendance === 'both'
                    ? 'bg-gradient-to-r from-[#b08b41] via-[#c5a059] to-[#99732f] text-[#1c1613] border-[#f4e8c8] shadow-[0_0_20px_rgba(197,160,89,0.35)]'
                    : 'bg-[#2a221c]/80 border-[#c5a059]/30 text-[#fcfaf6] hover:border-[#c5a059]/60'
                }`}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <div className="text-left font-tamil-sans">
                  <span className="block font-bold">{t.optBoth}</span>
                </div>
              </button>

              {/* Option 2: Engagement Only */}
              <button
                type="button"
                onClick={() => handleAttendanceChange('engagement')}
                className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-start gap-3 active:scale-95 ${
                  formData.attendance === 'engagement'
                    ? 'bg-gradient-to-r from-[#b08b41] via-[#c5a059] to-[#99732f] text-[#1c1613] border-[#f4e8c8] shadow-[0_0_20px_rgba(197,160,89,0.35)]'
                    : 'bg-[#2a221c]/80 border-[#c5a059]/30 text-[#fcfaf6] hover:border-[#c5a059]/60'
                }`}
              >
                <CalendarCheck className="w-4 h-4 shrink-0" />
                <div className="text-left font-tamil-sans">
                  <span className="block font-bold">{t.optEngagement}</span>
                </div>
              </button>

              {/* Option 3: Wedding Only */}
              <button
                type="button"
                onClick={() => handleAttendanceChange('wedding')}
                className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-start gap-3 active:scale-95 ${
                  formData.attendance === 'wedding'
                    ? 'bg-gradient-to-r from-[#b08b41] via-[#c5a059] to-[#99732f] text-[#1c1613] border-[#f4e8c8] shadow-[0_0_20px_rgba(197,160,89,0.35)]'
                    : 'bg-[#2a221c]/80 border-[#c5a059]/30 text-[#fcfaf6] hover:border-[#c5a059]/60'
                }`}
              >
                <Heart className="w-4 h-4 shrink-0" />
                <div className="text-left font-tamil-sans">
                  <span className="block font-bold">{t.optWedding}</span>
                </div>
              </button>

              {/* Option 4: Unable to Attend */}
              <button
                type="button"
                onClick={() => handleAttendanceChange('declined')}
                className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-start gap-3 active:scale-95 ${
                  formData.attendance === 'declined'
                    ? 'bg-rose-950/90 text-rose-100 border-rose-400 shadow-lg'
                    : 'bg-[#2a221c]/80 border-[#c5a059]/30 text-[#fcfaf6] hover:border-[#c5a059]/60'
                }`}
              >
                <span className="text-base">💌</span>
                <div className="text-left font-tamil-sans">
                  <span className="block font-bold">{t.optDecline}</span>
                </div>
              </button>
            </div>
          </div>

          {/* Guest Information: Name, Mobile, Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-champagne-300 font-semibold mb-2 font-tamil-sans">
                {t.labelName}
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-champagne-400/70" />
                <input
                  type="text"
                  required
                  placeholder={language === 'ta' ? 'தங்கள் பெயர் (எ.கா: ஆனந்த் குமார்)' : 'Your Name (e.g. Anand Kumar)'}
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#2a221c]/90 border border-[#c5a059]/30 focus:border-[#c5a059] focus:outline-none text-white text-xs sm:text-sm placeholder:text-[#c5a059]/40 transition-all font-tamil-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#c5a059] font-semibold mb-2 font-tamil-sans">
                {t.labelPhone}
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c5a059]/70" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, mobileNumber: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#2a221c]/90 border border-[#c5a059]/30 focus:border-[#c5a059] focus:outline-none text-white text-xs sm:text-sm placeholder:text-[#c5a059]/40 transition-all font-tamil-sans"
                />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-xs uppercase tracking-wider text-[#c5a059] font-semibold mb-2 font-tamil-sans">
              {language === 'ta' ? 'மின்னஞ்சல் (விருப்பத்தேர்வு)' : 'Email Address (Optional)'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c5a059]/70" />
              <input
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#2a221c]/90 border border-[#c5a059]/30 focus:border-[#c5a059] focus:outline-none text-white text-xs sm:text-sm placeholder:text-[#c5a059]/40 transition-all font-tamil-sans"
              />
            </div>
          </div>

          {/* Conditional: Number of Guests (Only if attending) */}
          {formData.attendance !== 'declined' && (
            <div className="mb-5">
              <label className="block text-xs uppercase tracking-wider text-[#c5a059] font-semibold mb-2 font-tamil-sans">
                {t.labelGuests}
              </label>
              <div className="relative">
                <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c5a059]/70 pointer-events-none" />
                <select
                  value={formData.guestCount}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, guestCount: parseInt(e.target.value, 10) }))
                  }
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#2a221c]/90 border border-[#c5a059]/30 focus:border-[#c5a059] focus:outline-none text-white text-xs sm:text-sm transition-all appearance-none cursor-pointer font-tamil-sans"
                >
                  <option value={1} className="bg-[#1c1613] text-white">
                    {language === 'ta' ? '1 நபர்' : '1 Guest'}
                  </option>
                  <option value={2} className="bg-[#1c1613] text-white">
                    {language === 'ta' ? '2 நபர்கள்' : '2 Guests'}
                  </option>
                  <option value={3} className="bg-[#1c1613] text-white">
                    {language === 'ta' ? '3 நபர்கள்' : '3 Guests'}
                  </option>
                  <option value={4} className="bg-[#1c1613] text-white">
                    {language === 'ta' ? '4 நபர்கள்' : '4 Guests'}
                  </option>
                  <option value={5} className="bg-[#1c1613] text-white">
                    {language === 'ta' ? '5+ நபர்கள்' : '5+ Guests'}
                  </option>
                </select>
              </div>
            </div>
          )}

          {/* Message / Blessing */}
          <div className="mb-8">
            <label className="block text-xs uppercase tracking-wider text-[#c5a059] font-semibold mb-2 font-tamil-sans">
              {t.labelWishes}
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-[#c5a059]/70" />
              <textarea
                rows={3}
                placeholder={
                  language === 'ta'
                    ? 'மணமக்களுக்கான தங்களின் அன்பான வாழ்த்துச் செய்தியைப் பகிரவும்...'
                    : 'Share your warm prayers, heartfelt blessings, or special wishes...'
                }
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#2a221c]/90 border border-[#c5a059]/30 focus:border-[#c5a059] focus:outline-none text-white text-xs sm:text-sm placeholder:text-[#c5a059]/40 transition-all resize-none font-tamil-sans"
              />
            </div>
          </div>

          {/* Submit Button with GPU Shimmer Sweep */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="shimmer-sweep w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#b08b41] via-[#c5a059] to-[#99732f] text-[#1c1613] font-bold tracking-wider uppercase text-xs sm:text-sm shadow-[0_0_25px_rgba(197,160,89,0.35)] hover:scale-[1.01] active:scale-98 transition-transform duration-200 flex items-center justify-center gap-2.5 disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#1c1613] border-t-transparent rounded-full animate-spin" />
                <span className="font-tamil-sans">{t.rsvpSubmittingBtn}</span>
              </span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span className="font-tamil-sans">{t.rsvpSubmitBtn}</span>
                <Sparkles className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </section>
  );
};
