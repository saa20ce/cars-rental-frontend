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
import { sendReview } from '@/lib/api/sendReview';

export default function ReviewForm() {
    const [selected, setSelected] = useState<number | null>(null);
    const [hovered, setHovered] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [review, setReview] = useState('');
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');

    const resetForm = () => {
        setName('');
        setPhone('');
        setEmail('');
        setReview('');
        setSelected(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await sendReview({
                full_name: name,
                phone: phone,
                email,
                review_text: review,
                rating: selected ?? 5,
            });
            setStatus('success');
            resetForm();
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <section className="mt-[42px] lg:mt-[68px] bg-[#1E384A] rounded-[24px] lg:rounded-[32px] py-7 px-6 lg:py-[68px] lg:px-12">
            <h2 className="font-bold text-[20px]/[28px] lg:text-[30px]/[36px] mb-4 lg:mb-6">
                Оставьте ваш отзыв
            </h2>
            <form onSubmit={handleSubmit} className="mt-[10px]">
                <div className="lg:flex lg:gap-9">
                    <div className="flex-1 lg:max-w-[454px]">
                        <label
                            htmlFor="userName"
                            className="font-semibold text-[12px]/[16px] lg:text-[14px]/[20px]"
                        >
                            Фамилия и имя
                        </label>
                        <input
                            id="name"
                            name="name"
                            className="w-full mt-[10px] lg:mt-3 mb-[14px] lg:mb-4 py-2 px-4 lg:py-[10px] font-normal text-[14px]/[20px] lg:text-[16px]/[24px] bg-[#F6F6F633] rounded-[16px] outline-none"
                            type="text"
                            placeholder="Имя"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label
                            htmlFor="number"
                            className="font-semibold text-[12px]/[16px] lg:text-[14px]/[20px]"
                        >
                            Номер телефона
                        </label>
                        <InputMask
                            id="number"
                            name="number"
                            className="w-full mt-[10px] lg:mt-3 mb-[12px] lg:mb-[14px] py-2 px-4 lg:py-[10px] font-normal text-[14px]/[20px] lg:text-[16px]/[24px] bg-[#F6F6F633] rounded-[16px] outline-none"
                            mask="+7 (___) ___-__-__"
                            replacement={{ _: /\d/ }}
                            placeholder="+7 "
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <label
                            htmlFor="email"
                            className="font-semibold text-[12px]/[16px] lg:text-[14px]/[20px]"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            className="w-full mt-[10px] lg:mt-3 py-2 px-4 mb-[12px] lg:mb-0 lg:py-[10px] font-normal text-[14px]/[20px] lg:text-[16px]/[24px] bg-[#F6F6F633] rounded-[16px] outline-none"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <label
                            htmlFor="review"
                            className="font-semibold text-[12px]/[16px] lg:text-[14px]/[20px]"
                        >
                            Ваш отзыв
                        </label>
                        <textarea
                            id="review"
                            name="review"
                            className="w-full min-h-[78px] mt-[10px] lg:mt-3 py-2 px-4 lg:py-[10px] font-normal text-[14px]/[20px] lg:text-[16px]/[24px] bg-[#F6F6F633] rounded-[16px] flex-1 resize-none outline-none"
                            placeholder="Введите.."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                        <div className="flex gap-3 items-center mt-[14px] lg:mt-3">
                            <h5 className="text-[14px]/[20px] font-semibold">
                                Оцените нас:{' '}
                            </h5>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <div
                                        key={star}
                                        onMouseEnter={() => setHovered(star)}
                                        onMouseLeave={() => setHovered(null)}
                                        onClick={() =>
                                            setSelected((prev) => {
                                                if (prev === star) return null;
                                                else return star;
                                            })
                                        }
                                        className="cursor-pointer"
                                    >
                                        {hovered ? (
                                            star <= hovered ? (
                                                <FullStarIcon />
                                            ) : (
                                                <EmptyStarIcon />
                                            )
                                        ) : star <= (selected ?? 0) ? (
                                            <FullStarIcon />
                                        ) : (
                                            <EmptyStarIcon />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row-reverse lg:items-center mt-8 lg:mt-9 lg:justify-between gap-3">
                    <CustomButton
                        variant="default"
                        className="p-3 lg:p-[18px] lg:mb-0 lg:text-[20px]/[28px] lg:max-w-[247px]"
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
