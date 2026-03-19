'use client';

import CustomButton from '@/lib/ui/common/Button';
import { CloseModalBtnIcon } from '@/lib/ui/icons/CloseModalBtnIcon';
import { ConfigProvider, Modal, Form, Input, message } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import ErrorBanner from '../ErrorBanner/ErrorBanner';
import SuccessRequest from '../Modal/SuccessRequest';

interface FormValues {
    clientName: string;
    clientText: string;
}

export default function ContactDerictorForm({
    isOpen,
    setIsOpenAction,
}: {
    isOpen: boolean;
    setIsOpenAction: (isOpen: boolean) => void;
}) {
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');
    const [form] = Form.useForm<FormValues>();

    const onFinish = async (values: FormValues) => {
        setStatus('loading');

        try {
            const payload = {
                clientName: values.clientName.trim(),
                clientText: values.clientText.trim(),
            };

            const res = await fetch('/api/contact-director', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                message.success('Обращение отправлено!');
                setStatus('success');
                form.resetFields();
            } else {
                console.error('contact-director error:', data);
                message.error(data.message || 'Ошибка отправки');
                setStatus('error');

                setTimeout(() => {
                    setStatus('idle');
                }, 2000);
            }
        } catch (err) {
            console.error('contact-director network error:', err);
            message.error('Сетевая ошибка');
            setStatus('error');

            setTimeout(() => {
                setStatus('idle');
            }, 2000);
        }
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Modal: {
                        contentBg: '#00000000',
                        boxShadow: 'none',
                    },
                    Form: {
                        itemMarginBottom: 12,
                    },
                },
            }}
        >
            <Modal
                open={isOpen}
                footer={null}
                closeIcon={false}
                onCancel={() => setIsOpenAction(false)}
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
                <div className="flex justify-center items-center">
                    {(status === 'idle' || status === 'loading') && (
                        <div className="pb-[28px] pt-6 px-6 lg:pt-8 lg:pb-[38px] lg:px-9 bg-[#284B63] rounded-[16px] lg:rounded-[32px] text-[#F6F6F6] w-[360px] lg:w-[456px]">
                            <div className="flex justify-between items-center">
                                <h2 className="font-bold text-[20px]/[28px] lg:text-[24px]/[32px]">
                                    Обращение к директору
                                </h2>
                                <button onClick={() => setIsOpenAction(false)}>
                                    <CloseModalBtnIcon className="w-[36px] h-[36px] lg:w-[48px] lg:h-[48px]" />
                                </button>
                            </div>

                            <Form<FormValues>
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                className="mt-[10px]"
                            >
                                <Form.Item
                                    name="clientName"
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
                                        className="w-full py-2 px-4 lg:py-[10px] font-normal text-[16px]/[24px] lg:text-[18px]/[28px] bg-[#F6F6F633] rounded-[20px] outline-none border-none"
                                        placeholder="Введите..."
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="clientText"
                                    label={
                                        <label className="font-medium text-[14px]/[20px] lg:text-[16px]/[24px] text-[#F6F6F6]">
                                            Ваше письмо
                                        </label>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Введите ваше письмо',
                                        },
                                    ]}
                                >
                                    <Input.TextArea
                                        className="director-textarea"
                                        placeholder="Введите..."
                                        autoSize={{ minRows: 5, maxRows: 8 }}
                                    />
                                </Form.Item>

                                <CustomButton
                                    variant="default"
                                    className="p-3 lg:p-[18px] mt-8 lg:mt-9 lg:text-[20px]/[28px]"
                                    style={{
                                        width: '100%',
                                    }}
                                    type="submit"
                                    loading={status === 'loading'}
                                >
                                    Отправить
                                </CustomButton>

                                <p className="font-semibold text-[12px]/[16px] lg:text-[14px]/[20px] text-[#F6F6F699] mt-[10px] lg:mt-[14px]">
                                    При нажатии кнопки &quot;Отправить&quot;, я
                                    подтверждаю, что ознакомлен с условиями и
                                    согласен на{' '}
                                    <Link
                                        href="#"
                                        className="underline text-[#F6F6F6]"
                                    >
                                        обработку моих персональных данных
                                    </Link>
                                    .
                                </p>
                            </Form>
                        </div>
                    )}

                    {status === 'success' && (
                        <SuccessRequest
                            header="Обращение принято!"
                            text="Письмо будет доставлено напрямую к директору. Ожидайте ответа на почте."
                            onClick={() => {
                                setIsOpenAction(false);
                                setStatus('idle');
                            }}
                        />
                    )}

                    {status === 'error' && <ErrorBanner duration={2000} />}
                </div>
            </Modal>

            <style jsx global>{`
                .ant-form * {
                    font-family: var(--font-lato), Arial, Helvetica, sans-serif;
                }

                .ant-form label {
                    font-size: 14px;
                    line-height: 20px;
                    font-weight: 500;
                }

                .ant-form .ant-form-item {
                    margin-bottom: 12px;
                }

                label.ant-form-item-required::before {
                    display: none !important;
                }

                .ant-form-item .ant-input,
                .ant-form-item .ant-input-affix-wrapper,
                .ant-form-item textarea.ant-input {
                    width: 100%;
                    color: #f6f6f6;
                    background-color: #f6f6f633 !important;
                    border-radius: 16px;
                    border: none !important;
                    box-shadow: none !important;
                }

                .ant-form-item .ant-input {
                    height: 36px;
                    padding: 0.5rem 1rem;
                    font-size: 14px;
                    line-height: 20px;
                }

                .ant-form-item textarea.ant-input {
                    min-height: 131px !important;
                    padding: 0.5rem 1rem;
                    font-size: 14px;
                    line-height: 20px;
                    resize: none;
                }

                .ant-form-item .ant-input::placeholder,
                .ant-form-item textarea.ant-input::placeholder {
                    color: #f6f6f699;
                }

                .ant-form-item .ant-input:focus,
                .ant-form-item .ant-input:hover,
                .ant-form-item textarea.ant-input:focus,
                .ant-form-item textarea.ant-input:hover {
                    background-color: #f6f6f633 !important;
                    border: none !important;
                    box-shadow: none !important;
                }

                @media (min-width: 1024px) {
                    .ant-form label {
                        font-size: 16px;
                        line-height: 24px;
                    }

                    .ant-form-item .ant-input {
                        height: 48px;
                        padding-top: 10px;
                        padding-bottom: 10px;
                        font-size: 16px;
                        line-height: 24px;
                    }

                    .ant-form-item textarea.ant-input {
                        min-height: 184px !important;
                        padding-top: 10px;
                        padding-bottom: 10px;
                        font-size: 16px;
                        line-height: 24px;
                    }
                }
            `}</style>
        </ConfigProvider>
    );
}