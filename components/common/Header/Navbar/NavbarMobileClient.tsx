'use client';

import React, { useState } from 'react';
import { Modal, ConfigProvider } from 'antd';
import { MenuIcon, SmallCross } from '@/lib/ui/icons';
import Link from 'next/link';
import { DownIcon } from '@/lib/ui/icons/DownIcon';
import ModalTrigger from '../../Modal/ModalTrigger';

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
    const handleToggle = (key: string) => {
        if (openKey === key) {
            setOpenKey(null);
            setTimeout(() => setVisibleKey(null), 200);
        } else {
            setVisibleKey(key);
            setOpenKey(key);
        }
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
                    onCancel={() => {
                        setOpen(false);
                        setVisibleKey(null);
                    }}
                    footer={null}
                    closeIcon={false}
                    width="100vw"
                    style={{
                        top: 0,
                        left: 0,
                        margin: 0,
                        padding: 0,
                    }}
                    styles={{
                        mask: {
                            backdropFilter: 'blur(30px)',
                            WebkitBackdropFilter: 'blur(30px)',
                        },
                        content: {
                            color: '#f6f6f6',
                        },
                    }}
                    centered
                >
                    <div className="flex justify-end">
                        <SmallCross
                            onClick={() => setOpen(false)}
                            style={{ cursor: 'pointer' }}
                            width={16}
                            height={22}
                        />
                    </div>

                    <nav className="max-w-[360px] mx-auto w-full flex-center flex-col gap-3 p-8 pb-0 h-full text-[16px]/[24px] font-medium">
                        {menuItems.map((item) => {
                            const isOpen = openKey === item.title;

                            return (
                                <div key={item.title} className="relative">
                                    <div className="flex items-center justify-center px-3 py-[6px] rounded-[8px] transition-colors duration-300">
                                        <Link
                                            href={
                                                item.mobHref || item.href || '#'
                                            }
                                            className="whitespace-nowrap  text-[20px]/[28px] text-medium hover:text-[#f6f6f6]"
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            {item.mobTitle || item.title}
                                        </Link>

                                        {item.items && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleToggle(item.title)
                                                }
                                                className="ml-2 outline-none"
                                            >
                                                <DownIcon
                                                    className={`w-3 h-6 transition-transform duration-300 ${
                                                        isOpen
                                                            ? 'rotate-180'
                                                            : 'rotate-0'
                                                    }`}
                                                />
                                            </button>
                                        )}
                                    </div>

                                    {item.items &&
                                        visibleKey === item.title && (
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ${
                                                    isOpen
                                                        ? 'animate-expand'
                                                        : 'animate-collapse'
                                                } flex flex-col gap-2 mt-3`}
                                            >
                                                {item.items.map((subItem) => (
                                                    <Link
                                                        key={subItem.title}
                                                        href={
                                                            subItem.href || '#'
                                                        }
                                                        className="text-[16px]/[24px] text-medium py-2 text-center hover:text-[#f6f6f6]"
                                                        onClick={() =>
                                                            setOpen(false)
                                                        }
                                                    >
                                                        {subItem.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                </div>
                            );
                        })}
                    </nav>

                    <ModalTrigger className="flex-center mx-auto mt-8 w-[196px] py-[10px] text-[18px]/[30px]" />
                </Modal>
            </ConfigProvider>
        </>
    );
}
