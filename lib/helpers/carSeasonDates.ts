import type { Car, SeasonData } from '@/lib/types/Car';

const MINIVAN_KUZOV_ID = 243;

/** WordPress stores one global season; minivans and minibuses have a longer winter season. */
export const getSeasonDatesForCar = (
    car: Car,
    seasonDates: SeasonData | null | undefined,
): SeasonData | null => {
    if (!seasonDates) return null;

    if (!car.kuzov?.includes(MINIVAN_KUZOV_ID)) {
        return seasonDates;
    }

    const startYear = seasonDates['season-winter-start'].split('/')[2];
    const endYear = seasonDates['season-winter-end'].split('/')[2];

    return {
        ...seasonDates,
        'season-winter-start': startYear ? `10/11/${startYear}` : '10/11',
        'season-winter-end': endYear ? `28/02/${endYear}` : '28/02',
    };
};
