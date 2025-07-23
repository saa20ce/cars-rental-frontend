'use client';

import React, { useState } from 'react';
import { ConfigProvider, Button, Input, Form, message } from 'antd';
import { CustomInput } from '@/lib/ui/common/Input/CustomInput';
import './RentalCheckoutContactForm.css'

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

export const RentalCheckoutContactForm: React.FC<RentalCheckoutContactFormProps> = ({
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
		pricePerDay
	};

	const [loading, setLoading] = useState(false);

	const onFinish = async (values: FormValues) => {
		setLoading(true);
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
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
			<div className='border-t-[1px] border-solid border-[#f6f6f638] pb-[14px] mt-[14px]'></div>
			<div className='text-base mb-[10px]'>
				Ваши контактные данные:
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
				<Form
					layout="vertical"
					onFinish={onFinish}
					initialValues={initialValues}
				>
					<Form.Item
						name="clientName"
						label={<label className='text-xs text-[#f6f6f6]'>Фамилия и имя</label>}
						rules={[{ required: true, message: 'Введите фамилию и имя' }]}
					>
						<CustomInput placeholder="Иван Иванов" />
					</Form.Item>

					<Form.Item
						name="phone"
						label={<label className='text-xs text-[#f6f6f6]'>Номер телефона</label>}
						rules={[{ required: true, message: 'Введите телефон' }]}
					>
						<CustomInput placeholder='+7' />
					</Form.Item>

					<Form.Item
						name="comment"
						label={<label className='text-xs text-[#f6f6f6]'>Комментарий</label>}
					>
						<CustomInput placeholder='Введите...' />
					</Form.Item>

					<Form.Item
						name="autoName"
						className='hidden'
					>
						<Input disabled />
					</Form.Item>

					<Form.Item
						name="autoColor"
						className='hidden'
					>
						<Input disabled />
					</Form.Item>

					<Form.Item
						name="rentDate"
						className='hidden'
					>
						<Input disabled />
					</Form.Item>

					<Form.Item
						name="rentPeriod"
						className='hidden'
					>
						<Input disabled />
					</Form.Item>

					<Form.Item
						name="delivery"
						className='hidden'
					>
						<Input disabled />
					</Form.Item>

					<Form.Item
						name="options"
						className='hidden'
					>
						<Input disabled />
					</Form.Item>

					<Form.Item
						name="totalPrice"
						className='hidden'
					>
						<Input disabled />
					</Form.Item>

					<Form.Item
						name="pricePerDay"
						className='hidden'
					>
						<Input disabled />
					</Form.Item>

					<Form.Item className='mb-0'>
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
								className='rounded-xl mt-5 lg:text-xl lg:h-[60px] lg:rounded-2xl'
								block
								htmlType="submit"
								loading={loading}
							>
								Оставить заявку
							</Button>
						</ConfigProvider>
					</Form.Item>
				</Form >
			</ConfigProvider>
		</>
	);
};
