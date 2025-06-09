
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SocialProofSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const logos = [
    { name: 'TechCorp', logo: '🚀' },
    { name: 'InnovateX', logo: '⚡' },
    { name: 'FutureScale', logo: '🌟' },
    { name: 'CloudFlow', logo: '☁️' },
    { name: 'DataSync', logo: '📊' },
    { name: 'DevStack', logo: '💻' }
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-16 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-muted-foreground mb-8">Trusted by 100+ modern teams</p>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          >
            {logos.map((company, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center p-4 bg-card/20 border border-border/10 rounded-lg backdrop-blur-sm hover:bg-card/30 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{company.logo}</div>
                <span className="text-sm text-muted-foreground">{company.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
