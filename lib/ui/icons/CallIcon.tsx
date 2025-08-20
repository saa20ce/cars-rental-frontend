'use client';
import React, { useState } from 'react';

export interface CallIconProps {
    className?: string;
}

export const CallIcon: React.FC<CallIconProps> = ({ className = '' }) => {
    return (
        <svg
            className={className}
            width="49"
            height="48"
            viewBox="0 0 49 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="0.332031" width="48" height="48" rx="24" fill="#F6F6F6" />
            <path
                d="M36.2852 30.1406L35.1602 34.875C35.0195 35.5781 34.457 36.0469 33.7539 36.0469C21.9414 36 12.332 26.3906 12.332 14.5781C12.332 13.875 12.7539 13.3125 13.457 13.1719L18.1914 12.0469C18.8477 11.9062 19.5508 12.2812 19.832 12.8906L22.0352 18C22.2695 18.6094 22.1289 19.3125 21.6133 19.6875L19.082 21.75C20.6758 24.9844 23.3008 27.6094 26.582 29.2031L28.6445 26.6719C29.0195 26.2031 29.7227 26.0156 30.332 26.25L35.4414 28.4531C36.0508 28.7812 36.4258 29.4844 36.2852 30.1406Z"
                fill="#284B63"
            />
        </svg>
    );
};
