import type { PriceRange, SeasonData } from '@/lib/types/Car';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
export const TIME_OVERAGE_GRACE_MINUTES = 120;
export const MIN_RENTAL_DAYS = 3;
export const MIN_RENTAL_DAYS_ERROR_TEXT = 'Минимальная аренда от 3-х суток';

export const getTimeMinutes = (time: string) => {
    const [rawHours = '0', rawMinutes = '0'] = time.split(':');
    const hours = Number(rawHours);
    const minutes = Number(rawMinutes);

    if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return 0;

    return hours * 60 + minutes;
};

export const getRentalDaysCount = (
    startDate: Dayjs | null,
    returnDate: Dayjs | null,
    startTime: string,
    returnTime: string,
) => {
    if (!startDate || !returnDate) return 0;

    const calendarDays = returnDate
        .startOf('day')
        .diff(startDate.startOf('day'), 'day');

    if (calendarDays <= 0) return 0;

    const overtimeMinutes =
        getTimeMinutes(returnTime) - getTimeMinutes(startTime);

    return (
        calendarDays +
        (overtimeMinutes > TIME_OVERAGE_GRACE_MINUTES ? 1 : 0)
    );
};

export const getMinimumRentalReturnDate = (startDate: Dayjs) =>
    startDate.startOf('day').add(MIN_RENTAL_DAYS, 'day');
export const isRentalPeriodBelowMinimum = (
    startDate: Dayjs | null,
    returnDate: Dayjs | null,
    startTime: string,
    returnTime: string,
) => {
    if (!startDate || !returnDate) return false;

    const calendarDays = returnDate
        .startOf('day')
        .diff(startDate.startOf('day'), 'day');

    if (calendarDays < 0) return true;

    return (
        getRentalDaysCount(startDate, returnDate, startTime, returnTime) <
        MIN_RENTAL_DAYS
    );
};

export const getRentalDaysCountWithMinimum = (
    startDate: Dayjs | null,
    returnDate: Dayjs | null,
    startTime: string,
    returnTime: string,
) => {
    if (!startDate || !returnDate) return 0;

    const calendarDays = returnDate
        .startOf('day')
        .diff(startDate.startOf('day'), 'day');

    if (calendarDays < 0) return MIN_RENTAL_DAYS;

    const daysCount = getRentalDaysCount(
        startDate,
        returnDate,
        startTime,
        returnTime,
    );

    return daysCount < MIN_RENTAL_DAYS ? MIN_RENTAL_DAYS : daysCount;
};

export function computeCostsChunked(
    startFull: Dayjs,
    endFull: Dayjs,
    priceRanges: PriceRange[],
    seasonDates: SeasonData | null,
): number[] {
    const costs: number[] = [];
    let currentDay = startFull.clone();

    while (currentDay.isBefore(endFull, 'day')) {
        const exactDiffHours = endFull.diff(currentDay, 'hour', true);
        const daysLeft = Math.ceil(exactDiffHours / 24);
        if (daysLeft <= 0) break;

        const chunkRange = findPriceRange(daysLeft, priceRanges);
        if (!chunkRange) break;

        let blockSize: number;
        if (daysLeft < chunkRange.minDays) {
            blockSize = daysLeft;
        } else if (daysLeft > chunkRange.maxDays) {
            blockSize = chunkRange.maxDays;
        } else {
            blockSize = daysLeft;
        }

        for (let i = 0; i < blockSize; i++) {
            if (!currentDay.isBefore(endFull, 'day')) break;
            const seasonDay = isDaySeason(currentDay, seasonDates);
            costs.push(seasonDay ? chunkRange.seasonPrice : chunkRange.price);
            currentDay = currentDay.add(1, 'day');
        }
    }

    return costs;
}

export function findPriceRange(
    days: number,
    arr: PriceRange[],
): PriceRange | null {
    for (const pr of arr) {
        if (days >= pr.minDays && days <= pr.maxDays) {
            return pr;
        }
    }
    return null;
}

export function isDaySeason(
    day: Dayjs,
    seasonDates: SeasonData | null,
): boolean {
    if (!seasonDates) return false;
    const winterStart = parseSeasonDate(seasonDates['season-winter-start']);
    const winterEnd = parseSeasonDate(seasonDates['season-winter-end']);
    const summerStart = parseSeasonDate(seasonDates['season-summer-start']);
    const summerEnd = parseSeasonDate(seasonDates['season-summer-end']);

    return (
        isDayjsInSeason(day, winterStart, winterEnd) ||
        isDayjsInSeason(day, summerStart, summerEnd)
    );
}

export function parseSeasonDate(dateStr: string) {
    const [dd, mm] = dateStr.split('/');
    return { day: +dd, month: +mm };
}

export function isDayjsInSeason(
    day: Dayjs,
    start: { day: number; month: number },
    end: { day: number; month: number },
) {
    const d = day.date();
    const m = day.month() + 1;

    const crossesNewYear = start.month > end.month;
    const toNum = (x: { day: number; month: number }) => x.month * 100 + x.day;
    const curNum = toNum({ day: d, month: m });
    const startNum = toNum(start);
    const endNum = toNum(end);

    if (!crossesNewYear) {
        return curNum >= startNum && curNum <= endNum;
    } else {
        const dec31 = 1231;
        const jan01 = 101;
        return (
            (curNum >= startNum && curNum <= dec31) ||
            (curNum >= jan01 && curNum <= endNum)
        );
    }
}
