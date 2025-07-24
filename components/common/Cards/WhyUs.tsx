'use client';

import {
    ThumbsUp,
    TimeIcon,
    CarDescIcon,
    HandShakeIcon,
    CascoIcon,
    BubbleIcon,
} from '@/lib/ui/icons';

export const WhyUs = () => {
    return (
        <section className='pb-[42px] lg:pb-[68px]'>
            <h2 className="text-xl lg:text-3xl font-bold mt-10 mb-5 lg:mb-6">
                Почему нам доверяют:
            </h2>
            <ul className="flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:gap-6 text-[16px] lg:text-[18px] list-none p-0 m-0">
                <li className="flex flex-row gap-[14px] bg-[#f6f6f60e] rounded-2xl p-5 lg:h-full lg:pb-6 lg:pt-6 lg:pr-10 lg:pl-10">
                    <ThumbsUp />
                    <span className="flex-wrap content-center">
                        Высококачественный клиентский сервис
                    </span>
                </li>
                <li className="flex flex-row gap-[14px] bg-[#f6f6f60e] rounded-2xl p-5 lg:h-full lg:pb-6 lg:pt-6 lg:pr-10 lg:pl-10">
                    <TimeIcon />
                    <span className="flex-wrap content-center">
                        Доставка автомобилей 24/7
                    </span>
                </li>
                <li className="flex flex-row gap-[14px] bg-[#f6f6f60e] rounded-2xl p-5 lg:h-full lg:pb-6 lg:pt-6 lg:pr-10 lg:pl-10">
                    <CarDescIcon />
                    <span className="flex-wrap content-center">
                        Широкий выбор моделей в автопарке
                    </span>
                </li>
                <li className="flex flex-row gap-[14px] bg-[#f6f6f60e] rounded-2xl p-5 lg:h-full lg:pb-6 lg:pt-6 lg:pr-10 lg:pl-10">
                    <HandShakeIcon />
                    <span className="flex-wrap content-center">
                        Система лояльности для постоянных клиентов
                    </span>
                </li>
                <li className="flex flex-row gap-[14px] bg-[#f6f6f60e] rounded-2xl p-5 lg:h-full lg:pb-6 lg:pt-6 lg:pr-10 lg:pl-10">
                    <CascoIcon />
                    <span className="flex-wrap content-center w-[220px]">
                        КАСКО
                        <span className="hidden md:inline">
                            <br />
                        </span>{' '}
                        включена в стоимость
                    </span>
                </li>
                <li className="flex flex-row gap-[14px] bg-[#f6f6f60e] rounded-2xl p-5 lg:h-full lg:pb-6 lg:pt-6 lg:pr-10 lg:pl-10">
                    <BubbleIcon />
                    <span className="flex-wrap content-center">
                        Без скрытых платежей и комиссий
                    </span>
                </li>
            </ul>
        </section>
    );
};
