import React from 'react';

interface ArrowLeftIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

export const ArrowIcon: React.FC<ArrowLeftIconProps> = ({ className = '' }) => (
    <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M17 15C16.7188 15 16.4688 14.9062 16.2812 14.7188L12 10.4375L7.6875 14.7188C7.3125 15.125 6.65625 15.125 6.28125 14.7188C5.875 14.3438 5.875 13.6875 6.28125 13.3125L11.2812 8.3125C11.6562 7.90625 12.3125 7.90625 12.6875 8.3125L17.6875 13.3125C18.0938 13.6875 18.0938 14.3438 17.6875 14.7188C17.5 14.9062 17.25 15 17 15Z"
            fill="#F6F6F6"
        />
    </svg>
);
