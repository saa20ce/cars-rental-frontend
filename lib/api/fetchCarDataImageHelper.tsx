import { Car } from '@/lib/types/Car';

function pickImageUrl(c: Car): string {
    const sizes = c._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes;
    return (
        sizes?.medium_large?.source_url ??
        sizes?.medium?.source_url ??
        sizes?.thumbnail?.source_url ??
        c.acf?.white_gallery?.[0] ??
        c.acf?.black_gallery?.[0] ??
        c.acf?.gray_gallery?.[0] ??
        c.acf?.blue_gallery?.[0] ??
        c.acf?.red_gallery?.[0] ??
        ''
    );
}

function slimCar(c: Car): Car {
    const { _embedded, ...rest } = c as any;
    return { ...rest, imageUrl: pickImageUrl(c) } as Car;
}

export function slimCars(list: Car[]): Car[] {
    return list.map(slimCar);
}