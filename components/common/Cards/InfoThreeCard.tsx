import { DocumentCar } from '@/lib/ui/icons/DocumentCar';
import { GrayPhoneIcon } from '@/lib/ui/icons/GrayPhoneIcon';
import { MapIcon } from '@/lib/ui/icons/MapIcon';
import { ReactElement } from 'react';

type InfoThreeCardProps = {
    header: string;
    items?: {
        title: string | ReactElement;
        icon: ReactElement;
    }[];
};

const defaultItems = [
    {
        title: 'Доставляем до места',
        icon: <MapIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Оформляем дистанционно за 10 минут',
        icon: <DocumentCar className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Работаем 24/7',
        icon: <GrayPhoneIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
];

export default function InfoThreeCard({
    header,
    items = defaultItems,
}: InfoThreeCardProps) {
    return (
        <>
            <section className="pb-[42px] lg:pb-[68px] mb-[42px] lg:mb-[68px] border-b border-[#284B63B2]">
                {header && (
                    <h3 className="text-[16px]/[24px] lg:text-[20px]/[28px] font-semibold mb-8 lg:mb-9">
                        {header}
                    </h3>
                )}

                <ul className="flex flex-col lg:flex-row lg:flex-nowrap lg:justify-between gap-3 lg:gap-6">
                    {items.map(({ title, icon }, i) => (
                        <li
                            key={i}
                            className="md:flex-1 flex items-center gap-[14px] lg:gap-5 bg-[#FFFFFF0D] p-5 lg:py-5 lg:px-10 rounded-[8px] lg:rounded-[16px]"
                        >
                            <div className="bg-[#F6F6F60D] px-3 py-[14px] lg:p-[11px] rounded-[8px]">
                                {icon}
                            </div>
                            <span className="text-[16px]/[24px] lg:text-[18px]/[28px] font-medium">
                                {title}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}
