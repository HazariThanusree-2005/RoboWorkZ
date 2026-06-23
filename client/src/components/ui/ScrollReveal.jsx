import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ScrollReveal — wraps children with a premium whileInView entrance animation.
 *
 * direction: 'up' | 'down' | 'left' | 'right' | 'none'
 *   up    → slides up from below (default)
 *   down  → slides down from above
 *   left  → slides in from the left side
 *   right → slides in from the right side
 *   none  → pure fade, no translation
 *
 * staggerIndex: number — multiplied by 0.1 to create sequential stagger delays
 *
 * parallax: boolean — if true, element shifts subtly on scroll (parallax effect)
 * parallaxDirection: 'left' | 'right' — which direction the parallax pushes
 * parallaxAmount: number — how many pixels to shift (default 20)
 */
const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className = '',
  once = false,
  staggerIndex = 0,
  parallax = false,
  parallaxDirection = 'left',
  parallaxAmount = 20,
 }) => {
  const ref = useRef(null);

  const offsets = {
    up:    { y: 36, x: 0 },
    down:  { y: -36, x: 0 },
    left:  { y: 24, x: -40 },
    right: { y: 24, x: 40 },
    none:  { y: 0, x: 0 },
  };

  const { x, y } = offsets[direction] ?? offsets.up;

  // Stagger: each index adds 0.1s on top of the base delay
  const totalDelay = delay + staggerIndex * 0.1;

  // Parallax scroll tracking
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const parallaxX = useTransform(
    scrollYProgress,
    [0, 1],
    parallaxDirection === 'left'
      ? [parallaxAmount, -parallaxAmount]
      : [-parallaxAmount, parallaxAmount]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={parallax ? { x: parallaxX } : undefined}
      initial={{ opacity: 0, x, y, filter: 'blur(3px)', scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration,
        delay: totalDelay,
        ease: [0.16, 1, 0.3, 1], // premium easeOutExpo
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
