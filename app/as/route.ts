const WP_API_URL = 'https://demo.rentasib.ru/wp-json/wp/v2/posts';
const baseUrl = 'https://new.rentasib.ru';

export async function GET({ params }: { params: { page: string } }) {
    const page = Number(params.page) || 1;
    const perPage = 100;

    const res = await fetch(`${WP_API_URL}?_embed&per_page=${perPage}&page=${page}`);
    if (!res.ok) return new Response('Ошибка при получении новостей', { status: 500 });

    const posts = await res.json();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${posts
            .map(
                (post: any) => `
  <url>
    <loc>${baseUrl}/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
  </url>`
            )
            .join('')}
</urlset>`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' },
    });
}
