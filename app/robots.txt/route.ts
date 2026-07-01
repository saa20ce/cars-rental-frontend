import { cacheControlHeader } from '@/lib/api/wpCache';
import { getSiteUrl } from '@/lib/seo/siteUrl';

export function GET(request: Request) {
    const baseUrl = getSiteUrl(request);

    const body = [
        'User-agent: *',
        'Disallow: /wp-admin/',
        'Disallow: /wp-login.php',
        '',
        `Sitemap: ${baseUrl}/sitemap-index.xml`,
        '',
    ].join('\n');

    return new Response(body, {
        headers: {
            'Content-Type': 'text/plain; charset=UTF-8',
            'Cache-Control': cacheControlHeader(),
        },
    });
}
