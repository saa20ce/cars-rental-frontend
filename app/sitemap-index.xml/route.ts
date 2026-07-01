import { cacheControlHeader } from '@/lib/api/wpCache';
import { getSiteUrl } from '@/lib/seo/siteUrl';

export async function GET(request: Request) {
    const baseUrl = getSiteUrl(request);

    const sitemaps = [
        'sitemap-pages',
        'sitemap-cars',
        'sitemap-news-index',
    ].map((file) => `${baseUrl.replace(/\/$/, '')}/${file}`);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
    .map(
        (url) => `
  <sitemap>
    <loc>${url}.xml</loc>
  </sitemap>`,
    )
    .join('')}
</sitemapindex>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': cacheControlHeader(),
        },
    });
}
