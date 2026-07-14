import { NextRequest, NextResponse } from 'next/server';
import { sendMaxBotNotification } from '@/lib/api/maxBot';

const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_BASE_URL!;
const CF7_FORM_ID = process.env.CF7_CONTACT_DIRECTOR_FORM_ID!;

export async function POST(req: NextRequest) {
    try {
        const {
            clientName,
            clientEmail,
            clientText,
        } = await req.json();

        if (
            typeof clientName !== 'string' ||
            typeof clientEmail !== 'string' ||
            typeof clientText !== 'string' ||
            !clientName.trim() ||
            !clientEmail.trim() ||
            !clientText.trim()
        ) {
            return NextResponse.json(
                { message: 'Заполните обязательные поля' },
                { status: 400 },
            );
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.trim())) {
            return NextResponse.json(
                { message: 'Введите корректный email' },
                { status: 400 },
            );
        }

        const formData = new FormData();

        formData.append('client_name', clientName.trim());
        formData.append('client_email', clientEmail.trim());
        formData.append('client_text', clientText.trim());

        formData.append('_wpcf7', CF7_FORM_ID);
        formData.append('_wpcf7_version', '5.8.7');
        formData.append('_wpcf7_locale', 'ru_RU');
        formData.append('_wpcf7_unit_tag', `wpcf7-f${CF7_FORM_ID}-p1-o1`);
        formData.append('_wpcf7_container_post', '1');

        const wpRes = await fetch(
            `${WP_BASE_URL}/wp-json/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`,
            {
                method: 'POST',
                body: formData,
            },
        );

        const wpData = await wpRes.json();

        if (!wpRes.ok || wpData.status === 'validation_failed') {
            return NextResponse.json(
                { message: wpData.message || 'Ошибка валидации на WP' },
                { status: 400 },
            );
        }

        await sendMaxBotNotification({
            title: 'Обращение к директору',
            fields: [
                { label: 'Имя', value: clientName.trim() },
                { label: 'Email', value: clientEmail.trim() },
                { label: 'Текст', value: clientText.trim() },
            ],
        });

        return NextResponse.json({ success: true });
    } catch (err: unknown) {
        console.error('API /contact error:', err);
        return NextResponse.json(
            { message: 'Внутренняя ошибка сервера' },
            { status: 500 },
        );
    }
}
