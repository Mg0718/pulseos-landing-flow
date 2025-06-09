
import React from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/Navigation';
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

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <Navigation />
      
      <main className="relative z-10">
        <HeroSection />
        <ChaosSection />
        <SolutionSection />
        <ModularSection />
        <HowItWorksSection />
        <InnovationSection />
        <TestimonialsSection />
        <ForTeamsSection />
        <GlobalSection />
        <FinalCTASection />
      </main>
    </div>
  );
};

export default Index;
