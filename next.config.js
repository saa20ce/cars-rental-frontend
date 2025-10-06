/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['demo.rentasib.ru'],
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

module.exports = nextConfig;
