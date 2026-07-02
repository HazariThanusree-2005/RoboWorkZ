import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlay, HiX, HiArrowsExpand } from 'react-icons/hi';
import ScrollReveal from '../ui/ScrollReveal';

interface VideoItem {
  src: string;
  title: string;
  label: string;
  description: string;
}

/* ══════════════════════════════════════
   FULLSCREEN MODAL (portal)
══════════════════════════════════════ */
const VideoModal: React.FC<{ video: VideoItem; onClose: () => void }> = ({ video, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    // lock scroll
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      <>
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="fixed inset-0 z-[201] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl overflow-hidden"
            style={{
              background: '#0e0e11',
              border: '1px solid rgba(139,92,246,0.35)',
              boxShadow: '0 0 0 1px rgba(139,92,246,0.12), 0 40px 100px rgba(0,0,0,0.8), 0 0 120px rgba(139,92,246,0.1)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
              aria-label="Close video"
            >
              <HiX size={18} />
            </button>

            {/* Label badge */}
            <div className="absolute top-4 left-4 z-20">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase"
                style={{
                  background: 'rgba(139,92,246,0.2)',
                  border: '1px solid rgba(139,92,246,0.4)',
                  color: '#C084FC',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span
                  style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: '#ef4444', boxShadow: '0 0 6px #ef4444',
                    animation: 'vcPulse 1.5s infinite',
                  }}
                />
                {video.label}
              </span>
            </div>

            {/* 16:9 video — muted, no audio */}
            <div style={{ aspectRatio: '16/9', background: '#000' }}>
              <video
                ref={videoRef}
                src={video.src}
                muted
                controls
                playsInline
                autoPlay
                loop
                preload="auto"
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>

            {/* Footer info */}
            <div className="px-6 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="font-space font-bold text-white text-lg mb-1">{video.title}</h3>
              <p className="text-gray-400 font-inter text-sm leading-relaxed">{video.description}</p>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>,
    document.body
  );
};

/* ══════════════════════════════════════
   VIDEO CARD
══════════════════════════════════════ */
const VideoCard: React.FC<{ video: VideoItem; delay: number }> = ({ video, delay }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.load();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollReveal direction="up" delay={delay}>
        <div
          className="w-full bg-[#0e0e11] border border-white/10 rounded-2xl overflow-hidden
            hover:border-primary-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]
            transition-all duration-300 transform hover:-translate-y-2 group"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {/* Video area */}
          <div className="relative overflow-hidden flex-shrink-0" style={{ height: '320px' }}>
            {/* Purple glow */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(139,92,246,0.18) 0%, transparent 70%)' }}
            />

            <video
              ref={videoRef}
              src={video.src}
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />

            {/* Cinematic bottom fade */}
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
              style={{ height: '80px', background: 'linear-gradient(to top, #0e0e11, transparent)' }}
            />

            {/* Tag badge — top left */}
            <div className="absolute top-3 left-3 z-20">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-manrope font-semibold tracking-wider"
                style={{
                  background: 'rgba(139,92,246,0.18)',
                  border: '1px solid rgba(139,92,246,0.35)',
                  color: '#C084FC',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span
                  style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: '#ef4444', boxShadow: '0 0 6px #ef4444',
                    animation: 'vcPulse 1.5s infinite',
                  }}
                />
                {video.label}
              </span>
            </div>

            {/* Expand button — top right */}
            <button
              onClick={() => setExpanded(true)}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center
                opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
              style={{
                background: 'rgba(139,92,246,0.75)',
                border: '1px solid rgba(139,92,246,0.5)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 0 16px rgba(139,92,246,0.4)',
              }}
              aria-label="Expand video"
            >
              <HiArrowsExpand size={14} className="text-white" />
            </button>

            {/* Hover play overlay */}
            <div
              className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            >
              <div
                style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: 'rgba(139,92,246,0.85)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(139,92,246,0.6)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <HiPlay size={22} className="text-white ml-1" />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)' }} />

          {/* Text + expand CTA */}
          <div className="flex flex-col p-5">
            <h3 className="font-space font-bold text-white mb-2" style={{ fontSize: '1.05rem', lineHeight: '1.3' }}>
              {video.title}
            </h3>
            <p className="text-gray-400 font-inter leading-relaxed mb-4" style={{ fontSize: '0.8rem' }}>
              {video.description}
            </p>
            <button
              onClick={() => setExpanded(true)}
              className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full text-xs font-semibold
                transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              style={{
                background: 'rgba(139,92,246,0.12)',
                border: '1px solid rgba(139,92,246,0.3)',
                color: '#a78bfa',
              }}
            >
              <HiArrowsExpand size={13} />
              Watch Full Screen
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Fullscreen modal */}
      {expanded && <VideoModal video={video} onClose={() => setExpanded(false)} />}
    </>
  );
};

/* ══════════════════════════════════════
   SECTION
══════════════════════════════════════ */
interface HomeVideoDemoProps {
  videos: VideoItem[];
}

export const HomeVideoDemo: React.FC<HomeVideoDemoProps> = ({ videos }) => {
  return (
    <section id="live-demos" className="section-padding relative overflow-visible">

      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative px-4 md:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-manrope font-semibold tracking-widest uppercase mb-4"
            style={{
              background: 'rgba(139,92,246,0.1)',
              border: '1px solid rgba(139,92,246,0.3)',
              color: '#a78bfa',
            }}
          >
            <span
              style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#ef4444', boxShadow: '0 0 8px #ef4444',
                animation: 'vcPulse 1.5s infinite',
              }}
            />
            Live Demonstrations
          </span>

          <h2 className="font-space font-bold text-white mb-3" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.15 }}>
            See Our Robots{' '}
            <span className="text-gradient">In Action</span>
          </h2>
          <p className="text-gray-400 font-inter max-w-lg mx-auto" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
            Real-world deployments — watch our fleet perform live. Click any card to expand full screen.
          </p>
        </motion.div>

        {/* 3 equal cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {videos.map((vid, i) => (
            <VideoCard key={i} video={vid} delay={i * 0.12} />
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes vcPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
};

export default HomeVideoDemo;
