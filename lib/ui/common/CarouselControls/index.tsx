import { Button, ConfigProvider } from 'antd';
import { ArrowLeftIcon, ArrowRightIcon } from '../../icons';

export default function CarouselControls({
    ref,
}: {
    ref: React.RefObject<HTMLUListElement | null>;
}) {
    const goNext = () => {
        const container = ref.current;
        if (!container) return;

        const step = container.clientWidth;
        container.scrollBy({ left: step, behavior: 'smooth' });
    };

    const goPrev = () => {
        const container = ref.current;
        if (!container) return;

        const step = container.clientWidth;
        container.scrollBy({ left: -step, behavior: 'smooth' });
    };
    return (
        <div className="flex gap-3">
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            defaultBg: '#f6f6f60e',
                            defaultBorderColor: 'transparent',
                            defaultColor: '#f6f6f6',
                            textHoverBg: '#f6f6f6',
                            colorPrimaryHover: '#f6f6f6',
                            colorBorderSecondary: 'transparent',
                            colorBorderBg: '#f6f6f60e',
                            colorBgContainer: '#f6f6f60e',
                            colorPrimaryBorderHover: 'transparent',
                            defaultHoverBorderColor: 'transparent',
                            defaultActiveBorderColor: 'transparent',
                            defaultActiveColor: '#f6f6f6',
                            colorBorder: 'transparent',
                            colorBgTextActive: '#f6f6f60e',
                        },
                    },
                }}
            >
                <Button
                    onClick={goPrev}
                    icon={
                        <ArrowLeftIcon className='w-[15px] h-6' />
                    }
                    aria-label="Прокрутить назад"
                    style={{
                        height: '44px',
                        width: '44px',
                        fontSize: '16px',
                        borderRadius: '8px',
                    }}
                />
                <Button
                    onClick={goNext}
                    icon={
                        <ArrowRightIcon className='w-[15px] h-6' />
                    }
                    aria-label="Прокрутить вперед"
                    style={{
                        height: '44px',
                        width: '44px',
                        fontSize: '16px',
                        borderRadius: '8px',
                    }}
                />
            </ConfigProvider>
        </div>
    );
}
