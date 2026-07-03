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

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const WP_CACHE_BUILD_KEY =
    process.env.WP_CACHE_BUILD_KEY ||
    `${process.env.NODE_ENV || 'local'}-${Date.now()}`;

function withWpCacheBuildKey(input: string | URL): string | URL {
    const paramName = '_wp_cache_key';

    try {
        const url = new URL(input.toString());
        url.searchParams.set(paramName, WP_CACHE_BUILD_KEY);

        return input instanceof URL ? url : url.toString();
    } catch {
        const rawInput = input.toString();
        const separator = rawInput.includes('?') ? '&' : '?';

        return `${rawInput}${separator}${paramName}=${encodeURIComponent(
            WP_CACHE_BUILD_KEY,
        )}`;
    }
}

export function wpFetch(input: string | URL, init: NextFetchInit = {}) {
    const requestInput = withWpCacheBuildKey(input);
    const tags = Array.from(
        new Set(['wordpress', ...(init.next?.tags ?? [])]),
    );

    if (IS_DEVELOPMENT) {
        const devInit: NextFetchInit = {
            ...init,
            cache: 'no-store',
        };
        delete devInit.next;

        return fetch(requestInput, devInit);
    }

    return fetch(requestInput, {
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
