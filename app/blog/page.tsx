import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import { NewsGrid } from '@/components/common/NewsGrid/NewsGrid';
import Pagination from '@/components/common/NewsGrid/Pagination';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { notFound } from 'next/navigation';

async function getNews(page: number) {
    const PER_PAGE = 9;
    const res = await fetch(
        `https://demo.rentasib.ru/wp-json/wp/v2/posts?_embed&per_page=${PER_PAGE}&page=${page}`,
        { next: { revalidate: 3600 } },
    );

    if (res.status === 404) notFound();
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
    const breadcrumbs = await fetchBreadcrumbs('/news');
    const currentPage = Number(page) || 1;
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
                basePath="/news"
            />
        </>
    );
}
