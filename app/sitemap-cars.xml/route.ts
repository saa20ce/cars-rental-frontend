import { getCars } from '@/lib/api/fetchCarData';

export async function GET() {
    const baseUrl = 'https://staged.rentasib.ru';

    const cars = await getCars({ per_page: '100' });
    const urls = cars.map((car: any) => `/cars/${car.slug}`);

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
