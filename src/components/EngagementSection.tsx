'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Bell, Sparkles, Navigation } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const EngagementSection: React.FC = () => {
  const { date, time, itinerary, venue, dressCode, isoDate } = invitationConfig.engagement;

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(isoDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [isoDate]);

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Engagement Ceremony: G. Vallalarasu & K. Priyanka`);
    const details = encodeURIComponent(
      `Cordially inviting you to the Engagement Ceremony of G. Vallalarasu & K. Priyanka at RSM Banquet Hall, Triplicane, Chennai.`
    );
    const location = encodeURIComponent(`${venue.name}, ${venue.address}, ${venue.cityState}`);
    const dates = '20261213T123000Z/20261213T153000Z'; // 6 PM - 9 PM IST
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`,
      '_blank'
    );
  };

  const handleDownloadICS = () => {
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//VP Engagement Ceremony//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Engagement Ceremony: G. Vallalarasu & K. Priyanka
DESCRIPTION:Engagement Ceremony of G. Vallalarasu & K. Priyanka at RSM Banquet Hall\\, Triplicane\\, Chennai.
LOCATION:RSM Banquet Hall\\, 35/37\\, Dr Besant Rd\\, Near Hotel Viveka\\, Triplicane\\, Chennai - 600005
DTSTART:20261213T123000Z
DTEND:20261213T153000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Vallalarasu-Priyanka-Engagement.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="events-section" className="relative w-full py-20 px-4 max-w-4xl mx-auto text-center">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-champagne-400 font-semibold mb-2">
          Ceremony Invitation
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold champagne-gradient-text tracking-wide">
          The Engagement Ceremony
        </h2>
        <p className="text-xs sm:text-sm font-serif italic text-champagne-200/80 mt-2">
          A Promise of Forever
        </p>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-champagne-400 to-transparent mt-4 mb-4" />
      </div>

      {/* Date & Time Highlight Card */}
      <div className="w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#240e3d]/85 via-[#1a082c]/90 to-[#12051e]/95 border border-champagne-400/40 shadow-2xl backdrop-blur-md mb-10">
        <div className="flex flex-col md:flex-row items-center justify-around gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-champagne-500/20 border border-champagne-400/50 flex items-center justify-center shrink-0 text-champagne-300">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs text-champagne-400/80 uppercase tracking-widest font-sans font-medium">
                Event Date
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                {date}
              </h4>
              <p className="text-xs text-ivory-100/70">Auspicious Sunday Evening</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-16 bg-champagne-500/30" />

          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-champagne-500/20 border border-champagne-400/50 flex items-center justify-center shrink-0 text-champagne-300">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs text-champagne-400/80 uppercase tracking-widest font-sans font-medium">
                Ceremony Timings
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                {time}
              </h4>
              <p className="text-xs text-ivory-100/70">6:00 PM to 9:00 PM IST</p>
            </div>
          </div>
        </div>

        {/* Real-time Countdown Timer */}
        <div className="mt-8 pt-6 border-t border-champagne-400/20">
          <span className="text-[11px] uppercase tracking-[0.25em] text-champagne-300/80 font-medium block mb-3">
            Countdown to Engagement Ceremony
          </span>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            <div className="p-2.5 sm:p-3 rounded-xl bg-[#140624]/70 border border-champagne-400/30 flex flex-col items-center">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-champagne-200">
                {timeLeft.days}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-champagne-400/80 mt-0.5">
                Days
              </span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-[#140624]/70 border border-champagne-400/30 flex flex-col items-center">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-champagne-200">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-champagne-400/80 mt-0.5">
                Hours
              </span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-[#140624]/70 border border-champagne-400/30 flex flex-col items-center">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-champagne-200">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-champagne-400/80 mt-0.5">
                Mins
              </span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-[#140624]/70 border border-champagne-400/30 flex flex-col items-center">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-champagne-200">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-champagne-400/80 mt-0.5">
                Secs
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-champagne-400/20 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleAddToCalendar}
            className="px-4 py-2.5 rounded-xl bg-champagne-500/20 hover:bg-champagne-500/30 border border-champagne-400/40 text-champagne-200 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Bell className="w-4 h-4 text-champagne-400" />
            <span>Add to Google Calendar</span>
          </button>
          <button
            onClick={handleDownloadICS}
            className="px-4 py-2.5 rounded-xl bg-[#140624]/60 hover:bg-champagne-500/10 border border-champagne-400/30 text-champagne-300 text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-champagne-400" />
            <span>Download Apple iCal</span>
          </button>
          <a
            href="#rsvp-section"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-champagne-500 to-champagne-600 text-[#18072d] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>RSVP for Engagement</span>
          </a>
        </div>
      </div>

      {/* Itinerary Timeline */}
      <div className="relative w-full max-w-2xl mx-auto text-left">
        <div className="absolute top-4 bottom-4 left-6 sm:left-8 w-0.5 bg-gradient-to-b from-champagne-400/60 via-champagne-500/30 to-champagne-400/60" />

        <div className="space-y-5">
          {itinerary.map((item, index) => (
            <div key={index} className="relative flex items-start gap-4 sm:gap-6 pl-2 group">
              <div className="relative z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-champagne-400 to-champagne-700 p-0.5 shadow-lg shrink-0 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#1e0a35] flex items-center justify-center text-champagne-300 font-serif font-bold text-xs sm:text-sm">
                  0{index + 1}
                </div>
              </div>

              <div className="flex-1 p-5 rounded-2xl bg-gradient-to-r from-[#200c38]/70 to-[#140624]/80 border border-champagne-400/30 backdrop-blur-md shadow-lg group-hover:border-champagne-400/60 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h4 className="font-serif text-lg font-bold text-white tracking-wide">
                    {item.title}
                  </h4>
                  <span className="px-3 py-1 rounded-full bg-champagne-500/20 border border-champagne-400/40 text-champagne-300 font-sans text-xs font-semibold">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-ivory-100/80 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dress Code Highlight */}
      <div className="mt-10 inline-flex items-center gap-2.5 px-6 py-2.5 rounded-2xl bg-[#1e0a35]/60 border border-champagne-400/30 backdrop-blur-md text-xs sm:text-sm text-champagne-200">
        <Sparkles className="w-4 h-4 text-champagne-400 shrink-0" />
        <span>
          <strong>Dress Code:</strong> {dressCode || 'Traditional / Festive Elegance'}
        </span>
      </div>
    </section>
  );
};
