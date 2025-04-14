import { Car } from '@/lib/types/Car';
import { CarTaxonomyConfig } from '@/lib/types/Taxonomies';

const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_API_URL;

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

export async function fetchTermName(url: string): Promise<string | null> {
	try {
		const res = await fetch(url);
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
	taxonomy: string
): Promise<Array<{ value: string; label: string }>> {
	try {
		const res = await fetch(`${WP_BASE_URL}/${taxonomy}`);
		if (!res.ok) {
			console.error(`Ошибка при получении таксономии ${taxonomy}:`, res.status);
			return [];
		}
		const data: WpTerm[] = await res.json();
		return data.map(term => ({
			value: term.id.toString(), // используем ID таксономии, а не slug
			label: term.name,
		}));
	} catch (err) {
		console.error('Ошибка fetchTaxonomyOptions:', err);
		return [];
	}
}
