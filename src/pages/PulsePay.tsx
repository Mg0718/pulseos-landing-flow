
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import InteractiveBackground from '@/components/InteractiveBackground';
import EnhancedNavigation from '@/components/EnhancedNavigation';
import { CreditCard, Shield, Zap, Globe, TrendingUp, Lock } from 'lucide-react';
import { useScrollSection } from '@/hooks/useScrollSection';

const PulsePay = () => {
  const { activeSection, setActiveSection } = useScrollSection();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      icon: CreditCard,
      title: "Multi-Payment Gateway",
      description: "Accept payments through multiple channels with unified reporting",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with PCI DSS compliance and fraud protection",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Lightning-fast payment processing with real-time notifications",
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Support for multiple currencies and international payment methods",
      gradient: "from-purple-500 to-violet-600"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <InteractiveBackground section="payments" />
      <EnhancedNavigation activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="relative z-10 pt-20">
        <motion.section 
          className="min-h-screen flex items-center justify-center text-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-6xl mx-auto space-y-12">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent">
                PulsePay
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
                Unified payment processing platform for modern businesses
              </p>
            </motion.div>

            <motion.div 
              ref={ref}
              className="grid md:grid-cols-2 gap-8 mt-16"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, staggerChildren: 0.1 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group p-8 bg-card/30 border border-border/20 rounded-xl backdrop-blur-sm hover:bg-card/50 transition-all duration-300"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center mb-6 group-hover:shadow-xl transition-shadow duration-300`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default PulsePay;
