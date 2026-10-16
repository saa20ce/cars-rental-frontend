'use client';

import React from 'react';
import type { PriceRange, SeasonData } from '@/lib/types/Car';
import { LineIcon } from '@/lib/ui/icons/LineIcon';
import { InfoIcon } from '@/lib/ui/icons/InfoIcon';

type PriceCardsItemLabelTag = 'h3' | 'div';

interface PriceCardsProps {
    priceRanges: PriceRange[];
    seasonModeSwitch: boolean;
    seasonDates?: SeasonData | null;
    itemLabelTag?: PriceCardsItemLabelTag;
}

const seasonDateFormatter = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
});

const fallbackSeasonRanges = [
    '10 декабря - 20 января',
    '15 мая - 30 сентября',
];

const formatSeasonDate = (date?: string) => {
    if (!date) {
        return null;
    }

    const [dayValue, monthValue] = date.split('/');
    const day = Number(dayValue);
    const month = Number(monthValue);

    if (
        !Number.isInteger(day) ||
        !Number.isInteger(month) ||
        day < 1 ||
        day > 31 ||
        month < 1 ||
        month > 12
    ) {
        return null;
    }

    const formattedDate = new Date(2000, month - 1, day);

    if (
        formattedDate.getDate() !== day ||
        formattedDate.getMonth() !== month - 1
    ) {
        return null;
    }

    return seasonDateFormatter.format(formattedDate);
};

const getSeasonRanges = (seasonDates?: SeasonData | null) => {
    if (!seasonDates) {
        return fallbackSeasonRanges;
    }

    const ranges = [
        [
            seasonDates['season-winter-start'],
            seasonDates['season-winter-end'],
        ],
        [
            seasonDates['season-summer-start'],
            seasonDates['season-summer-end'],
        ],
    ]
        .map(([startDate, endDate]) => {
            const start = formatSeasonDate(startDate);
            const end = formatSeasonDate(endDate);

            return start && end ? `${start} - ${end}` : null;
        })
        .filter((range): range is string => Boolean(range));

    return ranges.length > 0 ? ranges : fallbackSeasonRanges;
};

export const tooltipText = (seasonDates?: SeasonData | null) => (
    <div className="text-xs lg:text-sm">
        {'Сезонные тарифы (высокий спрос)'}
        <ul className="list-decimal list-inside pl-1 font-bold">
            {getSeasonRanges(seasonDates).map((range) => (
                <li key={range}>{range}</li>
            ))}
        </ul>
    </div>
);

export const PriceCards: React.FC<PriceCardsProps> = ({
    priceRanges,
    seasonModeSwitch,
    seasonDates,
    itemLabelTag = 'h3',
}) => {
    const ItemLabelTag = itemLabelTag;

    return (
        <>
            <section>
                <div className="flex items-center gap-2 lg:gap-[10px] mt-5 ml-2 lg:ml-6">
                    <span
                        role="img"
                        aria-label={seasonModeSwitch ? 'Сезонный тариф' : 'Обычный тариф'}
                        className={`relative inline-block h-7 w-14 shrink-0 rounded-full ${seasonModeSwitch ? 'bg-[#3c6e71]' : 'bg-[#f6f6f675]'}`}
                    >
                        <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-[left] ${seasonModeSwitch ? 'left-8' : 'left-1'}`}
                        />
                    </span>
                    <span className="text-[16px]/[24px] lg:text-[20px]/[28px] font-normal">Сезон</span>
                    <LineIcon />
                    <details className="relative group">
                        <summary className="list-none cursor-pointer" aria-label="Показать даты сезонных тарифов">
                            <InfoIcon />
                        </summary>
                        <div className="absolute left-0 top-full z-20 mt-2 w-max max-w-[calc(100vw-48px)] rounded-lg bg-[#4b5563] px-[10px] py-2 shadow-lg">
                            {tooltipText(seasonDates)}
                        </div>
                    </details>
                </div>

                <div className="-mx-4 lg:mx-0 mt-4 overflow-x-auto lg:overflow-visible scrollbar-hide">
                    <ul
                        className="flex gap-3 min-w-max px-4 lg:px-0 lg:grid lg:gap-3 lg:w-full"
                        style={{
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(150px, 1fr))',
                        }}
                    >
                        {priceRanges.map(
                            ({ baseKey, label, price, seasonPrice }) => {
                                const finalPrice = seasonModeSwitch
                                    ? seasonPrice
                                    : price;
                                return (
                                    <li
                                        key={baseKey}
                                        className={`flex flex-col rounded-lg px-3 py-[6px] justify-between transition-all lg:text-lg lg:min-h-[80px] lg:justify-center lg:m-0 lg:px-4 lg:py-3 min-w-[112px]
                                            ${seasonModeSwitch ? 'bg-[#f6f6f638]' : 'bg-[#f6f6f60e]'}
                                        `}
                                    >
                                        <ItemLabelTag
                                            className={`text-[14px]/[20px] lg:text-[18px]/[28px] font-normal transition-all ${seasonModeSwitch
                                                ? 'text-[#f6f6f6]'
                                                : 'text-[#f6f6f666]'
                                                }`}
                                        >
                                            {label}
                                        </ItemLabelTag>
                                        <p
                                            className={`text-[14px]/[20px] lg:text-[18px]/[28px] font-bold transition-all`}
                                        >
                                            {finalPrice > 0
                                                ? `${finalPrice.toLocaleString('ru-RU')} ₽/сут.`
                                                : '—'}
                                        </p>
                                    </li>
                                );
                            },
                        )}
                    </ul>
                </div>
            </section>

        </>
    );
};
