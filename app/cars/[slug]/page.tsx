import { notFound } from 'next/navigation';
import { ConfigProvider, Carousel, Switch, DatePicker, TimePicker } from 'antd';
import locale from 'antd/locale/ru_RU';
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	LineIcon,
	InfoIcon,
	CalendarIcon,
	ChevronDownIcon,
} from '@/shared/icons';

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
		[key: string]: any;
	};
};

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

interface SingleCarPageProps {
	params: { slug: string };
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

	const dayRanges = [
		{ key: '1-3_dnya', label: '1-3 суток' },
		{ key: '4-9_dnej', label: '4-9 суток' },
		{ key: '10-18_dnej', label: '10-18 суток' },
		{ key: '14-28_dnej', label: '19-29 суток' },
		{ key: '28_dnej', label: '30+ суток' },
	];

	return (
		<div>
			{/* <h1 className='text-2xl font-bold mb-4'>
				{car.title.rendered || 'Без заголовка'}
			</h1> */}

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

			<div className='flex items-center gap-2 mt-4'>
				<ConfigProvider
					theme={{
						components: {
							Switch: {
								trackPadding: 4,
								trackMinWidth: 52,
								trackHeight: 26,
							},
						},
					}}
				>
					<Switch /> Сезон <LineIcon /> <InfoIcon />
				</ConfigProvider>
			</div>

			{/* <div className='relative overflow-hidden h-[88px]'> */}
			<div className=' flex overflow-auto whitespace-nowrap gap-[6px] mt-4 mr-[-16px]'>
				{dayRanges.map(({ key, label }) => (
					<div
						key={key}
						className='flex flex-col min-w-[118px] bg-[#f6f6f60e] rounded-lg px-3 py-2 justify-between mb-2'
					>
						<div className='text-[#f6f6f666]'>{label}</div>
						<div className='font-bold'>
							{car.acf?.[key] ?? '—'} ₽/сут.
						</div>
					</div>
				))}
			</div>
			{/* </div> */}

			<div className='w-full bg-[#284b63] rounded-2xl p-[18px] mt-4'>
				<div className='mb-3'>Период аренды:</div>
				<ConfigProvider
					locale={locale}
					theme={{
						components: {
							DatePicker: {},
						},
					}}
				>
					<DatePicker
						placeholder='Дата аренды'
						suffixIcon={<CalendarIcon />}
						style={{
							width: '60%',
							backgroundColor: '#f6f6f638',
							border: '1px solid #f6f6f647',
							borderTopLeftRadius: 10,
							borderTopRightRadius: 0,
							borderBottomLeftRadius: 10,
							borderBottomRightRadius: 0,
						}}
					/>

					<TimePicker
						placeholder='18:00'
						suffixIcon={<ChevronDownIcon />}
						style={{
							width: '40%',
							backgroundColor: '#f6f6f638',
							border: '1px solid #f6f6f647',
							marginBottom: 8,
							borderLeft: 0,
							borderTopLeftRadius: 0,
							borderTopRightRadius: 10,
							borderBottomLeftRadius: 0,
							borderBottomRightRadius: 10,
						}}
					/>

					<DatePicker
						placeholder='Дата возврата'
						suffixIcon={<CalendarIcon />}
						style={{
							width: '60%',
							backgroundColor: '#f6f6f638',
							border: '1px solid #f6f6f647',
							borderTopLeftRadius: 10,
							borderTopRightRadius: 0,
							borderBottomLeftRadius: 10,
							borderBottomRightRadius: 0,
						}}
					/>

					<TimePicker
						placeholder='18:00'
						suffixIcon={<ChevronDownIcon />}
						style={{
							width: '40%',
							backgroundColor: '#f6f6f638',
							border: '1px solid #f6f6f647',
							marginBottom: 8,
							borderLeft: 0,
							borderTopLeftRadius: 0,
							borderTopRightRadius: 10,
							borderBottomLeftRadius: 0,
							borderBottomRightRadius: 10,
						}}
					/>
				</ConfigProvider>

				<div className='mb-3'>
					Дополнительные услуги <ChevronDownIcon fillOpacity={1} />
				</div>
			</div>

			<div className='mt-4 space-y-1'>
				<p>Год выпуска: {car.acf?.year ?? '—'}</p>
				<p>Объём двигателя: {car.acf?.engine_volume ?? '—'}</p>
				<p>Расход топлива: {car.acf?.fuel_flow ?? '—'}</p>
				<p>Пассажиров: {car.acf?.passengers ?? '—'}</p>
				<p>Цена от: {car.acf?.czena_ot ?? '—'}</p>
			</div>
		</div>
	);
}
