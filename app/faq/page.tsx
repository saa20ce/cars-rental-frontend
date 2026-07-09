import { HaveQuestions } from '@/components/common/Cards/HaveQuestions';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { faqItems, rawFaqItems } from '@/lib/data/faqItems';
import { Accordion } from '@/lib/ui/common/Accordion';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import JsonLd from '@/components/common/Meta/JsonLd';
import { buildFaqPageJsonLd } from '@/lib/seo/structuredData';

export async function generateMetadata() {
    return await fetchWPMetadata('/faq');
}

export default async function FAQPage() {
    const breadcrumbs = await fetchBreadcrumbs('/faq');
    const faqJsonLd = buildFaqPageJsonLd(rawFaqItems);

    return (
        <>
            <JsonLd id="faq-jsonld" data={faqJsonLd} />
            <Breadcrumbs crumbs={breadcrumbs} />
            <section className="pb-[42px] lg:pb-[68px]">
                <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-5 lg:mb-6">
                    Часто задаваемые вопросы:
                </h1>
                <Accordion items={faqItems} />
            </section>
            <HaveQuestions />
        </>
    );
}
