import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import { getCars, getSeasonDates } from '@/lib/api/fetchCarData';
import { getAllTaxonomyOptions } from '@/lib/api/fetchCarTaxonomies';
import { getDeliveryPrice } from '@/lib/api/fetchCarData';
import TariffsPageClient from '@/clientPage/tariffs/clientPage';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return await fetchWPMetadata('/tarify');
}

export default async function TariffsPage() {
    const cars = await getCars({ per_page: '100' });

    const {
        klassOptions,
        markaOptions,
        kuzovOptions,
        privodOptions,
        dvigatelOptions,
        colorOptions,
    } = await getAllTaxonomyOptions();

    const deliveryPrice = await getDeliveryPrice();

    const seasonDates = await getSeasonDates();
    const breadcrumbs = await fetchBreadcrumbs('/tariffs');

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <TariffsPageClient
                cars={cars}
                klassOptions={klassOptions}
                markaOptions={markaOptions}
                kuzovOptions={kuzovOptions}
                privodOptions={privodOptions}
                dvigatelOptions={dvigatelOptions}
                colorOptions={colorOptions}
                deliveryPrice={deliveryPrice}
                seasonDates={seasonDates}
            />
        </>
    );
}
