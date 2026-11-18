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
  const progressPendingRef = useRef(false);
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

  // Full-page pyrotechnics, cracker effects and grand celebration blast
  const triggerFullPagePyros = useCallback(() => {
    try {
      const count = 200;
      const defaults = {
        origin: { y: 0.68 },
        zIndex: 99999,
      };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      };

      // 1. Initial grand explosive pyro blast with golden sparkles and stars
      fire(0.25, {
        spread: 35,
        startVelocity: 65,
        shapes: ['star', 'circle'],
        colors: ['#ffd700', '#ffea75', '#ffffff', '#ffaa00'],
      });
      fire(0.2, {
        spread: 75,
        shapes: ['circle'],
        colors: ['#e0b0ff', '#ba55d3', '#ffd700', '#ff4081'],
      });
      fire(0.35, {
        spread: 120,
        decay: 0.91,
        scalar: 1.1,
        shapes: ['star', 'circle'],
        colors: ['#ffd700', '#ffffff', '#ff69b4', '#ffe4e1'],
      });
      fire(0.1, {
        spread: 140,
        startVelocity: 35,
        decay: 0.92,
        colors: ['#f5d77f', '#d4af37'],
      });
      fire(0.1, {
        spread: 150,
        startVelocity: 55,
        shapes: ['star'],
        colors: ['#ffffff', '#ffd700', '#c5a059'],
      });

      // 2. Full-Page Dual Cannon Pyros + Rapid Firecracker Sparkle Pops (3.5 seconds)
      const endTime = Date.now() + 3500;
      const crackerColors = ['#ffd700', '#ffffff', '#ff8c00', '#ff0055', '#e0b0ff', '#00e5ff', '#ffecb3'];

      const runPyros = () => {
        // Left cannon shooting up diagonally across screen
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 60,
          startVelocity: 58,
          origin: { x: 0, y: 0.85 },
          colors: crackerColors,
          shapes: ['star', 'circle'],
          zIndex: 99999,
        });

        // Right cannon shooting up diagonally across screen
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 60,
          startVelocity: 58,
          origin: { x: 1, y: 0.85 },
          colors: crackerColors,
          shapes: ['star', 'circle'],
          zIndex: 99999,
        });

        // Cracker / Sparkler pops (random aerial sparkle explosions popping across the screen)
        if (Math.random() < 0.45) {
          confetti({
            particleCount: 14,
            spread: 360,
            startVelocity: 25 + Math.random() * 20,
            ticks: 55,
            gravity: 1.1,
            decay: 0.92,
            scalar: 0.8 + Math.random() * 0.5,
            shapes: ['star', 'circle'],
            origin: {
              x: 0.15 + Math.random() * 0.7,
              y: 0.15 + Math.random() * 0.45,
            },
            colors: crackerColors,
            zIndex: 99999,
          });
        }

        if (Date.now() < endTime) {
          requestAnimationFrame(runPyros);
        }
      };

      requestAnimationFrame(runPyros);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const revealFully = useCallback(() => {
    setIsRevealed(true);
    setScratchPercent(100);
    hasTriggeredConfettiRef.current = true;
    triggerFullPagePyros();
  }, [triggerFullPagePyros]);

  // Calculate percentage scratched (lightweight sample step 32)
  const calculateProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparentCount = 0;
      let totalSampled = 0;

      for (let i = 3; i < pixels.length; i += 32) {
        totalSampled++;
        if (pixels[i] === 0) {
          transparentCount++;
        }
      }

      const percent = Math.min(100, Math.round((transparentCount / totalSampled) * 100));
      setScratchPercent(percent);

      // Lightweight gold particle burst at 60% reveal
      if (percent >= 60 && !hasTriggeredConfettiRef.current) {
        revealFully();
      }
    } catch (e) {}
  }, [isRevealed, revealFully]);

  const requestProgressCalculation = useCallback(() => {
    if (progressPendingRef.current || isRevealed) return;
    progressPendingRef.current = true;
    requestAnimationFrame(() => {
      calculateProgress();
      progressPendingRef.current = false;
    });
  }, [calculateProgress, isRevealed]);

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

      requestProgressCalculation();
    },
    [isRevealed, requestProgressCalculation]
  );

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
      {/* SECTION HEADER: Save the Date / சுப தேதியைக் குறித்துக் கொள்ளுங்கள் */}
      <div className="mb-6 max-w-lg mx-auto flex flex-col items-center">
        <span className="text-xs sm:text-sm text-[#8e6c2e] font-semibold uppercase tracking-[0.25em] font-serif block mb-0.5">
          Mark Your Calendar
        </span>
        <span className="text-xs sm:text-sm text-[#8e6c2e] font-semibold font-tamil block mb-2">
          சுப முகூர்த்த நாள்
        </span>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold gold-foil-text tracking-wide mb-1 text-center">
          Save the Date
        </h2>
        <h2 className="text-[clamp(13px,3.6vw,17px)] font-tamil font-bold gold-foil-text tracking-wide text-center max-w-sm mx-auto leading-relaxed">
          சுப தேதியைக் குறித்துக் கொள்ளுங்கள்
        </h2>

        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto mt-2.5 mb-3" />

        {/* BILINGUAL DESCRIPTION (English sentence on separate line, then Tamil on separate line) */}
        <div className="flex flex-col items-center gap-1 text-center max-w-md px-2">
          <p className="text-xs sm:text-sm text-[#5a4a42] font-serif italic">
            Scratch the golden seal below to reveal our engagement date
          </p>
          <p className="text-[11.5px] sm:text-xs text-[#5a4a42] font-tamil leading-relaxed">
            எங்கள் திருமண நிச்சயதார்த்த நன்னாளை அறிய பொன் முத்திரையைத் தேய்க்கவும்
          </p>
        </div>
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
        className="relative w-[300px] max-w-[calc(100vw-32px)] h-[280px] mx-auto filter drop-shadow-[0_16px_36px_rgba(35,28,24,0.18)] my-4"
        style={{ willChange: 'transform' }}
      >
        {/* UNDERLYING REVEALED DATE CARD: Regal Royal Purple Background (1st SUNDAY, 2nd Date & Month, 3rd Year) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#380e50] via-[#240636] to-[#150222] border-2 border-[#c5a059]/60 flex flex-col items-center justify-center p-6 text-center shadow-[inset_0_0_30px_rgba(147,51,234,0.35)]"
          style={{ clipPath: 'url(#revealHeartClipVP)' }}
        >
          {/* Subtle Royal Purple Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(192,132,252,0.25),transparent_75%)] pointer-events-none" />

          {/* 1st Line: SUNDAY */}
          <div className="relative z-10 mb-2">
            <span className="px-4 py-1 rounded-full bg-white/15 border border-[#c5a059]/60 text-[#ffffff] font-serif font-black text-xs sm:text-sm tracking-[0.3em] uppercase block drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              SUNDAY
            </span>
          </div>

          {/* 2nd Line: Date and Month (13 DECEMBER) */}
          <div className="relative z-10 my-0.5">
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#ffe599] tracking-wider uppercase leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              13 DECEMBER
            </h3>
          </div>

          {/* Delicate gold divider */}
          <div className="relative z-10 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#ffe082]/80 to-transparent my-1.5" />

          {/* 3rd Line: Year (2026) */}
          <div className="relative z-10">
            <h4 className="font-serif text-3xl sm:text-4xl font-black text-[#ffffff] tracking-widest leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              2026
            </h4>
          </div>
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
      <div className="mt-5 flex flex-col items-center gap-2.5 text-xs text-[#5a4a42]">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffffff] border border-[#c5a059]/35 text-[#231c18] font-tamil-sans shadow-sm">
          <span>🪙 {language === 'ta' ? 'தேய்த்த நிலை' : 'Scratched'}: <strong>{scratchPercent}%</strong></span>
          {scratchPercent >= 60 && <span className="text-[#8e6c2e] font-semibold">• ✨ திறக்கப்பட்டது!</span>}
        </div>

        {!isRevealed && (
          <button
            type="button"
            onClick={revealFully}
            className="mt-1 text-xs font-semibold text-[#1c1613] bg-gradient-to-r from-[#b08b41] via-[#c5a059] to-[#99732f] hover:from-[#c5a059] hover:to-[#b08b41] border border-[#f4e8c8]/40 rounded-full px-5 py-2 shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer max-w-xs"
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <div className="flex flex-col items-center leading-tight">
              <span className="font-sans font-bold">Tap to Reveal Instantly</span>
              <span className="font-tamil-sans text-[10px]">தேதியை உடனே திறக்க</span>
            </div>
          </button>
        )}
      </div>
    </section>
  );
};
