'use client';

import type { DeliveryPrice } from "@/lib/types/Car";
import { DefaultOptionType } from "antd/es/select";
import { useState, useEffect } from 'react';
import { CustomSelect } from "@/lib/ui/common/Select/CustomSelect";
import { getDeliveryPrice } from "@/lib/api/fetchCarData";

export const DeliveryPriceTable = () => {
	const [deliveryPrice, setDeliveryPrice] = useState<DeliveryPrice | null>(null);
	const [timeRange, setTimeRange] = useState<'day' | 'night'>('day');

	useEffect(() => {
		// fetch data on mount
		getDeliveryPrice().then(data => {
			if (data) setDeliveryPrice(data);
		}).catch(err => console.error('Failed to load delivery prices', err));
	}, []);

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

	// render price cell based on zone and timeRange
	const renderPrice = (zoneId: string) => {
		if (!deliveryPrice) return '-';
		const key = `delivery_price_${timeRange}_${zoneId}` as keyof DeliveryPrice;
		const value = deliveryPrice[key];
		return value ? `${value} ₽` : '-';
	};

	return (
		<div className="mt-10">
			<div className="text-xl font-bold">Стоимость доставки авто:</div>
			<div className="flex flex-row justify-between items-center mt-5">
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
				<div className="text-[#FFD7A6] ">
					Доставка 24/7
				</div>
			</div>

			<div className="border border-[#f6f6f6] rounded-xl mt-4">
				<table className="table-auto divide-y divide-gray-200">
					<thead>
						<tr className="divide-x divide-gray-200 bg-[#f6f6f60e]">
							<th className="px-4 py-[14px] text-left w-2/3">Район доставки</th>
							<th className="text-center w-1/3">Цена</th>
						</tr>
					</thead>
					{zones.map(zone => (
						<tr key={zone.id} className="divide-x divide-gray-200">
							<td className="px-4 py-2">{zone.label}</td>
							<td className="text-center">{renderPrice(zone.id)}</td>
						</tr>
					))}
				</table>
			</div>
		</div>
	);
};