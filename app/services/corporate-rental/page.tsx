import ContactCardsLittle from '@/components/common/Cards/ContactCardsLittle';
import InfoThreeCard from '@/components/common/Cards/InfoThreeCard';
import { RentSteps } from '@/components/common/Cars';
import AnyQuestionsForm from '@/components/common/Form/AnyQuestionsForm';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import LetterThanks from '@/components/common/LetterThanks/LetterThanks';
import ModalTriggerCommercialProposalForm from '@/components/common/Modal/ModalTriggerCommercialProposalForm';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { faqItems } from '@/lib/data/faqItems';
import { infoThreeCardItems } from '@/lib/data/iemsCards';
import { Accordion } from '@/lib/ui/common/Accordion';
import { ParticlesIcon } from '@/lib/ui/icons/ParticlesIcon';

export default async function СorporateRentalPage() {
    const breadcrumbs = await fetchBreadcrumbs('/services/corporate-rental');
    const lettersRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/thank-you-letters/`,
        { cache: 'no-store' },
    );

    const letters = await lettersRes.json();
    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Аренда авто для Юридических лиц
            </h1>

            <InfoThreeCard
                header="Кратокосрочная и долгосрочная аренда автомобилей в
                    Новосибирске для юридических лиц."
                items={infoThreeCardItems}
            />

            <section className="pb-[42px] lg:pb-[68px]">
                <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                    Долгосрочная аренда от 1 месяца для юридических лиц
                </h2>
                <p className="text-[16px]/[24px] lg:text-[18px]/[28px] font-medium lg:font-normal mb-6 lg:mb-8">
                    Юридическим лицам доступны услуги краткосрочной и
                    долгосрочной аренды автомбилей. Долгосрочная аренда от 1
                    месяца имеет ряд преимуществ:
                </p>
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-8 lg:mb-9">
                    <article className="lg:w-1/2 rounded-[20px] border-2 border-[#F6F6F633] px-6 lg:px-9 py-7 lg:py-[38px]">
                        <h3 className="text-[18px]/[28px] lg:text-[24px]/[32px] font-bold mb-9 lg:mb-[42px]">
                            Экономия средств
                        </h3>
                        <ul className="space-y-5 text-[16px]/[24px] lg:text-[18px]/[28px] font-medium">
                            <li className="flex items-start gap-4 lg:gap-5">
                                <ParticlesIcon className="shrink-0 mt-1" />
                                Фиксированная цена независимо от сезона
                            </li>
                            <li className="flex items-start gap-4 lg:gap-5">
                                <ParticlesIcon className="shrink-0 mt-1" />
                                <span>
                                    Тариф со скидкой до 30% по сравнению с
                                    краткосрочной арендой
                                </span>
                            </li>
                            <li className="flex items-start gap-4 lg:gap-5">
                                <ParticlesIcon className="shrink-0 mt-1" />
                                ТО в процессе эксплуатации входит в стоимость
                                аренды
                            </li>
                            <li className="flex items-start gap-4 lg:gap-5">
                                <ParticlesIcon className="shrink-0 mt-1" />
                                Экономия времени на оформлении
                            </li>
                            <li className="flex items-start gap-4 lg:gap-5">
                                <ParticlesIcon className="shrink-0 mt-1" />
                                Без залога
                            </li>
                        </ul>
                    </article>
                    <article className="lg:w-1/2 rounded-[20px] border-2 border-[#F6F6F633] px-6 lg:px-9 py-7 lg:py-[38px]">
                        <h3 className="text-[18px]/[28px] lg:text-[24px]/[32px] font-bold mb-9 lg:mb-[118px]">
                            Привелегии
                        </h3>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4 lg:gap-5">
                                <ParticlesIcon className="shrink-0 mt-1" />
                                Персональный менеджер 24/7
                            </li>
                            <li className="flex items-start gap-4 lg:gap-5">
                                <ParticlesIcon className="shrink-0 mt-1" />
                                Замена автомобиля при поломке
                            </li>
                            <li className="flex items-start gap-4 lg:gap-5">
                                <ParticlesIcon className="shrink-0 mt-1" />
                                Доставка в любой город в радиусе 600 км от
                                Новосибирска
                            </li>
                            <li className="flex items-start gap-4 lg:gap-5">
                                <ParticlesIcon className="shrink-0 mt-1" />
                                Электронный документооборот
                            </li>
                        </ul>
                    </article>
                </div>
                <ModalTriggerCommercialProposalForm />
            </section>

            <RentSteps />

            <LetterThanks letters={letters} />

            <section className="pt-[42px] lg:pt-[68px]">
                <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                    Часто задаваемые вопросы:
                </h2>
                <Accordion items={faqItems} />
            </section>

            <AnyQuestionsForm />

            <ContactCardsLittle />

            <section className="bg-[#1E384A] px-6 py-7 lg:py-[38px] lg:px-9 rounded-[24px]">
                <h3 className="lg:hidden text-[20px]/[28px] font-bold mb-4">
                    Более 5 лет опыта работы
                </h3>
                <p className="text-[14px]/[20px] lg:text-[20px]/[28px] font-medium">
                    Рентасиб – это надежная компания по аренде автомобилей без
                    водителя в Новосибирске. Большой выбор автомобилей, выгодные
                    условия аренды и отличный сервис – все это делает Рентасиб
                    отличным выбором для тех, кто ищет автомобиль в
                    Новосибирске. Не упустите возможность арендовать автомобиль
                    у Рентасиб и насладиться комфортом и независимостью во время
                    вашего пребывания в городе.
                </p>
            </section>
        </>
    );
}
