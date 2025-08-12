export const mainMenu = [
    {
        title: 'Автопарк',
        href: '/cars',
        items: [
            { title: 'До 4000 руб.', href: '/cars2000' },
            { title: '4000-6000 руб.', href: '/cars4000' },
            { title: '6000-10000 руб.', href: '/cars6000' },
            { title: 'от 10000 руб.', href: '/cars10000' },
        ],
    },
    { title: 'Тарифы', href: '/tariffs' },
    { title: 'Условия', mobTitle: 'Условия аренды', href: '/terms' },
    {
        title: 'Услуги',
        mobTitle: 'Наши услуги',
        href: '/services',
        items: [
            { title: 'Все услуги', href: '/services' },
            {
                title: 'Аренда авто для Юр.лиц',
                href: '/services/corporate-rental',
            },
            {
                title: 'Аренда авто бизнес класса',
                href: '/services/business-class-rental',
            },
            {
                title: 'Аренда авто комфорт класса',
                href: '/services/comfort-class-rental',
            },
            { title: 'Дополнительные услуги', href: '/additional-services' },
        ],
    },
    {
        title: 'О нас',
        href: '/about',
        items: [
            { title: 'О компании', href: '/about' },
            { title: 'Отзывы', href: '/reviews' },
            { title: 'Контакты', href: '/contacts' },
            { title: 'Новости', href: '/news' },
            { title: 'Соц. сети', href: '#' },
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
        href: '/faq',
        items: [
            { title: 'Вопрос-ответ', href: '/faq' },
            { title: 'Связь с директором', href: '#' },
        ],
    },
];
