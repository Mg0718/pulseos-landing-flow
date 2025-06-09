
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const EnhancedNavigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'chaos', label: 'Technology' },
    { id: 'solution', label: 'Integrations' },
    { id: 'modular', label: 'Resources' },
    { id: 'works', label: 'How It Works' },
    { id: 'innovation', label: 'Innovation' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'teams', label: 'For Teams' },
    { id: 'global', label: 'Global' },
    { id: 'cta', label: 'Get Started' }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
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
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      animate={{
        y: 0,
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(10px) saturate(120%)',
        backgroundColor: isScrolled ? 'rgba(15, 15, 23, 0.9)' : 'rgba(15, 15, 23, 0.6)',
        height: isScrolled ? 64 : 80
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-2 group cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div 
            className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center"
            whileHover={{ 
              rotate: 360,
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
            }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white font-bold text-sm">P</span>
          </motion.div>
          <motion.span 
            className="text-xl font-bold text-foreground"
            whileHover={{ color: 'rgb(196, 181, 253)' }}
          >
            PulseOS
          </motion.span>
        </motion.div>
        
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`relative px-3 py-2 rounded-lg transition-all duration-300 group text-sm ${
                activeSection === item.id 
                  ? 'text-purple-300 bg-purple-500/20' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="relative z-10">{item.label}</span>
              <AnimatePresence>
                {hoveredItem === item.id && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
              {activeSection === item.id && (
                <motion.div 
                  className="absolute bottom-0 left-1/2 w-1 h-1 bg-purple-400 rounded-full"
                  layoutId="activeIndicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, x: '-50%' }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground hover:bg-purple-500/10 transition-all duration-300"
          >
            Log in
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0">
              Get Started
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default EnhancedNavigation;
