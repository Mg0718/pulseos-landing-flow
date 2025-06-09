
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const EnhancedNavigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'chaos', label: 'Technology' },
    { id: 'solution', label: 'Integrations' },
    { id: 'modular', label: 'Resources' }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onSectionChange(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div 
        className="bg-background/60 backdrop-blur-xl border-b border-border/20 transition-all duration-500"
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          background: hoveredItem ? 'rgba(15, 15, 23, 0.8)' : 'rgba(15, 15, 23, 0.6)'
        }}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div 
              className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/25"
            >
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-bold text-foreground transition-all duration-300 group-hover:text-purple-300">
              PulseOS
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative px-4 py-2 rounded-lg transition-all duration-500 group ${
                  activeSection === item.id 
                    ? 'text-purple-300 bg-purple-500/10' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {hoveredItem === item.id && (
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg transition-all duration-300"
                    style={{
                      background: `radial-gradient(circle at ${mousePosition.x % 100}% ${mousePosition.y % 100}%, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.1) 70%, transparent 100%)`
                    }}
                  />
                )}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-400 rounded-full transition-all duration-300" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground hover:bg-purple-500/10 transition-all duration-300"
              onMouseEnter={() => setHoveredItem('login')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span className="relative z-10">Log in</span>
              {hoveredItem === 'login' && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-md" />
              )}
            </Button>
            <Button 
              className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              onMouseEnter={() => setHoveredItem('cta')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span className="relative z-10">Get Started</span>
              {hoveredItem === 'cta' && (
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/5 transition-all duration-300"
                  style={{
                    background: `radial-gradient(circle at ${mousePosition.x % 100}% ${mousePosition.y % 100}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)`
                  }}
                />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EnhancedNavigation;
