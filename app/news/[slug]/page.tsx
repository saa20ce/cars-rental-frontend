import { ReactNode } from "react";

type NewsDetail = {
    content : {
        rendered: string
    }
}

export default async function newsDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const res = await fetch(
        `https://demo.rentasib.ru/wp-json/wp/v2/posts/${slug}`,
    );
    
    const details: NewsDetail = await res.json()
    console.log(details.content.rendered);
    console.log(details);
    
    
    return <article
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: details.content.rendered }}
    />
}
