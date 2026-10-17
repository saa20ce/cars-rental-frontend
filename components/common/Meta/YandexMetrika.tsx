'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const YANDEX_METRIKA_ID = 92993119;

declare global {
    interface Window {
        ym?: (...args: unknown[]) => void;
    }
}

export default function YandexMetrika() {
    const pathname = usePathname();
    const isFirstPathname = useRef(true);

    useEffect(() => {
        if (isFirstPathname.current) {
            isFirstPathname.current = false;
            return;
        }

        window.ym?.(YANDEX_METRIKA_ID, 'hit', window.location.href);
    }, [pathname]);

    return (
        <>
            <Script id="yandex-metrika" strategy="afterInteractive">
                {`
                    window.ym = window.ym || function(){
                        (window.ym.a = window.ym.a || []).push(arguments);
                    };
                    window.ym.l = Date.now();

                    ym(${YANDEX_METRIKA_ID}, 'init', {
                        webvisor: true,
                        clickmap: true,
                        referrer: document.referrer,
                        url: location.href,
                        accurateTrackBounce: true,
                        trackLinks: true
                    });
                `}
            </Script>
            <Script
                id="yandex-metrika-tag"
                src="https://mc.yandex.ru/metrika/tag.js"
                strategy="lazyOnload"
            />
            <noscript>
                <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
                        style={{ position: 'absolute', left: '-9999px' }}
                        alt=""
                    />
                </div>
            </noscript>
        </>
    );
}
