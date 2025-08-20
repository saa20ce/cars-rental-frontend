import { DeliveryPriceTable, RentSteps } from '@/components/common/Cars';
import {
    AgeIcon,
    CarIcon,
    CheckRound,
    DocumentsIcon,
    LineIcon,
} from '@/lib/ui/icons';
import {
    getAdditionalOptions,
    getCarsByClass,
    getCarsByKuzov,
    getDeliveryPrice,
    getSeasonDates,
} from '@/lib/api/fetchCarData';
import Link from 'next/link';
import { WhyUs } from '@/components/common/Cards/WhyUs';
import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';
import GalleryCars from '@/components/common/Cars/[slug]/GalleryCars';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import { BannerDesctop } from '@/lib/ui/icons/BannerDesctop';
import { DocumentIconHomePage } from '@/lib/ui/icons/DocumentIconHomePage';
import { CarIconHomePage } from '@/lib/ui/icons/CarIconHomePage';
import { NumberIconHomePage } from '@/lib/ui/icons/NumberIconHomePage';

export async function generateMetadata() {
    return await fetchWPMetadata('/');
}

const classes = [
    {
        title: 'Комфорт',
        src: '/images/servicesImages/6.jpg',
        price: 9000,
        href: '/service/arenda-avto-komfort-klassa',
    },
    {
        title: 'Кроссоверы',
        src: '/images/servicesImages/2.jpg',
        price: 9000,
        href: '/service/arenda-krossoverov',
    },
    {
        title: 'Бизнес',
        src: '/images/servicesImages/5.jpg',
        price: 9000,
        href: '/service/arenda-avto-biznes-klassa',
    },
    {
        title: 'Минивэн',
        src: '/images/servicesImages/4.jpg',
        price: 9000,
        href: '/service/prokat-minivenov-i-mikroavtobusov',
    },
    {
        title: 'Внедорожник',
        src: '/images/servicesImages/3.jpg',
        price: 9000,
        href: '/service/arenda-vnedorozhnika',
    },
    {
        title: 'Седан',
        src: '/images/servicesImages/12.jpg',
        price: 9000,
        href: '/service/arenda-sedanov',
    },
];

