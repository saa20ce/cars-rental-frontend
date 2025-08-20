import React from 'react';

interface ArrowLeftIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

export const ArrowLeftIcon: React.FC<ArrowLeftIconProps> = ({
    className = '',
}) => (
    <svg
        className={className}
        width="30"
        height="53"
        viewBox="0 0 30 53"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g filter="url(#filter0_d_4439_101633)">
            <path
                d="M21 45C20.1562 45 19.4062 44.7188 18.8438 44.1562L0.84375 26.1562C-0.375 25.0312 -0.375 23.0625 0.84375 21.9375L18.8438 3.9375C19.9688 2.71875 21.9375 2.71875 23.0625 3.9375C24.2812 5.0625 24.2812 7.03125 23.0625 8.15625L7.21875 24L23.0625 39.9375C24.2812 41.0625 24.2812 43.0312 23.0625 44.1562C22.5 44.7188 21.75 45 21 45Z"
                fill="#F6F6F6"
            />
        </g>
        <defs>
            <filter
                id="filter0_d_4439_101633"
                x="-4.375"
                y="2.71875"
                width="32.6562"
                height="50.2812"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.42 0"
                />
                <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_4439_101633"
                />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_4439_101633"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
);
