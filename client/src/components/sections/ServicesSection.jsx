import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Volume2, VolumeX } from 'lucide-react';

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
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

          {/* ── LEFT COLUMN — Smart Business Solutions only ── */}
          <div className="flex flex-col justify-center lg:w-[38%]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{
                  background: 'rgba(139,92,246,0.12)',
                  border: '1px solid rgba(139,92,246,0.3)',
                  boxShadow: '0 0 18px rgba(139,92,246,0.2)',
                }}
              >
                <Lightbulb size={22} className="text-primary-400" strokeWidth={1.5} />
              </div>

              {/* Heading — white + neon purple */}
              <h2
                className="font-bold leading-tight mb-4"
                style={{
                  fontFamily: '"Orbitron", sans-serif',
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                }}
              >
                <span
                  className="text-white"
                  style={{ textShadow: '0 0 20px rgba(255,255,255,0.15)' }}
                >
                  Smart Business
                </span>
                <br />
                <span
                  style={{
                    background: 'linear-gradient(90deg, #C084FC, #A855F7, #818CF8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 12px rgba(168,85,247,0.7))',
                  }}
                >
                  Solutions
                </span>
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-sm md:text-base font-inter leading-relaxed max-w-xs mb-6">
                Attract customers, automate tasks, and enhance engagement using intelligent robotic solutions tailored for modern businesses.
              </p>

              {/* Neon purple accent line */}
              <div
                className="h-[2px] w-16 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #C084FC, #7C3AED)',
                  boxShadow: '0 0 10px rgba(139,92,246,0.7)',
                }}
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
            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 0 0 1px rgba(139,92,246,0.15), 0 0 40px rgba(139,92,246,0.08), 0 20px 60px rgba(0,0,0,0.5)',
              }}
            >
              {/* Top glow bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px] z-10"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.5), transparent)' }}
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
                  background: muted ? 'rgba(0,0,0,0.55)' : 'rgba(139,92,246,0.25)',
                  border: muted ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(139,92,246,0.5)',
                  backdropFilter: 'blur(10px)',
                  color: muted ? '#9ca3af' : '#c084fc',
                  boxShadow: muted ? 'none' : '0 0 14px rgba(139,92,246,0.4)',
                }}
                title={muted ? 'Unmute video' : 'Mute video'}
              >
                {muted ? (
                  <><VolumeX size={15} /><span>Unmute</span></>
                ) : (
                  <><Volume2 size={15} /><span>Mute</span></>
                )}
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-primary-500/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-violet-500/[0.03] rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default ServicesSection;
