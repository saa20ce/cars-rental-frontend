import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import { NewsGrid } from '@/components/common/NewsGrid/NewsGrid';
import Pagination from '@/components/common/NewsGrid/Pagination';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import { wpFetch } from '@/lib/api/wpCache';
import { notFound } from 'next/navigation';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;

export async function generateMetadata() {
    return await fetchWPMetadata('/blog');
}

async function getNews(page: number) {
    const PER_PAGE = 9;
    const res = await wpFetch(
        `${WP_API_URL}/posts?_embed=wp:featuredmedia&per_page=${PER_PAGE}&page=${page}`,
        { next: { tags: ['wordpress-news'] } },
    );

    if (res.status === 400 || res.status === 404) notFound();
    if (!res.ok) throw new Error('Не удалось загрузить новости');
    const totalPages = Number(res.headers.get('X-WP-TotalPages'));
    const posts = await res.json();
    return { posts, totalPages };
}

export default async function NewsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page } = await searchParams;
    const breadcrumbs = await fetchBreadcrumbs('/blog');
    const parsedPage = Number(page);
    const currentPage =
        Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
    const { posts, totalPages } = await getNews(currentPage);

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <h1 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                Новости:
            </h1>
            <NewsGrid posts={posts} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/blog"
            />
        </>
    );
}
