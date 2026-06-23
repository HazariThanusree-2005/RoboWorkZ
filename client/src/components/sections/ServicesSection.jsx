import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Wrench, Volume2, VolumeX } from 'lucide-react';

const ServicesSection = ({ hideHeader = false }) => {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <section id="services" className="relative w-full overflow-hidden mt-20 md:mt-32 bg-[#050312]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col justify-between lg:w-[38%] h-full min-h-[340px] lg:min-h-[480px]">

            {/* Top: "Our Services" heading */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 mb-6">
                <Wrench size={13} className="text-primary-400" />
                <span className="text-xs font-semibold text-primary-300 tracking-widest uppercase font-manrope">
                  What We Offer
                </span>
              </div>

              {/* "Our Services" title */}
              <h2
                className="text-white font-bold leading-tight mb-4"
                style={{
                  fontFamily: '"Orbitron", sans-serif',
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  textShadow: '0 0 30px rgba(139,92,246,0.3)',
                }}
              >
                Our{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #C084FC, #A855F7, #7C3AED)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Services
                </span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base font-inter leading-relaxed max-w-xs">
                Comprehensive robotics solutions designed for every need — from business automation to immersive experiences.
              </p>
            </motion.div>

            {/* Bottom: "Smart Business Solution" */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 lg:mt-auto pt-8 border-t border-white/[0.06]"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                <Lightbulb size={20} className="text-amber-400" strokeWidth={1.5} />
              </div>

              {/* Heading */}
              <h3
                className="font-bold text-white leading-tight mb-3"
                style={{
                  fontFamily: '"Orbitron", sans-serif',
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                  textShadow: '0 2px 20px rgba(245,158,11,0.3)',
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
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm font-inter leading-relaxed max-w-xs">
                Attract customers, automate tasks, and enhance engagement using intelligent robotic solutions tailored for modern businesses.
              </p>

              {/* Amber accent line */}
              <div
                className="mt-4 h-[2px] w-16 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                style={{ boxShadow: '0 0 8px rgba(245,158,11,0.6)' }}
              />
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — Video ── */}
          <motion.div
            className="lg:w-[62%] w-full"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Video container with glowing border */}
            <div
              className="relative w-full rounded-2xl overflow-hidden group"
              style={{
                boxShadow: '0 0 0 1px rgba(139,92,246,0.15), 0 0 40px rgba(139,92,246,0.08), 0 20px 60px rgba(0,0,0,0.5)',
              }}
            >
              {/* Subtle top glow bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px] z-10"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.4), transparent)' }}
              />

              <video
                ref={videoRef}
                src="/RoboWorkZ_Smart_Jewelry_Assistant_202606232019.mp4"
                style={{ display: 'block', width: '100%', height: 'auto' }}
                autoPlay
                loop
                muted
                playsInline
              />

              {/* Sound Toggle Button */}
              <button
                onClick={toggleSound}
                className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold font-manrope transition-all duration-300"
                style={{
                  background: muted
                    ? 'rgba(0,0,0,0.55)'
                    : 'rgba(139,92,246,0.25)',
                  border: muted
                    ? '1px solid rgba(255,255,255,0.15)'
                    : '1px solid rgba(139,92,246,0.5)',
                  backdropFilter: 'blur(10px)',
                  color: muted ? '#9ca3af' : '#c084fc',
                  boxShadow: muted ? 'none' : '0 0 14px rgba(139,92,246,0.4)',
                }}
                title={muted ? 'Unmute video' : 'Mute video'}
              >
                {muted ? (
                  <>
                    <VolumeX size={15} />
                    <span>Unmute</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={15} />
                    <span>Mute</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-primary-500/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default ServicesSection;
