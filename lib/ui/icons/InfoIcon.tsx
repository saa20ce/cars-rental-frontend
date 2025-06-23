'use client';
import React, { useState } from 'react';

export interface InfoIconProps {
	width?: number;
	height?: number;
}

export const InfoIcon: React.FC<InfoIconProps> = ({
	width = 24,
	height = 24,
}) => {
	const [hovered, setHovered] = useState(false);

	return (
		<svg
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			width={width}
			height={height}
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'
			style={{
				transition: 'color 0.2s',
				fill: hovered ? '#F0F0F0' : '#F6F6F666',
			}}
		>
			<path
				d='M12 0C18.6094 0 24 5.39062 24 12C24 18.6562 18.6094 24 12 24C5.34375 24 0 18.6562 0 12C0 5.39062 5.34375 0 12 0ZM12 6C11.1562 6 10.5 6.70312 10.5 7.5C10.5 8.34375 11.1562 9 12 9C12.7969 9 13.5 8.34375 13.5 7.5C13.5 6.70312 12.7969 6 12 6ZM13.875 18C14.4844 18 15 17.5312 15 16.875C15 16.2656 14.4844 15.75 13.875 15.75H13.125V11.625C13.125 11.0156 12.6094 10.5 12 10.5H10.5C9.84375 10.5 9.375 11.0156 9.375 11.625C9.375 12.2812 9.84375 12.75 10.5 12.75H10.875V15.75H10.125C9.46875 15.75 9 16.2656 9 16.875C9 17.5312 9.46875 18 10.125 18H13.875Z'
			/>
		</svg>
	);
};
