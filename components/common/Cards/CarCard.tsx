import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type {
    Car as LibCar,
    CarACF,
    SeasonData,
    PriceRange,
    DeliveryOptionsGrouped,
    DeliveryOption,
} from '@/lib/types/Car';
import CustomButton from '@/lib/ui/common/Button';
import SaleInfo from './SaleInfo';
import { buildPriceRangesFromACF } from '@/lib/api/fetchCarData';
import dayjs, { Dayjs } from 'dayjs';
import {
    computeCostsChunked,
    isDaySeason,
} from '@/lib/helpers/RentalCheckoutHelper';
import { ConfigProvider, Modal } from 'antd';
import SuccessRequest from '../Modal/SuccessRequest';
import { ModalRentalCheckout } from '../Modal/ModalRentalCheckout';

interface CarCardProps {
    car: LibCar;
    additionalOptions?: {
        label: string;
        value: string;
        price: number;
    }[];
    deliveryPrice?: DeliveryOptionsGrouped;
    seasonDates?: SeasonData | null;
}

export const CarCard: React.FC<CarCardProps> = ({
    car,
    additionalOptions,
    deliveryPrice = { day: [], night: [] },
    seasonDates = null,
}) => {
    const acf: CarACF = car.acf ?? { nazvanie_avto: '', '30_dnej': '' };
    const price = Number(acf['30_dnej']);
    const priseDiscount = price * (1 - Number(acf.skidka) / 100);

    const imageUrl =
        (Array.isArray(acf.white_gallery) && acf.white_gallery[0]) ||
        (Array.isArray(acf.black_gallery) && acf.black_gallery[0]) ||
        (Array.isArray(acf.gray_gallery) && acf.gray_gallery[0]) ||
        (Array.isArray(acf.blue_gallery) && acf.blue_gallery[0]) ||
        (Array.isArray(acf.red_gallery) && acf.red_gallery[0]) ||
        '';

    const carLink = `/cars/${car.slug}`;
    const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>(
        [],
    );
    const [priceRanges, setPriceRanges] = useState<PriceRange[]>([]);

    const handleOrderClick = async () => {
        try {
            const priceRangesData = buildPriceRangesFromACF(car.acf || {});
            setPriceRanges(priceRangesData);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    };

    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
    const [returnDate, setReturnDate] = useState<Dayjs | null>(dayjs());
    const [startTime, setStartTime] = useState('15:00');
    const [returnTime, setReturnTime] = useState('');
    const [daysCount, setDaysCount] = useState(0);
    const [dailyCosts, setDailyCosts] = useState<number[]>([]);
    const [hasSeasonDays, setHasSeasonDays] = useState(false);
    const [additionalOptionsSelected, setAdditionalOptionsSelected] = useState<
        string[]
    >([]);
    const [deliveryOptionSelected, setDeliveryOption] = useState<string>('');
    const [modalVisible, setModalVisible] = useState(false);
    const closeModal = () => setModalVisible(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const pricePerDay = dailyCosts[0] || 0;

    const additionalOptionsTotal = useMemo(() => {
        return additionalOptions
            ?.filter((opt) => additionalOptionsSelected.includes(opt.value))
            ?.reduce((sum, opt) => sum + (opt.price ?? 0), 0);
    }, [additionalOptionsSelected, additionalOptions]);

    const deliveryCost = useMemo(() => {
        const selected = deliveryOptions.find(
            (opt) => opt.value === deliveryOptionSelected,
        );
        return selected ? Number(selected.price) || 0 : 0;
    }, [deliveryOptionSelected, deliveryOptions]);

    const totalPrice =
        dailyCosts.reduce((acc, val) => acc + val, 0) +
        (additionalOptionsTotal ?? 0) +
        deliveryCost;
    // useEffect(() => {
    //     if (!startDate) {
    //         setStartDate(dayjs());
    //     }
    //     if (startDate && returnDate) {
    //         const startFull = startDate;
    //         const endFull = returnDate;

    //         const exactDiffHours = endFull.diff(startFull, 'hour', true);
    //         let totalDays = Math.max(0, Math.ceil(exactDiffHours / 24));
    //         if (totalDays < 3) {
    //             const adjustedEnd = startFull.add(3, 'day');
    //             setReturnDate(adjustedEnd);
    //             totalDays = 3;
    //         }
    //         setDaysCount(totalDays);

    //         let isSeasonal = false;
    //         setHasSeasonDays(true);
    //         if (seasonDates) {
    //             let allDaysSeason = true;
    //             let currentDay = startFull.startOf('day');
    //             const endDay = endFull.startOf('day');

    //             while (
    //                 currentDay.isBefore(endDay) ||
    //                 currentDay.isSame(endDay)
    //             ) {
    //                 if (!isDaySeason(currentDay, seasonDates)) {
    //                     allDaysSeason = false;
    //                     setHasSeasonDays(false);
    //                     break;
    //                 }
    //                 currentDay = currentDay.add(1, 'day');
    //             }
    //             isSeasonal = allDaysSeason;
    //         }

    //         const costs = computeCostsChunked(
    //             startFull,
    //             endFull,
    //             priceRanges,
    //             seasonDates,
    //         );
    //         setDailyCosts(costs);
    //     } else {
    //         setDaysCount(0);
    //         setDailyCosts([]);
    //         setHasSeasonDays(false);
    //     }
    // }, [startDate, returnDate, priceRanges, seasonDates]);

    // useEffect(() => {
    //     const hour = parseInt(startTime.split(':')[0], 10);
    //     const isNight = hour >= 20 || hour < 9;
    //     const options = isNight ? deliveryPrice?.night : deliveryPrice?.day;
    //     if (options) setDeliveryOptions(options);
    // }, [startTime, deliveryPrice]);

    useEffect(() => {
        if (!startDate) return;

        const startFull = startDate;
        let endFull = returnDate ?? startDate;

        const exactDiffHours = endFull.diff(startFull, 'hour', true);
        let totalDays = Math.max(0, Math.ceil(exactDiffHours / 24));

        if (totalDays < 1) {
            const adjustedEnd = startFull.add(1, 'day');
            if (!endFull.isSame(adjustedEnd)) {
                endFull = adjustedEnd;
                setReturnDate(adjustedEnd);
            }
            totalDays = 1;
        }

        if (daysCount !== totalDays) setDaysCount(totalDays);

        let allDaysSeason = true;
        if (seasonDates) {
            let currentDay = startFull.startOf('day');
            const endDay = endFull.startOf('day');

            while (currentDay.isBefore(endDay) || currentDay.isSame(endDay)) {
                if (!isDaySeason(currentDay, seasonDates)) {
                    allDaysSeason = false;
                    break;
                }
                currentDay = currentDay.add(1, 'day');
            }
        }

        if (hasSeasonDays !== allDaysSeason) setHasSeasonDays(allDaysSeason);

        const costs = computeCostsChunked(
            startFull,
            endFull,
            priceRanges,
            seasonDates,
        );
        if (dailyCosts.toString() !== costs.toString()) setDailyCosts(costs);
    }, [startDate, returnDate, priceRanges, seasonDates]);

    useEffect(() => {
        if (!startTime) return;

        const hour = parseInt(startTime.split(':')[0], 10);
        const isNight = hour >= 20 || hour < 9;
        const options = isNight ? deliveryPrice?.night : deliveryPrice?.day;

        const changed =
            options &&
            (options.length !== deliveryOptions.length ||
                options.some(
                    (opt, i) => opt.value !== deliveryOptions[i]?.value,
                ));

        if (changed) setDeliveryOptions(options);
    }, [startTime, deliveryPrice, deliveryOptions]);

    return (
        <article className="car-card  flex flex-col bg-[#f6f6f60e] rounded-2xl ">
            <div className="relative  h-3/4 ">
                <Link
                    href={carLink}
                    passHref
                    className="contents hover:text-[#f6f6f6]"
                >
                    <img
                        src={imageUrl}
                        alt={acf.nazvanie_avto}
                        className="w-full min-w-[310px] max-h-[207px] object-cover mb-[14px] rounded-2xl lg:max-h-[252px] lg:mb-4"
                    />
                    <SaleInfo acf={acf} />
                </Link>
            </div>

            <div className="flex justify-between pb-4 px-4 lg:pb-[26px] lg:px-[26px]">
                <div className="w-full">
                    <Link href={carLink} passHref>
                        <h3 className="text-lg font-semibold text-[#f6f6f6]">
                            {acf.nazvanie_avto}
                        </h3>
                    </Link>
                    {acf.skidka ? (
                        <p className="font-bold text-[18px]/[28px] xl:text-[20px]/[28px] text-[#f6f6f6] flex items-center gap-[6px] lg:gap-2">
                            <span className="font-bold text-[18px]/[28px] xl:text-[20px]/[28px] text-[#FFD7A6]">
                                {priseDiscount} Р/сут.
                            </span>
                            <span className="line-through text-[#F6F6F699] lg:hidden xl:block">
                                {price} Р/сут.
                            </span>
                        </p>
                    ) : (
                        <p className="font-bold text-[18px]/[28px] xl:text-[20px]/[28px] text-[#f6f6f6] ">
                            {' '}
                            {price} Р/сут.
                        </p>
                    )}
                </div>

                <div className="flex flex-col justify-end w-[103px] lg:justify-end">
                    <CustomButton
                        variant="default"
                        style={{ height: '40px' }}
                        className="font-medium hover:bg-[#f6f6f6] w-[103px]"
                        onClick={() => {
                            handleOrderClick();
                            setModalVisible(true);
                        }}
                    >
                        Оформить
                    </CustomButton>
                </div>
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

                        {startDate && returnDate && !isSubmitted && (
                            <ModalRentalCheckout
                                car={car}
                                additionalOptionsTotal={
                                    additionalOptionsTotal ?? 0
                                }
                                deliveryCost={deliveryCost}
                                startDate={startDate.format('YYYY-MM-DD')}
                                returnDate={returnDate.format('YYYY-MM-DD')}
                                startTime={startTime}
                                returnTime={returnTime}
                                hasSeasonDays={hasSeasonDays}
                                additionalOptions={additionalOptions ?? []}
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
            </div>
        </article>
    );
};
