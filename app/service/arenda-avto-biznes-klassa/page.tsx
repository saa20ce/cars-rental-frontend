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
import { getCars } from '@/lib/api/fetchCarData';
import { getAllTaxonomyOptions } from '@/lib/api/fetchCarTaxonomies';
import { faqItems } from '@/lib/data/faqItems';
import {
    infoArendaAvtoBusinessPageItems,
    rentalTermsBusinessItems,
    servicesItems,
} from '@/lib/data/iemsCards';
import { Accordion } from '@/lib/ui/common/Accordion';
import { ArrowRightLinkIcon } from '@/lib/ui/icons';
import Link from 'next/link';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';

export async function generateMetadata() {
    return await fetchWPMetadata('/arenda-avto-biznes-klassa');
}

const paragraphTextImageSection = [
    'Аренда автомобиля бизнес-класса — это превосходный выбор для тех, кто ценит комфорт, престиж и высокое качество во всем. Такие автомобили отличаются элегантным дизайном, современными технологиями и повышенным уровнем безопасности. Они идеально подходят для деловых поездок, важных встреч или особых событий, где важно произвести впечатление и подчеркнуть свой статус.',
    'Аренда автомобиля бизнес-класса — это превосходный выбор для тех, кто ценит комфорт, престиж и высокое качество во всем. Такие автомобили отличаются элегантным дизайном, современными технологиями и повышенным уровнем безопасности. Они идеально подходят для деловых поездок, важных встреч или особых событий, где важно произвести впечатление и подчеркнуть свой статус.',
];

export default async function BusinessClassRentalPage() {
    const cars = await getCars({ per_page: '100' });
    const {
        klassOptions,
        markaOptions,
        kuzovOptions,
        privodOptions,
        dvigatelOptions,
        colorOptions,
    } = await getAllTaxonomyOptions();
    const breadcrumbs = await fetchBreadcrumbs(
        '/services/business-class-rental',
    );

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Аренда авто бизнесс класса в Новосибирске
            </h1>
            <InfoThreeCard header="Арендуйте авто бизнес-класса в Новосибирске для важных встреч и путешествий от 4800 руб/сутки" />
            <CarsPageClient
                cars={cars}
                klassOptions={klassOptions}
                markaOptions={markaOptions}
                kuzovOptions={kuzovOptions}
                privodOptions={privodOptions}
                dvigatelOptions={dvigatelOptions}
                colorOptions={colorOptions}
                defaultKlass="269"
            />

            <TextImageSection
                sectionGray={true}
                src="/images/men.webp"
                alt="Мужчина за рулем автомобиля"
                aspect="3/2"
                maxWidthImage="618"
                header="Аренда автомобиля бизнес-класса: высокий уровень комфорта и уверенности на дороге"
                paragraphs={paragraphTextImageSection}
            />

            <RentalTerms
                header="Условия аренды авто бизнес класса:"
                items={rentalTermsBusinessItems}
            />

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

            <section className="pt-[42px] lg:pt-[68px] border-b border-[#284B63B2]">
                <div className="flex flex-col gap-4 lg:gap-6 mb-[42px] lg:mb-[68px]">
                    {infoArendaAvtoBusinessPageItems.map(
                        ({ title, desc, icon }) => (
                            <div
                                key={title}
                                className="bg-[#F6F6F60D] flex items-center w-full gap-[14px] lg:gap-8 p-5 lg:px-9 lg:py-[38px] rounded-[16px]"
                            >
                                <div className="bg-[#F6F6F60D] px-3 py-[14px] lg:p-[11px] rounded-[8px]">
                                    {icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-[16px]/[24px] lg:text-[24px]/[32px] mb-[6px] lg:mb-[14px]">
                                        {title}
                                    </h4>
                                    <p className="font-medium text-[14px]/[20px] lg:text-[18px]/[28px]">
                                        {desc}
                                    </p>
                                </div>
                            </div>
                        ),
                    )}
                </div>
                <p className="text-[14px]/[20px] lg:text-[20px]/[28px] font-medium bg-[#1E384A] px-6 py-7 lg:py-[38px] lg:px-9 rounded-[24px]">
                    Рентасиб – это надежная компания по аренде автомобилей без
                    водителя в Новосибирске. Большой выбор автомобилей, выгодные
                    условия аренды и отличный сервис – все это делает Рентасиб
                    отличным выбором для тех, кто ищет автомобиль в
                    Новосибирске. Не упустите возможность арендовать автомобиль
                    у Рентасиб и насладиться комфортом и независимостью во время
                    вашего пребывания в городе. Сделайте заказ прямо сейчас,
                    используя контактные данные:
                </p>

                <ContactCardsLittle />
            </section>

            <ReviewsApi />

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
