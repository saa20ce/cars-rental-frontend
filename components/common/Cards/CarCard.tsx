import React from 'react';
import Link from 'next/link';
import type { Car as LibCar, CarACF } from '@/lib/types/Car';
import CustomButton from '@/lib/ui/common/Button';

interface CarCardProps {
    car: LibCar;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
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

    let discountStart;
    let discountEnd;

    if (acf.skidka && acf.skidka_start && acf.skidka_end) {
        const [dayStart, monthStart, yearStart] = acf.skidka_start
            .split('/')
            .map(Number);
        discountStart = new Date(yearStart, monthStart - 1, dayStart);

        const [dayEnd, monthEnd, yearEnd] = acf.skidka_end
            .split('/')
            .map(Number);
        discountEnd = new Date(yearEnd, monthEnd - 1, dayEnd);
    }

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
                    {acf.skidka && (
                        <div className="flex-center gap-2 h-7 absolute top-[10px] right-[20px] bg-[#0000008A] rounded-full text-[16px]/[24px] font-medium ">
                            <span className="bg-[#9E4242AD] py-[2px] px-[18px] rounded-full">{`-${acf.skidka}%`}</span>
                            {discountStart && discountEnd && (
                                <span className="py-[5px] pr-[18px]">
                                    {`с ${discountStart.getDate()} по ${discountEnd.toLocaleString('ru', { month: 'long', day: 'numeric' })}`}
                                </span>
                            )}
                        </div>
                    )}
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
                    >
                        Оформить
                    </CustomButton>
                </div>
            </div>
        </article>
    );
};
