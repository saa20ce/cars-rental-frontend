import { FaqCollapse } from '@/lib/ui/common/Collapse';
import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';

export default async function FAQPage() {
    const breadcrumbs = await fetchBreadcrumbs('/faq');

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <FaqCollapse />
            <HaveQuestions />
        </>
    );
}
