'use client';

import React, { useState, useMemo } from 'react';
import { ConfigProvider, Carousel, Tabs, Divider } from 'antd';
import type { TabsProps } from 'antd';
import {
	PriceCards,
	RentalCheckout,
	CarCharacteristics,
	SimilarCars,
	RentSteps,
	DeliveryPriceTable,
} from '@/components/common/Cars/';

import {
	ArrowLeftIcon,
	ArrowRightIcon,
	DocumentsIcon,
	CarIcon,
	AgeIcon,
} from '@/lib/ui/icons';
import type { Car, PriceRange, SeasonData, DeliveryPrice } from '@/lib/types/Car';
import { WhyUs } from '@/components/common/Cards/WhyUs';
import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';
import { Footer } from '@/components/layout/Footer';

interface SingleCarPageClientProps {
	car: Car;
	seasonDates: SeasonData | null;
	priceRanges: PriceRange[];
	deliveryPrice: DeliveryPrice | null;
	taxonomyValues: Record<string, string>;
	similarCars: Car[];
}

export default function SingleCarPageClient({
	car,
	seasonDates,
	priceRanges,
	deliveryPrice,
	taxonomyValues,
	similarCars,
}: SingleCarPageClientProps) {
	const [seasonModeSwitch, setSeasonModeSwitch] = useState(false);

	const galleryImages = useMemo(() => [
		...(car.acf?.white_gallery || []),
		...(car.acf?.black_gallery || []),
		...(car.acf?.gray_gallery || []),
		...(car.acf?.blue_gallery || []),
		...(car.acf?.red_gallery || []),
	], [car.acf]);

	const TAB_ITEMS: TabsProps['items'] = [
		{
			key: '1',
			label: 'Характеристики',
			children: <CarCharacteristics car={car} taxonomyValues={taxonomyValues} />,
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

	const MyPrevArrow = (props: any) => {
		const { className, style, onClick } = props;
		// не передаём все props сразу
		return (
			<div
				className={className}
				style={style}
				onClick={onClick}
			>
				<ArrowLeftIcon className="w-8 h-8 lg:w-[30px] lg:h-[48px] fill-current" />
			</div>
		);
	};

	const MyNextArrow = (props: any) => {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={style}
				onClick={onClick}
			>
				<ArrowRightIcon className="w-8 h-8 lg:w-[30px] lg:h-[48px] fill-current" />
			</div>
		);
	};

	return (
		<>
			<div className='lg:flex lg:w-full lg:gap-6'>
				<div className='lg:w-1/2 lg:max-w-[618px]'>
					{car.acf?.nazvanie_avto && (
						<div className='text-2xl uppercase font-bold mb-5 ml-3 lg:text-4xl lg:ml-0'>
							{car.acf.nazvanie_avto}
						</div>
					)}


					<div className='carousel-wrapper'>
						{galleryImages.length === 1 && (
							<img
								src={galleryImages[0]}
								alt={car.acf?.nazvanie_avto || 'car image'}
								className='w-full h-[225px] rounded-2xl object-cover lg:h-[385px]'
							/>
						)}

						{galleryImages.length > 1 && (
							<ConfigProvider
								theme={{
									components: {
										Carousel: { arrowSize: 30 },
									},
								}}
							>
								<Carousel
									arrows
									prevArrow={<MyPrevArrow />}
									nextArrow={<MyNextArrow />}
									dots={false}
								>
									{galleryImages.map((imgUrl) => (
										<div key={imgUrl}>
											<img
												src={imgUrl}
												alt={imgUrl}
												className='w-full h-[225px] rounded-2xl object-cover lg:h-[385px]'
											/>
										</div>
									))}
								</Carousel>
							</ConfigProvider>
						)}
					</div>

					{priceRanges.length > 0 && (
						<PriceCards
							priceRanges={priceRanges}
							seasonModeSwitch={seasonModeSwitch}
						/>
					)}

					<div className='mt-6 hidden lg:block lg:text-[18px] lg:border-2 lg:border-solid lg:border-[#f6f6f638] lg:rounded-[32px] lg:p-7'>
						<div className='lg:text-2xl lg:font-bold lg:mb-6'>Информация</div>
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
										itemColor: '#f6f6f6',
										itemSelectedColor: '#f6f6f6',
										inkBarColor: 'transparent',
										itemActiveColor: '#f6f6f6',
										itemHoverColor: '#f6f6f638',
										horizontalItemPadding: '8px 14px',
										horizontalItemGutter: 6,
										fontFamily: '"lato", "lato Fallback"',
									},
								},
							}}
						>
							<Tabs defaultActiveKey='1' items={TAB_ITEMS} />
						</ConfigProvider>
					</div>
				</div>

				<div className='lg:w-1/2 lg:max-w-[618px]'>
					<RentalCheckout
						additionalOptions={[
							{ label: 'Бустер', value: 'buster' },
							{ label: 'Бокс на крышу (+500 р./сут.)', value: 'box' },
							{ label: 'Детское кресло', value: 'seat' },
						]}
						seasonDates={seasonDates}
						priceRanges={priceRanges}
						setSeasonModeSwitch={setSeasonModeSwitch}
					/>
					<div className='lg:px-7'>
						<div className='hidden lg:block lg:text-2xl lg:mt-8'>
							Условия аренды
						</div>
						<div className='flex flex-wrap justify-between mt-6 text-[#f6f6f666] border-[#f6f6f638] border-y py-6 lg:mt-5 lg:border-0 lg:py-0'>
							<div className='flex flex-wrap justify-between w-[116px] h-[32px] lg:w-[175px]'>
								<DocumentsIcon />
								<div className='mt-[-2px]'>
									<div className='text-sm font-bold lg:text-lg'>Документы</div>
									<div className='text-xs lg:text-lg'>Паспорт и ВУ</div>
								</div>
							</div>

							<div className='flex flex-wrap justify-between w-[97px] mt-0 lg:w-[150px]'>
								<CarIcon />
								<div className='h-[32px] w-[59px] mt-[-2px] lg:w-auto'>
									<div className='text-sm font-bold lg:text-lg'>Стаж</div>
									<div className='text-xs lg:text-lg'>От 2-х лет</div>
								</div>
							</div>

							<div className='flex flex-wrap justify-between w-[104px] mt-0 lg:w-[160px]'>
								<AgeIcon />
								<div className='h-[32px] w-[66px] mt-[-2px] lg:w-auto'>
									<div className='text-sm font-bold lg:text-lg'>Возраст</div>
									<div className='text-xs lg:text-lg'>От 22-х лет</div>
								</div>
							</div>

							<div className='block lg:hidden text-[#f6f6f6] mt-3 mx-auto underline'>Полные условия</div>
						</div>

						<div className='hidden lg:block'>
							<ul className='lg:list-disc lg:pl-5 lg:text-lg lg:mt-[18px]'>
								<li>Полные условия аренды вы можете прочитать <span className='font-semibold underline underline-offset-4'>ЗДЕСЬ</span></li>
							</ul>
						</div>
					</div>

					<div className='mt-6 block lg:hidden'>
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

			</div>
			<div>
				<SimilarCars similarCars={similarCars} />
			</div>

			<div className='mx-[-16px]'>
				<RentSteps />
			</div>
			<div className=" w-full border-t-2 border-[#284B63B2] h-[1px] my-10 lg:hidden"></div>
			<div>
				<DeliveryPriceTable deliveryPrice={deliveryPrice} />
			</div>

			<div className=" w-full border-t-2 border-[#284B63B2] h-[1px] my-10 lg:my-[68px]"></div>

			<div>
				<WhyUs />
			</div>
			<div>
				<HaveQuestions />
			</div>
			<div>
				<Footer />
			</div>
		</>
	);
}
