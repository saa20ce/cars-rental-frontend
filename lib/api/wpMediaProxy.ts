const FALLBACK_WP_MEDIA_HOSTS = ['staged.rentasib.ru', 'new.rentasib.ru'];

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

export function isAllowedWpMediaUrl(value: string) {
    try {
        const url = new URL(value);
        return (
            url.protocol === 'https:' &&
            getAllowedMediaHosts().has(url.hostname) &&
            url.pathname.startsWith('/wp-content/uploads/')
        );
    } catch {
        return false;
    }
}

type ProxyWpMediaOptions = {
    socialFallback?: boolean;
};

export function proxyWpMediaUrl(
    value: string | undefined | null,
    options: ProxyWpMediaOptions = {},
) {
    if (!value || !isAllowedWpMediaUrl(value)) return value ?? '';
    const fallback = options.socialFallback ? '&fallback=social' : '';
    return `/wp-media?url=${encodeURIComponent(value)}${fallback}`;
}
