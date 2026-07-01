'use client';

import React, { useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import type { DatePickerProps } from 'antd';
import { useRouter } from 'next/navigation';
import CustomButton from '@/lib/ui/common/Button';
import { CustomDatePicker } from '@/lib/ui/common/DatePicker/CustomDatePicker';
import { CustomSelect } from '@/lib/ui/common/Select/CustomSelect';
import { dispatchRouteLoadingStart } from '@/lib/helpers/routeLoading';
import { buildKlassOptionsWithKuzov } from '@/lib/helpers/carFilterOptions';

interface HomeCarSearchFormProps {
    klassOptions: Array<{ value: string; label: string }>;
    kuzovOptions: Array<{ value: string; label: string }>;
}

const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return { value: `${hour}:00`, label: `${hour}:00` };
});

export default function HomeCarSearchForm({
    klassOptions,
    kuzovOptions,
}: HomeCarSearchFormProps) {
    const router = useRouter();
    const today = useMemo(() => dayjs(), []);
    const defaultTimeValue = useMemo(() => {
        const now = dayjs();
        const hour =
            now.minute() >= 30 ? now.add(1, 'hour').hour() : now.hour();

        return `${hour.toString().padStart(2, '0')}:00`;
    }, []);

    const [startDate, setStartDate] = useState<Dayjs | null>(today);
    const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
    const [startTime, setStartTime] = useState(defaultTimeValue);
    const [returnTime, setReturnTime] = useState(defaultTimeValue);
    const [selectedKlass, setSelectedKlass] = useState('');
    const [isChainActive, setIsChainActive] = useState(false);
    const [isReturnDateOpen, setIsReturnDateOpen] = useState(false);

    const klassOptionsWithKuzov = useMemo(
        () => buildKlassOptionsWithKuzov(klassOptions, kuzovOptions),
        [klassOptions, kuzovOptions],
    );

    const disabledDateStart: DatePickerProps['disabledDate'] = (current) =>
        !!current && current.isBefore(dayjs().startOf('day'), 'day');

    const disabledDateFinish: DatePickerProps['disabledDate'] = (current) => {
        if (!startDate) return true;

        return !!current && current.isBefore(startDate.startOf('day'), 'day');
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const params = new URLSearchParams();

        if (selectedKlass) {
            params.set('klass', selectedKlass);
        }

        if (startDate) {
            params.set('startDate', startDate.format('YYYY-MM-DD'));
        }

        if (returnDate) {
            params.set('returnDate', returnDate.format('YYYY-MM-DD'));
        }

        if (startTime) {
            params.set('startTime', startTime);
        }

        if (returnTime) {
            params.set('returnTime', returnTime);
        }

        const queryString = params.toString();

        dispatchRouteLoadingStart();
        router.push(queryString ? `/tarify?${queryString}` : '/tarify');
    };

    return (
        <section className="bg-[#f6f6f60e] rounded-3xl px-[24px] py-[28px] lg:p-7 mb-6 lg:mb-8">
            <header className="flex flex-col lg:flex-row lg:justify-between pb-6 border-b border-[#f6f6f638]">
                <div className="w-full max-w-[610px]">
                    <h2 className="text-[24px]/[32px] lg:text-[30px]/[36px] font-bold mb-4 lg:mb-5">
                        Поиск автомобиля
                    </h2>
                    <p className="text-[16px]/[24px] lg:text-[18px]/[28px] font-medium">
                        В нашем автопарке — автомобили разных классов на любой
                        бюджет. Укажите даты и класс, чтобы увидеть актуальную стоимость автомобилей на ваши даты.
                    </p>
                </div>
            </header>

            <form
                className="flex flex-col mt-[24px] lg:mt-[32px] gap-[32px] lg:gap-[10px] lg:grid lg:grid-cols-4"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-[8px] lg:gap-[10px] lg:contents">
                    <div className="dateTimeWrapper flex lg:w-full">
                        <CustomDatePicker
                            placeholder="Дата аренды"
                            disabledDate={disabledDateStart}
                            value={startDate}
                            onChange={(date) => {
                                setStartDate(date);
                                if (date) {
                                    setIsChainActive(true);
                                    if (
                                        returnDate &&
                                        !returnDate.isAfter(date, 'day')
                                    ) {
                                        setReturnDate(null);
                                    }
                                }
                            }}
                            width="58%"
                        />

                        <CustomSelect
                            placeholder="18:00"
                            options={timeOptions}
                            className="timePicker"
                            value={startTime}
                            onChange={(value) => setStartTime(value as string)}
                        />
                    </div>

                    <div className="dateTimeWrapper flex lg:w-full">
                        <CustomDatePicker
                            placeholder="Возврат"
                            disabledDate={disabledDateFinish}
                            value={returnDate}
                            onChange={(date) => setReturnDate(date)}
                            open={isChainActive ? isReturnDateOpen : undefined}
                            onOpenChange={(open) => setIsReturnDateOpen(open)}
                            disabled={!startDate}
                            width="58%"
                        />

                        <CustomSelect
                            placeholder="18:00"
                            options={timeOptions}
                            className="timePicker"
                            value={returnTime}
                            onChange={(value) => setReturnTime(value as string)}
                        />
                    </div>

                    <CustomSelect
                        placeholder="Класс"
                        options={klassOptionsWithKuzov}
                        className="filters-select"
                        style={{ width: '100%' }}
                        value={selectedKlass || undefined}
                        onChange={(value) => setSelectedKlass(value as string)}
                    />
                </div>

                <CustomButton
                    variant="default"
                    type="submit"
                    className="w-full font-semibold lg:ml-[2px]"
                    style={{ width: '100%', height: 44 }}
                >
                    Найти авто
                </CustomButton>
            </form>
        </section>
    );
}
