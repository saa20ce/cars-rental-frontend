import NewsPreviewCard from '@/components/common/Cards/NewsPreviewCard';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import HtmlContent from '@/components/common/HtmlContent/HtmlContent';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import { wpFetch } from '@/lib/api/wpCache';
import type { WPPost, WPPostDetails } from '@/lib/types/News';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return await fetchWPMetadata('/' + slug);
}

export default async function NewsDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const res = await wpFetch(`${WP_API_URL}/posts?slug=${slug}&_embed`, {
        next: { tags: ['wordpress-news'] },
    });

    if (!res.ok) notFound();

    const data = await res.json();
    const details: WPPostDetails | undefined = data[0];

    if (!details) notFound();

    const [breadcrumbs, newsRes] = await Promise.all([
        fetchBreadcrumbs(`/blog/${slug}`),
        wpFetch(
            `${WP_API_URL}/posts?_embed&per_page=6&exclude=${details.id}&orderby=rand`,
            { next: { tags: ['wordpress-news'] } },
        ),
    ]);

    const news: WPPost[] = newsRes.ok ? await newsRes.json() : [];
    const image = details._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <div className="flex gap-0 lg:gap-6 flex-col lg:flex-row mt-6 lg:mt-8">
                <article className="article" style={{ flex: 3 }}>
                    {image && (
                        <Image
                            src={image}
                            alt="Фото прикрепленное к новости"
                            width={900}
                            height={520}
                            sizes="(max-width: 1024px) 100vw, 75vw"
                            className="w-full h-auto block rounded-[32px] mb-5 lg:mb-6"
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
