'use client';

import type { DeliveryPrice } from "@/lib/types/Car";
import { DefaultOptionType } from "antd/es/select";
import { useState } from 'react';
import { CustomSelect } from "@/lib/ui/common/Select/CustomSelect";
import { LineIcon } from "@/lib/ui/icons";

type ZoneGroup = {
  id: string;
  label: string;
};

export const DeliveryPriceTable = ({ deliveryPrice }: { deliveryPrice: DeliveryPrice | null }) => {
	const [timeRange, setTimeRange] = useState<'day' | 'night'>('day');
	const zoneGroups: Record<string, string[]> = {
		vokzal: ['zhd_vokzal', 'centralnyj', 'oktyabrskij', 'zaelcovskij', 'dzerginskij', 'zheleznodorozhnyj'],
		aeroport: ['kalininskij', 'leninskij', 'kirovskij', 'pervomajskij', 'aeroport'],
		sovetskiy: ['sovetskij', 'pashino', 'kolcovo', 'krasnoobsk'],
		berdsk: ['berdsk'],
	};

	const zones: ZoneGroup[] = [
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
		const priceList = deliveryPrice[range];

		const groupValues = zoneGroups[zoneId];

		if (!groupValues) return '-';

		const total = groupValues
			.map(v => priceList.find(p => p.value === v)?.price)
			.filter((p): p is number => typeof p === 'number');

		if (total.length === 0) return '-';

		return `${Math.max(...total)} ₽`;
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

			<div className="mt-4 lg:mt-6 overflow-hidden">
				<table className="table-auto border border-[#f6f6f6] border-separate border-spacing-0 rounded-xl w-full">
					<thead className="bg-[#f6f6f60e]">
						<tr className="">
							<th className="border-b border-r border-[#f6f6f6] rounded-tl-xl px-4 py-[14px] text-left w-2/3 lg:w-1/3 lg:text-center">Район доставки</th>
							<th className="border-b lg:border-r border-[#f6f6f6] rounded-tr-xl text-center w-1/3 lg:hidden">Цена</th>
							<th className="border-b border-r border-[#f6f6f6] hidden text-center w-1/3 lg:table-cell">10:00 - 19:00 </th>
							<th className="border-b border-[#f6f6f6] hidden text-center w-1/3 lg:table-cell">20:00 - 9:00 </th>
						</tr>
					</thead>
					<tbody>
						{zones.map((zone, idx) => (
							<tr key={zone.id}>
								<td className={`border-b border-r border-[#f6f6f6] px-4 py-2 lg:px-4 lg:py-5 ${idx === zones.length - 1 ? 'border-b-0 border-r' : ''}`}>{zone.label}</td>
								<td className={`border-b lg:border-r lg:border-[#f6f6f6] text-center ${idx === zones.length - 1 ? 'border-b-0' : ''}`}>{renderPrice(zone.id)}</td>
								<td className={`border-b border-[#f6f6f6] hidden text-center lg:table-cell ${idx === zones.length - 1 ? 'border-b-0' : ''}`}>{renderPrice(zone.id, 'night')}</td>
								<td className="hidden"></td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};