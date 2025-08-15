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
    maxWidthText = 'none',
}: {
    sectionGray: boolean;
    src: string;
    alt: string;
    aspect: string;
    maxWidthImage: string;
    header: string | ReactElement;
    pyTextBlock?: string;
    paragraphs: (string | ReactElement)[];
    flexColReverse?: boolean;
    flexRowReverse?: boolean;
    maxWidthText?: string;
    border?: string;
}) {
    const styleSection = sectionGray
        ? 'py-[42px] lg:py-[68px] relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#F6F6F60D] '
        : 'py-[42px] lg:py-[68px] border-b border-[#284B63B2]';
    const textItems = paragraphs.filter((p) => typeof p === 'string');
    const elementItem = paragraphs.find((p) => typeof p !== 'string');

    return (
        <section className={`${styleSection} ${border}`}>
            <div
                className={`max-w-[1260px] ${sectionGray ? 'px-[16px] xl:px-0 ' : ''} flex ${flexColReverse ? 'flex-col-reverse' : 'flex-col'} lg:${flexRowReverse ? 'flex-row-reverse' : 'flex-row'} mx-auto gap-8 lg:gap-[68px] items-stretch`}
            >
                <article
                    className={`lg:max-w-[var(--max-w)] flex-1 text-[14px]/[20px] lg:text-[16px]/[24px] font-normal lg:py-[var(--py-lg)]`}
                    style={
                        {
                            '--py-lg': `${pyTextBlock}px`,
                            '--max-w': `${maxWidthText}px`,
                        } as React.CSSProperties
                    }
                >
                    <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                        {header}
                    </h2>
                    {textItems.map((text, i) => (
                        <p
                            key={i}
                            className={`text-[14px]/[20px] lg:text-[16px]/[24px] font-medium ${
                                i === textItems.length - 1 ? '' : 'mb-2 lg:mb-3'
                            }`}
                        >
                            {text}
                        </p>
                    ))}

                    {elementItem && (
                        <div className="hidden lg:block">{elementItem}</div>
                    )}
                </article>

                <div
                    style={
                        {
                            '--aspectRatio': aspect,
                            maxWidth: `${maxWidthImage}px`,
                        } as React.CSSProperties
                    }
                    className={`relative aspect-[var(--aspectRatio)] lg:aspect-auto flex-1 lg:w-1/2 w-full mx-auto rounded-[28px] overflow-hidden`}
                >
                    <Image fill alt={alt} src={src} className="object-cover" />
                </div>

                {elementItem && (
                    <div className="block lg:hidden">{elementItem}</div>
                )}
            </div>
        </section>
    );
}
