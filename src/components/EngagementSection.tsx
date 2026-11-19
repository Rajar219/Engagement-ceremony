'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Bell } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';
import { useLanguage } from '@/context/LanguageContext';
import { CornerOrnaments } from '@/components/CornerOrnaments';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// 13 December 2026, 6:00 PM IST (Asia/Kolkata, UTC+05:30)
const TARGET_TIME_MS = new Date('2026-12-13T18:00:00+05:30').getTime();

const calculateTimeLeft = (): TimeLeft => {
  const now = Date.now();
  const difference = TARGET_TIME_MS - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
};

export const EngagementSection: React.FC = () => {
  const { venue } = invitationConfig.engagement;
  const { t, language } = useLanguage();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Engagement Ceremony: G. Vallalarasu & K. Priyanka`);
    const details = encodeURIComponent(
      `Cordially inviting you to the auspicious Engagement Ceremony of G. Vallalarasu & K. Priyanka at RSM Banquet Hall, Triplicane, Chennai.`
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
PRODID:-//Vallalarasu Priyanka Engagement//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Engagement Ceremony: G. Vallalarasu & K. Priyanka
DESCRIPTION:Auspicious Engagement Ceremony of G. Vallalarasu & K. Priyanka at RSM Banquet Hall\\, Triplicane\\, Chennai.
LOCATION:RSM Banquet Hall\\, 35/37\\, Dr Besant Rd\\, Near Hotel Viveka\\, Triplicane\\, Chennai - 600005\\, Tamil Nadu
DTSTART:20261213T123000Z
DTEND:20261213T153000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Vallalarasu-Priyanka-Engagement.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="countdown-section"
      className="relative z-[2] w-full py-10 px-3 xs:px-4 text-center border-y border-[#C9A45C]/30 transition-colors"
      style={{ backgroundColor: '#F4E4E8' }}
    >
      {/* COUNTDOWN CARD CONTAINER (Sophisticated Dusty Blush Theme #F4E4E8) */}
      <div
        className="relative z-10 w-full max-w-md mx-auto p-5 xs:p-6 sm:p-8 rounded-[1.75rem] border border-[#C9A45C]/45 shadow-[0_12px_40px_rgba(117,72,91,0.08)] text-center overflow-hidden"
        style={{ backgroundColor: '#F4E4E8' }}
      >
        <CornerOrnaments color="text-[#C9A45C]/60" />

        {/* Section Heading Group (Deep Muted Plum #75485B & Muted Rose #98717F) */}
        <div className="relative z-10 mb-5">
          <span className="text-[11px] sm:text-xs text-[#98717F] font-semibold uppercase tracking-[0.25em] font-serif block mb-0.5">
            Auspicious Moment Countdown
          </span>
          <span className="text-[11px] sm:text-xs text-[#98717F] font-semibold font-tamil-serif block mb-3">
            சுபமுகூர்த்த நேரக் கணிப்பு
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#75485B] tracking-wide mb-1 drop-shadow-sm">
            Countdown to Auspicious Union
          </h2>
          <h2 className="font-tamil-heading text-2xl sm:text-3xl font-bold text-[#75485B] tracking-wide mb-2.5">
            சுபமுகூர்த்த நன்னாளை நோக்கி
          </h2>

          {/* Champagne Gold Ornament Divider */}
          <div className="flex items-center justify-center gap-2 w-36 sm:w-44 mx-auto my-3 text-[#C9A45C]">
            <div className="flex-1 h-[0.75px] bg-gradient-to-r from-transparent via-[#C9A45C]/60 to-[#C9A45C]" />
            <span className="font-serif text-xs">❖</span>
            <div className="flex-1 h-[0.75px] bg-gradient-to-l from-transparent via-[#C9A45C]/60 to-[#C9A45C]" />
          </div>

          <p className="text-xs sm:text-sm text-[#75485B]/90 font-sans font-medium mb-0.5">
            Sunday, 13th December 2026 • 6:00 PM IST
          </p>
          <p className="text-xs sm:text-sm text-[#75485B]/90 font-tamil font-medium">
            ஞாயிற்றுக்கிழமை, 13 டிசம்பர் 2026 • மாலை 6:00 மணி
          </p>
        </div>

        {/* 4 BALANCED COUNTDOWN BOXES: Soft White #FFFCFC Cards, Deep Plum #75485B Numbers */}
        <div className="relative z-10 grid grid-cols-4 gap-1.5 xs:gap-2 sm:gap-3 w-full max-w-sm mx-auto my-5">
          {/* Days */}
          <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#FFFCFC] border border-[#C9A45C]/40 shadow-sm flex flex-col items-center justify-center min-w-0">
            <span
              suppressHydrationWarning
              className="font-serif text-xl xs:text-2xl sm:text-3xl font-bold text-[#75485B] leading-none"
            >
              {timeLeft.days}
            </span>
            <span className="text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-[#98717F] font-bold mt-1 font-tamil-sans truncate w-full text-center">
              நாட்கள்
            </span>
            <span className="text-[7.5px] sm:text-[8px] uppercase tracking-widest text-[#98717F]/85 font-sans font-semibold mt-0.5">
              DAYS
            </span>
          </div>

          {/* Hours */}
          <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#FFFCFC] border border-[#C9A45C]/40 shadow-sm flex flex-col items-center justify-center min-w-0">
            <span
              suppressHydrationWarning
              className="font-serif text-xl xs:text-2xl sm:text-3xl font-bold text-[#75485B] leading-none"
            >
              {timeLeft.hours}
            </span>
            <span className="text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-[#98717F] font-bold mt-1 font-tamil-sans truncate w-full text-center">
              மணிகள்
            </span>
            <span className="text-[7.5px] sm:text-[8px] uppercase tracking-widest text-[#98717F]/85 font-sans font-semibold mt-0.5">
              HOURS
            </span>
          </div>

          {/* Minutes */}
          <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#FFFCFC] border border-[#C9A45C]/40 shadow-sm flex flex-col items-center justify-center min-w-0">
            <span
              suppressHydrationWarning
              className="font-serif text-xl xs:text-2xl sm:text-3xl font-bold text-[#75485B] leading-none"
            >
              {timeLeft.minutes}
            </span>
            <span className="text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-[#98717F] font-bold mt-1 font-tamil-sans truncate w-full text-center">
              நிமிடங்கள்
            </span>
            <span className="text-[7.5px] sm:text-[8px] uppercase tracking-widest text-[#98717F]/85 font-sans font-semibold mt-0.5">
              MINS
            </span>
          </div>

          {/* Seconds */}
          <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#FFFCFC] border border-[#C9A45C]/40 shadow-sm flex flex-col items-center justify-center min-w-0">
            <span
              suppressHydrationWarning
              className="font-serif text-xl xs:text-2xl sm:text-3xl font-bold text-[#75485B] leading-none"
            >
              {timeLeft.seconds}
            </span>
            <span className="text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-[#98717F] font-bold mt-1 font-tamil-sans truncate w-full text-center">
              வினாடிகள்
            </span>
            <span className="text-[7.5px] sm:text-[8px] uppercase tracking-widest text-[#98717F]/85 font-sans font-semibold mt-0.5">
              SECS
            </span>
          </div>
        </div>

        {/* Action Buttons: Calendar Integration (Coordinated with Dusty Blush & Champagne Gold) */}
        <div className="relative z-10 pt-3 flex flex-col xs:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full">
          <button
            type="button"
            onClick={handleAddToCalendar}
            className="w-full xs:w-auto px-4 py-2.5 rounded-xl bg-[#75485B] hover:bg-[#633a4c] border border-[#C9A45C]/40 text-[#FFFFFF] text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 font-sans cursor-pointer shadow-sm select-none"
          >
            <Bell className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
            <span className="whitespace-nowrap">Add to Google Calendar</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadICS}
            className="w-full xs:w-auto px-4 py-2.5 rounded-xl bg-[#FFFCFC] hover:bg-[#FAF0F2] border border-[#C9A45C]/40 text-[#75485B] text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 font-sans cursor-pointer shadow-sm select-none"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
            <span className="whitespace-nowrap">Download Apple iCal (.ics)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
