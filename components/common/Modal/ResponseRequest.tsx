import { SucsessIcon } from '@/lib/ui/icons/SucsessIcon';
import { Button, ConfigProvider } from 'antd';

export default function ResponseRequest({
    onClick,
    request = 'success',
}: {
    onClick: () => void;
    request?: 'idle' | 'loading' | 'success' | 'error';
}) {
    console.log(request);
    
    return (
        <section className="text-center p-6 text-white  flex-center">
            <div className="w-full max-w-[360px] lg:max-w-[515px] bg-[#284B63] rounded-[16px] py-7 px-6 lg:py-[38px] lg:px-9 ">
                <div className="lg:flex lg:flex-row lg:items-center lg:gap-6 lg:mb-9">
                    <SucsessIcon className="w-[82px] h-[82px] hidden lg:block" />
                    <div className="flex flex-col lg:text-left">
                        {request === 'success' && (
                            <>
                                <div className="flex-center gap-4 mb-4 lg:justify-start">
                                    <SucsessIcon className="lg:hidden" />
                                    <h2 className="text-[20px]/[28px] lg:text-[24px]/[32px] font-bold">
                                        Ваша заявка принята!
                                    </h2>
                                </div>
                                <p className="text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold mb-2 tracking-normal text-nowrap">
                                    Мы свяжемся с вами в течение 5 минут
                                </p>
                            </>
                        )}
                        {request === 'error' && (
                            <>
                                <div className="flex-center gap-4 mb-4 lg:justify-start">
                                    <SucsessIcon className="lg:hidden" />
                                    <h2 className="text-[20px]/[28px] lg:text-[24px]/[32px] font-bold">
                                        Ошибка при отправке заявки! 
                                    </h2>
                                </div>
                                <p className="text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold mb-2 tracking-normal text-nowrap">
                                    Попробуйте позже
                                </p>
                            </>
                        )}
                        {/* <p className="text-[14px]/[20px] lg:text-[16px]/[24px] font-normal mb-7 lg:mb-0">
                            * Заявка не является бронированием
                        </p> */}
                    </div>
                </div>
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                defaultBg: '#3c6e71',
                                defaultBorderColor: '#3c6e71',
                                defaultColor: '#f6f6f6',
                                contentFontSize: 16,
                                controlHeight: 42,
                                textHoverBg: '#f6f6f6',
                                colorPrimaryHover: '#f6f6f6',
                                colorBorderSecondary: '#3c6e71',
                                colorBorderBg: '#3c6e71',
                                colorBgContainer: '#3c6e71',
                                colorPrimaryBorderHover: '#3c6e71',
                                defaultHoverBorderColor: '#3c6e71',
                                defaultActiveBorderColor: '#3c6e71',
                                defaultActiveColor: '#f6f6f6',
                                colorBorder: '#3c6e71',
                                colorBgTextActive: '#3c6e71',
                            },
                        },
                    }}
                >
                    <Button
                        className="rounded-xl lg:text-xl lg:h-[60px] lg:rounded-2xl"
                        block
                        onClick={onClick}
                    >
                        Хорошо
                    </Button>
                </ConfigProvider>
            </div>
        </section>
    );
}
