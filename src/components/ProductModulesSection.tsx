
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, CreditCard, Users, Lightbulb, Calendar, BarChart } from 'lucide-react';

const ProductModulesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const modules = [
    {
      icon: Zap,
      title: 'PulseFlow',
      description: 'Intelligent workflow automation that adapts to your team',
      color: 'from-purple-500 to-violet-600',
      features: ['Smart Routing', 'Auto-Assignment', 'Deadline Tracking']
    },
    {
      icon: CreditCard,
      title: 'PulsePay',
      description: 'Seamless financial operations and expense tracking',
      color: 'from-green-500 to-emerald-600',
      features: ['Expense Tracking', 'Invoice Generation', 'Budget Planning']
    },
    {
      icon: Users,
      title: 'PulseTeam',
      description: 'Advanced team collaboration and communication hub',
      color: 'from-blue-500 to-cyan-600',
      features: ['Team Chat', 'File Sharing', 'Video Calls']
    },
    {
      icon: Lightbulb,
      title: 'PulseInnovation',
      description: 'Innovation management and idea development platform',
      color: 'from-orange-500 to-amber-600',
      features: ['Idea Bank', 'Prototype Tracking', 'Innovation Metrics']
    },
    {
      icon: Calendar,
      title: 'PulseLeave',
      description: 'Smart leave management with predictive analytics',
      color: 'from-pink-500 to-rose-600',
      features: ['Leave Planning', 'Team Coverage', 'Analytics Dashboard']
    },
    {
      icon: BarChart,
      title: 'PulseAnalytics',
      description: 'Real-time business intelligence and reporting',
      color: 'from-indigo-500 to-purple-600',
      features: ['Live Dashboards', 'Custom Reports', 'Predictive Insights']
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
      <div className="max-w-6xl mx-auto">
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
            Powerful modules that work together seamlessly
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {modules.map((module, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              className="perspective-1000"
            >
              <Card className="group bg-card/30 border border-border/20 backdrop-blur-sm hover:bg-card/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden">
                <CardHeader className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} p-2 mb-4`}
                    >
                      <module.icon className="w-full h-full text-white" />
                    </motion.div>
                    <CardTitle className="text-xl text-foreground group-hover:text-purple-300 transition-colors">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {module.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <ul className="space-y-2">
                    {module.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.1 + featureIndex * 0.1 }}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${module.color} mr-2`} />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
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
