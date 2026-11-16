'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, ExternalLink, Building, Info } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

export const VenueCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { venue } = invitationConfig.engagement;

  const fullAddress = `${venue.name}, ${venue.address}, ${venue.cityState}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'RSM Banquet Hall 35/37 Dr Besant Rd Triplicane Chennai 600005'
  )}`;

  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    'RSM Banquet Hall Triplicane Chennai'
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="venue-section" className="relative w-full py-16 px-4 max-w-4xl mx-auto text-center">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-champagne-400 font-semibold mb-2">
          Venue &amp; Location
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold champagne-gradient-text tracking-wide">
          The Ceremony Venue
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-champagne-400 to-transparent mt-4 mb-4" />
        <p className="text-xs sm:text-sm text-ivory-100/80 max-w-md">
          Join us at RSM Banquet Hall in the heart of Chennai for the engagement celebration.
        </p>
      </div>

      {/* Main Venue Card */}
      <div className="w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#240e3d]/85 to-[#12051e]/95 border border-champagne-400/40 shadow-2xl backdrop-blur-md">
        <div className="p-6 sm:p-10 text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-champagne-400/20">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-500/20 text-champagne-300 text-xs font-semibold uppercase tracking-wider mb-3">
                <Building className="w-3.5 h-3.5" />
                <span>RSM Banquet Hall</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                {venue.name}
              </h3>

              <p className="text-xs sm:text-sm text-ivory-100/90 font-sans mt-2 flex items-start gap-2 max-w-xl">
                <MapPin className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                <span>{venue.address}, {venue.cityState}</span>
              </p>

              <div className="mt-3 flex items-center gap-2 text-xs text-champagne-300/80 bg-[#140624]/70 px-3 py-1.5 rounded-lg border border-champagne-400/20 w-fit">
                <Info className="w-3.5 h-3.5 text-champagne-400 shrink-0" />
                <span>Landmark: Near Hotel Viveka, Triplicane</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap md:flex-col gap-3 shrink-0">
              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-champagne-500 to-champagne-600 text-[#18072d] font-bold tracking-wider uppercase text-xs shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleCopyAddress}
                className="px-5 py-2.5 rounded-xl bg-[#140624]/70 hover:bg-champagne-500/10 border border-champagne-400/40 text-champagne-200 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Address Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-champagne-400" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Embedded Interactive Map Frame */}
          <div className="mt-6 rounded-2xl overflow-hidden border border-champagne-400/30 aspect-[16/9] max-h-80 w-full bg-black/60 shadow-inner">
            <iframe
              title="RSM Banquet Hall Location"
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
