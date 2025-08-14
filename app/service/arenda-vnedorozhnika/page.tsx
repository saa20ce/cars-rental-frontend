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
import { rentalTermsEconomItems, servicesItems } from '@/lib/data/iemsCards';
import { Accordion } from '@/lib/ui/common/Accordion';
import { ArrowRightLinkIcon } from '@/lib/ui/icons';
import Link from 'next/link';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';

export async function generateMetadata() {
    return await fetchWPMetadata('/arenda-vnedorozhnika');
}

const paragraphTextImageSection = [
    'Если вы планируете отправиться в увлекательное приключение на природу или просто исследовать непроходимые места, то аренда внедорожника – идеальное решение для вас.',
    ' Внедорожники из нашего автопарка обладают высокой проходимостью, мощным двигателем и прочной конструкцией, что позволяет им без труда преодолевать любые преграды на своем пути. Благодаря специальной подвеске и большому клиренсу, наши внедорожники без проблем справятся с бездорожьем, грязью, речными переправами и другими сложными условиями.',
    'Аренда внедорожников – это не только возможность испытать их возможности в деле, но и гарантия вашей безопасности во время путешествия. Все наши автомобили проходят регулярную проверку перед каждой арендой, что исключает возможность поломок и непредвиденных ситуаций во время поездки.',
    'Кроме того, мы предоставляем полное страхование автомобилей, чтобы вы могли наслаждаться своими приключениями, не беспокоясь о возможных повреждениях.',
];

export default async function SuvRentalPage() {
    const cars = await getCars({ per_page: '100' });
    const {
        klassOptions,
        markaOptions,
        kuzovOptions,
        privodOptions,
        dvigatelOptions,
        colorOptions,
    } = await getAllTaxonomyOptions();
    const breadcrumbs = await fetchBreadcrumbs('/services/suv-rental');

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Аренда внедорожников в Новосибирске
            </h1>
            <InfoThreeCard header="Арендуйте внедорожник в Новосибирске и покоряйте Алтай от 7100 руб/сутки" />

            <CarsPageClient
                cars={cars}
                klassOptions={klassOptions}
                markaOptions={markaOptions}
                kuzovOptions={kuzovOptions}
                privodOptions={privodOptions}
                dvigatelOptions={dvigatelOptions}
                colorOptions={colorOptions}
                defaultKuzov="241"
            />

            <TextImageSection
                sectionGray={true}
                src="/images/suv.webp"
                alt="Внедорожник"
                aspect="359/262"
                pyTextBlock="0"
                maxWidthImage="618"
                maxWidthText="574"
                header={
                    <>
                        Внедорожники в прокат:
                        <br className="hidden lg:block" /> готовы к
                        экстремальным приключениям
                    </>
                }
                paragraphs={paragraphTextImageSection}
            />

            <RentalTerms
                header="Условия аренды внедорожника:"
                items={rentalTermsEconomItems}
            />

            <section className="border-b border-[#284B63B2]">
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
