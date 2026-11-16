'use client';

import React, { useState } from 'react';
import { EnvelopeOpener } from '@/components/EnvelopeOpener';
import { HeroSection } from '@/components/HeroSection';
import { CoupleIntro } from '@/components/CoupleIntro';
import { EngagementSection } from '@/components/EngagementSection';
import { WeddingSection } from '@/components/WeddingSection';
import { VenueCard } from '@/components/VenueCard';
import { MomentsGallery } from '@/components/MomentsGallery';
import { RSVPForm } from '@/components/RSVPForm';
import { WishesWall } from '@/components/WishesWall';
import { ShareBar } from '@/components/ShareBar';
import { MusicPlayer } from '@/components/MusicPlayer';
import { Footer } from '@/components/Footer';

export default function InvitationPage() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [musicTrigger, setMusicTrigger] = useState(false);

  const handleOpenComplete = () => {
    setIsEnvelopeOpened(true);
    setMusicTrigger(true);
  };

  const handleReopenEnvelope = () => {
    setIsEnvelopeOpened(false);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#12051e] text-[#fcfaf6] overflow-x-hidden selection:bg-champagne-500/30 selection:text-champagne-200">
      {/* 1. CINEMATIC OPENING: INTERACTIVE HEART SEAL & ENVELOPE VIDEO */}
      <EnvelopeOpener
        isOpen={isEnvelopeOpened}
        onOpenComplete={handleOpenComplete}
      />

      {/* 2. HERO SECTION: ROYAL LAVENDER CURTAIN VIDEO WITH HEAVENLY SKY ENTRANCE */}
      <HeroSection isVisible={isEnvelopeOpened} />

      {/* Subtle ornamental section divider */}
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div className="ornament-divider text-champagne-400/50 font-serif text-sm">
          ❦
        </div>
      </div>

      {/* 3. COUPLE INTRODUCTION & JOURNEY */}
      <CoupleIntro />

      {/* Subtle ornamental section divider */}
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div className="ornament-divider text-champagne-400/50 font-serif text-sm">
          ❦
        </div>
      </div>

      {/* 4. ENGAGEMENT CEREMONY INVITATION & COUNTDOWN TIMER */}
      <EngagementSection />

      {/* Subtle ornamental section divider */}
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div className="ornament-divider text-champagne-400/50 font-serif text-sm">
          ❦
        </div>
      </div>

      {/* 5. WEDDING CEREMONY INVITATION (HOLY MATRIMONY) */}
      <WeddingSection />

      {/* Subtle ornamental section divider */}
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div className="ornament-divider text-champagne-400/50 font-serif text-sm">
          ❦
        </div>
      </div>

      {/* 6. CEREMONY VENUE & DIRECT GOOGLE MAPS NAVIGATION */}
      <VenueCard />

      {/* Subtle ornamental section divider */}
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div className="ornament-divider text-champagne-400/50 font-serif text-sm">
          ❦
        </div>
      </div>

      {/* 7. CHERISHED MOMENTS & MILESTONES GALLERY */}
      <MomentsGallery />

      {/* Subtle ornamental section divider */}
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div className="ornament-divider text-champagne-400/50 font-serif text-sm">
          ❦
        </div>
      </div>

      {/* 8. COMPLETE INTERACTIVE RSVP SYSTEM (DATABASE BACKED) */}
      <RSVPForm />

      {/* Subtle ornamental section divider */}
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div className="ornament-divider text-champagne-400/50 font-serif text-sm">
          ❦
        </div>
      </div>

      {/* 9. WISHES & BLESSINGS WALL */}
      <WishesWall />

      {/* 10. SOCIAL SHARING & ENVELOPE REPLAY BAR */}
      <ShareBar onReopenEnvelope={handleReopenEnvelope} />

      {/* 11. FOOTER & FAMILY CLOSING BLESSING */}
      <Footer />

      {/* 12. FLOATING BACKGROUND AUDIO EXPERIENCE WITH VISIBILITY HANDLING */}
      <MusicPlayer autoPlayTrigger={musicTrigger} />
    </main>
  );
}
