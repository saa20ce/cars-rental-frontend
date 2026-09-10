import type { Car } from '@/lib/types/Car';

export function getOverMileagePrice(car: Car): number {
    const model = `${car.slug} ${car.acf?.nazvanie_avto || ''} ${car.title?.rendered || ''}`;
    if (/(?:tank|танк)[\s-]*500(?!\d)/i.test(model)) return 30;
    if (car.klass?.includes(269) || car.kuzov?.includes(243)) return 15;
    if (car.kuzov?.includes(242)) return 12;
    return 10;
}
