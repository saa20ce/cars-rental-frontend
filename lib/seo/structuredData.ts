import 'server-only';
import { load } from 'cheerio';
import dayjs from 'dayjs';
import { proxyWpMediaUrl } from '@/lib/api/wpMediaProxy';
import {
    getDiscountedPriceForDay,
    isDaySeason,
} from '@/lib/helpers/RentalCheckoutHelper';
import type { Car, SeasonData, Term } from '@/lib/types/Car';
import type { WPPost, WPPostDetails } from '@/lib/types/News';
import { getSiteUrl } from './siteUrl';

type FaqItem = {
    question: string;
    answer: string;
};

const BUSINESS_NAME = 'Рентасиб';
const LEGAL_NAME = 'ООО «РЕНТАСИБ»';
const PHONE = '+79139132808';
const EMAIL = 'rentasib54@gmail.com';
const OFFICE_STREET = 'Красный проспект, 2/1';
const LEGAL_STREET = 'ул. Инская 3, к.18';
const CITY = 'Новосибирск';
const COUNTRY = 'RU';

function cleanText(value: string | undefined | null) {
    if (!value) return '';

    const $ = load(value);

    return $.text().replace(/\s+/g, ' ').trim();
}

function absoluteUrl(value = '/') {
    const siteUrl = getSiteUrl();

    try {
        return new URL(value, `${siteUrl}/`).toString();
    } catch {
        return siteUrl;
    }
}

function organizationId() {
    return `${getSiteUrl()}/#organization`;
}

function websiteId() {
    return `${getSiteUrl()}/#website`;
}

function imageUrl(value: string | undefined | null) {
    if (!value) return '';

    return absoluteUrl(proxyWpMediaUrl(value, { socialFallback: true }));
}

function compact<T extends Record<string, unknown>>(value: T): T {
    return Object.fromEntries(
        Object.entries(value).filter(([, entry]) => {
            if (entry === undefined || entry === null || entry === '') {
                return false;
            }

            return !Array.isArray(entry) || entry.length > 0;
        }),
    ) as T;
}

function getCarImages(car: Car) {
    const galleryImages = [
        ...(car.acf?.white_gallery || []),
        ...(car.acf?.black_gallery || []),
        ...(car.acf?.gray_gallery || []),
        ...(car.acf?.blue_gallery || []),
        ...(car.acf?.red_gallery || []),
    ];
    const images = galleryImages.length > 0 ? galleryImages : [car.imageUrl];

    return Array.from(new Set(images.map(imageUrl).filter(Boolean)));
}

function getEmbeddedTermName(car: Car, taxonomy: string) {
    const terms = car._embedded?.['wp:term']?.flat() ?? [];

    return terms.find((term: Term) => term.taxonomy === taxonomy)?.name ?? '';
}

function numberFromString(value: string | undefined) {
    if (!value) return undefined;

    const normalized = value.replace(',', '.').replace(/[^\d.]/g, '');
    const parsed = Number(normalized);

    return Number.isFinite(parsed) ? parsed : undefined;
}

function getCurrentDailyPrice(car: Car, seasonDates?: SeasonData | null) {
    const regularPrice = Number(car.acf?.['1-3_dnya']) || 0;
    const seasonPrice = Number(car.acf?.['1-3_dnya_S']) || regularPrice;
    const today = dayjs();
    const basePrice = isDaySeason(today, seasonDates ?? null)
        ? seasonPrice
        : regularPrice;

    return getDiscountedPriceForDay(basePrice, today, car.acf);
}

function buildCarOffer(car: Car, url: string, seasonDates?: SeasonData | null) {
    const price = getCurrentDailyPrice(car, seasonDates);

    if (!price) return undefined;

    return {
        '@type': 'Offer',
        url,
        price,
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock',
        businessFunction: 'https://purl.org/goodrelations/v1#LeaseOut',
        seller: {
            '@id': organizationId(),
        },
        priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price,
            priceCurrency: 'RUB',
            unitText: 'сутки',
        },
    };
}

export function buildSiteJsonLd() {
    const siteUrl = getSiteUrl();

    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'AutoRental',
                '@id': organizationId(),
                name: BUSINESS_NAME,
                alternateName: 'RentaSib',
                legalName: LEGAL_NAME,
                url: siteUrl,
                description: 'Аренда автомобилей в Новосибирске',
                telephone: PHONE,
                email: EMAIL,
                taxID: '5405065213',
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: OFFICE_STREET,
                    addressLocality: CITY,
                    addressCountry: COUNTRY,
                },
                legalAddress: {
                    '@type': 'PostalAddress',
                    streetAddress: LEGAL_STREET,
                    addressLocality: CITY,
                    postalCode: '630102',
                    addressCountry: COUNTRY,
                },
                geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 55.014643,
                    longitude: 82.925675,
                },
                areaServed: {
                    '@type': 'City',
                    name: CITY,
                },
                currenciesAccepted: 'RUB',
                paymentAccepted: 'Cash, Credit Card, Bank Transfer',
                priceRange: 'от 1800 ₽/сутки',
                sameAs: [
                    'https://t.me/Rentasib',
                    'https://vk.com/rentasib',
                    'https://dzen.ru/rentasib',
                    'https://max.ru/u/f9LHodD0cOJl7vaA90ej_c-ng7J4Tpfbi4tBmaGo9A-R2NE74nwHaaX0WQk',
                ],
                contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: PHONE,
                    email: EMAIL,
                    contactType: 'customer service',
                    availableLanguage: ['ru'],
                },
            },
            {
                '@type': 'WebSite',
                '@id': websiteId(),
                url: siteUrl,
                name: BUSINESS_NAME,
                inLanguage: 'ru-RU',
                publisher: {
                    '@id': organizationId(),
                },
            },
        ],
    };
}

