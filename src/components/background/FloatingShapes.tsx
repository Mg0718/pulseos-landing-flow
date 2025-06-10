
import React, { useRef, useEffect } from 'react';

interface FloatingShape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  type: 'circle' | 'triangle' | 'square';
}

interface FloatingShapesProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  shapesRef: React.RefObject<FloatingShape[]>;
}

export const FloatingShapes: React.FC<FloatingShapesProps> = ({
  canvasRef,
  shapesRef
}) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const createShapes = () => {
      const shapes: FloatingShape[] = [];
      
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

      shapesRef.current = shapes;
    };

    createShapes();
  }, [canvasRef, shapesRef]);

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

  const animateShapes = (ctx: CanvasRenderingContext2D) => {
    if (!shapesRef.current) return;

    shapesRef.current.forEach((shape, index) => {
      shape.rotation += 0.3 + index * 0.1;
      shape.y -= 0.2 + Math.sin(Date.now() * 0.001 + index) * 0.1;
      shape.x += Math.cos(Date.now() * 0.0005 + index) * 0.5;
      
      const canvas = canvasRef.current;
      if (canvas) {
        if (shape.y < -shape.size) {
          shape.y = canvas.height + shape.size;
          shape.x = Math.random() * canvas.width;
        }
        if (shape.x < -shape.size || shape.x > canvas.width + shape.size) {
          shape.x = Math.random() * canvas.width;
        }
      }
      
      drawShape(ctx, shape);
    });
  };

  return { animateShapes };
};
