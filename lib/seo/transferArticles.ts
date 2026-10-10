import articleRedirects from './articleRedirects.json';

const TRANSFER_ARTICLE_SLUG = /(?:^|-)transfer[a-z]*(?:-|$)/i;
const UNSUPPORTED_SERVICE_ARTICLES = new Set([
    'preimushhestva-arendy-avtomobilej-s-voditelem',
]);
const MERGED_ARTICLE_SLUGS = new Set(articleRedirects.map(({ source }) => source));

export function isTransferArticleSlug(slug: string): boolean {
    return TRANSFER_ARTICLE_SLUG.test(slug);
}

export function shouldNoindexNewsArticle(slug: string): boolean {
    return (
        isTransferArticleSlug(slug) ||
        UNSUPPORTED_SERVICE_ARTICLES.has(slug) ||
        MERGED_ARTICLE_SLUGS.has(slug)
    );
}
