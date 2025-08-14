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
} from '@/lib/data/iemsCards';
import { Accordion } from '@/lib/ui/common/Accordion';
import { ArrowRightLinkIcon } from '@/lib/ui/icons';
import Link from 'next/link';

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

    const breadcrumbs = await fetchBreadcrumbs('/services/chinese-car-rental');

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />

            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Китайские авто в аренду: экономия без ущерба
            </h1>

            <p className="font-semibold text-[16px]/[24px] lg:text-[20px]/[28px] pb-[42px] lg:pb-[36px] mb-[42px] border-b border-[#284B63B2] -tracking-[0.2px]">
                Аренда китайских автомобилей в Новосибирске – это отличная
                возможность сэкономить деньги без ущерба качеству. Компания
                Рентасиб предлагает выбрать автомобиль на любой вкус и бюджет. В
                нашем автопарке вы найдете такие модели, как Chery Tiggo 4 Pro,
                Tank 300 и Haval Jolion. Цены на аренду китайских автомобилей
                доступны и конкурентоспособны.
            </p>

            <CarsPageClient
                cars={cars}
                klassOptions={klassOptions}
                markaOptions={markaOptions}
                kuzovOptions={kuzovOptions}
                privodOptions={privodOptions}
                dvigatelOptions={dvigatelOptions}
                colorOptions={colorOptions}
                defaultMarka={['249', '256', '246', '247']}
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
                    'Независимо от того, нужен вам автомобиль для деловой поездки или отдыха, у нас есть авто, которое подойдет именно вам. Мы предлагаем разные модели и классы автомобилей, чтобы удовлетворить потребности каждого клиента. Выбрать автомобиль можно на странице с ценами и характеристиками или связаться с нами для получения подробной информации.',
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
                header="Качество и надежность: наша гарантия"
                paragraphs={[
                    'Мы гарантируем качество и надежность каждого китайского автомобиля в  нашем автопарке. Все наши автомобили проходят регулярное техническое  обслуживание и проверку. Мы заботимся о безопасности и комфорте наших  клиентов, поэтому предоставляем только надежные и исправные автомобили.  Мы также предлагаем услуги дополнительного оборудования, такие как детское кресло и навигатор, чтобы сделать вашу поездку еще более комфортной.',
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
                    'Аренда китайских автомобилей в Новосибирске предоставляет множество преимуществ. Во-первых, вы получаете свободу передвижения и удобство, не связанное с графиком общественного транспорта. Вы можете посетить любые места в городе и за его пределами, не ограничиваясь расписанием и маршрутами. Во-вторых, аренда китайского авто экономически выгодна. Вы не тратите деньги на покупку автомобиля, его обслуживание и страхование. Вместо этого, вы платите только за фактическое время использования автомобиля.',
                ]}
            />

            <section className="pt-[42px] lg:pt-[68px]">
                <div className="bg-[#1E384A] px-6 py-7 lg:py-[38px] lg:px-9 rounded-[24px]">
                    <h2 className="font-bold text-[20px]/[28px] lg:text-[30px]/[36px] mb-4 lg:mb-6">
                        Рентасиб - оптимальный вариант для аренды китайских
                        автомобилей
                    </h2>
                    <p className="text-[14px]/[20px] lg:text-[20px]/[28px] font-semibold lg:font-medium">
                        Если вам нужна дешевая аренда автомобиля из Китая,
                        компания Рентасиб – оптимальный вариант. У нас вы
                        найдете разнообразие моделей, доступные цены и отличное
                        качество. Мы также предлагаем дополнительные услуги,
                        такие как аренда автобокса на крышу, чтобы сделать вашу
                        поездку еще более комфортной.
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
