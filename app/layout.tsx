import type { Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/layout/Header';
import UpdatePathCookie from '@/components/common/Meta/UpdatePathCookie';
import { Footer } from '@/components/layout/Footer';
import CookieBanner from '@/components/common/CookieBanner/CookieBanner';
import RouteChangeLoader from '@/components/common/RouteChangeLoader/RouteChangeLoader';
import ModalScrollLock from '@/components/common/ModalScrollLock/ModalScrollLock';
import { getSiteUrl } from '@/lib/seo/siteUrl';
import JsonLd from '@/components/common/Meta/JsonLd';
import { buildSiteJsonLd } from '@/lib/seo/structuredData';
import YandexMetrika from '@/components/common/Meta/YandexMetrika';

const lato = localFont({
    src: [
        {
            path: '../public/fonts/Lato-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/Lato-Semibold.woff2',
            weight: '600',
            style: 'normal',
        },
    ],
    variable: '--font-lato',
    display: 'swap',
});

export const metadata = {
    metadataBase: new URL(getSiteUrl()),
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
    const siteJsonLd = buildSiteJsonLd();

    return (
        <html lang="ru">
            <body
                className={`px-4 pt-[10px] pb-2 ${lato.variable} antialiased lg:max-w-[1280px] lg:mx-auto lg:px-[10px] lg:py-5 min-h-screen`}
            >
                <JsonLd id="site-jsonld" data={siteJsonLd} />
                <UpdatePathCookie />
                <ModalScrollLock />
                <RouteChangeLoader />
                <YandexMetrika />
                <Header />
                <main>{children}</main>
                <Footer />
                <CookieBanner />
            </body>
        </html>
    );
}
