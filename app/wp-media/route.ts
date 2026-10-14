import { isAllowedWpMediaUrl, proxyWpMediaUrl } from '@/lib/api/wpMediaProxy';
import { getSiteUrl } from '@/lib/seo/siteUrl';

export { revalidate } from '../api/wp-media/route';

// Older pages used this query URL for images. Keep one public URL per file.
export function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const sourceUrl = searchParams.get('url');

    if (!sourceUrl || !isAllowedWpMediaUrl(sourceUrl)) {
        return new Response('Invalid media URL', { status: 400 });
    }

    const publicUrl = proxyWpMediaUrl(sourceUrl, {
        socialFallback: searchParams.get('fallback') === 'social',
    });
    const publicPath = new URL(publicUrl, getSiteUrl(request)).pathname;

    return Response.redirect(new URL(publicPath, getSiteUrl(request)), 301);
}
