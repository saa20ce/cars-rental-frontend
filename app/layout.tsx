import type { Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/layout/Header';
import UpdatePathCookie from '@/components/common/Meta/UpdatePathCookie';
import { Footer } from '@/components/layout/Footer';

const lato = localFont({
    src: [
        // {
        //     path: '../public/fonts/Lato-Light.ttf',
        //     weight: '300',
        //     style: 'normal',
        // },
        {
            path: '../public/fonts/Lato-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/Lato-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../public/fonts/Lato-Semibold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../public/fonts/Lato-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-lato',
    display: 'swap',
    preload: true,
});

export const metadata = {
    metadataBase: new URL('https://rentasib.ru'),
    alternates: {
        canonical: './',
    },
};

export const viewport: Viewport = {
    initialScale: 1,
    maximumScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
            <body
                className={`px-4 pt-[10px] pb-2 ${lato.variable} antialiased lg:max-w-[1280px] lg:mx-auto lg:px-[10px] lg:py-5 min-h-screen`}
            >
                <UpdatePathCookie />
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
