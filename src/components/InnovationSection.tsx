
import React from 'react';
import { Search, BarChart3, Brain, Link, Settings } from 'lucide-react';

const InnovationSection = () => {
  const features = [
    { icon: Search, label: 'Explainable AI insights' },
    { icon: BarChart3, label: 'BI-grade dashboards for real-time decision-making' },
    { icon: Brain, label: 'Built-in Innovation Hub with idea pipelines & MVP builder' },
    { icon: Link, label: 'Invisible blockchain for trust & compliance' },
    { icon: Settings, label: 'Role-based automation for every team: HR, Finance, Ops, Field, Legal, and more.' }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            🤖 Innovation Built-In
          </h2>
          <p className="text-xl text-muted-foreground">
            What if your business could innovate like Google — but without 10 engineers?
          </p>
          <p className="text-lg text-foreground">
            PulseOS comes with:
          </p>
        </div>

        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 p-6 bg-card/30 border border-border/20 rounded-lg backdrop-blur-sm text-left">
              <feature.icon className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
              <span className="text-foreground">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
