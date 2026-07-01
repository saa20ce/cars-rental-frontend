'use client';

import React, { useState } from 'react';
import { Modal, ConfigProvider } from 'antd';
import { LogoFull, MenuIcon, SmallCross } from '@/lib/ui/icons';
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
    const handleClose = () => {
        setOpen(false);
        setOpenKey(null);
        setVisibleKey(null);
    };

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


    return (
        <>
            <div
                className="flex items-center"
                onClick={() => setOpen(true)}
                style={{ cursor: 'pointer' }}
            >
                <MenuIcon />
            </div>
            <ConfigProvider
                theme={{
                    components: {
                        Modal: {
                            contentBg: '#00000000',
                            boxShadow: 'none',
                        },
                    },
                }}
            >
                <Modal
                    open={open}
                    onCancel={handleClose}
                    footer={null}
                    closeIcon={false}
                    width="100vw"
                    style={{ top: 0, left: 0, margin: 0, padding: 0, maxWidth: '100vw' }}
                    styles={{
                        mask: {
                            backdropFilter: 'blur(30px)',
                            WebkitBackdropFilter: 'blur(30px)',
                        },
                        content: {
                            color: '#f6f6f6',
                            padding: 0,
                            background: 'transparent',
                        },
                        body: { minHeight: '100vh' },
                    }}
                >
                    <div className="min-h-screen px-4 pt-[10px] pb-8">
                        <header>
                            <TopHeader />
                        </header>

                        <div className="flex justify-between items-center bg-[#284b63] py-4 px-5 my-3 rounded-[100px]">
                            <Link href="/" onClick={handleClose}>
                                <LogoFull />
                            </Link>

                            <button
                                type="button"
                                aria-label={'\u0417\u0430\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e'}
                                onClick={handleClose}
                                className="flex h-6 w-6 items-center justify-center"
                            >
                                <SmallCross width={16} height={16} />
                            </button>
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

                    {/* Кнопка общей модалки (как было) */}
                    <ModalTrigger className="flex-center mx-auto mt-8 w-[196px] py-[10px] text-[18px]/[30px]" />
                    </div>
                </Modal>
            </ConfigProvider>
        </>
    );
}
