import React from 'react';

export interface ChevronDownIconProps {
    active?: boolean;
    fillOpacity?: number;
    fill?: string;
    className?: string;
}

export const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({
    active = false,
    fillOpacity = active ? 1 : 0.4,
    fill = '#f6f6f6',
    className = 'w-[12px] h-[7px] lg:w-[14px] lg:h-[28px]',
}) => (
    <svg
        className={className}
        viewBox="0 0 12 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6 6.25C5.75391 6.25 5.53516 6.16797 5.37109 6.00391L0.996094 1.62891C0.640625 1.30078 0.640625 0.726562 0.996094 0.398438C1.32422 0.0429688 1.89844 0.0429688 2.22656 0.398438L6 4.14453L9.74609 0.398438C10.0742 0.0429688 10.6484 0.0429688 10.9766 0.398438C11.332 0.726562 11.332 1.30078 10.9766 1.62891L6.60156 6.00391C6.4375 6.16797 6.21875 6.25 6 6.25Z"
            fill={fill}
            fillOpacity={fillOpacity}
            style={{ transition: 'all 0.3s ease' }}
        />
    </svg>
);
