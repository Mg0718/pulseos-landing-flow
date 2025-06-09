
import React from 'react';
import InteractiveBackground from '@/components/InteractiveBackground';
import EnhancedNavigation from '@/components/EnhancedNavigation';
import HeroSection from '@/components/HeroSection';
import ChaosSection from '@/components/ChaosSection';
import SolutionSection from '@/components/SolutionSection';
import ModularSection from '@/components/ModularSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import InnovationSection from '@/components/InnovationSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ForTeamsSection from '@/components/ForTeamsSection';
import GlobalSection from '@/components/GlobalSection';
import FinalCTASection from '@/components/FinalCTASection';
import { useScrollSection } from '@/hooks/useScrollSection';

const Index = () => {
  const { activeSection, setActiveSection } = useScrollSection();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <InteractiveBackground section={activeSection} />
      <EnhancedNavigation activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="relative z-10">
        <div id="hero">
          <HeroSection />
        </div>
        <div id="chaos">
          <ChaosSection />
        </div>
        <div id="solution">
          <SolutionSection />
        </div>
        <div id="modular">
          <ModularSection />
        </div>
        <div id="works">
          <HowItWorksSection />
        </div>
        <div id="innovation">
          <InnovationSection />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        <div id="teams">
          <ForTeamsSection />
        </div>
        <div id="global">
          <GlobalSection />
        </div>
        <div id="cta">
          <FinalCTASection />
        </div>
      </main>
    </div>
  );
};

export default Index;
