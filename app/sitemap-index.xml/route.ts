
export async function GET() {
    const baseUrl = 'https://staged.rentasib.ru';

    const sitemaps = [
        'sitemap-pages',
        'sitemap-cars',
        'sitemap-news-index',
    ].map((file) => `${baseUrl}/${file}`);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map((url) => `
  <sitemap>
    <loc>${url}.xml</loc>
  </sitemap>`).join('')}
</sitemapindex>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
