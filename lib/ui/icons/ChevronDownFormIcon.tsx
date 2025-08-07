import React from 'react';

interface IconProps {
    className?: string;
}

export const ChevronDownFormIcon: React.FC<IconProps> = ({
    className = '',
}) => (
    <svg
        className={className}
        width="14"
        height="24"
        viewBox="0 0 14 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M7 16C6.71875 16 6.46875 15.9062 6.28125 15.7188L1.28125 10.7188C0.875 10.3438 0.875 9.6875 1.28125 9.3125C1.65625 8.90625 2.3125 8.90625 2.6875 9.3125L7 13.5938L11.2812 9.3125C11.6562 8.90625 12.3125 8.90625 12.6875 9.3125C13.0938 9.6875 13.0938 10.3438 12.6875 10.7188L7.6875 15.7188C7.5 15.9062 7.25 16 7 16Z"
            fill="#F6F6F6"
            fillOpacity="0.6"
        />
    </svg>
);
