
import React from 'react';
import InteractiveBackground from '@/components/InteractiveBackground';
import EnhancedNavigation from '@/components/EnhancedNavigation';
import HeroSection from '@/components/HeroSection';
import SocialProofSection from '@/components/SocialProofSection';
import TechnologySection from '@/components/TechnologySection';
import IntegrationsSection from '@/components/IntegrationsSection';
import ResourcesSection from '@/components/ResourcesSection';
import ProductModulesSection from '@/components/ProductModulesSection';
import ComparisonSection from '@/components/ComparisonSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import InnovationSection from '@/components/InnovationSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ForTeamsSection from '@/components/ForTeamsSection';
import GlobalSection from '@/components/GlobalSection';
import PricingTeaserSection from '@/components/PricingTeaserSection';
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
          <SocialProofSection />
        </div>
        
        <div id="chaos">
          <TechnologySection />
        </div>
        
        <div id="solution">
          <IntegrationsSection />
        </div>
        
        <div id="modular">
          <ResourcesSection />
          <ProductModulesSection />
        </div>
        
        <div id="works">
          <HowItWorksSection />
          <ComparisonSection />
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
          <PricingTeaserSection />
        </div>
        
        <div id="cta">
          <FinalCTASection />
        </div>
      </main>
    </div>
  );
};

export default Index;
