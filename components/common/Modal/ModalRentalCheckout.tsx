'use client';

import React from "react";
import { InfoIcon, LineIcon } from '@/lib/ui/icons';
import { Car, Term } from "@/lib/types/Car";

interface ModalRentalCheckoutProps {
	car: Car;
	startDate: string;
	returnDate: string;
	startTime: string;
	endTime: string;
	hasSeasonDays: boolean;
	options: string[];
	daysCount: number;
	pricePerDay: number;
	totalPrice: number;
}

export const ModalRentalCheckout: React.FC<ModalRentalCheckoutProps> = ({
	car,
	startDate,
	returnDate,
	startTime,
	endTime,
	hasSeasonDays,
	options,
	daysCount,
	pricePerDay,
	totalPrice,
}) => {
	console.log('car', JSON.stringify(car));

	const thumbUrl = car._embedded?.['wp:featuredmedia']?.[0]
		?.media_details.sizes.thumbnail.source_url;

	const allTerms = car._embedded?.['wp:term'] || [];
	const kuzovTerm = allTerms
		.flat()
		.find((t: Term) => t.taxonomy === 'kuzov');

	const kuzovName = kuzovTerm ? kuzovTerm.name : '—';

	return (
		<div className='carPriceInfo'>
			<div className='bg-[#f6f6f60e] rounded-2xl p-6 pt-[28px]'>

				<div className='flex flex-row gap-[10px] mb-4'>
					{thumbUrl && (
						<img
							src={thumbUrl}
							alt={car.title.rendered || 'Featured image'}
							className='w-24 h-[72px] object-cover rounded-xl'
						/>
					)}

					<div>
						{car.acf?.nazvanie_avto && (
							<div className='text-base text-[#f6f6f6] uppercase font-bold'>
								{car.acf.nazvanie_avto}
							</div>
						)}

						<div className='text-base text-[#f6f6f675]'>
							{kuzovName}
						</div>
					</div>

				</div>

				<div className='text-[#f6f6f6]'>
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

					<div className='flex items-center justify-between mt-8'>
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
				</div>
			</div>

			<div>

			</div>
		</div>
	);
};
