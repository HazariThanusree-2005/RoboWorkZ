import React from 'react';

const BrandText = ({ className = '', size = 'default' }) => {
  const sizeClasses = {
    default: '',
    hero: 'text-5xl sm:text-6xl md:text-7xl',
    nav: 'text-xl sm:text-2xl md:text-3xl',
  };

  return (
    <span 
      className={`font-semibold tracking-[0.18em] inline-flex items-baseline ${sizeClasses[size] || ''} ${className}`}
      style={{ fontFamily: '"Orbitron", sans-serif' }}
    >
      <span 
        className="text-white group-hover:text-gray-200 transition-colors duration-300"
      >
        RoboWork
      </span>
      <span 
        className="transition-colors duration-300 font-bold" 
        style={{ 
          color: '#A855F7',
          textShadow: '0 0 10px rgba(168, 85, 247, 0.65)',
        }}
      >
        Z
      </span>
    </span>
  );
};

export default BrandText;
