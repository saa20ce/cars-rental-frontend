'use client';

import React, { useState, useEffect } from 'react';
import type { PriceRange, SeasonData } from '@/lib/types/Car';
import { ConfigProvider, Button } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import { computeCostsChunked } from '@/lib/helpers/rentalCostHelper';

import { InfoIcon, LineIcon } from '@/lib/ui/icons';
import { RentalPeriod } from './RentalPeriod';
import { isDaySeason } from '@/lib/helpers/rentalCostHelper';

interface RentalCostProps {
	additionalOptions: { label: string; value: string }[];
	seasonDates: SeasonData | null;
	priceRanges?: PriceRange[];
	setSeasonModeSwitch: (mode: boolean) => void;
}

export const RentalCost: React.FC<RentalCostProps> = ({
	additionalOptions,
	seasonDates,
	priceRanges = [],
	setSeasonModeSwitch,
}) => {
	const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
	const [returnDate, setReturnDate] = useState<Dayjs | null>(null);

	const [daysCount, setDaysCount] = useState(0);
	const [dailyCosts, setDailyCosts] = useState<number[]>([]);
	const [hasSeasonDays, setHasSeasonDays] = useState(false);

	const [showCost, setShowCost] = useState(false);
	// const [visible, setVisible] = useState(true);

	useEffect(() => {
		if (startDate && returnDate) {
			const startFull = startDate
			const endFull = returnDate;

			// const diffDays = endFull.diff(startFull, 'day');
			// const totalDays = diffDays > 0 ? diffDays : 0;
			const exactDiffHours = endFull.diff(startFull, 'hour', true);
			const totalDays = Math.max(0, Math.ceil(exactDiffHours / 24));
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
			// setVisible(true);
		} else {
			setShowCost(false);
			// setVisible(false);
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

	const total = dailyCosts.reduce((acc, val) => acc + val, 0);
	const pricePerDay = dailyCosts[0] || 0;

	return (
		<div className='lg:w-full'>
			<RentalPeriod
				additionalOptions={additionalOptions}
				startDate={startDate}
				onStartDateChange={setStartDate}
				returnDate={returnDate}
				onReturnDateChange={setReturnDate}
			/>

			{showCost && (
				<div className='p-6 bg-[#f6f6f60e] mt-[-10px] z-0 relative rounded-b-2xl transition-all lg:px-7 lg:pb-8 lg:pt-11 lg:mt-[-28]'>
					<div
						className='flex items-center mb-4'
					>
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
							{total} ₽
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
						<Button className='lg:text-xl lg:h-[60px] lg:rounded-xl' block>Оставить заявку</Button>
					</ConfigProvider>
				</div>
			)}
		</div>
	);
};
