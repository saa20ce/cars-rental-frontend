import type { Config } from 'tailwindcss';

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './clientPage/**/*.{js,ts,jsx,tsx,mdx}',
        './lib/ui/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
            keyframes: {
                expand: {
                    '0%': { maxHeight: '0px', opacity: '0' },
                    '100%': { maxHeight: '500px', opacity: '1' },
                },
                collapse: {
                    '0%': { maxHeight: '500px', opacity: '1' },
                    '100%': { maxHeight: '0px', opacity: '0' },
                },
            },
            animation: {
                expand: 'expand 0.3s linear forwards',
                collapse: 'collapse 0.3s forwards',
            },
        },
    },
    plugins: [],
} satisfies Config;
