import AdditionalServicesCards from '@/components/common/Cards/AdditionalServicesCards';
import GalleryCars from '@/components/common/Cars/[slug]/GalleryCars';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import TextImageSection from '@/components/common/TextImageSection/TextImageSection';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import {
    getAdditionalOptions,
    getCars,
    getDeliveryPrice,
    getSeasonDates,
} from '@/lib/api/fetchCarData';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import { servicesItems } from '@/lib/data/itemsCards';
import { ArrowRightLinkIcon } from '@/lib/ui/icons';
import { Number1Icon } from '@/lib/ui/icons/Number1Icon';
import { Number2Icon } from '@/lib/ui/icons/Number2Icon';
import { Number3Icon } from '@/lib/ui/icons/Number3Icon';
import { Number4Icon } from '@/lib/ui/icons/Number4Icon';
import Link from 'next/link';

const paragraphsSection1 = [
    'Аренда автомобиля с детским креслом – это важный аспект безопасности, когда вы путешествуете с ребенком. Дети находятся в особой зоне риска, когда находятся в автомобиле, и использование детского кресла может защитить их в случае аварии.',
    'Кроме того, это является законодательным требованием во многих странах, включая Россию, где дети в возрасте до 12 лет должны находиться в детском кресле во время поездки на автомобиле.',
    'Поэтому, если вы путешествуете с детьми, аренда автомобиля с детским креслом является важным фактором, который обеспечивает безопасность и комфорт для всей семьи.',
];
const paragraphsSection2 = [
    'Существует несколько видов детских кресел для автомобилей, в зависимости от возраста ребенка и весовой категории.',
    'Для младенцев существуют автокресла группы 0+ с удобными ручками для переноски, а для детей старше года – автокресла группы 1, которые крепятся с помощью ремней безопасности автомобиля.',
    'Для детей старше трех лет подходят автокресла группы 2-3, которые крепятся ремнями автомобиля и имеют подставку для повышения уровня безопасности.',
    'Для детей старше трех лет подходят автокресла группы 2-3, которые крепятся ремнями автомобиля и имеют подставку для повышения уровня безопасности.',
    <Link
        href={'/cars'}
        className="font-medium text-[16px]/[24px] lg:text-[18px]/[28px] border border-[#f6f6f6] rounded-[12px] lg:rounded-[16px] w-[94px] lg:w-[111px] h-10 lg:h-11 flex-center mt-8 lg:mt-9"
    >
        Автопарк
    </Link>,
];
const paragraphsSection3 = [
    'Правильная установка детского кресла в автомобиль – это один из самых важных аспектов обеспечения безопасности вашего ребенка во время поездки. Перед установкой детского кресла, убедитесь, что вы ознакомились со всеми инструкциями по его установке и правильному использованию.',
    'Также, не забывайте, что не все детские кресла подходят для всех типов автомобилей. При аренде автомобиля с детским креслом уточните у оператора, подходит ли кресло для выбранного вами автомобиля, и получите инструкции по его установке.',
    'Не забудьте проверить, правильно ли установлено кресло перед каждой поездкой, чтобы обеспечить максимальную безопасность вашего малыша.',
];
const itemsRules = [
    {
        desc: 'Во-первых, необходимо правильно установить кресло в автомобиле и зафиксировать его ремнями безопасности.',
        icon: <Number1Icon className="w-9 h-9 lg:w-12 lg:h-12" />,
    },
    {
        desc: 'Во-вторых, следует выбрать подходящий тип кресла в зависимости от возраста и веса ребенка.',
        icon: <Number2Icon className="w-9 h-9 lg:w-12 lg:h-12" />,
    },
    {
        desc: 'В-третьих, во время поездки необходимо следить за тем, чтобы ребенок не вылезал из кресла и не снимал его самостоятельно.',
        icon: <Number3Icon className="w-9 h-9 lg:w-12 lg:h-12" />,
    },
    {
        desc: 'Не забывайте, что правильное использование детского кресла - это залог безопасности вашего ребенка на дороге.',
        icon: <Number4Icon className="w-9 h-9 lg:w-12 lg:h-12" />,
    },
];
export async function generateMetadata() {
    return await fetchWPMetadata('/service/arenda-avto-s-detskim-kreslom');
}

