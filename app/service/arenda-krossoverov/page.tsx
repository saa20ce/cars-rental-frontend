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

const paragraphTextImageSection = [
    'Кроссоверы обладают повышенной проходимостью и способны преодолевать сложные дорожные условия, такие как грунтовые дороги, пересеченная местность или снежные трассы.',
    'Компания “Рентасиб” предлагает в аренду кроссоверы различных марок и моделей.',
    'Кроссоверы в аренду обеспечивают не только безопасность и надежность, но и комфорт и удобство во время поездки.',
    ' Если вы планируете взять с собой большое количество багажа или собираетесь отправиться в поездку с группой друзей, выберите автомобиль с достаточным пространством для всех пассажиров и багажа или возьмите в аренду автобокс на крышу',
];

export default async function CrossoverRentalPage() {
    const cars = await getCars({ per_page: '100' });
    const {
        klassOptions,
        markaOptions,
        kuzovOptions,
        privodOptions,
        dvigatelOptions,
        colorOptions,
    } = await getAllTaxonomyOptions();
    const breadcrumbs = await fetchBreadcrumbs('/services/crossover-rental');

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Аренда кроссоверов в Новосибирске
            </h1>
            <InfoThreeCard header="Арендуйте кроссовер в Новосибирске и выбирайте любые дороги от 3000 руб/сутки" />

            <CarsPageClient
                cars={cars}
                klassOptions={klassOptions}
                markaOptions={markaOptions}
                kuzovOptions={kuzovOptions}
                privodOptions={privodOptions}
                dvigatelOptions={dvigatelOptions}
                colorOptions={colorOptions}
                defaultKuzov="242"
            />

            <TextImageSection
                sectionGray={true}
                src="/images/carinterior.webp"
                alt="Салон автомобиля"
                aspect="2/1"
                pyTextBlock="36"
                maxWidthImage="618"
                header={
                    <>
                        Кроссоверы в аренду:
                        <br className="hidden lg:block" /> надежность и комфорт
                        на дороге
                    </>
                }
                paragraphs={paragraphTextImageSection}
            />

            <RentalTerms
                header="Условия аренды кроссовера:"
                items={rentalTermsEconomItems}
            />

            <section className="border-b border-[#284B63B2]">
                <p className="text-[14px]/[20px] lg:text-[20px]/[28px] font-medium bg-[#1E384A] px-6 py-7 lg:py-[38px] lg:px-9 rounded-[24px]">
                    Для того чтобы взять в прокат автомобиль с хорошей
                    проходимостью, вы можете обратиться в нашу компанию. Мы
                    предлагаем широкий выбор автомобилей, включая Москвич 3,
                    Tank 300, Haval Jolion, Chery Tiggo 4 Pro, Hyundai Creta и
                    Hyundai Tucson. Для бронирования и связи с нашими
                    менеджерами вы можете воспользоваться нашими контактами, а
                    также ознакомиться с условиями проката и отзывами клиентов
                    на нашем сайте. Не упустите возможность воплотить свои
                    приключенческие мечты в реальность с помощью аренды
                    кроссоверов от нашей компании. Сделайте заказ прямо сейчас,
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
