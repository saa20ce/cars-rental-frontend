'use client';

import CustomButton from '@/lib/ui/common/Button';
import { CloseModalBtnIcon } from '@/lib/ui/icons/CloseModalBtnIcon';
import { Button, ConfigProvider, Modal } from 'antd';
import Link from 'next/link';
import { InputMask } from '@react-input/mask';
import { useState } from 'react';
import { SucsessIcon } from '@/lib/ui/icons/SucsessIcon';
import SuccessRequest from './SuccessRequest';
import ErrorBanner from '../ErrorBanner/ErrorBanner';

export default function CallRequestModal({
    isOpen,
    setIsOpenAction,
}: {
    isOpen: boolean;
    setIsOpenAction: (isOpen: boolean) => void;
}) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        const res = await fetch('/api/fast-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone }),
        });

        if (res.ok) {
            setStatus('success');
            setName('');
            setPhone('');
        } else {
            setStatus('error');
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
                    {(status === 'idle' ||
                        status === 'loading' ||
                        status === 'error') && (
                        <div className="pb-[28px] pt-6 px-6 lg:pb-[38px] lg:pt-8 lg:px-9 bg-[#284B63] rounded-[16px] lg:rounded-[32px]  text-[#F6F6F6] w-[360px] lg:w-[456px]">
                            <div className="flex justify-between items-center">
                                <h2 className="font-bold text-[20px]/[28px] lg:text-[24px]/[32px]">
                                    Заказать звонок
                                </h2>
                                <button onClick={() => setIsOpenAction(false)}>
                                    <CloseModalBtnIcon className="w-[36px] h-[36px] lg:w-[48px] lg:h-[48px]" />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="mt-[10px]">
                                <label className="font-medium text-[14px]/[20px] lg:text-[16px]/[24px]">
                                    Фамилия и имя
                                </label>
                                <input
                                    className="w-full mt-2 mb-[14px] h-11 lg:h-12 lg:mb-4 py-2 px-4 lg:py-[10px] font-normal text-[14px]/[20px] lg:text-[16px]/[24px] bg-[#F6F6F633] rounded-[16px]"
                                    type="text"
                                    placeholder="Введите..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label className="font-medium text-[14px]/[20px] lg:text-[16px]/[24px]">
                                    Номер телефона
                                </label>
                                <InputMask
                                    className="w-full h-11 lg:h-12 mt-2 mb-8 lg:mb-9 py-2 px-4 lg:py-[10px] font-normal text-[14px]/[20px] lg:text-[16px]/[24px] bg-[#F6F6F633] rounded-[16px]"
                                    mask="+7 (___) ___-__-__"
                                    replacement={{ _: /\d/ }}
                                    placeholder="+7 "
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <CustomButton
                                    variant="default"
                                    className="p-3 lg:p-[18px] lg:text-[20px]/[28px] mb-[10px] lg:mb-[14px]"
                                    style={{
                                        width: '100%',
                                    }}
                                    type="submit"
                                    loading={status === 'loading'}
                                >
                                    Оставить заявку
                                </CustomButton>
                                <p className="font-semibold text-[12px]/[16px] lg:text-[14px]/[20px] text-[#F6F6F699]">
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
