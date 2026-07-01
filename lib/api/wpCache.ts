type NextFetchInit = RequestInit & {
    next?: {
        revalidate?: number | false;
        tags?: string[];
    };
};

const DEFAULT_WP_REVALIDATE_SECONDS = 60 * 60 * 24;
const DEFAULT_WP_MEDIA_REVALIDATE_SECONDS = 60 * 60 * 24 * 30;

function readPositiveInt(value: string | undefined, fallback: number) {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const WP_REVALIDATE_SECONDS = readPositiveInt(
    process.env.WP_CACHE_REVALIDATE_SECONDS,
    DEFAULT_WP_REVALIDATE_SECONDS,
);

export const WP_MEDIA_REVALIDATE_SECONDS = readPositiveInt(
    process.env.WP_MEDIA_CACHE_REVALIDATE_SECONDS,
    DEFAULT_WP_MEDIA_REVALIDATE_SECONDS,
);

export const WP_STALE_WHILE_REVALIDATE_SECONDS = WP_REVALIDATE_SECONDS * 7;
export const WP_MEDIA_STALE_WHILE_REVALIDATE_SECONDS =
    60 * 60 * 24 * 7;

export function wpFetch(input: string | URL, init: NextFetchInit = {}) {
    const tags = Array.from(
        new Set(['wordpress', ...(init.next?.tags ?? [])]),
    );

    return fetch(input, {
        ...init,
        next: {
            revalidate: WP_REVALIDATE_SECONDS,
            ...init.next,
            tags,
        },
    });
}

export function cacheControlHeader(
    maxAge = WP_REVALIDATE_SECONDS,
    staleWhileRevalidate = WP_STALE_WHILE_REVALIDATE_SECONDS,
) {
    return `public, max-age=${maxAge}, s-maxage=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`;
}
