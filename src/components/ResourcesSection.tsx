
import React from 'react';
import InteractiveButton from '@/components/InteractiveButton';
import { BookOpen, Video, Users, MessageCircle } from 'lucide-react';

const ResourcesSection = () => {
  const resources = [
    { icon: BookOpen, title: 'Documentation', description: 'Comprehensive guides and API references' },
    { icon: Video, title: 'Video Tutorials', description: 'Step-by-step walkthroughs for every feature' },
    { icon: Users, title: 'Community', description: 'Connect with thousands of PulseOS users' },
    { icon: MessageCircle, title: '24/7 Support', description: 'Expert help whenever you need it' }
  ];

  return (
    <section className="min-h-screen py-20 px-6 flex items-center">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-8 mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
            📚 Resources & Support
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to succeed with PulseOS
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((resource, index) => (
            <div 
              key={index} 
              className="group p-6 bg-card/30 border border-border/20 rounded-xl backdrop-blur-sm hover:bg-card/50 transition-all duration-500 hover:scale-105"
            >
              <resource.icon className="w-12 h-12 text-orange-400 mb-4 group-hover:text-amber-300 transition-colors duration-300" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{resource.title}</h3>
              <p className="text-muted-foreground">{resource.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <InteractiveButton size="lg">
            Get Started
          </InteractiveButton>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
