'use client';

import React from 'react';
import type { PriceRange } from '@/lib/types/Car';
import { Switch, Tooltip } from 'antd';
import { LineIcon, InfoIcon } from '@/lib/ui/icons';

interface PriceCardsProps {
	priceRanges: PriceRange[];
	seasonModeSwitch: boolean;
}

const tooltipText =
	<div className='text-xs lg:text-sm'>
		Сезонные тарифы (высокий спрос)
		<ul className='list-decimal list-inside pl-1 font-bold'>
			<li>10 декабря - 20 января</li>
			<li>1 мая - 15 сентября</li>
		</ul>
	</div>;

export const PriceCards: React.FC<PriceCardsProps> = ({
	priceRanges,
	seasonModeSwitch,
}) => {
	return (
		<div>
			<div className='flex items-center gap-2 mt-5 lg:ml-6 lg:text-lg'>
				<Switch
					checked={seasonModeSwitch}
				/>
				<span className='lg:mt-[4px]'>Сезон</span>
				<LineIcon />
				<Tooltip placement="right" title={tooltipText} color='#4b5563' arrow={false}>
					<div>
						<InfoIcon />
					</div>
				</Tooltip>
			</div>
			<div className='flex overflow-auto whitespace-nowrap gap-[6px] mt-4 mr-[-16px] lg:flex-wrap lg:gap-3 lg:w-full'>
				{priceRanges.map(({ baseKey, label, price, seasonPrice }) => {
					const finalPrice = seasonModeSwitch ? seasonPrice : price;

					return (
						<div
							key={baseKey}
							className={`flex flex-col min-w-[118px] rounded-lg px-3 py-2 justify-between transition-all lg:text-lg lg:min-w-[198px] lg:min-h-[80px] lg:justify-center lg:m-0 lg:px-5 lg:py-3
								${seasonModeSwitch ? 'bg-[#f6f6f638]' : 'bg-[#f6f6f60e]'}`}
						>
							<div
								className={`transition-all ${seasonModeSwitch ? 'text-[#f6f6f6]' : 'text-[#f6f6f666]'}`}
							>
								{label}
							</div>
							<div
								className={`font-bold transition-all ${seasonModeSwitch ? 'text-[#f6f6f6]' : ''}`}
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
