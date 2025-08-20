'use client';

import React, { useRef } from 'react';
import { Button, ConfigProvider } from 'antd';
import { CarCard } from '@/components/common/Cards/CarCard';
import type { Car, DeliveryOptionsGrouped, SeasonData } from '@/lib/types/Car';
import { ArrowRightLinkIcon } from '@/lib/ui/icons';
import CarouselControls from '@/lib/ui/common/CarouselControls';
import Link from 'next/link';

interface SimilarCarsProps {
    similarCars: Car[];
    title: string;
    href: string;
    btnTitle: string;
    additionalOptions?: {
        label: string;
        value: string;
        price: number;
    }[];
    deliveryPrice?: DeliveryOptionsGrouped;
    seasonDates?: SeasonData | null;
}

export default function GalleryCars({
    similarCars,
    title,
    href,
    btnTitle,
    additionalOptions,
    deliveryPrice = { day: [], night: [] },
    seasonDates = null,
}: SimilarCarsProps) {
    const scrollRef = useRef<HTMLUListElement>(null);

    return (
        <section className="pt-[42px] lg:pt-[68px]">
            <div className="flex flew-row justify-between mb-5 lg:mb-6">
                <h2 className="text-xl font-bold lg:text-3xl self-end">{title}</h2>
                <div className="hidden lg:flex flex-row px-4 gap-4">
                    <CarouselControls ref={scrollRef} />
                    <Link
                        href={href}
                        className="w-[260px] flex-center text-[18px]/[28px] font-medium gap-3 border border-[#F6F6F6] border-[1.5px] rounded-[16px]"
                    >
                        {btnTitle} <ArrowRightLinkIcon />
                    </Link>
                </div>
            </div>
            <div className="flex w-full pb-5 xl:max-w-[1260px] mx-auto">
                <ul
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 pb-5"
                    role="list"
                    aria-label={`Список ${title} автомобилей`}
                >
                    {similarCars.map((c) => (
                        <li
                            key={c.id}
                            className="min-w-[360px] lg:min-w-[404px] lg:first:pl-0"
                        >
                            <CarCard
                                car={c}
                                additionalOptions={additionalOptions}
                                deliveryPrice={deliveryPrice}
                                seasonDates={seasonDates}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="lg:hidden">
                <Link
                    href={href}
                    className="lg:hidden h-10 flex-center text-[16px]/[24px] font-medium gap-3 border border-[#F6F6F6] rounded-[16px]"
                >
                    {btnTitle} <ArrowRightLinkIcon />
                </Link>
            </div>
        </section>
    );
}
