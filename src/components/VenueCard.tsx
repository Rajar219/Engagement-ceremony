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

  // Google Maps embed URL
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    'RSM Banquet Hall Triplicane Chennai'
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="venue-section" className="relative w-full py-20 px-4 max-w-4xl mx-auto text-center">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-2">
          Location & Directions
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold gold-gradient-text tracking-wide">
          The Ceremony Venue
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mt-4 mb-4" />
        <p className="text-sm text-gold-200/80 max-w-lg">
          We eagerly look forward to welcoming you to celebrate our special day with us.
        </p>
      </div>

      {/* Main Venue Card */}
      <div className="w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#20090e] to-[#120407] border border-gold-500/40 shadow-2xl">
        <div className="p-6 sm:p-10 text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gold-500/20">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-3">
                <Building className="w-3.5 h-3.5" />
                <span>RSM Banquet Hall</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                {venue.name}
              </h3>

              <p className="text-sm sm:text-base text-gold-200/90 font-sans mt-2 flex items-start gap-2 max-w-xl">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <span>{venue.address}, {venue.cityState}</span>
              </p>

              <div className="mt-3 flex items-center gap-2 text-xs text-gold-300/80 bg-black/40 px-3 py-1.5 rounded-lg border border-gold-500/20 w-fit">
                <Info className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>Landmark: Near Hotel Viveka, Triplicane</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap md:flex-col gap-3 shrink-0">
              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 text-burgundy-950 font-bold tracking-wider uppercase text-xs shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopyAddress}
                className="px-6 py-3 rounded-xl bg-black/50 hover:bg-gold-500/10 border border-gold-400/40 text-gold-200 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Address Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-gold-400" />
                    <span>Copy Full Address</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Embedded Interactive Map Frame */}
          <div className="mt-6 rounded-2xl overflow-hidden border border-gold-500/30 aspect-[16/9] max-h-80 w-full bg-black/60 shadow-inner">
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
