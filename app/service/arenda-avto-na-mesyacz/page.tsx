import CarsPageClient from '@/clientPage/cars/clientPage';
import AdditionalServicesCards from '@/components/common/Cards/AdditionalServicesCards';
import ContactCardsLittle from '@/components/common/Cards/ContactCardsLittle';
import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';
import RentalTerms from '@/components/common/Cards/RentalTerms';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import TextImageSection from '@/components/common/TextImageSection/TextImageSection';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { getCars } from '@/lib/api/fetchCarData';
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
    return await fetchWPMetadata('/service/arenda-avto-na-mesyacz');
}

export default async function MonthlyCarRentalPage() {
    const cars = await getCars({ per_page: '100' });
    const {
        klassOptions,
        markaOptions,
        kuzovOptions,
        privodOptions,
        dvigatelOptions,
        colorOptions,
    } = await getAllTaxonomyOptions();
    const breadcrumbs = await fetchBreadcrumbs('/service/monthly-car-rental');

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />

            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Широкий выбор автомобилей на месяц в Новосибирске Аренда авто на
                месяц
            </h1>

            <p className="font-semibold text-[16px]/[24px] lg:text-[20px]/[28px] pb-[42px] lg:pb-[36px] mb-[42px] border-b border-[#284B63B2] -tracking-[0.2px]">
                Аренда автомобиля на длительный срок может быть очень удобным
                решением для тех, кто планирует пребывание в Новосибирске на
                несколько недель или месяцев. Компания “Рентасиб” предлагает
                широкий выбор автомобилей на месяц в Новосибирске, чтобы
                удовлетворить потребности каждого клиента. Независимо от того,
                нужен ли вам автомобиль для деловых встреч или отдыха, вы
                сможете найти подходящий вариант в нашем автопарке.
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
                src="/images/montly-car-rental.webp"
                alt="Автопарк"
                aspect="359/166"
                pyTextBlock="36"
                maxWidthImage="618"
                maxWidthText="574"
                header="Широкий выбор автомобилей на месяц в Новосибирске"
                paragraphs={[
                    'Наша компания предлагает разнообразные автомобили на месяц в Новосибирске, чтобы удовлетворить различные потребности клиентов. У нас есть экономичные модели, идеальные для городской езды, такие как Hyundai Solaris или Volkswagen Polo. Если вам нужен автомобиль премиум-класса, мы можем предложить вам Toyota Camry или Tank 300. Также в нашем автопарке есть внедорожники и минивэны, подходящие для семейных поездок или больших групп. Полный список автомобилей и их цены вы можете найти на нашем сайте в разделе автопарк.',
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
                header="Низкие цены на аренду авто на месяц"
                paragraphs={[
                    'Компания “Рентасиб” предлагает низкие цены на аренду автомобилей на месяц в Новосибирске. Мы понимаем, что длительная аренда может быть дорогостоящей, поэтому мы стараемся предложить своим клиентам выгодные тарифы. У нас есть различные пакеты аренды, которые позволяют сэкономить деньги при длительной аренде. Кроме того, у нас нет скрытых платежей или дополнительных комиссий. Все цены прозрачны и доступны для ознакомления на нашем сайте.',
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
                header="Профессиональная аренда авто на длительный срок"
                paragraphs={[
                    '“Рентасиб” предлагает профессиональную аренду автомобилей на длительный срок. Мы обеспечиваем техническое состояние наших автомобилей, чтобы клиенты могли быть уверены в их надежности и безопасности. Мы также предлагаем дополнительные услуги, такие как детское кресло, навигатор и автобокс, чтобы сделать вашу поездку еще более комфортной и удобной. Подробную информацию о наших услугах вы можете найти на нашем сайте в разделе услуги.',
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