export default async function CarRentalWithChildSeatPage() {
    const breadcrumbs = await fetchBreadcrumbs(
        '/service/arenda-avto-s-detskim-kreslom',
    );
    const cars = await getCars({ per_page: '6' });
    const deliveryPrice = await getDeliveryPrice();
    const additionalOptions = await getAdditionalOptions();
    const seasonDates = await getSeasonDates();

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <section className="pb-[42px] lg:pb-[68px]">
                <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                    Аренда авто на неделю в Новосибирске: большой выбор, низкие
                    цены
                </h1>
                <p className="font-semibold text-[16px]/[24px] lg:text-[20px]/[28px] mb-8 lg:mb-9 -tracking-[0.2px]">
                    Если вам нужен автомобиль на неделю в Новосибирске, то
                    компания “Рентасиб” предоставит вам широкий выбор
                    автомобилей по низким ценам. В этой статье мы расскажем о
                    преимуществах аренды авто на неделю и почему это выгодное
                    решение. Также мы расскажем о преимуществах аренды от 3 до 7
                    дней в Новосибирске.
                </p>
                <p className="font-semibold text-[16px]/[24px] lg:text-[20px]/[28px] mb-4 lg:mb-5 -tracking-[0.2px]">
                    Мы гарантируем, что ваши дети будут защищены и комфортно
                    сидеть во время поездки, а вы сможете спокойно наслаждаться
                    путешествием.
                </p>
                <Link
                    href={'/cars'}
                    className="font-medium text-[16px]/[24px] lg:text-[18px]/[28px] border border-[#f6f6f6] rounded-[12px] lg:rounded-[16px] w-[125px] lg:w-[146px] h-10 lg:g-11 flex-center"
                >
                    Выбрать авто
                </Link>
            </section>

            <TextImageSection
                sectionGray={true}
                src="/images/honda.webp"
                alt="Автомобиль"
                aspect="336/188"
                pyTextBlock="30"
                maxWidthImage="511"
                header="Почему важно арендовать автомобиль с детским креслом?"
                paragraphs={paragraphsSection1}
            />

            <TextImageSection
                sectionGray={false}
                src="/images/childSeat.webp"
                alt="Детское кресло"
                aspect="3/2"
                pyTextBlock="0"
                maxWidthText="577"
                maxWidthImage="615"
                flexRowReverse={true}
                header="Виды детских кресел для автомобиля"
                paragraphs={paragraphsSection2}
            />

            <TextImageSection
                sectionGray={false}
                src="/images/instChildSeat.webp"
                alt="Установка детского кресла"
                aspect="3/2"
                pyTextBlock="12"
                maxWidthImage="511"
                header="Как правильно установить детское кресло в автомобиль?"
                paragraphs={paragraphsSection3}
            />

            <section className="py-[42px] lg:py-[68px] border-b border-[#284B63B2]">
                <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                    Правила использования детского кресла в автомобиле
                </h2>
                <p className="font-medium text-[18px]/[28px] lg:text-[20px]/[28px] mb-5 lg:mb-9">
                    Правильное использование детского кресла в автомобиле – это
                    один из главных аспектов обеспечения безопасности маленьких
                    пассажиров.
                </p>
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">
                    {itemsRules.map(({ desc, icon }, i) => (
                        <li
                            key={i}
                            className="flex items-start gap-[14px] lg:gap-5 bg-[#FFFFFF0D] p-5 lg:pt-[38px] lg:pb-6 lg:px-[37px] rounded-[8px] lg:rounded-[16px]"
                        >
                            <div className="bg-[#F6F6F60D] p-3 lg:p-[11px] rounded-[8px]">
                                {icon}
                            </div>
                            <span className="text-[16px]/[24px] lg:text-[18px]/[28px] font-medium">
                                {desc}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="py-[42px] lg:py-[68px] border-b border-[#284B63B2]">
                <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                    Дополнительные услуги при аренде автомобиля с детским
                    креслом
                </h2>
                <p className="font-semibold text-[16px]/[24px] lg:text-[20px]/[28px] mb-8 lg:mb-9 -tracking-[0.2px]">
                    Мы гарантируем, что ваши дети будут защищены и комфортно
                    сидеть во время поездки, а вы сможете спокойно наслаждаться
                    путешествием.
                </p>
                <Link
                    href={'/cars'}
                    className="font-medium text-[16px]/[24px] lg:text-[18px]/[28px] border border-[#f6f6f6] rounded-[12px] lg:rounded-[16px] w-[125px] lg:w-[146px] h-10 lg:g-11 flex-center"
                >
                    Выбрать авто
                </Link>
            </section>

            <section className="py-[42px] lg:py-[68px] border-y border-[#284B63B2]">
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

            <section className="py-[42px] lg:py-[68px]">
                <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                    Автомобили
                </h2>
                <p className="font-medium text-[18px]/[28px] lg:text-[20px]/[28px] -mb-[30px] lg:-mb-9">
                    Популярные автомобили нашего автопарка
                </p>
                <GalleryCars
                    similarCars={cars}
                    title=""
                    btnTitle="Автопарк"
                    href="/cars"
                    additionalOptions={additionalOptions}
                    deliveryPrice={deliveryPrice}
                    seasonDates={seasonDates}
                />
            </section>
        </>
    );
}
