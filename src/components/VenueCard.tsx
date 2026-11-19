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
      className="relative z-[2] w-full py-12 px-3 xs:px-4 text-center border-y border-[#C9A45C]/30 transition-colors"
      style={{ backgroundColor: '#E6EEE8' }}
    >
      {/* SECTION HEADER: Deep Forest Green #456B57 */}
      <div className="flex flex-col items-center mb-7">
        <span className="text-[11px] sm:text-xs text-[#456B57] font-semibold uppercase tracking-[0.25em] font-serif block mb-0.5">
          Ceremony Venue &amp; Directions
        </span>
        <span className="text-[11px] sm:text-xs text-[#527E67] font-semibold font-tamil-serif block mb-2.5">
          விழா மண்டப வழிகாட்டி
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#456B57] tracking-wide mb-1">
          How to Reach the Venue
        </h2>
        <h2 className="font-tamil-heading text-3xl sm:text-4xl font-bold text-[#456B57] tracking-wide mb-3">
          விழா மண்டபம்
        </h2>

        {/* Champagne Gold Ornament Divider */}
        <div className="flex items-center justify-center gap-2 w-36 sm:w-44 mx-auto my-2.5 text-[#C9A45C]">
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
        className="relative z-10 w-full max-w-md mx-auto p-5 xs:p-6 sm:p-7 rounded-[1.75rem] border border-[#C9A45C]/35 shadow-[0_12px_40px_rgba(69,107,87,0.08)] overflow-hidden"
        style={{ backgroundColor: '#FFFEFA' }}
      >
        <CornerOrnaments color="text-[#C9A45C]/45" />

        <div className="relative z-10 flex flex-col gap-4 pb-4 border-b border-[#C9A45C]/25">
          {/* Card Top: Perfectly Centered Badge & Venue Names */}
          <div className="flex flex-col items-center text-center w-full">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6EEE8] text-[#456B57] text-xs font-semibold uppercase tracking-wider mb-2.5 border border-[#C9A45C]/20">
              <Building className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>RSM Banquet Hall</span>
            </div>

            {/* English Venue Name (Centered) */}
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1F1F] tracking-wide mb-0.5 text-center">
              RSM Banquet Hall
            </h3>

            {/* REQUIREMENT 1: TAMIL VENUE NAME ON ONE LINE (Centered, proper font, non-breaking, responsive clamp) */}
            <h3
              className="font-tamil text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#1F1F1F] tracking-normal mb-2 text-center whitespace-nowrap overflow-visible w-full select-none"
              style={{ letterSpacing: 'normal' }}
            >
              ஆர்.எஸ்.எம் பேங்க்வெட் ஹால்
            </h3>
          </div>

          {/* REQUIREMENT 3: Address Box (Left-Aligned with Vertically Aligned Location Pin) */}
          <div className="flex items-start gap-2.5 p-3 sm:p-3.5 rounded-xl bg-[#F8FAF8] border border-[#C9A45C]/25 text-left w-full">
            <MapPin className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1.5 text-left text-xs sm:text-[13px] leading-relaxed w-full">
              {/* English address */}
              <div className="font-sans text-[#2B2B2B]">
                35/37, Dr Besant Rd, Near Hotel Viveka, Triplicane, Chennai - 600005, Tamil Nadu
              </div>
              <div className="h-[0.5px] bg-[#C9A45C]/25 my-0.5 w-full" />
              {/* Tamil address */}
              <div className="font-tamil text-[#3D3D3D] tracking-normal">
                35/37, டாக்டர் பெசன்ட் சாலை, விவேகா ஹோட்டல் அருகில், திருவல்லிக்கேணி, சென்னை - 600005
              </div>
            </div>
          </div>

          {/* Landmark Box */}
          <div className="flex items-start gap-2 text-xs text-[#456B57] bg-[#F2F6F3] p-3 rounded-xl border border-[#C9A45C]/25 w-full text-left">
            <Info className="w-3.5 h-3.5 text-[#C9A45C] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5 leading-snug">
              <span className="font-sans font-medium text-[#456B57]">
                Landmark: Near Hotel Viveka, Triplicane
              </span>
              <span className="font-tamil text-[11px] text-[#456B57]/90 tracking-normal">
                அடையாளம்: ஹோட்டல் விவேகா அருகில்
              </span>
            </div>
          </div>

          {/* REQUIREMENT 2 & 3: ACTION BUTTONS (Full Width, Exact 52px Height, Perfectly Centered) */}
          <div className="flex flex-col gap-2.5 w-full mt-2">
            {/* 1. GET DIRECTIONS: Deep Forest Green #456B57 with Crisp White Text */}
            <a
              href={mapSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-[52px] min-h-[52px] rounded-xl bg-[#456B57] hover:bg-[#385847] text-[#FFFFFF] shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 flex flex-col items-center justify-center text-center px-4 select-none cursor-pointer group"
              style={{ height: '52px' }}
            >
              {/* English Label Line: [Navigation] GET DIRECTIONS [ExternalLink] */}
              <div className="flex items-center justify-center gap-1.5 w-full text-center leading-none">
                <Navigation className="w-3.5 h-3.5 shrink-0 text-[#FFFFFF] group-hover:scale-110 transition-transform" />
                <span className="font-sans text-[11.5px] sm:text-[12px] font-semibold tracking-wider uppercase text-[#FFFFFF] whitespace-nowrap">
                  GET DIRECTIONS
                </span>
                <ExternalLink className="w-3 h-3 shrink-0 text-[#FFFFFF]/85" />
              </div>

              {/* Tamil Subtitle Line: Directly underneath, strictly centered */}
              <div className="w-full text-center flex items-center justify-center leading-none mt-1">
                <span className="font-tamil text-[10px] sm:text-[10.5px] font-normal text-[#FFFFFF]/90 whitespace-nowrap tracking-normal">
                  வழித்தடம் காண்க
                </span>
              </div>
            </a>

            {/* 2. COPY ADDRESS: White Background, Forest-Green Text, Subtle Green Border */}
            <button
              type="button"
              onClick={handleCopyAddress}
              className="w-full h-[52px] min-h-[52px] rounded-xl bg-[#FFFFFF] hover:bg-[#F2F7F4] border border-[#456B57]/40 text-[#456B57] shadow-sm hover:shadow active:scale-[0.98] transition-all duration-200 flex flex-col items-center justify-center text-center px-4 select-none cursor-pointer group"
              style={{ height: '52px' }}
            >
              {copied ? (
                <div className="flex items-center justify-center gap-1.5 text-[#2E7D32] leading-none">
                  <Check className="w-4 h-4 text-[#2E7D32] shrink-0" />
                  <span className="font-sans text-[11.5px] sm:text-[12px] font-bold tracking-wider uppercase whitespace-nowrap">
                    ADDRESS COPIED!
                  </span>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-1.5 w-full text-center leading-none">
                    <Copy className="w-3.5 h-3.5 text-[#456B57] shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-sans text-[11.5px] sm:text-[12px] font-semibold tracking-wider uppercase text-[#456B57] whitespace-nowrap">
                      COPY ADDRESS
                    </span>
                  </div>
                  <div className="w-full text-center flex items-center justify-center leading-none mt-1">
                    <span className="font-tamil text-[10px] sm:text-[10.5px] font-normal text-[#456B57]/85 whitespace-nowrap tracking-normal">
                      முகவரியை நகலெடுக்க
                    </span>
                  </div>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Embedded Google Map Preview */}
        <div className="relative z-10 mt-5 w-full rounded-2xl overflow-hidden border border-[#C9A45C]/35 shadow-inner h-[240px] sm:h-[280px] bg-[#E6EEE8]">
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
