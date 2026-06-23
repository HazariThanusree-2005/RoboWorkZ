import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const GlowButton = ({ children, variant = 'primary', className = '', floating = false, ...props }) => {
  const base = variant === 'primary' ? 'btn-primary' : 'btn-outline';
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    ref.current.style.setProperty('--mouse-x', `${x}px`);
    ref.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`${base} relative group transition-all duration-300 shadow-none hover:shadow-[0_0_25px_rgba(139,92,246,0.45)] ${className}`}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={floating ? {
        y: [0, -8, 0],
      } : {}}
      transition={floating ? {
        y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
      } : {
        type: 'spring', stiffness: 400, damping: 20,
      }}
      {...props}
    >
      {/* Background radial gradient glow following cursor */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
        style={{
          background: `radial-gradient(120px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 92, 246, 0.25), transparent 80%)`,
        }}
      />
      
      {/* Glow border overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl border border-transparent"
        style={{
          background: `radial-gradient(80px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(192, 132, 252, 0.7), transparent 70%) border-box`,
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default GlowButton;
