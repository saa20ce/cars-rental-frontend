import { RentSteps } from '@/components/common/Cars';
import AnyQuestionsForm from '@/components/common/Form/AnyQuestionsForm';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import LetterThanks from '@/components/common/LetterThanks/LetterThanks';
import ModalTriggerCommercialProposalForm from '@/components/common/Modal/ModalTriggerCommercialProposalForm';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { faqItems } from '@/lib/data/faqItems';
import { Accordion } from '@/lib/ui/common/Accordion';
import { TelegramLogo, WhatsappLogo } from '@/lib/ui/icons';
import { ListIcon } from '@/lib/ui/icons/ListIcon';
import { MenIcon } from '@/lib/ui/icons/MenIcon';
import { MobileIcon } from '@/lib/ui/icons/MobileIcon';
import { ParticlesIcon } from '@/lib/ui/icons/ParticlesIcon';
import { PcIcon } from '@/lib/ui/icons/PcIcon';

export default async function BusinessPage() {
    const breadcrumbs = await fetchBreadcrumbs('/business');
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

            <section className="pb-[42px] lg:pb-[68px]  border-b border-[#284B63B2]">
                <h3 className="text-[16px]/[24px] lg:text-[20px]/[28px] font-semibold mb-8 lg:mb-9">
                    Кратокосрочная и долгосрочная аренда автомобилей в
                    Новосибирске для юридических лиц.
                </h3>

                <ul className="flex flex-col lg:flex-row lg:justify-between gap-3 lg:gap-6">
                    <li className="md:flex-1 flex items-center gap-[14px] lg:gap-5 bg-[#FFFFFF0D] p-5 lg:py-5 lg:py-6 lg:px-10 rounded-[8px] lg:rounded-[16px]">
                        <div className="bg-[#F6F6F60D] px-3 py-[14px] lg:p-[11px] rounded-[8px]">
                            <MenIcon className="w-9 h-8 lg:w-12 lg:h-12" />
                        </div>
                        <span className="text-[16px]/[24px] lg:text-[18px]/[28px] font-medium">
                            Персональный <br className="hidden lg:block" />{' '}
                            менеджер 24/7
                        </span>
                    </li>

                    <li className="md:flex-1 flex items-center gap-[14px] lg:gap-5 bg-[#FFFFFF0D] p-5 lg:py-5 lg:py-6 lg:px-10 rounded-[8px] lg:rounded-[16px]">
                        <div className="bg-[#F6F6F60D] px-3 py-[14px] lg:p-[11px] rounded-[8px]">
                            <ListIcon className="w-9 h-8 lg:w-12 lg:h-12" />
                        </div>
                        <span className="text-[16px]/[24px] lg:text-[18px]/[28px] font-medium">
                            Оплата по счету <br className="hidden lg:block" /> с
                            НДС 20%
                        </span>
                    </li>

                    <li className="md:flex-1 flex items-center gap-[14px] lg:gap-5 bg-[#FFFFFF0D] p-5 lg:py-5 lg:py-6 lg:px-10 rounded-[8px] lg:rounded-[16px]">
                        <div className="bg-[#F6F6F60D] px-3 py-[14px] lg:p-[11px] rounded-[8px]">
                            <PcIcon className="w-9 h-8 lg:w-12 lg:h-12" />
                        </div>
                        <span className="text-[16px]/[24px] lg:text-[18px]/[28px] font-medium">
                            Электронный <br className="hidden lg:block" />{' '}
                            документооборот
                        </span>
                    </li>
                </ul>
            </section>

            <section className="py-[42px] lg:py-[68px]">
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

            <section className="py-[42px] lg:py-[68px]">
                <div className="w-full text-[16px]/[24px] lg:text-[18px]/[28px] font-bold flex gap-4 lg:gap-5 flex-col lg:flex-row justify-center">
                    <a
                        href="tel:+7(913)-913-28-08"
                        aria-label="Позвонить по номеру +7 (913) 913-28-08"
                        className="rounded-[12px] bg-[#F6F6F60D] px-6 py-5 lg:py-[25px] lg:px-2 flex items-center lg:max-w-[230px] lg:justify-center lg:flex-col lg:gap-[14px] gap-3 grow"
                    >
                        <MobileIcon className="w-9 h-9 lg:w-[48px] lg:h-[48px]" />
                        <span className="text-nowrap">+ 7(913)-913-28-08</span>
                    </a>
                    <a
                        href="https://wa.me/79139132808"
                        aria-label="Номер WhatsApp"
                        target="_blank"
                        className="rounded-[12px] bg-[#F6F6F60D] px-6 py-5 lg:px-2 flex items-center  lg:max-w-[230px] lg:justify-between lg:flex-col lg:gap-5 gap-3 grow"
                    >
                        <WhatsappLogo className="w-9 h-9 lg:w-[48px] lg:h-[48px]" />
                        <span>+ 7(913)-913-28-08</span>
                    </a>
                    <a
                        href="https://t.me/Rentasib"
                        target="_blank"
                        aria-label="Номер Telegram"
                        className="rounded-[12px] bg-[#F6F6F60D] px-6 py-5 lg:px-2 flex items-center lg:max-w-[230px] lg:justify-center lg:flex-col lg:gap-5 gap-3 grow"
                    >
                        <TelegramLogo className="w-9 h-9 lg:w-[48px] lg:h-[48px]" />
                        <span className="text-nowrap">+ 7(913)-913-28-08</span>
                    </a>
                </div>
            </section>
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
