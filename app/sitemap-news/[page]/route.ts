import { cacheControlHeader, WP_REVALIDATE_SECONDS, wpFetch } from '@/lib/api/wpCache';
import { getSiteUrl } from '@/lib/seo/siteUrl';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;

type CacheItem = { xml: string; expiresAt: number };
const CACHE_TTL_SEC = WP_REVALIDATE_SECONDS;
const IN_MEMORY_CACHE = new Map<number, CacheItem>();

function xmlResponse(xml: string, maxAgeSec = WP_REVALIDATE_SECONDS) {
    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': cacheControlHeader(maxAgeSec),
        },
    });
}

export async function GET(request: Request) {
    const baseUrl = getSiteUrl(request);
    let page = 1;
    try {
        const url = new URL(request.url);
        const pathname = url.pathname;
        const m1 = pathname.match(/\/sitemap-news\/(\d+)$/);
        const m2 = pathname.match(/\/sitemap-news-(\d+)(?:\.xml)?$/);
        if (m1) page = Number(m1[1]);
        else if (m2) page = Number(m2[1]);
    } catch {
        page = 1;
    }

    if (!page || page < 1) page = 1;
    const perPage = 100;

    const cached = IN_MEMORY_CACHE.get(page);
    const now = Date.now();
    if (cached && cached.expiresAt > now) {
        return xmlResponse(cached.xml);
    }

    const wpUrl = `${WP_API_URL}/posts?per_page=${perPage}&page=${page}&_fields=slug,date`;

    const res = await wpFetch(wpUrl, { next: { tags: ['wordpress-news'] } });

    if (!res.ok) {
        if (cached) return xmlResponse(cached.xml, 60);
        return new Response('Ошибка при получении новостей', { status: 500 });
    }

    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) {
        const emptyXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;
        IN_MEMORY_CACHE.set(page, {
            xml: emptyXml,
            expiresAt: now + CACHE_TTL_SEC * 1000,
        });
        return xmlResponse(emptyXml);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${posts
    .map(
        (post: { slug: string; date: string }) => `
  <url>
    <loc>${baseUrl.replace(/\/$/, '')}/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
  </url>`,
    )
    .join('')}
</urlset>`;

    IN_MEMORY_CACHE.set(page, {
        xml,
        expiresAt: now + CACHE_TTL_SEC * 1000,
    });

    return xmlResponse(xml);
}
