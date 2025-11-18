const WP_API_URL = 'https://demo.rentasib.ru/wp-json/wp/v2/posts';
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://staged.rentasib.ru';

type CacheItem = { xml: string; expiresAt: number };
const CACHE_TTL_SEC = 60 * 60;
const IN_MEMORY_CACHE = new Map<number, CacheItem>();

function xmlResponse(xml: string, maxAgeSec = 3600) {
    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': `public, max-age=${maxAgeSec}, stale-while-revalidate=${Math.floor(maxAgeSec / 2)}`,
        },
    });
}

export async function GET(request: Request) {
    let page = 1;
    try {
        const url = new URL(request.url);
        const pathname = url.pathname;
        const m1 = pathname.match(/\/sitemap-news\/(\d+)$/);
        const m2 = pathname.match(/\/sitemap-news-(\d+)(?:\.xml)?$/);
        if (m1) page = Number(m1[1]);
        else if (m2) page = Number(m2[1]);
    } catch (e) {
        page = 1;
    }

    if (!page || page < 1) page = 1;
    const perPage = 100;

    const cached = IN_MEMORY_CACHE.get(page);
    const now = Date.now();
    if (cached && cached.expiresAt > now) {
        return xmlResponse(cached.xml, 3600);
    }

    const revalidateSec = 60 * 60 * 24;
    const wpUrl = `${WP_API_URL}?_embed&per_page=${perPage}&page=${page}`;

    const res = await fetch(wpUrl, { next: { revalidate: revalidateSec } });

    if (!res.ok) {
        if (cached) return xmlResponse(cached.xml, 60);
        return new Response('Ошибка при получении новостей', { status: 500 });
    }

    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) {
        const emptyXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;
        IN_MEMORY_CACHE.set(page, { xml: emptyXml, expiresAt: now + CACHE_TTL_SEC * 1000 });
        return xmlResponse(emptyXml, 3600);
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

    IN_MEMORY_CACHE.set(page, { xml, expiresAt: now + CACHE_TTL_SEC * 1000 });

    return xmlResponse(xml, 3600);
}
