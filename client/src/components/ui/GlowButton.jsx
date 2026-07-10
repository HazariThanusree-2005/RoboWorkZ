import React from 'react';
import { BrutalButton } from './brutal-button';

const GlowButton = ({ children, variant = 'primary', className = '', floating = false, ...props }) => {
  const color = variant === 'primary' ? '#8B5CF6' : 'transparent';
  const textColor = variant === 'primary' ? '#ffffff' : '#a855f7';
  const borderColor = variant === 'primary' ? '#ffffff' : '#a855f7';
  const shadowColor = variant === 'primary' ? '#ffffff' : '#a855f7';

  return (
    <BrutalButton
      color={color}
      textColor={textColor}
      borderColor={borderColor}
      shadowColor={shadowColor}
      className={className}
      {...props}
    >
      {children}
    </BrutalButton>
  );
};

export default GlowButton;
