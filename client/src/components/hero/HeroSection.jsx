import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import FloatingParticles from './FloatingParticles';
import GlowButton from '../ui/GlowButton';
import MagneticButton from '../ui/MagneticButton';
import BrandText from '../ui/BrandText';
import RotatingText from '../ui/RotatingText';
import { ColorBends } from '../ui/ColorBends';
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

      {/* Dotted Neon Aurora Background */}
      <div 
        className="absolute inset-0 z-0 opacity-80 mix-blend-screen"
        style={{
          maskImage: 'radial-gradient(circle, black 2px, transparent 2px)',
          maskSize: '24px 24px',
          WebkitMaskImage: 'radial-gradient(circle, black 2px, transparent 2px)',
          WebkitMaskSize: '24px 24px'
        }}
      >
        <ColorBends
          color="#A855F7"
          speed={0.2}
          frequency={1.0}
          noise={0.15}
          bandWidth={0.14}
          rotation={90}
          fadeTop={0.75}
          iterations={1}
          intensity={1.3}
        />
      </div>

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
            BUILDING{' '}
            <RotatingText
              texts={['INTELLIGENT', 'ADVANCED', 'AUTONOMOUS', 'INNOVATIVE']}
              elementLevelClassName="rotate-gradient-char"
              splitBy="characters"
              staggerFrom="last"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-110%', opacity: 0 }}
              staggerDuration={0.025}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              rotationInterval={2400}
            />{' '}
            <br className="hidden md:block" />
            ROBOTICS FOR{' '}
            <RotatingText
              texts={['THE FUTURE', 'TOMORROW', 'INDUSTRY', 'RESEARCH']}
              elementLevelClassName="rotate-gradient-char"
              splitBy="characters"
              staggerFrom="first"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-110%', opacity: 0 }}
              staggerDuration={0.025}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              rotationInterval={2400}
            />
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
            className="flex flex-col sm:flex-row items-start gap-4 w-full sm:w-auto pt-4 relative z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: EASE_OUT_EXPO }}
          >
            <Link to="/products">
              <button className="btn-primary">
                <span>Explore Products</span> <HiArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <Link to="/contact">
              <button className="btn-outline">
                <span>Book Demo</span>
              </button>
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
          {/* Ambient glow behind robot */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] pointer-events-none rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 75%)',
              filter: 'blur(60px)',
            }}
          />

          {/* Sizing wrapper without borders, backgrounds, card outlines, or card shadows */}
          <div className="relative w-full max-w-[500px] lg:max-w-[650px] aspect-[4/5] sm:aspect-[4/5] md:aspect-square flex items-center justify-center overflow-visible">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full object-contain pointer-events-auto"
            />
            
            {/* Chest Logo Overlay */}
            <motion.div 
              className="absolute pointer-events-none select-none z-30 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%", filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%", filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 4.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                top: '44%',
                left: '42%',
                width: '6%',
                maxWidth: '30px',
                minWidth: '18px',
              }}
            >
              <img 
                src={`${import.meta.env.BASE_URL}oz-logo.png`}
                alt="" 
                className="w-full h-auto object-contain brightness-[1.8] contrast-[1.15]"
                style={{
                  filter: 'drop-shadow(0 0 5px rgba(168,85,247,0.7)) brightness(1.8) contrast(1.15)',
                  animation: 'chestGlow 4s ease-in-out infinite, robotBreathing 6s ease-in-out infinite',
                  opacity: 0.92,
                }}
              />
            </motion.div>
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
