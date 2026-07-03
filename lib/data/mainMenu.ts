export const mainMenu = [
    {
        title: 'Автопарк',
        href: '/cars',
    },
    { title: 'Тарифы', href: '/tarify' },
    { title: 'Условия', mobTitle: 'Условия аренды', href: '/require' },
    {
        title: 'Услуги',
        mobTitle: 'Наши услуги',
        href: '#',
        items: [
            {
                title: 'Доставка',
                href: '/service/dostavka-avto',
            },
            { title: 'Все услуги', href: '/service' },
            { title: 'Дополнительные услуги', href: '/dop-service' },
            {
                title: 'Аренда авто в аэропорту',
                href: '/service/arenda-avto-v-aeroportu',
            },
            {
                title: 'Аренда для Юридических лиц',
                href: '/service/arenda-avtomobilej-dlya-biznesa',
            },
        ],
    },
    {
        title: 'О компании',
        href: '#',
        items: [
            { title: 'О нас', href: '/about' },
            { title: 'Отзывы', href: '/reviews' },
            { title: 'Контакты', href: '/contacts' },
            { title: 'Новости', href: '/blog' },
        ],
    },
    {
        title: 'Контакты',
        href: '/contacts',
        mobTitle: 'Отзывы',
        mobHref: '/reviews',
    },
    {
        title: 'Поддержка',
        href: '#',
        items: [
            { title: 'Вопрос-ответ', href: '/faq' },
            { title: 'Связь с директором', href: '#' },
        ],
    },
];
