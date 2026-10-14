export function paginateNewsPosts<T>(
    posts: readonly T[],
    page: number,
    perPage = 9,
): { posts: T[]; totalPages: number } | null {
    if (!Number.isInteger(page) || page < 1 || perPage < 1) return null;

    const totalPages = Math.max(1, Math.ceil(posts.length / perPage));
    if (page > totalPages) return null;

    return {
        posts: posts.slice((page - 1) * perPage, page * perPage),
        totalPages,
    };
}
