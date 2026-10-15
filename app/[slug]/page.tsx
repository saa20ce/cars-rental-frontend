import NewsPreviewCard from '@/components/common/Cards/NewsPreviewCard';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import HtmlContent from '@/components/common/HtmlContent/HtmlContent';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import { wpFetch } from '@/lib/api/wpCache';
import { proxyWpMediaUrl } from '@/lib/api/wpMediaProxy';
import type { WPPost, WPPostDetails } from '@/lib/types/News';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/common/Meta/JsonLd';
import { buildBlogPostingJsonLd } from '@/lib/seo/structuredData';
import { removeLegacyCarCatalogue } from '@/lib/seo/articleContent';
import { shouldHideNewsArticle, shouldNoindexNewsArticle } from '@/lib/seo/transferArticles';
import type { Metadata } from 'next';
import { load } from 'cheerio';
import Link from 'next/link';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;
const NEWS_SUMMARY_FIELDS =
    'id,slug,date,title,excerpt,featured_media,_links,_embedded';
const NEWS_DETAIL_FIELDS = 'id,slug,date,title,content,_links,_embedded';
const RELATED_NEWS_FIELDS = 'id,slug,date,title,_links,_embedded';

type WPPostSummary = WPPost & {
    featured_media?: number;
};

function detailsFromSummary(post: WPPostSummary): WPPostDetails {
    return {
        ...post,
        content: {
            rendered: post.excerpt?.rendered || '',
        },
    };
}

async function fetchPostSummary(slug: string) {
    const params = new URLSearchParams({
        slug,
        _embed: 'wp:featuredmedia',
        _fields: NEWS_SUMMARY_FIELDS,
    });
    const res = await wpFetch(`${WP_API_URL}/posts?${params}`, {
        next: { tags: ['wordpress-news'] },
    });

    // A temporary WordPress failure is not evidence that the article was
    // removed. Only an empty, successful search means the slug is missing.
    if (!res.ok) {
        throw new Error(
            `WordPress article lookup failed for ${slug}: ${res.status}`,
        );
    }

    const data = (await res.json()) as WPPostSummary[];
    if (!Array.isArray(data)) {
        throw new Error(
            `WordPress article lookup returned invalid data for ${slug}`,
        );
    }

    return data[0];
}

async function fetchPostDetails(post: WPPostSummary) {
    const params = new URLSearchParams({
        _embed: 'wp:featuredmedia',
        _fields: NEWS_DETAIL_FIELDS,
    });
    const res = await wpFetch(`${WP_API_URL}/posts/${post.id}?${params}`, {
        next: { tags: ['wordpress-news'] },
    });

    if (!res.ok) return detailsFromSummary(post);

    const details = (await res.json()) as WPPostDetails;

    if (!details?.content?.rendered) return detailsFromSummary(post);

    return details;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;

    if (shouldHideNewsArticle(slug)) notFound();
    const metadata = await fetchWPMetadata('/' + slug);

    if (!shouldNoindexNewsArticle(slug)) return metadata;

    return {
        ...metadata,
        robots: { index: false, follow: true },
    };
}

export default async function NewsDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    if (shouldHideNewsArticle(slug)) notFound();

    const summary = await fetchPostSummary(slug);
    if (!summary) notFound();

    const details = await fetchPostDetails(summary);
    const relatedParams = new URLSearchParams({
        _embed: 'wp:featuredmedia',
        per_page: '6',
        exclude: String(details.id),
        orderby: 'rand',
        _fields: RELATED_NEWS_FIELDS,
    });

    const [breadcrumbs, newsRes] = await Promise.all([
        fetchBreadcrumbs(`/blog/${slug}`, { currentPageHref: `/${slug}` }),
        wpFetch(`${WP_API_URL}/posts?${relatedParams}`, {
            next: { tags: ['wordpress-news'] },
        }),
    ]);

    const news: WPPost[] = newsRes.ok
        ? ((await newsRes.json()) as WPPost[]).filter(
              (item) => item.slug && !shouldHideNewsArticle(item.slug),
          )
        : [];
    const image = details._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const proxiedImage = proxyWpMediaUrl(image);
    const imageAlt = load(details.title.rendered).text().trim() || 'Иллюстрация к статье';
    const articleJsonLd = buildBlogPostingJsonLd({
        post: details,
        pagePath: `/${slug}`,
        image,
    });
    const articleDetails =
        slug === 'arenda-mikroavtobusa-v-novosibirske'
            ? {
                  ...details,
                  content: {
                      ...details.content,
                      rendered: removeLegacyCarCatalogue(details.content.rendered),
                  },
              }
            : details;

    return (
        <>
            <JsonLd id="article-jsonld" data={articleJsonLd} />
            <Breadcrumbs crumbs={breadcrumbs} />
            <div className="flex gap-0 lg:gap-6 flex-col lg:flex-row mt-6 lg:mt-8">
                <article className="article" style={{ flex: 3 }}>
                    {image && (
                        <Image
                            src={proxiedImage}
                            alt={imageAlt}
                            width={900}
                            height={520}
                            sizes="(max-width: 1024px) 100vw, 75vw"
                            className="w-full h-auto block rounded-[32px] mb-5 lg:mb-6"
                        />
                    )}
                    <HtmlContent details={articleDetails} />
                    {slug === 'arenda-mikroavtobusa-v-novosibirske' && (
                        <p className="mt-6 rounded-2xl bg-[#1E384A] p-5 text-[16px]/[24px] lg:text-[18px]/[28px]">
                            Подберите автомобиль для самостоятельной поездки в
                            разделе{' '}
                            <Link
                                href="/service/prokat-minivenov-i-mikroavtobusov"
                                className="font-semibold text-[#FFD7A6] underline underline-offset-4"
                            >
                                аренды минивэнов и микроавтобусов
                            </Link>
                            .
                        </p>
                    )}
                </article>
                <aside className="mt-[42px] lg:mt-0 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:block flex-1 lg:max-w-[297px]">
                    {news.map((item) => (
                        <NewsPreviewCard key={item.id} news={item} />
                    ))}
                </aside>
            </div>
        </>
    );
}
