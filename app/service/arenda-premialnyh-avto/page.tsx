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
    const breadcrumbs = await fetchBreadcrumbs('/services/weekly-car-rental');

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />

            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Аренда премиальных и бизнес автомобилей в Новосибирске
            </h1>

            <p className="font-semibold text-[16px]/[24px] lg:text-[20px]/[28px] pb-[42px] lg:pb-[36px] mb-[42px] border-b border-[#284B63B2] -tracking-[0.2px]">
                Хотите ощутить настоящий комфорт и роскошь? Тогда аренда
                премиальных автомобилей в Новосибирске – идеальное решение для
                вас! Компания “Рентасиб” предлагает широкий выбор премиум
                бизнес-класса авто, чтобы удовлетворить даже самые взыскательные
                потребности. В нашем автопарке вы найдете такие известные и
                надежные марки, как Toyota Camry, Camry Hybrid и Tank 300.
                Аренда премиальных авто – это возможность почувствовать себя
                настоящим VIP-персоной и насладиться комфортом и роскошью на
                дороге.
            </p>

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
                src="/images/camry.webp"
                alt="Toyota Camry"
                aspect="2/1"
                pyTextBlock="36"
                maxWidthImage="509"
                header="Возможности аренды Toyota Camry"
                paragraphs={[
                    'Toyota Camry – это идеальный выбор для тех, кто ценит качество и комфорт. Стильный дизайн, высокая надежность и отличная проходимость делают этот автомобиль идеальным для деловых поездок и путешествий. Благодаря своей просторной салону и удобным сиденьям, Toyota Camry позволяет вам наслаждаться поездкой в полной мере. Не забудьте воспользоваться услугами, которые предоставляет компания “Рентасиб” – детское кресло, навигатор или автобокс, чтобы ваша поездка была еще более комфортной и безопасной. Арендуйте Toyota Camry прямо сейчас, чтобы ощутить все преимущества этого премиального автомобиля.',
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
                    'Если вы хотите получить еще больше преимуществ от аренды авто, то обратите внимание на Toyota Camry Hybrid. Эта модель отличается не только стильным дизайном и высокой надежностью, но и имеет гибридную систему, которая позволяет снизить расход топлива и уменьшить вредные выбросы в атмосферу. Благодаря этому, Toyota Camry Hybrid – идеальный выбор для экологически осознанных путешественников. Арендуйте этот автомобиль и насладитесь полным комфортом и экологической чистотой на дороге.',
                ]}
            />

            <RentalTerms items={listItemsMonhtlyCarRentalPage1} />

            <TextImageSection
                sectionGray={true}
                src="/images/emblemTank.webp"
                alt="Емблема Tank 300"
                aspect="359/133"
                pyTextBlock="36"
                maxWidthImage="511"
                header="Идеальный выбор: Tank 300"
                paragraphs={[
                    'Если вам нужен автомобиль с повышенной проходимостью и непревзойденной мощностью, то Tank 300 – идеальный выбор для вас. Этот внедорожник прекрасно справляется с любыми дорожными условиями и позволяет вам добраться до самых удаленных мест. Благодаря своему элегантному дизайну и комфортному салону, Tank 300 позволяет вам насладиться поездкой в полной мере. Арендуйте этот автомобиль и окунитесь в мир приключений и свободы.',
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
                header="Незабываемые ощущения от аренды премиум авто"
                paragraphs={[
                    'Аренда премиальных авто в Новосибирске – это возможность почувствовать себя особенным и насладиться комфортом и роскошью на дороге. Независимо от того, нужен вам автомобиль для деловой поездки или романтического путешествия, наши автомобили премиум класса помогут вам создать незабываемые впечатления. Бронируйте автомобиль прямо сейчас  и наслаждайтесь поездкой настоящего VIP-персоны.',
                ]}
            />

            <section className="pt-[42px] lg:pt-[68px] border-t border-[#284B63B2]">
                <div className="bg-[#1E384A] px-6 py-7 lg:py-[38px] lg:px-9 rounded-[24px]">
                    <h2 className="font-bold text-[20px]/[28px] lg:text-[30px]/[36px] mb-4 lg:mb-6">
                        Забронируйте свой автомобиль прямо сейчас!
                    </h2>
                    <p className="text-[14px]/[20px] lg:text-[20px]/[28px] font-medium">
                        Мы с радостью поможем вам выбрать и забронировать
                        идеальный автомобиль для вашей поездки. Не упустите
                        возможность насладиться комфортом и роскошью премиальных
                        авто в Новосибирске.
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
