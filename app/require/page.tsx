import { DocumentCar } from '@/lib/ui/icons/DocumentCar';
import { DocumentIcon } from '@/lib/ui/icons/DocumentIcon';
import { DocumentsUser } from '@/lib/ui/icons/DocumentsUser';
import { HandshakeSvg } from '@/lib/ui/icons/HandshakeSvg';
import { KeyIcon } from '@/lib/ui/icons/KeyIcon';
import { ParticlesIcon } from '@/lib/ui/icons/ParticlesIcon';
import { RouteIcon } from '@/lib/ui/icons/RouteIcon';
import { SteeringWheelIcon } from '@/lib/ui/icons/SteeringWheelIcon';
import { TermsIcon } from '@/lib/ui/icons/TermsIcon';
import { DeliveryPriceTable } from '@/components/common/Table/DeliveryPriceTable';
import { WhyUs } from '@/components/common/Cards/WhyUs';
import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';
import { DownloadIcon } from '@/lib/ui/icons/DownloadIcon';
import { Accordion } from '@/lib/ui/common/Accordion';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import { LineIcon } from '@/lib/ui/icons';
import { getDeliveryPrice } from '@/lib/api/fetchCarData';
import { steps } from '@/lib/data/emergencySteps';
import { faqItems } from '@/lib/data/faqItems';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';

export async function generateMetadata() {
    return await fetchWPMetadata('/require');
}

