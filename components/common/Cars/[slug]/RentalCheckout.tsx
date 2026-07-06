'use client';

import React, { useState, useEffect, useMemo } from 'react';
import type { Car, PriceRange, SeasonData } from '@/lib/types/Car';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import {
    isDaySeason,
    computeCostsChunked,
    getMinimumRentalReturnDate,
    getRentalDaysCountWithMinimum,
    getDeliveryOptionsForTime,
    isRentalPeriodBelowMinimum,
    MIN_RENTAL_DAYS_ERROR_TEXT,
} from '@/lib/helpers/RentalCheckoutHelper';
import { DeliveryPrice } from '@/lib/types/Car';
import { DeliveryOption } from '@/lib/types/Car';
import dynamic from 'next/dynamic';
import ErrorBanner from '../../ErrorBanner/ErrorBanner';

const Modal = dynamic(
    () => import('antd/es/modal').then(m => m.default || m),
    { ssr: false, loading: () => null }
);
const Button = dynamic(
    () => import('antd/es/button').then(m => m.default || m),
    { ssr: false, loading: () => null }
);
const ConfigProvider = dynamic(
    () => import('antd/es/config-provider').then(m => m.default || m),
    { ssr: false, loading: () => null }
);
const RentalPeriod = dynamic(
    () => import('./RentalPeriod').then(m => m.RentalPeriod),
    { ssr: false, loading: () => null }
);
const ModalRentalCheckout = dynamic(
    () => import('@/components/common/Modal/ModalRentalCheckout').then((mod) => mod.ModalRentalCheckout),
    { ssr: false, loading: () => <div className="h-40">Загрузка...</div> }
);
const SuccessRequest = dynamic(
    () => import('../../Modal/SuccessRequest').then((m) => m.default || m),
    { ssr: false, loading: () => <div className="h-40">Загрузка...</div> }
);

interface AdditionalOption {
    label: string;
    value: string;
    price?: number
}

interface StoredRentalPeriod {
    startDate?: string;
    returnDate?: string;
    startTime?: string;
    returnTime?: string;
}

const RENTAL_PERIOD_STORAGE_KEY = 'rentasibRentalPeriod';

const parseStoredDate = (value?: string) => {
    if (!value) return null;

    const parsedDate = dayjs(value, 'YYYY-MM-DD', true);

    return parsedDate.isValid() ? parsedDate : null;
};

type RentalCheckoutHeadingTag = 'h2' | 'div';
type RentalCheckoutPeriodSubheadingTag = 'h3' | 'div';
type RentalCheckoutAdditionalServicesTitleTag = 'h4' | 'div';

interface RentalCheckoutProps {
    car: Car;
    additionalOptions: AdditionalOption[];
    deliveryPrice: DeliveryPrice;
    seasonDates: SeasonData | null;
    priceRanges?: PriceRange[];
    setSeasonModeSwitch: (mode: boolean) => void;
    costHeadingTag?: RentalCheckoutHeadingTag;
    periodSubheadingTag?: RentalCheckoutPeriodSubheadingTag;
    additionalServicesTitleTag?: RentalCheckoutAdditionalServicesTitleTag;
}

