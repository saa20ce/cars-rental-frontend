'use client';

import CustomButton from '@/lib/ui/common/Button';
import { CloseModalBtnIcon } from '@/lib/ui/icons/CloseModalBtnIcon';
import { ConfigProvider, Modal, Form, Input, message } from 'antd';
import { PhoneInputMask } from '@/lib/ui/common/Input/PhoneInputMask';
import { useState } from 'react';
import SuccessRequest from './SuccessRequest';
import ErrorBanner from '../ErrorBanner/ErrorBanner';
import { PersonalDataConsentFormItem } from '../Form/PersonalDataConsent';

interface FormValues {
    name: string;
    phone: string;
    personalDataConsent: boolean;
}

export default function CallRequestModal({
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
                message.success('Заявка отправлена!');
                setStatus('success');
                form.resetFields();
            } else {
                console.error('fast-form error:', data);
                message.error(data?.message || 'Ошибка отправки');
                setStatus('error');

                setTimeout(() => setStatus('idle'), 2000);
            }
        } catch (err) {
            console.error('fast-form network error:', err);
            message.error('Сетевая ошибка');
            setStatus('error');

            setTimeout(() => setStatus('idle'), 2000);
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
                        <div className="pb-[28px] pt-6 px-6 lg:pb-[38px] lg:pt-8 lg:px-9 bg-[#284B63] rounded-[16px] lg:rounded-[32px] text-[#F6F6F6] w-[360px] lg:w-[456px]">
                            <div className="flex justify-between items-center">
                                <h2 className="font-bold text-[20px]/[28px] lg:text-[24px]/[32px]">
                                    Заказать звонок
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
                                    name="name"
                                    label={
                                        <label className="font-medium text-[14px]/[20px] lg:text-[16px]/[24px] text-[#F6F6F6]">
                                            Фамилия и имя
                                        </label>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Введите имя',
                                        },
                                    ]}
                                >
                                    <Input
                                        className="call-input"
                                        placeholder="Введите..."
                                    />
                                </Form.Item>

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
                                    <PhoneInputMask className="call-input" />
                                </Form.Item>

                                <CustomButton
                                    variant="default"
                                    className="p-3 lg:p-[16px] lg:text-[20px]/[28px] mt-[20px] mb-[10px] lg:mb-[14px]"
                                    style={{ width: '100%' }}
                                    htmlType="submit"
                                    loading={status === 'loading'}
                                >
                                    Оставить заявку
                                </CustomButton>

                                <PersonalDataConsentFormItem className="mb-0" />
                            </Form>
                        </div>
                    )}

                    {status === 'success' && (
                        <SuccessRequest
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
                label.ant-form-item-required::before {
                    display: none !important;
                }

                .call-input {
                    width: 100%;
                    color: #f6f6f6 !important;
                    background-color: #f6f6f633 !important;
                    border-radius: 16px !important;
                    border: none !important;
                    box-shadow: none !important;
                    outline: none !important;
                    padding: 0.5rem 1rem;
                    height: 36px;
                }

                .call-input::placeholder {
                    color: #f6f6f699 !important;
                }

                .call-input:focus,
                .call-input:hover {
                    background-color: #f6f6f633 !important;
                    border: none !important;
                    box-shadow: none !important;
                }

                @media (min-width: 1024px) {
                    .call-input {
                        height: 48px;
                        font-size: 16px;
                        line-height: 24px;
                    }
                }
            `}</style>
        </ConfigProvider>
    );
}
