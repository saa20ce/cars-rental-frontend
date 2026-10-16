'use client';

import React, { useState, useMemo, useRef } from 'react';
import NextImage from 'next/image';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
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
    LineIcon,
} from '@/lib/ui/icons';
import type {
    Car,
    PriceRange,
    SeasonData,
    DeliveryPrice,
} from '@/lib/types/Car';
import { WhyUs } from '@/components/common/Cards/WhyUs';
import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';
import Link from 'next/link';
import GalleryCars from '@/components/common/Cars/[slug]/GalleryCars';
import SaleInfo from '@/components/common/Cards/SaleInfo';
import { Accordion } from '@/lib/ui/common/Accordion';
import { faqItems } from '@/lib/data/faqItems';
import { MenIcon } from '@/lib/ui/icons/MenIcon';
import { isDaySeason } from '@/lib/helpers/RentalCheckoutHelper';
import { getSeasonDatesForCar } from '@/lib/helpers/carSeasonDates';

const CarImagePreview = dynamic(
    () => import('@/components/common/Cars/[slug]/CarImagePreview'),
    { ssr: false },
);
interface SingleCarPageClientProps {
    car: Car;
    seasonDates: SeasonData | null;
    priceRanges: PriceRange[];
    deliveryPrice: DeliveryPrice;
    taxonomyValues: Record<string, string>;
    similarCars: Car[];
    similarCarsHref: string;
    similarCarsBtnTitle: string;
    additionalOptions: { label: string; value: string; price: number }[];
}

