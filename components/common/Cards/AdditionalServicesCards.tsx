import { GoIcon } from '@/lib/ui/icons/GoIcon';
import Link from 'next/link';

type AdditionalServicesCardsProps = {
    title: string;
    key: string;
    href: string;
    src: string;
};

export default function AdditionalServicesCards({
    items,
}: {
    items: AdditionalServicesCardsProps[];
}) {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 my-8 lg:my-9">
            {items.map((item, i) => (
                <Link
                    href={item.href}
                    key={item.key}
                    className="group relative flex items-center gap-3 sm:gap-0 sm:items-stretch sm:flex-col sm:h-auto h-[92px] rounded-[16px] sm:border sm:border-[#F6F6F633] bg-[#F6F6F60D] overflow-hidden sm:aspect-[297/197]"
                >
                    <div className="w-[139px] sm:w-full">
                        <img
                            src={item.src}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex justify-between items-center flex-1 pr-4">
                        <h3
                            className={` max-w-[155px] sm:max-w-none sm:absolute bottom-0  text-[#F6F6F6] text-[14px] lg:text-[16px] sm:w-full sm:text-center font-medium  py-3 sm:text-nowrap sm:text-center sm:bg-[#142632D6] sm:group-hover:bg-[#2D5355] transition-colors duration-300`}
                        >
                            {item.title}
                        </h3>
                        <GoIcon className="sm:hidden" />
                    </div>
                </Link>
            ))}
        </div>
    );
}
