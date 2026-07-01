import ReviewForm from '@/components/common/Form/ReviewForm';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import LetterThanks from '@/components/common/LetterThanks/LetterThanks';
import ReviewsApi from '@/components/common/ReviewsClients/ReviewsApi';
import ReviewsClents from '@/components/common/ReviewsClients/ReviewsClents';
import { fetchDjangoJson } from '@/lib/api/fetchDjangoJson';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';

export async function generateMetadata() {
    return await fetchWPMetadata('/reviews');
}

export default async function ReviewsPage() {
    const breadcrumbs = await fetchBreadcrumbs('/reviews');

    const [reviews, letters] = await Promise.all([
        fetchDjangoJson<Parameters<typeof ReviewsClents>[0]['reviews']>(
            '/api/reviews/?status=published',
            [],
            { next: { revalidate: 60 * 60 } },
        ),
        fetchDjangoJson<Parameters<typeof LetterThanks>[0]['letters']>(
            '/api/thank-you-letters/',
            [],
            { next: { revalidate: 60 * 60 } },
        ),
    ]);

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