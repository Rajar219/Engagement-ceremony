'use client';

import React, { useState } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { EnvelopeOpener } from '@/components/EnvelopeOpener';
import { NavigationBar } from '@/components/NavigationBar';
import { HeroSection } from '@/components/HeroSection';
import { CoupleIntro } from '@/components/CoupleIntro';
import { ScratchHeartDate } from '@/components/ScratchHeartDate';
import { MainCeremonyCard } from '@/components/MainCeremonyCard';
import { BlessingsFamilyCard } from '@/components/BlessingsFamilyCard';
import { EngagementSection } from '@/components/EngagementSection';
import { WeddingSection } from '@/components/WeddingSection';
import { VenueCard } from '@/components/VenueCard';
import { DirectoryAndRSVPCard } from '@/components/DirectoryAndRSVPCard';
import { ShareBar } from '@/components/ShareBar';
import { Footer } from '@/components/Footer';
import { MusicPlayer } from '@/components/MusicPlayer';

export default function InvitationPage() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [musicTrigger, setMusicTrigger] = useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('opened') === 'true' || params.get('hero') === '1') {
        setIsEnvelopeOpened(true);
      }
    }
  }, []);

  const handleOpenComplete = () => {
    setIsEnvelopeOpened(true);
    setMusicTrigger(true);
  };

  const handleReopenEnvelope = () => {
    setIsEnvelopeOpened(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LanguageProvider>
      <div className="w-full min-h-[100dvh] bg-[#f0eae1] flex justify-center overflow-x-hidden selection:bg-[#c5a059]/30 selection:text-[#231c18]">
        {/* INVITATION WRAPPER: Forced mobile 430px viewport on all devices (PC, Mac, Tablet, Mobile) */}
        <main className="invitation-wrapper relative min-h-[100dvh] w-full max-w-[430px] bg-[#faf8f4] text-[#231c18] shadow-[0_0_50px_rgba(35,28,24,0.14)] overflow-x-hidden">
          {/* SECTION 0: FULL-SCREEN TAP-TO-OPEN WAX SEAL INTRO GATE (100dvh) */}
          <EnvelopeOpener
            isOpen={isEnvelopeOpened}
            onOpenStart={() => setMusicTrigger(true)}
            onOpenComplete={handleOpenComplete}
          />

          {/* TOP FLOATING NAVIGATION BAR WITH BILINGUAL PILL TOGGLE & RSVP CTA */}
          <NavigationBar isVisible={isEnvelopeOpened} />

          {/* SECTION 1: HERO SECTION WITH EDITORIAL COUPLE NAME CENTERPIECE & VIDEO BACKGROUND */}
          <HeroSection isVisible={isEnvelopeOpened} />

        {/* Refined Gilded Divider */}
        <div className="w-full max-w-4xl mx-auto px-4 py-4">
          <div className="ornament-divider text-[#c5a059]/40 font-serif text-sm">
            ❦
          </div>
        </div>

        {/* BRIDE & GROOM INTRODUCTION WITH PARENT LINEAGE (Without big Tamil initials) */}
        <CoupleIntro />

        {/* Refined Gilded Divider */}
        <div className="w-full max-w-4xl mx-auto px-4 py-4">
          <div className="ornament-divider text-[#c5a059]/40 font-serif text-sm">
            ❦
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE GOLD-RIMMED HEART SCRATCH-TO-REVEAL DATE CARD */}
        <ScratchHeartDate />

        {/* Refined Gilded Divider */}
        <div className="w-full max-w-4xl mx-auto px-4 py-4">
          <div className="ornament-divider text-[#c5a059]/40 font-serif text-sm">
            ❦
          </div>
        </div>

        {/* SECTION 3: MAIN CEREMONY CARD (3 INFO PILLS + 2 FULL-WIDTH STACKED ACTIONS) */}
        <MainCeremonyCard />

        {/* Refined Gilded Divider */}
        <div className="w-full max-w-4xl mx-auto px-4 py-4">
          <div className="ornament-divider text-[#c5a059]/40 font-serif text-sm">
            ❦
          </div>
        </div>

        {/* SECTION 4: BLESSINGS & FAMILY INVITATION CARD (BOTH FAMILIES NAMED) */}
        <BlessingsFamilyCard />

        {/* Refined Gilded Divider */}
        <div className="w-full max-w-4xl mx-auto px-4 py-4">
          <div className="ornament-divider text-[#c5a059]/40 font-serif text-sm">
            ❦
          </div>
        </div>

        {/* AUSPICIOUS MOMENT COUNTDOWN TIMER & CALENDAR INTEGRATION */}
        <EngagementSection />

        {/* Refined Gilded Divider */}
        <div className="w-full max-w-4xl mx-auto px-4 py-4">
          <div className="ornament-divider text-[#c5a059]/40 font-serif text-sm">
            ❦
          </div>
        </div>

        {/* HOLY MATRIMONY / WEDDING MUHURTHAM ANNOUNCEMENT (TO BE ANNOUNCED) */}
        <WeddingSection />

        {/* Refined Gilded Divider */}
        <div className="w-full max-w-4xl mx-auto px-4 py-4">
          <div className="ornament-divider text-[#c5a059]/40 font-serif text-sm">
            ❦
          </div>
        </div>

        {/* VENUE & LOCATION (RSM BANQUET HALL, TRIPLICANE, CHENNAI) */}
        <VenueCard />

        {/* Refined Gilded Divider */}
        <div className="w-full max-w-4xl mx-auto px-4 py-4">
          <div className="ornament-divider text-[#c5a059]/40 font-serif text-sm">
            ❦
          </div>
        </div>

        {/* SECTION 6: "WITH BEST COMPLIMENTS FROM" DIRECTORY & COMPLETE RSVP SYSTEM */}
        <DirectoryAndRSVPCard />

        {/* INVITATION SHARING & ENVELOPE REPLAY BAR */}
        <ShareBar onReopenEnvelope={handleReopenEnvelope} />

        {/* AUSPICIOUS CLOSING FOOTER & FAMILY SIGNATURE */}
        <Footer />

        {/* FLOATING MUSIC PLAYER WITH EQUALIZER & VISIBILITY MANAGEMENT */}
        <MusicPlayer autoPlayTrigger={musicTrigger} />
      </main>
    </div>
  </LanguageProvider>
  );
}
