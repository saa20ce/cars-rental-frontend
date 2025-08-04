'use client';

import React, { useRef } from 'react';
import { Button, ConfigProvider } from 'antd';
import { CarCard } from '@/components/common/Cards/CarCard';
import type { Car } from '@/lib/types/Car';
import { ArrowRightLinkIcon } from '@/lib/ui/icons';
import CarouselControls from '@/lib/ui/common/CarouselControls';

interface SimilarCarsProps {
    similarCars: Car[];
    title: string;
    href?: string;
    btnTitle: string;
}

export default function GalleryCars({
    similarCars,
    title,
    href,
    btnTitle,
}: SimilarCarsProps) {
    const scrollRef = useRef<HTMLUListElement>(null);

    return (
        <section className="pt-[42px] lg:pt-[68px]">
            <div className="flex flew-row justify-between pb-6">
                <h2 className="text-xl font-bold ml-4 lg:text-3xl">{title}</h2>
                <div className="hidden lg:flex flex-row px-4 gap-4">
                    <CarouselControls ref={scrollRef} />
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    textHoverBg: '#f6f6f6',
                                    colorPrimaryHover: '#f6f6f6',
                                    colorPrimaryBorderHover: 'f6f6f6',
                                    defaultHoverBorderColor: 'f6f6f6',
                                    defaultActiveBorderColor: 'f6f6f6',
                                    defaultActiveColor: '#f6f6f6',
                                    colorBorder: 'transparent',
                                },
                            },
                        }}
                    >
                        <Button
                            ghost
                            className="filterButton"
                            icon={
                                <div className="mt-[-3px]">
                                    <ArrowRightLinkIcon />
                                </div>
                            }
                            aria-label={`Посмотреть все ${title} автомобили`}
                            iconPosition="end"
                            style={{
                                height: '44px',
                                width: '260px',
                                fontSize: '16px',
                                borderRadius: '16px',
                            }}
                        >
                            <span className="mt-[-1px]">{btnTitle}</span>
                        </Button>
                    </ConfigProvider>
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
                            <CarCard car={c} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="lg:hidden">
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                textHoverBg: '#f6f6f6',
                                colorPrimaryHover: '#f6f6f6',
                                colorPrimaryBorderHover: 'f6f6f6',
                                defaultHoverBorderColor: 'f6f6f6',
                                defaultActiveBorderColor: 'f6f6f6',
                                defaultActiveColor: '#f6f6f6',
                                colorBorder: 'transparent',
                            },
                        },
                    }}
                >
                    <Button
                        ghost
                        className="filterButton"
                        icon={
                            <div className="mt-[-3px]">
                                <ArrowRightLinkIcon />
                            </div>
                        }
                        aria-label={`Посмотреть все ${title} автомобили`}
                        iconPosition="end"
                        style={{
                            height: '44px',
                            width: '100%',
                            fontSize: '16px',
                            borderRadius: '16px',
                        }}
                    >
                        <span className="mt-[-1px]">{btnTitle}</span>
                    </Button>
                </ConfigProvider>
            </div>
        </section>
    );
}
