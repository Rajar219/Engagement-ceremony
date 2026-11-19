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
  isFountain?: boolean;
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
  exploded: boolean;
  whistlePlayed: boolean;
  hasWhistle?: boolean;
}

interface GrandFireworksOverlayProps {
  isActive: boolean;
  originX?: number;
  originY?: number;
  onComplete?: () => void;
}

const GOLD_CHRYSANTHEMUM = ['#ffffff', '#fff7b2', '#ffea6c', '#ffd700', '#f5b82e', '#ff9900'];
const ROSE_GOLD_FIREWORK = ['#ffffff', '#fff0f5', '#ffd700', '#ff99bb', '#ff6688', '#f0a0a8'];
const WARM_WHITE_WILLOW = ['#ffffff', '#fffff0', '#fff8dc', '#ffea88', '#e5c068'];
const LAVENDER_GOLD = ['#ffffff', '#e8b5ff', '#ffd700', '#c066ff', '#ffeb99'];
const ROYAL_AMBER = ['#ffffff', '#ffdf80', '#ffaa00', '#ff7700', '#ffd700'];

export const GrandFireworksOverlay: React.FC<GrandFireworksOverlayProps> = ({
  isActive,
  originX,
  originY,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    // Respect reduced motion accessibility
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
    const DURATION_MS = 6000;

    // Preload all audio assets
    fireworksAudio.preload();

    // 0ms Event: Initial concussive celebration blast
    fireworksAudio.playInitialBlast();

    // Pool of sparks (reusable, zero allocations)
    const MAX_SPARKS = 700;
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
      drag: 0.97,
      size: 2,
      isFountain: false,
    }));

    const spawnSpark = (
      x: number,
      y: number,
      vx: number,
      vy: number,
      color: string,
      decay = 0.016,
      gravity = 0.12,
      size = 2.2,
      drag = 0.97,
      isFountain = false
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
          s.isFountain = isFountain;
          return;
        }
      }
    };

    // 1. Initial Central Concussive Explosion (0ms)
    const initialCount = width < 768 ? 95 : 140;
    for (let i = 0; i < initialCount; i++) {
      const angle = (i / initialCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
      const speed = Math.random() * 9 + 4;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed * 0.85;
      const col = GOLD_CHRYSANTHEMUM[Math.floor(Math.random() * GOLD_CHRYSANTHEMUM.length)];
      spawnSpark(centerX, centerY, vx, vy, col, Math.random() * 0.012 + 0.014, 0.14, 2.6);
    }

    // 2. Rockets Array (Real ascending missiles that shoot from ground to sky)
    const rockets: Rocket[] = [
      {
        active: false,
        x: width * 0.26,
        y: height,
        prevY: height,
        targetY: height * 0.26,
        vy: -20,
        launchTime: 450,
        colorTheme: GOLD_CHRYSANTHEMUM,
        exploded: false,
        whistlePlayed: false,
        hasWhistle: true,
      },
      {
        active: false,
        x: width * 0.74,
        y: height,
        prevY: height,
        targetY: height * 0.20,
        vy: -21,
        launchTime: 750,
        colorTheme: ROSE_GOLD_FIREWORK,
        exploded: false,
        whistlePlayed: false,
      },
      {
        active: false,
        x: width * 0.50,
        y: height,
        prevY: height,
        targetY: height * 0.15,
        vy: -22,
        launchTime: 1400,
        colorTheme: WARM_WHITE_WILLOW,
        exploded: false,
        whistlePlayed: false,
      },
      {
        active: false,
        x: width * 0.36,
        y: height,
        prevY: height,
        targetY: height * 0.29,
        vy: -19,
        launchTime: 2000,
        colorTheme: LAVENDER_GOLD,
        exploded: false,
        whistlePlayed: false,
      },
      {
        active: false,
        x: width * 0.64,
        y: height,
        prevY: height,
        targetY: height * 0.22,
        vy: -20.5,
        launchTime: 2500,
        colorTheme: ROYAL_AMBER,
        exploded: false,
        whistlePlayed: false,
      },
      {
        // GRAND FINALE SHELL
        active: false,
        x: width * 0.50,
        y: height,
        prevY: height,
        targetY: height * 0.14,
        vy: -23,
        launchTime: 3600,
        colorTheme: GOLD_CHRYSANTHEMUM,
        exploded: false,
        whistlePlayed: false,
        hasWhistle: true,
      },
    ];

    // Chakkar (Spinning Wheel) state
    let chakkarAngle = 0;
    const chakkarX = width * 0.5;
    const chakkarY = height - 55;

    let fountainAudioPlayed = false;
    let crackleAudioPlayed = false;

    // Render loop
    const render = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed >= DURATION_MS) {
        ctx.clearRect(0, 0, width, height);
        onComplete?.();
        return;
      }

      // Smooth motion trails: fade out previous frame slightly rather than clearing completely
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
      ctx.fillRect(0, 0, width, height);

      // Additive blending for realistic glowing incendiary firework light
      ctx.globalCompositeOperation = 'lighter';

      // ==========================================
      // STAGE 1: Initial Golden Flash (0ms - 320ms)
      // ==========================================
      if (elapsed < 320) {
        const flashProgress = elapsed / 320;
        const flashAlpha = (1 - flashProgress) * 0.85;
        const flashRadius = Math.min(width, height) * (0.35 + flashProgress * 0.55);

        const grad = ctx.createRadialGradient(
          centerX,
          centerY,
          4,
          centerX,
          centerY,
          flashRadius
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${flashAlpha})`);
        grad.addColorStop(0.25, `rgba(255, 240, 160, ${flashAlpha * 0.8})`);
        grad.addColorStop(0.65, `rgba(212, 175, 55, ${flashAlpha * 0.35})`);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, flashRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ==========================================
      // STAGE 2: Real Ground Flower-Pot Fountains (300ms - 3800ms)
      // ==========================================
      if (elapsed >= 300 && elapsed <= 3800) {
        const leftFountainX = width * 0.12;
        const rightFountainX = width * 0.88;
        const fountainBaseY = height - 6;
        const countPerFrame = width < 768 ? 3 : 5;

        for (let k = 0; k < countPerFrame; k++) {
          // Left Anaar fountain: shoots upward and slightly inward (72° to 98°)
          const angleL = (Math.PI / 180) * (72 + Math.random() * 26);
          const speedL = Math.random() * 9 + 14;
          spawnSpark(
            leftFountainX + (Math.random() - 0.5) * 8,
            fountainBaseY,
            Math.cos(angleL) * speedL,
            -Math.sin(angleL) * speedL,
            GOLD_CHRYSANTHEMUM[Math.floor(Math.random() * GOLD_CHRYSANTHEMUM.length)],
            Math.random() * 0.016 + 0.018,
            0.38, // gravity pulling fountain down in parabolic weeping cascade
            2.2,
            0.985,
            true
          );

          // Right Anaar fountain: shoots upward and slightly inward (82° to 108°)
          const angleR = (Math.PI / 180) * (82 + Math.random() * 26);
          const speedR = Math.random() * 9 + 14;
          spawnSpark(
            rightFountainX + (Math.random() - 0.5) * 8,
            fountainBaseY,
            Math.cos(angleR) * speedR * -1,
            -Math.sin(angleR) * speedR,
            GOLD_CHRYSANTHEMUM[Math.floor(Math.random() * GOLD_CHRYSANTHEMUM.length)],
            Math.random() * 0.016 + 0.018,
            0.38,
            2.2,
            0.985,
            true
          );
        }

        // Draw fountain incandescent nozzles
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(leftFountainX, fountainBaseY, 3, 0, Math.PI * 2);
        ctx.arc(rightFountainX, fountainBaseY, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // ==========================================
      // STAGE 3: Spinning Ground Firework / Chakkar (1400ms - 4200ms)
      // ==========================================
      if (elapsed >= 1400 && elapsed <= 4200) {
        chakkarAngle += 0.38;
        const sparksThisFrame = width < 768 ? 4 : 7;

        for (let m = 0; m < sparksThisFrame; m++) {
          const tangentAngle = chakkarAngle + Math.PI / 2 + (Math.random() - 0.5) * 0.28;
          const spd = Math.random() * 6 + 9;
          spawnSpark(
            chakkarX,
            chakkarY,
            Math.cos(tangentAngle) * spd,
            Math.sin(tangentAngle) * spd * 0.55,
            '#ffd700',
            Math.random() * 0.022 + 0.024,
            0.12,
            1.8,
            0.96
          );
        }

        // Chakkar incandescent core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(chakkarX, chakkarY, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ffe57f';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(chakkarX, chakkarY, 9, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ==========================================
      // STAGE 4: Real Ascending Sky-Shot Rockets
      // ==========================================
      for (let i = 0; i < rockets.length; i++) {
        const r = rockets[i];
        if (elapsed >= r.launchTime && !r.exploded) {
          if (!r.active) {
            r.active = true;
          }

          if (!r.whistlePlayed) {
            r.whistlePlayed = true;
          }

          r.prevY = r.y;
          r.y += r.vy;
          r.vy += 0.30; // Deceleration on ascent

          // Draw incandescent rocket head
          ctx.beginPath();
          ctx.arc(r.x, r.y, 3.2, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();

          // Visible streaming rocket exhaust trail
          ctx.beginPath();
          ctx.moveTo(r.x, r.y);
          ctx.lineTo(r.x + (Math.random() - 0.5) * 3, r.prevY + 12);
          ctx.strokeStyle = '#fff3b0';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Falling sparks from rocket trail
          if (Math.random() < 0.75) {
            spawnSpark(
              r.x + (Math.random() - 0.5) * 4,
              r.y + 6,
              (Math.random() - 0.5) * 1.6,
              Math.random() * 3 + 1,
              '#ffd700',
              0.05,
              0.08,
              1.6,
              0.96
            );
          }

          // Apex detonation check
          if (r.y <= r.targetY || r.vy >= -1.0) {
            r.exploded = true;
            r.active = false;
            fireworksAudio.playAerialExplosion();

            // Spawn spherical chrysanthemum explosion
            const burstCount = i === rockets.length - 1 ? (width < 768 ? 120 : 160) : (width < 768 ? 75 : 105);
            for (let j = 0; j < burstCount; j++) {
              const angle = (j / burstCount) * Math.PI * 2;
              const spd = Math.random() * 6.5 + 3.2;
              const vx = Math.cos(angle) * spd;
              const vy = Math.sin(angle) * spd;
              const col = r.colorTheme[Math.floor(Math.random() * r.colorTheme.length)];
              spawnSpark(
                r.x,
                r.y,
                vx,
                vy,
                col,
                Math.random() * 0.012 + 0.014,
                0.09, // gentle drooping willow gravity
                2.4,
                0.975
              );
            }
          }
        }
      }

      // ==========================================
      // STAGE 5: Crackling Ground Sparks (2200ms - 4500ms)
      // ==========================================
      if (elapsed >= 2200 && elapsed <= 4500 && Math.random() < 0.18) {

        // Small secondary crackling burst
        const bx = width * 0.2 + Math.random() * (width * 0.6);
        const by = height * 0.25 + Math.random() * (height * 0.45);
        for (let c = 0; c < 8; c++) {
          const cAngle = Math.random() * Math.PI * 2;
          const cSpd = Math.random() * 4 + 2;
          spawnSpark(
            bx,
            by,
            Math.cos(cAngle) * cSpd,
            Math.sin(cAngle) * cSpd,
            '#ffffff',
            0.04,
            0.15,
            1.8,
            0.94
          );
        }
      }

      // ==========================================
      // UPDATE & RENDER ALL PARTICLES & GLOWING TRAILS
      // ==========================================
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

          if (s.alpha <= 0 || s.y > height + 25) {
            s.active = false;
            continue;
          }

          ctx.save();
          ctx.globalAlpha = Math.max(0, s.alpha);

          // Glowing spark motion trail line
          ctx.strokeStyle = s.color;
          ctx.lineWidth = s.size;
          ctx.beginPath();
          ctx.moveTo(s.prevX, s.prevY);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();

          // White-hot incandescent spark core
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 0.48, 0, Math.PI * 2);
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
