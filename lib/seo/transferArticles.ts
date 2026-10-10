const TRANSFER_ARTICLE_SLUG = /(?:^|-)transfer[a-z]*(?:-|$)/i;
const UNSUPPORTED_SERVICE_ARTICLES = new Set([
    'preimushhestva-arendy-avtomobilej-s-voditelem',
]);

export function isTransferArticleSlug(slug: string): boolean {
    return TRANSFER_ARTICLE_SLUG.test(slug);
}

export function shouldNoindexNewsArticle(slug: string): boolean {
    return isTransferArticleSlug(slug) || UNSUPPORTED_SERVICE_ARTICLES.has(slug);
}
