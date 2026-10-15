import type { Metadata } from 'next';
import { load } from 'cheerio';
import type { Car } from '@/lib/types/Car';

const YEAR_PATTERN = /\b(?:19|20)\d{2}\b/g;
const FIXED_PRICE_PATTERN = /\d[\d\s.,]*\s*(?:₽|руб)/iu;

function plainText(value: string) {
    return load(`<span>${value}</span>`).text().replace(/\s+/g, ' ').trim();
}

export function withCurrentCarMetadata(
    wordpressMetadata: Metadata,
    car: Car | null,
): Metadata {
    if (!car) return wordpressMetadata;

    const name = plainText(car.acf?.nazvanie_avto || car.title?.rendered || '');
    if (!name) return wordpressMetadata;

    const wordpressTitle =
        typeof wordpressMetadata.title === 'string'
            ? wordpressMetadata.title
            : '';
    const wordpressDescription = wordpressMetadata.description || '';
    const titleYears = wordpressTitle.match(YEAR_PATTERN) || [];
    const nameYears = new Set(name.match(YEAR_PATTERN) || []);
    const titleHasWrongYear =
        titleYears.length > 0 &&
        nameYears.size > 0 &&
        titleYears.some((year) => !nameYears.has(year));
    const descriptionHasFixedPrice = FIXED_PRICE_PATTERN.test(
        wordpressDescription,
    );

    const replaceTitle = !wordpressTitle || titleHasWrongYear;
    const replaceDescription =
        !wordpressDescription || descriptionHasFixedPrice;

    if (!replaceTitle && !replaceDescription) return wordpressMetadata;

    const title = `Аренда ${name} без водителя в Новосибирске | Рентасиб`;
    const description = `Аренда ${name} без водителя в Новосибирске. Посмотрите фотографии, характеристики и тарифы по срокам. Наличие автомобиля и итоговую стоимость уточните на даты поездки.`;

    return {
        ...wordpressMetadata,
        ...(replaceTitle ? { title } : {}),
        ...(replaceDescription ? { description } : {}),
        openGraph: {
            ...wordpressMetadata.openGraph,
            ...(replaceTitle ? { title } : {}),
            ...(replaceDescription ? { description } : {}),
        },
        twitter: {
            ...wordpressMetadata.twitter,
            ...(replaceTitle ? { title } : {}),
            ...(replaceDescription ? { description } : {}),
        },
    };
}