export const RentalCheckout: React.FC<RentalCheckoutProps> = ({
    car,
    additionalOptions,
    deliveryPrice,
    seasonDates,
    priceRanges = [],
    setSeasonModeSwitch,
    costHeadingTag = 'h2',
    periodSubheadingTag = 'h3',
    additionalServicesTitleTag = 'h4',
}) => {
    const CostHeadingTag = costHeadingTag;
    const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>(
        []
    );
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
    const [startTime, setStartTime] = useState('');
    const [returnTime, setReturnTime] = useState('');
    const [daysCount, setDaysCount] = useState(0);
    const [dailyCosts, setDailyCosts] = useState<number[]>([]);
    const [hasSeasonDays, setHasSeasonDays] = useState(false);
    const [showCost, setShowCost] = useState(false);
    const [hasLoadedStoredPeriod, setHasLoadedStoredPeriod] = useState(false);
    const [minRentalBannerKey, setMinRentalBannerKey] = useState(0);

    const defaultTimeValue = useMemo(() => {
        const now = dayjs();
        const hour =
            now.minute() >= 30 ? now.add(1, 'hour').hour() : now.hour();
        return `${hour.toString().padStart(2, '0')}:00`;
    }, []);
    const effectiveStartTime = startTime || defaultTimeValue;
    const effectiveReturnTime = returnTime || defaultTimeValue;
    const [additionalOptionsSelected, setAdditionalOptions] = useState<
        string[]
    >([]);
    const [deliveryOptionSelected, setDeliveryOption] = useState<string>('');

    const [modalVisible, setModalVisible] = useState(false);
    const openModal = async () => {
        import('@/components/common/Modal/ModalRentalCheckout');
        import('../../Modal/SuccessRequest');
        setModalVisible(true)
    };
    const closeModal = () => setModalVisible(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const pricePerDay = dailyCosts[0] || 0;

    const additionalOptionsTotal = useMemo(() => {
        return additionalOptions
            .filter((opt) => additionalOptionsSelected.includes(opt.value))
            .reduce((sum, opt) => sum + (opt.price ?? 0), 0)
    }, [additionalOptionsSelected, additionalOptions]);

    const deliveryCost = useMemo(() => {
        const selected = deliveryOptions.find(
            (opt) => opt.value === deliveryOptionSelected,
        );
        return selected ? Number(selected.price) || 0 : 0
    }, [deliveryOptionSelected, deliveryOptions]);

    const totalPrice =
        dailyCosts.reduce((acc, val) => acc + val, 0) +
        additionalOptionsTotal +
        deliveryCost;

    useEffect(() => {
        if (typeof window === 'undefined') {
            setHasLoadedStoredPeriod(true);
            return;
        }

        try {
            const storedValue = localStorage.getItem(RENTAL_PERIOD_STORAGE_KEY);

            if (!storedValue) {
                setStartDate(dayjs());
                setHasLoadedStoredPeriod(true);
                return;
            }

            const storedPeriod = JSON.parse(storedValue) as StoredRentalPeriod;
            const storedStartDate = parseStoredDate(storedPeriod.startDate);
            const storedReturnDate = parseStoredDate(storedPeriod.returnDate);

            setStartDate(storedStartDate ?? dayjs());
            setReturnDate(storedReturnDate);
            setStartTime(storedPeriod.startTime ?? '');
            setReturnTime(storedPeriod.returnTime ?? '');
        } catch {
            setStartDate(dayjs());
        } finally {
            setHasLoadedStoredPeriod(true);
        }
    }, []);

    useEffect(() => {
        if (!hasLoadedStoredPeriod) return;

        if (startDate && returnDate) {
            const startFull = startDate.startOf('day');
            const isBelowMinimum = isRentalPeriodBelowMinimum(
                startDate,
                returnDate,
                effectiveStartTime,
                effectiveReturnTime,
            );

            if (isBelowMinimum) {
                const minimumReturnDate = getMinimumRentalReturnDate(startDate);

                if (!returnDate.isSame(minimumReturnDate, 'day')) {
                    setReturnDate(minimumReturnDate);
                }

                setMinRentalBannerKey((prev) => prev + 1);
            }

            let totalDays = getRentalDaysCountWithMinimum(
                startDate,
                returnDate,
                effectiveStartTime,
                effectiveReturnTime,
            );

            if (totalDays < 1) {
                totalDays = 1;
            }

            const billingEndDate = startFull.add(totalDays, 'day');
            setDaysCount(totalDays);

            let isSeasonal = false;
            let allDaysSeason = Boolean(seasonDates);

            if (seasonDates) {
                let currentDay = startFull;

                while (currentDay.isBefore(billingEndDate, 'day')) {
                    if (!isDaySeason(currentDay, seasonDates)) {
                        allDaysSeason = false;
                        break;
                    }
                    currentDay = currentDay.add(1, 'day');
                }

                isSeasonal = allDaysSeason;
            }

            setHasSeasonDays(allDaysSeason);
            setSeasonModeSwitch(isSeasonal);

            const costs = computeCostsChunked(
                startFull,
                billingEndDate,
                priceRanges,
                seasonDates,
            );
            setDailyCosts(costs);

            setShowCost(true);
        } else {
            const isStartDateSeason = startDate
                ? isDaySeason(startDate.startOf('day'), seasonDates)
                : false;

            setShowCost(false);
            setDaysCount(0);
            setDailyCosts([]);
            setSeasonModeSwitch(isStartDateSeason);
            setHasSeasonDays(isStartDateSeason);
        }
    }, [
        effectiveReturnTime,
        effectiveStartTime,
        hasLoadedStoredPeriod,
        priceRanges,
        returnDate,
        seasonDates,
        setSeasonModeSwitch,
        startDate,
    ]);
    useEffect(() => {
        setDeliveryOptions(
            getDeliveryOptionsForTime(deliveryPrice, effectiveStartTime),
        )
    }, [effectiveStartTime, deliveryPrice]);

    const discount = car.acf?.skidka;
    const discountedPrice = discount
        ? totalPrice * (1 - Number(discount) / 100)
        : null

    const rentRequirements = useMemo(() => {
        const isBusiness = car.klass?.includes(269);

        return {
            overrun: isBusiness ? '12 ₽/км.' : '6 ₽/км.'
        };
    }, [car.klass]);

    const mileageLimitPerDay = useMemo(() => {
        return hasSeasonDays ? 300 : 400;
    }, [hasSeasonDays]);

    const totalMileageLimit = useMemo(() => {
        return daysCount * mileageLimitPerDay;
    }, [daysCount, mileageLimitPerDay]);

    return (
        <section className="lg:w-full">
            {minRentalBannerKey > 0 && (
                <ErrorBanner
                    key={minRentalBannerKey}
                    title={MIN_RENTAL_DAYS_ERROR_TEXT}
                    text=""
                    position="bottom"
                />
            )}
            <RentalPeriod
                car={car}
                startDate={startDate}
                onStartDateChange={setStartDate}
                startTime={effectiveStartTime}
                onStartTimeChange={setStartTime}
                returnDate={returnDate}
                onReturnDateChange={setReturnDate}
                returnTime={effectiveReturnTime}
                onReturnTimeChange={setReturnTime}
                daysCount={daysCount}
                additionalOptions={additionalOptions}
                additionalOptionsSelected={additionalOptionsSelected}
                setAdditionalOptions={setAdditionalOptions}
                deliveryOptions={deliveryOptions}
                deliveryOptionSelected={deliveryOptionSelected}
                setDeliveryOption={setDeliveryOption}
                periodSubheadingTag={periodSubheadingTag}
                additionalServicesTitleTag={additionalServicesTitleTag}
            />

            {showCost && (
                <section className="p-6 bg-[#f6f6f60e] mt-[-10px] z-0 relative rounded-b-[16px] lg:rounded-b-[32px] transition-all lg:px-7 lg:pb-[38px] lg:pt-12 lg:-mt-[28px]">
                    <CostHeadingTag className="text-[20px]/[28px] lg:text-[24px]/[32px] font-bold mb-4 lg:mb-5">
                        Расчет стоимости
                    </CostHeadingTag>

                    <dl className="space-y-2 text-[14px]/[20px] lg:text-[16px]/[24px]">
                        <div className="flex justify-between border-b border-[#f6f6f638] pb-2">
                            <dt>Продолжительность</dt>
                            <dd className="font-bold">
                                {daysCount} {daysCount === 1 ? 'день' : 'суток'}
                            </dd>
                        </div>

                        <div className="flex justify-between border-b border-[#f6f6f638] pb-2">
                            <dt>
                                Цена за сутки
                                {hasSeasonDays && (
                                    <span className="font-bold text-[#f6f6f666]">
                                        {' '}
                                        (Сезон)
                                    </span>
                                )}
                            </dt>
                            <dd className="font-bold">
                                {pricePerDay.toLocaleString()} ₽/сут.
                            </dd>
                        </div>

                        <div className="flex justify-between border-b border-[#f6f6f638] pb-2">
                            <dt>Лимит пробега</dt>
                            <dd className="font-bold">{totalMileageLimit} км. ({mileageLimitPerDay} км/сут.)</dd>
                        </div>

                        <div className="flex justify-between border-b border-[#f6f6f638] pb-2">
                            <dt>Перепробег за 1 км</dt>
                            <dd className="font-bold">{rentRequirements.overrun}</dd>
                        </div>

                        {additionalOptionsTotal > 0 && (
                            <div className="flex justify-between border-b border-[#f6f6f638] pb-2">
                                <dt>Дополнительные опции</dt>
                                <dd className="font-bold">
                                    {additionalOptionsTotal} ₽
                                </dd>
                            </div>
                        )}

                        {deliveryCost > 0 && (
                            <div className="flex justify-between border-b border-[#f6f6f638] pb-2">
                                <dt>Доставка</dt>
                                <dd className="font-bold">{deliveryCost} ₽</dd>
                            </div>
                        )}
                    </dl>

                    <div className="flex items-center justify-between mb-4 lg:mb-5 mt-8 lg:mt-9">
                        <div className="flex flex-col">
                            <span className="text-[20px]/[28px] lg:text-[24px]/[32px] font-bold">
                                Итоговая стоимость:
                            </span>
                            {discountedPrice && (
                                <span className="text-[14px]/[20px] lg:text-[18px]/[28px] font-semibold text-[#F6F6F699]">
                                    С учетом скидки
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col items-end">
                            {discountedPrice ? (
                                <>
                                    <span className="font-bold text-[24px]/[32px] xl:text-[36px]/[40px] text-[#FFD7A6]">
                                        {discountedPrice} ₽
                                    </span>
                                    <span className="font-bold line-through text-[14px]/[20px] xl:text-[24px]/[32px] text-[#F6F6F699]">
                                        {totalPrice} ₽
                                    </span>
                                </>
                            ) : (
                                <span className="font-bold text-[20px]/[28px] lg:text-[24px]/[32px]">
                                    {totalPrice} ₽
                                </span>
                            )}
                        </div>
                    </div>

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
                                    colorBgTextActive: '#3c6e71'
                                }
                            }
                        }}
                    >
                        <Button
                            className="rounded-xl lg:text-xl lg:h-[60px] lg:rounded-2xl"
                            block
                            onClick={openModal}
                        >
                            Оставить заявку
                        </Button>
                    </ConfigProvider>
                </section>
            )}

            <ConfigProvider
                theme={{
                    components: {
                        Modal: {
                            contentBg: '#00000000',
                            boxShadow: 'none'
                        }
                    }
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
                        padding: 0
                    }}
                    styles={{
                        mask: {
                            backdropFilter: 'blur(30px)',
                            WebkitBackdropFilter: 'blur(30px)'
                        },
                        content: {
                            padding: 8,
                            color: '#f6f6f6'
                        }
                    }}
                    centered
                >
                    {isSubmitted && (
                        <SuccessRequest
                            reservation={true}
                            onClick={() => {
                                setModalVisible(false);
                                setIsSubmitted(false)
                            }}
                        />
                    )}

                    {startDate && returnDate && !isSubmitted && (
                        <ModalRentalCheckout
                            car={car}
                            additionalOptionsTotal={additionalOptionsTotal}
                            deliveryCost={deliveryCost}
                            startDate={startDate.format('YYYY-MM-DD')}
                            returnDate={returnDate.format('YYYY-MM-DD')}
                            startTime={effectiveStartTime}
                            returnTime={effectiveReturnTime}
                            hasSeasonDays={hasSeasonDays}
                            additionalOptions={additionalOptions}
                            additionalOptionsSelected={
                                additionalOptionsSelected
                            }
                            setAdditionalOptions={setAdditionalOptions}
                            deliveryOptions={deliveryOptions}
                            deliveryOptionSelected={deliveryOptionSelected}
                            setDeliveryOption={setDeliveryOption}
                            daysCount={daysCount}
                            pricePerDay={pricePerDay}
                            totalPrice={totalPrice}
                            setStartDate={setStartDate}
                            setReturnDate={setReturnDate}
                            setStartTime={setStartTime}
                            setReturnTime={setReturnTime}
                            closeModal={closeModal}
                            setIsSubmitted={setIsSubmitted}
                        />
                    )}
                </Modal>
            </ConfigProvider>
        </section>
    )
}
