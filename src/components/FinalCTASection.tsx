
import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, Eye, BookOpen } from 'lucide-react';

const FinalCTASection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            🎯 You don't need to duct-tape another tool.
          </h2>
          <p className="text-2xl text-muted-foreground">
            You need one command center for your entire company.
          </p>
          <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            PulseOS is the OS your business deserves.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 px-8 py-6 text-lg">
            <Rocket className="w-5 h-5 mr-2" />
            Get Started Free
          </Button>
          <Button size="lg" variant="outline" className="border-purple-500/20 text-purple-300 hover:bg-purple-500/10 px-8 py-6 text-lg">
            <Eye className="w-5 h-5 mr-2" />
            Explore Live Demo
          </Button>
          <Button size="lg" variant="outline" className="border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/10 px-8 py-6 text-lg">
            <BookOpen className="w-5 h-5 mr-2" />
            Request Info
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
