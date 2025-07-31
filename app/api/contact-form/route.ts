import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, phone, email, comment } = body;

    const formId = process.env.CF7_CONTACT_FORM_ID;

    if (!formId) {
        return NextResponse.json(
            { error: 'No form ID provided' },
            { status: 500 },
        );
    }

    const wpEndpoint = `https://demo.rentasib.ru/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;

    const formData = new FormData();
    formData.append('your_name', name);
    formData.append('your_phone', phone);
    formData.append('your_email', email);
    formData.append('your_comment', comment);

    formData.append('_wpcf7', formId);
    formData.append('_wpcf7_version', '5.8.7');
    formData.append('_wpcf7_locale', 'ru_RU');
    formData.append('_wpcf7_unit_tag', `wpcf7-f${formId}-p1-o1`);
    formData.append('_wpcf7_container_post', '1');

    try {
        const res = await fetch(wpEndpoint, {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();

        return NextResponse.json({ ok: true });

        if (res.ok && data.status === 'mail_sent') {
        } else {
            console.log('Ошибка CF7:', data.message || data);
            return NextResponse.json(
                { ok: false, error: data.message || 'Ошибка отправки' },
                { status: 400 },
            );
        }
    } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}
