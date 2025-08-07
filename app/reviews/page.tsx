import ReviewForm from '@/components/common/Form/ReviewForm.';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import LetterThanks from '@/components/common/LetterThanks/LetterThanks';
import ReviewsClents from '@/components/common/ReviewsClients/ReviewsClents';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';

export default async function ReviewsPage() {
    const breadcrumbs = await fetchBreadcrumbs('/reviews');

    const [reviewsRes, lettersRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/?status=published`, { cache: 'no-store' }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/thank-you-letters/`, { cache: 'no-store' }),
    ]);

    const reviews = await reviewsRes.json();
    const letters = await lettersRes.json();
    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <LetterThanks letters={letters}/>
            <section className="my-[42px] lg:my-[68px]">
                <h1 className="text-[24px]/[32px] lg:text-[30px]/[36px] font-bold mb-5">
                    Отзывы
                </h1>
                <h3 className="text-[16px]/[24px] lg:text-[20px]/[28px] font-normal">
                    О нашей компании пишут в популярных источниках:
                </h3>
                {
                    <div
                        className="bg-[#fff] mt-8 lg:mt-9"
                        dangerouslySetInnerHTML={{
                            __html: `
      <review-lab data-widgetid="67454ca0eb335cf275d2a8f4"></review-lab>
      <script src="https://app.reviewlab.ru/widget/index-es2015.js" defer></script>
    `,
                        }}
                    ></div>
                }
            </section>
            <ReviewForm />
            <ReviewsClents reviews={reviews}/>
        </>
    );
}
