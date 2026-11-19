'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Global Premium Animated Golden Floral Effects
 * Engineered for luxury aesthetics and 60/30fps zero-lag performance on mobile & desktop.
 * Features:
 * - Tiny champagne-gold flower petals with 3D tumbling & vein highlights
 * - Delicate miniature golden leaves with rib contours
 * - Occasional small floral blossoms with gentle continuous rotation
 * - Subtle floating gold dust specks with soft luminous pulse
 * - Single unified canvas background layer across the entire invitation website
 * - Zero allocations in render loop, visibility throttling, and prefers-reduced-motion support
 */

interface Petal {
  x: number;
  y: number;
  length: number;
  width: number;
  speedY: number;
  driftX: number;
  rotation: number;
  rotSpeed: number;
  flip: number;
  flipSpeed: number;
  swayPhase: number;
  swaySpeed: number;
  swayAmp: number;
  opacity: number;
  color: string;
}

interface Leaf {
  x: number;
  y: number;
  length: number;
  width: number;
  speedY: number;
  driftX: number;
  rotation: number;
  rotSpeed: number;
  flip: number;
  flipSpeed: number;
  swayPhase: number;
  swaySpeed: number;
  swayAmp: number;
  opacity: number;
  color: string;
}

interface MiniFlower {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  driftX: number;
  rotation: number;
  rotSpeed: number;
  swayPhase: number;
  swaySpeed: number;
  swayAmp: number;
  opacity: number;
  petalCount: number;
}

interface DustSpeck {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
}

// Pre-defined luxury champagne-gold palette (avoiding runtime string allocation)
const PETAL_COLORS = ['#e5b839', '#dfba68', '#f0d078', '#c5a059', '#ffd97d'];
const LEAF_COLORS = ['#d4a838', '#cba043', '#bfa048', '#e0be5a'];
const FLOWER_FILL = '#dfba68';
const FLOWER_PISTIL = '#fff2a8';
const VEIN_HIGHLIGHT = '#fff5c2';
const DUST_COLOR = 'rgba(245, 222, 145, 0.65)';

