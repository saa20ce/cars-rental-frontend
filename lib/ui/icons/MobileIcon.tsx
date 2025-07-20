import React from 'react';

interface IconProps {
  className?: string;
}

export const MobileIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    className={`${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M34.5 0C37.7812 0 40.5 2.71875 40.5 6V42C40.5 45.375 37.7812 48 34.5 48H13.5C10.125 48 7.5 45.375 7.5 42V6C7.5 2.71875 10.125 0 13.5 0H34.5ZM24 45C25.5938 45 27 43.6875 27 42C27 40.4062 25.5938 39 24 39C22.3125 39 21 40.4062 21 42C21 43.6875 22.3125 45 24 45ZM34.5 6H13.5V36H34.5V6Z"
      fill="#F6F6F6"
    />
  </svg>
);
