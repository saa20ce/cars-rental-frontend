'use client';

import CustomButton from '@/lib/ui/common/Button';
import { InputMask } from '@react-input/mask';
import Link from 'next/link';
import { useState } from 'react';
import SuccessRequest from '../Modal/SuccessRequest';
import { Modal, Form, Input, message, ConfigProvider } from 'antd';
import ErrorBanner from '../ErrorBanner/ErrorBanner';

interface FormValues {
    name: string;
    phone: string;
    email: string;
    comment?: string;
}

export default function ContactForm() {
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');
    const [form] = Form.useForm<FormValues>();

    const onFinish = async (values: FormValues) => {
        setStatus('loading');

        try {
            const payload = {
                name: values.name.trim(),
                phone: values.phone.trim(),
                email: values.email.trim(),
                comment: values.comment?.trim() ? values.comment : 'Без комментария',
            };

            const res = await fetch('/api/contact-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json().catch(() => null);

            if (res.ok) {
                setStatus('success');
                form.resetFields();
            } else {
                console.error('contact-form error:', data);
                message.error(data?.message || 'Ошибка отправки');
                setStatus('error');

                setTimeout(() => {
                    setStatus('idle');
                }, 2000);
            }
        } catch (err) {
            console.error('contact-form network error:', err);
            message.error('Сетевая ошибка');
            setStatus('error');

            setTimeout(() => {
                setStatus('idle');
            }, 2000);
        }
    };

    return (
        <section className="mt-[42px] lg:mt-[68px] bg-[#284B63] rounded-[24px] lg:rounded-[32px] py-7 px-6 lg:py-[68px] lg:px-12">
            <h2 className="font-bold text-[20px]/[28px] lg:text-[30px]/[36px] mb-4 lg:mb-6">
                Хотите связаться с нами?
            </h2>
            <h3 className="font-normal text-[16px]/[24px] lg:text-[18px]/[28px] mb-5 lg:mb-[32px]">
                Отправьте форму заявки и мы рассмотрим ваше предложение и
                свяжемся с вами!
            </h3>

            <ConfigProvider
                theme={{
                    components: {
                        Form: {
                            itemMarginBottom: 12,
                        },
                    },
                }}
            >
                <Form<FormValues>
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="mt-[10px]"
                >
                    <div className="lg:flex lg:gap-9">
                        <div className="flex-1 lg:max-w-[454px]">
                            <Form.Item
                                name="name"
                                label={
                                    <label className="font-semibold text-[12px]/[16px] lg:text-[14px]/[20px] text-[#F6F6F6]">
                                        Фамилия и имя
                                    </label>
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: 'Введите фамилию и имя',
                                    },
                                ]}
                            >
                                <Input
                                    className="contact-form-input"
                                    placeholder="Введите..."
                                />
                            </Form.Item>

                            <Form.Item
                                name="phone"
                                label={
                                    <label className="font-semibold text-[12px]/[16px] lg:text-[14px]/[20px] text-[#F6F6F6]">
                                        Номер телефона
                                    </label>
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: 'Введите телефон',
                                    },
                                ]}
                            >
                                <InputMask
                                    className="contact-form-input"
                                    mask="+7 (___) ___-__-__"
                                    replacement={{ _: /\d/ }}
                                    placeholder="+7 "
                                />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label={
                                    <label className="font-semibold text-[12px]/[16px] lg:text-[14px]/[20px] text-[#F6F6F6]">
                                        Email
                                    </label>
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: 'Введите email',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Введите корректный email',
                                    },
                                ]}
                            >
                                <Input
                                    className="contact-form-input"
                                    type="email"
                                    placeholder="Введите..."
                                />
                            </Form.Item>
                        </div>

                        <div className="flex-1 flex flex-col">
                            <Form.Item
                                name="comment"
                                label={
                                    <label className="font-semibold text-[12px]/[16px] lg:text-[14px]/[20px] text-[#F6F6F6]">
                                        Комментарий
                                    </label>
                                }
                            >
                                <Input.TextArea
                                    className="contact-form-textarea"
                                    placeholder="Введите..."
                                    autoSize={{ minRows: 8, maxRows: 8 }}
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row-reverse lg:items-center mt-8 lg:mt-9 lg:justify-between gap-3">
                        <CustomButton
                            variant="default"
                            className="p-3 rounded-[16px] lg:p-[18px] lg:mb-0 lg:text-[20px]/[28px] lg:max-w-[247px]"
                            style={{
                                width: '100%',
                            }}
                            htmlType="submit"
                            loading={status === 'loading'}
                        >
                            Отправить
                        </CustomButton>

                        <p className="font-semibold text-[12px]/[16px] lg:text-[14px]/[20px] text-[#F6F6F699]">
                            При нажатии кнопки &quot;Отправить&quot;, я подтверждаю,
                            что ознакомлен с условиями и согласен на{' '}
                            <Link href="#" className="underline text-[#F6F6F6] ">
                                обработку моих персональных данных
                            </Link>
                            .
                        </p>
                    </div>
                </Form>
            </ConfigProvider>

            <Modal
                open={status === 'success'}
                footer={null}
                closeIcon={false}
                onCancel={() => setStatus('idle')}
                maskClosable={true}
                centered
                style={{ top: 0, left: 0, margin: 0, padding: 0 }}
                styles={{
                    mask: {
                        backdropFilter: 'blur(30px)',
                        WebkitBackdropFilter: 'blur(30px)',
                    },
                    content: {
                        display: 'block',
                        background: 'transparent',
                        boxShadow: 'none',
                        padding: 0,
                    },
                }}
            >
                <SuccessRequest
                    header="Ваша заявка принята!"
                    text="Мы свяжемся с вами в течение 5 минут"
                    onClick={() => setStatus('idle')}
                />
            </Modal>

            {status === 'error' && <ErrorBanner />}

            <style jsx global>{`
                .ant-form * {
                    font-family: var(--font-lato), Arial, Helvetica, sans-serif;
                }

                label.ant-form-item-required::before {
                    display: none !important;
                }

                .ant-form-item {
                    margin-bottom: 12px;
                }

                .contact-form-input,
                .contact-form-textarea {
                    width: 100%;
                    color: #f6f6f6 !important;
                    background-color: #f6f6f633 !important;
                    border-radius: 16px !important;
                    border: none !important;
                    box-shadow: none !important;
                    outline: none !important;
                }

                .contact-form-input {
                    margin-top: 0px;
                    margin-bottom: 0px;
                    padding: 0.5rem 1rem;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 20px;
                    height: 36px;
                }

                .contact-form-textarea {
                    min-height: 78px !important;
                    margin-top: 0px;
                    padding: 0.5rem 1rem;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 20px;
                    resize: none;
                }

                .contact-form-input::placeholder,
                .contact-form-textarea::placeholder {
                    color: #f6f6f699 !important;
                }

                .contact-form-input:focus,
                .contact-form-input:hover,
                .contact-form-textarea:focus,
                .contact-form-textarea:hover {
                    background-color: #f6f6f633 !important;
                    border: none !important;
                    box-shadow: none !important;
                }

                @media (min-width: 1024px) {
                    .contact-form-input {
                        margin-top: 0px;
                        margin-bottom: 0px;
                        padding-top: 10px;
                        padding-bottom: 10px;
                        font-size: 16px;
                        line-height: 24px;
                        height: 44px;
                    }

                    .contact-form-textarea {
                        min-height: 100% !important;
                        margin-top: 0px;
                        padding-top: 10px;
                        padding-bottom: 10px;
                        font-size: 16px;
                        line-height: 24px;
                    }
                }
            `}</style>
        </section>
    );
}