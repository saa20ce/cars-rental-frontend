import type {
    Car,
    SeasonData,
    DeliveryOptionsGrouped,
    DeliveryOption,
    Term,
} from '@/lib/types/Car';
import { fetchTaxonomyOptions } from './fetchCarTaxonomies';
import { wpFetch } from './wpCache';
import { buildFieldsParam } from './wpFields';
import { slimCars } from './fetchCarDataImageHelper';
import {
    ADDITIONAL_OPTION_LABELS,
    DELIVERY_OPTION_LABELS,
} from '@/lib/helpers/formPayloadLabels';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;
const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_BASE_URL;

type WpOptionsAcf = Record<string, unknown>;

const CAR_LIST_FIELDS = [
    'id',
    'date',
    'date_gmt',
    'slug',
    'title',
    'acf.nazvanie_avto',
    'acf.white_gallery',
    'acf.black_gallery',
    'acf.gray_gallery',
    'acf.blue_gallery',
    'acf.red_gallery',
    'acf.skidka',
    'acf.skidka_start',
    'acf.skidka_end',
    'acf.1-3_dnya',
    'acf.4-9_dnej',
    'acf.10-18_dnej',
    'acf.19-29_dnej',
    'acf.30_dnej',
    'acf.1-3_dnya_S',
    'acf.4-9_dnej_S',
    'acf.10-18_dnej_S',
    'acf.19-29_dnej_S',
    'acf.30_dnej_S',
    'acf.passengers',
    'kuzov',
    'marka',
    'klass',
    'privod',
    'dvigatel',
    'color',
    'featured_media',
    '_embedded.wp:featuredmedia',
];

const CAR_LIST_FIELDS_PARAM = buildFieldsParam(CAR_LIST_FIELDS);

type TaxonomyOption = { value: string; label: string };

type CarDisplayTaxonomyMaps = {
    klass: Map<number, string>;
    kuzov: Map<number, string>;
    color: Map<number, string>;
};

let carDisplayTaxonomyMapsPromise: Promise<CarDisplayTaxonomyMaps> | null = null;

const buildTaxonomyMap = (options: TaxonomyOption[]) =>
    new Map(options.map((option) => [Number(option.value), option.label]));

const getFirstTaxonomyName = (
    ids: number[] | undefined,
    optionsById: Map<number, string>,
) => {
    if (!ids?.length) return '';

    for (const id of ids) {
        const name = optionsById.get(Number(id));
        if (name) return name;
    }

    return '';
};

const getEmbeddedTermName = (car: Car, taxonomy: string) => {
    const terms = car._embedded?.['wp:term']?.flat() ?? [];

    return terms.find((term: Term) => term.taxonomy === taxonomy)?.name ?? '';
};

async function getCarDisplayTaxonomyMaps(): Promise<CarDisplayTaxonomyMaps> {
    if (!carDisplayTaxonomyMapsPromise) {
        carDisplayTaxonomyMapsPromise = Promise.all([
            fetchTaxonomyOptions('klass'),
            fetchTaxonomyOptions('kuzov'),
            fetchTaxonomyOptions('color'),
        ]).then(([klass, kuzov, color]) => ({
            klass: buildTaxonomyMap(klass),
            kuzov: buildTaxonomyMap(kuzov),
            color: buildTaxonomyMap(color),
        }));
    }

    return carDisplayTaxonomyMapsPromise;
}

async function enrichCarsDisplayTaxonomies(cars: Car[]): Promise<Car[]> {
    if (cars.length === 0) return cars;

    const maps = await getCarDisplayTaxonomyMaps();

    return cars.map((car) => {
        const carTypeName =
            getFirstTaxonomyName(car.klass, maps.klass) ||
            getFirstTaxonomyName(car.kuzov, maps.kuzov) ||
            getEmbeddedTermName(car, 'klass') ||
            getEmbeddedTermName(car, 'kuzov') ||
            car.carTypeName ||
            '';
        const colorName =
            getFirstTaxonomyName(car.color, maps.color) ||
            getEmbeddedTermName(car, 'color') ||
            car.colorName ||
            '';

        return {
            ...car,
            ...(carTypeName ? { carTypeName } : {}),
            ...(colorName ? { colorName } : {}),
        };
    });
}

