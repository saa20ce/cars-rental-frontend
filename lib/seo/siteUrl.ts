const DEFAULT_SITE_URL = 'https://rentasib.ru';

function normalizeOrigin(value: string) {
    const url = new URL(value);
    url.pathname = '';
    url.search = '';
    url.hash = '';
    return url.toString().replace(/\/$/, '');
}

function getRequestOrigin(request?: Request) {
    if (!request) return null;

    const requestUrl = new URL(request.url);
    const forwardedHost = request.headers.get('x-forwarded-host');
    const hostHeader = request.headers.get('host');
    const host = (forwardedHost || hostHeader || requestUrl.host)
        .split(',')[0]
        .trim();

    if (!host) return null;

    const forwardedProto = request.headers.get('x-forwarded-proto');
    const protocol =
        forwardedProto?.split(',')[0].trim() ||
        requestUrl.protocol.replace(':', '') ||
        'https';

    try {
        return normalizeOrigin(`${protocol}://${host}`);
    } catch {
        return normalizeOrigin(request.url);
    }
}

function isLocalOrigin(origin: string) {
    const hostname = new URL(origin).hostname;
    return (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname === '0.0.0.0'
    );
}

export function getSiteUrl(request?: Request) {
    const configuredUrl =
        process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;

    if (configuredUrl) {
        try {
            return normalizeOrigin(configuredUrl);
        } catch {
            return DEFAULT_SITE_URL;
        }
    }

    const requestOrigin = getRequestOrigin(request);

    if (requestOrigin && !isLocalOrigin(requestOrigin)) {
        return requestOrigin;
    }

    return requestOrigin || DEFAULT_SITE_URL;
}
