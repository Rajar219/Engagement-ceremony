'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MailOpen, Play, Volume2, Sparkles, ChevronDown } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

interface EnvelopeOpenerProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const EnvelopeOpener: React.FC<EnvelopeOpenerProps> = ({ onOpen, isOpen }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = invitationConfig.media.videos.envelopeOpening?.src || '/assets/videos/envelope-opening.mp4';
  const posterSrc = invitationConfig.media.videos.envelopeOpening?.poster || '/assets/images/envelope-poster.jpg';

  const handleStartOpening = () => {
    setIsPlayingVideo(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Fallback if browser autoplay policy blocks unmuted play
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      });
    }
  };

  const handleVideoEnded = () => {
    setVideoEnded(true);
    setTimeout(() => {
      onOpen();
    }, 600);
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onOpen();
  };

  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-all duration-700">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-burgundy-900/60 via-black to-black opacity-90 pointer-events-none" />

      {/* Floating sparkles background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4 py-6 flex flex-col items-center text-center">
        {!isPlayingVideo ? (
          /* INITIAL ENVELOPE CARD */
          <div className="w-full flex flex-col items-center animate-subtle-float">
            {/* Auspicious Inscription */}
            <p className="text-xs tracking-[0.3em] uppercase text-gold-400/80 mb-3 font-serif">
              ॥ श्री गणेशाय नमः ॥
            </p>

            {/* Envelope Frame Card */}
            <div className="relative w-full aspect-[4/5] max-h-[520px] rounded-2xl overflow-hidden border-2 border-gold-500/40 shadow-2xl bg-gradient-to-b from-burgundy-950 via-[#1e070c] to-black flex flex-col items-center justify-between p-6">
              {/* Background Poster Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transition-transform duration-1000 hover:scale-110"
                style={{ backgroundImage: `url(${posterSrc})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-burgundy-950/70 to-transparent" />

              {/* Top Ornamental Details */}
              <div className="relative z-10 pt-2 flex flex-col items-center">
                <span className="text-xs uppercase tracking-[0.25em] text-gold-300 font-sans font-medium px-4 py-1 rounded-full bg-gold-950/60 border border-gold-500/30 backdrop-blur-sm">
                  Royal Invitation
                </span>
                <h3 className="font-serif text-lg tracking-wider text-gold-200 mt-4">
                  The Engagement Ceremony
                </h3>
              </div>

              {/* Center Monogram Wax Seal Icon */}
              <div className="relative z-10 my-auto flex flex-col items-center">
                <div className="relative group cursor-pointer" onClick={handleStartOpening}>
                  {/* Outer pulsating ring */}
                  <div className="absolute -inset-3 rounded-full bg-gold-500/20 blur-md animate-ping" />
                  
                  {/* Gold Wax Seal Badge */}
                  <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-gold-300 via-gold-600 to-gold-800 p-1 shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-burgundy-950 to-burgundy-900 flex flex-col items-center justify-center border border-gold-400/60 text-center">
                      <span className="font-serif text-2xl font-bold tracking-widest text-gold-300">
                        {invitationConfig.couple.monogram}
                      </span>
                      <span className="text-[9px] tracking-widest uppercase text-gold-400/80 font-sans mt-0.5">
                        Seal
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <h2 className="font-serif text-2xl font-bold tracking-wide text-white">
                    {invitationConfig.couple.groom.firstName} & {invitationConfig.couple.bride.firstName}
                  </h2>
                  <p className="text-xs text-gold-300/80 tracking-widest mt-1">
                    Sunday, 13th December 2026
                  </p>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="relative z-10 w-full pb-2">
                <button
                  onClick={handleStartOpening}
                  className="w-full group relative overflow-hidden py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 text-burgundy-950 font-semibold tracking-wider uppercase text-sm shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.8)] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MailOpen className="w-5 h-5 text-burgundy-950 transition-transform group-hover:scale-110" />
                  <span>Tap to Open Invitation</span>
                  <Sparkles className="w-4 h-4 text-burgundy-950" />
                </button>
              </div>
            </div>

            {/* Quick Skip link */}
            <button
              onClick={handleSkip}
              className="mt-4 text-xs text-gold-400/70 hover:text-gold-200 transition-colors flex items-center gap-1.5 underline underline-offset-4"
            >
              Skip intro & view invitation directly
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          /* VIDEO PLAYING STAGE */
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full aspect-[9/16] max-h-[82vh] rounded-2xl overflow-hidden border-2 border-gold-500/50 shadow-2xl bg-black">
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                playsInline
                className="w-full h-full object-cover"
                onEnded={handleVideoEnded}
              />

              {/* Overlay Skip Button */}
              <button
                onClick={handleSkip}
                className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/90 border border-gold-400/40 text-xs text-gold-300 font-medium tracking-wide backdrop-blur-md transition-all"
              >
                Skip to Invitation ➔
              </button>
            </div>

            <p className="text-xs text-gold-400/70 mt-3 tracking-widest uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              Unfolding your invitation...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
