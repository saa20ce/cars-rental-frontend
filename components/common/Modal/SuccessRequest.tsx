import { SucsessIcon } from '@/lib/ui/icons/SucsessIcon';
import { Button, ConfigProvider } from 'antd';

export default function SuccessRequest({
    onClick,
    reservation = false,
}: {
    onClick: () => void;
    reservation?: boolean;
}) {
    return (
        <section className="text-center p-6 text-white  flex-center">
            <div className="w-[360px] lg:w-[456px] bg-[#284B63] rounded-[16px] py-7 px-6 lg:py-[38px] lg:px-9 ">
                <div className="flex flex-col lg:items-center mb-8 lg:mb-9">
                    <>
                        <div className="flex-center gap-4 mb-4 lg:mb-5">
                            <SucsessIcon className="w-[42px] h-[42px] lg:w-[48px] lg:h-[48px]" />
                            <h2 className="text-[20px]/[28px] lg:text-[24px]/[32px] font-bold">
                                Ваша заявка принята!
                            </h2>
                        </div>
                        <p
                            className={`text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold ${reservation ? 'mb-2 lg:mb-[10px]' : ''}  tracking-normal text-nowrap`}
                        >
                            Мы свяжемся с вами в течение 5 минут
                        </p>
                        {reservation && (
                            <p className="text-[14px]/[20px] lg:text-[16px]/[24px] font-normal">
                                * Заявка не является бронированием
                            </p>
                        )}
                    </>
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
                        className="rounded-xl lg:text-xl lg:h-[44px] lg:rounded-2xl"
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
