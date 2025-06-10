'use client';

import React, { useEffect, useState } from 'react';
import { Car } from '@/lib/types/Car';
import { CAR_TAXONOMIES } from '@/lib/types/Taxonomies';
import { getCarTaxonomyNames } from '@/lib/api/fetchCarTaxonomies';

interface CarCharacteristicsProps {
	car: Car;
	taxonomyValues: Record<string, string>;
}

export const CarCharacteristics: React.FC<CarCharacteristicsProps> = ({
	car,
	taxonomyValues,
}) => {

	return (
		<div className='px-2 lg:px-0'>
			<div className='text-sm border-b border-[#f6f6f638] lg:text-lg'>
				<div className='flex justify-between my-[6px] lg:my-[10px]'>
					<div>Двигатель</div>
					<div className='font-bold'>
						{taxonomyValues.dvigatel || '—'}
					</div>
				</div>
			</div>

			<div className='text-sm border-b border-[#f6f6f638] lg:text-lg'>
				<div className='flex justify-between my-[6px] lg:my-[10px]'>
					<div>Объем двигателя</div>
					<div className='font-bold'>
						{car.acf?.engine_volume || '—'}
					</div>
				</div>
			</div>

			<div className='text-sm border-b border-[#f6f6f638] lg:text-lg'>
				<div className='flex justify-between my-[6px] lg:my-[10px]'>
					<div>Мощность двигателя</div>
					<div className='font-bold'>
						{taxonomyValues.moschnost || '—'}
					</div>
				</div>
			</div>

			<div className='text-sm border-b border-[#f6f6f638] lg:text-lg'>
				<div className='flex justify-between my-[6px] lg:my-[10px]'>
					<div>Расход топлива</div>
					<div className='font-bold'>
						{' '}
						{car.acf?.fuel_flow || '—'}
					</div>
				</div>
			</div>

			<div className='text-sm border-b border-[#f6f6f638] lg:text-lg'>
				<div className='flex justify-between my-[6px] lg:my-[10px]'>
					<div>Тип привода</div>
					<div className='font-bold'>
						{taxonomyValues.privod || '—'}
					</div>
				</div>
			</div>

			<div className='text-sm border-b border-[#f6f6f638] lg:text-lg'>
				<div className='flex justify-between my-[6px] lg:my-[10px]'>
					<div>Количество пассажиров</div>
					<div className='font-bold'>
						{' '}
						{car.acf?.passengers || '—'}
					</div>
				</div>
			</div>

			<div className='text-sm lg:text-lg'>
				<div className='flex justify-between my-[6px] lg:my-[10px]'>
					<div>Коробка передач</div>
					<div className='font-bold'>
						{taxonomyValues.korobka || '—'}
					</div>
				</div>
			</div>
		</div>
	);
};
