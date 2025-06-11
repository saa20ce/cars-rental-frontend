'use client';

import type { DeliveryPrice } from "@/lib/types/Car";
import { DefaultOptionType } from "antd/es/select";
import { useState, useEffect } from 'react';
import { CustomSelect } from "@/lib/ui/common/Select/CustomSelect";
import { LineIcon } from "@/lib/ui/icons";

export const DeliveryPriceTable = ({ deliveryPrice }: { deliveryPrice: DeliveryPrice | null }) => {
	const [timeRange, setTimeRange] = useState<'day' | 'night'>('day');

	const zones = [
		{
			id: 'vokzal',
			label: 'Ж/Д Вокзал, Центральный, Октябрьский, Заельцовский, Дзержинский, Железнодорожный',
		},
		{
			id: 'aeroport',
			label: 'Калининский, Ленинский, Кировский, Первомайский, Аэропорт',
		},
		{
			id: 'sovetskiy',
			label: 'Советский, Пашино, Кольцово, Краснообск',
		},
		{
			id: 'berdsk',
			label: 'Бердск',
		},
	];

	const handleSelectChange = (value: unknown, option?: DefaultOptionType | DefaultOptionType[] | undefined) => {
		if (option && 'value' in option && 'label' in option) {
			setTimeRange(value === '10:00 - 19:00' ? 'day' : 'night');
		}

	};

	const renderPrice = (zoneId: string, overrideRange?: 'day' | 'night') => {
		if (!deliveryPrice) return '-';
		const range = overrideRange ?? timeRange;
		const key = `delivery_price_${range}_${zoneId}` as keyof DeliveryPrice;
		const value = deliveryPrice[key];
		return value !== undefined && value !== null ? `${value} ₽` : '-';
	};

	return (
		<div className="mt-10 lg:mt-[68px]">
			<div className="flex flex-row">
				<div className="text-xl font-bold lg:text-3xl">Стоимость доставки авто:</div>
				<div className="hidden lg:block ml-4 mt-[6px]"><LineIcon /></div>
				<div className="hidden text-[#FFD7A6] lg:block text-2xl ml-4 mt-[2px]">Доставка 24/7</div>
			</div>
			<div className="flex flex-row justify-between items-center mt-5 lg:hidden">
				<div className="flex flex-row items-center">
					<div>Время:</div>
					<div className="ml-[10px]">
						<CustomSelect
							options={[
								{ value: "10:00 - 19:00", label: "10:00 - 19:00", },
								{ value: "20:00 - 09:00", label: "20:00 - 09:00", }
							]}
							defaultValue="10:00 - 19:00"
							style={{ width: '146px', }}
							onChange={handleSelectChange}
						/>
					</div>
				</div>
				<div className="text-[#FFD7A6]">
					Доставка 24/7
				</div>
			</div>

			<div className="border border-[#f6f6f6] rounded-xl mt-4 lg:mt-6">
				<table className="table-auto divide-y divide-gray-200">
					<thead>
						<tr className="divide-x divide-gray-200 bg-[#f6f6f60e]">
							<th className="px-4 py-[14px] text-left w-2/3 lg:w-1/3 lg:text-center">Район доставки</th>
							<th className="text-center w-1/3 lg:hidden">Цена</th>
							<th className="hidden text-center w-1/3 lg:table-cell">10:00 - 19:00 </th>
							<th className="hidden text-center w-1/3 lg:table-cell">20:00 - 9:00 </th>
						</tr>
					</thead>
					{zones.map(zone => (
						<tr key={zone.id} className="divide-x divide-gray-200">
							<td className="px-4 py-2 lg:px-4 lg:py-5">{zone.label}</td>
							<td className="text-center">{renderPrice(zone.id)}</td>
							<td className="hidden text-center lg:table-cell">{renderPrice(zone.id, 'night')}</td>
						</tr>
					))}
				</table>
			</div>
		</div>
	);
};