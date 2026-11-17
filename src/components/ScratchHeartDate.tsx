'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const ScratchHeartDate: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawingRef = useRef(false);
  const hasTriggeredConfettiRef = useRef(false);
  const { t, language } = useLanguage();

  // Initialize canvas with golden/lavender metallic foil
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 300;
    const height = 280;
    canvas.width = width;
    canvas.height = height;

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    // Rich metallic antique gold foil gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#faf6ee');
    grad.addColorStop(0.25, '#dfba68');
    grad.addColorStop(0.5, '#c5a059');
    grad.addColorStop(0.75, '#b08b41');
    grad.addColorStop(1, '#faf6ee');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle golden speckled dust pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let i = 0; i < 200; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const r = Math.random() * 2;
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Foil border ring
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Center emblem & instructions
    ctx.fillStyle = '#231c18';
    ctx.font = 'bold 22px "Cinzel", "Cormorant Garamond", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('V & P', width / 2, height / 2 - 24);

    ctx.fillStyle = '#8c6b32';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText('SAVE THE DATE', width / 2, height / 2 + 10);

    ctx.fillStyle = 'rgba(107, 79, 32, 0.95)';
    ctx.font = '10px "Noto Sans Tamil", system-ui, sans-serif';
    ctx.fillText('✨ தேதியைக் காண தேய்க்கவும் ✨', width / 2, height / 2 + 30);
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // Scratch action helper
  const scratchAt = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas || isRevealed) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2, false);
      ctx.fill();

      calculateProgress();
    },
    [isRevealed]
  );

  // Calculate percentage scratched
  const calculateProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparentCount = 0;
      const totalPixels = pixels.length / 4;

      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) {
          transparentCount++;
        }
      }

      const percent = Math.min(100, Math.round((transparentCount / (totalPixels / 4)) * 100));
      setScratchPercent(percent);

      // Lightweight gold particle burst at 60% reveal as specified
      if (percent >= 60 && !hasTriggeredConfettiRef.current) {
        revealFully();
      }
    } catch (e) {}
  };

  const revealFully = () => {
    setIsRevealed(true);
    setScratchPercent(100);
    hasTriggeredConfettiRef.current = true;

    try {
      confetti({
        particleCount: 75,
        spread: 75,
        origin: { y: 0.65 },
        colors: ['#d4af37', '#bc95e0', '#ffffff', '#e8daf5', '#f5e6a2'],
      });
    } catch (e) {}
  };

  // Dedicated Native Touch Listeners with { passive: false } to eliminate iOS/Android page scroll jumps
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      isDrawingRef.current = true;
      const touch = e.touches[0];
      if (!touch) return;
      const rect = canvas.getBoundingClientRect();
      scratchAt(touch.clientX - rect.left, touch.clientY - rect.top);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!isDrawingRef.current) return;
      const touch = e.touches[0];
      if (!touch) return;
      const rect = canvas.getBoundingClientRect();
      scratchAt(touch.clientX - rect.left, touch.clientY - rect.top);
    };

    const handleTouchEnd = () => {
      isDrawingRef.current = false;
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
    canvas.addEventListener('touchcancel', handleTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [scratchAt, isRevealed]);

  // Desktop Pointer Events
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.pointerType === 'touch') return;
    isDrawingRef.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    scratchAt(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.pointerType === 'touch' || !isDrawingRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    scratchAt(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
  };

  return (
    <section id="scratch-section" className="relative w-full py-14 px-4 max-w-4xl mx-auto text-center">
      {/* SECTION HEADER: Save the Date • தேதியைச் சுரண்டிப் பார்க்கவும் */}
      <div className="mb-6 max-w-lg mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold gold-foil-text leading-snug">
          {t.scratchSectionHeader}
        </h2>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto mt-2 mb-3" />
        <p className="text-xs sm:text-sm text-[#5a4a42] font-tamil">
          {t.scratchHelperCaption}
        </p>
      </div>

      {/* SVG ClipPath for the Heart/Crest Shape */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="revealHeartClipVP" clipPathUnits="userSpaceOnUse">
            <path d="M 150,260 C 150,260 20,180 20,95 C 20,40 65,15 112,42 C 138,58 150,80 150,80 C 150,80 162,58 188,42 C 235,15 280,40 280,95 C 280,180 150,260 150,260 Z" />
          </clipPath>
          <linearGradient id="goldHeartBorderVP" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2A6" />
            <stop offset="35%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA771C" />
            <stop offset="100%" stopColor="#FFEAA7" />
          </linearGradient>
        </defs>
      </svg>

      {/* SCRATCH CONTAINER (GOLD-METALLIC RIMMED HEART CARD) */}
      <div
        ref={containerRef}
        className="relative w-[300px] h-[280px] mx-auto filter drop-shadow-[0_16px_36px_rgba(35,28,24,0.18)] select-none my-4"
        style={{ willChange: 'transform' }}
      >
        {/* UNDERLYING REVEALED DATE CARD: 13 • 12 • 2026 | ஞாயிறு (Sunday) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#241d18] via-[#1c1613] to-[#140f0c] border-2 border-[#c5a059]/60 flex flex-col items-center justify-center p-6 text-center select-none"
          style={{ clipPath: 'url(#revealHeartClipVP)' }}
        >
          <span className="text-xs sm:text-sm font-serif font-bold tracking-[0.22em] text-[#c5a059] uppercase block mb-1">
            {t.scratchRevealDay}
          </span>

          <div className="my-1.5 border-t border-b border-[#c5a059]/40 py-2.5 w-4/5 flex flex-col items-center justify-center">
            <h4 className="text-3xl sm:text-4xl font-serif font-black text-[#faf8f4] leading-none tracking-tight">
              {t.scratchRevealDate}
            </h4>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-[#d4c3b3] font-tamil-sans mt-1">
            <Clock className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
            <span>6:00 PM – 9:00 PM IST</span>
          </div>

          <span className="text-[10px] text-[#c5a059]/90 tracking-widest uppercase mt-0.5 font-medium font-tamil-sans">
            RSM Banquet Hall, Chennai
          </span>
        </div>

        {/* SCRATCHABLE CANVAS OVERLAY */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="absolute inset-0 z-20 cursor-pointer touch-none"
            style={{
              clipPath: 'url(#revealHeartClipVP)',
              touchAction: 'none',
              width: 300,
              height: 280,
            }}
          />
        )}

        {/* ORNAMENTAL GOLD HEART BORDER OUTLINE */}
        <svg
          width="300"
          height="280"
          viewBox="0 0 300 280"
          className="absolute inset-0 pointer-events-none z-30 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
        >
          <path
            d="M 150,260 C 150,260 20,180 20,95 C 20,40 65,15 112,42 C 138,58 150,80 150,80 C 150,80 162,58 188,42 C 235,15 280,40 280,95 C 280,180 150,260 150,260 Z"
            fill="none"
            stroke="url(#goldHeartBorderVP)"
            strokeWidth="5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* HELPER CAPTION & QUICK REVEAL BUTTON */}
      <div className="mt-4 flex flex-col items-center gap-2 text-xs text-[#5a4a42] font-sans">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ffffff] border border-[#c5a059]/35 text-[#231c18] font-tamil-sans shadow-sm">
          {t.scratchStatusLabel}: <strong>{scratchPercent}%</strong>
          {scratchPercent >= 60 ? ' • ✨ சுபமுகூர்த்த தேதி திறக்கப்பட்டது!' : ''}
        </span>

        {!isRevealed && (
          <button
            type="button"
            onClick={revealFully}
            className="mt-1 text-xs font-bold text-[#1c1613] bg-gradient-to-r from-[#b08b41] via-[#c5a059] to-[#99732f] hover:from-[#c5a059] hover:to-[#b08b41] border border-[#f4e8c8]/40 rounded-full px-5 py-1.5 shadow-md transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="font-tamil-sans">{t.scratchInstantBtn}</span>
          </button>
        )}
      </div>
    </section>
  );
};
