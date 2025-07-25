import React from 'react';

interface ArrowRightIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

export const BreadcrumbsRightIcon: React.FC<ArrowRightIconProps> = ({
    className = '',
}) => (
    <svg
        className={className}
        width="7"
        height="28"
        viewBox="0 0 7 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1.5 20C1.28906 20 1.10156 19.9297 0.960938 19.7891C0.65625 19.5078 0.65625 19.0156 0.960938 18.7344L4.17188 15.5L0.960938 12.2891C0.65625 12.0078 0.65625 11.5156 0.960938 11.2344C1.24219 10.9297 1.73438 10.9297 2.01562 11.2344L5.76562 14.9844C6.07031 15.2656 6.07031 15.7578 5.76562 16.0391L2.01562 19.7891C1.875 19.9297 1.6875 20 1.5 20Z"
            fill="#F6F6F6"
        />
    </svg>
);
