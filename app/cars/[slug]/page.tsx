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
import GalleryCars from '@/components/common/Cars/[slug]/GalleryCars';
import { RentSteps } from '@/components/common/Steps/RentSteps';
import { DeliveryPriceTable } from '@/components/common/Table/DeliveryPriceTable';
import { WhyUs } from '@/components/common/Cards/WhyUs';
import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';
import { Accordion } from '@/lib/ui/common/Accordion';
import { faqItems } from '@/lib/data/faqItems';
import { LineIcon } from '@/lib/ui/icons';

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
                additionalOptions={additionalOptions}
                deliveryPrice={deliveryPrice}
            />
            <div className="pb-[42px] lg:pb-[68px]">
                <GalleryCars
                    title="Похожие авто"
                    btnTitle={similarCarsGroup?.btnTitle ?? 'Все авто'}
                    similarCars={clientSimilarCars}
                    href={similarCarsGroup?.href ?? '/cars'}
                    titleTag="h3"
                    carTitleTag="div"
                    seasonDates={seasonDates}
                    deliveryPrice={deliveryPrice}
                    additionalOptions={additionalOptions}
                />
            </div>

            <RentSteps headingTag="div" stepTitleTag="div" />

            <div className="w-full border-t-2 border-[#284B63B2] h-[1px] my-10 lg:hidden" />

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

            <div className="w-full border-t-2 border-[#284B63B2] h-[1px] my-10 lg:my-[68px]" />

            <WhyUs headingTag="div" />

            <section className="py-[42px] lg:py-[68px] border-t border-[#284B63B2]">
                <div className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                    Часто задаваемые вопросы:
                </div>
                <Accordion items={faqItems} />
            </section>

            <HaveQuestions headingTag="div" />
        </>
    );
}
