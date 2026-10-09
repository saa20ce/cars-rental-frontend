import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import type {
    Car as LibCar,
    CarACF,
    DeliveryOptionsGrouped,
    SeasonData,
} from '@/lib/types/Car';
import SaleInfo from './SaleInfo';
import { getSeasonDatesForCar } from '@/lib/helpers/carSeasonDates';
import {
    DISCOUNT_MIN_RENTAL_DAYS,
    getDiscountedPriceForDay,
    isDaySeason,
    isDiscountActiveForDay,
} from '@/lib/helpers/RentalCheckoutHelper';

const CarRentalDialog = dynamic(() => import('./CarRentalDialog'), {
    ssr: false,
    loading: () => (
        <div
            role="status"
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0A1319CC] text-white"
        >
            Загрузка формы...
        </div>
    ),
});

type CarCardTitleTag = 'h2' | 'h3' | 'div';

interface CarCardProps {
    car: LibCar;
    additionalOptions?: { label: string; value: string; price: number }[];
    deliveryPrice?: DeliveryOptionsGrouped;
    seasonDates?: SeasonData | null;
    titleTag?: CarCardTitleTag;
}

export const CarCard: React.FC<CarCardProps> = ({
    car,
    additionalOptions,
    deliveryPrice,
    seasonDates = null,
    titleTag = 'h3',
}) => {
    const TitleTag = titleTag;
    const carSeasonDates = useMemo(
        () => getSeasonDatesForCar(car, seasonDates),
        [car, seasonDates],
    );
    const acf: CarACF = car.acf ?? { nazvanie_avto: '', '30_dnej': '' };
    const regularPrice = Number(acf['1-3_dnya']);
    const seasonPrice = Number(acf['1-3_dnya_S']) || regularPrice;
    const today = dayjs();
    const price = isDaySeason(today, carSeasonDates) ? seasonPrice : regularPrice;
    const hasActiveDiscountToday = isDiscountActiveForDay(
        today,
        acf,
        DISCOUNT_MIN_RENTAL_DAYS,
    );
    const discountedPrice = getDiscountedPriceForDay(
        price,
        today,
        acf,
        DISCOUNT_MIN_RENTAL_DAYS,
    );
    const imageUrl =
        (Array.isArray(acf.white_gallery) && acf.white_gallery[0]) ||
        (Array.isArray(acf.black_gallery) && acf.black_gallery[0]) ||
        (Array.isArray(acf.gray_gallery) && acf.gray_gallery[0]) ||
        (Array.isArray(acf.blue_gallery) && acf.blue_gallery[0]) ||
        (Array.isArray(acf.red_gallery) && acf.red_gallery[0]) ||
        '';
    const carLink = `/cars/${car.slug}`;
    const [hasOpenedDialog, setHasOpenedDialog] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);

    return (
        <article className="car-card flex flex-col justify-between bg-[#f6f6f60e] hover:bg-[#1E384A] transition-colors duration-300 rounded-2xl">
            <div className="relative h-3/4">
                <Link
                    href={carLink}
                    passHref
                    className="contents hover:text-[#f6f6f6]"
                >
                    <div className="relative w-full min-w-[310px] z-0 mb-[14px] md:mb-4 rounded-2xl h-[252px] max-h-[252px]">
                        <Image
                            src={imageUrl}
                            alt={acf.nazvanie_avto ?? 'car'}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{
                                objectFit: 'cover',
                                zIndex: -1,
                                borderRadius: '1rem',
                            }}
                            loading="lazy"
                        />
                    </div>
                    <SaleInfo acf={acf} />
                </Link>
            </div>

            <div className="flex justify-between pb-4 px-4 lg:pb-[26px] lg:px-[26px]">
                <div className="w-full">
                    <Link href={carLink} passHref>
                        <TitleTag className="text-base lg:text-lg font-semibold text-[#f6f6f6] mb-0 lg:mb-1">
                            {acf.nazvanie_avto}
                        </TitleTag>
                    </Link>
                    {hasActiveDiscountToday ? (
                        <p className="font-bold text-[18px]/[28px] xl:text-[20px]/[28px] text-[#f6f6f6] flex items-center gap-[6px] lg:gap-2">
                            <span className="font-bold text-[18px]/[28px] xl:text-[20px]/[28px] text-[#FFD7A6]">
                                {discountedPrice} Р/сут.
                            </span>
                            <span className="line-through text-[#F6F6F699] lg:hidden xl:block">
                                {price} Р/сут.
                            </span>
                        </p>
                    ) : (
                        <p className="font-bold text-[18px]/[28px] xl:text-[20px]/[28px] text-[#f6f6f6]">
                            {price} Р/сут.
                        </p>
                    )}
                </div>

                <div className="flex flex-col justify-end w-[103px] lg:justify-end">
                    <button
                        type="button"
                        className="h-10 w-[103px] rounded-xl bg-[#3c6e71] text-[#f6f6f6] font-medium hover:bg-[#f6f6f6] hover:text-[#3c6e71] transition-colors"
                        onPointerEnter={() => void import('./CarRentalDialog')}
                        onFocus={() => void import('./CarRentalDialog')}
                        onClick={() => {
                            setHasOpenedDialog(true);
                            setDialogVisible(true);
                        }}
                    >
                        Оформить
                    </button>
                </div>
                {hasOpenedDialog && (
                    <CarRentalDialog
                        car={car}
                        additionalOptions={additionalOptions}
                        deliveryPrice={deliveryPrice}
                        seasonDates={seasonDates}
                        open={dialogVisible}
                        onClose={() => setDialogVisible(false)}
                    />
                )}
            </div>
        </article>
    );
};
