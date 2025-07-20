import React from 'react';

interface IconProps {
  className?: string;
}

export const EmailIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    className={`${className}`}
    width="48"
    height="36"
    viewBox="0 0 48 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M43.5 0C45.9375 0 48 2.0625 48 4.5C48 6 47.25 7.3125 46.125 8.15625L25.7812 23.4375C24.6562 24.2812 23.25 24.2812 22.125 23.4375L1.78125 8.15625C0.65625 7.3125 0 6 0 4.5C0 2.0625 1.96875 0 4.5 0H43.5ZM20.3438 25.875C22.5 27.4688 25.4062 27.4688 27.5625 25.875L48 10.5V30C48 33.375 45.2812 36 42 36H6C2.625 36 0 33.375 0 30V10.5L20.3438 25.875Z"
      fill="#F6F6F6"
    />
  </svg>
);
