import { getCars } from '@/lib/api/fetchCarData';
import { cacheControlHeader } from '@/lib/api/wpCache';
import { getSiteUrl } from '@/lib/seo/siteUrl';

export async function GET(request: Request) {
    const baseUrl = getSiteUrl(request);

    const cars = await getCars({ per_page: '100' });
    const urls = cars.map((car) => `/cars/${car.slug}`);

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
