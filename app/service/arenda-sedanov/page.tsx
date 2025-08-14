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
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';

export async function generateMetadata() {
    return await fetchWPMetadata('/arenda-sedanov');
}

export default async function SedanRentalPage() {
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
    console.log(kuzovOptions);

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />

            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Аренда в Новосибирске: зачем выбирать седаны?
            </h1>

            <p className="font-semibold text-[16px]/[24px] lg:text-[20px]/[28px] pb-[42px] lg:pb-[36px] mb-[42px] border-b border-[#284B63B2] -tracking-[0.2px]">
                В Новосибирске мы предлагаем широкий выбор автомобилей различных
                классов. Однако, если вы ищете комфорт и удобство во время своих
                поездок, седаны станут идеальным выбором. Они отличаются
                просторным салоном, позволяющим вам комфортно разместиться как
                водителю, так и пассажирам. Кроме того, седаны обладают отличной
                управляемостью и стабильностью на дороге, что делает поездки
                безопасными и приятными. Компания предлагает множество вариантов
                различных автомобилей, что дает вам больше возможностей выбора.
                Вы можете подобрать авто, который соответствует вашим
                потребностям и предпочтениям. В гараже “Рентасиб” вы найдете
                различные модели, начиная от экономичных и компактных
                автомобилей до премиальных и роскошных моделей. Независимо от
                того, нужен ли вам автомобиль на деловую встречу, семейную
                поездку или просто для комфортного передвижения по городу, Мы
                предоставим вам широкий выбор для ваших потребностей.
            </p>

            <CarsPageClient
                cars={cars}
                klassOptions={klassOptions}
                markaOptions={markaOptions}
                kuzovOptions={kuzovOptions}
                privodOptions={privodOptions}
                dvigatelOptions={dvigatelOptions}
                colorOptions={colorOptions}
                defaultKuzov="244"
            />

            <TextImageSection
                sectionGray={true}
                src="/images/carSelection.webp"
                alt="Выбор автомобиля"
                aspect="359/207"
                pyTextBlock="36"
                maxWidthImage="511"
                header="70+ автомобилей: больше выбор, больше возможностей"
                paragraphs={[
                    'Одной из основных преимуществ является выбор седанов в автопарке. Благодаря более чем 70 автомобилям в наличии, вы можете найти именно тот автомобиль, который соответствует вашим требованиям и предпочтениям. В автопарке “Рентасиб” представлены различные марки и модели автомобилей, такие как Toyota Camry, Hyundai Solaris, Toyota Camry Hybrid, Volkswagen Polo и другие. Мы предлагаем разнообразные услуги и дополнительные опции для проката машин. Вы можете заказать детское кресло, навигатор или автобокс для комфортного путешествия с семьей или друзьями. Все услуги предоставляются по доступным ценам и гарантируют высокое качество обслуживания. ',
                ]}
            />

            <RentalTerms items={listItemsMonhtlyCarRentalPage1} />

            <section className="py-[42px] lg:py-[68px] border-b border-t border-[#284B63B2]">
                <h2 className="font-bold text-[20px]/[28px] lg:text-[30px]/[36px] mb-5 lg:mb-6">
                    Недорогая аренда: надежность и качество сервиса
                </h2>
                <p className="font-semibold text-[14px]/[20px] lg:text-[20px]/[28px]">
                    Хотите арендовать седан в Новосибирске по доступной цене, не
                    жертвуя надежностью и качеством сервиса? Тогда обратитесь в
                    нашу компанию   – профессионала в сфере аренды автомобилей.
                    Мы гарантируем надежность и безопасность наших автомобилей,
                    которые регулярно проходят техническое обслуживание и
                    оснащены всем необходимым для комфортной поездки. Цены на
                    аренду седанов демократичны и доступны для каждого клиента.
                    Узнайте цены на странице Автопарк и убедитесь, что мы
                    предлагаем привлекательные условия.
                </p>
            </section>

            <TextImageSection
                sectionGray={false}
                src="/images/girlDriving.webp"
                alt="Девушка за рулем"
                aspect="359/153"
                pyTextBlock="36"
                maxWidthImage="615"
                header="Новосибирск: идеальный город для комфортных поездок"
                paragraphs={[
                    'Новосибирск – это идеальный город для комфортных поездок. Большие пространства, развитая инфраструктура и красивые достопримечательности делают его превосходным местом для путешествий. Арендуя легковой автомобиль, вы получите возможность свободно передвигаться по городу и окрестностям, наслаждаясь комфортом и удобством нашего автомобиля. Вы сможете посетить такие места, как Красный проспект, Новосибирский зоопарк и Академгородок, не зависимо от общественного транспорта или такси',
                ]}
            />

            <section className="pt-[42px] lg:pt-[68px] border-t border-[#284B63B2]">
                <div className="bg-[#1E384A] px-6 py-7 lg:py-[38px] lg:px-9 rounded-[24px]">
                    <p className="text-[14px]/[20px] lg:text-[20px]/[28px] font-medium">
                        Не упустите возможность арендовать седан в “Рентасиб” и
                        насладиться комфортными поездками по Новосибирску и его
                        окрестностям. Сделайте заказ прямо сейчас, используя
                        контактные данные:
                    </p>
                </div>
            </section>

            <ContactCardsLittle />

            <section className="pt-[42px] pb-[10px] lg:pt-[68px] lg:pb-[32px] border-y border-[#284B63B2]">
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
