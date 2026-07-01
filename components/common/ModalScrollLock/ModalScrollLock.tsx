'use client';

import { useEffect } from 'react';

const MODAL_WRAP_SELECTOR = '.ant-modal-root .ant-modal-wrap';

const isModalVisible = (element: HTMLElement) => {
    const styles = window.getComputedStyle(element);

    return (
        styles.display !== 'none' &&
        styles.visibility !== 'hidden' &&
        element.getClientRects().length > 0
    );
};

interface ScrollLockSnapshot {
    htmlOverflow: string;
    htmlOverscrollBehavior: string;
    bodyOverflow: string;
    bodyOverscrollBehavior: string;
    bodyPosition: string;
    bodyTop: string;
    bodyLeft: string;
    bodyRight: string;
    bodyWidth: string;
}

export default function ModalScrollLock() {
    useEffect(() => {
        let isLocked = false;
        let animationFrameId: number | null = null;
        let scrollY = 0;
        let snapshot: ScrollLockSnapshot | null = null;

        const getCurrentScrollStyles = (): ScrollLockSnapshot => ({
            htmlOverflow: document.documentElement.style.overflow,
            htmlOverscrollBehavior:
                document.documentElement.style.overscrollBehavior,
            bodyOverflow: document.body.style.overflow,
            bodyOverscrollBehavior: document.body.style.overscrollBehavior,
            bodyPosition: document.body.style.position,
            bodyTop: document.body.style.top,
            bodyLeft: document.body.style.left,
            bodyRight: document.body.style.right,
            bodyWidth: document.body.style.width,
        });

        let unlockedSnapshot = getCurrentScrollStyles();
        const hasVisibleModal = () =>
            Array.from(
                document.querySelectorAll<HTMLElement>(MODAL_WRAP_SELECTOR),
            ).some(isModalVisible);

        const lockScroll = () => {
            if (isLocked) return;

            scrollY = window.scrollY || document.documentElement.scrollTop || 0;
            snapshot = unlockedSnapshot;

            document.documentElement.style.overflow = 'hidden';
            document.documentElement.style.overscrollBehavior = 'none';
            document.body.style.overflow = 'hidden';
            document.body.style.overscrollBehavior = 'none';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.width = '100%';

            isLocked = true;
        };

        const unlockScroll = () => {
            if (!isLocked || !snapshot) return;

            const restoreScrollY = scrollY;

            document.documentElement.style.overflow = snapshot.htmlOverflow;
            document.documentElement.style.overscrollBehavior =
                snapshot.htmlOverscrollBehavior;
            document.body.style.overflow = snapshot.bodyOverflow;
            document.body.style.overscrollBehavior =
                snapshot.bodyOverscrollBehavior;
            document.body.style.position = snapshot.bodyPosition;
            document.body.style.top = snapshot.bodyTop;
            document.body.style.left = snapshot.bodyLeft;
            document.body.style.right = snapshot.bodyRight;
            document.body.style.width = snapshot.bodyWidth;

            snapshot = null;
            scrollY = 0;
            isLocked = false;
            window.scrollTo(0, restoreScrollY);
        };

        const updateScrollLock = () => {
            if (hasVisibleModal()) {
                lockScroll();
            } else {
                unlockScroll();

                if (!isLocked) {
                    unlockedSnapshot = getCurrentScrollStyles();
                }
            }
        };

        const scheduleUpdate = () => {
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
            }

            animationFrameId = requestAnimationFrame(() => {
                animationFrameId = null;
                updateScrollLock();
            });
        };

        const observer = new MutationObserver(scheduleUpdate);

        observer.observe(document.body, {
            attributes: true,
            childList: true,
            subtree: true,
            attributeFilter: ['class', 'style', 'aria-hidden'],
        });

        updateScrollLock();

        return () => {
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
            }

            observer.disconnect();
            unlockScroll();
        };
    }, []);

    return null;
}