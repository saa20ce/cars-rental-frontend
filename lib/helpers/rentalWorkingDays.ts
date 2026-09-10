import type { Dayjs } from 'dayjs';

// January 1 is the only annual closure; rentals may span this day.
export const isRentalDayOff = (date: Dayjs) =>
    date.month() === 0 && date.date() === 1;

export const nextRentalWorkingDay = (date: Dayjs) =>
    isRentalDayOff(date) ? date.add(1, 'day') : date;
