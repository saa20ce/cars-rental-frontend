import { NewsDetail } from '@/app/news/[slug]/page';
import classes from './HtmlContent.module.css';
import { load } from 'cheerio';
import { FaqCollapse } from '@/lib/ui/common/Collapse';

function extractH2Headings(html: string): string[] {
    const $ = load(html);
    const headings: string[] = [];
    $('h2').each((_, el) => {
        const text = $(el).text().trim();
        if (text) headings.push(text);
    });
    return headings;
}

export default function HtmlContent({ details }: { details: NewsDetail }) {
    const headers = extractH2Headings(details.content.rendered);
    const itemCollapse = [
        {
            key: '1',
            label: (
                <span className="text-[#F6F6F6] text-[16px]/[24px] lg:text-[18px]/[28px] font-medium">
                    Содержимое статьи
                </span>
            ),
            children: (
                <ol className="text-[#F6F6F6] text-[14px]/[20px] lg:text-[16px]/[24px] font-normal list-decimal pl-5 lg:pl-6">
                    {headers.map((header) => (
                        <li key={header} className="pb-[10px] lg:pb-3">
                            {header}
                        </li>
                    ))}
                </ol>
            ),
            className:
                'bg-[#F6F6F633] border border-[#F6F6F633] rounded-[20px] mb-[10px]',
        },
    ];
    console.log(details);

    return (
        <div className={classes.content}>
            <h1>{details.title.rendered}</h1>
            <FaqCollapse items={itemCollapse} news={true} />
            <p className="text-[16px]/[24px] lg:text-[18px]/[28px] font-medium text-[#F6F6F699] mb-6 lg:mb-8">
                {new Date(details.date).toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                })}
            </p>
            <div
                dangerouslySetInnerHTML={{
                    __html: details.content.rendered,
                }}
            ></div>
        </div>
    );
}
