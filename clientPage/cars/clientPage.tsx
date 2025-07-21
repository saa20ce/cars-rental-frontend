'use client';

import React, { useState } from 'react';
import type { Car, DeliveryPrice } from '@/lib/types/Car';
import { Button, ConfigProvider } from 'antd';
import { CarCard } from '@/components/common/Cards/CarCard';
import { SaleCard } from '@/components/common/Cards/SaleCard';
import { WhyUs } from '@/components/common/Cards/WhyUs';
import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';
import { RentSteps } from '@/components/common/Steps/RentSteps';
import { DeliveryPriceTable } from '@/components/common/Table/DeliveryPriceTable';
import { CustomSelect } from '@/lib/ui/common/Select/CustomSelect';
import { CheckRound, FiltersIcon, SmallCross } from '@/lib/ui/icons';

interface CarsPageClientProps {
	cars: Car[];
	klassOptions: Array<{ value: string; label: string }>;
	markaOptions: Array<{ value: string; label: string }>;
	kuzovOptions: Array<{ value: string; label: string }>;
	privodOptions: Array<{ value: string; label: string }>;
	dvigatelOptions: Array<{ value: string; label: string }>;
	colorOptions: Array<{ value: string; label: string }>;
	deliveryPrice: DeliveryPrice | null;
}

