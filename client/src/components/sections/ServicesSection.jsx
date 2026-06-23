import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

const ServicesSection = ({ hideHeader = false }) => {
  return (
    <section id="services" className="relative w-full overflow-hidden mt-20 md:mt-32" style={{ minHeight: '70vh' }}>

      {/* Full-width Looping Video */}
      <video
        src="/RoboWorkZ_Smart_Jewelry_Assistant_202606232019.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark gradient overlay — heavier at bottom-left for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

      {/* Optional top section label */}
      {!hideHeader && (
        <motion.div
          className="absolute top-8 left-6 lg:left-12 inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Lightbulb size={14} className="text-amber-400" />
          <span className="text-xs font-semibold text-amber-300 tracking-widest uppercase font-manrope">
            What We Offer
          </span>
        </motion.div>
      )}

      {/* Bottom-left overlay text */}
      <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-12 pb-10 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          {/* Side heading */}
          <h2
            className="font-bold text-white mb-3 leading-tight"
            style={{
              fontFamily: '"Orbitron", sans-serif',
              fontSize: 'clamp(1.6rem, 4vw, 3rem)',
              textShadow: '0 2px 24px rgba(245,158,11,0.5), 0 1px 4px rgba(0,0,0,0.8)',
            }}
          >
            Smart Business
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #F59E0B, #FBBF24, #FDE68A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Solutions
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-sm md:text-base font-inter leading-relaxed max-w-md"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}
          >
            Attract customers, automate tasks, and enhance engagement using intelligent robotic solutions tailored for modern businesses.
          </p>

          {/* Decorative amber accent line */}
          <div className="mt-5 h-[2px] w-24 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
            style={{ boxShadow: '0 0 10px rgba(245,158,11,0.7)' }}
          />
        </motion.div>
      </div>

    </section>
  );
};

export default ServicesSection;