export function buildBreadcrumbJsonLd(
    crumbs: Array<{ title: string; href?: string }>,
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: cleanText(crumb.title),
            item: absoluteUrl(crumb.href || '/'),
        })),
    };
}

export function buildFaqPageJsonLd(items: FaqItem[], pagePath = '/faq') {
    const url = absoluteUrl(pagePath);

    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        url,
        inLanguage: 'ru-RU',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: cleanText(item.question),
            acceptedAnswer: {
                '@type': 'Answer',
                text: cleanText(item.answer),
            },
        })),
    };
}

export function buildCarJsonLd({
    car,
    seasonDates,
    taxonomyValues = {},
    withContext = true,
}: {
    car: Car;
    seasonDates?: SeasonData | null;
    taxonomyValues?: Record<string, string>;
    withContext?: boolean;
}) {
    const url = absoluteUrl(`/cars/${car.slug}`);
    const name = cleanText(car.acf?.nazvanie_avto || car.title?.rendered);
    const images = getCarImages(car);
    const fuelConsumption = numberFromString(car.acf?.fuel_flow);
    const engineDisplacement = numberFromString(car.acf?.engine_volume);
    const seatingCapacity = numberFromString(car.acf?.passengers);
    const bodyType =
        getEmbeddedTermName(car, 'kuzov') ||
        car.carTypeName ||
        getEmbeddedTermName(car, 'klass');
    const brand = getEmbeddedTermName(car, 'marka');
    const color = getEmbeddedTermName(car, 'color') || car.colorName;

    const data = compact({
        ...(withContext ? { '@context': 'https://schema.org' } : {}),
        '@type': 'Car',
        '@id': `${url}#car`,
        name,
        url,
        image: images,
        brand: brand
            ? {
                  '@type': 'Brand',
                  name: brand,
              }
            : undefined,
        color,
        bodyType,
        vehicleModelDate: car.acf?.year,
        seatingCapacity,
        driveWheelConfiguration: taxonomyValues.privod,
        vehicleTransmission: taxonomyValues.korobka,
        fuelConsumption: fuelConsumption
            ? {
                  '@type': 'QuantitativeValue',
                  value: fuelConsumption,
                  unitText: 'л/100 км',
              }
            : undefined,
        vehicleEngine: engineDisplacement
            ? {
                  '@type': 'EngineSpecification',
                  engineDisplacement: {
                      '@type': 'QuantitativeValue',
                      value: engineDisplacement,
                      unitText: 'л',
                  },
              }
            : undefined,
        offers: buildCarOffer(car, url, seasonDates),
    });

    return data;
}

export function buildCarsItemListJsonLd(
    cars: Car[],
    seasonDates?: SeasonData | null,
) {
    const url = absoluteUrl('/cars');

    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': `${url}#cars`,
        url,
        name: 'Автопарк Рентасиб',
        numberOfItems: cars.length,
        itemListElement: cars.map((car, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: absoluteUrl(`/cars/${car.slug}`),
            item: buildCarJsonLd({
                car,
                seasonDates,
                withContext: false,
            }),
        })),
    };
}

export function buildBlogItemListJsonLd(posts: WPPost[], pagePath = '/blog') {
    const url = absoluteUrl(pagePath);

    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': `${url}#blog`,
        url,
        name: 'Новости Рентасиб',
        numberOfItems: posts.length,
        itemListElement: posts.map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: absoluteUrl(`/${post.slug}`),
            item: {
                '@type': 'BlogPosting',
                '@id': `${absoluteUrl(`/${post.slug}`)}#article`,
                headline: cleanText(post.title?.rendered),
                datePublished: post.date,
                image: imageUrl(
                    post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
                ),
            },
        })),
    };
}

export function buildBlogPostingJsonLd({
    post,
    pagePath,
    image,
}: {
    post: WPPostDetails;
    pagePath: string;
    image?: string;
}) {
    const url = absoluteUrl(pagePath);

    return compact({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        mainEntityOfPage: url,
        headline: cleanText(post.title?.rendered),
        image: image ? [imageUrl(image)] : undefined,
        datePublished: post.date,
        author: {
            '@id': organizationId(),
        },
        publisher: {
            '@id': organizationId(),
        },
        inLanguage: 'ru-RU',
    });
}
