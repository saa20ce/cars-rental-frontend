/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
    allowedDevOrigins: ['127.0.0.1', 'localhost'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'rentasib.ru',
                pathname: '/wp-content/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'staged.rentasib.ru',
                pathname: '/wp-content/uploads/**',
            },
            { protocol: 'https', hostname: 'new.rentasib.ru', pathname: '/**' },
        ],
        domains: ['staged.rentasib.ru'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60 * 60 * 24 * 30,
    },

    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains',
                    },
                ],
            },
        ];
    },

    async redirects() {
        return [
            {
                source: '/blog/page/1',
                destination: '/blog',
                permanent: true,
            },
            {
                source: '/blog/page/:page(\\d+)',
                destination: '/blog?page=:page',
                permanent: true,
            },
            {
                source: '/category/blog',
                destination: '/blog',
                permanent: true,
            },
            {
                source: '/category/stati',
                destination: '/blog',
                permanent: true,
            },
            {
                source: '/category/stati/page/:page(\\d+)',
                destination: '/blog?page=:page',
                permanent: true,
            },
            {
                source: '/uslugi',
                destination: '/service',
                permanent: true,
            },
            {
                source: '/usloviya-arendy',
                destination: '/require',
                permanent: true,
            },
            {
                source: '/service/arenda-avto-dlya-biznesa',
                destination: '/service/arenda-avtomobilej-dlya-biznesa',
                permanent: true,
            },
            {
                source: '/service/arenda-avtomobilya-dlya-biznesa',
                destination: '/service/arenda-avtomobilej-dlya-biznesa',
                permanent: true,
            },
            {
                source: '/service/arenda-avto-dlya-yuridicheskih-licz',
                destination: '/service/arenda-avtomobilej-dlya-biznesa',
                permanent: true,
            },
            {
                source: '/social',
                destination: '/contacts',
                permanent: true,
            },
            {
                source: '/cars/arenda-toyota-camry-2023',
                destination: '/cars/arenda-toyota-camry-2022',
                permanent: true,
            },
            {
                source: '/service/arenda-avtomobilya-s-boksom-na-kryshe',
                destination: '/service/arenda-avtomobilya-s-boksom-na-kryshu',
                permanent: true,
            },
            {
                source: '/service/comfort-class-rental',
                destination: '/service/arenda-avto-komfort-klassa',
                permanent: true,
            },
            {
                source: '/service/economy-class-rental',
                destination: '/service/arenda-avto-ekonom-klassa',
                permanent: true,
            },
            {
                source: '/wp-content/uploads/2026/01/dogovor-arendy.pdf',
                destination: '/docs/dogovor-arendy.pdf',
                permanent: true,
            },
            {
                source: '/wp-content/uploads/2026/05/01-politika-obrabotki-pdn-ooo-rentasib.pdf',
                destination: '/docs/01-politika-obrabotki-pdn-ooo-rentasib.pdf',
                permanent: true,
            },
        ];
    },

    async rewrites() {
        return [
            {
                source: '/sitemap-news-:page.xml',
                destination: '/sitemap-news/:page',
            },
            {
                source: '/sitemap-news-index.xml',
                destination: '/sitemap-news-index',
            },
        ];
    },
};

module.exports = withBundleAnalyzer(nextConfig);
