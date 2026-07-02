import 'server-only';
import type { Metadata } from 'next';
import { load } from 'cheerio';
import { wpFetch } from './wpCache';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_BASE_URL;

type RankMathHeadResponse = {
    head?: string;
};

type SupportedOpenGraphType =
    | 'article'
    | 'book'
    | 'music.song'
    | 'music.album'
    | 'music.playlist'
    | 'music.radio_station'
    | 'profile'
    | 'website'
    | 'video.tv_show'
    | 'video.other'
    | 'video.movie'
    | 'video.episode';

type ParsedOpenGraph = {
    type?: SupportedOpenGraphType;
    title?: string;
    description?: string;
    siteName?: string;
    locale?: string;
    url?: string;
    images?: string[];
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
};

type ParsedTwitter = {
    card?: 'summary' | 'summary_large_image';
    title?: string;
    description?: string;
    site?: string;
    creator?: string;
    images?: string[];
};

const OPEN_GRAPH_TYPES = new Set<SupportedOpenGraphType>([
    'article',
    'book',
    'music.song',
    'music.album',
    'music.playlist',
    'music.radio_station',
    'profile',
    'website',
    'video.tv_show',
    'video.other',
    'video.movie',
    'video.episode',
]);

function cleanMetaValue(value: string | null | undefined) {
    const trimmed = value?.trim();
    return trimmed || undefined;
}

function parseRankMathHead(head: string, pagePath: string): Metadata {
    const $ = load(head);
    const metadata: Metadata = {};

    const readName = (name: string) =>
        cleanMetaValue($(`meta[name="${name}"]`).first().attr('content'));
    const readProperty = (property: string) =>
        cleanMetaValue(
            $(`meta[property="${property}"]`).first().attr('content'),
        );
    const readProperties = (property: string) =>
        $(`meta[property="${property}"]`)
            .map((_, el) => cleanMetaValue($(el).attr('content')))
            .get()
            .filter(Boolean);

    const title = cleanMetaValue($('title').first().text());
    const description = readName('description');
    const robots = readName('robots');

    if (title) metadata.title = title;
    if (description) metadata.description = description;
    if (robots) metadata.robots = robots;

    const openGraph: ParsedOpenGraph = {};
    const ogType = readProperty('og:type');
    const ogImages = [
        ...readProperties('og:image'),
        ...readProperties('og:image:secure_url'),
    ];
    const articleTags = readProperties('article:tag');

    if (ogType && OPEN_GRAPH_TYPES.has(ogType as SupportedOpenGraphType)) {
        openGraph.type = ogType as SupportedOpenGraphType;
    }

    openGraph.title = readProperty('og:title');
    openGraph.description = readProperty('og:description');
    openGraph.siteName = readProperty('og:site_name');
    openGraph.locale = readProperty('og:locale');
    if (ogImages.length > 0) openGraph.images = Array.from(new Set(ogImages));
    if (Object.keys(openGraph).length > 0) openGraph.url = pagePath;

    if (openGraph.type === 'article') {
        openGraph.publishedTime = readProperty('article:published_time');
        openGraph.modifiedTime = readProperty('article:modified_time');
        openGraph.section = readProperty('article:section');
        if (articleTags.length > 0) openGraph.tags = articleTags;
    }

    if (Object.values(openGraph).some(Boolean)) {
        metadata.openGraph = openGraph;
    }

    const twitter: ParsedTwitter = {};
    const twitterCard = readName('twitter:card');
    const twitterImages = readProperties('twitter:image');

    if (twitterCard === 'summary' || twitterCard === 'summary_large_image') {
        twitter.card = twitterCard;
    }

    twitter.title = readName('twitter:title');
    twitter.description = readName('twitter:description');
    twitter.site = readName('twitter:site');
    twitter.creator = readName('twitter:creator');
    if (twitterImages.length > 0) {
        twitter.images = Array.from(new Set(twitterImages));
    }

    if (Object.values(twitter).some(Boolean)) {
        metadata.twitter = twitter;
    }

    return metadata;
}

export async function fetchWPMetadata(pagePath: string): Promise<Metadata> {
    try {
        const pageUrl = `${WP_API_URL}${pagePath}`;
        const res = await wpFetch(
            `${WP_API_URL}/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(pageUrl)}`,
            { next: { tags: ['wordpress-metadata'] } },
        );

        if (!res.ok) return {};

        const { head } = (await res.json()) as RankMathHeadResponse;

        if (head) {
            return parseRankMathHead(head, pagePath);
        }
    } catch (err) {
        console.error('[fetchWPMetadata]', err);
    }
    return {};
}
