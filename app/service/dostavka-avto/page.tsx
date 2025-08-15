import AdditionalServicesCards from '@/components/common/Cards/AdditionalServicesCards';
import RentalTerms from '@/components/common/Cards/RentalTerms';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import TextImageSection from '@/components/common/TextImageSection/TextImageSection';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { getDeliveryPrice } from '@/lib/api/fetchCarData';
import {
    listCarRentalWithDelivery,
    servicesItems,
} from '@/lib/data/itemsCards';
import { ArrowRightLinkIcon, LineIcon } from '@/lib/ui/icons';
import Link from 'next/link';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import { DeliveryPriceTable } from '@/components/common/Cars';
import MapPriceDelivery from '@/components/common/MapPriceDelivery/MapPriceDelivery';

export async function generateMetadata() {
    return await fetchWPMetadata('/service/dostavka-avto');
}
const paragraphsSection1 = [
    'Аренда авто с доставкой по городу – это удобный и быстрый способ арендовать автомобиль без лишних забот. Вы можете выбрать подходящий для вас автомобиль из широкого ассортимента нашего автопарка, и мы доставим его прямо к вашему адресу.',
    'Будь то бизнес-встреча, отпуск или поездка на дачу, мы сделаем все возможное, чтобы обеспечить вас качественным и удобным автомобилем.',
    'Наша команда готова ответить на все ваши вопросы и помочь в выборе автомобиля.',
];
const paragraphsSection2 = [
    'Компания Рентасиб предоставляет услугу аренды авто с доставкой по указанному адресу в Новосибирске. Это удобно, если вам необходимо получить автомобиль не в офисе компании, а в определенном месте города.',
    'Доставка осуществляется точно в указанное время, что позволит вам сэкономить свое время и избежать лишних неудобств.',
    <Link
        href={'/cars'}
        className="font-medium text-[16px]/[24px] lg:text-[18px]/[28px] border border-[#f6f6f6] rounded-[12px] lg:rounded-[16px] w-[94px] lg:w-[111px] h-10 lg:h-11 flex-center mt-8 lg:mt-9"
    >
        Заказать
    </Link>,
];
const paragraphsSection3 = [
    'Для аренды авто с доставкой в Новосибирске есть два простых способа: оформить заказ на сайте или по телефону.',
    'На сайте вы можете выбрать подходящий автомобиль и указать адрес доставки. Если вам удобнее, вы также можете заказать авто по телефону и оператор поможет вам выбрать наиболее подходящий автомобиль и оформить заказ.',
    'В любом случае, процесс аренды авто с доставкой в Новосибирске быстрый и простой.',
];
const paragraphsSection4 = [
    'Аренда авто с доставкой не только позволяет сэкономить время и усилия на поездки до пункта проката, но и дает возможность насладиться удобством и комфортом перемещения в новом городе.',
    'Кроме того, такой трансфер гарантирует конфиденциальность и безопасность, что особенно важно для иностранных туристов.',
    'При аренде авто с доставкой в Новосибирске вы можете заказать встречу в аэропорту или на ж/д вокзале, что существенно облегчит вашу поездку.',
];

