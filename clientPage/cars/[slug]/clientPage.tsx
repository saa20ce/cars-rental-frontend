'use client';

import React, { useState, useMemo } from 'react';
import { ConfigProvider, Carousel, Tabs } from 'antd';
import './index.css';
import {
    PriceCards,
    RentalCheckout,
    CarCharacteristics,
    RentSteps,
    DeliveryPriceTable,
} from '@/components/common/Cars/';

import {
    ArrowLeftIcon,
    ArrowRightIcon,
    DocumentsIcon,
    CarIcon,
    AgeIcon,
    LineIcon,
} from '@/lib/ui/icons';
import type {
    Car,
    PriceRange,
    SeasonData,
    /*DeliveryOption,*/ DeliveryPrice,
} from '@/lib/types/Car';
import { WhyUs } from '@/components/common/Cards/WhyUs';
import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';
import { getAdditionalOptions } from '@/lib/api/fetchCarData';
import Link from 'next/link';
import GalleryCars from '@/components/common/Cars/[slug]/GalleryCars';
import { SimpleTabs } from '@/components/common/SimpleTabs/SimpleTabs';
import SaleInfo from '@/components/common/Cards/SaleInfo';
interface SingleCarPageClientProps {
    car: Car;
    seasonDates: SeasonData | null;
    priceRanges: PriceRange[];
    deliveryPrice: DeliveryPrice;
    taxonomyValues: Record<string, string>;
    similarCars: Car[];
    additionalOptions: { label: string; value: string; price: number }[];
}

