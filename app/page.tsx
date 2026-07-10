import { DeliveryPriceTable, RentSteps } from '@/components/common/Cars';
import Image from 'next/image';
import dayjs from 'dayjs';
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
import type { Car, SeasonData } from '@/lib/types/Car';
import {
    getDiscountedPriceForDay,
    isDaySeason,
} from '@/lib/helpers/RentalCheckoutHelper';
import { WhyUs } from '@/components/common/Cards/WhyUs';
import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';
import GalleryCars from '@/components/common/Cars/[slug]/GalleryCars';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import Banner from '@/public/images/Banner.png';
import { DocumentIconHomePage } from '@/lib/ui/icons/DocumentIconHomePage';
import { CarIconHomePage } from '@/lib/ui/icons/CarIconHomePage';
import { NumberIconHomePage } from '@/lib/ui/icons/NumberIconHomePage';
import { MenIcon } from '@/lib/ui/icons/MenIcon';
import { getAllTaxonomyOptions } from '@/lib/api/fetchCarTaxonomies';
import HomeCarSearchForm from '@/components/common/Form/HomeCarSearchForm';

export const revalidate = 300;

export async function generateMetadata() {
    return await fetchWPMetadata('/');
}

const classes = [
    {
        title: 'Бизнес',
        src: '/images/servicesImages/3.jpg',
        price: 7000,
        href: '/service/arenda-avto-biznes-klassa',
    },
    {
        title: 'Минивэн',
        src: '/images/servicesImages/dsc03710.jpg',
        price: 6000,
        href: '/service/prokat-minivenov-i-mikroavtobusov',
    },
    {
        title: 'Кроссоверы',
        src: '/images/servicesImages/dsc05065-scaled.jpg',
        price: 5000,
        href: '/service/arenda-krossoverov',
    },
    {
        title: 'Комфорт',
        src: '/images/servicesImages/dsc06740_1.jpg',
        price: 4000,
        href: '/service/arenda-avto-komfort-klassa',
    },
    {
        title: 'Эконом',
        src: '/images/servicesImages/dsc04918_2-scaled.jpg',
        price: 3600,
        href: '/service/arenda-avto-ekonom-klassa',
    },
];

const getHomeCarPrice = (car: Car, seasonDates: SeasonData | null) => {
    const regularPrice = Number(car.acf?.['1-3_dnya']) || 0;
    const seasonPrice = Number(car.acf?.['1-3_dnya_S']) || regularPrice;
    const today = dayjs();
    const basePrice = isDaySeason(today, seasonDates)
        ? seasonPrice
        : regularPrice;

    return getDiscountedPriceForDay(basePrice, today, car.acf);
};

const sortCarsByPriceDesc = (cars: Car[], seasonDates: SeasonData | null) =>
    [...cars].sort(
        (a, b) =>
            getHomeCarPrice(b, seasonDates) - getHomeCarPrice(a, seasonDates),
    );

