import { load } from 'cheerio';

const apiUrl = process.env.NEXT_PUBLIC_WP_API_URL?.replace(/\/$/, '');

if (!apiUrl) {
    console.error('NEXT_PUBLIC_WP_API_URL is required');
    process.exit(1);
}

const perPage = 100;
const fields = 'id,slug,title,content,link';
const posts = [];

for (let page = 1; ; page += 1) {
    const url = `${apiUrl}/posts?per_page=${perPage}&page=${page}&_fields=${fields}`;
    const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });

    if (!response.ok) {
        throw new Error(`WordPress API returned ${response.status} on page ${page}`);
    }

    const batch = await response.json();
    if (!Array.isArray(batch)) throw new Error('Unexpected WordPress response');

    posts.push(...batch);
    const totalPages = Number(response.headers.get('X-WP-TotalPages'));
    if ((Number.isFinite(totalPages) && page >= totalPages) || batch.length < perPage) break;
}

const origin = 'https://rentasib.ru';
const internalHosts = new Set(['rentasib.ru', 'www.rentasib.ru', 'staged.rentasib.ru']);
const passengerServiceTerms = /с водител|наш(?:и)? водител|перевозк\S* пассажир|довез\S*|встрет\S* (?:вас|гостей|пассажир)/i;

function contextAround(text, pattern) {
    const match = pattern.exec(text);
    if (!match) return '';

    return text.slice(Math.max(0, match.index - 90), match.index + 130);
}

const results = posts.map((post) => {
    const html = post.content?.rendered ?? '';
    const $ = load(html);
    const text = $.text().replace(/\s+/g, ' ').trim();
    const links = [];

    $('a[href]').each((_, element) => {
        const href = $(element).attr('href');
        if (!href) return;

        try {
            const url = new URL(href, `${origin}/${post.slug}`);
            if (!internalHosts.has(url.hostname)) return;
            links.push({
                host: url.hostname,
                path: url.pathname.replace(/\/$/, '') || '/',
            });
        } catch {
            // Ignore malformed links while auditing the rest of the article.
        }
    });

    return {
        id: post.id,
        slug: post.slug,
        title: load(post.title?.rendered ?? '').text().trim(),
        transferSlug: /transf|transfer/i.test(post.slug),
        transferText: /трансфер/i.test(text),
        transferContext: contextAround(text, /трансфер/i),
        passengerServiceText: passengerServiceTerms.test(text),
        driverText: /водител/i.test(text),
        stagedLinks: links.filter((link) => link.host === 'staged.rentasib.ru'),
        driverServiceLinks: links.filter((link) => /s-voditelem(?:\/|$)/.test(link.path)),
        links,
    };
});

const transferPosts = results.filter(
    (post) => post.transferSlug || post.transferText || /с водителем/i.test(post.title),
);
const linkedPaths = new Map();

for (const post of transferPosts) {
    for (const link of post.links) {
        linkedPaths.set(link.path, (linkedPaths.get(link.path) ?? 0) + 1);
    }
}

console.log(JSON.stringify({
    totalPosts: results.length,
    transferPosts: transferPosts.length,
    transferSlugs: results.filter((post) => post.transferSlug).length,
    transferSlugsOutsideWordBoundary: results
        .filter((post) => post.transferSlug && !/(?:^|-)transfer[a-z]*(?:-|$)/i.test(post.slug))
        .map((post) => post.slug),
    transferPostsMentioningDriver: transferPosts.filter((post) => post.driverText).length,
    transferPostsWithPassengerServiceText: transferPosts.filter((post) => post.passengerServiceText).length,
    transferPostsLinkingToDriverService: transferPosts.filter((post) => post.driverServiceLinks.length).length,
    transferPostsLinkingToStaged: transferPosts.filter((post) => post.stagedLinks.length).length,
    driverServiceLinkPosts: transferPosts
        .filter((post) => post.driverServiceLinks.length)
        .map((post) => ({
            id: post.id,
            slug: post.slug,
            paths: [...new Set(post.driverServiceLinks.map((link) => link.path))],
        })),
    transferTextWithoutTransferSlug: transferPosts
        .filter((post) => !post.transferSlug)
        .slice(0, 20)
        .map((post) => ({
            id: post.id,
            slug: post.slug,
            title: post.title,
            context: post.transferContext,
        })),
    mostLinkedInternalPaths: [...linkedPaths.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .map(([path, count]) => ({ path, count })),
    examples: transferPosts.slice(0, 12).map((post) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        driverText: post.driverText,
        passengerServiceText: post.passengerServiceText,
    })),
}, null, 2));
