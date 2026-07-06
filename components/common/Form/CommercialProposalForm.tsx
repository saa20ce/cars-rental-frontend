'use client';

import CustomButton from '@/lib/ui/common/Button';
import { CloseModalBtnIcon } from '@/lib/ui/icons/CloseModalBtnIcon';
import { ConfigProvider, Modal, Form, message } from 'antd';
import { useState } from 'react';
import ErrorBanner from '../ErrorBanner/ErrorBanner';
import SuccessRequest from '../Modal/SuccessRequest';
import { CustomSelect } from '@/lib/ui/common/Select/CustomSelect';
import { CustomInput } from '@/lib/ui/common/Input/CustomInput';
import { PersonalDataConsentFormItem } from './PersonalDataConsent';

interface FormValues {
    classAuto: string;
    clientBudget: string;
    clientName: string;
    clientEmail: string;
    personalDataConsent: boolean;
}

export default function CommercialProposalForm({
    isOpen,
    setIsOpenAction,
    klassOptions,
}: {
    isOpen: boolean;
    setIsOpenAction: (isOpen: boolean) => void;
    klassOptions: {
        value: string;
        label: string;
    }[];
}) {
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');
    const [form] = Form.useForm<FormValues>();

    const onFinish = async (values: FormValues) => {
        const selectedClassAuto =
            klassOptions.find((option) => option.value === values.classAuto)
                ?.label ?? values.classAuto.trim();

        const payload = {
            classAuto: selectedClassAuto,
            clientBudget: values.clientBudget.trim(),
            clientName: values.clientName.trim(),
            clientEmail: values.clientEmail.trim(),
        };

        setStatus('loading');

        try {
            const res = await fetch('/api/contact-commercial', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json().catch(() => null);

            if (res.ok) {
                message.success('Заявка отправлена!');
                setStatus('success');
                form.resetFields();
            } else {
                console.error('contact-commercial error:', data);
                message.error(data?.message || 'Ошибка отправки');
                setStatus('error');

                setTimeout(() => {
                    setStatus('idle');
                }, 2000);
            }
        } catch (err) {
            console.error('contact-commercial network error:', err);
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
                        <div className="py-[28px] px-6 lg:py-[38px] lg:px-9 bg-[#284B63] rounded-[16px] lg:rounded-[32px] text-[#F6F6F6] w-[360px] lg:w-[456px]">
                            <div className="flex justify-between items-start">
                                <h2 className="font-bold text-[20px]/[28px] lg:text-[24px]/[32px]">
                                    Заказать коммерческое предложение
                                </h2>
                                <button onClick={() => setIsOpenAction(false)}>
                                    <CloseModalBtnIcon className="w-[36px] h-[36px] lg:w-[48px] lg:h-[48px]" />
                                </button>
                            </div>

                            <Form<FormValues>
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                className="commercial-form mt-4 lg:mt-5"
                            >
                                <Form.Item
                                    name="classAuto"
                                    label={
                                        <label className="font-medium text-[14px]/[20px] lg:text-[16px]/[24px] text-[#F6F6F6]">
                                            Класс авто
                                        </label>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Выберите класс авто',
                                        },
                                    ]}
                                >
                                    <CustomSelect
                                        placeholder="Выберите..."
                                        options={klassOptions}
                                        className="filters-select"
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="clientBudget"
                                    label={
                                        <label className="font-medium text-[14px]/[20px] lg:text-[16px]/[24px] text-[#F6F6F6]">
                                            Бюджет
                                        </label>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Выберите бюджет',
                                        },
                                    ]}
                                >
                                    <CustomSelect
                                        placeholder="Выберите..."
                                        className="filters-select"
                                        style={{ width: '100%' }}
                                        options={[
                                            {
                                                label: 'До 4000',
                                                value: 'До 4000',
                                            },
                                            {
                                                label: '4000–6000',
                                                value: '4000–6000',
                                            },
                                            {
                                                label: '6000–10000',
                                                value: '6000–10000',
                                            },
                                            {
                                                label: 'От 10000',
                                                value: 'От 10000',
                                            },
                                        ]}
                                    />
                                </Form.Item>

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
                                    <CustomInput
                                        className="w-full"
                                        type="text"
                                        placeholder="Введите..."
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="clientEmail"
                                    label={
                                        <label className="font-medium text-[14px]/[20px] lg:text-[16px]/[24px] text-[#F6F6F6]">
                                            Электронная почта
                                        </label>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Введите электронную почту',
                                        },
                                        {
                                            type: 'email',
                                            message: 'Введите корректный email',
                                        },
                                    ]}
                                >
                                    <CustomInput
                                        className="w-full"
                                        type="email"
                                        placeholder="user@email.com"
                                    />
                                </Form.Item>

                                <CustomButton
                                    variant="default"
                                    className="p-3 lg:p-[18px] mt-8 lg:mt-9 lg:text-[20px]/[28px] mb-[10px] lg:mb-[14px]"
                                    style={{
                                        width: '100%',
                                    }}
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
                .commercial-form label.ant-form-item-required::before {
                    display: none !important;
                }

                .commercial-form .ant-form-item-label {
                    padding: 0 0 8px !important;
                }

                .commercial-form .ant-form-item-label > label {
                    height: auto;
                    color: #f6f6f6;
                }
            `}</style>
        </ConfigProvider>
    );
}
