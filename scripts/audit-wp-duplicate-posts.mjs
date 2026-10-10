import { load } from 'cheerio';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

// Compare published WordPress posts by title and normalized article text.
const apiUrl = process.env.NEXT_PUBLIC_WP_API_URL?.replace(/\/$/, '');
if (!apiUrl) throw new Error('NEXT_PUBLIC_WP_API_URL is required');
const redirectSources = new Set(
    JSON.parse(
        readFileSync(
            new URL('../lib/seo/articleRedirects.json', import.meta.url),
            'utf8',
        ),
    ).map(({ source }) => source),
);

async function fetchPage(page) {
    const params = new URLSearchParams({
        per_page: '100',
        page: String(page),
        _fields: 'id,slug,title,content,modified',
    });
    const response = await fetch(`${apiUrl}/posts?${params}`, {
        signal: AbortSignal.timeout(30000),
    });
    if (!response.ok)
        throw new Error(`WordPress posts page ${page}: ${response.status}`);
    return {
        posts: await response.json(),
        totalPages: Number(response.headers.get('x-wp-totalpages')),
    };
}

const first = await fetchPage(1);
if (!Number.isInteger(first.totalPages) || first.totalPages < 1) {
    throw new Error('WordPress did not return a valid page count');
}
const rest = await Promise.all(
    Array.from({ length: first.totalPages - 1 }, (_, index) =>
        fetchPage(index + 2),
    ),
);
const rawPosts = [first, ...rest].flatMap(({ posts }) => posts);

const incomingArg = process.argv.find((arg) => arg.startsWith('--incoming='));
if (incomingArg) {
    const targets = new Set(
        incomingArg.slice('--incoming='.length).split(',').filter(Boolean),
    );
    const incoming = Object.fromEntries([...targets].map((slug) => [slug, []]));
    for (const post of rawPosts) {
        const $ = load(post.content?.rendered ?? '');
        $('a[href]').each((_, element) => {
            try {
                const url = new URL(
                    $(element).attr('href'),
                    'https://rentasib.ru',
                );
                const slug = url.pathname.replace(/^\/+|\/+$/g, '');
                if (
                    targets.has(slug) &&
                    [
                        'rentasib.ru',
                        'www.rentasib.ru',
                        'staged.rentasib.ru',
                    ].includes(url.hostname)
                ) {
                    incoming[slug].push(post.slug);
                }
            } catch {
                // Ignore malformed links while auditing other articles.
            }
        });
    }
    console.log(JSON.stringify({ incoming }, null, 2));
    process.exit(0);
}

function words(value) {
    return value.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
}

function shingles(value, length = 4) {
    const tokens = words(value);
    const result = new Set();
    for (let i = 0; i <= tokens.length - length; i++) {
        result.add(tokens.slice(i, i + length).join(' '));
    }
    return result;
}

function similarity(a, b) {
    if (!a.size || !b.size) return 0;
    let common = 0;
    for (const item of a) if (b.has(item)) common++;
    return common / (a.size + b.size - common);
}

const posts = rawPosts.map((post) => {
    const title = load(post.title?.rendered ?? '')
        .text()
        .trim();
    const html = post.content?.rendered ?? '';
    const text = load(html).text().replace(/\s+/g, ' ').trim();
    const contentKey = createHash('sha256')
        .update(words(text).join(' '))
        .digest('hex');
    return {
        id: post.id,
        slug: post.slug,
        title,
        titleKey: words(title).join(' '),
        modified: post.modified,
        words: words(text).length,
        shingles: shingles(text),
        contentKey,
        stagedLinks: (html.match(/https?:\/\/staged\.rentasib\.ru\//gi) ?? [])
            .length,
        passengerServiceMentions: (
            text.match(/трансфер|с водител|услуг[аиу] водителя/gi) ?? []
        ).length,
    };
});

const byTitle = new Map();
const byContent = new Map();
for (const post of posts) {
    if (!byTitle.has(post.titleKey)) byTitle.set(post.titleKey, []);
    byTitle.get(post.titleKey).push(post);
    if (!byContent.has(post.contentKey)) byContent.set(post.contentKey, []);
    byContent.get(post.contentKey).push(post);
}
const exactContentGroups = [...byContent.values()]
    .filter((group) => group.length > 1)
    .map((group) =>
        group.map(({ id, slug, title }) => ({
            id,
            slug,
            title,
            alreadyRedirected: redirectSources.has(slug),
        })),
    );

const groups = [...byTitle.values()]
    .filter((group) => group.length > 1)
    .map((group) => {
        const pairs = [];
        for (let i = 0; i < group.length; i++) {
            for (let j = i + 1; j < group.length; j++) {
                pairs.push({
                    slugs: [group[i].slug, group[j].slug],
                    similarity: Number(
                        similarity(
                            group[i].shingles,
                            group[j].shingles,
                        ).toFixed(3),
                    ),
                });
            }
        }
        return {
            title: group[0].title,
            pages: group.map(
                ({
                    id,
                    slug,
                    modified,
                    words,
                    stagedLinks,
                    passengerServiceMentions,
                }) => ({
                    id,
                    slug,
                    modified,
                    words,
                    stagedLinks,
                    passengerServiceMentions,
                }),
            ),
            pairs: pairs.sort((a, b) => b.similarity - a.similarity),
        };
    })
    .sort((a, b) => b.pairs[0].similarity - a.pairs[0].similarity);

const topArg = process.argv.find((arg) => arg.startsWith('--top='));
const top = topArg ? Number(topArg.slice('--top='.length)) : groups.length;
if (!Number.isInteger(top) || top < 1)
    throw new Error('--top must be a positive integer');

console.log(
    JSON.stringify(
        {
            totalPosts: posts.length,
            duplicateTitleGroups: groups.length,
            exactContentGroups,
            unresolvedExactContentGroups: exactContentGroups.filter(
                (group) =>
                    group.filter(({ alreadyRedirected }) => !alreadyRedirected)
                        .length > 1,
            ).length,
            groups: groups.slice(0, top),
        },
        null,
        2,
    ),
);
