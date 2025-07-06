import React from 'react';
import Link from 'next/link';
import { Button, ConfigProvider } from 'antd';
import type { Car as LibCar, CarACF } from '@/lib/types/Car';
import { ChevronDownIcon } from '@/lib/ui/icons';

interface CarTariffsCardProps {
	car: LibCar;
	pricePerDay: number;
	totalPrice: number;
	openId: number | null;
	onToggle: (id: number) => void;
}

export const CarTariffsCard: React.FC<CarTariffsCardProps> = ({
	car,
	pricePerDay,
	totalPrice,
	openId,
	onToggle,
}) => {

	const acf: CarACF = car.acf ?? { nazvanie_avto: '', '30_dnej': '' };
	const imageUrl =
		acf.white_gallery?.[0] ||
		acf.black_gallery?.[0] ||
		acf.gray_gallery?.[0] ||
		acf.blue_gallery?.[0] ||
		acf.red_gallery?.[0] ||
		'';

	const carLink = `/cars/${car.slug}`;

	const headerRow = (
		<div
			className="flex items-center bg-[#f6f6f638] rounded-2xl justify-between py-3 px-4 cursor-pointer"
			onClick={() => onToggle(car.id)}
		>
			<Link href={carLink} passHref>
				<div className="text-xs font-semibold text-[#f6f6f6]">{acf.nazvanie_avto}</div>
			</Link>
			<div className='flex flex-row items-center w-[144px] h-4'>
				<div className="text-xs font-semibold text-[#f6f6f6] w-1/2">
					{pricePerDay.toLocaleString()} ₽
				</div>

				<div className="text-xs font-semibold text-[#f6f6f6] w-[calc(50%-12px)]">
					{totalPrice.toLocaleString()} ₽
				</div>

				<div className='mt-[-3px]'>
					<ChevronDownIcon className='w-[12px] h-[9px]' active={true} />
				</div>
			</div>
		</div>
	);

	if (openId === car.id) {
		return (
			<div className="car-card flex flex-col rounded-2xl ">
				<div className='flex flex-wrap items-center bg-[#f6f6f638] rounded-t-2xl justify-between pb-[10px] pt-3 px-4'>
					<Link href={carLink} passHref>
						<div className="text-xs font-semibold text-[#f6f6f6]">{acf.nazvanie_avto}</div>
					</Link>
					<div className='flex flex-row items-center w-[144px] h-4'>
						<div className="text-xs font-semibold text-[#f6f6f6] w-1/2">
							{pricePerDay.toLocaleString()} ₽
						</div>

						<div className="text-xs font-semibold text-[#f6f6f6] w-[calc(50%-12px)]">
							{totalPrice.toLocaleString()} ₽
						</div>

						<div className='mt-[-3px]'>
							<ChevronDownIcon className='w-[12px] h-[9px]' active={true} />
						</div>
					</div>
				</div>

				<div className="flex flex-row gap-5 justify-between h-[124px] p-4 bg-[#f6f6f60e] rounded-b-2xl lg:pb-[26px] lg:px-[26px]">
					<Link href={carLink} passHref className="contents">
						<img
							src={imageUrl}
							alt={acf.nazvanie_avto}
							className="w-48 h-23 object-cover rounded-2xl lg:max-h-[252px] lg:mb-4"
						/>
					</Link>
					<div className="flex flex-col justify-between lg:justify-end min-w-[123px]">
						<ConfigProvider
							theme={{
								components: {
									Button: {
										defaultBg: '#f6f6f60e',
										defaultBorderColor: 'transparent',
										defaultColor: '#f6f6f6',
										contentFontSize: 16,
										controlHeight: 42,
										textHoverBg: '#f6f6f6',
										colorPrimaryHover: '#f6f6f6',
										colorBorderSecondary: '#f6f6f60e',
										colorBorderBg: '#f6f6f60e',
										colorBgContainer: '#3c6e71',
										colorPrimaryBorderHover: '#f6f6f60e',
										defaultHoverBorderColor: '#f6f6f60e',
										defaultActiveBorderColor: '#f6f6f60e',
										defaultActiveColor: '#f6f6f6',
										colorBorder: '#f6f6f60e',
										colorBgTextActive: '#3c6e71',
										borderRadius: 12,
									},
								},
							}}
						>
							<Button block style={{ height: '40px', }}>
								<span className='mt-[-1px]'>Подробнее</span>
							</Button>
						</ConfigProvider>

						<ConfigProvider
							theme={{
								components: {
									Button: {
										defaultBg: '#3c6e71',
										defaultBorderColor: '#3c6e71',
										defaultColor: '#f6f6f6',
										contentFontSize: 16,
										controlHeight: 42,
										textHoverBg: '#f6f6f6',
										colorPrimaryHover: '#f6f6f6',
										colorBorderSecondary: '#3c6e71',
										colorBorderBg: '#3c6e71',
										colorBgContainer: '#3c6e71',
										colorPrimaryBorderHover: '#3c6e71',
										defaultHoverBorderColor: '#3c6e71',
										defaultActiveBorderColor: '#3c6e71',
										defaultActiveColor: '#f6f6f6',
										colorBorder: '#3c6e71',
										colorBgTextActive: '#3c6e71',
										borderRadius: 12,
									},
								},
							}}
						>
							<Button block style={{ height: '40px', }}>
								<span className='mt-[-1px]'>Арендовать</span>
							</Button>
						</ConfigProvider>
					</div>
				</div>
			</div>
		);
	};

	return headerRow;
};