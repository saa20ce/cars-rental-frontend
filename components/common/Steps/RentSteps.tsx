import { LineIcon } from '@/lib/ui/icons';
import Link from 'next/link';

const TELEGRAM_URL = 'https://t.me/Rentasib';
const MAX_URL =
    'https://max.ru/u/f9LHodD0cOJl7vaA90ej_c-ng7J4Tpfbi4tBmaGo9A-R2NE74nwHaaX0WQk';

const steps = [
    {
        title: 'Выбор автомобиля',
        description:
            'Выберите автомобиль на нужные даты через удобную форму и отправьте заявку. Также можете позвонить или написать нам для помощи с выбором.',
    },
    {
        title: 'Условия аренды',
        description:
            'В течение 5 минут наш менеджер свяжется с вами для уточнения времени получения автомобиля, доставки, наличия детского кресла и условий аренды.',
    },
    {
        title: 'Отправка документов',
        description: (
            <>
                Для подтверждения бронирования отправьте фотографии паспорта и
                водительского удостоверения через{' '}
                <a
                    href={MAX_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-[#f6f6f6]"
                >
                    Max
                </a>.{' '}
                или{' '}
                <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-[#f6f6f6]"
                >
                    Telegram
                </a>. Проверка документов займёт до 45 минут.
            </>
        ),
    },
    {
        title: 'Подтверждение аренды',
        description:
            'Вы получите подтверждение брони с датами аренды, моделью автомобиля, временем и местом получения, а также стоимостью.',
    },
];

type RentStepsHeadingTag = 'h2' | 'h3' | 'div';
type RentStepsStepTitleTag = 'h3' | 'div';

interface RentStepsProps {
    headingTag?: RentStepsHeadingTag;
    stepTitleTag?: RentStepsStepTitleTag;
}

export function RentSteps({
    headingTag = 'h2',
    stepTitleTag = 'h3',
}: RentStepsProps = {}) {
    const HeadingTag = headingTag;
    const StepTitleTag = stepTitleTag;

    return (
        <section className="py-[42px] lg:py-[68px] px-[17px] lg:px-0 relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#F6F6F60D]">
            <div className="px-[10px] xl:px-0 lg:max-w-[1260px] mx-auto">
                <div className="flex flex-row items-center mb-11 ">
                    <HeadingTag className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold">
                        Порядок аренды:
                    </HeadingTag>
                    <div className="hidden lg:block ml-4 mt-[6px]">
                        <LineIcon />
                    </div>
                    <Link
                        href="/require"
                        className="hidden lg:block text-2xl underline underline-offset-4 ml-4 font-medium"
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
                                <StepTitleTag className="text-[18px]/[28px] lg:text-[20px]/[28px] mb-1 font-bold">
                                    {step.title}
                                </StepTitleTag>
                                <p className="text-[14px]/[20px] lg:text-[16px]/[24px]">
                                    {step.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
                <Link
                    href="/require"
                    className="block lg:hidden underline underline-offset-[5px] text-center text-[20px]/[28px] font-semibold mt-5"
                >
                    Полные условия
                </Link>
            </div>
        </section>
    );
}
