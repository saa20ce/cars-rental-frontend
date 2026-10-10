import { cacheControlHeader, WP_REVALIDATE_SECONDS } from '@/lib/api/wpCache';
import { getIndexableNewsPosts } from '@/lib/seo/newsSitemap';
import { getSiteUrl } from '@/lib/seo/siteUrl';

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

    let allPosts;
    try {
        allPosts = await getIndexableNewsPosts();
    } catch (error) {
        console.error('[news sitemap page]', error);
        return new Response('Ошибка при получении новостей', {
            status: 503,
            headers: { 'Cache-Control': 'no-store' },
        });
    }

    const posts = allPosts.slice((page - 1) * perPage, page * perPage);
    if (posts.length === 0) {
        const emptyXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;
        return xmlResponse(emptyXml);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${posts
    .map(
        (post) => `
  <url>
    <loc>${baseUrl.replace(/\/$/, '')}/${post.slug}</loc>
    <lastmod>${new Date(post.modified || post.date).toISOString()}</lastmod>
  </url>`,
    )
    .join('')}
</urlset>`;

    return xmlResponse(xml);
}
