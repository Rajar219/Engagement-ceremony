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
  baseOpacity: number;
  isSidePetal: boolean; // 75% on outer borders, 25% delicate ambient drift
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  phase: number;
  speed: number;
  baseOpacity: number;
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
  pulseSpeed: number;
  color: string;
}

interface BokehOrb {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  phase: number;
}

export const GoldenFloralLiveEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect user's reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = 0;
    const fpsInterval = 1000 / 30; // Smooth 30fps capped for mobile battery & GPU efficiency
    let isPaused = false;

    // Mobile DPR capped at 1.5 to eliminate fillrate overhead
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const getCanvasDimensions = () => ({
      width: canvas.width / dpr,
      height: canvas.height / dpr,
    });

    const { width: initialWidth, height: initialHeight } = getCanvasDimensions();

    // Helper to spawn a petal: 75% focused along the palace curtains & margins (left 0-24%, right 76-100%)
    const createPetal = (startY?: number): Petal => {
      const { width, height } = getCanvasDimensions();
      const isSide = Math.random() < 0.78;
      let x: number;

      if (isSide) {
        // Left margin (0 - 24%) or Right margin (76% - 100%)
        if (Math.random() < 0.5) {
          x = Math.random() * (width * 0.24);
        } else {
          x = width * 0.76 + Math.random() * (width * 0.24);
        }
      } else {
        // Delicate drifting across background (kept low opacity so center text remains clean)
        x = Math.random() * width;
      }

      const length = Math.random() * 8 + 8; // 8px to 16px
      return {
        x,
        y: startY !== undefined ? startY : Math.random() * height,
        length,
        width: length * 0.52,
        speedY: Math.random() * 0.55 + 0.45, // Gentle float downwards
        driftX: (Math.random() - 0.48) * 0.35, // Subtle diagonal drift
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.028 + 0.015, // 3D tumbling oscillation
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.012,
        swayAmp: Math.random() * 1.2 + 0.8,
        baseOpacity: isSide ? Math.random() * 0.35 + 0.55 : Math.random() * 0.2 + 0.25,
        isSidePetal: isSide,
      };
    };

    // 1. Initial 18 luxury golden flower petals (strictly controlled density)
    const petals: Petal[] = Array.from({ length: 18 }, () => createPetal());

    // 2. 7 soft 4-point diamond star sparkles along the royal palace borders
    const createSparkle = (): Sparkle => {
      const { width, height } = getCanvasDimensions();
      // Place near left or right curtains/borders
      const isLeft = Math.random() < 0.5;
      const x = isLeft
        ? Math.random() * (width * 0.25)
        : width * 0.75 + Math.random() * (width * 0.25);
      const y = Math.random() * (height * 0.85) + height * 0.08;

      return {
        x,
        y,
        size: Math.random() * 4 + 4, // 4px to 8px
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.03 + 0.018,
        baseOpacity: Math.random() * 0.4 + 0.5,
        rot: Math.random() * Math.PI,
      };
    };
    const sparkles: Sparkle[] = Array.from({ length: 7 }, () => createSparkle());

    // 3. 22 tiny champagne gold micro-dust specks
    const dustColors = [
      'rgba(255, 235, 160, 0.65)',
      'rgba(240, 205, 110, 0.7)',
      'rgba(255, 248, 230, 0.75)',
      'rgba(212, 175, 55, 0.6)',
    ];
    const dustSpecks: DustSpeck[] = Array.from({ length: 22 }, () => {
      const { width, height } = getCanvasDimensions();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.6,
        speedY: -(Math.random() * 0.28 + 0.12), // Drifting upward slowly
        speedX: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.45 + 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.025 + 0.015,
        color: dustColors[Math.floor(Math.random() * dustColors.length)],
      };
    });

    // 4. 4 subtle warm golden background bokeh orbs
    const bokehOrbs: BokehOrb[] = Array.from({ length: 4 }, () => {
      const { width, height } = getCanvasDimensions();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 25 + 25, // 25px to 50px
        speedY: (Math.random() - 0.5) * 0.1,
        speedX: (Math.random() - 0.5) * 0.1,
        opacity: Math.random() * 0.05 + 0.04, // Very delicate and soft
        phase: Math.random() * Math.PI * 2,
      };
    });

    // Drawing a realistic 3D golden flower petal
    const drawPetal = (p: Petal) => {
      const { width, height } = getCanvasDimensions();

      // If petal is in central text zone, dim opacity so names & text remain perfectly clear
      const inCenterZone = p.x > width * 0.22 && p.x < width * 0.78 && p.y > height * 0.2 && p.y < height * 0.8;
      const alphaMultiplier = inCenterZone ? 0.35 : 1.0;
      const currentAlpha = p.baseOpacity * alphaMultiplier * (0.8 + 0.2 * Math.sin(p.swayPhase));

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      // 3D tumble flip along petal plane
      ctx.scale(Math.cos(p.flip), 1);

      // Multi-stop warm golden foil gradient
      const grad = ctx.createLinearGradient(0, -p.length, 0, p.length);
      grad.addColorStop(0, `rgba(255, 245, 195, ${currentAlpha})`); // Sunlit luminous edge
      grad.addColorStop(0.35, `rgba(242, 196, 75, ${currentAlpha * 0.95})`); // Rich 24k gold
      grad.addColorStop(0.75, `rgba(202, 148, 38, ${currentAlpha * 0.88})`); // Royal amber gold
      grad.addColorStop(1, `rgba(165, 115, 22, ${currentAlpha * 0.75})`); // Soft shadow base

      // Natural curved organic petal silhouette
      ctx.beginPath();
      ctx.moveTo(0, -p.length);
      ctx.bezierCurveTo(p.width, -p.length * 0.45, p.width * 1.15, p.length * 0.55, 0, p.length);
      ctx.bezierCurveTo(-p.width * 1.15, p.length * 0.55, -p.width, -p.length * 0.45, 0, -p.length);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Subtle golden central vein highlight for realism
      ctx.beginPath();
      ctx.moveTo(0, -p.length * 0.7);
      ctx.quadraticCurveTo(p.width * 0.15, 0, 0, p.length * 0.7);
      ctx.strokeStyle = `rgba(255, 255, 225, ${currentAlpha * 0.45})`;
      ctx.lineWidth = 0.65;
      ctx.stroke();

      ctx.restore();
    };

    // Drawing a soft 4-point diamond star sparkle
    const drawSparkle = (s: Sparkle) => {
      const alpha = s.baseOpacity * Math.max(0, Math.sin(s.phase));
      if (alpha < 0.04) return;

      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot);

      // Central radiant flare
      ctx.beginPath();
      ctx.arc(0, 0, s.size * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();

      // 4 pointed golden diamond rays
      ctx.beginPath();
      // Vertical ray
      ctx.moveTo(0, -s.size);
      ctx.quadraticCurveTo(0, 0, s.size * 0.16, 0);
      ctx.quadraticCurveTo(0, 0, 0, s.size);
      ctx.quadraticCurveTo(0, 0, -s.size * 0.16, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s.size);
      // Horizontal ray
      ctx.moveTo(-s.size, 0);
      ctx.quadraticCurveTo(0, 0, 0, s.size * 0.16);
      ctx.quadraticCurveTo(0, 0, s.size, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s.size * 0.16);
      ctx.quadraticCurveTo(0, 0, -s.size, 0);
      ctx.closePath();

      ctx.fillStyle = `rgba(255, 235, 160, ${alpha * 0.85})`;
      ctx.fill();

      ctx.restore();
    };

    // Main render loop
    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (isPaused) return;

      const delta = time - lastTime;
      if (delta < fpsInterval) return;
      lastTime = time - (delta % fpsInterval);

      const { width, height } = getCanvasDimensions();
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle background golden bokeh orbs (layer 0)
      for (let i = 0; i < bokehOrbs.length; i++) {
        const b = bokehOrbs[i];
        b.x += b.speedX;
        b.y += b.speedY;
        b.phase += 0.015;

        if (b.x < -b.radius) b.x = width + b.radius;
        if (b.x > width + b.radius) b.x = -b.radius;
        if (b.y < -b.radius) b.y = height + b.radius;
        if (b.y > height + b.radius) b.y = -b.radius;

        const orbAlpha = b.opacity * (0.8 + 0.2 * Math.sin(b.phase));
        const orbGrad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        orbGrad.addColorStop(0, `rgba(255, 225, 130, ${orbAlpha})`);
        orbGrad.addColorStop(0.5, `rgba(235, 190, 70, ${orbAlpha * 0.5})`);
        orbGrad.addColorStop(1, 'rgba(212, 160, 40, 0)');

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = orbGrad;
        ctx.fill();
      }

      // 2. Draw tiny golden dust micro-particles (layer 1)
      for (let i = 0; i < dustSpecks.length; i++) {
        const d = dustSpecks[i];
        d.y += d.speedY;
        d.x += d.speedX;
        d.pulsePhase += d.pulseSpeed;

        if (d.y < -10) {
          d.y = height + 10;
          d.x = Math.random() * width;
        }
        if (d.x < -10) d.x = width + 10;
        if (d.x > width + 10) d.x = -10;

        const currentOpacity = d.opacity * (0.7 + 0.3 * Math.sin(d.pulsePhase));
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, currentOpacity));
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // 3. Draw realistic golden flower petals (layer 2)
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.swayPhase += p.swaySpeed;
        p.y += p.speedY;
        p.x += Math.sin(p.swayPhase) * p.swayAmp * 0.35 + p.driftX;
        p.rotation += p.rotSpeed;
        p.flip += p.flipSpeed;

        // Recycle petal when falling below screen bottom
        if (p.y > height + p.length * 2) {
          const fresh = createPetal(-p.length * 2);
          petals[i] = fresh;
        }
        // Wrap horizontal edges gently
        if (p.x < -p.length * 2) p.x = width + p.length;
        if (p.x > width + p.length * 2) p.x = -p.length;

        drawPetal(p);
      }

      // 4. Draw soft golden star sparkles along the royal curtain borders (layer 3)
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.phase += s.speed;

        // When a sparkle completes its twinkle fade cycle, reposition it along the curtain edges
        if (s.phase > Math.PI * 2) {
          const fresh = createSparkle();
          sparkles[i] = fresh;
        }

        drawSparkle(s);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    // Pause when page is hidden (saves phone battery)
    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Pause when scrolled off-screen via IntersectionObserver
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
