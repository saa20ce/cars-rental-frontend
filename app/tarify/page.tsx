import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import {
    getAdditionalOptions,
    getCars,
    getSeasonDates,
} from '@/lib/api/fetchCarData';
import { getAllTaxonomyOptions } from '@/lib/api/fetchCarTaxonomies';
import { getDeliveryPrice } from '@/lib/api/fetchCarData';
import TariffsPageClient from '@/clientPage/tariffs/clientPage';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import type { Metadata } from 'next';

type TariffsPageSearchParams = {
    klass?: string;
    startDate?: string;
    returnDate?: string;
    startTime?: string;
    returnTime?: string;
};

export async function generateMetadata(): Promise<Metadata> {
    const wordpressMetadata = await fetchWPMetadata('/tarify');

    return {
        ...wordpressMetadata,
        title: 'Тарифы на аренду авто в Новосибирске | Рентасиб',
        description:
            'Цены и тарифы на аренду автомобилей в Новосибирске. Выберите даты и класс авто, чтобы рассчитать актуальную стоимость проката онлайн.',
    };
}

export default async function TariffsPage({
    searchParams,
}: {
    searchParams?: Promise<TariffsPageSearchParams>;
}) {
    const params = (await searchParams) ?? {};
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
    const additionalOptions = await getAdditionalOptions();

    const seasonDates = await getSeasonDates();
    const breadcrumbs = await fetchBreadcrumbs('/tarify');

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
                additionalOptions={additionalOptions}
                initialSearchParams={{
                    klass: typeof params.klass === 'string' ? params.klass : '',
                    startDate:
                        typeof params.startDate === 'string'
                            ? params.startDate
                            : '',
                    returnDate:
                        typeof params.returnDate === 'string'
                            ? params.returnDate
                            : '',
                    startTime:
                        typeof params.startTime === 'string'
                            ? params.startTime
                            : '',
                    returnTime:
                        typeof params.returnTime === 'string'
                            ? params.returnTime
                            : '',
                }}
            />
        </>
    );
}
