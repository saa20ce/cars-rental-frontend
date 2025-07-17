'use client';

import React, { useState, useEffect, useMemo } from 'react';
import type { Car, PriceRange, SeasonData } from '@/lib/types/Car';
import { ConfigProvider, Button, Modal } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import { isDaySeason, computeCostsChunked } from '@/lib/helpers/RentalCheckoutHelper';
import { InfoIcon, LineIcon } from '@/lib/ui/icons';
import { RentalPeriod } from './RentalPeriod';
import { ModalRentalCheckout } from '@/components/common/Modal/ModalRentalCheckout';
import { DeliveryPrice} from '@/lib/types/Car';
import { DeliveryOption } from '@/lib/types/Car';
import { text } from 'stream/consumers';

interface AdditionalOption {
  label: string;
  value: string;
  price?: number;
}

interface RentalCheckoutProps {
	car: Car;
	additionalOptions:AdditionalOption[];
	deliveryPrice: DeliveryPrice;
	seasonDates: SeasonData | null;
	priceRanges?: PriceRange[];
	setSeasonModeSwitch: (mode: boolean) => void;
}

export const RentalCheckout: React.FC<RentalCheckoutProps> = ({
	car,
	additionalOptions,
	deliveryPrice,
	seasonDates,
	priceRanges = [],
	setSeasonModeSwitch,
}) => {
	
	const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
	const [startDate, setStartDate] = useState<Dayjs | null>(null);
	const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
	const [startTime, setStartTime] = useState('');
	const [returnTime, setReturnTime] = useState('');
	const [daysCount, setDaysCount] = useState(0);
	const [dailyCosts, setDailyCosts] = useState<number[]>([]);
	const [hasSeasonDays, setHasSeasonDays] = useState(false);
	const [showCost, setShowCost] = useState(false);

	const [additionalOptionsSelected, setAdditionalOptions] = useState<string[]>([]);
	const [deliveryOptionSelected, setDeliveryOption] = useState<string>('');

	const [modalVisible, setModalVisible] = useState(false);
	const openModal = () => setModalVisible(true);
	const closeModal = () => setModalVisible(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const pricePerDay = dailyCosts[0] || 0;
	
	const additionalOptionsTotal = useMemo(() => {
		return additionalOptions
		.filter(opt => additionalOptionsSelected.includes(opt.value))
		.reduce((sum, opt) => sum + (opt.price ?? 0), 0);
	}, [additionalOptionsSelected, additionalOptions]);

	const deliveryCost = useMemo (()=>{
		const selected = deliveryOptions.find(opt => opt.value === deliveryOptionSelected);
		return selected ? Number(selected.price) || 0: 0;
	},[deliveryOptionSelected,deliveryOptions]);

	const totalPrice = dailyCosts.reduce((acc, val) => acc + val, 0)+ additionalOptionsTotal +deliveryCost;
	useEffect(() => {
		if (!startDate){
			setStartDate(dayjs());
		}
		if (startDate && returnDate) {
			const startFull = startDate
			const endFull = returnDate;

			const exactDiffHours = endFull.diff(startFull, 'hour', true);
			let totalDays = Math.max(0, Math.ceil(exactDiffHours / 24));
			if (totalDays < 3){
				const adjustedEnd = startFull.add(3,'day');
				setReturnDate(adjustedEnd);
				totalDays=3;
			}
			setDaysCount(totalDays);

			let isSeasonal = false;
			setHasSeasonDays(true);
			if (seasonDates) {
				let allDaysSeason = true;
				let currentDay = startFull.startOf('day');
				const endDay = endFull.startOf('day');

				while (
					currentDay.isBefore(endDay) ||
					currentDay.isSame(endDay)
				) {
					if (!isDaySeason(currentDay, seasonDates)) {
						allDaysSeason = false;
						setHasSeasonDays(false);
						break;
					}
					currentDay = currentDay.add(1, 'day');
				}
				isSeasonal = allDaysSeason;
			}
			setSeasonModeSwitch(isSeasonal);

			const costs = computeCostsChunked(
				startFull,
				endFull,
				priceRanges,
				seasonDates,
			);
			setDailyCosts(costs);

			setShowCost(true);
		} else {
			setShowCost(false);
			setDaysCount(0);
			setDailyCosts([]);
			setSeasonModeSwitch(false);
			setHasSeasonDays(false);
		}
	}, [
		startDate,
		returnDate,
		priceRanges,
		seasonDates,
		setSeasonModeSwitch,
	]);

	useEffect(() => {
		const hour = parseInt(startTime.split(':')[0], 10);
		const isNight = hour >= 20 || hour < 9;
		const options = isNight ? deliveryPrice.night : deliveryPrice.day;
		setDeliveryOptions(options);
	}, [startTime, deliveryPrice]);



	return (
		<div className='lg:w-full'>
			<RentalPeriod
				car={car}
				startDate={startDate}
				onStartDateChange={setStartDate}
				startTime={startTime}
				onStartTimeChange={setStartTime}
				returnDate={returnDate}
				onReturnDateChange={setReturnDate}
				returnTime={returnTime}
				onReturnTimeChange={setReturnTime}
				daysCount={daysCount}
				additionalOptions={additionalOptions}
				additionalOptionsSelected={additionalOptionsSelected}
				setAdditionalOptions={setAdditionalOptions}
				deliveryOptions={deliveryOptions}
				deliveryOptionSelected={deliveryOptionSelected}
				setDeliveryOption={setDeliveryOption}
			/>

			{showCost && (
				<div className='p-6 bg-[#f6f6f60e] mt-[-10px] z-0 relative rounded-b-2xl transition-all lg:px-7 lg:pb-8 lg:pt-11 lg:mt-[-28]'>
					<div className='flex items-center mb-4'>
						<span className='text-xl lg:text-2xl'>Расчет стоимости</span>
					</div>


					<div className='mb-3 text-sm border-b border-[#f6f6f638] lg:text-lg'>
						<div className='flex justify-between mb-[6px] lg:mb-[10px]'>
							<div>Продолжительность</div>
							<div className='font-bold'>
								{daysCount}{' '}
								{daysCount === 1 ? 'день' : 'дней'}
							</div>
						</div>
					</div>

					<div className='text-sm border-b border-[#f6f6f638] lg:text-lg'>
						<div className='flex justify-between my-[6px] lg:my-[10px]'>
							<div>
								Цена за сутки
								{hasSeasonDays && (
									<span className='font-bold text-[#f6f6f666]'>
										{' '}
										(Сезон)
									</span>
								)}
							</div>
							<div className='font-bold'>
								{pricePerDay.toLocaleString()} ₽/сут.
							</div>
						</div>
					</div>

					<div className='text-sm border-b border-[#f6f6f638] lg:text-lg'>
						<div className='flex justify-between my-[6px] lg:my-[10px]'>
							<div>Залог</div>
							<div className='font-bold'>10 000 ₽</div>
						</div>
					</div>

					<div className='text-sm border-b border-[#f6f6f638] lg:text-lg'>
						<div className='flex justify-between my-[6px] lg:my-[10px]'>
							<div>Пробег</div>
							<div className='font-bold'>6 км.</div>
						</div>
					</div>

					<div className='text-sm border-b border-[#f6f6f638] lg:text-lg'>
						<div className='flex justify-between my-[6px] lg:my-[10px]'>
							<div>Перепробег за 1 км</div>
							<div className='font-bold'>6 ₽/км.</div>
						</div>
					</div>

					{additionalOptionsTotal > 0 && (
						<div className='text-sm lg:text-lg border-b border-[#f6f6f638]'>
							<div className='flex justify-between my-[6px] lg:my-[10px]'>
								<div>Дополнительные опции</div>
								<div className='font-bold'>+{additionalOptionsTotal} ₽</div>
							</div>
						</div>
					)}				
					{/* <div className='font-semibold mb-2 lg:text-lg'>Промокод</div>
					<div className='mb-5'>
						<ConfigProvider
							theme={{
								components: {
									Input: {
										colorTextPlaceholder: '#f6f6f666',
										hoverBorderColor: '#f6f6f638',
										activeBg: '#f6f6f638',
										addonBg: '#f6f6f638',
										hoverBg: '#f6f6f638',
									},
								},
							}}
						>
							<Input
								placeholder='Введите промокод'
								allowClear
								className='bg-[#f6f6f638] text-[#f6f6f6] border-0 rounded-xl h-9 lg:h-12 lg:text-base'
							/>
						</ConfigProvider>
					</div> */}

					{deliveryCost > 0 && (
						<div className='text-sm lg:text-lg border-b border-[#f6f6f638]'>
							<div className='flex justify-between my-[6px] lg:my-[10px]'>
								<div>Доставка</div>
								<div className='font-bold'>+{deliveryCost} ₽</div>
							</div>
						</div>
					)}

					<div className='flex items-center justify-between mb-5 mt-8'>
						<div className='font-bold lg:text-2xl'>
							Итоговая стоимость:
							{hasSeasonDays && (
								<div className='flex font-semibold items-center gap-2 lg:text-lg'>
									с учетом сезонности <LineIcon />{' '}
									<InfoIcon width={20} height={20} />
								</div>
							)}
						</div>
						<div className='font-bold text-2xl lg:text-4xl'>
							{totalPrice} ₽
						</div>
					</div>

					<ConfigProvider
						theme={{
							components: {
								Button: {
									defaultBg: '#3c6e71',
									defaultBorderColor: '#3c6e71',
									defaultColor: '#f6f6f6',
									contentFontSize: 16,
									controlHeight: 42,
									textHoverBg: '#f6f6f6',
									colorPrimaryHover: '#f6f6f6',
									colorBorderSecondary: '#3c6e71',
									colorBorderBg: '#3c6e71',
									colorBgContainer: '#3c6e71',
									colorPrimaryBorderHover: '#3c6e71',
									defaultHoverBorderColor: '#3c6e71',
									defaultActiveBorderColor: '#3c6e71',
									defaultActiveColor: '#f6f6f6',
									colorBorder: '#3c6e71',
									colorBgTextActive: '#3c6e71',
								},
							},
						}}
					>
						<Button
							className='rounded-xl lg:text-xl lg:h-[60px] lg:rounded-2xl'
							block
							onClick={openModal}
						>
							Оставить заявку
						</Button>
					</ConfigProvider>
				</div>
			)}

			<ConfigProvider
				theme={{
					components: {
						Modal: {
							contentBg: "#00000000",
							boxShadow: 'none',
						},
					},
				}}
			>
				<Modal
					open={modalVisible}
					onCancel={closeModal}
					closeIcon={false}
					footer={null}
					width="100vw"
					style={{
						top: 0,
						left: 0,
						margin: 0,
						padding: 0,
					}}
					styles={{
						mask: {
							backdropFilter: 'blur(30px)',
							WebkitBackdropFilter: 'blur(30px)',
						},
						content: {
							padding: 8,
							color: '#f6f6f6',
						}
					}}
					centered
				>
					{isSubmitted && (
						<div className="text-center p-6 text-white">
							<h2 className="mb-4 text-lg">Спасибо! Ваша заявка отправлена.</h2>
							<Button block onClick={() => { setIsSubmitted(false); closeModal(); }}>
								Закрыть
							</Button>
						</div>
					)}

					{startDate && returnDate && !isSubmitted && (
						<ModalRentalCheckout
							car={car}
							startDate={startDate.format('YYYY-MM-DD')}
							returnDate={returnDate.format('YYYY-MM-DD')}
							startTime={startTime}
							returnTime={returnTime}
							daysCount={daysCount}
							hasSeasonDays={hasSeasonDays}
							additionalOptions={additionalOptions}
							additionalOptionsSelected={additionalOptionsSelected}
							setAdditionalOptions={setAdditionalOptions}
							deliveryOptions={deliveryOptions}
							deliveryOptionSelected={deliveryOptionSelected}
							setDeliveryOption={setDeliveryOption}
							pricePerDay={pricePerDay}
							totalPrice={totalPrice}
							closeModal={closeModal}
							setIsSubmitted={setIsSubmitted}
						/>
					)}
				</Modal>

			</ConfigProvider>
		</div>
	);
};

