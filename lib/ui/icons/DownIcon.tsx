import React from 'react';

interface IconProps {
    className?: string;
}

export const DownIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg
        className={`${className}`}
        width="13"
        height="24"
        viewBox="0 0 13 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6.5 16C6.21875 16 5.96875 15.9062 5.78125 15.7188L0.78125 10.7188C0.375 10.3438 0.375 9.6875 0.78125 9.3125C1.15625 8.90625 1.8125 8.90625 2.1875 9.3125L6.5 13.5938L10.7812 9.3125C11.1562 8.90625 11.8125 8.90625 12.1875 9.3125C12.5938 9.6875 12.5938 10.3438 12.1875 10.7188L7.1875 15.7188C7 15.9062 6.75 16 6.5 16Z"
            fill="#F6F6F6"
        />
    </svg>
);
