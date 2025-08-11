import { TelegramLogo, WhatsappLogo } from '@/lib/ui/icons';
import { MobileIcon } from '@/lib/ui/icons/MobileIcon';

export default function ContactCardsLittle() {
    return (
        <section className="py-[42px] lg:py-[68px]">
            <div className="w-full text-[16px]/[24px] lg:text-[18px]/[28px] font-bold flex gap-4 lg:gap-5 flex-col lg:flex-row justify-center">
                <a
                    href="tel:+7(913)-913-28-08"
                    aria-label="Позвонить по номеру +7 (913) 913-28-08"
                    className="rounded-[12px] bg-[#F6F6F60D] px-6 py-5 lg:py-[25px] lg:px-2 flex items-center lg:max-w-[230px] lg:justify-center lg:flex-col lg:gap-[14px] gap-3 grow"
                >
                    <MobileIcon className="w-9 h-9 lg:w-[48px] lg:h-[48px]" />
                    <span className="text-nowrap">+ 7(913)-913-28-08</span>
                </a>
                <a
                    href="https://wa.me/79139132808"
                    aria-label="Номер WhatsApp"
                    target="_blank"
                    className="rounded-[12px] bg-[#F6F6F60D] px-6 py-5 lg:px-2 flex items-center  lg:max-w-[230px] lg:justify-between lg:flex-col lg:gap-5 gap-3 grow"
                >
                    <WhatsappLogo className="w-9 h-9 lg:w-[48px] lg:h-[48px]" />
                    <span>+ 7(913)-913-28-08</span>
                </a>
                <a
                    href="https://t.me/Rentasib"
                    target="_blank"
                    aria-label="Номер Telegram"
                    className="rounded-[12px] bg-[#F6F6F60D] px-6 py-5 lg:px-2 flex items-center lg:max-w-[230px] lg:justify-center lg:flex-col lg:gap-5 gap-3 grow"
                >
                    <TelegramLogo className="w-9 h-9 lg:w-[48px] lg:h-[48px]" />
                    <span className="text-nowrap">+ 7(913)-913-28-08</span>
                </a>
            </div>
        </section>
    );
}
