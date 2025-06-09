import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { UserPlus, Puzzle, Zap } from 'lucide-react';

const HowItWorksSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      icon: UserPlus,
      title: 'Sign up and set your workspace goals',
      description: 'Quick setup tailored to your business needs',
      gradient: 'from-purple-500 to-violet-600'
    },
    {
      icon: Puzzle,
      title: 'Pick your modules or use a template',
      description: 'Choose what you need, when you need it',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Zap,
      title: 'Collaborate, automate, and track everything — in one Pulse',
      description: 'No setup fatigue. No dev dependency. Just work that flows.',
      gradient: 'from-cyan-500 to-emerald-600'
    }
  ];

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

  const titleVariants = {
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

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.2
      }
    })
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.section 
      ref={ref}
      className="py-20 px-6"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-foreground"
          variants={titleVariants}
        >
          🚀 How It Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              className="group space-y-6 p-6 bg-card/30 border border-border/20 rounded-xl backdrop-blur-sm hover:bg-card/50 transition-colors duration-300"
            >
              <motion.div 
                className="flex items-center justify-center"
                variants={iconVariants}
                whileHover="hover"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                <h3 className="text-lg font-semibold text-foreground group-hover:text-purple-300 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorksSection;
