
import React from 'react';
import { MessageSquare, FileText, Settings, BarChart3, Brain, Blocks, Code, DollarSign } from 'lucide-react';

const ModularSection = () => {
  const essentials = [
    { icon: MessageSquare, label: 'Team chat & async updates' },
    { icon: FileText, label: 'Contracts, invoices, scheduling' },
    { icon: Settings, label: 'Onboarding, approvals, workflows' },
    { icon: BarChart3, label: 'Real-time dashboards' }
  ];

  const advanced = [
    { icon: Brain, label: 'AI assistants by role' },
    { icon: Blocks, label: 'Blockchain audit trails' },
    { icon: Code, label: 'Internal developer hub' },
    { icon: DollarSign, label: 'PulsePay™ and CFO tools' }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            What PulseOS Gives You
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            🧩 Modular Stack — Just What You Need
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-green-400">Start with the essentials:</h4>
            <div className="space-y-4">
              {essentials.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-card/30 border border-border/20 rounded-lg backdrop-blur-sm">
                  <item.icon className="w-6 h-6 text-green-400" />
                  <span className="text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-purple-400">Plug in more as you grow:</h4>
            <div className="space-y-4">
              {advanced.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-card/30 border border-border/20 rounded-lg backdrop-blur-sm">
                  <item.icon className="w-6 h-6 text-purple-400" />
                  <span className="text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-lg">
          <p className="text-lg text-muted-foreground">
            Vertical templates (legal, real estate, SaaS, etc.)
          </p>
        </div>
      </div>
    </section>
  );
};

export default ModularSection;
