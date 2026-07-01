export type FormOption = {
    label: string;
    value: string;
};

export const NO_DELIVERY_VALUE = 'none';
export const NO_DELIVERY_LABEL = 'Без подачи';

export const DELIVERY_OPTION_LABELS: Record<string, string> = {
    aeroport: 'Аэропорт',
    zhd_vokzal: 'Ж/д вокзал',
    sovetskij: 'Советский',
    kolczovo: 'Кольцово',
    czentralnyj: 'Центральный',
    oktyabrskij: 'Октябрьский',
    zaelczovskij: 'Заельцовский',
    dzerzhinskij: 'Дзержинский',
    zheleznodorozhnyj: 'Железнодорожный',
    kalininskij: 'Калининский',
    leninskij: 'Ленинский',
    kirovskij: 'Кировский',
    pervomajskij: 'Первомайский',
    pashino: 'Пашино',
    krasnoobsk: 'Краснообск',
    berdsk: 'Бердск',
    samovyvoz: 'Самовывоз',
    iskitim: 'Искитим',
};

export const DELIVERY_FORM_LABELS: Record<string, string> = {
    [NO_DELIVERY_VALUE]: NO_DELIVERY_LABEL,
    ...DELIVERY_OPTION_LABELS,
};

export const ADDITIONAL_OPTION_LABELS: Record<string, string> = {
    buster: 'Бустер',
    boks_na_kryshu: 'Бокс на крышу (+300 ₽)',
    detskoe_kreslo: 'Детское кресло',
};

export const CONTACT_VIA_LABELS: Record<string, string> = {
    telegram: 'Telegram',
    max: 'Max',
    phone: 'Позвонить на телефон',
};

const getTrimmedValue = (value?: string | null) => value?.trim() ?? '';

export const getRussianOptionLabel = (
    options: FormOption[],
    selectedValue?: string | null,
    fallbackLabels: Record<string, string> = {},
) => {
    const value = getTrimmedValue(selectedValue);

    if (!value) return '';

    return (
        options.find((option) => option.value === value)?.label ??
        fallbackLabels[value] ??
        value
    );
};

export const getRussianOptionLabels = (
    options: FormOption[],
    selectedValues: string[],
    fallbackLabels: Record<string, string> = {},
) =>
    selectedValues
        .map((value) => getRussianOptionLabel(options, value, fallbackLabels))
        .filter(Boolean)
        .join(', ');

export const normalizeDeliveryValue = (value?: string | null) => {
    const trimmedValue = getTrimmedValue(value);

    if (!trimmedValue) return NO_DELIVERY_LABEL;

    return DELIVERY_FORM_LABELS[trimmedValue] ?? trimmedValue;
};

export const normalizeAdditionalOptionsValue = (value?: string | null) => {
    const optionValues = getTrimmedValue(value)
        .split(',')
        .map((option) => option.trim())
        .filter(Boolean);

    if (!optionValues.length) return 'Без опций';

    return optionValues
        .map((option) => ADDITIONAL_OPTION_LABELS[option] ?? option)
        .join(', ');
};

export const normalizeContactViaValue = (value?: string | null) => {
    const trimmedValue = getTrimmedValue(value);

    if (!trimmedValue) return '\u041d\u0435 \u0443\u043a\u0430\u0437\u0430\u043d\u043e';

    return CONTACT_VIA_LABELS[trimmedValue] ?? trimmedValue;
};
