'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, ExternalLink, Building, Info } from 'lucide-react';
import { CornerOrnaments } from '@/components/CornerOrnaments';

export const VenueCard: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const fullAddress =
    'RSM Banquet Hall, 35/37, Dr Besant Rd, Near Hotel Viveka, Triplicane, Chennai - 600005, Tamil Nadu';

  const handleCopyAddress = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'RSM Banquet Hall 35/37 Dr Besant Rd Triplicane Chennai 600005'
  )}`;

  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    'RSM Banquet Hall Triplicane Chennai'
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section
      id="venue-section"
      className="relative z-[2] w-full py-12 px-3.5 sm:px-4 text-center border-y border-[#C9A45C]/30 transition-colors"
      style={{ backgroundColor: '#E6EEE8' }}
    >
      {/* SECTION HEADER: Deep Forest Green #456B57 */}
      <div className="flex flex-col items-center mb-8">
        <span className="text-[11px] sm:text-xs text-[#456B57] font-semibold uppercase tracking-[0.25em] font-serif block mb-0.5">
          Ceremony Venue &amp; Directions
        </span>
        <span className="text-[11px] sm:text-xs text-[#527E67] font-semibold font-tamil-serif block mb-3">
          விழா மண்டப வழிகாட்டி
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#456B57] tracking-wide mb-1">
          How to Reach the Venue
        </h2>
        <h2 className="font-tamil-heading text-3xl sm:text-4xl font-bold text-[#456B57] tracking-wide mb-3">
          விழா மண்டபம்
        </h2>

        {/* Champagne Gold Ornament Divider */}
        <div className="flex items-center justify-center gap-2 w-36 sm:w-44 mx-auto my-3 text-[#C9A45C]">
          <div className="flex-1 h-[0.75px] bg-gradient-to-r from-transparent via-[#C9A45C]/60 to-[#C9A45C]" />
          <span className="font-serif text-xs">❖</span>
          <div className="flex-1 h-[0.75px] bg-gradient-to-l from-transparent via-[#C9A45C]/60 to-[#C9A45C]" />
        </div>

        <p className="text-xs sm:text-sm text-[#456B57]/85 font-serif italic max-w-md mx-auto mb-1">
          Join us at RSM Banquet Hall in the heart of Triplicane, Chennai for our joyous celebration.
        </p>
        <p className="text-xs sm:text-sm text-[#456B57]/85 font-tamil max-w-md mx-auto">
          சென்னை திருவல்லிக்கேணியில் உள்ள RSM பேங்க்வெட் ஹாலிற்கு தங்களை அன்புடன் வரவேற்கிறோம்.
        </p>
      </div>

      {/* VENUE CARD: Warm Ivory/White #FFFEFA, Subtle Champagne Gold Border #C9A45C/35 */}
      <div
        className="relative z-10 w-full max-w-md mx-auto p-5 xs:p-6 sm:p-8 rounded-[1.75rem] border border-[#C9A45C]/35 shadow-[0_12px_40px_rgba(69,107,87,0.08)] text-left overflow-hidden"
        style={{ backgroundColor: '#FFFEFA' }}
      >
        <CornerOrnaments color="text-[#C9A45C]/45" />

        <div className="relative z-10 flex flex-col gap-5 pb-5 border-b border-[#C9A45C]/25">
          <div>
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6EEE8] text-[#456B57] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#C9A45C]/20">
              <Building className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>RSM Banquet Hall</span>
            </div>

            {/* Venue Name: Dark Charcoal */}
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1F1F] tracking-wide mb-0.5">
              RSM Banquet Hall
            </h3>
            <h3 className="font-tamil-heading text-2xl sm:text-3xl font-bold text-[#1F1F1F] tracking-wide mb-3">
              ஆர்.எஸ்.எம் பேங்க்வெட் ஹால்
            </h3>

            {/* Address with Muted Champagne Gold Icon */}
            <div className="text-xs sm:text-sm text-[#383838] mt-2 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1 leading-relaxed">
                <span className="font-sans">
                  35/37, Dr Besant Rd, Near Hotel Viveka, Triplicane, Chennai - 600005, Tamil Nadu
                </span>
                <span className="font-tamil">
                  35/37, டாக்டர் பெசன்ட் சாலை, விவேகா ஹோட்டல் அருகில், திருவல்லிக்கேணி, சென்னை - 600005
                </span>
              </div>
            </div>

            {/* Landmark Box */}
            <div className="mt-3.5 flex flex-col gap-1 text-xs text-[#456B57] bg-[#F2F6F3] px-3.5 py-2.5 rounded-xl border border-[#C9A45C]/25 w-full">
              <div className="flex items-center gap-1.5 font-sans font-medium">
                <Info className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
                <span>Landmark: Near Hotel Viveka, Triplicane</span>
              </div>
              <span className="font-tamil text-[11px] text-[#456B57]/90">
                அடையாளம்: ஹோட்டல் விவேகா அருகில்
              </span>
            </div>
          </div>

          {/* Action Buttons: Full Width, 50px Height, Centered Flex-Column Layout */}
          <div className="flex flex-col gap-3 w-full">
            {/* 1. GET DIRECTIONS: Deep Forest Green #456B57 with Crisp White Text */}
            <a
              href={mapSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[50px] py-2 px-4 rounded-xl bg-[#456B57] hover:bg-[#385847] text-[#FFFFFF] shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 flex flex-col items-center justify-center select-none cursor-pointer group"
              style={{ minHeight: '50px' }}
            >
              <div className="flex items-center justify-center gap-1.5 whitespace-nowrap leading-tight">
                <Navigation className="w-3.5 h-3.5 shrink-0 text-[#FFFFFF] group-hover:scale-110 transition-transform" />
                <span className="font-sans text-[11.5px] sm:text-[12px] font-semibold tracking-wider uppercase text-[#FFFFFF] whitespace-nowrap">
                  GET DIRECTIONS
                </span>
                <ExternalLink className="w-3 h-3 shrink-0 text-[#FFFFFF]/85" />
              </div>
              <span className="font-tamil-sans text-[9.5px] sm:text-[10px] text-[#FFFFFF]/90 leading-tight mt-0.5 whitespace-nowrap">
                வழித்தடம் காண்க
              </span>
            </a>

            {/* 2. COPY ADDRESS: White Background, Forest-Green Text, Subtle Green Border */}
            <button
              type="button"
              onClick={handleCopyAddress}
              className="w-full min-h-[50px] py-2 px-4 rounded-xl bg-[#FFFFFF] hover:bg-[#F2F7F4] border border-[#456B57]/40 text-[#456B57] shadow-sm hover:shadow active:scale-[0.98] transition-all duration-200 flex flex-col items-center justify-center select-none cursor-pointer group"
              style={{ minHeight: '50px' }}
            >
              {copied ? (
                <div className="flex items-center justify-center gap-1.5 text-[#2E7D32] leading-tight">
                  <Check className="w-3.5 h-3.5 text-[#2E7D32] shrink-0" />
                  <span className="font-sans text-[11.5px] sm:text-[12px] font-bold tracking-wider uppercase whitespace-nowrap">
                    ADDRESS COPIED!
                  </span>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-1.5 whitespace-nowrap leading-tight">
                    <Copy className="w-3.5 h-3.5 text-[#456B57] shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-sans text-[11.5px] sm:text-[12px] font-semibold tracking-wider uppercase text-[#456B57] whitespace-nowrap">
                      COPY ADDRESS
                    </span>
                  </div>
                  <span className="font-tamil-sans text-[9.5px] sm:text-[10px] text-[#456B57]/80 leading-tight mt-0.5 whitespace-nowrap">
                    முகவரியை நகலெடுக்க
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Embedded Google Map Preview */}
        <div className="relative z-10 mt-6 w-full rounded-2xl overflow-hidden border border-[#C9A45C]/35 shadow-inner h-[260px] sm:h-[300px] bg-[#E6EEE8]">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="RSM Banquet Hall Location Map"
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};