export default async function TermsPage() {
    const breadcrumbs = await fetchBreadcrumbs('/require');
    const deliveryPrice = await getDeliveryPrice();

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <section>
                <h1 className="text-[24px]/[32px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                    Условия аренды автомобиля
                </h1>
                <p className="text-[16px]/[24px] lg:text-[20px]/[28px] font-normal mb-8 lg:mb-9">
                    Аренда автомобиля – это отличное решение для тех, кто хочет
                    получить свободу передвижения и комфорт в путешествии или
                    деловой поездке. Однако перед тем, как арендовать авто,
                    необходимо ознакомиться с условиями аренды, чтобы избежать
                    неприятных сюрпризов и конфликтов в будущем.
                </p>
            </section>

            <section className="flex flex-col lg:flex-row gap-3 lg:gap-6 text-[14px]/[20px] font-medium lg:text-[18px]/[28px] pt-8 pb-[42px] lg:pt-[42px] lg:pb-[68px] border-t border-b border-[#284B63B2]">
                <article className="flex flex-col gap-3 lg:gap-6 lg:w-1/2">
                    <article className="flex items-start gap-[14px] lg:gap-[32px] rounded-xl bg-[#1F303C] p-5 lg:py-[38px] lg:px-9">
                        <div className="flex bg-[#293A45] p-[8px] lg:p-[13px] rounded-[8px]">
                            <SteeringWheelIcon className="w-[44px] h-[44px] lg:w-[54px] lg:h-[54px] shrink-0" />
                        </div>
                        <div>
                            <h3 className="text-[16px]/[24px] lg:text-[24px]/[32px] font-bold mb-[6px] lg:mb-[14px]">
                                Требования к арендатору
                            </h3>
                            <ol className="list-decimal pl-4">
                                <li>Возраст — от 22 лет</li>
                                <li>Водительский стаж — от 3 лет</li>
                            </ol>
                        </div>
                    </article>
                    <article className="flex  items-start gap-[14px] lg:gap-[32px] rounded-xl bg-[#1F303C] p-5 lg:py-[38px] lg:px-9">
                        <div className="flex bg-[#293A45] p-[8px] lg:p-[13px] rounded-[8px]">
                            <DocumentIcon className="w-[44px] h-[44px] lg:w-[54px] lg:h-[54px] shrink-0" />
                        </div>
                        <div>
                            <h3 className="text-[16px]/[24px] lg:text-[24px]/[32px] font-bold mb-[6px] lg:mb-[14px]">
                                Необходимые документы
                            </h3>
                            <ol className="list-decimal pl-4">
                                <li>Паспорт</li>
                                <li>Водительское удостоверение</li>
                            </ol>
                        </div>
                    </article>
                    <article className="flex  items-start gap-[14px] lg:gap-[32px] rounded-xl bg-[#1F303C] p-5 lg:py-[38px] lg:px-9">
                        <div className="flex bg-[#293A45] p-[8px] lg:p-[13px] rounded-[8px]">
                            <HandshakeSvg className="w-[44px] h-[44px] lg:w-[54px] lg:h-[54px] shrink-0" />
                        </div>
                        <div>
                            <h3 className="text-[16px]/[24px] lg:text-[24px]/[32px] font-bold mb-[6px] lg:mb-[14px]">
                                Бронирование
                            </h3>
                            <p>
                                Для бронирования отправьте заявку с сайта,
                                напишите или позвоните нам. После подтверждения
                                дат и авто менеджер запросит документы.
                                Бронирование фиксируется после внесения предоплаты, и проверки документов.
                            </p>
                        </div>
                    </article>
                    <article className="flex  items-start gap-[14px] lg:gap-[32px] rounded-xl bg-[#1F303C] p-5 lg:py-[38px] lg:px-9">
                        <div className="flex bg-[#293A45] p-[8px] lg:p-[13px] rounded-[8px]">
                            <TermsIcon className="w-[44px] h-[44px] lg:w-[54px] lg:h-[54px] shrink-0" />
                        </div>
                        <div>
                            <h3 className="text-[16px]/[24px] lg:text-[24px]/[32px] font-bold mb-[6px] lg:mb-[14px]">
                                Условия оплаты
                            </h3>
                            <p className="mb-[6px] lg:mb-3">
                                Оплата в размере 100 % суммы договора
                                производится в момент передачи автомобиля, включая мойку и доставку.
                            </p>
                        </div>
                    </article>
                    <article className="flex  items-start gap-[14px] lg:gap-[32px] rounded-xl bg-[#1F303C] p-5 lg:py-[38px] lg:px-9 lg:pb-[66px]">
                        <div className="flex bg-[#293A45] p-[8px] lg:p-[13px] rounded-[8px]">
                            <RouteIcon className="w-[44px] h-[44px] lg:w-[54px] lg:h-[54px] shrink-0" />
                        </div>
                        <div>
                            <h3 className="text-[16px]/[24px] lg:text-[24px]/[32px] font-bold mb-[6px] lg:mb-[14px]">
                                Эксплуатация
                            </h3>
                            <p className="mb-[6px] lg:mb-3">
                                Ограничение по эксплуатации - 1000 км от места
                                выдачи.
                            </p>
                            <p className="mb-[6px] lg:mb-3">
                                Арендованный автомобиль разрешено использовать
                                только на территории РФ.
                            </p>
                            <p className="mb-[6px] lg:mb-3">
                                Недопустимо использовать авто для такси.
                                Благодаря этому наши клиенты могут быть уверены
                                в получении чистых и комфортных автомобилей.
                            </p>
                            <p>
                                Тариф на аренду включает в себя лимит пробега
                                300-400 км в сутки. Пробег суммируется за весь
                                период аренды. Пробег сверх лимита оплачивается
                                отдельно: от 6 до 12 рублей за 1 км, в
                                зависимости от класса авто.
                            </p>
                        </div>
                    </article>
                </article>
                <article className="flex flex-col gap-3 lg:gap-6 lg:w-1/2">
                    <article className="flex  items-start gap-[14px] lg:gap-[32px] rounded-xl bg-[#1F303C] p-5 lg:py-[38px] lg:px-9">
                        <div className="flex bg-[#293A45] p-[8px] lg:p-[13px] rounded-[8px]">
                            <KeyIcon className="w-[44px] h-[44px] lg:w-[54px] lg:h-[54px] shrink-0" />
                        </div>
                        <div>
                            <h3 className="text-[16px]/[24px] lg:text-[24px]/[32px] font-bold mb-[6px] lg:mb-[14px]">
                                Передача авто
                            </h3>
                            <p className="mb-[6px] lg:mb-3">
                                Получить и вернуть авто можно из любой точки в радиусе 1000км.
                            </p>
                            <p className="mb-[6px] lg:mb-3">
                                Автомобиль предоставляется в чистом виде и с
                                полным топливным баком. Вернуть автомобиль
                                необходимо в установленный срок с полным баком.
                            </p>
                            <p className="mb-[6px] lg:mb-3">
                                При задержке сдачи автомобиля каждый час сверх
                                установленного договором срока оплачивается из
                                расчёта 10 % от стоимости аренды в сутки.
                                Задержка возврата автомобиля свыше 3-х часов
                                оплачивается в размере стоимости суточной
                                аренды. При досрочном возврате автомобиля
                                перерасчёт производится по тарифу в зависимости
                                от времени фактического использования вами
                                автомобиля, но не менее суток.
                            </p>
                            <p>
                                Выдача и прием авто в нерабочие часы - 1000
                                рублей
                            </p>
                        </div>
                    </article>
                    <article className="flex  items-start gap-[14px] lg:gap-[32px] rounded-xl bg-[#1F303C] p-5 lg:py-[38px] lg:px-9">
                        <div className="flex bg-[#293A45] p-[8px] lg:p-[13px] rounded-[8px]">
                            <DocumentsUser className="w-[44px] h-[44px] lg:w-[54px] lg:h-[54px] shrink-0" />
                        </div>
                        <div>
                            <h3 className="text-[16px]/[24px] lg:text-[24px]/[32px] font-bold mb-[6px] lg:mb-[14px]">
                                Ответственность арендатора
                            </h3>
                            <p className="mt-[6px] lg:mt-3 lg:text-[]/[]">
                                Арендатор несёт полную материальную ответственность в случаях:
                            </p>
                            <ul className="list-disc pl-4 max-w">
                                <li>
                                    Нарушения условий Договора аренды, в том числе в случае не предоставления справок о ДТП.
                                </li>
                                <li>
                                    Повреждение шин и дисков.
                                </li>
                            </ul>
                            <p className="mt-[6px] lg:mt-3 lg:text-[]/[]">
                                Арендатор несет ответственность в размере франшизы:
                            </p>
                            <ul className="list-disc pl-4 max-w">
                                <li>
                                    Ущерб по вине арендатора.
                                </li>
                                <li>
                                    Ущерб, при котором виновное лицо не установлено.
                                </li>
                            </ul>
                        </div>
                    </article>
                    <article className="flex  items-start gap-[14px] lg:gap-[32px] rounded-xl bg-[#1F303C] p-5 lg:py-[38px] lg:px-9 ">
                        <div className="flex bg-[#293A45] p-[8px] lg:p-[13px] rounded-[8px]">
                            <DocumentCar className="w-[44px] h-[44px] lg:w-[54px] lg:h-[54px] shrink-0" />
                        </div>
                        <div>
                            <h3 className="text-[16px]/[24px] lg:text-[24px]/[32px] font-bold mb-[6px] lg:mb-[14px]">
                                Ответственность Рентасиб
                            </h3>
                            <p className="mb-[6px] lg:mb-3 lg:text-[]/[]">
                                Все автомобили застрахованы по ОСАГО, КАСКО.
                            </p>
                            <p>Арендатор НЕ несёт ответственности за:</p>
                            <ul className="list-disc pl-4 max-w">
                                <li>
                                    Появление сколов на лакокрасочном покрытии.
                                </li>
                                <li>
                                    Появление трещин и сколов на лобовом стекле.
                                </li>
                                <li>
                                    Ущерб по вине третьего лица, личность
                                    которого установлена, при условии
                                    предоставления справок о ДТП.
                                </li>
                            </ul>
                        </div>
                    </article>
                </article>
            </section>

            <section className="py-[42px] lg:py-[68px] border-b border-[#284B63B2]">
                <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] mb-5 lg:mb-[42px]">
                    Для юридических лиц:
                </h2>
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:mb-9">
                    <article className="lg:w-1/2">
                        <h3 className="text-[18px]/[28px] lg:text-[24px]/[32px] font-bold mb-[14px] lg:mb-5">
                            Требования к арендатору
                        </h3>
                        <ol className="list-decimal pl-4 space-y-2 lg:space-y-3 text-[14px]/[20px] lg:text-[18px]/[28px] font-medium lg:max-w-[549px]">
                            <li>
                                Личные данные водителей: фото паспорта (главная
                                страница + регистрация), фото водительского
                                удостоверения (с двух сторон).
                            </li>
                            <li>
                                Реквизиты организации с указанием должности и
                                ФИО руководителя.
                            </li>
                            <li>
                                Доверенность на право подписания договоров
                                аренды и актов приема-передачи, если подписывать
                                будет не директор.
                            </li>
                        </ol>
                    </article>
                    <article className="lg:w-1/2">
                        <h3 className="text-[18px]/[28px] lg:text-[24px]/[32px] font-bold mb-[14px] lg:mb-5">
                            C нами удобно
                        </h3>
                        <ol className="list-decimal pl-4 space-y-2 lg:space-y-3 text-[14px]/[20px] lg:text-[18px]/[28px] font-medium lg:max-w-[549px]">
                            <li>
                                Предоставляем закрывающие документы в день
                                возврата автомобиля
                            </li>
                            <li>Осуществляем обмен документами по ЭДО</li>
                            <li>Работаем с НДС</li>
                            <li>
                                Программа лояльности для корпоративных клиентов
                            </li>
                            <li>Менеджер 24/7</li>
                            <li>Нет лимитов по пробегу</li>
                        </ol>
                    </article>
                </div>
                <div
                    className="hidden lg:flex gap-4"
                    aria-label="Документы для скачивания"
                >
                    <button className="px-4 py-2 border-[#F6F6F6] border rounded-[16px] flex justify-center items-center">
                        <DownloadIcon className="mr-3" /> Скачать доверенность
                    </button>
                    <button className="px-4 py-2 border-[#F6F6F6] border rounded-[16px] flex justify-center items-center">
                        <DownloadIcon className="mr-3" />
                        Скачать договор аренды
                    </button>
                </div>
            </section>

            <section className="pt-[43px] lg:py-[68px] pb-[62px]">
                <h2 className="text-[18px]/[28px] lg:text-[24px]/[32px] font-bold mb-5 lg:mb-[42px] ">
                    Набор документов для физических лиц:
                </h2>
                <div className="flex flex-col lg:flex-row-reverse gap-4 lg:gap-6">
                    <article className="lg:w-1/2 rounded-[20px] border-2 border-[#F6F6F633] px-6 lg:px-9 pt-7 lg:pt-[38px] pb-10 lg:pb-[38px] bg-globe">
                        <h3 className="text-[18px]/[28px] lg:text-[24px]/[32px] font-bold mb-8 lg:mb-[72px]">
                            Инностранным гражданам
                        </h3>
                        <ul className="space-y-5">
                            <li>
                                <span>
                                    <ParticlesIcon className="mr-4 lg:mr-5" />
                                </span>
                                Заграничный паспорт
                            </li>
                            <li>
                                <span>
                                    <ParticlesIcon className="mr-4 lg:mr-5" />
                                </span>
                                Водительское удостоверение международного образца
                            </li>
                            <li>
                                <span>
                                    <ParticlesIcon className="mr-4 lg:mr-5" />
                                </span>
                                Нотариальный заверенный перевод документа
                            </li>
                        </ul>
                    </article>
                    <article className="lg:w-1/2 rounded-[20px] border-2 border-[#F6F6F633] px-6 lg:px-9 pt-7 lg:pt-[38px] pb-9 lg:pb-[42px] bg-coatOfArms">
                        <h3 className="text-[18px]/[28px] lg:text-[24px]/[32px] font-bold mb-[82px] lg:mb-[116px]">
                            Гражданам РФ
                        </h3>
                        <ul className="text-[16px]/[24px] lg:text-[18px]/[28px] space-y-5">
                            <li>
                                <span>
                                    <ParticlesIcon className="mr-4 lg:mr-5" />
                                </span>
                                Паспорт с пропиской
                            </li>
                            <li>
                                <span>
                                    <ParticlesIcon className="mr-4 lg:mr-5" />
                                </span>
                                Водительское удостоверение
                            </li>
                        </ul>
                    </article>
                </div>
            </section>

            <section className="py-[42px] lg:py-[68px] px-[17px] lg:px-0 relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#F6F6F60D]">
                <h2 className="lg:text-center text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-12">
                    Что делать при ДТП?
                </h2>
                <ol className="grid lg:grid-cols-3 lg:gap-6 lg:max-w-[939px] mx-auto list-none counter-reset:step">
                    {steps.map((step, index) => (
                        <li
                            key={index}
                            className="flex gap-4 relative last:pb-0 lg:flex-col counter-increment:step"
                        >
                            <div className="relative flex flex-col items-center lg:items-start">
                                <div className="relative w-9 h-9 bg-[#5D6770] rounded-md text-white font-bold flex items-center justify-center">
                                    {index + 1}
                                </div>
                                <div className="hidden lg:block absolute top-[18px] left-[36px] right-[0px] h-px border-t-2 border-dashed border-gray-500 z-0" />
                                <div className="h-2px border-l-2 border-dashed border-gray-500 flex-1 lg:w-full"></div>
                            </div>
                            <div
                                className={`${index !== steps.length - 1 ? 'pb-8' : ''}`}
                            >
                                <h3 className="text-[18px]/[28px] lg:text-[20px]/[28px] mb-[2px] font-bold">
                                    {step.title}
                                </h3>
                                <p className="text-[14px]/[20px] lg:text-[16px]/[24px]">
                                    {step.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="pt-[62px] lg:py-[68px] pb-[42px]  border-b border-[#284B63B2]">
                <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-[32px]">
                    А если...
                </h2>
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                    <article className="lg:w-1/2">
                        <h3 className="text-[18px]/[28px] lg:text-[24px]/[32px] font-bold mb-[14px] lg:mb-5 ">
                            Требуется продление аренды
                        </h3>
                        <p className="text-[14px]/[20px] lg:text-[18px]/[28px] font-medium lg:max-w-[549px]">
                            Арендатор имеет возможность продлить свою бронь в
                            процессе аренды, но не всегда есть возможность продления.
                            Для этого арендатору необходимо просто
                            связаться с компанией и сообщить о желаемых датах
                            продления. После согласования дат, арендатор должен
                            произвести оплату за следующий период. Важно
                            отметить, что суточная стоимость аренды на
                            последующий период не может превышать первоначально
                            установленный тариф, что позволяет арендатору
                            избежать неожиданных финансовых затрат.
                        </p>
                    </article>
                    <article className="lg:w-1/2">
                        <h3 className="text-[18px]/[28px] lg:text-[24px]/[32px] font-bold mb-[14px] lg:mb-5 ">
                            Обнаружилась неисправность
                        </h3>
                        <p className="text-[14px]/[20px] lg:text-[18px]/[28px] font-medium">
                            Мы тщательно следим за тем, чтобы машины находились в отличном техническом состоянии.
                            Мы обеспечиваем безопасность и комфорт передвижения клиентов, сводя к минимуму любые риски.
                            Тем не менее, если Вы столкнулись с поломкой, просто позвоните, и мы моментально примем необходимые меры
                        </p>
                    </article>
                </div>
            </section>

            <section className="mt-10 lg:mt-[68px] pb-[42px] lg:pb-[68px]">
                <div className="flex flex-row">
                    <h2 className="text-xl font-bold lg:text-3xl">
                        Стоимость доставки авто:
                    </h2>
                    <div className="hidden lg:block ml-4 mt-[6px]">
                        <LineIcon />
                    </div>
                    <div className="hidden text-[#FFD7A6] lg:block text-2xl ml-4 mt-[2px]">
                        Доставка 24/7
                    </div>
                </div>
                <DeliveryPriceTable deliveryPrice={deliveryPrice} />
            </section>

            <section className="py-[42px] lg:py-[68px] border-t border-[#284B63B2]">
                <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                    Часто задаваемые вопросы:
                </h2>
                <Accordion items={faqItems} />
            </section>

            <WhyUs />
            <HaveQuestions />
        </>
    );
}
