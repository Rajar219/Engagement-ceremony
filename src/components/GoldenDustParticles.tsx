'use client';

import React, { useEffect, useRef } from 'react';

export const GoldenDustParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = 0;
    const fpsInterval = 1000 / 30; // Strictly capped at 30fps for mobile GPU performance
    let isPaused = false;

    // Device Pixel Ratio capped at 2 to protect high-DPI mobile devices
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // 28 subtle champagne gold & lavender dust particles
    const particleColors = [
      'rgba(212, 175, 55, 0.55)',
      'rgba(243, 233, 210, 0.65)',
      'rgba(255, 248, 230, 0.7)',
      'rgba(188, 149, 224, 0.45)',
      'rgba(226, 190, 121, 0.6)',
    ];

    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * (canvas.width / dpr),
      y: Math.random() * (canvas.height / dpr),
      radius: Math.random() * 1.5 + 0.6,
      speedY: -(Math.random() * 0.35 + 0.15),
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.5 + 0.25,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulseVal: Math.random() * Math.PI,
    }));

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (isPaused) return;

      const delta = time - lastTime;
      if (delta < fpsInterval) return;
      lastTime = time - (delta % fpsInterval);

      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulseVal += p.pulseSpeed;

        // Wrap around top/bottom/sides
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentOpacity = p.opacity * (0.65 + 0.35 * Math.sin(p.pulseVal));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, currentOpacity));
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;
    };

    animationFrameId = requestAnimationFrame(render);

    // Pause when page is hidden to save mobile battery
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
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
};
