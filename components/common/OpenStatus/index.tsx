'use client';

import { DotIcon, WhatsappLogo } from '@/lib/ui/icons';
import { useEffect, useState } from 'react';

export default function OpenStatus() {
    const [isOpen, setIsOpen] = useState<boolean | null>(null);

    useEffect(() => {
        const now = new Date();
        const day = now.getUTCDay();
        const hour = now.getUTCHours();

        const isWeekday = day >= 1 && day <= 5;
        const isWeekend = day === 0 || day === 6;

        let open = false;

        if (isWeekday) {
            open = hour >= 2 && hour < 13;
        } else if (isWeekend) {
            open = hour >= 2 && hour < 11;
        }

        setIsOpen(open);
    }, []);

    if (isOpen === null) return null;

    return isOpen ? (
        <>
            <span className="mb-[1px] mr-[-3px] lg:mb-0 lg:mt-[-2px]">
                <DotIcon />
            </span>
            <span>Сейчас открыто</span>
        </>
    ) : (
        <a
            href="https://wa.me/79139132808"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-center gap-2"
        >
            <WhatsappLogo />
            Оставьте заявку
        </a>
    );
}