export default function SingleCarPageClient({
    car,
    seasonDates,
    priceRanges,
    deliveryPrice,
    taxonomyValues,
    similarCars,
    similarCarsHref,
    similarCarsBtnTitle,
    additionalOptions,
}: SingleCarPageClientProps) {
    const carSeasonDates = useMemo(
        () => getSeasonDatesForCar(car, seasonDates),
        [car, seasonDates],
    );
    const [seasonModeSwitch, setSeasonModeSwitch] = useState(() =>
        isDaySeason(dayjs(), carSeasonDates),
    );
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(0);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const carouselPointer = useRef<{ x: number; y: number } | null>(null);
    const carouselDragged = useRef(false);

    const openPreview = (index: number) => {
        setPreviewIndex(index);
        setPreviewVisible(true);
    };

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

    const showPreviousImage = () => {
        setGalleryIndex((index) =>
            index === 0 ? galleryImages.length - 1 : index - 1,
        );
    };

    const showNextImage = () => {
        setGalleryIndex((index) => (index + 1) % galleryImages.length);
    };

    const rentRequirements = useMemo(() => {
        const isBusiness = car.klass?.includes(269);

        return {
            experience: isBusiness ? 'От 10 лет' : 'От 3-х лет',
            age: isBusiness ? 'От 30 лет' : 'От 23-х лет',
        };
    }, [car.klass]);

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
                        <figure
                            className="relative rounded-[20px] lg:rounded-[32px] overflow-hidden"
                            onPointerDownCapture={(event) => {
                                carouselPointer.current = {
                                    x: event.clientX,
                                    y: event.clientY,
                                };
                                carouselDragged.current = false;
                            }}
                            onPointerMoveCapture={(event) => {
                                const start = carouselPointer.current;
                                if (
                                    start &&
                                    Math.hypot(
                                        event.clientX - start.x,
                                        event.clientY - start.y,
                                    ) > 8
                                ) {
                                    carouselDragged.current = true;
                                }
                            }}
                            onPointerUpCapture={(event) => {
                                const start = carouselPointer.current;
                                carouselPointer.current = null;

                                if (!start || galleryImages.length < 2) return;

                                const deltaX = event.clientX - start.x;
                                const deltaY = event.clientY - start.y;

                                if (
                                    Math.abs(deltaX) > 48 &&
                                    Math.abs(deltaX) > Math.abs(deltaY)
                                ) {
                                    carouselDragged.current = true;
                                    if (deltaX > 0) showPreviousImage();
                                    else showNextImage();
                                }
                            }}
                            onPointerCancelCapture={() => {
                                carouselPointer.current = null;
                                carouselDragged.current = true;
                            }}
                            onClickCapture={(event) => {
                                if (
                                    carouselDragged.current &&
                                    event.detail !== 0
                                ) {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }
                            }}
                        >
                            {galleryImages.length > 0 && (
                                <div className="relative h-[225px] w-full lg:h-[385px]">
                                    <button
                                        type="button"
                                        className="relative block h-full w-full cursor-zoom-in overflow-hidden border-0 bg-transparent p-0"
                                        aria-label={`Открыть фото автомобиля ${galleryIndex + 1} на весь экран`}
                                        onPointerEnter={() => {
                                            void import('@/components/common/Cars/[slug]/CarImagePreview');
                                        }}
                                        onFocus={() => {
                                            void import('@/components/common/Cars/[slug]/CarImagePreview');
                                        }}
                                        onClick={() =>
                                            openPreview(galleryIndex)
                                        }
                                    >
                                        <NextImage
                                            src={galleryImages[galleryIndex]}
                                            alt={`${car.acf?.nazvanie_avto || 'Автомобиль'} — фото ${galleryIndex + 1}`}
                                            fill
                                            draggable={false}
                                            sizes="(max-width: 1023px) calc(100vw - 32px), 618px"
                                            className="object-cover"
                                            priority={galleryIndex === 0}
                                            fetchPriority={
                                                galleryIndex === 0
                                                    ? 'high'
                                                    : 'auto'
                                            }
                                        />
                                    </button>
                                    {galleryImages.length > 1 && (
                                        <>
                                            <button
                                                type="button"
                                                aria-label="Предыдущее фото автомобиля"
                                                onClick={showPreviousImage}
                                                className="absolute left-[18px] top-1/2 z-10 -translate-y-1/2 border-0 bg-transparent p-2"
                                            >
                                                <ArrowLeftIcon
                                                    className="h-9 w-5 lg:h-[48px] lg:w-[30px]"
                                                    shadow
                                                />
                                            </button>
                                            <button
                                                type="button"
                                                aria-label="Следующее фото автомобиля"
                                                onClick={showNextImage}
                                                className="absolute right-[18px] top-1/2 z-10 -translate-y-1/2 border-0 bg-transparent p-2"
                                            >
                                                <ArrowRightIcon
                                                    className="h-9 w-5 lg:h-[48px] lg:w-[30px]"
                                                    shadow
                                                />
                                            </button>
                                            <div
                                                className="absolute bottom-[10px] left-1/2 z-10 flex max-w-[calc(100%_-_32px)] -translate-x-1/2 items-center justify-center lg:bottom-3"
                                                aria-label="Выбор фотографии автомобиля"
                                            >
                                                {galleryImages.map(
                                                    (_, index) => (
                                                        <button
                                                            key={index}
                                                            type="button"
                                                            aria-label={`Показать фото ${index + 1}`}
                                                            aria-current={
                                                                index ===
                                                                galleryIndex
                                                                    ? 'true'
                                                                    : undefined
                                                            }
                                                            onClick={() =>
                                                                setGalleryIndex(
                                                                    index,
                                                                )
                                                            }
                                                            className="flex h-5 w-5 shrink-0 items-center justify-center border-0 bg-transparent p-0"
                                                        >
                                                            <span
                                                                className={`block h-2 w-2 rounded-full ${
                                                                    index ===
                                                                    galleryIndex
                                                                        ? 'bg-[#F6F6F6]'
                                                                        : 'bg-[#F6F6F633]'
                                                                }`}
                                                            />
                                                        </button>
                                                    ),
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                            {car.acf && <SaleInfo acf={car.acf} />}
                        </figure>
                        {previewVisible && galleryImages.length > 0 && (
                            <CarImagePreview
                                images={galleryImages}
                                carName={car.acf?.nazvanie_avto || 'Автомобиль'}
                                visible={previewVisible}
                                current={previewIndex}
                                onVisibleChange={setPreviewVisible}
                                onCurrentChange={setPreviewIndex}
                            />
                        )}
                    </section>

                    {priceRanges.length > 0 && (
                        <PriceCards
                            priceRanges={priceRanges}
                            seasonModeSwitch={seasonModeSwitch}
                            seasonDates={carSeasonDates}
                            itemLabelTag="div"
                        />
                    )}

                    <section className="mt-8 hidden lg:block border-2 border-[#f6f6f638] rounded-[32px] px-9 py-[38px]">
                        <div className="text-[24px]/[32px] font-bold mb-5">
                            Характеристики
                        </div>
                        <CarCharacteristics
                            car={car}
                            taxonomyValues={taxonomyValues}
                        />
                    </section>
                </article>

                <article className="lg:flex-1 lg:min-w-0">
                    <RentalCheckout
                        car={car}
                        additionalOptions={additionalOptions}
                        deliveryPrice={deliveryPrice}
                        seasonDates={carSeasonDates}
                        priceRanges={priceRanges}
                        setSeasonModeSwitch={setSeasonModeSwitch}
                        periodSubheadingTag="div"
                        additionalServicesTitleTag="div"
                        costHeadingTag="div"
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
                                        {rentRequirements.experience}
                                    </span>
                                </div>
                            </li>

                            <li className="flex items-center gap-[6px] lg:gap-[10px]">
                                <MenIcon className="w-9 h-9 xl:w-[52px] xl:h-[52px]" />
                                <div className="flex flex-col">
                                    <span className="text-[14px]/[20px] lg:text-[18px]/[20px] font-bold">
                                        Возраст
                                    </span>
                                    <span className="text-[12px]/[16px] lg:text-[18px]/[20px] font-normal">
                                        {rentRequirements.age}
                                    </span>
                                </div>
                            </li>
                            <li className="hidden lg:list-item list-disc mt-4 text-[#f6f6f6] text-[18px]/[28px] font-normal w-full ml-6">
                                Полные условия аренды вы можете прочитать{' '}
                                <Link
                                    href="/require"
                                    prefetch={false}
                                    className="font-semibold underline underline-offset-[5px]"
                                >
                                    ЗДЕСЬ
                                </Link>
                            </li>
                        </ul>
                    </section>
                    <section className="mt-6 block lg:hidden">
                        <div className="text-[20px]/[28px] font-bold mb-[16px]">
                            Характеристики
                        </div>
                        <CarCharacteristics
                            car={car}
                            taxonomyValues={taxonomyValues}
                        />
                    </section>
                </article>
            </section>

            <div className="pb-[42px] lg:pb-[68px]">
                <GalleryCars
                    title="Похожие авто"
                    btnTitle={similarCarsBtnTitle}
                    similarCars={similarCars}
                    href={similarCarsHref}
                    titleTag="h3"
                    carTitleTag="div"
                    seasonDates={seasonDates}
                    deliveryPrice={deliveryPrice}
                    additionalOptions={additionalOptions}
                />
            </div>

            <RentSteps headingTag="div" stepTitleTag="div" />

            <div className="w-full border-t-2 border-[#284B63B2] h-[1px] my-10 lg:hidden"></div>

            <section className="mt-10 lg:mt-[68px]">
                <div className="flex flex-row">
                    <div className="text-xl font-bold lg:text-3xl">
                        Стоимость доставки авто:
                    </div>
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

            <WhyUs headingTag="div" />

            <section className="py-[42px] lg:py-[68px] border-t border-[#284B63B2]">
                <div className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                    Часто задаваемые вопросы:
                </div>
                <Accordion items={faqItems} />
            </section>

            <HaveQuestions headingTag="div" />
        </>
    );
}
