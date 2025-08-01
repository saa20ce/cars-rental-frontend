'use client';

import CarouselControls from '@/lib/ui/common/CarouselControls';
import { EmptyStarIcon } from '@/lib/ui/icons/EmptyStarIcon';
import { FullStarIcon } from '@/lib/ui/icons/FullStarIcon';
import { useRef, useState } from 'react';

const reviews = [
    {
        key: 1,
        userName: 'Антон',
        rating: 3,
        date: '2023-02-23',
        review: 'Вежливый и пунктуальный менеджер, машина (брали крэту полноприводную) чистая и на хорошем ходу, отлично выдержала поездку на кату-ярык и много других трудностей. Бронировал не сильно заранее и были лучшие цены из имеющихся в Новосибирске. Расход топливо не большой',
    },
];

export default function ReviewsClents(props: any) {
    const scrollRef = useRef<HTMLUListElement>(null); 
    const [expandedStates, setExpandedStates] = useState<{ [key: string]: boolean }>({});

    const toggleExpanded = (key: string) => {
        setExpandedStates((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <section className="mt-6 lg:mt-10">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h2 className="text-[20]/[28px] md:text-[30px]/[36px] font-bold">
                    Отзывы клиентов
                </h2>
                <div className="hidden md:block">
                    <CarouselControls ref={scrollRef} />
                </div>
            </div>
            <div className="flex w-full xl:max-w-[1260px] mx-auto">
                <ul
                    ref={scrollRef}
                    className="flex gap-9 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 pb-4 lg:pb-9"
                    role="list"
                    aria-label="Список благодарственных писем"
                >
                    {Array.from({ length: 9 }, (_, i) => ({
                        ...reviews[0],
                        key: String(i + 1),
                    })).map((item) => {
                        const isLong = item.review.length > 150;
                        const isExpanded = expandedStates[item.key] || false;
                        const displayedText =
                            isExpanded || !isLong
                                ? item.review
                                : item.review.slice(0, 150).trim();

                        return (
                            <li key={item.key} className="min-w-[349px] md:min-w-[390px] w-full">
                                <span className="text-[16px]/[24px] font-medium mb-2">
                                    {item.userName}
                                </span>
                                <div className="flex gap-1 mb-1">
                                    {Array.from({ length: 5 }).map((_, i) => {
                                        const starRating = item.rating - i;
                                        if (starRating > 0)
                                            return <FullStarIcon key={i} />;
                                        else return <EmptyStarIcon key={i} />;
                                    })}
                                </div>
                                <span className="text-[14px]/[20px] font-medium text-[#F6F6F699] ">
                                    {new Date(item.date)
                                        .toLocaleDateString('ru-RU', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })
                                        .replace(' г.', '')}
                                </span>
                                <p className="text-[16px]/[24px] font-medium pt-[14px] mt-[14px] border-t border-[#F6F6F633]" >
                                    {displayedText}
                                    {isLong && !isExpanded && '... '}
                                    {isLong && (
                                        <button
                                            onClick={() => toggleExpanded(item.key)}
                                            className={`${isExpanded ? 'md:ml-2' : ''} underline`}
                                        >
                                            {isExpanded
                                                ? 'Показать меньше'
                                                : 'Показать больше'}
                                        </button>
                                    )}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}