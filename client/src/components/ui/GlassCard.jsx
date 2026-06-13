import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const GlassCard = ({ children, className = '', hover = true, glow = false, tilt = true, ...props }) => {
  const ref = useRef(null);
  
  // Motion values for tilt tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Setup spring physics for a premium lag-behind feel on the 3D rotation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 15 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 15 });

  const handleMouseMove = (e) => {
    if (!ref.current || !hover) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates relative to card center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);

    // Track absolute position inside the card for the glow effect
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;
    ref.current.style.setProperty('--mouse-x', `${cursorX}px`);
    ref.current.style.setProperty('--mouse-y', `${cursorY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tilt && hover ? rotateX : 0,
        rotateY: tilt && hover ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`
        glass rounded-2xl relative overflow-hidden group transition-shadow duration-500
        ${className.match(/\bp-\d+\b|\bp-0\b/) ? '' : 'p-6'}
        ${hover ? 'cursor-pointer hover:shadow-[0_0_30px_rgba(123,57,252,0.25)]' : ''}
        ${glow ? 'glow-border' : ''}
        ${className}
      `}
      whileHover={hover ? { y: -6 } : {}}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      {...props}
    >
      {/* Cursor dynamic radial glow */}
      {hover && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(150px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(123, 57, 252, 0.12), transparent 85%)`,
          }}
        />
      )}
      
      {/* 3D tilt glow border */}
      {hover && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl border border-transparent"
          style={{
            background: `radial-gradient(120px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(174, 130, 255, 0.4), transparent 75%) border-box`,
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}

      {/* Children wrapper to keep content readable and positioned slightly forward */}
      <div className="relative z-10" style={{ transform: tilt && hover ? 'translateZ(10px)' : 'none' }}>
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
