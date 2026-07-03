import type { Car } from '@/lib/types/Car';

const getCarPublishedTime = (car: Car) => {
    const publishedDate = car.date_gmt || car.date;
    const publishedTime = publishedDate ? Date.parse(publishedDate) : 0;

    return Number.isFinite(publishedTime) ? publishedTime : 0;
};

export const compareCarsByPublishedDateDesc = (a: Car, b: Car) =>
    getCarPublishedTime(b) - getCarPublishedTime(a);