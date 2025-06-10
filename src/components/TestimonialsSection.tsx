
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Star } from 'lucide-react';

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
      company: "TechScale Inc.",
      rating: 5,
      gradient: "from-purple-500 to-violet-600",
      avatar: "ML"
    },
    {
      quote: "It's like Notion, Slack, Airtable, and Monday had a baby — but smarter and simpler. Our team adoption was instant.",
      author: "Raj S.",
      role: "Founder, Finverse",
      company: "Finverse Solutions",
      rating: 5,
      gradient: "from-blue-500 to-cyan-600",
      avatar: "RS"
    },
    {
      quote: "The automation capabilities saved us 40+ hours per week. ROI was evident within the first month of implementation.",
      author: "Sarah Chen",
      role: "Operations Director",
      company: "Global Dynamics",
      rating: 5,
      gradient: "from-emerald-500 to-teal-600",
      avatar: "SC"
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
      y: -10,
      scale: 1.02,
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
      rotate: 5,
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
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <motion.div
          variants={titleVariants}
          className="space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            💬 What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by forward-thinking teams worldwide
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative p-8 bg-card/30 border border-border/20 rounded-2xl backdrop-blur-sm space-y-6 overflow-hidden"
            >
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-10`}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>

              <motion.div
                variants={quoteVariants}
                whileHover="hover"
                className="relative z-10 flex justify-between items-start"
              >
                <Quote className="w-8 h-8 text-purple-400 transition-colors duration-300 group-hover:text-purple-300" />
                <div className="flex space-x-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.div>

              <motion.blockquote 
                className="text-lg text-foreground relative z-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                "{testimonial.quote}"
              </motion.blockquote>

              <motion.div 
                className="flex items-center space-x-4 relative z-10"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.2 + 0.4 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center font-semibold text-white`}>
                  {testimonial.avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground group-hover:text-purple-300 transition-colors duration-300">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    {testimonial.company}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
