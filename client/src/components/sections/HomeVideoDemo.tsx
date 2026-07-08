import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useTransform } from 'framer-motion';
import { HiX, HiArrowsExpand, HiArrowRight } from 'react-icons/hi';
import {
  ContainerScroll,
  ContainerInset,
  useContainerScrollContext,
} from '@/components/ui/hero-video';

interface VideoItem {
  src: string;
  title: string;
  label: string;
  description: string;
}

/* ─────────────────────────────────────────
   Responsive hook — true when viewport ≥ 1024 px
───────────────────────────────────────── */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= 1024
  );
  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return isDesktop;
}

/* ─────────────────────────────────────────
   FULLSCREEN MODAL
───────────────────────────────────────── */
const VideoModal: React.FC<{ video: VideoItem; onClose: () => void }> = ({ video, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      <>
        <motion.div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        />
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
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
              aria-label="Close video"
            >
              <HiX size={18} />
            </button>
            <div className="absolute top-4 left-4 z-20">
              <LabelBadge label={video.label} />
            </div>
            <div style={{ aspectRatio: '16/9', background: '#000' }}>
              <video
                ref={videoRef}
                src={video.src}
                muted controls playsInline autoPlay loop preload="auto"
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
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

/* ─────────────────────────────────────────
   Shared sub-components
───────────────────────────────────────── */
const LabelBadge: React.FC<{ label: string }> = ({ label }) => (
  <span
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-manrope font-semibold tracking-widest uppercase"
    style={{
      background: 'rgba(139,92,246,0.18)',
      border: '1px solid rgba(139,92,246,0.4)',
      color: '#C084FC',
      backdropFilter: 'blur(8px)',
    }}
  >
    {label}
  </span>
);

const ScrollResponsiveCaption: React.FC<{ label: string; title: string }> = ({ label, title }) => {
  const { scrollYProgress } = useContainerScrollContext();
  // Visible in the first image state, disappears when scrolling down to the second image state
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.45, 1], [1, 1, 0, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-4 pt-8 pointer-events-none"
    >
      <div className="mb-1.5">
        <LabelBadge label={label} />
      </div>
      <p className="font-space font-semibold text-white text-sm truncate">{title}</p>
    </motion.div>
  );
};

const VideoOverlays: React.FC<{ onExpand: () => void }> = ({ onExpand }) => (
  <>
    <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'radial-gradient(ellipse at 50% 85%, rgba(139,92,246,0.2) 0%, transparent 65%)' }} />
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10" style={{ height: '70px', background: 'linear-gradient(to top, #0a0a0f, transparent)' }} />
    <button
      onClick={onExpand}
      className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
      style={{ background: 'rgba(139,92,246,0.75)', border: '1px solid rgba(139,92,246,0.5)', backdropFilter: 'blur(8px)', boxShadow: '0 0 20px rgba(139,92,246,0.5)' }}
      aria-label="Expand video"
    >
      <HiArrowsExpand size={15} className="text-white" />
    </button>
  </>
);

const ViewProductsBtn: React.FC = () => (
  <div className="flex justify-center mt-8">
    <Link
      to="/products"
      className="btn-primary text-sm tracking-wide group"
    >
      <span>View Products</span>
      <HiArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  </div>
);

