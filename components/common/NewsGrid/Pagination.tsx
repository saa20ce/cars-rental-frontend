'use client';
import { useState, useEffect } from 'react';
import { NewsNextPageDisabledIcon } from '@/lib/ui/icons/NewsNextPageDisabledIcon';
import { NewsNextPageIcon } from '@/lib/ui/icons/NewsNextPageIcon';
import Link from 'next/link';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    basePath: string;
};

function getPageRange(
    currentPage: number,
    totalPages: number,
    delta: number,
    maxButtons: number,
) {
    let range: (number | string)[] = [];
    let adjustedDelta = delta;

    while (adjustedDelta >= 0) {
        range = [];
        const left = Math.max(2, currentPage - adjustedDelta);
        const right = Math.min(totalPages - 1, currentPage + adjustedDelta);

        range.push(1);
        if (left > 2) range.push('...');
        for (let i = left; i <= right; i++) range.push(i);
        if (right < totalPages - 1) range.push('...');
        if (totalPages > 1) range.push(totalPages);

        if (range.length <= maxButtons) break;
        adjustedDelta--;
    }

    return range;
}

export default function Pagination({
    currentPage,
    totalPages,
    basePath,
}: PaginationProps) {
    const [delta, setDelta] = useState(1);
    const [maxButtons, setMaxButtons] = useState(8);

    useEffect(() => {
        function updateParams() {
            const width = window.innerWidth;
            if (width >= 768) {
                setDelta(9);
                setMaxButtons(11);
            } else {
                if (currentPage >= 3 || currentPage <= totalPages - 3) {
                    setDelta(3);
                    setMaxButtons(7);
                } else {
                    setDelta(4);
                    setMaxButtons(8);
                }
            }
        }

        updateParams();
        window.addEventListener('resize', updateParams);
        return () => window.removeEventListener('resize', updateParams);
    }, []);

    const pages = getPageRange(currentPage, totalPages, delta, maxButtons);
    const prevPage = `${basePath}?page=${currentPage - 1}`;
    const nextPage = `${basePath}?page=${currentPage + 1}`;

    return (
        <div className="mx-auto flex-center mt-8 lg:mt-9 select-none w-full lg:max-w-[544px]">
            {currentPage > 1 ? (
                <Link href={prevPage}>
                    <NewsNextPageIcon className="rotate-[180deg]" />
                </Link>
            ) : (
                <NewsNextPageDisabledIcon />
            )}

            <div className="mx-[21px] flex">
                {pages.map((page, i) =>
                    page === '...' ? (
                        <span
                            key={`dots-${i}`}
                            className="px-3 py-1 text-[#F6F6F633] select-none mt-1"
                        >
                            ...
                        </span>
                    ) : (
                        <Link
                            key={page}
                            href={
                                page === 1
                                    ? basePath
                                    : `${basePath}?page=${page}`
                            }
                            className={`text-[16px]/[24px] text-center w-[40px] h-[40px] font-medium p-2 rounded-[8px] transition ${
                                page === currentPage
                                    ? 'bg-[#F6F6F633]'
                                    : ' hover:bg-[#F6F6F633] hover:text-[F6F6F6]'
                            }`}
                        >
                            {page}
                        </Link>
                    ),
                )}
            </div>

            {currentPage < totalPages ? (
                <Link href={nextPage}>
                    <NewsNextPageIcon />
                </Link>
            ) : (
                <NewsNextPageDisabledIcon className="rotate-[180deg]" />
            )}
        </div>
    );
}
