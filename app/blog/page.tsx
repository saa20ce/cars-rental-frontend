import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import { NewsGrid } from '@/components/common/NewsGrid/NewsGrid';
import Pagination from '@/components/common/NewsGrid/Pagination';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import { wpFetch } from '@/lib/api/wpCache';
import { proxyWpMediaUrl } from '@/lib/api/wpMediaProxy';
import type { WPPost } from '@/lib/types/News';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/common/Meta/JsonLd';
import { buildBlogItemListJsonLd } from '@/lib/seo/structuredData';
import { shouldHideNewsArticle } from '@/lib/seo/transferArticles';
import { getIndexableNewsPosts } from '@/lib/seo/newsSitemap';
import { paginateNewsPosts } from '@/lib/seo/newsPagination';
import type { Metadata } from 'next';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;
const NEWS_LIST_FIELDS =
    'id,slug,date,title,excerpt,_embedded';

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
    const [{ page }, wordpressMetadata] = await Promise.all([
        searchParams,
        fetchWPMetadata('/blog'),
    ]);
    const parsedPage = Number(page);
    const currentPage =
        Number.isInteger(parsedPage) && parsedPage > 1 ? parsedPage : 1;
    const canonical =
        currentPage === 1 ? '/blog' : `/blog?page=${currentPage}`;

    return {
        ...wordpressMetadata,
        // WordPress marks its blog archive noindex,nofollow, but this frontend
        // archive is the primary internal path to published articles.
        robots: { index: true, follow: true },
        alternates: { canonical },
        openGraph: wordpressMetadata.openGraph
            ? { ...wordpressMetadata.openGraph, url: canonical }
            : undefined,
    };
}

async function getNews(page: number) {
    const PER_PAGE = 9;
    const indexablePosts = await getIndexableNewsPosts();
    const selected = paginateNewsPosts(indexablePosts, page, PER_PAGE);
    if (!selected) notFound();
    if (selected.posts.length === 0) {
        return { posts: [], totalPages: selected.totalPages };
    }

    const params = new URLSearchParams({
        _embed: 'wp:featuredmedia',
        per_page: String(PER_PAGE),
        include: selected.posts.map((post) => post.id).join(','),
        orderby: 'include',
        _fields: NEWS_LIST_FIELDS,
    });
    const res = await wpFetch(
        `${WP_API_URL}/posts?${params}`,
        { next: { tags: ['wordpress-news'] } },
    );

    if (!res.ok) throw new Error('Не удалось загрузить новости');
    const fetchedPosts = (await res.json()) as WPPost[];
    const postsById = new Map(fetchedPosts.map((post) => [post.id, post]));
    const posts = selected.posts
        .map((post) => postsById.get(post.id))
        .filter((post): post is WPPost => !!post)
        .filter((post) => post.slug && !shouldHideNewsArticle(post.slug))
        .map((post): WPPost => {
            const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

            return {
                id: post.id,
                slug: post.slug,
                date: post.date,
                title: post.title,
                excerpt: post.excerpt,
                _embedded: image
                    ? { 'wp:featuredmedia': [{ source_url: proxyWpMediaUrl(image) }] }
                    : undefined,
            };
        });
    return { posts, totalPages: selected.totalPages };
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
    const blogPagePath =
        currentPage === 1 ? '/blog' : `/blog?page=${currentPage}`;
    const blogListJsonLd = buildBlogItemListJsonLd(posts, blogPagePath);

    return (
        <>
            <JsonLd id="blog-jsonld" data={blogListJsonLd} />
            <Breadcrumbs crumbs={breadcrumbs} />
            <h1 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                Новости
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
