'use client';

import Link from 'next/link';
import { Checkbox, Form } from 'antd';

export const PERSONAL_DATA_CONSENT_HREF =
    '/docs/02-soglasie-na-obrabotku-pdn-dlya-sajta-ooo-rentasib.pdf';

export const PERSONAL_DATA_POLICY_HREF =
    '/docs/01-politika-obrabotki-pdn-ooo-rentasib.pdf';

export function PersonalDataConsentText() {
    return (
        <span className="font-semibold text-[12px]/[16px] lg:text-[14px]/[20px] text-[#F6F6F699]">
            Нажимая кнопку, я даю свое{' '}
            <Link
                href={PERSONAL_DATA_CONSENT_HREF}
                className="underline text-[#F6F6F6]"
                target="_blank"
                rel="noopener noreferrer"
            >
                Согласие на обработку персональных данных
            </Link>{' '}
            и соглашаюсь с{' '}
            <Link
                href={PERSONAL_DATA_POLICY_HREF}
                className="underline text-[#F6F6F6]"
                target="_blank"
                rel="noopener noreferrer"
            >
                Политикой обработки персональных данных
            </Link>
            .
        </span>
    );
}

export function PersonalDataConsentFormItem({
    className = '',
}: {
    className?: string;
}) {
    return (
        <Form.Item
            name="personalDataConsent"
            valuePropName="checked"
            className={className}
            rules={[
                {
                    validator: (_, value) =>
                        value
                            ? Promise.resolve()
                            : Promise.reject(
                                  new Error('Подтвердите согласие'),
                              ),
                },
            ]}
        >
            <Checkbox className="personal-data-consent-checkbox">
                <PersonalDataConsentText />
            </Checkbox>
        </Form.Item>
    );
}