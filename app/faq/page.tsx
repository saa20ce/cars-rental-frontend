import { FaqCollapse } from '@/lib/ui/common/Collapse';
import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';

export default async function FAQPage() {
    return (
        <>
            <FaqCollapse />
            <HaveQuestions />
        </>
    );
}
