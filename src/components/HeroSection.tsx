
import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, BookOpen } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight">
          One OS to Run Your Business. All of It.
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          PulseOS is the next-generation Business Operating System that unites your people, processes, and performance — in one seamless platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 px-8 py-6 text-lg">
            <Rocket className="w-5 h-5 mr-2" />
            Get Started Free
          </Button>
          <Button size="lg" variant="outline" className="border-purple-500/20 text-purple-300 hover:bg-purple-500/10 px-8 py-6 text-lg">
            <BookOpen className="w-5 h-5 mr-2" />
            See How It Works
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
