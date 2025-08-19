'use client';
import { useEffect, useRef } from 'react';

const WIDGET_ID = '67454ca0eb335cf275d2a8f4';

export default function ReviewsApi() {
  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  const current = widgetRef.current; 
  if (current) {
    const reviewLabEl = document.createElement('review-lab');
    reviewLabEl.setAttribute('data-widgetid', '67454ca0eb335cf275d2a8f4');
    current.appendChild(reviewLabEl);

    const script = document.createElement('script');
    script.src = 'https://app.reviewlab.ru/widget/index-es2015.js';
    script.defer = true;
    current.appendChild(script);
  }

  return () => {
    if (current) current.innerHTML = ''; 
  };
}, []);

  return (
    <section className="mt-[42px] mb-[18px] lg:mt-[68px] lg:mb-[44px]">
      <h1 className="text-[24px]/[32px] lg:text-[30px]/[36px] font-bold mb-5">
        Отзывы
      </h1>
      <h3 className="text-[16px]/[24px] lg:text-[20px]/[28px] font-normal mb-8 lg:mb-9">
        О нашей компании пишут в популярных источниках:
      </h3>
      <div ref={widgetRef} className="w-full h-[500px]" />
    </section>
  );
}