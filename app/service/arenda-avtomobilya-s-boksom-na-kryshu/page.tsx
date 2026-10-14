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
import { Number1Icon } from '@/lib/ui/icons/Number1Icon';
import { Number2Icon } from '@/lib/ui/icons/Number2Icon';
import { Number3Icon } from '@/lib/ui/icons/Number3Icon';

const paragraphsSection1 = [
    'Бокс на крыше добавляет место для багажа и помогает освободить салон автомобиля в поездке. При выборе учитывайте объём бокса, допустимую нагрузку и габариты вещей.',
    'Бокс устанавливается не на каждый автомобиль. Уточните при бронировании, доступен ли он для выбранной машины и дат, что в него поместится и сколько стоит эта опция.',
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
const roofBoxCarIds = [8660, 9458];

export async function generateMetadata() {
    return await fetchWPMetadata(
        '/service/arenda-avtomobilya-s-boksom-na-kryshu',
    );
}

export default async function CarRentalWithRoofBoxPage() {
    const breadcrumbs = await fetchBreadcrumbs(
        '/service/arenda-avtomobilya-s-boksom-na-kryshu',
    );
    const cars = (
        await getCars({
            include: roofBoxCarIds.join(','),
            orderby: 'include',
            per_page: String(roofBoxCarIds.length),
        })
    ).sort((a, b) => roofBoxCarIds.indexOf(a.id) - roofBoxCarIds.indexOf(b.id));
    const deliveryPrice = await getDeliveryPrice();
    const additionalOptions = await getAdditionalOptions();
    const seasonDates = await getSeasonDates();

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <section className="pb-[42px] lg:pb-[68px]">
                <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-4 lg:mb-5">
                    Аренда автомобиля с боксом на крышу в Новосибирске
                </h1>
                <p className="font-semibold text-[16px]/[24px] lg:text-[20px]/[28px] mb-8 lg:mb-9 -tracking-[0.2px]">
                    Если для поездки нужно больше места для вещей, выберите
                    автомобиль с багажным боксом на крыше. Наличие совместимого
                    бокса и стоимость опции уточните при бронировании.
                </p>
            </section>

            <TextImageSection
                sectionGray={true}
                src="/images/dsc05893.webp"
                alt="Honda Stepwgn с багажным боксом на крыше"
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
                    Посмотрите примеры автомобилей: Москвич 3 2024 и Honda
                    Stepwgn 2018. Перед бронированием уточните наличие бокса
                    для выбранной модели и дат.
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
