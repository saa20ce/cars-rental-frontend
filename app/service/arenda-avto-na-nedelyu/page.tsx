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
    const breadcrumbs = await fetchBreadcrumbs('/services/weekly-car-rental');

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />

            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Аренда авто на неделю в Новосибирске: большой выбор, низкие цены
            </h1>

            <p className="font-semibold text-[16px]/[24px] lg:text-[20px]/[28px] pb-[42px] lg:pb-[36px] mb-[42px] border-b border-[#284B63B2] -tracking-[0.2px]">
                Если вам нужен автомобиль на неделю в Новосибирске, то компания
                “Рентасиб” предоставит вам широкий выбор автомобилей по низким
                ценам. В этой статье мы расскажем о преимуществах аренды авто на
                неделю и почему это выгодное решение. Также мы расскажем о
                преимуществах аренды от 3 до 7 дней в Новосибирске.
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
                src="/images/menandwomen.webp"
                alt="Мужчина и женщина выбирают авто"
                aspect="359/191"
                pyTextBlock="36"
                maxWidthImage="516"
                header="Широкий выбор автомобилей для аренды на неделю"
                paragraphs={[
                    'Компания “Рентасиб” предлагает широкий выбор автомобилей для аренды на неделю в Новосибирске. В их автопарке вы найдете автомобили разных марок и моделей, которые подойдут под ваши потребности. У них есть такие популярные модели, как Toyota Camry, Tank 300 и многие другие. Вы можете ознакомиться со списком автомобилей и их ценами в каталоге автомобилей. Если у вас возникнут вопросы, вы можете обратиться к разделу Вопросы и ответы',
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
                header="Низкие цены на прокат авто в Новосибирске"
                paragraphs={[
                    'Одним из главных преимуществ являются низкие цены. Компания “Рентасиб” предлагает своим клиентам доступные тарифы на аренду автомобилей. Вы можете ознакомиться с условиями проката. Не забудьте также воспользоваться дополнительными услугами, такими как детское кресло, навигатор или бокс на крышу, которые доступны по дополнительной плате. Более подробную информацию о дополнительных услугах вы найдете на странице.',
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
                header="Почему аренда авто на неделю - выгодное решение?"
                paragraphs={[
                    'Аренда авто на неделю в Новосибирске является выгодным решением по нескольким причинам. Во-первых, вы сможете свободно передвигаться по городу и его окрестностям, не зависимо от общественного транспорта. Во-вторых, вы сэкономите время, так как больше не будете ждать автобусы или такси. В-третьих, аренда авто на неделю позволит вам посетить различные достопримечательности и места отдыха в Новосибирске и его окрестностях. Не забудьте ограничения по пробегу – 400 км в сутки, свыше – действует дополнительная плата.',
                ]}
            />

            <RentalTerms items={listItemsMonhtlyCarRentalPage1} />

            <section className="pt-[42px] lg:pt-[68px] border-t border-[#284B63B2]">
                <div className="bg-[#1E384A] px-6 py-7 lg:py-[38px] lg:px-9 rounded-[24px]">
                    <h2 className="font-bold text-[20px]/[28px] lg:text-[30px]/[36px] mb-4 lg:mb-6">
                        Преимущества аренды от 3 до 7 дней в Новосибирске
                    </h2>
                    <p className="text-[14px]/[20px] lg:text-[20px]/[28px] font-medium">
                        Во-первых, вы сможете получить дополнительные скидки на
                        прокат автомобиля. Во-вторых, вы сможете более гибко
                        планировать свое время и выбирать наиболее удобные дни
                        для аренды. Компания “Рентасиб” предлагает залог в
                        размере 10000 рублей на Toyota Camry и Tank 300, а на
                        остальные автомобили залог составляет 3000 рублей. Вы
                        можете забронировать автомобиль на сайте или связаться с
                        менеджерами. Сделайте заказ прямо сейчас, используя
                        контактные данные:
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