export default async function Home() {
    const deliveryPrice = await getDeliveryPrice();
    const businessCars = await getCarsByClass(269);
    const comfortCars = await getCarsByClass(268);
    const crossoversCars = await getCarsByKuzov(242);
    const additionalOptions = await getAdditionalOptions();
    const seasonDates = await getSeasonDates();

    return (
        <>
            <section className="pb-[42px] lg:pb-[68px] mt-6 lg:mt-[42px]">
                <div className="hidden lg:flex gap-[17px] pb-6 w-full max-w-[725px]">
                    {['Большой выбор', 'Обслуженные авто', 'КАСКО и ОСАГО'].map(
                        (label) => (
                            <span
                                key={label}
                                className="bg-[#1C3B4A] font-bold text-[18px]/[28px] flex-1 h-11 flex items-center gap-[10px] rounded-[12px] px-3"
                            >
                                <CheckRound className="lg:w-[18px]" />
                                {label}
                            </span>
                        ),
                    )}
                </div>
                <h1 className="font-bold text-[20px]/[28px] lg:hidden text-center mb-5">
                    Арендуйте авто в Новосибирске
                </h1>
                <div className="flex flex-col lg:flex-row gap-4 md:gap-6  relative ">
                    <div className="w-full lg:max-w-[725px]">
                        <BannerDesctop className="max-h-[208px] md:max-h-[350px] lg:max-h-none h-full w-full" />
                    </div>

                    <div className="w-full lg:max-w-[511px] lg:py-[22px] px-4 md:px-0">
                        <div className="hidden lg:block">
                            <h2 className="font-bold text-[36px]/[48px] mb-5">
                                Арендуйте авто в Новосибирске
                            </h2>
                            <p className="font-semibold text-[20px]/[28px] mb-9">
                                Арендуйте автомобиль в Новосибирске по <br />{' '}
                                выгодной цене от 1800 рублей/сутки
                            </p>
                        </div>
                        <div className="flex gap-3 justify-center md:justify-start lg:mb-9">
                            <Link
                                href={'/cars'}
                                className="bg-[#3C6E71] h-10 lg:h-11 lg:max-w-[194px] flex-1 md:flex-0  py-2 rounded-[12px] lg:rounded-[16px] font-medium text-[16px]/[24px] lg:font-semibold lg:text-[18px]/[28px] text-center"
                            >
                                Автопарк
                            </Link>
                            <Link
                                href={'#'}
                                className="border h-10 lg:h-11 text-center lg:max-w-[194px] flex-1 md:flex-0 py-2 rounded-[12px] lg:rounded-[16px] text-[16px]/[24px] font-medium lg:text-[18px]/[28px]"
                            >
                                Трансфер
                            </Link>
                        </div>
                        <Link
                            href="service/arenda-avtomobilej-dlya-biznesa"
                            className="block mt-4 underline underline-offset-[5px] decoration-[.5px] text-[16px]/[24px] lg:text-[20px]/[28px] font-semibold text-center lg:text-left"
                        >
                            Аренда для Юридических лиц
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-6 lg:py-8 border-t border-b border-[#284B63B2]">
                <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-4 lg:mb-6">
                    Классы:
                </h2>
                <div className="flex gap-3 overflow-x-auto pb-4 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible">
                    {classes.map((c) => (
                        <Link
                            href={c.href}
                            key={c.title}
                            className="min-w-[126px] md:min-w-[171px] lg:min-w-0 bg-[#F6F6F60D] hover:bg-[#1E384A] rounded-[16px] transition-colors duration-300 cursor-pointer hover:text-[#f6f6f6]"
                        >
                            <img
                                src={c.src}
                                alt="фото автомобиля"
                                className="w-full h-[84px] md:h-[131px] rounded-[8px] lg:rounded-[12px]"
                            />
                            <div className="px-[14px] pb-[10px] lg:px-5 lg:pb-5 mt-1 lg:mt-3">
                                <h4 className="font-medium text-[#F6F6F699] text-[14px]/[20px] lg:text-[18px]/[28px] lg:mb-1">
                                    {c.title}
                                </h4>
                                <span className="font-bold text-[14px]/[20px] lg:text-[20px]/[28px]">
                                    от {c.price} Р/сут.
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
            <section className="py-[42px] lg:py-[68px]">
                <div className="lg:text-2xl flex justify-between items-start">
                    <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold">
                        Условия аренды:
                    </h2>
                    <Link
                        href={'/require'}
                        className="lg:hidden underline underline-offset-[4px] decoration-1 text-[16px]/[24px] font-normal"
                    >
                        Полные условия
                    </Link>
                </div>

                <ul className="flex flex-wrap justify-between gap-[14px] lg:gap-6 mt-4 border-[#f6f6f638] lg:mt-5 text-[#F6F6F699] lg:text-[#F6F6F699]">
                    <li className="md:flex-1 flex items-center gap-[6px] lg:gap-[20px] md:bg-[#FFFFFF0D] md:py-5 lg:py-6 md:px-10 rounded-[16px] lg:h-[118px]">
                        <div className="lg:bg-[#F6F6F60D] md:p-2 lg:p-[15px] md:rounded-[8px]">
                            <DocumentIconHomePage className="hidden lg:block w-10 h-10" />
                            <DocumentsIcon className="lg:hidden w-9 h-9 "/>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[12px]/[16px] lg:text-[18px]/[20px] font-bold lg:mb-[6px]"> 
                                Документы
                            </span>
                            <span className="text-[12px] lg:text-[18px] font-normal">
                                Паспорт и ВУ
                            </span>
                        </div>
                    </li>

                    <li className="md:flex-1 flex items-center gap-[6px] lg:gap-[20px] md:bg-[#FFFFFF0D] md:py-5 lg:py-7 md:px-10 rounded-[16px] lg:h-[118px]">
                        <div className="lg:bg-[#F6F6F60D] md:p-2 lg:p-[15px] md:rounded-[8px]">
                            <CarIconHomePage className="hidden lg:block w-10 h-10" />
                            <CarIcon className="lg:hidden w-9 h-9 "/>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[12px]/[16px] lg:text-[18px]/[20px] font-bold lg:mb-[6px]">
                                Стаж
                            </span>
                            <span className="text-[12px]/[16px] lg:text-[18px]/[20px] font-normal">
                                От 2-х лет
                            </span>
                        </div>
                    </li>

                    <li className="md:flex-1  flex items-center gap-[6px] lg:gap-[20px] md:bg-[#FFFFFF0D] md:py-5 lg:py-7 md:px-10 rounded-[16px] lg:h-[118px]">
                        <div className="lg:bg-[#F6F6F60D] md:p-2 lg:p-[15px] md:rounded-[8px]">
                            <NumberIconHomePage className="hidden lg:block w-10 h-10" />
                            <AgeIcon className="lg:hidden w-9 h-9 "/>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[12px]/[16px] lg:text-[18px]/[20px] font-bold lg:mb-[6px]">
                                Возраст
                            </span>
                            <span className="text-[12px]/[16px] lg:text-[18px]/[20px] font-normal text-nowrap">
                                От 22-х лет
                            </span>
                        </div>
                    </li>
                    {/* (для десктопа) */}
                    <li className="hidden lg:list-item list-disc mt-[6px] text-[#f6f6f6] text-[18px]/[28px] w-full ml-6">
                        Полные условия аренды вы можете прочитать{' '}
                        <Link
                            href="/require"
                            className="font-semibold underline underline-offset-4"
                        >
                            ЗДЕСЬ
                        </Link>
                    </li>
                </ul>
            </section>

            <RentSteps />

            <GalleryCars
                similarCars={comfortCars}
                title="Комфорт:"
                btnTitle="Все комфорт"
                href="/service/arenda-avto-komfort-klassa"
                additionalOptions={additionalOptions}
                deliveryPrice={deliveryPrice}
                seasonDates={seasonDates}
            />
            <GalleryCars
                similarCars={crossoversCars}
                title="Кроссоверы:"
                btnTitle="Все кроссоверы"
                href="/service/arenda-krossoverov"
                additionalOptions={additionalOptions}
                deliveryPrice={deliveryPrice}
                seasonDates={seasonDates}
            />
            <GalleryCars
                similarCars={businessCars}
                title="Бизнес:"
                btnTitle="Все бизнес"
                href="/service/arenda-avto-biznes-klassa"
                additionalOptions={additionalOptions}
                deliveryPrice={deliveryPrice}
                seasonDates={seasonDates}
            />

            <section className="mt-10 lg:mt-[68px] py-[42px] lg:py-[68px]  border-t border-b border-[#284B63B2]">
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

            <WhyUs />

            <HaveQuestions />
        </>
    );
}
