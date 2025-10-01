/** @type {import('next').NextConfig} */
module.exports = {
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
