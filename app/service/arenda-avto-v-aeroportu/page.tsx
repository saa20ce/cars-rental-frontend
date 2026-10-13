import CarsPageClient from '@/clientPage/cars/clientPage';
import AdditionalServicesCards from '@/components/common/Cards/AdditionalServicesCards';
import ContactCardsLittle from '@/components/common/Cards/ContactCardsLittle';
import RentalTerms from '@/components/common/Cards/RentalTerms';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import TextImageSection from '@/components/common/TextImageSection/TextImageSection';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { getCars, getSeasonDates } from '@/lib/api/fetchCarData';
import { getAllTaxonomyOptions } from '@/lib/api/fetchCarTaxonomies';
import {
    listItemsMonhtlyCarRentalPage2,
    servicesItems,
} from '@/lib/data/itemsCards';
import { ArrowRightLinkIcon } from '@/lib/ui/icons';
import Link from 'next/link';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const wordpressMetadata = await fetchWPMetadata(
        '/service/arenda-avto-v-aeroportu',
    );
    const title = 'Аренда авто в аэропорту Толмачёво без водителя | Рентасиб';
    const description =
        'Доставка арендованного автомобиля к аэропорту Толмачёво в Новосибирске. Выберите авто, согласуйте место и время передачи и отправляйтесь в поездку самостоятельно.';

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

export default async function CarRentalAtAirportPage() {
    const cars = await getCars({ per_page: '100' });
    const breadcrumbs = await fetchBreadcrumbs(
        '/service/arenda-avto-v-aeroportu',
    );
    const {
        klassOptions,
        markaOptions,
        kuzovOptions,
        privodOptions,
        dvigatelOptions,
        colorOptions,
    } = await getAllTaxonomyOptions();
    const seasonDates = await getSeasonDates();

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />

            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Аренда авто в аэропорту Толмачёво без водителя
            </h1>

            <p className="font-semibold text-[16px]/[24px] lg:text-[20px]/[28px] pb-[42px] lg:pb-[36px] mb-[42px] border-b border-[#284B63B2] -tracking-[0.2px]">
                Выберите автомобиль в автопарке и согласуйте его передачу в
                аэропорту Толмачёво к удобному времени. После получения машины
                вы управляете ею самостоятельно: услуга не включает водителя
                или перевозку пассажиров. Стоимость аренды и доставки уточните
                перед бронированием. Посмотрите доступные модели в{' '}
                <Link href="/cars" className="underline">
                    автопарке
                </Link>
                , а порядок передачи — на странице{' '}
                <Link href="/service/dostavka-avto" className="underline">
                    доставки арендованного автомобиля
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
                carTitleTag="div"
            />

            <TextImageSection
                sectionGray={true}
                src="/images/carTransfer.webp"
                alt="Передача авто"
                aspect="3/2"
                pyTextBlock="36"
                maxWidthText="574"
                maxWidthImage="618"
                header="Как получить автомобиль в аэропорту"
                paragraphs={[
                    'До бронирования сообщите менеджеру дату и время прибытия, выберите автомобиль и согласуйте место передачи. Уточните необходимые документы, залог и условия аренды. После оформления и получения ключей вы отправляетесь в поездку самостоятельно.',
                ]}
            />

            <RentalTerms items={listItemsMonhtlyCarRentalPage2} />

            <TextImageSection
                sectionGray={false}
                src="/images/consultant.webp"
                alt="Консультация"
                aspect="2/1"
                pyTextBlock="36"
                border="border-t"
                maxWidthImage="511"
                flexRowReverse={true}
                header="Выгодные условия аренды"
                paragraphs={[
                    'В тариф аренды включён лимит пробега. Если вы его превысите, дополнительные километры оплачиваются по ставке, зависящей от класса автомобиля. Актуальный лимит и условия перепробега указаны на странице «Условия аренды». Если нужны детское кресло или автобокс, уточните их наличие и стоимость при бронировании.',
                ]}
            />

            <section className="pt-[42px] lg:pt-[68px] border-b border-[#284B63B2]">
                <div className="bg-[#1E384A] px-6 py-7 lg:py-[38px] lg:px-9 rounded-[24px]">
                    <div className="font-bold text-[20px]/[28px] lg:text-[30px]/[36px] mb-4 lg:mb-6">
                        Опыт и отзывы
                    </div>
                    <p className="text-[14px]/[20px] lg:text-[20px]/[28px] font-semibold lg:font-medium ">
                        Мы гордимся тем, что наши клиенты остаются довольными и
                        рекомендуют нашу компанию своим друзьям и знакомым. Мы
                        всегда стремимся предоставить нашим клиентам лучший
                        выбор автомобилей и качественный сервис. Мы рады видеть
                        положительные отзывы о нашей работе, их можно прочитать
                        на странице отзывов. Мы всегда открыты для обратной
                        связи и готовы помочь вам создать незабываемый опыт
                        проката автомобиля в Новосибирском аэропорту.
                    </p>
                </div>
                <ContactCardsLittle />
            </section>

            <section className="pt-[42px] lg:pt-[68px] border-t border-[#284B63B2]">
                <div className="font-bold text-[20px]/[28px] lg:text-[30px]/[36px] ">
                    Дополнительные услуги
                </div>
                <AdditionalServicesCards items={servicesItems} itemTitleTag="div" />
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
