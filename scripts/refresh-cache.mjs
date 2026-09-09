// Run inside the frontend container; secrets stay in its environment.
const base = new URL(process.argv[2] || 'http://127.0.0.1:3000');
const secret = process.env.CACHE_REFRESH_SECRET;
if (!secret) throw new Error('Set CACHE_REFRESH_SECRET on the frontend server first');

async function control(body) {
    const response = await fetch(new URL('/api/cache/refresh', base), {
        method: 'POST',
        headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        redirect: 'error',
        signal: AbortSignal.timeout(180000),
    });
    if (!response.ok) throw new Error(`Cache API: HTTP ${response.status}`);
    return response.json();
}

await control({ action: 'invalidate' });
console.log('Cache invalidated. Loading car inventory...');
const slugs = new Set();
for (let page = 1, totalPages = 1; page <= totalPages; page++) {
    const result = await control({ action: 'inventory', page });
    if (!Array.isArray(result.slugs) || !Number.isSafeInteger(result.totalPages)) {
        throw new Error('Invalid inventory response');
    }
    totalPages = result.totalPages;
    for (const slug of result.slugs) slugs.add(slug);
}

const paths = ['/', '/cars', ...[...slugs].map(slug => `/cars/${encodeURIComponent(slug)}`)];
const failures = [];
// Two pages at a time to avoid a request spike on WordPress.
for (let start = 0; start < paths.length; start += 2) {
    await Promise.all(paths.slice(start, start + 2).map(async path => {
        try {
            const response = await fetch(new URL(path, base), {
                redirect: 'error',
                signal: AbortSignal.timeout(180000),
            });
            // Consume the streamed page so server rendering finishes before proceeding.
            await response.arrayBuffer();
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            console.log(`Updated ${path}`);
        } catch (error) {
            failures.push(path);
            console.error(`Failed ${path}: ${error.message}`);
        }
    }));
}
console.log(`Cars: ${slugs.size}. Pages updated: ${paths.length - failures.length}/${paths.length}.`);
if (failures.length) process.exitCode = 1;
