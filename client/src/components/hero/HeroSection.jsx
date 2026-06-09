import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FloatingParticles from './FloatingParticles';
import GlowButton from '../ui/GlowButton';
import MagneticButton from '../ui/MagneticButton';

const HeroSection = () => {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4"
      />

      {/* Floating Particles */}
      <FloatingParticles count={25} />

      {/* Bottom gradient for transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-900 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
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
          className="font-space text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] max-w-4xl mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Building Interactive{' '}
          <span className="text-gradient">Robots</span>{' '}
          for Businesses, Events, and the Future
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mb-10 font-inter leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          RoboWorkz creates smart robotics solutions for businesses, student innovation, 
          events, rentals, and interactive experiences across India.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <Link to="/products">
            <MagneticButton>
              <GlowButton variant="primary" floating>
                Explore Products
              </GlowButton>
            </MagneticButton>
          </Link>
          <Link to="/contact">
            <MagneticButton>
              <GlowButton variant="outline" floating>
                Book a Demo
              </GlowButton>
            </MagneticButton>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-24 left-1/2 -translate-x-1/2"
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
      </div>
    </section>
  );
};

export default HeroSection;
