import { LineIcon } from '@/lib/ui/icons';
import Link from 'next/link';

const steps = [
    {
        title: 'Выбор автомобиля',
        description:
            'Выберите автомобиль на нужные даты через удобную форму бронирования и отправьте заявку. Также можете написать или позвонить нам для помощи с выбором.',
    },
    {
        title: 'Условия аренды',
        description:
            'В течение 15 минут наш менеджер свяжется с вами для уточнения времени получения автомобиля, доставки, наличия детского кресла и условий аренды.',
    },
    {
        title: 'Отправка документов',
        description:
            'Для подтверждения бронирования отправьте фотографии паспорта и водительского удостоверения через WhatsApp. Проверка документов займёт до 15 минут.',
    },
    {
        title: 'Подтверждение аренды',
        description:
            'Вы получите подтверждение брони с датами аренды, моделью автомобиля, временем и местом получения, а также стоимостью.',
    },
];

export function RentSteps() {
    return (
        <section className="py-[42px] lg:py-[68px] px-[17px] lg:px-0 relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#F6F6F60D]">
            <div className="px-[10px] xl:px-0 lg:max-w-[1260px] mx-auto">
                <div className="flex flex-row items-center mb-11 ">
                    <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold">
                        Порядок аренды:
                    </h2>
                    <div className="hidden lg:block ml-4 mt-[6px]">
                        <LineIcon />
                    </div>
                    <Link
                        href="/require"
                        className="hidden lg:block text-2xl underline underline-offset-4 ml-4 text-[24px]/[32px] font-medium"
                    >
                        Полные условия
                    </Link>
                </div>
                <ol className="grid lg:grid-cols-4 lg:gap-6 list-none">
                    {steps.map((step, index) => (
                        <li
                            key={index}
                            className="flex gap-4 relative lg:pb-0 last:pb-0 lg:flex-col"
                        >
                            <div className="relative flex flex-col items-center lg:items-start">
                                <div className="relative w-9 h-9 lg:w-11 lg:h-11 bg-[#F6F6F633] rounded-[8px] lg:rounded-[12px] text-white font-bold flex items-center justify-center">
                                    {index + 1}
                                </div>
                                <div className="hidden lg:block absolute top-[22px] left-[44px] right-0 h-px border-t-2 border-dashed border-gray-500 z-0" />
                                <div className="h-2px border-l-2 border-dashed border-gray-500 flex-1 lg:w-full"></div>
                            </div>
                            <div
                                className={`${index !== steps.length - 1 ? 'pb-8' : ''} lg:pb-0`}
                            >
                                <h3 className="text-[18px]/[28px] lg:text-[20px]/[28px] mb-1 font-bold">
                                    {step.title}
                                </h3>
                                <p className="text-[14px]/[20px] lg:text-[16px]/[24px]">
                                    {step.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
                <Link
                    href="/require"
                    className="block lg:hidden underline underline-offset-4 text-center text-[20px]/[28px] font-semibold mt-5"
                >
                    Полные условия
                </Link>
            </div>
        </section>
    );
}
