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
      particleCount: 120,
      particleTypes: ['cosmic', 'stream', 'network', 'floating'] as const,
      colors: ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981'],
      speed: 0.8,
      size: { min: 2, max: 6 },
      opacity: { min: 0.1, max: 0.8 },
      gradient: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 70%)'
    },
    chaos: {
      particleCount: 100,
      particleTypes: ['network', 'stream'] as const,
      colors: ['#EF4444', '#F97316', '#EAB308'],
      speed: 1.2,
      size: { min: 1, max: 4 },
      opacity: { min: 0.2, max: 0.7 },
      gradient: 'radial-gradient(ellipse at center, rgba(239, 68, 68, 0.1) 0%, rgba(245, 101, 101, 0.08) 50%, transparent 70%)'
    },
    solution: {
      particleCount: 80,
      particleTypes: ['floating', 'cosmic'] as const,
      colors: ['#10B981', '#059669', '#047857'],
      speed: 0.6,
      size: { min: 2, max: 5 },
      opacity: { min: 0.15, max: 0.6 },
      gradient: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.12) 0%, rgba(5, 150, 105, 0.08) 50%, transparent 70%)'
    },
    modular: {
      particleCount: 90,
      particleTypes: ['network', 'floating'] as const,
      colors: ['#3B82F6', '#1D4ED8', '#1E40AF'],
      speed: 0.7,
      size: { min: 1, max: 4 },
      opacity: { min: 0.1, max: 0.6 },
      gradient: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.12) 0%, rgba(29, 78, 216, 0.08) 50%, transparent 70%)'
    },
    works: {
      particleCount: 85,
      particleTypes: ['stream', 'cosmic'] as const,
      colors: ['#F59E0B', '#D97706', '#B45309'],
      speed: 0.9,
      size: { min: 2, max: 5 },
      opacity: { min: 0.15, max: 0.7 },
      gradient: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.08) 50%, transparent 70%)'
    },
    innovation: {
      particleCount: 110,
      particleTypes: ['cosmic', 'floating', 'stream'] as const,
      colors: ['#EC4899', '#BE185D', '#9D174D'],
      speed: 1.0,
      size: { min: 2, max: 6 },
      opacity: { min: 0.2, max: 0.8 },
      gradient: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.15) 0%, rgba(190, 24, 93, 0.1) 50%, transparent 70%)'
    },
    testimonials: {
      particleCount: 70,
      particleTypes: ['floating', 'network'] as const,
      colors: ['#8B5CF6', '#7C3AED', '#6D28D9'],
      speed: 0.5,
      size: { min: 1, max: 3 },
      opacity: { min: 0.1, max: 0.5 },
      gradient: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.06) 50%, transparent 70%)'
    },
    teams: {
      particleCount: 95,
      particleTypes: ['network', 'stream'] as const,
      colors: ['#06B6D4', '#0891B2', '#0E7490'],
      speed: 0.8,
      size: { min: 2, max: 4 },
      opacity: { min: 0.15, max: 0.6 },
      gradient: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.12) 0%, rgba(8, 145, 178, 0.08) 50%, transparent 70%)'
    },
    global: {
      particleCount: 100,
      particleTypes: ['cosmic', 'floating'] as const,
      colors: ['#10B981', '#059669', '#047857'],
      speed: 0.7,
      size: { min: 2, max: 5 },
      opacity: { min: 0.15, max: 0.7 },
      gradient: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.12) 0%, rgba(5, 150, 105, 0.08) 50%, transparent 70%)'
    },
    cta: {
      particleCount: 120,
      particleTypes: ['cosmic', 'stream', 'network'] as const,
      colors: ['#8B5CF6', '#EC4899', '#3B82F6'],
      speed: 1.1,
      size: { min: 2, max: 6 },
      opacity: { min: 0.2, max: 0.9 },
      gradient: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.15) 30%, rgba(59, 130, 246, 0.1) 60%, transparent 80%)'
    },
    employees: {
      particleCount: 90,
      particleTypes: ['network', 'floating'] as const,
      colors: ['#3B82F6', '#1D4ED8', '#1E40AF'],
      speed: 0.6,
      size: { min: 2, max: 5 },
      opacity: { min: 0.1, max: 0.6 },
      gradient: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, rgba(29, 78, 216, 0.1) 50%, transparent 70%)'
    },
    payments: {
      particleCount: 80,
      particleTypes: ['stream', 'cosmic'] as const,
      colors: ['#10B981', '#059669', '#047857'],
      speed: 0.8,
      size: { min: 2, max: 4 },
      opacity: { min: 0.15, max: 0.7 },
      gradient: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 50%, transparent 70%)'
    },
    workflow: {
      particleCount: 100,
      particleTypes: ['network', 'stream'] as const,
      colors: ['#6366F1', '#4F46E5', '#4338CA'],
      speed: 0.9,
      size: { min: 1, max: 4 },
      opacity: { min: 0.15, max: 0.6 },
      gradient: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, rgba(79, 70, 229, 0.1) 50%, transparent 70%)'
    }
  }), []);

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
      
      // Create particles with enhanced autonomous movement
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

      // Enhanced floating shapes
      for (let i = 0; i < 20; i++) {
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 60 + 30,
          rotation: Math.random() * 360,
          opacity: Math.random() * 0.15 + 0.05,
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
      
      // Update and draw floating shapes with improved movement
      shapesRef.current.forEach((shape, index) => {
        shape.rotation += 0.3 + index * 0.1;
        shape.y -= 0.2 + Math.sin(Date.now() * 0.001 + index) * 0.1;
        shape.x += Math.cos(Date.now() * 0.0005 + index) * 0.5;
        
        if (shape.y < -shape.size) {
          shape.y = canvas.height + shape.size;
          shape.x = Math.random() * canvas.width;
        }
        if (shape.x < -shape.size || shape.x > canvas.width + shape.size) {
          shape.x = Math.random() * canvas.width;
        }
        
        drawShape(ctx, shape);
      });
      
      // Enhanced particle animation with better autonomous movement
      particlesRef.current.forEach((particle, index) => {
        // Enhanced autonomous movement patterns
        const time = Date.now() * 0.001;
        const autonomousInfluence = 0.02;
        
        // Different movement patterns based on particle type
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

        // Enhanced mouse interaction with distance-based effects
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const force = (200 - distance) / 200;
          const attractionStrength = particle.type === 'stream' ? 0.025 : 0.015;
          particle.vx += (dx / distance) * force * attractionStrength;
          particle.vy += (dy / distance) * force * attractionStrength;
          
          // Enhanced visual feedback for mouse interaction
          particle.opacity = Math.min(1, particle.opacity + force * 0.3);
        } else {
          // Return to original autonomous movement and opacity
          const returnStrength = 0.025;
          particle.vx += (Math.cos(particle.angle) * particle.originalSpeed - particle.vx) * returnStrength;
          particle.vy += (Math.sin(particle.angle) * particle.originalSpeed - particle.vy) * returnStrength;
          particle.opacity *= 0.995; // Gradual fade back to normal
        }

        // Boundary wrapping with smoother transitions
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Enhanced velocity dampening
        particle.vx *= 0.985;
        particle.vy *= 0.985;

        // Draw particle with enhanced effects
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

        // Enhanced connections for network particles
        if (particle.type === 'network') {
          particlesRef.current.slice(index + 1).forEach((otherParticle) => {
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
