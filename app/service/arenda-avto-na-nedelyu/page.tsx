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
import type { Metadata } from 'next';

// Card prices depend on today's season and active discounts.
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
    const wordpressMetadata = await fetchWPMetadata(
        '/service/arenda-avto-na-nedelyu',
    );
    const title = 'Аренда авто на неделю в Новосибирске без водителя | Рентасиб';
    const description =
        'Аренда автомобиля на неделю в Новосибирске без водителя. Выберите даты и модель, рассчитайте стоимость, проверьте условия аренды и отправьте заявку.';

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

export default async function WeeklyCarRentalPage() {
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
    const breadcrumbs = await fetchBreadcrumbs('/service/arenda-avto-na-nedelyu');

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />

            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Аренда авто на неделю в Новосибирске без водителя
            </h1>

            <p className="font-semibold text-[16px]/[24px] lg:text-[20px]/[28px] pb-[42px] lg:pb-[36px] mb-[42px] border-b border-[#284B63B2] -tracking-[0.2px]">
                Выберите автомобиль для самостоятельных поездок на неделю. На
                карточках показана цена за сутки при аренде на 4–9 суток на
                текущую дату. Итоговая стоимость зависит от модели, выбранных
                дат и сезона. Сравните цены в разделе{' '}
                <Link href="/tarify" className="underline">
                    тарифов
                </Link>
                , а перед бронированием ознакомьтесь с{' '}
                <Link href="/require" className="underline">
                    условиями аренды
                </Link>
                .
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
                priceMode="weekly"
            />

            <TextImageSection
                sectionGray={true}
                src="/images/menandwomen.webp"
                alt="Мужчина и женщина выбирают авто"
                aspect="359/191"
                pyTextBlock="36"
                maxWidthImage="516"
                header="Как выбрать автомобиль на неделю"
                paragraphs={[
                    'Сравните автомобили по числу мест, объёму багажника, типу привода и планируемому маршруту. Для поездки по городу может подойти седан, а для путешествия с большим багажом — кроссовер или минивэн. Доступность конкретной машины проверьте на выбранные даты.',
                ]}
            />

            <RentalTerms items={listItemsMonhtlyCarRentalPage2} />

            <TextImageSection
                sectionGray={false}
                src="/images/money.webp"
                alt="Деньги"
                maxWidthText="574"
                aspect="359/191"
                pyTextBlock="36"
                maxWidthImage="511"
                border="border-t"
                flexRowReverse={true}
                header="Как узнать стоимость аренды на неделю"
                paragraphs={[
                    'Стоимость зависит от автомобиля, сезона и числа суток. Проверьте расчёт для выбранных дат, а дополнительные опции — детское кресло, автобокс или доставку машины — согласуйте при бронировании. Заранее уточните залог, порядок оплаты и условия возврата.',
                ]}
            />

            <TextImageSection
                sectionGray={false}
                src="/images/catalog.webp"
                alt="Каталог"
                maxWidthText="681"
                aspect="359/150"
                pyTextBlock="28"
                maxWidthImage="511"
                flexRowReverse={false}
                header="Что учесть перед поездкой на неделю"
                paragraphs={[
                    'Перед выездом проверьте суточный лимит пробега и территорию использования автомобиля. Если планируете маршрут за пределы Новосибирска, согласуйте его заранее. Пробег сверх лимита оплачивается отдельно по условиям выбранного класса авто.',
                ]}
            />

            <RentalTerms items={listItemsMonhtlyCarRentalPage1} />

            <section className="pt-[42px] lg:pt-[68px] border-t border-[#284B63B2]">
                <div className="bg-[#1E384A] px-6 py-7 lg:py-[38px] lg:px-9 rounded-[24px]">
                    <h2 className="font-bold text-[20px]/[28px] lg:text-[30px]/[36px] mb-4 lg:mb-6">
                        Как забронировать автомобиль на неделю
                    </h2>
                    <p className="text-[14px]/[20px] lg:text-[20px]/[28px] font-medium">
                        Выберите даты и автомобиль, проверьте тариф и отправьте
                        заявку или свяжитесь с менеджером. Заявка сама по себе
                        не гарантирует бронирование: оно подтверждается после
                        предоставления документов и внесения предоплаты.
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
