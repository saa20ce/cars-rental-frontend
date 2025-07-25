'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DownIcon } from '@/lib/ui/icons/DownIcon';

const items = [
    {
        title: 'Автопарк',
        href: '/cars',
        items: [
            { title: 'До 4000 руб.', href: '/cars2000' },
            { title: '4000-6000 руб.', href: '/cars4000' },
            { title: '6000-10000 руб.', href: '/cars6000' },
            { title: 'от 10000 руб.', href: '/cars10000' },
        ],
    },
    { title: 'Тарифы', href: '/tariffs' },
    { title: 'Условия', href: '/terms' },
    {
        title: 'Услуги',
        href: '#',
        items: [
            { title: 'Все услуги', href: '/services' },
            { title: 'Аренда авто для Юр.лиц', href: '#' },
            { title: 'Аренда авто бизнес классы', href: '#' },
            { title: 'Аренда авто комфорт класса', href: '#' },
            { title: 'Дополнительные услуги', href: '#' },
        ],
    },
    {
        title: 'О нас',
        href: '/about',
        items: [
            { title: 'О компании', href: '/about' },
            { title: 'Отзывы', href: '#' },
            { title: 'Контакты', href: '#' },
            { title: 'Новости', href: '/news' },
            { title: 'Соц. сети', href: '#' },
        ],
    },
    { title: 'Контакты', href: '#' },
    {
        title: 'Поддержка',
        href: '/faq',
        items: [
            { title: 'Вопрос-ответ', href: '/faq' },
            { title: 'Связь с директором', href: '#' },
        ],
    },
];

export default function NavbarClient() {
    const [openKey, setOpenKey] = useState<string | null>(null);

    return (
        <nav className="max-w-[731px] w-full hidden lg:flex gap-[6px] text-[16px]/[24px] font-medium">
            {items.map((item) => (
                <div
                    key={item.title}
                    className="relative group"
                    onMouseEnter={() => setOpenKey(item.title)}
                    onMouseLeave={() => setOpenKey(null)}
                >
                    <Link
                        href={item.href || '#'}
                        className={`flex items-center px-3 py-[6px] rounded-[8px] whitespace-nowrap transition-colors duration-300 ${openKey === item.title ? 'text-[#f6f6f675]' : ''}`}
                    >
                        {item.title}
                        {item.items && (
                            <DownIcon
                                className={`w-3 h-6 ml-[10px] transition-transform duration-300 ${
                                    openKey === item.title
                                        ? 'rotate-180'
                                        : 'rotate-0'
                                }`}
                            />
                        )}
                    </Link>

                    {item.items && openKey === item.title && (
                        <div className="absolute left-0 top-full min-w-[256px] bg-[#284152] rounded-md z-50 py-1">
                            {item.items.map((subItem) => (
                                <Link
                                    key={subItem.title}
                                    href={subItem.href || '#'}
                                    className="block px-4 py-2 mx-[7px] hover:bg-[#F6F6F633] hover:text-[#F6F6F6] rounded-md text-[16px]/[24px] text-normal text-nowrap "
                                >
                                    {subItem.title}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </nav>
    );
}
