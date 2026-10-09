'use client';

import { useEffect, useMemo, useState } from 'react';
import { ConfigProvider, Modal } from 'antd';
import dynamic from 'next/dynamic';
import dayjs, { type Dayjs } from 'dayjs';
import type {
    Car,
    DeliveryOption,
    DeliveryOptionsGrouped,
    SeasonData,
} from '@/lib/types/Car';
import { buildPriceRangesFromACF } from '@/lib/helpers/priceRanges';
import { getSeasonDatesForCar } from '@/lib/helpers/carSeasonDates';
import {
    computeCostsChunked,
    getMinimumRentalReturnDate,
    getAverageDailyCost,
    getRentalDaysCountWithMinimum,
    getDeliveryOptionsForTime,
    getDeliveryCostForTime,
    getAfterHoursCost,
    isRentalPeriodBelowMinimum,
    MIN_RENTAL_DAYS_ERROR_TEXT,
    isDaySeason,
} from '@/lib/helpers/RentalCheckoutHelper';
import ErrorBanner from '../ErrorBanner/ErrorBanner';

const ModalRentalCheckout = dynamic(
    () =>
        import('../Modal/ModalRentalCheckout').then(
            (mod) => mod.ModalRentalCheckout,
        ),
    { ssr: false, loading: () => <div className="h-40">Загрузка...</div> },
);
const SuccessRequest = dynamic(
    () => import('../Modal/SuccessRequest').then((mod) => mod.default || mod),
    { ssr: false, loading: () => <div className="h-40">Загрузка...</div> },
);

const EMPTY_DELIVERY_PRICE: DeliveryOptionsGrouped = { day: [], night: [] };

type CarRentalDialogProps = {
    car: Car;
    additionalOptions?: { label: string; value: string; price: number }[];
    deliveryPrice?: DeliveryOptionsGrouped;
    seasonDates?: SeasonData | null;
    open: boolean;
    onClose: () => void;
};

