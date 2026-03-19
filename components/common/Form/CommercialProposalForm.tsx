'use client';

import CustomButton from '@/lib/ui/common/Button';
import { CloseModalBtnIcon } from '@/lib/ui/icons/CloseModalBtnIcon';
import { ConfigProvider, Modal, message } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import ErrorBanner from '../ErrorBanner/ErrorBanner';
import SuccessRequest from '../Modal/SuccessRequest';
import { CustomSelect } from '@/lib/ui/common/Select/CustomSelect';

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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedKlass, setSelectedKlass] = useState('');
    const [selectedBudget, setSelectedBudget] = useState('');
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');

    const resetForm = () => {
        setName('');
        setEmail('');
        setSelectedKlass('');
        setSelectedBudget('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const payload = {
                classAuto: selectedKlass.trim(),
                clientBudget: selectedBudget.trim(),
                clientName: name.trim(),
                clientEmail: email.trim(),
            };

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
                resetForm();
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

                            <form onSubmit={handleSubmit} className="mt-4 lg:mt-5">
                                <label className="font-medium text-[14px]/[20px] lg:text-[16px]/[24px]">
                                    Класс авто
                                </label>
                                <div className="relative w-full mt-2 mb-[14px] lg:mb-4">
                                    <CustomSelect
                                        placeholder="Выберите..."
                                        options={klassOptions}
                                        className="filters-select"
                                        style={{ width: '100%', height: '40px' }}
                                        onChange={(value) =>
                                            setSelectedKlass(value as string)
                                        }
                                        value={selectedKlass || undefined}
                                    />
                                </div>

                                <label className="font-medium text-[14px]/[20px] lg:text-[16px]/[24px]">
                                    Бюджет
                                </label>
                                <div className="relative w-full mt-2 mb-[14px] lg:mb-4">
                                    <CustomSelect
                                        placeholder="Выберите..."
                                        className="filters-select"
                                        style={{ width: '100%', height: '40px' }}
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
                                        value={selectedBudget || undefined}
                                        onChange={(value) =>
                                            setSelectedBudget(value as string)
                                        }
                                    />
                                </div>

                                <label
                                    htmlFor="name"
                                    className="font-medium text-[14px]/[20px] lg:text-[16px]/[24px]"
                                >
                                    Фамилия и имя
                                </label>
                                <input
                                    className="w-full mt-2 mb-[14px] lg:mb-4 px-4 py-[7px] font-normal text-[16px]/[24px] lg:text-[18px]/[28px] bg-[#F6F6F633] rounded-[16px] outline-none border border-[#f6f6f647]"
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Введите..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

                                <label
                                    htmlFor="email"
                                    className="font-medium text-[14px]/[20px] lg:text-[16px]/[24px]"
                                >
                                    Электронная почта
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    className="w-full mt-2 px-4 py-[7px] font-normal text-[16px]/[24px] lg:text-[18px]/[28px] bg-[#F6F6F633] rounded-[16px] outline-none border border-[#f6f6f647]"
                                    type="email"
                                    placeholder="user@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <CustomButton
                                    variant="default"
                                    className="p-3 lg:p-[18px] mt-8 lg:mt-9 lg:text-[20px]/[28px]"
                                    style={{
                                        width: '100%',
                                    }}
                                    type="submit"
                                    loading={status === 'loading'}
                                >
                                    Оставить заявку
                                </CustomButton>

                                <p className="font-semibold text-[12px]/[16px] lg:text-[14px]/[20px] text-[#F6F6F699] mt-[10px] lg:mt-[14px]">
                                    При нажатии кнопки &quot;Отправить&quot;, я
                                    подтверждаю, что ознакомлен с условиями и
                                    согласен на{' '}
                                    <Link
                                        href="#"
                                        className="underline text-[#F6F6F6] "
                                    >
                                        обработку моих персональных данных
                                    </Link>
                                    .
                                </p>
                            </form>
                        </div>
                    )}

                    {status === 'success' && (
                        <SuccessRequest
                            header="Ваша заявка принята!"
                            text="Мы свяжемся с вами в течение 5 минут"
                            onClick={() => {
                                setIsOpenAction(false);
                                setStatus('idle');
                            }}
                        />
                    )}

                    {status === 'error' && <ErrorBanner duration={2000} />}
                </div>
            </Modal>
        </ConfigProvider>
    );
}