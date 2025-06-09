
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, X } from 'lucide-react';

const ComparisonSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const comparisons = [
    {
      feature: 'Unified Platform',
      pulseOS: true,
      others: false,
      description: 'Everything in one place vs scattered tools'
    },
    {
      feature: 'AI-Powered Automation',
      pulseOS: true,
      others: false,
      description: 'Smart workflows that learn and adapt'
    },
    {
      feature: 'Real-time Collaboration',
      pulseOS: true,
      others: true,
      description: 'Team communication and file sharing'
    },
    {
      feature: 'Custom Integrations',
      pulseOS: true,
      others: true,
      description: 'Connect with existing tools'
    },
    {
      feature: 'Predictive Analytics',
      pulseOS: true,
      others: false,
      description: 'Future insights and trend analysis'
    },
    {
      feature: 'Zero Setup Time',
      pulseOS: true,
      others: false,
      description: 'Get started in minutes, not weeks'
    }
  ];

  return (
    <section className="py-20 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            ⚖️ Why PulseOS?
          </h2>
          <p className="text-xl text-muted-foreground">
            See how we compare to traditional solutions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card/30 border border-border/20 rounded-xl backdrop-blur-sm overflow-hidden"
        >
          <div className="grid grid-cols-3 gap-4 p-6 border-b border-border/20">
            <div className="text-center">
              <h3 className="font-semibold text-muted-foreground">Feature</h3>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-purple-400">PulseOS</h3>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-muted-foreground">Others</h3>
            </div>
          </div>

          {comparisons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="grid grid-cols-3 gap-4 p-6 border-b border-border/10 last:border-b-0 hover:bg-card/20 transition-colors duration-300"
            >
              <div>
                <h4 className="font-medium text-foreground mb-1">{item.feature}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <div className="flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`p-2 rounded-full ${item.pulseOS ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                >
                  {item.pulseOS ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                </motion.div>
              </div>
              <div className="flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`p-2 rounded-full ${item.others ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                >
                  {item.others ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
