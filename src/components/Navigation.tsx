
import React from 'react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="text-xl font-bold text-foreground">PulseOS</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#overview" className="text-muted-foreground hover:text-foreground transition-colors">Overview</a>
          <a href="#technology" className="text-muted-foreground hover:text-foreground transition-colors">Technology</a>
          <a href="#integrations" className="text-muted-foreground hover:text-foreground transition-colors">Integrations</a>
          <a href="#resources" className="text-muted-foreground hover:text-foreground transition-colors">Resources</a>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Log in
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
