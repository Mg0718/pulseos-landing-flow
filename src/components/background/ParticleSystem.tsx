
import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  type: 'cosmic' | 'stream' | 'network' | 'floating';
  angle: number;
  speed: number;
  originalSpeed: number;
}

interface ParticleSystemProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  mouseRef: React.RefObject<{ x: number; y: number }>;
  particlesRef: React.RefObject<Particle[]>;
  theme: {
    particleCount: number;
    particleTypes: readonly ('cosmic' | 'stream' | 'network' | 'floating')[];
    colors: string[];
    speed: number;
    size: { min: number; max: number };
    opacity: { min: number; max: number };
  };
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  canvasRef,
  mouseRef,
  particlesRef,
  theme
}) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = theme.particleCount;
      
      for (let i = 0; i < particleCount; i++) {
        const type = theme.particleTypes[Math.floor(Math.random() * theme.particleTypes.length)];
        const speed = (Math.random() * theme.speed + 0.2) * (type === 'stream' ? 1.5 : 1);
        const angle = Math.random() * Math.PI * 2;
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * (theme.size.max - theme.size.min) + theme.size.min,
          opacity: Math.random() * (theme.opacity.max - theme.opacity.min) + theme.opacity.min,
          color: theme.colors[Math.floor(Math.random() * theme.colors.length)],
          type,
          angle,
          speed,
          originalSpeed: speed
        });
      }

      particlesRef.current = particles;
    };

    createParticles();
  }, [theme, canvasRef, particlesRef]);

  const animateParticles = (ctx: CanvasRenderingContext2D) => {
    if (!particlesRef.current || !mouseRef.current) return;

    particlesRef.current.forEach((particle, index) => {
      const time = Date.now() * 0.001;
      
      // Enhanced autonomous movement patterns
      switch (particle.type) {
        case 'floating':
          particle.vy += Math.sin(time + particle.x * 0.01) * 0.01;
          particle.vx += Math.cos(time + particle.y * 0.01) * 0.005;
          break;
        case 'stream':
          particle.vx += Math.sin(time * 2 + index) * 0.02;
          break;
        case 'cosmic':
          const orbitInfluence = Math.sin(time + index * 0.1) * 0.015;
          particle.vx += orbitInfluence;
          particle.vy += Math.cos(time + index * 0.1) * 0.015;
          break;
      }

      // Base autonomous movement
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Enhanced mouse interaction
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 200) {
        const force = (200 - distance) / 200;
        const attractionStrength = particle.type === 'stream' ? 0.025 : 0.015;
        particle.vx += (dx / distance) * force * attractionStrength;
        particle.vy += (dy / distance) * force * attractionStrength;
        particle.opacity = Math.min(1, particle.opacity + force * 0.3);
      } else {
        const returnStrength = 0.025;
        particle.vx += (Math.cos(particle.angle) * particle.originalSpeed - particle.vx) * returnStrength;
        particle.vy += (Math.sin(particle.angle) * particle.originalSpeed - particle.vy) * returnStrength;
        particle.opacity *= 0.995;
      }

      // Boundary wrapping
      const canvas = canvasRef.current;
      if (canvas) {
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;
      }

      // Velocity dampening
      particle.vx *= 0.985;
      particle.vy *= 0.985;

      // Draw particle
      ctx.save();
      ctx.globalAlpha = Math.max(0.1, Math.min(1, particle.opacity));
      
      if (particle.type === 'stream' || particle.type === 'cosmic') {
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 20;
      }
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      ctx.restore();

      // Draw connections for network particles
      if (particle.type === 'network') {
        particlesRef.current!.slice(index + 1).forEach((otherParticle) => {
          if (otherParticle.type !== 'network') return;
          
          const dx2 = particle.x - otherParticle.x;
          const dy2 = particle.y - otherParticle.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (distance2 < 120) {
            ctx.save();
            ctx.globalAlpha = 0.2 * (1 - distance2 / 120);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();
          }
        });
      }
    });
  };

  return { animateParticles };
};
