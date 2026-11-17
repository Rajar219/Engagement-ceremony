'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, ExternalLink, Building, Info } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';
import { useLanguage } from '@/context/LanguageContext';
import { CornerOrnaments } from '@/components/CornerOrnaments';

export const VenueCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { venue } = invitationConfig.engagement;
  const { t, language } = useLanguage();

  const fullAddress = `${venue.name}, ${venue.address}, ${venue.cityState}`;

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
    <section id="venue-section" className="relative w-full py-12 px-4 max-w-4xl mx-auto text-center">
      {/* 08. VENUE & LOCATION HEADER */}
      <div className="flex flex-col items-center mb-10">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8e6c2e] font-semibold mb-2 font-tamil-serif">
          {language === 'ta' ? 'விழா மண்டப வழிகாட்டி' : 'Ceremony Venue & Directions'}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold gold-foil-text tracking-wide">
          {language === 'ta' ? 'விழா மண்டபம்' : 'How to Reach the Venue'}
        </h2>
        <div className="ornament-divider text-[#c5a059]/60 font-serif text-sm w-44 mx-auto my-3">
          ❖
        </div>
        <p className="text-xs sm:text-sm text-[#5c534b] max-w-md font-tamil">
          {language === 'ta'
            ? 'சென்னை திருவல்லிக்கேணியில் உள்ள RSM பேங்க்வெட் ஹாலிற்கு தங்களை அன்புடன் வரவேற்கிறோம்.'
            : 'Join us at RSM Banquet Hall in the heart of Triplicane, Chennai for our joyous celebration.'}
        </p>
      </div>

      {/* Main Venue Luxury Card */}
      <div className="luxury-card p-6 sm:p-10 shadow-xl text-left overflow-hidden">
        <CornerOrnaments color="text-[#c5a059]/40" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#c5a059]/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4efe6] text-[#8e6c2e] text-xs font-semibold uppercase tracking-wider mb-3">
              <Building className="w-3.5 h-3.5" />
              <span>RSM Banquet Hall</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231c18] tracking-wide">
              {venue.name}
            </h3>

            <p className="text-xs sm:text-sm text-[#5c534b] font-tamil mt-2 flex items-start gap-2 max-w-xl">
              <MapPin className="w-4 h-4 text-[#8e6c2e] shrink-0 mt-0.5" />
              <span>{venue.address}, {venue.cityState}</span>
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs text-[#766c62] bg-[#fbf9f4] px-3.5 py-1.5 rounded-lg border border-[#c5a059]/25 w-fit font-tamil-sans">
              <Info className="w-3.5 h-3.5 text-[#8e6c2e] shrink-0" />
              <span>{language === 'ta' ? 'அடையாளம்: ஹோட்டல் விவேகா அருகில்' : 'Landmark: Near Hotel Viveka, Triplicane'}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap md:flex-col gap-3 shrink-0">
            <a
              href={mapSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-sweep px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#b08b41] text-[#231c18] font-bold tracking-wider uppercase text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 font-tamil-sans"
            >
              <Navigation className="w-4 h-4 shrink-0 text-[#231c18]" />
              <span>{language === 'ta' ? 'வழித்தடம் காண்க' : 'Get Directions'}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>

            <button
              type="button"
              onClick={handleCopyAddress}
              className="px-5 py-2.5 rounded-xl bg-[#ffffff] hover:bg-[#faf8f4] border border-[#c5a059]/40 text-[#231c18] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 font-tamil-sans cursor-pointer shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">
                    {language === 'ta' ? 'முகவரி நகலெடுக்கப்பட்டது!' : 'Address Copied!'}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#8e6c2e]" />
                  <span>{language === 'ta' ? 'முகவரியை நகலெடுக்க' : 'Copy Address'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Embedded Google Map Preview */}
        <div className="relative z-10 mt-6 w-full rounded-2xl overflow-hidden border border-[#c5a059]/30 shadow-inner h-[280px] sm:h-[320px] bg-[#f4efe6]">
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
