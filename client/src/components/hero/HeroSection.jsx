import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FloatingParticles from './FloatingParticles';
import GlowButton from '../ui/GlowButton';
import MagneticButton from '../ui/MagneticButton';
import BrandText from '../ui/BrandText';

const HeroSection = () => {
  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center overflow-hidden bg-dark-950">
      {/* Futuristic Background Gradients (Replacing the full screen video) */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600/[0.08] rounded-full blur-3xl mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/[0.06] rounded-full blur-3xl mix-blend-screen pointer-events-none" />

      {/* Floating Particles */}
      <FloatingParticles count={25} />

      {/* Bottom gradient for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent z-10 pointer-events-none" />

      {/* Centered Layout Container */}
      <div className="relative z-20 max-w-4xl mx-auto w-full flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center min-h-[80vh]">
        
        {/* Hero Content */}
        <div className="flex flex-col items-center w-full">
          {/* Glassmorphism Tag */}
          <motion.div
            className="glass rounded-full px-6 py-2.5 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="text-sm md:text-base font-manrope font-medium text-primary-300 tracking-wide">
              ✦ India's Next Generation Robotics Startup
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Building Interactive{' '}
            <span className="text-gradient">Robots</span>{' '}
            for Businesses & Events
          </motion.h1>

          <motion.p
            className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mb-10 font-inter leading-relaxed flex flex-wrap items-center justify-center gap-1.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <span><BrandText className="text-xl md:text-2xl font-normal leading-none -translate-y-px" /> creates smart robotics solutions for businesses, events, and interactive experiences across India.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <Link to="/products" className="w-full sm:w-auto">
              <MagneticButton className="w-full">
                <GlowButton variant="primary" floating className="w-full">
                  Explore Products
                </GlowButton>
              </MagneticButton>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <MagneticButton className="w-full">
                <GlowButton variant="outline" floating className="w-full">
                  Book a Demo
                </GlowButton>
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
        
      </div>

      {/* Scroll indicator - fixed at bottom center */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 bg-primary-400 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
