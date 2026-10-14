import dayjs, { type Dayjs } from 'dayjs';
import type { Car, SeasonData } from '@/lib/types/Car';
import { getSeasonDatesForCar } from './carSeasonDates';
import {
    DISCOUNT_MIN_RENTAL_DAYS,
    getDiscountedPriceForDay,
    isDaySeason,
    isDiscountActiveForDay,
} from './RentalCheckoutHelper';

export type CarDisplayPriceMode = 'short' | 'weekly' | 'monthly';

export function getCarDisplayPrice(
    car: Car,
    seasonDates: SeasonData | null | undefined,
    mode: CarDisplayPriceMode = 'short',
    today: Dayjs = dayjs(),
) {
    const priceKey =
        mode === 'monthly'
            ? '30_dnej'
            : mode === 'weekly'
              ? '4-9_dnej'
              : '1-3_dnya';
    const regularPrice = Number(car.acf?.[priceKey]) || 0;
    const seasonPrice = Number(car.acf?.[`${priceKey}_S`]) || regularPrice;
    const rentalDays =
        mode === 'monthly'
            ? 30
            : mode === 'weekly'
              ? 7
              : DISCOUNT_MIN_RENTAL_DAYS;
    const price = isDaySeason(today, getSeasonDatesForCar(car, seasonDates))
        ? seasonPrice
        : regularPrice;

    return {
        price,
        discountedPrice: getDiscountedPriceForDay(
            price,
            today,
            car.acf,
            rentalDays,
        ),
        hasActiveDiscount: isDiscountActiveForDay(today, car.acf, rentalDays),
    };
}
