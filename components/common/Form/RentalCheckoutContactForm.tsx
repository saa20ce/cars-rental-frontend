'use client';

import React, { useState } from 'react';
import {
    ConfigProvider,
    Button,
    Input,
    Form,
    message,
    Checkbox,
    CheckboxChangeEvent,
} from 'antd';
import { CustomInput } from '@/lib/ui/common/Input/CustomInput';
import { InputMask } from '@react-input/mask';
import { PersonalDataConsentFormItem } from './PersonalDataConsent';
import {
    normalizeAdditionalOptionsValue,
    normalizeContactViaValue,
    normalizeDeliveryValue,
} from '@/lib/helpers/formPayloadLabels';

type ContactViaValue = 'telegram' | 'max' | 'phone';

interface FormValues {
    clientName: string;
    phone: string;
    comment: string;
    autoName: string;
    autoColor: string;
    rentDate: string;
    rentPeriod: string;
    delivery: string;
    options: string;
    totalPrice: number;
    pricePerDay: number;
    personalDataConsent: boolean;
}

interface RentalCheckoutContactFormProps {
    autoName: string | undefined;
    autoColor: string;
    rentDate: string;
    rentPeriod: string;
    delivery: string;
    options: string;
    totalPrice: number;
    pricePerDay: number;
    comment?: string;
    onSuccess?: () => void;
}

export const RentalCheckoutContactForm: React.FC<
    RentalCheckoutContactFormProps
