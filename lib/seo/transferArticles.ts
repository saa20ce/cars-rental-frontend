import articleRedirects from './articleRedirects.json';

const TRANSFER_ARTICLE_SLUG = /(?:^|-)transfer[a-z]*(?:-|$)/i;
const UNSUPPORTED_SERVICE_ARTICLES = new Set([
    'preimushhestva-arendy-avtomobilej-s-voditelem',
]);
// These posts recommend renting our cars for third-party transport services or
// cargo vehicles, which we do not offer. Keep their URLs accessible while
// excluding them from search until the content is corrected.
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
]);
const MERGED_ARTICLE_SLUGS = new Set(articleRedirects.map(({ source }) => source));

export function isTransferArticleSlug(slug: string): boolean {
    return TRANSFER_ARTICLE_SLUG.test(slug);
}

export function shouldNoindexNewsArticle(slug: string): boolean {
    return (
        isTransferArticleSlug(slug) ||
        UNSUPPORTED_SERVICE_ARTICLES.has(slug) ||
        UNSUPPORTED_COMMERCIAL_USE_ARTICLES.has(slug) ||
        MERGED_ARTICLE_SLUGS.has(slug)
    );
}
