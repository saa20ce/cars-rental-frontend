import Link from 'next/link';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
export async function generateMetadata() {
    return await fetchWPMetadata('/dogovor-arendy');
}

export const dynamic = 'force-dynamic';

export default async function Dogovor() {
    const breadcrumbs = await fetchBreadcrumbs('/dogovor-arendy');

    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />

            <section className="pb-0 lg:pb-[68px]">
                <h1 className="text-[24px]/[32px] lg:text-[36px]/[40px] font-bold mb-0 lg:mb-6 ">
                    Договор аренды авто в Рентасиб
                </h1>
                <div className="w-full border-t-2 border-[#284b6348] h-[1px] my-8 lg:my-9"></div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
                    <Link
                        href="/docs/dogovor-arendy.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-11 w-[189px] px-4 py-2 rounded-2xl bg-[#3C6E71] flex justify-center items-center text-[#F6F6F6] font-medium hover:text-[#F6F6F6]"
                    >
                        Смотреть договор
                    </Link>
                    <Link
                        href="/docs/dogovor-arendy.docx"
                        download
                        className="px-4 py-2 w-[189px] h-11 border-[#F6F6F6] border rounded-[16px] flex justify-center items-center hover:text-[#F6F6F6]"
                    >
                        Скачать договор
                    </Link>
                </div>
            </section>
        </>
    );
}
