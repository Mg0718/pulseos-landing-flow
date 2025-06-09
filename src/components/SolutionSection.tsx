
import React from 'react';
import { Lightbulb, Shield, Zap, Puzzle, Brain, Target } from 'lucide-react';

const SolutionSection = () => {
  const features = [
    { icon: Shield, label: 'Secure', color: 'text-green-400' },
    { icon: Zap, label: 'Lightning-fast', color: 'text-yellow-400' },
    { icon: Puzzle, label: 'Modular', color: 'text-blue-400' },
    { icon: Brain, label: 'AI-first', color: 'text-purple-400' },
    { icon: Target, label: 'Purpose-built', color: 'text-cyan-400' }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <div className="flex items-center justify-center mb-6">
            <Lightbulb className="w-12 h-12 text-yellow-400" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            The PulseOS Breakthrough
          </h2>
          
          <div className="space-y-4">
            <p className="text-xl text-muted-foreground">
              The truth? You don't need more tools.
            </p>
            <p className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              You need one system that connects everything. Intelligently.
            </p>
            <p className="text-xl text-foreground">
              That's what PulseOS does.
            </p>
          </div>
        </div>

        <div className="bg-card/30 border border-border/20 rounded-xl p-8 backdrop-blur-sm">
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            We built it after watching hundreds of startups, agencies, SMBs, and even enterprises struggle with scattered workflows. PulseOS replaces the patchwork — with one unified platform.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center space-y-3 p-4 bg-background/50 rounded-lg border border-border/10">
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
                <span className="text-sm font-medium text-foreground">{feature.label}</span>
              </div>
            ))}
          </div>

          <p className="text-lg text-muted-foreground mt-8">
            🎯 Purpose-built for the way modern teams work.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
