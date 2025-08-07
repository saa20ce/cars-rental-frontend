import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { faqItems } from '@/lib/data/faqItems';
import { Accordion } from '@/lib/ui/common/Accordion';
import { GoIcon } from '@/lib/ui/icons/GoIcon';
import Image from 'next/image';
import Link from 'next/link';

const servicesItems = [
    {
        key: '1',
        title: 'Доставка авто по городу',
        href: '#',
        src: '/images/servicesImages/1.jpg',
    },
    {
        key: '2',
        title: 'Прокат авто с детским креслом',
        href: '#',
        src: '/images/servicesImages/2.jpg',
    },
    {
        key: '3',
        title: 'Аренда авто без водителя',
        href: '#',
        src: '/images/servicesImages/3.jpg',
    },
    {
        key: '4',
        title: 'Аренда авто с боксом на крышу',
        href: '#',
        src: '/images/servicesImages/4.jpg',
    },
    {
        key: '5',
        title: 'Аренда авто в аэропорту',
        href: '#',
        src: '/images/servicesImages/5.jpg',
    },
];

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
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 my-8 lg:my-9">
                    {servicesItems.map((item, i) => (
                        <Link
                            href={item.href}
                            key={item.key}
                            className="group relative flex items-center gap-3 sm:gap-0 sm:items-stretch sm:flex-col sm:h-auto h-[92px] rounded-[16px] sm:border sm:border-[#F6F6F633] bg-[#F6F6F60D] overflow-hidden sm:aspect-[297/197]"
                        >
                            <div className="w-[139px] sm:w-full">
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex justify-between items-center flex-1 pr-4">
                                <h3
                                    className={` max-w-[155px] sm:max-w-none sm:absolute bottom-0  text-[#F6F6F6] text-[14px] lg:text-[16px] sm:w-full sm:text-center font-medium  py-3 sm:text-nowrap sm:text-center sm:bg-[#142632D6] sm:group-hover:bg-[#2D5355] transition-colors duration-300`}
                                >
                                    {item.title}
                                </h3>
                                <GoIcon className="sm:hidden" />
                            </div>
                        </Link>
                    ))}
                </div>
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
