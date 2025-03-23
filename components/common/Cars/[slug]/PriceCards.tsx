'use client';

import React from 'react';
import type { PriceRange } from '@/lib/types/Car';
import { Switch } from 'antd';
import { LineIcon, InfoIcon } from '@/lib/ui/icons';

interface PriceCardsProps {
	priceRanges: PriceRange[];
	seasonModeSwitch: boolean;
	setSeasonModeSwitch: (mode: boolean) => void;
}

export const PriceCards: React.FC<PriceCardsProps> = ({
	priceRanges,
	seasonModeSwitch,
	setSeasonModeSwitch,
}) => {
	return (
		<div>
			<div className='flex items-center gap-2 mt-4 lg:ml-6 lg:text-lg'>
				<Switch
					checked={seasonModeSwitch}
					onChange={(checked) => setSeasonModeSwitch(checked)}
				/>
				<span className='lg:mt-[4px]'>Сезон</span> <LineIcon /> <InfoIcon />
			</div>
			<div className='flex overflow-auto whitespace-nowrap gap-[6px] mt-4 mr-[-16px] lg:flex-wrap lg:gap-3 lg:w-full'>
				{priceRanges.map(({ baseKey, label, price, seasonPrice }) => {
					const finalPrice = seasonModeSwitch ? seasonPrice : price;

					return (
						<div
							key={baseKey}
							className={`flex flex-col min-w-[118px] rounded-lg px-3 py-2 justify-between mb-2 transition-all lg:text-lg lg:min-w-[198px] lg:min-h-[80px] lg:justify-center lg:m-0 lg:px-5 lg:py-3
								${seasonModeSwitch ? 'bg-[#f6f6f638]' : 'bg-[#f6f6f60e]'}`}
						>
							<div
								className={`transition-all ${seasonModeSwitch ? 'text-white' : 'text-[#f6f6f666]'}`}
							>
								{label}
							</div>
							<div
								className={`font-bold transition-all ${seasonModeSwitch ? 'text-white' : ''}`}
							>
								{finalPrice > 0
									? `${finalPrice.toLocaleString()} ₽/сут.`
									: '—'}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
