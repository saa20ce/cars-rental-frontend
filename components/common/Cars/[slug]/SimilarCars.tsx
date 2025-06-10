'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Button, Carousel, ConfigProvider } from 'antd';
import { CarCard } from '@/components/layout/CarCard';
import type { Car } from '@/lib/types/Car';
import { ArrowLeftIcon, ArrowRightIcon, ArrowRightLinkIcon } from '@/lib/ui/icons';

interface SimilarCarsProps {
	similarCars: Car[];
}

export const SimilarCars: React.FC<SimilarCarsProps> = ({
	similarCars,
}) => {
	const scrollRef = useRef<HTMLDivElement>(null);

	const goNext = () => {
		const container = scrollRef.current;
		if (!container) return;

		const step = container.clientWidth;
		container.scrollBy({ left: step, behavior: 'smooth' });
	};

	const goPrev = () => {
		const container = scrollRef.current;
		if (!container) return;

		const step = container.clientWidth;
		container.scrollBy({ left: -step, behavior: 'smooth' });
	};

	return (
		<div className="py-7 mt-8 mx-[-16px] lg:py-[65px]">
			<div className="flex flew-row justify-between pb-6">
				<div className="text-xl font-bold ml-4 lg:text-3xl">Похожие авто:</div>
				<div className='hidden lg:flex flex-row px-4 gap-4'>
					<div className='flex flex-row gap-3'>
						<ConfigProvider
							theme={{
								components: {
									Button: {
										defaultBg: '#f6f6f60e',
										defaultBorderColor: 'transparent',
										defaultColor: '#f6f6f6',
										textHoverBg: '#f6f6f6',
										colorPrimaryHover: '#f6f6f6',
										colorBorderSecondary: 'transparent',
										colorBorderBg: '#f6f6f60e',
										colorBgContainer: '#f6f6f60e',
										colorPrimaryBorderHover: 'transparent',
										defaultHoverBorderColor: 'transparent',
										defaultActiveBorderColor: 'transparent',
										defaultActiveColor: '#f6f6f6',
										colorBorder: 'transparent',
										colorBgTextActive: '#f6f6f60e',
									},
								},
							}}
						>
							<Button
								onClick={goPrev}
								icon={<ArrowLeftIcon className='w-[17px] h-[24px] mt-[4px]' />}
								style={{ height: '44px', width: '44px', fontSize: '16px', borderRadius: '8px' }}

							/>
							<Button
								onClick={goNext}
								icon={<ArrowRightIcon className='w-[17px] h-[24px] mt-[4px]' />}
								style={{ height: '44px', width: '44px', fontSize: '16px', borderRadius: '8px' }}
							/>
						</ConfigProvider>
					</div>
					<ConfigProvider
						theme={{
							components: {
								Button: {
									textHoverBg: '#f6f6f6',
									colorPrimaryHover: '#f6f6f6',
									colorPrimaryBorderHover: 'f6f6f6',
									defaultHoverBorderColor: 'f6f6f6',
									defaultActiveBorderColor: 'f6f6f6',
									defaultActiveColor: '#f6f6f6',
									colorBorder: 'transparent',
								},
							},
						}}
					>
						<Button
							ghost
							className="filterButton"
							icon={<div className='mt-[-3px]'>< ArrowRightLinkIcon /></div>}
							iconPosition="end"
							style={{ height: '44px', width: '260px', fontSize: '16px', borderRadius: '16px' }}
						>
							<span className='mt-[-1px]'>Все бизнес</span>
						</Button>
					</ConfigProvider>
				</div>
			</div>
			<div className='flex pb-5'>
				<div
					ref={scrollRef}
					className="flex overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 pb-5"
				>
					{similarCars.map((c) => (
						<div key={c.id} className="min-w-full px-4 lg:min-w-[436px] lg:first:pl-0">
							<CarCard car={c} />
						</div>
					))}
				</div>
			</div>
		</div >
	);
};
