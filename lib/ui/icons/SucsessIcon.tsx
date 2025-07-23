import React from 'react';

interface IconProps {
  className?: string;
}

export const SucsessIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    className={`${className}`}
    width="42"
    height="42"
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="42" height="42" rx="21" fill="#F6F6F6" fillOpacity="0.2" />
    <path
      d="M29.3594 15.6406C29.8672 16.1094 29.8672 16.9297 29.3594 17.3984L19.3594 27.3984C18.8906 27.9062 18.0703 27.9062 17.6016 27.3984L12.6016 22.3984C12.0938 21.9297 12.0938 21.1094 12.6016 20.6406C13.0703 20.1328 13.8906 20.1328 14.3594 20.6406L18.4609 24.7422L27.6016 15.6406C28.0703 15.1328 28.8906 15.1328 29.3594 15.6406Z"
      fill="#F6F6F6"
    />
  </svg>
);
