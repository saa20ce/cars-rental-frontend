import type {
	Car,
	CarACF,
	SeasonData,
	PriceRange,
	BasePriceRangeConfig,
	DeliveryOptionsGrouped,
	DeliveryOption
} from '@/lib/types/Car';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;
const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_BASE_URL;

export async function getCarBySlug(slug: string): Promise<Car | null> {
	const res = await fetch(`${WP_API_URL}/cars?slug=${slug}&_embed=wp:featuredmedia,wp:term`, {
		next: { revalidate: 60 },
	});

	if (!res.ok) {
		console.error('Error fetching car by slug', res);
		return null;
	}

	const data: Car[] = await res.json();
	return data && data.length > 0 ? data[0] : null;
}

export async function getSimilarCars(car: Car): Promise<Car[]> {
	const markaIds = (car.marka as number[]) || [];
	if (markaIds.length === 0) return [];

	const markaId = markaIds[0];
	const res = await fetch(`${WP_API_URL}/cars?marka=${markaId}&per_page=5`, {
		next: { revalidate: 60 },
	});
	if (!res.ok) {
		console.error('Ошибка при загрузке похожих авто', res.status);
		return [];
	}
	const data: Car[] = await res.json();
	return data.filter((c) => c.id !== car.id);
}

export async function getSeasonDates(): Promise<SeasonData | null> {
	const res = await fetch(`${WP_BASE_URL}/wp-json/acf/v3/options/options`, {
		next: { revalidate: 60 },
	});

	if (!res.ok) {
		console.error('Error fetching season dates', res);
		return null;
	}

	const json = await res.json();
	return json?.acf || null;
}

export async function getDeliveryPrice(): Promise<DeliveryOptionsGrouped> {
	const res = await fetch(`${WP_BASE_URL}/wp-json/acf/v3/options/options`, {
		next: { revalidate: 60 },
	});

	if (!res.ok) {
		console.error('Error fetching delivery options', res);
		return { day: [], night: [] };
	}

	const json = await res.json();
	const acf = json?.acf;

	const mapLabel = (key: string) => {
		const dict: Record<string, string> = {
			zhd_vokzal: 'Ж/д вокзал',
			czentralnyj: 'Центральный',
			oktyabrskij: 'Октябрьский',
			zaelczovskij: 'Заельцовский',
			dzerzhinskij: 'Дзержинский',
			zheleznodorozhnyj: 'Железнодорожный',
			kalininskij: 'Калининский',
			leninskij: 'Ленинский',
			kirovskij: 'Кировский',
			pervomajskij: 'Первомайский',
			sovetskij: 'Советский',
			pashino: 'Пашино',
			aeroport: 'Аэропорт',
			kolczovo: 'Кольцово',
			krasnoobsk: 'Краснообск',
			berdsk: 'Бердск',
			samovyvoz: 'Самовывоз',
			zhd: 'Ж/д вокзал',
		};
		return dict[key] || key;
	};

	const buildOptions = (source?: Record<string, string>): DeliveryOption[] => {
		if (!source) return [];

		return Object.entries(source).map(([key, value]) => ({
			value: key,
			label: `${mapLabel(key)} — ${value} ₽`,
			price: parseInt(value, 10),
		}));
	};

	return {
		day: buildOptions(acf['dostavka_avto_den']),
		night: buildOptions(acf['dostavka_avto_noch']),
	};
}

export async function getAdditionalOptions(): Promise<{ label: string; value: string; price: number }[]> {
	const res = await fetch(`${WP_BASE_URL}/wp-json/acf/v3/options/options`, {
		next: { revalidate: 60 },
	});

	if (!res.ok) {
		console.error('Error fetching additional options', res);
		return [];
	}
	const json = await res.json();
	const dopOptions = json?.acf?.['dopolnitelnye_opczii'];

	if (!dopOptions || typeof dopOptions !== 'object') return [];

	const LABELS: Record<string, string> = {
		buster: "Бустер",
		boks_na_kryshu: "Бокс на крышу (+300 ₽)",
		detskoe_kreslo: "Детское кресло",
	};

	return Object.entries(dopOptions)
		.map(([key, value]) => ({
			value: key,
			label: LABELS[key] || key,
			price: parseInt(value as string, 10),
		}));
}

const PRICE_CONFIG: BasePriceRangeConfig[] = [
	{ baseKey: '1-3_dnya', minDays: 1, maxDays: 3, label: '1-3 суток' },
	{ baseKey: '4-9_dnej', minDays: 4, maxDays: 9, label: '4-9 суток' },
	{ baseKey: '10-18_dnej', minDays: 10, maxDays: 18, label: '10-18 суток' },
	{ baseKey: '19-29_dnej', minDays: 19, maxDays: 29, label: '19-29 суток' },
	{ baseKey: '30_dnej', minDays: 30, maxDays: 9999, label: '30+ суток' },
];

export function buildPriceRangesFromACF(acf: CarACF): PriceRange[] {
	return PRICE_CONFIG.map((cfg) => {
		const normalValue = acf[cfg.baseKey];
		const seasonValue = acf[cfg.baseKey + '_S'];

		const normalStr = typeof normalValue === 'string' ? normalValue : '0';
		const seasonStr = typeof seasonValue === 'string' ? seasonValue : '0';

		return {
			...cfg,
			price: parseInt(normalStr, 10) || 0,
			seasonPrice: parseInt(seasonStr, 10) || 0,
		};
	});
}

export async function getCars(filters: Record<string, string> = {}): Promise<Car[]> {
	const params = new URLSearchParams(filters).toString();
	const url = `${WP_API_URL}/cars${params ? `?${params}` : ''}`;
	const res = await fetch(url, { next: { revalidate: 60 } });
	if (!res.ok) return [];
	return res.json();
}
