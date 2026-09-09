type NextFetchInit = RequestInit & {
    next?: {
        revalidate?: number | false;
        tags?: string[];
    };
    fallbackOnError?: boolean;
};

const DEFAULT_WP_REVALIDATE_SECONDS = 60 * 60 * 24;
const DEFAULT_WP_MEDIA_REVALIDATE_SECONDS = 60 * 60 * 24 * 30;

function readPositiveInt(value: string | undefined, fallback: number) {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? Math.max(86400, parsed) : fallback;
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
export const WP_MEDIA_STALE_WHILE_REVALIDATE_SECONDS = 60 * 60 * 24 * 7;

const WP_CACHE_DISABLED = process.env.WP_CACHE_DISABLED === 'true';
const WP_CACHE_BUILD_KEY =
    process.env.WP_CACHE_BUILD_KEY ||
    'wordpress-v1';
const WP_FETCH_RETRY_ATTEMPTS = 2;
const WP_FETCH_RETRY_DELAY_MS = 500;

function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function wpFallbackResponse(input: string | URL, err: unknown) {
    console.error('[wpFetch] WordPress request failed:', input.toString(), err);

    return new Response('[]', {
        status: 503,
        headers: {
            'Content-Type': 'application/json',
            'X-WP-Fetch-Fallback': '1',
        },
    });
}

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

export async function wpFetch(input: string | URL, init: NextFetchInit = {}) {
    const { fallbackOnError = true, ...requestInit } = init;
    const requestInput = withWpCacheBuildKey(input);
    const tags = Array.from(
        new Set(['wordpress', ...(requestInit.next?.tags ?? [])]),
    );

    const skipCache = WP_CACHE_DISABLED ||
        !['GET', 'HEAD'].includes((requestInit.method || 'GET').toUpperCase()) ||
        requestInit.cache === 'no-store' || requestInit.cache === 'no-cache' ||
        requestInit.next?.revalidate === 0;

    const fetchInit: NextFetchInit = skipCache
        ? {
              ...requestInit,
              cache: 'no-store',
          }
        : {
              ...requestInit,
              next: {
                  ...requestInit.next,
                  revalidate: requestInit.next?.revalidate === false
                      ? false
                      : Math.max(86400, requestInit.next?.revalidate ?? WP_REVALIDATE_SECONDS),
                  tags,
              },
          };

    if (skipCache) {
        delete fetchInit.next;
    }

    for (let attempt = 0; attempt <= WP_FETCH_RETRY_ATTEMPTS; attempt += 1) {
        try {
            return await fetch(requestInput, fetchInit);
        } catch (err) {
            if (attempt === WP_FETCH_RETRY_ATTEMPTS) {
                if (!fallbackOnError) {
                    throw err;
                }

                return wpFallbackResponse(requestInput, err);
            }

            await wait(WP_FETCH_RETRY_DELAY_MS * (attempt + 1));
        }
    }

    const unexpectedRetryExit = new Error('Unexpected retry exit');

    if (!fallbackOnError) {
        throw unexpectedRetryExit;
    }

    return wpFallbackResponse(requestInput, unexpectedRetryExit);
}
export function cacheControlHeader(
    maxAge = WP_REVALIDATE_SECONDS,
    staleWhileRevalidate = WP_STALE_WHILE_REVALIDATE_SECONDS,
) {
    return `public, max-age=${maxAge}, s-maxage=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`;
}
