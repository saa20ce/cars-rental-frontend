import AdditionalServicesCards from '@/components/common/Cards/AdditionalServicesCards';
import GalleryCars from '@/components/common/Cars/[slug]/GalleryCars';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import TextImageSection from '@/components/common/TextImageSection/TextImageSection';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import {
    getAdditionalOptions,
    getCars,
    getCarsByKuzov,
    getCrossoverAndMinivanCars,
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
    'Аренда автомобиля с боксом на крышу имеет множество преимуществ, среди которых дополнительное пространство для багажа, безопасный транспорт для багажа, а также удобный и просторный багажник на крыше автомобиля. Особенно важно это для тех, кто планирует длительное путешествие на автомобиле и нуждается в перевозке большого количества вещей.',
    'Кроме того, аренда автомобиля с боксом на крышу позволяет безопасно перевозить такие предметы, как лыжи и сноуборды, благодаря наличию креплений на крыше. Это делает аренду автомобиля с боксом на крышу идеальным выбором для тех, кто хочет получить максимальную пользу от своего автомобиля во время поездки.',
];
const paragraphsSection3 = [
    'Правильная установка детского кресла в автомобиль – это один из самых важных аспектов обеспечения безопасности вашего ребенка во время поездки. Перед установкой детского кресла, убедитесь, что вы ознакомились со всеми инструкциями по его установке и правильному использованию.',
    'Также, не забывайте, что не все детские кресла подходят для всех типов автомобилей. При аренде автомобиля с детским креслом уточните у оператора, подходит ли кресло для выбранного вами автомобиля, и получите инструкции по его установке.',
    'Не забудьте проверить, правильно ли установлено кресло перед каждой поездкой, чтобы обеспечить максимальную безопасность вашего малыша.',
];
const itemsRules = [
    {
        desc: 'Во-первых, необходимо учитывать максимальную нагрузку, которую можно поместить в бокс. Обычно она указывается в инструкции к боксу и зависит от модели автомобиля и типа бокса.',
        icon: <Number1Icon className="w-9 h-9 lg:w-12 lg:h-12" />,
    },
    {
        desc: 'Во-вторых, следует распределять вес груза в боксе равномерно, чтобы сохранить устойчивость автомобиля на дороге. Не рекомендуется размещать слишком тяжелые предметы на одной стороне бокса.',
        icon: <Number2Icon className="w-9 h-9 lg:w-12 lg:h-12" />,
    },
    {
        desc: 'И, наконец, при установке бокса на крышу автомобиля необходимо соблюдать правила безопасности. Убедитесь, что бокс правильно закреплен и не может соскочить во время движения.',
        icon: <Number3Icon className="w-9 h-9 lg:w-12 lg:h-12" />,
    },
];
export async function generateMetadata() {
    return await fetchWPMetadata(
        '/service/arenda-avtomobilya-s-boksom-na-kryshu',
    );
}

export default async function CarRentalWithRoofBoxPage() {
    const breadcrumbs = await fetchBreadcrumbs(
        '/service/arenda-avtomobilya-s-boksom-na-kryshu',
    );
    const cars = await getCrossoverAndMinivanCars();
    const deliveryPrice = await getDeliveryPrice();
    const additionalOptions = await getAdditionalOptions();
    const seasonDates = await getSeasonDates();

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <section className="pb-[42px] lg:pb-[68px]">
                <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                    Аренда автомобиля с боксом на крышу
                </h1>
                <p className="font-semibold text-[16px]/[24px] lg:text-[20px]/[28px] mb-8 lg:mb-9 -tracking-[0.2px]">
                    Аренда автомобиля с боксом на крышу – это удобное и
                    практичное решение для тех, кто планирует длительную поездку
                    с большим количеством багажа или спортивным инвентарем.
                    <br />
                    Багажный бокс крепится на крышу автомобиля и позволяет
                    увеличить объем багажника, а также сохранить ценные вещи в
                    безопасности и защите от погодных условий.
                    <br /> Мы расскажем о преимуществах аренды автомобиля с
                    боксом на крышу и как правильно выбрать и арендовать такой
                    автомобиль.
                </p>
            </section>

            <TextImageSection
                sectionGray={true}
                src="/images/honda.webp"
                alt="Автомобиль"
                aspect="359/201"
                pyTextBlock="36"
                maxWidthImage="511"
                header="Преимущества аренды автомобиля с боксом на крышу"
                paragraphs={paragraphsSection1}
            />

            <section className="py-[42px] lg:py-[68px] border-b border-[#284B63B2]">
                <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                    Как правильно использовать бокс на крыше автомобиля
                </h2>
                <p className="font-medium text-[18px]/[28px] lg:text-[20px]/[28px] mb-8 lg:mb-9">
                    Если вы решили арендовать автомобиль с боксом на крышу,
                    важно знать, как правильно использовать эту опцию.
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

            <section className="py-[42px] lg:py-[68px]">
                <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                    Какие автомобили можно арендовать с боксом на крышу
                </h2>
                <p className="font-medium text-[18px]/[28px] lg:text-[20px]/[28px] -mb-[30px] lg:-mb-8">
                    В нашем автопрокате представлены автомобили разных категорий
                    с боксами на крышу: микроавтобусы и кроссоверы. Среди
                    популярных моделей – Hyundai Creta и Honda Stepwgn.
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

            <TextImageSection
                sectionGray={true}
                src="/images/instChildSeat.webp"
                alt="Установка детского кресла"
                aspect="3/2"
                pyTextBlock="12"
                maxWidthImage="511"
                header="Как правильно установить детское кресло в автомобиль?"
                paragraphs={paragraphsSection3}
            />
        </>
    );
}
