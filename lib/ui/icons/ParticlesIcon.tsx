import React from 'react';

interface IconProps {
  className?: string;
}

export const ParticlesIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    className={`${className}`}
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="26" height="26" rx="13" fill="#F6F6F6" fill-opacity="0.2" />
    <circle cx="13" cy="13" r="5" fill="#F6F6F6" fill-opacity="0.6" />
  </svg>
);
