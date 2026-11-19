'use client';

import React, { useEffect, useRef } from 'react';
import { fireworksAudio } from '@/lib/fireworks-audio';

interface Spark {
  active: boolean;
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  gravity: number;
  drag: number;
  size: number;
}

interface Rocket {
  active: boolean;
  x: number;
  y: number;
  prevY: number;
  targetY: number;
  vy: number;
  launchTime: number;
  colorTheme: string[];
  hasExploded: boolean;
}

interface FountainSpark {
  active: boolean;
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
}

interface GrandFireworksOverlayProps {
  isActive: boolean;
  originX?: number;
  originY?: number;
  onComplete?: () => void;
}

const GOLD_PALETTE = ['#ffffff', '#fff3b0', '#ffe066', '#ffd700', '#dfba68', '#f5d77f'];
const ROSE_GOLD_PALETTE = ['#ffffff', '#fff0f5', '#ffd700', '#ffb6c1', '#f0a0a8', '#ffccd5'];
const CHAMPAGNE_PALETTE = ['#ffffff', '#faf8f4', '#ffe8a3', '#dfba68', '#c5a059', '#ffd97d'];
const VIOLET_GOLD_PALETTE = ['#ffffff', '#e0b0ff', '#ffd700', '#ba55d3', '#ffecb3'];

