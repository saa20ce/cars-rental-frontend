import { WhatsAppIcon, TelegramIcon, CallIcon } from '@/lib/ui/icons';

export const HaveQuestions = () => {
    return (
        <section>
            <div className="flex flex-wrap flex-row gap-4 bg-[#1E384A] rounded-2xl lg:rounded-3xl px-6 py-7 lg:px-[48px] lg:py-[68px] lg:h-[268px] lg:flex-nowrap lg:items-center lg:justify-between lg:max-w-[1260px]">
                <div className="pb-4 lg:pb-0 w-full lg:max-w-[394px]">
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
                        className="flex items-center bg-[#075E5466] rounded-[12px] p-3 px-5 gap-[12px] w-full lg:flex-col lg:justify-center lg:h-[128px]"
                    >
                        <WhatsAppIcon className='w-9 h-9 lg:w-12 lg:h-12' />
                        <span className="text-[16px] lg:text-[18px] font-bold text-center">
                            Написать в WhatsApp
                        </span>
                    </a> 

                    <a
                        href="https://t.me/Rentasib"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Написать в Telegram"
                        className="flex items-center bg-[#0088CC66] rounded-[12px] p-3 px-5 gap-[12px] w-full lg:flex-col lg:justify-center lg:h-[128px]"
                    >
                        <TelegramIcon className='w-9 h-9 lg:w-12 lg:h-12' />
                       <span className="text-[16px] lg:text-[18px] font-bold text-center">
                            Написать в Telegram
                        </span>
                    </a>

                    <a
                        href="tel:89139132808"
                        aria-label="Позвонить менеджеру"
                        className="flex items-center bg-[#00B8CC66] rounded-[12px] p-3 px-5 gap-[12px] w-full lg:flex-col lg:justify-center lg:h-[128px]"
                    >
                        <CallIcon className='w-9 h-9 lg:w-12 lg:h-12'/>
                        <span className="text-[16px] lg:text-[18px] font-bold text-center">
                            Звонок менеджеру
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
};
