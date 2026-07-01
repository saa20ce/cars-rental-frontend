import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { proxyWpMediaUrl } from '@/lib/api/wpMediaProxy';
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
import { buildPriceRangesFromACF } from '@/lib/helpers/priceRanges';
import dayjs, { Dayjs } from 'dayjs';
import {
    computeCostsChunked,
    getMinimumRentalReturnDate,
    getRentalDaysCountWithMinimum,
    isRentalPeriodBelowMinimum,
    MIN_RENTAL_DAYS_ERROR_TEXT,
    isDaySeason,
} from '@/lib/helpers/RentalCheckoutHelper';
import { ConfigProvider, Modal } from 'antd';
import dynamic from 'next/dynamic';
import ErrorBanner from '../ErrorBanner/ErrorBanner';
const ModalRentalCheckout = dynamic(
    () =>
        import('../Modal/ModalRentalCheckout').then((mod) => mod.ModalRentalCheckout),
    {
        ssr: false,
        loading: () => <div className="h-40">Загрузка...</div>
    }
);
const SuccessRequest = dynamic(
    () => import('../Modal/SuccessRequest').then((m) => m.default || m),
    { ssr: false, loading: () => <div className="h-40">Загрузка...</div> }
);

interface CarCardProps {
    car: LibCar;
    additionalOptions?: {
        label: string;
        value: string;
        price: number;
    }[];
    deliveryPrice?: DeliveryOptionsGrouped;
    seasonDates?: SeasonData | null
}

export const CarCard: React.FC<CarCardProps> = ({
    car,
    additionalOptions,
    deliveryPrice = { day: [], night: [] },
    seasonDates = null
}) => {
    const acf: CarACF = car.acf ?? { nazvanie_avto: '', '30_dnej': '' };
    const regularPrice = Number(acf['1-3_dnya']);
    const seasonPrice = Number(acf['1-3_dnya_S']) || regularPrice;
    const price = isDaySeason(dayjs(), seasonDates) ? seasonPrice : regularPrice;
    const priseDiscount = price * (1 - Number(acf.skidka) / 100);

    const imageUrl =
        (Array.isArray(acf.white_gallery) && acf.white_gallery[0]) ||
        (Array.isArray(acf.black_gallery) && acf.black_gallery[0]) ||
        (Array.isArray(acf.gray_gallery) && acf.gray_gallery[0]) ||
        (Array.isArray(acf.blue_gallery) && acf.blue_gallery[0]) ||
        (Array.isArray(acf.red_gallery) && acf.red_gallery[0]) ||
        '';


    const proxiedImageUrl = proxyWpMediaUrl(imageUrl);
    const carLink = `/cars/${car.slug}`;
    const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>(
        []
    );
    const [priceRanges, setPriceRanges] = useState<PriceRange[]>([]);

    const handleOrderClick = async () => {
        try {
            const priceRangesData = buildPriceRangesFromACF(car.acf || {});
            setPriceRanges(priceRangesData);
            import('../Modal/ModalRentalCheckout');
            import('../Modal/SuccessRequest')
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error)
        }
    };

    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
    const [returnDate, setReturnDate] = useState<Dayjs | null>(
        dayjs().add(3, 'day'),
    );
    const [startTime, setStartTime] = useState('15:00');
    const [returnTime, setReturnTime] = useState('15:00');
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
    const [minRentalBannerKey, setMinRentalBannerKey] = useState(0);

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

            setMinRentalBannerKey((prev) => prev + 1);
        }

        let totalDays = getRentalDaysCountWithMinimum(
            startDate,
            returnDate,
            startTime,
            returnTime,
        );

        if (totalDays < 1) {
            totalDays = 1;
        }

        const billingEndDate = startFull.add(totalDays, 'day');

        if (daysCount !== totalDays) setDaysCount(totalDays);

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
        }

        if (hasSeasonDays !== allDaysSeason) setHasSeasonDays(allDaysSeason);

        const costs = computeCostsChunked(
            startFull,
            billingEndDate,
            priceRanges,
            seasonDates,
        );
        if (dailyCosts.toString() !== costs.toString()) setDailyCosts(costs);
    }, [
        dailyCosts,
        daysCount,
        hasSeasonDays,
        priceRanges,
        returnDate,
        returnTime,
        seasonDates,
        startDate,
        startTime,
    ]);
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
        <article className="car-card flex flex-col justify-between bg-[#f6f6f60e] hover:bg-[#1E384A] transition-colors duration-300 rounded-2xl ">
            {minRentalBannerKey > 0 && (
                <ErrorBanner
                    key={minRentalBannerKey}
                    title={MIN_RENTAL_DAYS_ERROR_TEXT}
                    text=""
                    position="bottom"
                />
            )}
            <div className="relative h-3/4 ">
                <Link
                    href={carLink}
                    passHref
                    className="contents hover:text-[#f6f6f6]"
                >
                    <div
                        className="relative w-full min-w-[310px] z-0 mb-[14px] md:mb-4 rounded-2xl h-[252px] max-h-[252px]"
                    >
                        <Image
                            src={proxiedImageUrl}
                            alt={`${car.acf?.nazvanie_avto ?? 'car'}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover', zIndex: -1, borderRadius: '1rem' }}
                            loading={'lazy'}
                        />
                    </div>
                    <SaleInfo acf={acf} />
                </Link>
            </div>

            <div className="flex justify-between pb-4 px-4 lg:pb-[26px] lg:px-[26px]">
                <div className="w-full">
                    <Link href={carLink} passHref>
                        <h3 className="text-base lg:text-lg font-semibold text-[#f6f6f6] mb-0 lg:mb-1">
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
                        onClick={async () => {
                            await handleOrderClick();
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
                                header="Ваша заявка принята!"
                                text="Мы свяжемся с вами в течение 5 минут"
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
