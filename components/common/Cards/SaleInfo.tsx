import { CarACF } from '@/lib/types/Car';

export default function SaleInfo({ acf }: { acf: CarACF }) {
    let discountStart;
    let discountEnd;

    if (acf?.skidka && acf.skidka_start && acf.skidka_end) {
        const [dayStart, monthStart, yearStart] = acf.skidka_start
            .split('/')
            .map(Number);
        discountStart = new Date(yearStart, monthStart - 1, dayStart);

        const [dayEnd, monthEnd, yearEnd] = acf.skidka_end
            .split('/')
            .map(Number);
        discountEnd = new Date(yearEnd, monthEnd - 1, dayEnd);
    }
    return (
        <>
            {acf.skidka && (
                <div className="flex-center gap-2 h-7 absolute top-[10px] left-[20px] bg-[#0000008A] rounded-full text-[16px]/[24px] font-medium ">
                    <span className="bg-[#9E4242AD] py-[2px] px-[18px] rounded-full">{`-${acf.skidka}%`}</span>
                    {discountStart && discountEnd && (
                        <span className="py-[5px] pr-[18px]">
                            {`с ${discountStart.getDate()} по ${discountEnd.toLocaleString('ru', { month: 'long', day: 'numeric' })}`}
                        </span>
                    )}
                </div>
            )}
        </>
    );
}
