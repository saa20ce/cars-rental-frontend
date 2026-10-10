import 'server-only';
import { wpFetch } from '@/lib/api/wpCache';
import { isTransferArticleSlug } from './transferArticles';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;
const WP_PAGE_SIZE = 100;

export type NewsSitemapPost = {
    slug: string;
    date: string;
    modified?: string;
};

async function fetchNewsPage(page: number) {
    const params = new URLSearchParams({
        per_page: String(WP_PAGE_SIZE),
        page: String(page),
        _fields: 'slug,date,modified',
    });
    const response = await wpFetch(`${WP_API_URL}/posts?${params}`, {
        next: { tags: ['wordpress-news'] },
    });

    if (!response.ok) {
        throw new Error(`WordPress news sitemap page ${page}: ${response.status}`);
    }

    const posts: unknown = await response.json();
    if (!Array.isArray(posts)) {
        throw new Error(`Invalid WordPress news sitemap page ${page}`);
    }

    return { posts: posts as NewsSitemapPost[], response };
}

export async function getIndexableNewsPosts(): Promise<NewsSitemapPost[]> {
    const firstPage = await fetchNewsPage(1);
    const totalPages = Number(firstPage.response.headers.get('X-WP-TotalPages'));

    if (!Number.isInteger(totalPages) || totalPages < 1) {
        throw new Error('WordPress did not provide a valid news page count');
    }

    const otherPages = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, index) =>
            fetchNewsPage(index + 2),
        ),
    );

    return [firstPage, ...otherPages]
        .flatMap(({ posts }) => posts)
        .filter((post) => post.slug && !isTransferArticleSlug(post.slug));
}
