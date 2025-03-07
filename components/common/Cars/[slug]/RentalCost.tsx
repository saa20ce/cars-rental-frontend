'use client';

import React, { useState, useEffect } from 'react';
import { ConfigProvider, Button, Input } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import { computeCostsChunked } from '@/shared/helpers/rentalCostHelper';

import { ChevronDownIcon, InfoIcon, LineIcon } from '@/shared/icons';
import { RentalPeriod } from './RentalPeriod';
import { SeasonData } from '@/app/cars/[slug]/page';

interface PriceRange {
	baseKey: string;
	minDays: number;
	maxDays: number;
	label: string;
	price: number;
	seasonPrice: number;
}

interface RentalCostProps {
	additionalOptions: { label: string; value: string }[];
	seasonDates: SeasonData | null;
	priceRanges?: PriceRange[];
}

/**
 * Реализует "кусковый" расчёт: период аренды может разбиваться
 * на несколько блоков, каждый блок использует ровно `minDays` (если хватит),
 * либо больше — но не более `maxDays`.
 * Для каждого "куска" мы идём по дням и проверяем сезонность (зима/лето).
 */
export const RentalCost: React.FC<RentalCostProps> = ({
	additionalOptions,
	seasonDates,
	priceRanges = [],
}) => {
	const [startDate, setStartDate] = useState<Dayjs | null>(null);
	const [startTime, setStartTime] = useState<Dayjs | null>(null);
	const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
	const [returnTime, setReturnTime] = useState<Dayjs | null>(null);

	const [daysCount, setDaysCount] = useState(0);
	const [dailyCosts, setDailyCosts] = useState<number[]>([]);

	const [showCost, setShowCost] = useState(false);
	const [visible, setVisible] = useState(true);

	function toggleVisible() {
		setVisible((v) => !v);
	}

	useEffect(() => {
		if (
			startDate &&
			startTime &&
			returnDate &&
			returnTime &&
			priceRanges.length > 0
		) {
			setShowCost(true);
			setVisible(true);

			const startFull = startDate
				.hour(startTime.hour())
				.minute(startTime.minute());
			const endFull = returnDate
				.hour(returnTime.hour())
				.minute(returnTime.minute());

			// const diffDays = endFull.diff(startFull, 'day');
			// const totalDays = diffDays > 0 ? diffDays : 0;
			const exactDiffHours = endFull.diff(startFull, 'hour', true);
			const totalDays = Math.max(0, Math.ceil(exactDiffHours / 24));
			setDaysCount(totalDays);

			const costs = computeCostsChunked(
				startFull,
				endFull,
				priceRanges,
				seasonDates,
			);
			setDailyCosts(costs);
		} else {
			setShowCost(false);
			setVisible(false);
			setDaysCount(0);
			setDailyCosts([]);
		}
	}, [
		startDate,
		startTime,
		returnDate,
		returnTime,
		priceRanges,
		seasonDates,
	]);

	// Сумма
	const total = dailyCosts.reduce((acc, val) => acc + val, 0);
	const pricePerDay = dailyCosts[0] || 0;
	const hasSeasonDays = dailyCosts.some((c) => c !== pricePerDay);

	return (
		<div>
			<RentalPeriod
				additionalOptions={additionalOptions}
				startDate={startDate}
				onStartDateChange={setStartDate}
				startTime={startTime}
				onStartTimeChange={setStartTime}
				returnDate={returnDate}
				onReturnDateChange={setReturnDate}
				returnTime={returnTime}
				onReturnTimeChange={setReturnTime}
			/>

			{showCost && (
				<div className='p-[18px] pt-6 bg-[#f6f6f60e] mt-[-10px] z-0 relative rounded-b-2xl transition-all'>
					<div
						className='flex items-center cursor-pointer transition-all'
						style={{ marginBottom: visible ? 12 : 0 }}
						onClick={() => setVisible(!visible)}
					>
						<span>Расчет стоимости</span>
						<span
							style={{
								transform: visible
									? 'rotate(180deg)'
									: 'rotate(0deg)',
								transition: 'transform 0.3s ease',
								marginLeft: 8,
							}}
						>
							<ChevronDownIcon fillOpacity={1} />
						</span>
					</div>

					{visible && (
						<>
							<div className='mb-3 text-sm border-b border-[#f6f6f638]'>
								<div className='flex justify-between mb-[6px]'>
									<div>Продолжительность</div>
									<div className='font-bold'>
										{daysCount}{' '}
										{daysCount === 1 ? 'день' : 'дней'}
									</div>
								</div>
							</div>

							<div className='text-sm border-b border-[#f6f6f638]'>
								<div className='flex justify-between my-[6px]'>
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

							<div className='text-sm border-b border-[#f6f6f638]'>
								<div className='flex justify-between my-[6px]'>
									<div>Залог</div>
									<div className='font-bold'>10 000 ₽</div>
								</div>
							</div>
							<div className='text-sm border-b border-[#f6f6f638]'>
								<div className='flex justify-between my-[6px]'>
									<div>Пробег</div>
									<div className='font-bold'>6 км.</div>
								</div>
							</div>
							<div className='text-sm border-b border-[#f6f6f638] mb-3'>
								<div className='flex justify-between my-[6px]'>
									<div>Перепробег за 1 км</div>
									<div className='font-bold'>6 ₽/км.</div>
								</div>
							</div>

							<div className='font-semibold mb-2'>Промокод</div>
							<div className='mb-5'>
								<ConfigProvider
									theme={{
										components: {
											Input: {
												colorTextPlaceholder:
													'#f6f6f666',
												hoverBorderColor: '#f6f6f638',
												activeBg: '#f6f6f638',
												addonBg: '#f6f6f638',
											},
										},
									}}
								>
									<Input
										placeholder='Введите промокод'
										allowClear
										className='bg-[#f6f6f638] border-0 rounded-xl'
										style={{
											height: 36,
											color: '#f6f6f666',
										}}
									/>
								</ConfigProvider>
							</div>

							<div className='flex items-center justify-between mb-7'>
								<div className='font-bold'>
									Итоговая стоимость:
									{hasSeasonDays && (
										<div className='flex font-semibold items-center gap-2'>
											с учетом сезонности <LineIcon />{' '}
											<InfoIcon width={20} height={20} />
										</div>
									)}
								</div>
								<div className='font-bold text-2xl'>
									{dailyCosts
										.reduce((acc, val) => acc + val, 0)
										.toLocaleString()}{' '}
									₽
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
										},
									},
								}}
							>
								<Button block>Оставить заявку</Button>
							</ConfigProvider>
						</>
					)}
				</div>
			)}
		</div>
	);
};
