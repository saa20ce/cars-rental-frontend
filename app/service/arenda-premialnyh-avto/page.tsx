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
    return await fetchWPMetadata('/service/arenda-premialnyh-avto');
}

export default async function PremiumCarRentalPage() {
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
    const breadcrumbs = await fetchBreadcrumbs('/service/arenda-premialnyh-avto');

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />

            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Аренда премиальных и бизнес автомобилей в Новосибирске
            </h1>

            <p className="font-semibold text-[16px]/[24px] lg:text-[20px]/[28px] pb-[42px] lg:pb-[36px] mb-[42px] border-b border-[#284B63B2] -tracking-[0.2px]">
                Выберите автомобиль бизнес- или премиум-класса для
                самостоятельной поездки по Новосибирску и за его пределами.
                Сравните доступные модели, условия аренды и стоимость на нужные
                даты. Наличие конкретного автомобиля подтвердим при
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
                defaultKlass="269"
                headingLevel="h2"
            />

            <TextImageSection
                sectionGray={true}
                src="/images/camry.webp"
                alt="Toyota Camry"
                aspect="2/1"
                pyTextBlock="36"
                maxWidthImage="509"
                header="Возможности аренды Toyota Camry"
                paragraphs={[
                    'Toyota Camry подходит для деловых и личных поездок, когда важны комфортный салон и вместительный багажник. Выберите доступный автомобиль в каталоге и проверьте тариф на свои даты. Если путешествуете с ребёнком, сообщите об этом при бронировании: детское кресло предоставляется бесплатно при аренде автомобиля при наличии.',
                ]}
            />

            <TextImageSection
                sectionGray={false}
                src="/images/interiercamry.webp"
                alt="Интерьер Toyota Camry"
                aspect="359/196"
                pyTextBlock="36"
                maxWidthImage="513"
                flexRowReverse={true}
                header="Полный комфорт с Toyota Camry Hybrid"
                paragraphs={[
                    'Toyota Camry Hybrid сочетает удобный салон с гибридной силовой установкой. Фактический расход топлива зависит от маршрута и манеры вождения. Проверьте наличие конкретной машины, условия аренды и стоимость на выбранные даты перед бронированием.',
                ]}
            />

            <RentalTerms items={listItemsMonhtlyCarRentalPage1} />

            <TextImageSection
                sectionGray={true}
                src="/images/emblemTank.webp"
                alt="Эмблема Tank 300"
                aspect="359/133"
                pyTextBlock="36"
                maxWidthImage="511"
                header="Tank 300 для самостоятельных поездок"
                paragraphs={[
                    'Tank 300 — внедорожник с просторным салоном для самостоятельных поездок. Перед бронированием проверьте наличие машины, условия эксплуатации и допустимый маршрут: аренда не означает разрешения ездить по любому бездорожью.',
                ]}
            />

            <RentalTerms items={listItemsMonhtlyCarRentalPage2} />

            <TextImageSection
                sectionGray={false}
                src="/images/handle.webp"
                alt="За рулем авто"
                aspect="359/196"
                pyTextBlock="36"
                maxWidthImage="511"
                maxWidthText="681"
                flexRowReverse={true}
                border="border-t"
                header="Как выбрать премиальный автомобиль"
                paragraphs={[
                    'Для деловой или личной поездки выберите подходящий автомобиль по характеристикам и тарифу. Машина предоставляется без водителя; доступность модели, дополнительные опции и условия поездки уточняются при бронировании.',
                ]}
            />

            <section className="pt-[42px] lg:pt-[68px] border-t border-[#284B63B2]">
                <div className="bg-[#1E384A] px-6 py-7 lg:py-[38px] lg:px-9 rounded-[24px]">
                    <h2 className="font-bold text-[20px]/[28px] lg:text-[30px]/[36px] mb-4 lg:mb-6">
                        Забронируйте свой автомобиль прямо сейчас!
                    </h2>
                    <p className="text-[14px]/[20px] lg:text-[20px]/[28px] font-medium">
                        Поможем сравнить доступные автомобили и подобрать
                        вариант для вашей поездки. Уточните даты, маршрут и
                        условия аренды перед подтверждением бронирования.
                        <br />
                        Сделайте заказ, используя контактные данные:
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
