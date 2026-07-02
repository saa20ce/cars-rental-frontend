import { cacheControlHeader } from '@/lib/api/wpCache';
import { mapSite } from '@/lib/data/mapSite';
import { getSiteUrl } from '@/lib/seo/siteUrl';

export async function GET(request: Request) {
    const baseUrl = getSiteUrl(request);

    const excludedFromSitemap = new Set(['/blog']);
    const urls: string[] = [];
    mapSite.forEach((section) => {
        section.items.forEach((item) => {
            if (!excludedFromSitemap.has(item.href)) {
                urls.push(item.href);
            }
        });
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
    .map(
        (href) => `
  <url>
    <loc>${baseUrl.replace(/\/$/, '')}${href}</loc>
  </url>`,
    )
    .join('')}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': cacheControlHeader(),
        },
    });
}
