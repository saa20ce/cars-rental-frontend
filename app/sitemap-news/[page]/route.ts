const WP_API_URL = 'https://demo.rentasib.ru/wp-json/wp/v2/posts';
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://new.rentasib.ru';

type ParamsShape = { page?: string } | Promise<{ page?: string } | undefined> | undefined;

export async function GET(request: Request, { params }: { params?: ParamsShape } = {}) {
    const resolvedParams = await (params as Promise<{ page?: string } | undefined> | undefined);

    let page = Number(resolvedParams?.page) || NaN;

    if (Number.isNaN(page)) {
        try {
            const url = new URL(request.url);
            const pathname = url.pathname;

            const m1 = pathname.match(/\/sitemap-news\/(\d+)/);
            if (m1) page = Number(m1[1]);
            else {
                const m2 = pathname.match(/\/sitemap-news-(\d+)(?:\.xml)?$/);
                if (m2) page = Number(m2[1]);
            }
        } catch (e) {
            page = 1;
        }
    }

    if (!page || page < 1) page = 1;
    const perPage = 100;

    const res = await fetch(`${WP_API_URL}?_embed&per_page=${perPage}&page=${page}`);
    if (!res.ok) return new Response('Ошибка при получении новостей', { status: 500 });

    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) {
        const emptyXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;
        return new Response(emptyXml, { headers: { 'Content-Type': 'application/xml' } });
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${posts
            .map((post: any) => `
  <url>
    <loc>${baseUrl.replace(/\/$/, '')}/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
  </url>`)
            .join('')}
</urlset>`;

    return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
