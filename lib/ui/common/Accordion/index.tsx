import type { ReactNode } from 'react';
import { ArrowCollapseIcon } from '@/lib/ui/icons/ArrowCollapseIcon';

export const Accordion = ({
    items,
}: {
    items?: {
        key: string;
        label: ReactNode;
        children: ReactNode;
        className: string;
    }[];
}) => {
    return (
        <div className="faqCollapse text-[16px] leading-[24px] font-medium lg:text-[18px] lg:leading-[28px]">
            {items?.map((item) => (
                <details key={item.key} name="rentasib-faq" className={item.className}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-[10px] lg:px-6 lg:py-4">
                        {item.label}
                        <ArrowCollapseIcon className="faqCollapseArrow shrink-0 rotate-180" />
                    </summary>
                    <div className="faqCollapseContent px-4 pb-5 pt-3 lg:px-6 lg:pb-6 lg:pt-5">
                        {item.children}
                    </div>
                </details>
            ))}
        </div>
    );
};
