'use client';

import type { DeliveryOption, DeliveryPrice } from '@/lib/types/Car';
import type { DefaultOptionType } from 'antd/es/select';
import { useEffect, useMemo, useState } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';
const CustomSelect = dynamic(
    () => import('@/lib/ui/common/Select/CustomSelect').then(m => m.CustomSelect || m),
    { ssr: false, loading: () => null }
);


const normalizeKey = (key: string) => {
    return key;
};

const groupDeliveryOptions = (
    day: DeliveryOption[] | undefined,
    night: DeliveryOption[] | undefined,
) => {
    if (!day || !night) return [];

    const nightMap = night.reduce<Record<string, DeliveryOption>>(
        (acc, item) => {
            acc[item.value] = item;
            return acc;
        },
        {},
    );

    const combined = day.map((dayItem) => {
        const normKey = normalizeKey(dayItem.value);
        const nightItem = nightMap[normKey];

        return {
            label: dayItem.label.split(' — ')[0],
            priceDay: dayItem.price,
            priceNight: nightItem ? nightItem.price : null
        };
    });

    const grouped = combined.reduce<Record<string, string[]>>((acc, item) => {
        const key = `${item.priceDay}-${item.priceNight ?? 'null'}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item.label);
        return acc;
    }, {});

    return Object.entries(grouped).map(([key, labels]) => {
        const [priceDayStr, priceNightStr] = key.split('-');
        return {
            districts: labels.join(', '),
            priceDay: Number(priceDayStr),
            priceNight: priceNightStr !== 'null' ? Number(priceNightStr) : null
        }
    })
}

export const DeliveryPriceTable = ({
    deliveryPrice
}: {
    deliveryPrice: DeliveryPrice | null
}) => {
    const [timeRange, setTimeRange] = useState<'day' | 'night'>('day');

    const getTimeLabel = (range: 'day' | 'night') =>
        range === 'day' ? '10:00 - 19:00' : '19:01 - 09:59';

    const groupedDeliveryOptions = useMemo(() => {
        return groupDeliveryOptions(deliveryPrice?.day, deliveryPrice?.night);
    }, [deliveryPrice]);

    const handleSelectChange = (
        value: unknown,
        option?: DefaultOptionType | DefaultOptionType[] | undefined
    ) => {
        if (option && 'value' in option && 'label' in option) {
            setTimeRange(value === '10:00 - 19:00' ? 'day' : 'night');
        }
    };

    useEffect(() => {
        const checkScreenSize = () => {
            if (window.innerWidth >= 1024) {
                setTimeRange('day')
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize)
    }, []);

    if (!deliveryPrice) return null;

    return (
        <>
            <Link
                href="/service/dostavka-avto"
                className="w-full lg:w-[160px] block mb-3 mt-5 underline underline-offset-[5px] decoration-[.5px] text-[16px]/[24px] lg:text-[20px]/[28px] font-semibold text-left"
            >
                Карта доставок
            </Link>
            <div className="flex flex-row justify-between items-center mt-3 lg:hidden">
                <div className="flex flex-row items-center">
                    <label htmlFor="time-select">Время:</label>
                    <div className="ml-[10px]">
                        <CustomSelect
                            id="time-select"
                            options={[
                                {
                                    value: '10:00 - 19:00',
                                    label: '10:00 - 19:00',
                                },
                                {
                                    value: '19:01 - 09:59',
                                    label: '19:01 - 09:59',
                                },
                            ]}
                            value={getTimeLabel(timeRange)}
                            style={{ width: '146px' }}
                            onChange={handleSelectChange}
                        />
                    </div>
                </div>
                <div className="text-[#FFD7A6]">Доставка 24/7</div>
            </div>

            <div className="mt-4 lg:mt-6 overflow-hidden">
                <table className="table-auto border border-[#f6f6f6] border-separate border-spacing-0 rounded-xl w-full">
                    <caption className="sr-only">
                        Таблица стоимости доставки автомобиля по районам и
                        времени суток
                    </caption>
                    <thead className="bg-[#f6f6f60e]">
                        <tr className="">
                            <th className="border-b border-r border-[#f6f6f6] rounded-tl-xl px-4 py-[14px] text-left w-2/3 lg:w-1/3 lg:text-center">
                                Район доставки
                            </th>
                            <th className="border-b lg:border-r border-[#f6f6f6] rounded-tr-xl text-center w-1/3 lg:hidden">
                                Цена
                            </th>
                            <th className="border-b border-r border-[#f6f6f6] hidden text-center w-1/3 lg:table-cell">
                                10:00 - 19:00{' '}
                            </th>
                            <th className="border-b border-[#f6f6f6] hidden text-center w-1/3 lg:table-cell">
                                19:01 - 9:59{' '}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupedDeliveryOptions.map(
                            ({ districts, priceDay, priceNight }, index) => {
                                const isLast =
                                    index === groupedDeliveryOptions.length - 1;
                                return (
                                    <tr key={districts}>
                                        <td
                                            className={`border-b border-r border-[#f6f6f6] px-4 py-2 lg:px-4 lg:py-5 lg:text-center ${isLast ? 'border-b-0' : ''
                                                }`}
                                        >
                                            {districts ?? '-'}
                                        </td>
                                        <td
                                            className={`border-b lg:border-r lg:border-[#f6f6f6] text-center ${isLast ? 'border-b-0' : ''
                                                }`}
                                        >
                                            {timeRange === 'day'
                                                ? priceDay
                                                : (priceNight ?? '-')}
                                        </td>
                                        <td
                                            className={`border-b border-[#f6f6f6] hidden text-center lg:table-cell ${isLast ? 'border-b-0' : ''
                                                }`}
                                        >
                                            {priceNight ?? '-'}
                                        </td>
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}
