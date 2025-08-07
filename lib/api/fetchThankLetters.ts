export interface ThankYouLetter {
    id: number;
    image: string;
    description: string;
    created_at: string;
}

export async function fetchThankYouLetters(): Promise<ThankYouLetter[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/thank-you-letters/`);

    if (!res.ok) {
        throw new Error('Ошибка при загрузке благодарственных писем');
    }

    return await res.json();
}
