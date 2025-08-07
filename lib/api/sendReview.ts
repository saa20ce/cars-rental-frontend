export async function sendReview(data: {
    full_name: string;
    phone: string;
    email: string;
    review_text: string;
    rating: number;
}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Ошибка при отправке отзыва');
    }

    return await res.json();
}
