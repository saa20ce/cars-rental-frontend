import { load } from 'cheerio';

/** Remove the old, unrelated all-cars widget embedded in one WordPress article. */
export function removeLegacyCarCatalogue(html: string): string {
    const $ = load(html, null, false);

    $('.filter-blog').each((_, element) => {
        const filter = $(element);
        if (!filter.find('.ajax_cat_list li[cat_id="all"]').length) return;

        const catalogue = filter.next('.post_list');
        if (!catalogue.find('.postik-list a[href*="/cars/"]').length) return;

        catalogue.remove();
        filter.remove();
    });

    return $.html();
}