export default function CarsPageClient({
	cars: initialCars,
	klassOptions,
	markaOptions,
	kuzovOptions,
	privodOptions,
	dvigatelOptions,
	colorOptions,
	deliveryPrice,
}: CarsPageClientProps) {
	const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

	const handleSortDesc = () => setSortOrder('desc');
	const handleSortAsc = () => setSortOrder('asc');

	const [selectedKlass, setSelectedKlass] = useState('');
	const [selectedMarka, setSelectedMarka] = useState('');
	const [selectedKuzov, setSelectedKuzov] = useState('');
	const [selectedPrivod, setSelectedPrivod] = useState('');
	const [selectedDvigatel, setSelectedDvigatel] = useState('');
	const [selectedColor, setSelectedColor] = useState('');
	const [advancedVisible, setAdvancedVisible] = useState(false);
	const [selectedPriceRange, setSelectedPriceRange] = useState('');
	const [selectedPassengers, setSelectedPassangers] = useState('');

	const handleReset = () => {
		setSelectedKlass('');
		setSelectedMarka('');
		setSelectedKuzov('');
		setSelectedPrivod('');
		setSelectedDvigatel('');
		setSelectedColor('');
		setSelectedPriceRange('');
		setSelectedPassangers('');
		setAdvancedVisible(false);
	};

	const filteredCars = initialCars.filter((car) => {
		const klassMatch = selectedKlass
			? car.klass?.includes(Number(selectedKlass))
			: true;
		const markaMatch = selectedMarka
			? car.marka?.includes(Number(selectedMarka))
			: true;
		const kuzovMatch = selectedKuzov
			? car.kuzov?.includes(Number(selectedKuzov))
			: true;
		const privodMatch = selectedPrivod
			? car.privod?.includes(Number(selectedPrivod))
			: true;
		const dvigatelMatch = selectedDvigatel
			? car.dvigatel?.includes(Number(selectedDvigatel))
			: true;
		const colorMatch = selectedColor
			? car.color?.includes(Number(selectedColor))
			: true;

		const price = parseInt(car.acf?.['30_dnej'] || '0', 10);
		const passengeres = parseInt(car.acf?.passengers || '0', 10);

		let priceMatch = true;
		if (selectedPriceRange === 'lt4000') priceMatch = price < 4000;
		else if (selectedPriceRange === '4000-6000')
			priceMatch = price >= 4000 && price <= 6000;
		else if (selectedPriceRange === '6000-10000')
			priceMatch = price >= 6000 && price <= 10000;
		else if (selectedPriceRange === 'gt10000') priceMatch = price > 10000;

		let passengerMatch = true;
		if (selectedPassengers === '4') passengerMatch = passengeres === 4;
		else if (selectedPassengers === '7') passengerMatch = passengeres === 7;
		else if (selectedPassengers === '8+') passengerMatch = passengeres >= 8;

		return (
			klassMatch &&
			markaMatch &&
			kuzovMatch &&
			privodMatch &&
			dvigatelMatch &&
			colorMatch &&
			priceMatch &&
			passengerMatch
		);
	});

	const sortedCars = [...filteredCars].sort((a: Car, b: Car) => {
		const priceA = parseInt(a.acf?.['30_dnej'] || '0', 10);
		const priceB = parseInt(b.acf?.['30_dnej'] || '0', 10);
		return sortOrder === 'desc' ? priceB - priceA : priceA - priceB;
	});

	return (
		<>
			<div className="bg-[#f6f6f60e] rounded-3xl px-6 py-[28px] lg:py-[38px] lg:px-9">
				<div className="flex flex-col lg:flex-row lg:justify-between pb-6 lg:pb-8 border-b-[1px] border-[#f6f6f638] ">
					<div className="w-full max-w-[610px]">
						<h1 className="text-[20px]/[28px] lg:text-[24px]/[32 px] font-bold mb-4 lg:mb-5">
							Автопарк
						</h1>
						<p className="hidden lg:block text-[18px]/[28px] font-medium">
							Мы гордимся своим обновляемым автопарком, который всегда находится
							в отличном состоянии и готов предоставить вам максимальный комфорт
							во время поездки.
						</p>
					</div>
					<div className="grid grid-cols-[max-content,max-content] lg:grid-cols-2 gap-x-[10px] gap-y-[6px] lg:gap-y-[22px] lg:gap-x-5 text-[14px]/[20px] lg:text-[16px]/[24px] font-semibold lg:font-bold lg:self-end lg:min-w-[383px]">
						<div className="flex font-extrabold  gap-[6px] lg:gap-3 tracking-[1px]">
							<div>
								<CheckRound />
							</div>
							<span>КАСКО / ОСАГО</span>
						</div>
						<div className="flex gap-[6px] lg:gap-3">
							<div>
								<CheckRound />
							</div>{' '}
							Доступные цены
						</div>
						<div className="flex gap-[6px] lg:gap-3">
							<div>
								<CheckRound />
							</div>{' '}
							Обслуженные авто
						</div>
						<div className="flex gap-[6px] lg:gap-3">
							<div>
								<CheckRound />
							</div>{' '}
							Большой выбор
						</div>
					</div>
				</div>

				<div className="mb-4 mt-6 lg:mt-8">
					<div className="flex flex-col mt-[14px] mb-3 gap-[10px] lg:flex-row lg:gap-0">
						<div className="select-group flex flex-col gap-[10px] lg:flex-row lg:w-3/5 lg:gap-0">
							<CustomSelect
								placeholder="Класс"
								options={klassOptions}
								className="filters-select"
								style={{ width: '100%' }}
								onChange={(value) => setSelectedKlass(value as string)}
								value={selectedKlass || undefined}
							/>
							<CustomSelect
								placeholder="Марка"
								options={markaOptions}
								className="filters-select"
								style={{ width: '100%' }}
								onChange={(value) => setSelectedMarka(value as string)}
								value={selectedMarka || undefined}
							/>
							<CustomSelect
								placeholder="Цена"
								options={[
									{ value: 'lt4000', label: 'до 4000' },
									{ value: '4000-6000', label: '4000-6000' },
									{ value: '6000-10000', label: '6000-10000' },
									{ value: 'gt10000', label: 'от 10000' },
								]}
								className="filters-select"
								style={{ width: '100%' }}
								onChange={(value) => setSelectedPriceRange(value as string)}
								value={selectedPriceRange || undefined}
							/>
						</div>
						<div className="hidden lg:flex lg:w-2/5 lg:pl-3 mt-0">
							<Button
								style={{
									color: '#f6f6f6',
									height: '44px',
									width: '100%',
									background: '#3c6e71',
									border: 'none',
									borderRadius: '12px',
								}}
								onClick={handleReset}
							>
								Показать
							</Button>
						</div>
					</div>
					{advancedVisible && (
						<>
							<div className="select-group flex flex-col gap-[10px] lg:flex-row lg:gap-0">
								<CustomSelect
									placeholder="Кузов"
									options={kuzovOptions}
									className="filters-select"
									style={{ width: '100%' }}
									onChange={(value) => setSelectedKuzov(value as string)}
									value={selectedKuzov || undefined}
								/>
								<CustomSelect
									placeholder="Привод"
									options={privodOptions}
									className="filters-select"
									style={{ width: '100%' }}
									onChange={(value) => setSelectedPrivod(value as string)}
									value={selectedPrivod || undefined}
								/>
								<CustomSelect
									placeholder="Вместимость"
									options={[
										{ value: '4', label: '4 пассажира' },
										{ value: '7', label: '7 пассажиров' },
										{ value: '8+', label: '8+ пассажиров' },
									]}
									className="filters-select"
									style={{ width: '100%' }}
									onChange={(value) => setSelectedPassangers(value as string)}
									value={selectedPassengers || undefined}
								/>
								<CustomSelect
									placeholder="Двигатель"
									options={dvigatelOptions}
									className="filters-select"
									style={{ width: '100%' }}
									onChange={(value) => setSelectedDvigatel(value as string)}
									value={selectedDvigatel || undefined}
								/>
								<CustomSelect
									placeholder="Цвет"
									options={colorOptions}
									className="filters-select"
									style={{ width: '100%' }}
									onChange={(value) => setSelectedColor(value as string)}
									value={selectedColor || undefined}
								/>
							</div>
						</>
					)}
				</div>

				<div className="flex justify-between flex-wrap lg:justify-start lg:gap-3">
					<ConfigProvider
						theme={{
							components: {
								Button: {
									contentFontSize: 16,
									paddingInline: 12,
									defaultHoverBorderColor: '#f6f6f6',
									defaultHoverColor: '#f6f6f6',
									defaultActiveBorderColor: '#f6f6f6',
									defaultActiveColor: '#f6f6f6',
									borderRadius: 12,
								},
							},
						}}
					>
						<Button
							icon={<FiltersIcon />}
							ghost
							className="filterButton"
							style={{ height: '40px', width: '124px' }}
							onClick={() => setAdvancedVisible((prev) => !prev)}
						>
							Фильтры
						</Button>
						<Button
							icon={<SmallCross />}
							style={{
								height: '40px',
								background: 'transparent',
								border: '1px solid transparent',
								color: '#f6f6f6',
							}}
							onClick={handleReset}
						>
							Очистить фильтры
						</Button>
						<div className="block lg:hidden w-full">
							<Button
								style={{
									color: '#f6f6f6',
									height: '40px',
									width: '100%',
									marginTop: '20px',
									background: '#3c6e71',
									border: 'none',
								}}
								onClick={handleReset}
							>
								Показать
							</Button>
						</div>
					</ConfigProvider>
				</div>
			</div>

			<div className="flex justify-between items-end mt-6">

				<span className="lg:text-xl font-bold tracking-wide">
					Показано: {sortedCars.length}
				</span>
				<div className={`flex items-center gap-[14px] font-bold text-[14px]/[20px] lg:text-[18px]/[28px] text-[#F6F6F633]`}>
					<button
						onClick={handleSortDesc}
						className={`${sortOrder === 'desc' ? 'text-[#F6F6F6]' : ''} max-w-[57px] lg:max-w-none text-center`}
					>
						Сначала дороже
					</button>
					<button
						onClick={handleSortAsc}
						className={`${sortOrder === 'asc' ? 'text-[#F6F6F6]' : ''} max-w-[57px] lg:max-w-none text-center`}
					>
						Сначала дешевле
					</button>
					<div className="max-w-[76px] lg:max-w-none text-center">Сначала со скидкой</div>
				</div>
			</div>

			<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
				{sortedCars.length > 0 ? (
					sortedCars.map((car, index) => (
						<React.Fragment key={car.id}>
							{index === 3 && (
								<div className="block lg:hidden">
									<SaleCard />
								</div>
							)}
							<CarCard car={car} />
						</React.Fragment>
					))
				) : (
					<p>Ничего не найдено</p>
				)}
			</div>
			<div className="mx-[-16px] mt-[42px] lg:mt-[68px]">
				<RentSteps />
			</div>
			<div className=" w-full border-t-2 border-[#284B63B2] h-[1px] my-10 lg:hidden"></div>
			<div>
				<DeliveryPriceTable deliveryPrice={deliveryPrice} />
			</div>

			<div className=" w-full border-t-2 border-[#284B63B2] h-[1px] my-10 lg:my-[68px]"></div>

			<div>
				<WhyUs />
			</div>
			<div>
				<HaveQuestions />
			</div>
		</>
	);
}
