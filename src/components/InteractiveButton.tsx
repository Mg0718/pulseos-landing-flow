
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface InteractiveButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const InteractiveButton = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className,
  onClick,
  icon
}: InteractiveButtonProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
    
    onClick?.();
  };

  const getButtonStyles = () => {
    const baseStyles = "relative overflow-hidden transition-all duration-300 transform";
    
    switch (variant) {
      case 'outline':
        return cn(
          baseStyles,
          "border-purple-500/20 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400/40",
          isHovered && "scale-105 shadow-lg shadow-purple-500/20"
        );
      case 'ghost':
        return cn(
          baseStyles,
          "hover:bg-purple-500/10",
          isHovered && "scale-105"
        );
      default:
        return cn(
          baseStyles,
          "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0",
          isHovered && "scale-105 shadow-lg shadow-purple-500/25"
        );
    }
  };

  return (
    <Button
      ref={buttonRef}
      size={size}
      className={cn(getButtonStyles(), className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {children}
      </span>
      
      {/* Magnetic glow effect */}
      {isHovered && (
        <div
          className="absolute inset-0 opacity-30 transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)`
          }}
        />
      )}
      
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            animation: 'ripple 0.6s linear'
          }}
        />
      ))}
    </Button>
  );
};

export default InteractiveButton;
