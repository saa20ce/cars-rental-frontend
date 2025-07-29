import React from 'react';

interface IconProps {
    className?: string;
}

export const NewsNextPageDisabledIcon: React.FC<IconProps> = ({
    className = '',
}) => (
    <svg
        className={`${className}`}
        width="11"
        height="25"
        viewBox="0 0 11 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M8 19.1426C7.71875 19.1426 7.46875 19.0488 7.28125 18.8613L1.28125 12.8613C0.875 12.4863 0.875 11.8301 1.28125 11.4551L7.28125 5.45508C7.65625 5.04883 8.3125 5.04883 8.6875 5.45508C9.09375 5.83008 9.09375 6.48633 8.6875 6.86133L3.40625 12.1426L8.6875 17.4551C9.09375 17.8301 9.09375 18.4863 8.6875 18.8613C8.5 19.0488 8.25 19.1426 8 19.1426Z"
            fill="#F6F6F6"
            fillOpacity="0.2"
        />
    </svg>
);
