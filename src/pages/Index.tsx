
import React from 'react';
import Enhanced3DBackground from '@/components/Enhanced3DBackground';
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
import OnboardingDemo from '@/components/OnboardingDemo';
import ScrollReveal from '@/components/ScrollReveal';
import { useScrollSection } from '@/hooks/useScrollSection';

const Index = () => {
  const { activeSection, setActiveSection } = useScrollSection();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Enhanced3DBackground />
      <EnhancedNavigation activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="relative z-10">
        <div id="hero">
          <ScrollReveal direction="fade">
            <HeroSection />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <SocialProofSection />
          </ScrollReveal>
        </div>
        
        <div id="chaos">
          <ScrollReveal direction="left">
            <TechnologySection />
          </ScrollReveal>
        </div>
        
        <div id="solution">
          <ScrollReveal direction="right">
            <IntegrationsSection />
          </ScrollReveal>
        </div>
        
        <div id="modular">
          <ScrollReveal direction="scale" delay={0.1}>
            <ResourcesSection />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <ProductModulesSection />
          </ScrollReveal>
        </div>
        
        <div id="works">
          <ScrollReveal direction="fade" delay={0.1}>
            <HowItWorksSection />
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.2}>
            <ComparisonSection />
          </ScrollReveal>
        </div>
        
        <div id="innovation">
          <ScrollReveal direction="scale">
            <InnovationSection />
          </ScrollReveal>
        </div>
        
        <div id="testimonials">
          <ScrollReveal direction="up">
            <TestimonialsSection />
          </ScrollReveal>
        </div>
        
        <div id="teams">
          <ScrollReveal direction="right">
            <ForTeamsSection />
          </ScrollReveal>
        </div>
        
        <div id="global">
          <ScrollReveal direction="left">
            <GlobalSection />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <PricingTeaserSection />
          </ScrollReveal>
        </div>
        
        <div id="cta">
          <ScrollReveal direction="scale">
            <FinalCTASection />
          </ScrollReveal>
        </div>
      </main>

      <OnboardingDemo />
    </div>
  );
};

export default Index;
