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
}

export default function AnyQuestionsForm() {
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
            };

            const res = await fetch('/api/fast-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json().catch(() => null);

            if (res.ok) {
                setStatus('success');
                form.resetFields();
            } else {
                console.error('fast-form error:', data);
                message.error(data?.message || 'Ошибка отправки');
                setStatus('error');

                setTimeout(() => {
                    setStatus('idle');
                }, 2000);
            }
        } catch (err) {
            console.error('fast-form network error:', err);
            message.error('Сетевая ошибка');
            setStatus('error');

            setTimeout(() => {
                setStatus('idle');
            }, 2000);
        }
    };

    return (
        <section className="mt-[42px] lg:mt-[68px] bg-[#1E384A] rounded-[24px] lg:rounded-[32px] py-7 px-6 lg:py-[68px] lg:px-12 flex flex-col lg:flex-row lg:justify-between">
            <div className="w-full lg:max-w-[364px]">
                <h2 className="font-bold text-[20px]/[28px] lg:text-[30px]/[36px] mb-4 lg:mb-6">
                    Остались вопросы?
                </h2>
                <p className="font-normal text-[16px]/[24px] mb-8">
                    Отправьте заявку и мы позвоним вам в течение 5 минут, чтобы
                    ответить на все необходимые вопросы и помочь с арендой
                    автомобиля.
                </p>
            </div>

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
                    className="lg:max-w-[719px] w-full"
                >
                    <div className="flex flex-col lg:flex-row lg:gap-4">
                        <div className="flex-1">
                            <Form.Item
                                name="name"
                                label={
                                    <label className="font-medium text-[14px]/[20px] lg:text-[16px]/[24px] text-[#F6F6F6]">
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
                                    className="any-questions-input"
                                    placeholder="Введите..."
                                />
                            </Form.Item>
                        </div>

                        <div className="flex-1">
                            <Form.Item
                                name="phone"
                                label={
                                    <label className="font-medium text-[14px]/[20px] lg:text-[16px]/[24px] text-[#F6F6F6]">
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
                                    className="any-questions-input"
                                    mask="+7 (___) ___-__-__"
                                    replacement={{ _: /\d/ }}
                                    placeholder="+7 "
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="flex flex-col lg:items-center mt-8 lg:mt-9 gap-3">
                        <CustomButton
                            variant="default"
                            className="p-3 lg:p-[18px] lg:mb-0 lg:text-[20px]/[28px]"
                            style={{
                                width: '100%',
                            }}
                            htmlType="submit"
                            loading={status === 'loading'}
                        >
                            Отправить
                        </CustomButton>

                        <p className="font-semibold text-[14px]/[20px] lg:text-[14px]/[20px] text-[#F6F6F699]">
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

                .any-questions-input {
                    width: 100%;
                    color: #f6f6f6 !important;
                    background-color: #f6f6f633 !important;
                    border-radius: 16px !important;
                    border: none !important;
                    box-shadow: none !important;
                    outline: none !important;
                    margin-top: 0;
                    margin-bottom: 0;
                    padding: 0.5rem 1rem;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 20px;
                    height: 36px;
                }

                .any-questions-input::placeholder {
                    color: #f6f6f699 !important;
                }

                .any-questions-input:focus,
                .any-questions-input:hover {
                    background-color: #f6f6f633 !important;
                    border: none !important;
                    box-shadow: none !important;
                }

                @media (min-width: 1024px) {
                    .any-questions-input {
                        padding-top: 10px;
                        padding-bottom: 10px;
                        font-size: 16px;
                        line-height: 24px;
                        height: 44px;
                    }
                }
            `}</style>
        </section>
    );
}