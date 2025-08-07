'use client';

import CarouselControls from '@/lib/ui/common/CarouselControls';
import { useRef,useEffect,useState } from 'react';
import { fetchThankYouLetters, ThankYouLetter } from '@/lib/api/fetchThankLetters';


export default function LetterThanks() {
    const scrollRef = useRef<HTMLUListElement>(null);
    const [letters, setLetters] = useState<ThankYouLetter[]>([]);

    useEffect(() => {
        fetchThankYouLetters()
            .then(setLetters)
            .catch((err) => console.error('Ошибка загрузки писем:', err));
    }, []);
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
                    {letters.map((letter) => (
                        <li
                            key={letter.id}
                            className="min-w-[180px] lg:min-w-[250px]"
                        >
                            <img
                                src={letter.image}
                                alt="Благодарственное письмо"
                                className="aspect-[180/254] lg:aspect-[250/354] object-cover"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
