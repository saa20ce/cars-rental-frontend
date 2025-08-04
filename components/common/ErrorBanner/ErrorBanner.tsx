import { CloseErrorBannerIcon } from '@/lib/ui/icons/CloseErrorBannerIcon';
import { RedClose } from '@/lib/ui/icons/RedClose';
import { useEffect, useState } from 'react';

type ErrorBannerProps = {
    duration?: number;
};

export default function ErrorBanner({ duration = 5000 }: ErrorBannerProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    return (
        <div
            className={`  
        fixed z-50
        transition-all duration-500 ease-in-out
        p-[14px] rounded-xl
        bg-[#C7868A] text-[#0A1319] shadow-lg
        flex items-start justify-between gap-3

        ${visible ? 'opacity-100' : 'opacity-0'}

        top-4 left-1/2 -translate-x-1/2
        md:top-auto md:bottom-4 md:left-auto md:right-4 md:translate-x-0
      `}
        >
            <RedClose className="w-4 h-4 lg:w-5 lg:h-5 mt-1" />
            <div className="flex flex-col ">
                <span className="font-semibold text-[14px]/[20px] lg:text-[16px]/[24px]">
                    Что-то пошло не так.
                </span>
                <span className="font-normal text-[12px]/[16px] lg:text-[14px]/[20px] text-nowrap">
                    Попробуйте еще раз или подождите некоторое время.
                </span>
            </div>
            <button onClick={() => setVisible(false)}>
                <CloseErrorBannerIcon />
            </button>
        </div>
    );
}
