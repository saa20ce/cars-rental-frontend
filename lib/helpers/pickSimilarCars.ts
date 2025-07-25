import type {Car} from '@/lib/types/Car';

const PRICE_FIELD= '30_dnej';

const getCarPrice = (car:Car):number =>
    Number(String(car.acf?.[PRICE_FIELD] ?? '').replace(/[^\d]/g,'')) || 0;
const getKlass = (car:Car):number | null =>
    Array.isArray(car.klass) ? car.klass[0] ?? null:null;

const compareByPrice=(targetPrice:number) => (a:Car,b:Car)=>{
    const da = Math.abs(getCarPrice(a) - targetPrice);
    const db = Math.abs(getCarPrice(b) - targetPrice);
    return da-db;
}

export function pickSimilarPrice(current:Car,all:Car[],limit=3):Car[]{
    const price =getCarPrice(current);
    const klass = getKlass(current);
    const others = all.filter(c => c.id !== current.id);

    const same = others
        .filter(c=>getKlass(c) === klass)
        .sort(compareByPrice(price))
        .slice(0,limit);
    if (same.length === limit) return same;

    const fallback = others
        .filter(c => getKlass(c) !== klass)
        .sort(compareByPrice(price))
        .slice(0,limit - same.length);
    return [...same,...fallback];
}
