'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { LogoFull, MaxIcon, MenuIcon, SmallCross, TelegramLogo } from '@/lib/ui/icons';
import Link from 'next/link';
import { DownIcon } from '@/lib/ui/icons/DownIcon';
import ModalTrigger from '../../Modal/ModalTrigger';
import ModalTriggerContactDirector from '../../Modal/ModalTriggerContactDirector';
import { TopHeader } from '../TopHeader';

export default function NavbarMobileClient({
    menuItems,
}: {
    menuItems: {
        title: string;
        href: string;
        mobHref?: string;
        mobTitle?: string;
        items?: { title: string; href: string }[];
    }[];
}) {
    const [open, setOpen] = useState(false);
    const [openKey, setOpenKey] = useState<string | null>(null);
    const [visibleKey, setVisibleKey] = useState<string | null>(null);

    const [directorModalOpen, setDirectorModalOpen] = useState(false);
    const handleDirectorToggle = (v: boolean) => {
        setDirectorModalOpen(v);
    };
    const handleClose = useCallback(() => {
        setOpen(false);
        setOpenKey(null);
        setVisibleKey(null);
        setDirectorModalOpen(false);
    }, []);

    const handleToggle = (key: string) => {
        if (openKey === key) {
            setOpenKey(null);
            setTimeout(() => setVisibleKey(null), 200);
        } else {
            setVisibleKey(key);
            setOpenKey(key);
        }
    };

    const handleMenuItemClick = (
        item: { items?: { title: string; href: string }[] },
        event: React.MouseEvent<HTMLAnchorElement>,
    ) => {
        if (item.items?.length) event.preventDefault();
        else handleClose();
    };

    useEffect(() => {
        if (!open) return;

        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const previousBodyPosition = document.body.style.position;
        const previousBodyTop = document.body.style.top;
        const previousBodyWidth = document.body.style.width;
        const previousHtmlOverflow = document.documentElement.style.overflow;

        document.documentElement.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') handleClose();
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.documentElement.style.overflow = previousHtmlOverflow;
            document.body.style.position = previousBodyPosition;
            document.body.style.top = previousBodyTop;
            document.body.style.width = previousBodyWidth;
            window.scrollTo(0, scrollY);
        };
    }, [handleClose, open]);

    return (
        <>
            <div
                className="flex items-center"
                onClick={() => setOpen(true)}
                style={{ cursor: 'pointer' }}
            >
                <MenuIcon />
            </div>
            {open && (
                <div
                    className="fixed inset-0 z-[100] overflow-y-auto bg-[#142632]/80 px-4 pt-[10px] pb-8 text-[#f6f6f6] backdrop-blur-[30px] lg:hidden"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="min-h-screen">
                        <header>
                            <TopHeader />
                        </header>

                        <div className="flex justify-between items-center bg-[#284b63] py-4 px-5 my-3 rounded-[100px]">
                            <Link href="/" onClick={handleClose}>
                                <LogoFull />
                            </Link>

                            <div className="flex items-center gap-5">
                                <ModalTrigger isHeader={true} className="hidden" />
                                <button
                                    type="button"
                                    aria-label={'\u0417\u0430\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e'}
                                    onClick={handleClose}
                                    className="flex h-[32px] w-[32px] items-center justify-center"
                                >
                                    <SmallCross width={18} height={24} />
                                </button>
                            </div>
                        </div>

                        <nav className="mx-auto w-full flex items-start flex-col gap-[16px] pt-5 pb-0 h-full text-[16px]/[24px] font-medium">
                            {menuItems.map((item) => {
                                const isOpen = openKey === item.title;

                                return (
                                    <div key={item.title} className="relative w-full">
                                        <div
                                            className={`flex items-start justify-between border-b border-[#f6f6f638] py-[8px] transition-colors duration-300 ${item.items ? 'cursor-pointer' : ''}`}
                                            onClick={item.items ? () => handleToggle(item.title) : undefined}
                                        >
                                            <Link
                                                href={item.mobHref || item.href || '#'}
                                                className="w-full whitespace-nowrap text-[18px]/[28px] text-medium hover:text-[#f6f6f6]"
                                                onClick={(event) => handleMenuItemClick(item, event)}
                                            >
                                                {item.mobTitle || item.title}
                                            </Link>

                                            {item.items && (
                                                <button
                                                    type="button"
                                                    aria-expanded={isOpen}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        handleToggle(item.title);
                                                    }}
                                                    className="mr-[16px] outline-none"
                                                >
                                                    <DownIcon
                                                        className={`w-[16px] h-[28px] transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'
                                                            }`}
                                                    />
                                                </button>
                                            )}
                                        </div>

                                        {item.items && visibleKey === item.title && (
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'animate-expand' : 'animate-collapse'
                                                    } flex flex-col gap-2 mt-3`}
                                            >
                                                {item.items.map((subItem) =>
                                                    subItem.title === 'Связь с директором' ? (
                                                        <ModalTriggerContactDirector
                                                            key={subItem.title}
                                                            isOpen={directorModalOpen}
                                                            setIsOpenAction={handleDirectorToggle}
                                                        />
                                                    ) : (
                                                        <Link
                                                            key={subItem.title}
                                                            href={subItem.href || '#'}
                                                            className="text-[16px]/[24px] text-medium py-2 px-[12px] text-left hover:text-[#f6f6f6] hover:bg-[#F6F6F633] hover:rounded-[12px]"
                                                            onClick={handleClose}
                                                        >
                                                            {subItem.title}
                                                        </Link>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </nav>

                        <div className="flex flex-row items-center gap-[20px] mt-8">
                            <ModalTrigger className="flex-center py-[10px] text-[18px]/[30px]" />
                            <a
                                href="https://max.ru/u/f9LHodD0cOJl7vaA90ej_c-ng7J4Tpfbi4tBmaGo9A-R2NE74nwHaaX0WQk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-center h-[30px] w-[30px] lg:h-[28px] lg:w-[28px]"
                            >
                                <MaxIcon className='h-[30px] lg:h-[24px] w-[30px] lg:w-[24px]'/>
                            </a>
                            <a
                                href="https://t.me/Rentasib"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-center h-[30px] w-[30px] lg:h-[28px] lg:w-[28px]"
                            >
                                <TelegramLogo className='h-[30px] lg:h-[24px] w-[30px] lg:w-[24px]'/>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
