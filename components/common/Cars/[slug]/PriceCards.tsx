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
			<div className='flex items-center gap-2 mt-4'>
				<Switch
					checked={seasonModeSwitch}
					onChange={(checked) => setSeasonModeSwitch(checked)}
				/>
				Сезон <LineIcon /> <InfoIcon />
			</div>
			<div className='flex overflow-auto whitespace-nowrap gap-[6px] mt-4 mr-[-16px]'>
				{priceRanges.map(({ baseKey, label, price, seasonPrice }) => {
					const finalPrice = seasonModeSwitch ? seasonPrice : price;

					return (
						<div
							key={baseKey}
							className={`flex flex-col min-w-[118px] rounded-lg px-3 py-2 justify-between mb-2 transition-all ${
								seasonModeSwitch
									? 'bg-[#f6f6f638]'
									: 'bg-[#f6f6f60e]'
							}`}
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
