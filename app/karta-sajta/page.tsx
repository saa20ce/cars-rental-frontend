import Link from 'next/link';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import { mapSite } from '@/lib/data/mapSite';
export async function generateMetadata() {
    return await fetchWPMetadata('/karta-sajta');
}

export const dynamic = 'force-dynamic';

export default async function MapSite() {
    const breadcrumbs = await fetchBreadcrumbs('/karta-sajta');

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />

            <section className="pb-0 lg:pb-[68px]">
                <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-0 lg:mb-6">
                    Карта сайта
                </h1>
                <div className="w-full border-t-2 border-[#284b6348] h-[1px] my-8 lg:my-9 hidden lg:block"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                    {mapSite.map((section) => (
                        <div key={section.title}>
                            <div className="w-full border-t-2 border-[#284b6348] h-[1px] my-8 lg:my-9 lg:hidden"></div>

                            <div className="text-lg lg:text-2xl lg:font-bold text-[#f6f6f694] lg:mb-5 mb-4">{section.title}</div>

                            <ul className="space-y-2">
                                {section.items.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="hover:text-[#f6f6f6] underline-offset-4 hover:underline"
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
