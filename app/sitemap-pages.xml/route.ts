import { cacheControlHeader } from '@/lib/api/wpCache';
import { mapSite } from '@/lib/data/mapSite';
import { getSiteUrl } from '@/lib/seo/siteUrl';

export async function GET(request: Request) {
    const baseUrl = getSiteUrl(request);
    const lastModified = new Date().toISOString();

    const urls: string[] = [];
    mapSite.forEach((section) => {
        section.items.forEach((item) => {
            if (!item.href.startsWith('/docs/')) {
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
    <lastmod>${lastModified}</lastmod>
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
