import React from 'react';

interface ArrowRightIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    shadow?: boolean;
}

export const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({
    className = '',
    shadow = false,
}) => (
    <svg
        className={className}
        width="30"
        height="53"
        viewBox="0 0 30 53"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g filter="url(#filter0_d_4439_101636)">
            <path
                d="M9 45C8.15625 45 7.40625 44.7188 6.84375 44.1562C5.625 43.0312 5.625 41.0625 6.84375 39.9375L22.6875 24L6.84375 8.15625C5.625 7.03125 5.625 5.0625 6.84375 3.9375C7.96875 2.71875 9.9375 2.71875 11.0625 3.9375L29.0625 21.9375C30.2812 23.0625 30.2812 25.0312 29.0625 26.1562L11.0625 44.1562C10.5 44.7188 9.75 45 9 45Z"
                fill="#F6F6F6"
            />
        </g>
        <defs>
            <filter
                id="filter0_d_4439_101636"
                x="1.625"
                y="2.71875"
                width="32.6562"
                height="50.2812"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                {shadow &&
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                }
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
                    result="effect1_dropShadow_4439_101636"
                />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_4439_101636"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
);
