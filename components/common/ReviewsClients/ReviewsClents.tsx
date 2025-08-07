'use client';

import CarouselControls from '@/lib/ui/common/CarouselControls';
import { EmptyStarIcon } from '@/lib/ui/icons/EmptyStarIcon';
import { FullStarIcon } from '@/lib/ui/icons/FullStarIcon';
import { useRef, useState } from 'react';

type CustomerReview = {
    id: number;
    full_name: string;
    review_text: string;
    rating: number;
    submitted_at: string;
};

export default function ReviewsClients({ reviews }: { reviews: CustomerReview[] }) {
    const scrollRef = useRef<HTMLUListElement>(null);
    const [expandedStates, setExpandedStates] = useState<{ [key: string]: boolean }>({});

    const toggleExpanded = (key: string) => {
        setExpandedStates((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <section className="mt-[42px] lg:mt-[68px] relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#F6F6F60D]">
            <div className="px-4 lg:px-[10px] py-[42px] lg:py-[68px] w-full xl:max-w-[1260px] mx-auto">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                    <h2 className="text-[20]/[28px] md:text-[30px]/[36px] font-bold">
                        Отзывы клиентов
                    </h2>
                    <div className="hidden md:block">
                        <CarouselControls ref={scrollRef} />
                    </div>
                </div>
                <div className="flex">
                    <ul
                        ref={scrollRef}
                        className="flex gap-9 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 pb-4 lg:pb-9"
                        role="list"
                        aria-label="Список отзывов клиентов"
                    >
                        {reviews.map((item) => {
                            const isLong = item.review_text.length > 150;
                            const isExpanded = expandedStates[item.id] || false;
                            const displayedText = isExpanded || !isLong
                                ? item.review_text
                                : item.review_text.slice(0, 150).trim();

                            return (
                                <li
                                    key={item.id}
                                    className="min-w-[349px] md:min-w-[390px] w-full"
                                >
                                    <span className="text-[16px]/[24px] font-medium mb-2">
                                        {item.full_name}
                                    </span>
                                    <div className="flex gap-1 mb-1">
                                        {Array.from({ length: 5 }).map((_, i) =>
                                            i < item.rating ? <FullStarIcon key={i} /> : <EmptyStarIcon key={i} />
                                        )}
                                    </div>
                                    <span className="text-[14px]/[20px] font-medium text-[#F6F6F699] ">
                                        {new Date(item.submitted_at)
                                            .toLocaleDateString('ru-RU', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })
                                            .replace(' г.', '')}
                                    </span>
                                    <p className="text-[16px]/[24px] font-medium pt-[14px] mt-[14px] border-t border-[#F6F6F633]">
                                        {displayedText}
                                        {isLong && !isExpanded && '... '}
                                        {isLong && (
                                            <button
                                                onClick={() =>
                                                    toggleExpanded(String(item.id))
                                                }
                                                className={`${isExpanded ? 'md:ml-2' : ''} underline`}
                                            >
                                                {isExpanded ? 'Показать меньше' : 'Показать больше'}
                                            </button>
                                        )}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
}
