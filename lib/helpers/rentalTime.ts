import type { Dayjs } from 'dayjs';
import { nextRentalWorkingDay } from './rentalWorkingDays';

export const isPastRentalTime = (date: Dayjs | null, time: string, now: Dayjs) => {
    if (!date) return false;
    const [hour, minute] = time.split(':').map(Number);
    return date.startOf('day').hour(hour).minute(minute).isBefore(now);
};

export const getRentalTimeOptions = (date: Dayjs | null, now: Dayjs) =>
    Array.from({ length: 24 }, (_, hour) => {
        const time = `${hour.toString().padStart(2, '0')}:00`;
        return { value: time, label: time, disabled: isPastRentalTime(date, time, now) };
    });

export const getNextRentalHour = (now: Dayjs) => {
    const hour = now.startOf('hour');
    return nextRentalWorkingDay(hour.isBefore(now) ? hour.add(1, 'hour') : hour);
};
