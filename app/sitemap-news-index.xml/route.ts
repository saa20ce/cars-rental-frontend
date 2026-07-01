import { cacheControlHeader, wpFetch } from '@/lib/api/wpCache';
import { getSiteUrl } from '@/lib/seo/siteUrl';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;

export async function GET(request: Request) {
    const baseUrl = getSiteUrl(request);

    const res = await wpFetch(`${WP_API_URL}/posts?per_page=1`, {
        next: { tags: ['wordpress-news'] },
    });
    if (!res.ok) return new Response('Ошибка WP API', { status: 500 });

    const totalPosts = Number(res.headers.get('X-WP-Total')) || 0;
    const perPage = 100;
    const totalPages = Math.max(0, Math.ceil(totalPosts / perPage));

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(
    { length: totalPages },
    (_, i) => `
  <sitemap>
    <loc>${baseUrl.replace(/\/$/, '')}/sitemap-news-${i + 1}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
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
