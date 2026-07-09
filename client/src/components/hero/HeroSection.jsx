import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import FloatingParticles from './FloatingParticles';
import MagneticButton from '../ui/MagneticButton';
import RotatingText from '../ui/RotatingText';
import { SplineScene } from '../ui/splite';
import GradientBlinds from '../ui/GradientBlinds';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const HeroSection = () => {
  const { scrollY } = useScroll();
  const leftY        = useTransform(scrollY, [0, 500], [0, -100]);
  const leftOpacity  = useTransform(scrollY, [0, 400], [1, 0]);
  const rightY       = useTransform(scrollY, [0, 500], [0, -60]);
  const rightOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div id="hero" className="xero-hero-wrapper relative overflow-hidden">
      {/* Hero Section Background Only */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <GradientBlinds
          gradientColors={['#FF9FFC', '#5227FF']}
          angle={0}
          noise={0.3}
          blindCount={12}
          blindMinWidth={50}
          spotlightRadius={0.5}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>

      {/* ── Xero gradient arc card ── */}
      <div className="xero-hero-card relative overflow-hidden z-10 w-full">

        <div className="xero-hero-grid" />

        <div className="xero-inner">

          {/* Floating Particles */}
          <FloatingParticles count={30} />

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050312] to-transparent z-10 pointer-events-none" />

          {/* ══ SPLIT LAYOUT ══ */}
          <div className="relative z-20 max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 pt-6 pb-16 gap-8 lg:gap-4">

            {/* LEFT: Content */}
            <motion.div
              className="flex flex-col items-start text-left w-full lg:w-[50%] max-w-2xl"
              style={{ y: leftY, opacity: leftOpacity }}
            >
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

              <motion.p
                className="text-sm sm:text-base md:text-lg text-gray-400 max-w-md md:max-w-xl mb-10 font-inter leading-relaxed tracking-wide opacity-90"
                initial={{ opacity: 0, y: 24, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, delay: 0.55, ease: EASE_OUT_EXPO }}
              >
                Custom robots, automation solutions, rentals, and AI-powered experiences for businesses, events, and innovation.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-start gap-4 w-full sm:w-auto pt-4 relative z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.72, ease: EASE_OUT_EXPO }}
              >
                <Link to="/login">
                  <MagneticButton>
                    <button className="btn-primary text-base sm:text-lg tracking-wide whitespace-nowrap flex items-center gap-3 group">
                      <span>Login</span>
                      <HiArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </button>
                  </MagneticButton>
                </Link>
              </motion.div>
            </motion.div>

            {/* RIGHT: 3D Robot */}
            <motion.div
              className="w-full lg:w-[50%] flex items-center justify-center relative"
              initial={{ opacity: 0, scale: 0.9, x: 60 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: EASE_OUT_EXPO }}
              style={{ y: rightY, opacity: rightOpacity }}
            >
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] pointer-events-none rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(168,85,247,0.1) 50%, transparent 75%)',
                  filter: 'blur(60px)',
                }}
              />
              <div className="relative w-full max-w-[650px] lg:max-w-[850px] xl:max-w-[950px] aspect-[3.8/5] md:aspect-[4/4.5] flex items-center justify-center overflow-visible">
                <div className="w-full h-full relative flex items-center justify-center transition-transform duration-700" style={{ transform: 'scale(1.18) scaleY(1.18) translateY(3%)' }}>
                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full object-contain pointer-events-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>{/* end split layout */}

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

        </div>{/* end xero-inner */}
      </div>{/* end xero-hero-card */}
    </div>
  );
};

export default HeroSection;
