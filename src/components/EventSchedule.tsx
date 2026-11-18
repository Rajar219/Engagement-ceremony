'use client';

import React from 'react';
import { Calendar, Clock, Bell, Sparkles, Check, Gift, HeartHandshake } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

export const EventSchedule: React.FC = () => {
  const { date, time, itinerary, dressCode } = invitationConfig.engagement;

  const handleAddToGoogleCalendar = () => {
    const title = encodeURIComponent(`Engagement Ceremony: G. Vallarasu & K. Priyanka`);
    const details = encodeURIComponent(
      `Cordially inviting you to the auspicious Engagement Ceremony of G. Vallarasu & K. Priyanka at RSM Banquet Hall, Triplicane, Chennai.`
    );
    const location = encodeURIComponent(
      `RSM Banquet Hall, 35/37, Dr Besant Rd, Near Hotel Viveka, Triplicane, Chennai - 600005`
    );
    // 2026-12-13 18:00 to 21:00 IST (+05:30)
    // 18:00 IST is 12:30 UTC, 21:00 IST is 15:30 UTC
    const dates = '20261213T123000Z/20261213T153000Z';
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
    window.open(url, '_blank');
  };

  const handleDownloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Engagement Ceremony//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Engagement Ceremony: G. Vallarasu & K. Priyanka
DESCRIPTION:Engagement Ceremony of G. Vallarasu & K. Priyanka at RSM Banquet Hall\\, Triplicane\\, Chennai.
LOCATION:RSM Banquet Hall\\, 35/37\\, Dr Besant Rd\\, Near Hotel Viveka\\, Triplicane\\, Chennai - 600005
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
    <section id="event-details" className="relative w-full py-20 px-4 max-w-4xl mx-auto text-center">
      {/* Ornamental Section Header */}
      <div className="flex flex-col items-center mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-2">
          Ceremony Timeline
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold gold-gradient-text tracking-wide">
          Program & Itinerary
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mt-4 mb-4" />
        <p className="text-sm text-gold-200/80 max-w-lg">
          Please join us in celebrating every sacred milestone of our auspicious evening.
        </p>
      </div>

      {/* Date & Time Highlight Card */}
      <div className="w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#220a10] to-[#140508] border border-gold-500/40 shadow-2xl mb-12">
        <div className="flex flex-col md:flex-row items-center justify-around gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-gold-500/20 border border-gold-400/50 flex items-center justify-center shrink-0 text-gold-300">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs text-gold-400/80 uppercase tracking-widest font-sans font-medium">
                Auspicious Date
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                {date}
              </h4>
              <p className="text-xs text-gold-200/70">Sunday Evening</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-16 bg-gold-500/30" />

          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-gold-500/20 border border-gold-400/50 flex items-center justify-center shrink-0 text-gold-300">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs text-gold-400/80 uppercase tracking-widest font-sans font-medium">
                Ceremony Timings
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                {time}
              </h4>
              <p className="text-xs text-gold-200/70">6:00 PM to 9:00 PM IST</p>
            </div>
          </div>
        </div>

        {/* Add to Calendar Action Buttons */}
        <div className="mt-8 pt-6 border-t border-gold-500/20 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleAddToGoogleCalendar}
            className="px-5 py-2.5 rounded-xl bg-gold-500/20 hover:bg-gold-500/30 border border-gold-400/40 text-gold-200 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Bell className="w-4 h-4 text-gold-400" />
            <span>Add to Google Calendar</span>
          </button>

          <button
            onClick={handleDownloadICS}
            className="px-5 py-2.5 rounded-xl bg-black/40 hover:bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-gold-400" />
            <span>Download Apple / iCal</span>
          </button>
        </div>
      </div>

      {/* Visual Timeline Cards */}
      <div className="relative w-full max-w-2xl mx-auto text-left">
        {/* Vertical connecting line */}
        <div className="absolute top-4 bottom-4 left-6 sm:left-8 w-0.5 bg-gradient-to-b from-gold-500/60 via-gold-400/30 to-gold-500/60" />

        <div className="space-y-6">
          {itinerary.map((item, index) => (
            <div
              key={index}
              className="relative flex items-start gap-4 sm:gap-6 pl-2 group"
            >
              {/* Timeline marker node */}
              <div className="relative z-10 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-700 p-0.5 shadow-lg shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-full h-full rounded-full bg-burgundy-950 flex items-center justify-center text-gold-300 font-serif font-bold text-xs sm:text-sm">
                  0{index + 1}
                </div>
              </div>

              {/* Timeline Card */}
              <div className="flex-1 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-black/60 to-burgundy-950/40 border border-gold-500/30 shadow-xl group-hover:border-gold-400/60 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                    {item.title}
                  </h4>
                  <span className="px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 font-sans text-xs font-semibold">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gold-200/80 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dress Code Highlight */}
      <div className="mt-14 inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-black/70 border border-gold-500/30 text-xs sm:text-sm text-gold-200">
        <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
        <span>
          <strong>Dress Code:</strong> {dressCode || 'Traditional / Festive Elegance'}
        </span>
      </div>
    </section>
  );
};
