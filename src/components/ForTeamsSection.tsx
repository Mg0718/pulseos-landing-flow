
import React from 'react';
import { Rocket, Users, TrendingUp, Eye } from 'lucide-react';

const ForTeamsSection = () => {
  const teamTypes = [
    { icon: Rocket, label: 'A startup founder building fast' },
    { icon: Users, label: 'A service business managing clients' },
    { icon: TrendingUp, label: 'An ops lead scaling complexity' },
    { icon: Eye, label: 'A visionary CXO craving visibility' }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          🧭 For Teams of All Sizes
        </h2>

        <p className="text-xl text-muted-foreground">
          Whether you're:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {teamTypes.map((team, index) => (
            <div key={index} className="flex items-center space-x-4 p-6 bg-card/30 border border-border/20 rounded-lg backdrop-blur-sm text-left">
              <team.icon className="w-8 h-8 text-cyan-400" />
              <span className="text-foreground text-lg">{team.label}</span>
            </div>
          ))}
        </div>

        <p className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          PulseOS adapts to your flow — and upgrades it.
        </p>
      </div>
    </section>
  );
};

export default ForTeamsSection;
