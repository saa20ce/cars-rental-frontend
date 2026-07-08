'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type { Car, DeliveryPrice, SeasonData } from '@/lib/types/Car';
import type { GetProps } from 'antd';
import {
    computeCostsChunked,
    getMinimumRentalReturnDate,
    getAverageDailyCost,
    getRentalDaysCountWithMinimum,
    getDeliveryOptionsForTime,
    isDaySeason,
    isRentalPeriodBelowMinimum,
    MIN_RENTAL_DAYS_ERROR_TEXT,
} from '@/lib/helpers/RentalCheckoutHelper';
import { buildPriceRangesFromACF } from '@/lib/helpers/priceRanges';
import { ConfigProvider, DatePicker, Modal } from 'antd';
import { CarTariffsCard } from '@/components/common/Cards/CarTariffsCard';
import { WhyUs } from '@/components/common/Cards/WhyUs';
import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';
import { RentSteps } from '@/components/common/Steps/RentSteps';
import { DeliveryPriceTable } from '@/components/common/Table/DeliveryPriceTable';
import { CustomSelect } from '@/lib/ui/common/Select/CustomSelect';
import dynamic from 'next/dynamic';
const CustomDatePicker = dynamic(
    () => import('@/lib/ui/common/DatePicker/CustomDatePicker').then(m => m.CustomDatePicker),
    { ssr: false, loading: () => null }
);
const ModalRentalCheckout = dynamic(
    () => import('@/components/common/Modal/ModalRentalCheckout').then((mod) => mod.ModalRentalCheckout),
    { ssr: false, loading: () => <div className="h-40">Загрузка...</div> }
);
const SuccessRequest = dynamic(
    () => import('@/components/common/Modal/SuccessRequest').then((m) => m.default || m),
    { ssr: false, loading: () => <div className="h-40">Загрузка...</div> }
);
import { CheckRound, FiltersIcon, LineIcon, SmallCross } from '@/lib/ui/icons';
import CustomButton from '@/lib/ui/common/Button';
import ErrorBanner from '@/components/common/ErrorBanner/ErrorBanner';
import {
    buildKlassOptionsWithKuzov,
    isKuzovOptionUsedAsKlass,
} from '@/lib/helpers/carFilterOptions';
import { compareCarsByPublishedDateDesc } from '@/lib/helpers/carSorting';
import Banner from '@/public/images/Banner.png';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

interface InitialTariffsSearchParams {
    klass?: string;
    startDate?: string;
    returnDate?: string;
    startTime?: string;
    returnTime?: string;
}
const RENTAL_PERIOD_STORAGE_KEY = 'rentasibRentalPeriod';

const isValidInitialTime = (time?: string) =>
    typeof time === 'string' && /^([01]\d|2[0-3]):00$/.test(time);

