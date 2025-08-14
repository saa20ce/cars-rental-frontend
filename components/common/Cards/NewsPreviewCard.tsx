import { WPPost } from '@/app/blog/[slug]/page';
import Link from 'next/link';

type NewsPreviewCardProps = {
    news: WPPost;
};

export default function NewsPreviewCard({ news }: NewsPreviewCardProps) {
    const title = news.title.rendered;
    const date = news.date;
    const image = news._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const link = `/news/${news.slug}`;

    return (
        <article className="flex flex-col bg-[#F6F6F60D] mb-4 rounded-[16px] overflow-hidden">
            <Link href={link}>
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full aspect-video object-cover"
                    />
                ) : (
                    <div className="bg-[#F6F6F699] rounded-t-[16px] w-full object-cover aspect-video flex-center">
                        Изображение отсутствует
                    </div>
                )}
            </Link>

            <div className="flex flex-col grow p-6 pt-4">
                <Link href={link}>
                    <h3
                        className="text-[16px]/[24px] font-bold mb-[10px]"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                </Link>

                <p className="text-[14px]/[20px] font-semibold text-[#F6F6F699] mb-4">
                    {new Date(date).toLocaleDateString('ru-RU', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    })}
                </p>

                <Link
                    href={link}
                    className="mt-auto text-[16px]/[24px] font-medium flex-center h-10 rounded-[12px] text-center border border-[#F6F6F6]"
                >
                    Читать далее
                </Link>
            </div>
        </article>
    );
}
