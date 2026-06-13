import { motion } from 'framer-motion';

const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.8,
  className = '',
  once = true,
  staggerIndex = 0,
}) => {
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: 30 },
    right: { y: 0, x: -30 },
    none: { y: 0, x: 0 },
  };

  const { x, y } = directions[direction] || directions.up;
  
  // Calculate total delay including index-based stagger timing
  const totalDelay = delay + (staggerIndex * 0.08);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, filter: 'blur(4px)', scale: 0.97 }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ 
        duration, 
        delay: totalDelay, 
        ease: [0.16, 1, 0.3, 1] // Premium cubic bezier easeOutExpo
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
