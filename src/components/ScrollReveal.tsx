
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  delay?: number;
  duration?: number;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = ''
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px 0px'
  });

  const variants = {
    hidden: {
      opacity: 0,
      ...(direction === 'up' && { y: 60 }),
      ...(direction === 'down' && { y: -60 }),
      ...(direction === 'left' && { x: 60 }),
      ...(direction === 'right' && { x: -60 }),
      ...(direction === 'scale' && { scale: 0.8 }),
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.25, 0, 1],
        ...(direction === 'scale' && {
          type: "spring",
          stiffness: 100,
          damping: 15
        })
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