const parseInitialDate = (date?: string) => {
    if (!date) return null;

    const parsedDate = dayjs(date);

    return parsedDate.isValid() ? parsedDate.startOf('day') : null;
};

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
    additionalOptions: Array<{ label: string; value: string; price: number }>;
    initialSearchParams?: InitialTariffsSearchParams;
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
    additionalOptions,
    initialSearchParams,
}: TariffsPageClientProps) {
    const today = useMemo(() => dayjs().startOf('day'), []);
    const initialStartDate = useMemo(() => {
        const parsedDate = parseInitialDate(initialSearchParams?.startDate);

        return parsedDate && !parsedDate.isBefore(today, 'day')
            ? parsedDate
            : today;
    }, [initialSearchParams?.startDate, today]);
    const initialReturnDate = useMemo(() => {
        const parsedDate = parseInitialDate(initialSearchParams?.returnDate);

        return parsedDate && parsedDate.isAfter(initialStartDate, 'day')
            ? parsedDate
            : null;
    }, [initialSearchParams?.returnDate, initialStartDate]);
    const initialStartTime = isValidInitialTime(initialSearchParams?.startTime)
        ? initialSearchParams?.startTime ?? ''
        : '';
    const initialReturnTime = isValidInitialTime(initialSearchParams?.returnTime)
        ? initialSearchParams?.returnTime ?? ''
        : '';
    const initialKlass = initialSearchParams?.klass ?? '';
    const [pendingFilters, setPendingFilters] = useState({
        klass: initialKlass,
        marka: '',
        kuzov: '',
        privod: '',
        dvigatel: '',
        color: '',
        priceRange: null as string | null,
    });
    const [cars, setCars] = useState<Car[] | null>(null);
    const [startDate, setStartDate] = useState<Dayjs | null>(initialStartDate);
    const [returnDate, setReturnDate] = useState<Dayjs | null>(
        initialReturnDate,
    );
    const [isChainActive, setIsChainActive] = useState(
        Boolean(initialReturnDate),
    );
    const [isReturnDateOpen, setIsReturnDateOpen] = useState(false);
    const [advancedVisible, setAdvancedVisible] = useState(
        Boolean(initialKlass),
    );
    const [openId, setOpenId] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [startTime, setStartTime] = useState(initialStartTime);
    const [returnTime, setReturnTime] = useState(initialReturnTime);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [additionalOptionsSelected, setAdditionalOptionsSelected] = useState<
        string[]
    >([]);
    const [deliveryOptionSelected, setDeliveryOption] = useState<string>('');
    const [minRentalBannerKey, setMinRentalBannerKey] = useState(0);
    const klassOptionsWithKuzov = useMemo(
        () => buildKlassOptionsWithKuzov(klassOptions, kuzovOptions),
        [klassOptions, kuzovOptions],
    );

    const daysCount = useMemo(
        () =>
            getRentalDaysCountWithMinimum(
                startDate,
                returnDate,
                startTime,
                returnTime,
            ),
        [returnDate, returnTime, startDate, startTime],
    );

    const billingEndDate = useMemo(() => {
        if (!startDate || daysCount <= 0) return null;

        return startDate.startOf('day').add(daysCount, 'day');
    }, [daysCount, startDate]);

    const handleApplyFilters = () => {
        if (!startDate || !returnDate || !billingEndDate) return;

        const enriched = initialCars.map((car) => {
            const priceRanges = buildPriceRangesFromACF(car.acf || {});

            const costsBeforeDiscount = computeCostsChunked(
                startDate.startOf('day'),
                billingEndDate,
                priceRanges,
                seasonDates,
            );

            const costs = computeCostsChunked(
                startDate.startOf('day'),
                billingEndDate,
                priceRanges,
                seasonDates,
                car.acf,
            );

            const totalPriceBeforeDiscount = costsBeforeDiscount.reduce(
                (a, b) => a + b,
                0,
            );
            const totalPrice = costs.reduce((a, b) => a + b, 0);
            const pricePerDayBeforeDiscount = getAverageDailyCost(
                costsBeforeDiscount,
            );
            const pricePerDay = getAverageDailyCost(costs);

            return {
                ...car,
                pricePerDay,
                pricePerDayBeforeDiscount,
                totalPrice,
                totalPriceBeforeDiscount,
            };
        });

        const filtered = enriched.filter((car) => {
            const { klass, marka, kuzov, privod, dvigatel, color, priceRange } =
                pendingFilters;

            const klassId = Number(klass);
            const klassMatch = klass
                ? isKuzovOptionUsedAsKlass(klass, kuzovOptions)
                    ? car.kuzov?.includes(klassId)
                    : car.klass?.includes(klassId)
                : true;
            const markaMatch = marka
                ? car.marka?.includes(Number(marka))
                : true;
            const kuzovMatch = kuzov
                ? car.kuzov?.includes(Number(kuzov))
                : true;
            const privodMatch = privod
                ? car.privod?.includes(Number(privod))
                : true;
            const dvigatelMatch = dvigatel
                ? car.dvigatel?.includes(Number(dvigatel))
                : true;
            const colorMatch = color
                ? car.color?.includes(Number(color))
                : true;

            let priceMatch = true;
            const price = car.pricePerDay;
            const normalizedPriceRange = priceRange?.replace(/–|—/g, '-');

            switch (normalizedPriceRange) {
                case 'До 4000':
                    priceMatch = price <= 4000;
                    break;
                case '4000-6000':
                    priceMatch = price >= 4000 && price <= 6000;
                    break;
                case '6000-10000':
                    priceMatch = price >= 6000 && price <= 10000;
                    break;
                case 'От 10000':
                    priceMatch = price >= 10000;
                    break;
            }

            return (
                klassMatch &&
                markaMatch &&
                kuzovMatch &&
                privodMatch &&
                dvigatelMatch &&
                colorMatch &&
                priceMatch
            );
        });

        filtered.sort(
            (a, b) =>
                b.pricePerDay - a.pricePerDay ||
                compareCarsByPublishedDateDesc(a, b),
        );
        setCars(filtered);
    };

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

    useEffect(() => {
        setStartTime((current) => current || defaultTimeValue);
        setReturnTime((current) => current || defaultTimeValue);
    }, [defaultTimeValue]);
    useEffect(() => {
        const effectiveStartTime = startTime || defaultTimeValue;
        const effectiveReturnTime = returnTime || defaultTimeValue;

        if (
            isRentalPeriodBelowMinimum(
                startDate,
                returnDate,
                effectiveStartTime,
                effectiveReturnTime,
            )
        ) {
            setReturnDate(getMinimumRentalReturnDate(startDate!));
            setMinRentalBannerKey((prev) => prev + 1);
        }
    }, [defaultTimeValue, returnDate, returnTime, startDate, startTime]);

    const deliveryOptions = useMemo(() => {
        const time = startTime || defaultTimeValue;

        return getDeliveryOptionsForTime(deliveryPrice, time);
    }, [deliveryPrice, defaultTimeValue, startTime]);

    const deliveryCost = useMemo(() => {
        const selected = deliveryOptions.find(
            (opt) => opt.value === deliveryOptionSelected,
        );

        return selected ? Number(selected.price) || 0 : 0;
    }, [deliveryOptionSelected, deliveryOptions]);

    const additionalOptionsTotal = useMemo(() => {
        return additionalOptions
            .filter((opt) => additionalOptionsSelected.includes(opt.value))
            .reduce((sum, opt) => sum + (opt.price ?? 0), 0);
    }, [additionalOptions, additionalOptionsSelected]);

    const selectedCarPriceRanges = useMemo(() => {
        return selectedCar ? buildPriceRangesFromACF(selectedCar.acf || {}) : [];
    }, [selectedCar]);

    const selectedCarCostsBeforeDiscount = useMemo(() => {
        if (!startDate || !billingEndDate || !selectedCar) return [];

        return computeCostsChunked(
            startDate.startOf('day'),
            billingEndDate,
            selectedCarPriceRanges,
            seasonDates,
        );
    }, [billingEndDate, seasonDates, selectedCar, selectedCarPriceRanges, startDate]);

    const selectedCarCosts = useMemo(() => {
        if (!startDate || !billingEndDate || !selectedCar) return [];

        return computeCostsChunked(
            startDate.startOf('day'),
            billingEndDate,
            selectedCarPriceRanges,
            seasonDates,
            selectedCar.acf,
        );
    }, [
        billingEndDate,
        seasonDates,
        selectedCar,
        selectedCarPriceRanges,
        startDate,
    ]);
    const selectedCarPricePerDay =
        getAverageDailyCost(selectedCarCosts) || selectedCar?.pricePerDay || 0;

    const selectedCarRentalTotal =
        selectedCarCosts.reduce((acc, val) => acc + val, 0) ||
        selectedCar?.totalPrice ||
        0;

    const selectedCarRentalTotalBeforeDiscount =
        selectedCarCostsBeforeDiscount.reduce((acc, val) => acc + val, 0) ||
        selectedCar?.totalPriceBeforeDiscount ||
        selectedCarRentalTotal;

    const modalTotalPrice =
        selectedCarRentalTotal + additionalOptionsTotal + deliveryCost;

    const modalTotalPriceBeforeDiscount =
        selectedCarRentalTotalBeforeDiscount +
        additionalOptionsTotal +
        deliveryCost;

    const hasSeasonDays = useMemo(() => {
        if (!startDate || !billingEndDate || !seasonDates) return false;

        let currentDay = startDate.startOf('day');

        while (currentDay.isBefore(billingEndDate, 'day')) {
            if (!isDaySeason(currentDay, seasonDates)) {
                return false;
            }
            currentDay = currentDay.add(1, 'day');
        }

        return true;
    }, [billingEndDate, seasonDates, startDate]);

    const closeModal = () => setModalVisible(false);

    const handleRentClick = (car: Car) => {
        if (!startDate || !returnDate) return;

        setSelectedCar(car);
        setAdditionalOptionsSelected([]);
        setDeliveryOption('');
        setIsSubmitted(false);
        setModalVisible(true);
    };

    const handleReset = () => {
        setPendingFilters({
            klass: '',
            marka: '',
            kuzov: '',
            privod: '',
            dvigatel: '',
            color: '',
            priceRange: null,
        });
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        setIsMobile(mediaQuery.matches);
        const handleChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        if (
            pendingFilters.klass === '' &&
            pendingFilters.marka === '' &&
            pendingFilters.kuzov === '' &&
            pendingFilters.privod === '' &&
            pendingFilters.dvigatel === '' &&
            pendingFilters.color === '' &&
            pendingFilters.priceRange === null
        ) {
            handleApplyFilters();
        }
    }, [pendingFilters]);

    useEffect(() => {
        if (!startDate || !returnDate) return;

        handleApplyFilters();
    }, [startDate, returnDate, startTime, returnTime, seasonDates]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const rentalPeriod = {
            startDate: startDate?.format('YYYY-MM-DD') ?? '',
            returnDate: returnDate?.format('YYYY-MM-DD') ?? '',
            startTime: startTime || defaultTimeValue,
            returnTime: returnTime || defaultTimeValue,
        };

        localStorage.setItem(
            RENTAL_PERIOD_STORAGE_KEY,
            JSON.stringify(rentalPeriod),
        );
    }, [defaultTimeValue, returnDate, returnTime, startDate, startTime]);

    return (
        <>
            {minRentalBannerKey > 0 && (
                <ErrorBanner
                    key={minRentalBannerKey}
                    title={MIN_RENTAL_DAYS_ERROR_TEXT}
                    text=""
                    position="bottom"
                />
            )}
            <section className="bg-[#f6f6f60e] rounded-3xl p-[18px] lg:p-7 mb-6 lg:mb-8">
                <header className="flex flex-col lg:flex-row lg:justify-between pb-6 border-b-[1px] border-[#f6f6f638] ">
                    <div className="w-full max-w-[610px]">
                        <h1 className="text-[24px]/[32px] lg:text-[30px]/[36px] font-bold mb-4 lg:mb-5">
                            Тарифы на аренду авто
                        </h1>
                        <p className="text-[16px]/[24px] lg:text-[18px]/[28px] font-medium">
                            Мы поможем расчитать стоимость желаемого автомобиля
                            через калькулятор, соблюдая условия сезонности и
                            загрузки автопарка.
                        </p>
                    </div>
                </header>

                <section className="mb-[14px] lg:mb-4">
                    <div className="text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold mt-6 lg:mt-8 ">
                        Период аренды:
                    </div>
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
                                            setStartDate(date);
                                            if (date) {
                                                setIsChainActive(true);
                                                if (
                                                    returnDate &&
                                                    (date.isAfter(returnDate) ||
                                                        date.isSame(returnDate))
                                                ) {
                                                    setReturnDate(null);
                                                }
                                            }
                                        }}
                                        style={{
                                            borderTopLeftRadius: isMobile ? 12 : 16,
                                            borderBottomLeftRadius: isMobile ? 12 : 16,
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                        }}
                                    />

                                    <CustomSelect
                                        placeholder="18:00"
                                        options={timeOptions}
                                        className="timePicker"
                                        value={startTime || defaultTimeValue}
                                        onChange={(val) =>
                                            setStartTime(val as string)
                                        }
                                    />
                                </div>

                                <div className="flex lg:flex-[1]">
                                    <CustomDatePicker
                                        placeholder="Возврат"
                                        disabledDate={disabledDateFinish}
                                        value={returnDate}
                                        minDate={
                                            startDate
                                                ? dayjs(startDate).add(1, 'day')
                                                : undefined
                                        }
                                        onChange={(date) =>
                                            setReturnDate?.(date)
                                        }
                                        open={
                                            isChainActive
                                                ? isReturnDateOpen
                                                : undefined
                                        }
                                        onOpenChange={(open) =>
                                            setIsReturnDateOpen(open)
                                        }
                                        style={{
                                            borderTopLeftRadius: isMobile ? 12 : 16,
                                            borderBottomLeftRadius: isMobile ? 12 : 16,
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                        }}
                                    />

                                    <CustomSelect
                                        placeholder="18:00"
                                        options={timeOptions}
                                        className="timePicker"
                                        value={returnTime || defaultTimeValue}
                                        onChange={(val) =>
                                            setReturnTime(val as string)
                                        }
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
                                onClick={handleApplyFilters}
                            >
                                Показать
                            </CustomButton>
                        </div>
                    </form>
                    {daysCount > 0 && (
                        <p className="text-[14px]/[20px] lg:text-[16px]/[24px] font-semibold text-[#FFD7A6] mb-2 lg:mb-3">
                            Количество суток: {daysCount}
                        </p>
                    )}
                    {advancedVisible && (
                        <section className="select-group flex flex-col gap-[10px] lg:flex-row lg:gap-0">
                            <CustomSelect
                                placeholder="Класс"
                                options={klassOptionsWithKuzov}
                                className="filters-select"
                                style={{ width: '100%' }}
                                value={pendingFilters.klass || undefined}
                                onChange={(val) =>
                                    setPendingFilters((p) => ({
                                        ...p,
                                        klass: val as string,
                                    }))
                                }
                            />
                            <CustomSelect
                                placeholder="Кузов"
                                options={kuzovOptions}
                                className="filters-select"
                                style={{ width: '100%' }}
                                value={pendingFilters.kuzov || undefined}
                                onChange={(val) =>
                                    setPendingFilters((p) => ({
                                        ...p,
                                        kuzov: val as string,
                                    }))
                                }
                            />
                            <CustomSelect
                                placeholder="Цвет"
                                options={colorOptions}
                                className="filters-select"
                                style={{ width: '100%' }}
                                value={pendingFilters.color || undefined}
                                onChange={(val) =>
                                    setPendingFilters((p) => ({
                                        ...p,
                                        color: val as string,
                                    }))
                                }
                            />
                            <CustomSelect
                                placeholder="Марка"
                                options={markaOptions}
                                className="filters-select"
                                style={{ width: '100%' }}
                                value={pendingFilters.marka || undefined}
                                onChange={(val) =>
                                    setPendingFilters((p) => ({
                                        ...p,
                                        marka: val as string,
                                    }))
                                }
                            />
                            {/* <CustomSelect
                                placeholder="Цена"
                                className="filters-select"
                                style={{ width: '100%' }}
                                options={[
                                    { label: 'До 4000', value: 'До 4000' },
                                    { label: '4000–6000', value: '4000–6000' },
                                    {
                                        label: '6000–10000',
                                        value: '6000–10000',
                                    },
                                    { label: 'От 10000', value: 'От 10000' },
                                ]}
                                value={pendingFilters.priceRange || undefined}
                                onChange={(val) =>
                                    setPendingFilters((p) => ({
                                        ...p,
                                        priceRange: val as string,
                                    }))
                                }
                            /> */}
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
                        onClick={handleApplyFilters}
                        className="block lg:hidden w-full"
                    >
                        Показать
                    </CustomButton>
                </div>
            </section>

            {cars === null ? null : (
                <section className="mb-[42px] lg:mb-[68px]">
                    <div className="text-[14px]/[20px] lg:text-[18px]/[28px] flex justify-between items-end text-[#f6f6f675] px-4 gap-4 lg:pr-12">
                        <div className="lg:w-1/2">Автомобиль</div>
                        <div className="lg:w-1/2 flex justify-end lg:justify-between">
                            <div className="hidden lg:block min-w-[72px] lg:min-w-none lg:text-center lg:w-1/3 ">
                                Количество <br className="lg:hidden" />суток
                            </div>
                            <div className="min-w-[72px] lg:min-w-none lg:text-center lg:w-1/3 ">
                                Цена <br className="lg:hidden" /> за сутки
                            </div>
                            <div className="w-[91px] lg:w-auto lg:text-center">
                                Итоговая стоимость
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col">
                        {cars.length ? (
                            cars.map((car, index) => (
                                <React.Fragment key={car.id}>
                                    {index === 3 && (
                                        <div className="block lg:hidden py-5">
                                            <Image
                                                src={Banner}
                                                alt={'\u0410\u043a\u0446\u0438\u044f \u0430\u0440\u0435\u043d\u0434\u044b \u0430\u0432\u0442\u043e'}
                                                className="w-full rounded-3xl object-cover"
                                                sizes="100vw"
                                            />
                                        </div>
                                    )}
                                    <CarTariffsCard
                                        car={car}
                                        daysCount={daysCount}
                                        pricePerDay={car.pricePerDay}
                                        totalPrice={car.totalPrice}
                                        openId={openId}
                                        onToggle={(id) =>
                                            setOpenId((prev) =>
                                                prev === id ? null : id,
                                            )
                                        }
                                        onRentClick={handleRentClick}
                                    />
                                </React.Fragment>
                            ))
                        ) : (
                            <p>Ничего не найдено</p>
                        )}
                    </div>
                </section>
            )}

            <RentSteps headingTag="div" stepTitleTag="div" />

            <div className=" w-full border-t-2 border-[#284B63B2] h-[1px] my-10 lg:hidden"></div>

            <section className="mt-10 lg:mt-[68px]">
                <div className="flex flex-row">
                    <div className="text-xl font-bold lg:text-3xl">
                        Стоимость доставки авто:
                    </div>
                    <div className="hidden lg:block ml-4 mt-[6px]">
                        <LineIcon />
                    </div>
                    <div className="hidden text-[#FFD7A6] lg:block text-2xl ml-4 mt-[2px]">
                        Доставка 24/7
                    </div>
                </div>
                <DeliveryPriceTable deliveryPrice={deliveryPrice} />
            </section>

            <div className=" w-full border-t-2 border-[#284B63B2] h-[1px] my-10 lg:my-[68px]"></div>

            <WhyUs headingTag="div" />

            <HaveQuestions headingTag="div" />

            <ConfigProvider
                theme={{
                    components: {
                        Modal: {
                            contentBg: '#00000000',
                            boxShadow: 'none',
                        },
                    },
                }}
            >
                <Modal
                    open={modalVisible}
                    onCancel={closeModal}
                    closeIcon={false}
                    footer={null}
                    width="100vw"
                    style={{
                        top: 0,
                        left: 0,
                        margin: 0,
                        padding: 0,
                    }}
                    styles={{
                        mask: {
                            backdropFilter: 'blur(30px)',
                            WebkitBackdropFilter: 'blur(30px)',
                        },
                        content: {
                            padding: 8,
                            color: '#f6f6f6',
                        },
                    }}
                    centered
                >
                    {isSubmitted && (
                        <SuccessRequest
                            reservation={true}
                            onClick={() => {
                                setModalVisible(false);
                                setIsSubmitted(false);
                            }}
                        />
                    )}

                    {selectedCar && startDate && returnDate && !isSubmitted && (
                        <ModalRentalCheckout
                            car={selectedCar}
                            additionalOptionsTotal={additionalOptionsTotal}
                            deliveryCost={deliveryCost}
                            startDate={startDate.format('YYYY-MM-DD')}
                            returnDate={returnDate.format('YYYY-MM-DD')}
                            startTime={startTime || defaultTimeValue}
                            returnTime={returnTime || defaultTimeValue}
                            hasSeasonDays={hasSeasonDays}
                            additionalOptions={additionalOptions}
                            additionalOptionsSelected={
                                additionalOptionsSelected
                            }
                            setAdditionalOptions={
                                setAdditionalOptionsSelected
                            }
                            deliveryOptions={deliveryOptions}
                            deliveryOptionSelected={deliveryOptionSelected}
                            setDeliveryOption={setDeliveryOption}
                            daysCount={daysCount}
                            pricePerDay={selectedCarPricePerDay}
                            totalPrice={modalTotalPrice}
                            setStartDate={setStartDate}
                            totalPriceBeforeDiscount={modalTotalPriceBeforeDiscount}
                            setReturnDate={setReturnDate}
                            setStartTime={setStartTime}
                            setReturnTime={setReturnTime}
                            closeModal={closeModal}
                            setIsSubmitted={setIsSubmitted}
                        />
                    )}
                </Modal>
            </ConfigProvider>
        </>
    );
}
