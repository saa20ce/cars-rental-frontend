import { DeliveryPriceTable, RentSteps } from '@/components/common/Cars';
import {
    AgeIcon,
    CarIcon,
    CheckRound,
    DocumentsIcon,
    LineIcon,
} from '@/lib/ui/icons';
import {
    getCarsByClass,
    getCarsByKuzov,
    getDeliveryPrice,
} from '@/lib/api/fetchCarData';
import Link from 'next/link';
import { WhyUs } from '@/components/common/Cards/WhyUs';
import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';
import GalleryCars from '@/components/common/Cars/[slug]/SimilarCars';

const classes = [
    { title: 'Комфорт', src: '/images/whitecar.png', price: 9000 },
    { title: 'Кроссоверы', src: '/images/whitecar.png', price: 9000 },
    { title: 'Бизнес', src: '/images/whitecar.png', price: 9000 },
    { title: 'Минивэн', src: '/images/whitecar.png', price: 9000 },
    { title: 'Внедорожник', src: '/images/whitecar.png', price: 9000 },
    { title: 'Седан', src: '/images/whitecar.png', price: 9000 },
];

export default async function Home() {
    const deliveryPrice = await getDeliveryPrice();
    const businessCars = await getCarsByClass(269);
    const comfortCars = await getCarsByClass(268);
    const crossoversCars = await getCarsByKuzov(242);

    return (
        <>
            <section className="pb-[42px] lg:pb-[68px]">
                <div className="hidden lg:flex gap-[17px] pb-6 w-full max-w-[725px]">
                    {['Большой выбор', 'Обслуженные авто', 'КАСКО и ОСАГО'].map(
                        (label) => (
                            <span
                                key={label}
                                className="bg-[#1C3B4A] font-bold text-[18px]/[28px] flex-1 h-11 flex-center gap-[10px] rounded-[12px] "
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
                <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-center relative ">
                    <div className="bg-[#284B63] rounded-2xl w-full lg:max-w-[725px] relative overflow-hidden h-[208px] lg:h-[360px] py-[25px] lg:py-[51px] px-[17px] lg:px-[37px]">
                        <div className="relative z-10">
                            <h3 className="font-bold text-[24px]/[32px] lg:text-[28px]/[36px] mb-3 lg:mb-5">
                                Скидка 20%
                            </h3>

                            <p className="text-[16px]/[24px] lg:text-[20px]/[28px] mb-[23px] lg:mb-[35px]">
                                При аренде кроссоверов
                            </p>
                            <span className="bg-[#142632] text-[#FFC086] h-[32px] lg:h-[60px] px-4 py-1 rounded-[16px] text-nowrap mb-7 lg:mb-[76px] text-[16px]/[24px] lg:text-[22px]/[30px] font-bold flex-center lg:px-5 max-w-[120px] lg:max-w-[198px]">
                                От 5-ти суток
                            </span>
                            <p className="text-[#F6F6F699]">
                                Срок действия акции до 31.01
                            </p>
                        </div>

                        <img
                            src="/images/bgBanner.png"
                            alt="car"
                            className="absolute w-[260px] z-0 lg:w-auto bottom-0 right-0 "
                        />
                        <img
                            src="/images/carBanner.png"
                            alt="car"
                            className="absolute w-[220px] z-0 lg:w-auto bottom-0 right-0"
                        />
                    </div>

                    <div className="w-full lg:max-w-[511px] lg:py-[22px]">
                        <div className="hidden lg:block">
                            <h2 className="font-bold text-[36px]/[48px] mb-5">
                                Арендуйте авто в Новосибирске
                            </h2>
                            <p className="font-medium text-[18px]/[28px] mb-9">
                                Арендуйте автомобиль в Новосибирске по выгодной
                                цене от 1800 рублей/сутки
                            </p>
                        </div>
                        <div className="flex gap-3 justify-center md:justify-start lg:mb-9">
                            <button className="bg-[#3C6E71] lg:max-w-[194px] flex-1 md:flex-0  py-2 rounded-full font-medium text-[16px]/[24px] lg:font-semibold lg:text-[18px]/[28px]">
                                Автопарк
                            </button>
                            <button className="border lg:max-w-[194px] flex-1 md:flex-0 py-2 rounded-full font-medium text-[16px]/[24px] lg:font-semibold lg:text-[18px]/[28px]">
                                Трансфер
                            </button>
                        </div>
                        <Link
                            href="#"
                            className="block mt-4 underline text-[16px]/[24px] lg:text-[20px]/[28px] font-bold text-center lg:text-left"
                        >
                            Аренда для Юридических лиц
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-[42px] lg:py-[68px] border-t border-b border-[#284B63B2]">
                <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-4 lg:mb-6">
                    Классы:
                </h2>
                <div className="flex gap-3 lg:gap-4 overflow-x-auto pb-4">
                    {classes.map((c) => {
                        return (
                            <div
                                key={c.title}
                                className="min-w-[126px] md:min-w-[171px] bg-[#F6F6F60D] rounded-[16px]"
                            >
                                <img
                                    src={c.src}
                                    alt="фото автомобиля"
                                    className="aspect-[3/2]"
                                />
                                <div className="px-[14px] pb-[10px] lg:px-5 lg:pb-5 lg:mt-3">
                                    <h4 className="font-medium text-[#F6F6F699] text-[14px]/[20px] lg:text-[18px]/[28px] lg:mb-1">
                                        {c.title}
                                    </h4>
                                    <span className="text-[14px]/[20px] lg:text-[20px]/[28px]">
                                        от {c.price} Р/сут.
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
            <section className="my-[42px] lg:my-[68px]">
                <div className="lg:text-2xl lg:mt-8 flex justify-between items-start">
                    <h2 className="text-[20px]/[28px] lg:text-[24px]/[32px] font-bold">
                        Условия аренды:
                    </h2>
                    <Link
                        href={'/terms'}
                        className="lg:hidden underline text-[16px]/[24px] font-normal"
                    >
                        Полные условия
                    </Link>
                </div>

                <ul className="flex justify-between gap-6 mt-4 text-[#F6F6F699] border-[#f6f6f638] lg:mt-5">
                    <li className="flex-1 flex items-center gap-[6px] lg:gap-[10px] md:bg-[#FFFFFF0D] md:py-5 lg:py-7 md:px-10 rounded-[16px]">
                        <div className="lg:bg-[#F6F6F60D] md:p-2 lg:p-[15px] md:rounded-[8px]">
                            <DocumentsIcon className="w-9 h-9 xl:w-10 xl:h-10" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[14px]/[20px] lg:text-[18px]/[20px] font-bold">
                                Документы
                            </span>
                            <span className="text-[12px]/[16px] lg:text-[18px]/[20px] font-normal">
                                Паспорт и ВУ
                            </span>
                        </div>
                    </li>

                    <li className="flex-1 flex items-center gap-[6px] lg:gap-[10px] md:bg-[#FFFFFF0D] md:py-5 lg:py-7 md:px-10 rounded-[16px]">
                        <div className="lg:bg-[#F6F6F60D] md:p-2 lg:p-[15px] md:rounded-[8px]">
                            <CarIcon className="w-9 h-9 xl:w-10 xl:h-10" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[14px]/[20px] lg:text-[18px]/[20px] font-bold">
                                Стаж
                            </span>
                            <span className="text-[12px]/[16px] lg:text-[18px]/[20px] font-normal">
                                От 2-х лет
                            </span>
                        </div>
                    </li>

                    <li className="flex-1  flex items-center gap-[6px] lg:gap-[10px] md:bg-[#FFFFFF0D] md:py-5 lg:py-7 md:px-10 rounded-[16px]">
                        <div className="lg:bg-[#F6F6F60D] md:p-2 lg:p-[15px] md:rounded-[8px]">
                            <AgeIcon className="w-9 h-9 xl:w-10 xl:h-10" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[14px]/[20px] lg:text-[18px]/[20px] font-bold">
                                Возраст
                            </span>
                            <span className="text-[12px]/[16px] lg:text-[18px]/[20px] font-normal">
                                От 22-х лет
                            </span>
                        </div>
                    </li>
                </ul>

                {/* (для десктопа) */}
                <div className="hidden lg:block mt-[18px] text-lg">
                    <p>
                        Полные условия аренды вы можете прочитать{' '}
                        <Link
                            href="/terms"
                            className="font-semibold underline underline-offset-4"
                        >
                            ЗДЕСЬ
                        </Link>
                    </p>
                </div>
            </section>

            <RentSteps />

            <GalleryCars
                similarCars={comfortCars}
                title="Комфорт"
                btnTitle="Все комфорт"
            />
            <GalleryCars
                similarCars={crossoversCars}
                title="Кроссоверы"
                btnTitle="Все кроссоверы"
            />
            <GalleryCars
                similarCars={businessCars}
                title="Бизнес"
                btnTitle="Все бизнес"
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
