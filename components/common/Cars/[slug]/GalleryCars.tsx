'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { Car, DeliveryOptionsGrouped, SeasonData } from '@/lib/types/Car';
import { ArrowRightLinkIcon } from '@/lib/ui/icons/ArrowRightLinkIcon';
import CarouselControls from '@/lib/ui/common/CarouselControls';
import Link from 'next/link';

import dynamic from 'next/dynamic';
const CarCard = dynamic(
    () => import('@/components/common/Cards/CarCard').then(m => m.CarCard || m),
    {
        ssr: false,
        loading: () => (
            <div
                className="min-h-[340px] rounded-2xl bg-[#f6f6f60e]"
                aria-hidden="true"
            />
        ),
    }
);


type GalleryCarsTitleTag = 'h2' | 'h3' | 'div';
type GalleryCarsCarTitleTag = 'h3' | 'div';

interface SimilarCarsProps {
    similarCars: Car[];
    title: string;
    href: string;
    btnTitle: string;
    titleTag?: GalleryCarsTitleTag;
    carTitleTag?: GalleryCarsCarTitleTag;
    additionalOptions?: {
        label: string;
        value: string;
        price: number
    }[];
    deliveryPrice?: DeliveryOptionsGrouped;
    seasonDates?: SeasonData | null
}

export default function GalleryCars({
    similarCars,
    title,
    href,
    btnTitle,
    titleTag = 'h2',
    carTitleTag = 'h3',
    additionalOptions,
    deliveryPrice = { day: [], night: [] },
    seasonDates = null
}: SimilarCarsProps) {
    const scrollRef = useRef<HTMLUListElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [showCards, setShowCards] = useState(false);
    const TitleTag = titleTag;

    useEffect(() => {
        const section = sectionRef.current;
        if (!section || !('IntersectionObserver' in window)) {
            setShowCards(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShowCards(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '300px 0px' }
        );
        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="pt-[42px] lg:pt-[68px]">
            <div className="flex flew-row justify-between mb-5 lg:mb-6">
                <TitleTag className="text-xl font-bold lg:text-3xl self-end">{title}</TitleTag>
                <div className="hidden lg:flex flex-row px-4 gap-4">
                    <CarouselControls ref={scrollRef} />
                    <Link
                        href={href}
                        className="w-[260px] flex-center text-[18px]/[28px] font-medium gap-3 border-[#F6F6F6] border-[1.5px] rounded-[16px]"
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
                            {showCards ? (
                                <CarCard
                                    car={c}
                                    additionalOptions={additionalOptions}
                                    deliveryPrice={deliveryPrice}
                                    seasonDates={seasonDates}
                                    titleTag={carTitleTag}
                                />
                            ) : (
                                <Link
                                    href={`/cars/${c.slug}`}
                                    className="flex min-h-[340px] flex-col justify-end rounded-2xl bg-[#f6f6f60e] p-4 lg:p-[26px]"
                                >
                                    <span className="text-base font-semibold text-[#f6f6f6] lg:text-lg">
                                        {c.acf?.nazvanie_avto || c.title?.rendered || 'Автомобиль'}
                                    </span>
                                </Link>
                            )}
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
