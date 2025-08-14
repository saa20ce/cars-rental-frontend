import NewsPreviewCard from '@/components/common/Cards/NewsPreviewCard';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import HtmlContent from '@/components/common/HtmlContent/HtmlContent';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';

export type NewsDetail = {
    content: { rendered: string };
    title: { rendered: string };
    date: string;
};

export type WPPost = {
    id: number;
    slug: string;
    date: string;
    title: { rendered: string };
    _embedded?: {
        'wp:featuredmedia'?: [
            {
                source_url: string;
            },
        ];
    };
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return await fetchWPMetadata('/' + slug);
}

export default async function newsDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const fetchNews = async (excludeId: number) => {
        const res = await fetch(
            `https://demo.rentasib.ru/wp-json/wp/v2/posts?_embed&per_page=6&exclude=${excludeId}&orderby=rand`,
            { next: { revalidate: 3600 } },
        );
        const data = await res.json();
        return data;
    };

    const res = await fetch(
        `https://demo.rentasib.ru/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    );
    const data = await res.json();
    const details: NewsDetail | undefined = data[0];
    const breadcrumbs = await fetchBreadcrumbs(`/blog/${slug}`);
    const news: WPPost[] = details ? await fetchNews(data[0].id) : [];
    const image = data[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    if (!details) {
        return <div>Новость не найдена</div>;
    }

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <div className="flex gap-0 lg:gap-6 flex-col lg:flex-row mt-6 lg:mt-8">
                <article className="article" style={{ flex: 3 }}>
                    {image && (
                        <img
                            src={image}
                            alt="Фото прикрепленное к новости"
                            className="w-full block rounded-[32px] mb-5 lg:mb-6"
                        />
                    )}
                    <HtmlContent details={details} />
                </article>
                <aside className="mt-[42px] lg:mt-0 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:block flex-1 lg:max-w-[297px]">
                    {news.map((item) => (
                        <NewsPreviewCard key={item.id} news={item} />
                    ))}
                </aside>
            </div>
        </>
    );
}
