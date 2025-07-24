import React from 'react';

interface ArrowRightIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

export const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({
    className = '',
}) => (
    <svg
        width="18"
        height="29"
        className={className}
        viewBox="0 0 18 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M3 29C2.4375 29 1.9375 28.8125 1.5625 28.4375C0.75 27.6875 0.75 26.375 1.5625 25.625L12.125 15L1.5625 4.4375C0.75 3.6875 0.75 2.375 1.5625 1.625C2.3125 0.8125 3.625 0.8125 4.375 1.625L16.375 13.625C17.1875 14.375 17.1875 15.6875 16.375 16.4375L4.375 28.4375C4 28.8125 3.5 29 3 29Z"
            fill="#F6F6F6"
        />
    </svg>
);
