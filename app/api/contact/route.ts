import { NextRequest, NextResponse } from 'next/server';

const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_BASE_URL!;
const CF7_FORM_ID = process.env.CF7_FORM_ID!;

export async function POST(req: NextRequest) {
    try {
        const {
            clientName,
            phone,
            autoName,
            autoColor,
            rentDate,
            rentPeriod,
            delivery,
            options,
            comment,
            totalPrice,
            pricePerDay,
        } = await req.json();

        const formData = new FormData();

        formData.append('client-name', clientName);
        formData.append('client-phone', phone);
        formData.append('auto-name', autoName);
        formData.append('auto-color', autoColor);
        formData.append('rent-date', rentDate);
        formData.append('rent-period', rentPeriod);
        formData.append('delivery', delivery);
        formData.append('options', options);
        formData.append('comment', comment);
        formData.append('price', totalPrice);
        formData.append('day-price', pricePerDay);

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