/* ─────────────────────────────────────────
   DESKTOP TRIPLE GRID — all 3 videos side-by-side inside ONE
   ContainerScroll+ContainerInset (identical to RobotVideoSection)
───────────────────────────────────────── */
const DesktopTripleGrid: React.FC<{ videos: VideoItem[] }> = ({ videos }) => {
  const ref0 = useRef<HTMLVideoElement>(null);
  const ref1 = useRef<HTMLVideoElement>(null);
  const ref2 = useRef<HTMLVideoElement>(null);
  const videoRefs = [ref0, ref1, ref2];
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  // Set up a separate IntersectionObserver per video with proper cleanup
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    videoRefs.forEach(ref => {
      const el = ref.current;
      if (!el) return;

      el.muted = true;
      el.loop = true;
      el.defaultMuted = true;
      el.load();

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(el);
      cleanups.push(() => observer.disconnect());
    });

    return () => cleanups.forEach(fn => fn());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* ContainerScroll provides the scroll-progress context — same as RobotVideoSection */}
      <ContainerScroll className="bg-dark-950 hero-grid">

        {/* Background glows — identical to RobotVideoSection */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl mix-blend-screen" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl mix-blend-screen" />
        </div>

        {/* ContainerInset — EXACT same props/class as RobotVideoSection */}
        <ContainerInset
          insetXRange={[15, 0]}
          insetYRange={[0, 0]}
          translateYRange={['0%', '0%']}
          className="mx-4 md:mx-8 mt-12 mb-12 rounded-2xl overflow-hidden border border-white/10 shadow-glow-lg h-[40vh] md:h-[55vh]"
        >
          {/* 3-column video grid filling the full container height */}
          <div className="relative grid grid-cols-3 w-full h-full">
            {videos.map((vid, i) => (
              <div
                key={i}
                className="relative overflow-hidden group/card"
                style={{ borderRight: i < 2 ? '1px solid rgba(139,92,246,0.18)' : 'none' }}
              >
                {/* Video — autoPlay attr as browser fallback + IntersectionObserver control */}
                <video
                  ref={videoRefs[i]}
                  src={vid.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 block h-full w-full object-cover"
                />

                {/* Gradient overlays */}
                <div className="absolute inset-0 pointer-events-none z-10"
                  style={{ background: 'radial-gradient(ellipse at 50% 90%, rgba(139,92,246,0.15) 0%, transparent 60%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
                  style={{ height: '80px', background: 'linear-gradient(to top, rgba(5,3,18,0.88), transparent)' }}
                />

                {/* Expand button — appears on hover */}
                <button
                  onClick={() => setExpandedIdx(i)}
                  className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-200 hover:scale-110"
                  style={{
                    background: 'rgba(139,92,246,0.8)',
                    border: '1px solid rgba(139,92,246,0.5)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 0 16px rgba(139,92,246,0.5)',
                  }}
                  aria-label={`Expand ${vid.title}`}
                >
                  <HiArrowsExpand size={13} className="text-white" />
                </button>

                {/* Label + title at bottom — fades out when container morphs into oval shape */}
                <ScrollResponsiveCaption label={vid.label} title={vid.title} />
              </div>
            ))}
          </div>
        </ContainerInset>
      </ContainerScroll>

      {/* Fullscreen modal */}
      {expandedIdx !== null && videos[expandedIdx] && (
        <VideoModal video={videos[expandedIdx]} onClose={() => setExpandedIdx(null)} />
      )}
    </>
  );
};

/* ─────────────────────────────────────────
   MOBILE BLOCK — one per video, scroll-expansion effect
───────────────────────────────────────── */
const MobileVideoBlock: React.FC<{ video: VideoItem }> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.loop = true;
    el.load();
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.play().catch(() => {}); else el.pause(); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="w-full">
        <ContainerScroll className="bg-dark-950 hero-grid">
          {/* Background glows */}
          <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl mix-blend-screen" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl mix-blend-screen" />
          </div>

          {/* Label badge */}
          <motion.div
            className="relative z-10 flex justify-center mb-6"
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <LabelBadge label={video.label} />
          </motion.div>

          {/* Scroll-boundary expansion — clip-path shrinks from 15% inset → 0% */}
          <ContainerInset
            insetXRange={[15, 0]}
            insetYRange={[0, 0]}
            translateYRange={['0%', '0%']}
            className="group mx-4 mt-4 mb-4 rounded-2xl overflow-hidden border border-white/10 shadow-glow-lg h-[60vh]"
          >
            <video
              ref={videoRef}
              src={video.src}
              muted loop playsInline
              className="relative z-10 block h-full w-full object-cover align-middle"
            />
            <VideoOverlays onExpand={() => setExpanded(true)} />
          </ContainerInset>
        </ContainerScroll>

        {/* View Products button outside clip-path context */}
        <div className="px-4">
          <ViewProductsBtn />
        </div>
      </div>

      {expanded && <VideoModal video={video} onClose={() => setExpanded(false)} />}
    </>
  );
};

/* ─────────────────────────────────────────
   SECTION
───────────────────────────────────────── */
interface HomeVideoDemoProps {
  videos: VideoItem[];
}

export const HomeVideoDemo: React.FC<HomeVideoDemoProps> = ({ videos }) => {
  const isDesktop = useIsDesktop();

  return (
    <section id="live-demos" className="relative overflow-visible">

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          <h2 className="font-space font-bold text-white mb-3" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.15 }}>
            See Our Robots{' '}
            <span className="text-gradient">In Action</span>
          </h2>
          <p className="text-gray-400 font-inter max-w-lg mx-auto" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
            Real-world deployments — watch our fleet perform live.
          </p>
        </motion.div>
      </div>

      {/* ── DESKTOP: all 3 videos in one scroll-zoom animated container ── */}
      {isDesktop && (
        <div className="w-full">
          <DesktopTripleGrid videos={videos} />
          <div className="pb-12">
            <ViewProductsBtn />
          </div>
        </div>
      )}

      {/* ── MOBILE: stacked one by one with scroll-expansion effect ── */}
      {!isDesktop && (
        <div className="w-full pb-10">
          {videos.map((vid, i) => (
            <MobileVideoBlock key={i} video={vid} />
          ))}
        </div>
      )}

      <style>{`
        @keyframes vcPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
};

export default HomeVideoDemo;
