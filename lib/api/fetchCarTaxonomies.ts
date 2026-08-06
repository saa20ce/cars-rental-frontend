import { Car } from '@/lib/types/Car';
import { CarTaxonomyConfig } from '@/lib/types/Taxonomies';
import { wpFetch } from './wpCache';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;

export interface WpTerm {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: string;
    parent: number;
    meta: [];
    acf: [];
    _links: Record<string, Array<{ href: string }>>;
}

interface LinkItem {
    taxonomy: string;
    href: string;
}

type TaxonomyFetchOptions = {
    strict?: boolean;
};

export async function fetchTermName(url: string): Promise<string | null> {
    try {
        const res = await wpFetch(url, { next: { tags: ['wordpress-taxonomies'] } });
        if (!res.ok) {
            console.error('Ошибка при запросе таксономии:', url, res.status);
            return null;
        }
        const data: WpTerm[] = await res.json();
        if (Array.isArray(data) && data.length > 0) {
            return data[0].name;
        }
        return null;
    } catch (err) {
        console.error('Ошибка fetchTermName:', err);
        return null;
    }
}

export async function getCarTaxonomyNames(
    car: Car,
    configs: CarTaxonomyConfig[],
): Promise<Record<string, string>> {
    const result: Record<string, string> = {};

    const wpTerms = car._links?.['wp:term'] || [];

    for (const cfg of configs) {
        const termLink = wpTerms.find(
            (linkItem: LinkItem) => linkItem.taxonomy === cfg.taxonomy,
        );
        if (termLink && termLink.href) {
            const name = await fetchTermName(termLink.href);
            if (name) {
                result[cfg.fieldKey] = name;
            } else {
                result[cfg.fieldKey] = '';
            }
        } else {
            result[cfg.fieldKey] = '';
        }
    }

    return result;
}

export async function fetchTaxonomyOptions(
    taxonomy: string,
    options: TaxonomyFetchOptions = {},
): Promise<Array<{ value: string; label: string }>> {
    try {
        const res = await wpFetch(`${WP_API_URL}/${taxonomy}?per_page=100`, {
            next: { tags: ['wordpress-taxonomies'] },
            fallbackOnError: !options.strict,
        });
        if (!res.ok) {
            if (options.strict) {
                throw new Error(
                    `[WordPress taxonomy] ${taxonomy} request failed with status ${res.status}`,
                );
            }

            console.error(
                `Ошибка при получении таксономии ${taxonomy}:`,
                res.status,
            );
            return [];
        }
        const data: WpTerm[] = await res.json();

        if (options.strict && (!Array.isArray(data) || data.length === 0)) {
            throw new Error(
                `[WordPress taxonomy] ${taxonomy} response is empty or invalid`,
            );
        }

        return data.map((term) => ({
            value: term.id.toString(),
            label: term.name,
        }));
    } catch (err) {
        if (options.strict) throw err;

        console.error('Ошибка fetchTaxonomyOptions:', err);
        return [];
    }
}

export async function getAllTaxonomyOptions() {
    const [klass, marka, kuzov, privod, dvigatel, color] = await Promise.all([
        fetchTaxonomyOptions('klass', { strict: true }),
        fetchTaxonomyOptions('marka', { strict: true }),
        fetchTaxonomyOptions('kuzov', { strict: true }),
        fetchTaxonomyOptions('privod', { strict: true }),
        fetchTaxonomyOptions('dvigatel', { strict: true }),
        fetchTaxonomyOptions('color', { strict: true }),
    ]);
    return {
        klassOptions: klass,
        markaOptions: marka,
        kuzovOptions: kuzov,
        privodOptions: privod,
        dvigatelOptions: dvigatel,
        colorOptions: color,
    };
}
