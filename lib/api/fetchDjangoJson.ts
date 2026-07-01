import 'server-only';

type FetchInit = Parameters<typeof fetch>[1];

function getDjangoBaseUrl() {
    return process.env.DJANGO_INTERNAL_API || process.env.NEXT_PUBLIC_API_URL;
}

export async function fetchDjangoJson<T>(
    path: string,
    fallback: T,
    init?: FetchInit,
): Promise<T> {
    const baseUrl = getDjangoBaseUrl();

    if (!baseUrl) {
        console.error(`[fetchDjangoJson] DJANGO_INTERNAL_API is not configured for ${path}`);
        return fallback;
    }

    try {
        const url = new URL(path, `${baseUrl.replace(/\/$/, '')}/`);
        const res = await fetch(url.toString(), init);

        if (!res.ok) {
            console.error(
                `[fetchDjangoJson] ${url.toString()} returned ${res.status}`,
            );
            return fallback;
        }

        return (await res.json()) as T;
    } catch (error) {
        console.error(`[fetchDjangoJson] Failed to fetch ${path}`, error);
        return fallback;
    }
}
