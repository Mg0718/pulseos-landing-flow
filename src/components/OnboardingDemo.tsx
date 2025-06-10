
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OnboardingDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      title: "Welcome to PulseOS",
      description: "Your unified business operating system",
      image: "🚀",
      action: "Get started in seconds"
    },
    {
      title: "Connect Your Tools",
      description: "Integrate with 500+ business applications",
      image: "🔗",
      action: "One-click integrations"
    },
    {
      title: "Manage Your Team",
      description: "Track performance, attendance, and goals",
      image: "👥",
      action: "Smart workforce management"
    },
    {
      title: "Automate Workflows",
      description: "Build powerful automation with visual tools",
      image: "⚡",
      action: "Drag-and-drop automation"
    },
    {
      title: "Scale Your Business",
      description: "Growth-ready platform for any team size",
      image: "📈",
      action: "Start your free trial"
    }
  ];

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
      setCurrentStep(0);
    }
  };

  return (
    <>
      {/* Demo Trigger Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className="group relative bg-gradient-to-r from-purple-600 to-cyan-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play className="w-6 h-6" />
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 opacity-75"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="absolute -top-12 right-0 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Watch Demo
          </div>
        </motion.button>
      </motion.div>

      {/* Demo Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative bg-card/90 backdrop-blur-md border border-border/30 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    Step {currentStep + 1} of {demoSteps.length}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(((currentStep + 1) / demoSteps.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Demo Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <motion.div
                    className="text-8xl mb-6"
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    {demoSteps[currentStep].image}
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold text-foreground mb-4">
                    {demoSteps[currentStep].title}
                  </h3>
                  
                  <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
                    {demoSteps[currentStep].description}
                  </p>

                  <motion.div
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 rounded-full px-6 py-3 mb-8"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-foreground font-medium">
                      {demoSteps[currentStep].action}
                    </span>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {demoSteps.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index <= currentStep ? 'bg-purple-500' : 'bg-muted'
                      }`}
                      animate={{ scale: index === currentStep ? 1.2 : 1 }}
                    />
                  ))}
                </div>

                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                >
                  {currentStep === demoSteps.length - 1 ? 'Get Started' : 'Next'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OnboardingDemo;
