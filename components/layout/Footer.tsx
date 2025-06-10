import { RentaSibLogo, TelegramIcon, VkIcon, WhatsAppIcon, PhoneIconDefault, SmartphoneIcon, MailIcon, PointerIcon, DzenIcon, VkMiniIcon, ChevronRightIcon} from "@/lib/ui/icons";
import { Button, ConfigProvider } from 'antd';

export const Footer: React.FC = () => {
    return (
        <div className="mt-[56px]">
            <div className='flex flex-col gap-3 mb-[12px] lg:gap-5 lg:mb-5'>
                <div className="flex text-[18px] font-medium justify-between">
                    <div>Разделы сайта <ChevronRightIcon width={10} height={20} /></div>
                    <div className="underline underline-offset-[6px]">Наш блог</div>
                </div>
                
                <div className=" lg:block w-full border-t-2 border-double border-[#284B63B2] h-[1px] my-4"></div>
            </div>

            <div className='flex flex-col lg:flex-row gap-[20px] lg:gap-[95px]'>
                <div className=" lg:flex-1">
                    <div>
                        <RentaSibLogo />
                    </div>
                    <div>
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-row gap-3 items-center mt-5">
                                <div>
                                    <TelegramIcon className="w-[30px] h-[30px] lg:w-[30px] lg:h-[30px]" />
                                </div>
                                <div>
                                    <WhatsAppIcon className="w-[30px] h-[30px] lg:w-[30px] lg:h-[30px]" />
                                </div>
                            
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            contentFontSize: 16,
                                            defaultHoverBorderColor: '#fff',
                                            defaultHoverColor: '#fff',
                                            paddingInline: 12,
                                            paddingBlock: 8,
                                            lineHeight: 0,
                                            fontFamily: '"lato", "lato Fallback"',
                                        },
                                    },
                                }}
                            >
                                <Button
                                    variant='outlined'
                                    icon={<PhoneIconDefault />}
                                    style={{ height: 40, width: 170, borderRadius: 12 }}
                                    ghost
                                >
                                    Заказать звонок
                                </Button>
                            </ConfigProvider>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap text-lg mt-9 gap-[10px] text-[18px]">
                        <div>Бронирование: 9:00 - 22:00 <span className="text-[#9ca3af]">(Нск)</span></div>
                        <div>Офис: 9:00 - 22:00 <span className="text-[#9ca3af]">(Нск)</span></div>
                    </div>
                </div>

                <div className=" lg:hidden w-full border-t-2 border-double border-[#284B63B2] h-[1px]"></div>
                <div className="flex flex-col lg:flex-row gap-[36px] lg:gap-[95px]">
                    <div className="flex justify-between gap-9 lg:gap-[95px] text-[18px] lg:flex-1">
                        <div>
                            <ul className="space-y-2">
                                <li><a href="#">Главная</a></li>
                                <li><a href="#">Автопарк</a></li>
                                <li><a href="#">Тарифы</a></li>
                                <li><a href="#">Услуги</a></li>
                                <li><a href="#">О нас</a></li>
                                <li><a href="#">Отзывы</a></li>
                            </ul>
                        </div>
                        <div>
                            <ul className="space-y-2">
                                <li><a href="#">Написать директору</a></li>
                                <li><a href="#">Вопрос-ответ</a></li>
                                <li><a href="#">Аренда для юридических лиц</a></li>
                                <li><a href="#">Договор аренды</a></li>
                                <li><a href="#">Условия</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="lg:flex-2">
                        <div className=" gap-2 flex items-center">
                            <div>
                                <SmartphoneIcon />
                            </div>
                            <div className="underline underline-offset-4 decoration-5 font-medium">
                                +7(913)-913-28-08
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3 items-center">
                            <div>
                                <MailIcon />
                            </div>
                            <div>
                                rentasib54@gmail.com
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3 items-center">
                            <div>
                                <PointerIcon />
                            </div>
                            <div>
                                Красный просп., 2/1
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:flex lg:flex-col lg:justify-start"> 
                    <div className="flex gap-5 text-[20px] font-regular lg:flex-col lg:gap-3"> 
                        <div className="flex gap-3">
                            <div><VkMiniIcon /></div>
                            <div className="underline decoration-1 underline-offset-[6px]">
                                <a href="#">Vk</a>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div><DzenIcon /></div>
                            <div className="underline decoration-1 underline-offset-[6px]">
                                <a href="#">Дзен</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-9 text-[#9CA3AF] font-regular lg:flex lg:items-center lg:gap-6 lg:justify-between" > {/* Flex в строку с отступами 6 */}
                <div>© ООО «Рентасиб», 2020—2025</div>
                <div className="lg:flex lg:items-center lg:gap-6">
                    <div className="underline underline-offset-4">
                        Политика конфиденциальности
                    </div>
                    <div className="underline underline-offset-4">
                        Условия обработки персональных данных
                    </div>
                </div>
            </div>
        </div>
    );
};