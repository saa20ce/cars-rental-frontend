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

export async function generateMetadata() {
    return await fetchWPMetadata('/service/arenda-kitajskih-avto');
}

export default async function ChineseCarRentalPage() {
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

    const breadcrumbs = await fetchBreadcrumbs('/service/arenda-kitajskih-avto');

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />

            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Аренда китайских автомобилей в Новосибирске
            </h1>

            <p className="font-semibold text-[16px]/[24px] lg:text-[20px]/[28px] pb-[42px] lg:pb-[36px] mb-[42px] border-b border-[#284B63B2] -tracking-[0.2px]">
                Выберите китайский автомобиль для самостоятельной поездки:
                сравните доступные модели, комплектации и стоимость аренды на
                нужные даты. Актуальное наличие машины подтвердим при
                бронировании.
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
                defaultMarka={['249', '256', '246', '247']}
                headingLevel="h2"
            />

            <TextImageSection
                sectionGray={true}
                src="/images/tank.webp"
                alt="Автомобиль"
                aspect="359/159"
                pyTextBlock="36"
                flexRowReverse={true}
                maxWidthImage="511"
                header="Выбор китайского авто в Новосибирске"
                paragraphs={[
                    'Для деловой или личной поездки сравните представленные в каталоге модели по размеру, приводу, числу мест и тарифу. Если нужна помощь с выбором, сообщите даты и маршрут при обращении.',
                ]}
            />

            <RentalTerms items={listItemsMonhtlyCarRentalPage2} />

            <TextImageSection
                sectionGray={false}
                src="/images/seller.webp"
                alt="Консультант"
                aspect="359/192"
                pyTextBlock="36"
                maxWidthImage="510"
                border="border-t"
                flexRowReverse={false}
                header="Что проверить перед арендой китайского авто"
                paragraphs={[
                    'Перед получением осмотрите выбранный автомобиль и ознакомьтесь с условиями аренды. Если едете с ребёнком, сообщите возраст, рост и вес при бронировании: детское кресло предоставляется бесплатно вместе с автомобилем при наличии. Отдельно кресла не сдаём.',
                ]}
            />

            <RentalTerms items={listItemsMonhtlyCarRentalPage1} />

            <TextImageSection
                sectionGray={false}
                src="/images/interierhaval.webp"
                alt="Интерьер автомобиля"
                aspect="359/150"
                pyTextBlock="36"
                maxWidthImage="511"
                border="border-t"
                flexRowReverse={true}
                header="Удобство и комфорт: преимущества аренды китайского авто"
                paragraphs={[
                    'Арендованный автомобиль позволяет планировать поездку самостоятельно и не зависеть от расписания общественного транспорта. При выборе маршрута учитывайте условия договора и допустимую территорию эксплуатации. Стоимость зависит от автомобиля, сезона и срока аренды; дополнительные опции согласуются отдельно.',
                ]}
            />

            <section className="pt-[42px] lg:pt-[68px]">
                <div className="bg-[#1E384A] px-6 py-7 lg:py-[38px] lg:px-9 rounded-[24px]">
                    <h2 className="font-bold text-[20px]/[28px] lg:text-[30px]/[36px] mb-4 lg:mb-6">
                        Рентасиб - оптимальный вариант для аренды китайских
                        автомобилей
                    </h2>
                    <p className="text-[14px]/[20px] lg:text-[20px]/[28px] font-semibold lg:font-medium">
                        Посмотрите доступные китайские автомобили и тарифы на
                        нужные даты. Если понадобится багажный бокс, уточните
                        совместимость с выбранной машиной, наличие и стоимость
                        опции при бронировании.
                        <br /> Сделайте заказ прямо сейчас, используя контактные
                        данные:
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
