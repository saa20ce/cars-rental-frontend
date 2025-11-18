import { mapSite } from '@/lib/data/mapSite';

export async function GET() {
    const baseUrl = 'https://staged.rentasib.ru';

    const urls: string[] = [];
    mapSite.forEach((section) => {
        section.items.forEach((item) => urls.push(item.href));
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
            .map(
                (href) => `
  <url>
    <loc>${baseUrl}${href}</loc>
  </url>`
            )
            .join('')}
</urlset>`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' },
    });
}
