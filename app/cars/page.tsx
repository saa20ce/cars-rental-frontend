import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import {
    getAdditionalOptions,
    getCars,
    getSeasonDates,
} from '@/lib/api/fetchCarData';
import { getAllTaxonomyOptions } from '@/lib/api/fetchCarTaxonomies';
import { getDeliveryPrice } from '@/lib/api/fetchCarData';
import CarsPageClient from '@/clientPage/cars/clientPage';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { DeliveryPriceTable, RentSteps } from '@/components/common/Cars';
import { LineIcon } from '@/lib/ui/icons';
import { WhyUs } from '@/components/common/Cards/WhyUs';
import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';
import JsonLd from '@/components/common/Meta/JsonLd';
import { buildCarsItemListJsonLd } from '@/lib/seo/structuredData';
import type { Metadata } from 'next';

// Prices and seasonal discounts are refreshed with the daily WordPress cache.
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
    const wordpressMetadata = await fetchWPMetadata('/cars');
    const title = 'Автопарк: аренда авто без водителя в Новосибирске | Рентасиб';
    const description =
        'Каталог автомобилей для посуточной аренды без водителя в Новосибирске: седаны, кроссоверы и минивэны. Сравните модели и цены за сутки.';

    return {
        ...wordpressMetadata,
        title,
        description,
        openGraph: {
            ...(wordpressMetadata.openGraph ?? {}),
            title,
            description,
        },
        twitter: {
            ...(wordpressMetadata.twitter ?? {}),
            title,
            description,
        },
    };
}

export default async function CarsPage() {
    const [
        cars,
        taxonomyOptions,
        deliveryPrice,
        breadcrumbs,
        additionalOptions,
        seasonDates,
    ] = await Promise.all([
        getCars({ per_page: '100' }),
        getAllTaxonomyOptions(),
        getDeliveryPrice(),
        fetchBreadcrumbs('/cars'),
        getAdditionalOptions(),
        getSeasonDates(),
    ]);
    const {
        klassOptions,
        markaOptions,
        kuzovOptions,
        privodOptions,
        dvigatelOptions,
        colorOptions,
    } = taxonomyOptions;
    const carsItemListJsonLd = buildCarsItemListJsonLd(cars, seasonDates);

    return (
        <>
            <JsonLd id="cars-jsonld" data={carsItemListJsonLd} />
            <Breadcrumbs crumbs={breadcrumbs} />
            <CarsPageClient
                cars={cars}
                klassOptions={klassOptions}
                markaOptions={markaOptions}
                kuzovOptions={kuzovOptions}
                privodOptions={privodOptions}
                dvigatelOptions={dvigatelOptions}
                colorOptions={colorOptions}
                additionalOptions={additionalOptions}
                deliveryPrice={deliveryPrice}
                seasonDates={seasonDates}
                syncFiltersWithUrl
                headingText="Автопарк: аренда авто без водителя в Новосибирске"
                introText="В каталоге — автомобили для личных и деловых поездок: эконом, комфорт, бизнес-класс, кроссоверы и минивэны. Цены в карточках указаны за сутки; итоговая стоимость зависит от выбранных дат и срока аренды. Выберите класс или марку и откройте карточку, чтобы рассчитать стоимость. Наличие конкретного автомобиля подтвердим при бронировании."
                carTitleTag="h2"
            />
            <RentSteps headingTag="div" stepTitleTag="div" />

            <div className=" w-full border-t-2 border-[#284B63B2] h-[1px] my-10 lg:hidden"></div>

            <section className="mt-10 lg:mt-[68px]">
                <div className="flex flex-row">
                    <div className="text-xl font-bold lg:text-3xl">
                        Стоимость доставки авто:
                    </div>
                    <div className="hidden lg:block ml-4 mt-[6px]">
                        <LineIcon />
                    </div>
                    <div className="hidden text-[#FFD7A6] lg:block text-2xl ml-4 mt-[2px]">
                        Доставка 24/7
                    </div>
                </div>
                <DeliveryPriceTable deliveryPrice={deliveryPrice} />
            </section>

            <div className=" w-full border-t-2 border-[#284B63B2] h-[1px] my-10 lg:my-[68px]"></div>

            <WhyUs headingTag="div" />

            <HaveQuestions headingTag="div" />
        </>
    );
}
