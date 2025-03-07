'use client';

import React, { useState } from 'react';
import { Switch } from 'antd';
import { LineIcon, InfoIcon } from '@/shared/icons';

interface PriceRange {
	baseKey: string;
	label: string;
	price: number;
	seasonPrice: number;
}

interface PriceCardsProps {
	priceRanges: PriceRange[];
}

export const PriceCards: React.FC<PriceCardsProps> = ({ priceRanges }) => {
	const [seasonMode, setSeasonMode] = useState(false);

	return (
		<div>
			<div className='flex items-center gap-2 mt-4'>
				<Switch onChange={(checked) => setSeasonMode(checked)} />
				Сезон <LineIcon /> <InfoIcon />
			</div>
			<div className='flex overflow-auto whitespace-nowrap gap-[6px] mt-4 mr-[-16px]'>
				{priceRanges.map(({ baseKey, label, price, seasonPrice }) => {
					const finalPrice = seasonMode ? seasonPrice : price;

					return (
						<div
							key={baseKey}
							className={`flex flex-col min-w-[118px] rounded-lg px-3 py-2 justify-between mb-2 transition-all ${
								seasonMode ? 'bg-[#f6f6f638]' : 'bg-[#f6f6f60e]'
							}`}
						>
							<div
								className={`transition-all ${seasonMode ? 'text-white' : 'text-[#f6f6f666]'}`}
							>
								{label}
							</div>
							<div
								className={`font-bold transition-all ${seasonMode ? 'text-white' : ''}`}
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
