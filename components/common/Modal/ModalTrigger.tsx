'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { PhoneIcon, PhoneIconDefault } from '@/lib/ui/icons';

const CallRequestModal = dynamic(() => import('./CallRequestModal'), {
    ssr: false,
    loading: () => null,
});

export default function ModalTrigger({
    isHeader = false,
    className = ''
}: {
    isHeader?: boolean;
    className?: string
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={className}>
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex-center text-nowrap gap-[10px] font-medium text-[16px]/[24px] rounded-[12px] border py-2 px-3 h-10"
                >
                    <PhoneIconDefault />
                    Заказать звонок
                </button>
            </div>
            {isHeader && (
                <a
                    href="tel:+79139132808"
                    aria-label="Позвонить в Рентасиб"
                    className="xl:hidden"
                >
                    <PhoneIcon />
                </a>
            )}

            {isOpen && (
                <CallRequestModal
                    isOpen={isOpen}
                    setIsOpenAction={setIsOpen}
                />
            )}
        </>
    );
}
