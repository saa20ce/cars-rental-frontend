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

export default function ModalScrollLock() {
    useEffect(() => {
        let isLocked = false;
        let animationFrameId: number | null = null;
        let previousHtmlOverflow = '';
        let previousBodyOverflow = '';

        const hasVisibleModal = () =>
            Array.from(
                document.querySelectorAll<HTMLElement>(MODAL_WRAP_SELECTOR),
            ).some(isModalVisible);

        const lockScroll = () => {
            if (isLocked) return;

            previousHtmlOverflow = document.documentElement.style.overflow;
            previousBodyOverflow = document.body.style.overflow;

            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            isLocked = true;
        };

        const unlockScroll = () => {
            if (!isLocked) return;

            document.documentElement.style.overflow = previousHtmlOverflow;
            document.body.style.overflow = previousBodyOverflow;
            isLocked = false;
        };

        const updateScrollLock = () => {
            if (hasVisibleModal()) {
                lockScroll();
            } else {
                unlockScroll();
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