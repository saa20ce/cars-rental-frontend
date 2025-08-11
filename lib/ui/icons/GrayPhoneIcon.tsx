import React from 'react';

interface IconProps {
    className?: string;
}

export const GrayPhoneIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg
        className={className}
        width="49"
        height="48"
        viewBox="0 0 49 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M35 0C38.2812 0 41 2.71875 41 6V42C41 45.375 38.2812 48 35 48H14C10.625 48 8 45.375 8 42V6C8 2.71875 10.625 0 14 0H35ZM24.5 45C26.0938 45 27.5 43.6875 27.5 42C27.5 40.4062 26.0938 39 24.5 39C22.8125 39 21.5 40.4062 21.5 42C21.5 43.6875 22.8125 45 24.5 45ZM35 6H14V36H35V6Z"
            fill="#F6F6F6"
            fillOpacity="0.6"
        />
    </svg>
);
