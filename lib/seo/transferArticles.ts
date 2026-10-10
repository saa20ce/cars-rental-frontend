const TRANSFER_ARTICLE_SLUG = /(?:^|-)transfer[a-z]*(?:-|$)/i;

export function isTransferArticleSlug(slug: string): boolean {
    return TRANSFER_ARTICLE_SLUG.test(slug);
}
