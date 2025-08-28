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
            { title: 'Все услуги', href: '/service' },
            {
                title: 'Аренда авто для Юр.лиц',
                href: '/service/arenda-avtomobilej-dlya-biznesa',
            },
            {
                title: 'Аренда авто бизнес класса',
                href: '/service/arenda-avto-biznes-klassa',
            },
            {
                title: 'Аренда авто комфорт класса',
                href: '/service/arenda-avto-komfort-klassa',
            },
            { title: 'Дополнительные услуги', href: '/dop-service' },
        ],
    },
    {
        title: 'О нас',
        href: '#',
        items: [
            { title: 'О компании', href: '/about' },
            { title: 'Отзывы', href: '/reviews' },
            { title: 'Контакты', href: '/contacts' },
            { title: 'Новости', href: '/blog' },
            { title: 'Соц. сети', href: '/social' },
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
