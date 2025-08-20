import { BreadcrumbsRightIcon } from '@/lib/ui/icons/BreadcrumbsRightIcon';
import Link from 'next/link';

export default function Breadcrumbs({
    crumbs,
}: {
    crumbs: { title: string; href?: string }[];
}) {
    return (
        <nav className="bg-[#1e384a] py-[10px] px-5 lg:py-3 lg:px-7 rounded-[24px] text-[16px]/[24px] lg:text-[18px]/[28px] font-normal mb-6 lg:mb-8">
            <div className="flex items-center overflow-hidden">
                {crumbs.map((crumb, index) => {
                    const isLast = index === crumbs.length - 1;
                    return (
                        <div key={index} className="flex items-center">
                            {!isLast ? (
                                <>
                                    <Link
                                        href={crumb.href || '#'}
                                        className="text-[#f6f6f6] hover:text-[#f6f6f6] hover:bg-[#1e384a] transition-colors rounded px-[2px]"
                                    >
                                        {crumb.title}
                                    </Link>
                                    <BreadcrumbsRightIcon className="mx-[10px]" />
                                </>
                            ) : (
                                <span className="font-bold text-[18px]/[28px] cursor-default  whitespace-nowrap">
                                    {crumb.title}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </nav>
    );
}
