
import React from 'react';
import InteractiveButton from '@/components/InteractiveButton';
import { Rocket, BookOpen } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight animate-fade-in">
          One OS to Run Your Business. All of It.
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in">
          PulseOS is the next-generation Business Operating System that unites your people, processes, and performance — in one seamless platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <InteractiveButton size="lg" icon={<Rocket className="w-5 h-5" />}>
            Get Started Free
          </InteractiveButton>
          <InteractiveButton 
            size="lg" 
            variant="outline" 
            icon={<BookOpen className="w-5 h-5" />}
          >
            See How It Works
          </InteractiveButton>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
