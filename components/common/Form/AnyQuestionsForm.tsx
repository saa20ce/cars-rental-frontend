'use client';

import CustomButton from '@/lib/ui/common/Button';
import { InputMask } from '@react-input/mask';
import Link from 'next/link';
import { useState } from 'react';
import SuccessRequest from '../Modal/SuccessRequest';
import { Modal } from 'antd';
import { FullStarIcon } from '@/lib/ui/icons/FullStarIcon';
import { EmptyStarIcon } from '@/lib/ui/icons/EmptyStarIcon';
import ErrorBanner from '../ErrorBanner/ErrorBanner';

export default function AnyQuestionsForm() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');

    const resetForm = () => {
        setName('');
        setPhone('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        const res = false;

        if (res) {
            setStatus('success');
            resetForm();
        } else {
            setStatus('error');
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
            <form onSubmit={handleSubmit} className="lg:max-w-[719px]">
                <div className="flex flex-col lg:flex-row lg:gap-4">
                    <div className="flex-1">
                        <label
                            htmlFor="userName"
                            className="font-medium text-[14px]/[20px] lg:text-[16px]/[24px]"
                        >
                            Фамилия и имя
                        </label>
                        <input
                            id="name"
                            name="name"
                            className="w-full mt-[8px] mb-[14px] lg:mb-0 py-2 px-4 lg:py-[10px] font-normal text-[14px]/[20px] lg:text-[16px]/[24px] bg-[#F6F6F633] rounded-[16px] outline-none"
                            type="text"
                            placeholder="Введите..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex-1">
                        <label
                            htmlFor="number"
                            className="font-medium text-[14px]/[20px] lg:text-[16px]/[24px]"
                        >
                            Номер телефона
                        </label>
                        <InputMask
                            id="number"
                            name="number"
                            className="w-full mt-[8px] py-2 px-4 lg:py-[10px] font-normal text-[14px]/[20px] lg:text-[16px]/[24px] bg-[#F6F6F633] rounded-[16px] outline-none"
                            mask="+7 (___) ___-__-__"
                            replacement={{ _: /\d/ }}
                            placeholder="+7 "
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
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
            </form>

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
                <SuccessRequest onClick={() => setStatus('idle')} />
            </Modal>

            {status === 'error' && <ErrorBanner />}
        </section>
    );
}
