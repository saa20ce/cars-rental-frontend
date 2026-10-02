import type { Car, SeasonData } from '@/lib/types/Car';

const MINIVAN_KUZOV_ID = 243;

/** WordPress stores one global season; minivans and minibuses start winter earlier. */
export const getSeasonDatesForCar = (
    car: Car,
    seasonDates: SeasonData | null | undefined,
): SeasonData | null => {
    if (!seasonDates) return null;

    if (!car.kuzov?.includes(MINIVAN_KUZOV_ID)) {
        return seasonDates;
    }

    const year = seasonDates['season-winter-start'].split('/')[2];

    return {
        ...seasonDates,
        'season-winter-start': year ? `10/11/${year}` : '10/11',
    };
};