const getRequiredHomeCars = async (
    groupTitle: string,
    carsPromise: Promise<Car[]>,
) => {
    const cars = await carsPromise;

    if (cars.length === 0) {
        throw new Error(
            `[Home] ${groupTitle} cars are empty; refusing to cache an incomplete homepage`,
        );
    }

    return cars;
};
export default async function Home() {
    const [
        deliveryPrice,
        businessCars,
        minivanCars,
        comfortCars,
        crossoversCars,
        economyCars,
        additionalOptions,
        seasonDates,
        taxonomyOptions,
    ] = await Promise.all([
        getDeliveryPrice(),
        getRequiredHomeCars('Бизнес', getCarsByClass(269, { strict: true })),
        getRequiredHomeCars('Минивэн', getCarsByKuzov(243, { strict: true })),
        getRequiredHomeCars('Комфорт', getCarsByClass(268, { strict: true })),
        getRequiredHomeCars(
            'Кроссоверы',
            getCarsByKuzov(242, { strict: true }),
        ),
        getRequiredHomeCars('Эконом', getCarsByClass(267, { strict: true })),
        getAdditionalOptions(),
        getSeasonDates(),
        getAllTaxonomyOptions(),
    ]);
    const { klassOptions, kuzovOptions } = taxonomyOptions;
    const carsByClassTitle = {
        Бизнес: sortCarsByPriceDesc(businessCars, seasonDates),
        Минивэн: sortCarsByPriceDesc(minivanCars, seasonDates),
        Кроссоверы: sortCarsByPriceDesc(crossoversCars, seasonDates),
        Комфорт: sortCarsByPriceDesc(comfortCars, seasonDates),
        Эконом: sortCarsByPriceDesc(economyCars, seasonDates),
    };
    const galleryButtonTitles = {
        Бизнес: 'Все бизнес',
        Минивэн: 'Все минивэны',
        Кроссоверы: 'Все кроссоверы',
        Комфорт: 'Все комфорт',
        Эконом: 'Все эконом',
    };

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
                <div className="flex flex-col lg:flex-row gap-4 md:gap-6  relative ">
                    <div className="contents lg:block lg:order-2 lg:w-full lg:max-w-[511px] lg:py-[22px]">
                        <h1 className="order-1 font-bold text-[20px]/[28px] lg:text-[36px]/[48px] text-center lg:text-left mb-1 lg:mb-5">
                            Арендуйте авто в Новосибирске
                        </h1>
                        <p className="hidden lg:block font-semibold text-[20px]/[28px] mb-9">
                            Арендуйте автомобиль в Новосибирске по <br />{' '}
                            выгодной цене от 1800 рублей/сутки
                        </p>
                        <div className="order-3 w-full px-4 md:px-0">
                            <div className="flex gap-3 justify-center md:justify-start lg:mb-9">
                                <Link
                                    href={'/cars'}
                                    className="bg-[#3C6E71] h-10 lg:h-11 lg:max-w-[194px] flex-1 md:flex-0  py-2 rounded-[12px] lg:rounded-[16px] font-medium text-[16px]/[24px] lg:font-semibold lg:text-[18px]/[30px] text-center"
                                >
                                    Автопарк
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

                    <div className="order-2 w-full lg:order-1 lg:max-w-[725px]">
                        <Image
                            src={Banner}
                            alt="Аренда авто в Новосибирске"
                            className="max-h-[208px] md:max-h-[350px] lg:max-h-none h-full w-full"
                            sizes="(max-width: 1023px) 100vw, 725px"
                            priority
                        />
                    </div>
                </div>
            </section>

            <HomeCarSearchForm
                klassOptions={klassOptions}
                kuzovOptions={kuzovOptions}
            />

            <section className="py-6 lg:py-8 border-t border-b border-[#284B63B2]">
                <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-4 lg:mb-6">
                    Классы:
                </h2>
                <div className="flex gap-3 overflow-x-auto pb-4 lg:pb-0 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible">
                    {classes.map((c) => (
                        <Link
                            href={c.href}
                            key={c.title}
                            className="min-w-[126px] md:min-w-[171px] lg:min-w-0 bg-[#F6F6F60D] hover:bg-[#1E384A] rounded-[16px] transition-colors duration-300 cursor-pointer hover:text-[#f6f6f6]"
                        >
                            <div className="relative w-full h-[84px] object-cover md:h-[131px] rounded-[8px] lg:rounded-[12px]">
                                <Image
                                    src={c.src}
                                    alt="фото автомобиля"
                                    fill
                                    sizes="(max-width: 767px) 126px, (max-width: 1023px) 171px, 200px"
                                    style={{
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                    }}
                                    loading={'lazy'}
                                />
                            </div>
                            <div className="px-[14px] pb-[10px] lg:px-5 lg:pb-5 mt-1 lg:mt-3">
                                <div className="font-medium text-[#F6F6F699] text-[14px]/[20px] lg:text-[18px]/[28px] lg:mb-1">
                                    {c.title}
                                </div>
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
                    <h3 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold">
                        Условия аренды:
                    </h3>
                    <Link
                        href={'/require'}
                        className="lg:hidden underline underline-offset-[4px] decoration-1 text-[16px]/[24px] font-normal"
                    >
                        Полные условия
                    </Link>
                </div>

                <ul className="flex flex-wrap justify-between gap-[14px] lg:gap-6 mt-4 border-[#f6f6f638] lg:mt-5 text-[#fff]">
                    <li className="md:flex-1 flex items-center gap-[6px] lg:gap-[20px] md:bg-[#FFFFFF0D] md:py-5 lg:py-6 md:px-10 rounded-[16px] lg:h-[118px]">
                        <div className="lg:bg-[#F6F6F60D] md:p-2 lg:p-[15px] md:rounded-[8px]">
                            <DocumentIconHomePage className="hidden lg:block w-10 h-10" />
                            <DocumentsIcon className="lg:hidden w-9 h-9 " />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[12px]/[16px] lg:text-[18px]/[20px] font-bold lg:mb-[6px] ">
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
                            <CarIcon className="lg:hidden w-9 h-9 " />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[12px]/[16px] lg:text-[18px]/[20px] font-bold lg:mb-[6px]">
                                Стаж
                            </span>
                            <span className="text-[12px]/[16px] lg:text-[18px]/[20px] font-normal">
                                От 3-х лет
                            </span>
                        </div>
                    </li>

                    <li className="md:flex-1  flex items-center gap-[6px] lg:gap-[20px] md:bg-[#FFFFFF0D] md:py-5 lg:py-7 md:px-10 rounded-[16px] lg:h-[118px]">
                        <div className="lg:bg-[#F6F6F60D] md:p-2 lg:p-[15px] md:rounded-[8px]">
                            <MenIcon className="hidden lg:block w-10 h-10" />
                            <MenIcon className="lg:hidden w-9 h-9 " />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[12px]/[16px] lg:text-[18px]/[20px] font-bold lg:mb-[6px]">
                                Возраст
                            </span>
                            <span className="text-[12px]/[16px] lg:text-[18px]/[20px] font-normal text-nowrap">
                                От 23-х лет
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

            <RentSteps headingTag="h3" stepTitleTag="div" />

            {classes.map((c) => (
                <GalleryCars
                    key={c.title}
                    similarCars={
                        carsByClassTitle[
                            c.title as keyof typeof carsByClassTitle
                        ]
                    }
                    title={`${c.title}:`}
                    titleTag="div"
                    carTitleTag="div"
                    btnTitle={
                        galleryButtonTitles[
                            c.title as keyof typeof galleryButtonTitles
                        ]
                    }
                    href={c.href}
                    additionalOptions={additionalOptions}
                    deliveryPrice={deliveryPrice}
                    seasonDates={seasonDates}
                />
            ))}

            <section className="mt-10 lg:mt-[68px] py-[42px] lg:py-[68px]  border-t border-b border-[#284B63B2]">
                <div className="flex flex-row">
                    <h4 className="text-xl font-bold lg:text-3xl">
                        Стоимость доставки авто
                    </h4>
                    <div className="hidden lg:block ml-4 mt-[6px]">
                        <LineIcon />
                    </div>
                    <div className="hidden text-[#FFD7A6] lg:block text-2xl ml-4 mt-[2px]">
                        Доставка 24/7
                    </div>
                </div>
                <DeliveryPriceTable deliveryPrice={deliveryPrice} />
            </section>

            <WhyUs headingTag="div" />

            <HaveQuestions headingTag="div" />
        </>
    );
}
