import { cacheControlHeader, WP_REVALIDATE_SECONDS } from '@/lib/api/wpCache';
import { getIndexableNewsPosts } from '@/lib/seo/newsSitemap';
import { getSiteUrl } from '@/lib/seo/siteUrl';

export const dynamic = 'force-static';
export const revalidate = 86400;

const POSTS_PER_SITEMAP = 100;

export async function generateStaticParams() {
    const posts = await getIndexableNewsPosts();
    const pageCount = Math.ceil(posts.length / POSTS_PER_SITEMAP);

    return Array.from({ length: pageCount }, (_, index) => ({
        page: String(index + 1),
    }));
}

function xmlResponse(xml: string, maxAgeSec = WP_REVALIDATE_SECONDS) {
    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': cacheControlHeader(maxAgeSec),
        },
    });
}

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ page: string }> },
) {
    const baseUrl = getSiteUrl();
    const page = Number((await params).page);
    if (!Number.isInteger(page) || page < 1) {
        return new Response('Not Found', { status: 404 });
    }

    let allPosts;
    try {
        allPosts = await getIndexableNewsPosts();
    } catch (error) {
        console.error('[news sitemap page]', error);
        // Keep the previously generated XML if WordPress is unavailable.
        throw error;
    }

    const posts = allPosts.slice(
        (page - 1) * POSTS_PER_SITEMAP,
        page * POSTS_PER_SITEMAP,
    );
    if (posts.length === 0) {
        return new Response('Not Found', { status: 404 });
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
