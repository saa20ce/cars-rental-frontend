'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { CarCard } from '@/components/layout/CarCard';
import type { Car } from '@/lib/types/Car';
import SaleCard from '@/components/common/SaleOffer/SaleCard';
import { Button, ConfigProvider } from 'antd';
import {
	CheckRound,
	FiltersIcon,
	SmallCross,
} from '@/lib/ui/icons';
import { CustomSelect } from '@/lib/ui/common/Select/CustomSelect';
import { fetchTaxonomyOptions } from '@/lib/api/fetchCarTaxonomies';
import './styles.css';

export const dynamic = 'force-dynamic';

const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_API_URL;

export default function CarsPage() {
	// Состояния для опций селектов
	const [klassOptions, setKlassOptions] = useState<Array<{ value: string; label: string }>>([]);
	const [markaOptions, setMarkaOptions] = useState<Array<{ value: string; label: string }>>([]);
	const [kuzovOptions, setKuzovOptions] = useState<Array<{ value: string; label: string }>>([]);
	const [privodOptions, setPrivodOptions] = useState<Array<{ value: string; label: string }>>([]);
	const [dvigatelOptions, setDvigatelOptions] = useState<Array<{ value: string; label: string }>>([]);
	const [colorOptions, setColorOptions] = useState<Array<{ value: string; label: string }>>([]);

	// Состояния для выбранных значений фильтров
	const [selectedKlass, setSelectedKlass] = useState<string>('');
	const [selectedMarka, setSelectedMarka] = useState<string>('');
	const [selectedKuzov, setSelectedKuzov] = useState<string>('');
	const [selectedPrivod, setSelectedPrivod] = useState<string>('');
	const [selectedDvigatel, setSelectedDvigatel] = useState<string>('');
	const [selectedColor, setSelectedColor] = useState<string>('');

	const [advancedVisible, setAdvancedVisible] = useState(false);

	// Состояние для списка постов
	const [cars, setCars] = useState<Car[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	// Загрузка опций таксономий для селектов
	useEffect(() => {
		async function loadOptions() {
			const [
				klass,
				marka,
				kuzov,
				privod,
				dvigatel,
				color,
			] = await Promise.all([
				fetchTaxonomyOptions('klass'),
				fetchTaxonomyOptions('marka'),
				fetchTaxonomyOptions('kuzov'),
				fetchTaxonomyOptions('privod'),
				fetchTaxonomyOptions('dvigatel'),
				fetchTaxonomyOptions('color'),
			]);
			setKlassOptions(klass);
			setMarkaOptions(marka);
			setKuzovOptions(kuzov);
			setPrivodOptions(privod);
			setDvigatelOptions(dvigatel);
			setColorOptions(color);
		}
		loadOptions();
	}, []);

	const loadCars = useCallback(async () => {
		try {
			setLoading(true);
			const queryParams = new URLSearchParams();
			if (selectedKlass) queryParams.append('klass', selectedKlass);
			if (selectedMarka) queryParams.append('marka', selectedMarka);
			if (selectedKuzov) queryParams.append('kuzov', selectedKuzov);
			if (selectedPrivod) queryParams.append('privod', selectedPrivod);
			if (selectedDvigatel) queryParams.append('dvigatel', selectedDvigatel);
			if (selectedColor) queryParams.append('color', selectedColor);

			queryParams.append('per_page', '100');

			const url = `${WP_BASE_URL}/cars${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
			const res = await fetch(url);
			if (!res.ok) {
				throw new Error('Ошибка при получении списка автомобилей');
			}
			const data: Car[] = await res.json();
			setCars(data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, [selectedKlass, selectedMarka, selectedKuzov, selectedPrivod, selectedDvigatel, selectedColor, WP_BASE_URL]);

	// Начальная загрузка автомобилей без фильтров
	useEffect(() => {
		loadCars();
	}, [loadCars]);

	useEffect(() => {
		if (
			!selectedKlass &&
			!selectedMarka &&
			!selectedKuzov &&
			!selectedPrivod &&
			!selectedDvigatel &&
			!selectedColor
		) {
			loadCars();
		}
	}, [selectedKlass, selectedMarka, selectedKuzov, selectedPrivod, selectedDvigatel, selectedColor, loadCars]);


	return (
		<>
			<div className="bg-[#f6f6f60e] rounded-3xl p-[18px] lg:p-7">
				<h1 className="text-2xl mb-3 lg:text-4xl lg:font-bold lg:mb-6">Автопарк</h1>
				<div className='hidden lg:block text-xl max-w-[810px] mb-5'>Мы гордимся своим обновляемым автопарком, который всегда находится в  отличном состоянии и готов предоставить вам максимальный комфорт во  время поездки.</div>
				<div className="grid grid-cols-2 gap-x-[10px] gap-y-[6px] text-sm pb-[14px] border-b-[1px] border-[#f6f6f638] lg:flex lg:justify-between lg:text-xl">
					<div className="flex">
						<div className="mr-[7px] mt-[-1px]">
							<CheckRound />
						</div>{" "}
						<span className="hidden lg:block">Страховка&nbsp;</span><b>КАСКО</b>&nbsp;и&nbsp;<b>ОСАГО</b>
					</div>

					<div className="flex">
						<div className="mr-[7px] mt-[-1px]">
							<CheckRound />
						</div>{" "}
						Обслуженные авто
					</div>

					<div className="flex">
						<div className="mr-[7px] mt-[-1px]">
							<CheckRound />
						</div>{" "}
						Большой выбор
					</div>

					<div className="flex">
						<div className="mr-[7px] mt-[-1px]">
							<CheckRound />
						</div>{" "}
						Доступные цены
					</div>

					<div className="hidden lg:flex">
						<div className="mr-[7px] mt-[-1px]">
							<CheckRound />
						</div>{" "}
						Без скрытых платежей
					</div>
				</div>

				<div className='mb-4'>
					<div className="flex flex-col mt-[14px] mb-3 gap-[10px] lg:flex-row lg:gap-0">
						<div className='select-group flex flex-col gap-[10px] lg:flex-row lg:w-3/5 lg:gap-0'>
							<CustomSelect
								placeholder="Класс"
								options={klassOptions}
								className="filters-select"
								style={{ width: '100%', height: '44px' }}
								onChange={(value) => setSelectedKlass(value as string)}
								value={selectedKlass || undefined}
							/>

							<CustomSelect
								placeholder="Марка"
								options={markaOptions}
								className="filters-select"
								style={{ width: '100%', height: '44px' }}
								onChange={(value) => setSelectedMarka(value as string)}
								value={selectedMarka || undefined}
							/>

							<CustomSelect
								placeholder="Цена"
								// Если нужен фильтр по цене, можно добавить состояние и обработчик
								className="filters-select"
								style={{ width: '100%', height: '44px' }}
							/>
						</div>


						<div className='hidden lg:flex lg:w-2/5 lg:pl-3'>
							<Button
								style={{
									color: '#f6f6f6',
									height: '44px',
									width: '100%',
									background: '#3c6e71',
									border: 'none',
									borderRadius: '12px',
								}}
								onClick={loadCars}
							>
								Показать
							</Button>
						</div>
					</div>

					{advancedVisible && (
						<>
							<div className='select-group flex flex-col gap-[10px] lg:flex-row lg:gap-0'>
								<CustomSelect
									placeholder="Кузов"
									options={kuzovOptions}
									className="filters-select"
									style={{ width: '100%', height: '44px' }}
									onChange={(value) => setSelectedKuzov(value as string)}
									value={selectedKuzov || undefined}
								/>

								<CustomSelect
									placeholder="Привод"
									options={privodOptions}
									className="filters-select"
									style={{ width: '100%', height: '44px' }}
									onChange={(value) => setSelectedPrivod(value as string)}
									value={selectedPrivod || undefined}
								/>

								<CustomSelect
									placeholder="Вместимость"
									// Добавьте состояние, если потребуется
									className="filters-select"
									style={{ width: '100%', height: '44px' }}
								/>

								<CustomSelect
									placeholder="Двигатель"
									options={dvigatelOptions}
									className="filters-select"
									style={{ width: '100%', height: '44px' }}
									onChange={(value) => setSelectedDvigatel(value as string)}
									value={selectedDvigatel || undefined}
								/>

								<CustomSelect
									placeholder="Цвет"
									options={colorOptions}
									className="filters-select"
									style={{ width: '100%', height: '44px' }}
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
									borderRadius: 8,
								},
							},
						}}
					>
						<Button
							icon={<FiltersIcon />}
							ghost
							className="filterButton"
							style={{ height: '40px', width: '124px' }}
							onClick={() => setAdvancedVisible(prev => !prev)}
						>
							Фильтры
						</Button>

						<Button
							icon={<SmallCross />}
							style={{
								height: '40px',
								background: 'transparent',
								border: '1px solid transparent',
								color: '#f6f6f6'
							}}
							onClick={() => {
								// Сбрасываем состояния фильтров и скрываем дополнительные
								setSelectedKlass('');
								setSelectedMarka('');
								setSelectedKuzov('');
								setSelectedPrivod('');
								setSelectedDvigatel('');
								setSelectedColor('');
								setAdvancedVisible(false);
								// loadCars вызовется внутри useEffect, когда все фильтры будут пустыми
							}}
						>
							Очистить фильтры
						</Button>

						{/* При нажатии на кнопку "Показать" запускается функция загрузки постов с фильтрами */}
						<div className='block lg:hidden w-full'>
							<Button
								style={{
									color: '#f6f6f6',
									height: '40px',
									width: '100%',
									marginTop: '20px',
									background: '#3c6e71',
									border: 'none',
								}}
								onClick={loadCars}
							>
								Показать
							</Button>
						</div>
					</ConfigProvider>
				</div>
			</div>

			<div className="flex justify-between mt-6">
				<span className="lg:text-xl font-bold tracking-wide">Показано: {cars.length}</span>
				<div className="flex items-center text-sm gap-[14px] lg:text-nowrap lg:text-lg lg:font-bold">
					<div className="w-[55px] lg:w-full">Сначала дороже</div>
					<div className="w-[59px] lg:w-full">Сначала дешевле</div>
					<div className="w-[73px] lg:w-full">Сначала со скидкой</div>
				</div>
			</div>

			<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
				{loading ? (
					<p>Загрузка...</p>
				) : cars.length > 0 ? (
					cars.map((car, index) => (
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
		</>
	);
}
