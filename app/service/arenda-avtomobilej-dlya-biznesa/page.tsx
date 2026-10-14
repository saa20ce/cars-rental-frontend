import ContactCardsLittle from '@/components/common/Cards/ContactCardsLittle';
import InfoThreeCard from '@/components/common/Cards/InfoThreeCard';
import AnyQuestionsForm from '@/components/common/Form/AnyQuestionsForm';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import LetterThanks from '@/components/common/LetterThanks/LetterThanks';
import ModalTriggerCommercialProposalForm from '@/components/common/Modal/ModalTriggerCommercialProposalForm';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { fetchDjangoJson } from '@/lib/api/fetchDjangoJson';
import { faqItems } from '@/lib/data/faqItems';
import { infoThreeCardItems } from '@/lib/data/itemsCards';
import { Accordion } from '@/lib/ui/common/Accordion';
import { ParticlesIcon } from '@/lib/ui/icons/ParticlesIcon';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import { getAllTaxonomyOptions } from '@/lib/api/fetchCarTaxonomies';
import Link from 'next/link';
import { DownloadIcon } from '@/lib/ui/icons/DownloadIcon';
import { withEditorialMetadata } from '@/lib/seo/withEditorialMetadata';


export async function generateMetadata() {
    return withEditorialMetadata(
        await fetchWPMetadata('/service/arenda-avtomobilej-dlya-biznesa'),
        'Аренда автомобилей для юридических лиц в Новосибирске | Рентасиб',
        'Аренда авто без водителя для юридических лиц в Новосибирске. Стоимость, срок, залог и пробег согласуем индивидуально и закрепим в договоре.',
    );
}

export default async function СorporateRentalPage() {
    const breadcrumbs = await fetchBreadcrumbs('/service/arenda-avtomobilej-dlya-biznesa');
    const letters = await fetchDjangoJson<Parameters<typeof LetterThanks>[0]['letters']>(
        '/api/thank-you-letters/',
        [],
        { next: { revalidate: 86400 } },
    );
    const { klassOptions } = await getAllTaxonomyOptions();

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Аренда авто для юридических лиц
            </h1>

            <InfoThreeCard
                header="Краткосрочная и долгосрочная аренда автомобилей в
                    Новосибирске для юридических лиц."
                headerTag="div"
                items={infoThreeCardItems}
            />

            <article className="lg:w-1/2 pb-[42px] lg:pb-[68px]">
                <div className="text-[18px]/[28px] lg:text-[24px]/[32px] font-bold mb-[14px] lg:mb-5">
                    Требования к арендатору
                </div>
                <ol className="mb-4 list-decimal pl-4 space-y-2 lg:space-y-3 text-[14px]/[20px] lg:text-[18px]/[28px] font-medium lg:max-w-[549px]">
                    <li>
                        Карточка предприятия
                    </li>
                    <li>
                        Наличие ЭДО
                    </li>
                    <li>
                        Документы водителей и номера телефонов
                    </li>
                    <li>
                        <Link
                            href="/docs/Доверенность_для_представителей_организаций.doc"
                            download
                            className="underline underline-offset-4 decoration-5 font-[400] lg:font-[600] text-[16px] lg:text-[18px] lg:underline lg:underline-offset-4 decoration-5"
                        >
                            Доверенность
                        </Link>
                    </li>
                </ol>

                <Link
                    href="/docs/Договор_3797.docx"
                    download
                    className="px-4 py-2 border-[#F6F6F6] border rounded-[16px] flex justify-center items-center hover:border-[transparent] hover:bg-[#F6F6F60D]"
                >
                    <DownloadIcon className="mr-3" />
                    Скачать договор аренды
                </Link>
            </article>

            <section className="pb-[42px] lg:pb-[68px]">
                <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                    Индивидуальные условия аренды для юридических лиц
                </h2>
                <p className="text-[16px]/[24px] lg:text-[18px]/[28px] font-medium lg:font-normal mb-6 lg:mb-8">
                    Обсудим краткосрочную или долгосрочную аренду автомобиля
                    без водителя под вашу задачу. Стоимость, срок, залог,
                    пробег и другие условия согласуем индивидуально и закрепим
                    в договоре.
                </p>
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-8 lg:mb-9">
                    <article className="lg:w-1/2 rounded-[20px] border-2 border-[#F6F6F633] px-6 lg:px-9 py-7 lg:py-[38px]">
                        <div className="text-[18px]/[28px] lg:text-[24px]/[32px] font-bold mb-9 lg:mb-[42px]">
                            Что обсудим
                        </div>
                        <ul className="space-y-5 text-[16px]/[24px] lg:text-[18px]/[28px] font-medium">
                            <li className="flex items-start gap-4 lg:gap-5">
                                <ParticlesIcon className="shrink-0 mt-1" />
                                Доступные автомобили и срок аренды
                            </li>
                            <li className="flex items-start gap-4 lg:gap-5">
                                <ParticlesIcon className="shrink-0 mt-1" />
                                Стоимость, порядок оплаты и залог
                            </li>
                            <li className="flex items-start gap-4 lg:gap-5">
                                <ParticlesIcon className="shrink-0 mt-1" />
                                Лимит пробега и территория эксплуатации
                            </li>
                            <li className="flex items-start gap-4 lg:gap-5">
                                <ParticlesIcon className="shrink-0 mt-1" />
                                Обслуживание автомобиля на время аренды
                            </li>
                        </ul>
                    </article>
                    <article className="lg:w-1/2 rounded-[20px] border-2 border-[#F6F6F633] px-6 lg:px-9 py-7 lg:py-[38px]">
                        <div className="text-[18px]/[28px] lg:text-[24px]/[32px] font-bold mb-9 lg:mb-[42px]">
                            Как согласуем
                        </div>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4 lg:gap-5">
                                <ParticlesIcon className="shrink-0 mt-1" />
                                Место и время передачи автомобиля
                            </li>
                            <li className="flex items-start gap-4 lg:gap-5">
                                <ParticlesIcon className="shrink-0 mt-1" />
                                Перечень документов для договора
                            </li>
                            <li className="flex items-start gap-4 lg:gap-5">
                                <ParticlesIcon className="shrink-0 mt-1" />
                                Дополнительные опции при наличии
                            </li>
                            <li className="flex items-start gap-4 lg:gap-5">
                                <ParticlesIcon className="shrink-0 mt-1" />
                                Итоговые условия в договоре
                            </li>
                        </ul>
                    </article>
                </div>
                <ModalTriggerCommercialProposalForm klassOptions={klassOptions} />
            </section>

            <LetterThanks letters={letters} headingTag="div" />

            <section className="pt-[42px] lg:pt-[68px]">
                <div className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                    Часто задаваемые вопросы:
                </div>
                <Accordion items={faqItems} />
            </section>

            <AnyQuestionsForm headingTag="div" />

            <ContactCardsLittle />

            <section className="bg-[#1E384A] px-6 py-7 lg:py-[38px] lg:px-9 rounded-[24px]">
                <div className="lg:hidden text-[20px]/[28px] font-bold mb-4">
                    Более 5 лет опыта работы
                </div>
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
