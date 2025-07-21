import { EmailIcon } from '@/lib/ui/icons/EmailIcon';
import { MarkerIcon } from '@/lib/ui/icons/MarkerIcon';
import { MobileIcon } from '@/lib/ui/icons/MobileIcon';

export default function ContactCard() {
  return (
    <section className="flex lg:gap-6 pt-[42px] lg:pt-[68px]">
      <div className="w-full lg:max-w-[730px]">
        <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
          Наши контакты:
        </h2>
        <ul className="text-[16px]/[24px] lg:text-[18px]/[28px] font-medium space-y-[10px] lg:space-y-3 list-disc ml-4">
          <li>Позвоните (номер на сайте) для консультации.</li>
          <li>Напишите на почту – ответим в течение нескольких часов.</li>
          <li>Оставьте заявку на аренду авто через форму на сайте.</li>
        </ul>
        <div className="w-full text-[16px]/[24px] lg:text-[18px]/[28px] font-bold mt-8 lg:mt-9 flex gap-4 lg:gap-5 flex-col lg:flex-row ">
          <a href='tel:+7(913)-913-28-08' className="rounded-[12px] bg-[#F6F6F60D] px-6 py-5 lg:px-2 flex items-center lg:max-w-[230px] lg:justify-center lg:flex-col lg:gap-5 gap-3 grow">
            <MobileIcon className="w-9 lg:w-[48px]" />
            <span className="text-nowrap">+ 7(913)-913-28-08</span>
          </a>
          <a href="mailto:rentasib54@gmail.com" className="rounded-[12px] bg-[#F6F6F60D] px-6 py-5 lg:px-2 flex items-center  lg:max-w-[230px] lg:justify-between lg:flex-col lg:gap-5 gap-3 grow">
            <EmailIcon className="w-9 lg:w-[48px]" />
            <span>rentasib54@gmail.com</span>
          </a>
          <a href="https://2gis.ru/novosibirsk/firm/70000001038917532?m=82.925675%2C55.014643%2F16" target="_blank"  className="rounded-[12px] bg-[#F6F6F60D] px-6 py-5 lg:px-2 flex items-center lg:max-w-[230px] lg:justify-center lg:flex-col lg:gap-5 gap-3 grow">
            <MarkerIcon className="w-9 h-9 lg:h-[48px]" />
            <span className="text-nowrap">Красный просп., 2/1</span>
          </a>
        </div>
      </div>
      <div className="hidden lg:flex grow">
        <div className="w-full max-w-[506px] min-w-[380px] aspect-[5/3] relative">
          <a
            href="https://2gis.ru/novosibirsk/firm/70000001038917532"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full rounded-[12px] overflow-hidden shadow-lg"
          >
            <img
              src="https://static.maps.2gis.com/1.0?center=82.9256,55.0153&zoom=15&size=600,400&markers=82.9256,55.0153"
              alt="Карта"
              className="w-full h-full object-cover"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
