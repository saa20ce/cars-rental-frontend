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
                title: 'Аренда седана',
                href: '/service/arenda-sedanov',
            },
            {
                title: 'Кроссовер',
                href: '/service/arenda-krossoverov',
            },
            {
                title: 'Юрлицам',
                href: '/service/arenda-avtomobilej-dlya-biznesa',
            },
            {
                title: 'Доставка',
                href: '/service/dostavka-avto',
            },
            {
                title: 'Детское кресло бустер',
                href: '/service/arenda-avto-s-detskim-kreslom',
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
