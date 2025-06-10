
import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

interface FloatingGeometry {
  x: number;
  y: number;
  z: number;
  size: number;
  rotation: { x: number; y: number; z: number };
  rotationSpeed: { x: number; y: number; z: number };
  opacity: number;
  type: 'cube' | 'sphere' | 'pyramid';
}

const Enhanced3DBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particles3DRef = useRef<Particle3D[]>([]);
  const geometryRef = useRef<FloatingGeometry[]>([]);
  const animationRef = useRef<number>();

  const colors = useMemo(() => [
    '#8B5CF6', '#EC4899', '#06B6D4', '#10B981', '#F59E0B'
  ], []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const create3DParticles = () => {
      const particles: Particle3D[] = [];
      const geometry: FloatingGeometry[] = [];
      
      // Create 3D particles
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 500 + 100,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          vz: (Math.random() - 0.5) * 1,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.8 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02
        });
      }

      // Create floating geometry
      for (let i = 0; i < 15; i++) {
        geometry.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 300 + 200,
          size: Math.random() * 60 + 40,
          rotation: {
            x: Math.random() * Math.PI * 2,
            y: Math.random() * Math.PI * 2,
            z: Math.random() * Math.PI * 2
          },
          rotationSpeed: {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01
          },
          opacity: Math.random() * 0.1 + 0.05,
          type: ['cube', 'sphere', 'pyramid'][Math.floor(Math.random() * 3)] as 'cube' | 'sphere' | 'pyramid'
        });
      }

      particles3DRef.current = particles;
      geometryRef.current = geometry;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const project3D = (x: number, y: number, z: number) => {
      const perspective = 800;
      const scale = perspective / (perspective + z);
      return {
        x: x * scale,
        y: y * scale,
        scale
      };
    };

    const drawGeometry = (ctx: CanvasRenderingContext2D, geo: FloatingGeometry) => {
      const projected = project3D(geo.x, geo.y, geo.z);
      const size = geo.size * projected.scale;

      ctx.save();
      ctx.translate(projected.x, projected.y);
      ctx.globalAlpha = geo.opacity * projected.scale;
      
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      gradient.addColorStop(0, '#8b5cf6');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;

      // Simulate 3D rotation effect
      const rotationEffect = Math.sin(geo.rotation.x) * 0.3 + 0.7;
      
      switch (geo.type) {
        case 'sphere':
          ctx.beginPath();
          ctx.arc(0, 0, size * rotationEffect, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'cube':
          const cubeSize = size * rotationEffect;
          ctx.fillRect(-cubeSize / 2, -cubeSize / 2, cubeSize, cubeSize);
          break;
        case 'pyramid':
          ctx.beginPath();
          ctx.moveTo(0, -size * rotationEffect);
          ctx.lineTo(-size * rotationEffect * 0.8, size * rotationEffect * 0.5);
          ctx.lineTo(size * rotationEffect * 0.8, size * rotationEffect * 0.5);
          ctx.closePath();
          ctx.fill();
          break;
      }
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.001;

      // Animate and draw floating geometry
      geometryRef.current.forEach((geo) => {
        // Update 3D rotation
        geo.rotation.x += geo.rotationSpeed.x;
        geo.rotation.y += geo.rotationSpeed.y;
        geo.rotation.z += geo.rotationSpeed.z;

        // Gentle floating movement
        geo.y -= 0.3;
        geo.x += Math.sin(time + geo.z * 0.01) * 0.5;
        geo.z += Math.cos(time + geo.x * 0.01) * 0.2;

        // Wrap around screen
        if (geo.y < -geo.size) {
          geo.y = canvas.height + geo.size;
          geo.x = Math.random() * canvas.width;
        }

        drawGeometry(ctx, geo);
      });

      // Animate and draw 3D particles
      particles3DRef.current.forEach((particle) => {
        // 3D movement with autonomous behavior
        particle.x += particle.vx + Math.sin(time + particle.z * 0.01) * 0.5;
        particle.y += particle.vy + Math.cos(time + particle.x * 0.01) * 0.3;
        particle.z += particle.vz;
        particle.rotation += particle.rotationSpeed;

        // Mouse interaction in 3D space
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += (dx / distance) * force * 0.02;
          particle.vy += (dy / distance) * force * 0.02;
          particle.opacity = Math.min(1, particle.opacity + force * 0.3);
        } else {
          particle.opacity *= 0.995;
        }

        // Boundary wrapping with Z consideration
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;
        if (particle.z < 50) particle.z = 600;
        if (particle.z > 600) particle.z = 50;

        // Apply damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        particle.vz *= 0.99;

        // Project to 2D and draw
        const projected = project3D(particle.x, particle.y, particle.z);
        const size = particle.size * projected.scale;

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, particle.opacity * projected.scale));
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 15 * projected.scale;
        
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.restore();

        // Draw connections between nearby particles
        particles3DRef.current.forEach((other) => {
          const dx2 = particle.x - other.x;
          const dy2 = particle.y - other.y;
          const dz2 = particle.z - other.z;
          const distance3D = Math.sqrt(dx2 * dx2 + dy2 * dy2 + dz2 * dz2);

          if (distance3D < 100) {
            const otherProjected = project3D(other.x, other.y, other.z);
            ctx.save();
            ctx.globalAlpha = 0.1 * (1 - distance3D / 100) * projected.scale;
            ctx.beginPath();
            ctx.moveTo(projected.x, projected.y);
            ctx.lineTo(otherProjected.x, otherProjected.y);
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    create3DParticles();
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
  }, [colors]);

  return (
    <div className="fixed inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      
      {/* Additional parallax layers */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-500/5 to-cyan-500/5 blur-2xl"
            style={{
              width: `${100 + i * 20}px`,
              height: `${100 + i * 20}px`,
              left: `${10 + i * 12}%`,
              top: `${20 + i * 8}%`,
            }}
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Enhanced3DBackground;
