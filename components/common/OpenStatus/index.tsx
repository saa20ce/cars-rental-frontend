'use client';

import { DotIcon, TelegramLogo } from '@/lib/ui/icons';
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

    return (
        <div className="min-w-[120px] lg:min-w-[150px] min-h-[24px] flex items-center gap-2">
            {isOpen === null ? null : isOpen ? (
                <>
                    <span className="mb-[1px]  lg:mb-0 lg:mt-[-2px]">
                        <DotIcon />
                    </span>
                    <span>Сейчас открыто</span>
                </>
            ) : (
                <a
                    className="underline underline-offset-4 font-bold mr-1"
                    href="tel:89139132808"
                >
                    +7-(913)-913-28-08
                </a>
            )}
        </div>
    );
}
