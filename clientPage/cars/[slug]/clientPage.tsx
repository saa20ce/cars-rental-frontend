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
import { Accordion } from '@/lib/ui/common/Accordion';
import { faqItems } from '@/lib/data/faqItems';
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
    ];

    const MyPrevArrow = (props: any) => {
        const { className, style, onClick } = props;
        return (
            <div className={className} style={style} onClick={onClick}>
                <ArrowLeftIcon className="w-5 h-9 lg:w-[30px] lg:h-[48px]" shadow={true} />
            </div>
        );
    };

    const MyNextArrow = (props: any) => {
        const { className, style, onClick } = props;
        return (
            <div className={className} style={style} onClick={onClick}>
                <ArrowRightIcon className="w-5 h-9 lg:w-[30px] lg:h-[48px]" shadow={true} />
            </div>
        );
    };

    return (
        <>
            {car.acf?.nazvanie_avto && (
                <h1 className="text-[24px]/[32px] lg:text-[36px]/[100%] uppercase font-extrabold mb-5 ml-3 lg:mb-6 lg:ml-0 tracking-[0.6px] lg:tracking-[1.1px]">
                    {car.acf.nazvanie_avto}
                </h1>
            )}
            <section className="lg:flex lg:w-full lg:gap-6">
                <article className="lg:flex-1 lg:min-w-0">
                    <section className="carousel-wrapper">
                        <figure className="relative rounded-[20px] lg:rounded-[32px] overflow-hidden">
                            {galleryImages.length === 1 && (
                                <img
                                    src={galleryImages[0]}
                                    alt={car.acf?.nazvanie_avto || 'car image'}
                                    className="w-full h-[225px] rounded-[20px] lg:rounded-[32px] object-cover lg:h-[385px]"
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
                                        dots
                                        className="custom-carousel"
                                    >
                                        {galleryImages.map((imgUrl) => (
                                            <div key={imgUrl}>
                                                <img
                                                    src={imgUrl}
                                                    alt={imgUrl}
                                                    className="w-full h-[225px]  object-cover lg:h-[385px]"
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

                    <section className="mt-8 hidden lg:block border-2 border-[#f6f6f638] rounded-[32px] px-9 py-[38px]">
                        <h2 className="text-[24px]/[32px] font-bold mb-5">
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
                                className="lg:hidden underline underline-offset-4 text-[16px]/[24px] font-normal"
                            >
                                Полные условия
                            </Link>
                        </div>

                        <ul className="flex flex-wrap justify-between mt-4 text-[#F6F6F699] border-[#f6f6f638] border-b pb-8 lg:mt-5 lg:border-0 lg:py-0">
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
                            {/* (для десктопа) */}
                            <li className="hidden lg:list-item list-disc mt-4 text-[#f6f6f6] text-[18px]/[28px] font-normal w-full ml-6">
                                Полные условия аренды вы можете прочитать{' '}
                                <Link
                                    href="/require"
                                    className="font-semibold underline underline-offset-[5px]"
                                >
                                    ЗДЕСЬ
                                </Link>
                            </li>
                        </ul>
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

            <section className="py-[42px] lg:py-[68px] border-t border-[#284B63B2]">
                <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                    Часто задаваемые вопросы:
                </h2>
                <Accordion items={faqItems} />
            </section>

            <HaveQuestions />
        </>
    );
}
