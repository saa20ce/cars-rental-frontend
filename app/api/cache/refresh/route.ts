import { timingSafeEqual } from 'node:crypto';
import { revalidatePath, revalidateTag } from 'next/cache';
import { wpFetch } from '@/lib/api/wpCache';

export const runtime = 'nodejs';

const respond = (data: unknown, status = 200) => Response.json(data, {
    status,
    headers: { 'Cache-Control': 'no-store' },
});

export async function POST(request: Request) {
    const secret = process.env.CACHE_REFRESH_SECRET;
    if (!secret) return respond({ error: 'Cache refresh is not configured' }, 503);
    const supplied = Buffer.from(request.headers.get('authorization') || '');
    const expected = Buffer.from(`Bearer ${secret}`);
    if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
        return respond({ error: 'Unauthorized' }, 401);
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return respond({ error: 'Invalid JSON' }, 400);
    }
    if (!body || typeof body !== 'object') return respond({ error: 'Invalid body' }, 400);

    if (body.action === 'invalidate') {
        revalidateTag('wordpress');
        revalidateTag('django');
        revalidatePath('/', 'layout');
        return respond({ invalidated: true });
    }

    // Run after the invalidation response completes, so Next has committed it.
    if (body.action === 'inventory') {
        const page = body.page ?? 1;
        if (!Number.isSafeInteger(page) || page < 1) return respond({ error: 'Invalid page' }, 400);
        const base = process.env.NEXT_PUBLIC_WP_API_URL;
        if (!base) return respond({ error: 'WordPress is not configured' }, 503);
        try {
            const result = await wpFetch(
                `${base}/cars?per_page=100&page=${page}&orderby=id&order=asc&_fields=id,slug`,
                { fallbackOnError: false, next: { tags: ['wordpress-cars'] } },
            );
            if (!result.ok) throw new Error(`WordPress returned ${result.status}`);
            const cars: { slug: string }[] = await result.json();
            const totalPagesHeader = result.headers.get('x-wp-totalpages');
            const totalPages = Number(totalPagesHeader);
            if (totalPagesHeader === null || !Array.isArray(cars) ||
                !Number.isSafeInteger(totalPages) || totalPages < 0 ||
                (cars.length > 0 && totalPages < page) ||
                cars.some(car => !car || typeof car.slug !== 'string' || !car.slug)) {
                throw new Error('Invalid WordPress inventory response');
            }
            return respond({ slugs: cars.map(car => car.slug), totalPages });
        } catch (error) {
            console.error('[cache refresh]', error);
            return respond({ error: 'Unable to load WordPress inventory' }, 502);
        }
    }
    return respond({ error: 'Unknown action' }, 400);
}
