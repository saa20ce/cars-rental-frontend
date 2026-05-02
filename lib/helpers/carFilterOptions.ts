export type SelectOption = {
    value: string;
    label: string;
};

const KUZOV_OPTIONS_IN_KLASS_SELECT = ['Кроссовер', 'Минивэн'];
const KLASS_SELECT_ORDER = [
    'Эконом',
    'Комфорт',
    'Кроссовер',
    'Минивэн',
    'Бизнес',
];

const normalizeLabel = (label: string) => label.trim().toLowerCase();

export const getKuzovOptionsForKlassSelect = (
    kuzovOptions: SelectOption[],
) => {
    const allowedLabels = new Set(
        KUZOV_OPTIONS_IN_KLASS_SELECT.map(normalizeLabel),
    );

    return kuzovOptions.filter((option) =>
        allowedLabels.has(normalizeLabel(option.label)),
    );
};

export const buildKlassOptionsWithKuzov = (
    klassOptions: SelectOption[],
    kuzovOptions: SelectOption[],
) => {
    const existingValues = new Set(klassOptions.map((option) => option.value));
    const kuzovOptionsForKlass = getKuzovOptionsForKlassSelect(kuzovOptions);
    const order = new Map(
        KLASS_SELECT_ORDER.map((label, index) => [
            normalizeLabel(label),
            index,
        ]),
    );

    const options = [
        ...klassOptions,
        ...kuzovOptionsForKlass.filter(
            (option) => !existingValues.has(option.value),
        ),
    ];

    return options.sort((a, b) => {
        const aOrder = order.get(normalizeLabel(a.label));
        const bOrder = order.get(normalizeLabel(b.label));

        if (aOrder === undefined && bOrder === undefined) return 0;
        if (aOrder === undefined) return 1;
        if (bOrder === undefined) return -1;

        return aOrder - bOrder;
    });
};

export const isKuzovOptionUsedAsKlass = (
    selectedValue: string,
    kuzovOptions: SelectOption[],
) => {
    return getKuzovOptionsForKlassSelect(kuzovOptions).some(
        (option) => option.value === selectedValue,
    );
};
