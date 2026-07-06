'use client';

import CarouselControls from '@/lib/ui/common/CarouselControls';
import { Image as AntImage } from 'antd';
import { useRef, useState } from 'react';

type Letter = {
    id: number;
    image: string;
    description: string;
};

type LetterThanksHeadingTag = 'h2' | 'div';

export default function LetterThanks({
    letters,
    headingTag = 'h2',
}: {
    letters: Letter[];
    headingTag?: LetterThanksHeadingTag;
}) {
    const scrollRef = useRef<HTMLUListElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const HeadingTag = headingTag;

    return (
        <section className="mt-6 lg:mt-10">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
                <HeadingTag className="text-[20px]/[28px] md:text-[30px]/[36px] font-bold">
                    Благодарственные письма
                </HeadingTag>
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
                            className="min-w-[180px] max-w-[180px] lg:min-w-[250px] lg:max-w-[250px]"
                        >
                            <button
                                type="button"
                                className="block h-full cursor-zoom-in border-0 bg-transparent p-0"
                                aria-label="Открыть благодарственное письмо"
                                onClick={() => setPreviewImage(letter.image)}
                            >
                                <img
                                    src={letter.image}
                                    alt="Благодарственное письмо"
                                    className="h-full max-h-[250px] object-cover"
                                />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {previewImage && (
                <AntImage
                    src={previewImage}
                    alt="Благодарственное письмо"
                    style={{ display: 'none' }}
                    preview={{
                        visible: Boolean(previewImage),
                        src: previewImage,
                        onVisibleChange: (visible) => {
                            if (!visible) {
                                setPreviewImage(null);
                            }
                        },
                        toolbarRender: () => null,
                    }}
                />
            )}
        </section>
    );
}