export default function SingleCarPageClient({
    car,
    seasonDates,
    priceRanges,
    deliveryPrice,
    taxonomyValues,
    similarCars,
    additionalOptions,
}: SingleCarPageClientProps) {
    const [seasonModeSwitch, setSeasonModeSwitch] = useState(false);

    const galleryImages = useMemo(
        () => [
            ...(car.acf?.white_gallery || []),
            ...(car.acf?.black_gallery || []),
            ...(car.acf?.gray_gallery || []),
            ...(car.acf?.blue_gallery || []),
            ...(car.acf?.red_gallery || []),
        ],
        [car.acf],
    );

    const TAB_ITEMS = [
        {
            key: '1',
            label: 'Характеристики',
            children: (
                <CarCharacteristics car={car} taxonomyValues={taxonomyValues} />
            ),
        },
        {
            key: '2',
            label: 'Комплектация',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'F.A.Q',
            children: 'Content of Tab Pane 3',
        },
    ];

    const MyPrevArrow = (props: any) => {
        const { className, style, onClick } = props;
        return (
            <div className={className} style={style} onClick={onClick}>
                <ArrowLeftIcon className="w-8 h-8 lg:w-[30px] lg:h-[48px] fill-current" />
            </div>
        );
    };

    const MyNextArrow = (props: any) => {
        const { className, style, onClick } = props;
        return (
            <div className={className} style={style} onClick={onClick}>
                <ArrowRightIcon className="w-8 h-8 lg:w-[30px] lg:h-[48px] fill-current" />
            </div>
        );
    };

    return (
        <>
            {car.acf?.nazvanie_avto && (
                <h1 className="text-2xl uppercase font-bold mb-5 ml-3 lg:text-4xl lg:ml-0">
                    {car.acf.nazvanie_avto}
                </h1>
            )}
            <section className="lg:flex lg:w-full lg:gap-6">
                <article className="lg:flex-1 lg:min-w-0">
                    <section className="carousel-wrapper">
                        <figure className="relative">
                            {galleryImages.length === 1 && (
                                <img
                                    src={galleryImages[0]}
                                    alt={car.acf?.nazvanie_avto || 'car image'}
                                    className="w-full h-[225px] rounded-2xl object-cover lg:h-[385px]"
                                />
                            )}
                            {galleryImages.length > 1 && (
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Carousel: { arrowSize: 30 },
                                        },
                                    }}
                                >
                                    <Carousel
                                        arrows
                                        prevArrow={<MyPrevArrow />}
                                        nextArrow={<MyNextArrow />}
                                        dots={false}
                                    >
                                        {galleryImages.map((imgUrl) => (
                                            <div key={imgUrl}>
                                                <img
                                                    src={imgUrl}
                                                    alt={imgUrl}
                                                    className="w-full h-[225px] rounded-2xl object-cover lg:h-[385px]"
                                                />
                                            </div>
                                        ))}
                                    </Carousel>
                                </ConfigProvider>
                            )}
                            {car.acf && <SaleInfo acf={car.acf} />}
                        </figure>
                    </section>

                    {priceRanges.length > 0 && (
                        <PriceCards
                            priceRanges={priceRanges}
                            seasonModeSwitch={seasonModeSwitch}
                        />
                    )}

                    <section className="mt-6 hidden lg:block lg:text-[18px] lg:border-2 lg:border-solid lg:border-[#f6f6f638] lg:rounded-[32px] lg:p-7">
                        <h2 className="lg:text-2xl lg:font-bold lg:mb-6">
                            Информация
                        </h2>
                        <SimpleTabs tabs={TAB_ITEMS} />
                    </section>
                </article>

                <article className="lg:flex-1 lg:min-w-0">
                    <RentalCheckout
                        car={car}
                        additionalOptions={additionalOptions}
                        deliveryPrice={deliveryPrice}
                        seasonDates={seasonDates}
                        priceRanges={priceRanges}
                        setSeasonModeSwitch={setSeasonModeSwitch}
                    />

                    <section className="mt-6 lg:mt-8 md:px-3 xl:px-7">
                        <div className="lg:text-2xl lg:mt-8 flex justify-between items-start">
                            <h2 className="text-[20px]/[28px] lg:text-[24px]/[32px] font-bold">
                                Условия аренды:
                            </h2>
                            <Link
                                href={'/require'}
                                className="lg:hidden underline text-[16px]/[24px] font-normal"
                            >
                                Полные условия
                            </Link>
                        </div>

                        <ul className="flex justify-between mt-4 text-[#F6F6F699] border-[#f6f6f638] border-b py-6 lg:mt-5 lg:border-0 lg:py-0">
                            <li className="flex items-center gap-[6px] lg:gap-[10px]">
                                <DocumentsIcon className="w-9 h-9 xl:w-[52px] xl:h-[52px]" />
                                <div className="flex flex-col">
                                    <span className="text-[14px]/[20px] lg:text-[18px]/[20px] font-bold">
                                        Документы
                                    </span>
                                    <span className="text-[12px]/[16px] lg:text-[18px]/[20px] font-normal">
                                        Паспорт и ВУ
                                    </span>
                                </div>
                            </li>

                            <li className="flex items-center gap-[6px] lg:gap-[10px]">
                                <CarIcon className="w-9 h-9 xl:w-[52px] xl:h-[52px]" />
                                <div className="flex flex-col">
                                    <span className="text-[14px]/[20px] lg:text-[18px]/[20px] font-bold">
                                        Стаж
                                    </span>
                                    <span className="text-[12px]/[16px] lg:text-[18px]/[20px] font-normal">
                                        От 2-х лет
                                    </span>
                                </div>
                            </li>

                            <li className="flex items-center gap-[6px] lg:gap-[10px]">
                                <AgeIcon className="w-9 h-9 xl:w-[52px] xl:h-[52px]" />
                                <div className="flex flex-col">
                                    <span className="text-[14px]/[20px] lg:text-[18px]/[20px] font-bold">
                                        Возраст
                                    </span>
                                    <span className="text-[12px]/[16px] lg:text-[18px]/[20px] font-normal">
                                        От 22-х лет
                                    </span>
                                </div>
                            </li>
                        </ul>

                        {/* (для десктопа) */}
                        <div className="hidden lg:block mt-[18px] text-lg">
                            <p>
                                Полные условия аренды вы можете прочитать{' '}
                                <Link
                                    href="/require"
                                    className="font-semibold underline underline-offset-4"
                                >
                                    ЗДЕСЬ
                                </Link>
                            </p>
                        </div>
                    </section>
                    <section className="mt-6 block lg:hidden">
                        <SimpleTabs tabs={TAB_ITEMS} />
                    </section>
                </article>
            </section>

            <div className="pb-[42px] lg:pb-[68px]">
                <GalleryCars
                    title="Похожие авто"
                    btnTitle="Все бизнес"
                    similarCars={similarCars}
                    href="/service/arenda-avto-biznes-klassa"
                    seasonDates={seasonDates}
                    deliveryPrice={deliveryPrice}
                    additionalOptions={additionalOptions}
                />
            </div>

            <RentSteps />

            <div className="w-full border-t-2 border-[#284B63B2] h-[1px] my-10 lg:hidden"></div>

            <section className="mt-10 lg:mt-[68px]">
                <div className="flex flex-row">
                    <h2 className="text-xl font-bold lg:text-3xl">
                        Стоимость доставки авто:
                    </h2>
                    <div className="hidden lg:block ml-4 mt-[6px]">
                        <LineIcon />
                    </div>
                    <div className="hidden text-[#FFD7A6] lg:block text-2xl ml-4 mt-[2px]">
                        Доставка 24/7
                    </div>
                </div>
                <DeliveryPriceTable deliveryPrice={deliveryPrice} />
            </section>

            <div className="w-full border-t-2 border-[#284B63B2] h-[1px] my-10 lg:my-[68px]"></div>

            <WhyUs />

            <HaveQuestions />
        </>
    );
}
