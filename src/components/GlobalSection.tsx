
import React from 'react';
import { Globe, Coins, DollarSign } from 'lucide-react';

const GlobalSection = () => {
  const features = [
    { icon: Globe, label: 'Works anywhere', description: 'Global infrastructure, local performance' },
    { icon: Coins, label: 'PulsePay supports global payments', description: 'Accept payments worldwide' },
    { icon: DollarSign, label: 'Free tier for solopreneurs', description: 'Enterprise-grade power when you need it' }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          🌍 Global & Affordable
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="space-y-4 p-6 bg-card/30 border border-border/20 rounded-xl backdrop-blur-sm">
              <feature.icon className="w-12 h-12 text-green-400 mx-auto" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">{feature.label}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalSection;