async function getWpOptionsAcf(): Promise<WpOptionsAcf | null> {
    const res = await wpFetch(`${WP_BASE_URL}/wp-json/acf/v3/options/options`, {
        next: { tags: ['wordpress-options'] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json?.acf || null;
}

export type SimilarCarsGroup = {
    title: string;
    btnTitle: string;
    href: string;
    taxonomy: 'klass' | 'kuzov';
    id: number;
};

export const SIMILAR_CARS_GROUPS: SimilarCarsGroup[] = [
    {
        title: 'Бизнес',
        btnTitle: 'Все бизнес',
        href: '/service/arenda-avto-biznes-klassa',
        taxonomy: 'klass',
        id: 269,
    },
    {
        title: 'Минивэн',
        btnTitle: 'Все минивэны',
        href: '/service/prokat-minivenov-i-mikroavtobusov',
        taxonomy: 'kuzov',
        id: 243,
    },
    {
        title: 'Кроссоверы',
        btnTitle: 'Все кроссоверы',
        href: '/service/arenda-krossoverov',
        taxonomy: 'kuzov',
        id: 242,
    },
    {
        title: 'Комфорт',
        btnTitle: 'Все комфорт',
        href: '/service/arenda-avto-komfort-klassa',
        taxonomy: 'klass',
        id: 268,
    },
    {
        title: 'Эконом',
        btnTitle: 'Все эконом',
        href: '/service/arenda-avto-ekonom-klassa',
        taxonomy: 'klass',
        id: 267,
    },
];

const hasCarTaxonomy = (
    car: Car,
    taxonomy: SimilarCarsGroup['taxonomy'],
    id: number,
) => (car[taxonomy] ?? []).includes(id);

export function getSimilarCarsGroup(car: Car): SimilarCarsGroup | null {
    return (
        SIMILAR_CARS_GROUPS.find((group) =>
            hasCarTaxonomy(car, group.taxonomy, group.id),
        ) ?? null
    );
}

export async function getCarBySlug(
    slug: string,
    includeTaxonomies: boolean = false,
): Promise<Car | null> {
    const baseFields = [
        'id',
        'date',
        'date_gmt',
        'slug',
        'title',
        'acf.nazvanie_avto',
        'acf.white_gallery',
        'acf.black_gallery',
        'acf.gray_gallery',
        'acf.blue_gallery',
        'acf.red_gallery',
        'acf.skidka',
        'acf.skidka_start',
        'acf.skidka_end',
        'acf.1-3_dnya',
        'acf.4-9_dnej',
        'acf.10-18_dnej',
        'acf.19-29_dnej',
        'acf.30_dnej',
        'acf.1-3_dnya_S',
        'acf.4-9_dnej_S',
        'acf.10-18_dnej_S',
        'acf.19-29_dnej_S',
        'acf.30_dnej_S',
        'kuzov',
        'marka',
        'klass',
        'color',
        'featured_media',
        '_embedded.wp:term',
        '_embedded.wp:featuredmedia',
    ];

    if (includeTaxonomies) {
        baseFields.push(
            '_links.wp:term',
            'acf.engine_volume',
            'acf.fuel_flow',
            'acf.passengers',
            'acf.year',
        );
    }

    const fields = buildFieldsParam(baseFields);

    const url = `${WP_API_URL}/cars?slug=${slug}&_embed=wp:featuredmedia,wp:term&${fields}`;
    const res = await wpFetch(url, { next: { tags: ['wordpress-cars'] } });
    if (!res.ok) return null;

    const data: Car[] = await res.json();
    const [car] = await enrichCarsDisplayTaxonomies(slimCars(data));
    return car ?? null;
}

export async function getSimilarCars(car: Car): Promise<Car[]> {
    const group = getSimilarCarsGroup(car);

    if (group) {
        const res = await wpFetch(
            `${WP_API_URL}/cars?${group.taxonomy}=${group.id}&exclude=${car.id}&per_page=10&_embed=wp:featuredmedia,wp:term`,
            { next: { tags: ['wordpress-cars'] } },
        );

        if (res.ok) {
            const groupedCars = slimCars(await res.json()).filter(
                (c) => c.id !== car.id,
            );

            if (groupedCars.length > 0) {
                return enrichCarsDisplayTaxonomies(groupedCars);
            }
        }
    }

    const markaIds = (car.marka as number[]) || [];
    if (markaIds.length === 0) return [];

    const markaId = markaIds[0];

    const res = await wpFetch(
        `${WP_API_URL}/cars?marka=${markaId}&per_page=5&_embed=wp:featuredmedia,wp:term`,
        { next: { tags: ['wordpress-cars'] } },
    );

    if (!res.ok) return [];

    const similarCars = slimCars(await res.json()).filter(
        (c) => c.id !== car.id,
    );

    if (similarCars.length >= 3) {
        return enrichCarsDisplayTaxonomies(similarCars);
    }

    const fallbackRes = await wpFetch(
        `${WP_API_URL}/cars?per_page=20&_embed=wp:featuredmedia,wp:term`,
        { next: { tags: ['wordpress-cars'] } },
    );
    if (!fallbackRes.ok) return enrichCarsDisplayTaxonomies(similarCars);

    const fallbackCars = slimCars(await fallbackRes.json());

    const targetPrice = car.acf?.['30_dnej']
        ? parseInt(car.acf['30_dnej'], 10)
        : 0;
    const priceRange = 3000;

    const priceMatched = fallbackCars
        .filter(
            (c) =>
                c.id !== car.id &&
                !similarCars.find((sc) => sc.id === c.id) &&
                Math.abs(
                    parseInt(c.acf?.['30_dnej'] ?? '0', 10) - targetPrice,
                ) <= priceRange,
        )
        .sort(
            (a, b) =>
                parseInt(b.acf?.['30_dnej'] ?? '0', 10) -
                parseInt(a.acf?.['30_dnej'] ?? '0', 10),
        )
        .slice(0, 5 - similarCars.length);

    return enrichCarsDisplayTaxonomies([...similarCars, ...priceMatched]);
}

export async function getSeasonDates(): Promise<SeasonData | null> {
    const acf = await getWpOptionsAcf();

    if (!acf) {
        console.error('Error fetching season dates');
        return null;
    }

    return acf as unknown as SeasonData;
}

export async function getDeliveryPrice(): Promise<DeliveryOptionsGrouped> {
    const acf = await getWpOptionsAcf();

    if (!acf) {
        console.error('Error fetching delivery options');
        return { day: [], night: [] };
    }

    const deliveryOrder = new Map(
        Object.keys(DELIVERY_OPTION_LABELS).map((key, index) => [key, index]),
    );

    const mapLabel = (key: string) => DELIVERY_OPTION_LABELS[key] || key;

    const getDeliverySortIndex = (key: string) =>
        deliveryOrder.get(key) ?? Number.MAX_SAFE_INTEGER;

    const buildOptions = (
        source?: Record<string, string>,
        timeLabel = '',
    ): DeliveryOption[] => {
        if (!source || !timeLabel) return [];
        return Object.entries(source)
            .sort(
                ([keyA], [keyB]) =>
                    getDeliverySortIndex(keyA) - getDeliverySortIndex(keyB),
            )
            .map(([key, value]) => ({
                value: key,
                label: `${mapLabel(key)} — ${value} ₽`,
                price: parseInt(value, 10),
            }));
    };

    return {
        day: buildOptions(
            acf['dostavka_avto_den'] as Record<string, string> | undefined,
            'день',
        ),
        night: buildOptions(
            acf['dostavka_avto_noch'] as Record<string, string> | undefined,
            'ночь',
        ),
    };
}

export async function getAdditionalOptions(): Promise<
    { label: string; value: string; price: number }[]
> {
    const acf = await getWpOptionsAcf();

    if (!acf) {
        console.error('Error fetching additional options');
        return [];
    }

    const dopOptions = acf['dopolnitelnye_opczii'] as
        | Record<string, string>
        | undefined;

    if (!dopOptions || typeof dopOptions !== 'object') return [];

    return Object.entries(dopOptions).map(([key, value]) => ({
        value: key,
        label: ADDITIONAL_OPTION_LABELS[key] || key,
        price: parseInt(value as string, 10),
    }));
}

export async function getCars(
    filters: Record<string, string> = {},
): Promise<Car[]> {
    const params = new URLSearchParams(filters);
    params.set('_embed', 'wp:featuredmedia');

    const url = `${WP_API_URL}/cars?${params.toString()}&${CAR_LIST_FIELDS_PARAM}`;
    const res = await wpFetch(url, { next: { tags: ['wordpress-cars'] } });
    if (!res.ok) return [];
    const data: Car[] = await res.json();
    return enrichCarsDisplayTaxonomies(slimCars(data));
}

export async function getCarsByClass(klassId: number): Promise<Car[]> {
    const url = `${WP_API_URL}/cars?klass=${klassId}&_embed=wp:featuredmedia&${CAR_LIST_FIELDS_PARAM}`;
    const res = await wpFetch(url, { next: { tags: ['wordpress-cars'] } });
    if (!res.ok) return [];
    const data: Car[] = await res.json();
    return enrichCarsDisplayTaxonomies(slimCars(data));
}

export async function getCarsByKuzov(kuzovId: number): Promise<Car[]> {
    const url = `${WP_API_URL}/cars?kuzov=${kuzovId}&_embed=wp:featuredmedia&${CAR_LIST_FIELDS_PARAM}`;
    const res = await wpFetch(url, { next: { tags: ['wordpress-cars'] } });
    if (!res.ok) return [];
    const data: Car[] = await res.json();
    return enrichCarsDisplayTaxonomies(slimCars(data));
}

export async function getCrossoverAndMinivanCars(): Promise<Car[]> {
    const kuzovOptions = await fetchTaxonomyOptions('kuzov');
    const crossover = kuzovOptions.find((o) => o.label === 'Кроссовер');
    const minivan = kuzovOptions.find((o) => o.label === 'Минивэн');

    if (!crossover || !minivan) return [];

    const [crossoverCars, minivanCars] = await Promise.all([
        getCarsByKuzov(Number(crossover.value)),
        getCarsByKuzov(Number(minivan.value)),
    ]);

    return [...crossoverCars.slice(0, 3), ...minivanCars.slice(0, 3)];
}
