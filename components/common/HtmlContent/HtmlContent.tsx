import { NewsDetail } from '@/app/news/[slug]/page';
import classes from './HtmlContent.module.css';
import { load } from 'cheerio';
import { Accordion } from '@/lib/ui/common/Accordion';

function extractH2Headings(html: string): string[] {
    const $ = load(html);
    const headings: string[] = [];
    $('h2').each((_, el) => {
        const text = $(el).text().trim();
        if (text) headings.push(text);
    });
    return headings;
}

function replaceH1WithH2(html: string): string {
    const $ = load(html);
    $('h1').each((_, el) => {
        const h1 = $(el);
        const newEl = $('<h2></h2>').html(h1.html() || '');
        h1.replaceWith(newEl);
    });
    return $.html();
}

export default function HtmlContent({ details }: { details: NewsDetail }) {
    const cleanedHtml = replaceH1WithH2(details.content.rendered);
    const headers = extractH2Headings(cleanedHtml);
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

    return (
        <div className={classes.content}>
            <h1>{details.title.rendered}</h1>
            <Accordion items={itemCollapse} />
            <p className="date text-[16px]/[24px] lg:text-[18px]/[28px] font-medium text-[#F6F6F699] mb-6 lg:mb-8">
                {new Date(details.date)
                    .toLocaleDateString('ru-RU', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    })
                    .replace(/ г\.?$/, '')}{' '}
                &mdash; Блог
            </p>
            <div
                dangerouslySetInnerHTML={{
                    __html: cleanedHtml,
                }}
            ></div>
        </div>
    );
}
