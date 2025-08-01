import React from 'react';

interface IconProps {
    className?: string;
}

export const GoIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg
        className={`${className}`}
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            width="30"
            height="30"
            rx="15"
            fill="#F6F6F6"
            fillOpacity="0.05"
        />
        <path
            d="M12.75 23.125C12.4336 23.125 12.1523 23.0195 11.9414 22.8086C11.4844 22.3867 11.4844 21.6484 11.9414 21.2266L17.8828 15.25L11.9414 9.30859C11.4844 8.88672 11.4844 8.14844 11.9414 7.72656C12.3633 7.26953 13.1016 7.26953 13.5234 7.72656L20.2734 14.4766C20.7305 14.8984 20.7305 15.6367 20.2734 16.0586L13.5234 22.8086C13.3125 23.0195 13.0312 23.125 12.75 23.125Z"
            fill="#F6F6F6"
        />
    </svg>
);