> = ({
    autoName,
    autoColor,
    rentDate,
    rentPeriod,
    delivery,
    options,
    totalPrice,
    pricePerDay,
    comment,
    onSuccess,
}) => {
        const initialValues: Partial<FormValues> = {
            autoName,
            autoColor,
            rentDate,
            rentPeriod,
            delivery,
            options,
            comment,
            totalPrice,
            pricePerDay,
        };

        const [loading, setLoading] = useState(false);
        const [contactVia, setContactVia] = useState<ContactViaValue | null>(null);
        const handleContactViaChange =
            (value: ContactViaValue) => (e: CheckboxChangeEvent) => {
                setContactVia(e.target.checked ? value : null);
            };

        const onFinish = async (values: FormValues) => {
            setLoading(true);

            const payload = {
                clientName: values.clientName,
                phone: values.phone,
                autoName: values.autoName,
                autoColor: values.autoColor,
                rentDate: values.rentDate,
                rentPeriod: values.rentPeriod,
                totalPrice: values.totalPrice,
                pricePerDay: values.pricePerDay,
                delivery: normalizeDeliveryValue(values.delivery),
                options: normalizeAdditionalOptionsValue(values.options),
                contactVia: normalizeContactViaValue(contactVia),
                comment: values.comment?.trim()
                    ? values.comment
                    : 'Без комментария',
            };
            try {
                const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                const data = await res.json();
                if (res.ok) {
                    message.success('Заявка отправлена!');
                    onSuccess?.();
                } else {
                    message.error(data.message || 'Ошибка отправки');
                }
            } catch (err) {
                console.error(err);
                message.error('Сетевая ошибка');
            } finally {
                setLoading(false);
            }
        };

        return (
            <>
                <div className="border-t-[1px] border-solid border-[#f6f6f638] pb-[14px] mt-[14px] lg:pb-[16px] lg:mt-[16px]"></div>
                <h2 className="font-semibold text-[16px]/[24px] lg:text-[18px]/[28px] mb-[10px]">Ваши контактные данные:</h2>

                <ConfigProvider
                    theme={{
                        components: {
                            Form: {
                                itemMarginBottom: 12,
                            },
                        },
                    }}
                >
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={initialValues}
                    >
                        <div className="lg:flex lg:gap-[10px]">
                            <Form.Item
                                className="flex-1"
                                name="clientName"
                                label={
                                    <label className="lg:text-sm text-xs text-[#f6f6f6]">
                                        Ваше имя
                                    </label>
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: 'Введите имя',
                                    },
                                ]}
                            >
                                <CustomInput placeholder="Иван" />
                            </Form.Item>
                            <Form.Item
                                className="flex-1"
                                name="phone"
                                label={
                                    <label className="lg:text-sm text-xs text-[#f6f6f6]">
                                        Номер телефона
                                    </label>
                                }
                                rules={[
                                    { required: true, message: 'Введите телефон' },
                                ]}
                            >
                                <InputMask
                                    mask="+7 (___) ___-__-__"
                                    replacement={{ _: /\d/ }}
                                    placeholder="+7 "
                                />
                            </Form.Item>
                        </div>

                        <Form.Item
                            name="comment"
                            label={
                                <label className="lg:text-sm text-xs text-[#f6f6f6]">
                                    Комментарий
                                </label>
                            }
                        >
                            <Input.TextArea
                                className="custom-textarea"
                                placeholder="Введите..."
                                autoSize={{ minRows: 3, maxRows: 6 }}
                            />
                        </Form.Item>

                        <Form.Item name="autoName" className="hidden">
                            <Input disabled />
                        </Form.Item>

                        <Form.Item name="autoColor" className="hidden">
                            <Input disabled />
                        </Form.Item>

                        <Form.Item name="rentDate" className="hidden">
                            <Input disabled />
                        </Form.Item>

                        <Form.Item name="rentPeriod" className="hidden">
                            <Input disabled />
                        </Form.Item>

                        <Form.Item name="delivery" className="hidden">
                            <Input disabled />
                        </Form.Item>

                        <Form.Item name="options" className="hidden">
                            <Input disabled />
                        </Form.Item>

                        <Form.Item name="totalPrice" className="hidden">
                            <Input disabled />
                        </Form.Item>

                        <Form.Item name="pricePerDay" className="hidden">
                            <Input disabled />
                        </Form.Item>

                        <div className="flex flex-col gap-0 mb-[14px]">
                            <Form.Item className="mt-[24px] lg:mt-[14px]">
                                <Checkbox
                                    className="flex items-center"
                                    checked={contactVia === 'telegram'}
                                    onChange={handleContactViaChange('telegram')}
                                >
                                    Связаться через Telegram
                                </Checkbox>
                            </Form.Item>

                            <Form.Item className="mt-0 lg:mt-[8px]">
                                <Checkbox
                                    className="flex items-center"
                                    checked={contactVia === 'max'}
                                    onChange={handleContactViaChange('max')}
                                >
                                    Связаться через Max
                                </Checkbox>
                            </Form.Item>

                            <Form.Item className="mt-0 lg:mt-[8px]">
                                <Checkbox
                                    className="flex items-center"
                                    checked={contactVia === 'phone'}
                                    onChange={handleContactViaChange('phone')}
                                >
                                    Позвонить на телефон
                                </Checkbox>
                            </Form.Item>
                        </div>

                        <Form.Item className="mb-0">
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            defaultBg: '#3c6e71',
                                            defaultBorderColor: '#3c6e71',
                                            defaultColor: '#f6f6f6',
                                            contentFontSize: 16,
                                            controlHeight: 42,
                                            textHoverBg: '#f6f6f6',
                                            colorPrimaryHover: '#f6f6f6',
                                            colorBorderSecondary: '#3c6e71',
                                            colorBorderBg: '#3c6e71',
                                            colorBgContainer: '#3c6e71',
                                            colorPrimaryBorderHover: '#3c6e71',
                                            defaultHoverBorderColor: '#3c6e71',
                                            defaultActiveBorderColor: '#3c6e71',
                                            defaultActiveColor: '#f6f6f6',
                                            colorBorder: '#3c6e71',
                                            colorBgTextActive: '#3c6e71',
                                        },
                                    },
                                }}
                            >
                                <Button
                                    className="rounded-xl mt-1 lg:mt-2 lg:text-xl lg:h-[60px] lg:rounded-2xl"
                                    block
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    Оставить заявку
                                </Button>

                                <PersonalDataConsentFormItem className="lg:mb-8 mb-6 mt-2" />
                            </ConfigProvider>
                        </Form.Item>
                    </Form>
                </ConfigProvider>


                <style jsx global>{`
                    .ant-form * {
                        font-family: var(--font-lato), Arial, Helvetica, sans-serif;
                        & label {
                            @apply text-[12px]/[16px] lg:text-[14px]/[20px] font-medium;
                        }
                    }
                    .ant-form .ant-form-item-control .ant-form-item-control-input-content input,
                    .ant-form-item-control-input-content textarea {
                        margin: 0 !important;
                    }

                    label.ant-form-item-required::before {
                        display: none !important;
                    }

                    .ant-form-item-control-input-content input::placeholder,
                    .ant-form-item-control-input-content textarea::placeholder {
                        color: #f6f6f699;
                    }

                    textarea.ant-input:focus,
                    textarea.ant-input:hover {
                        background-color: #f6f6f633 !important;
                        border: none !important;
                        box-shadow: none !important;
                    }

                    .ant-form-item-control-input-content input,
                    .ant-form-item-control-input-content textarea {
                        width: 100%;
                        margin-top: 10px;
                        margin-bottom: 12px;
                        color: #f6f6f6;
                        padding: 0.5rem 1rem;
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 20px;
                        background-color: #f6f6f633;
                        border-radius: 16px;
                        height: 36px;
                        border: none;
                        outline: none;
                    }
                    .custom-textarea {
                        min-height: 78px !important;
                    }

                    @media (min-width: 1024px) {
                        .ant-form-item-control-input-content input,
                        .ant-form-item-control-input-content textarea {
                            margin-top: 0.75rem;
                            margin-bottom: 14px;
                            padding-top: 10px;
                            padding-bottom: 10px;
                            font-size: 16px;
                            line-height: 24px;
                            height: 48px;
                        }
                        .custom-textarea {
                            min-height: 100px !important;
                        }
                    }

                `}</style>
            </>
        );
    };
