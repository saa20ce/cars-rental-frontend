/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
    allowedDevOrigins: ['127.0.0.1:3001', 'localhost:3001'],
    images: {
	unoptimized: true,
  remotePatterns: [
    { protocol: 'https', hostname: 'staged.rentasib.ru', pathname: '/wp-content/uploads/**' },
    { protocol: 'https', hostname: 'staged.rentasib.ru', pathname: '/**' },
    { protocol: 'https', hostname: 'new.rentasib.ru', pathname: '/**' },
  ],
  domains: ['staged.rentasib.ru'],
  deviceSizes: [360, 414, 640, 768, 1024, 1200, 1280, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256],
  formats: ['image/avif', 'image/webp'],
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
