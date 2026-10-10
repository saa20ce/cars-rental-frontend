import { wpFetch } from './wpCache';

export interface BreadcrumbItem {
    href: string;
    title: string;
    isLast: boolean
}

const staticPages: Record<string, string> = {
    cars: 'Автопарк',
    tarify: 'Тарифы',
    require: 'Условия',
    blog: 'Новости',
    contacts: 'Контакты',
    service: 'Услуги',
    reviews: 'Отзывы',
    'arenda-avtomobilej-dlya-biznesa': 'Аренда автомобилей для юридических лиц',
    'dop-service': 'Дополнительные услуги',
    'arenda-avto-biznes-klassa': 'Аренда авто бизнес-класса',
    'arenda-avto-komfort-klassa': 'Аренда авто комфорт-класса',
    'arenda-avto-ekonom-klassa': 'Аренда авто эконом-класса',
    'arenda-krossoverov': 'Аренда кроссоверов',
    'arenda-vnedorozhnika': 'Аренда внедорожника',
    'prokat-minivenov-i-mikroavtobusov': 'Прокат минивэнов и микроавтобусов',
    'arenda-avto-na-mesyacz': 'Аренда авто на месяц',
    'arenda-avto-na-nedelyu': 'Аренда авто на неделю',
    'arenda-kitajskih-avto': 'Аренда китайских авто',
    'arenda-premialnyh-avto': 'Аренда премиальных авто',
    'arenda-sedanov': 'Аренда седанов',
    'arenda-avto-s-detskim-kreslom': 'Аренда авто с детским креслом',
    'dostavka-avto': 'Аренда авто с доставкой',
    'arenda-avto-bez-voditelya': 'Аренда авто без водителя',
    'arenda-avtomobilya-s-boksom-na-kryshu': 'Аренда авто с боксом на крышу',
    'arenda-avto-v-aeroportu': 'Аренда авто в аэропорту'
};

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;

async function fetchTitleBySlug(
    slug: string,
    type: 'pages' | 'cars' | 'posts'
) {
    const url = `${WP_API_URL}/${type}?slug=${slug}`;
    const res = await wpFetch(url, { next: { tags: ['wordpress-breadcrumbs'] } });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    if (type === 'cars' && data[0]?.acf?.nazvanie_avto)
        return data[0].acf.nazvanie_avto;

    return data[0].title?.rendered || null;
}

export async function fetchBreadcrumbs(
    pathname: string,
    options: { currentPageHref?: string } = {},
): Promise<BreadcrumbItem[]> {
    const segments = pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [];

    let homeTitle = 'Главная';
    try {
        const homeRes = await wpFetch(`${WP_API_URL}/pages?slug=home`, {
            next: { tags: ['wordpress-breadcrumbs'] },
        });
        const homeData = await homeRes.json();
        if (Array.isArray(homeData) && homeData[0]?.title?.rendered) {
            homeTitle = homeData[0].title.rendered;
        }
    } catch { }

    items.push({ href: '/', title: homeTitle, isLast: segments.length === 0 });

    for (let i = 0; i < segments.length; i++) {
        const slug = segments[i];
        let title: string | null = null;

        if (staticPages[slug]) {
            title = staticPages[slug];
        } else {
            if (segments[0] === 'cars' && i === 1) {
                title = await fetchTitleBySlug(slug, 'cars');
            } else if (segments[0] === 'blog' && i === 1) {
                title = await fetchTitleBySlug(slug, 'posts');
            } else {
                title = await fetchTitleBySlug(slug, 'pages');
            }
        }

        if (!title) title = slug.charAt(0).toUpperCase() + slug.slice(1);

        items.push({
            href: i === segments.length - 1 && options.currentPageHref
                ? options.currentPageHref
                : '/' + segments.slice(0, i + 1).join('/'),
            title,
            isLast: i === segments.length - 1
        });
    }

    return items;
}
