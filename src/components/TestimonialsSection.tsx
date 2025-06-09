import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const testimonials = [
    {
      quote: "We cut down our ops tools from 11 to 1 — and doubled productivity within 30 days. PulseOS is a game-changer.",
      author: "Maya L.",
      role: "COO, ScaleUp",
      gradient: "from-purple-500 to-violet-600"
    },
    {
      quote: "It's like Notion, Slack, Airtable, and Monday had a baby — but smarter and simpler.",
      author: "Raj S.",
      role: "Founder, Finverse",
      gradient: "from-blue-500 to-cyan-600"
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
    }),
    hover: {
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const quoteVariants = {
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
          💬 What Our Users Say
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative p-8 bg-card/30 border border-border/20 rounded-xl backdrop-blur-sm space-y-6 overflow-hidden"
            >
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>

              <motion.div
                variants={quoteVariants}
                whileHover="hover"
                className="relative z-10"
              >
                <Quote className={`w-8 h-8 text-purple-400 mx-auto transition-colors duration-300 group-hover:text-purple-300`} />
              </motion.div>

              <motion.blockquote 
                className="text-lg text-foreground italic relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                "{testimonial.quote}"
              </motion.blockquote>

              <motion.div 
                className="space-y-1 relative z-10"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.2 + 0.4 }}
              >
                <p className="font-semibold text-foreground group-hover:text-purple-300 transition-colors duration-300">
                  {testimonial.author}
                </p>
                <p className="text-muted-foreground">
                  {testimonial.role}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