export const GoldenFloralLiveEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect user's reduced motion preference
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = 0;
    const fpsInterval = 1000 / 30; // 30fps cap for zero stutter & low battery drain
    let isPaused = false;

    // DPR capped at 1.0 for particle canvas to eliminate GPU fillrate overhead
    const dpr = 1.0;
    let canvasWidth = 0;
    let canvasHeight = 0;

    let isMobile = false;

    // Pre-allocated arrays
    let petals: Petal[] = [];
    let leaves: Leaf[] = [];
    let flowers: MiniFlower[] = [];
    let dustSpecks: DustSpeck[] = [];

    const initParticles = () => {
      isMobile = canvasWidth < 768;

      const petalCount = isMobile ? 12 : 24;
      const leafCount = isMobile ? 6 : 12;
      const flowerCount = isMobile ? 4 : 8;
      const dustCount = isMobile ? 14 : 26;

      petals = Array.from({ length: petalCount }, (_, i) => {
        const length = Math.random() * 5 + 8; // 8px - 13px
        return {
          x: Math.random() * canvasWidth,
          y: (i / petalCount) * canvasHeight + (Math.random() - 0.5) * 40,
          length,
          width: length * 0.48,
          speedY: Math.random() * 0.35 + 0.3, // slow gentle descent
          driftX: (Math.random() - 0.5) * 0.15,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.012,
          flip: Math.random() * Math.PI,
          flipSpeed: Math.random() * 0.018 + 0.008,
          swayPhase: Math.random() * Math.PI * 2,
          swaySpeed: Math.random() * 0.016 + 0.01,
          swayAmp: Math.random() * 0.9 + 0.5,
          opacity: Math.random() * 0.25 + 0.5,
          color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        };
      });

      leaves = Array.from({ length: leafCount }, (_, i) => {
        const length = Math.random() * 5 + 9; // 9px - 14px
        return {
          x: Math.random() * canvasWidth,
          y: (i / leafCount) * canvasHeight + (Math.random() - 0.5) * 40,
          length,
          width: length * 0.44,
          speedY: Math.random() * 0.3 + 0.25,
          driftX: (Math.random() - 0.5) * 0.18,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.01,
          flip: Math.random() * Math.PI,
          flipSpeed: Math.random() * 0.015 + 0.006,
          swayPhase: Math.random() * Math.PI * 2,
          swaySpeed: Math.random() * 0.014 + 0.008,
          swayAmp: Math.random() * 0.8 + 0.4,
          opacity: Math.random() * 0.2 + 0.48,
          color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
        };
      });

      flowers = Array.from({ length: flowerCount }, (_, i) => {
        const radius = Math.random() * 2 + 5; // 5px - 7px radius (10-14px flower)
        return {
          x: Math.random() * canvasWidth,
          y: (i / flowerCount) * canvasHeight + (Math.random() - 0.5) * 40,
          radius,
          speedY: Math.random() * 0.25 + 0.2,
          driftX: (Math.random() - 0.5) * 0.12,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.009,
          swayPhase: Math.random() * Math.PI * 2,
          swaySpeed: Math.random() * 0.012 + 0.006,
          swayAmp: Math.random() * 0.7 + 0.3,
          opacity: Math.random() * 0.25 + 0.45,
          petalCount: Math.random() < 0.5 ? 4 : 5,
        };
      });

      dustSpecks = Array.from({ length: dustCount }, () => ({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        radius: Math.random() * 0.8 + 0.5,
        speedY: -(Math.random() * 0.2 + 0.08), // drifting gently upward
        speedX: (Math.random() - 0.5) * 0.08,
        opacity: Math.random() * 0.3 + 0.35,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.025 + 0.015,
      }));
    };

    const resize = () => {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;

      canvas.width = Math.round(canvasWidth * dpr);
      canvas.height = Math.round(canvasHeight * dpr);
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      initParticles();
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Zero-allocation render loop
    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (isPaused) return;

      const delta = time - lastTime;
      if (delta < fpsInterval) return;
      lastTime = time - (delta % fpsInterval);

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // 1. Draw subtle floating gold dust specks
      ctx.fillStyle = DUST_COLOR;
      for (let i = 0; i < dustSpecks.length; i++) {
        const d = dustSpecks[i];
        d.y += d.speedY;
        d.x += d.speedX;
        d.pulsePhase += d.pulseSpeed;

        if (d.y < -10) {
          d.y = canvasHeight + 10;
          d.x = Math.random() * canvasWidth;
        }
        if (d.x < -10) d.x = canvasWidth + 10;
        if (d.x > canvasWidth + 10) d.x = -10;

        ctx.globalAlpha = d.opacity * (0.65 + 0.35 * Math.sin(d.pulsePhase));
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw tiny champagne-gold petals
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.swayPhase += p.swaySpeed;
        p.y += p.speedY;
        p.x += Math.sin(p.swayPhase) * p.swayAmp * 0.4 + p.driftX;
        p.rotation += p.rotSpeed;
        p.flip += p.flipSpeed;

        // Reset smoothly when exiting bottom
        if (p.y > canvasHeight + p.length * 2) {
          p.y = -p.length * 2;
          p.x = Math.random() * canvasWidth;
        }
        if (p.x < -p.length * 2) p.x = canvasWidth + p.length * 2;
        if (p.x > canvasWidth + p.length * 2) p.x = -p.length * 2;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(Math.cos(p.flip), 1);
        ctx.globalAlpha = p.opacity;

        // Curved petal geometry
        ctx.beginPath();
        ctx.moveTo(0, -p.length);
        ctx.bezierCurveTo(p.width, -p.length * 0.45, p.width, p.length * 0.5, 0, p.length);
        ctx.bezierCurveTo(-p.width, p.length * 0.5, -p.width, -p.length * 0.45, 0, -p.length);
        ctx.closePath();
        ctx.fillStyle = p.color;
        ctx.fill();

        // Delicate central vein
        ctx.beginPath();
        ctx.moveTo(0, -p.length * 0.65);
        ctx.lineTo(0, p.length * 0.65);
        ctx.strokeStyle = VEIN_HIGHLIGHT;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.restore();
      }

      // 3. Draw miniature golden leaves
      for (let i = 0; i < leaves.length; i++) {
        const l = leaves[i];
        l.swayPhase += l.swaySpeed;
        l.y += l.speedY;
        l.x += Math.sin(l.swayPhase) * l.swayAmp * 0.35 + l.driftX;
        l.rotation += l.rotSpeed;
        l.flip += l.flipSpeed;

        if (l.y > canvasHeight + l.length * 2) {
          l.y = -l.length * 2;
          l.x = Math.random() * canvasWidth;
        }
        if (l.x < -l.length * 2) l.x = canvasWidth + l.length * 2;
        if (l.x > canvasWidth + l.length * 2) l.x = -l.length * 2;

        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.rotation);
        ctx.scale(Math.cos(l.flip), 1);
        ctx.globalAlpha = l.opacity;

        // Slender tapered leaf
        ctx.beginPath();
        ctx.moveTo(0, -l.length);
        ctx.bezierCurveTo(l.width * 0.85, -l.length * 0.35, l.width * 0.7, l.length * 0.4, 0, l.length);
        ctx.bezierCurveTo(-l.width * 0.7, l.length * 0.4, -l.width * 0.85, -l.length * 0.35, 0, -l.length);
        ctx.closePath();
        ctx.fillStyle = l.color;
        ctx.fill();

        // Rib and side veins
        ctx.beginPath();
        ctx.moveTo(0, -l.length * 0.75);
        ctx.lineTo(0, l.length * 0.75);
        ctx.moveTo(0, -l.length * 0.15);
        ctx.lineTo(l.width * 0.35, -l.length * 0.3);
        ctx.moveTo(0, l.length * 0.15);
        ctx.lineTo(-l.width * 0.35, 0);
        ctx.strokeStyle = VEIN_HIGHLIGHT;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.restore();
      }

      // 4. Draw occasional small floral blossoms
      for (let i = 0; i < flowers.length; i++) {
        const f = flowers[i];
        f.swayPhase += f.swaySpeed;
        f.y += f.speedY;
        f.x += Math.sin(f.swayPhase) * f.swayAmp * 0.3 + f.driftX;
        f.rotation += f.rotSpeed;

        if (f.y > canvasHeight + f.radius * 3) {
          f.y = -f.radius * 3;
          f.x = Math.random() * canvasWidth;
        }
        if (f.x < -f.radius * 3) f.x = canvasWidth + f.radius * 3;
        if (f.x > canvasWidth + f.radius * 3) f.x = -f.radius * 3;

        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rotation);
        ctx.globalAlpha = f.opacity;

        const petals = f.petalCount;
        const step = (Math.PI * 2) / petals;
        ctx.fillStyle = FLOWER_FILL;

        for (let j = 0; j < petals; j++) {
          const angle = j * step;
          ctx.save();
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.ellipse(0, -f.radius * 0.65, f.radius * 0.35, f.radius * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Central pistil dot
        ctx.fillStyle = FLOWER_PISTIL;
        ctx.beginPath();
        ctx.arc(0, 0, f.radius * 0.28, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      ctx.globalAlpha = 1.0;
    };

    animationFrameId = requestAnimationFrame(render);

    // Pause when tab is hidden to conserve battery
    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] w-full h-full"
      aria-hidden="true"
    />
  );
};
