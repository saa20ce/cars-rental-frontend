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
                href,
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
        transferMentions: (text.match(/трансфер/gi) ?? []).length,
        passengerServiceText: passengerServiceTerms.test(text),
        passengerServiceContext: contextAround(text, passengerServiceTerms),
        driverText: /водител/i.test(text),
        stagedLinks: links.filter((link) => link.host === 'staged.rentasib.ru'),
        driverServiceLinks: links.filter((link) => /s-voditelem(?:\/|$)/.test(link.path)),
        links,
    };
});

if (process.argv.includes('--links-only')) {
    const stagedLinkPosts = results
        .filter((post) => !post.transferSlug && post.stagedLinks.length)
        .map((post) => ({
            id: post.id,
            slug: post.slug,
            links: [...new Set(post.stagedLinks.map((link) => link.href))],
        }));
    const offset = Number(process.argv.find((arg) => arg.startsWith('--offset='))?.split('=')[1] ?? 0);
    console.log(JSON.stringify({
        totalPosts: results.length,
        totalStagedLinkPosts: stagedLinkPosts.length,
        offset,
        stagedLinkPosts: stagedLinkPosts.slice(offset, offset + 20),
    }));
    process.exit(0);
}

if (process.argv.includes('--links-summary')) {
    const paths = new Map();
    for (const post of results.filter((item) => !item.transferSlug)) {
        for (const link of post.stagedLinks) {
            const entry = paths.get(link.path) ?? { path: link.path, count: 0, postIds: [] };
            entry.count += 1;
            if (!entry.postIds.includes(post.id)) entry.postIds.push(post.id);
            paths.set(link.path, entry);
        }
    }
    console.log(JSON.stringify({
        totalPosts: results.length,
        stagedLinkPosts: results.filter((post) => !post.transferSlug && post.stagedLinks.length).length,
        paths: [...paths.values()].sort((a, b) => b.count - a.count),
    }));
    process.exit(0);
}

if (process.argv.includes('--check-links')) {
    const paths = [...new Set(results
        .filter((post) => !post.transferSlug)
        .flatMap((post) => post.stagedLinks.map((link) => link.path)))];
    const checks = [];

    for (let offset = 0; offset < paths.length; offset += 4) {
        const batch = await Promise.all(paths.slice(offset, offset + 4).map(async (path) => {
            try {
                const response = await fetch(`${origin}${path}`, {
                    method: 'HEAD',
                    redirect: 'manual',
                    signal: AbortSignal.timeout(15_000),
                });
                return { path, status: response.status, location: response.headers.get('location') };
            } catch (error) {
                return { path, error: String(error) };
            }
        }));
        checks.push(...batch);
    }

    console.log(JSON.stringify({ paths: checks.length, checks }));
    process.exit(0);
}

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
    ...(process.argv.includes('--review')
        ? {
              reviewCandidates: transferPosts
                  .filter((post) => !post.transferSlug)
                  .map((post) => ({
                      id: post.id,
                      slug: post.slug,
                      title: post.title,
                      transferMentions: post.transferMentions,
                      transferContext: post.transferContext,
                      passengerServiceContext: post.passengerServiceContext,
                  })),
          }
        : {}),
}, null, 2));
