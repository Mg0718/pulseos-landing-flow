
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, Clock, TrendingUp, Award, Target, Lightbulb, Rocket, CreditCard, Shield, Zap, Globe, Workflow, GitBranch, BarChart } from 'lucide-react';

const ProductModulesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const modules = [
    {
      icon: Users,
      title: 'Managing Employees',
      description: 'Comprehensive workforce management with performance tracking, attendance monitoring, and smart scheduling',
      color: 'from-purple-500 to-violet-600',
      features: ['Performance Management', 'Attendance Tracking', 'Calendar & Scheduling', 'Analytics Dashboard'],
      subModules: [
        { icon: Target, name: 'Goal Setting', desc: 'Track and achieve team objectives' },
        { icon: Clock, name: 'Time Tracking', desc: 'Automated attendance monitoring' },
        { icon: Calendar, name: 'Smart Scheduling', desc: 'Conflict-free team coordination' },
        { icon: TrendingUp, name: 'Performance Analytics', desc: 'Data-driven workforce insights' }
      ]
    },
    {
      icon: Lightbulb,
      title: 'Innovation Hub',
      description: 'Foster creativity and manage ideas from conception to implementation with structured development processes',
      color: 'from-yellow-500 to-orange-600',
      features: ['Idea Management', 'Project Incubation', 'Collaboration Hub', 'Innovation Analytics'],
      subModules: [
        { icon: Lightbulb, name: 'Idea Bank', desc: 'Capture and evaluate innovations' },
        { icon: Rocket, name: 'MVP Builder', desc: 'Transform ideas into prototypes' },
        { icon: Users, name: 'Collaboration', desc: 'Connect innovators and mentors' },
        { icon: BarChart, name: 'Impact Metrics', desc: 'Measure innovation success' }
      ]
    },
    {
      icon: CreditCard,
      title: 'PulsePay',
      description: 'Unified payment processing platform with multi-gateway support, enterprise security, and global reach',
      color: 'from-green-500 to-emerald-600',
      features: ['Multi-Payment Gateway', 'Enterprise Security', 'Instant Processing', 'Global Reach'],
      subModules: [
        { icon: CreditCard, name: 'Payment Gateway', desc: 'Multiple payment channels' },
        { icon: Shield, name: 'Security', desc: 'Bank-grade protection' },
        { icon: Zap, name: 'Real-time', desc: 'Lightning-fast processing' },
        { icon: Globe, name: 'Multi-currency', desc: 'Global payment support' }
      ]
    },
    {
      icon: Workflow,
      title: 'PulseFlow',
      description: 'Intelligent workflow automation with visual builder, conditional logic, and comprehensive process analytics',
      color: 'from-indigo-500 to-purple-600',
      features: ['Visual Workflow Builder', 'Conditional Logic', 'Automation Engine', 'Process Analytics'],
      subModules: [
        { icon: Workflow, name: 'Visual Builder', desc: 'Drag-and-drop workflows' },
        { icon: GitBranch, name: 'Smart Logic', desc: 'Dynamic decision trees' },
        { icon: Zap, name: 'Automation', desc: 'Powerful trigger system' },
        { icon: BarChart, name: 'Analytics', desc: 'Performance monitoring' }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className="py-20 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-200 bg-clip-text text-transparent mb-6">
            🧱 Core Modules
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive business solutions that work together seamlessly
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-8"
        >
          {modules.map((module, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                rotateY: 2,
                z: 50
              }}
              className="perspective-1000"
            >
              <Card className="group bg-card/40 border border-border/30 backdrop-blur-md hover:bg-card/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden h-full">
                <CardHeader className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-5 group-hover:opacity-15 transition-opacity duration-300`} />
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${module.color} p-3 mb-6`}
                    >
                      <module.icon className="w-full h-full text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl text-foreground group-hover:text-purple-300 transition-colors mb-3">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-base mb-4">
                      {module.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {module.subModules.map((subModule, subIndex) => (
                      <motion.div
                        key={subIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.1 + subIndex * 0.05 }}
                        className="p-3 bg-background/50 rounded-lg border border-border/20 hover:bg-background/70 transition-colors"
                      >
                        <subModule.icon className={`w-5 h-5 bg-gradient-to-r ${module.color} text-transparent bg-clip-text mb-2`} />
                        <h4 className="text-sm font-medium text-foreground mb-1">{subModule.name}</h4>
                        <p className="text-xs text-muted-foreground">{subModule.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="border-t border-border/20 pt-4">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Key Features:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {module.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: index * 0.1 + featureIndex * 0.1 }}
                          className="flex items-center text-xs text-muted-foreground"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${module.color} mr-2`} />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductModulesSection;
