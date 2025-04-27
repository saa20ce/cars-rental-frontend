'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import type { CarouselProps } from 'antd';
import { CarCard } from '@/components/layout/CarCard';
import type { Car } from '@/lib/types/Car';
import { ArrowRightLinkIcon } from '@/lib/ui/icons';

interface SimilarCarsProps {
	car: Car;
	// опционально: сколько показывать слайдов за раз
	slidesToShow?: number;
}

export const SimilarCars: React.FC<SimilarCarsProps> = ({
	car,
	slidesToShow = 3,
}) => {
	const [similarCars, setSimilarCars] = useState<Car[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_API_URL;

	useEffect(() => {
		async function fetchSimilar() {
			setLoading(true);
			// берём первый ID терма марки (или замените таксономию на нужную)
			const markaIds = (car.marka as number[]) || [];
			if (markaIds.length === 0) {
				setSimilarCars([]);
				setLoading(false);
				return;
			}
			const markaId = markaIds[0];
			// запрашиваем 5 машин той же марки, исключая текущую
			const res = await fetch(
				`${WP_BASE_URL}/cars?marka=${markaId}&per_page=5`
			);
			if (!res.ok) {
				console.error('Ошибка при загрузке похожих авто', res.status);
				setSimilarCars([]);
				setLoading(false);
				return;
			}
			let data: Car[] = await res.json();
			data = data.filter((c) => c.id !== car.id);
			setSimilarCars(data);
			setLoading(false);
		}

		fetchSimilar();
	}, [car, WP_BASE_URL]);

	if (loading || similarCars.length === 0) {
		return null; // или <p>Загрузка похожих...</p>
	}

	// Настройки карусели
	const carouselSettings: CarouselProps = {
		dots: false,
		slidesToShow,
		slidesToScroll: 1,
		responsive: [
			{ breakpoint: 1024, settings: { slidesToShow: Math.min(2, slidesToShow) } },
			{ breakpoint: 600, settings: { slidesToShow: 1 } },
		],
		arrows: true,
	};

	return (
		<div className="py-7 mt-8 bg-[#f6f6f60e] mx-[-16px] rounded-2xl lg:px-0">
			<div className="text-xl font-bold pb-5 ml-4">Похожие авто</div>
			{/* <ConfigProvider theme={{ components: { Carousel: { arrowSize: 24 } } }}>
				<Carousel {...carouselSettings}> */}
			<div className='flex overflow-auto no-scrollbar whitespace-nowrap pl-2'>
				{similarCars.map((c) => (
					<div key={c.id} className="px-2">
						<CarCard car={c} />
					</div>
				))}
			</div>
			{/* </Carousel>
			</ConfigProvider> */}
			<div className='px-4'>
				<Button
					ghost
					className="filterButton"
					icon={<div className='mt-[-5px]'>< ArrowRightLinkIcon /></div>}
					iconPosition="end"
					style={{ height: '40px', width: '100%', marginTop: 32, fontSize: '16px', borderRadius: '8px' }}
				>
					<span className='mt-[-1px]'>Все бизнес</span>
				</Button>
			</div>
		</div >
	);
};
