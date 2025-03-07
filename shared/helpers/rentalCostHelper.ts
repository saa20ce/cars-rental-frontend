import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export interface PriceRange {
	baseKey: string;
	minDays: number;
	maxDays: number;
	label: string;
	price: number;
	seasonPrice: number;
}

export interface SeasonData {
	'season-winter-start': string;
	'season-winter-end': string;
	'season-summer-start': string;
	'season-summer-end': string;
}

/**
 * Рассчитывает стоимость аренды по блокам, используя заданные диапазоны цен и сезонность.
 */
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

/**
 * Возвращает диапазон цены, подходящий для заданного количества дней.
 */
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

/**
 * Определяет, является ли день сезонным, исходя из переданных дат сезона.
 */
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

/**
 * Парсит дату сезона в формате "DD/MM" в объект с числовыми значениями.
 */
export function parseSeasonDate(dateStr: string) {
	const [dd, mm] = dateStr.split('/');
	return { day: +dd, month: +mm };
}

/**
 * Проверяет, попадает ли переданный день в диапазон дат сезона.
 */
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
