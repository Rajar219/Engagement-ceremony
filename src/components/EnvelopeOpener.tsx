'use client';

import React, { useState, useRef, useEffect } from 'react';
import { invitationConfig } from '@/config/invitation.config';

interface EnvelopeOpenerProps {
  onOpenComplete: () => void;
  isOpen: boolean;
}

export const EnvelopeOpener: React.FC<EnvelopeOpenerProps> = ({ onOpenComplete, isOpen }) => {
  const [phase, setPhase] = useState<'envelope' | 'breaking' | 'video' | 'flashing' | 'done'>('envelope');
  const [flashOpacity, setFlashOpacity] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sessionOpenedRef = useRef(false);

  const videoSrc = invitationConfig.media.videos.envelopeOpening?.src || '/assets/videos/envelope-opening.mp4';
  const posterSrc = invitationConfig.media.videos.envelopeOpening?.poster || '/assets/images/envelope-poster.jpg';

  // Handle heart seal click
  const handleSealClick = () => {
    if (phase !== 'envelope' || sessionOpenedRef.current) return;
    sessionOpenedRef.current = true;

    // Phase 1: Breaking animation
    setPhase('breaking');

    // Phase 2: Start video after seal crack & flap open animation completes
    setTimeout(() => {
      setPhase('video');
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play();
          }
        });
      }
    }, 650);
  };

  // Video time update to trigger golden-white flash right as video approaches final frames
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration > 0 && duration - currentTime <= 0.45 && phase === 'video') {
      triggerGoldenFlash();
    }
  };

  // Trigger seamless golden-white flash transition
  const triggerGoldenFlash = () => {
    setPhase('flashing');
    setFlashOpacity(1);

    // After reaching peak brightness, notify parent and fade flash into hero video
    setTimeout(() => {
      onOpenComplete();
      // Smoothly fade out the golden-white overlay into the royal lavender hero video
      setTimeout(() => {
        setFlashOpacity(0);
        setTimeout(() => {
          setPhase('done');
        }, 800);
      }, 150);
    }, 450);
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    triggerGoldenFlash();
  };

  if (isOpen && phase === 'done') {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden select-none transition-opacity duration-700 ${
        phase === 'done' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 1. INITIAL ENVELOPE STAGE (Soft Ivory Background & Premium Ivory Envelope) */}
      {(phase === 'envelope' || phase === 'breaking') && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#fdfbf7] via-[#f7f2e7] to-[#eee5d3]">
          {/* Subtle Ambient Decorative Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(188,149,224,0.12)_100%)] pointer-events-none" />

          {/* Top Auspicious Note */}
          <div className="mb-6 text-center">
            <span className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-champagne-800 font-serif font-semibold">
              ॥ श्री गणेशाय नमः ॥
            </span>
            <p className="text-xs text-lavender-900/60 font-sans tracking-widest uppercase mt-1">
              Royal Invitation
            </p>
          </div>

          {/* THE LUXURY IVORY ENVELOPE CARD */}
          <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-2xl shadow-[0_20px_60px_-15px_rgba(76,43,109,0.25)] border border-[#e8dfcf] bg-[#faf7f0] flex flex-col justify-between overflow-hidden">
            {/* Envelope Inner Texture Lines */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#faf6ee] to-[#f0e7d5] opacity-90" />
            <div className="absolute inset-2 rounded-xl border border-dashed border-champagne-500/30 pointer-events-none" />

            {/* Simulated Envelope Flap (Triangular Top) */}
            <div
              className={`absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#f5eee0] to-[#ece3d0] border-b border-champagne-500/40 shadow-sm z-20 ${
                phase === 'breaking' ? 'animate-flap-open' : ''
              }`}
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            />

            {/* Corner Ornamental Flourishes */}
            <div className="relative z-10 pt-4 px-6 flex justify-between text-champagne-600/40 text-xs font-serif">
              <span>❧</span>
              <span className="tracking-widest uppercase text-[10px] text-champagne-700/70 font-sans font-medium">
                Wedding & Engagement
              </span>
              <span>❧</span>
            </div>

            {/* CENTER: THE INTERACTIVE V&P HEART WAX SEAL */}
            <div className="relative z-30 my-auto flex flex-col items-center">
              <button
                type="button"
                onClick={handleSealClick}
                disabled={phase === 'breaking'}
                aria-label="Tap to open the V&P invitation"
                className="group relative cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                {/* Subtle Ambient Golden Halo on Hover */}
                <div className="absolute -inset-2.5 rounded-full bg-champagne-400/25 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* HEART-SHAPED WAX SEAL SVG */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(76,17,45,0.45)]">
                  {phase === 'breaking' ? (
                    /* BROKEN / CRACKED HEART SEAL ANIMATION */
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* Left Half */}
                      <svg
                        viewBox="0 0 100 100"
                        className="absolute inset-0 w-full h-full animate-seal-crack-left"
                      >
                        <defs>
                          <linearGradient id="sealGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#9a1b38" />
                            <stop offset="50%" stopColor="#7a122a" />
                            <stop offset="100%" stopColor="#550c1c" />
                          </linearGradient>
                          <clipPath id="leftClip">
                            <path d="M 0 0 L 50 0 L 48 30 L 53 55 L 49 80 L 50 100 L 0 100 Z" />
                          </clipPath>
                        </defs>
                        <g clipPath="url(#leftClip)">
                          <path
                            d="M 50,30 C 50,15 35,5 20,5 C 8,5 0,15 0,30 C 0,55 35,75 50,95 C 65,75 100,55 100,30 C 100,15 92,5 80,5 C 65,5 50,15 50,30 Z"
                            fill="url(#sealGradLeft)"
                            stroke="#d4af37"
                            strokeWidth="1.5"
                          />
                          <text
                            x="50"
                            y="48"
                            textAnchor="middle"
                            fontFamily="Cinzel, Georgia, serif"
                            fontSize="17"
                            fontWeight="bold"
                            fill="#fcfaf6"
                            stroke="#b89228"
                            strokeWidth="0.5"
                            letterSpacing="1.5"
                          >
                            V&amp;P
                          </text>
                        </g>
                      </svg>

                      {/* Right Half */}
                      <svg
                        viewBox="0 0 100 100"
                        className="absolute inset-0 w-full h-full animate-seal-crack-right"
                      >
                        <defs>
                          <linearGradient id="sealGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8d1732" />
                            <stop offset="50%" stopColor="#6d1025" />
                            <stop offset="100%" stopColor="#4a0a18" />
                          </linearGradient>
                          <clipPath id="rightClip">
                            <path d="M 50 0 L 100 0 L 100 100 L 50 100 L 49 80 L 53 55 L 48 30 Z" />
                          </clipPath>
                        </defs>
                        <g clipPath="url(#rightClip)">
                          <path
                            d="M 50,30 C 50,15 35,5 20,5 C 8,5 0,15 0,30 C 0,55 35,75 50,95 C 65,75 100,55 100,30 C 100,15 92,5 80,5 C 65,5 50,15 50,30 Z"
                            fill="url(#sealGradRight)"
                            stroke="#d4af37"
                            strokeWidth="1.5"
                          />
                          <text
                            x="50"
                            y="48"
                            textAnchor="middle"
                            fontFamily="Cinzel, Georgia, serif"
                            fontSize="17"
                            fontWeight="bold"
                            fill="#fcfaf6"
                            stroke="#b89228"
                            strokeWidth="0.5"
                            letterSpacing="1.5"
                          >
                            V&amp;P
                          </text>
                        </g>
                      </svg>
                    </div>
                  ) : (
                    /* INTACT HEART SEAL */
                    <svg viewBox="0 0 100 100" className="w-full h-full transition-transform">
                      <defs>
                        {/* Realistic Wax Gradient with 3D Depth */}
                        <radialGradient id="heartWax" cx="40%" cy="35%" r="65%">
                          <stop offset="0%" stopColor="#a32140" />
                          <stop offset="45%" stopColor="#84152f" />
                          <stop offset="85%" stopColor="#5d0d1f" />
                          <stop offset="100%" stopColor="#3d0713" />
                        </radialGradient>
                        {/* Gold Embossed Rim */}
                        <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#fdfbf7" />
                          <stop offset="35%" stopColor="#d4af37" />
                          <stop offset="70%" stopColor="#875e18" />
                          <stop offset="100%" stopColor="#f3e9d2" />
                        </linearGradient>
                      </defs>

                      {/* Outer Wax Droplet Border */}
                      <path
                        d="M 50,32 C 50,16 34,4 18,4 C 6,4 -1,16 0,32 C 1,58 35,78 50,96 C 65,78 99,58 100,32 C 101,16 94,4 82,4 C 66,4 50,16 50,32 Z"
                        fill="url(#heartWax)"
                        stroke="url(#goldRim)"
                        strokeWidth="1.75"
                      />

                      {/* Inner Sculpted Ridge */}
                      <path
                        d="M 50,36 C 50,23 37,13 23,13 C 12,13 7,22 8,34 C 9,54 38,71 50,86 C 62,71 91,54 92,34 C 93,22 88,13 77,13 C 63,13 50,23 50,36 Z"
                        fill="none"
                        stroke="rgba(212, 175, 55, 0.45)"
                        strokeWidth="0.8"
                      />

                      {/* Sharp, Centered V&P Initials */}
                      <text
                        x="50"
                        y="51"
                        textAnchor="middle"
                        fontFamily="Cinzel, Georgia, serif"
                        fontSize="18"
                        fontWeight="bold"
                        fill="#fdfbf7"
                        stroke="#caa034"
                        strokeWidth="0.6"
                        letterSpacing="1.8"
                      >
                        V&amp;P
                      </text>

                      {/* Small Subtitle underneath monogram */}
                      <text
                        x="50"
                        y="63"
                        textAnchor="middle"
                        fontFamily="system-ui, sans-serif"
                        fontSize="5.5"
                        letterSpacing="2.2"
                        fill="rgba(253, 251, 247, 0.75)"
                      >
                        2026
                      </text>
                    </svg>
                  )}
                </div>
              </button>

              {/* Subtle instruction text */}
              <div className="mt-4 flex flex-col items-center">
                <span className="text-xs uppercase tracking-[0.25em] font-medium text-champagne-800 transition-opacity duration-300 group-hover:text-champagne-950">
                  {phase === 'breaking' ? 'Opening Invitation...' : 'Tap to Open'}
                </span>
                <span className="text-[10px] text-champagne-600/70 tracking-widest mt-0.5">
                  Vallalarasu &amp; Priyanka
                </span>
              </div>
            </div>

            {/* Bottom Envelope Trim */}
            <div className="relative z-10 pb-4 px-6 text-center">
              <span className="text-[10px] text-champagne-700/60 tracking-wider font-serif">
                Chennai • Tamil Nadu
              </span>
            </div>
          </div>

          {/* Quick Skip Option */}
          <button
            type="button"
            onClick={handleSkip}
            className="mt-6 text-xs text-champagne-700/70 hover:text-champagne-900 underline underline-offset-4 tracking-wider transition-colors"
          >
            Skip to invitation directly ➔
          </button>
        </div>
      )}

      {/* 2. CINEMATIC ENVELOPE VIDEO PLAYBACK STAGE */}
      {(phase === 'video' || phase === 'flashing') && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            playsInline
            autoPlay
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={triggerGoldenFlash}
            className="w-full h-full object-contain md:object-cover"
          />

          {/* Discreet Skip Button */}
          <button
            type="button"
            onClick={handleSkip}
            className="absolute top-6 right-6 z-30 px-4 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-champagne-400/40 text-xs text-champagne-200 tracking-wider font-sans backdrop-blur-md transition-all"
          >
            Skip ➔
          </button>
        </div>
      )}

      {/* 3. GOLDEN-WHITE FLASH TRANSITION OVERLAY */}
      <div
        className="absolute inset-0 z-40 bg-[#fffdf5] pointer-events-none transition-opacity duration-500 ease-out"
        style={{
          opacity: flashOpacity,
        }}
      />
    </div>
  );
};
