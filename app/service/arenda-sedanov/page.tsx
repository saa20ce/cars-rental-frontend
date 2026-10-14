import CarsPageClient from '@/clientPage/cars/clientPage';
import AdditionalServicesCards from '@/components/common/Cards/AdditionalServicesCards';
import ContactCardsLittle from '@/components/common/Cards/ContactCardsLittle';
import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';
import RentalTerms from '@/components/common/Cards/RentalTerms';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import TextImageSection from '@/components/common/TextImageSection/TextImageSection';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { getCars, getSeasonDates } from '@/lib/api/fetchCarData';
import { getAllTaxonomyOptions } from '@/lib/api/fetchCarTaxonomies';
import { faqItems } from '@/lib/data/faqItems';
import {
    listItemsMonhtlyCarRentalPage1,
    servicesItems,
} from '@/lib/data/itemsCards';
import { Accordion } from '@/lib/ui/common/Accordion';
import { ArrowRightLinkIcon } from '@/lib/ui/icons';
import Link from 'next/link';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';

export async function generateMetadata() {
    return await fetchWPMetadata('/service/arenda-sedanov');
}

export default async function SedanRentalPage() {
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
    const breadcrumbs = await fetchBreadcrumbs('/service/arenda-sedanov');

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />

            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Аренда седанов без водителя в Новосибирске
            </h1>

            <p className="font-semibold text-[16px]/[24px] lg:text-[20px]/[28px] pb-[42px] lg:pb-[36px] mb-[42px] border-b border-[#284B63B2] -tracking-[0.2px]">
                Выберите седан для самостоятельной поездки по Новосибирску или
                за его пределами. Сравните доступные модели по размеру салона,
                характеристикам и стоимости аренды на нужные даты. Наличие
                конкретного автомобиля уточните при бронировании.
            </p>

            <CarsPageClient
                cars={cars}
                klassOptions={klassOptions}
                markaOptions={markaOptions}
                kuzovOptions={kuzovOptions}
                privodOptions={privodOptions}
                dvigatelOptions={dvigatelOptions}
                colorOptions={colorOptions}
                seasonDates={seasonDates}
                defaultKuzov="244"
                headingLevel="h2"
            />

            <TextImageSection
                sectionGray={true}
                src="/images/carSelection.webp"
                alt="Выбор автомобиля"
                aspect="359/207"
                pyTextBlock="36"
                maxWidthImage="511"
                header="Как выбрать седан для поездки"
                paragraphs={[
                    'Для городской поездки или путешествия сравните вместимость, расход топлива и комплектацию доступных седанов. Если едете с ребёнком, при бронировании сообщите его возраст, рост и вес: детское кресло предоставляется бесплатно при аренде автомобиля при наличии. Отдельно кресла не сдаём.',
                ]}
            />

            <RentalTerms items={listItemsMonhtlyCarRentalPage1} />

            <section className="py-[42px] lg:py-[68px] border-b border-t border-[#284B63B2]">
                <h2 className="font-bold text-[20px]/[28px] lg:text-[30px]/[36px] mb-5 lg:mb-6">
                    Стоимость и условия аренды седана
                </h2>
                <p className="font-semibold text-[14px]/[20px] lg:text-[20px]/[28px]">
                    Стоимость зависит от модели, сезона и срока аренды. Перед
                    бронированием проверьте тариф на выбранные даты, лимит
                    пробега, залог и условия возврата. Если нужна доставка
                    автомобиля или другая дополнительная опция, согласуйте её
                    наличие и стоимость заранее.
                </p>
            </section>

            <TextImageSection
                sectionGray={false}
                src="/images/girlDriving.webp"
                alt="Девушка за рулем"
                aspect="359/153"
                pyTextBlock="36"
                maxWidthImage="615"
                header="Поездки по Новосибирску на арендованном седане"
                paragraphs={[
                    'Арендованный седан подходит для самостоятельных деловых и личных поездок. Планируйте маршрут с учётом условий договора и допустимой территории эксплуатации; автомобиль предоставляется без водителя.',
                ]}
            />

            <section className="pt-[42px] lg:pt-[68px] border-t border-[#284B63B2]">
                <div className="bg-[#1E384A] px-6 py-7 lg:py-[38px] lg:px-9 rounded-[24px]">
                    <p className="text-[14px]/[20px] lg:text-[20px]/[28px] font-medium">
                        Посмотрите доступные седаны в каталоге и уточните
                        стоимость на нужные даты. Для бронирования свяжитесь с
                        нами по указанным контактам:
                    </p>
                </div>
            </section>

            <ContactCardsLittle />

            <section className="pt-[42px] pb-[10px] lg:pt-[68px] lg:pb-[32px] border-y border-[#284B63B2]">
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
