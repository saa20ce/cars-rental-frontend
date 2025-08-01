import { DeliveryPriceTable, RentSteps } from '@/components/common/Cars';
import { AgeIcon, CarIcon, DocumentsIcon, LineIcon } from '@/lib/ui/icons';
import { getDeliveryPrice } from '@/lib/api/fetchCarData';
import Link from 'next/link';
import { WhyUs } from '@/components/common/Cards/WhyUs';
import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';
import CarouselControls from '@/lib/ui/common/CarouselControls';

export default async function Home() {
    const deliveryPrice = await getDeliveryPrice();

    return (
        <>
            <section>
                <div>
                    <span>Большой выбор</span>
                    <span>Обслуженные авто</span>
                    <span>КАСКО и ОСАГО</span>
                </div>
                {/* секция рекламы, не статика */}
                <div>
                    <div>
                        {/* <img src="" alt="" /> */}
                    </div>
                    <div>
                        <h2>Скидка 20%</h2>
                        <p>При аренде кроссоверов</p>
                        <div>От 5-ти суток</div>
                        <div>Срок действия акции до 31.01</div>
                    </div>
                </div>
                <div>
                    <h1>Арендуйте авто в Новосибирске</h1>
                    <p>
                        Арендуйте автомобиль в Новосибирске по выгодной цене от
                        1800 рублей/сутки
                    </p>
                    <div>
                        <Link href={'#'}>Автопарк</Link>
                        <Link href={'#'}>Трансфер</Link>
                    </div>
                    <Link href={'#'}>Аренда для Юридических лиц</Link>
                </div>
            </section>
            <section className="py-[42px] lg:py-[68px] border-t border-b border-[#284B63B2]">
                <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-4 lg:mb-6">
                    Классы:
                </h2>
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

            <section>
                {/* комфорт */}
                {/* зарефакторить SimilarCars (принимать заголовок, listCars, подпись и ссылка на кнопку после CarouselControls), и на странице авто получать класс*/}
            </section>
            <section>
                {/* Кроссоверы */}
            </section>
            <section>
                {/* бизнес */}
            </section>

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
