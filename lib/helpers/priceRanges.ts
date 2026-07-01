import type { BasePriceRangeConfig, CarACF, PriceRange } from '@/lib/types/Car';

const PRICE_CONFIG: BasePriceRangeConfig[] = [
    { baseKey: '1-3_dnya', minDays: 1, maxDays: 3, label: '1-3 суток' },
    { baseKey: '4-9_dnej', minDays: 4, maxDays: 9, label: '4-9 суток' },
    { baseKey: '10-18_dnej', minDays: 10, maxDays: 18, label: '10-18 суток' },
    { baseKey: '19-29_dnej', minDays: 19, maxDays: 29, label: '19-29 суток' },
    { baseKey: '30_dnej', minDays: 30, maxDays: 9999, label: '30+ суток' },
];

export function buildPriceRangesFromACF(acf: CarACF): PriceRange[] {
    return PRICE_CONFIG.map((cfg) => {
        const normalValue = acf[cfg.baseKey];
        const seasonValue = acf[cfg.baseKey + '_S'];

        const normalStr = typeof normalValue === 'string' ? normalValue : '0';
        const seasonStr = typeof seasonValue === 'string' ? seasonValue : '0';

        return {
            ...cfg,
            price: parseInt(normalStr, 10) || 0,
            seasonPrice: parseInt(seasonStr, 10) || 0,
        };
    });
}