export default function CarRentalDialog({
    car,
    additionalOptions,
    deliveryPrice = EMPTY_DELIVERY_PRICE,
    seasonDates = null,
    open,
    onClose,
}: CarRentalDialogProps) {
    const carSeasonDates = useMemo(
        () => getSeasonDatesForCar(car, seasonDates),
        [car, seasonDates],
    );
    const priceRanges = useMemo(
        () => buildPriceRangesFromACF(car.acf || {}),
        [car.acf],
    );
    const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>(
        [],
    );
    const [startDate, setStartDate] = useState<Dayjs | null>(() => dayjs());
    const [returnDate, setReturnDate] = useState<Dayjs | null>(() =>
        dayjs().add(3, 'day'),
    );
    const [startTime, setStartTime] = useState('15:00');
    const [returnTime, setReturnTime] = useState('15:00');
    const [daysCount, setDaysCount] = useState(0);
    const [dailyCosts, setDailyCosts] = useState<number[]>([]);
    const [dailyCostsBeforeDiscount, setDailyCostsBeforeDiscount] = useState<
        number[]
    >([]);
    const [hasSeasonDays, setHasSeasonDays] = useState(false);
    const [additionalOptionsSelected, setAdditionalOptionsSelected] = useState<
        string[]
    >([]);
    const [deliveryOptionSelected, setDeliveryOption] = useState('none');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [minRentalBannerKey, setMinRentalBannerKey] = useState(0);

    const pricePerDay = getAverageDailyCost(dailyCosts);
    const additionalOptionsTotal = useMemo(
        () =>
            additionalOptions
                ?.filter((option) =>
                    additionalOptionsSelected.includes(option.value),
                )
                .reduce((sum, option) => sum + (option.price ?? 0), 0),
        [additionalOptions, additionalOptionsSelected],
    );
    const deliveryCost = useMemo(
        () =>
            getDeliveryCostForTime(
                deliveryPrice,
                deliveryOptionSelected,
                startTime,
            ),
        [deliveryOptionSelected, deliveryPrice, startTime],
    );
    const afterHoursCost = useMemo(
        () =>
            getAfterHoursCost(
                deliveryOptionSelected,
                startTime,
                returnDate ? returnTime : '',
            ),
        [deliveryOptionSelected, startTime, returnTime, returnDate],
    );
    const totalPrice =
        dailyCosts.reduce((sum, cost) => sum + cost, 0) +
        (additionalOptionsTotal ?? 0) +
        deliveryCost +
        afterHoursCost;
    const totalPriceBeforeDiscount =
        dailyCostsBeforeDiscount.reduce((sum, cost) => sum + cost, 0) +
        (additionalOptionsTotal ?? 0) +
        deliveryCost +
        afterHoursCost;

    useEffect(() => {
        if (!startDate || !returnDate) return;

        const startFull = startDate.startOf('day');
        const isBelowMinimum = isRentalPeriodBelowMinimum(
            startDate,
            returnDate,
            startTime,
            returnTime,
        );

        if (isBelowMinimum) {
            const minimumReturnDate = getMinimumRentalReturnDate(startDate);
            if (!returnDate.isSame(minimumReturnDate, 'day')) {
                setReturnDate(minimumReturnDate);
            }
            setMinRentalBannerKey((previous) => previous + 1);
        }

        let totalDays = getRentalDaysCountWithMinimum(
            startDate,
            returnDate,
            startTime,
            returnTime,
        );
        if (totalDays < 1) totalDays = 1;
        const billingEndDate = startFull.add(totalDays, 'day');
        if (daysCount !== totalDays) setDaysCount(totalDays);

        let allDaysSeason = Boolean(carSeasonDates);
        if (carSeasonDates) {
            let currentDay = startFull;
            while (currentDay.isBefore(billingEndDate, 'day')) {
                if (!isDaySeason(currentDay, carSeasonDates)) {
                    allDaysSeason = false;
                    break;
                }
                currentDay = currentDay.add(1, 'day');
            }
        }
        if (hasSeasonDays !== allDaysSeason) setHasSeasonDays(allDaysSeason);

        const costsBeforeDiscount = computeCostsChunked(
            startFull,
            billingEndDate,
            priceRanges,
            carSeasonDates,
        );
        if (dailyCostsBeforeDiscount.toString() !== costsBeforeDiscount.toString()) {
            setDailyCostsBeforeDiscount(costsBeforeDiscount);
        }

        const costs = computeCostsChunked(
            startFull,
            billingEndDate,
            priceRanges,
            carSeasonDates,
            car.acf,
        );
        if (dailyCosts.toString() !== costs.toString()) setDailyCosts(costs);
    }, [
        dailyCosts,
        car.acf,
        dailyCostsBeforeDiscount,
        daysCount,
        hasSeasonDays,
        priceRanges,
        returnDate,
        returnTime,
        carSeasonDates,
        startDate,
        startTime,
    ]);

    useEffect(() => {
        if (!startTime) return;
        const options = getDeliveryOptionsForTime(deliveryPrice, startTime);
        const changed =
            options.length !== deliveryOptions.length ||
            options.some((option, index) => {
                const currentOption = deliveryOptions[index];
                return (
                    option.value !== currentOption?.value ||
                    option.label !== currentOption?.label ||
                    option.price !== currentOption?.price
                );
            });
        if (changed) setDeliveryOptions(options);
    }, [startTime, deliveryPrice, deliveryOptions]);

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
                    open={open}
                    onCancel={onClose}
                    closeIcon={false}
                    footer={null}
                    width="100vw"
                    style={{ top: 0, left: 0, margin: 0, padding: 0 }}
                    styles={{
                        mask: {
                            backdropFilter: 'blur(30px)',
                            WebkitBackdropFilter: 'blur(30px)',
                        },
                        content: { padding: 8, color: '#f6f6f6' },
                    }}
                    centered
                >
                    {isSubmitted && (
                        <SuccessRequest
                            reservation={true}
                            onClick={() => {
                                onClose();
                                setIsSubmitted(false);
                            }}
                        />
                    )}
                    {startDate && returnDate && !isSubmitted && (
                        <ModalRentalCheckout
                            car={car}
                            additionalOptionsTotal={additionalOptionsTotal ?? 0}
                            deliveryCost={deliveryCost}
                            afterHoursCost={afterHoursCost}
                            startDate={startDate.format('YYYY-MM-DD')}
                            returnDate={returnDate.format('YYYY-MM-DD')}
                            startTime={startTime}
                            returnTime={returnTime}
                            hasSeasonDays={hasSeasonDays}
                            additionalOptions={additionalOptions ?? []}
                            additionalOptionsSelected={additionalOptionsSelected}
                            setAdditionalOptions={setAdditionalOptionsSelected}
                            deliveryOptions={deliveryOptions}
                            deliveryOptionSelected={deliveryOptionSelected}
                            setDeliveryOption={setDeliveryOption}
                            daysCount={daysCount}
                            pricePerDay={pricePerDay}
                            totalPrice={totalPrice}
                            setStartDate={setStartDate}
                            setReturnDate={setReturnDate}
                            totalPriceBeforeDiscount={totalPriceBeforeDiscount}
                            setStartTime={setStartTime}
                            setReturnTime={setReturnTime}
                            closeModal={onClose}
                            setIsSubmitted={setIsSubmitted}
                        />
                    )}
                </Modal>
            </ConfigProvider>
        </>
    );
}
