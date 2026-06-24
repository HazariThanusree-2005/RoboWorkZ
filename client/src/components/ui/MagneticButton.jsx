import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * MagneticButton wraps elements (buttons, icons, text) to create a premium magnetic hover effect.
 * It tracks the mouse cursor within its range and pulls the element toward it.
 */
export default function MagneticButton({ children, range = 60, className = "" }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center of the button
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = clientX - centerX;
    const y = clientY - centerY;
    
    const distance = Math.sqrt(x * x + y * y);
    
    // If cursor is within range, pull it towards cursor
    if (distance < range) {
      // Apply a damping multiplier (e.g. 0.35) so it doesn't move 1:1 with the mouse
      setPosition({ x: x * 0.35, y: y * 0.35 });
    } else {
      // Otherwise, return to center
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 120, damping: 12, mass: 0.1 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
