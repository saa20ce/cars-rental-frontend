import Image from 'next/image';
import { ReactElement } from 'react';

export default function TextImageSection({
    sectionGray,
    src,
    alt,
    aspect,
    maxWidthImage,
    header,
    pyTextBlock,
    paragraphs,
    flexColReverse,
    flexRowReverse,
    border,
    maxWidthText = '0',
}: {
    sectionGray: boolean;
    src: string;
    alt: string;
    aspect: string;
    maxWidthImage: string;
    header: string | ReactElement;
    pyTextBlock?: string;
    paragraphs: string[];
    flexColReverse?: boolean;
    flexRowReverse?: boolean;
    maxWidthText?: string;
    border?: string;
}) {
    const styleSection = sectionGray
        ? 'py-[42px] lg:py-[68px] relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#F6F6F60D] '
        : 'py-[42px] lg:py-[68px] border-b border-[#284B63B2]';
    return (
        <section className={`${styleSection} ${border}`}>
            <div
                className={`max-w-[1260px] ${sectionGray ? 'px-[16px] xl:px-0 ' : ''} flex ${flexColReverse ? 'flex-col-reverse' : 'flex-col'} lg:${flexRowReverse ? 'flex-row-reverse' : 'flex-row'} mx-auto gap-8 lg:gap-[68px] items-stretch`}
            >
                <article
                    className={`lg:max-w-[${maxWidthText}px] flex-1 text-[14px]/[20px] lg:text-[16px]/[24px] font-normal lg:py-${pyTextBlock}`}
                >
                    <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                        {header}
                    </h2>
                    {paragraphs.map((text, i) =>
                        i === paragraphs.length - 1 ? (
                            <p
                                key={i}
                                className="text-[14px]/[20px] lg:text-[16px]/[24px] font-medium"
                            >
                                {text}
                            </p>
                        ) : (
                            <p
                                key={i}
                                className="text-[14px]/[20px] lg:text-[16px]/[24px] font-medium mb-2 lg:mb-3"
                            >
                                {text}
                            </p>
                        ),
                    )}
                </article>
                <div
                    className={`relative aspect-[${aspect}] lg:aspect-auto flex-1 lg:w-1/2 w-full mx-auto max-w-[${maxWidthImage}px] rounded-[28px] overflow-hidden`}
                >
                    <Image fill alt={alt} src={src} className="object-cover" />
                </div>
            </div>
        </section>
    );
}
