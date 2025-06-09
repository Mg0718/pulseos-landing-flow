import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

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

interface FloatingShape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  type: 'circle' | 'triangle' | 'square';
}

interface Theme {
  particleCount: number;
  particleTypes: readonly ('cosmic' | 'stream' | 'network' | 'floating')[];
  colors: string[];
  speed: number;
  size: { min: number; max: number };
  opacity: { min: number; max: number };
  gradient: string;
}

interface BackgroundProps {
  section: string;
}

const InteractiveBackground = ({ section }: BackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const shapesRef = useRef<FloatingShape[]>([]);
  const [currentTheme, setCurrentTheme] = useState('hero');
  const animationRef = useRef<number>();

  const themes = useMemo(() => ({
    hero: {
      particleCount: 100,
      particleTypes: ['cosmic', 'stream', 'network', 'floating'] as const,
      colors: ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981'],
      speed: 0.5,
      size: { min: 2, max: 6 },
      opacity: { min: 0.1, max: 0.8 },
      gradient: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 70%)'
    },
    features: {
      particleCount: 80,
      particleTypes: ['network', 'floating'] as const,
      colors: ['#8B5CF6', '#EC4899', '#3B82F6'],
      speed: 0.3,
      size: { min: 1, max: 4 },
      opacity: { min: 0.05, max: 0.6 },
      gradient: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 70%)'
    },
    // ... rest of themes object ...
  }), []); // Empty dependency array since themes are static

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
      const shapes: FloatingShape[] = [];
      const theme = themes[currentTheme as keyof typeof themes] || themes.hero;
      const particleCount = theme.particleCount;
      
      // Create particles with autonomous movement
      for (let i = 0; i < particleCount; i++) {
        const type = Math.random() > 0.7 ? 'stream' : Math.random() > 0.5 ? 'network' : Math.random() > 0.3 ? 'floating' : 'cosmic';
        const speed = Math.random() * 0.5 + 0.1;
        const angle = Math.random() * Math.PI * 2;
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: type === 'stream' ? Math.random() * 3 + 1 : Math.random() * 2 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          color: theme.colors[Math.floor(Math.random() * theme.colors.length)],
          type,
          angle,
          speed,
          originalSpeed: speed
        });
      }

      // Create floating shapes for parallax effect
      for (let i = 0; i < 15; i++) {
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 40 + 20,
          rotation: Math.random() * 360,
          opacity: Math.random() * 0.1 + 0.05,
          type: ['circle', 'triangle', 'square'][Math.floor(Math.random() * 3)] as 'circle' | 'triangle' | 'square'
        });
      }

      particlesRef.current = particles;
      shapesRef.current = shapes;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const drawShape = (ctx: CanvasRenderingContext2D, shape: FloatingShape) => {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate((shape.rotation * Math.PI) / 180);
      ctx.globalAlpha = shape.opacity;
      
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, shape.size);
      gradient.addColorStop(0, '#8b5cf6');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;

      switch (shape.type) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, shape.size, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -shape.size);
          ctx.lineTo(-shape.size * 0.8, shape.size * 0.5);
          ctx.lineTo(shape.size * 0.8, shape.size * 0.5);
          ctx.closePath();
          ctx.fill();
          break;
        case 'square':
          ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
          break;
      }
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw floating shapes
      shapesRef.current.forEach((shape) => {
        shape.rotation += 0.2;
        shape.y -= 0.1;
        if (shape.y < -shape.size) {
          shape.y = canvas.height + shape.size;
          shape.x = Math.random() * canvas.width;
        }
        drawShape(ctx, shape);
      });
      
      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Autonomous movement
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          const magnetism = particle.type === 'stream' ? 0.02 : 0.01;
          particle.vx += (dx / distance) * force * magnetism;
          particle.vy += (dy / distance) * force * magnetism;
        } else {
          // Return to autonomous movement
          particle.vx += (Math.cos(particle.angle) * particle.originalSpeed - particle.vx) * 0.02;
          particle.vy += (Math.sin(particle.angle) * particle.originalSpeed - particle.vy) * 0.02;
        }

        // Floating behavior
        if (particle.type === 'floating') {
          particle.y += Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.5;
        }

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Apply velocity dampening
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Draw particle with enhanced effects
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        if (particle.type === 'stream' || particle.type === 'floating') {
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = 15;
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

            if (distance2 < 100) {
              ctx.save();
              ctx.globalAlpha = 0.15 * (1 - distance2 / 100);
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

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentTheme, themes]);

  const theme = themes[currentTheme as keyof typeof themes] || themes.hero;

  return (
    <div className="fixed inset-0 z-0">
      <motion.div 
        className="absolute inset-0"
        style={{ background: theme.gradient }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      
      {/* Additional floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveBackground;
