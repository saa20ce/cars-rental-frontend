import CarsPageClient from '@/clientPage/cars/clientPage';
import AdditionalServicesCards from '@/components/common/Cards/AdditionalServicesCards';
import ContactCardsLittle from '@/components/common/Cards/ContactCardsLittle';
import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';
import InfoThreeCard from '@/components/common/Cards/InfoThreeCard';
import RentalTerms from '@/components/common/Cards/RentalTerms';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import ReviewsApi from '@/components/common/ReviewsClients/ReviewsApi';
import TextImageSection from '@/components/common/TextImageSection/TextImageSection';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { getCars, getSeasonDates } from '@/lib/api/fetchCarData';
import { getAllTaxonomyOptions } from '@/lib/api/fetchCarTaxonomies';
import { faqItems } from '@/lib/data/faqItems';
import { rentalTermsEconomItems, servicesItems } from '@/lib/data/itemsCards';
import { Accordion } from '@/lib/ui/common/Accordion';
import { ArrowRightLinkIcon } from '@/lib/ui/icons';
import Link from 'next/link';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';

export async function generateMetadata() {
    return await fetchWPMetadata('/service/arenda-krossoverov');
}

const paragraphTextImageSection = [
    'Кроссовер может подойти для городской или загородной поездки, если вам нужен просторный салон и удобная посадка. Характеристики и привод зависят от конкретной модели.',
    'Сравните доступные автомобили по числу мест, объёму багажника и тарифу на нужные даты. Допустимый маршрут и условия эксплуатации уточните до бронирования.',
    'Если потребуется больше места для вещей, спросите о наличии совместимого багажного бокса и стоимости этой опции.',
];

export default async function CrossoverRentalPage() {
    const cars = await getCars({ per_page: '100' });
    const {
        klassOptions,
        markaOptions,
        kuzovOptions,
        privodOptions,
        dvigatelOptions,
        colorOptions,
    } = await getAllTaxonomyOptions();
    const seasonDates = await getSeasonDates();
    const breadcrumbs = await fetchBreadcrumbs('/service/arenda-krossoverov');

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Аренда кроссоверов в Новосибирске
            </h1>
            <InfoThreeCard header="Выберите кроссовер для самостоятельной поездки по Новосибирску и согласованному маршруту" />

            <CarsPageClient
                cars={cars}
                klassOptions={klassOptions}
                markaOptions={markaOptions}
                kuzovOptions={kuzovOptions}
                privodOptions={privodOptions}
                dvigatelOptions={dvigatelOptions}
                colorOptions={colorOptions}
                seasonDates={seasonDates}
                defaultKuzov="242"
                headingLevel="h2"
            />

            <TextImageSection
                sectionGray={true}
                src="/images/dsc05065-scaled.webp"
                alt="Автомобиль кроссовер в аренду"
                aspect="2/1"
                pyTextBlock="36"
                maxWidthImage="618"
                header={
                    <>
                        Кроссоверы в аренду:
                        <br className="hidden lg:block" /> выбор под вашу поездку
                    </>
                }
                paragraphs={paragraphTextImageSection}
            />

            <RentalTerms
                header="Условия аренды кроссовера:"
                items={rentalTermsEconomItems}
            />

            <section className="border-b border-[#284B63B2]">
                <p className="text-[14px]/[20px] lg:text-[20px]/[28px] font-medium bg-[#1E384A] px-6 py-7 lg:py-[38px] lg:px-9 rounded-[24px]">
                    Посмотрите доступные кроссоверы в каталоге и сравните
                    стоимость на нужные даты. Наличие конкретной модели,
                    допустимый маршрут и дополнительные опции подтвердим при
                    бронировании. Для связи используйте указанные контакты:
                </p>

                <ContactCardsLittle />
            </section>

            <section className="pt-[42px] pb-[10px] lg:pt-[68px] lg:pb-[32px] border-b border-t border-[#284B63B2]">
                <h2 className="font-bold text-[20px]/[28px] lg:text-[30px]/[36px] ">
                    Дополнительные услуги
                </h2>
                <AdditionalServicesCards items={servicesItems} />
                <div className="w-full sm:flex lg:hidden sm:justify-end">
                    <Link
                        href={'/dop-service'}
                        className="h-[44px] px-4 w-full sm:w-auto inline-flex justify-center items-center gap-4 border border-[#F6F6F6] rounded-[12px] text-[18px]/[28px] font-medium hover:text-[#f6f6f6]"
                    >
                        Дополнительные услуги
                        <ArrowRightLinkIcon />
                    </Link>
                </div>
            </section>

            <ReviewsApi headingLevel="h2" />

            <section className="py-[42px] lg:py-[68px] border-t border-[#284B63B2]">
                <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                    Часто задаваемые вопросы:
                </h2>
                <Accordion items={faqItems} />
            </section>

            <HaveQuestions />
        </>
    );
}
