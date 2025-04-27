import React from 'react';
import Link from 'next/link';
import { Button, ConfigProvider } from 'antd';
import type { Car as LibCar, CarACF } from '@/lib/types/Car';

interface CarCardProps {
	car: LibCar;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
	const acf: CarACF = car.acf ?? { nazvanie_avto: '', '30_dnej': '' };

	const imageUrl =
		acf.white_gallery?.[0] ||
		acf.black_gallery?.[0] ||
		acf.gray_gallery?.[0] ||
		acf.blue_gallery?.[0] ||
		acf.red_gallery?.[0] ||
		'';

	const carLink = `/cars/${car.slug}`;

	return (
		<div className="car-card flex flex-col">
			<Link href={carLink} passHref className="contents">
				<img
					src={imageUrl}
					alt={acf.nazvanie_avto}
					className="w-full min-w-[310px] h-3/4 max-h-[207px] object-cover mb-[6px] rounded-3xl lg:max-h-[252px]"
				/>
			</Link>

			<div className="flex justify-between">
				<div className="w-full">
					<Link href={carLink} passHref>
						<div className="text-lg font-semibold text-[#f6f6f6]">{acf.nazvanie_avto}</div>
					</Link>
					<div className="text-xl font-semibold text-[#f6f6f6] ">
						{acf['30_dnej']} ₽/сут.
					</div>
				</div>

				<div className="flex flex-col justify-center w-[103px]">
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
								},
							},
						}}
					>
						<Button block style={{ height: '40px' }}>
							Оформить
						</Button>
					</ConfigProvider>
				</div>
			</div>
		</div>
	);
};