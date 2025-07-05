'use client';

import React, { useState } from 'react';
import { Button, Input, Form, message } from 'antd';

interface FormValues {
	name: string;
	phone: string;
}

export const RentalCheckoutContactForm: React.FC = () => {
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
		<Form layout="vertical" onFinish={onFinish}>
			<Form.Item
				name="name"
				label="Имя"
				rules={[{ required: true, message: 'Введите имя' }]}
			>
				<Input placeholder="Имя" />
			</Form.Item>
			<Form.Item
				name="phone"
				label="Телефон"
				rules={[{ required: true, message: 'Введите телефон' }]}
			>
				<Input placeholder="Телефон" />
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" loading={loading} block>
					Отправить
				</Button>
			</Form.Item>
		</Form>
	);
};
