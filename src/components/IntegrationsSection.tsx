
import React from 'react';
import InteractiveButton from '@/components/InteractiveButton';
import { Network, Puzzle, Globe, Workflow } from 'lucide-react';

const IntegrationsSection = () => {
  const integrations = [
    { icon: Network, title: 'API Ecosystem', description: 'Connect with 500+ popular tools and services' },
    { icon: Puzzle, title: 'Plug & Play', description: 'One-click integrations with zero configuration' },
    { icon: Globe, title: 'Universal Sync', description: 'Real-time data synchronization across all platforms' },
    { icon: Workflow, title: 'Smart Workflows', description: 'Automated processes that bridge different tools' }
  ];

  return (
    <section className="min-h-screen py-20 px-6 flex items-center">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-8 mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
            🔗 Seamless Integrations
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Connect everything you use into one unified ecosystem
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {integrations.map((integration, index) => (
            <div 
              key={index} 
              className="group p-8 bg-card/30 border border-border/20 rounded-xl backdrop-blur-sm hover:bg-card/50 transition-all duration-500 hover:scale-105"
            >
              <integration.icon className="w-12 h-12 text-green-400 mb-4 group-hover:text-emerald-300 transition-colors duration-300" />
              <h3 className="text-xl font-semibold text-foreground mb-3">{integration.title}</h3>
              <p className="text-muted-foreground">{integration.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <InteractiveButton size="lg">
            Browse Integrations
          </InteractiveButton>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
