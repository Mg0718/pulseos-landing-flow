
import React from 'react';
import { UserPlus, Puzzle, Zap } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Sign up and set your workspace goals',
      description: 'Quick setup tailored to your business needs'
    },
    {
      icon: Puzzle,
      title: 'Pick your modules or use a template',
      description: 'Choose what you need, when you need it'
    },
    {
      icon: Zap,
      title: 'Collaborate, automate, and track everything — in one Pulse',
      description: 'No setup fatigue. No dev dependency. Just work that flows.'
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          🚀 How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="space-y-6 p-6 bg-card/30 border border-border/20 rounded-xl backdrop-blur-sm">
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
