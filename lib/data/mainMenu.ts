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
                title: 'Аренда для Юридических лиц',
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
