import ContactForm from '@/components/common/Form/ContactForm';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import { MaxIcon, TelegramIcon, VkIcon, VkLogo, VkMiniIcon } from '@/lib/ui/icons';
import { EmailIcon } from '@/lib/ui/icons/EmailIcon';
import { MarkerIcon } from '@/lib/ui/icons/MarkerIcon';
import { MobileIcon } from '@/lib/ui/icons/MobileIcon';
import Image from 'next/image';

export async function generateMetadata() {
    return await fetchWPMetadata('/contacts');
}

export default async function ContactsPage() {
    const breadcrumbs = await fetchBreadcrumbs('/contacts');
    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />

            <section className="flex lg:gap-6">
                <div className="w-full lg:max-w-[730px]">
                    <h1 className="text-[24px]/[32px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                        Наши контакты
                    </h1>
                    <div>
                        <dl className="text-[16px]/[24px] lg:text-[18px]/[28px] font-medium space-y-[10px] lg:space-y-3">
                            <div className="flex text-[14px]/[20px] lg:text-[18px]/[28px] font-medium gap-2">
                                <dt>Бронирование:</dt>
                                <dd>9:00 - 20:00</dd>
                            </div>
                            <div className="flex text-[14px]/[20px] lg:text-[18px]/[28px] font-medium gap-2">
                                <dt>Офис:</dt>
                                <dd>9:00 - 20:00</dd>
                            </div>
                        </dl>
                        <p className="text-[14px]/[20px] lg:text-[18px]/[28px] font-medium mt-[10px] lg:mt-3">
                            Круглосуточная доставка автомобилей по
                            предварительному бронированию от 2000₽
                        </p>
                    </div>

                    <div className="w-full text-[16px]/[24px] lg:text-[18px]/[28px] font-bold mt-8 lg:mt-9 flex gap-4 lg:gap-5 flex-col lg:flex-row">
                        <a
                            href="tel:+7(913)-913-28-08"
                            aria-label="Позвонить по номеру +7 (913) 913-28-08"
                            className="rounded-[12px] bg-[#F6F6F60D] px-6 py-5 lg:px-2 flex items-center lg:max-w-[230px] lg:justify-center lg:flex-col lg:gap-5 gap-3 grow"
                        >
                            <MobileIcon className="w-9 h-[36px] lg:h-[48px] lg:w-[48px]" />
                            <span className="text-nowrap">
                                + 7(913)-913-28-08
                            </span>
                        </a>
                        <a
                            href="mailto:rentasib54@gmail.com"
                            aria-label="Написать письмо на адрес rentasib54@gmail.com"
                            className="rounded-[12px] bg-[#F6F6F60D] px-6 py-5 lg:px-2 flex items-center lg:max-w-[230px] lg:justify-between lg:flex-col lg:gap-5 gap-3 grow"
                        >
                            <EmailIcon className="w-9 h-[36px] lg:h-[48px] lg:w-[48px]" />
                            <span>rentasib54@gmail.com</span>
                        </a>
                        <a
                            href="https://2gis.ru/novosibirsk/firm/70000001038917532?m=82.925675%2C55.014643%2F16"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Посмотреть расположение офиса на карте в Новосибирске, Красный проспект 2/1"
                            className="rounded-[12px] bg-[#F6F6F60D] px-6 py-5 lg:px-2 flex items-center lg:max-w-[230px] lg:justify-center lg:flex-col lg:gap-5 gap-3 grow"
                        >
                            <MarkerIcon className="w-9 h-9 lg:h-[48px]" />
                            <span className="text-nowrap">
                                Красный просп., 2/1
                            </span>
                        </a>
                    </div>

                    <h2 className="text-[24px]/[32px] lg:text-[30px]/[36px] font-bold mt-[32px] lg:mt-[46px] mb-[20px] lg:mb-[24px]">
                        Наши соц-сети
                    </h2>
                    <div className="w-full text-[16px]/[24px] lg:text-[18px]/[28px] font-bold mt-8 lg:mt-9 flex gap-[12px] lg:gap-5 flex-col lg:flex-row">
                        <a
                            href="https://max.ru/u/f9LHodD0cOJl7vaA90ej_c-ng7J4Tpfbi4tBmaGo9A-R2NE74nwHaaX0WQk"
                            target="_blank"
                            aria-label="Позвонить по номеру +7 (913) 913-28-08"
                            className="rounded-[12px] bg-[#075E5466] px-[20px] py-[18px] lg:px-[20px] lg:py-4 flex items-center lg:max-w-[230px] lg:justify-start flex-row lg:gap-[12px] gap-3 grow"
                        >
                            <MaxIcon className="w-9 h-[36px] lg:w-[36px]" />
                            <span className="text-nowrap lg:text-[18px]/[28px]">
                                Мах
                            </span>
                        </a>
                        <a
                            href="https://t.me/Rentasib"
                            target="_blank"
                            aria-label="Написать письмо на адрес rentasib54@gmail.com"
                            className="rounded-[12px] bg-[#0088CC66] px-[20px] py-[18px] lg:px-[20px] lg:py-4 flex items-center lg:max-w-[230px] lg:justify-start flex-row lg:gap-[12px] gap-3 grow"
                        >
                            <TelegramIcon className="w-9 h-[36px] lg:w-[36px] lg:h-[36px]" />
                            <span className="text-nowrap lg:text-[18px]/[28px]">
                                Telegram
                            </span>
                        </a>
                        <a
                            href="https://vk.com/rentasib"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Посмотреть расположение офиса на карте в Новосибирске, Красный проспект 2/1"
                            className="rounded-[12px] bg-[#8AB1FF66] px-[20px] py-[18px] lg:px-[20px] lg:py-4 flex items-center lg:max-w-[230px] lg:justify-start flex-row lg:gap-[12px] gap-3 grow"
                        >
                            <VkLogo className="w-9 h-[36px] lg:w-[36px]" />
                            <span className="text-nowrap lg:text-[18px]/[28px]">
                                ВК
                            </span>
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
                            aria-label="Открыть карту расположения офиса"
                        >
                            <img
                                src="https://static.maps.2gis.com/1.0?center=82.9256,55.0153&zoom=15&size=600,400&markers=82.9256,55.0153"
                                alt="Карта расположения офиса по адресу Красный просп., 2/1"
                                className="w-full h-full object-cover"
                            />
                        </a>
                    </div>
                </div>
            </section>
            <section className="flex  gap-6 py-[42px] lg:py-[68px] border-t border-b border-[#284B63B2] items-stretch mt-[42px] lg:mt-[68px]">
                <div className="relative hidden lg:block aspect-auto w-1/2 rounded-[20px] overflow-hidden flex-1">
                    <Image
                        fill
                        alt="Рукопожатие, символизирующее сотрудничество"
                        src={'/images/handshake.webp'}
                        className="object-cover"
                    />
                </div>
                <article className="lg:w-1/2 max-w-[507px] flex-1 text-[14px]/[20px] lg:text-[16px]/[24px] font-medium lg:font-normal">
                    <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                        Реквизиты:
                    </h2>
                    <h3 className="mb-[10px] sm:mb-3 text-[16px]/[24px] sm:text-[18px]/[28px] font-semibold">
                        ООО «РЕНТАСИБ»
                    </h3>
                    <dl className="flex flex-col gap-[10px] lg:gap-3">
                        <div className="flex flex-col text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold gap-[6px] sm:gap-2 sm:flex-row">
                            <dt className="text-[#F6F6F699]">Юр. адрес:</dt>
                            <dd>
                                РФ, 630102, г. Новосибирск, ул. Инская 3, к.18
                            </dd>
                        </div>
                        <div className="flex flex-col text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold gap-[6px] sm:gap-2 sm:flex-row">
                            <dt className="text-[#F6F6F699]">ИНН:</dt>
                            <dd>5405065213</dd>
                        </div>
                        <div className="flex flex-col text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold gap-[6px] sm:gap-2 sm:flex-row">
                            <dt className="text-[#F6F6F699]">КПП:</dt>
                            <dd>540501001</dd>
                        </div>
                        <div className="flex flex-col text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold gap-[6px] sm:gap-2 sm:flex-row">
                            <dt className="text-[#F6F6F699]">ОГРН:</dt>
                            <dd>1215400028238</dd>
                        </div>
                        <div className="flex flex-col text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold gap-[6px] sm:gap-2 sm:flex-row">
                            <dt className="text-[#F6F6F699]">Р/счет:</dt>
                            <dd>№ 40702810013410001297</dd>
                        </div>
                        <div className="flex flex-col text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold gap-[6px] sm:gap-2 sm:flex-row">
                            <dt className="text-[#F6F6F699]">Банк:</dt>
                            <dd>ФИЛИАЛ “ЦЕНТРАЛЬНЫЙ” БАНКА ВТБ (ПАО)</dd>
                        </div>
                        <div className="flex flex-col text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold gap-[6px] sm:gap-2 sm:flex-row">
                            <dt className="text-[#F6F6F699]">Кор. счет:</dt>
                            <dd>30101810145250000411</dd>
                        </div>
                        <div className="flex flex-col text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold gap-[6px] sm:gap-2 sm:flex-row">
                            <dt className="text-[#F6F6F699]">БИК:</dt>
                            <dd>044525411</dd>
                        </div>
                    </dl>
                </article>
            </section>

            <ContactForm />
        </>
    );
}
