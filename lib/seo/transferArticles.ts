import articleRedirects from './articleRedirects.json';

const TRANSFER_ARTICLE_SLUG = /(?:^|-)transfer[a-z]*(?:-|$)/i;
// These posts were unpublished because the service described by the whole
// article is not offered. Guard their routes until all caches have expired.
const UNPUBLISHED_UNSUPPORTED_SERVICE_ARTICLES = new Set([
    'kak-arenda-avtomobilej-pomogaet-turisticheskim-agentstvam',
    'preimushhestva-arendy-avtomobilej-s-voditelem',
    'kak-arenda-avto-uluchshaet-servis',
]);
// These posts promote third-party transport services or cargo vehicles that we
// do not offer. Both they and passenger-transfer posts are unpublished in
// WordPress. Keep this guard so stale caches cannot serve the old content.
const UNSUPPORTED_COMMERCIAL_USE_ARTICLES = new Set([
    'sovety-po-vyboru-avtomobilya-dlya-razlichnyh-tipov-biznesa',
    'kak-arendovannye-avtomobili-pomogayut-v-organizaczii-dostavki',
    'kak-arendovannye-avtomobili-pomogayut-v-uluchshenii-logistiki',
    'luchshie-praktiki-logistiki-s-arendovannymi-avtomobilyami',
    'kak-arendovannye-avtomobili-mogut-uluchshit-logistiku-vashej-kompanii',
    'top-avtomobilej-dlya-dostavki-i-logistiki',
    'kak-vybrat-podhodyashhij-avtomobil-dlya-dostavki',
    'kak-vybrat-mashinu-dlya-dostavki-tovarov',
    'top-avtomobilej-dlya-dostavki-i-logistiki-2',
    'arenda-avtomobilej-v-logistike-i-dostavke',
    'preimushhestva-arendy-avtomobilej-dlya-dostavki-tovarov',
    'luchshie-avtomobili-dlya-dostavki',
    'preimushhestva-arendy-avtomobilej-dlya-dostavki-tovarov-2',
    'kak-arenda-avtomobilej-pomogaet-uluchshit-logistiku-kompanii-2',
    'vybor-avto-dlya-dostavki',
    'kak-arenda-avtomobilej-pomogaet-v-logistike-i-dostavke-2',
    'arenda-avtomobilej-dlya-logistiki-biznesa',
    'kak-vybrat-podhodyashhij-avtomobil-dlya-dostavki-2',
    'kak-arenda-avtomobilej-pomogaet-uluchshit-logistiku-kompanii',
    'kak-arenda-avtomobilej-pomogaet-v-logistike-i-dostavke',
    'kak-vybrat-avtomobil-dlya-transportirovki-speczificheskih-tovarov',
    'kak-arenda-legkovyh-avtomobilej-pomogaet-v-sfere-obshhestvennogo-pitaniya',
    'arenda-legkovyh-avtomobilej-dlya-transportnyh-i-logisticheskih-kompanij',
]);
const MERGED_ARTICLE_SLUGS = new Set(articleRedirects.map(({ source }) => source));

export function isTransferArticleSlug(slug: string): boolean {
    return TRANSFER_ARTICLE_SLUG.test(slug);
}

export function shouldHideNewsArticle(slug: string): boolean {
    return (
        isTransferArticleSlug(slug) ||
        UNPUBLISHED_UNSUPPORTED_SERVICE_ARTICLES.has(slug) ||
        UNSUPPORTED_COMMERCIAL_USE_ARTICLES.has(slug)
    );
}

export function shouldNoindexNewsArticle(slug: string): boolean {
    return (
        shouldHideNewsArticle(slug) ||
        MERGED_ARTICLE_SLUGS.has(slug)
    );
}
