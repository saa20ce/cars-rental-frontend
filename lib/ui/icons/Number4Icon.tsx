import React from 'react';

interface IconProps {
    className?: string;
}

export const Number4Icon: React.FC<IconProps> = ({ className = '' }) => (
    <svg
        className={className}
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M42 31.4062C42 33 40.5938 34.4062 39 34.4062H36V42C36 43.6875 34.5938 45 33 45C31.3125 45 30 43.6875 30 42V34.4062H9C7.96875 34.4062 6.9375 33.8438 6.375 33C5.90625 32.1562 5.8125 31.0312 6.28125 30.0938L18.2812 4.78125C18.9375 3.28125 20.7188 2.625 22.2188 3.375C23.7188 4.03125 24.375 5.8125 23.625 7.3125L13.6875 28.4062H30V15C30 13.4062 31.3125 12 33 12C34.5938 12 36 13.4062 36 15V28.4062H39C40.5938 28.4062 42 29.7188 42 31.4062Z"
            fill="#F6F6F6"
            fillOpacity="0.6"
        />
    </svg>
);
