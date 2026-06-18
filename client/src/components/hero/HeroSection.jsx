import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import FloatingParticles from './FloatingParticles';
import GlowButton from '../ui/GlowButton';
import MagneticButton from '../ui/MagneticButton';
import BrandText from '../ui/BrandText';
import { SplineScene } from '../ui/splite';

// Premium easing curve used throughout
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const HeroSection = () => {
  const { scrollY } = useScroll();
  const leftY = useTransform(scrollY, [0, 500], [0, -100]);
  const leftOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const rightY = useTransform(scrollY, [0, 500], [0, -60]);
  const rightOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center overflow-hidden bg-dark-950 hero-grid">
      {/* Deep background layer */}
      <div className="absolute inset-0 bg-[#050312]" />

      {/* Futuristic Background Gradients */}
      <div className="absolute top-[-200px] right-[-200px] w-[900px] h-[900px] bg-primary-600/[0.06] rounded-full blur-3xl mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-3xl mix-blend-screen pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-glow/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 hero-grid opacity-60 pointer-events-none" />

      {/* Floating Particles */}
      <FloatingParticles count={30} />

      {/* Bottom gradient — smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-900 to-transparent z-10 pointer-events-none" />

      {/* ═══ SPLIT LAYOUT: Left Content (50%) + Right Robot (50%) ═══ */}
      <div className="relative z-20 max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 pt-20 pb-12 gap-8 lg:gap-4">

        {/* ─── LEFT SIDE: Content ─── */}
        <motion.div 
          className="flex flex-col items-start text-left w-full lg:w-[50%] max-w-2xl"
          style={{ y: leftY, opacity: leftOpacity }}
        >

          {/* ═══ HEADLINE ═══ */}
          <motion.h1
            className="font-space text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-bold text-white leading-[1.15] mb-6 tracking-tight"
            initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE_OUT_EXPO }}
          >
            BUILDING <span className="text-gradient glow-text">INTELLIGENT</span>{' '}
            <br className="hidden md:block" />
            ROBOTICS FOR <span className="text-gradient glow-text">THE FUTURE</span>
          </motion.h1>

          {/* ═══ SUBTEXT ═══ */}
          <motion.p
            className="text-sm sm:text-base md:text-lg text-gray-400 max-w-md md:max-w-xl mb-10 font-inter leading-relaxed tracking-wide opacity-90"
            initial={{ opacity: 0, y: 24, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE_OUT_EXPO }}
          >
            Custom robots, automation solutions, rentals, and AI-powered experiences for businesses, events, and innovation.
          </motion.p>

          {/* ═══ CTA BUTTONS ═══ */}
          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: EASE_OUT_EXPO }}
          >
            <Link to="/products" className="w-full sm:w-auto">
              <MagneticButton className="w-full">
                <GlowButton variant="primary" className="w-full text-base px-8 py-3.5">
                  Explore Products
                  <HiArrowRight className="inline ml-2" size={16} />
                </GlowButton>
              </MagneticButton>
            </Link>

            <Link to="/contact" className="w-full sm:w-auto">
              <MagneticButton className="w-full">
                <GlowButton variant="outline" className="w-full text-base px-8 py-3.5">
                  Book Demo
                </GlowButton>
              </MagneticButton>
            </Link>
          </motion.div>
        </motion.div>

        {/* ─── RIGHT SIDE: Premium Interactive 3D Spline Robot ─── */}
        <motion.div
          className="w-full lg:w-[50%] flex items-center justify-center relative"
          initial={{ opacity: 0, scale: 0.9, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE_OUT_EXPO }}
          style={{ y: rightY, opacity: rightOpacity }}
        >
          {/* Subtle radial light and soft purple ambient glow behind the robot body */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(168, 85, 247, 0.08) 45%, transparent 75%)',
              filter: 'blur(80px)',
            }}
          />

          {/* Sizing wrapper without borders, backgrounds, card outlines, or card shadows */}
          <div className="relative w-full max-w-[420px] lg:max-w-[480px] aspect-[4/5] sm:aspect-square flex items-center justify-center overflow-visible">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full object-contain pointer-events-auto"
            />
            
            {/* Chest Logo Overlay */}
            <div 
              className="absolute pointer-events-none select-none z-30 flex items-center justify-center"
              style={{
                top: '44%',
                left: '42%',
                transform: 'translate(-50%, -50%)',
                width: '6%',
                maxWidth: '30px',
                minWidth: '18px',
              }}
            >
              <img 
                src="/oz-logo.png" 
                alt="RoboWorkZ Chest Logo" 
                className="w-full h-auto object-contain brightness-[1.8] contrast-[1.15]"
                style={{
                  filter: 'drop-shadow(0 0 5px rgba(168,85,247,0.7)) brightness(1.8) contrast(1.15)',
                  animation: 'chestGlow 4s ease-in-out infinite, robotBreathing 6s ease-in-out infinite',
                  opacity: 0.92,
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 1.2 },
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 bg-primary-400 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
