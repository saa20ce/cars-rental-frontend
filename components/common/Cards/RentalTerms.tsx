import { ReactElement } from 'react';

type RentalTermsProps = {
    header?: string;
    items: {
        title: string;
        icon: ReactElement;
    }[];
};

export default function RentalTerms({ header, items }: RentalTermsProps) {
    return (
        <section className="py-[42px] lg:py-[68px]">
            {header && (
                <h2 className="hidden lg:block text-[30px]/[36px] font-bold  mb-6">
                    {header}
                </h2>
            )}

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
                {items.map(({ title, icon }, i) => (
                    <li
                        key={i}
                        className="flex items-center gap-[14px] lg:gap-5 bg-[#FFFFFF0D] p-5 lg:py-5 lg:py-6 lg:px-10 rounded-[8px] lg:rounded-[16px]"
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
    );
}
