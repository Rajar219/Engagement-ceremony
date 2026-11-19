'use client';

import React, { useEffect, useRef } from 'react';

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
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  phase: number;
  speed: number;
  rot: number;
}

interface DustSpeck {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  pulsePhase: number;
}

export const GoldenFloralLiveEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect user's reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = 0;
    const fpsInterval = 1000 / 30; // 30fps capped for battery and zero-stutter performance
    let isPaused = false;

    // Fixed DPR 1.0 on mobile eliminates 100% of GPU fillrate overhead
    const dpr = 1.0;

    let canvasWidth = 0;
    let canvasHeight = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      canvasWidth = parent ? parent.clientWidth : window.innerWidth;
      canvasHeight = parent ? parent.clientHeight : window.innerHeight;

      canvas.width = Math.round(canvasWidth * dpr);
      canvas.height = Math.round(canvasHeight * dpr);
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Pre-calculated golden palette (ZERO object allocations in render loop)
    const GOLD_PETAL_FILL = '#e5b839';
    const GOLD_PETAL_EDGE = '#fff2a8';
    const DUST_COLOR = 'rgba(255, 235, 160, 0.7)';
    const SPARKLE_CORE = 'rgba(255, 255, 255, 0.9)';
    const SPARKLE_RAY = 'rgba(255, 224, 130, 0.8)';

    // Spawn petal: strictly in outer margin curtains (0-22% or 78-100%) so center text is never covered
    const createPetal = (startY?: number): Petal => {
      const isLeft = Math.random() < 0.5;
      const x = isLeft
        ? Math.random() * (canvasWidth * 0.22)
        : canvasWidth * 0.78 + Math.random() * (canvasWidth * 0.22);

      const length = Math.random() * 6 + 9; // 9px to 15px
      return {
        x,
        y: startY !== undefined ? startY : Math.random() * canvasHeight,
        length,
        width: length * 0.52,
        speedY: Math.random() * 0.45 + 0.35, // Slow gentle descent
        driftX: (Math.random() - 0.48) * 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.02 + 0.01,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.018 + 0.01,
        swayAmp: Math.random() * 1.0 + 0.6,
        opacity: Math.random() * 0.25 + 0.55,
      };
    };

    // 10 gentle golden petals strictly in outer margins
    const petals: Petal[] = Array.from({ length: 10 }, () => createPetal());

    // 4 subtle diamond star sparkles near curtains
    const createSparkle = (): Sparkle => {
      const isLeft = Math.random() < 0.5;
      const x = isLeft
        ? Math.random() * (canvasWidth * 0.22)
        : canvasWidth * 0.78 + Math.random() * (canvasWidth * 0.22);
      const y = Math.random() * (canvasHeight * 0.8) + canvasHeight * 0.1;

      return {
        x,
        y,
        size: Math.random() * 3 + 4,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.025 + 0.015,
        rot: Math.random() * Math.PI,
      };
    };
    const sparkles: Sparkle[] = Array.from({ length: 4 }, () => createSparkle());

    // 14 micro golden dust specks
    const dustSpecks: DustSpeck[] = Array.from({ length: 14 }, () => ({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      radius: Math.random() * 1.0 + 0.6,
      speedY: -(Math.random() * 0.25 + 0.1),
      speedX: (Math.random() - 0.5) * 0.1,
      opacity: Math.random() * 0.35 + 0.35,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    // Zero-allocation render loop
    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (isPaused) return;

      const delta = time - lastTime;
      if (delta < fpsInterval) return;
      lastTime = time - (delta % fpsInterval);

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // 1. Draw micro dust specks
      ctx.fillStyle = DUST_COLOR;
      for (let i = 0; i < dustSpecks.length; i++) {
        const d = dustSpecks[i];
        d.y += d.speedY;
        d.x += d.speedX;
        d.pulsePhase += 0.02;

        if (d.y < -10) {
          d.y = canvasHeight + 10;
          d.x = Math.random() * canvasWidth;
        }
        if (d.x < -10) d.x = canvasWidth + 10;
        if (d.x > canvasWidth + 10) d.x = -10;

        ctx.globalAlpha = d.opacity * (0.75 + 0.25 * Math.sin(d.pulsePhase));
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw golden petals
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.swayPhase += p.swaySpeed;
        p.y += p.speedY;
        p.x += Math.sin(p.swayPhase) * p.swayAmp * 0.35 + p.driftX;
        p.rotation += p.rotSpeed;
        p.flip += p.flipSpeed;

        if (p.y > canvasHeight + p.length * 2) {
          petals[i] = createPetal(-p.length * 2);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(Math.cos(p.flip), 1);
        ctx.globalAlpha = p.opacity;

        // Petal shape
        ctx.beginPath();
        ctx.moveTo(0, -p.length);
        ctx.bezierCurveTo(p.width, -p.length * 0.5, p.width, p.length * 0.5, 0, p.length);
        ctx.bezierCurveTo(-p.width, p.length * 0.5, -p.width, -p.length * 0.5, 0, -p.length);
        ctx.closePath();
        ctx.fillStyle = GOLD_PETAL_FILL;
        ctx.fill();

        // Delicate vein highlight
        ctx.beginPath();
        ctx.moveTo(0, -p.length * 0.6);
        ctx.lineTo(0, p.length * 0.6);
        ctx.strokeStyle = GOLD_PETAL_EDGE;
        ctx.lineWidth = 0.6;
        ctx.stroke();

        ctx.restore();
      }

      // 3. Draw soft sparkles
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.phase += s.speed;

        if (s.phase > Math.PI * 2) {
          sparkles[i] = createSparkle();
          continue;
        }

        const alpha = Math.max(0, Math.sin(s.phase));
        if (alpha < 0.05) continue;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);
        ctx.globalAlpha = alpha;

        // Core
        ctx.fillStyle = SPARKLE_CORE;
        ctx.beginPath();
        ctx.arc(0, 0, s.size * 0.22, 0, Math.PI * 2);
        ctx.fill();

        // Rays
        ctx.strokeStyle = SPARKLE_RAY;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -s.size);
        ctx.lineTo(0, s.size);
        ctx.moveTo(-s.size, 0);
        ctx.lineTo(s.size, 0);
        ctx.stroke();

        ctx.restore();
      }

      ctx.globalAlpha = 1.0;
    };

    animationFrameId = requestAnimationFrame(render);

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isPaused = !entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
};
