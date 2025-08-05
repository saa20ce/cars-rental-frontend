export interface BreadcrumbItem {
    href: string;
    title: string;
    isLast: boolean;
}

const staticPages: Record<string, string> = {
    cars: 'Автопарк',
    tariffs: 'Тарифы',
    terms: 'Условия',
    news: 'Новости',
    contacts: 'Контакты',
    services: 'Услуги',
    reviews: 'Отзывы',
};

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;

async function fetchTitleBySlug(
    slug: string,
    type: 'pages' | 'cars' | 'posts',
) {
    const url = `${WP_API_URL}/${type}?slug=${slug}`;
    const res = await fetch(url, { cache: 'force-cache' });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    if (type === 'cars' && data[0]?.acf?.nazvanie_avto)
        return data[0].acf.nazvanie_avto;

    return data[0].title?.rendered || null;
}

export async function fetchBreadcrumbs(
    pathname: string,
): Promise<BreadcrumbItem[]> {
    const segments = pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [];

    let homeTitle = 'Home';
    try {
        const homeRes = await fetch(`${WP_API_URL}/pages?slug=home`, {
            cache: 'force-cache',
        });
        const homeData = await homeRes.json();
        if (Array.isArray(homeData) && homeData[0]?.title?.rendered) {
            homeTitle = homeData[0].title.rendered;
        }
    } catch {}

    items.push({ href: '/', title: homeTitle, isLast: segments.length === 0 });

    for (let i = 0; i < segments.length; i++) {
        const slug = segments[i];
        let title: string | null = null;

        if (staticPages[slug]) {
            title = staticPages[slug];
        } else {
            if (segments[0] === 'cars' && i === 1) {
                title = await fetchTitleBySlug(slug, 'cars');
            } else if (segments[0] === 'news' && i === 1) {
                title = await fetchTitleBySlug(slug, 'posts');
            } else {
                title = await fetchTitleBySlug(slug, 'pages');
            }
        }

        if (!title) title = slug.charAt(0).toUpperCase() + slug.slice(1);

        items.push({
            href: '/' + segments.slice(0, i + 1).join('/'),
            title,
            isLast: i === segments.length - 1,
        });
    }

    return items;
}
