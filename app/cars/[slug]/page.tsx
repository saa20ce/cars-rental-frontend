import { notFound } from 'next/navigation';
import { ConfigProvider, Carousel } from 'antd';
import { RentalCost } from '@/components/common/Cars/[slug]/RentalCost';
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	DocumentsIcon,
	CarIcon,
	AgeIcon,
} from '@/shared/icons';
import { PriceCards } from '@/components/common/Cars/';

type Car = {
	id: number;
	slug: string;
	title: {
		rendered: string;
	};
	acf?: {
		nazvanie_avto?: string;
		white_gallery?: string[];
		black_gallery?: string[];
		[key: string]: string | string[] | undefined;
	};
};

export interface SeasonData {
	'season-summer-start': string;
	'season-summer-end': string;
	'season-winter-start': string;
	'season-winter-end': string;
}

async function getCarBySlug(slug: string): Promise<Car | null> {
	const res = await fetch(
		`https://demo.rentasib.ru/wp-json/wp/v2/cars?slug=${slug}`,
		{
			next: { revalidate: 60 },
		},
	);

	if (!res.ok) {
		return null;
	}

	const data: Car[] = await res.json();
	return data && data.length > 0 ? data[0] : null;
}

async function getSeasonDates(): Promise<SeasonData | null> {
	const res = await fetch(
		'https://demo.rentasib.ru/wp-json/acf/v3/options/options',
		{
			next: { revalidate: 60 },
		},
	);

	if (!res.ok) {
		return null;
	}

	const json = await res.json();
	return json?.acf || null;
}

interface SingleCarPageProps {
	params: { slug: string };
}

const PRICE_CONFIG = [
	{ baseKey: '1-3_dnya', minDays: 1, maxDays: 3, label: '1-3 суток' },
	{ baseKey: '4-9_dnej', minDays: 4, maxDays: 9, label: '4-9 суток' },
	{ baseKey: '10-18_dnej', minDays: 10, maxDays: 18, label: '10-18 суток' },
	{ baseKey: '19-29_dnej', minDays: 19, maxDays: 29, label: '19-29 суток' },
	{ baseKey: '30_dnej', minDays: 30, maxDays: 9999, label: '30+ суток' },
];

const ADDITIONAL_OPTIONS = [
	{ label: 'Бустер', value: 'buster' },
	{ label: 'Бокс на крышу (+300 р)', value: 'box' },
	{ label: 'Детское кресло', value: 'seat' },
];

function buildPriceRangesFromACF(acf: Record<string, any>): {
	baseKey: string;
	minDays: number;
	maxDays: number;
	label: string;
	price: number;
	seasonPrice: number;
}[] {
	return PRICE_CONFIG.map((cfg) => {
		const baseKey = cfg.baseKey;
		const normalKey = baseKey;
		const seasonKey = baseKey + '_S';

		const normalValue = acf[normalKey] ?? '0';
		const seasonValue = acf[seasonKey] ?? '0';

		return {
			...cfg,
			price: parseInt(normalValue, 10) || 0,
			seasonPrice: parseInt(seasonValue, 10) || 0,
		};
	});
}

export const dynamic = 'force-dynamic';

export default async function SingleCarPage(props: SingleCarPageProps) {
	const { slug } = await props.params;
	const car = await getCarBySlug(slug);
	console.log('car', car);

	if (!car) {
		return notFound();
	}

	const gallery =
		car.acf?.white_gallery && car.acf.white_gallery.length > 0
			? car.acf.white_gallery
			: car.acf?.black_gallery || [];

	const seasonDates = await getSeasonDates();

	const priceRanges = buildPriceRangesFromACF(car.acf || {});

	return (
		<>
			<div>
				{car.acf?.nazvanie_avto && (
					<div className='text-2xl uppercase font-bold mb-[12px] ml-3'>
						{car.acf.nazvanie_avto}
					</div>
				)}

				{gallery.length > 0 && (
					<ConfigProvider
						theme={{
							components: {
								Carousel: {
									arrowSize: 30,
								},
							},
						}}
					>
						<Carousel
							arrows
							prevArrow={<ArrowLeftIcon />}
							nextArrow={<ArrowRightIcon />}
							dots={false}
						>
							{gallery.map((imgUrl) => (
								<div key={imgUrl}>
									<img
										src={imgUrl}
										alt={imgUrl}
										className='w-full h-[225px] rounded-2xl object-cover'
									/>
								</div>
							))}
						</Carousel>
					</ConfigProvider>
				)}

				{priceRanges.length > 0 && (
					<PriceCards priceRanges={priceRanges} />
				)}

				<RentalCost
					additionalOptions={ADDITIONAL_OPTIONS}
					seasonDates={seasonDates}
					priceRanges={priceRanges}
				/>

				<div className='flex justify-between mt-4 space-y-1 text-[#f6f6f666] border-[#f6f6f638] border-y py-3'>
					<div className='flex flex-wrap justify-between w-[116px] h-[32px]'>
						<DocumentsIcon />
						<div className='mt-[-2px]'>
							<div className='text-sm font-bold'>Документы</div>
							<div className='text-xs'>Паспорт и ВУ</div>
						</div>
					</div>

					<div className='flex flex-wrap justify-between w-[97px] mt-[0!important]'>
						<CarIcon />
						<div className='h-[32px] w-[59px] mt-[-2px]'>
							<div className='text-sm font-bold'>Стаж</div>
							<div className='text-xs'>От 2-х лет</div>
						</div>
					</div>

					<div className='flex flex-wrap justify-between w-[104px] mt-[0!important]'>
						<AgeIcon />
						<div className='h-[32px] w-[66px] mt-[-2px]'>
							<div className='text-sm font-bold'>Возраст</div>
							<div className='text-xs'>От 22-х лет</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
