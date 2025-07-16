export type Car = {
	id: number;
	date: string;
	date_gmt: string;
	guid: RenderedField;
	modified: string;
	modified_gmt: string;

	slug: string;
	status: string;
	type: string;
	link: string;

	title: RenderedField;

	content: {
		rendered: string;
		protected: boolean;
	};

	featured_media: number;
	template: string;

	privod?: number[];
	dvigatel?: number[];
	korobka?: number[];
	moschnost?: number[];
	color?: number[];
	kuzov?: number[];
	marka?: number[];
	['metka-avto']?: number[];
	klass?: number[];

	acf?: CarACF;
	_links?: CarLinks;

	_embedded?: {
		'wp:featuredmedia': Array<{
			media_details: {
				sizes: {
					thumbnail: { source_url: string };
					/* …может быть large, medium и т.д. */
				};
			};
		}>;
		'wp:term': Term[][];
	};
	
};

export interface CarACF {
	nazvanie_avto?: string;
	white_gallery?: string[];
	black_gallery?: string[];
	engine_volume?: string;
	fuel_flow?: string;
	passengers?: string;
	kolichestvo_pechek?: string;
	year?: string;

	'1-3_dnya'?: string;
	'4-9_dnej'?: string;
	'10-18_dnej'?: string;
	'19-29_dnej'?: string;
	'30_dnej'?: string;
	'1-3_dnya_S'?: string;
	'4-9_dnej_S'?: string;
	'10-18_dnej_S'?: string;
	'19-29_dnej_S'?: string;
	'30_dnej_S'?: string;

	probeg?: string;
	pereprobeg?: string;
	czena_ot?: string;
	zalog?: string;
	season_factor?: string;
	skidka?: string;
	mojka_avto?: string;
	skidka_start?: string;
	skidka_end?: string;

	dopolnitelnye_opcii?: AdditionalOptions;

	[key: string]: string | string[] | AdditionalOptions | undefined;
}

export interface RenderedField {
	rendered: string;
}

export interface CarLinks {
	self?: Array<{ href: string }>;
	collection?: Array<{ href: string }>;
	about?: Array<{ href: string }>;
	'wp:featuredmedia'?: Array<{
		embeddable: boolean;
		href: string;
	}>;
	'wp:attachment'?: Array<{ href: string }>;
	'wp:term'?: Array<{
		taxonomy: string;
		embeddable: boolean;
		href: string;
	}>;
	curies?: Array<{
		name: string;
		href: string;
		templated: boolean;
	}>;
}

export interface SeasonData {
	'season-summer-start': string;
	'season-summer-end': string;
	'season-winter-start': string;
	'season-winter-end': string;
}

// export interface DeliveryPrice {
// 	'delivery_price_day_aeroport': string,
// 	'delivery_price_day_berdsk': string,
// 	'delivery_price_day_sovetskiy': string,
// 	'delivery_price_day_vokzal': string,

// 	'delivery_price_night_aeroport': string,
// 	'delivery_price_night_berdsk': string,
// 	'delivery_price_night_sovetskiy': string,
// 	'delivery_price_night_vokzal': string,

// 	'dopolnitelnye_opczii': AdditionalOptions;
// }

export interface AdditionalOptions {
	buster: string;
	boks_na_kryshu: string;
	detskoe_kreslo: string;
}

export interface PriceRange {
	baseKey: string;
	minDays: number;
	maxDays: number;
	label: string;
	price: number;
	seasonPrice: number;
}

export type BasePriceRangeConfig = Omit<PriceRange, 'price' | 'seasonPrice'>;

export interface Term {
	id: number;
	name: string;
	taxonomy: string;
}

export type DeliveryOption = {
  value: string;
  label: string;
  price: number;
};

export type DeliveryPrice = {
  day: DeliveryOption[];
  night: DeliveryOption[];
};

export type DeliveryOptionsGrouped = {
  day: DeliveryOption[];
  night: DeliveryOption[];
};