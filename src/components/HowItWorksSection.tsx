
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { UserPlus, Puzzle, Zap, ArrowRight } from 'lucide-react';

const HowItWorksSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      icon: UserPlus,
      title: 'Sign up and set your workspace goals',
      description: 'Quick setup tailored to your business needs with smart recommendations',
      gradient: 'from-purple-500 to-violet-600',
      number: '01'
    },
    {
      icon: Puzzle,
      title: 'Pick your modules or use a template',
      description: 'Choose what you need, when you need it. Start with templates or build custom workflows',
      gradient: 'from-blue-500 to-cyan-600',
      number: '02'
    },
    {
      icon: Zap,
      title: 'Collaborate, automate, and track everything — in one Pulse',
      description: 'No setup fatigue. No dev dependency. Just work that flows seamlessly across your organization',
      gradient: 'from-cyan-500 to-emerald-600',
      number: '03'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { y: 30, opacity: 0 },
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
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.2
      }
    }),
    hover: {
      y: -10,
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
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

  const numberVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
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
      <div className="max-w-6xl mx-auto text-center space-y-16">
        <motion.div
          variants={titleVariants}
          className="space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            🚀 How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes, not months
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              whileHover="hover"
              className="group relative space-y-6 p-8 bg-card/30 border border-border/20 rounded-2xl backdrop-blur-sm hover:bg-card/50 transition-colors duration-300 overflow-hidden"
            >
              {/* Background Gradient on Hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Step Number */}
              <motion.div
                variants={numberVariants}
                className="absolute top-4 right-4 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center"
              >
                <span className="text-sm font-bold text-purple-300">{step.number}</span>
              </motion.div>

              {/* Icon */}
              <motion.div 
                className="flex items-center justify-center relative z-10"
                variants={iconVariants}
                whileHover="hover"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div 
                className="space-y-4 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                <h3 className="text-xl font-semibold text-foreground group-hover:text-purple-300 transition-colors duration-300 leading-tight">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>

              {/* Arrow for flow indication (except last item) */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-20"
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2 + 0.5 }}
                >
                  <ArrowRight className="w-8 h-8 text-purple-400/50" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="pt-8"
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey Today
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HowItWorksSection;
