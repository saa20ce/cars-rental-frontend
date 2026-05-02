import React from 'react';
import {
    VkIcon,
    TelegramLogo,
    LineVertIcon,
    LineVertHeaderDesktop,
    MaxIcon,
} from '@/lib/ui/icons';
import OpenStatus from '../OpenStatus';

export const TopHeader: React.FC = () => {
    return (
        <div className="flex flex-col gap-1 lg:flex-row lg:justify-between">
            <div className="text-sm font-semibold lg:text-xl">
                Прокат авто в Новосибирске
            </div>

            <div className="flex h-full items-center justify-between lg:gap-5">
                <div className="flex gap-2 h-full ml-[2px]">
                    <a
                        href="https://max.ru/u/f9LHodD0cOJl7vaA90ej_c-ng7J4Tpfbi4tBmaGo9A-R2NE74nwHaaX0WQk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-center h-5 lg:h-[28px] w-5 lg:w-[28px]"
                    >
                        <MaxIcon />
                    </a>
                    <a
                        href="https://vk.com/rentasib"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-center h-5 lg:h-[28px] w-5 lg:w-[28px]"
                    >
                        <VkIcon />
                    </a>
                    <a
                        href="https://t.me/Rentasib"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-center h-5 lg:h-[28px] w-5 lg:w-[28px]"
                    >
                        <TelegramLogo />
                    </a>
                </div>

                <a
                    className="hidden lg:block lg:underline lg:underline-offset-4 lg:font-bold mr-1"
                    href="tel:89139132808"
                >
                    +7-(913)-913-28-08
                </a>

                <div className="flex items-center gap-2 text-sm lg:text-base">
                    <a
                        href="https://2gis.ru/novosibirsk/firm/70000001038917532?m=82.925675%2C55.014643%2F16"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-nowrap"
                    >
                        Красный просп., 2/1
                    </a>
                    <span className="mb-[1px] ml-1 mr-[2px]">
                        <span className="lg:hidden block">
                            <LineVertIcon />
                        </span>
                        <span className="lg:block hidden">
                            <LineVertHeaderDesktop />
                        </span>
                    </span>
                    <OpenStatus />
                </div>
            </div>
        </div>
    );
};
