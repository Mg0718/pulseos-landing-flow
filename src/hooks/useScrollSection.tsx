
import { useState, useEffect } from 'react';

export const useScrollSection = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'chaos', 'solution', 'modular', 'works', 'innovation', 'testimonials', 'teams', 'global', 'cta'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Enhanced smooth scrolling
    const smoothScrollHandler = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', smoothScrollHandler, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', smoothScrollHandler);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(sectionId);
    }
  };

  return { activeSection, setActiveSection: scrollToSection };
};
