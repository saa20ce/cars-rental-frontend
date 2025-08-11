import { WhatsAppIcon, TelegramIcon, CallIcon } from '@/lib/ui/icons';

export const HaveQuestions = () => {
    return (
        <section>
            <div className="flex flex-wrap flex-row gap-4 bg-[#1E384A] rounded-2xl lg:rounded-3xl px-6 py-7 lg:px-[60px] lg:py-[52px] lg:h-[256px] lg:flex-nowrap lg:items-center lg:justify-between lg:max-w-[1260px]">
                <div className="pb-4 lg:pb-0 w-full lg:max-w-[364px]">
                    <h2 className="font-bold text-[20px] lg:text-[36px] mb-5 leading-[28px] lg:leading-[40px]">
                        Остались вопросы?
                    </h2>
                    <p className="text-[16px] ">
                        Позвоните нам по телефону или напишите в чат, и наш
                        менеджер подробно ответит на все ваши вопросы
                        <br className="block lg:hidden" />и забронирует нужный
                        автомобиль!
                    </p>
                </div>

                <div className="flex flex-wrap flex-row w-full  gap-[14px] bg-[#1E384A] rounded-3xl lg:grid lg:grid-cols-3 lg:gap-4 lg:max-w-[702px]">
                    <a
                        href="https://wa.me/79139132808"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Написать в WhatsApp"
                        className="flex items-center bg-[#075E5466] rounded-[12px] p-3 px-5 gap-[12px] w-full lg:flex-col lg:justify-center lg:h-[132px]"
                    >
                        <WhatsAppIcon className="w-[40px] h-[41px] lg:w-[52px] lg:h-[52px]" />
                        <span className="text-[16px] lg:text-[18px] text-center">
                            Написать в WhatsApp
                        </span>
                    </a>

                    <a
                        href="https://t.me/Rentasib"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Написать в Telegram"
                        className="flex items-center bg-[#0088CC66] rounded-[12px] p-3 px-5 gap-[12px] w-full lg:flex-col lg:justify-center lg:h-[132px] "
                    >
                        <TelegramIcon className="w-[40px] h-[41px] lg:w-[52px] lg:h-[52px]" />
                        <span className="text-[16px] lg:text-[18px] text-center">
                            Написать в Telegram
                        </span>
                    </a>

                    <a
                        href="tel:89139132808"
                        aria-label="Позвонить менеджеру"
                        className="flex items-center bg-[#00B8CC66] rounded-[12px] p-3 px-5 gap-[12px] w-full w-full lg:flex-col lg:justify-center lg:h-[132px]"
                    >
                        <CallIcon />
                        <span className="text-[16px] lg:text-[18px] text-center">
                            Звонок менеджеру
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
};
