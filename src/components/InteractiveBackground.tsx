
import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  type: 'cosmic' | 'stream' | 'network';
}

interface BackgroundProps {
  section: string;
}

const InteractiveBackground = ({ section }: BackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const [currentTheme, setCurrentTheme] = useState('hero');

  const themes = {
    hero: {
      colors: ['#8b5cf6', '#06b6d4', '#a855f7'],
      gradient: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 70%)'
    },
    chaos: {
      colors: ['#3b82f6', '#06b6d4', '#0ea5e9'],
      gradient: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 70%)'
    },
    solution: {
      colors: ['#10b981', '#06d6a0', '#059669'],
      gradient: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15) 0%, rgba(6, 214, 160, 0.1) 50%, transparent 70%)'
    },
    modular: {
      colors: ['#f59e0b', '#fb923c', '#f97316'],
      gradient: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.15) 0%, rgba(251, 146, 60, 0.1) 50%, transparent 70%)'
    },
    works: {
      colors: ['#ec4899', '#f472b6', '#be185d'],
      gradient: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.15) 0%, rgba(244, 114, 182, 0.1) 50%, transparent 70%)'
    },
    innovation: {
      colors: ['#8b5cf6', '#a78bfa', '#7c3aed'],
      gradient: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(167, 139, 250, 0.1) 50%, transparent 70%)'
    },
    testimonials: {
      colors: ['#06b6d4', '#67e8f9', '#0891b2'],
      gradient: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.15) 0%, rgba(103, 232, 249, 0.1) 50%, transparent 70%)'
    },
    teams: {
      colors: ['#10b981', '#34d399', '#047857'],
      gradient: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15) 0%, rgba(52, 211, 153, 0.1) 50%, transparent 70%)'
    },
    global: {
      colors: ['#3b82f6', '#60a5fa', '#1d4ed8'],
      gradient: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, rgba(96, 165, 250, 0.1) 50%, transparent 70%)'
    },
    cta: {
      colors: ['#8b5cf6', '#06b6d4', '#a855f7'],
      gradient: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 70%)'
    }
  };

  useEffect(() => {
    setCurrentTheme(section);
  }, [section]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 12000);
      const theme = themes[currentTheme as keyof typeof themes] || themes.hero;
      
      for (let i = 0; i < particleCount; i++) {
        const type = Math.random() > 0.7 ? 'stream' : Math.random() > 0.5 ? 'network' : 'cosmic';
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (type === 'stream' ? 1 : 0.5),
          vy: (Math.random() - 0.5) * (type === 'stream' ? 1 : 0.5),
          size: type === 'stream' ? Math.random() * 3 + 1 : Math.random() * 2 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          color: theme.colors[Math.floor(Math.random() * theme.colors.length)],
          type
        });
      }
      particlesRef.current = particles;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, index) => {
        // Enhanced mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const force = (200 - distance) / 200;
          const magnetism = particle.type === 'stream' ? 0.02 : 0.01;
          particle.vx += (dx / distance) * force * magnetism;
          particle.vy += (dy / distance) * force * magnetism;
        }

        // Update position based on type
        if (particle.type === 'stream') {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vx *= 0.98;
          particle.vy *= 0.98;
        } else {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vx *= 0.99;
          particle.vy *= 0.99;
        }

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with glow effect
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        if (particle.type === 'stream') {
          // Create glow effect for stream particles
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = 10;
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.restore();

        // Draw connections for network particles
        if (particle.type === 'network') {
          particlesRef.current.slice(index + 1).forEach((otherParticle) => {
            if (otherParticle.type !== 'network') return;
            
            const dx2 = particle.x - otherParticle.x;
            const dy2 = particle.y - otherParticle.y;
            const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

            if (distance2 < 120) {
              ctx.save();
              ctx.globalAlpha = 0.1 * (1 - distance2 / 120);
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = particle.color;
              ctx.lineWidth = 1;
              ctx.stroke();
              ctx.restore();
            }
          });
        }
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [currentTheme]);

  const theme = themes[currentTheme as keyof typeof themes] || themes.hero;

  return (
    <div className="fixed inset-0 z-0">
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{ background: theme.gradient }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
};

export default InteractiveBackground;
