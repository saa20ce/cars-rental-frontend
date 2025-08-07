export type CustomerReview = {
    id: number;
    full_name: string;
    rating: number;
    review_text: string;
    submitted_at: string;
};

export async function fetchCustomerReviews(): Promise<CustomerReview[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/?status=published`);

    if (!res.ok) throw new Error('Не удалось загрузить отзывы');

    return await res.json();
}
