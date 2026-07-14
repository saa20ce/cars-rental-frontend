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
