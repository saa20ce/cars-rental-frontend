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
    listItemsMonhtlyCarRentalPage2,
    servicesItems,
} from '@/lib/data/itemsCards';
import { Accordion } from '@/lib/ui/common/Accordion';
import { ArrowRightLinkIcon } from '@/lib/ui/icons';
import Link from 'next/link';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import { withEditorialMetadata } from '@/lib/seo/withEditorialMetadata';

export async function generateMetadata() {
    return withEditorialMetadata(
        await fetchWPMetadata('/service/arenda-avto-na-mesyacz'),
        'Аренда авто на месяц без водителя в Новосибирске | Рентасиб',
        'Прокат автомобиля на месяц без водителя в Новосибирске. Выберите модель и даты, сравните тарифы и уточните залог, пробег и условия аренды.',
    );
}

export default async function MonthlyCarRentalPage() {
    const [cars, taxonomyOptions, seasonDates, breadcrumbs] = await Promise.all([
        getCars({ per_page: '100' }),
        getAllTaxonomyOptions(),
        getSeasonDates(),
        fetchBreadcrumbs('/service/arenda-avto-na-mesyacz'),
    ]);
    const {
        klassOptions,
        markaOptions,
        kuzovOptions,
        privodOptions,
        dvigatelOptions,
        colorOptions,
    } = taxonomyOptions;

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />

            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Аренда авто на месяц в Новосибирске
            </h1>

            <p className="font-semibold text-[16px]/[24px] lg:text-[20px]/[28px] pb-[42px] lg:pb-[36px] mb-[42px] border-b border-[#284B63B2] -tracking-[0.2px]">
                Если автомобиль нужен на несколько недель или месяцев, сравните
                доступные модели и условия длительной аренды. «Рентасиб» сдаёт
                авто без водителя для личных и деловых поездок. Наличие
                конкретной машины и стоимость аренды зависят от выбранных дат.
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
                headingLevel="h2"
            />

            <TextImageSection
                sectionGray={true}
                src="/images/montly-car-rental.webp"
                alt="Автопарк"
                aspect="359/166"
                pyTextBlock="36"
                maxWidthImage="618"
                maxWidthText="574"
                header="Широкий выбор автомобилей на месяц в Новосибирске"
                paragraphs={[
                    'В автопарке представлены седаны, кроссоверы, внедорожники и минивэны. Выберите автомобиль по числу пассажиров, объёму багажа и планируемому маршруту. Наличие конкретной модели и тариф на месяц уточняйте при выборе дат и перед бронированием.',
                ]}
            />

            <RentalTerms items={listItemsMonhtlyCarRentalPage1} />

            <TextImageSection
                sectionGray={false}
                src="/images/carsandmoney.webp"
                alt="Автомобиль"
                maxWidthText="574"
                aspect="359/191"
                pyTextBlock="36"
                maxWidthImage="618"
                flexRowReverse={true}
                border="border-t"
                header="Как рассчитывается стоимость аренды на месяц"
                paragraphs={[
                    'Стоимость зависит от автомобиля, срока аренды и сезона. Сравните актуальные цены в разделе «Тарифы», а перед бронированием уточните условия оплаты, залога, доставки и дополнительных опций. Итоговую сумму и условия аренды согласуйте с менеджером.',
                ]}
            />

            <RentalTerms items={listItemsMonhtlyCarRentalPage2} />

            <TextImageSection
                sectionGray={false}
                src="/images/bluecar.webp"
                alt="Автомобиль"
                maxWidthText="684"
                aspect="359/150"
                pyTextBlock="36"
                maxWidthImage="508"
                border="border-t"
                flexRowReverse={false}
                header="Что проверить перед длительной поездкой"
                paragraphs={[
                    'Перед поездкой ознакомьтесь с условиями аренды: допустимым маршрутом, лимитом пробега и требованиями к водителю. Детское кресло при аренде автомобиля предоставляется бесплатно при наличии. Доступность кресла, стоимость автобокса и доставки машины уточните при бронировании.',
                ]}
            />

            <section className="pt-[42px] lg:pt-[68px]">
                <div className="bg-[#1E384A] px-6 py-7 lg:py-[38px] lg:px-9 rounded-[24px]">
                    <h2 className="font-bold text-[20px]/[28px] lg:text-[30px]/[36px] mb-4 lg:mb-6">
                        Удобство и надежность аренды автомобилей в Новосибирске
                    </h2>
                    <p className="text-[14px]/[20px] lg:text-[20px]/[28px] font-semibold lg:font-medium">
                        Аренда автомобилей в Новосибирске с компанией “Рентасиб”
                        – это удобство и надежность.
                        <br />
                        Мы предлагаем гибкие условия проката и легкий процесс
                        бронирования.
                        <br /> Вы можете связаться с нами по телефону:
                    </p>
                </div>
            </section>

            <ContactCardsLittle />

            <section className="py-[42px] lg:py-[68px] border-y border-[#284B63B2]">
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
