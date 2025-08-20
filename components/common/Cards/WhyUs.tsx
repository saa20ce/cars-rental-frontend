'use client';

import {
    ThumbsUp,
    TimeIcon,
    CarDescIcon,
    HandShakeIcon,
    CascoIcon,
    BubbleIcon,
} from '@/lib/ui/icons';

const itemListWhyUs = [
    {
        icon: <ThumbsUp className="h-9 w-9 lg:h-10 lg:w-10" />,
        text: <>Высококачественный <br className='hidden lg:block'/> клиентский сервис</>,
    },
    {
        icon: <TimeIcon className="h-9 w-9 lg:h-12 lg:w-12" />,
        text: 'Доставка автомобилей 24/7',
    },
    {
        icon: <CarDescIcon className="h-9 w-9 lg:h-10 lg:w-10" />,
        text: <>Широкий выбор <br className='hidden lg:block'/> моделей в автопарке</>,
    },
    {
        icon: <HandShakeIcon className="h-8 w-10 lg:h-10 lg:w-[50px]" />,
        text: <>Система лояльности <br className='hidden lg:block'/> для постоянных клиентов</>,
    },
    {
        icon: (
            <CascoIcon className="h-[45px] w-9 lg:h-[53px] lg:w-[42px]" />
        ),
        text: <>КАСКО <br className='hidden lg:block'/> включена в стоимость</>,
    },
    {
        icon: <BubbleIcon className="h-9 w-9 lg:w-[50px] lg:h-10" />,
        text: <>Без скрытых платежей <br className='hidden lg:block'/> и комиссий</>,
    },
];

export const WhyUs = () => {
    return (
        <section className="pb-[42px] lg:pb-[68px]">
            <h2 className="text-xl lg:text-3xl font-bold mt-10 mb-5 lg:mb-6">
                Почему нам доверяют:
            </h2>
            <ul className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6  list-none p-0 m-0">
                {itemListWhyUs.map((item) => (
                    <li className="flex flex-row gap-[14px] bg-[#f6f6f60e] rounded-2xl p-5 lg:h-full lg:pb-6 lg:pt-6 lg:pr-10 lg:pl-10">
                        <div className="h-[60px] min-w-[60px] lg:h-[70px] lg:min-w-[70px] flex-center bg-[#F6F6F60D] rounded-[8px] lg:rounded-[12px]">
                            {item.icon}
                        </div>
                        <span className="content-center text-[16px]/[24px] lg:text-[18px]/[28px] font-medium">
                           {item.text}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
};
