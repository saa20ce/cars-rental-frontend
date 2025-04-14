import React from "react";
import { Button, ConfigProvider } from "antd";

export interface Car {
	id: number;
	slug: string;
	acf: {
		white_gallery?: string[];
		black_gallery?: string[];
		gray_gallery?: string[];
		blue_gallery?: string[];
		red_gallery?: string[];
		nazvanie_avto: string;
		"30_dnej": string;
	};
}

interface CarCardProps {
	car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
	const imageUrl =
		car.acf.white_gallery?.[0] ||
		car.acf.black_gallery?.[0] ||
		car.acf.gray_gallery?.[0] ||
		car.acf.blue_gallery?.[0] ||
		car.acf.red_gallery?.[0] ||
		"";

	return (
		<div className="car-card flex flex-col">
			<img
				src={imageUrl}
				alt={car.acf.nazvanie_avto}
				className="w-full h-3/4 object-cover mb-[6px] rounded-3xl"
			/>

			<div className="flex justify-between">
				<div className="w-full">
					<div className="text-lg font-semibold">
						{car.acf.nazvanie_avto}
					</div>
					<div className="text-xl font-semibold text-[#f6f6f6] ">
						{car.acf["30_dnej"]} ₽/сут.
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
						<Button block style={{ height: "40px" }}>
							Оформить
						</Button>
					</ConfigProvider>
				</div>
			</div>
		</div>
	);
};