
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import InteractiveButton from '@/components/InteractiveButton';
import { Sparkles, Zap, Crown } from 'lucide-react';

const PricingTeaserSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      description: 'Perfect for small teams',
      features: ['Up to 10 users', 'Basic modules', 'Email support'],
      badge: 'Most Popular',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      name: 'Professional',
      icon: Sparkles,
      description: 'For growing businesses',
      features: ['Up to 50 users', 'All modules', 'Priority support', 'Custom integrations'],
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      name: 'Enterprise',
      icon: Crown,
      description: 'For large organizations',
      features: ['Unlimited users', 'White-label options', 'Dedicated support', 'Custom development'],
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <section className="py-20 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            💰 Plans Coming Soon
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Choose the perfect plan for your team's needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className={`relative p-8 bg-card/30 border border-border/20 rounded-xl backdrop-blur-sm hover:bg-card/50 transition-all duration-500 ${
                plan.badge ? 'ring-2 ring-purple-500/50' : ''
              }`}
            >
              {plan.badge && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.2 + 0.5, type: "spring" }}
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm text-white font-medium"
                >
                  {plan.badge}
                </motion.div>
              )}
              
              <div className="text-center mb-8">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${plan.gradient} p-3`}
                >
                  <plan.icon className="w-full h-full text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.2 + featureIndex * 0.1 }}
                    className="flex items-center text-muted-foreground"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${plan.gradient} mr-3`} />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <InteractiveButton className="w-full" variant="outline">
                Get Notified
              </InteractiveButton>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <InteractiveButton size="lg">
            Join the Waitlist
          </InteractiveButton>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingTeaserSection;
