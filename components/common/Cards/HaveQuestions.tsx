import { WhatsAppIcon, TelegramIcon, CallIcon } from "@/lib/ui/icons";


export const HaveQuestions = () => {
    return (
        <div>
            <div className="flex flex-col gap-3 mt-10">
                <div className="flex flex-wrap flex-row bg-[#1E384A] rounded-2xl lg:rounded-3xl px-6 py-7 lg:px-[60px] lg:py-[52px] lg:h-[256px] lg:flex-nowrap lg:items-center lg:justify-between lg:max-w-[1260px]">
                    <div className="pb-4 lg:pb-0 lg:w-[364px] lg:h-[132px]">
                        <div className="flex-wrap content-center font-bold text-[20px] lg:text-[36px] mb-5 lg:mb-5 leading-[28px] lg:leading-[40px]">
                            Остались вопросы?
                        </div>
                        <div className="flex-wrap content-center text-[16px] min-w-[311px] lg:w-[364px]">
                            Позвоните нам по телефону или напишите в чат и наш менеджер подробно ответит на все ваши вопросы<br className="block lg:hidden" /> и забронирует нужный автомобиль!
                        </div>
                    </div>
                    <div className="flex flex-wrap flex-row gap-[14px]  bg-[#1E384A] rounded-2xl lg:grid lg:grid-cols-3 lg:gap-4">
                        <div className="flex content-center bg-[#075E5466] rounded-2xl p-3 px-5 gap-[12px] w-full flex-wrap lg:flex-col lg:items-center lg:justify-center lg:h-[132px]">
                            <div>
                                <WhatsAppIcon />
                            </div>
                            <div className="flex-wrap content-center text-[16px] lg:text-[18px]" >
                                Написать в Whatsapp
                            </div>
                        </div>
                        <div className="flex content-center bg-[#0088CC66] rounded-2xl p-3 px-5 gap-[12px] w-full flex-wrap lg:flex-col lg:items-center lg:justify-center lg:h-[132px] lg:w-[228px]">
                            <div>
                                <TelegramIcon />
                            </div>
                            <div className="flex-wrap content-center text-[16px] lg:text-[18px]" >
                                Написать в Telegram
                            </div>
                        </div>
                        <div className="flex content-center bg-[#F6F6F60D] rounded-2xl p-3 px-5 gap-[12px] w-full flex-wrap lg:flex-col lg:items-center lg:justify-center lg:h-[132px]">
                            <div>
                                <CallIcon />
                            </div>
                            <div className="flex-wrap content-center text-[16px] lg:text-[18px]" >
                                Звонок менеджеру
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};