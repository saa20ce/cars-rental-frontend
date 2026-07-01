'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ROUTE_LOADING_START_EVENT } from '@/lib/helpers/routeLoading';

const MIN_VISIBLE_MS = 260;
const FAILSAFE_HIDE_MS = 10000;

const isModifiedClick = (event: MouseEvent) =>
    event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

const isInternalNavigatingAnchor = (anchor: HTMLAnchorElement) => {
    const href = anchor.getAttribute('href');

    if (!href || href.startsWith('#')) return false;
    if (anchor.hasAttribute('download')) return false;
    if (anchor.target && anchor.target !== '_self') return false;

    const targetUrl = new URL(href, window.location.href);

    if (!['http:', 'https:'].includes(targetUrl.protocol)) return false;
    if (targetUrl.origin !== window.location.origin) return false;

    const currentUrl = new URL(window.location.href);
    const samePage =
        targetUrl.pathname === currentUrl.pathname &&
        targetUrl.search === currentUrl.search;

    return !samePage;
};

function RouteChangeLoaderInner() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const routeKey = `${pathname}?${searchParams.toString()}`;

    const [isLoading, setIsLoading] = useState(false);
    const previousRouteKeyRef = useRef(routeKey);
    const startedAtRef = useRef(0);
    const hideTimeoutRef = useRef<number | null>(null);
    const failsafeTimeoutRef = useRef<number | null>(null);

    const clearTimer = (timerRef: MutableRefObject<number | null>) => {
        if (timerRef.current === null) return;

        window.clearTimeout(timerRef.current);
        timerRef.current = null;
    };

    const clearTimers = () => {
        clearTimer(hideTimeoutRef);
        clearTimer(failsafeTimeoutRef);
    };

    const startLoading = () => {
        clearTimers();
        startedAtRef.current = Date.now();
        setIsLoading(true);

        failsafeTimeoutRef.current = window.setTimeout(() => {
            setIsLoading(false);
            failsafeTimeoutRef.current = null;
        }, FAILSAFE_HIDE_MS);
    };

    const finishLoading = () => {
        clearTimer(failsafeTimeoutRef);

        const elapsed = Date.now() - startedAtRef.current;
        const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0);

        clearTimer(hideTimeoutRef);
        hideTimeoutRef.current = window.setTimeout(() => {
            setIsLoading(false);
            hideTimeoutRef.current = null;
        }, remaining);
    };

    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            if (event.defaultPrevented || event.button !== 0) return;
            if (isModifiedClick(event)) return;

            const target = event.target;
            if (!(target instanceof Element)) return;

            const anchor = target.closest<HTMLAnchorElement>('a[href]');
            if (!anchor || !isInternalNavigatingAnchor(anchor)) return;

            startLoading();
        };

        const handleRouteLoadingStart = () => startLoading();

        document.addEventListener('click', handleDocumentClick, true);
        window.addEventListener(ROUTE_LOADING_START_EVENT, handleRouteLoadingStart);
        window.addEventListener('popstate', handleRouteLoadingStart);

        return () => {
            document.removeEventListener('click', handleDocumentClick, true);
            window.removeEventListener(
                ROUTE_LOADING_START_EVENT,
                handleRouteLoadingStart,
            );
            window.removeEventListener('popstate', handleRouteLoadingStart);
            clearTimers();
        };
    }, []);

    useEffect(() => {
        if (previousRouteKeyRef.current === routeKey) return;

        previousRouteKeyRef.current = routeKey;
        finishLoading();
    }, [routeKey]);

    return (
        <>
            {isLoading && (
                <div className="route-change-loader" aria-hidden="true">
                    <div className="route-change-loader__bar" />
                </div>
            )}

            <style jsx global>{`
                .route-change-loader {
                    position: fixed;
                    inset: 0;
                    z-index: 2147483647;
                    pointer-events: none;
                }

                .route-change-loader__bar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 3px;
                    width: 45vw;
                    border-radius: 999px;
                    background: linear-gradient(
                        90deg,
                        #284b63 0%,
                        #3c6e71 42%,
                        #f6f6f6 70%,
                        #3c6e71 100%
                    );
                    box-shadow: 0 0 16px rgba(60, 110, 113, 0.72),
                        0 0 6px rgba(246, 246, 246, 0.36);
                    animation: route-loader-bar 1.15s ease-in-out infinite;
                }

                @keyframes route-loader-bar {
                    0% {
                        transform: translateX(-55vw) scaleX(0.65);
                    }
                    55% {
                        transform: translateX(55vw) scaleX(1);
                    }
                    100% {
                        transform: translateX(105vw) scaleX(0.65);
                    }
                }

            `}</style>
        </>
    );
}

export default function RouteChangeLoader() {
    return (
        <Suspense fallback={null}>
            <RouteChangeLoaderInner />
        </Suspense>
    );
}
