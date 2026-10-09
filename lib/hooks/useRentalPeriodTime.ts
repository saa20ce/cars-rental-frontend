'use client';

import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { getNextRentalHour, getRentalTimeOptions, isPastRentalTime } from '@/lib/helpers/rentalTime';

interface RentalPeriodTimeProps {
    startDate: Dayjs | null;
    returnDate: Dayjs | null;
    startTime?: string;
    returnTime?: string;
    onStartDateChange?: (date: Dayjs | null) => void;
    onReturnDateChange?: (date: Dayjs | null) => void;
    onStartTimeChange?: (time: string) => void;
    onReturnTimeChange?: (time: string) => void;
}

export function useRentalPeriodTime({
    startDate, returnDate, startTime, returnTime,
    onStartDateChange, onReturnDateChange, onStartTimeChange, onReturnTimeChange,
}: RentalPeriodTimeProps) {
    const [now, setNow] = useState(() => dayjs());
    const [defaultTimeValue] = useState(() => getNextRentalHour(dayjs()).format('HH:mm'));

    useEffect(() => {
        const refresh = () => setNow(dayjs());
        const timer = window.setInterval(refresh, 1000);
        window.addEventListener('focus', refresh);
        return () => {
            window.clearInterval(timer);
            window.removeEventListener('focus', refresh);
        };
    }, []);

    useEffect(() => {
        const nextHour = getNextRentalHour(now);
        if (startDate && isPastRentalTime(startDate, startTime || defaultTimeValue, now)) {
            if (!startDate.isSame(nextHour, 'day')) {
                onStartDateChange?.(nextHour.startOf('day'));
            }
            onStartTimeChange?.(nextHour.format('HH:mm'));
        }
        if (returnDate && isPastRentalTime(returnDate, returnTime || defaultTimeValue, now)) {
            if (!returnDate.isSame(nextHour, 'day')) {
                onReturnDateChange?.(nextHour.startOf('day'));
            }
            onReturnTimeChange?.(nextHour.format('HH:mm'));
        }
    }, [now, startDate, startTime, returnDate, returnTime, defaultTimeValue,
        onStartDateChange, onStartTimeChange, onReturnDateChange, onReturnTimeChange]);

    const changeTime = (date: Dayjs | null, value: unknown, onChange?: (time: string) => void) => {
        const current = dayjs();
        setNow(current);
        if (typeof value === 'string' && !isPastRentalTime(date, value, current)) {
            onChange?.(value);
        }
    };

    return {
        defaultTimeValue,
        startTimeOptions: getRentalTimeOptions(startDate, now),
        returnTimeOptions: getRentalTimeOptions(returnDate, now),
        refreshTime: () => setNow(dayjs()),
        changeStartTime: (value: unknown) => changeTime(startDate, value, onStartTimeChange),
        changeReturnTime: (value: unknown) => changeTime(returnDate, value, onReturnTimeChange),
    };
}
