import NewsCard from '@/components/common/Cards/NewsCard';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';

export default async function NewsPage() {
    const breadcrumbs = await fetchBreadcrumbs('/news');
    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <h1>Новости:</h1>
            <section>
                {/* <NewsCard /> */}
            </section>
        </>
    );
}
