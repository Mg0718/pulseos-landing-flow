
import React from 'react';
import InteractiveButton from '@/components/InteractiveButton';
import { Cpu, Zap, Shield, Bot } from 'lucide-react';

const TechnologySection = () => {
  const features = [
    { icon: Cpu, title: 'AI-Powered Core', description: 'Advanced machine learning algorithms that adapt to your workflow' },
    { icon: Zap, title: 'Lightning Fast', description: 'Sub-second response times with global edge computing' },
    { icon: Shield, title: 'Enterprise Security', description: 'Bank-grade encryption with zero-trust architecture' },
    { icon: Bot, title: 'Smart Automation', description: 'Intelligent workflows that learn from your patterns' }
  ];

  return (
    <section className="min-h-screen py-20 px-6 flex items-center">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-8 mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-200 bg-clip-text text-transparent">
            🔬 Next-Gen Technology
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Built on cutting-edge infrastructure that scales with your ambitions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-6 bg-card/30 border border-border/20 rounded-xl backdrop-blur-sm hover:bg-card/50 transition-all duration-500 hover:scale-105"
            >
              <feature.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:text-cyan-300 transition-colors duration-300" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <InteractiveButton size="lg">
            Explore Architecture
          </InteractiveButton>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
