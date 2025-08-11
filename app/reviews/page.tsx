import ReviewForm from '@/components/common/Form/ReviewForm.';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import LetterThanks from '@/components/common/LetterThanks/LetterThanks';
import ReviewsApi from '@/components/common/ReviewsClients/ReviewsApi';
import ReviewsClents from '@/components/common/ReviewsClients/ReviewsClents';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';

export default async function ReviewsPage() {
    const breadcrumbs = await fetchBreadcrumbs('/reviews');

    const [reviewsRes, lettersRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/?status=published`, {
            cache: 'no-store',
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/thank-you-letters/`, {
            cache: 'no-store',
        }),
    ]);

    const reviews = await reviewsRes.json();
    const letters = await lettersRes.json();
    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <LetterThanks letters={letters} />
            <ReviewsApi />
            <ReviewForm />
            <ReviewsClents reviews={reviews} />
        </>
    );
}
