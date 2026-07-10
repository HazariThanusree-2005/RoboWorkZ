import React from 'react';

// Inline gear SVG sized to match text line-height — acts as the 'o' in 'Work'
const GearO = ({ em = '0.78em' }) => (
  <svg
    width={em}
    height={em}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      display: 'inline-block',
      verticalAlign: 'middle',
      position: 'relative',
      top: '-0.05em',
      marginLeft: '0.01em',
      marginRight: '0.01em',
      flexShrink: 0,
      filter: 'drop-shadow(0 0 4px rgba(192,132,252,0.8)) drop-shadow(0 0 10px rgba(139,92,246,0.5))',
    }}
  >
    <defs>
      <linearGradient id="bgGearGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="30%" stopColor="#E2D9F3" />
        <stop offset="60%" stopColor="#C084FC" />
        <stop offset="100%" stopColor="#A855F7" />
      </linearGradient>
      <linearGradient id="bgGearInner" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1a0a2e" />
        <stop offset="100%" stopColor="#0d0520" />
      </linearGradient>
      <filter id="gearGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    {/* Gear body — 12-tooth gear path */}
    <path
      d="M50 5
         L55 2 L60 2 L64 12
         L74 7 L78 11 L72 22
         L83 28 L83 34 L72 37
         L80 47 L77 52 L66 49
         L65 60 L59 62 L53 52
         L50 63 L44 63 L41 52
         L35 62 L29 60 L28 49
         L17 52 L14 47 L22 37
         L11 34 L11 28 L22 22
         L16 11 L20 7 L30 12
         L34 2 L39 2 Z"
      fill="url(#bgGearGrad)"
      stroke="rgba(192,132,252,0.4)"
      strokeWidth="0.5"
      filter="url(#gearGlow)"
    />
    {/* Inner circle hole — dark to show depth */}
    <circle cx="50" cy="33" r="13" fill="url(#bgGearInner)" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5" />
    {/* Subtle inner ring highlight */}
    <circle cx="50" cy="33" r="9" fill="none" stroke="rgba(192,132,252,0.2)" strokeWidth="0.8" />
  </svg>
);

const BrandText = ({ className = '', size = 'default' }) => {
  const sizeClasses = {
    default: '',
    hero: 'text-5xl sm:text-6xl md:text-7xl',
    nav: 'text-xl sm:text-2xl md:text-3xl',
  };

  // Shared metallic white style for text segments
  const metallicStyle = {
    background: 'linear-gradient(180deg, #FFFFFF 0%, #E8E0F5 40%, #C4B5D9 70%, #FFFFFF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))',
  };

  const isNav = size === 'nav';

  return (
    <span
      className={`relative font-semibold tracking-[0.06em] inline-flex items-center ${sizeClasses[size] || ''} ${className}`}
      style={{ fontFamily: '"Orbitron", sans-serif', lineHeight: 1 }}
    >
      {/* Soft ambient glow beneath — only shown in nav context */}
      {isNav && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-8px',
            left: 0,
            right: 0,
            height: '18px',
            background: 'radial-gradient(ellipse at 30% 100%, rgba(139,92,246,0.4) 0%, rgba(168,85,247,0.15) 55%, transparent 80%)',
            filter: 'blur(7px)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />
      )}

      {/* "Rob" — metallic white */}
      <span style={metallicStyle} className="group-hover:opacity-90 transition-opacity duration-300">
        Rob
      </span>

      {/* "o" — metallic white (first o in Robo) */}
      <span style={metallicStyle} className="group-hover:opacity-90 transition-opacity duration-300">
        o
      </span>

      {/* "W" — metallic white */}
      <span style={metallicStyle} className="group-hover:opacity-90 transition-opacity duration-300">
        W
      </span>

      <span style={metallicStyle} className="group-hover:opacity-90 transition-opacity duration-300">
        o
      </span>

      {/* "rk" — metallic white */}
      <span style={metallicStyle} className="group-hover:opacity-90 transition-opacity duration-300">
        rk
      </span>

      {/* "Z" — vibrant neon purple with strong glow */}
      <span
        className="font-bold transition-all duration-300"
        style={{
          background: 'linear-gradient(180deg, #C084FC 0%, #A855F7 50%, #7C3AED 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 6px rgba(168,85,247,0.9)) drop-shadow(0 0 14px rgba(139,92,246,0.6))',
          marginLeft: '-0.01em',
        }}
      >
        Z
      </span>
    </span>
  );
};

export default BrandText;
