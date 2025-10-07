'use client';

import React, { useState, useMemo } from 'react';
import type { DatePicker } from 'antd';
import type { GetProps } from 'antd';
import type { Car, Term } from '@/lib/types/Car';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/ru';
import { CustomSelect } from '@/lib/ui/common/Select/CustomSelect';
import { AdditionalServices } from './AdditionalServices';
import dynamic from 'next/dynamic';

const CustomDatePicker = dynamic(
    () => import('@/lib/ui/common/DatePicker/CustomDatePicker').then(m => m.CustomDatePicker),
    { ssr: false, loading: () => null }
);
const RentalCheckoutContactForm = dynamic(
    () => import('@/components/common/Form/RentalCheckoutContactForm').then(m => m.RentalCheckoutContactForm),
    { ssr: false, loading: () => null }
);
import { CloseIcon } from '@/lib/ui/icons';

dayjs.locale('ru');
dayjs.extend(updateLocale);

dayjs.updateLocale('ru', {
    monthsShort: [
        'янв.',
        'фев.',
        'мар.',
        'апр.',
        'май',
        'июн.',
        'июл.',
        'авг.',
        'сен.',
        'окт.',
        'ноя.',
        'дек.',
    ],
});

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

interface RentalPeriodProps {
    car: Car;
    startDate: Dayjs | null;
    onStartDateChange?: (date: Dayjs | null) => void;
    startTime?: string;
    onStartTimeChange?: (time: string) => void;
    returnDate: Dayjs | null;
    onReturnDateChange?: (date: Dayjs | null) => void;
    returnTime?: string;
    onReturnTimeChange?: (time: string) => void;
    daysCount: number;
    additionalOptions: { label: string; value: string }[];
    additionalOptionsSelected: string[];
    setAdditionalOptions?: (opts: string[]) => void;
    deliveryOptions: { label: string; value: string }[];
    deliveryOptionSelected: string;
    setDeliveryOption: (opt: string) => void;
    totalPrice?: number;
    pricePerDay?: number;
    showContactForm?: boolean;
    closeModal?: () => void;
    setIsSubmitted?: (isSubmitted: boolean) => void;
}

export const RentalPeriod: React.FC<RentalPeriodProps> = ({
    car,
    startDate = null,
    onStartDateChange,
    startTime,
    onStartTimeChange,
    returnTime,
    onReturnTimeChange,
    returnDate = null,
    onReturnDateChange,
    daysCount,
    additionalOptions,
    additionalOptionsSelected = [],
    setAdditionalOptions,
    deliveryOptions,
    deliveryOptionSelected,
    setDeliveryOption,
    totalPrice = 0,
    pricePerDay = 0,
    showContactForm = false,
    closeModal,
    setIsSubmitted,
}) => {
    const allTerms = car._embedded?.['wp:term'] || [];
    const colorTerm = allTerms.flat().find((t: Term) => t.taxonomy === 'color');

    const autoColor = colorTerm?.name ?? '—';
    const autoName = car.acf?.nazvanie_avto ?? car.title.rendered;
    const rentDate = `${startDate} ${startTime} – ${returnDate} ${returnTime}`;
    const rentPeriod = `${daysCount} ${daysCount === 1 ? 'день' : 'дней'}`;
    const optionsStr = additionalOptionsSelected.join(', ');

    const [isChainActive, setIsChainActive] = useState(false);
    const [isReturnDateOpen, setIsReturnDateOpen] = useState(false);

    const timeOptions = Array.from({ length: 24 }, (_, i) => {
        const hour = i.toString().padStart(2, '0');
        return { value: `${hour}:00`, label: `${hour}:00` };
    });

    const defaultTimeValue = useMemo(() => {
        const now = dayjs();
        const hour =
            now.minute() >= 30 ? now.add(1, 'hour').hour() : now.hour();
        return `${hour.toString().padStart(2, '0')}:00`;
    }, []);

    const disabledDateStart: RangePickerProps['disabledDate'] = (current) => {
        return current && current < dayjs().startOf('day');
    };

    const disabledDateFinish: RangePickerProps['disabledDate'] = (current) => {
        if (!startDate) return true;
        return current && current < startDate.startOf('day');
    };

    return (
        <section className="w-full bg-[#284b63] lg:max-w-[618px] rounded-[24px] px-6 py-7 mt-6 lg:mt-0 relative z-10 lg:p-9 lg:rounded-[32px] ">
            {showContactForm && closeModal && (
                <button
                    className="absolute top-6 right-6 cursor-pointer"
                    onClick={closeModal}
                >
                    <CloseIcon />
                </button>
            )}

            <h2 className="text-[20px]/[28px] lg:text-[24px]/[32px] font-bold mb-4 lg:mb-5">
                Форма бронирования
            </h2>
            <h3 className="text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold mb-[10px] lg:mb-3">
                Период аренды:
            </h3>
            <div className="flex flex-col gap-2 lg:flex-row lg:gap-[10px]">
                <div className="flex" aria-label="Дата начала аренды">
                    <CustomDatePicker
                        placeholder="Дата аренды"
                        disabledDate={disabledDateStart}
                        value={startDate}
                        onChange={(date) => {
                            onStartDateChange?.(date);
                            if (date) {
                                setIsChainActive(true);
                                if (returnDate && date.isAfter(returnDate)) {
                                    const newReturnDate = dayjs(date).add(
                                        1,
                                        'day',
                                    );
                                    onReturnDateChange?.(newReturnDate);
                                }
                            }
                        }}
                        width="58%"
                    />

                    <CustomSelect
                        placeholder="18:00"
                        options={timeOptions}
                        className="timePicker"
                        value={startTime || defaultTimeValue}
                        onChange={(val) => onStartTimeChange?.(val as string)}
                    />
                </div>

                <div className="flex" aria-label="Дата окончания аренды">
                    <CustomDatePicker
                        placeholder="Возврат"
                        disabledDate={disabledDateFinish}
                        value={returnDate}
                        onChange={(date) => onReturnDateChange?.(date)}
                        width="58%"
                        open={isChainActive ? isReturnDateOpen : undefined}
                        onOpenChange={(open) => setIsReturnDateOpen(open)}
                        disabled={!startDate}
                    />

                    <CustomSelect
                        placeholder="18:00"
                        options={timeOptions}
                        className="timePicker"
                        value={returnTime || defaultTimeValue}
                        onChange={(val) => onReturnTimeChange?.(val as string)}
                    />
                </div>
            </div>

            <AdditionalServices
                additionalOptions={additionalOptions}
                additionalOptionsSelected={additionalOptionsSelected}
                setAdditionalOptions={setAdditionalOptions}
                deliveryOptions={deliveryOptions}
                deliveryOptionSelected={deliveryOptionSelected}
                setDeliveryOption={setDeliveryOption}
            />

            {showContactForm && (
                <RentalCheckoutContactForm
                    autoName={autoName}
                    autoColor={autoColor}
                    rentDate={rentDate}
                    rentPeriod={rentPeriod}
                    delivery={deliveryOptionSelected}
                    options={optionsStr}
                    totalPrice={totalPrice}
                    pricePerDay={pricePerDay}
                    onSuccess={() => setIsSubmitted?.(true)}
                />
            )}
        </section>
    );
};
