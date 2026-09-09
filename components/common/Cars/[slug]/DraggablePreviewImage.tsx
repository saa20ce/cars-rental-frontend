'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Props {
    image: React.ReactElement;
    scale: number;
    canGoPrevious: boolean;
    canGoNext: boolean;
    enterDirection: number;
    visible: boolean;
    onSwipe: (direction: number) => void;
}

export default function DraggablePreviewImage({
    image: originalImage, scale, onSwipe, canGoPrevious, canGoNext, enterDirection, visible,
}: Props) {
    const image = originalImage as React.ReactElement<React.HTMLAttributes<HTMLImageElement>>;
    const gesture = useRef<{ id: number; x: number; y: number } | null>(null);
    const [offset, setOffset] = useState(0);
    const [dragging, setDragging] = useState(false);
    const exitAnimation = useRef<Animation | null>(null);

    useEffect(() => {
        if (!visible) {
            gesture.current = null;
            setDragging(false);
            setOffset(0);
        }
        return () => {
            exitAnimation.current?.cancel();
            exitAnimation.current = null;
        };
    }, [visible]);

    const cancel = () => {
        gesture.current = null;
        setDragging(false);
        setOffset(0);
    };

    return React.cloneElement(image, {
        draggable: false,
        className: `${image.props.className || ''} car-preview-draggable`,
        style: {
            ...image.props.style,
            touchAction: 'none',
            translate: `${offset}px 0`,
            cursor: dragging ? 'grabbing' : 'grab',
            transition: dragging ? 'none' : undefined,
            '--preview-enter-x': `${enterDirection * 48}px`,
        } as React.CSSProperties,
        onPointerDown: (event) => {
            if (exitAnimation.current) return;
            if (!event.isPrimary || scale > 1) {
                cancel();
                return;
            }
            if (event.button !== 0) return;
            setDragging(true);
            gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
            event.currentTarget.setPointerCapture(event.pointerId);
        },
        onPointerMove: (event) => {
            const start = gesture.current;
            if (!start || start.id !== event.pointerId) return;
            if (scale > 1) {
                cancel();
                return;
            }
            setOffset(event.clientX - start.x);
        },
        onPointerUp: (event) => {
            const start = gesture.current;
            if (!start || start.id !== event.pointerId || scale > 1) {
                cancel();
                return;
            }
            gesture.current = null;
            const dx = event.clientX - start.x;
            const dy = event.clientY - start.y;
            const direction = dx < 0 ? 1 : -1;
            const canSwitch = direction === 1 ? canGoNext : canGoPrevious;
            if (canSwitch && Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy)) {
                const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                const animation = event.currentTarget.animate([
                    { translate: `${offset}px 0`, opacity: 1 },
                    { translate: `${offset - direction * 120}px 0`, opacity: 0 },
                ], {
                    duration: reducedMotion ? 0 : 180,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    fill: 'forwards',
                });
                exitAnimation.current = animation;
                animation.finished.then(() => onSwipe(direction)).catch(() => {
                    // Closing the preview or changing slides cancels the pending swipe.
                });
            } else {
                cancel();
            }
        },
        onPointerCancel: cancel,
        onLostPointerCapture: () => {
            if (gesture.current) cancel();
        },
        onMouseDown: (event) => {
            if (scale > 1) image.props.onMouseDown?.(event);
            else event.preventDefault();
        },
        onTouchStart: (event) => {
            if (event.touches.length > 1) cancel();
            if (scale > 1 || event.touches.length > 1) image.props.onTouchStart?.(event);
        },
        onTouchMove: (event) => {
            if (scale > 1 || event.touches.length > 1) image.props.onTouchMove?.(event);
        },
    });
}
