'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const COOKIE_CONSENT_STORAGE_KEY = 'rentasib-cookie-consent';
const COOKIE_POLICY_HREF = '/docs/03-politika-cookie-ooo-rentasib.pdf';
const PERSONAL_DATA_POLICY_HREF =
    '/docs/01-politika-obrabotki-pdn-ooo-rentasib.pdf';

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        try {
            setIsVisible(
                localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) !==
                    'accepted',
            );
        } catch {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        try {
            localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, 'accepted');
        } finally {
            setIsVisible(false);
        }
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-x-4 bottom-4 z-[1000] lg:left-1/2 lg:right-auto lg:w-[calc(100%-40px)] lg:max-w-[1240px] lg:-translate-x-1/2">
            <div className="flex flex-col gap-4 rounded-[16px] bg-[#1E384A] p-4 text-[#F6F6F6] shadow-[0_12px_40px_rgba(0,0,0,0.28)] ring-1 ring-[#F6F6F633] lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:p-5">
                <p className="text-[12px]/[18px] font-semibold lg:text-[14px]/[20px]">
                    Мы используем файлы cookie для улучшения работы сайта.
                    Продолжая использовать сайт, вы соглашаетесь с нашей{' '}
                    <Link
                        href={COOKIE_POLICY_HREF}
                        className="underline underline-offset-4"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Политикой использования файлов cookie
                    </Link>{' '}
                    и{' '}
                    <Link
                        href={PERSONAL_DATA_POLICY_HREF}
                        className="underline underline-offset-4"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Политикой обработки персональных данных
                    </Link>
                    .
                </p>

                <button
                    type="button"
                    className="min-h-[42px] rounded-[12px] bg-[#3C6E71] px-6 py-2 text-[16px]/[24px] font-semibold text-[#F6F6F6] transition-colors hover:bg-[#2F5D60] lg:min-w-[140px]"
                    onClick={handleAccept}
                >
                    Принять
                </button>
            </div>
        </div>
    );
}