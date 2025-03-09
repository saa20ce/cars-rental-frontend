'use client';

import React, { useState } from 'react';
import { ConfigProvider, Carousel, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { PriceCards, RentalCost } from '@/components/common/Cars/';
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	DocumentsIcon,
	CarIcon,
	AgeIcon,
} from '@/lib/ui/icons';
import type { Car, PriceRange, SeasonData } from '@/lib/types/Car';

interface SingleCarPageClientProps {
	car: Car;
	gallery: string[];
	seasonDates: SeasonData | null;
	priceRanges: PriceRange[];
}

const TAB_ITEMS: TabsProps['items'] = [
	{
		key: '1',
		label: 'Характеристики',
		children: (
			<div className='px-3'>
				<div className='text-sm border-b border-[#f6f6f638]'>
					<div className='flex justify-between my-[6px]'>
						<div>Двигатель</div>
						<div className='font-bold'>Бензин</div>
					</div>
				</div>

				<div className='text-sm border-b border-[#f6f6f638]'>
					<div className='flex justify-between my-[6px]'>
						<div>Объем двигателя</div>
						<div className='font-bold'>Бензин</div>
					</div>
				</div>

				<div className='text-sm border-b border-[#f6f6f638]'>
					<div className='flex justify-between my-[6px]'>
						<div>Мощность двигателя</div>
						<div className='font-bold'>Бензин</div>
					</div>
				</div>

				<div className='text-sm border-b border-[#f6f6f638]'>
					<div className='flex justify-between my-[6px]'>
						<div>Расход топлива</div>
						<div className='font-bold'>Бензин</div>
					</div>
				</div>

				<div className='text-sm border-b border-[#f6f6f638]'>
					<div className='flex justify-between my-[6px]'>
						<div>Тип привода</div>
						<div className='font-bold'>Бензин</div>
					</div>
				</div>

				<div className='text-sm border-b border-[#f6f6f638]'>
					<div className='flex justify-between my-[6px]'>
						<div>Количество пассажиров</div>
						<div className='font-bold'>Бензин</div>
					</div>
				</div>

				<div className='text-sm border-b border-[#f6f6f638]'>
					<div className='flex justify-between my-[6px]'>
						<div>Коробка передач</div>
						<div className='font-bold'>Бензин</div>
					</div>
				</div>
			</div>
		),
	},
	{
		key: '2',
		label: 'Комплектация',
		children: 'Content of Tab Pane 2',
	},
	{
		key: '3',
		label: 'F.A.Q',
		children: 'Content of Tab Pane 3',
	},
];

export default function SingleCarPageClient({
	car,
	gallery,
	seasonDates,
	priceRanges,
}: SingleCarPageClientProps) {
	const [seasonModeSwitch, setSeasonModeSwitch] = useState(false);

	return (
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
							Carousel: { arrowSize: 30 },
						},
					}}
				>
					<Carousel
						arrows
						prevArrow={
							<div>
								<ArrowLeftIcon />
							</div>
						}
						nextArrow={
							<div>
								<ArrowRightIcon />
							</div>
						}
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
				<PriceCards
					priceRanges={priceRanges}
					seasonModeSwitch={seasonModeSwitch}
					setSeasonModeSwitch={setSeasonModeSwitch}
				/>
			)}
			<RentalCost
				additionalOptions={[
					{ label: 'Бустер', value: 'buster' },
					{ label: 'Бокс на крышу (+300 р)', value: 'box' },
					{ label: 'Детское кресло', value: 'seat' },
				]}
				seasonDates={seasonDates}
				priceRanges={priceRanges}
				setSeasonModeSwitch={setSeasonModeSwitch}
			/>
			<div className='flex justify-between mt-6 space-y-1 text-[#f6f6f666] border-[#f6f6f638] border-y py-3'>
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

			<div className='mt-6'>
				<ConfigProvider
					theme={{
						token: {
							colorBorder: 'transparent',
							colorText: '#f6f6f6',
							lineWidthFocus: 0,
							lineWidth: 0,
							fontSize: 16,
						},
						components: {
							Tabs: {
								cardBg: '#f6f6f60e',
								itemColor: '#f6f6f666',
								itemSelectedColor: '#f6f6f6',
								inkBarColor: 'transparent',
								itemActiveColor: '#f6f6f6',
								itemHoverColor: '#f6f6f638',
								horizontalItemPadding: '8px 14px',
								horizontalItemGutter: 6,
							},
						},
					}}
				>
					<Tabs defaultActiveKey='1' items={TAB_ITEMS} />
				</ConfigProvider>
			</div>
		</div>
	);
}
