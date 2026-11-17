'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Bell, Sparkles } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';
import { useLanguage } from '@/context/LanguageContext';
import { CornerOrnaments } from '@/components/CornerOrnaments';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const EngagementSection: React.FC = () => {
  const { date, time, venue } = invitationConfig.engagement;
  const { t, language } = useLanguage();

  const targetIsoString = '2026-12-13T18:00:00+05:30';

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetTime = new Date(targetIsoString).getTime();

    const calculateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetIsoString]);

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Engagement Ceremony: G. Vallarasu & K. Priyanka`);
    const details = encodeURIComponent(
      `Cordially inviting you to the auspicious Engagement Ceremony of G. Vallarasu & K. Priyanka at RSM Banquet Hall, Triplicane, Chennai.`
    );
    const location = encodeURIComponent(`${venue.name}, ${venue.address}, ${venue.cityState}`);
    const dates = '20261213T123000Z/20261213T153000Z'; // 6:00 PM - 9:00 PM IST in UTC
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`,
      '_blank'
    );
  };

  const handleDownloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Vallarasu Priyanka Engagement//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Engagement Ceremony: G. Vallarasu & K. Priyanka
DESCRIPTION:Auspicious Engagement Ceremony of G. Vallarasu & K. Priyanka at RSM Banquet Hall\\, Triplicane\\, Chennai.
LOCATION:RSM Banquet Hall\\, 35/37\\, Dr Besant Rd\\, Near Hotel Viveka\\, Triplicane\\, Chennai - 600005\\, Tamil Nadu
DTSTART:20261213T123000Z
DTEND:20261213T153000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Vallarasu-Priyanka-Engagement.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="countdown-section" className="relative w-full py-12 px-4 max-w-4xl mx-auto text-center">
      {/* 04. AUSPICIOUS MOMENT COUNTDOWN TIMER CARD */}
      <div className="luxury-card p-6 sm:p-10 shadow-xl text-center">
        <CornerOrnaments color="text-[#c5a059]/40" />

        <div className="relative z-10 mb-6">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8e6c2e] font-semibold block font-tamil-serif mb-1.5">
            Auspicious Moment Countdown • சுபமுகூர்த்த நேரக் கணிப்பு
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold gold-foil-text tracking-wide">
            {language === 'ta' ? 'சுபமுகூர்த்த நன்னாளை நோக்கி' : 'Countdown to Auspicious Union'}
          </h2>
          <div className="ornament-divider text-[#c5a059]/50 font-serif text-sm w-44 mx-auto my-3">
            ❖
          </div>
          <p className="text-xs sm:text-sm text-[#5c534b] font-tamil">
            Sunday, 13th December 2026 • 6:00 PM IST (ஞாயிறு மாலை 6:00 மணி)
          </p>
        </div>

        {/* 4 GILDED IVORY PILL CARDS */}
        <div className="relative z-10 grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md mx-auto my-6">
          <div className="p-3 sm:p-4 rounded-2xl bg-[#faf8f4] border border-[#c5a059]/40 shadow-sm flex flex-col items-center">
            <span className="font-serif text-2xl sm:text-4xl font-bold text-[#231c18]">
              {timeLeft.days}
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8e6c2e] font-semibold mt-1 font-tamil-sans">
              நாட்கள்
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#766c62] font-sans">
              DAYS
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-[#faf8f4] border border-[#c5a059]/40 shadow-sm flex flex-col items-center">
            <span className="font-serif text-2xl sm:text-4xl font-bold text-[#231c18]">
              {timeLeft.hours}
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8e6c2e] font-semibold mt-1 font-tamil-sans">
              மணிகள்
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#766c62] font-sans">
              HOURS
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-[#faf8f4] border border-[#c5a059]/40 shadow-sm flex flex-col items-center">
            <span className="font-serif text-2xl sm:text-4xl font-bold text-[#231c18]">
              {timeLeft.minutes}
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8e6c2e] font-semibold mt-1 font-tamil-sans">
              நிமிடங்கள்
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#766c62] font-sans">
              MINS
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-[#faf8f4] border border-[#c5a059]/40 shadow-sm flex flex-col items-center">
            <span className="font-serif text-2xl sm:text-4xl font-bold text-[#231c18]">
              {timeLeft.seconds}
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8e6c2e] font-semibold mt-1 font-tamil-sans">
              வினாடிகள்
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#766c62] font-sans">
              SECS
            </span>
          </div>
        </div>

        {/* Action Buttons: Calendar Integration */}
        <div className="relative z-10 pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleAddToCalendar}
            className="px-4 py-2 rounded-xl bg-[#f4efe6] hover:bg-[#ebe2d3] border border-[#c5a059]/40 text-[#231c18] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 active:scale-95 font-tamil-sans cursor-pointer shadow-sm"
          >
            <Bell className="w-3.5 h-3.5 text-[#8e6c2e] shrink-0" />
            <span>Add to Google Calendar</span>
          </button>

          <button
            onClick={handleDownloadICS}
            className="px-4 py-2 rounded-xl bg-[#ffffff] hover:bg-[#faf8f4] border border-[#c5a059]/35 text-[#5c534b] text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-2 active:scale-95 font-tamil-sans cursor-pointer shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-[#8e6c2e] shrink-0" />
            <span>Download Apple iCal (.ics)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
