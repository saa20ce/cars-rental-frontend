import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { cacheControlHeader } from '@/lib/api/wpCache';

export const revalidate = 86400;

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path') || '/';

    try {
        const items = await fetchBreadcrumbs(path);
        return Response.json(items, {
            headers: {
                'Cache-Control': cacheControlHeader(),
            },
        });
    } catch (err) {
        console.error('[api/breadcrumbs] fallback:', err);
        return Response.json([], {
            status: 200,
            headers: {
                'Cache-Control': cacheControlHeader(60, 300),
            },
        });
    }
}