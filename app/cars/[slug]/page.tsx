import { notFound } from 'next/navigation';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import {
    getCarBySlug,
    getCars,
    getSeasonDates,
    getDeliveryPrice,
    getSimilarCars,
    getSimilarCarsGroup,
    getAdditionalOptions,
} from '@/lib/api/fetchCarData';
import { getCarTaxonomyNames } from '@/lib/api/fetchCarTaxonomies';
import { CAR_TAXONOMIES } from '@/lib/types/Taxonomies';
import SingleCarPageClient from '@/clientPage/cars/[slug]/clientPage';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { buildPriceRangesFromACF } from '@/lib/helpers/priceRanges';
import JsonLd from '@/components/common/Meta/JsonLd';
import { buildCarJsonLd } from '@/lib/seo/structuredData';
import { withCurrentCarMetadata } from '@/lib/seo/carMetadata';

type SingleCarPageProps = {
    params: Promise<{ slug: string }>;
};

// Car data and prices are refreshed by the daily WordPress cache. Keeping the
// route in the full-page cache avoids rebuilding the same data waterfall for
// every visitor.
export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
    const cars = await getCars({ per_page: '100' });

    return cars.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: SingleCarPageProps) {
    const { slug } = await params;
    const [wordpressMetadata, car] = await Promise.all([
        fetchWPMetadata(`/cars/${slug}`),
        getCarBySlug(slug, true),
    ]);

    return withCurrentCarMetadata(wordpressMetadata, car);
}

export default async function SingleCarPage({ params }: SingleCarPageProps) {
    const { slug } = await params;
    const car = await getCarBySlug(slug, true);

    if (!car) return notFound();

    const priceRanges = buildPriceRangesFromACF(car.acf || {});
    const similarCarsGroup = getSimilarCarsGroup(car);
    const currentTitle = car.acf?.nazvanie_avto || car.title?.rendered;
    const [
        seasonDates,
        deliveryPrice,
        taxonomyValues,
        similarCars,
        additionalOptions,
        breadcrumbs,
    ] = await Promise.all([
        getSeasonDates(),
        getDeliveryPrice(),
        getCarTaxonomyNames(car, CAR_TAXONOMIES),
        getSimilarCars(car),
        getAdditionalOptions(),
        fetchBreadcrumbs(`/cars/${slug}`, { currentTitle }),
    ]);
    const carJsonLd = buildCarJsonLd({ car, seasonDates, taxonomyValues });
    const clientCar = { ...car, _links: undefined, _embedded: undefined };
    const clientSimilarCars = similarCars.map((similarCar) => ({
        ...similarCar,
        _links: undefined,
        _embedded: undefined,
    }));

    return (
        <>
            <JsonLd id="car-jsonld" data={carJsonLd} />
            <Breadcrumbs crumbs={breadcrumbs} />
            <SingleCarPageClient
                car={clientCar}
                seasonDates={seasonDates}
                priceRanges={priceRanges}
                taxonomyValues={taxonomyValues}
                similarCars={clientSimilarCars}
                similarCarsHref={similarCarsGroup?.href ?? '/cars'}
                similarCarsBtnTitle={similarCarsGroup?.btnTitle ?? 'Все авто'}
                additionalOptions={additionalOptions}
                deliveryPrice={deliveryPrice}
            />
        </>
    );
}
