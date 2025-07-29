'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type { Car, DeliveryPrice, SeasonData } from '@/lib/types/Car';
import type { GetProps } from 'antd';
import {
    // isDaySeason,
    computeCostsChunked,
} from '@/lib/helpers/RentalCheckoutHelper';
import { buildPriceRangesFromACF } from '@/lib/api/fetchCarData';
import { DatePicker } from 'antd';
import { CarTariffsCard } from '@/components/common/Cards/CarTariffsCard';
import { SaleCard } from '@/components/common/Cards/SaleCard';
import { WhyUs } from '@/components/common/Cards/WhyUs';
import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';
import { RentSteps } from '@/components/common/Steps/RentSteps';
import { DeliveryPriceTable } from '@/components/common/Table/DeliveryPriceTable';
import { CustomSelect } from '@/lib/ui/common/Select/CustomSelect';
import { CustomDatePicker } from '@/lib/ui/common/DatePicker/CustomDatePicker';
import { CheckRound, FiltersIcon, SmallCross } from '@/lib/ui/icons';
import CustomButton from '@/lib/ui/common/Button';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

interface TariffsPageClientProps {
    cars: Car[];
    klassOptions: Array<{ value: string; label: string }>;
    markaOptions: Array<{ value: string; label: string }>;
    kuzovOptions: Array<{ value: string; label: string }>;
    privodOptions: Array<{ value: string; label: string }>;
    dvigatelOptions: Array<{ value: string; label: string }>;
    colorOptions: Array<{ value: string; label: string }>;
    deliveryPrice: DeliveryPrice | null;
    seasonDates: SeasonData | null;
}

const disabledDateStart: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().startOf('day');
};

const disabledDateFinish: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().endOf('day');
};

