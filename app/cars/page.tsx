import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import { getAdditionalOptions, getCars, getSeasonDates } from '@/lib/api/fetchCarData';
import { getAllTaxonomyOptions } from '@/lib/api/fetchCarTaxonomies';
import { getDeliveryPrice } from '@/lib/api/fetchCarData';
import CarsPageClient from '@/clientPage/cars/clientPage';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { DeliveryPriceTable, RentSteps } from '@/components/common/Cars';
import { LineIcon } from '@/lib/ui/icons';
import { WhyUs } from '@/components/common/Cards/WhyUs';
import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return await fetchWPMetadata('/cars');
}

export default async function CarsPage() {
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
    const breadcrumbs = await fetchBreadcrumbs('/cars');
    const additionalOptions = await getAdditionalOptions();
    const seasonDates = await getSeasonDates();

    return (
        <>
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
            />
            <RentSteps />

            <div className=" w-full border-t-2 border-[#284B63B2] h-[1px] my-10 lg:hidden"></div>

            <section className="mt-10 lg:mt-[68px]">
                <div className="flex flex-row">
                    <h2 className="text-xl font-bold lg:text-3xl">
                        Стоимость доставки авто:
                    </h2>
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

            <WhyUs />

            <HaveQuestions />
        </>
    );
}
