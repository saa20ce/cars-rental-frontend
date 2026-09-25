import { getSiteUrl } from '@/lib/seo/siteUrl';

const FALLBACK_WP_MEDIA_HOSTS = ['staged.rentasib.ru', 'new.rentasib.ru'];
const BROKEN_SOCIAL_IMAGE_PATH =
    '/wp-content/uploads/2024/04/img_0530-1-1.jpg';

function getAllowedMediaHosts() {
    const hosts = new Set(FALLBACK_WP_MEDIA_HOSTS);
    const wpBaseUrl = process.env.NEXT_PUBLIC_WP_BASE_URL;

    if (wpBaseUrl) {
        try {
            hosts.add(new URL(wpBaseUrl).hostname);
        } catch {}
    }

    return hosts;
}

function isKnownWpHostUrl(value: string) {
    try {
        const url = new URL(value);
        return (
            url.protocol === 'https:' &&
            getAllowedMediaHosts().has(url.hostname)
        );
    } catch {
        return false;
    }
}

export function isAllowedWpMediaUrl(value: string) {
    return (
        isKnownWpHostUrl(value) &&
        new URL(value).pathname.startsWith('/wp-content/uploads/')
    );
}

type ProxyWpMediaOptions = {
    socialFallback?: boolean;
};

export function proxyWpMediaUrl(
    value: string | undefined | null,
    options: ProxyWpMediaOptions = {},
) {
    if (!value) return '';
    if (!isAllowedWpMediaUrl(value)) {
        return options.socialFallback && isKnownWpHostUrl(value)
            ? '/images/Banner.png'
            : value;
    }
    const sourceUrl = new URL(value);
    if (
        options.socialFallback &&
        sourceUrl.pathname === BROKEN_SOCIAL_IMAGE_PATH
    ) {
        return '/images/Banner.png';
    }

    return `${getSiteUrl()}${sourceUrl.pathname}`;
}

export function publicWpMediaUrls<T>(value: T): T {
    if (typeof value === 'string') {
        return (value.includes('/wp-content/uploads/')
            ? proxyWpMediaUrl(value)
            : value) as T;
    }

    if (Array.isArray(value)) {
        return value.map(publicWpMediaUrls) as T;
    }

    if (value && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([key, entry]) => [
                key,
                publicWpMediaUrls(entry),
            ]),
        ) as T;
    }

    return value;
}
