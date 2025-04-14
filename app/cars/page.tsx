'use client';

import React, { useEffect, useState } from 'react';
import { Car, CarCard } from "@/components/layout/CarCard";
import { Button, ConfigProvider } from "antd";
import { CheckRound, FiltersIcon, SmallCross } from "@/lib/ui/icons";
import { CustomSelect } from "@/lib/ui/common/Select/CustomSelect";
import { fetchTaxonomyOptions } from "@/lib/api/fetchCarTaxonomies";
import "./styles.css";

export const dynamic = 'force-dynamic';

const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_API_URL;

export default function CarsPage() {
	const [klassOptions, setKlassOptions] = useState<Array<{ value: string; label: string }>>([]);
	const [markaOptions, setMarkaOptions] = useState<Array<{ value: string; label: string }>>([]);
	const [kuzovOptions, setKuzovOptions] = useState<Array<{ value: string; label: string }>>([]);
	const [privodOptions, setPrivodOptions] = useState<Array<{ value: string; label: string }>>([]);
	const [dvigatelOptions, setDvigatelOptions] = useState<Array<{ value: string; label: string }>>([]);
	const [colorOptions, setColorOptions] = useState<Array<{ value: string; label: string }>>([]);

	const [advancedVisible, setAdvancedVisible] = useState(false);

	const [cars, setCars] = useState<Car[]>([]);

	useEffect(() => {
		async function loadOptions() {
			const [
				klass,
				marka,
				kuzov,
				privod,
				dvigatel,
				color
			] = await Promise.all([
				fetchTaxonomyOptions('klass'),
				fetchTaxonomyOptions('marka'),
				fetchTaxonomyOptions('kuzov'),
				fetchTaxonomyOptions('privod'),
				fetchTaxonomyOptions('dvigatel'),
				fetchTaxonomyOptions('color')
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

	useEffect(() => {
		async function loadCars() {
			try {
				const res = await fetch(`${WP_BASE_URL}/cars`);
				if (!res.ok) {
					throw new Error("Ошибка при получении списка автомобилей");
				}
				const data: Car[] = await res.json();
				setCars(data);
			} catch (error) {
				console.error(error);
			}
		}
		loadCars();
	}, []);

	return (
		<>
			<div className="bg-[#f6f6f60e] rounded-3xl p-[18px]">
				<h1 className="text-2xl mb-3">Автопарк</h1>
				<div className="grid grid-cols-2 gap-x-[10px] gap-y-[6px] text-sm pb-[14px] border-b-[1px] border-[#f6f6f638]">
					<div className="flex">
						<div className="mr-[7px] mt-[-1px]"><CheckRound /></div> <b>КАСКО</b>&nbsp;и&nbsp;<b>ОСАГО</b>
					</div>

					<div className="flex">
						<div className="mr-[7px] mt-[-1px]"><CheckRound /></div> Обслуженные авто
					</div>

					<div className="flex">
						<div className="mr-[7px] mt-[-1px]"><CheckRound /></div> Большой выбор
					</div>

					<div className="flex">
						<div className="mr-[7px] mt-[-1px]"><CheckRound /></div> Доступные цены
					</div>
				</div>

				<div className="flex flex-col mt-[14px] mb-3 gap-[10px]">
					<CustomSelect
						placeholder="Класс"
						options={klassOptions}
						className="filters-select"
						style={{ width: '100%', height: '44px' }}
					/>

					<CustomSelect
						placeholder="Марка"
						options={markaOptions}
						className="filters-select"
						style={{ width: '100%', height: '44px' }}
					/>

					<CustomSelect
						placeholder="Цена"
						// options={}
						className="filters-select"
						style={{ width: '100%', height: '44px' }}
					/>

					{advancedVisible && (
						<>
							<CustomSelect
								placeholder="Кузов"
								options={kuzovOptions}
								className="filters-select"
								style={{ width: '100%', height: '44px' }}
							/>

							<CustomSelect
								placeholder="Привод"
								options={privodOptions}
								className="filters-select"
								style={{ width: '100%', height: '44px' }}
							/>

							<CustomSelect
								placeholder="Вместимость"
								// options={}
								className="filters-select"
								style={{ width: '100%', height: '44px' }}
							/>

							<CustomSelect
								placeholder="Двигатель"
								options={dvigatelOptions}
								className="filters-select"
								style={{ width: '100%', height: '44px' }}
							/>

							<CustomSelect
								placeholder="Цвет"
								options={colorOptions}
								className="filters-select"
								style={{ width: '100%', height: '44px' }}
							/>
						</>
					)}
				</div>

				<div className="flex justify-between flex-wrap">
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
								},
							},
						}}
					>
						<Button
							icon={<FiltersIcon />}
							ghost
							className="filterButton"
							style={{
								height: '40px',
								width: '124px',
							}}
							onClick={() => setAdvancedVisible(prev => !prev)}
						>Фильтры</Button>

						<Button
							icon={<SmallCross />}
							style={{
								height: '40px',
								background: 'transparent',
								border: '1px solid transparent',
								color: '#f6f6f6'
							}}
						>Очистить фильтры</Button>

						<Button
							style={{
								color: '#f6f6f6',
								height: '40px',
								width: '100%',
								marginTop: '20px',
								background: '#3c6e71',
								border: 'none',
							}}
						>Показать</Button>
					</ConfigProvider>
				</div>
			</div>

			<div className='flex justify-between  mt-6'>
				<span>Показано: 32</span>

				<div className='flex content-center text-sm text-center gap-[14px]'>
					<div className='w-[55px]'>Сначала дороже</div>
					<div className='w-[59px]'>Сначала дешевле</div>
					<div className='w-[73px]'>Сначала со скидкой</div>
				</div>
			</div>

			<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{cars.length > 0 ? (
					cars.map((car) => (
						<CarCard key={car.id} car={car} />
					))
				) : (
					<p>Загрузка...</p>
				)}
			</div>
		</>
	);
}