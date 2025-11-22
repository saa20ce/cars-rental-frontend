import { notFound } from 'next/navigation';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import {
    getCarBySlug,
    getSeasonDates,
    buildPriceRangesFromACF,
    getDeliveryPrice,
    getSimilarCars,
    getAdditionalOptions,
} from '@/lib/api/fetchCarData';
import { getCarTaxonomyNames } from '@/lib/api/fetchCarTaxonomies';
import { CAR_TAXONOMIES } from '@/lib/types/Taxonomies';
import SingleCarPageClient from '@/clientPage/cars/[slug]/clientPage';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';

type SingleCarPageProps = {
    params: Promise<{ slug: string }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: SingleCarPageProps) {
    const { slug } = await params;
    return await fetchWPMetadata('cars/' + slug);
}

export default async function SingleCarPage({ params }: SingleCarPageProps) {
    const { slug } = await params;
    const car = await getCarBySlug(slug, true);

    if (!car) return notFound();

    const seasonDates = await getSeasonDates();
    const priceRanges = buildPriceRangesFromACF(car.acf || {});
    const deliveryPrice = await getDeliveryPrice();
    const taxonomyValues = await getCarTaxonomyNames(car, CAR_TAXONOMIES);
    const similarCars = await getSimilarCars(car);
    const additionalOptions = await getAdditionalOptions();

    if (!deliveryPrice || !deliveryPrice.day || !deliveryPrice.night) {
        return null;
    }
    const breadcrumbs = await fetchBreadcrumbs(`/cars/${slug}`);

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <SingleCarPageClient
                car={car}
                seasonDates={seasonDates}
                priceRanges={priceRanges}
                taxonomyValues={taxonomyValues}
                similarCars={similarCars}
                additionalOptions={additionalOptions}
                deliveryPrice={deliveryPrice}
            />
        </>
    );
}
