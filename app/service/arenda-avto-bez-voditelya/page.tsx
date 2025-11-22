import CarsPageClient from '@/clientPage/cars/clientPage';
import AdditionalServicesCards from '@/components/common/Cards/AdditionalServicesCards';
import ContactCardsLittle from '@/components/common/Cards/ContactCardsLittle';
import RentalTerms from '@/components/common/Cards/RentalTerms';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import TextImageSection from '@/components/common/TextImageSection/TextImageSection';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { getCars } from '@/lib/api/fetchCarData';
import { getAllTaxonomyOptions } from '@/lib/api/fetchCarTaxonomies';
import {
    listItemsMonhtlyCarRentalPage1,
    listItemsMonhtlyCarRentalPage2,
    servicesItems,
} from '@/lib/data/itemsCards';
import { ArrowRightLinkIcon } from '@/lib/ui/icons';
import Link from 'next/link';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';

export async function generateMetadata() {
    return await fetchWPMetadata('/service/arenda-avto-bez-voditelya');
}

export default async function CarRentalWithoutDriverPage() {
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
        '/service/arenda-avto-bez-voditelya',
    );

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />

            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Аренда авто без водителя в Новосибирске
            </h1>

            <p className="font-semibold text-[16px]/[24px] lg:text-[20px]/[28px] pb-[42px] lg:pb-[36px] mb-[42px] border-b border-[#284B63B2] -tracking-[0.2px]">
                Аренда автомобиля – отличный способ обеспечить себе удобную и
                независимую транспортировку в Новосибирске. Но какую компанию
                выбрать? Если вам нужно надежное и профессиональное агентство по
                аренде автомобилей, то обратите внимание на Рентасиб. Наша
                компания предлагает широкий выбор автомобилей, более 5 лет опыта
                работы и уже более 4000 довольных клиентов.
            </p>

            <CarsPageClient
                cars={cars}
                klassOptions={klassOptions}
                markaOptions={markaOptions}
                kuzovOptions={kuzovOptions}
                privodOptions={privodOptions}
                dvigatelOptions={dvigatelOptions}
                colorOptions={colorOptions}
            />

            <TextImageSection
                sectionGray={true}
                src="/images/carpark.jpg"
                alt="Автопарк"
                aspect="3/2"
                pyTextBlock="78"
                maxWidthImage="511"
                header="Большой выбор автомобилей"
                paragraphs={[
                    'Одним из главных преимуществ аренды автомобиля в компании является большой выбор автомобилей. Независимо от того, нужен ли вам небольшой и экономичный автомобиль, минивэн или большой внедорожник, здесь вы сможете найти подходящий вариант. Весь автопарк компании может быть найден на их странице Автопарк, где вы сможете ознакомиться с различными моделями и ценами.',
                ]}
            />

            <section className="py-[42px] lg:py-[68px] border-b border-[#284B63B2]">
                <div className="bg-[#1E384A] px-6 py-7 lg:py-[38px] lg:px-9 rounded-[24px]">
                    <h2 className="font-bold text-[20px]/[28px] lg:text-[30px]/[36px] mb-4 lg:mb-6">
                        Более 5 лет опыта работы
                    </h2>
                    <p className="text-[14px]/[20px] lg:text-[20px]/[28px] font-semibold lg:font-medium ">
                        Рентасиб имеет более 5 лет опыта работы в сфере аренды
                        автомобилей в Новосибирске. За это время компания успела
                        накопить ценный опыт и стать профессионалами в своей
                        области. Это гарантирует, что вы получите отличный
                        сервис и надежные автомобили, которые всегда будут
                        готовы к использованию.
                    </p>
                </div>
            </section>

            <RentalTerms items={listItemsMonhtlyCarRentalPage2} />

            <section className="py-[42px] lg:py-[68px] border-b border-t border-[#284B63B2]">
                <h2 className="font-bold text-[20px]/[28px] lg:text-[30px]/[36px] mb-5 lg:mb-6">
                    Более 4000 довольных клиентов
                </h2>
                <p className="font-semibold text-[14px]/[20px] lg:text-[20px]/[28px]">
                    Более 4000 довольных клиентов уже воспользовались услугами
                    Рентасиб и остались довольными. Это свидетельствует о
                    высоком качестве работы компании и ее надежности. Если вы
                    хотите стать одним из довольных клиентов, просто свяжитесь с
                    Рентасиб, используя контактные данные на странице Контакты.
                </p>
            </section>

            <TextImageSection
                sectionGray={false}
                src="/images/writecontract.jpg"
                alt="Подписание договора"
                aspect="3/2"
                pyTextBlock="36"
                maxWidthImage="512"
                flexRowReverse={true}
                header="Выгодные условия аренды"
                paragraphs={[
                    'Рентасиб предлагает своим клиентам выгодные условия аренды автомобиля. Например, детское кресло предоставляется бесплатно, аренда автобокса стоит всего 300 рублей в сутки. Кроме того, компания имеет ограничение на пробег – 400 км в сутки. Все, что превышает это ограничение, будет стоить 6 рублей за каждый дополнительный километр. Более подробная информация о условиях проката доступна на странице Условия проката.',
                ]}
            />

            <RentalTerms items={listItemsMonhtlyCarRentalPage1} />

            <TextImageSection
                sectionGray={true}
                src="/images/cars.webp"
                alt="Вручение авто"
                aspect="3/2"
                pyTextBlock="36"
                maxWidthImage="512"
                header="Быстрое оформление и отличный сервис"
                paragraphs={[
                    'Оформление аренды автомобиля в компании Рентасиб занимает минимальное время. Вам потребуется только предоставить необходимые документы. После оформления аренды, вам будет предоставлен отличный сервис и помощь в случае возникновения любых вопросов или проблем.',
                ]}
            />

            <section className="pt-[42px] lg:pt-[68px]">
                <p className="text-[14px]/[20px] lg:text-[20px]/[28px] font-medium bg-[#1E384A] px-6 py-7 lg:py-[38px] lg:px-9 rounded-[24px]">
                    Рентасиб – это надежная компания по аренде автомобилей без
                    водителя в Новосибирске.
                    <br /> Большой выбор автомобилей, выгодные условия аренды и
                    отличный сервис – все это делает Рентасиб отличным выбором
                    для тех, кто ищет автомобиль в Новосибирске. Не упустите
                    возможность арендовать автомобиль у Рентасиб и насладиться
                    комфортом и независимостью во время вашего пребывания в
                    городе. <br />
                    Сделайте заказ прямо сейчас, используя контактные данные:
                </p>
                <ContactCardsLittle />
            </section>

            <section className="pt-[42px] lg:pt-[68px] border-t border-[#284B63B2]">
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
        </>
    );
}
