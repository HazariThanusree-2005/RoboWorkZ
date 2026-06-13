import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FloatingParticles from './FloatingParticles';
import GlowButton from '../ui/GlowButton';
import MagneticButton from '../ui/MagneticButton';

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

      {/* Split Layout Container */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between px-6 pt-32 pb-24 lg:py-0">
        
        {/* LEFT SIDE: Hero Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-[50%]">
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
            className="font-space text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-bold text-white leading-[1.15] max-w-3xl mb-6"
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
            className="text-base md:text-lg lg:text-xl text-gray-300 max-w-xl mb-10 font-inter leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            RoboWorkZ creates smart robotics solutions for businesses, student innovation, 
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
        </div>

        {/* RIGHT SIDE: Robot Video */}
        <motion.div 
          className="lg:w-[50%] mt-12 lg:mt-0 flex items-center justify-center w-full"
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            x: 0,
            y: [0, -12, 0]
          }}
          transition={{ 
            y: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: { duration: 1, delay: 0.6 },
            scale: { duration: 1, delay: 0.6 },
            x: { duration: 1, delay: 0.6 }
          }}
        >
          <div className="relative w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[440px] xl:max-w-[490px]">
            {/* Ambient glow behind the robot to blend it into the dark theme */}
            <div className="absolute inset-0 bg-primary-500/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
            
            <video
              src="/robo-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              className="relative z-10 w-full h-auto object-contain mix-blend-screen drop-shadow-[0_0_35px_rgba(123,57,252,0.35)]"
            />
          </div>
        </motion.div>
        
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
