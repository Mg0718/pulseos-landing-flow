
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import InteractiveButton from '@/components/InteractiveButton';
import { Rocket, BookOpen } from 'lucide-react';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Enhanced Mouse-Following Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.15), transparent 40%)`
        }}
        animate={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.15), transparent 40%)`
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />

      {/* Floating Orbs */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 rounded-full opacity-20 blur-xl"
          style={{
            background: `linear-gradient(45deg, #8b5cf6, #06b6d4)`,
            left: `${20 + i * 20}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight"
          variants={itemVariants}
        >
          One OS to Run Your Business. All of It.
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          PulseOS is the next-generation Business Operating System that unites your people, processes, and performance — in one seamless platform.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          variants={itemVariants}
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <InteractiveButton size="lg" icon={<Rocket className="w-5 h-5" />}>
              Get Started Free
            </InteractiveButton>
          </motion.div>
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <InteractiveButton 
              size="lg" 
              variant="outline" 
              icon={<BookOpen className="w-5 h-5" />}
            >
              See How It Works
            </InteractiveButton>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
