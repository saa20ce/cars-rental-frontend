import { ArrowLeftIcon, ArrowRightIcon } from '../../icons';

const controlClassName =
    'flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-0 bg-[#f6f6f60e] text-[#f6f6f6] transition-colors hover:bg-[#f6f6f633] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f6f6f6]';

export default function CarouselControls({
    ref,
}: {
    ref: React.RefObject<HTMLUListElement | null>;
}) {
    const goNext = () => {
        const container = ref.current;
        if (!container) return;

        const step = container.clientWidth;
        container.scrollBy({ left: step, behavior: 'smooth' });
    };

    const goPrev = () => {
        const container = ref.current;
        if (!container) return;

        const step = container.clientWidth;
        container.scrollBy({ left: -step, behavior: 'smooth' });
    };
    return (
        <div className="flex gap-3">
            <button
                type="button"
                onClick={goPrev}
                className={controlClassName}
                aria-label="Прокрутить назад"
            >
                <ArrowLeftIcon className="h-6 w-[15px]" />
            </button>
            <button
                type="button"
                onClick={goNext}
                className={controlClassName}
                aria-label="Прокрутить вперед"
            >
                <ArrowRightIcon className="h-6 w-[15px]" />
            </button>
        </div>
    );
}
