'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedY: -(Math.random() * 0.8 + 0.3),
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.1,
      fadeSpeed: Math.random() * 0.003 + 0.001,
    });

    // Initialise with particles spread across the canvas
    const init = () => {
      particles.length = 0;
      const count = Math.floor((window.innerWidth * window.innerHeight) / 12000);
      for (let i = 0; i < count; i++) {
        const p = createParticle();
        p.y = Math.random() * window.innerHeight; // spread initially
        particles.push(p);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.y += p.speedY;
        p.x += p.speedX;

        // Gentle opacity flicker
        p.opacity += Math.sin(Date.now() * p.fadeSpeed) * 0.005;
        p.opacity = Math.max(0.05, Math.min(0.8, p.opacity));

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = '#c9a84c';
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = 'rgba(201, 168, 76, 0.8)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Reset when off screen
        if (p.y < -20) {
          particles[i] = createParticle();
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    const handleResize = () => {
      resize();
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