export default async function CarRentalWithDelivery() {
    const breadcrumbs = await fetchBreadcrumbs('/service/dostavka-avto');
    const deliveryPrice = await getDeliveryPrice();

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />

            <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                Аренда авто с доставкой в Новосибирске: все, что нужно знать
            </h1>

            <p className="font-semibold text-[16px]/[24px] lg:text-[20px]/[28px] pb-[42px] lg:pb-[36px] border-b border-[#284B63B2] -tracking-[0.2px]">
                Аренда автомобиля с доставкой по указанному адресу становится
                все более популярной услугой среди жителей и гостей
                Новосибирска. Это удобный способ получить автомобиль без
                необходимости самостоятельного посещения прокатной компании.
                Однако, перед тем как воспользоваться этой услугой, необходимо
                ознакомиться с некоторыми особенностями и условиями, чтобы
                избежать недоразумений и неудобств в процессе аренды.
            </p>

            <section className="py-[42px] lg:py-[68px]">
                <MapPriceDelivery />
                <div className="flex flex-row ">
                    <h2 className="text-xl font-bold lg:text-3xl">
                        Стоимость доставки авто:
                    </h2>
                    <div className="hidden lg:block ml-4 mt-[6px]">
                        <LineIcon />
                    </div>
                    <div className="hidden text-[#FFD7A6] lg:block text-2xl ml-4 mt-[2px]">
                        Доставка 24/7
                    </div>
                </div>
                <DeliveryPriceTable deliveryPrice={deliveryPrice} />
                <p className="font-semibold text-[16px]/[24px] lg:text-[20px]/[28px] my-6 lg:mt-9 lg:mb-5">
                    Не сомневайтесь, аренда авто с доставкой в Новосибирске –
                    это удобно и быстро!
                </p>
                <Link
                    href={'/cars'}
                    className="font-medium text-[16px]/[24px] lg:text-[18px]/[28px] border border-[#f6f6f6] rounded-[12px] lg:rounded-[16px] w-[89px] lg:w-[175px] h-10 lg:g-11 flex-center"
                >
                    Заказать
                </Link>
            </section>

            <TextImageSection
                sectionGray={true}
                src="/images/manDriving.webp"
                alt="Мужчина за рулем авто"
                aspect="336/224"
                pyTextBlock="36"
                maxWidthImage="511"
                header="Аренда авто с доставкой по городу"
                paragraphs={paragraphsSection1}
            />

            <TextImageSection
                sectionGray={false}
                src="/images/phone.webp"
                alt="Телефон с приложением карт"
                aspect="336/224"
                pyTextBlock="0"
                maxWidthImage="511"
                flexRowReverse={true}
                header="Аренда авто с доставкой по указанному адресу"
                paragraphs={paragraphsSection2}
            />

            <section className="py-[42px] lg:py-[68px]">
                <h2 className="font-bold text-[20px]/[28px] lg:text-[30px]/[36px] mb-4 lg:mb-6">
                    Преимущества аренды авто с доставкой в Новосибирске
                </h2>
                <p className="text-[14px]/[20px] lg:text-[20px]/[28px] font-semibold lg:font-medium -mb-[22px] lg:-mb-8">
                    Аренда авто с доставкой в Новосибирске имеет ряд
                    преимуществ. Компания Рентасиб предлагает новые автомобили
                    по приемлемым ценам. Договор аренды прозрачен, все условия
                    ясно оговариваются. Кроме того, наша компания обеспечивает
                    круглосуточную поддержку клиентов и работает с иностранцами.
                    В случае поломки авто мы осуществляем его замену.
                </p>
                <RentalTerms items={listCarRentalWithDelivery} />
                <p className="text-[14px]/[20px] lg:text-[20px]/[28px] font-semibold lg:font-medium -mt-[22px] lg:-mt-8 mb-5">
                    Не упустите возможность арендовать автомобиль с доставкой в
                    Новосибирске по выгодной цене. Заказывайте у нас!
                </p>
                <Link
                    href={'/cars'}
                    className="font-medium text-[16px]/[24px] lg:text-[18px]/[28px] border border-[#f6f6f6] rounded-[12px] lg:rounded-[16px] w-[113px] lg:w-[159px] h-10 lg:g-11 flex-center"
                >
                    Забронировать
                </Link>
            </section>

            <TextImageSection
                sectionGray={true}
                src="/images/men2.webp"
                alt="Мужчина"
                aspect="359/159"
                pyTextBlock="36"
                flexRowReverse={true}
                maxWidthText="574"
                maxWidthImage="617"
                header="Как арендовать авто с доставкой в Новосибирске"
                paragraphs={paragraphsSection3}
            />

            <TextImageSection
                sectionGray={false}
                src="/images/manDriving2.webp"
                alt="Мужчина за рулем авто"
                aspect="3/2"
                pyTextBlock="12"
                maxWidthText="574"
                maxWidthImage="618"
                header="Особенности трансфера при аренде авто с доставкой"
                paragraphs={paragraphsSection4}
            />

            <section className="pt-[42px] lg:pt-[68px] border-t border-[#284B63B2]">
                <h2 className="font-bold text-[20px]/[28px] lg:text-[30px]/[36px] ">
                    Дополнительные услуги
                </h2>
                <AdditionalServicesCards items={servicesItems} />
                <div className="w-full sm:flex lg:hidden sm:justify-end">
                    <Link
                        href={'/dop-service'}
                        className="h-[44px] px-4 w-full sm:w-auto inline-flex justify-center items-center gap-4 border border-[#F6F6F6] rounded-[12px] text-[18px]/[28px] font-medium hover:text-[#f6f6f6]"
                    >
                        Дополнительные услуги
                        <ArrowRightLinkIcon />
                    </Link>
                </div>
            </section>
        </>
    );
}
