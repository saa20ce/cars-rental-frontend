import { cacheControlHeader } from '@/lib/api/wpCache';
import { getIndexableNewsPosts } from '@/lib/seo/newsSitemap';
import { getSiteUrl } from '@/lib/seo/siteUrl';

export async function GET(request: Request) {
    const baseUrl = getSiteUrl(request);

    let posts;
    try {
        posts = await getIndexableNewsPosts();
    } catch (error) {
        console.error('[news sitemap index]', error);
        return new Response('Ошибка WP API', {
            status: 503,
            headers: { 'Cache-Control': 'no-store' },
        });
    }

    const perPage = 100;
    const totalPages = Math.ceil(posts.length / perPage);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(
    { length: totalPages },
    (_, i) => `
  <sitemap>
    <loc>${baseUrl.replace(/\/$/, '')}/sitemap-news-${i + 1}.xml</loc>
  </sitemap>`,
).join('')}
</sitemapindex>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': cacheControlHeader(),
        },
    });
}
