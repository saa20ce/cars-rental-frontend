const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://staged.rentasib.ru';
const WP_API_URL = 'https://demo.rentasib.ru/wp-json/wp/v2/posts';

export async function GET() {
  const res = await fetch(`${WP_API_URL}?per_page=1`);
  if (!res.ok) return new Response('Ошибка WP API', { status: 500 });

  const totalPosts = Number(res.headers.get('X-WP-Total')) || 0;
  const perPage = 100;
  const totalPages = Math.max(0, Math.ceil(totalPosts / perPage));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from({ length: totalPages }, (_, i) => `
  <sitemap>
    <loc>${baseUrl.replace(/\/$/, '')}/sitemap-news-${i + 1}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('')}
</sitemapindex>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
