import {
    RentaSibLogo,
    TelegramIcon,
    WhatsAppIcon,
    SmartphoneIcon,
    MailIcon,
    PointerIcon,
    DzenIcon,
    VkMiniIcon,
    ChevronRightIcon,
} from '@/lib/ui/icons';
import Link from 'next/link';
import ModalTrigger from '../common/Modal/ModalTrigger';

export const Footer: React.FC = () => {
    return (
        <div className="mt-[56px]">
            <div className="flex flex-col gap-3 mb-[12px] lg:gap-5 lg:mb-5">
                <div className="flex text-[18px] lg:text-[24px] font-[600] justify-between">
                    <div>
                        Разделы сайта{' '}
                        <ChevronRightIcon width={10} height={32} />
                    </div>
                    <div className="underline underline-offset-[6px]">
                        Наш блог
                    </div>
                </div>

                <div className=" lg:block w-full border-t-2 border-double border-[#284B63B2] h-[1px] my-4"></div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between">
                <div className=" lg:flex-1 lg:max-w-[297px] mb">
                    <div>
                        <RentaSibLogo />
                    </div>
                    <div>
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-row gap-5 lg:gap-5 items-center mt-5 ml-[14px] lg:ml-0 ">
                                <a
                                    href="https://t.me/Rentasib"
                                    target="_blank"
                                    className="w-[30px] h-[31px] lg:w-[30px] lg:h-[31px]"
                                >
                                    <TelegramIcon className="w-[30px] h-[31px] lg:w-[30px] lg:h-[31px]" />
                                </a>
                                <a
                                    href="https://wa.me/79139132808"
                                    target="_blank"
                                    className="w-[30px] h-[31px] lg:w-[30px] lg:h-[31px]"
                                >
                                    <WhatsAppIcon className="w-[30px] h-[31px] lg:w-[30px] lg:h-[31px]" />
                                </a>
                                <ModalTrigger className="w-[170px] lg:w-[196px] py-2 lg:py-[9px] text-[16px]/[24px] lg:text-[18px]/[30px]" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col text-lg mt-9 gap-[10px] text-[18px] lg:text-[16px]">
                        <div>
                            Бронирование:
                            <span className="ml-[10px]">9:00 - 22:00</span>
                            <span className="text-[#9ca3af]"> (Нск)</span>
                        </div>
                        <div>
                            Офис:<span className="ml-[10px]">9:00 -22:00</span>{' '}
                            <span className="text-[#9ca3af]"> (Нск)</span>
                        </div>
                    </div>
                </div>

                <div className=" lg:hidden w-full border-t-2 border-double border-[#284B63B2] h-[1px] my-5"></div>

                {/* Блок для десктоп */}
                <div className="text-[16px]/[28px] hidden lg:block">
                    <ul className="space-y-2 lg:leading-7">
                        <li>
                            <Link href="/">Главная</Link>
                        </li>
                        <li>
                            <Link href="/cars">Автопарк</Link>
                        </li>
                        <li>
                            <Link href="/tariffs">Тарифы</Link>
                        </li>
                        <li>
                            <Link href="#">Услуги</Link>
                        </li>
                        <li>
                            <Link href="/about">О нас</Link>
                        </li>
                        <li>
                            <Link href="#">Отзывы</Link>
                        </li>
                    </ul>
                </div>
                <div className="text-[16px]/[28px] hidden lg:block">
                    <ul className="space-y-2 lg:leading-7 w-[176px] lg:w-[140px]">
                        <li>
                            <Link href="/faq">Вопрос-ответ</Link>
                        </li>
                        <li>
                            <Link href="#">Аренда для юридических лиц</Link>
                        </li>
                        <li>
                            <Link href="#">Договор аренды</Link>
                        </li>
                        <li>
                            <Link href="/terms">Условия</Link>
                        </li>
                    </ul>
                </div>

                {/* Блок для мобилки */}
                <div className="lg:hidden flex gap-9 text-[16px]/[24px] font-normal mb-9">
                    <ul className="space-y-2 lg:leading-7">
                        <li>
                            <Link href="/">Главная</Link>
                        </li>
                        <li>
                            <Link href="/cars">Автопарк</Link>
                        </li>
                        <li>
                            <Link href="/tariffs">Тарифы</Link>
                        </li>
                        <li>
                            <Link href="#">Услуги</Link>
                        </li>
                        <li>
                            <Link href="/about">О нас</Link>
                        </li>
                        <li>
                            <Link href="#">Отзывы</Link>
                        </li>
                    </ul>
                    <ul className="space-y-2 lg:leading-7 w-[176px] lg:w-[165px]">
                        <li>
                            <Link href="/faq">Вопрос-ответ</Link>
                        </li>
                        <li>
                            <Link href="#">Аренда для юридических лиц</Link>
                        </li>
                        <li>
                            <Link href="#">Договор аренды</Link>
                        </li>
                        <li>
                            <Link href="/terms">Условия</Link>
                        </li>
                    </ul>
                </div>

                <div className="">
                    <div className=" gap-2 flex items-center">
                        <div>
                            <SmartphoneIcon />
                        </div>
                        <div className="underline underline-offset-4 decoration-5 font-[400] lg:font-[600] text-[16px] lg:text-[18px] lg:underline lg:underline-offset-4 decoration-5">
                            <a href="tel:+7(913)-913-28-08">
                                +7(913)-913-28-08
                            </a>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-3 items-center text-[16px] lg:text-[18px]">
                        <div>
                            <MailIcon />
                        </div>
                        <div>
                            <a href="mailto:rentasib54@gmail.com">
                                rentasib54@gmail.com
                            </a>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-3 items-center text-[16px] lg:text-[18px]">
                        <div>
                            <PointerIcon />
                        </div>
                        <div>
                            <a
                                href="https://2gis.ru/novosibirsk/firm/70000001038917532?m=82.925675%2C55.014643%2F16"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Красный просп., 2/1
                            </a>
                        </div>
                    </div>
                </div>

                <div className="lg:flex lg:flex-col lg:justify-start mt-6 lg:mt-0">
                    <div className="flex gap-5 text-[20px] font-regular lg:flex-col lg:gap-3 ml-1 lg:ml-0 mt-1 lg:mt-0">
                        <div className="flex gap-3">
                            <div>
                                <VkMiniIcon />
                            </div>
                            <div className="underline decoration-1 underline-offset-[6px] text-[20px] lg:text-[18px]">
                                <a
                                    href="https://vk.com/rentasib"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Vk
                                </a>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div>
                                <DzenIcon />
                            </div>
                            <div className="underline decoration-1 underline-offset-[6px] text-[20px] lg:text-[18px]">
                                <a
                                    href="https://dzen.ru/rentasib"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Дзен
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-9 text-[#9CA3AF] font-regular lg:flex lg:items-center lg:gap-6 lg:justify-between mb-[150px]">
                <div className=" text-[#9CA3AF] font-bold tracking-wide">
                    © ООО «Рентасиб», 2020—2025
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6 mt-3 lg:mt-0">
                    <a
                        href="#"
                        className="underline underline-offset-4 mb-1 lg:mb-0"
                    >
                        Политика конфиденциальности
                    </a>
                    <a href="#" className="underline underline-offset-4">
                        Условия обработки персональных данных
                    </a>
                </div>
            </div>
        </div>
    );
};
