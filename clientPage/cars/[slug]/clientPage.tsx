'use client';

import React, { useState, useMemo } from 'react';
import { ConfigProvider, Carousel, Tabs } from 'antd';
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
import type { Car, PriceRange, SeasonData, DeliveryOption,DeliveryPrice } from '@/lib/types/Car';
import { WhyUs } from '@/components/common/Cards/WhyUs';
import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';
import { getAdditionalOptions } from '@/lib/api/fetchCarData';
interface SingleCarPageClientProps {
	car: Car;
	seasonDates: SeasonData | null;
	priceRanges: PriceRange[];
	deliveryPrice: DeliveryPrice;
	//deliveryOptions: DeliveryOption[];
	taxonomyValues: Record<string, string>;
	similarCars: Car[];
	additionalOptions: { label: string; value: string }[];
}

export default function SingleCarPageClient({
	car,
	seasonDates,
	priceRanges,
	//deliveryOptions,
	deliveryPrice,
	taxonomyValues,
	similarCars,
	additionalOptions,
}: SingleCarPageClientProps) {
	console.log('car', car);

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
				<div className='lg:flex-1 lg:min-w-0'>
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

				<div className='lg:flex-1 lg:min-w-0'>
					<RentalCheckout
						car={car}
						additionalOptions={additionalOptions}
						//deliveryOptions={deliveryOptions}
						deliveryPrice={deliveryPrice}
						seasonDates={seasonDates}
						priceRanges={priceRanges}
						setSeasonModeSwitch={setSeasonModeSwitch}
					/>
					<div className='mt-6 lg:mt-8 md:px-3 xl:px-7'>
						<div className='lg:text-2xl lg:mt-8 flex justify-between'>
							<h4 className='text-[20px]/[28px] lg:text-[24px]/[32px] font-bold'>Условия аренды:</h4>
							<div className='lg:hidden underline text-[16px]/[24px] font-normal'>Полные условия</div>
						</div>
						<div className='flex justify-between mt-4 lg:mt-5 text-[#f6f6f666] border-[#f6f6f638] border-b py-6 lg:mt-5 lg:border-0 lg:py-0'>
							<div className='flex justify-between items-center gap-[6px] lg:gap-[10px] '>
								<DocumentsIcon className='w-9 h-9 xl:w-[52px] xl:h-[52px]'/>
								<div>
									<h5 className='text-[14px]/[20px] lg:text-[18px]/[20px] font-bold'>Документы</h5>
									<span className='text-[12px]/[16px] lg:text-[18px]/[20px] font-normal'>Паспорт и ВУ</span>
								</div>
							</div>

							<div className='flex justify-between items-center gap-[6px] lg:gap-[10px] mt-0 '>
								<CarIcon className='w-9 h-9 xl:w-[52px] xl:h-[52px]'/>
								<div>
									<h5 className='text-[14px]/[20px] lg:text-[18px]/[20px] font-bold'>Стаж</h5>
									<span className='text-[12px]/[16px] lg:text-[18px]/[20px] font-normal'>От 2-х лет</span>
								</div>
							</div>

							<div className='flex justify-between items-center gap-[6px] lg:gap-[10px] mt-0'>
								<AgeIcon className='w-9 h-9 xl:w-[52px] xl:h-[52px]'/>
								<div>
									<h5 className='text-[14px]/[20px] lg:text-[18px]/[20px] font-bold'>Возраст</h5>
									<span className='text-[12px]/[16px] lg:text-[18px]/[20px] font-normal'>От 22-х лет</span>
								</div>
							</div>

							
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
			<div className='w-full border-t-2 border-[#284B63B2] h-[1px] my-10 lg:hidden'></div>
			<div>
				<DeliveryPriceTable deliveryPrice={deliveryPrice} />
			</div>

			<div className='w-full border-t-2 border-[#284B63B2] h-[1px] my-10 lg:my-[68px]'></div>

			<div>
				<WhyUs />
			</div>
			<div>
				<HaveQuestions />
			</div>
		</>
	);
}
