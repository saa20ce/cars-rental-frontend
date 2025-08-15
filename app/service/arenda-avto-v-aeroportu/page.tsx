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
    listItemsMonhtlyCarRentalPage2,
    servicesItems,
} from '@/lib/data/itemsCards';
import { ArrowRightLinkIcon } from '@/lib/ui/icons';
import Link from 'next/link';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';

export async function generateMetadata() {
    return await fetchWPMetadata('/service/arenda-avto-v-aeroportu');
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

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />

            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Выберите автомобиль для аренды в аэропорту Толмачево за 1500
                руб.
            </h1>

            <p className="font-semibold text-[16px]/[24px] lg:text-[20px]/[28px] pb-[42px] lg:pb-[36px] mb-[42px] border-b border-[#284B63B2] -tracking-[0.2px]">
                При аренде автомобиля в аэропорту Толмачево вы можете выбрать
                вариант из широкого ассортимента, представленного в автопарке
                компании. Независимо от того, нужен ли вам автомобиль для
                деловой поездки или отдыха, у нас есть подходящая машина для
                каждого. Вы можете выбрать от моделей класса эконом для
                небольших групп до просторных внедорожников и микроавтобусов для
                семейных поездок. Все автомобили в нашем парке регулярно
                проходят техническое обслуживание, что гарантирует их надежность
                и безопасность на дороге. Чтобы ознакомиться с нашим полным
                списком автомобилей и ценами, посетите{' '}
                <Link href="/cars" className="underline">
                    нашу страницу с автопарком.
                </Link>
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
                src="/images/carTransfer.webp"
                alt="Передача авто"
                aspect="3/2"
                pyTextBlock="36"
                maxWidthText="574"
                maxWidthImage="618"
                header="Простой и удобный процесс"
                paragraphs={[
                    'Прокат автомобиля в аэропорту – это не только удобный способ  передвижения, но и возможность создать незабываемые впечатления во время вашей поездки. Вы сможете свободно путешествовать по городу и его  окрестностям, посещать интересные места и открывать новые горизонты.  Наша компания предлагает качественный сервис и гарантирует, что ваш опыт будет максимально комфортным и безопасным. Мы всегда готовы помочь вам с выбором автомобиля и ответить на все ваши вопросы. Чтобы узнать больше о нашей компании и условиях аренды, посетите страницу с вопросами и ответами.',
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
                    'Рентасиб предлагает своим клиентам выгодные условия аренды автомобиля. Например, детское кресло предоставляется бесплатно, аренда автобокса стоит всего 300 рублей в сутки. Кроме того, компания имеет ограничение на пробег – 400 км в сутки. Все, что превышает это ограничение, будет стоить 6 рублей за каждый дополнительный километр. Более подробная информация о условиях проката доступна на странице Условия проката.',
                ]}
            />

            <section className="pt-[42px] lg:pt-[68px] border-b border-[#284B63B2]">
                <div className="bg-[#1E384A] px-6 py-7 lg:py-[38px] lg:px-9 rounded-[24px]">
                    <h2 className="font-bold text-[20px]/[28px] lg:text-[30px]/[36px] mb-4 lg:mb-6">
                        Опыт и отзывы
                    </h2>
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
