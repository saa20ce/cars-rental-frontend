import AdditionalServicesCards from '@/components/common/Cards/AdditionalServicesCards';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { faqItems } from '@/lib/data/faqItems';
import { additionalServicesItems } from '@/lib/data/iemsCards';
import { Accordion } from '@/lib/ui/common/Accordion';
import Image from 'next/image';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';

export async function generateMetadata() {
    return await fetchWPMetadata('/dop-service');
}

export default async function additionalServicesPage() {
    const breadcrumbs = await fetchBreadcrumbs('/additional-services');
    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Дополнительные услуги при аренде авто в Новосибирске
            </h1>

            <section>
                <h3 className="text-[16px]/[24px] lg:text-[20px]/[28px] font-semibold mb-8 lg:mb-9">
                    Для удобства водителей и их пассажиров предлагаем
                    дополнительные сервисы и возможности.
                </h3>
                <AdditionalServicesCards items={additionalServicesItems} />
            </section>

            <section className="py-[42px] lg:py-[68px] relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#F6F6F60D] ">
                <div className="max-w-[1260px] px-[16px] xl:px-0 flex flex-col lg:flex-row mx-auto gap-8 lg:gap-6 items-stretch">
                    <article className="lg:w-1/2 flex-1 text-[14px]/[20px] lg:text-[16px]/[24px] font-normal ">
                        <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                            Доставка автомобилей:
                        </h2>
                        <p className="text-[14px]/[20px] lg:text-[16px]/[24px] font-medium mb-2 lg:mb-3">
                            Услуга доставки автомобилей в Рентасиб позволяет
                            нашим клиентам получить автомобиль в удобном для них
                            месте и время. Мы осуществляем доставку автомобилей
                            в любую точку города Новосибирска, а также в
                            аэропорт и на вокзалы.
                        </p>
                        <p className="text-[14px]/[20px] lg:text-[16px]/[24px] font-medium mb-2 lg:mb-3">
                            Если вы хотите заказать доставку автомобиля в
                            аэропорту Новосибирска, то вам необходимо связаться
                            с нашим менеджером и сообщить дату и время прибытия
                            вашего рейса.
                        </p>
                        <p className="text-[14px]/[20px] lg:text-[16px]/[24px] font-medium mb-2 lg:mb-3">
                            Стоимость доставки автомобиля зависит от удаленности
                            места доставки и будет рассчитана индивидуально для
                            каждого заказа.
                        </p>
                        <p className="text-[14px]/[20px] lg:text-[16px]/[24px] font-medium mb-2 lg:mb-3">
                            Мы всегда стараемся предоставить нашим клиентам
                            максимально комфортные условия аренды автомобиля,
                            включая удобную доставку автомобиля в любую точку
                            города.
                        </p>
                    </article>
                    <div className="relative aspect-[3/2] lg:aspect-auto flex-1 lg:w-1/2 w-full mx-auto max-w-[618px] rounded-[20px] overflow-hidden min-h-[82px]">
                        <Image
                            fill
                            alt="Мужчина за рулем автомобиля"
                            src={'/images/men.webp'}
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="flex flex-col-reverse lg:flex-row gap-6 mt-[42px] lg:mt-[68px]  pb-[42px] lg:pb-[68px] border-b border-[#284B63B2] items-stretch">
                <div className="relative w-full aspect-[3/2] mx-auto lg:aspect-auto lg:w-1/2 max-w-[618px] rounded-[20px] overflow-hidden flex-1">
                    <Image
                        fill
                        alt="Мужчина открывает дверь автомобиля"
                        src="/images/menAndCars.webp"
                        className="object-cover"
                    />
                </div>
                <article className="lg:w-1/2 flex-1 text-[14px]/[20px] lg:text-[16px]/[24px] font-medium lg:font-normal">
                    <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                        Дополнительные услуги:
                    </h2>
                    <p className=" mb-2 lg:mb-3">
                        Рентасиб предоставляет широкий спектр дополнительных
                        услуг, чтобы сделать вашу поездку максимально комфортной
                        и безопасной. Одна из таких услуг – это аренда авто с
                        детским креслом. Мы понимаем, как важно обеспечить
                        безопасность маленьких пассажиров, поэтому мы предлагаем
                        детские кресла для детей разных возрастов.
                    </p>
                    <p className="mb-2 lg:mb-3">
                        Также, у нас есть услуга аренды авто с боксом для
                        перевозки грузов. Это может быть полезно, если вам нужно
                        перевезти много багажа или других вещей, которые не
                        помещаются в багажник автомобиля.
                    </p>
                    <p className="mb-2 lg:mb-3">
                        Если вам нужно быстро и безопасно добраться до аэропорта
                        или на вокзал, то мы готовы предложить вам услуги
                        трансфера. Наш водитель встретит вас в указанном месте и
                        довезет до места назначения вовремя и безопасно.
                    </p>
                    <p className="mb-2 lg:mb-3">
                        Наконец, мы предоставляем аренду авто на свадьбу и
                        другие мероприятия. Наши автомобили отлично подойдут для
                        создания роскошного образа на вашем торжестве. Мы готовы
                        предложить вам широкий выбор автомобилей разных марок и
                        классов, чтобы удовлетворить любые потребности.
                    </p>
                </article>
            </section>

            <section className="flex flex-col-reverse lg:flex-row-reverse gap-6 py-[42px] lg:py-[68px] border-t border-b border-[#284B63B2] items-stretch mb-[42px] lg:mb-[68px]">
                <div className="relative aspect-[360/188] mx-auto lg:aspect-auto w-full max-w-[618px] rounded-[20px] overflow-hidden flex-1">
                    <Image
                        fill
                        alt="Мужчина заключивший котракт"
                        src={'/images/contract.webp'}
                        className="object-cover"
                    />
                </div>
                <article className="lg:w-1/2 flex-1 text-[14px]/[20px] lg:text-[16px]/[24px] font-medium lg:font-normal">
                    <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                        Правила использования автомобиля:
                    </h2>
                    <p className=" mb-2 lg:mb-3">
                        Правила использования автомобиля являются одним из
                        важных моментов при аренде авто в Рентасиб. Каждый
                        клиент обязан ознакомиться с ними перед подписанием
                        договора. Во время аренды автомобиля необходимо
                        соблюдать правила дорожного движения и не допускать
                        превышения скорости.
                    </p>
                    <p className="mb-2 lg:mb-3">
                        Если произошло ДТП или поломка автомобиля, необходимо
                        связаться с нашей службой поддержки и действовать
                        согласно инструкциям оператора.
                    </p>
                    <p className="mb-2 lg:mb-3">
                        За нарушения правил использования автомобиля могут быть
                        выписаны штрафы и взысканы с клиента. Поэтому,
                        рекомендуется ознакомиться с правилами использования
                        автомобиля перед началом поездки.
                    </p>
                </article>
            </section>

            <section>
                <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                    Часто задаваемые вопросы:
                </h2>
                <Accordion items={faqItems} />
            </section>
        </>
    );
}
