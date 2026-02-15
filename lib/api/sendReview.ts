export type ReviewPayload = {
  full_name: string;
  phone: string;
  email: string;
  review_text: string;
  rating: number; 
};

export async function sendReview(data: ReviewPayload) {
  const base = process.env.DJANGO_INTERNAL_API;
  if (!base) throw new Error('DJANGO_INTERNAL_API is not set');

  const res = await fetch(`${base}/api/reviews/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ошибка при отправке отзыва (${res.status}): ${text}`);
  }
  return res.json();
}
