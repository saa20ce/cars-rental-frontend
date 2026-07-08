import { CarACF } from '@/lib/types/Car';

const buildDateFromParts = (year: number, month: number, day: number) => {
    const date = new Date(year, month - 1, day);

    return date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
        ? date
        : null;
};

const parseDiscountDate = (value?: string) => {
    const trimmed = value?.trim();

    if (!trimmed) return null;

    const compact = trimmed.match(/^(\d{4})(\d{2})(\d{2})$/);

    if (compact) {
        const [, year, month, day] = compact;
        return buildDateFromParts(Number(year), Number(month), Number(day));
    }

    const separated = trimmed.match(/^(\d{1,4})[./-](\d{1,2})[./-](\d{1,4})$/);

    if (separated) {
        const [, first, second, third] = separated;
        const isYearFirst = first.length === 4;

        return isYearFirst
            ? buildDateFromParts(Number(first), Number(second), Number(third))
            : buildDateFromParts(Number(third), Number(second), Number(first));
    }

    const parsed = new Date(trimmed);

    return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatDateWithMonth = (date: Date) =>
    date.toLocaleString('ru', { month: 'long', day: 'numeric' });

const getDiscountPeriod = (start?: string, end?: string) => {
    const discountStart = parseDiscountDate(start);
    const discountEnd = parseDiscountDate(end);

    if (!discountStart || !discountEnd) return null;

    const sameMonth =
        discountStart.getFullYear() === discountEnd.getFullYear() &&
        discountStart.getMonth() === discountEnd.getMonth();

    const startText = sameMonth
        ? discountStart.getDate()
        : formatDateWithMonth(discountStart);

    return `с ${startText} по ${formatDateWithMonth(discountEnd)}`;
};

export default function SaleInfo({ acf }: { acf: CarACF }) {
    const discountPeriod = acf?.skidka
        ? getDiscountPeriod(acf.skidka_start, acf.skidka_end)
        : null;

    return (
        <>
            {acf.skidka && (
                <div className="flex-center gap-2 h-7 absolute top-[10px] left-[20px] bg-[#000000ba] rounded-full text-[16px]/[24px] font-medium ">
                    <span className="bg-[#9E4242AD] py-[2px] px-[18px] rounded-full">{`-${acf.skidka}%`}</span>
                    {discountPeriod && (
                        <span className="py-[5px] pr-[18px]">
                            {discountPeriod}
                        </span>
                    )}
                </div>
            )}
        </>
    );
}