export default function TariffsPageClient({
    cars: initialCars,
    klassOptions,
    markaOptions,
    kuzovOptions,
    privodOptions,
    dvigatelOptions,
    colorOptions,
    deliveryPrice,
    seasonDates,
}: TariffsPageClientProps) {
    const today = useMemo(() => dayjs(), []);

    const [cars, setCars] = useState<Car[]>(initialCars);
    const [loading, setLoading] = useState(false);
    const [costsMap, setCostsMap] = useState<
        Record<number, { pricePerDay: number; totalPrice: number }>
    >({});

    const [isChainActive, setIsChainActive] = useState(false);
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
    const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
    const [isReturnDateOpen, setIsReturnDateOpen] = useState(false);

    const [selectedKlass, setSelectedKlass] = useState('');
    const [selectedMarka, setSelectedMarka] = useState('');
    const [selectedKuzov, setSelectedKuzov] = useState('');
    const [selectedPrivod, setSelectedPrivod] = useState('');
    const [selectedDvigatel, setSelectedDvigatel] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [advancedVisible, setAdvancedVisible] = useState(false);
    const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
        null,
    );
    const [openId, setOpenId] = useState<number | null>(null);

    const priceRanges = [
        { label: 'До 4000', min: null, max: 4000 },
        { label: '4000–6000', min: 4000, max: 6000 },
        { label: '6000–10000', min: 6000, max: 10000 },
        { label: 'От 10000', min: 10000, max: null },
    ];
    console.log(cars);
    

    const filterByPriceRange = (cars: Car[], selectedLabel: string | null) => {
        if (!selectedLabel) return cars;

        const range = priceRanges.find((r) => r.label === selectedLabel);
        if (!range) return cars;

        return cars.filter((car) => {
            const price = Number(car.acf?.['1-3_dnya'] ?? 0);
            if (price === 0) return false;

            if (range.min !== null && price < range.min) return false;
            if (range.max !== null && price > range.max) return false;

            return true;
        });
    };

    useEffect(() => {
        if (!startDate || !returnDate) {
            setCostsMap({});
            return;
        }
        const m: typeof costsMap = {};
        cars.forEach((car) => {
            const priceRanges = buildPriceRangesFromACF(car.acf || {});
            const costs = computeCostsChunked(
                startDate,
                returnDate,
                priceRanges,
                seasonDates,
            );
            const total = costs.reduce((a, b) => a + b, 0);
            m[car.id] = { pricePerDay: costs[0] ?? 0, totalPrice: total };
        });
        setCostsMap(m);
    }, [startDate, returnDate, cars, seasonDates]);

    const timeOptions = Array.from({ length: 24 }, (_, i) => {
        const hour = i.toString().padStart(2, '0');
        return { value: `${hour}:00`, label: `${hour}:00` };
    });

    const defaultTimeValue = useMemo(() => {
        const now = dayjs();
        const hour =
            now.minute() >= 30 ? now.add(1, 'hour').hour() : now.hour();
        return `${hour.toString().padStart(2, '0')}:00`;
    }, []);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        setIsMobile(mediaQuery.matches);
        const handleChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const handleReset = () => {
        setSelectedKlass('');
        setSelectedMarka('');
        setSelectedKuzov('');
        setSelectedPrivod('');
        setSelectedDvigatel('');
        setSelectedColor('');
        // setAdvancedVisible(false);
        setSelectedPriceRange(null);
        loadCars({}, true);
    };

    const loadCars = useCallback(
        async (
            customFilters: Record<string, string> = {},
            forceAll = false,
        ) => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (!forceAll) {
                    if (selectedKlass) params.append('klass', selectedKlass);
                    if (selectedMarka) params.append('marka', selectedMarka);
                    if (selectedKuzov) params.append('kuzov', selectedKuzov);
                    if (selectedPrivod) params.append('privod', selectedPrivod);
                    if (selectedDvigatel)
                        params.append('dvigatel', selectedDvigatel);
                    if (selectedColor) params.append('color', selectedColor);
                }

                for (const [k, v] of Object.entries(customFilters))
                    params.set(k, v);
                params.append('per_page', '100');
                const res = await fetch('/api/cars?' + params.toString(), {
                    cache: 'no-store',
                });
                const data = await res.json();
                setCars(data);
            } catch (e) {
                console.error(e);
                setCars([]);
            } finally {
                setLoading(false);
            }
        },
        [
            selectedKlass,
            selectedMarka,
            selectedKuzov,
            selectedPrivod,
            selectedDvigatel,
            selectedColor,
        ],
    );

    React.useEffect(() => {
        loadCars();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        selectedKlass,
        selectedMarka,
        selectedKuzov,
        selectedPrivod,
        selectedDvigatel,
        selectedColor,
    ]);

    const filteredCars = useMemo(() => {
        return filterByPriceRange(cars, selectedPriceRange);
    }, [cars, selectedPriceRange]);

    return (
        <>
            <section className="bg-[#f6f6f60e] rounded-3xl p-[18px] lg:p-7">
                <header className="flex flex-col lg:flex-row lg:justify-between pb-6 border-b-[1px] border-[#f6f6f638] ">
                    <div className="w-full max-w-[610px]">
                        <h1 className="text-[20px]/[28px] lg:text-[24px]/[32 px] font-bold mb-4 lg:mb-5">
                            Тариф-калькулятор
                        </h1>
                        <p className="hidden lg:block text-[18px]/[28px] font-medium">
                            Мы поможем расчитать стоимость желаемого автомобиля
                            через калькулятор, соблюдая условия сезонности и
                            загрузке автопарка.
                        </p>
                    </div>
                    <div className="grid grid-cols-[max-content,max-content] lg:grid-cols-2 gap-x-[10px] gap-y-[6px] lg:gap-y-[22px] lg:gap-x-5 text-[14px]/[20px] lg:text-[16px]/[24px] font-semibold lg:font-bold lg:self-end">
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
                </header>

                <section className="mb-[14px] lg:mb-4">
                    <h3 className="text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold mt-6 lg:mt-8 ">
                        Период аренды:
                    </h3>
                    <form className="flex flex-col mt-[10px] lg:mt-3 mb-2 lg:mb-3 gap-[10px] lg:flex-row lg:gap-0">
                        <div className="select-group flex flex-col gap-[10px] lg:flex-row lg:flex-[2] lg:gap-0">
                            <div className="flex flex-col gap-2 lg:flex-row lg:flex-[1] lg:gap-[10px]">
                                <div className="flex ">
                                    <CustomDatePicker
                                        placeholder="Дата аренды"
                                        disabledDate={disabledDateStart}
                                        defaultValue={today}
                                        value={startDate || today}
                                        onChange={(date) => {
                                            setStartDate?.(date);
                                            if (date) setIsChainActive(true);
                                        }}
                                        // width="58%"
                                        isMobile={isMobile}
                                        style={{
                                            borderTopLeftRadius: 12,
                                            borderBottomLeftRadius: 12,
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                        }}
                                    />

                                    <CustomSelect
                                        placeholder="18:00"
                                        options={timeOptions}
                                        className="timePicker"
                                        defaultValue={defaultTimeValue}
                                    />
                                </div>

                                <div className="flex lg:flex-[1]">
                                    <CustomDatePicker
                                        placeholder="Возврат"
                                        disabledDate={disabledDateFinish}
                                        value={returnDate}
                                        onChange={(date) =>
                                            setReturnDate?.(date)
                                        }
                                        // width="58%"
                                        isMobile={isMobile}
                                        open={
                                            isChainActive
                                                ? isReturnDateOpen
                                                : undefined
                                        }
                                        onOpenChange={(open) =>
                                            setIsReturnDateOpen(open)
                                        }
                                        style={{
                                            borderTopLeftRadius: 12,
                                            borderBottomLeftRadius: 12,
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                        }}
                                    />

                                    <CustomSelect
                                        placeholder="18:00"
                                        options={timeOptions}
                                        className="timePicker"
                                        defaultValue={defaultTimeValue}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:flex lg:flex-[2] lg:pl-3">
                            <CustomButton
                                variant="default"
                                style={{
                                    width: '100%',
                                }}
                                onClick={handleReset}
                            >
                                Показать
                            </CustomButton>
                        </div>
                    </form>
                    {advancedVisible && (
                        <section className="select-group flex flex-col gap-[10px] lg:flex-row lg:gap-0">
                            <CustomSelect
                                placeholder="Класс"
                                options={klassOptions}
                                className="filters-select"
                                style={{ width: '100%' }}
                                onChange={(value) =>
                                    setSelectedKlass(value as string)
                                }
                                value={selectedKlass || undefined}
                            />
                            <CustomSelect
                                placeholder="Кузов"
                                options={kuzovOptions}
                                className="filters-select"
                                style={{ width: '100%' }}
                                onChange={(value) =>
                                    setSelectedKuzov(value as string)
                                }
                                value={selectedKuzov || undefined}
                            />
                            <CustomSelect
                                placeholder="Цвет"
                                options={colorOptions}
                                className="filters-select"
                                style={{ width: '100%' }}
                                onChange={(value) =>
                                    setSelectedColor(value as string)
                                }
                                value={selectedColor || undefined}
                            />
                            <CustomSelect
                                placeholder="Марка"
                                options={markaOptions}
                                className="filters-select"
                                style={{ width: '100%' }}
                                onChange={(value) =>
                                    setSelectedMarka(value as string)
                                }
                                value={selectedMarka || undefined}
                            />
                            <CustomSelect
                                placeholder="Цена"
                                className="filters-select"
                                options={priceRanges.map(({ label }) => ({
                                    value: label,
                                    label,
                                }))}
                                style={{ width: '100%' }}
                                value={selectedPriceRange || undefined}
                                onChange={(value) =>
                                    setSelectedPriceRange(value as string)
                                }
                            />
                        </section>
                    )}
                </section>

                <div className="flex justify-between flex-wrap lg:justify-start gap-[13px] lg:gap-4">
                    <CustomButton
                        variant="outlined"
                        className="py-[7px] px-[13px]"
                        icon={<FiltersIcon />}
                        onClick={() => setAdvancedVisible((prev) => !prev)}
                    >
                        Фильтры
                    </CustomButton>
                    <CustomButton
                        variant="transparent"
                        icon={<SmallCross />}
                        onClick={handleReset}
                    >
                        Очистить фильтры
                    </CustomButton>

                    <CustomButton
                        variant="default"
                        style={{ height: '44px' }}
                        onClick={handleReset}
                        className="block lg:hidden w-full"
                    >
                        Показать
                    </CustomButton>
                </div>
            </section>

            <section className="mb-[42px] lg:mb-[68px]">
                <div className="text-[14px]/[20px] lg:text-[18px]/[28px] flex justify-between mt-6 text-[#f6f6f675] px-4 gap-4">
                    <div className="lg:w-1/2">Автомобиль</div>
                    <div className="lg:w-1/2 flex">
                        <div className="max-w-[72px] lg:max-w-none lg:w-1/2 text-center">
                            Цена за сутки
                        </div>
                        <div className="w-1/2 text-center">
                            Итоговая стоимость
                        </div>
                    </div>
                </div>
                <div className="mt-2  flex flex-col">
                    {loading ? (
                        <p>Загрузка...</p>
                    ) : cars.length > 0 ? (
                        filteredCars.map(
                            (car, index) => (
                                <React.Fragment key={car.id}>
                                    {index === 3 && (
                                        <div className="block lg:hidden py-5">
                                            <SaleCard />
                                        </div>
                                    )}
                                    <CarTariffsCard
                                        car={car}
                                        pricePerDay={
                                            costsMap[car.id]?.pricePerDay ?? 0
                                        }
                                        totalPrice={
                                            costsMap[car.id]?.totalPrice ?? 0
                                        }
                                        openId={openId}
                                        onToggle={(id) =>
                                            setOpenId((prev) =>
                                                prev === id ? null : id,
                                            )
                                        }
                                    />
                                </React.Fragment>
                            ),
                        )
                    ) : (
                        <p>Ничего не найдено</p>
                    )}
                </div>
            </section>

            <RentSteps />

            <div className=" w-full border-t-2 border-[#284B63B2] h-[1px] my-10 lg:hidden"></div>

            <DeliveryPriceTable deliveryPrice={deliveryPrice} />

            <div className=" w-full border-t-2 border-[#284B63B2] h-[1px] my-10 lg:my-[68px]"></div>

            <WhyUs />

            <HaveQuestions />
        </>
    );
}
