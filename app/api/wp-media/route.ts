import { isAllowedWpMediaUrl } from '@/lib/api/wpMediaProxy';
import {
    WP_MEDIA_REVALIDATE_SECONDS,
    WP_MEDIA_STALE_WHILE_REVALIDATE_SECONDS,
} from '@/lib/api/wpCache';
import { getSiteUrl } from '@/lib/seo/siteUrl';

export const revalidate = 2592000;

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const sourceUrl = searchParams.get('url');
    const useSocialFallback = searchParams.get('fallback') === 'social';

    if (!sourceUrl || !isAllowedWpMediaUrl(sourceUrl)) {
        return new Response('Invalid media URL', { status: 400 });
    }

    const socialFallback = () =>
        Response.redirect(
            new URL('/images/Banner.png', getSiteUrl(req)),
            307,
        );

    let upstream: Response;

    try {
        upstream = await fetch(sourceUrl, {
            next: {
                revalidate: WP_MEDIA_REVALIDATE_SECONDS,
                tags: ['wordpress-media'],
            },
        });
    } catch (error) {
        console.error('[wp-media] Upstream request failed:', error);
        return useSocialFallback
            ? socialFallback()
            : new Response('Media unavailable', { status: 502 });
    }

    if (!upstream.ok || !upstream.body) {
        if (useSocialFallback) {
            return socialFallback();
        }
        return new Response('Media not found', { status: upstream.status });
    }

    const headers = new Headers({
        'Cache-Control': `public, max-age=86400, s-maxage=${WP_MEDIA_REVALIDATE_SECONDS}, stale-while-revalidate=${WP_MEDIA_STALE_WHILE_REVALIDATE_SECONDS}`,
    });

    const contentType = upstream.headers.get('content-type');
    const contentLength = upstream.headers.get('content-length');
    const etag = upstream.headers.get('etag');
    const lastModified = upstream.headers.get('last-modified');

    if (contentType) headers.set('Content-Type', contentType);
    if (contentLength) headers.set('Content-Length', contentLength);
    if (etag) headers.set('ETag', etag);
    if (lastModified) headers.set('Last-Modified', lastModified);

    return new Response(upstream.body, { headers });
}
