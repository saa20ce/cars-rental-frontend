export default function ReviewsApi() {
    return (
        <section className="mt-[42px] mb-[18px] lg:mt-[68px] lg:mb-[44px]">
            <h1 className="text-[24px]/[32px] lg:text-[30px]/[36px] font-bold mb-5">
                Отзывы
            </h1>
            <h3 className="h text-[16px]/[24px] lg:text-[20px]/[28px] font-normal mb-8 lg:mb-9">
                О нашей компании пишут в популярных источниках:
            </h3>
            {
                <div
                    dangerouslySetInnerHTML={{
                        __html: `
      <review-lab data-widgetid="67454ca0eb335cf275d2a8f4"></review-lab>
      <script src="https://app.reviewlab.ru/widget/index-es2015.js" defer></script>
    `,
                    }}
                ></div>
            }
        </section>
    );
}
