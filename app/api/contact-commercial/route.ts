import { NextRequest, NextResponse } from 'next/server';

const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_BASE_URL!;
const CF7_FORM_ID = process.env.CF7_CONTACT_COMMERTIAL_FORM_ID!;

export async function POST(req: NextRequest) {
    try {
        const {
            classAuto,
            clientBudget,
            clientName,
            clientEmail
        } = await req.json();

        const formData = new FormData();

        formData.append('class_auto', classAuto);
        formData.append('client_budget', clientBudget);
        formData.append('client_name', clientName);
        formData.append('client_email', clientEmail);

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

        return NextResponse.json({ success: true });
    } catch (err: unknown) {
        console.error('API /contact error:', err);
        return NextResponse.json(
            { message: 'Внутренняя ошибка сервера' },
            { status: 500 },
        );
    }
}