export const GrandFireworksOverlay: React.FC<GrandFireworksOverlayProps> = ({
  isActive,
  originX,
  originY,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    // Respect reduced motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      onComplete?.();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const centerX = originX !== undefined ? originX : width / 2;
    const centerY = originY !== undefined ? originY : height * 0.45;

    const startTime = performance.now();
    const DURATION_MS = 5500;

    // Preload audio
    fireworksAudio.preload();

    // 0ms Sound: Initial Boom
    fireworksAudio.playBoom();

    // Pre-allocate pools
    const MAX_SPARKS = 500;
    const sparks: Spark[] = Array.from({ length: MAX_SPARKS }, () => ({
      active: false,
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      vx: 0,
      vy: 0,
      color: '#ffd700',
      alpha: 1,
      decay: 0.02,
      gravity: 0.1,
      drag: 0.98,
      size: 2,
    }));

    const spawnSpark = (
      x: number,
      y: number,
      vx: number,
      vy: number,
      color: string,
      decay = 0.018,
      gravity = 0.1,
      size = 2.2,
      drag = 0.98
    ) => {
      for (let i = 0; i < MAX_SPARKS; i++) {
        if (!sparks[i].active) {
          const s = sparks[i];
          s.active = true;
          s.x = x;
          s.y = y;
          s.prevX = x;
          s.prevY = y;
          s.vx = vx;
          s.vy = vy;
          s.color = color;
          s.alpha = 1.0;
          s.decay = decay;
          s.gravity = gravity;
          s.drag = drag;
          s.size = size;
          return;
        }
      }
    };

    // 1. Initial Grand Golden Radial Blast (0ms)
    const initialSparks = width < 768 ? 90 : 140;
    for (let i = 0; i < initialSparks; i++) {
      const angle = (i / initialSparks) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
      const speed = Math.random() * 8.5 + 4.5;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed * 0.85;
      const col = GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)];
      spawnSpark(centerX, centerY, vx, vy, col, Math.random() * 0.012 + 0.014, 0.13, 2.5);
    }

    // 2. Rockets (Staggered launches)
    const rockets: Rocket[] = [
      {
        active: false,
        x: width * 0.24,
        y: height,
        prevY: height,
        targetY: height * 0.28,
        vy: -15,
        launchTime: 250,
        colorTheme: GOLD_PALETTE,
        hasExploded: false,
      },
      {
        active: false,
        x: width * 0.76,
        y: height,
        prevY: height,
        targetY: height * 0.22,
        vy: -16,
        launchTime: 450,
        colorTheme: ROSE_GOLD_PALETTE,
        hasExploded: false,
      },
      {
        active: false,
        x: width * 0.5,
        y: height,
        prevY: height,
        targetY: height * 0.16,
        vy: -17,
        launchTime: 750,
        colorTheme: CHAMPAGNE_PALETTE,
        hasExploded: false,
      },
      {
        active: false,
        x: width * 0.35,
        y: height,
        prevY: height,
        targetY: height * 0.32,
        vy: -14.5,
        launchTime: 1050,
        colorTheme: VIOLET_GOLD_PALETTE,
        hasExploded: false,
      },
      {
        active: false,
        x: width * 0.65,
        y: height,
        prevY: height,
        targetY: height * 0.24,
        vy: -15.5,
        launchTime: 1350,
        colorTheme: GOLD_PALETTE,
        hasExploded: false,
      },
    ];

    // 3. Ground Fountain Sparks Pool
    const MAX_FOUNTAIN = 180;
    const fountains: FountainSpark[] = Array.from({ length: MAX_FOUNTAIN }, () => ({
      active: false,
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      vx: 0,
      vy: 0,
      color: '#ffd700',
      alpha: 1,
      decay: 0.025,
    }));

    const spawnFountainSpark = (x: number, y: number, vx: number, vy: number, color: string) => {
      for (let i = 0; i < MAX_FOUNTAIN; i++) {
        if (!fountains[i].active) {
          const f = fountains[i];
          f.active = true;
          f.x = x;
          f.y = y;
          f.prevX = x;
          f.prevY = y;
          f.vx = vx;
          f.vy = vy;
          f.color = color;
          f.alpha = 1.0;
          f.decay = Math.random() * 0.02 + 0.02;
          return;
        }
      }
    };

    let hasWhistled = false;
    let hasCrackled = false;

    // Render loop
    const render = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed >= DURATION_MS) {
        ctx.clearRect(0, 0, width, height);
        onComplete?.();
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // A. Initial Golden Starburst / Flash Bloom (0 - 450ms)
      if (elapsed < 450) {
        const flashProgress = elapsed / 450;
        const flashAlpha = (1 - flashProgress) * 0.75;
        const flashRadius = Math.min(width, height) * (0.3 + flashProgress * 0.5);

        const grad = ctx.createRadialGradient(
          centerX,
          centerY,
          5,
          centerX,
          centerY,
          flashRadius
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${flashAlpha * 0.9})`);
        grad.addColorStop(0.3, `rgba(255, 235, 140, ${flashAlpha * 0.7})`);
        grad.addColorStop(0.7, `rgba(212, 175, 55, ${flashAlpha * 0.3})`);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, flashRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // B. Update & Draw Rockets
      for (let i = 0; i < rockets.length; i++) {
        const r = rockets[i];
        if (elapsed >= r.launchTime && !r.hasExploded) {
          if (!r.active) {
            r.active = true;
            if (!hasWhistled) {
              hasWhistled = true;
              fireworksAudio.playWhistle();
            }
          }

          r.prevY = r.y;
          r.y += r.vy;
          r.vy += 0.28; // gravity slowing rocket ascent

          // Rocket glowing head
          ctx.beginPath();
          ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();

          // Fiery rocket tail line
          ctx.beginPath();
          ctx.moveTo(r.x, r.y);
          ctx.lineTo(r.x + (Math.random() - 0.5) * 2, r.prevY + 8);
          ctx.strokeStyle = '#ffe57f';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Embers falling from rocket trail
          if (Math.random() < 0.6) {
            spawnSpark(
              r.x + (Math.random() - 0.5) * 4,
              r.y + 4,
              (Math.random() - 0.5) * 1.5,
              Math.random() * 2 + 1,
              '#ffd700',
              0.05,
              0.08,
              1.5,
              0.96
            );
          }

          // Check if rocket reached apex
          if (r.y <= r.targetY || r.vy >= 0) {
            r.hasExploded = true;
            r.active = false;
            fireworksAudio.playBurst();

            // Explode into spherical burst ring
            const burstCount = width < 768 ? 55 : 85;
            for (let j = 0; j < burstCount; j++) {
              const angle = (j / burstCount) * Math.PI * 2;
              const spd = Math.random() * 5.5 + 2.5;
              const vx = Math.cos(angle) * spd;
              const vy = Math.sin(angle) * spd;
              const col = r.colorTheme[Math.floor(Math.random() * r.colorTheme.length)];
              spawnSpark(r.x, r.y, vx, vy, col, Math.random() * 0.015 + 0.014, 0.09, 2.2);
            }
          }
        }
      }

      // C. Ground Fountain Pyros (1300ms - 3400ms)
      if (elapsed >= 1300 && elapsed <= 3400) {
        if (!hasCrackled) {
          hasCrackled = true;
          fireworksAudio.playCrackle();
        }

        const leftX = width * 0.06;
        const rightX = width * 0.94;
        const groundY = height - 10;
        const sparksPerFrame = width < 768 ? 2 : 4;

        for (let k = 0; k < sparksPerFrame; k++) {
          // Left fountain: shoots up and right (62° to 78°)
          const leftAngle = (Math.PI / 180) * (62 + Math.random() * 16);
          const leftSpd = Math.random() * 8 + 12;
          spawnFountainSpark(
            leftX,
            groundY,
            Math.cos(leftAngle) * leftSpd,
            -Math.sin(leftAngle) * leftSpd,
            GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)]
          );

          // Right fountain: shoots up and left (102° to 118°)
          const rightAngle = (Math.PI / 180) * (102 + Math.random() * 16);
          const rightSpd = Math.random() * 8 + 12;
          spawnFountainSpark(
            rightX,
            groundY,
            Math.cos(rightAngle) * rightSpd,
            -Math.sin(rightAngle) * rightSpd,
            GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)]
          );
        }
      }

      // D. Draw Fountain Sparks
      for (let i = 0; i < MAX_FOUNTAIN; i++) {
        const f = fountains[i];
        if (f.active) {
          f.prevX = f.x;
          f.prevY = f.y;
          f.x += f.vx;
          f.y += f.vy;
          f.vy += 0.38; // gravity pulling fountain down in beautiful arch
          f.vx *= 0.985;
          f.alpha -= f.decay;

          if (f.alpha <= 0 || f.y > height) {
            f.active = false;
            continue;
          }

          ctx.save();
          ctx.globalAlpha = Math.max(0, f.alpha);
          ctx.strokeStyle = f.color;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(f.prevX, f.prevY);
          ctx.lineTo(f.x, f.y);
          ctx.stroke();
          ctx.restore();
        }
      }

      // E. Draw Sparks & Glowing Trails
      for (let i = 0; i < MAX_SPARKS; i++) {
        const s = sparks[i];
        if (s.active) {
          s.prevX = s.x;
          s.prevY = s.y;
          s.x += s.vx;
          s.y += s.vy;
          s.vy += s.gravity;
          s.vx *= s.drag;
          s.vy *= s.drag;
          s.alpha -= s.decay;

          if (s.alpha <= 0 || s.y > height + 20) {
            s.active = false;
            continue;
          }

          ctx.save();
          ctx.globalAlpha = Math.max(0, s.alpha);

          // Spark trail line
          ctx.strokeStyle = s.color;
          ctx.lineWidth = s.size;
          ctx.beginPath();
          ctx.moveTo(s.prevX, s.prevY);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();

          // Bright center dot
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 0.45, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      fireworksAudio.stopAll();
    };
  }, [isActive, originX, originY, onComplete]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999] w-full h-full"
      aria-hidden="true"
    />
  );
};
