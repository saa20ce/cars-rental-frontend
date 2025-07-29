import React from 'react';

interface IconProps {
    className?: string;
}

export const NewsNextPageIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg
        className={`${className}`}
        width="11"
        height="25"
        viewBox="0 0 11 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M3 19.1426C2.71875 19.1426 2.46875 19.0488 2.28125 18.8613C1.875 18.4863 1.875 17.8301 2.28125 17.4551L7.5625 12.1426L2.28125 6.86133C1.875 6.48633 1.875 5.83008 2.28125 5.45508C2.65625 5.04883 3.3125 5.04883 3.6875 5.45508L9.6875 11.4551C10.0938 11.8301 10.0938 12.4863 9.6875 12.8613L3.6875 18.8613C3.5 19.0488 3.25 19.1426 3 19.1426Z"
            fill="#F6F6F6"
        />
    </svg>
);
