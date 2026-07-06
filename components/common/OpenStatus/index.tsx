'use client';

import { isRentasibOpen } from '@/lib/helpers/businessHours';
import { DotIcon } from '@/lib/ui/icons';
import { useEffect, useState } from 'react';

export default function OpenStatus() {
    const [isOpen, setIsOpen] = useState<boolean | null>(null);

    useEffect(() => {
        setIsOpen(isRentasibOpen());
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
                <>
                    <span className="mb-[1px] lg:mb-0 lg:mt-[-2px]">
                        <DotIcon color="#E53935" />
                    </span>
                    <span>Сейчас закрыто</span>
                </>
            )}
        </div>
    );
}
