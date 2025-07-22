import React from 'react';

interface IconProps {
	className?: string;
}

export const PhoneIconDefault: React.FC<IconProps> = ({ className = '' }) => (
	<svg
		width='16'
		height='24'
		viewBox='0 0 17 24'
		fill='none'
		className={`${className}`}
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M15.9688 16.0938L15.2188 19.25C15.125 19.7188 14.75 20.0312 14.2812 20.0312C6.40625 20 0 13.5938 0 5.71875C0 5.25 0.28125 4.875 0.75 4.78125L3.90625 4.03125C4.34375 3.9375 4.8125 4.1875 5 4.59375L6.46875 8C6.625 8.40625 6.53125 8.875 6.1875 9.125L4.5 10.5C5.5625 12.6562 7.3125 14.4062 9.5 15.4688L10.875 13.7812C11.125 13.4688 11.5938 13.3438 12 13.5L15.4062 14.9688C15.8125 15.1875 16.0625 15.6562 15.9688 16.0938Z'
			fill='#F6F6F6'
		/>
	</svg>
);