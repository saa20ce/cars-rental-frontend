export interface CarTaxonomyConfig {
    taxonomy: string;
    label: string;
    fieldKey: string;
}

export const CAR_TAXONOMIES: CarTaxonomyConfig[] = [
    { taxonomy: 'privod', label: 'Тип привода', fieldKey: 'privod' },
    { taxonomy: 'dvigatel', label: 'Двигатель', fieldKey: 'dvigatel' },
    { taxonomy: 'korobka', label: 'Коробка передач', fieldKey: 'korobka' },
    {
        taxonomy: 'moschnost',
        label: 'Мощность двигателя',
        fieldKey: 'moschnost',
    },
];
