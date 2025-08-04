'use client';

import CarouselControls from '@/lib/ui/common/CarouselControls';
import { useRef } from 'react';

const arrayLetterThanks = [{ key: 1, src: '/images/LetterThanks.jpg' }];

export default function LetterThanks() {
    const scrollRef = useRef<HTMLUListElement>(null);
    return (
        <section className="mt-6 lg:mt-10">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h2 className="text-[20px]/[28px] md:text-[30px]/[36px] font-bold">
                    Благодарственные письма
                </h2>
                <div className="hidden md:block">
                    <CarouselControls ref={scrollRef} />
                </div>
            </div>
            <div className="flex w-full pb-5 xl:max-w-[1260px] mx-auto">
                <ul
                    ref={scrollRef}
                    className="flex gap-[14px] lg:gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 pb-5"
                    role="list"
                    aria-label="Список благодарственных писем"
                >
                    {Array.from({ length: 9 }, (_, i) => ({
                        ...arrayLetterThanks[0],
                        key: String(i + 1),
                    })).map((item) => {
                        return (
                            <li
                                key={item.key}
                                className="min-w-[180px] lg:min-w-[250px]"
                            >
                                <img
                                    src={item.src}
                                    alt=""
                                    className="aspect-[180/254] lg:aspect-[250/354]"
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
