import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VideoCardProps {
  video: string;
  title: string;
  description: string;
  tag: string;
  index: number;
  totalCards: number;
  color: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, title, description, tag, index, totalCards, color }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    const targetScale = 1 - (totalCards - index) * 0.04;

    gsap.set(card, { scale: 1, transformOrigin: 'center top' });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      onUpdate: (self) => {
        const scale = gsap.utils.interpolate(1, targetScale, self.progress);
        gsap.set(card, {
          scale: Math.max(scale, targetScale),
          transformOrigin: 'center top',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [index, totalCards]);

  // Play video reliably
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Ensure video plays even if browser policies try to block it
      video.play().catch(() => {});
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'sticky',
        top: 0,
      }}
    >
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          width: '75%',
          maxWidth: '900px',
          height: '500px',
          borderRadius: '24px',
          isolation: 'isolate',
          top: `calc(-5vh + ${index * 20}px)`,
          transformOrigin: 'top',
        }}
      >
        {/* Electric conic gradient border */}
        <div
          style={{
            position: 'absolute',
            inset: '-2px',
            borderRadius: '26px',
            background: `conic-gradient(
              from 0deg,
              transparent 0deg,
              ${color} 60deg,
              transparent 180deg,
              ${color} 240deg,
              transparent 360deg
            )`,
            zIndex: -1,
            opacity: 0.8,
          }}
        />

        {/* Glass card */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '24px',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
            backdropFilter: 'blur(20px) saturate(160%)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: `0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)`,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: index % 2 !== 0 ? 'row-reverse' : 'row',
          }}
        >
          {/* Video side (left 60%) */}
          <div style={{ flex: '0 0 60%', position: 'relative', overflow: 'hidden' }}>
            <video
              ref={videoRef}
              src={video}
              muted
              loop
              autoPlay
              playsInline
              preload="auto"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Overlay gradient on video */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: index % 2 !== 0 
                  ? `linear-gradient(to left, transparent 70%, rgba(5,3,18,0.9) 100%)`
                  : `linear-gradient(to right, transparent 70%, rgba(5,3,18,0.9) 100%)`,
              }}
            />
            {/* Live badge */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: index % 2 !== 0 ? 'auto' : '16px',
                right: index % 2 !== 0 ? '16px' : 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '20px',
                padding: '4px 12px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#ef4444',
                  boxShadow: '0 0 8px #ef4444',
                  animation: 'pulse 1.5s infinite',
                }}
              />
              <span style={{ color: 'white', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em' }}>
                LIVE DEMO
              </span>
            </div>
          </div>

          {/* Content side (right 40%) */}
          <div
            style={{
              flex: '0 0 40%',
              padding: '40px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '16px',
            }}
          >
            {/* Tag */}
            <span
              style={{
                display: 'inline-block',
                padding: '4px 14px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: `${color}22`,
                border: `1px solid ${color}55`,
                color: color,
                width: 'fit-content',
              }}
            >
              {tag}
            </span>

            {/* Title */}
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.2,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {title}
            </h3>

            {/* Description */}
            <p
              style={{
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.7,
              }}
            >
              {description}
            </p>

            {/* Divider */}
            <div
              style={{
                width: '40px',
                height: '2px',
                borderRadius: '2px',
                background: `linear-gradient(90deg, ${color}, transparent)`,
              }}
            />

            {/* Watch indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: `${color}22`,
                  border: `1px solid ${color}55`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="12" height="14" viewBox="0 0 12 14" fill={color}>
                  <path d="M0 0l12 7-12 7V0z" />
                </svg>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>Auto-playing demo</span>
            </div>
          </div>

          {/* Glass shine top */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              pointerEvents: 'none',
            }}
          />
          {/* Glass shine left */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '1px',
              height: '60%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.3), transparent)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
};

interface VideoDemoProps {
  videos: { src: string; title: string; description: string; tag: string; color: string }[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export const GlassVideoDemos: React.FC<VideoDemoProps> = ({
  videos,
  sectionTitle = 'Live Robot Demos',
  sectionSubtitle = 'See our robots in action — real deployments, real results.',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    gsap.fromTo(container, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' });
  }, []);

  return (
    <div ref={containerRef} style={{ background: '#050312' }}>
      {/* Section header */}
      <section
        style={{
          padding: '100px 24px 60px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Subtle grid bg */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* Purple glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '600px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Eyebrow tag */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: '20px',
              background: 'rgba(139,92,246,0.1)',
              border: '1px solid rgba(139,92,246,0.3)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#a78bfa',
              marginBottom: '24px',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 8px #ef4444' }} />
            Live Demonstrations
          </span>

          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 800,
              color: '#fff',
              marginBottom: '16px',
              fontFamily: "'Space Grotesk', sans-serif",
              lineHeight: 1.15,
            }}
          >
            {sectionTitle}
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.45)',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            {sectionSubtitle}
          </p>
        </div>
      </section>

      {/* Stacked video cards */}
      <section style={{ color: '#fff', width: '100%' }}>
        {videos.map((v, index) => (
          <VideoCard
            key={index}
            video={v.src}
            title={v.title}
            description={v.description}
            tag={v.tag}
            index={index}
            totalCards={videos.length}
            color={v.color}
          />
        ))}
      </section>

      {/* Bottom padding */}
      <div style={{ height: '120px' }} />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default GlassVideoDemos;
