"use client";

import Link from "next/link";

type Post = {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: [{ source_url: string }];
  };
};

export function NewsGrid({ posts }: { posts: Post[] }) {
  return (
    <section className="grid gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
        const date = new Date(post.date).toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        return (
          <Link href={`/news/${post.id}`} key={post.id} className="bg-[#1C2B35] p-4 rounded-2xl shadow hover:scale-[1.01] hover:text-[#F6F6F6] transition-transform duration-300">
            <div className="-m-4">
            {image ? (
                <img
                  src={image}
                  alt={post.title.rendered}
                  className="rounded-xl w-full object-cover mb-10 aspect-[360/206] lg:aspect-[404/231]"
                />
              ): (
                <div className="bg-[#F6F6F699] rounded-xl w-full object-cover mb-10 aspect-[360/206] lg:aspect-[404/231] flex-center">
                    Изображение отсутствует 
                </div>
              )}
              </div>
            <h2
              className="text-[18px]/[28px] lg:text-[20px]/[28px] font-bold mb-[10px] lg:mb-3"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <time className="text-[14px]/[20px] lg:text-[16px]/[24px] font-semibold text-[#F6F6F699] ">{date}</time>
            <div
              className="text-[14px]/[20px] lg:text-[16px]/[24px] mt-4 lg:mt-5"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
          </Link>
        );
      })}
    </section>
  );
}
