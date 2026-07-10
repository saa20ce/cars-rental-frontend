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
                    (function(m,e,t,r,i,k,a){
                        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                        m[i].l=1*new Date();
                        for (var j = 0; j < document.scripts.length; j++) {
                            if (document.scripts[j].src === r) { return; }
                        }
                        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js', 'ym');

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