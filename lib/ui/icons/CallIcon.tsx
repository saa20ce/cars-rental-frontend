'use client';
import React, { useState } from 'react';

export interface CallIconProps {
  className?: string;
}

export const CallIcon: React.FC<CallIconProps> = ({
  className = '',
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <svg 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`w-[40px] h-[41px] lg:w-[52px] lg:h-[52px] ${className}`}
      viewBox='0 0 40 41'
      xmlns='http://www.w3.org/2000/svg'
      style={{
        transition: 'color 0.2s',
        fill: hovered ? '#F0F0F0' : '#F6F6F666',
      }}
    >
        <rect y="0.824219" width="40" height="40" rx="20" fill="white"/>
        <path d="M31.9609 26.4414L31.0234 30.3867C30.9062 30.9727 30.4375 31.3633 29.8516 31.3633C20.0078 31.3242 12 23.3164 12 13.4727C12 12.8867 12.3516 12.418 12.9375 12.3008L16.8828 11.3633C17.4297 11.2461 18.0156 11.5586 18.25 12.0664L20.0859 16.3242C20.2812 16.832 20.1641 17.418 19.7344 17.7305L17.625 19.4492C18.9531 22.1445 21.1406 24.332 23.875 25.6602L25.5938 23.5508C25.9062 23.1602 26.4922 23.0039 27 23.1992L31.2578 25.0352C31.7656 25.3086 32.0781 25.8945 31.9609 26.4414Z" fill="#284B63"/>
    </svg>
    );
};