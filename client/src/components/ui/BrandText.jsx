import React from 'react';

const BrandText = ({ className = '' }) => {
  return (
    <span 
      className={`font-bold tracking-widest inline-flex items-baseline ${className}`}
      style={{ fontFamily: '"Ethnocentric", sans-serif' }}
    >
      <span 
        className="text-white group-hover:text-gray-100 transition-colors duration-300"
        style={{ textShadow: '0 0 15px rgba(123, 57, 252, 0.3)' }}
      >RoboWork</span>
      <span 
        className="transition-colors duration-300" 
        style={{ 
          background: 'linear-gradient(135deg, #7b39fc, #ae82ff, #ccb3ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 8px rgba(123, 57, 252, 0.6))',
        }}
      >
        Z
      </span>
    </span>
  );
};

export default BrandText;
