import React from 'react';

interface IconProps {
    className?: string;
}

export const Number1Icon: React.FC<IconProps> = ({ className = '' }) => (
    <svg
        className={className}
        width="25"
        height="43"
        viewBox="0 0 25 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M25 40C25 41.6875 23.5938 43 22 43H4C2.3125 43 1 41.6875 1 40C1 38.4062 2.3125 37 4 37H10V9.625L5.59375 12.5312C4.28125 13.4688 2.40625 13.0938 1.46875 11.6875C0.53125 10.375 0.90625 8.5 2.3125 7.5625L11.3125 1.5625C12.25 0.90625 13.375 0.90625 14.4062 1.375C15.3438 1.9375 16 2.96875 16 4.09375V37.0938H22C23.5938 37 25 38.4062 25 40Z"
            fill="#F6F6F6"
            fillOpacity="0.6"
        />
    </svg>
);
