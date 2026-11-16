'use client';

import React, { useState } from 'react';
import { EnvelopeOpener } from '@/components/EnvelopeOpener';
import { HeroSection } from '@/components/HeroSection';
import { EventSchedule } from '@/components/EventSchedule';
import { VenueCard } from '@/components/VenueCard';
import { RSVPForm } from '@/components/RSVPForm';
import { WishesWall } from '@/components/WishesWall';
import { ShareBar } from '@/components/ShareBar';
import { MusicPlayer } from '@/components/MusicPlayer';
import { Footer } from '@/components/Footer';

export default function InvitationPage() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [musicTrigger, setMusicTrigger] = useState(false);

  const handleOpenInvitation = () => {
    setIsEnvelopeOpened(true);
    setMusicTrigger(true);
  };

  const handleReopenEnvelope = () => {
    setIsEnvelopeOpened(false);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#0e0306] text-[#fbf7ee] overflow-x-hidden">
      {/* 1. INTERACTIVE ENVELOPE OPENING MODAL */}
      <EnvelopeOpener
        isOpen={isEnvelopeOpened}
        onOpen={handleOpenInvitation}
      />

      {/* 2. HERO SECTION WITH VIDEO BACKGROUND & LIVE COUNTDOWN */}
      <HeroSection />

      {/* Subtle ornamental section divider */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="ornament-divider text-gold-400/60 font-serif text-sm">
          ❦
        </div>
      </div>

      {/* 3. EVENT TIMELINE & ITINERARY */}
      <EventSchedule />

      {/* Subtle ornamental section divider */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="ornament-divider text-gold-400/60 font-serif text-sm">
          ❦
        </div>
      </div>

      {/* 4. CEREMONY VENUE & GOOGLE MAPS */}
      <VenueCard />

      {/* Subtle ornamental section divider */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="ornament-divider text-gold-400/60 font-serif text-sm">
          ❦
        </div>
      </div>

      {/* 5. PERFECT INTERACTIVE RSVP SYSTEM */}
      <RSVPForm />

      {/* Subtle ornamental section divider */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="ornament-divider text-gold-400/60 font-serif text-sm">
          ❦
        </div>
      </div>

      {/* 6. WISHES & BLESSINGS WALL */}
      <WishesWall />

      {/* 7. SHARE & ACTIONS BAR */}
      <ShareBar onReopenEnvelope={handleReopenEnvelope} />

      {/* 8. FOOTER WITH FAMILY BLESSINGS */}
      <Footer />

      {/* 9. FLOATING AMBIENT AUDIO PLAYER */}
      <MusicPlayer autoPlayTrigger={musicTrigger} />
    </main>
  );
}
